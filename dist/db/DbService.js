"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const Mongodb_1 = require("./providers/Mongodb");
const chalk_1 = require("chalk");
/**
 * Every functionality thats use database should use it trough this service
 */
class DbService {
    constructor() {
        this.providers = {};
    }
    static configure(options) {
        DbService.options = _.extend(DbService.options, options);
    }
    async start() {
        for (const key of Object.keys(DbService.options.providers)) {
            const provider = DbService.options.providers[key];
            console.log(chalk_1.default.gray(`DbService > trying to connect to DbProvider named: ${key}`));
            await provider.object.initiate(provider.options);
            this.providers[key] = provider.object;
            console.log(chalk_1.default.green(`DbService > connected to DbProvider name: ${key}`));
        }
    }
    collection(collectionName, track, provider) {
        return this.providers[provider || DbService.options.defaultProvider].collection(collectionName, track);
    }
}
DbService.dependencies = [];
DbService.options = {
    defaultProvider: "Mongodb",
    providers: {
        Mongodb: {
            object: new Mongodb_1.MongodbProvider(),
            options: {
                mongoDb: "serendip_framework",
                mongoUrl: "mongodb://localhost:27017"
            }
        }
    }
};
exports.DbService = DbService;
