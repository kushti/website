---
cmsId: 2701
title: DexyGold Beta 登陆 Ergo 主网：链上黄金的新标准
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: zh
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T11:43:13.238"
author: Ergo Platform
tags: ["Ecosystem"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dexy_1880f3be68.png","alt":"dexy.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dexy_1880f3be68.png","hash":"large_dexy_1880f3be68","mime":"image/png","name":"large_dexy.png","path":null,"size":733.13,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dexy_1880f3be68.png","hash":"small_dexy_1880f3be68","mime":"image/png","name":"small_dexy.png","path":null,"size":194.26,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dexy_1880f3be68.png","hash":"medium_dexy_1880f3be68","mime":"image/png","name":"medium_dexy.png","path":null,"size":421.49,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dexy_1880f3be68.png","hash":"thumbnail_dexy_1880f3be68","mime":"image/png","name":"thumbnail_dexy.png","path":null,"size":53.43,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

### Ergo DeFi 的里程碑

DexyGold 的公共主网测试版已上线，并且已经在移动真实价值。该币的目标是一个金衡盎司黄金的美元价格，依赖于两个核心合约：

* **银行合约** — 当用户以预言机价格存入 ERG 时，铸造 DexyGold。
* **AMM 流动性池** — 让交易者发现市场汇率，并强制执行保护储备的保护措施。

这两个合约使用新的 [**Gold v2 预言机数据源**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg)，更新速度更快，并增加了防止操纵的额外保护。随着 DexyGold 的良好表现，社区现在正在准备将美元预言机池更新到 v2，并推出 **GluonUSD** 和 **DexyUSD**。一个 Telegram 群组正在为希望运行 v2 预言机的人们成立，同时也非常需要帮助测试测试网的预言机池更新。

---

### 为什么瞄准黄金，而不是美元？

黄金规避了单一政府风险，并在几个世纪以来一直领先于长期通货膨胀。与美元挂钩的稳定币完善了 Ergo 的 DeFi 堆栈，为用户提供了一个与 SigmaUSD 等美元追踪器互补的对冲工具。

---

### 引擎内部

| 引擎部件        | 在挂钩中的角色                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **银行合约**  | 以预言机价格为 ERG 铸造 DexyGold。只有当用户添加 ERG 时，供应才会增长。                                                                                 |
| **流动性池** | 发布实时的 DexyGold / ERG 价格。池的数学与 Uniswap V2 相似，并在预言机价格低于池价格 10% 以上时阻止 LP 代币赎回。 |
| **套利循环** | *预言机 > 池* → 用户铸造 DexyGold 并卖给池。*预言机 < 池* → 银行花费闲置的 ERG，并在 50 个区块延迟后购买 DexyGold。                  |
| **安全阀**  | 新铸造的 DexyGold 的时间锁、银行中的 ERG 锁定，以及当利润看起来过高时自动暂停铸造。                                                     |

---

### 如何今天尝试 DexyGold

1. **安装 [Nautilus](https://nautiluswallet.io/)** 并选择主网网络。
2. **通过交易所、矿工支付或 [Rosen 桥](https://app.rosenbridge.io/) 添加适量的 ERG 余额。**
3. **打开 [Crystal Pool](https://crystalpool.cc)**—唯一可以铸造 DexyGold 和交易的地方。在银行 UI 中铸造，提供流动性或下限价单。
4. **从小开始：** 合约已上线并持有真实价值，同时审计和参数调整仍在进行中。订单在几秒钟内在链上结算。


#### Crystal Pool 重点

Crystal Pool 是 Ergo 区块链上的一个新的 Layer-1 DEX，专注于与最佳可用链上流动性进行直接智能合约交互。它提供：

* 链上直接订单匹配，无需链下订单簿
* 单笔交易中的多币种、多卖家交易
* 实时交易链，支持数百名用户并行无缝交易
* 集成图表和交易历史，直接在价格图表上显示您的交易

2025 年晚些时候推出：限价单流动性池，支持更深的市场做市策略。

Crystal Pool 旨在成为 Ergo DeFi 的核心流动性层——简单、快速、透明。


---

### DexyGold 路线图

* **第二次审计** 以压力测试套利循环并改善参数调整。
* **抵押品比率目标** 超过 150% ，因为铸造费用在银行中建立储备。
* **USD 预言机池 v2** 的推出，社区运营商和测试在测试网进行。
* **GluonUSD 和 DexyUSD** 在美元预言机数据源升级后推出，扩展稳定币套件。

---

### Gold v2 预言机采用增长

DexyGold 是第二个采用 Gold v2 数据源的项目。第一个是 **gluon.gold**，最近推出了一个 [更新的测试版前端](https://gluon.gold/reactor)，更清晰地跟踪费用、储备比率、TVL、交易量和待处理交易——证明了新的预言机如何迅速成为 Ergo 基于黄金产品的支柱。

---

### 加入讨论

阅读草稿 Dexy 白皮书，在 **r/ergonauts** 上分享反馈，并在 [Telegram](http://t.me/dexygold) 或 [Discord](https://discord.gg/xjfnk9A2cU) 加入社区。您的现实世界测试和错误报告将帮助塑造 Ergo 上一个强大的黄金和美元支持的稳定币家族的最终参数。
