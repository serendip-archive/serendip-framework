"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class AuthService {
    async start() {
        this._dbService = core_1.Server.services["DbService"];
        this._dbService.collection("Users");
    }
    test() {
        return 'test';
    }
}
AuthService.dependencies = ["DbService", "EmailService", "SmsService"];
exports.AuthService = AuthService;
