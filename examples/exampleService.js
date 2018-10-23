var serendip = require('..');

class exampleService {
    configure(options) {
        exampleService.options = options;
    }
    start() {
        return new Promise(function (resolve, reject) {
            // wait 3 seconds then start
            setTimeout(() => {
                console.info('exampleService just started.');
                resolve();
            }, 3000);
        });
    };
    log(input) {
        setTimeout(() => {
            console.log('delayed log from exampleService', input);
        }, exampleService.options.logDelay);
    };
}

exampleService.options = {
    // defaults
    logDelay: 1000
};

exampleService.dependencies = ['DbService'];

class exampleController {
    constructor() {
        /**
        * GET /api/example/log
        */
        this.log = {
            method: 'get',
            public: true,
            actions: [
                (req, res, next, done) => {

                    serendip.Server.services['exampleService'].log(req.ip());
                    res.json({ msg: 'logged' });
                }
            ]
        }
    }
}

serendip.DbService.configure({
    mongoDb: 'serendipTests',
    mongoUrl: 'mongodb://localhost:27017'
});

serendip.start({
    controllers: [exampleController],
    services: [exampleService, serendip.DbService],
    cpuCores: 1,
    httpPort: 3000
}).then(() => { }).catch((e) => console.error(e));