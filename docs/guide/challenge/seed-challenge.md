---
category: Challenge seeds
---

# Challenge seeds

## Launching the challenge

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.challenge(target,pathfinder,quantity,score)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | -------- | -------------- | -------------------------------------------------- |
| target | String   | Target user address   | '133...Ms9' |
| score  | Number   | New centrality score | 136                                                |

The amount of `staking` will be automatically deducted when a challenge is initiated. After a challenge has been successfully launched, `pathfinder` must reply within a set time frame.

## Reply Hash

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyHash(target,hashs,quantity)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| -------- | --------------------- | -------------------- | -------------------------------------------------- |
| target   | String                | Target user address         | '133...Ms9' |
| hashs    | Array&lt;PostResultHash&gt; | he `PostResultHash` collection | [[[1,a3],134], ...]                                |
| quantity | Number                | Total number of uploads         | 311                                                |

**PostResultHash** : `[[u8; 2],u64]` ,This is a tuple of `Order` and `score`. You can find it in [here](../../learn/challenge-games) to find out how to get the `Order` and the score.

Launching a challenge will automatically deduct the amount of the staking. You will need to upload `quantity` of data after initiating an adjustment, and failure to upload enough data on time will result in a failure.

## Continuation hash

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyHashNext(target,hashs)
```

Supports *breakpoint* transfer of `PostResultHash` result sets.

## Examine

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.examine(target,index)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | -------- | -------------- | -------------------------------------------------- |
| target | String   | Target user address   | '133...Ms9' |
| index  | Number   | Index of data for questioning | 12                                                 |

- After all the `pathfinder` uploads have been completed, the challenger will need to find errors in them and initiate a `Examine`.
- After reaching the maximum depth, the `Examine` refers to the total number of incorrect paths.
- When a `Examine` is received, `pathfinder` must reply on time or the system will fail it.

## Reply path

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyPath(target,paths,quantity)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| -------- | ----------- | -------------- | -------------------------------------------------- |
| target   | String      | Target user address   | '133...Ms9' |
| paths    | Array&lt;Path&gt; | Index of data for questioning | [{ nodes: [...],total: 10}, ...]                   |
| quantity | Number      | Total number of uploads   | 12                                                 |

**Path**

- `nodes` - An array of user addresses in the path
- `total` - Number of all shortest paths from the source node to the target node

## Continuation path

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyPathNext(target,paths)
```

## Reply Total number of paths

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyNum(target,mid_paths)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| --------- | -------------------- | ---------------- | -------------------------------------------------- |
| target    | String               | Target user address     | '133...Ms9' |
| mid_paths | Array&lt;Array&lt;String&gt;&gt; | Paths that do not contain endpoints | [['133Hke...LMs9','14ShU...P721N'], ...]           |

- The challenger will initiate this `Examine` if the path total is too large, and `pathfinder` will need to reply to the path total on time.
- At this point the path endpoints are known and we only need to upload the in-between parts. For example, if `A-B-C-D` is interrogated with endpoints `A` and `D`, upload the intermediate nodes of all shortest paths between `A` and `D`:[b,d].

## Evidence of lost hash

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.missedInHashs(target,nodes,index)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | ------------- | ----------------------- | -------------------------------------------------- |
| target | String        | Target user address            | '133...Ms9' |
| nodes  | Array&lt;String&gt; | The shortest path through `target` | ['133Hke...LMs9','14ShU...P721N']                  |
| index  | Number        | Missing `Order` position       | 12                                                 |

After `pathfinder` `Reply` to a hash that does not contain the challenger's `Order`, the challenger may call `missedInHashs` to show evidence of the path. For example, `pathfinder` uploads the following hash data:

| Order | **score** |
| ----- | --------- |
| [0,1] | 12        |
| [0,3] | 16        |

The challenger has a path with Order `[0,2]`. The challenger only needs to produce a path that satisfies the condition, with `index` of `1`. The evidence presented is subject to arbitration, since the system cannot determine whether the shortest path here is actually the shortest.

## Evidence of lost paths

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.missedInPaths(target,nodes)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | ------------- | ----------------------- | -------------------------------------------------- |
| target | String        | Target user address            | '133...Ms9' |
| nodes  | Array&lt;String&gt; | The shortest path through `target` | ['133Hke...LMs9','14ShU...P721N']                  |

After `pathfinder` has uploaded a path, the challenger presents `FullOrder` consistent with the missing path as evidence. The evidence produced is subject to arbitration, as the system cannot determine whether the shortest path here is actually the shortest.

## Evidence of non-shortest paths

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.evidenceOfShorter(target,index，mid_paths)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| -------- | ------------- | -------------------- | -------------------------------------------------- |
| target   | String        | Target user address         | '133...Ms9' |
| index    | Number        | Index in the path set     | 3                                                  |
| mid_path | Array&lt;String&gt; | Nodes that do not contain endpoints | ['133Hke...LMs9','14ShU...P721N']                  |

`pathfinder` After uploading a path, the challenger presents a shorter path. Endpoints are known, only intermediate nodes need to be uploaded. `evidenceOfShorter` has full proof power and does not need to be arbitrated.

## Total number of incorrect paths

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.numberTooLow(target,index，mid_path)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| --------- | -------------------- | -------------------- | -------------------------------------------------- |
| target    | String               | Target user address         | '133...Ms9' |
| index     | Number               | Index in the path set     | 3                                                  |
| mid_paths | Array&lt;Array&lt;String&gt;&gt; | Nodes that do not contain endpoints | [['133Hke...LMs9','14ShU...P721N'], ...]           |

- Challenger showed more paths to prove that the original number was too small.
- The challenger can upload a maximum of `100` data, which is sufficient to invalidate the path.
- Fully probative and not subject to arbitration.

## Invalidation of evidence

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.invalidEvidence(target,mid_path，score)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| -------- | ------------- | -------------------- | -------------------------------------------------- |
| target   | String        | Target user address         | '133...Ms9' |
| mid_path | Array&lt;String&gt; | Nodes that do not contain endpoints | ['133Hke...LMs9','14ShU...P721N']                  |
| score    | Number        | New centrality score       | 1231                                               |

For arbitration of evidence produced by `missedInPaths` or `missedInHashs`, the arbiter needs to upload a shorter path.

- If the path passes through `target` , then both `pathfinder` and `challenger` are proven wrong and the arbiter will act as the new `pathfinder` and the uploaded `score` will be challenged by the other challengers.
- If the path does not go through `target`, `challenger` fails and `pathfinder` and the arbiter will share the money in the pool equally as co-beneficiaries.
- The system will automatically staking.

## Withdrawal of earnings

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.harvestChallenge(target)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | -------- | ------------ | -------------------------------------------------- |
| target | String   | Target user address | '133...Ms9' |

The winning side withdraws the proceeds.

