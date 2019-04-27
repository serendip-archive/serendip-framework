[Serendip Framework](../README.md) > [WebSocket](../modules/websocket.md) > [WebSocketInterface](../interfaces/websocket.websocketinterface.md) > [ClientOptions](../interfaces/websocket.websocketinterface.clientoptions.md)

# Interface: ClientOptions

## Hierarchy

**ClientOptions**

## Index

### Properties

* [agent](websocket.websocketinterface.clientoptions.md#agent)
* [ca](websocket.websocketinterface.clientoptions.md#ca)
* [cert](websocket.websocketinterface.clientoptions.md#cert)
* [ciphers](websocket.websocketinterface.clientoptions.md#ciphers)
* [family](websocket.websocketinterface.clientoptions.md#family)
* [handshakeTimeout](websocket.websocketinterface.clientoptions.md#handshaketimeout)
* [headers](websocket.websocketinterface.clientoptions.md#headers)
* [host](websocket.websocketinterface.clientoptions.md#host)
* [key](websocket.websocketinterface.clientoptions.md#key)
* [localAddress](websocket.websocketinterface.clientoptions.md#localaddress)
* [maxPayload](websocket.websocketinterface.clientoptions.md#maxpayload)
* [origin](websocket.websocketinterface.clientoptions.md#origin)
* [passphrase](websocket.websocketinterface.clientoptions.md#passphrase)
* [perMessageDeflate](websocket.websocketinterface.clientoptions.md#permessagedeflate)
* [pfx](websocket.websocketinterface.clientoptions.md#pfx)
* [protocol](websocket.websocketinterface.clientoptions.md#protocol)
* [protocolVersion](websocket.websocketinterface.clientoptions.md#protocolversion)
* [rejectUnauthorized](websocket.websocketinterface.clientoptions.md#rejectunauthorized)

### Methods

* [checkServerIdentity](websocket.websocketinterface.clientoptions.md#checkserveridentity)

---

## Properties

<a id="agent"></a>

### `<Optional>` agent

**● agent**: *`Agent`*

*Defined in node_modules/@types/ws/index.d.ts:133*

___
<a id="ca"></a>

### `<Optional>` ca

**● ca**: *[CertMeta](websocket.websocketinterface.md#certmeta)*

*Defined in node_modules/@types/ws/index.d.ts:143*

___
<a id="cert"></a>

### `<Optional>` cert

**● cert**: *[CertMeta](websocket.websocketinterface.md#certmeta)*

*Defined in node_modules/@types/ws/index.d.ts:140*

___
<a id="ciphers"></a>

### `<Optional>` ciphers

**● ciphers**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:139*

___
<a id="family"></a>

### `<Optional>` family

**● family**: *`number`*

*Defined in node_modules/@types/ws/index.d.ts:135*

___
<a id="handshaketimeout"></a>

### `<Optional>` handshakeTimeout

**● handshakeTimeout**: *`number`*

*Defined in node_modules/@types/ws/index.d.ts:127*

___
<a id="headers"></a>

### `<Optional>` headers

**● headers**: *`object`*

*Defined in node_modules/@types/ws/index.d.ts:131*

#### Type declaration

[key: `string`]: `string`

___
<a id="host"></a>

### `<Optional>` host

**● host**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:134*

___
<a id="key"></a>

### `<Optional>` key

**● key**: *[CertMeta](websocket.websocketinterface.md#certmeta)*

*Defined in node_modules/@types/ws/index.d.ts:141*

___
<a id="localaddress"></a>

### `<Optional>` localAddress

**● localAddress**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:129*

___
<a id="maxpayload"></a>

### `<Optional>` maxPayload

**● maxPayload**: *`number`*

*Defined in node_modules/@types/ws/index.d.ts:144*

___
<a id="origin"></a>

### `<Optional>` origin

**● origin**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:132*

___
<a id="passphrase"></a>

### `<Optional>` passphrase

**● passphrase**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:138*

___
<a id="permessagedeflate"></a>

### `<Optional>` perMessageDeflate

**● perMessageDeflate**: *`boolean` \| `PerMessageDeflateOptions`*

*Defined in node_modules/@types/ws/index.d.ts:128*

___
<a id="pfx"></a>

### `<Optional>` pfx

**● pfx**: *`string` \| `Buffer`*

*Defined in node_modules/@types/ws/index.d.ts:142*

___
<a id="protocol"></a>

### `<Optional>` protocol

**● protocol**: *`string`*

*Defined in node_modules/@types/ws/index.d.ts:126*

___
<a id="protocolversion"></a>

### `<Optional>` protocolVersion

**● protocolVersion**: *`number`*

*Defined in node_modules/@types/ws/index.d.ts:130*

___
<a id="rejectunauthorized"></a>

### `<Optional>` rejectUnauthorized

**● rejectUnauthorized**: *`boolean`*

*Defined in node_modules/@types/ws/index.d.ts:137*

___

## Methods

<a id="checkserveridentity"></a>

### `<Optional>` checkServerIdentity

▸ **checkServerIdentity**(servername: *`string`*, cert: *[CertMeta](websocket.websocketinterface.md#certmeta)*): `boolean`

*Defined in node_modules/@types/ws/index.d.ts:136*

**Parameters:**

| Name | Type |
| ------ | ------ |
| servername | `string` |
| cert | [CertMeta](websocket.websocketinterface.md#certmeta) |

**Returns:** `boolean`

___

