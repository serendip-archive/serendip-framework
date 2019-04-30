
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/m-esm/serendip/graphs/commit-activity)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://serendip.agency/)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)
![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)


![SF](https://raw.githubusercontent.com/serendip-agency/serendip-framework/master/readme_icon.png " ")
# Serendip framework

  It's a Node.js web service framework written in typescript. The main goal for creating this framework was to have a shared package that could provide all frequently used services in a specific setting which was needed for speeding up developing the rest of the Serendip platform [repositories](https://github.com/serendip-agency).

| Services | Description |
|-|-| 
| [HttpService](doc/classes/http.httpservice.md) | Http and Https server with routing system based on [path-match package]( https://npmjs.com/package/path-match )
| [DbService](doc/classes/db.dbservice.md) | It's a provider based, database service which currently works with [MongoDb]( https://npmjs.com/package/serendip-mongodb-provider ) and [Serendip GridDb]( https://npmjs.com/package/serendip-mongodb-provider ). It also use [RFC 6902(JSON Patch)](https://github.com/chbrown/rfc6902) to store changes on documents.
| [EmailService](doc/classes/email.emailservice.md) | Sends emails on SMTP using [Nodemailer]( https://npmjs.com/package/nodemailer ) and it use [Mustache]( https://npmjs.com/package/mustache ) to render models into html emails
| [AuthService](doc/classes/auth.authservice.md) | Authentication and group base authorization service. Implemented based on [oAuth2]( https://oauth.net/2/ ) (RFC 6749, RFC 6750, RFC 6819)
| [Sms Services](doc/modules/sms.md) | Services for sending bulk and transactional sms  
| [Fax Services](doc/modules/fax.md) | Services for sending fax (TODO)
| [ViewEngineService](doc/classes/viewengine.viewengineservice.md) | Renders Mustache to HTML
 
---

### Installing
Assuming that you have already installed Nodejs, you can start installing Serendip with NPM.
Open your Terminal/Command Prompt(CMD) and write:

```
npm install serendip --save
```

### API Documentation
coming soon ...

### Code Documentation
This documents are auto generated from typescript source using [typedoc](https://github.com/TypeStrong/typedoc)

* [Auth](doc/modules/auth.md)
* [Db](doc/modules/db.md)
* [Email](doc/modules/email.md)
* [Fax](doc/modules/fax.md)
* [Http](doc/modules/http.md)
* [Server](doc/modules/server.md)
* [Sms](doc/modules/sms.md)
* [Start](doc/modules/start.md)
* [Utils](doc/modules/utils.md)
* [ViewEngine](doc/modules/viewengine.md)
* [WebSocket](doc/modules/websocket.md)


### Testing
our tests are written using [mocha](https://github.com/mochajs/mocha) and u can run them by following commands.
 note that some of the tests need a database connection.
```
# Clone ( you need git installed )
git clone https://github.com/serendip-agency/serendip-framework.git

# go to downloaded directory
cd serendip-framework

# Installs npm dependencies
npm install

# running mocha tests
npm test

```

### Related
* [serendip-business-client](https://github.com/serendip-agency/serendip-business-client)
* [serendip-business-api](https://github.com/serendip-agency/serendip-business-api)
* [serendip-grridb-provider](https://github.com/serendip-agency/serendip-grridb-provider)
* [serendip-grridb-node](https://github.com/serendip-agency/serendip-grridb-node)
* [serendip-grridb-controller](https://github.com/serendip-agency/serendip-grridb-controller)
* [serendip-mongodb-controller](https://github.com/serendip-agency/serendip-mongodb-controller)
* [serendip-business-model](https://github.com/serendip-agency/serendip-business-model)
* [serendip-utility](https://github.com/serendip-agency/utility)

### License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fm-esm%2Fserendip.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fm-esm%2Fserendip?ref=badge_large)

___

#### Collaboration, issue reporting kindly accepted.

![_](https://serendip.agency/assets/svg/serendip-architecture.svg "serendip architecture")
 
