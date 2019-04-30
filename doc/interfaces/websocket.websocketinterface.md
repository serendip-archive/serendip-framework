[Serendip Framework](../README.md) > [WebSocket](../modules/websocket.md) > [WebSocketInterface](../interfaces/websocket.websocketinterface.md)

# Interface: WebSocketInterface

## Hierarchy

 `WebSocket`

**↳ WebSocketInterface**

## Index

### Classes

* [Server](../classes/websocket.websocketinterface.server.md)

### Interfaces

* [AddressInfo](websocket.websocketinterface.addressinfo.md)
* [ClientOptions](websocket.websocketinterface.clientoptions.md)
* [PerMessageDeflateOptions](websocket.websocketinterface.permessagedeflateoptions.md)
* [ServerOptions](websocket.websocketinterface.serveroptions.md)

### Type aliases

* [CertMeta](websocket.websocketinterface.md#certmeta)
* [Data](websocket.websocketinterface.md#data)
* [VerifyClientCallbackAsync](websocket.websocketinterface.md#verifyclientcallbackasync)
* [VerifyClientCallbackSync](websocket.websocketinterface.md#verifyclientcallbacksync)

### Constructors

* [constructor](websocket.websocketinterface.md#constructor)

### Properties

* [CLOSED](websocket.websocketinterface.md#closed)
* [CLOSING](websocket.websocketinterface.md#closing)
* [CONNECTING](websocket.websocketinterface.md#connecting)
* [OPEN](websocket.websocketinterface.md#open)
* [binaryType](websocket.websocketinterface.md#binarytype)
* [bufferedAmount](websocket.websocketinterface.md#bufferedamount)
* [extensions](websocket.websocketinterface.md#extensions)
* [onclose](websocket.websocketinterface.md#onclose)
* [onerror](websocket.websocketinterface.md#onerror)
* [onmessage](websocket.websocketinterface.md#onmessage)
* [onopen](websocket.websocketinterface.md#onopen)
* [path](websocket.websocketinterface.md#path)
* [protocol](websocket.websocketinterface.md#protocol)
* [query](websocket.websocketinterface.md#query)
* [readyState](websocket.websocketinterface.md#readystate)
* [token](websocket.websocketinterface.md#token)
* [url](websocket.websocketinterface.md#url)
* [CLOSED](websocket.websocketinterface.md#closed-1)
* [CLOSING](websocket.websocketinterface.md#closing-1)
* [CONNECTING](websocket.websocketinterface.md#connecting-1)
* [OPEN](websocket.websocketinterface.md#open-1)
* [defaultMaxListeners](websocket.websocketinterface.md#defaultmaxlisteners)

### Methods

* [addEventListener](websocket.websocketinterface.md#addeventlistener)
* [addListener](websocket.websocketinterface.md#addlistener)
* [close](websocket.websocketinterface.md#close)
* [emit](websocket.websocketinterface.md#emit)
* [eventNames](websocket.websocketinterface.md#eventnames)
* [getMaxListeners](websocket.websocketinterface.md#getmaxlisteners)
* [listenerCount](websocket.websocketinterface.md#listenercount)
* [listeners](websocket.websocketinterface.md#listeners)
* [off](websocket.websocketinterface.md#off)
* [on](websocket.websocketinterface.md#on)
* [once](websocket.websocketinterface.md#once)
* [ping](websocket.websocketinterface.md#ping)
* [pong](websocket.websocketinterface.md#pong)
* [prependListener](websocket.websocketinterface.md#prependlistener)
* [prependOnceListener](websocket.websocketinterface.md#prependoncelistener)
* [rawListeners](websocket.websocketinterface.md#rawlisteners)
* [removeAllListeners](websocket.websocketinterface.md#removealllisteners)
* [removeEventListener](websocket.websocketinterface.md#removeeventlistener)
* [removeListener](websocket.websocketinterface.md#removelistener)
* [send](websocket.websocketinterface.md#send)
* [setMaxListeners](websocket.websocketinterface.md#setmaxlisteners)
* [terminate](websocket.websocketinterface.md#terminate)
* [listenerCount](websocket.websocketinterface.md#listenercount-1)

---

## Type aliases

<a id="certmeta"></a>

###  CertMeta

**Ƭ CertMeta**: *`string` \| `string`[] \| `Buffer` \| `Buffer`[]*

*Defined in node_modules/@types/ws/index.d.ts:108*

CertMeta represents the accepted types for certificate & key data.

___
<a id="data"></a>

###  Data

**Ƭ Data**: *`string` \| `Buffer` \| `ArrayBuffer` \| `Buffer`[]*

*Defined in node_modules/@types/ws/index.d.ts:103*

Data represents the message payload received over the WebSocket.

___
<a id="verifyclientcallbackasync"></a>

###  VerifyClientCallbackAsync

**Ƭ VerifyClientCallbackAsync**: *`function`*

*Defined in node_modules/@types/ws/index.d.ts:122*

VerifyClientCallbackAsync is an asynchronous callback used to inspect the incoming message. The return value (boolean) of the function determines whether or not to accept the handshake.

#### Type declaration
▸(info: *`object`*, callback: *`function`*): `void`

**Parameters:**

**info: `object`**

| Name | Type |
| ------ | ------ |
| origin | `string` |
| req | `IncomingMessage` |
| secure | `boolean` |

**callback: `function`**

**Returns:** `void`

___
<a id="verifyclientcallbacksync"></a>

###  VerifyClientCallbackSync

**Ƭ VerifyClientCallbackSync**: *`function`*

*Defined in node_modules/@types/ws/index.d.ts:115*

VerifyClientCallbackSync is a synchronous callback used to inspect the incoming message. The return value (boolean) of the function determines whether or not to accept the handshake.

#### Type declaration
▸(info: *`object`*): `boolean`

**Parameters:**

**info: `object`**

| Name | Type |
| ------ | ------ |
| origin | `string` |
| req | `IncomingMessage` |
| secure | `boolean` |

**Returns:** `boolean`

___

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WebSocketInterface**(address: *`string`*, options?: *`ClientOptions`*): [WebSocketInterface](websocket.websocketinterface.md)

⊕ **new WebSocketInterface**(address: *`string`*, protocols?: *`string` \| `string`[]*, options?: *`ClientOptions`*): [WebSocketInterface](websocket.websocketinterface.md)

*Inherited from WebSocket.__constructor*

*Defined in node_modules/@types/ws/index.d.ts:39*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` |
| `Optional` options | `ClientOptions` |

**Returns:** [WebSocketInterface](websocket.websocketinterface.md)

*Inherited from WebSocket.__constructor*

*Defined in node_modules/@types/ws/index.d.ts:41*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` |
| `Optional` protocols | `string` \| `string`[] |
| `Optional` options | `ClientOptions` |

**Returns:** [WebSocketInterface](websocket.websocketinterface.md)

___

## Properties

<a id="closed"></a>

###  CLOSED

**● CLOSED**: *`number`*

*Inherited from WebSocket.CLOSED*

*Defined in node_modules/@types/ws/index.d.ts:34*

___
<a id="closing"></a>

###  CLOSING

**● CLOSING**: *`number`*

*Inherited from WebSocket.CLOSING*

*Defined in node_modules/@types/ws/index.d.ts:33*

___
<a id="connecting"></a>

###  CONNECTING

**● CONNECTING**: *`number`*

*Inherited from WebSocket.CONNECTING*

*Defined in node_modules/@types/ws/index.d.ts:31*

___
<a id="open"></a>

###  OPEN

**● OPEN**: *`number`*

*Inherited from WebSocket.OPEN*

*Defined in node_modules/@types/ws/index.d.ts:32*

___
<a id="binarytype"></a>

###  binaryType

**● binaryType**: *`string`*

*Inherited from WebSocket.binaryType*

*Defined in node_modules/@types/ws/index.d.ts:24*

___
<a id="bufferedamount"></a>

###  bufferedAmount

**● bufferedAmount**: *`number`*

*Inherited from WebSocket.bufferedAmount*

*Defined in node_modules/@types/ws/index.d.ts:25*

___
<a id="extensions"></a>

###  extensions

**● extensions**: *`string`*

*Inherited from WebSocket.extensions*

*Defined in node_modules/@types/ws/index.d.ts:26*

___
<a id="onclose"></a>

###  onclose

**● onclose**: *`function`*

*Inherited from WebSocket.onclose*

*Defined in node_modules/@types/ws/index.d.ts:38*

#### Type declaration
▸(event: *`object`*): `void`

**Parameters:**

**event: `object`**

| Name | Type |
| ------ | ------ |
| code | `number` |
| reason | `string` |
| target | `WebSocket` |
| wasClean | `boolean` |

**Returns:** `void`

___
<a id="onerror"></a>

###  onerror

**● onerror**: *`function`*

*Inherited from WebSocket.onerror*

*Defined in node_modules/@types/ws/index.d.ts:37*

#### Type declaration
▸(event: *`object`*): `void`

**Parameters:**

**event: `object`**

| Name | Type |
| ------ | ------ |
| error | `any` |
| message | `string` |
| target | `WebSocket` |
| type | `string` |

**Returns:** `void`

___
<a id="onmessage"></a>

###  onmessage

**● onmessage**: *`function`*

*Inherited from WebSocket.onmessage*

*Defined in node_modules/@types/ws/index.d.ts:39*

#### Type declaration
▸(event: *`object`*): `void`

**Parameters:**

**event: `object`**

| Name | Type |
| ------ | ------ |
| data | `WebSocket.Data` |
| target | `WebSocket` |
| type | `string` |

**Returns:** `void`

___
<a id="onopen"></a>

###  onopen

**● onopen**: *`function`*

*Inherited from WebSocket.onopen*

*Defined in node_modules/@types/ws/index.d.ts:36*

#### Type declaration
▸(event: *`object`*): `void`

**Parameters:**

**event: `object`**

| Name | Type |
| ------ | ------ |
| target | `WebSocket` |

**Returns:** `void`

___
<a id="path"></a>

### `<Optional>` path

**● path**: *`string`*

*Defined in [src/ws/WebSocketInterface.ts:10](https://github.com/m-esm/serendip/blob/570071d/src/ws/WebSocketInterface.ts#L10)*

___
<a id="protocol"></a>

###  protocol

**● protocol**: *`string`*

*Inherited from WebSocket.protocol*

*Defined in node_modules/@types/ws/index.d.ts:27*

___
<a id="query"></a>

### `<Optional>` query

**● query**: *`any`*

*Defined in [src/ws/WebSocketInterface.ts:12](https://github.com/m-esm/serendip/blob/570071d/src/ws/WebSocketInterface.ts#L12)*

___
<a id="readystate"></a>

###  readyState

**● readyState**: *`number`*

*Inherited from WebSocket.readyState*

*Defined in node_modules/@types/ws/index.d.ts:28*

___
<a id="token"></a>

### `<Optional>` token

**● token**: *[TokenModel](../classes/auth.tokenmodel.md)*

*Defined in [src/ws/WebSocketInterface.ts:9](https://github.com/m-esm/serendip/blob/570071d/src/ws/WebSocketInterface.ts#L9)*

___
<a id="url"></a>

###  url

**● url**: *`string`*

*Inherited from WebSocket.url*

*Defined in node_modules/@types/ws/index.d.ts:29*

___
<a id="closed-1"></a>

### `<Static>` CLOSED

**● CLOSED**: *`number`*

*Inherited from WebSocket.CLOSED*

*Defined in node_modules/@types/ws/index.d.ts:22*

___
<a id="closing-1"></a>

### `<Static>` CLOSING

**● CLOSING**: *`number`*

*Inherited from WebSocket.CLOSING*

*Defined in node_modules/@types/ws/index.d.ts:21*

___
<a id="connecting-1"></a>

### `<Static>` CONNECTING

**● CONNECTING**: *`number`*

*Inherited from WebSocket.CONNECTING*

*Defined in node_modules/@types/ws/index.d.ts:19*

___
<a id="open-1"></a>

### `<Static>` OPEN

**● OPEN**: *`number`*

*Inherited from WebSocket.OPEN*

*Defined in node_modules/@types/ws/index.d.ts:20*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

___

## Methods

<a id="addeventlistener"></a>

###  addEventListener

▸ **addEventListener**(method: *"message"*, cb?: *`function`*): `void`

▸ **addEventListener**(method: *"close"*, cb?: *`function`*): `void`

▸ **addEventListener**(method: *"error"*, cb?: *`function`*): `void`

▸ **addEventListener**(method: *"open"*, cb?: *`function`*): `void`

▸ **addEventListener**(method: *`string`*, listener?: *`function`*): `void`

*Inherited from WebSocket.addEventListener*

*Defined in node_modules/@types/ws/index.d.ts:52*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "message" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.addEventListener*

*Defined in node_modules/@types/ws/index.d.ts:53*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "close" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.addEventListener*

*Defined in node_modules/@types/ws/index.d.ts:57*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "error" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.addEventListener*

*Defined in node_modules/@types/ws/index.d.ts:58*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "open" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.addEventListener*

*Defined in node_modules/@types/ws/index.d.ts:59*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | `string` |
| `Optional` listener | `function` |

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

▸ **addListener**(event: *"upgrade"*, listener: *`function`*): `this`

▸ **addListener**(event: *"message"*, listener: *`function`*): `this`

▸ **addListener**(event: *"open"*, listener: *`function`*): `this`

▸ **addListener**(event: *"ping" \| "pong"*, listener: *`function`*): `this`

▸ **addListener**(event: *"unexpected-response"*, listener: *`function`*): `this`

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:80*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:81*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:82*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "upgrade" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:83*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "message" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:84*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "open" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:85*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "ping" \| "pong" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:86*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unexpected-response" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:87*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="close"></a>

###  close

▸ **close**(code?: *`number`*, data?: *`string`*): `void`

*Inherited from WebSocket.close*

*Defined in node_modules/@types/ws/index.d.ts:44*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` code | `number` |
| `Optional` data | `string` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from EventEmitter.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/events.d.ts:22*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in node_modules/@types/node/events.d.ts:23*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:19*

**Returns:** `number`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:24*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in node_modules/@types/node/events.d.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="off"></a>

###  off

▸ **off**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.off*

*Overrides EventEmitter.off*

*Defined in node_modules/@types/node/events.d.ts:16*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**(event: *"close"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

▸ **on**(event: *"upgrade"*, listener: *`function`*): `this`

▸ **on**(event: *"message"*, listener: *`function`*): `this`

▸ **on**(event: *"open"*, listener: *`function`*): `this`

▸ **on**(event: *"ping" \| "pong"*, listener: *`function`*): `this`

▸ **on**(event: *"unexpected-response"*, listener: *`function`*): `this`

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:71*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:72*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:73*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "upgrade" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:74*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "message" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:75*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "open" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:76*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "ping" \| "pong" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:77*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unexpected-response" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:78*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/events.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="ping"></a>

###  ping

▸ **ping**(data?: *`any`*, mask?: *`boolean`*, cb?: *`function`*): `void`

*Inherited from WebSocket.ping*

*Defined in node_modules/@types/ws/index.d.ts:45*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` data | `any` |
| `Optional` mask | `boolean` |
| `Optional` cb | `function` |

**Returns:** `void`

___
<a id="pong"></a>

###  pong

▸ **pong**(data?: *`any`*, mask?: *`boolean`*, cb?: *`function`*): `void`

*Inherited from WebSocket.pong*

*Defined in node_modules/@types/ws/index.d.ts:46*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` data | `any` |
| `Optional` mask | `boolean` |
| `Optional` cb | `function` |

**Returns:** `void`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/events.d.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/events.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="rawlisteners"></a>

###  rawListeners

▸ **rawListeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.rawListeners*

*Overrides EventEmitter.rawListeners*

*Defined in node_modules/@types/node/events.d.ts:21*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in node_modules/@types/node/events.d.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removeeventlistener"></a>

###  removeEventListener

▸ **removeEventListener**(method: *"message"*, cb?: *`function`*): `void`

▸ **removeEventListener**(method: *"close"*, cb?: *`function`*): `void`

▸ **removeEventListener**(method: *"error"*, cb?: *`function`*): `void`

▸ **removeEventListener**(method: *"open"*, cb?: *`function`*): `void`

▸ **removeEventListener**(method: *`string`*, listener?: *`function`*): `void`

*Inherited from WebSocket.removeEventListener*

*Defined in node_modules/@types/ws/index.d.ts:61*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "message" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.removeEventListener*

*Defined in node_modules/@types/ws/index.d.ts:62*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "close" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.removeEventListener*

*Defined in node_modules/@types/ws/index.d.ts:66*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "error" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.removeEventListener*

*Defined in node_modules/@types/ws/index.d.ts:67*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | "open" |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.removeEventListener*

*Defined in node_modules/@types/ws/index.d.ts:68*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | `string` |
| `Optional` listener | `function` |

**Returns:** `void`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"upgrade"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"message"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"open"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"ping" \| "pong"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"unexpected-response"*, listener: *`function`*): `this`

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:89*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:90*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:91*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "upgrade" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:92*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "message" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:93*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "open" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:94*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "ping" \| "pong" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:95*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unexpected-response" |
| listener | `function` |

**Returns:** `this`

*Inherited from WebSocket.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/ws/index.d.ts:96*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="send"></a>

###  send

▸ **send**(data: *`any`*, cb?: *`function`*): `void`

▸ **send**(data: *`any`*, options: *`object`*, cb?: *`function`*): `void`

*Inherited from WebSocket.send*

*Defined in node_modules/@types/ws/index.d.ts:47*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from WebSocket.send*

*Defined in node_modules/@types/ws/index.d.ts:48*

**Parameters:**

**data: `any`**

**options: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` binary | `boolean` |
| `Optional` compress | `boolean` |
| `Optional` fin | `boolean` |
| `Optional` mask | `boolean` |

**`Optional` cb: `function`**

**Returns:** `void`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="terminate"></a>

###  terminate

▸ **terminate**(): `void`

*Inherited from WebSocket.terminate*

*Defined in node_modules/@types/ws/index.d.ts:49*

**Returns:** `void`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:7*

*__deprecated__*: since v4.0.0

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

