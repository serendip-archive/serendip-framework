[Serendip Framework](../README.md) > [Server](../modules/server.md) > [ServerController](../classes/server.servercontroller.md)

# Class: ServerController

## Hierarchy

**ServerController**

## Index

### Constructors

* [constructor](server.servercontroller.md#constructor)

### Object literals

* [clusterTesting](server.servercontroller.md#clustertesting)
* [clusterWorkers](server.servercontroller.md#clusterworkers)
* [doneError](server.servercontroller.md#doneerror)
* [nextError](server.servercontroller.md#nexterror)
* [routes](server.servercontroller.md#routes)
* [services](server.servercontroller.md#services)
* [throw](server.servercontroller.md#throw)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ServerController**(httpService: *[HttpService](http.httpservice.md)*, authService: *[AuthService](auth.authservice.md)*): [ServerController](server.servercontroller.md)

*Defined in [src/server/ServerController.ts:15](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| httpService | [HttpService](http.httpservice.md) |
| authService | [AuthService](auth.authservice.md) |

**Returns:** [ServerController](server.servercontroller.md)

___

## Object literals

<a id="clustertesting"></a>

###  clusterTesting

**clusterTesting**: *`object`*

*Defined in [src/server/ServerController.ts:21](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L21)*

<a id="clustertesting.actions"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        res.write("received in worker " + Server.worker.id);
        res.end();
      }
    ]

*Defined in [src/server/ServerController.ts:25](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L25)*

___
<a id="clustertesting.method"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:24](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L24)*

___
<a id="clustertesting.publicaccess"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:22](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L22)*

___
<a id="clustertesting.route"></a>

####  route

**● route**: *`string`* = "/api/server/cluster-testing"

*Defined in [src/server/ServerController.ts:23](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L23)*

___

___
<a id="clusterworkers"></a>

###  clusterWorkers

**clusterWorkers**: *`object`*

*Defined in [src/server/ServerController.ts:33](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L33)*

<a id="clusterworkers.actions-1"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        res.json({
          isMaster: cluster.isMaster,
          isWorker: cluster.isWorker,
          id: Worker.id,
          others: Worker.others,
          msg: "answered in worker " + Server.worker.id
        });
      }
    ]

*Defined in [src/server/ServerController.ts:37](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L37)*

___
<a id="clusterworkers.method-1"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:36](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L36)*

___
<a id="clusterworkers.publicaccess-1"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:34](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L34)*

___
<a id="clusterworkers.route-1"></a>

####  route

**● route**: *`string`* = "/api/server/cluster-workers"

*Defined in [src/server/ServerController.ts:35](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L35)*

___

___
<a id="doneerror"></a>

###  doneError

**doneError**: *`object`*

*Defined in [src/server/ServerController.ts:103](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L103)*

<a id="doneerror.actions-2"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        done("500", "done error");
      },
      (req, res, next, done) => {
        done(200);
      }
    ]

*Defined in [src/server/ServerController.ts:106](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L106)*

___
<a id="doneerror.method-2"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:104](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L104)*

___
<a id="doneerror.publicaccess-2"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:105](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L105)*

___

___
<a id="nexterror"></a>

###  nextError

**nextError**: *`object`*

*Defined in [src/server/ServerController.ts:90](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L90)*

<a id="nexterror.actions-3"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        next(new HttpError(500, "just checking"));
      },
      (req, res, next, done) => {
        done(200);
      }
    ]

*Defined in [src/server/ServerController.ts:93](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L93)*

___
<a id="nexterror.method-3"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:91](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L91)*

___
<a id="nexterror.publicaccess-3"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:92](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L92)*

___

___
<a id="routes"></a>

###  routes

**routes**: *`object`*

*Defined in [src/server/ServerController.ts:50](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L50)*

<a id="routes.actions-4"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        setTimeout(() => {
          next();
        }, 200);
      },
      (req, res, next, done) => {
        // var model = _.map(this.httpService.routes, route => {
        //   route = _.omit(route, "controllerObject");

        //   return route;
        // });
        // res.json(model);
        done(200);
      }
    ]

*Defined in [src/server/ServerController.ts:53](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L53)*

___
<a id="routes.method-4"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:51](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L51)*

___
<a id="routes.publicaccess-4"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:52](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L52)*

___

___
<a id="services"></a>

###  services

**services**: *`object`*

*Defined in [src/server/ServerController.ts:116](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L116)*

<a id="services.actions-5"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        var model = _.keys(Server.services);
        res.json(model);
      }
    ]

*Defined in [src/server/ServerController.ts:119](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L119)*

___
<a id="services.method-5"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:117](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L117)*

___
<a id="services.publicaccess-5"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:118](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L118)*

___

___
<a id="throw"></a>

###  throw

**throw**: *`object`*

*Defined in [src/server/ServerController.ts:71](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L71)*

<a id="throw.actions-6"></a>

####  actions

**● actions**: *`(Anonymous function)`[]* =  [
      (req, res, next, done) => {
        throw new Error("fake error");
      },
      (req, res, next, done) => {
        // var model = _.map(this.httpService.routes, route => {
        //   route = _.omit(route, "controllerObject");

        //   return route;
        // });
        // res.json(model);
        done(200);
      }
    ]

*Defined in [src/server/ServerController.ts:74](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L74)*

___
<a id="throw.method-6"></a>

####  method

**● method**: *`string`* = "get"

*Defined in [src/server/ServerController.ts:72](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L72)*

___
<a id="throw.publicaccess-6"></a>

####  publicAccess

**● publicAccess**: *`true`* = true

*Defined in [src/server/ServerController.ts:73](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerController.ts#L73)*

___

___

