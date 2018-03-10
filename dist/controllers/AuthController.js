"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
/**
 * /api/auth/(endpoint)
*/
class AuthController {
    constructor() {
        this.foo = {
            method: 'get',
            customRoute: '/token',
            actions: [
                (req, res, next, done) => {
                    this.authService.allUsers().then((result) => {
                        next(result);
                    });
                },
                (req, res, next, done, model) => {
                    res.json(model);
                    done();
                }
            ]
        };
        this.authService = new services_1.AuthService();
    }
}
exports.AuthController = AuthController;
