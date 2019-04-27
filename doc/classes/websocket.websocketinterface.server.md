[Serendip Framework](../README.md) > [WebSocket](../modules/websocket.md) > [WebSocketInterface](../interfaces/websocket.websocketinterface.md) > [Server](../classes/websocket.websocketinterface.server.md)

# Class: Server

## Hierarchy

**Server**

## Index

### Constructors

* [constructor](websocket.websocketinterface.server.md#constructor)

### Properties

* [clients](websocket.websocketinterface.server.md#clients)
* [options](websocket.websocketinterface.server.md#options)
* [path](websocket.websocketinterface.server.md#path)
* [defaultMaxListeners](websocket.websocketinterface.server.md#defaultmaxlisteners)

### Methods

* [addListener](websocket.websocketinterface.server.md#addlistener)
* [address](websocket.websocketinterface.server.md#address)
* [close](websocket.websocketinterface.server.md#close)
* [emit](websocket.websocketinterface.server.md#emit)
* [eventNames](websocket.websocketinterface.server.md#eventnames)
* [getMaxListeners](websocket.websocketinterface.server.md#getmaxlisteners)
* [handleUpgrade](websocket.websocketinterface.server.md#handleupgrade)
* [listenerCount](websocket.websocketinterface.server.md#listenercount)
* [listeners](websocket.websocketinterface.server.md#listeners)
* [off](websocket.websocketinterface.server.md#off)
* [on](websocket.websocketinterface.server.md#on)
* [once](websocket.websocketinterface.server.md#once)
* [prependListener](websocket.websocketinterface.server.md#prependlistener)
* [prependOnceListener](websocket.websocketinterface.server.md#prependoncelistener)
* [rawListeners](websocket.websocketinterface.server.md#rawlisteners)
* [removeAllListeners](websocket.websocketinterface.server.md#removealllisteners)
* [removeListener](websocket.websocketinterface.server.md#removelistener)
* [setMaxListeners](websocket.websocketinterface.server.md#setmaxlisteners)
* [shouldHandle](websocket.websocketinterface.server.md#shouldhandle)
* [listenerCount](websocket.websocketinterface.server.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Server**(options?: *`ServerOptions`*, callback?: *`function`*): [Server](websocket.websocketinterface.server.md)

*Defined in node_modules/@types/ws/index.d.ts:191*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | `ServerOptions` |
| `Optional` callback | `function` |

**Returns:** [Server](websocket.websocketinterface.server.md)

___

## Properties

<a id="clients"></a>

###  clients

**● clients**: *`Set`<`WebSocket`>*

*Defined in node_modules/@types/ws/index.d.ts:191*

___
<a id="options"></a>

###  options

**● options**: *`ServerOptions`*

*Defined in node_modules/@types/ws/index.d.ts:189*

___
<a id="path"></a>

###  path

**● path**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:190*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *"connection"*, cb: *`function`*): `this`

▸ **addListener**(event: *"error"*, cb: *`function`*): `this`

▸ **addListener**(event: *"headers"*, cb: *`function`*): `this`

▸ **addListener**(event: *"listening"*, cb: *`function`*): `this`

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:208*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "connection" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:209*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:210*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "headers" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:211*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "listening" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/ws/index.d.ts:212*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="address"></a>

###  address

▸ **address**(): `AddressInfo` \| `string`

*Defined in node_modules/@types/ws/index.d.ts:195*

**Returns:** `AddressInfo` \| `string`

___
<a id="close"></a>

###  close

▸ **close**(cb?: *`function`*): `void`

*Defined in node_modules/@types/ws/index.d.ts:196*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` cb | `function` |

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
<a id="handleupgrade"></a>

###  handleUpgrade

▸ **handleUpgrade**(request: *`IncomingMessage`*, socket: *`Socket`*, upgradeHead: *`Buffer`*, callback: *`function`*): `void`

*Defined in node_modules/@types/ws/index.d.ts:197*

**Parameters:**

| Name | Type |
| ------ | ------ |
| request | `IncomingMessage` |
| socket | `Socket` |
| upgradeHead | `Buffer` |
| callback | `function` |

**Returns:** `void`

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

▸ **on**(event: *"connection"*, cb: *`function`*): `this`

▸ **on**(event: *"error"*, cb: *`function`*): `this`

▸ **on**(event: *"headers"*, cb: *`function`*): `this`

▸ **on**(event: *"listening"*, cb: *`function`*): `this`

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:202*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "connection" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:203*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:204*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "headers" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:205*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "listening" |
| cb | `function` |

**Returns:** `this`

*Overrides EventEmitter.on*

*Defined in node_modules/@types/ws/index.d.ts:206*

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
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/events.d.ts:15*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

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
<a id="shouldhandle"></a>

###  shouldHandle

▸ **shouldHandle**(request: *`IncomingMessage`*): `boolean`

*Defined in node_modules/@types/ws/index.d.ts:199*

**Parameters:**

| Name | Type |
| ------ | ------ |
| request | `IncomingMessage` |

**Returns:** `boolean`

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

