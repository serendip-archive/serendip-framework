"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
const _1 = require(".");
const path_1 = require("path");
_1.AuthService.configure({
    tokenExpireIn: 1000 * 60 * 60,
    smsProvider: 'SmsIrService'
});
_1.DbService.configure({
    mongoDb: 'serendipTests',
    mongoUrl: 'mongodb://localhost:27017'
});
start_1.start({
    cert: path_1.join(__dirname, '..', 'localhost_cert.pem'),
    key: path_1.join(__dirname, '..', 'localhost_key.pem'),
    staticPath: __dirname,
    cpuCores: 1,
    httpPort: 2020,
    httpsPort: 2022,
    httpsOnly: false,
    controllers: [_1.AuthController, _1.ServerController],
    services: [_1.SmsIrService, _1.EmailService, _1.DbService, _1.AuthService, _1.ViewEngineService]
}).then(() => {
    console.log('Server workers started successfully!');
}).catch((err) => {
    console.error(err);
    process.exit();
});
