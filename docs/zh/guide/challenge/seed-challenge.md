---
category: 种子挑战
---

# 种子挑战

## 发起挑战

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.challenge(target,pathfinder,quantity,score)
```

**请求参数**

| 字段名 | **类型** | **描述**       | **示例**                                           |
| ------ | -------- | -------------- | -------------------------------------------------- |
| target | String   | 目标用户地址   | '133...Ms9' |
| score  | Number   | 新的中心度得分 | 136                                                |

发起挑战会自动扣除抵押金额。挑战成功发起后，`pathfinder` 必须在设定时间内回复。

## 回复哈希

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyHash(target,hashs,quantity)
```

**请求参数**

| 字段名   | **类型**              | **描述**             | **示例**                                           |
| -------- | --------------------- | -------------------- | -------------------------------------------------- |
| target   | String                | 目标用户地址         | '133...Ms9' |
| hashs    | Array&lt;PostResultHash&gt; | `PostResultHash`集合 | [[[1,a3],134], ...]                                |
| quantity | Number                | 上传的总数量         | 311                                                |

**PostResultHash** : `[[u8; 2],u64]` ,这是一个 `Order` 和 `score` 组成的元组。你可以在这里了解如何获取 `Order` 和分值。

发起挑战会自动扣除抵押金额。发起调整后需要上传 `quantity` 条数据，如果未能按时上传足够数据，将被系统判定失败。

## 续传哈希

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyHashNext(target,hashs)
```

支持断点续传 `PostResultHash` 结果集。

## 质询

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.examine(target,index)
```

**请求参数**

| 字段名 | **类型** | **描述**       | **示例**                                           |
| ------ | -------- | -------------- | -------------------------------------------------- |
| target | String   | 目标用户地址   | '133...Ms9' |
| index  | Number   | 质询的数据位置 | 12                                                 |

- `pathfinder` 全部上传完成后，挑战者需要从中发现错误，发起质询。
- 到达最大深度后，质询指的是错误的路径总量。
- 在收到质询后，`pathfinder` 必须按时回复，否则系统将判定其失败。

## 回复路径

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyPath(target,paths,quantity)
```

**请求参数**

| 字段名   | **类型**    | **描述**       | **示例**                                           |
| -------- | ----------- | -------------- | -------------------------------------------------- |
| target   | String      | 目标用户地址   | '133...Ms9' |
| paths    | Array&lt;Path&gt; | 质询的数据位置 | [{ nodes: [...],total: 10}, ...]                   |
| quantity | Number      | 上传的总数量   | 12                                                 |

**Path**

- `nodes` - 路径中的用户地址的数组
- `total` - 从源节点到目标节点所有最短路径的数量

## 续传路径

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyPathNext(target,paths)
```

## 回复路径总量

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.replyNum(target,mid_paths)
```

**请求参数**

| 字段名    | **类型**             | **描述**         | **示例**                                           |
| --------- | -------------------- | ---------------- | -------------------------------------------------- |
| target    | String               | 目标用户地址     | '133...Ms9' |
| mid_paths | Array&lt;Array&lt;String&gt;&gt; | 不包含端点的路径 | [['133Hke...LMs9','14ShU...P721N'], ...]           |

- 挑战者在认为路径总量过大时会发起这种质询，`pathfinder` 需要按时回复路径总量。
- 此时路径端点是已知的，我们只需要上传之间部分。例如，`A-B-C-D` 被质询，端点为 `A` 和 `D` ，上传 `A` 和`D` 之间的所有最短路径的中间节点:[b,d]。

## 丢失hash的证据

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.missedInHashs(target,nodes,index)
```

**请求参数**

| 字段名 | **类型**      | **描述**                | **示例**                                           |
| ------ | ------------- | ----------------------- | -------------------------------------------------- |
| target | String        | 目标用户地址            | '133...Ms9' |
| nodes  | Array&lt;String&gt; | 经过`target` 的最短路径 | ['133Hke...LMs9','14ShU...P721N']                  |
| index  | Number        | 缺失`Order`的位置       | 12                                                 |

在 `pathfinder` 回复hash之后，未包含挑战者的`Order` ，挑战者可调用 `missedInHashs` 出示路径证据。例如，`pathfinder` 上传的hash数据如下:

| Order | **score** |
| ----- | --------- |
| [0,1] | 12        |
| [0,3] | 16        |

挑战者拥有 Order 为 `[0,2]` 的路径。挑战者只需要出示一条满足条件的路径即可，`index` 为 `1` 。出示的证据需要经过仲裁，因为系统无法确定这里的最短路径是否真的是最短的。

## 丢失路径的证据

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.missedInPaths(target,nodes)
```

**请求参数**

| 字段名 | **类型**      | **描述**                | **示例**                                           |
| ------ | ------------- | ----------------------- | -------------------------------------------------- |
| target | String        | 目标用户地址            | '133...Ms9' |
| nodes  | Array&lt;String&gt; | 经过`target` 的最短路径 | ['133Hke...LMs9','14ShU...P721N']                  |

`pathfinder` 上传路径后，挑战者出示 `FullOrder` 一致的缺失路径作为证据。出示的证据需要经过仲裁，因为系统无法确定这里的最短路径是否真的是最短的。

## 非最短路径的证据

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.evidenceOfShorter(target,index，mid_paths)
```

**请求参数**

| 字段名   | **类型**      | **描述**             | **示例**                                           |
| -------- | ------------- | -------------------- | -------------------------------------------------- |
| target   | String        | 目标用户地址         | '133...Ms9' |
| index    | Number        | 在路径集中的位置     | 3                                                  |
| mid_path | Array&lt;String&gt; | 不包含端点的中间节点 | ['133Hke...LMs9','14ShU...P721N']                  |

`pathfinder` 上传路径后，挑战者出示更短的路径。端点已知，仅需上传中间节点。`evidenceOfShorter` 具有完全证明力，无需经过仲裁。

## 错误的路径总数

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.numberTooLow(target,index，mid_path)
```

**请求参数**

| 字段名    | **类型**             | **描述**             | **示例**                                           |
| --------- | -------------------- | -------------------- | -------------------------------------------------- |
| target    | String               | 目标用户地址         | '133...Ms9' |
| index     | Number               | 在路径集中的位置     | 3                                                  |
| mid_paths | Array&lt;Array&lt;String&gt;&gt; | 不包含端点的中间节点 | [['133Hke...LMs9','14ShU...P721N'], ...]           |

- `pathfinder` 回复了路径总数的质询，挑战者出示更多路径来证明原来的数字过小。
- 挑战者最多可上传 `100` 条数据，这足以证明该路径无效。
- 具有完全证明力，无需经过仲裁。

## 证据无效

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.invalidEvidence(target,mid_path，score)
```

**请求参数**

| 字段名   | **类型**      | **描述**             | **示例**                                           |
| -------- | ------------- | -------------------- | -------------------------------------------------- |
| target   | String        | 目标用户地址         | '133...Ms9' |
| mid_path | Array&lt;String&gt; | 不包含端点的中间节点 | ['133Hke...LMs9','14ShU...P721N']                  |
| score    | Number        | 新的中心度得分       | 1231                                               |

对 `missedInPaths` 或 `missedInHashs`所出示证据的仲裁，仲裁者需要上传更短的路径。

- 如路径经过 `target` ,则证明 `pathfinder` 和 `challenger` 都是错误的，仲裁者将作为新的 `pathfinder` ，上传的 `score` 将接受其他挑战者的挑战。
- 如果路径不经过 `target` ,说明 `challenger`失败，`pathfinder` 和仲裁者将作为共同受益人，平分池中的资金。
- 系统会自动 staking。

## 提取收益

**Api**

```js
const result = await api.tx.ZdRefreshSeeds.harvestChallenge(target)
```

**请求参数**

| 字段名 | **类型** | **描述**     | **示例**                                           |
| ------ | -------- | ------------ | -------------------------------------------------- |
| target | String   | 目标用户地址 | '133...Ms9' |

获胜方提取收益。

