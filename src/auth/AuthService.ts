import { Collection, ObjectID } from "mongodb";
import { ServerServiceInterface, Server } from "../core";
import * as utils from "../utils";
import { DbService, DbCollection } from "../db";
import { UserModel } from "./models";
import { UserRegisterRequestInterface } from "./interfaces";



export class AuthService implements ServerServiceInterface {


    static dependencies = ["DbService", "EmailService", "SmsService"];

    private _dbService: DbService;
    private usersCollection: DbCollection<UserModel>;

    async start() {

        this._dbService = Server.services["DbService"];
        this.usersCollection = await this._dbService.collection<UserModel>("Users");
        this.usersCollection.createIndex({ username: 1 }, { unique: true });
        this.usersCollection.createIndex({ mobile: 1 }, {});
        this.usersCollection.createIndex({ email: 1 }, {});
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

    public async getNewPasswordResetToken(userId: string): Promise<string> {


        var userQuery = await this.usersCollection.find({ _id: userId });
        var user = userQuery[0];

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
        user.password = utils.bcryptHash(user.passwordSalt + newPass);
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

    public async findUserById(id: string): Promise<UserModel> {

        var query = await this.usersCollection.find({ _id: id });

        if (query.length == 0)
            return undefined;
        else
            return query[0];

    }


}
