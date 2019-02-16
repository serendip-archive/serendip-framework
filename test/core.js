var assert = require("assert");
var serendip = require("..");

describe("running core scenarios", function() {
  it("should run without services", function(done) {
    serendip
      .start({
        services: [],
        controllers: [],
        cpuCores: 1,
        httpPort: 1111,
        cors: "*",
        logging: "silent"
      })
      .then(done)
      .catch(e => console.error(e));
  });

  it("should run with just one service", function(done) {
    class exampleService {
      configure(options) {
        exampleService.options = options;
      }
      start() {
        return new Promise(function(resolve, reject) {
          resolve();
        });
      }
    }

    exampleService.dependencies = [];

    serendip
      .start({
        services: [exampleService],
        controllers: [],
        cpuCores: 1,
        httpPort: 1112,
        cors: "*",
        logging: "silent"
      })
      .then(done)
      .catch(e => console.error(e));
  });
});
