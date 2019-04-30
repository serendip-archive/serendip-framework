[Serendip Framework](../README.md) > [Sms](../modules/sms.md) > [SmsServiceProviderInterface](../interfaces/sms.smsserviceproviderinterface.md)

# Interface: SmsServiceProviderInterface

@module Sms

## Hierarchy

**SmsServiceProviderInterface**

## Implemented by

* [SerendipSmsService](../classes/sms.serendipsmsservice.md)
* [SmsIrService](../classes/sms.smsirservice.md)

## Index

### Methods

* [send](sms.smsserviceproviderinterface.md#send)
* [sendAuthCode](sms.smsserviceproviderinterface.md#sendauthcode)

---

## Methods

<a id="send"></a>

###  send

▸ **send**(mobileNumbers: *`string`[]*, message: *`any`*): `any`

*Defined in [src/sms/SmsServiceProviderInterface.ts:10](https://github.com/m-esm/serendip/blob/570071d/src/sms/SmsServiceProviderInterface.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumbers | `string`[] |
| message | `any` |

**Returns:** `any`

___
<a id="sendauthcode"></a>

###  sendAuthCode

▸ **sendAuthCode**(mobileNumber: *`string`*, code: *`string`*, useragent?: *`string`*, ip?: *`string`*): `any`

*Defined in [src/sms/SmsServiceProviderInterface.ts:6](https://github.com/m-esm/serendip/blob/570071d/src/sms/SmsServiceProviderInterface.ts#L6)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobileNumber | `string` |
| code | `string` |
| `Optional` useragent | `string` |
| `Optional` ip | `string` |

**Returns:** `any`

___

