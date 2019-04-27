[Serendip Framework](../README.md) > [Db](../modules/db.md) > [DbProviderInterface](../interfaces/db.dbproviderinterface.md)

# Interface: DbProviderInterface

## Hierarchy

**DbProviderInterface**

## Index

### Properties

* [changes](db.dbproviderinterface.md#changes)
* [events](db.dbproviderinterface.md#events)

### Methods

* [collection](db.dbproviderinterface.md#collection)
* [collections](db.dbproviderinterface.md#collections)
* [dropCollection](db.dbproviderinterface.md#dropcollection)
* [dropDatabase](db.dbproviderinterface.md#dropdatabase)
* [initiate](db.dbproviderinterface.md#initiate)
* [openDownloadStreamByFilePath](db.dbproviderinterface.md#opendownloadstreambyfilepath)
* [openUploadStreamByFilePath](db.dbproviderinterface.md#openuploadstreambyfilepath)
* [stats](db.dbproviderinterface.md#stats)

---

## Properties

<a id="changes"></a>

###  changes

**● changes**: *[DbCollectionInterface](db.dbcollectioninterface.md)<`EntityChangeModel`>*

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:14*

___
<a id="events"></a>

###  events

**● events**: *`object`*

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:16*

#### Type declaration

[key: `string`]: `any`

___

## Methods

<a id="collection"></a>

###  collection

▸ **collection**<`T`>(collectionName: *`string`*, trackChanges?: *`boolean`*): `Promise`<[DbCollectionInterface](db.dbcollectioninterface.md)<`T`>>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:10*

return db collection as interface

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| collectionName | `string` |
| `Optional` trackChanges | `boolean` |

**Returns:** `Promise`<[DbCollectionInterface](db.dbcollectioninterface.md)<`T`>>

___
<a id="collections"></a>

###  collections

▸ **collections**(): `Promise`<`string`[]>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:23*

**Returns:** `Promise`<`string`[]>

___
<a id="dropcollection"></a>

###  dropCollection

▸ **dropCollection**(name: *`string`*): `Promise`<`boolean`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:26*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="dropdatabase"></a>

###  dropDatabase

▸ **dropDatabase**(): `Promise`<`void`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:24*

**Returns:** `Promise`<`void`>

___
<a id="initiate"></a>

###  initiate

▸ **initiate**(options?: *`any`*): `Promise`<`void`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:22*

options for this provider

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | `any` |

**Returns:** `Promise`<`void`>

___
<a id="opendownloadstreambyfilepath"></a>

### `<Optional>` openDownloadStreamByFilePath

▸ **openDownloadStreamByFilePath**(filePath: *`string`*, opts?: *`object`*): `Promise`<`any`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:41*

**Parameters:**

**filePath: `string`**

**`Optional` opts: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` end | `number` |
| `Optional` revision | `number` |
| `Optional` start | `number` |

**Returns:** `Promise`<`any`>

___
<a id="openuploadstreambyfilepath"></a>

### `<Optional>` openUploadStreamByFilePath

▸ **openUploadStreamByFilePath**(filePath: *`string`*, metadata: *`any`*): `Promise`<`any`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:39*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |
| metadata | `any` |

**Returns:** `Promise`<`any`>

___
<a id="stats"></a>

###  stats

▸ **stats**(): `Promise`<`object`>

*Defined in node_modules/serendip-business-model/src/db/DbProviderInterface.ts:28*

**Returns:** `Promise`<`object`>

___

