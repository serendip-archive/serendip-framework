[Serendip Framework](../README.md) > [ViewEngine](../modules/viewengine.md) > [ViewEngineService](../classes/viewengine.viewengineservice.md)

# Class: ViewEngineService

## Hierarchy

**ViewEngineService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Properties

* [dependencies](viewengine.viewengineservice.md#dependencies)

### Methods

* [renderMustache](viewengine.viewengineservice.md#rendermustache)
* [start](viewengine.viewengineservice.md#start)

---

## Properties

<a id="dependencies"></a>

### `<Static>` dependencies

**● dependencies**: *`any`[]* =  []

*Defined in [src/ui/ViewEngineService.ts:11](https://github.com/m-esm/serendip/blob/17b0858/src/ui/ViewEngineService.ts#L11)*

___

## Methods

<a id="rendermustache"></a>

###  renderMustache

▸ **renderMustache**(toRender: *`string`*, model: *`any`*, partials?: *`any`*): `string`

*Defined in [src/ui/ViewEngineService.ts:18](https://github.com/m-esm/serendip/blob/17b0858/src/ui/ViewEngineService.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| toRender | `string` |
| model | `any` |
| `Optional` partials | `any` |

**Returns:** `string`

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/ui/ViewEngineService.ts:13](https://github.com/m-esm/serendip/blob/17b0858/src/ui/ViewEngineService.ts#L13)*

**Returns:** `Promise`<`void`>

___

