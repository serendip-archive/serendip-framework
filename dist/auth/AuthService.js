"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const utils = require("../utils");
const models_1 = require("./models");
class AuthService {
    async start() {
        this._dbService = core_1.Server.services["DbService"];
        this.usersCollection = await this._dbService.collection("Users");
        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
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
        return await this.setNewPassword(registeredUser._id, userModel.password, ip, useragent);
    }
    async getNewPasswordResetToken(userId) {
        var userQuery = await this.usersCollection.find({ _id: userId });
        var user = userQuery[0];
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
        user.password = utils.bcryptHash(user.passwordSalt + newPass);
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
