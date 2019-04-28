[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpRouter](../classes/http.httprouter.md)

# Class: HttpRouter

## Hierarchy

**HttpRouter**

## Index

### Constructors

* [constructor](http.httprouter.md#constructor)

### Properties

* [routerPathMatcher](http.httprouter.md#routerpathmatcher)

### Methods

* [executeActions](http.httprouter.md#executeactions)
* [executeRoute](http.httprouter.md#executeroute)
* [findSrvRoute](http.httprouter.md#findsrvroute)
* [routeIt](http.httprouter.md#routeit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpRouter**(): [HttpRouter](http.httprouter.md)

*Defined in [src/http/HttpRouter.ts:21](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L21)*

**Returns:** [HttpRouter](http.httprouter.md)

___

## Properties

<a id="routerpathmatcher"></a>

### `<Static>` routerPathMatcher

**● routerPathMatcher**: *`any`* =  pathMatch({
    // path-to-regexp options
    sensitive: false,
    strict: false,
    end: false
  })

*Defined in [src/http/HttpRouter.ts:24](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L24)*

___

## Methods

<a id="executeactions"></a>

### `<Static>` executeActions

▸ **executeActions**(req: *`any`*, res: *[HttpResponseInterface](../interfaces/http.httpresponseinterface.md)*, passedModel: *`any`*, actions: *`any`*, actionIndex: *`any`*): `Promise`<`void` \| `Object`>

*Defined in [src/http/HttpRouter.ts:88](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L88)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `any` |
| res | [HttpResponseInterface](../interfaces/http.httpresponseinterface.md) |
| passedModel | `any` |
| actions | `any` |
| actionIndex | `any` |

**Returns:** `Promise`<`void` \| `Object`>

___
<a id="executeroute"></a>

### `<Static>` executeRoute

▸ **executeRoute**(srvRoute: *[HttpRouteInterface](../interfaces/http.httprouteinterface.md)*, middlewares: *[HttpMiddlewareInterface](../interfaces/http.httpmiddlewareinterface.md)[]*, req: *[HttpRequestInterface](../interfaces/http.httprequestinterface.md)*, res: *[HttpResponseInterface](../interfaces/http.httpresponseinterface.md)*): `Promise`<`any`>

*Defined in [src/http/HttpRouter.ts:66](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| srvRoute | [HttpRouteInterface](../interfaces/http.httprouteinterface.md) |
| middlewares | [HttpMiddlewareInterface](../interfaces/http.httpmiddlewareinterface.md)[] |
| req | [HttpRequestInterface](../interfaces/http.httprequestinterface.md) |
| res | [HttpResponseInterface](../interfaces/http.httpresponseinterface.md) |

**Returns:** `Promise`<`any`>

___
<a id="findsrvroute"></a>

### `<Static>` findSrvRoute

▸ **findSrvRoute**(req: *`any`*, routes: *[HttpRouteInterface](../interfaces/http.httprouteinterface.md)[]*, matchMethod: *`boolean`*): [HttpRouteInterface](../interfaces/http.httprouteinterface.md)

*Defined in [src/http/HttpRouter.ts:31](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `any` |
| routes | [HttpRouteInterface](../interfaces/http.httprouteinterface.md)[] |
| matchMethod | `boolean` |

**Returns:** [HttpRouteInterface](../interfaces/http.httprouteinterface.md)

___
<a id="routeit"></a>

### `<Static>` routeIt

▸ **routeIt**(req: *[HttpRequestInterface](../interfaces/http.httprequestinterface.md)*, res: *[HttpResponseInterface](../interfaces/http.httpresponseinterface.md)*, middlewares: *[HttpMiddlewareInterface](../interfaces/http.httpmiddlewareinterface.md)[]*, srvRoute: *[HttpRouteInterface](../interfaces/http.httprouteinterface.md)*): `Promise`<`any`>

*Defined in [src/http/HttpRouter.ts:152](https://github.com/m-esm/serendip/blob/17b0858/src/http/HttpRouter.ts#L152)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | [HttpRequestInterface](../interfaces/http.httprequestinterface.md) |
| res | [HttpResponseInterface](../interfaces/http.httpresponseinterface.md) |
| middlewares | [HttpMiddlewareInterface](../interfaces/http.httpmiddlewareinterface.md)[] |
| srvRoute | [HttpRouteInterface](../interfaces/http.httprouteinterface.md) |

**Returns:** `Promise`<`any`>

___

