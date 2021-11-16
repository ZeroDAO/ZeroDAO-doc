---
category: Refreshing reputation
---

# Refreshing reputation

Reputation values can be easily calculated using generic calculation frameworks, such as

- [Neo4j](https://neo4j.com/) - Java-based graph database and computational framework
- [networkx](https://github.com/networkx/networkx) - Notable Python libraries

- [Cytoscape.js](https://js.cytoscape.org/) - Based on JavaScript
- [graphology](https://github.com/graphology/graphology) - Based on JavaScript
- [Spark](http://spark.apache.org/) - Computational engine, which you will need when ZeroDAO gets big

## Update path weights

The path weights are calculated using the system's reputation from the previous period, calculated as
$$
Weigth_{ab} = f(R_A,R_B)
\begin{cases}
\ln (R_B - R_A), &if\ (R_B - R_A) > e\\
1, &else\
\end{cases}
$$
For the engineering implementation, we rounded down and set the maximum weight to `8` , facilitating us to take approximations more efficiently and avoid calculating the natural logarithm on the chain.

## Get shortest path

After importing the path weights into your database, you can then find the weighted shortest path of the directed graph from the seed node to all other nodes. In some computational frameworks it may be necessary to save the results of the shortest path as a file before proceeding to the next step in the calculation. This is more efficient and prepares you for the challenge game.

## Calculating reputation

The shortest path from the seed to the target node, iteratively computing the reputation, with the initial reputation value of the seed being the constant `INIT_SEED_RANK`.

The calculation formula is
$$
Score_b = \cfrac {R_A}{TrustCount_AWeigth_{ab}}
$$

- `TrustCount` - Number of users trusted by the source node, with a minimum value of constant on the engineering implementation `MIN_TRUST_COUNT`
- `Weigth` - Path weights

Finally we sum up the results of all the seed calculations to obtain the final reputation of the user.

## Refreshing reputation

Once the reputation has been calculated, you can refresh the user's reputation via the `tx.zdRefreshReputation.refresh()` interface, which allows you to refresh the reputation of multiple users in bulk. The system will automatically deduct the staking amount and you need to ensure that you have a sufficient balance. Parameters of the interface

```javascript
[[address,reputation]]
```

## Receive benefits

The last reputation you refreshed is confirmed before you can collect the proceeds. Call the interface `tx.zdRefreshReputation.harvestRefAll()` , it does not need to pass any parameters and the system will send you all your staking amounts and refreshed earnings.

Instead of collecting each seed once, as you do with seed proceeds, you collect them all at once, which significantly reduces the consumption of resources in the chain.

Reputation updates are earned by multiplying the total amount of social currency for that user by the fee rate, so it's a good strategy for you to prioritise those users with higher social currency balances. For the reputation system, this will reflect the user's activity level.

It should also be noted that some users do not have enough social currency, but still need to update their reputation values. `pathfinder` can open access to paid updates.
