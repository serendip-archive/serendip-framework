"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
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
                    res.send(this.authService.test());
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
        this.hi = {
            method: 'get',
            customRoute: '/hi/:id/(.*)?/(.*)?',
            actions: [
                (req, res, next, done) => {
                    res.json(req.params);
                    done();
                    // this.authService.allUsers().then((result) => {
                    //     next(result);
                    // });
                }
            ]
        };
        this.authService = core_1.Server.services["AuthService"];
    }
}
exports.AuthController = AuthController;