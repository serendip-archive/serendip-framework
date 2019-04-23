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
const server_1 = require("../server");
const utils_1 = require("../utils");
const _ = require("underscore");
const http_1 = require("../http");
const AuthService_1 = require("./AuthService");
/**
 * /api/auth/(endpoint)
 */
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    var model = req.body;
                    if (!model.username || !model.password)
                        return next(new http_1.HttpError(400, "username or password missing"));
                    if (!model.email)
                        if (utils_1.Validator.isEmail(model.username))
                            model.email = model.username;
                    if (!model.mobile)
                        if (model.username.startsWith("+"))
                            if (utils_1.Validator.isNumeric(model.username.replace("+", "")))
                                model.mobile = model.username;
                    if (!utils_1.Validator.isLength(model.username, 6, 32))
                        return next(new http_1.HttpError(400, "username should be between 6 and 32 char length"));
                    if (!utils_1.Validator.isAlphanumeric(model.username))
                        return next(new http_1.HttpError(400, "username should be alphanumeric a-z and 0-9"));
                    if (model.email)
                        if (!utils_1.Validator.isEmail(model.email))
                            return next(new http_1.HttpError(400, "email not valid"));
                    if (!utils_1.Validator.isLength(model.password, 4, 32))
                        return next(new http_1.HttpError(400, "password should be between 4 and 32 char length"));
                    model.username = model.username.trim().toLowerCase();
                    next(model);
                },
                (req, res, next, done, model) => {
                    this.authService
                        .registerUser(model, req.ip(), req.useragent(), false)
                        .then(userModel => {
                        res.json(_.pick(userModel, "username"));
                    })
                        .catch(err => {
                        if (err.codeName == "DuplicateKey")
                            return next(new http_1.HttpError(400, "username already exists"));
                        if (err.message == "DuplicateEmail")
                            return next(new http_1.HttpError(400, "email already exists"));
                        if (err.message == "DuplicateMobile")
                            return next(new http_1.HttpError(400, "mobile already exists"));
                        if (server_1.Server.opts.logging != "silent")
                            console.log("User register => Error", err);
                        return next(new http_1.HttpError(500, err));
                    });
                }
            ]
        };
        this.sendResetPasswordToken = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (!req.body.email && !req.body.mobile)
                        return next(new http_1.HttpError(400, "email or mobile missing"));
                    if (req.body.email)
                        if (!utils_1.Validator.isEmail(req.body.email))
                            return next(new http_1.HttpError(400, "email not valid"));
                    var user = null;
                    if (req.body.email)
                        user = yield this.authService.findUserByEmail(req.body.email);
                    else
                        user = yield this.authService.findUserByMobile(req.body.mobile);
                    if (!user)
                        return next(new http_1.HttpError(400, "user not found"));
                    if (user.passwordResetTokenIssueAt)
                        if (Date.now() - user.passwordResetTokenIssueAt < 1000 * 60)
                            return next(new http_1.HttpError(400, "minimum interval between reset password request is 60 seconds"));
                    yield this.authService.sendPasswordResetToken(user._id, req.useragent().toString(), req.ip().toString());
                    done();
                })
            ]
        };
        this.addUserToGroup = {
            method: "post",
            publicAccess: false,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (req.user.groups.indexOf("admin") == -1)
                        return next(new http_1.HttpError(401, "admin access required"));
                    this.authService.addUserToGroup(req.body.user, req.body.group);
                    done(202, "added to group");
                })
            ]
        };
        this.deleteUserFromGroup = {
            method: "post",
            publicAccess: false,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (req.user.groups.indexOf("admin") == -1)
                        return next(new http_1.HttpError(401, "admin access required"));
                    this.authService.deleteUserFromGroup(req.body.user, req.body.group);
                    done(202, "removed from group");
                })
            ]
        };
        this.changePassword = {
            method: "post",
            publicAccess: false,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    var userId = req.user._id;
                    if (req.body.user)
                        if (req.user.groups.indexOf("admin") != -1)
                            userId = req.body.user;
                        else
                            return next(new http_1.HttpError(401, "admin access required"));
                    if (!req.body.password)
                        return next(new http_1.HttpError(400, "password is missing"));
                    if (req.body.password != req.body.passwordConfirm)
                        return next(new http_1.HttpError(400, "password and passwordConfirm do not match"));
                    yield this.authService.setNewPassword(userId, req.body.password, req.ip(), req.useragent());
                    done(202, "password changed");
                })
            ]
        };
        this.resetPassword = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (!req.body.code)
                        return next(new http_1.HttpError(400, "code is missing"));
                    if (!req.body.password)
                        return next(new http_1.HttpError(400, "password is missing"));
                    if (req.body.password != req.body.passwordConfirm)
                        return next(new http_1.HttpError(400, "password and passwordConfirm do not match"));
                    if (!req.body.email && !req.body.mobile)
                        return next(new http_1.HttpError(400, "email or mobile missing"));
                    if (req.body.email)
                        if (!utils_1.Validator.isEmail(req.body.email))
                            return next(new http_1.HttpError(400, "email not valid"));
                    var user = null;
                    if (req.body.email)
                        user = yield this.authService.findUserByEmail(req.body.email);
                    else
                        user = yield this.authService.findUserByMobile(req.body.mobile);
                    if (!user)
                        return next(new http_1.HttpError(400, "user not found"));
                    yield this.authService.setNewPassword(user._id, req.body.password, req.ip(), req.useragent());
                    done(202, "password changed");
                })
            ]
        };
        this.sendVerifyEmail = {
            publicAccess: true,
            method: "post",
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (!req.body.email)
                        return next(new http_1.HttpError(400, "email required"));
                    var user = yield this.authService.findUserByEmail(req.body.email);
                    if (!user)
                        return next(new http_1.HttpError(400, "no user found with this email"));
                    this.authService
                        .sendVerifyEmail(user)
                        .then(info => {
                        res.json(info);
                    })
                        .catch(e => {
                        res.json(e);
                    });
                })
            ]
        };
        this.sendVerifySms = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    if (!req.body.mobile)
                        return next(new http_1.HttpError(400, "mobile required"));
                    this.authService
                        .findUserByMobile(req.body.mobile)
                        .then(user => {
                        if (!user)
                            return next(new http_1.HttpError(400, "no user found with this mobile"));
                        this.authService
                            .sendVerifySms(user, req.useragent().toString(), req.ip().toString())
                            .then(() => {
                            done(200);
                        })
                            .catch(err => next(err));
                        // .then((info) => {
                        //     res.json(info);
                        // }).catch((e) => {
                        //     next(new HttpError(500, e.message));
                        // });
                    })
                        .catch(e => next(new http_1.HttpError(500, e.message)));
                }
            ]
        };
        this.verifyMobile = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    if (!req.body.mobile)
                        return next(new http_1.HttpError(400, "mobile required"));
                    if (!req.body.code)
                        return next(new http_1.HttpError(400, "code required"));
                    this.authService
                        .findUserByMobile(req.body.mobile)
                        .then(user => {
                        if (!user)
                            return next(new http_1.HttpError(400, "no user found with this mobile"));
                        if (user.mobileVerificationCode != req.body.code)
                            return next(new http_1.HttpError(400, "invalid code"));
                        this.authService
                            .VerifyUserMobile(req.body.mobile, req.body.code)
                            .then(() => {
                            done(202, "mobile verified");
                        })
                            .catch(e => next(e));
                    })
                        .catch(e => next(e));
                }
            ]
        };
        this.verifyEmail = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (!req.body.email)
                        return next(new http_1.HttpError(400, "email required"));
                    if (!req.body.code)
                        return next(new http_1.HttpError(400, "code required"));
                    var user = yield this.authService.findUserByEmail(req.body.email);
                    if (!user)
                        return next(new http_1.HttpError(400, "no user found with this email"));
                    yield this.authService.VerifyUserEmail(req.body.email, req.body.code);
                    done(202, "email verified");
                })
            ]
        };
        this.clientToken = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    var client = yield this.authService.findClientById(req.body.clientId);
                    if (!client)
                        return next(new http_1.HttpError(400, "client not found"));
                    if (!this.authService.clientMatchSecret(client, req.body.clientSecret))
                        return next(new http_1.HttpError(400, "client secret mismatch"));
                    this.authService
                        .insertToken({
                        useragent: req.useragent().toString(),
                        clientId: client._id.toString(),
                        grant_type: "client_credentials"
                    })
                        .then(token => {
                        res.json(token);
                    })
                        .catch(e => {
                        return next(new http_1.HttpError(500, e.message));
                    });
                })
            ]
        };
        this.refreshToken = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    var token = undefined;
                    try {
                        token = yield this.authService.findTokenByAccessToken(req.body.access_token);
                    }
                    catch (err) {
                        return next(new http_1.HttpError(err.code || 500, err.message));
                    }
                    if (token)
                        if (token.refresh_token == req.body.refresh_token)
                            this.authService
                                .insertToken({
                                userId: token.userId,
                                useragent: req.useragent().toString(),
                                grant_type: "password"
                            })
                                .then(token => {
                                return res.json(token);
                            })
                                .catch(e => {
                                return next(new http_1.HttpError(400, e.message));
                            });
                        else
                            return next(new http_1.HttpError(400, "refresh token invalid"));
                    else
                        return next(new http_1.HttpError(400, "access token invalid"));
                })
            ]
        };
        this.sessions = {
            method: "get",
            publicAccess: false,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    var model = yield this.authService.findTokensByUserId(req.user._id.toString());
                    res.json(model);
                })
            ]
        };
        this.checkToken = {
            method: "post",
            publicAccess: false,
            actions: [
                (req, res, next, done) => {
                    res.json(req.userToken);
                }
            ]
        };
        this.oneTimePassword = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    var mobile = req.body.mobile;
                    var mobileCountryCode = req.body.mobileCountryCode || "+98";
                    if (mobile)
                        mobile = parseInt(mobile.replace("/D/g", ""), 10).toString();
                    if (mobileCountryCode == "+98" && mobile.length != 10)
                        return done(400, "mobile invalid");
                    if (!mobile)
                        return done(400, "mobile required");
                    var user = yield this.authService.findUserByMobile(mobile, mobileCountryCode);
                    if (!user) {
                        user = yield this.authService.usersCollection.insertOne({
                            registeredAt: Date.now(),
                            mobile: mobile,
                            mobileCountryCode: mobileCountryCode,
                            mobileVerified: false,
                            username: mobileCountryCode + mobile,
                            registeredByIp: req.ip().toString(),
                            registeredByUseragent: req.useragent().toString(),
                            groups: []
                        });
                    }
                    this.authService
                        .sendOneTimePassword(user._id, req.useragent().toString(), req.ip().toString())
                        .then(() => done(200, "one-time password sent"))
                        .catch(e => {
                        console.log("error in sending one-time password", e);
                        done(500, e.message | e);
                    });
                })
            ]
        };
        this.newAuthCode = {
            method: "post",
            publicAccess: false,
            actions: [
                (req, res) => __awaiter(this, void 0, void 0, function* () {
                    console.log(req.headers);
                    res.json(yield this.authService.newAuthCode(req.userToken, (req.headers["clientid"] || '').toString(), req.body.redirectUri));
                })
            ]
        };
        this.token = {
            method: "post",
            publicAccess: true,
            actions: [
                (req, res, next) => {
                    if (!req.body.grant_type)
                        req.body.grant_type = "password";
                    next();
                },
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (req.body.grant_type != "authorization_code")
                        return next();
                    const code = req.body.code, codeId = req.body.codeId, clientId = req.headers["clientid"];
                    if (yield this.authService.authCodeValid(codeId, code)) {
                        const authCode = yield this.authService.findAuthCode((codeId));
                        if (authCode.clientId != clientId)
                            return done(400, 'auth code clientId invalid');
                        if (authCode.used)
                            return done(400, 'auth code has been used before');
                        yield this.authService.setAuthCodeUsed(codeId);
                        const token = yield this.authService.insertToken({
                            grant_type: 'authorization_code',
                            clientId: clientId,
                            userId: authCode.userId,
                            useragent: req.useragent().toString(),
                        });
                        res.json(token);
                    }
                    else
                        return done(400, 'auth code invalid');
                }),
                (req, res, next, done) => __awaiter(this, void 0, void 0, function* () {
                    if (req.body.grant_type != "password")
                        return next();
                    var user = null;
                    user = yield this.authService.findUserByUsername(req.body.username);
                    if (!user)
                        user = yield this.authService.findUserByEmail(req.body.username);
                    if (!user && req.body.mobile)
                        user = yield this.authService.findUserByMobile(parseInt(req.body.mobile).toString(), req.body.mobileCountryCode);
                    if (!user)
                        user = yield this.authService.findUserByMobile(parseInt(req.body.username).toString(), req.body.mobileCountryCode);
                    if (!user)
                        return next(new http_1.HttpError(400, "user/password invalid"));
                    var userMatchPassword = false;
                    if (req.body.password)
                        userMatchPassword = this.authService.userMatchPassword(user, req.body.password);
                    var userMatchOneTimePassword = false;
                    if (req.body.oneTimePassword)
                        userMatchOneTimePassword = this.authService.userMatchOneTimePassword(user, req.body.oneTimePassword);
                    if (user.twoFactorEnabled) {
                        if (!req.body.password)
                            return next(new http_1.HttpError(400, "include password"));
                        if (!userMatchPassword || !userMatchOneTimePassword)
                            return next(new http_1.HttpError(400, "user/password invalid"));
                    }
                    else {
                        if (!userMatchPassword && !userMatchOneTimePassword)
                            return next(new http_1.HttpError(400, "user/password invalid"));
                    }
                    if (userMatchOneTimePassword) {
                        user.mobileVerified = true;
                        yield this.authService.usersCollection.updateOne(user, user._id);
                    }
                    else {
                        if (AuthService_1.AuthService.options.mobileConfirmationRequired)
                            if (!user.mobileVerified)
                                return next(new http_1.HttpError(403, "mobile not confirmed"));
                        if (AuthService_1.AuthService.options.emailConfirmationRequired)
                            if (!user.emailVerified)
                                return next(new http_1.HttpError(403, "email not confirmed"));
                    }
                    var userToken = yield this.authService.insertToken({
                        userId: user._id.toString(),
                        useragent: req.useragent(),
                        grant_type: !userMatchOneTimePassword ? "password" : "one-time"
                    });
                    userToken.username = user.username;
                    res.json(userToken);
                })
            ]
        };
    }
}
exports.AuthController = AuthController;
