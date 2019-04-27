[Serendip Framework](../README.md) > [Db](../modules/db.md) > [DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)

# Interface: DbCollectionInterface

## Type parameters
#### T 
## Hierarchy

**DbCollectionInterface**

## Index

### Methods

* [count](db.dbcollectioninterface.md#count)
* [deleteOne](db.dbcollectioninterface.md#deleteone)
* [ensureIndex](db.dbcollectioninterface.md#ensureindex)
* [find](db.dbcollectioninterface.md#find)
* [insertOne](db.dbcollectioninterface.md#insertone)
* [updateOne](db.dbcollectioninterface.md#updateone)

---

## Methods

<a id="count"></a>

###  count

▸ **count**(query?: *`any`*): `Promise`<`Number`>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` query | `any` |

**Returns:** `Promise`<`Number`>

___
<a id="deleteone"></a>

###  deleteOne

▸ **deleteOne**(_id: *`string`*, userId?: *`string`*, tackOptions?: *`object`*): `Promise`<`T`>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:34*

**Parameters:**

**_id: `string`**

id of document to delete

**`Optional` userId: `string`**

**`Optional` tackOptions: `object`**

| Name | Type |
| ------ | ------ |
| metaOnly | `boolean` |

**Returns:** `Promise`<`T`>

___
<a id="ensureindex"></a>

###  ensureIndex

▸ **ensureIndex**(fieldOrSpec: *`any`*, options: *`any`*): `Promise`<`void`>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:11*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| fieldOrSpec | `any` |  \- |
| options | `any` |   |

**Returns:** `Promise`<`void`>

___
<a id="find"></a>

###  find

▸ **find**(query?: *`any`*, skip?: *`any`*, limit?: *`any`*): `Promise`<`T`[]>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` query | `any` |
| `Optional` skip | `any` |
| `Optional` limit | `any` |

**Returns:** `Promise`<`T`[]>

___
<a id="insertone"></a>

###  insertOne

▸ **insertOne**(model: *`T` \| `any`*, userId?: *`string`*, tackOptions?: *`object`*): `Promise`<`T`>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:39*

**Parameters:**

**model: `T` \| `any`**

**`Optional` userId: `string`**

**`Optional` tackOptions: `object`**

| Name | Type |
| ------ | ------ |
| metaOnly | `boolean` |

**Returns:** `Promise`<`T`>

___
<a id="updateone"></a>

###  updateOne

▸ **updateOne**(model: *`T`*, userId?: *`string`*, tackOptions?: *`object`*): `Promise`<`T`>

*Defined in node_modules/serendip-business-model/src/db/DbCollectionInterface.ts:21*

**Parameters:**

**model: `T`**

document to insert

**`Optional` userId: `string`**

userId from users collection

**`Optional` tackOptions: `object`**

options for EntityChanges tracking

| Name | Type |
| ------ | ------ |
| metaOnly | `boolean` |

**Returns:** `Promise`<`T`>

___

