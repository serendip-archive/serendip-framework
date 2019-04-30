[Serendip Framework](../README.md) > [Db](../modules/db.md) > [DbSyncService](../classes/db.dbsyncservice.md)

# Class: DbSyncService

## Hierarchy

**DbSyncService**

## Index

### Constructors

* [constructor](db.dbsyncservice.md#constructor)

### Properties

* [route](db.dbsyncservice.md#route)

### Methods

* [start](db.dbsyncservice.md#start)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new DbSyncService**(dbService: *[DbService](db.dbservice.md)*, webSocketService: *[WebSocketService](websocket.websocketservice.md)*): [DbSyncService](db.dbsyncservice.md)

*Defined in [src/db/DbSyncService.ts:11](https://github.com/m-esm/serendip/blob/570071d/src/db/DbSyncService.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| dbService | [DbService](db.dbservice.md) |
| webSocketService | [WebSocketService](websocket.websocketservice.md) |

**Returns:** [DbSyncService](db.dbsyncservice.md)

___

## Properties

<a id="route"></a>

###  route

**● route**: *`string`* = "/db_sync"

*Defined in [src/db/DbSyncService.ts:11](https://github.com/m-esm/serendip/blob/570071d/src/db/DbSyncService.ts#L11)*

___

## Methods

<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Defined in [src/db/DbSyncService.ts:21](https://github.com/m-esm/serendip/blob/570071d/src/db/DbSyncService.ts#L21)*

**Returns:** `Promise`<`void`>

___

