"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
const serendip_mongodb_provider_1 = require("serendip-mongodb-provider");
const _1 = require(".");
const path_1 = require("path");
const http_1 = require("./http");
_1.AuthService.configure({
    tokenExpireIn: 1000 * 60 * 60,
    smsProvider: "SmsIrService"
});
_1.DbService.configure({
    defaultProvider: "Mongodb",
    providers: {
        Mongodb: {
            object: new serendip_mongodb_provider_1.MongodbProvider(),
            options: {
                mongoDb: "serendip_framework",
                mongoUrl: "mongodb://localhost:27017"
            }
        }
    }
});
http_1.HttpService.configure({
    cert: path_1.join(__dirname, "..", "localhost_cert.pem"),
    key: path_1.join(__dirname, "..", "localhost_key.pem"),
    staticPath: __dirname,
    httpPort: 2020,
    httpsPort: 2022,
    httpsOnly: false,
    controllers: [_1.AuthController, _1.ServerController]
});
start_1.start({
    cpuCores: 1,
    services: [
        _1.SmsIrService,
        _1.EmailService,
        _1.DbService,
        _1.AuthService,
        _1.ViewEngineService,
        http_1.HttpService
    ]
})
    .then(() => {
    console.log("Server workers started successfully!");
})
    .catch(err => {
    console.error(err);
    process.exit();
});
