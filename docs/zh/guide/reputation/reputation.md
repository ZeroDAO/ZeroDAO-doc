---
category: 刷新声誉
---

# 刷新声誉

使用通用计算框架可以很方便地计算声誉值，例如

- [Neo4j](https://neo4j.com/) - 基于 Java 的图数据库和计算框架
- [networkx](https://github.com/networkx/networkx) - 著名的 Python 库

- [Cytoscape.js](https://js.cytoscape.org/) - 基于 JavaScript
- [graphology](https://github.com/graphology/graphology) - 基于 JavaScript
- [Spark](http://spark.apache.org/) - 计算引擎，当 ZeroDAO 变得庞大时你将需要它

## 更新路径权重

使用系统上一期的声誉来计算路径权重，计算公式为：
$$
Weigth_{ab} = f(R_A,R_B)
\begin{cases}
\ln (R_B - R_A), &if\ (R_B - R_A) > e\\
1, &else\
\end{cases}
$$
在工程实现上，我们向下取整，并将最大权重设为 `8` , 方便我们更高效地取近似值，避免在链上计算自然对数。

## 获取最短路径

将路径权重导入你的数据库后，就可以找出种子节点到其他所有节点的有向图加权最短路径了。在有些计算框架中可能需要将最短路径的结果保存为文件，再进行下一步计算。这样比较高效，同时为挑战游戏作准备。

## 计算声誉

从种子到目标节点的最短路径，迭代计算声誉，种子初始声誉值为常数 `INIT_SEED_RANK` 。

计算公式为：
$$
Score_b = \cfrac {R_A}{TrustCount_AWeigth_{ab}}
$$

- `TrustCount` - 源节点信任的用户数，在工程实现上最小值为常数 `MIN_TRUST_COUNT`
- `Weigth` - 路径权重

最后我们将所有种子的计算结果求和，得到用户的最终声誉。

## 刷新声誉

计算出声誉后，就可以通过 `tx.zdRefreshReputation.refresh()` 接口来刷新用户声誉了，你可以批量刷新多个用户的声誉。系统将会自动扣除抵押金额，需要保证你有足够的余额。该接口的参数：

```javascript
[[address,reputation]]
```

## 领取收益

你刷新的最后一个声誉被确认后，才可以领取收益了。调用接口 `tx.zdRefreshReputation.harvestRefAll()` ，它不需要传递任何参数，系统会把你所有的抵押金额和更新收益发送给你。

你不需要像领取种子收益那样每个种子领取一遍，而是一次性全部领取，这样可以大幅减少链上资源消耗。

声誉更新的收益为该用户的社交货币总额乘以手续费率，所以优先选择那些社交货币余额较高的用户，对你来说是个好策略。对于声誉系统来说，这样做可以反映用户的活跃度。

同时也应该注意到，有些用户没有足够的社交货币，但仍然需要更新声誉值。`pathfinder` 可以开通付费更新的通道。
