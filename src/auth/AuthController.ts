import { Server, ServerEndpointInterface, ServerError } from '../core';
import { Collection } from 'mongodb';
import { Validator } from '../utils'
import { AuthService, UserRegisterRequestInterface, UserModel } from '.';
import { UserTokenModel } from './models/UserTokenModel';
import * as _ from 'underscore'

/** 
 * /api/auth/(endpoint)
*/
export class AuthController {

    public authService: AuthService;

    constructor() {

        this.authService = Server.services["AuthService"];

    }

    public register: ServerEndpointInterface = {
        method: 'post',
        publicAccess: true,
        actions: [
            (req, res, next, done) => {

                var model: UserRegisterRequestInterface = req.body;




                if (!model.username || !model.password)
                    return next(new ServerError(400, 'username or password missing'));

                if (!model.email)
                    if (Validator.isEmail(model.username))
                        model.email = model.username;


                if (!model.mobile)
                    if (model.username.startsWith('+'))
                        if (Validator.isNumeric(model.username.replace('+', '')))
                            model.mobile = model.username;


                if (!Validator.isLength(model.username, 6, 32))
                    return next(new ServerError(400, 'username should be between 6 and 32 char length'));


                if (!Validator.isAlphanumeric(model.username))
                    return next(new ServerError(400, 'username should be alphanumeric a-z and 0-9'));

                if (model.email)
                    if (!Validator.isEmail(model.email))
                        return next(new ServerError(400, 'email not valid'));



                if (!Validator.isLength(model.password, 8, 32))
                    return next(new ServerError(400, 'password should be between 8 and 32 char length'));


                model.username = model.username.trim().toLowerCase();

                next(model);

            },
            async (req, res, next, done, model) => {

                this.authService.registerUser(model, req.ip(), req.useragent()).then((userModel) => {

                    res.json(_.pick(userModel, 'username'));

                }).catch((err) => {

                    if (err.codeName == "DuplicateKey")
                        return next(new ServerError(400, 'username already exists'));

                    if (err.message == "DuplicateEmail")
                        return next(new ServerError(400, 'email already exists'));


                    if (err.message == "DuplicateMobile")
                        return next(new ServerError(400, 'mobile already exists'));

                    return next(new ServerError(500, 'Server Error'));

                });

            }
        ]
    };


    public resetPassword: ServerEndpointInterface = {
        method: 'post',
        publicAccess: true,

        actions: [
            async (req, res, next, done) => {

                if (!req.body.email && !req.body.mobile)
                    return next(new ServerError(400, 'email or mobile missing'));


                if (req.body.email)
                    if (!Validator.isEmail(req.body.email))
                        return next(new ServerError(400, 'email not valid'));

                var user: UserModel = null;

                if (req.body.email)
                    user = await this.authService.findUserByEmail(req.body.email);
                else
                    user = await this.authService.findUserByMobile(req.body.mobile);

                if (!user)
                    return next(new ServerError(400, 'user not found'));

                if (user.passwordResetTokenIssueAt)
                    if (Date.now() - user.passwordResetTokenIssueAt < 1000 * 60)
                        return next(new ServerError(400, 'minimum interval between reset password request is 60 seconds'));


                var resetToken = await this.authService.getNewPasswordResetToken(user._id);

                res.json(resetToken);

            }

        ]
    };


    public sendVerifyEmail: ServerEndpointInterface = {
        method: 'post',
        actions: [

            (req, res, next, done) => {

                if (!req.user.email)
                    return next(new ServerError(400, 'User have not submitted email address yet.'))

                this.authService.sendVerifyEmail(req.user).then((info) => {

                    res.json(info);


                }).catch((e) => {

                    res.json(e);

                });


            }

        ]
    };

    public clientToken: ServerEndpointInterface = {
        method: 'post',
        publicAccess: false,
        actions: [
            async (req, res, next, done) => {

                var client = await this.authService.findClientById(req.body.clientId);

                if (!client)
                    return next(new ServerError(400, 'client not found'));

                this.authService.getNewToken(req.user._id, req.useragent(), client._id.toString()).then((token) => {

                    res.json({
                        url: client.url,
                        access_token: token.access_token
                    });

                }).catch((e) => {

                    return next(new ServerError(400, e.message));

                });


            }

        ]
    };

    public refreshToken: ServerEndpointInterface = {
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
                } catch (err) {
                    return next(new ServerError(500, err.message));
                }

                if (token)
                    if (token.refresh_token == req.body.refresh_token)
                        this.authService.getNewToken(token.userId, req.useragent(), clientId).then((token) => {

                            return res.json(token);

                        }).catch((e) => {

                            return next(new ServerError(400, e.message));

                        });
                    else
                        return next(new ServerError(400, 'refresh token invalid'));
                else
                    return next(new ServerError(400, 'access token invalid'));




            }

        ]
    };


    public checkToken: ServerEndpointInterface = {
        method: 'post',
        publicAccess: false,
        actions: [

            (req, res, next, done) => {


                res.json(req.userToken);


            }

        ]
    };

    public token: ServerEndpointInterface = {
        method: 'post',
        publicAccess: true,

        actions: [
            async (req, res, next, done) => {


                var user: UserModel = null;


                user = await this.authService.findUserByUsername(req.body.username);

                if (!user)
                    user = await this.authService.findUserByEmail(req.body.username);


                if (!user)
                    user = await this.authService.findUserByMobile(req.body.username);

                if (!user)
                    return next(new ServerError(400, 'user/password invalid'));


                var userMatchPassword = this.authService.userMatchPassword(user, req.body.password);

                if (!userMatchPassword)
                    return next(new ServerError(400, 'user/password invalid'));


                var userToken = await this.authService.getNewToken(user._id, req.useragent(), req.client());

                userToken.username = user.username;

                res.json(userToken);


            }

        ]
    };









}