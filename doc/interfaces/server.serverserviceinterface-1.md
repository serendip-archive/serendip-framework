[Serendip Framework](../README.md) > [Server](../modules/server.md) > [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

# Interface: ServerServiceInterface

@module Server

## Hierarchy

**ServerServiceInterface**

## Implemented by

* [AuthService](../classes/auth.authservice.md)
* [DbService](../classes/db.dbservice.md)
* [EmailService](../classes/email.emailservice.md)
* [FaxService](../classes/fax.faxservice.md)
* [HttpService](../classes/http.httpservice.md)
* [SerendipSmsService](../classes/sms.serendipsmsservice.md)
* [SmsIrService](../classes/sms.smsirservice.md)
* [ViewEngineService](../classes/viewengine.viewengineservice.md)
* [WebSocketService](../classes/websocket.websocketservice.md)

## Index

### Properties

* [dependencies](server.serverserviceinterface-1.md#dependencies)
* [options](server.serverserviceinterface-1.md#options)

### Methods

* [configure](server.serverserviceinterface-1.md#configure)
* [start](server.serverserviceinterface-1.md#start)

---

## Properties

<a id="dependencies"></a>

### `<Optional>` dependencies

**● dependencies**: *`string`[]*

*Defined in [src/server/ServerServiceInterface.ts:10](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerServiceInterface.ts#L10)*

___
<a id="options"></a>

### `<Optional>` options

**● options**: *`any`*

*Defined in [src/server/ServerServiceInterface.ts:13](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerServiceInterface.ts#L13)*

___

## Methods

<a id="configure"></a>

### `<Optional>` configure

▸ **configure**(options: *`any`*): `void`

*Defined in [src/server/ServerServiceInterface.ts:16](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerServiceInterface.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `void`

___
<a id="start"></a>

### `<Optional>` start

▸ **start**(): `Promise`<`any`>

*Defined in [src/server/ServerServiceInterface.ts:7](https://github.com/m-esm/serendip/blob/570071d/src/server/ServerServiceInterface.ts#L7)*

**Returns:** `Promise`<`any`>

___

