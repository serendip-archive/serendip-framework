var assert = require("assert");
var serendip = require("..");
require("dotenv").config();

describe("running core scenarios", function() {
  it("should run without services", function(done) {
    serendip
      .start({
        services: [],
        cpuCores: 1,
        logging: "silent"
      })
      .then(done)
      .catch(done);
  });

  it("should run with simple service", function(done) {
    class exampleService {
      constructor(){
        
      }
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
        cpuCores: 1,
        logging: "silent"
      })
      .then(done)
      .catch(done);
  });
});
