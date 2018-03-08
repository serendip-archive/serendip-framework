"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class AuthRoute {
    constructor() {
        this.authService = new services_1.AuthService();
    }
    getSayHello(req, res) {
        res.send('ok');
    }
}
exports.AuthRoute = AuthRoute;
