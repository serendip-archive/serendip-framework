
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/m-esm/serendip/graphs/commit-activity)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://serendip.agency/)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)
![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)


![SF](https://raw.githubusercontent.com/m-esm/serendip/master/readme_icon.png " ")
# Serendip framework


  Serendip is a Node.js web service framework written in typescript. and of course, you can use it in your javascript projects.

| Services | Description |
|-|-| 
| [HttpService](doc/classes/http.httpservice.md) | Http and Https server with routing system based on [path-match package]( https://npmjs.com/package/path-match )
| [DbService](doc/classes/db.dbservice.md) | it's a provider based, database service which currently works with [MongoDb]( https://npmjs.com/package/serendip-mongodb-provider ) and [Serendip GridDb]( https://npmjs.com/package/serendip-mongodb-provider ). it also use [RFC 6902(JSON Patch)](https://github.com/chbrown/rfc6902) to store changes on documents.
| [EmailService](doc/classes/email.emailservice.md) | sends emails on SMTP using [Nodemailer]( https://npmjs.com/package/nodemailer ) and it use [Mustache]( https://npmjs.com/package/mustache ) to render models into html emails
| [AuthService](doc/classes/auth.authservice.md) | authentication and group base authorization service. implemented based on [oAuth2]( https://oauth.net/2/ ) (RFC 6749, RFC 6750, RFC 6819)
| [Sms Services](doc/modules/sms.md) | services for sending bulk and transactional sms  
| [Fax Services](doc/modules/fax.md) | services for sending fax (TODO)
| [ViewEngineService](doc/classes/viewengine.viewengineservice.md) | Renders Mustache
 
---

## Installing
using npm : 
```
npm install serendip --save
```

> ### :information_source: more information at [Wiki](https://github.com/m-esm/serendip/wiki)

* collaboration, issue reporting kindly accepted
* Contact m-esm@hotmail.com 


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fm-esm%2Fserendip.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fm-esm%2Fserendip?ref=badge_large)

![_](https://raw.githubusercontent.com/m-esm/serendip/master/readme_footer.png "footer img")
 