
[Documentation at Wiki](https://github.com/m-esm/serendip/wiki)
# SERENDIP Framework
> It's a Node.js web framework based on express it will provide you services such as :

| Service / feature | Description | status |
|-|-|-|
|Database | internal ORM | [x] Done | 
| Router | OOP based router | [x] Done |
|Cluster handling| running on every core in cpu | [x] Done |
|Authentication | oauth2 - session management - kill signal | in progress |
|Entity Service | dynamic CRUD - document change tracking ( git like)  |  in progress |
|Logging| user agent - API requests and related response action ( deep ) | planned |
|Email inbox/compose| syncing with Gmail - connecting to pop3,SMTP - email templates | planned |
|Sms send/receive| implementing SMS.ir API - SMS templates | planned |
|Fax send/receive| implementing fax.ir API - fax templates | planned |
|VoIP call| WebRTC TURN and STUN server | planned |
|View engine | ejs - pug | planned |

---

## Installing
using npm : 
```
npm install m-esm/serendip
```


---

## Examples
### TypeScript Example :
#### 1. Hello world :
```javascript
import * as serendip from 'serendip'

class fooController {
    constructor() {

    }

    /**
     * GET /api/foo/hi
     */
    hi: serendip.ServerEndpointInterface = {
        method: 'get',
        actions: [
            (req, res, next, done) => {
                res.write('<h1>Hello</h1>');
                next();

            },
            (req, res, next, done) => {

                res.write('<h2>World</h2>');
                done();

            }
        ]
    }

}

serendip.start({

    controllers: { fooController },
    cpuCores: 1,
    port: 3000

});

```
### Javascript Example :
#### 1. Hello world :
```javascript
var serendip = require('serendip');

// GET /api/foo/(endpoint)
class fooController {

    constructor() {

        //  GET /api/foo/hi
        this.hi = {
            method: 'get',
            // action to be executed in series
            actions: [
                (req, res, next, done) => {

                    // send model with next callback
                    next({ message: 'hello world !' })

                },
                (req, res, next, done, model) => {

                    res.json(model);
                    done();
                }
            ]
        }
    }

}

// starting application
serendip.start({
    // controllers who are responsible to api requests
    controllers: { fooController },
    // Specify or by default all cores will be used
    cpuCores: 1,
    // port to listen on
    port: 3000
});

```



* collaboration, issue reporting kindly accepted
* Contact m-esm@hotmail.com 
