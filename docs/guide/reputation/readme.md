---
category: Access to data
---

# Access to data

We use the interface provided by `polkadot.js` to demonstrate this, you can get more information [here](https://polkadot.js.org/docs/).

## Get a reputation

The chain holds the last two updates of the user's reputation.

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

`nonce` is the number of times the reputation system has been updated, you also need to get the system running status.

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

If the `nonce` of a reputation value exceeds the system `nonce` during a system refresh, this means that the reputation has not been confirmed. A user's `nonce` that is too small may mean that the user has not been active recently, or other unforeseen circumstances. You can also trust this reputation value if you do not require a high security factor, for example in a movie rating application. If the application is in the financial category, the risk of trusting this reputation value should be carefully assessed.

## Trusted relationships

You can obtain the latest trust relationships of your users by.

```js
const trustedList = await api.query.zdTrust.trustedList(address)
```

This will return an array of `address`, which is sufficient if you're using it to build social applications. But if you're using it to calculate reputation values and pick seeds, you'll also need to get `trustTempList`:

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

This is used to cache the user's trust relationship before the system is refreshed, and if the user untrusts during the refresh period, it will be cached in `trust`. Therefore, you need to exclude `untrust` from `trustedList` and merge `trust`. The resulting data can then be used to calculate reputation and select seeds.

