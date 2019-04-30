[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpResponseInterface](../interfaces/http.httpresponseinterface.md)

# Interface: HttpResponseInterface

HttpRequest

## Hierarchy

 `ServerResponse`

**↳ HttpResponseInterface**

## Implements

* `WritableStream`

## Index

### Constructors

* [constructor](http.httpresponseinterface.md#constructor)

### Properties

* [chunkedEncoding](http.httpresponseinterface.md#chunkedencoding)
* [connection](http.httpresponseinterface.md#connection)
* [finished](http.httpresponseinterface.md#finished)
* [headersSent](http.httpresponseinterface.md#headerssent)
* [sendDate](http.httpresponseinterface.md#senddate)
* [shouldKeepAlive](http.httpresponseinterface.md#shouldkeepalive)
* [statusCode](http.httpresponseinterface.md#statuscode)
* [statusMessage](http.httpresponseinterface.md#statusmessage)
* [upgrading](http.httpresponseinterface.md#upgrading)
* [useChunkedEncodingByDefault](http.httpresponseinterface.md#usechunkedencodingbydefault)
* [writable](http.httpresponseinterface.md#writable)
* [writableHighWaterMark](http.httpresponseinterface.md#writablehighwatermark)
* [writableLength](http.httpresponseinterface.md#writablelength)
* [defaultMaxListeners](http.httpresponseinterface.md#defaultmaxlisteners)

### Methods

* [_destroy](http.httpresponseinterface.md#_destroy)
* [_final](http.httpresponseinterface.md#_final)
* [_write](http.httpresponseinterface.md#_write)
* [_writev](http.httpresponseinterface.md#_writev)
* [addListener](http.httpresponseinterface.md#addlistener)
* [addTrailers](http.httpresponseinterface.md#addtrailers)
* [assignSocket](http.httpresponseinterface.md#assignsocket)
* [cork](http.httpresponseinterface.md#cork)
* [destroy](http.httpresponseinterface.md#destroy)
* [detachSocket](http.httpresponseinterface.md#detachsocket)
* [emit](http.httpresponseinterface.md#emit)
* [end](http.httpresponseinterface.md#end)
* [eventNames](http.httpresponseinterface.md#eventnames)
* [flushHeaders](http.httpresponseinterface.md#flushheaders)
* [getHeader](http.httpresponseinterface.md#getheader)
* [getHeaderNames](http.httpresponseinterface.md#getheadernames)
* [getHeaders](http.httpresponseinterface.md#getheaders)
* [getMaxListeners](http.httpresponseinterface.md#getmaxlisteners)
* [hasHeader](http.httpresponseinterface.md#hasheader)
* [json](http.httpresponseinterface.md#json)
* [listenerCount](http.httpresponseinterface.md#listenercount)
* [listeners](http.httpresponseinterface.md#listeners)
* [off](http.httpresponseinterface.md#off)
* [on](http.httpresponseinterface.md#on)
* [once](http.httpresponseinterface.md#once)
* [pipe](http.httpresponseinterface.md#pipe)
* [prependListener](http.httpresponseinterface.md#prependlistener)
* [prependOnceListener](http.httpresponseinterface.md#prependoncelistener)
* [rawListeners](http.httpresponseinterface.md#rawlisteners)
* [removeAllListeners](http.httpresponseinterface.md#removealllisteners)
* [removeHeader](http.httpresponseinterface.md#removeheader)
* [removeListener](http.httpresponseinterface.md#removelistener)
* [send](http.httpresponseinterface.md#send)
* [sendFile](http.httpresponseinterface.md#sendfile)
* [setDefaultEncoding](http.httpresponseinterface.md#setdefaultencoding)
* [setHeader](http.httpresponseinterface.md#setheader)
* [setMaxListeners](http.httpresponseinterface.md#setmaxlisteners)
* [setTimeout](http.httpresponseinterface.md#settimeout)
* [uncork](http.httpresponseinterface.md#uncork)
* [write](http.httpresponseinterface.md#write)
* [writeContinue](http.httpresponseinterface.md#writecontinue)
* [writeHead](http.httpresponseinterface.md#writehead)
* [listenerCount](http.httpresponseinterface.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpResponseInterface**(req: *`IncomingMessage`*): [HttpResponseInterface](http.httpresponseinterface.md)

*Inherited from ServerResponse.__constructor*

*Overrides OutgoingMessage.__constructor*

*Defined in node_modules/@types/node/http.d.ts:141*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `IncomingMessage` |

**Returns:** [HttpResponseInterface](http.httpresponseinterface.md)

___

## Properties

<a id="chunkedencoding"></a>

###  chunkedEncoding

**● chunkedEncoding**: *`boolean`*

*Inherited from OutgoingMessage.chunkedEncoding*

*Defined in node_modules/@types/node/http.d.ts:117*

___
<a id="connection"></a>

###  connection

**● connection**: *`Socket`*

*Inherited from OutgoingMessage.connection*

*Defined in node_modules/@types/node/http.d.ts:123*

___
<a id="finished"></a>

###  finished

**● finished**: *`boolean`*

*Inherited from OutgoingMessage.finished*

*Defined in node_modules/@types/node/http.d.ts:121*

___
<a id="headerssent"></a>

###  headersSent

**● headersSent**: *`boolean`*

*Inherited from OutgoingMessage.headersSent*

*Defined in node_modules/@types/node/http.d.ts:122*

___
<a id="senddate"></a>

###  sendDate

**● sendDate**: *`boolean`*

*Inherited from OutgoingMessage.sendDate*

*Defined in node_modules/@types/node/http.d.ts:120*

___
<a id="shouldkeepalive"></a>

###  shouldKeepAlive

**● shouldKeepAlive**: *`boolean`*

*Inherited from OutgoingMessage.shouldKeepAlive*

*Defined in node_modules/@types/node/http.d.ts:118*

___
<a id="statuscode"></a>

###  statusCode

**● statusCode**: *`number`*

*Inherited from ServerResponse.statusCode*

*Defined in node_modules/@types/node/http.d.ts:140*

___
<a id="statusmessage"></a>

###  statusMessage

**● statusMessage**: *`string`*

*Inherited from ServerResponse.statusMessage*

*Defined in node_modules/@types/node/http.d.ts:141*

___
<a id="upgrading"></a>

###  upgrading

**● upgrading**: *`boolean`*

*Inherited from OutgoingMessage.upgrading*

*Defined in node_modules/@types/node/http.d.ts:116*

___
<a id="usechunkedencodingbydefault"></a>

###  useChunkedEncodingByDefault

**● useChunkedEncodingByDefault**: *`boolean`*

*Inherited from OutgoingMessage.useChunkedEncodingByDefault*

*Defined in node_modules/@types/node/http.d.ts:119*

___
<a id="writable"></a>

###  writable

**● writable**: *`boolean`*

*Inherited from Writable.writable*

*Defined in node_modules/@types/node/stream.d.ts:109*

___
<a id="writablehighwatermark"></a>

###  writableHighWaterMark

**● writableHighWaterMark**: *`number`*

*Inherited from Writable.writableHighWaterMark*

*Defined in node_modules/@types/node/stream.d.ts:110*

___
<a id="writablelength"></a>

###  writableLength

**● writableLength**: *`number`*

*Inherited from Writable.writableLength*

*Defined in node_modules/@types/node/stream.d.ts:111*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:8*

___

## Methods

<a id="_destroy"></a>

###  _destroy

▸ **_destroy**(error: *`Error` \| `null`*, callback: *`function`*): `void`

*Inherited from Writable._destroy*

*Defined in node_modules/@types/node/stream.d.ts:115*

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `Error` \| `null` |
| callback | `function` |

**Returns:** `void`

___
<a id="_final"></a>

###  _final

▸ **_final**(callback: *`function`*): `void`

*Inherited from Writable._final*

*Defined in node_modules/@types/node/stream.d.ts:116*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** `void`

___
<a id="_write"></a>

###  _write

▸ **_write**(chunk: *`any`*, encoding: *`string`*, callback: *`function`*): `void`

*Inherited from Writable._write*

*Defined in node_modules/@types/node/stream.d.ts:113*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| encoding | `string` |
| callback | `function` |

**Returns:** `void`

___
<a id="_writev"></a>

### `<Optional>` _writev

▸ **_writev**(chunks: *`Array`<`object`>*, callback: *`function`*): `void`

*Inherited from Writable._writev*

*Defined in node_modules/@types/node/stream.d.ts:114*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunks | `Array`<`object`> |
| callback | `function` |

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"drain"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

▸ **addListener**(event: *"finish"*, listener: *`function`*): `this`

▸ **addListener**(event: *"pipe"*, listener: *`function`*): `this`

▸ **addListener**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:137*

Event emitter The defined events on documents including:

1.  close
2.  drain
3.  error
4.  finish
5.  pipe
6.  unpipe

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:138*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:139*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:140*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:141*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:142*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/stream.d.ts:143*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="addtrailers"></a>

###  addTrailers

▸ **addTrailers**(headers: *`OutgoingHttpHeaders` \| `Array`<[`string`, `string`]>*): `void`

*Inherited from OutgoingMessage.addTrailers*

*Defined in node_modules/@types/node/http.d.ts:134*

**Parameters:**

| Name | Type |
| ------ | ------ |
| headers | `OutgoingHttpHeaders` \| `Array`<[`string`, `string`]> |

**Returns:** `void`

___
<a id="assignsocket"></a>

###  assignSocket

▸ **assignSocket**(socket: *`Socket`*): `void`

*Inherited from ServerResponse.assignSocket*

*Defined in node_modules/@types/node/http.d.ts:145*

**Parameters:**

| Name | Type |
| ------ | ------ |
| socket | `Socket` |

**Returns:** `void`

___
<a id="cork"></a>

###  cork

▸ **cork**(): `void`

*Inherited from Writable.cork*

*Defined in node_modules/@types/node/stream.d.ts:123*

**Returns:** `void`

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(error?: *`Error`*): `void`

*Inherited from Writable.destroy*

*Defined in node_modules/@types/node/stream.d.ts:125*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` error | `Error` |

**Returns:** `void`

___
<a id="detachsocket"></a>

###  detachSocket

▸ **detachSocket**(socket: *`Socket`*): `void`

*Inherited from ServerResponse.detachSocket*

*Defined in node_modules/@types/node/http.d.ts:146*

**Parameters:**

| Name | Type |
| ------ | ------ |
| socket | `Socket` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *"close"*): `boolean`

▸ **emit**(event: *"drain"*): `boolean`

▸ **emit**(event: *"error"*, err: *`Error`*): `boolean`

▸ **emit**(event: *"finish"*): `boolean`

▸ **emit**(event: *"pipe"*, src: *`Readable`*): `boolean`

▸ **emit**(event: *"unpipe"*, src: *`Readable`*): `boolean`

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:145*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:146*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:147*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| err | `Error` |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:148*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:149*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| src | `Readable` |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:150*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| src | `Readable` |

**Returns:** `boolean`

*Inherited from Writable.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/stream.d.ts:151*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="end"></a>

###  end

▸ **end**(cb?: *`function`*): `void`

▸ **end**(chunk: *`any`*, cb?: *`function`*): `void`

▸ **end**(chunk: *`any`*, encoding?: *`string`*, cb?: *`function`*): `void`

*Inherited from Writable.end*

*Defined in node_modules/@types/node/stream.d.ts:120*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from Writable.end*

*Defined in node_modules/@types/node/stream.d.ts:121*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from Writable.end*

*Defined in node_modules/@types/node/stream.d.ts:122*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |
| `Optional` cb | `function` |

**Returns:** `void`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in node_modules/@types/node/events.d.ts:23*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="flushheaders"></a>

###  flushHeaders

▸ **flushHeaders**(): `void`

*Inherited from OutgoingMessage.flushHeaders*

*Defined in node_modules/@types/node/http.d.ts:135*

**Returns:** `void`

___
<a id="getheader"></a>

###  getHeader

▸ **getHeader**(name: *`string`*): `number` \| `string` \| `string`[] \| `undefined`

*Inherited from OutgoingMessage.getHeader*

*Defined in node_modules/@types/node/http.d.ts:129*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `number` \| `string` \| `string`[] \| `undefined`

___
<a id="getheadernames"></a>

###  getHeaderNames

▸ **getHeaderNames**(): `string`[]

*Inherited from OutgoingMessage.getHeaderNames*

*Defined in node_modules/@types/node/http.d.ts:131*

**Returns:** `string`[]

___
<a id="getheaders"></a>

###  getHeaders

▸ **getHeaders**(): `OutgoingHttpHeaders`

*Inherited from OutgoingMessage.getHeaders*

*Defined in node_modules/@types/node/http.d.ts:130*

**Returns:** `OutgoingHttpHeaders`

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:19*

**Returns:** `number`

___
<a id="hasheader"></a>

###  hasHeader

▸ **hasHeader**(name: *`string`*): `boolean`

*Inherited from OutgoingMessage.hasHeader*

*Defined in node_modules/@types/node/http.d.ts:132*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `boolean`

___
<a id="json"></a>

###  json

▸ **json**(data: *`any`*): `void`

*Defined in [src/http/interfaces/HttpResponseInterface.ts:12](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpResponseInterface.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

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

▸ **on**(event: *"close"*, listener: *`function`*): `this`

▸ **on**(event: *"drain"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

▸ **on**(event: *"finish"*, listener: *`function`*): `this`

▸ **on**(event: *"pipe"*, listener: *`function`*): `this`

▸ **on**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:153*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:154*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:155*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:156*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:157*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:158*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/stream.d.ts:159*

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

▸ **once**(event: *"drain"*, listener: *`function`*): `this`

▸ **once**(event: *"error"*, listener: *`function`*): `this`

▸ **once**(event: *"finish"*, listener: *`function`*): `this`

▸ **once**(event: *"pipe"*, listener: *`function`*): `this`

▸ **once**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:161*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:162*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:163*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:164*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:165*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:166*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/stream.d.ts:167*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

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

▸ **prependListener**(event: *"drain"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"finish"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"pipe"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:169*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:170*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:171*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:172*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:173*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:174*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/stream.d.ts:175*

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

▸ **prependOnceListener**(event: *"drain"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"finish"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"pipe"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:177*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:178*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:179*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:180*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:181*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:182*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/stream.d.ts:183*

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
<a id="removeheader"></a>

###  removeHeader

▸ **removeHeader**(name: *`string`*): `void`

*Inherited from OutgoingMessage.removeHeader*

*Defined in node_modules/@types/node/http.d.ts:133*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `void`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"drain"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"finish"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"pipe"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"unpipe"*, listener: *`function`*): `this`

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:185*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:186*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "drain" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:187*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:188*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "finish" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:189*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "pipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:190*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "unpipe" |
| listener | `function` |

**Returns:** `this`

*Inherited from Writable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/stream.d.ts:191*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="send"></a>

###  send

▸ **send**(data: *`any`*): `void`

*Defined in [src/http/interfaces/HttpResponseInterface.ts:11](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpResponseInterface.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `void`

___
<a id="sendfile"></a>

###  sendFile

▸ **sendFile**(path: *`string`*): `void`

*Defined in [src/http/interfaces/HttpResponseInterface.ts:13](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpResponseInterface.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |

**Returns:** `void`

___
<a id="setdefaultencoding"></a>

###  setDefaultEncoding

▸ **setDefaultEncoding**(encoding: *`string`*): `this`

*Inherited from Writable.setDefaultEncoding*

*Defined in node_modules/@types/node/stream.d.ts:119*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `this`

___
<a id="setheader"></a>

###  setHeader

▸ **setHeader**(name: *`string`*, value: *`number` \| `string` \| `string`[]*): `void`

*Inherited from OutgoingMessage.setHeader*

*Defined in node_modules/@types/node/http.d.ts:128*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `number` \| `string` \| `string`[] |

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
<a id="settimeout"></a>

###  setTimeout

▸ **setTimeout**(msecs: *`number`*, callback?: *`function`*): `this`

*Inherited from OutgoingMessage.setTimeout*

*Defined in node_modules/@types/node/http.d.ts:127*

**Parameters:**

| Name | Type |
| ------ | ------ |
| msecs | `number` |
| `Optional` callback | `function` |

**Returns:** `this`

___
<a id="uncork"></a>

###  uncork

▸ **uncork**(): `void`

*Inherited from Writable.uncork*

*Defined in node_modules/@types/node/stream.d.ts:124*

**Returns:** `void`

___
<a id="write"></a>

###  write

▸ **write**(chunk: *`any`*, cb?: *`function`*): `boolean`

▸ **write**(chunk: *`any`*, encoding?: *`string`*, cb?: *`function`*): `boolean`

*Inherited from Writable.write*

*Defined in node_modules/@types/node/stream.d.ts:117*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `function` |

**Returns:** `boolean`

*Inherited from Writable.write*

*Defined in node_modules/@types/node/stream.d.ts:118*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |
| `Optional` cb | `function` |

**Returns:** `boolean`

___
<a id="writecontinue"></a>

###  writeContinue

▸ **writeContinue**(callback?: *`function`*): `void`

*Inherited from ServerResponse.writeContinue*

*Defined in node_modules/@types/node/http.d.ts:149*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` callback | `function` |

**Returns:** `void`

___
<a id="writehead"></a>

###  writeHead

▸ **writeHead**(statusCode: *`number`*, reasonPhrase?: *`string`*, headers?: *`OutgoingHttpHeaders`*): `void`

▸ **writeHead**(statusCode: *`number`*, headers?: *`OutgoingHttpHeaders`*): `void`

*Inherited from ServerResponse.writeHead*

*Defined in node_modules/@types/node/http.d.ts:150*

**Parameters:**

| Name | Type |
| ------ | ------ |
| statusCode | `number` |
| `Optional` reasonPhrase | `string` |
| `Optional` headers | `OutgoingHttpHeaders` |

**Returns:** `void`

*Inherited from ServerResponse.writeHead*

*Defined in node_modules/@types/node/http.d.ts:151*

**Parameters:**

| Name | Type |
| ------ | ------ |
| statusCode | `number` |
| `Optional` headers | `OutgoingHttpHeaders` |

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

