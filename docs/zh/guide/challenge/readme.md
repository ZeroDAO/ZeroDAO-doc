---
category: 挑战游戏
---

# 挑战游戏

以下为挑战游戏的关键概念，一个完整的挑战包括以下几部分

- `launch` - 发起挑战
- `examine` - 挑战者向开拓者的数据发起质询
- `reply` - 开拓者回复挑战者的质询
- `evidence` - 挑战者出示证据，证据并不一定拥有完全证明力，它可能需要仲裁
- `arbitral` - 对出示的证据进行仲裁
- `harvest` - 提取挑战收益

在实际应用中，挑战发起后可从其中任意一步开始，也可以从任意一步跳到另一步。例如在声誉挑战中，并不存在 `examine` 和 `reply` 的步骤。`harvest` 按照当前进度和状态来结算。

|            | Free       | Reply      | Examine    | Evidence   |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| Done       | pathfinder | pathfinder | challenger | challenger |
| Disruption | pathfinder | challenger | challenger | pathfinder |

唯一不同的是 `arbitral` ，如果有共同受益人，则将池中的资金平分给 `pathfinder` 和 `challenger` 。
