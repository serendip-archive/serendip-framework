[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpRequestInterface](../interfaces/http.httprequestinterface.md)

# Interface: HttpRequestInterface

HttpRequest

## Hierarchy

 `IncomingMessage`

**↳ HttpRequestInterface**

## Implements

* `ReadableStream`

## Index

### Constructors

* [constructor](http.httprequestinterface.md#constructor)

### Properties

* [body](http.httprequestinterface.md#body)
* [connection](http.httprequestinterface.md#connection)
* [headers](http.httprequestinterface.md#headers)
* [httpVersion](http.httprequestinterface.md#httpversion)
* [httpVersionMajor](http.httprequestinterface.md#httpversionmajor)
* [httpVersionMinor](http.httprequestinterface.md#httpversionminor)
* [method](http.httprequestinterface.md#method)
* [params](http.httprequestinterface.md#params)
* [query](http.httprequestinterface.md#query)
* [rawHeaders](http.httprequestinterface.md#rawheaders)
* [rawTrailers](http.httprequestinterface.md#rawtrailers)
* [readable](http.httprequestinterface.md#readable)
* [readableHighWaterMark](http.httprequestinterface.md#readablehighwatermark)
* [readableLength](http.httprequestinterface.md#readablelength)
* [socket](http.httprequestinterface.md#socket)
* [statusCode](http.httprequestinterface.md#statuscode)
* [statusMessage](http.httprequestinterface.md#statusmessage)
* [trailers](http.httprequestinterface.md#trailers)
* [url](http.httprequestinterface.md#url)
* [user](http.httprequestinterface.md#user)
* [userToken](http.httprequestinterface.md#usertoken)
* [defaultMaxListeners](http.httprequestinterface.md#defaultmaxlisteners)

### Methods

* [__@asyncIterator](http.httprequestinterface.md#___asynciterator)
* [_destroy](http.httprequestinterface.md#_destroy)
* [_read](http.httprequestinterface.md#_read)
* [addListener](http.httprequestinterface.md#addlistener)
* [destroy](http.httprequestinterface.md#destroy)
* [emit](http.httprequestinterface.md#emit)
* [eventNames](http.httprequestinterface.md#eventnames)
* [getMaxListeners](http.httprequestinterface.md#getmaxlisteners)
* [ip](http.httprequestinterface.md#ip)
* [isPaused](http.httprequestinterface.md#ispaused)
* [listenerCount](http.httprequestinterface.md#listenercount)
* [listeners](http.httprequestinterface.md#listeners)
* [off](http.httprequestinterface.md#off)
* [on](http.httprequestinterface.md#on)
* [once](http.httprequestinterface.md#once)
* [pause](http.httprequestinterface.md#pause)
* [pipe](http.httprequestinterface.md#pipe)
* [prependListener](http.httprequestinterface.md#prependlistener)
* [prependOnceListener](http.httprequestinterface.md#prependoncelistener)
* [push](http.httprequestinterface.md#push)
* [rawListeners](http.httprequestinterface.md#rawlisteners)
* [read](http.httprequestinterface.md#read)
* [removeAllListeners](http.httprequestinterface.md#removealllisteners)
* [removeListener](http.httprequestinterface.md#removelistener)
* [resume](http.httprequestinterface.md#resume)
* [setEncoding](http.httprequestinterface.md#setencoding)
* [setMaxListeners](http.httprequestinterface.md#setmaxlisteners)
* [setTimeout](http.httprequestinterface.md#settimeout)
* [unpipe](http.httprequestinterface.md#unpipe)
* [unshift](http.httprequestinterface.md#unshift)
* [useragent](http.httprequestinterface.md#useragent)
* [wrap](http.httprequestinterface.md#wrap)
* [listenerCount](http.httprequestinterface.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpRequestInterface**(socket: *`Socket`*): [HttpRequestInterface](http.httprequestinterface.md)

*Inherited from IncomingMessage.__constructor*

*Overrides Readable.__constructor*

*Defined in node_modules/@types/node/http.d.ts:169*

**Parameters:**

| Name | Type |
| ------ | ------ |
| socket | `Socket` |

**Returns:** [HttpRequestInterface](http.httprequestinterface.md)

___

## Properties

<a id="body"></a>

###  body

**● body**: *`any`*

*Defined in [src/http/interfaces/HttpRequestInterface.ts:13](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L13)*

___
<a id="connection"></a>

###  connection

**● connection**: *`Socket`*

*Inherited from IncomingMessage.connection*

*Defined in node_modules/@types/node/http.d.ts:175*

___
<a id="headers"></a>

###  headers

**● headers**: *`IncomingHttpHeaders`*

*Inherited from IncomingMessage.headers*

*Defined in node_modules/@types/node/http.d.ts:176*

___
<a id="httpversion"></a>

###  httpVersion

**● httpVersion**: *`string`*

*Inherited from IncomingMessage.httpVersion*

*Defined in node_modules/@types/node/http.d.ts:172*

___
<a id="httpversionmajor"></a>

###  httpVersionMajor

**● httpVersionMajor**: *`number`*

*Inherited from IncomingMessage.httpVersionMajor*

*Defined in node_modules/@types/node/http.d.ts:173*

___
<a id="httpversionminor"></a>

###  httpVersionMinor

**● httpVersionMinor**: *`number`*

*Inherited from IncomingMessage.httpVersionMinor*

*Defined in node_modules/@types/node/http.d.ts:174*

___
<a id="method"></a>

### `<Optional>` method

**● method**: *`string`*

*Inherited from IncomingMessage.method*

*Defined in node_modules/@types/node/http.d.ts:184*

Only valid for request obtained from http.Server.

___
<a id="params"></a>

###  params

**● params**: *`any`*

*Defined in [src/http/interfaces/HttpRequestInterface.ts:14](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L14)*

___
<a id="query"></a>

###  query

**● query**: *`any`*

*Defined in [src/http/interfaces/HttpRequestInterface.ts:12](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L12)*

___
<a id="rawheaders"></a>

###  rawHeaders

**● rawHeaders**: *`string`[]*

*Inherited from IncomingMessage.rawHeaders*

*Defined in node_modules/@types/node/http.d.ts:177*

___
<a id="rawtrailers"></a>

###  rawTrailers

**● rawTrailers**: *`string`[]*

*Inherited from IncomingMessage.rawTrailers*

*Defined in node_modules/@types/node/http.d.ts:179*

___
<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Inherited from Readable.readable*

*Defined in node_modules/@types/node/stream.d.ts:20*

___
<a id="readablehighwatermark"></a>

###  readableHighWaterMark

**● readableHighWaterMark**: *`number`*

*Inherited from Readable.readableHighWaterMark*

*Defined in node_modules/@types/node/stream.d.ts:21*

___
<a id="readablelength"></a>

###  readableLength

**● readableLength**: *`number`*

*Inherited from Readable.readableLength*

*Defined in node_modules/@types/node/stream.d.ts:22*

___
<a id="socket"></a>

###  socket

**● socket**: *`Socket`*

*Inherited from IncomingMessage.socket*

*Defined in node_modules/@types/node/http.d.ts:197*

___
<a id="statuscode"></a>

### `<Optional>` statusCode

**● statusCode**: *`number`*

*Inherited from IncomingMessage.statusCode*

*Defined in node_modules/@types/node/http.d.ts:192*

Only valid for response obtained from http.ClientRequest.

___
<a id="statusmessage"></a>

### `<Optional>` statusMessage

**● statusMessage**: *`string`*

*Inherited from IncomingMessage.statusMessage*

*Defined in node_modules/@types/node/http.d.ts:196*

Only valid for response obtained from http.ClientRequest.

___
<a id="trailers"></a>

###  trailers

**● trailers**: *`object`*

*Inherited from IncomingMessage.trailers*

*Defined in node_modules/@types/node/http.d.ts:178*

#### Type declaration

[key: `string`]: `string` \| `undefined`

___
<a id="url"></a>

### `<Optional>` url

**● url**: *`string`*

*Inherited from IncomingMessage.url*

*Defined in node_modules/@types/node/http.d.ts:188*

Only valid for request obtained from http.Server.

___
<a id="user"></a>

### `<Optional>` user

**● user**: *[UserModel](../classes/auth.usermodel.md)*

*Defined in [src/http/interfaces/HttpRequestInterface.ts:17](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L17)*

___
<a id="usertoken"></a>

### `<Optional>` userToken

**● userToken**: *[TokenModel](../classes/auth.tokenmodel.md)*

*Defined in [src/http/interfaces/HttpRequestInterface.ts:18](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L18)*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

___

## Methods

<a id="___asynciterator"></a>

###  __@asyncIterator

▸ **__@asyncIterator**(): `AsyncIterableIterator`<`any`>

*Inherited from Readable.[Symbol.asyncIterator]*

*Defined in node_modules/@types/node/stream.d.ts:95*

**Returns:** `AsyncIterableIterator`<`any`>

___
<a id="_destroy"></a>

###  _destroy

▸ **_destroy**(error: *`Error` \| `null`*, callback: *`function`*): `void`

*Inherited from Readable._destroy*

*Defined in node_modules/@types/node/stream.d.ts:34*

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `Error` \| `null` |
| callback | `function` |

**Returns:** `void`

___
<a id="_read"></a>

###  _read

▸ **_read**(size: *`number`*): `void`

*Inherited from Readable._read*

*Defined in node_modules/@types/node/stream.d.ts:24*

**Parameters:**

| Name | Type |
| ------ | ------ |
| size | `number` |

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"data"*, listener: *`function`*): `this`

▸ **addListener**(event: *"end"*, listener: *`function`*): `this`

▸ **addListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:46*

Event emitter The defined events on documents including:

1.  close
2.  data
3.  end
4.  readable
5.  error

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:47*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:48*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:49*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:50*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:51*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(error?: *`Error`*): `void`

*Inherited from IncomingMessage.destroy*

*Overrides Readable.destroy*

*Defined in node_modules/@types/node/http.d.ts:198*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` error | `Error` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *"close"*): `boolean`

▸ **emit**(event: *"data"*, chunk: *`any`*): `boolean`

▸ **emit**(event: *"end"*): `boolean`

▸ **emit**(event: *"readable"*): `boolean`

▸ **emit**(event: *"error"*, err: *`Error`*): `boolean`

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:53*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:54*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| chunk | `any` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:55*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:56*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:57*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| err | `Error` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:58*

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
<a id="ip"></a>

###  ip

▸ **ip**(): `string`

*Defined in [src/http/interfaces/HttpRequestInterface.ts:16](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L16)*

**Returns:** `string`

___
<a id="ispaused"></a>

###  isPaused

▸ **isPaused**(): `boolean`

*Inherited from Readable.isPaused*

*Defined in node_modules/@types/node/stream.d.ts:29*

**Returns:** `boolean`

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

▸ **on**(event: *"data"*, listener: *`function`*): `this`

▸ **on**(event: *"end"*, listener: *`function`*): `this`

▸ **on**(event: *"readable"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:60*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:61*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:62*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:63*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:64*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:65*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *"close"*, listener: *`function`*): `this`

▸ **once**(event: *"data"*, listener: *`function`*): `this`

▸ **once**(event: *"end"*, listener: *`function`*): `this`

▸ **once**(event: *"readable"*, listener: *`function`*): `this`

▸ **once**(event: *"error"*, listener: *`function`*): `this`

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:67*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:68*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:69*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:70*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:71*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:72*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Inherited from Readable.pause*

*Defined in node_modules/@types/node/stream.d.ts:27*

**Returns:** `this`

___
<a id="pipe"></a>

###  pipe

▸ **pipe**<`T`>(destination: *`T`*, options?: *`object`*): `T`

*Inherited from internal.pipe*

*Defined in node_modules/@types/node/stream.d.ts:5*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

**destination: `T`**

**`Optional` options: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` end | `boolean` |

**Returns:** `T`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:74*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:75*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:76*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:77*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:78*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:79*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:81*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:82*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:83*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:84*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:85*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:86*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="push"></a>

###  push

▸ **push**(chunk: *`any`*, encoding?: *`string`*): `boolean`

*Inherited from Readable.push*

*Defined in node_modules/@types/node/stream.d.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |

**Returns:** `boolean`

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
<a id="read"></a>

###  read

▸ **read**(size?: *`number`*): `any`

*Inherited from Readable.read*

*Defined in node_modules/@types/node/stream.d.ts:25*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` size | `number` |

**Returns:** `any`

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

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"data"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"end"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:88*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:89*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:90*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:91*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:92*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:93*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="resume"></a>

###  resume

▸ **resume**(): `this`

*Inherited from Readable.resume*

*Defined in node_modules/@types/node/stream.d.ts:28*

**Returns:** `this`

___
<a id="setencoding"></a>

###  setEncoding

▸ **setEncoding**(encoding: *`string`*): `this`

*Inherited from Readable.setEncoding*

*Defined in node_modules/@types/node/stream.d.ts:26*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoding | `string` |

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
<a id="settimeout"></a>

###  setTimeout

▸ **setTimeout**(msecs: *`number`*, callback: *`function`*): `this`

*Inherited from IncomingMessage.setTimeout*

*Defined in node_modules/@types/node/http.d.ts:180*

**Parameters:**

| Name | Type |
| ------ | ------ |
| msecs | `number` |
| callback | `function` |

**Returns:** `this`

___
<a id="unpipe"></a>

###  unpipe

▸ **unpipe**(destination?: *`WritableStream`*): `this`

*Inherited from Readable.unpipe*

*Defined in node_modules/@types/node/stream.d.ts:30*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` destination | `WritableStream` |

**Returns:** `this`

___
<a id="unshift"></a>

###  unshift

▸ **unshift**(chunk: *`any`*): `void`

*Inherited from Readable.unshift*

*Defined in node_modules/@types/node/stream.d.ts:31*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |

**Returns:** `void`

___
<a id="useragent"></a>

###  useragent

▸ **useragent**(): `string`

*Defined in [src/http/interfaces/HttpRequestInterface.ts:15](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpRequestInterface.ts#L15)*

**Returns:** `string`

___
<a id="wrap"></a>

###  wrap

▸ **wrap**(oldStream: *`ReadableStream`*): `this`

*Inherited from Readable.wrap*

*Defined in node_modules/@types/node/stream.d.ts:32*

**Parameters:**

| Name | Type |
| ------ | ------ |
| oldStream | `ReadableStream` |

**Returns:** `this`

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

