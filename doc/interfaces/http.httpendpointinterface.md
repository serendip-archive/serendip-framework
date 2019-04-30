[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpEndpointInterface](../interfaces/http.httpendpointinterface.md)

# Interface: HttpEndpointInterface

## Hierarchy

**HttpEndpointInterface**

## Index

### Properties

* [actions](http.httpendpointinterface.md#actions)
* [description](http.httpendpointinterface.md#description)
* [isStream](http.httpendpointinterface.md#isstream)
* [method](http.httpendpointinterface.md#method)
* [publicAccess](http.httpendpointinterface.md#publicaccess)
* [route](http.httpendpointinterface.md#route)

---

## Properties

<a id="actions"></a>

###  actions

**● actions**: *[HttpEndpointActionInterface](http.httpendpointactioninterface.md)[]*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:30](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L30)*

Series of actions to respond any request to this endpoint route

___
<a id="description"></a>

### `<Optional>` description

**● description**: *`string`*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:25](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L25)*

Action Description

___
<a id="isstream"></a>

### `<Optional>` isStream

**● isStream**: *`boolean`*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:19](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L19)*

___
<a id="method"></a>

###  method

**● method**: *`string`*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:12](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L12)*

Http Method put,post,get,delete

___
<a id="publicaccess"></a>

### `<Optional>` publicAccess

**● publicAccess**: *`boolean`*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:35](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L35)*

is this endpoint publicly accessible by anyone on net

___
<a id="route"></a>

### `<Optional>` route

**● route**: *`string`*

*Defined in [src/http/interfaces/HttpEndpointInterface.ts:17](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointInterface.ts#L17)*

framework router will use this instead of default route

___

