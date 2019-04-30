[Serendip Framework](../README.md) > [Http](../modules/http.md) > [HttpEndpointActionInterface](../interfaces/http.httpendpointactioninterface.md)

# Interface: HttpEndpointActionInterface

## Hierarchy

 `Function`

**↳ HttpEndpointActionInterface**

## Callable
▸ **__call**(req: *[HttpRequestInterface](http.httprequestinterface.md)*, res: *[HttpResponseInterface](http.httpresponseinterface.md)*, next?: *`Function`*, done?: *`Function`*, model?: *`any`*): `any`

*Defined in [src/http/interfaces/HttpEndpointActionInterface.ts:7](https://github.com/m-esm/serendip/blob/570071d/src/http/interfaces/HttpEndpointActionInterface.ts#L7)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | [HttpRequestInterface](http.httprequestinterface.md) |  HttpRequest |
| res | [HttpResponseInterface](http.httpresponseinterface.md) |  HttpResponse |
| `Optional` next | `Function` |  Execute next action in array |
| `Optional` done | `Function` |   |
| `Optional` model | `any` |

**Returns:** `any`

## Index

### Properties

* [Function](http.httpendpointactioninterface.md#function)
* [arguments](http.httpendpointactioninterface.md#arguments)
* [caller](http.httpendpointactioninterface.md#caller)
* [length](http.httpendpointactioninterface.md#length)
* [name](http.httpendpointactioninterface.md#name)
* [prototype](http.httpendpointactioninterface.md#prototype)

### Methods

* [__@hasInstance](http.httpendpointactioninterface.md#___hasinstance)
* [apply](http.httpendpointactioninterface.md#apply)
* [bind](http.httpendpointactioninterface.md#bind)
* [call](http.httpendpointactioninterface.md#call)
* [toString](http.httpendpointactioninterface.md#tostring)

---

## Properties

<a id="function"></a>

###  Function

**● Function**: *`FunctionConstructor`*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:316*

___
<a id="arguments"></a>

###  arguments

**● arguments**: *`any`*

*Inherited from Function.arguments*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:302*

___
<a id="caller"></a>

###  caller

**● caller**: *`Function`*

*Inherited from Function.caller*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:303*

___
<a id="length"></a>

###  length

**● length**: *`number`*

*Inherited from Function.length*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:299*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Inherited from Function.name*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:97*

Returns the name of the function. Function names are read-only and can not be changed.

___
<a id="prototype"></a>

###  prototype

**● prototype**: *`any`*

*Inherited from Function.prototype*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:298*

___

## Methods

<a id="___hasinstance"></a>

###  __@hasInstance

▸ **__@hasInstance**(value: *`any`*): `boolean`

*Inherited from Function.[Symbol.hasInstance]*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:157*

Determines whether the given value inherits from this function if this function was used as a constructor function.

A constructor function can control which objects are recognized as its instances by 'instanceof' by overriding this method.

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="apply"></a>

###  apply

▸ **apply**(this: *`Function`*, thisArg: *`any`*, argArray?: *`any`*): `any`

*Inherited from Function.apply*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:278*

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `Function` |
| thisArg | `any` |  The object to be used as the this object. |
| `Optional` argArray | `any` |  A set of arguments to be passed to the function. |

**Returns:** `any`

___
<a id="bind"></a>

###  bind

▸ **bind**(this: *`Function`*, thisArg: *`any`*, ...argArray: *`any`[]*): `any`

*Inherited from Function.bind*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:293*

For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `Function` |
| thisArg | `any` |  An object to which the this keyword can refer inside the new function. |
| `Rest` argArray | `any`[] |  A list of arguments to be passed to the new function. |

**Returns:** `any`

___
<a id="call"></a>

###  call

▸ **call**(this: *`Function`*, thisArg: *`any`*, ...argArray: *`any`[]*): `any`

*Inherited from Function.call*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:285*

Calls a method of an object, substituting another object for the current object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `Function` |
| thisArg | `any` |  The object to be used as the current object. |
| `Rest` argArray | `any`[] |  A list of arguments to be passed to the method. |

**Returns:** `any`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Inherited from Function.toString*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:296*

Returns a string representation of a function.

**Returns:** `string`

___

