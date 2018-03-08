import { Server, ServerRequest, ServerResponse } from '../Server'
import { DbCollectionNames, DbService, AuthService } from '../services';
import { UserModel } from '../models';
import { Collection } from 'mongodb';


export class AuthRoute {

    private authService : AuthService;
    constructor() {

        this.authService = new AuthService();

    }




    public getSayHello(req: ServerRequest, res: ServerResponse) {


        res.send('ok');



    }









}