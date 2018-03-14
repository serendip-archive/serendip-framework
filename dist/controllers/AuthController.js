"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../Server");
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
                    res.send('hello');
                    done();
                    // this.authService.allUsers().then((result) => {
                    //     next(result);
                    // });
                },
                (req, res, next, done, model) => {
                    res.json(model);
                    done();
                }
            ]
        };
        this.authService = Server_1.Server.services["AuthService"];
    }
}
exports.AuthController = AuthController;
