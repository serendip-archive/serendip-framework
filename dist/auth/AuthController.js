"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const utils_1 = require("../utils");
const _1 = require(".");
const _ = require("underscore");
/**
 * /api/auth/(endpoint)
*/
class AuthController {
    constructor() {
        this.register = {
            method: 'post',
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    var model = req.body;
                    if (!model.username || !model.password)
                        return next(new core_1.ServerError(400, 'username or password missing'));
                    if (!model.email)
                        if (utils_1.Validator.isEmail(model.username))
                            model.email = model.username;
                    if (!model.mobile)
                        if (model.username.startsWith('+'))
                            if (utils_1.Validator.isNumeric(model.username.replace('+', '')))
                                model.mobile = model.username;
                    if (!utils_1.Validator.isLength(model.username, 6, 32))
                        return next(new core_1.ServerError(400, 'username should be between 6 and 32 char length'));
                    if (!utils_1.Validator.isAlphanumeric(model.username))
                        return next(new core_1.ServerError(400, 'username should be alphanumeric a-z and 0-9'));
                    if (model.email)
                        if (!utils_1.Validator.isEmail(model.email))
                            return next(new core_1.ServerError(400, 'email not valid'));
                    if (!utils_1.Validator.isLength(model.password, 4, 32))
                        return next(new core_1.ServerError(400, 'password should be between 4 and 32 char length'));
                    model.username = model.username.trim().toLowerCase();
                    next(model);
                },
                (req, res, next, done, model) => {
                    this.authService.registerUser(model, req.ip(), req.useragent(), false).then((userModel) => {
                        res.json(_.pick(userModel, 'username'));
                    }).catch((err) => {
                        if (err.codeName == "DuplicateKey")
                            return next(new core_1.ServerError(400, 'username already exists'));
                        if (err.message == "DuplicateEmail")
                            return next(new core_1.ServerError(400, 'email already exists'));
                        if (err.message == "DuplicateMobile")
                            return next(new core_1.ServerError(400, 'mobile already exists'));
                        console.log('User register => Error', err);
                        return next(new core_1.ServerError(500, err));
                    });
                }
            ]
        };
        this.sendResetPasswordToken = {
            method: 'post',
            publicAccess: true,
            actions: [
                async (req, res, next, done) => {
                    if (!req.body.email && !req.body.mobile)
                        return next(new core_1.ServerError(400, 'email or mobile missing'));
                    if (req.body.email)
                        if (!utils_1.Validator.isEmail(req.body.email))
                            return next(new core_1.ServerError(400, 'email not valid'));
                    var user = null;
                    if (req.body.email)
                        user = await this.authService.findUserByEmail(req.body.email);
                    else
                        user = await this.authService.findUserByMobile(req.body.mobile);
                    if (!user)
                        return next(new core_1.ServerError(400, 'user not found'));
                    if (user.passwordResetTokenIssueAt)
                        if (Date.now() - user.passwordResetTokenIssueAt < 1000 * 60)
                            return next(new core_1.ServerError(400, 'minimum interval between reset password request is 60 seconds'));
                    await this.authService.sendPasswordResetToken(user._id);
                    done();
                }
            ]
        };
        this.addUserToGroup = {
            method: 'post',
            publicAccess: false,
            actions: [
                async (req, res, next, done) => {
                    if (req.user.groups.indexOf('admin') == -1)
                        return next(new core_1.ServerError(401, 'admin access required'));
                    this.authService.addUserToGroup(req.body.user, req.body.group);
                    done(202, "added to group");
                }
            ]
        };
        this.deleteUserFromGroup = {
            method: 'post',
            publicAccess: false,
            actions: [
                async (req, res, next, done) => {
                    if (req.user.groups.indexOf('admin') == -1)
                        return next(new core_1.ServerError(401, 'admin access required'));
                    this.authService.deleteUserFromGroup(req.body.user, req.body.group);
                    done(202, "removed from group");
                }
            ]
        };
        this.changePassword = {
            method: 'post',
            publicAccess: false,
            actions: [
                async (req, res, next, done) => {
                    var userId = req.user._id;
                    if (req.body.user)
                        if (req.user.groups.indexOf("admin") != -1)
                            userId = req.body.user;
                        else
                            return next(new core_1.ServerError(401, 'admin access required'));
                    if (!req.body.password)
                        return next(new core_1.ServerError(400, 'password is missing'));
                    if (req.body.password != req.body.passwordConfirm)
                        return next(new core_1.ServerError(400, 'password and passwordConfirm do not match'));
                    await this.authService.setNewPassword(userId, req.body.password, req.ip(), req.useragent());
                    done(202, "password changed");
                }
            ]
        };
        this.resetPassword = {
            method: 'post',
            publicAccess: true,
            actions: [
                async (req, res, next, done) => {
                    if (!req.body.code)
                        return next(new core_1.ServerError(400, 'code is missing'));
                    if (!req.body.password)
                        return next(new core_1.ServerError(400, 'password is missing'));
                    if (req.body.password != req.body.passwordConfirm)
                        return next(new core_1.ServerError(400, 'password and passwordConfirm do not match'));
                    if (!req.body.email && !req.body.mobile)
                        return next(new core_1.ServerError(400, 'email or mobile missing'));
                    if (req.body.email)
                        if (!utils_1.Validator.isEmail(req.body.email))
                            return next(new core_1.ServerError(400, 'email not valid'));
                    var user = null;
                    if (req.body.email)
                        user = await this.authService.findUserByEmail(req.body.email);
                    else
                        user = await this.authService.findUserByMobile(req.body.mobile);
                    if (!user)
                        return next(new core_1.ServerError(400, 'user not found'));
                    await this.authService.setNewPassword(user._id, req.body.password, req.ip(), req.useragent());
                    done(202, "password changed");
                }
            ]
        };
        this.sendVerifyEmail = {
            publicAccess: true,
            method: 'post',
            actions: [
                async (req, res, next, done) => {
                    if (!req.body.email)
                        return next(new core_1.ServerError(400, 'email required'));
                    var user = await this.authService.findUserByEmail(req.body.email);
                    if (!user)
                        return next(new core_1.ServerError(400, 'no user found with this email'));
                    this.authService.sendVerifyEmail(user).then((info) => {
                        res.json(info);
                    }).catch((e) => {
                        res.json(e);
                    });
                }
            ]
        };
        this.sendVerifySms = {
            method: 'post',
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    if (!req.body.mobile)
                        return next(new core_1.ServerError(400, 'mobile required'));
                    var user = this.authService.findUserByMobile(req.body.mobile).then((user) => {
                        if (!user)
                            return next(new core_1.ServerError(400, 'no user found with this mobile'));
                        this.authService.sendVerifySms(user);
                        done(200);
                        // .then((info) => {
                        //     res.json(info);
                        // }).catch((e) => {
                        //     next(new ServerError(500, e.message));
                        // });
                    }).catch(e => next(new core_1.ServerError(500, e.message)));
                }
            ]
        };
        this.verifyMobile = {
            method: 'post',
            publicAccess: true,
            actions: [
                (req, res, next, done) => {
                    if (!req.body.mobile)
                        return next(new core_1.ServerError(400, 'mobile required'));
                    if (!req.body.code)
                        return next(new core_1.ServerError(400, 'code required'));
                    this.authService.findUserByMobile(req.body.mobile).then((user) => {
                        if (!user)
                            return next(new core_1.ServerError(400, 'no user found with this mobile'));
                        this.authService.VerifyUserMobile(req.body.mobile, req.body.code)
                            .then(() => {
                            done(202, "mobile verified");
                        }).catch(e => next(e));
                    }).catch(e => next(e));
                }
            ]
        };
        this.verifyEmail = {
            method: 'post',
            publicAccess: true,
            actions: [
                async (req, res, next, done) => {
                    if (!req.body.email)
                        return next(new core_1.ServerError(400, 'email required'));
                    if (!req.body.code)
                        return next(new core_1.ServerError(400, 'code required'));
                    var user = await this.authService.findUserByEmail(req.body.email);
                    if (!user)
                        return next(new core_1.ServerError(400, 'no user found with this email'));
                    await this.authService.VerifyUserEmail(req.body.email, req.body.code);
                    done(202, "email verified");
                }
            ]
        };
        this.clientToken = {
            method: 'post',
            publicAccess: false,
            actions: [
                async (req, res, next, done) => {
                    var client = await this.authService.findClientById(req.body.clientId);
                    if (!client)
                        return next(new core_1.ServerError(400, 'client not found'));
                    this.authService.getNewToken(req.user._id, req.useragent(), client._id.toString()).then((token) => {
                        res.json({
                            url: client.url,
                            access_token: token.access_token
                        });
                    }).catch((e) => {
                        return next(new core_1.ServerError(400, e.message));
                    });
                }
            ]
        };
        this.refreshToken = {
            method: 'post',
            publicAccess: true,
            actions: [
                async (req, res, next, done) => {
                    var client = await this.authService.findClientById(req.client());
                    var clientId = null;
                    if (client)
                        clientId = client._id.toString();
                    var token = undefined;
                    try {
                        token = await this.authService.findToken(req.body.access_token);
                    }
                    catch (err) {
                        return next(new core_1.ServerError(500, err.message));
                    }
                    if (token)
                        if (token.refresh_token == req.body.refresh_token)
                            this.authService.getNewToken(token.userId, req.useragent(), clientId).then((token) => {
                                return res.json(token);
                            }).catch((e) => {
                                return next(new core_1.ServerError(400, e.message));
                            });
                        else
                            return next(new core_1.ServerError(400, 'refresh token invalid'));
                    else
                        return next(new core_1.ServerError(400, 'access token invalid'));
                }
            ]
        };
        this.sessions = {
            method: 'get',
            publicAccess: false,
            actions: [
                async (req, res, next, done) => {
                    var model = await this.authService.getUserTokens(req.user._id);
                    res.json(model);
                }
            ]
        };
        this.checkToken = {
            method: 'post',
            publicAccess: false,
            actions: [
                (req, res, next, done) => {
                    res.json(req.userToken);
                }
            ]
        };
        this.token = {
            method: 'post',
            publicAccess: true,
            actions: [
                (req, res, next) => {
                    if (!req.body.grant_type)
                        req.body.grant_type = 'password';
                    next();
                },
                async (req, res, next, done) => {
                    if (req.body.grant_type != 'password')
                        return next();
                    var user = null;
                    user = await this.authService.findUserByUsername(req.body.username);
                    if (!user)
                        user = await this.authService.findUserByEmail(req.body.username);
                    if (!user)
                        user = await this.authService.findUserByMobile(req.body.username);
                    if (!user)
                        return next(new core_1.ServerError(400, 'user/password invalid'));
                    var userMatchPassword = this.authService.userMatchPassword(user, req.body.password);
                    if (!userMatchPassword)
                        return next(new core_1.ServerError(400, 'user/password invalid'));
                    if (_1.AuthService.options.mobileConfirmationRequired)
                        if (!user.mobileVerified)
                            return next(new core_1.ServerError(403, 'mobile not confirmed'));
                    if (_1.AuthService.options.emailConfirmationRequired)
                        if (!user.emailVerified)
                            return next(new core_1.ServerError(403, 'email not confirmed'));
                    var userToken = await this.authService.getNewToken(user._id, req.useragent(), req.client());
                    userToken.username = user.username;
                    res.json(userToken);
                },
                async (req, res, next, done) => {
                }
            ]
        };
        this.authService = core_1.Server.services["AuthService"];
    }
}
exports.AuthController = AuthController;
