var serendip = require('..');


serendip.DbService.configure({
    mongoDb: 'serendipTests',
    mongoUrl: 'mongodb://localhost:27017'
})

serendip.start({
    services: [serendip.AuthService, serendip.EmailService, serendip.ViewEngineService, serendip.DbService],
    controllers: [serendip.AuthController],
    cpuCores: 1,
    httpPort: 3000,
    cors: '*'
})
    .then(() => console.log('server started!'))
    .catch((e) => console.error(e));