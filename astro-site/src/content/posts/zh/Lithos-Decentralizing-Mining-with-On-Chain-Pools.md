---
cmsId: 2710
title: Lithos：通过链上矿池实现去中心化挖矿
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: zh
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T13:05:12.268"
author: Ergo Platform
tags: ["Ecosystem","Mining"]
spotlight: false
subtitle: null
image: {"url":"/uploads/lithos_3a4c5e9c7b.png","alt":"lithos.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_lithos_3a4c5e9c7b.png","hash":"large_lithos_3a4c5e9c7b","mime":"image/png","name":"large_lithos.png","path":null,"size":380.96,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_lithos_3a4c5e9c7b.png","hash":"small_lithos_3a4c5e9c7b","mime":"image/png","name":"small_lithos.png","path":null,"size":114.45,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_lithos_3a4c5e9c7b.png","hash":"medium_lithos_3a4c5e9c7b","mime":"image/png","name":"medium_lithos.png","path":null,"size":229.61,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_lithos_3a4c5e9c7b.png","hash":"thumbnail_lithos_3a4c5e9c7b","mime":"image/png","name":"thumbnail_lithos.png","path":null,"size":34.85,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Lithos是一个新协议，旨在通过将矿池转移到链上来彻底改革矿池的运作方式，使矿工完全控制，并消除对中心化矿池运营商的需求。与之前大多数去中心化挖矿的尝试不同，Lithos旨在高效、可扩展和安全。

---

## 什么是Lithos？

Lithos是一个去中心化的矿池协议，直接将矿工与Ergo上的智能合约连接。这些合约处理所有事务——工作提交、难度管理和支付——而无需依赖中心化服务器或保管人。

该协议使用**Stratum**将挖矿硬件连接到Lithos客户端，但所有关键逻辑都在链上运行。矿工将工作提交给智能合约，并根据新的加密证明格式直接获得报酬。

它被设计为**区块链无关**，这意味着它将来可以支持任何工作量证明链的矿池。工作计算和存储在Ergo上使用ErgoScript智能合约进行，而对其他链的支付验证则需要轻量级桥接。

初步研究已经开始，以通过可互操作的设计将Lithos支持扩展到比特币。

---

## 它是如何工作的

Lithos结合了两个关键概念：**非交互式股份证明（NISPs）**和**抵押矿池**，通过Ergo上的第二层智能合约（具体来说，是乐观汇总）实现。

### NISPs：无交互证明

非交互式股份证明允许矿工提交工作证明，而无需与服务器进行来回交互。每个矿工选择自己的难度，这决定了他们获得报酬的频率和金额。

智能合约验证这些证明并发放支付，无需中心化协调。

### 抵押矿池

Lithos上的矿池由抵押品支持。矿工和非矿工可以质押ERG或LITHOS代币来抵押矿池。这使得：

* 本地区块生产，完全选择交易
* 抵制审查
* 链上执行支付公平性
* 矿池创建者与质押者之间的本地DeFi借贷机制

---

## 对矿工的好处

* **完全区块控制**：矿工选择交易，收集滞纳金和MEV。
* **公平支付**：智能合约透明处理所有奖励。
* **无矿池运营商风险**：没有中心化方可以作弊或延迟支付。
* **本地客户端**：Lithos矿工在本地运行，以避免延迟或过时股份。
* **可调难度**：矿工可以调整其股份难度，以匹配其硬件和风险偏好。

---

## 难度和支付

该协议引入了一种独特的支付模型：

* **更高的难度** = 较少但较大的支付
* **较低的难度** = 更频繁但较小的支付

现实世界的测试表明，总奖励与哈希率成正比，但矿工可以选择其收入的稳定性或波动性。

---

## LITHOS代币

该协议将包括一个本地代币：

* **由矿工作为使用去中心化矿池的奖励获得**。
* **用于矿池抵押，连接矿工和借贷者**。
* **用于防止垃圾邮件、欺诈，并帮助汇总排序**。

更多信息将在即将发布的白皮书中公布。

---

## 最新开发更新

* 最终的欺诈证明合约正在审查中
* 存储租赁实施已优化，以防止区块级替换攻击
* 正在构建难度合约，以防止挖矿后操控
* 汇总合约测试和Stratum修复正在进行中
* 代码库将在测试网启动前公开
* 正在进行比特币集成的研究

测试网启动即将到来，待最终汇总集成和Stratum稳定性。

---

## 接下来是什么

Lithos的路线图与Ergo主网Sigma 6.0的发布紧密相关，这是Lithos上线的前提。

在此之前，工作仍在继续，朝着第一个公共测试网迈进。最后的阶段包括：

* 完成和测试汇总和欺诈证明合约
* 最终确定Stratum客户端集成
* 发布供同行评审的公共代码库
* 继续开发排放、配置和抵押合约
* 规划BTC集成以实现更广泛的协议兼容性
* 最终确定概述系统设计和代币机制的白皮书

一旦这些里程碑达到并且Sigma 6.0在主网上激活，Lithos将准备启动。

---

## 资源

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
