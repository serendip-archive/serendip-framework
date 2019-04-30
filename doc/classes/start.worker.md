[Serendip Framework](../README.md) > [Start](../modules/start.md) > [Worker](../classes/start.worker.md)

# Class: Worker

Worker class is used to store static properties about worker and it's cluster.

## Hierarchy

**Worker**

## Index

### Properties

* [id](start.worker.md#id)
* [isMaster](start.worker.md#ismaster)
* [isWorker](start.worker.md#isworker)
* [others](start.worker.md#others)

---

## Properties

<a id="id"></a>

### `<Static>` id

**● id**: *`number`* =  cluster.worker ? cluster.worker.id : null

*Defined in [src/start.ts:18](https://github.com/m-esm/serendip/blob/570071d/src/start.ts#L18)*

___
<a id="ismaster"></a>

### `<Static>` isMaster

**● isMaster**: *`boolean`* =  cluster.isMaster

*Defined in [src/start.ts:16](https://github.com/m-esm/serendip/blob/570071d/src/start.ts#L16)*

___
<a id="isworker"></a>

### `<Static>` isWorker

**● isWorker**: *`boolean`* =  cluster.isWorker

*Defined in [src/start.ts:17](https://github.com/m-esm/serendip/blob/570071d/src/start.ts#L17)*

___
<a id="others"></a>

### `<Static>` others

**● others**: *`number`[]* =  []

*Defined in [src/start.ts:14](https://github.com/m-esm/serendip/blob/570071d/src/start.ts#L14)*

___

