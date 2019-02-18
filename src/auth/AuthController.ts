import { Server } from "../core";
import { Validator } from "../utils";
import { AuthService, UserRegisterRequestInterface, UserModel } from ".";
import * as _ from "underscore";
import { reduce } from "async";
import { HttpEndpointInterface } from "../http/interfaces";
import { HttpError } from "../http";

/**
 * /api/auth/(endpoint)
 */
export class AuthController {
  constructor(private authService: AuthService) {}

  public register: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      (req, res, next, done) => {
        var model: UserRegisterRequestInterface = req.body;

        if (!model.username || !model.password)
          return next(new HttpError(400, "username or password missing"));

        if (!model.email)
          if (Validator.isEmail(model.username)) model.email = model.username;

        if (!model.mobile)
          if (model.username.startsWith("+"))
            if (Validator.isNumeric(model.username.replace("+", "")))
              model.mobile = model.username;

        if (!Validator.isLength(model.username, 6, 32))
          return next(
            new HttpError(
              400,
              "username should be between 6 and 32 char length"
            )
          );

        if (!Validator.isAlphanumeric(model.username))
          return next(
            new HttpError(400, "username should be alphanumeric a-z and 0-9")
          );

        if (model.email)
          if (!Validator.isEmail(model.email))
            return next(new HttpError(400, "email not valid"));

        if (!Validator.isLength(model.password, 4, 32))
          return next(
            new HttpError(
              400,
              "password should be between 4 and 32 char length"
            )
          );

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
              return next(new HttpError(400, "username already exists"));

            if (err.message == "DuplicateEmail")
              return next(new HttpError(400, "email already exists"));

            if (err.message == "DuplicateMobile")
              return next(new HttpError(400, "mobile already exists"));

            if (Server.opts.logging != "silent")
              console.log("User register => Error", err);
            return next(new HttpError(500, err));
          });
      }
    ]
  };

  public sendResetPasswordToken: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      async (req, res, next, done) => {
        if (!req.body.email && !req.body.mobile)
          return next(new HttpError(400, "email or mobile missing"));

        if (req.body.email)
          if (!Validator.isEmail(req.body.email))
            return next(new HttpError(400, "email not valid"));

        var user: UserModel = null;

        if (req.body.email)
          user = await this.authService.findUserByEmail(req.body.email);
        else user = await this.authService.findUserByMobile(req.body.mobile);

        if (!user) return next(new HttpError(400, "user not found"));

        if (user.passwordResetTokenIssueAt)
          if (Date.now() - user.passwordResetTokenIssueAt < 1000 * 60)
            return next(
              new HttpError(
                400,
                "minimum interval between reset password request is 60 seconds"
              )
            );

        await this.authService.sendPasswordResetToken(
          user._id,
          req.useragent().toString(),
          req.ip().toString()
        );

        done();
      }
    ]
  };

  public addUserToGroup: HttpEndpointInterface = {
    method: "post",
    publicAccess: false,
    actions: [
      async (req, res, next, done) => {
        if (req.user.groups.indexOf("admin") == -1)
          return next(new HttpError(401, "admin access required"));

        this.authService.addUserToGroup(req.body.user, req.body.group);

        done(202, "added to group");
      }
    ]
  };

  public deleteUserFromGroup: HttpEndpointInterface = {
    method: "post",
    publicAccess: false,
    actions: [
      async (req, res, next, done) => {
        if (req.user.groups.indexOf("admin") == -1)
          return next(new HttpError(401, "admin access required"));

        this.authService.deleteUserFromGroup(req.body.user, req.body.group);

        done(202, "removed from group");
      }
    ]
  };

 
  public changePassword: HttpEndpointInterface = {
    method: "post",
    publicAccess: false,
    actions: [
      async (req, res, next, done) => {
        var userId = req.user._id;

        if (req.body.user)
          if (req.user.groups.indexOf("admin") != -1) userId = req.body.user;
          else return next(new HttpError(401, "admin access required"));

        if (!req.body.password)
          return next(new HttpError(400, "password is missing"));

        if (req.body.password != req.body.passwordConfirm)
          return next(
            new HttpError(400, "password and passwordConfirm do not match")
          );

        await this.authService.setNewPassword(
          userId,
          req.body.password,
          req.ip(),
          req.useragent()
        );

        done(202, "password changed");
      }
    ]
  };

  public resetPassword: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      async (req, res, next, done) => {
        if (!req.body.code) return next(new HttpError(400, "code is missing"));

        if (!req.body.password)
          return next(new HttpError(400, "password is missing"));

        if (req.body.password != req.body.passwordConfirm)
          return next(
            new HttpError(400, "password and passwordConfirm do not match")
          );

        if (!req.body.email && !req.body.mobile)
          return next(new HttpError(400, "email or mobile missing"));

        if (req.body.email)
          if (!Validator.isEmail(req.body.email))
            return next(new HttpError(400, "email not valid"));

        var user: UserModel = null;

        if (req.body.email)
          user = await this.authService.findUserByEmail(req.body.email);
        else user = await this.authService.findUserByMobile(req.body.mobile);

        if (!user) return next(new HttpError(400, "user not found"));

        await this.authService.setNewPassword(
          user._id,
          req.body.password,
          req.ip(),
          req.useragent()
        );

        done(202, "password changed");
      }
    ]
  };

  public sendVerifyEmail: HttpEndpointInterface = {
    publicAccess: true,
    method: "post",
    actions: [
      async (req, res, next, done) => {
        if (!req.body.email) return next(new HttpError(400, "email required"));

        var user = await this.authService.findUserByEmail(req.body.email);
        if (!user)
          return next(new HttpError(400, "no user found with this email"));

        this.authService
          .sendVerifyEmail(user)
          .then(info => {
            res.json(info);
          })
          .catch(e => {
            res.json(e);
          });
      }
    ]
  };

  public sendVerifySms: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,

    actions: [
      (req, res, next, done) => {
        if (!req.body.mobile)
          return next(new HttpError(400, "mobile required"));
        this.authService
          .findUserByMobile(req.body.mobile)
          .then(user => {
            if (!user)
              return next(new HttpError(400, "no user found with this mobile"));

            this.authService
              .sendVerifySms(
                user,
                req.useragent().toString(),
                req.ip().toString()
              )
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
          .catch(e => next(new HttpError(500, e.message)));
      }
    ]
  };

  public verifyMobile: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,

    actions: [
      (req, res, next, done) => {
        if (!req.body.mobile)
          return next(new HttpError(400, "mobile required"));

        if (!req.body.code) return next(new HttpError(400, "code required"));

        this.authService
          .findUserByMobile(req.body.mobile)
          .then(user => {
            if (!user)
              return next(new HttpError(400, "no user found with this mobile"));

            if (user.mobileVerificationCode != req.body.code)
              return next(new HttpError(400, "invalid code"));

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

  public verifyEmail: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,

    actions: [
      async (req, res, next, done) => {
        if (!req.body.email) return next(new HttpError(400, "email required"));

        if (!req.body.code) return next(new HttpError(400, "code required"));

        var user = await this.authService.findUserByEmail(req.body.email);

        if (!user)
          return next(new HttpError(400, "no user found with this email"));

        await this.authService.VerifyUserEmail(req.body.email, req.body.code);
        done(202, "email verified");
      }
    ]
  };

  public clientToken: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      async (req, res, next, done) => {
        var client = await this.authService.findClientById(req.body.clientId);

        if (!client) return next(new HttpError(400, "client not found"));

        if (!this.authService.clientMatchSecret(client, req.body.clientSecret))
          return next(new HttpError(400, "client secret mismatch"));

        this.authService
          .insertToken({
            userId: req.user._id.toString(),
            useragent: req.useragent().toString(),
            clientId: client._id.toString(),
            grant_type: "client_credentials"
          })
          .then(token => {
            res.json(token);
          })
          .catch(e => {
            return next(new HttpError(500, e.message));
          });
      }
    ]
  };

  public refreshToken: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      async (req, res, next, done) => {
        var token = undefined;

        try {
          token = await this.authService.findTokenByAccessToken(
            req.body.access_token
          );
        } catch (err) {
          return next(new HttpError(err.code || 500, err.message));
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
                return next(new HttpError(400, e.message));
              });
          else return next(new HttpError(400, "refresh token invalid"));
        else return next(new HttpError(400, "access token invalid"));
      }
    ]
  };

  public sessions: HttpEndpointInterface = {
    method: "get",
    publicAccess: false,
    actions: [
      async (req, res, next, done) => {
        var model = await this.authService.findTokensByUserId(
          req.user._id.toString()
        );

        res.json(model);
      }
    ]
  };

  public checkToken: HttpEndpointInterface = {
    method: "post",
    publicAccess: false,
    actions: [
      (req, res, next, done) => {
        res.json(req.userToken);
      }
    ]
  };

  public oneTimePassword: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,
    actions: [
      async (req, res, next, done) => {
        var mobile = req.body.mobile;

        var mobileCountryCode = req.body.mobileCountryCode;

        if (mobile) mobile = parseInt(mobile.replace("/D/g", ""), 10);

        if (!mobile) return done(400, "mobile required");

        var user = await this.authService.findUserByMobile(
          mobile,
          mobileCountryCode
        );

        console.log(mobile, user);

        if (!user) {
          user = await this.authService.usersCollection.insertOne({
            registeredAt: Date.now(),
            mobile: parseInt(mobile).toString(),
            mobileCountryCode: mobileCountryCode || "+98",
            mobileVerified: false,
            username: mobileCountryCode || "+98" + parseInt(mobile).toString(),
            registeredByIp: req.ip().toString(),
            registeredByUseragent: req.useragent().toString(),
            groups: []
          });
        }

        this.authService
          .sendOneTimePassword(
            user._id,
            req.useragent().toString(),
            req.ip().toString()
          )
          .then(() => done(200, "one-time password sent"))
          .catch(e => {
            done(500, e.message | e);
          });
      }
    ]
  };
  public token: HttpEndpointInterface = {
    method: "post",
    publicAccess: true,

    actions: [
      (req, res, next) => {
        if (!req.body.grant_type) req.body.grant_type = "password";

        next();
      },
      async (req, res, next, done) => {
        if (req.body.grant_type != "password") return next();

        var user: UserModel = null;

        user = await this.authService.findUserByUsername(req.body.username);
        if (!user)
          user = await this.authService.findUserByEmail(req.body.username);

        if (!user && req.body.mobile)
          user = await this.authService.findUserByMobile(
            parseInt(req.body.mobile).toString(),
            req.body.mobileCountryCode
          );

        if (!user)
          user = await this.authService.findUserByMobile(
            parseInt(req.body.username).toString(),
            req.body.mobileCountryCode
          );

        if (!user) return next(new HttpError(400, "user/password invalid"));

        var userMatchPassword = false;

        if (req.body.password)
          userMatchPassword = this.authService.userMatchPassword(
            user,
            req.body.password
          );

        var userMatchOneTimePassword = false;

        if (req.body.oneTimePassword)
          userMatchOneTimePassword = this.authService.userMatchOneTimePassword(
            user,
            req.body.oneTimePassword
          );
        if (user.twoFactorEnabled) {
          if (!req.body.password)
            return next(new HttpError(400, "include password"));

          if (!userMatchPassword || !userMatchOneTimePassword)
            return next(new HttpError(400, "user/password invalid"));
        } else {
          if (!userMatchPassword && !userMatchOneTimePassword)
            return next(new HttpError(400, "user/password invalid"));
        }

        if (userMatchOneTimePassword) {
          user.mobileVerified = true;
          await this.authService.usersCollection.updateOne(user, user._id);
        } else {
          if (AuthService.options.mobileConfirmationRequired)
            if (!user.mobileVerified)
              return next(new HttpError(403, "mobile not confirmed"));

          if (AuthService.options.emailConfirmationRequired)
            if (!user.emailVerified)
              return next(new HttpError(403, "email not confirmed"));
        }

        var userToken = await this.authService.insertToken({
          userId: user._id.toString(),
          useragent: req.useragent(),
          grant_type: !userMatchOneTimePassword ? "password" : "one-time"
        });

        userToken.username = user.username;

        console.log(userToken);

        res.json(userToken);
      }
    ]
  };
}
