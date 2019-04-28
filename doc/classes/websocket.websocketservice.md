[Serendip Framework](../README.md) > [WebSocket](../modules/websocket.md) > [WebSocketService](../classes/websocket.websocketservice.md)

# Class: WebSocketService

## Hierarchy

**WebSocketService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Constructors

* [constructor](websocket.websocketservice.md#constructor)

### Properties

* [connectionEmitter](websocket.websocketservice.md#connectionemitter)
* [messageEmitter](websocket.websocketservice.md#messageemitter)
* [bypassTokenOnRoutes](websocket.websocketservice.md#bypasstokenonroutes)

### Accessors

* [httpService](websocket.websocketservice.md#httpservice)

### Methods

* [sendToUser](websocket.websocketservice.md#sendtouser)
* [start](websocket.websocketservice.md#start)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WebSocketService**(authService: *[AuthService](auth.authservice.md)*): [WebSocketService](websocket.websocketservice.md)

*Defined in [src/ws/WebSocketService.ts:34](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| authService | [AuthService](auth.authservice.md) |

**Returns:** [WebSocketService](websocket.websocketservice.md)

___

## Properties

<a id="connectionemitter"></a>

###  connectionEmitter

**● connectionEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in [src/ws/WebSocketService.ts:26](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L26)*

___
<a id="messageemitter"></a>

###  messageEmitter

**● messageEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in [src/ws/WebSocketService.ts:27](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L27)*

___
<a id="bypasstokenonroutes"></a>

### `<Static>` bypassTokenOnRoutes

**● bypassTokenOnRoutes**: *`string`[]* =  []

*Defined in [src/ws/WebSocketService.ts:30](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L30)*

___

## Accessors

<a id="httpservice"></a>

###  httpService

**get httpService**(): [HttpService](http.httpservice.md)

*Defined in [src/ws/WebSocketService.ts:32](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L32)*

**Returns:** [HttpService](http.httpservice.md)

___

## Methods

<a id="sendtouser"></a>

###  sendToUser

▸ **sendToUser**(userId: *`string`*, path: *`string`*, model: *`string`*): `Promise`<`void`>

*Defined in [src/ws/WebSocketService.ts:44](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L44)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `string` |  \- |
| path | `string` |  \- |
| model | `string` |  <br><br> |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/ws/WebSocketService.ts:53](https://github.com/m-esm/serendip/blob/17b0858/src/ws/WebSocketService.ts#L53)*

**Returns:** `Promise`<`void`>

___

