var serendip = require('..');
var path = require('path');

serendip.start({
    cpuCores: 1,
    httpPort: 3000,
    staticPath:  'D:\\'
}).then(() => {
    console.log('Server started!',path.join(__dirname,'public'));

}).catch((e) => {
    console.error(e);
});