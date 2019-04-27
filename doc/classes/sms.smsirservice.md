[Serendip Framework](../README.md) > [Sms](../modules/sms.md) > [SmsIrService](../classes/sms.smsirservice.md)

# Class: SmsIrService

## Hierarchy

**SmsIrService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)
* [SmsServiceProviderInterface](../interfaces/sms.smsserviceproviderinterface.md)

## Index

### Constructors

* [constructor](sms.smsirservice.md#constructor)

### Methods

* [credit](sms.smsirservice.md#credit)
* [getToken](sms.smsirservice.md#gettoken)
* [send](sms.smsirservice.md#send)
* [sendAuthCode](sms.smsirservice.md#sendauthcode)
* [start](sms.smsirservice.md#start)
* [configure](sms.smsirservice.md#configure)

### Object literals

* [options](sms.smsirservice.md#options)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SmsIrService**(dbService: *[DbService](db.dbservice.md)*): [SmsIrService](sms.smsirservice.md)

*Defined in [src/sms/SmsIrService.ts:31](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| dbService | [DbService](db.dbservice.md) |

**Returns:** [SmsIrService](sms.smsirservice.md)

___

## Methods

<a id="credit"></a>

###  credit

▸ **credit**(): `Promise`<`Object`>

*Defined in [src/sms/SmsIrService.ts:89](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L89)*

**Returns:** `Promise`<`Object`>

___
<a id="gettoken"></a>

###  getToken

▸ **getToken**(): `Promise`<`Object`>

*Defined in [src/sms/SmsIrService.ts:45](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L45)*

**Returns:** `Promise`<`Object`>

___
<a id="send"></a>

###  send

▸ **send**(mobileNumbers: *`string`[]*, message: *`any`*): `Promise`<`Object`>

*Implementation of [SmsServiceProviderInterface](../interfaces/sms.smsserviceproviderinterface.md).[send](../interfaces/sms.smsserviceproviderinterface.md#send)*

*Defined in [src/sms/SmsIrService.ts:227](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L227)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumbers | `string`[] |
| message | `any` |

**Returns:** `Promise`<`Object`>

___
<a id="sendauthcode"></a>

###  sendAuthCode

▸ **sendAuthCode**(mobileNumber: *`string`*, code: *`string`*, useragent?: *`string`*, ip?: *`string`*): `Promise`<`Object`>

*Implementation of [SmsServiceProviderInterface](../interfaces/sms.smsserviceproviderinterface.md).[sendAuthCode](../interfaces/sms.smsserviceproviderinterface.md#sendauthcode)*

*Defined in [src/sms/SmsIrService.ts:115](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L115)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumber | `string` |
| code | `string` |
| `Optional` useragent | `string` |
| `Optional` ip | `string` |

**Returns:** `Promise`<`Object`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/sms/SmsIrService.ts:261](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L261)*

**Returns:** `Promise`<`void`>

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(options: *[SmsIrServiceOptionsInterface](../interfaces/sms.smsirserviceoptionsinterface.md)*): `void`

*Defined in [src/sms/SmsIrService.ts:29](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [SmsIrServiceOptionsInterface](../interfaces/sms.smsirserviceoptionsinterface.md) |

**Returns:** `void`

___

## Object literals

<a id="options"></a>

### `<Static>` options

**options**: *`object`*

*Defined in [src/sms/SmsIrService.ts:21](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L21)*

<a id="options.apikey"></a>

####  apiKey

**● apiKey**: *`string`* = ""

*Defined in [src/sms/SmsIrService.ts:22](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L22)*

___
<a id="options.linenumber"></a>

####  lineNumber

**● lineNumber**: *`string`* = ""

*Defined in [src/sms/SmsIrService.ts:23](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L23)*

___
<a id="options.secretkey"></a>

####  secretKey

**● secretKey**: *`string`* = ""

*Defined in [src/sms/SmsIrService.ts:24](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L24)*

___
<a id="options.verifytemplate"></a>

####  verifyTemplate

**● verifyTemplate**: *`number`* = 0

*Defined in [src/sms/SmsIrService.ts:25](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L25)*

___
<a id="options.verifytemplatewithipanduseragent"></a>

####  verifyTemplateWithIpAndUseragent

**● verifyTemplateWithIpAndUseragent**: *`number`* = 0

*Defined in [src/sms/SmsIrService.ts:26](https://github.com/m-esm/serendip/blob/c44cfd4/src/sms/SmsIrService.ts#L26)*

___

___

