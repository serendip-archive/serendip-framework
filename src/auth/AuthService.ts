import { Collection, ObjectID } from "mongodb";
import { ServerServiceInterface, Server, ServerRequestInterface } from "../core";
import * as utils from "../utils";
import { DbService, DbCollection } from "../db";
import { UserModel, UserTokenModel, RestrictionModel } from "./models";
import { UserRegisterRequestInterface, AccessTokenRequestInterface } from "./interfaces";
import * as _ from 'underscore';


export class AuthService implements ServerServiceInterface {


    static dependencies = ["DbService", "EmailService", "SmsService"];

    private _dbService: DbService;
    private usersCollection: DbCollection<UserModel>;
    private restrictionCollection: DbCollection<RestrictionModel>;

    private restrictions: RestrictionModel[];

    async start() {

        this._dbService = Server.services["DbService"];

        this.usersCollection = await this._dbService.collection<UserModel>("Users");

        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
        this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});


        this.restrictionCollection = await this._dbService.collection<RestrictionModel>("Restrictions");

        await this.refreshRestrictions();

    }


    public async refreshRestrictions() {

        this.restrictions = await this.restrictionCollection.find({});

    }


    public async authorizeRequest(req: ServerRequestInterface, controllerName, endpoint) {

        if (controllerName == "AuthController")
            return true;


        if (!req.headers.authorization && !req.body.access_token)
            throw new Error("access_token not found in body and authorization header");

        var access_token: string;

        if (req.body.access_token)
            access_token = req.body.access_token;
        else {
            // var encoded = req.headers.authorization.toString().split(' ')[1];
            // access_token = new Buffer(encoded, 'base64').toString('utf8');
            access_token = req.headers.authorization.toString().split(' ')[1];
        }

        var userToken = await this.checkToken(access_token);
        var user = await this.findUserById(userToken.userId);

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


        var globalRule = _.findWhere(this.restrictions, { controllerName: '', endpoint: '' });
        if (globalRule) {

            // if (globalRule.allowAll && globalRule.users.indexOf(user._id) != -1)
            //     throw new Error("user access is denied");
            // else
            //     if (globalRule.users.indexOf(user._id) == -1)
            //         throw new Error("user access is denied");


            if (globalRule.allowAll && globalRule.groups.length != _.difference(globalRule.groups, user.groups).length)
                if (globalRule.users.indexOf(user._id) == -1)
                    throw new Error("user group access is denied");


            if (!globalRule.allowAll && globalRule.groups.length == _.difference(globalRule.groups, user.groups).length)
                if (globalRule.users.indexOf(user._id) == -1)
                    throw new Error("user group access is denied");

        }


    }

    public async registerUser(model: UserRegisterRequestInterface, ip?, useragent?): Promise<UserModel> {

        var userModel = new UserModel();


        userModel.username = model.username;

        userModel.registeredAt = Date.now();
        userModel.registeredByIp = ip;
        userModel.registeredByUseragent = useragent;


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

        return await this.setNewPassword(registeredUser._id, model.password, ip, useragent);


    }

    public userMatchPassword(user: UserModel, password: string): boolean {

        return utils.bcryptCompare(password + user.passwordSalt, user.password);

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
            expires_at: Date.now() + 1000 * 60 * 60 * 2,
            expires_in: + 1000 * 60 * 60 * 2,
            refresh_token: utils.randomAccessToken(),
            token_type: 'bearer'
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

        // token will expire in 2 hours
        user.passwordResetTokenExpireAt = Date.now() + 1000 * 60 * 60 * 2;

        user.passwordResetTokenIssueAt = Date.now();


        await this.usersCollection.updateOne(user);

        return user.passwordResetToken;

    }

    public async setNewPassword(userId, newPass, ip?: string, useragent?: string): Promise<UserModel> {


        var user = await this.findUserById(userId);

        user.passwordSalt = utils.randomAsciiString(6);
        user.password = utils.bcryptHash(newPass + user.passwordSalt);
        user.passwordChangedAt = Date.now();
        user.passwordChangedByIp = ip;
        user.passwordChangedByUseragent = useragent;


        return await this.usersCollection.updateOne(user);

    }

    public async findUserByEmail(email: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ email: email });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }

    public async findUserByMobile(mobile: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ mobile: mobile });

        if (query.length == 0)
            return undefined;
        else
            return query[0];


    }


    public async findUserByUsername(username: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ username: username });

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
