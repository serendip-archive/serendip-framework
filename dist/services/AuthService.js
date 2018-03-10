"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class AuthService {
    createRandomToken(length) {
        return Math.random().toString().split('.')[1].substring(0, length);
    }
    constructor() {
        this.userDb = new _1.DbService(_1.DbCollectionNames.Users);
    }
    allUsers() {
        return this.userDb.find({});
    }
}
exports.AuthService = AuthService;
