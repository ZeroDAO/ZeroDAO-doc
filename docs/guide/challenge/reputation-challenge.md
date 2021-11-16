---
category: Challenging reputation
---

# Challenging reputation

## Launching the challenge

**Api**

```js
const result = await api.tx.ZdRefreshReputation.challenge(target,pathfinder,quantity,score)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ---------- | -------- | ----------------- | -------------------------------------------------- |
| target     | String   | Target user address      | '133...Ms9' |
| pathfinder | String   | `pathfinder` address | '133...Ms9' |
| quantity   | Number   | Total number of paths        | 311                                                |
| score      | Number   | New reputation value        | 136                                                |

The amount of staking will be automatically deducted when the challenge is initiated. You need to upload `quantity` of data after initiating the adjustment, if you fail to upload enough data on time, you will be judged to have failed. The total `score` must be equal to the sum of the scores of all paths uploaded, otherwise it cannot be uploaded.

## Upload data

**Api**

```js
const result = await api.tx.ZdRefreshReputation.challengeUpdate(target,seeds,paths)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | ------------- | ------------ | ------------------------------------------------------------ |
| target | String        | Target user address | '133...Ms9'           |
| seeds  | Array&lt;String&gt; | Collection of seed addresses | ['133...Ms9']         |
| paths  | Array&lt;Path&gt;   | Collection of paths     | [{ nodes: ['1Ew...bknA'] , score: 12}] |

**Path**

- `nodes` - Nodes that do not contain `seed` and `target`
- `score` - The score of the path, which cannot be `0`

::: tip Note

`seeds` and `paths` need to correspond in order.

:::

Challenges, arbitrations all use this interface to upload data and support *breakpoints*. If the data is large and difficult to pack, or if the network is congested, you can try to divide it into several uploads, but the interval should not exceed the system setting.

## Arbitration

**Api**

```js
const result = await api.tx.ZdRefreshReputation.arbitral(target,seeds,paths)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | ------------- | ------------ | ------------------------------------------------------------ |
| target | String        | Target user address | '133...Ms9'           |
| seeds  | Array&lt;String&gt; | Collection of seed addresses | ['133...Ms9']         |
| paths  | Array&lt;Path&gt;   | Collection of paths     | [{ nodes: ['1Ew...bknA'] , score: 12}] |

Upload all the correct paths.

- The interface also supports *breakpoint uploads*. It can be called repeatedly during the upload protection period, only one collateral is required and no other challenger can arbitrate again, beyond the protection period the restriction will be lifted.
- `seeds` and `paths` need to be in order
- Ensure that all incorrect data for `pathfinder` is corrected
- `score` is allowed to be `0`

## Withdrawal of earnings

**Api**

```js
const result = await api.tx.ZdRefreshReputation.harvestChallenge(target)
```

**Parameters**

| **name**   | **type** | **description**   | **example**                                        |
| ------ | -------- | ------------ | -------------------------------------------------- |
| target | String   | Target user address | '133...Ms9' |
