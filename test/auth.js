var assert = require("assert");
var serendip = require("..");
var smp = require("serendip-mongodb-provider");
require("dotenv").config();

describe("running authentication scenarios", function() {
  it("should run authentication example scenario", function(done) {
    serendip.DbService.configure({
      defaultProvider: "Mongodb",
      providers: {
        Mongodb: {
          object: new smp.MongodbProvider(),
          options: {
            mongoDb: process.env["db.mongoDb"],
            mongoUrl: process.env["db.mongoUrl"],
            authSource: process.env["db.authSource"],
            user: process.env["db.user"],
            password: process.env["db.password"]
          }
        }
      }
    });
    serendip.AuthService.configure({
      emailConfirmationRequired: false,
      maxTokenCount: 20,
      mobileConfirmationRequired: false,
      smsProvider: null,
      tokenExpireIn: 30000
    });

    serendip.HttpService.configure({
      cors: "*",
      httpPort: 3000,
      controllers: [serendip.AuthController]
    });

    serendip
      .start({
        services: [
          serendip.AuthService,
          serendip.EmailService,
          serendip.ViewEngineService,
          serendip.DbService,
          serendip.HttpService
        ],
        cpuCores: 1,
        logging: "error"
      })
      .then(done)
      .catch(e => done(e));
  });
});
