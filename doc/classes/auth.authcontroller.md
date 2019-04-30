[Serendip Framework](../README.md) > [Auth](../modules/auth.md) > [AuthController](../classes/auth.authcontroller.md)

# Class: AuthController

/api/auth/(endpoint)

## Hierarchy

**AuthController**

## Index

### Constructors

* [constructor](auth.authcontroller.md#constructor)

### Object literals

* [addUserToGroup](auth.authcontroller.md#addusertogroup)
* [changePassword](auth.authcontroller.md#changepassword)
* [checkToken](auth.authcontroller.md#checktoken)
* [clientToken](auth.authcontroller.md#clienttoken)
* [deleteUserFromGroup](auth.authcontroller.md#deleteuserfromgroup)
* [newAuthCode](auth.authcontroller.md#newauthcode)
* [oneTimePassword](auth.authcontroller.md#onetimepassword)
* [refreshToken](auth.authcontroller.md#refreshtoken)
* [register](auth.authcontroller.md#register)
* [resetPassword](auth.authcontroller.md#resetpassword)
* [sendResetPasswordToken](auth.authcontroller.md#sendresetpasswordtoken)
* [sendVerifyEmail](auth.authcontroller.md#sendverifyemail)
* [sendVerifySms](auth.authcontroller.md#sendverifysms)
* [sessions](auth.authcontroller.md#sessions)
* [token](auth.authcontroller.md#token)
* [verifyEmail](auth.authcontroller.md#verifyemail)
* [verifyMobile](auth.authcontroller.md#verifymobile)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AuthController**(authService: *[AuthService](auth.authservice.md)*): [AuthController](auth.authcontroller.md)

*Defined in [src/auth/AuthController.ts:21](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| authService | [AuthService](auth.authservice.md) |

**Returns:** [AuthController](auth.authcontroller.md)

___

## Object literals

<a id="addusertogroup"></a>

###  addUserToGroup

**addUserToGroup**: *`object`*

*Defined in [src/auth/AuthController.ts:135](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L135)*

<a id="addusertogroup.actions"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res, next, done) => {
        if (req.user.groups.indexOf("admin") == -1)
          return next(new HttpError(401, "admin access required"));

        this.authService.addUserToGroup(req.body.user, req.body.group);

        done(202, "added to group");
      }
    ]

*Defined in [src/auth/AuthController.ts:138](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L138)*

___
<a id="addusertogroup.method"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:136](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L136)*

___
<a id="addusertogroup.publicaccess"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:137](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L137)*

___

___
<a id="changepassword"></a>

###  changePassword

**changePassword**: *`object`*

*Defined in [src/auth/AuthController.ts:165](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L165)*

<a id="changepassword.actions-1"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:168](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L168)*

___
<a id="changepassword.method-1"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:166](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L166)*

___
<a id="changepassword.publicaccess-1"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:167](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L167)*

___

___
<a id="checktoken"></a>

###  checkToken

**checkToken**: *`object`*

*Defined in [src/auth/AuthController.ts:427](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L427)*

<a id="checktoken.actions-2"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        res.json(req.userToken);
      }
    ]

*Defined in [src/auth/AuthController.ts:430](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L430)*

___
<a id="checktoken.method-2"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:428](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L428)*

___
<a id="checktoken.publicaccess-2"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:429](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L429)*

___

___
<a id="clienttoken"></a>

###  clientToken

**clientToken**: *`object`*

*Defined in [src/auth/AuthController.ts:350](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L350)*

<a id="clienttoken.actions-3"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res, next, done) => {
        var client = await this.authService.findClientById(req.body.clientId);

        if (!client) return next(new HttpError(400, "client not found"));

        if (!this.authService.clientMatchSecret(client, req.body.clientSecret))
          return next(new HttpError(400, "client secret mismatch"));

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
            return next(new HttpError(500, e.message));
          });
      }
    ]

*Defined in [src/auth/AuthController.ts:353](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L353)*

___
<a id="clienttoken.method-3"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:351](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L351)*

___
<a id="clienttoken.publicaccess-3"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:352](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L352)*

___

___
<a id="deleteuserfromgroup"></a>

###  deleteUserFromGroup

**deleteUserFromGroup**: *`object`*

*Defined in [src/auth/AuthController.ts:150](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L150)*

<a id="deleteuserfromgroup.actions-4"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res, next, done) => {
        if (req.user.groups.indexOf("admin") == -1)
          return next(new HttpError(401, "admin access required"));

        this.authService.deleteUserFromGroup(req.body.user, req.body.group);

        done(202, "removed from group");
      }
    ]

*Defined in [src/auth/AuthController.ts:153](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L153)*

___
<a id="deleteuserfromgroup.method-4"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:151](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L151)*

___
<a id="deleteuserfromgroup.publicaccess-4"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:152](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L152)*

___

___
<a id="newauthcode"></a>

###  newAuthCode

**newAuthCode**: *`object`*

*Defined in [src/auth/AuthController.ts:489](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L489)*

<a id="newauthcode.actions-5"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res) => {

        console.log(req.headers);
        res.json(await this.authService.newAuthCode(req.userToken, (req.headers["clientid"] || '').toString(), req.body.redirectUri))

      }
    ]

*Defined in [src/auth/AuthController.ts:493](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L493)*

___
<a id="newauthcode.method-5"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:490](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L490)*

___
<a id="newauthcode.publicaccess-5"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:491](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L491)*

___

___
<a id="onetimepassword"></a>

###  oneTimePassword

**oneTimePassword**: *`object`*

*Defined in [src/auth/AuthController.ts:437](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L437)*

<a id="onetimepassword.actions-6"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res, next, done) => {
        var mobile = req.body.mobile;

        var mobileCountryCode = req.body.mobileCountryCode || "+98";

        if (mobile)
          mobile = parseInt(mobile.replace("/D/g", ""), 10).toString();

        if (mobileCountryCode == "+98" && mobile.length != 10)
          return done(400, "mobile invalid");

        if (!mobile) return done(400, "mobile required");

        var user = await this.authService.findUserByMobile(
          mobile,
          mobileCountryCode
        );

        if (!user) {
          user = await this.authService.usersCollection.insertOne({
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
          .sendOneTimePassword(
            user._id,
            req.useragent().toString(),
            req.ip().toString()
          )
          .then(() => done(200, "one-time password sent"))
          .catch(e => {
            console.log("error in sending one-time password", e);
            done(500, e.message | e);
          });
      }
    ]

*Defined in [src/auth/AuthController.ts:440](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L440)*

___
<a id="onetimepassword.method-6"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:438](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L438)*

___
<a id="onetimepassword.publicaccess-6"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:439](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L439)*

___

___
<a id="refreshtoken"></a>

###  refreshToken

**refreshToken**: *`object`*

*Defined in [src/auth/AuthController.ts:378](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L378)*

<a id="refreshtoken.actions-7"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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
                grant_type: "refresh_token"
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

*Defined in [src/auth/AuthController.ts:381](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L381)*

___
<a id="refreshtoken.method-7"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:379](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L379)*

___
<a id="refreshtoken.publicaccess-7"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:380](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L380)*

___

___
<a id="register"></a>

###  register

**register**: *`object`*

*Defined in [src/auth/AuthController.ts:24](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L24)*

<a id="register.actions-8"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:27](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L27)*

___
<a id="register.method-8"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:25](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L25)*

___
<a id="register.publicaccess-8"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:26](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L26)*

___

___
<a id="resetpassword"></a>

###  resetPassword

**resetPassword**: *`object`*

*Defined in [src/auth/AuthController.ts:196](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L196)*

<a id="resetpassword.actions-9"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:199](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L199)*

___
<a id="resetpassword.method-9"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:197](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L197)*

___
<a id="resetpassword.publicaccess-9"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:198](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L198)*

___

___
<a id="sendresetpasswordtoken"></a>

###  sendResetPasswordToken

**sendResetPasswordToken**: *`object`*

*Defined in [src/auth/AuthController.ts:95](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L95)*

<a id="sendresetpasswordtoken.actions-10"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:98](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L98)*

___
<a id="sendresetpasswordtoken.method-10"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:96](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L96)*

___
<a id="sendresetpasswordtoken.publicaccess-10"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:97](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L97)*

___

___
<a id="sendverifyemail"></a>

###  sendVerifyEmail

**sendVerifyEmail**: *`object`*

*Defined in [src/auth/AuthController.ts:238](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L238)*

<a id="sendverifyemail.actions-11"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:241](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L241)*

___
<a id="sendverifyemail.method-11"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:240](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L240)*

___
<a id="sendverifyemail.publicaccess-11"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:239](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L239)*

___

___
<a id="sendverifysms"></a>

###  sendVerifySms

**sendVerifySms**: *`object`*

*Defined in [src/auth/AuthController.ts:261](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L261)*

<a id="sendverifysms.actions-12"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:265](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L265)*

___
<a id="sendverifysms.method-12"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:262](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L262)*

___
<a id="sendverifysms.publicaccess-12"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:263](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L263)*

___

___
<a id="sessions"></a>

###  sessions

**sessions**: *`object`*

*Defined in [src/auth/AuthController.ts:413](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L413)*

<a id="sessions.actions-13"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      async (req, res, next, done) => {
        var model = await this.authService.findTokensByUserId(
          req.user._id.toString()
        );

        res.json(model);
      }
    ]

*Defined in [src/auth/AuthController.ts:416](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L416)*

___
<a id="sessions.method-13"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/auth/AuthController.ts:414](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L414)*

___
<a id="sessions.publicaccess-13"></a>

####  publicAccess

**● publicAccess**: *`false`* = false

*Defined in [src/auth/AuthController.ts:415](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L415)*

___

___
<a id="token"></a>

###  token

**token**: *`object`*

*Defined in [src/auth/AuthController.ts:503](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L503)*

<a id="token.actions-14"></a>

####  actions

**● actions**: *(`(Anonymous function)` \| `(Anonymous function)`)[]* =  [
      (req, res, next) => {
        if (!req.body.grant_type) req.body.grant_type = "password";

        return next();
      },
      async (req, res, next, done) => {
        if (req.body.grant_type != "refresh_token") return next();

        return this.refreshToken.actions[0](req, res, next, done);

      },
      async (req, res, next, done) => {
        if (req.body.grant_type != "authorization_code") return next();

        const code = req.body.code,
          codeId = req.body.codeId,
          clientId = req.headers["clientid"];

        if (await this.authService.authCodeValid(codeId, code)) {

          const authCode = await this.authService.findAuthCode((codeId));

          if (authCode.clientId != clientId)
            return done(400, 'auth code clientId invalid');

          if (authCode.used)
            return done(400, 'auth code has been used before');

          await this.authService.setAuthCodeUsed(codeId);
          const token = await this.authService.insertToken({
            grant_type: 'authorization_code',
            clientId: clientId,
            userId: authCode.userId,
            useragent: req.useragent().toString(),
          })

          res.json(token);

        } else
          return done(400, 'auth code invalid');

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

        res.json(userToken);
      }
    ]

*Defined in [src/auth/AuthController.ts:507](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L507)*

___
<a id="token.method-14"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:504](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L504)*

___
<a id="token.publicaccess-14"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:505](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L505)*

___

___
<a id="verifyemail"></a>

###  verifyEmail

**verifyEmail**: *`object`*

*Defined in [src/auth/AuthController.ts:329](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L329)*

<a id="verifyemail.actions-15"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:333](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L333)*

___
<a id="verifyemail.method-15"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:330](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L330)*

___
<a id="verifyemail.publicaccess-15"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:331](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L331)*

___

___
<a id="verifymobile"></a>

###  verifyMobile

**verifyMobile**: *`object`*

*Defined in [src/auth/AuthController.ts:297](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L297)*

<a id="verifymobile.actions-16"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
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

*Defined in [src/auth/AuthController.ts:301](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L301)*

___
<a id="verifymobile.method-16"></a>

####  method

**● method**: *`string`* = "post"

*Defined in [src/auth/AuthController.ts:298](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L298)*

___
<a id="verifymobile.publicaccess-16"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/auth/AuthController.ts:299](https://github.com/m-esm/serendip/blob/570071d/src/auth/AuthController.ts#L299)*

___

___

