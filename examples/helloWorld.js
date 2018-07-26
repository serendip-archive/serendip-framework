var serendip = require('..');

class fooController {

    constructor() {

        /**
        * GET /api/foo/hi
        */
        this.hi = {
            method: 'get',
            public: true,
            actions: [
                (req, res, next, done) => {
                    res.write('<h1>Hello</h1>');
                    next('<h2>World</h2>');
                },
                (req, res, next, done, model) => {
                    res.write(model);
                    done();
                }
            ]
        }
    }
}

serendip.start({
    controllers: [fooController],
    cpuCores: 1,
    httpPort: 3000,
   
});