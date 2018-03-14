"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    async start() {
    }
    test() {
        return 'test';
    }
}
AuthService.dependencies = ["DbService", "EmailService", "SmsService"];
exports.AuthService = AuthService;
