[Serendip Framework](../README.md) > [Db](../modules/db.md) > [DbService](../classes/db.dbservice.md)

# Class: DbService

Every functionality thats use database should use it trough this service

## Hierarchy

**DbService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Constructors

* [constructor](db.dbservice.md#constructor)

### Properties

* [dependencies](db.dbservice.md#dependencies)
* [options](db.dbservice.md#options)

### Methods

* [collection](db.dbservice.md#collection)
* [collections](db.dbservice.md#collections)
* [dropCollection](db.dbservice.md#dropcollection)
* [dropDatabase](db.dbservice.md#dropdatabase)
* [events](db.dbservice.md#events)
* [openDownloadStreamByFilePath](db.dbservice.md#opendownloadstreambyfilepath)
* [openUploadStreamByFilePath](db.dbservice.md#openuploadstreambyfilepath)
* [start](db.dbservice.md#start)
* [stats](db.dbservice.md#stats)
* [configure](db.dbservice.md#configure)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DbService**(): [DbService](db.dbservice.md)

*Defined in [src/db/DbService.ts:158](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L158)*

**Returns:** [DbService](db.dbservice.md)

___

## Properties

<a id="dependencies"></a>

### `<Static>` dependencies

**● dependencies**: *`any`[]* =  []

*Defined in [src/db/DbService.ts:28](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L28)*

___
<a id="options"></a>

### `<Static>` options

**● options**: *[DbServiceOptions](../interfaces/db.dbserviceoptions.md)*

*Defined in [src/db/DbService.ts:30](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L30)*

___

## Methods

<a id="collection"></a>

###  collection

▸ **collection**<`T`>(collectionName: *`string`*, track?: *`boolean`*, provider?: *`string`*): `Promise`<[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<`T`>>

*Defined in [src/db/DbService.ts:55](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L55)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| collectionName | `string` |
| `Optional` track | `boolean` |
| `Optional` provider | `string` |

**Returns:** `Promise`<[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<`T`>>

___
<a id="collections"></a>

###  collections

▸ **collections**(provider?: *`string`*): `Promise`<`string`[]>

*Defined in [src/db/DbService.ts:120](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L120)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` provider | `string` |

**Returns:** `Promise`<`string`[]>

___
<a id="dropcollection"></a>

###  dropCollection

▸ **dropCollection**(name: *`string`*, provider?: *`string`*): `Promise`<`boolean`>

*Defined in [src/db/DbService.ts:79](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L79)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` provider | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="dropdatabase"></a>

###  dropDatabase

▸ **dropDatabase**(provider?: *`string`*): `Promise`<`void`>

*Defined in [src/db/DbService.ts:67](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` provider | `string` |

**Returns:** `Promise`<`void`>

___
<a id="events"></a>

###  events

▸ **events**(provider?: *`string`*): `object`

*Defined in [src/db/DbService.ts:149](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L149)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` provider | `string` |

**Returns:** `object`

___
<a id="opendownloadstreambyfilepath"></a>

###  openDownloadStreamByFilePath

▸ **openDownloadStreamByFilePath**(filePath: *`string`*, opts?: *`object`*, provider?: *`string`*): `Promise`<`any`>

*Defined in [src/db/DbService.ts:105](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L105)*

**Parameters:**

**filePath: `string`**

**`Optional` opts: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` end | `number` |
| `Optional` revision | `number` |
| `Optional` start | `number` |

**`Optional` provider: `string`**

**Returns:** `Promise`<`any`>

___
<a id="openuploadstreambyfilepath"></a>

###  openUploadStreamByFilePath

▸ **openUploadStreamByFilePath**(filePath: *`string`*, metadata: *`any`*, provider?: *`string`*): `Promise`<`any`>

*Defined in [src/db/DbService.ts:91](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L91)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |
| metadata | `any` |
| `Optional` provider | `string` |

**Returns:** `Promise`<`any`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/db/DbService.ts:37](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L37)*

**Returns:** `Promise`<`void`>

___
<a id="stats"></a>

###  stats

▸ **stats**(provider?: *`string`*): `Promise`<`object`>

*Defined in [src/db/DbService.ts:137](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L137)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` provider | `string` |

**Returns:** `Promise`<`object`>

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(options: *[DbServiceOptions](../interfaces/db.dbserviceoptions.md)*): `void`

*Defined in [src/db/DbService.ts:32](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [DbServiceOptions](../interfaces/db.dbserviceoptions.md) |

**Returns:** `void`

___

