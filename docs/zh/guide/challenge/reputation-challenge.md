---
category: 声誉挑战
---

# 声誉挑战

## 发起挑战

**Api**

```js
const result = await api.tx.ZdRefreshReputation.challenge(target,pathfinder,quantity,score)
```

**请求参数**

| 字段名     | **类型** | **描述**          | **示例**                                           |
| ---------- | -------- | ----------------- | -------------------------------------------------- |
| target     | String   | 目标用户地址      | '133...Ms9' |
| pathfinder | String   | `pathfinder` 地址 | '133...Ms9' |
| quantity   | Number   | 总路径数量        | 311                                                |
| score      | Number   | 新的声誉值        | 136                                                |

发起挑战会自动扣除抵押金额。发起调整后需要上传 `quantity` 条数据，如果未能按时上传足够数据，将被系统判定失败。`score` 总得分必须和上传的所有路径得分之和相等，否则无法上传。

## 上传数据

**Api**

```js
const result = await api.tx.ZdRefreshReputation.challengeUpdate(target,seeds,paths)
```

**请求参数**

| 字段名 | **类型**      | **描述**     | **示例**                                                     |
| ------ | ------------- | ------------ | ------------------------------------------------------------ |
| target | String        | 目标用户地址 | '133...Ms9'           |
| seeds  | Array&lt;String&gt; | 种子地址集合 | ['133...Ms9']         |
| paths  | Array&lt;Path&gt;   | 路径集合     | [{ nodes: ['1Ew...bknA'] , score: 12}] |

**Path**

- `nodes` - 不包含`seed` 和 `target` 的节点
- `score` - 该路径的得分，不可为 `0`

::: tip 提醒

`seeds` 和 `paths` 需要按顺序一一对应。

:::

挑战、仲裁都使用这个接口上传数据，支持断点续传，如果数据较大难以打包，或网络拥堵，可以尝试分为几次上传，但间隔时间不要超过系统设定。

## 仲裁

**Api**

```js
const result = await api.tx.ZdRefreshReputation.arbitral(target,seeds,paths)
```

**请求参数**

| 字段名 | **类型**      | **描述**     | **示例**                                                     |
| ------ | ------------- | ------------ | ------------------------------------------------------------ |
| target | String        | 目标用户地址 | '133...Ms9'           |
| seeds  | Array&lt;String&gt; | 种子地址集合 | ['133...Ms9']         |
| paths  | Array&lt;Path&gt;   | 路径集合     | [{ nodes: ['1Ew...bknA'] , score: 12}] |

上传所有正确的路径。

- 该接口同样支持断点续传。在上传保护期内可重复调用，只需要支付一次抵押，并且其他挑战者无法再次仲裁，超过保护期将解除限制。
- `seeds` 和 `paths` 需要按顺序一一对应
- 确保纠正 `pathfinder` 的所有错误数据
- `score` 可以为 `0`

## 提取收益

**Api**

```js
const result = await api.tx.ZdRefreshReputation.harvestChallenge(target)
```

**请求参数**

| 字段名 | **类型** | **描述**     | **示例**                                           |
| ------ | -------- | ------------ | -------------------------------------------------- |
| target | String   | 目标用户地址 | '133...Ms9' |
