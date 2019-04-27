[Serendip Framework](../README.md) > [Email](../modules/email.md) > [EmailService](../classes/email.emailservice.md)

# Class: EmailService

## Hierarchy

**EmailService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Constructors

* [constructor](email.emailservice.md#constructor)

### Properties

* [emailTemplates](email.emailservice.md#emailtemplates)
* [options](email.emailservice.md#options)

### Methods

* [send](email.emailservice.md#send)
* [start](email.emailservice.md#start)
* [configure](email.emailservice.md#configure)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EmailService**(dbService: *[DbService](db.dbservice.md)*, viewEngineService: *[ViewEngineService](viewengine.viewengineservice.md)*): [EmailService](email.emailservice.md)

*Defined in [src/email/EmailService.ts:33](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| dbService | [DbService](db.dbservice.md) |
| viewEngineService | [ViewEngineService](viewengine.viewengineservice.md) |

**Returns:** [EmailService](email.emailservice.md)

___

## Properties

<a id="emailtemplates"></a>

### `<Static>` emailTemplates

**● emailTemplates**: *`any`[]* =  []

*Defined in [src/email/EmailService.ts:33](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L33)*

___
<a id="options"></a>

### `<Static>` options

**● options**: *[EmailServiceOptionsInterface](../interfaces/email.emailserviceoptionsinterface.md)*

*Defined in [src/email/EmailService.ts:31](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L31)*

___

## Methods

<a id="send"></a>

###  send

▸ **send**(emailModel: *[EmailModel](email.emailmodel.md)*): `Promise`<`void`>

*Defined in [src/email/EmailService.ts:70](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| emailModel | [EmailModel](email.emailmodel.md) |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/email/EmailService.ts:62](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L62)*

**Returns:** `Promise`<`void`>

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(options: *[EmailServiceOptionsInterface](../interfaces/email.emailserviceoptionsinterface.md)*): `void`

*Defined in [src/email/EmailService.ts:40](https://github.com/m-esm/serendip/blob/c44cfd4/src/email/EmailService.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [EmailServiceOptionsInterface](../interfaces/email.emailserviceoptionsinterface.md) |

**Returns:** `void`

___

