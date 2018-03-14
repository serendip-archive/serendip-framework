"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    async start() {
    }
}
AuthService.dependencies = ["DbService", "EmailService", "SmsService"];
exports.AuthService = AuthService;
