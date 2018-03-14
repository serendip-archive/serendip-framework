import { Server, ServerRequest, ServerResponse, ControllerEndpoint } from '../Server'
import {  DbService, AuthService } from '../services';
import { UserModel } from '../models';
import { Collection } from 'mongodb';

/** 
 * /api/auth/(endpoint)
*/
export class AuthController {

    public authService: AuthService;

    constructor() {

        this.authService = Server.services["AuthService"];
        
    }

    

    public foo: ControllerEndpoint = {
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







}