[Serendip Framework](../README.md) > [Sms](../modules/sms.md) > [SerendipSmsService](../classes/sms.serendipsmsservice.md)

# Class: SerendipSmsService

## Hierarchy

**SerendipSmsService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)
* [SmsServiceProviderInterface](../interfaces/sms.smsserviceproviderinterface.md)

## Index

### Constructors

* [constructor](sms.serendipsmsservice.md#constructor)

### Properties

* [dependencies](sms.serendipsmsservice.md#dependencies)

### Methods

* [credit](sms.serendipsmsservice.md#credit)
* [getToken](sms.serendipsmsservice.md#gettoken)
* [send](sms.serendipsmsservice.md#send)
* [sendAuthCode](sms.serendipsmsservice.md#sendauthcode)
* [start](sms.serendipsmsservice.md#start)
* [configure](sms.serendipsmsservice.md#configure)

### Object literals

* [options](sms.serendipsmsservice.md#options)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SerendipSmsService**(): [SerendipSmsService](sms.serendipsmsservice.md)

*Defined in [src/sms/SerendipSmsService.ts:44](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L44)*

**Returns:** [SerendipSmsService](sms.serendipsmsservice.md)

___

## Properties

<a id="dependencies"></a>

### `<Static>` dependencies

**● dependencies**: *`string`[]* =  ["DbService"]

*Defined in [src/sms/SerendipSmsService.ts:35](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L35)*

___

## Methods

<a id="credit"></a>

###  credit

▸ **credit**(): `Promise`<`number`>

*Defined in [src/sms/SerendipSmsService.ts:96](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L96)*

**Returns:** `Promise`<`number`>

___
<a id="gettoken"></a>

###  getToken

▸ **getToken**(): `Promise`<[TokenModel](auth.tokenmodel.md)>

*Defined in [src/sms/SerendipSmsService.ts:57](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L57)*

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)>

___
<a id="send"></a>

###  send

▸ **send**(mobileNumbers: *`string`[]*, message: *`string`*, model?: *`any`*, templateId?: *`string`*): `Promise`<`Object`>

*Defined in [src/sms/SerendipSmsService.ts:129](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L129)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumbers | `string`[] |
| message | `string` |
| `Optional` model | `any` |
| `Optional` templateId | `string` |

**Returns:** `Promise`<`Object`>

___
<a id="sendauthcode"></a>

###  sendAuthCode

▸ **sendAuthCode**(mobileNumber: *`string`*, code: *`string`*, useragent?: *`string`*, ip?: *`string`*, templateId?: *`string`*): `Promise`<`Object`>

*Defined in [src/sms/SerendipSmsService.ts:117](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L117)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumber | `string` |
| code | `string` |
| `Optional` useragent | `string` |
| `Optional` ip | `string` |
| `Optional` templateId | `string` |

**Returns:** `Promise`<`Object`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/sms/SerendipSmsService.ts:163](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L163)*

**Returns:** `Promise`<`void`>

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(options: *[SerendipSmsService](sms.serendipsmsservice.md)*): `void`

*Defined in [src/sms/SerendipSmsService.ts:42](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L42)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [SerendipSmsService](sms.serendipsmsservice.md) |

**Returns:** `void`

___

## Object literals

<a id="options"></a>

### `<Static>` options

**options**: *`object`*

*Defined in [src/sms/SerendipSmsService.ts:37](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L37)*

<a id="options.password"></a>

####  password

**● password**: *`string`* = ""

*Defined in [src/sms/SerendipSmsService.ts:39](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L39)*

___
<a id="options.username"></a>

####  username

**● username**: *`string`* = ""

*Defined in [src/sms/SerendipSmsService.ts:38](https://github.com/m-esm/serendip/blob/17b0858/src/sms/SerendipSmsService.ts#L38)*

___

___

