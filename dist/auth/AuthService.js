"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const core_1 = require("../core");
const utils = require("../utils");
const models_1 = require("./models");
const _ = require("underscore");
class AuthService {
    constructor() {
        this.dbService = core_1.Server.services["DbService"];
        this.emailService = core_1.Server.services["EmailService"];
    }
    static configure(options) {
        AuthService.options = _.extend(AuthService.options, options);
        if (options.smsProvider)
            AuthService.dependencies.push(options.smsProvider);
    }
    async start() {
        this.clientsCollection = await this.dbService.collection("Clients");
        this.usersCollection = await this.dbService.collection("Users");
        this.tokenCollection = await this.dbService.collection("Tokens");
        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
        //   this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});
        this.restrictionCollection = await this.dbService.collection("Restrictions");
        await this.refreshRestrictions();
    }
    sendVerifyEmail(userModel) {
        return this.emailService.send({
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
                name: "verify_email"
            }
        });
    }
    sendVerifySms(userModel, useragent, ip) {
        if (AuthService.options.smsProvider)
            return new Promise((resolve, reject) => {
                core_1.Server.services[AuthService.options.smsProvider]
                    .sendVerification(userModel.mobile, userModel.mobileVerificationCode, useragent, ip)
                    .then(body => resolve(body))
                    .catch(err => reject(new core_1.ServerError(500, err)));
            });
        else
            throw new core_1.ServerError(500, "no sms provider");
    }
    async refreshRestrictions() {
        this.restrictions = await this.restrictionCollection.find({});
    }
    async authorizeRequest(req, controllerName, endpoint, publicAccess) {
        if (publicAccess)
            return true;
        if (!req.headers.authorization && !req.body.access_token)
            throw new core_1.ServerError(401, "access_token not found in body and authorization header");
        var access_token;
        if (req.body.access_token)
            access_token = req.body.access_token;
        else
            access_token = req.headers.authorization.toString().split(" ")[1];
        var userToken;
        var user;
        try {
            userToken = req.userToken = await this.findTokenByAccessToken(access_token);
            user = req.user = await this.findUserById(userToken.userId);
        }
        catch (error) {
            throw error;
        }
        if (!user.groups)
            user.groups = [];
        if (user.groups.indexOf("blocked") != -1)
            throw new core_1.ServerError(401, "user access is blocked");
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
                if (rule.allowAll &&
                    rule.groups.length != _.difference(rule.groups, user.groups).length)
                    if (rule.users.indexOf(user._id) == -1)
                        throw new core_1.ServerError(401, "user group access is denied");
                if (!rule.allowAll &&
                    rule.groups.length == _.difference(rule.groups, user.groups).length)
                    if (rule.users.indexOf(user._id) == -1)
                        throw new core_1.ServerError(401, "user group access is denied");
            }
        });
    }
    async changeUserMobile(userId, newMobile) {
        var user = await this.findUserById(userId);
        user.mobile = newMobile;
        user.mobileVerified = false;
        user.mobileVerificationCode = utils.randomNumberString(6).toLowerCase();
        await this.usersCollection.updateOne(user);
    }
    async VerifyUserMobile(mobile, code) {
        var user = await this.findUserByMobile(mobile);
        user.mobileVerified = user.mobileVerificationCode == code;
        await this.usersCollection.updateOne(user);
    }
    async VerifyUserEmail(email, code) {
        var user = await this.findUserByEmail(email);
        user.emailVerified = user.emailVerificationCode == code;
        await this.usersCollection.updateOne(user);
    }
    async registerUser(model, ip, useragent, confirmed) {
        if (model.username)
            model.username = model.username.toLowerCase();
        if (model.mobile)
            model.mobile = parseInt(model.mobile).toString();
        if (model.mobileCountryCode)
            model.mobileCountryCode = parseInt(model.mobileCountryCode).toString();
        if (model.email)
            model.email = model.email.toLowerCase();
        var userModel = new models_1.UserModel();
        if (model.extra)
            userModel.extra = model.extra;
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
        if (!confirmed) {
            try {
                if (userModel.email)
                    this.sendVerifyEmail(userModel);
            }
            catch (error) {
                if (core_1.Server.opts.logging != "silent")
                    console.log("error in register email verification send", error);
            }
            try {
                if (userModel.mobile)
                    this.sendVerifySms(userModel, useragent, ip);
            }
            catch (error) {
                if (core_1.Server.opts.logging != "silent")
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
    userMatchPassword(user, password) {
        return utils.bcryptCompare(password + user.passwordSalt, user.password);
    }
    userMatchOneTimePassword(user, oneTimePassword) {
        return utils.bcryptCompare(oneTimePassword + user.oneTimePasswordSalt, user.oneTimePassword);
    }
    clientMatchSecret(client, secret) {
        return utils.bcryptCompare(secret + client.secretSalt, client.secret);
    }
    async findTokenByAccessToken(access_token) {
        var tokenQuery = await this.tokenCollection.find({
            access_token: access_token
        });
        if (tokenQuery.length != 1)
            throw new core_1.ServerError(401, "access_token invalid");
        else {
            return tokenQuery[0];
        }
    }
    async findTokensByUserId(userId) {
        return this.tokenCollection.find({ userId: userId });
    }
    async findTokensByClientId(clientId) {
        return this.tokenCollection.find({ clientId: clientId });
    }
    async deleteUserTokens(userId) {
        return Promise.all(_.map(await this.findTokensByUserId(userId), (item) => {
            return this.tokenCollection.deleteOne(item._id);
        }));
    }
    async deleteClientTokens(clientId) {
        return Promise.all(_.map(await this.findTokensByClientId(clientId), (item) => {
            return this.tokenCollection.deleteOne(item._id);
        }));
    }
    async addUserToGroup(userId, group) {
        var user = await this.findUserById(userId);
        if (user.groups.indexOf(group) == -1)
            user.groups.push(group);
        await this.deleteUserTokens(userId);
        await this.usersCollection.updateOne(user);
    }
    async deleteUserFromGroup(userId, group) {
        var user = await this.findUserById(userId);
        if (user.groups.indexOf(group) != -1)
            user.groups = _.filter(user.groups, (item) => {
                return item != group;
            });
        // User need to do login again
        await this.deleteUserTokens(userId);
        await this.usersCollection.updateOne(user);
    }
    async getUsersInGroup(group) {
        var users = await this.usersCollection.find({
            groups: {
                $elemMatch: { $eq: group }
            }
        });
        return users;
    }
    async insertToken(opts) {
        var newToken = {
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
            }
            else {
                throw new Error("user not found");
            }
        }
        var model = await this.tokenCollection.insertOne(newToken);
        return model;
    }
    async sendOneTimePassword(userId, useragent, ip) {
        var user = await this.findUserById(userId);
        var code = utils.randomNumberString(6).toLowerCase();
        user.oneTimePasswordSalt = utils.randomAsciiString(6);
        user.oneTimePasswordResetAt = Date.now();
        user.oneTimePassword = utils.bcryptHash(code + user.oneTimePasswordSalt);
        await this.usersCollection.updateOne(user);
        if (user.mobile)
            if (AuthService.options.smsProvider)
                return core_1.Server.services[AuthService.options.smsProvider].sendAuthCode(user.mobile, code, useragent, ip);
            else
                throw new Error("no sms provider");
    }
    async sendPasswordResetToken(userId, useragent, ip) {
        var user = await this.findUserById(userId);
        user.passwordResetToken = utils.randomNumberString(6).toLowerCase();
        user.passwordResetTokenExpireAt =
            Date.now() + AuthService.options.tokenExpireIn;
        user.passwordResetTokenIssueAt = Date.now();
        await this.usersCollection.updateOne(user);
        if (user.mobile)
            if (AuthService.options.smsProvider)
                return core_1.Server.services[AuthService.options.smsProvider].sendAuthCode(user.mobile, user.passwordResetToken, useragent, ip);
            else
                throw new Error("no sms provider");
    }
    async setNewPassword(userId, newPass, ip, useragent) {
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
    async setClientSecret(clientId, newSecret) {
        var clientQuery = await this.clientsCollection.find({
            _id: new mongodb_1.ObjectId(clientId)
        });
        if (!clientQuery[0])
            throw new Error("client not found");
        var client = clientQuery[0];
        client.secretSalt = utils.randomAsciiString(6);
        client.secret = utils.bcryptHash(newSecret + client.secretSalt);
        // terminate current sessions
        await this.deleteClientTokens(client._id);
        await this.clientsCollection.updateOne(client);
    }
    async findClientById(clientId) {
        var query = await this.clientsCollection.find({
            _id: new mongodb_1.ObjectId(clientId)
        });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserByEmail(email) {
        if (!email)
            return undefined;
        var query = await this.usersCollection.find({ email: email.toLowerCase() });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserByMobile(mobile) {
        if (!mobile)
            return undefined;
        var query = await this.usersCollection
            .aggregate([])
            .match({
            $or: [
                {
                    mobile: mobile
                },
                {
                    mobile: "0" + mobile
                }
            ]
        })
            .toArray();
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserByUsername(username) {
        if (username)
            username = username.toLowerCase();
        else
            return undefined;
        var query = await this.usersCollection.find({
            username: username
        });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserById(id) {
        var query = await this.usersCollection.find({ _id: new mongodb_1.ObjectId(id) });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
}
AuthService.options = {
    tokenExpireIn: 1000 * 60 * 60 * 2
};
AuthService.dependencies = ["DbService", "EmailService"];
exports.AuthService = AuthService;
