/**
 *  @module Auth
 */

import * as utils from "serendip-utility";
import { DbService } from "../db";

import * as _ from "underscore";
import { EmailService, SmsIrService, ServerServiceInterface } from "..";
import { SmsServiceProviderInterface } from "../sms";
import { EventEmitter } from "events";
import { HttpError } from "../http";
import { HttpRequestInterface } from "../http/interfaces";
import chalk from "chalk";
import * as bcrypt from "bcryptjs";
import {
  ClientModel,
  UserModel,
  RestrictionModel,
  TokenModel,
  UserRegisterRequestInterface,
  DbCollectionInterface
} from "serendip-business-model";
import { Server } from "../server";
import { AuthorizationCodeModel } from "serendip-business-model";
import { AuthServiceOptionsInterface } from "./AuthServiceOptionsInterface";

/**
 * @internal
 * Codeblocks are great for examples
 * 
 * ```
 * <my-custom-element>Highlight JS will autodetect the language</my-custom-element>
 * ```
 * 
 * ```typescript
 * // Or you can specify the language explicitly
 * const instance = new MyClass();
 * ```
 */
export class AuthService implements ServerServiceInterface {
  authCodesCollection: DbCollectionInterface<AuthorizationCodeModel>;
  static configure(options: AuthServiceOptionsInterface): void {
    AuthService.options = _.extend(AuthService.options, options);
    if (options.smsProvider) AuthService.dependencies.push(options.smsProvider);
    if (options.emailProvider) AuthService.dependencies.push(options.emailProvider);
  }

  static options: AuthServiceOptionsInterface = {
    tokenExpireIn: 1000 * 60 * 60 * 2
  };

  static dependencies = ['DbService'];
  static events = new EventEmitter();

  public usersCollection: DbCollectionInterface<UserModel>;
  public clientsCollection: DbCollectionInterface<ClientModel>;
  public restrictionCollection: DbCollectionInterface<RestrictionModel>;
  public tokenCollection: DbCollectionInterface<TokenModel>;

  private restrictions: RestrictionModel[];

  constructor(
    private dbService: DbService
  ) { }

  async start() {

    console.log(this.dbService);
    this.clientsCollection = await this.dbService.collection<ClientModel>(
      "Clients",
      true
    );



    this.tokenCollection = await this.dbService.collection<TokenModel>(
      "Tokens",
      true
    );



    this.usersCollection = await this.dbService.collection<UserModel>(
      "Users",
      true
    );


    this.usersCollection.ensureIndex({ username: 1 }, { unique: true });
    this.usersCollection.ensureIndex({ mobile: 1 }, {});
    this.usersCollection.ensureIndex({ email: 1 }, {});



    this.authCodesCollection = await this.dbService.collection<AuthorizationCodeModel>(
      "AuthCodes",
      true
    );


    //   this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});

    this.restrictionCollection = await this.dbService.collection<
      RestrictionModel
    >("Restrictions");

    console.log(
      chalk.gray(`\tAuthService > users: ${await this.usersCollection.count()}`)
    );

    await this.refreshRestrictions();
  }

  public async sendVerifyEmail(userModel: UserModel): Promise<any> {

    if (!AuthService.options.emailProvider)
      throw new HttpError(500, "no email provider")

    return Server.services[AuthService.options.emailProvider]
      .send({
        from: process.env.company_mail_auth || process.env.company_mail_noreply,
        to: userModel.email,
        text: `Welcome to ${process.env.company_name}, ${
          userModel.username
          }!\n\n
             Your verification code is : ${userModel.emailVerificationCode} \n\n
             ${process.env.company_domain}`,
        subject: `Verify your email address on ${process.env.company_name}`,
        template: {
          data: {
            name: userModel.username,
            code: userModel.emailVerificationCode
          },
          name: "verify_email"
        }
      })
      .then(r => AuthService.events.emit("sendVerifyEmail", r, null))
      .catch(e => AuthService.events.emit("sendVerifyEmail", null, e));
  }

  public async sendVerifySms(
    userModel: UserModel,
    useragent?: string,
    ip?: string
  ): Promise<any> {

    if (!AuthService.options.smsProvider)
      throw new HttpError(500, "no sms provider")


    return new Promise((resolve, reject) => {
      Server.services[AuthService.options.smsProvider]
        .sendVerification(
          userModel.mobile,
          userModel.mobileVerificationCode,
          useragent,
          ip
        )
        .then(body => resolve(body))
        .catch(err => reject(new HttpError(500, err)));
    })
      .then(r => AuthService.events.emit("sendVerifySms", r, null))
      .catch(e => AuthService.events.emit("sendVerifySms", null, e));

  }

  public async refreshRestrictions() {
    this.restrictions = await this.restrictionCollection.find({});
  }

  public async authorizeRequest(
    req: HttpRequestInterface,
    controllerName,
    endpoint,
    publicAccess: boolean
  ) {
    if (publicAccess) return true;

    if (!req.headers.authorization && !req.body.access_token && !req.query.access_token)
      throw new HttpError(
        401,
        "access_token not found in body, query and authorization header"
      );

    let access_token: string;

    if (!access_token && req.headers && req.headers.authorization && req.headers.authorization.split(' ').length > 0)
      access_token = req.headers.authorization.toString().split(" ")[1]

    if (!access_token && req.query && req.query.access_token) access_token = decodeURIComponent(req.query.access_token)

    if (!access_token && req.body && req.body.access_token) access_token = req.body.access_token;


    let userToken: TokenModel;
    let user: UserModel;

    try {
      userToken = req.userToken = await this.findTokenByAccessToken(
        access_token
      );
      user = req.user = await this.findUserById(userToken.userId);
    } catch (error) {
      throw error;
    }

    if (userToken.expires_at < Date.now()) throw new HttpError(401, "token expired");

    if (!user) throw new HttpError(401, "user deleted");

    if (!user.groups) user.groups = [];

    if (user.groups.indexOf("blocked") != -1)
      throw new HttpError(401, "user access is blocked");

    var rules = [
      // global
      _.findWhere(this.restrictions, { controllerName: "", endpoint: "" }),
      // controller
      _.findWhere(this.restrictions, {
        controllerName: controllerName,
        endpoint: ""
      }),
      // endpoint
      _.findWhere(this.restrictions, {
        controllerName: controllerName,
        endpoint: endpoint
      })
    ];

    rules.forEach(rule => {
      if (rule) {
        if (
          rule.allowAll &&
          rule.groups.length != _.difference(rule.groups, user.groups).length
        )
          if (rule.users.indexOf(user._id) == -1)
            throw new HttpError(401, "user group access is denied");

        if (
          !rule.allowAll &&
          rule.groups.length == _.difference(rule.groups, user.groups).length
        )
          if (rule.users.indexOf(user._id) == -1)
            throw new HttpError(401, "user group access is denied");
      }
    });
  }

  public async changeUserMobile(userId: string, newMobile: string) {
    var user = await this.findUserById(userId);

    user.mobile = newMobile;
    user.mobileVerified = false;
    user.mobileVerificationCode = utils.text
      .randomNumberString(6)
      .toLowerCase();

    await this.usersCollection.updateOne(user);
  }

  public async VerifyUserMobile(mobile: string, code: string) {
    var user = await this.findUserByMobile(mobile);
    user.mobileVerified = user.mobileVerificationCode == code;
    await this.usersCollection.updateOne(user);
  }
  public async VerifyUserEmail(email: string, code: string) {
    var user = await this.findUserByEmail(email);
    user.emailVerified = user.emailVerificationCode == code;
    await this.usersCollection.updateOne(user);
  }
  public async registerUser(
    model: UserRegisterRequestInterface,
    ip?,
    useragent?,
    confirmed?: boolean
  ): Promise<UserModel> {
    if (model.username) model.username = model.username.toLowerCase();

    if (model.mobile) model.mobile = parseInt(model.mobile).toString();
    if (model.mobileCountryCode)
      model.mobileCountryCode = parseInt(model.mobileCountryCode).toString();

    if (model.email) model.email = model.email.toLowerCase();

    var userModel = new UserModel();

    if (model.extra) userModel.extra = model.extra;

    userModel.username = model.username;

    userModel.registeredAt = Date.now();
    userModel.registeredByIp = ip;
    userModel.registeredByUseragent = useragent ? useragent.toString() : "";

    userModel.emailVerificationCode = utils.text
      .randomNumberString(6)
      .toLowerCase();
    userModel.mobileVerificationCode = utils.text
      .randomNumberString(6)
      .toLowerCase();

    userModel.mobile = model.mobile;
    userModel.email = model.email;

    userModel.emailVerified = confirmed;
    userModel.mobileVerified = confirmed;

    userModel.groups = [];

    if (userModel.email) {
      var userByEmail = await this.findUserByEmail(userModel.email);
      if (userByEmail) throw new Error("DuplicateEmail");
    }

    if (userModel.mobile) {
      var userByMobile = await this.findUserByMobile(userModel.mobile);
      if (userByMobile) throw new Error("DuplicateMobile");
    }
    var registeredUser = await this.usersCollection.insertOne(userModel);

    await this.setNewPassword(
      registeredUser._id,
      model.password,
      ip,
      useragent
    );

    if (!confirmed) {
      try {
        if (userModel.email) this.sendVerifyEmail(userModel);
      } catch (error) {
        if (Server.opts.logging != "silent")
          console.log("error in register email verification send", error);
      }

      try {
        if (userModel.mobile) this.sendVerifySms(userModel, useragent, ip);
      } catch (error) {
        if (Server.opts.logging != "silent")
          console.log("error in register sms verification send", error);
      }
    }

    return registeredUser;
  }

  async resetMobileVerifyCode(userId) {
    var user = await this.findUserById(userId);
    user.mobileVerificationCode = utils.text
      .randomNumberString(6)
      .toLowerCase();
    user.mobileVerified = false;
    await this.usersCollection.updateOne(user, userId);
  }
  public userMatchPassword(user: UserModel, password: string): boolean {
    if (!password || !user.password || !user.passwordSalt) return false;
    return bcrypt.compareSync(password + user.passwordSalt, user.password);
  }

  public async newAuthCode(token: TokenModel, clientId?: string, redirectUri?: string): Promise<{
    _id: string,
    code: string,
    clientAuthBackUrl?: string
  }> {


    let authCode: AuthorizationCodeModel = {
      clientId,
      redirectUri,
      userId: token.userId.toString(),
      tokenId: token._id.toString(),
      date: Date.now()
    };
    const code = utils.text.randomAsciiString(16);

    authCode.codeSalt = utils.text.randomAsciiString(6);
    authCode.date = Date.now();
    authCode.codeHash = bcrypt.hashSync(code + authCode.codeSalt, 6);

    authCode = await this.authCodesCollection.insertOne(authCode)


    return {
      code,
      _id: authCode._id
    };

  }

  async setAuthCodeUsed(_id: string): Promise<void> {

    if (!_id) {
      throw new Error('no _id provided');
    }
    const authCodeQuery = await this.authCodesCollection.find({
      _id
    });


    if (!authCodeQuery[0])
      throw new Error('auth code related to this codeId not found');

    const authCode = authCodeQuery[0];


    authCode.used = Date.now();

    await this.authCodesCollection.updateOne(authCode);

  }

  public async authCodeValid(_id: string, code: string): Promise<boolean> {

    if (!_id || !code)
      return false;
    const authCodeQuery = await this.authCodesCollection.find({
      _id
    });

    if (!authCodeQuery[0])
      return false;

    const authCode = authCodeQuery[0];

    return bcrypt.compareSync(code + authCode.codeSalt, authCode.codeHash);
  }



  public async findAuthCode(_id: string): Promise<AuthorizationCodeModel> {


    const authCodeQuery = await this.authCodesCollection.find({
      _id
    });

    return authCodeQuery[0]
  }


  public userMatchOneTimePassword(
    user: UserModel,
    oneTimePassword: string
  ): boolean {
    if (!oneTimePassword || !user.oneTimePassword || !user.oneTimePasswordSalt)
      return;
    return bcrypt.compareSync(
      oneTimePassword + user.oneTimePasswordSalt,
      user.oneTimePassword
    );
  }

  public clientMatchSecret(client: ClientModel, secret: string): boolean {
    if (!secret) return false;
    return bcrypt.compareSync(secret + client.secretSalt, client.secret);
  }

  public async findTokenByAccessToken(
    access_token: string
  ): Promise<TokenModel> {
    var tokenQuery = await this.tokenCollection.find({
      access_token: access_token
    });

    if (tokenQuery.length != 1)
      throw new HttpError(401, "access_token invalid");
    else {
      return tokenQuery[0];
    }
  }

  public async findTokensByUserId(userId: string) {
    return this.tokenCollection.find({ userId: userId });
  }

  public async findTokensByClientId(clientId: string) {
    return this.tokenCollection.find({ clientId: clientId });
  }

  public async deleteUserTokens(userId: string) {
    return Promise.all(
      _.map(await this.findTokensByUserId(userId), (item: TokenModel) => {
        return this.tokenCollection.deleteOne(item._id);
      })
    );
  }

  public async deleteClientTokens(clientId: string) {
    return Promise.all(
      _.map(await this.findTokensByClientId(clientId), (item: TokenModel) => {
        return this.tokenCollection.deleteOne(item._id);
      })
    );
  }
  public async addUserToGroup(userId: string, group: string) {
    var user = await this.findUserById(userId);

    if (user.groups.indexOf(group) == -1) user.groups.push(group);

    await this.deleteUserTokens(userId);

    await this.usersCollection.updateOne(user);
  }

  public async deleteUserFromGroup(userId: string, group: string) {
    var user = await this.findUserById(userId);

    if (user.groups.indexOf(group) != -1)
      user.groups = _.filter(user.groups, (item: string) => {
        return item != group;
      });

    // User need to do login again
    await this.deleteUserTokens(userId);

    await this.usersCollection.updateOne(user);
  }

  public async getUsersInGroup(group: string): Promise<UserModel[]> {
    var users = await this.usersCollection.find({
      groups: {
        $elemMatch: { $eq: group }
      }
    });
    return users;
  }

  public async insertToken(opts: {
    clientId?: string;
    userId?: string;
    useragent: string;
    grant_type:
    | "one-time"
    | "password"
    | "client_credentials"
    | "refresh_token"
    | "authorization_code";
  }): Promise<TokenModel> {
    var newToken: TokenModel = {
      issue_at: Date.now(),
      access_token: utils.text.randomAccessToken(),
      grant_type: opts.grant_type,
      useragent: opts.useragent,
      expires_at: Date.now() + AuthService.options.tokenExpireIn,
      expires_in: AuthService.options.tokenExpireIn,
      refresh_token: utils.text.randomAccessToken(),
      token_type: "bearer",
      userId: opts.userId
    };

    if (opts.userId) {
      var user = await this.findUserById(opts.userId);

      if (user) {
        newToken.username = user.username;
        newToken.groups = user.groups;

      } else {
        throw new Error("user not found");
      }
    }

    var model = await this.tokenCollection.insertOne(newToken);

    return model;
  }

  async sendOneTimePassword(userId, useragent, ip) {
    var user: UserModel = await this.findUserById(userId);
    var code = utils.text.randomNumberString(6).toLowerCase();

    user.oneTimePasswordSalt = utils.text.randomAsciiString(6);
    user.oneTimePasswordResetAt = Date.now();
    user.oneTimePassword = bcrypt.hashSync(code + user.oneTimePasswordSalt, 6);

    await this.usersCollection.updateOne(user);

    if (user.mobile)
      if (AuthService.options.smsProvider)
        return Server.services[AuthService.options.smsProvider].sendAuthCode(
          user.mobile,
          code,
          useragent,
          ip
        );
      else throw new Error("no sms provider");
  }
  public async sendPasswordResetToken(
    userId: string,
    useragent?: string,
    ip?: string
  ): Promise<any> {
    var user: UserModel = await this.findUserById(userId);

    user.passwordResetToken = utils.text.randomNumberString(6).toLowerCase();

    user.passwordResetTokenExpireAt =
      Date.now() + AuthService.options.tokenExpireIn;

    user.passwordResetTokenIssueAt = Date.now();

    await this.usersCollection.updateOne(user);

    if (user.mobile)
      if (AuthService.options.smsProvider)
        return Server.services[AuthService.options.smsProvider].sendAuthCode(
          user.mobile,
          user.passwordResetToken,
          useragent,
          ip
        );
      else throw new Error("no sms provider");
  }

  public async setNewPassword(
    userId,
    newPass,
    ip?: string,
    useragent?: string
  ): Promise<void> {
    var user = await this.findUserById(userId);

    user.passwordSalt = utils.text.randomAsciiString(6);
    user.password = bcrypt.hashSync(newPass + user.passwordSalt, 6);
    user.passwordChangedAt = Date.now();
    user.passwordChangedByIp = ip;
    user.passwordChangedByUseragent = useragent ? useragent.toString() : "";

    // terminate current sessions
    await this.deleteUserTokens(userId);

    await this.usersCollection.updateOne(user);
  }

  public async setClientSecret(clientId, newSecret): Promise<void> {
    var clientQuery = await this.clientsCollection.find({
      _id: clientId
    });

    if (!clientQuery[0]) throw new Error("client not found");

    var client = clientQuery[0];

    client.secretSalt = utils.text.randomAsciiString(6);
    client.secret = bcrypt.hashSync(newSecret + client.secretSalt, 6);

    // terminate current sessions
    await this.deleteClientTokens(client._id);

    await this.clientsCollection.updateOne(client);
  }

  public async findClientById(clientId: string): Promise<ClientModel> {
    var query = await this.clientsCollection.find({
      _id: clientId
    });

    if (query.length == 0) return undefined;
    else return query[0];
  }

  public async findUserByEmail(email: string): Promise<UserModel> {
    if (!email) return undefined;

    var query = await this.usersCollection.find({ email: email.toLowerCase() });

    if (query.length == 0) return undefined;
    else return query[0];
  }

  public async findUserByMobile(
    mobile: string,
    mobileCountryCode?: string
  ): Promise<UserModel> {
    if (!mobile) return undefined;

    var match = {
      $and: [
        {
          $or: [
            {
              mobile: parseInt(mobile, 10)
            },
            {
              mobile: parseInt(mobile, 10).toString()
            },
            {
              mobile: "0" + parseInt(mobile, 10).toString()
            }
          ]
        },
        {
          mobileCountryCode:
            mobileCountryCode ||
            AuthService.options.defaultMobileCountryCode ||
            "+98"
        }
      ]
    };
    var query = await this.usersCollection.find(match);

    if (query.length == 0) return undefined;
    else return query[0];
  }

  public async findUserByUsername(username: string): Promise<UserModel> {
    if (username) username = username.toLowerCase();
    else return undefined;
    var query = await this.usersCollection.find({
      username: username
    });

    if (query.length == 0) return undefined;
    else return query[0];
  }

  public async findUserById(id: string): Promise<UserModel> {
    var query = await this.usersCollection.find({ _id: id });

    if (query.length == 0) return undefined;
    else return query[0];
  }
}
