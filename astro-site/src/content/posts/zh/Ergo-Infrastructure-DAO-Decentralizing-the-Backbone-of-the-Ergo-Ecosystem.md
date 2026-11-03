---
cmsId: 2702
title: Ergo基础设施DAO：去中心化Ergo生态系统的支柱
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: zh
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T11:45:36.172"
author: Ergo Platform
tags: ["Community","DAOs"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dao_4bb9b2ff23.png","alt":"dao.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dao_4bb9b2ff23.png","hash":"large_dao_4bb9b2ff23","mime":"image/png","name":"large_dao.png","path":null,"size":685.89,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dao_4bb9b2ff23.png","hash":"small_dao_4bb9b2ff23","mime":"image/png","name":"small_dao.png","path":null,"size":194.19,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dao_4bb9b2ff23.png","hash":"medium_dao_4bb9b2ff23","mime":"image/png","name":"medium_dao.png","path":null,"size":405.28,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dao_4bb9b2ff23.png","hash":"thumbnail_dao_4bb9b2ff23","mime":"image/png","name":"thumbnail_dao.png","path":null,"size":55.51,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Ergo的使命一直根植于去中心化，不仅在共识层面，而是在整个技术栈中。随着**Ergo基础设施DAO (InfraDAO)**的推出，这一愿景正在扩展到每天为生态系统提供动力的服务和基础设施。

InfraDAO现在在[Paideia](https://app.paideia.im/ergoinfradao)上正式上线，经过成功的治理投票。最初作为**Sigmanauts贡献者组**内部的草根提案，由大家喜爱的Sigmanaut **qx**牵头，他因在Ergo AMA和生态系统的其他地方的出现而闻名，现在已经发展成为一个社区拥有的倡议，将重塑核心服务的交付和维护方式。

---

## 什么是Ergo基础设施DAO？

InfraDAO是一个去中心化的、由同行运营的基础设施提供者网络，负责维护Ergo生态系统中的关键服务。这包括：

* 完整节点和API
* 区块链浏览器
* 测试网和挖矿基础设施
* 社区文档和镜像
* SigmaSpace、ErgoDocs和Sigmaverse等工具
* 将来对ergoplatform.org的托管和管理

这个DAO将减少对Ergo基金会的依赖，并确保基础设施具有抗审查性、容错性和透明治理。

---

## 这为什么重要

到目前为止，Ergo的大部分基础设施，包括公共端点、区块浏览器和托管文档，都是由**Ergo基金会**和后来的**开发者DAO**维护的。虽然这种模式提供了早期的稳定性和可靠性，但也创造了中心化的依赖点。

InfraDAO通过在全球自我管理的贡献者网络中分配责任来改变这一点，这些贡献者运行和维护技术栈。它确保：

* 更具弹性和地理分布的服务
* 在没有基金会依赖的情况下的长期可持续性
* 社区对治理和部署的控制
* 一个真正去中心化的运营模式，以匹配Ergo的核心原则

---

## 已经上线和迁移的内容

InfraDAO已经取得了进展。三台高性能机器在多个端点之间负载均衡，现在已上线并使用更快的**RocksDB**存储后端进行同步：

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel)（与钱包兼容的HTTPS）

这些端点**与移动和基于浏览器的钱包完全兼容**，并作为对Ergo网络的去中心化访问的基础。

您可以通过公共仪表板监控正常运行时间和对等可用性：
[Ergo基础设施DAO – 实时状态仪表板](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P、负载均衡和社区运营商

虽然这里的“P2P”大致指的是一个分布式网络，但基础设施确实是由社区运营的。初始负载均衡将包括由以下人员操作的机器：

* qx（三个节点）
* Jumei
* 2ndTL Mining
* Sheetoshi

这些机器被战略性地部署以支持基于全球地理位置的负载均衡。随着DAO的扩展，将添加更多社区机器，形成一个完全去中心化和全球弹性的支柱。

新参与者的选择过程将包括：

1. **静态IP地址**
2. **足够的上传带宽**
3. **对基础设施的基本理解**（或能够遵循命令行设置说明）
4. 用于发送预配置节点或浏览器的**邮寄地址**（免费提供）

---

## 从想法到执行：由社区构建

InfraDAO最初是Sigmanauts之间的内部倡议。认识到去中心化基础设施的必要性，**qx**提议创建一个DAO并领导其部署。

在2025年7月，要求**50,000 \$PAIDEIA**的提案在Paideia上成功通过。这些资金用于覆盖机器准备、运输和贡献者入职等启动成本。DAO的代币现已上线，治理也在进行中。

---

## 技术要求

**硬件和网络要求：**
* 上传带宽：50 Mbps或更高
* 延迟：约100ms或更低到您的本地区域
* IPv4：静态或长期动态IP
* 机器规格：
  * Ubuntu操作系统
  * 16GB RAM（推荐32GB）
  * 1TB SSD
  * Docker、tmux、SSH访问和配置编辑技能

这些系统经过优化以实现高可用性，目前通过负载均衡的端点提供生产流量。

---

## 不仅仅是托管：未来扩展

虽然InfraDAO的第一阶段集中在托管上，但它将扩展以支持：

* 基础设施维护和监控
* 依赖和安全更新
* Docker编排和软件部署
* ergoplatform.org的CMS管理
* 发布和文档更新
* SigmaSpace、ErgoDocs和Sigmaverse等服务的托管

这为系统管理员、后端开发人员、内容维护者和其他贡献者打开了参与的大门，超越了节点运营商。

---

## 当前状态

* DAO在Paideia上线
* 初始资金提案通过
* 代币铸造和投票上线
* 第一波基础设施上线并运营
* 公共监控仪表板在线
* 下一步：增加贡献者和全球扩展

---

## 如何参与

如果您具备技术能力并希望运行基础设施、维护正常运行时间、更新网站或参与DAO治理，现在是加入的时机。

→ 在这里加入DAO或关注提案：
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ 监控基础设施状态：
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## 最后想法

Ergo基础设施DAO的推出是实现全栈去中心化、自主权、社区控制和使命驱动的区块链生态系统可持续发展的重要一步。

随着链上治理、社区拥有的基础设施以及全球贡献者已经在运行关键服务，Ergo正在展示真正的去中心化是什么样子。

帮助构建基础。参与其中。
