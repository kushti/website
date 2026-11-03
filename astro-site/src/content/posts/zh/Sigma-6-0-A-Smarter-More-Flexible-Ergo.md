---
cmsId: 2712
title: Sigma 6.0：更智能、更灵活的Ergo
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: zh
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T13:07:56.993"
author: Ergo Platform
tags: ["Core","Explainers","Tooling"]
spotlight: false
subtitle: null
image: {"url":"/uploads/sigma6_be7ed67853.png","alt":"sigma6.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_sigma6_be7ed67853.png","hash":"large_sigma6_be7ed67853","mime":"image/png","name":"large_sigma6.png","path":null,"size":673.43,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_sigma6_be7ed67853.png","hash":"small_sigma6_be7ed67853","mime":"image/png","name":"small_sigma6.png","path":null,"size":185.9,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_sigma6_be7ed67853.png","hash":"medium_sigma6_be7ed67853","mime":"image/png","name":"medium_sigma6.png","path":null,"size":394.85,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_sigma6_be7ed67853.png","hash":"thumbnail_sigma6_be7ed67853","mime":"image/png","name":"thumbnail_sigma6.png","path":null,"size":50.56,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

**Sigma 6.0** 是对Ergo区块链的重大升级提案。它为开发者提供了更强大的工具来构建智能合约，修复了长期存在的限制，并为网络未来的改进做好准备——所有这些都不会破坏与现有合约或节点的兼容性。

该升级通过软分叉进行，这意味着现有的非挖矿节点可以继续运行，而升级后的挖矿节点则需要激活并执行新功能。

矿工的投票已经开始，目前支持率超过90%，并且开发网络已上线进行早期测试。如果这种趋势持续下去，Sigma 6.0 将在2025年9月底激活。


---

## 为什么需要Sigma 6.0？

自2019年Ergo推出以来，其智能合约语言（ErgoTree）保持稳定。这种稳定性帮助网络保持安全，但也使得开发者更难添加新功能或简化逻辑。一些改进早在2018年的测试网阶段就已计划，但从未进入主网——直到现在。

Sigma 6.0 将这些升级带到前面。它扩展了合约中的可能性，消除了技术限制，并为未来的治理和扩展改进铺平了道路。

---

## 有什么变化？

* **更强大的数字**，引入新的无符号256位整数类型，用于加密和金融操作
* **更好的数据处理**，通过对合约中复杂类型的序列化和反序列化的全面支持
* **更智能的交易**，可以访问来自其他输入的上下文变量，以实现更协调的逻辑
* **新的数学和列表工具**，包括按位操作、位移和增强的集合方法，如 `.get` 和 `.startsWith`
* **内置的PoW验证**，使合约能够检查区块头或自定义消息与Autolykos2的匹配
* **可升级的治理**，允许网络通过未来的软分叉投票新参数，从支持子区块开始



---

## 激活时间表

Sigma 6.0 正在经历一个软分叉激活过程，需要两个阶段：投票期和更新期。每个阶段大约持续45天，使得完整的推出大约需要90天。

矿工们在2025年7月初开始投票，支持率已经超过所需的90%阈值。如果这种支持水平保持不变，升级将在2025年9月底激活。

即使共识提前达成，协议仍需等待完整的投票和更新期才能上线。

Sigma 6.0 的开发网络已经上线，开发者可以在社区开发聊天中找到如何加入的信息。在7月，支持子区块的挖矿节点的测试在测试网上开始。之后，重点将转向完善文档和提高整个8月的安全性正式推理，确保升级保持以研究为驱动。一旦完成，注意力可以转向潜在的主网部署。

---

## 对开发者的影响

新功能需要ErgoTree版本3或更高。一些类型——如 `Option`、`Header` 和 `UnsignedBigInt`——不能直接存储在寄存器或上下文扩展中，但可以作为字节数据存储并在合约内部恢复。

示例用法可以在[GitHub上的Sigma测试套件](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040)中找到。

---

## 为什么这很重要

Sigma 6.0 是自网络推出以来对Ergo智能合约层的最大升级。它为开发者提供了更多自由，解锁了全新的用例，并加强了协议的基础——同时保持完全向后兼容。

随着矿工支持率现在超过90%，升级有望在今年9月激活。Sigma 6.0 使Ergo在未来处于更强的位置。


## 资源

- 完整技术提案：[EIP-0050：GitHub上的Sigma 6.0](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [6.0软分叉提案（ergoforum）](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Sigma 6.0文档摘要](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
