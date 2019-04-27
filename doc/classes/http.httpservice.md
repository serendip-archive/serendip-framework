[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpService](../classes/http.httpservice.md)

# Class: HttpService

## Hierarchy

**HttpService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Constructors

* [constructor](http.httpservice.md#constructor)

### Properties

* [httpServer](http.httpservice.md#httpserver)
* [httpsServer](http.httpservice.md#httpsserver)
* [wsServer](http.httpservice.md#wsserver)

### Accessors

* [dependencies](http.httpservice.md#dependencies)

### Methods

* [addRoutes](http.httpservice.md#addroutes)
* [start](http.httpservice.md#start)
* [configure](http.httpservice.md#configure)
* [processRequestToStatic](http.httpservice.md#processrequesttostatic)

### Object literals

* [options](http.httpservice.md#options)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpService**(): [HttpService](http.httpservice.md)

*Defined in [src/http/HttpService.ts:157](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L157)*

**Returns:** [HttpService](http.httpservice.md)

___

## Properties

<a id="httpserver"></a>

###  httpServer

**● httpServer**: *`Server`*

*Defined in [src/http/HttpService.ts:151](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L151)*

___
<a id="httpsserver"></a>

###  httpsServer

**● httpsServer**: *`Server`*

*Defined in [src/http/HttpService.ts:152](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L152)*

___
<a id="wsserver"></a>

###  wsServer

**● wsServer**: *`any`*

*Defined in [src/http/HttpService.ts:153](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L153)*

___

## Accessors

<a id="dependencies"></a>

### `<Static>` dependencies

**get dependencies**(): `string`[]

*Defined in [src/http/HttpService.ts:57](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L57)*

**Returns:** `string`[]

___

## Methods

<a id="addroutes"></a>

###  addRoutes

▸ **addRoutes**(): `void`

*Defined in [src/http/HttpService.ts:76](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L76)*

Notice : all controllers should end with 'Controller' Notice : controller methods should start with requested method ex : get,post,put,delete

**Returns:** `void`

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/http/HttpService.ts:171](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L171)*

**Returns:** `Promise`<`void`>

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(opts: *[HttpServiceOptionsInterface](../interfaces/http.httpserviceoptionsinterface.md)*): `void`

*Defined in [src/http/HttpService.ts:155](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L155)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| opts | [HttpServiceOptionsInterface](../interfaces/http.httpserviceoptionsinterface.md) |

**Returns:** `void`

___
<a id="processrequesttostatic"></a>

### `<Static>` processRequestToStatic

▸ **processRequestToStatic**(req: *`IncomingMessage`*, res: *`ServerResponse`*, callback: *`any`*, staticPath?: *`any`*): `Promise`<`void`>

*Defined in [src/http/HttpService.ts:380](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L380)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `IncomingMessage` |
| res | `ServerResponse` |
| callback | `any` |
| `Optional` staticPath | `any` |

**Returns:** `Promise`<`void`>

___

## Object literals

<a id="options"></a>

### `<Static>` options

**options**: *`object`*

*Defined in [src/http/HttpService.ts:145](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L145)*

<a id="options.beforemiddlewares"></a>

####  beforeMiddlewares

**● beforeMiddlewares**: *`undefined`[]* =  []

*Defined in [src/http/HttpService.ts:147](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L147)*

___
<a id="options.bodyparserlimit"></a>

####  bodyParserLimit

**● bodyParserLimit**: *`string`* = "50mb"

*Defined in [src/http/HttpService.ts:148](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L148)*

___
<a id="options.controllers"></a>

####  controllers

**● controllers**: *`undefined`[]* =  []

*Defined in [src/http/HttpService.ts:149](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L149)*

___
<a id="options.middlewares"></a>

####  middlewares

**● middlewares**: *`undefined`[]* =  []

*Defined in [src/http/HttpService.ts:146](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/HttpService.ts#L146)*

___

___

