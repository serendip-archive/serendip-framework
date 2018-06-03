import { Collection, ObjectID } from "mongodb";
import { ServerServiceInterface, Server, ServerRequestInterface } from "../core";
import * as utils from "../utils";
import { DbService, DbCollection } from "../db";
import { UserModel, UserTokenModel, RestrictionModel, ClientModel } from "./models";
import { UserRegisterRequestInterface, AccessTokenRequestInterface } from "./interfaces";
import * as _ from 'underscore';
import { EmailService, SmsIrService } from "..";

export interface AuthServiceOptionsInterface {

    /**
     * in milliseconds
     */
    tokenExpireIn?: number;

    /**
     * login page path
     */
    loginPage?: string;


}

export class AuthService implements ServerServiceInterface {



    static configure(options: AuthServiceOptionsInterface): void {
        AuthService.options = _.extend(AuthService.options, options);
    }


    static dependencies = ["DbService", "EmailService"];

    static options: AuthServiceOptionsInterface = {
        tokenExpireIn: 1000 * 60 * 60 * 2
    };


    private _dbService: DbService;
    private _emailService: EmailService;
    private _smsIrService: SmsIrService;

    private usersCollection: DbCollection<UserModel>;
    private clientsCollection: DbCollection<ClientModel>;
    private restrictionCollection: DbCollection<RestrictionModel>;

    private restrictions: RestrictionModel[];




    async start() {

        this._dbService = Server.services["DbService"];
        this._emailService = Server.services["EmailService"];
        this._smsIrService = Server.services["SmsIrService"];


        this.clientsCollection = await this._dbService.collection<ClientModel>("Clients");

        this.usersCollection = await this._dbService.collection<UserModel>("Users");

        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
        this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});



        this.restrictionCollection = await this._dbService.collection<RestrictionModel>("Restrictions");

        await this.refreshRestrictions();


    }

    public sendVerifyEmail(userModel: UserModel): Promise<any> {


        return this._emailService.send({
            from: process.env.company_mail_auth || process.env.company_mail_noreply,
            to: userModel.email,
            text: `Welcome to ${process.env.company_name}, ${userModel.username}!\n\n
             Your verification code is : ${userModel.emailVerificationCode} \n\n
             ${process.env.company_domain}`,
            subject: `Verify your email address on ${process.env.company_name}`,
            template: {
                data: {
                    name: userModel.username,
                    code: userModel.emailVerificationCode
                },
                name: 'verify_email'
            }
        });

    }

    public sendVerifySms(userModel: UserModel): Promise<any> {

        return this._smsIrService.sendVerification(userModel.mobile, userModel.mobileVerificationCode);

    }

    public async refreshRestrictions() {

        this.restrictions = await this.restrictionCollection.find({});

    }


    public async authorizeRequest(req: ServerRequestInterface, controllerName, endpoint, publicAccess: boolean) {

        if (publicAccess)
            return true;

        if (!req.headers.authorization && !req.body.access_token)
            throw new Error("access_token not found in body and authorization header");

        var access_token: string;

        if (req.body.access_token)
            access_token = req.body.access_token;
        else {
            access_token = req.headers.authorization.toString().split(' ')[1];
        }

        var userToken = req.userToken = await this.checkToken(access_token);
        var user = req.user = await this.findUserById(userToken.userId);

        if (!user.groups)
            user.groups = [];

        if (user.groups.indexOf("blocked") != -1)
            throw new Error("user access is blocked");

        if (user.groups.indexOf("emailNotConfirmed") != -1)
            throw new Error("user email needs to get confirmed");


        if (user.groups.indexOf("mobileNotConfirmed") != -1)
            throw new Error("user mobile needs to get confirmed");

        if (user.groups.indexOf("notConfirmed") != -1)
            throw new Error("user needs to get confirmed");


        var rules = [
            // global
            _.findWhere(this.restrictions, { controllerName: '', endpoint: '' }),
            // controller
            _.findWhere(this.restrictions, { controllerName: controllerName, endpoint: '' }),
            // endpoint
            _.findWhere(this.restrictions, { controllerName: controllerName, endpoint: endpoint })

        ];

        rules.forEach(rule => {

            if (rule) {

                if (rule.allowAll && rule.groups.length != _.difference(rule.groups, user.groups).length)
                    if (rule.users.indexOf(user._id) == -1)
                        throw new Error("user group access is denied");


                if (!rule.allowAll && rule.groups.length == _.difference(rule.groups, user.groups).length)
                    if (rule.users.indexOf(user._id) == -1)
                        throw new Error("user group access is denied");

            }

        });



    }

    public async registerUser(model: UserRegisterRequestInterface, ip?, useragent?): Promise<UserModel> {

        if (model.username)
            model.username = model.username.toLowerCase();

        if (model.mobile)
            model.mobile = model.mobile.toLowerCase();

        if (model.email)
            model.email = model.email.toLowerCase();

        var userModel = new UserModel();



        userModel.username = model.username;

        userModel.registeredAt = Date.now();
        userModel.registeredByIp = ip;
        userModel.registeredByUseragent = useragent;

        userModel.emailVerificationCode = utils.randomAsciiString(6).toLowerCase();
        userModel.mobileVerificationCode = utils.randomAsciiString(6).toLowerCase();

        userModel.mobile = model.mobile;
        userModel.email = model.email;

        userModel.emailVerified = false;
        userModel.mobileVerified = false;



        userModel.tokens = [];

        if (userModel.email) {

            var userByEmail = await this.findUserByEmail(userModel.email);
            if (userByEmail)
                throw new Error("DuplicateEmail");
        }

        if (userModel.mobile) {
            var userByMobile = await this.findUserByMobile(userModel.mobile);
            if (userByMobile)
                throw new Error("DuplicateMobile");
        }
        var registeredUser = await this.usersCollection.insertOne(userModel);

        await this.setNewPassword(registeredUser._id, model.password, ip, useragent);

        if (userModel.email)
            this.sendVerifyEmail(userModel);

        if (userModel.mobile)
            this.sendVerifySms(userModel);

        return registeredUser;
    }

    public userMatchPassword(user: UserModel, password: string): boolean {

        return utils.bcryptCompare(password + user.passwordSalt, user.password);

    }

    public async findToken(access_token: string): Promise<UserTokenModel> {
        var tokenQuery = await this.usersCollection.find({
            tokens: {
                $elemMatch: { 'access_token': access_token }
            }
        });

        if (tokenQuery.length == 0)
            throw new Error("access_token invalid");
        else {
            var foundedToken = _.findWhere(tokenQuery[0].tokens, { access_token: access_token });

            foundedToken.userId = tokenQuery[0]._id;
            foundedToken.username = tokenQuery[0].username;

            return foundedToken;

        }
    }


    public async checkToken(access_token: string): Promise<UserTokenModel> {
        var tokenQuery = await this.usersCollection.find({
            tokens: {
                $elemMatch: { 'access_token': access_token }
            }
        });

        if (tokenQuery.length == 0)
            throw new Error("access_token invalid");
        else {
            var foundedToken = _.findWhere(tokenQuery[0].tokens, { access_token: access_token });

            foundedToken.userId = tokenQuery[0]._id;
            foundedToken.username = tokenQuery[0].username;

            if (foundedToken.expires_at < Date.now())
                throw new Error("access_token expired");

            return foundedToken;

        }

    }

    public async getNewToken(userId: string, useragent: string, client: string): Promise<UserTokenModel> {


        var user = await this.findUserById(userId);

        var userToken: UserTokenModel = {
            access_token: utils.randomAccessToken(),
            grant_type: 'password',
            useragent: useragent,
            client: client,
            expires_at: Date.now() + AuthService.options.tokenExpireIn,
            expires_in: AuthService.options.tokenExpireIn,
            refresh_token: utils.randomAccessToken(),
            token_type: 'bearer',
            groups: user.groups || []
        };

        if (!user.tokens)
            user.tokens = [];

        user.tokens.push(userToken);

        await this.usersCollection.updateOne(user);

        return userToken;

    }

    public async getNewPasswordResetToken(userId: string): Promise<string> {


        var user = await this.findUserById(userId);

        user.passwordResetToken = utils.randomAsciiString(8).toLowerCase();

        user.passwordResetTokenExpireAt = Date.now() + AuthService.options.tokenExpireIn;

        user.passwordResetTokenIssueAt = Date.now();


        await this.usersCollection.updateOne(user);

        return user.passwordResetToken;

    }

    public async setNewPassword(userId, newPass, ip?: string, useragent?: string): Promise<void> {


        var user = await this.findUserById(userId);

        user.passwordSalt = utils.randomAsciiString(6);
        user.password = utils.bcryptHash(newPass + user.passwordSalt);
        user.passwordChangedAt = Date.now();
        user.passwordChangedByIp = ip;
        user.passwordChangedByUseragent = useragent;


        await this.usersCollection.updateOne(user);

    }

    public async findClientById(clientId: string): Promise<ClientModel> {

        var query = await this.clientsCollection.find({ clientId: clientId });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }

    public async getClientById(clientId: string): Promise<ClientModel> {

        var query = await this.clientsCollection.find({ clientId: clientId });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }

    public async findUserByEmail(email: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ email: email.toLowerCase() });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }

    public async findUserByMobile(mobile: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ mobile: mobile.toLowerCase() });

        if (query.length == 0)
            return undefined;
        else
            return query[0];


    }


    public async findUserByUsername(username: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ username: username.toLowerCase() });

        if (query.length == 0)
            return undefined;
        else
            return query[0];


    }

    public async findUserById(id: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ _id: id });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }


}
