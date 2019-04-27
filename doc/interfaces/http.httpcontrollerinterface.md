[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpControllerInterface](../interfaces/http.httpcontrollerinterface.md)

# Interface: HttpControllerInterface

## Hierarchy

**HttpControllerInterface**

## Implemented by

* [DbSyncController](../classes/db.dbsynccontroller.md)

## Index

### Methods

* [onRequest](http.httpcontrollerinterface.md#onrequest)

---

## Methods

<a id="onrequest"></a>

### `<Optional>` onRequest

▸ **onRequest**(req: *[HttpRequestInterface](http.httprequestinterface.md)*, res: *[HttpResponseInterface](http.httpresponseinterface.md)*, next?: *`Function`*, done?: *`Function`*, model?: *`any`*): `any`

*Defined in [src/http/interfaces/HttpControllerInterface.ts:11](https://github.com/m-esm/serendip/blob/c44cfd4/src/http/interfaces/HttpControllerInterface.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | [HttpRequestInterface](http.httprequestinterface.md) |
| res | [HttpResponseInterface](http.httpresponseinterface.md) |
| `Optional` next | `Function` |
| `Optional` done | `Function` |
| `Optional` model | `any` |

**Returns:** `any`

___

