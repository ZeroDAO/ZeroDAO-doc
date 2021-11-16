---
category: 获取数据
---

# 获取数据

我们使用 `polkadot.js` 提供的接口来演示，你可以在[这里](https://polkadot.js.org/docs/)获取更多信息。

## 获取声誉

链上保存了用户最近两期更新的声誉。

```js
const result = await api.query.zdReputation.reputationScores(address)
```

Return:

```js
[
    {
        nonce: 12,
        score: 1233
    },
    {
        nonce: 9,
        score: 1233
    }
]
```

`nonce` 是声誉系统更新的次数，你还需要获取系统运行状态：

```js
const result = await api.query.zdReputation.systemInfo()
```

Return:

```js
{
  nonce: 12
  last: 156
  next: 140
  period: 100
  step: Free
}
```

系统在刷新期，声誉值的 `nonce` 如果超过系统 `nonce` ，这代表该声誉尚未确认。用户的 `nonce` 过小，可能代表用户近期并不活跃，或其他不可预见的情况。如果你对安全系数的要求并不高，也可以信任该声誉值，例如电影评分应用。如果应用在金融类应用中，应当仔细评估信任该声誉值的风险。

## 信任关系

你可以通过以下方式获取用户最新信任关系：

```js
const trustedList = await api.query.zdTrust.trustedList(address)
```

这将返回一个 `address` 的数组，如果你在利用它来搭建社交应用，这已足够了。但如果用来计算声誉值和选取种子，你还需要获取 `trustTempList`:

```js
const trustTempList = await api.query.zdTrust.trustTempList(address)
```

Return:

```js
{
    trust: [],
    untrust: []
}
```

这用来缓存用户在系统刷新前的信任关系，如果用户在刷新期取消了信任，则会缓存到 `trust`中。因此，你需要对 `trustedList` 排除 `untrust` ，并且合并 `trust` 。最终得到的数据才可用来计算声誉和选取种子。

