"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const utils = require("../utils");
const models_1 = require("./models");
const _ = require("underscore");
class AuthService {
    async start() {
        this._dbService = core_1.Server.services["DbService"];
        this.usersCollection = await this._dbService.collection("Users");
        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
        this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});
        this.restrictionCollection = await this._dbService.collection("Restrictions");
        await this.refreshRestrictions();
    }
    async refreshRestrictions() {
        this.restrictions = await this.restrictionCollection.find({});
    }
    async authorizeRequest(req, controllerName, endpoint) {
        if (controllerName == "AuthController")
            return true;
        if (!req.headers.authorization && !req.body.access_token)
            throw new Error("access_token not found in body and authorization header");
        var access_token;
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
    async registerUser(model, ip, useragent) {
        var userModel = new models_1.UserModel();
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
    userMatchPassword(user, password) {
        return utils.bcryptCompare(password + user.passwordSalt, user.password);
    }
    async checkToken(access_token) {
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
    async getNewToken(userId, useragent, client) {
        var user = await this.findUserById(userId);
        var userToken = {
            access_token: utils.randomAccessToken(),
            grant_type: 'password',
            useragent: useragent,
            client: client,
            expires_at: Date.now() + 1000 * 60 * 60 * 2,
            expires_in: +1000 * 60 * 60 * 2,
            refresh_token: utils.randomAccessToken(),
            token_type: 'bearer'
        };
        if (!user.tokens)
            user.tokens = [];
        user.tokens.push(userToken);
        await this.usersCollection.updateOne(user);
        return userToken;
    }
    async getNewPasswordResetToken(userId) {
        var user = await this.findUserById(userId);
        user.passwordResetToken = utils.randomAsciiString(8).toLowerCase();
        // token will expire in 2 hours
        user.passwordResetTokenExpireAt = Date.now() + 1000 * 60 * 60 * 2;
        user.passwordResetTokenIssueAt = Date.now();
        await this.usersCollection.updateOne(user);
        return user.passwordResetToken;
    }
    async setNewPassword(userId, newPass, ip, useragent) {
        var user = await this.findUserById(userId);
        user.passwordSalt = utils.randomAsciiString(6);
        user.password = utils.bcryptHash(newPass + user.passwordSalt);
        user.passwordChangedAt = Date.now();
        user.passwordChangedByIp = ip;
        user.passwordChangedByUseragent = useragent;
        return await this.usersCollection.updateOne(user);
    }
    async findUserByEmail(email) {
        var query = await this.usersCollection.find({ email: email });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserByMobile(mobile) {
        var query = await this.usersCollection.find({ mobile: mobile });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserByUsername(username) {
        var query = await this.usersCollection.find({ username: username });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
    async findUserById(id) {
        var query = await this.usersCollection.find({ _id: id });
        if (query.length == 0)
            return undefined;
        else
            return query[0];
    }
}
AuthService.dependencies = ["DbService", "EmailService", "SmsService"];
exports.AuthService = AuthService;
