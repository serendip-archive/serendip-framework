import { DbService, AuthService } from '../services';
import { UserModel } from '../models';
import { Server, ServerEndpointInterface } from '../core';
import { Collection } from 'mongodb';

/** 
 * /api/auth/(endpoint)
*/
export class AuthController {

    public authService: AuthService;

    constructor() {

        this.authService = Server.services["AuthService"];

    }

    public foo: ServerEndpointInterface = {
        method: 'get',
        route: '/token',
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

    public hi: ServerEndpointInterface = {
        method: 'get',
        route: '/hi/:id',
        actions: [
            (req, res, next, done) => {

                res.json([req.params, req.query, req.body]);
                done();
                // this.authService.allUsers().then((result) => {

                //     next(result);

                // });
            }
        ]
    };







}