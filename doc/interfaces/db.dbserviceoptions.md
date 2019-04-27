[Serendip Framework](../README.md) > [Db](../modules/db.md) > [DbServiceOptions](../interfaces/db.dbserviceoptions.md)

# Interface: DbServiceOptions

## Hierarchy

**DbServiceOptions**

## Index

### Properties

* [defaultProvider](db.dbserviceoptions.md#defaultprovider)
* [providers](db.dbserviceoptions.md#providers)

---

## Properties

<a id="defaultprovider"></a>

### `<Optional>` defaultProvider

**● defaultProvider**: *`string`*

*Defined in [src/db/DbService.ts:14](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L14)*

name of default provider. will be used in case of executing collection without provider argument set

___
<a id="providers"></a>

### `<Optional>` providers

**● providers**: *`object`*

*Defined in [src/db/DbService.ts:16](https://github.com/m-esm/serendip/blob/c44cfd4/src/db/DbService.ts#L16)*

#### Type declaration

[key: `string`]: `object`

`Optional`  object: [DbProviderInterface](db.dbproviderinterface.md)

`Optional`  options: [DbProviderOptionsInterface](db.dbprovideroptionsinterface.md)

___

