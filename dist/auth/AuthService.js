"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("serendip-utility");
const _ = require("underscore");
const events_1 = require("events");
const http_1 = require("../http");
const chalk_1 = require("chalk");
const bcrypt = require("bcryptjs");
const serendip_business_model_1 = require("serendip-business-model");
const server_1 = require("../server");
class AuthService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    static configure(options) {
        AuthService.options = _.extend(AuthService.options, options);
        if (options.smsProvider)
            AuthService.dependencies.push(options.smsProvider);
        if (options.emailProvider)
            AuthService.dependencies.push(options.emailProvider);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.dbService);
            this.clientsCollection = yield this.dbService.collection("Clients", true);
            this.tokenCollection = yield this.dbService.collection("Tokens", true);
            this.usersCollection = yield this.dbService.collection("Users", true);
            this.usersCollection.ensureIndex({ username: 1 }, { unique: true });
            this.usersCollection.ensureIndex({ mobile: 1 }, {});
            this.usersCollection.ensureIndex({ email: 1 }, {});
            this.authCodesCollection = yield this.dbService.collection("AuthCodes", true);
            //   this.usersCollection.createIndex({ "tokens.access_token": 1 }, {});
            this.restrictionCollection = yield this.dbService.collection("Restrictions");
            console.log(chalk_1.default.gray(`\tAuthService > users: ${yield this.usersCollection.count()}`));
            yield this.refreshRestrictions();
        });
    }
    sendVerifyEmail(userModel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!AuthService.options.emailProvider)
                throw new http_1.HttpError(500, "no email provider");
            return server_1.Server.services[AuthService.options.emailProvider]
                .send({
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
            })
                .then(r => AuthService.events.emit("sendVerifyEmail", r, null))
                .catch(e => AuthService.events.emit("sendVerifyEmail", null, e));
        });
    }
    sendVerifySms(userModel, useragent, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!AuthService.options.smsProvider)
                throw new http_1.HttpError(500, "no sms provider");
            return new Promise((resolve, reject) => {
                server_1.Server.services[AuthService.options.smsProvider]
                    .sendVerification(userModel.mobile, userModel.mobileVerificationCode, useragent, ip)
                    .then(body => resolve(body))
                    .catch(err => reject(new http_1.HttpError(500, err)));
            })
                .then(r => AuthService.events.emit("sendVerifySms", r, null))
                .catch(e => AuthService.events.emit("sendVerifySms", null, e));
        });
    }
    refreshRestrictions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.restrictions = yield this.restrictionCollection.find({});
        });
    }
    authorizeRequest(req, controllerName, endpoint, publicAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            if (publicAccess)
                return true;
            if (!req.headers.authorization && !req.body.access_token)
                throw new http_1.HttpError(401, "access_token not found in body and authorization header");
            let access_token;
            if (!access_token && req.headers && req.headers.authorization && req.headers.authorization.split(' ').length > 0)
                access_token = req.headers.authorization.toString().split(" ")[1];
            if (!access_token && req.query && req.query.access_token)
                access_token = req.query.access_token;
            if (!access_token && req.body && req.body.access_token)
                access_token = req.body.access_token;
            let userToken;
            let user;
            try {
                userToken = req.userToken = yield this.findTokenByAccessToken(access_token);
                user = req.user = yield this.findUserById(userToken.userId);
            }
            catch (error) {
                throw error;
            }
            if (userToken.expires_at < Date.now())
                throw new http_1.HttpError(401, "token expired");
            if (!user)
                throw new http_1.HttpError(401, "user deleted");
            if (!user.groups)
                user.groups = [];
            if (user.groups.indexOf("blocked") != -1)
                throw new http_1.HttpError(401, "user access is blocked");
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
                            throw new http_1.HttpError(401, "user group access is denied");
                    if (!rule.allowAll &&
                        rule.groups.length == _.difference(rule.groups, user.groups).length)
                        if (rule.users.indexOf(user._id) == -1)
                            throw new http_1.HttpError(401, "user group access is denied");
                }
            });
        });
    }
    changeUserMobile(userId, newMobile) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            user.mobile = newMobile;
            user.mobileVerified = false;
            user.mobileVerificationCode = utils.text
                .randomNumberString(6)
                .toLowerCase();
            yield this.usersCollection.updateOne(user);
        });
    }
    VerifyUserMobile(mobile, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserByMobile(mobile);
            user.mobileVerified = user.mobileVerificationCode == code;
            yield this.usersCollection.updateOne(user);
        });
    }
    VerifyUserEmail(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserByEmail(email);
            user.emailVerified = user.emailVerificationCode == code;
            yield this.usersCollection.updateOne(user);
        });
    }
    registerUser(model, ip, useragent, confirmed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (model.username)
                model.username = model.username.toLowerCase();
            if (model.mobile)
                model.mobile = parseInt(model.mobile).toString();
            if (model.mobileCountryCode)
                model.mobileCountryCode = parseInt(model.mobileCountryCode).toString();
            if (model.email)
                model.email = model.email.toLowerCase();
            var userModel = new serendip_business_model_1.UserModel();
            if (model.extra)
                userModel.extra = model.extra;
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
                var userByEmail = yield this.findUserByEmail(userModel.email);
                if (userByEmail)
                    throw new Error("DuplicateEmail");
            }
            if (userModel.mobile) {
                var userByMobile = yield this.findUserByMobile(userModel.mobile);
                if (userByMobile)
                    throw new Error("DuplicateMobile");
            }
            var registeredUser = yield this.usersCollection.insertOne(userModel);
            yield this.setNewPassword(registeredUser._id, model.password, ip, useragent);
            if (!confirmed) {
                try {
                    if (userModel.email)
                        this.sendVerifyEmail(userModel);
                }
                catch (error) {
                    if (server_1.Server.opts.logging != "silent")
                        console.log("error in register email verification send", error);
                }
                try {
                    if (userModel.mobile)
                        this.sendVerifySms(userModel, useragent, ip);
                }
                catch (error) {
                    if (server_1.Server.opts.logging != "silent")
                        console.log("error in register sms verification send", error);
                }
            }
            return registeredUser;
        });
    }
    resetMobileVerifyCode(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            user.mobileVerificationCode = utils.text
                .randomNumberString(6)
                .toLowerCase();
            user.mobileVerified = false;
            yield this.usersCollection.updateOne(user, userId);
        });
    }
    userMatchPassword(user, password) {
        if (!password || !user.password || !user.passwordSalt)
            return false;
        return bcrypt.compareSync(password + user.passwordSalt, user.password);
    }
    newAuthCode(token, clientId, redirectUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let authCode = {
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
            authCode = yield this.authCodesCollection.insertOne(authCode);
            return {
                code,
                _id: authCode._id
            };
        });
    }
    setAuthCodeUsed(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                throw new Error('no _id provided');
            }
            const authCodeQuery = yield this.authCodesCollection.find({
                _id
            });
            if (!authCodeQuery[0])
                throw new Error('auth code related to this codeId not found');
            const authCode = authCodeQuery[0];
            authCode.used = Date.now();
            yield this.authCodesCollection.updateOne(authCode);
        });
    }
    authCodeValid(_id, code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id || !code)
                return false;
            const authCodeQuery = yield this.authCodesCollection.find({
                _id
            });
            if (!authCodeQuery[0])
                return false;
            const authCode = authCodeQuery[0];
            return bcrypt.compareSync(code + authCode.codeSalt, authCode.codeHash);
        });
    }
    findAuthCode(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const authCodeQuery = yield this.authCodesCollection.find({
                _id
            });
            return authCodeQuery[0];
        });
    }
    userMatchOneTimePassword(user, oneTimePassword) {
        if (!oneTimePassword || !user.oneTimePassword || !user.oneTimePasswordSalt)
            return;
        return bcrypt.compareSync(oneTimePassword + user.oneTimePasswordSalt, user.oneTimePassword);
    }
    clientMatchSecret(client, secret) {
        if (!secret)
            return false;
        return bcrypt.compareSync(secret + client.secretSalt, client.secret);
    }
    findTokenByAccessToken(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            var tokenQuery = yield this.tokenCollection.find({
                access_token: access_token
            });
            if (tokenQuery.length != 1)
                throw new http_1.HttpError(401, "access_token invalid");
            else {
                return tokenQuery[0];
            }
        });
    }
    findTokensByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenCollection.find({ userId: userId });
        });
    }
    findTokensByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenCollection.find({ clientId: clientId });
        });
    }
    deleteUserTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(_.map(yield this.findTokensByUserId(userId), (item) => {
                return this.tokenCollection.deleteOne(item._id);
            }));
        });
    }
    deleteClientTokens(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(_.map(yield this.findTokensByClientId(clientId), (item) => {
                return this.tokenCollection.deleteOne(item._id);
            }));
        });
    }
    addUserToGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            if (user.groups.indexOf(group) == -1)
                user.groups.push(group);
            yield this.deleteUserTokens(userId);
            yield this.usersCollection.updateOne(user);
        });
    }
    deleteUserFromGroup(userId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            if (user.groups.indexOf(group) != -1)
                user.groups = _.filter(user.groups, (item) => {
                    return item != group;
                });
            // User need to do login again
            yield this.deleteUserTokens(userId);
            yield this.usersCollection.updateOne(user);
        });
    }
    getUsersInGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            var users = yield this.usersCollection.find({
                groups: {
                    $elemMatch: { $eq: group }
                }
            });
            return users;
        });
    }
    insertToken(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var newToken = {
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
                var user = yield this.findUserById(opts.userId);
                if (user) {
                    newToken.username = user.username;
                    newToken.groups = user.groups;
                }
                else {
                    throw new Error("user not found");
                }
            }
            var model = yield this.tokenCollection.insertOne(newToken);
            return model;
        });
    }
    sendOneTimePassword(userId, useragent, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            var code = utils.text.randomNumberString(6).toLowerCase();
            user.oneTimePasswordSalt = utils.text.randomAsciiString(6);
            user.oneTimePasswordResetAt = Date.now();
            user.oneTimePassword = bcrypt.hashSync(code + user.oneTimePasswordSalt, 6);
            yield this.usersCollection.updateOne(user);
            if (user.mobile)
                if (AuthService.options.smsProvider)
                    return server_1.Server.services[AuthService.options.smsProvider].sendAuthCode(user.mobile, code, useragent, ip);
                else
                    throw new Error("no sms provider");
        });
    }
    sendPasswordResetToken(userId, useragent, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            user.passwordResetToken = utils.text.randomNumberString(6).toLowerCase();
            user.passwordResetTokenExpireAt =
                Date.now() + AuthService.options.tokenExpireIn;
            user.passwordResetTokenIssueAt = Date.now();
            yield this.usersCollection.updateOne(user);
            if (user.mobile)
                if (AuthService.options.smsProvider)
                    return server_1.Server.services[AuthService.options.smsProvider].sendAuthCode(user.mobile, user.passwordResetToken, useragent, ip);
                else
                    throw new Error("no sms provider");
        });
    }
    setNewPassword(userId, newPass, ip, useragent) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.findUserById(userId);
            user.passwordSalt = utils.text.randomAsciiString(6);
            user.password = bcrypt.hashSync(newPass + user.passwordSalt, 6);
            user.passwordChangedAt = Date.now();
            user.passwordChangedByIp = ip;
            user.passwordChangedByUseragent = useragent ? useragent.toString() : "";
            // terminate current sessions
            yield this.deleteUserTokens(userId);
            yield this.usersCollection.updateOne(user);
        });
    }
    setClientSecret(clientId, newSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            var clientQuery = yield this.clientsCollection.find({
                _id: clientId
            });
            if (!clientQuery[0])
                throw new Error("client not found");
            var client = clientQuery[0];
            client.secretSalt = utils.text.randomAsciiString(6);
            client.secret = bcrypt.hashSync(newSecret + client.secretSalt, 6);
            // terminate current sessions
            yield this.deleteClientTokens(client._id);
            yield this.clientsCollection.updateOne(client);
        });
    }
    findClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = yield this.clientsCollection.find({
                _id: clientId
            });
            if (query.length == 0)
                return undefined;
            else
                return query[0];
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email)
                return undefined;
            var query = yield this.usersCollection.find({ email: email.toLowerCase() });
            if (query.length == 0)
                return undefined;
            else
                return query[0];
        });
    }
    findUserByMobile(mobile, mobileCountryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mobile)
                return undefined;
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
                        mobileCountryCode: mobileCountryCode ||
                            AuthService.options.defaultMobileCountryCode ||
                            "+98"
                    }
                ]
            };
            var query = yield this.usersCollection.find(match);
            if (query.length == 0)
                return undefined;
            else
                return query[0];
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username)
                username = username.toLowerCase();
            else
                return undefined;
            var query = yield this.usersCollection.find({
                username: username
            });
            if (query.length == 0)
                return undefined;
            else
                return query[0];
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = yield this.usersCollection.find({ _id: id });
            if (query.length == 0)
                return undefined;
            else
                return query[0];
        });
    }
}
AuthService.options = {
    tokenExpireIn: 1000 * 60 * 60 * 2
};
AuthService.dependencies = ['DbService'];
AuthService.events = new events_1.EventEmitter();
exports.AuthService = AuthService;
