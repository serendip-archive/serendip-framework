import { Collection, ObjectID, ObjectId } from "mongodb";
import { ServerServiceInterface, Server } from "../core";
import * as utils from "../utils";
import { DbService, DbCollection } from "../db";
import { UserModel, RestrictionModel, ClientModel, TokenModel } from "./models";
import {
  UserRegisterRequestInterface,
  AccessTokenRequestInterface
} from "./interfaces";
import * as _ from "underscore";
import { EmailService, SmsIrService } from "..";
import { SmsServiceProviderInterface } from "../sms";
import { EventEmitter } from "events";
import { HttpError } from "../http";
import { HttpRequestInterface } from "../http/interfaces";

export interface AuthServiceOptionsInterface {
  /**
   * in milliseconds
   */
  tokenExpireIn?: number;
  /**
   * maximum token count per user
   */
  maxTokenCount?: number;
  mobileConfirmationRequired?: boolean;
  emailConfirmationRequired?: boolean;
  smsProvider?: string;
  defaultMobileCountryCode?: string;
}

export class AuthService implements ServerServiceInterface {
  static configure(options: AuthServiceOptionsInterface): void {
    AuthService.options = _.extend(AuthService.options, options);
    if (options.smsProvider) AuthService.dependencies.push(options.smsProvider);
  }

  static options: AuthServiceOptionsInterface = {
    tokenExpireIn: 1000 * 60 * 60 * 2
  };

  static dependencies = ["DbService", "EmailService"];

  static events = new EventEmitter();

  public usersCollection: DbCollection<UserModel>;
  public clientsCollection: DbCollection<ClientModel>;
  public restrictionCollection: DbCollection<RestrictionModel>;
  public tokenCollection: DbCollection<TokenModel>;

  private restrictions: RestrictionModel[];

  constructor(
    private dbService: DbService,
    private emailService: EmailService
  ) {}

  async start() {
    this.clientsCollection = await this.dbService.collection<ClientModel>(
      "Clients"
    );

    this.usersCollection = await this.dbService.collection<UserModel>("Users");

    this.tokenCollection = await this.dbService.collection<TokenModel>(
      "Tokens"
    );

    this.usersCollection.createIndex({ username: 1 }, { unique: true });
    this.usersCollection.createIndex({ mobile: 1 }, {});
    this.usersCollection.createIndex({ email: 1 }, {});
    //   this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});

    this.restrictionCollection = await this.dbService.collection<
      RestrictionModel
    >("Restrictions");

    await this.refreshRestrictions();
  }

  public sendVerifyEmail(userModel: UserModel): Promise<any> {
    return this.emailService
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

  public sendVerifySms(
    userModel: UserModel,
    useragent?: string,
    ip?: string
  ): Promise<any> {
    if (AuthService.options.smsProvider)
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
    else throw new HttpError(500, "no sms provider");
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

    if (!req.headers.authorization && !req.body.access_token)
      throw new HttpError(
        401,
        "access_token not found in body and authorization header"
      );

    var access_token: string;

    if (req.body.access_token) access_token = req.body.access_token;
    else access_token = req.headers.authorization.toString().split(" ")[1];

    var userToken;
    var user;

    try {
      userToken = req.userToken = await this.findTokenByAccessToken(
        access_token
      );
      user = req.user = await this.findUserById(userToken.userId);
    } catch (error) {
      throw error;
    }

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
    user.mobileVerificationCode = utils.randomNumberString(6).toLowerCase();

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

    userModel.emailVerificationCode = utils.randomNumberString(6).toLowerCase();
    userModel.mobileVerificationCode = utils
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
    user.mobileVerificationCode = utils.randomNumberString(6).toLowerCase();
    user.mobileVerified = false;
    await this.usersCollection.updateOne(user, userId);
  }
  public userMatchPassword(user: UserModel, password: string): boolean {
    if (!password || !user.password || !user.passwordSalt) return false;
    return utils.bcryptCompare(password + user.passwordSalt, user.password);
  }

  public userMatchOneTimePassword(
    user: UserModel,
    oneTimePassword: string
  ): boolean {
    if (!oneTimePassword || !user.oneTimePassword || !user.oneTimePasswordSalt)
      return;
    return utils.bcryptCompare(
      oneTimePassword + user.oneTimePasswordSalt,
      user.oneTimePassword
    );
  }

  public clientMatchSecret(client: ClientModel, secret: string): boolean {
    if (!secret) return false;
    return utils.bcryptCompare(secret + client.secretSalt, client.secret);
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
      access_token: utils.randomAccessToken(),
      grant_type: opts.grant_type,
      useragent: opts.useragent,
      expires_at: Date.now() + AuthService.options.tokenExpireIn,
      expires_in: AuthService.options.tokenExpireIn,
      refresh_token: utils.randomAccessToken(),
      token_type: "bearer",
      userId: opts.userId,
      clientId: opts.clientId
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
    var code = utils.randomNumberString(6).toLowerCase();

    user.oneTimePasswordSalt = utils.randomAsciiString(6);
    user.oneTimePasswordResetAt = Date.now();
    user.oneTimePassword = utils.bcryptHash(code + user.oneTimePasswordSalt);

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

    user.passwordResetToken = utils.randomNumberString(6).toLowerCase();

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

    user.passwordSalt = utils.randomAsciiString(6);
    user.password = utils.bcryptHash(newPass + user.passwordSalt);
    user.passwordChangedAt = Date.now();
    user.passwordChangedByIp = ip;
    user.passwordChangedByUseragent = useragent ? useragent.toString() : "";

    // terminate current sessions
    await this.deleteUserTokens(userId);

    await this.usersCollection.updateOne(user);
  }

  public async setClientSecret(clientId, newSecret): Promise<void> {
    var clientQuery = await this.clientsCollection.find({
      _id: new ObjectId(clientId)
    });

    if (!clientQuery[0]) throw new Error("client not found");

    var client = clientQuery[0];

    client.secretSalt = utils.randomAsciiString(6);
    client.secret = utils.bcryptHash(newSecret + client.secretSalt);

    // terminate current sessions
    await this.deleteClientTokens(client._id);

    await this.clientsCollection.updateOne(client);
  }

  public async findClientById(clientId: string): Promise<ClientModel> {
    var query = await this.clientsCollection.find({
      _id: new ObjectId(clientId)
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
    var query = await this.usersCollection
      .aggregate([])
      .match(match)
      .toArray();

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
    var query = await this.usersCollection.find({ _id: new ObjectId(id) });

    if (query.length == 0) return undefined;
    else return query[0];
  }
}
