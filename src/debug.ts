import { start } from "./start";
import { MongodbProvider } from "serendip-mongodb-provider";

import {
  AuthService,
  DbService,
  FaxService,
  EmailService,
  SmsIrService,
  AuthController,
  ServerController,
  ViewEngineService
} from ".";
import { join } from "path";
import { HttpService } from "./http";

AuthService.configure({
  tokenExpireIn: 1000 * 60 * 60,
  smsProvider: "SmsIrService"
});

DbService.configure({
  defaultProvider: "Mongodb",
  providers: {
    Mongodb: {
      object: new MongodbProvider(),
      options: {
        mongoDb: "serendip_framework",
        mongoUrl: "mongodb://localhost:27017"
      }
    }
  }
});

HttpService.configure({
  cert: join(__dirname, "..", "localhost_cert.pem"),
  key: join(__dirname, "..", "localhost_key.pem"),
  staticPath: __dirname,
  httpPort: 2020,
  httpsPort: 2022,
  httpsOnly: false,
  controllers: [AuthController, ServerController]
});
start({
  cpuCores: 1,

  services: [
    SmsIrService,
    EmailService,
    DbService,
    AuthService,
    ViewEngineService,
    HttpService
  ]
})
  .then(() => {
    console.log("Server workers started successfully!");
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
