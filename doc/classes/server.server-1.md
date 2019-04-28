[Serendip Framework](../README.md) > [Server](../modules/server.md) > [Server](../classes/server.server-1.md)

# Class: Server

Will contain everything that we need from server

## Hierarchy

**Server**

## Index

### Constructors

* [constructor](server.server-1.md#constructor)

### Properties

* [dir](server.server-1.md#dir)
* [opts](server.server-1.md#opts)
* [services](server.server-1.md#services)
* [worker](server.server-1.md#worker)

### Methods

* [startService](server.server-1.md#startservice)
* [bootstrap](server.server-1.md#bootstrap)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Server**(opts: *[ServerOptionsInterface](../interfaces/server.serveroptionsinterface-1.md)*, worker: *`Worker`*, callback?: *`Function`*): [Server](server.server-1.md)

*Defined in [src/server/Server.ts:36](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| opts | [ServerOptionsInterface](../interfaces/server.serveroptionsinterface-1.md) |
| worker | `Worker` |
| `Optional` callback | `Function` |

**Returns:** [Server](server.server-1.md)

___

## Properties

<a id="dir"></a>

### `<Static>` dir

**● dir**: *`string`*

*Defined in [src/server/Server.ts:23](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L23)*

___
<a id="opts"></a>

### `<Static>` opts

**● opts**: *[ServerOptionsInterface](../interfaces/server.serveroptionsinterface-1.md)*

*Defined in [src/server/Server.ts:27](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L27)*

___
<a id="services"></a>

### `<Static>` services

**● services**: *`any`*

*Defined in [src/server/Server.ts:25](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L25)*

___
<a id="worker"></a>

### `<Static>` worker

**● worker**: *`Worker`*

*Defined in [src/server/Server.ts:21](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L21)*

instance of process worker

___

## Methods

<a id="startservice"></a>

###  startService

▸ **startService**(index: *`number`*, serviceObjects: *`object`*, sortedDependencies: *`string`[]*, unsortedDependencies: *`string`[][]*): `any`

*Defined in [src/server/Server.ts:118](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L118)*

Will start services from Index to length of sortedDependencies

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  Index of item in sortedDependencies to start |
| serviceObjects | `object` |  key value object that contains service objects and their names |
| sortedDependencies | `string`[] |  Service names sorted by dependency order |
| unsortedDependencies | `string`[][] |

**Returns:** `any`

___
<a id="bootstrap"></a>

### `<Static>` bootstrap

▸ **bootstrap**(opts: *[ServerOptionsInterface](../interfaces/server.serveroptionsinterface-1.md)*, worker: *`Worker` \| `any`*, serverStartCallback?: *`Function`*): [Server](server.server-1.md)

*Defined in [src/server/Server.ts:30](https://github.com/m-esm/serendip/blob/17b0858/src/server/Server.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| opts | [ServerOptionsInterface](../interfaces/server.serveroptionsinterface-1.md) |
| worker | `Worker` \| `any` |
| `Optional` serverStartCallback | `Function` |

**Returns:** [Server](server.server-1.md)

___

