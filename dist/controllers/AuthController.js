"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class AuthController {
    constructor() {
        this.foo = {
            method: 'get',
            customRoute: '/token',
            actions: [(req, res, next, done) => {
                    this.authService.allUsers().then((result) => {
                        next(result);
                    });
                },
                function (req, res, next, done, model) {
                    // res.json({ status: 'ok' });
                    res.json(model);
                    done();
                }]
        };
        this.authService = new services_1.AuthService();
    }
}
exports.AuthController = AuthController;
