---
category: Challenge Game
---

# Challenge Game

The following are the key concepts of a challenge game, a complete challenge consists of the following parts:

- `launch` - Launching the challenge
- `examine` - Challenger question pathfinder's data
- `reply` - Trailblazer replies to Challenger's question
- `evidence` - The challenger produces evidence, which does not necessarily have full probative value and which may require arbitration
- `arbitral` - Arbitration of the evidence produced
- `harvest` - Withdrawal of challenge proceeds

In practice, a challenge can start at any one of these steps after it has been initiated, or it can jump from one step to another. In a reputation challenge, for example, there are no `examine` and `reply` steps. `harvest` is settled according to the current progress and status.

|            | Free       | Reply      | Examine    | Evidence   |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| Done       | pathfinder | pathfinder | challenger | challenger |
| Disruption | pathfinder | challenger | challenger | pathfinder |

The only difference is `arbitral`, which divides the pool equally between `pathfinder` and `challenger` if there are co-beneficiaries.
