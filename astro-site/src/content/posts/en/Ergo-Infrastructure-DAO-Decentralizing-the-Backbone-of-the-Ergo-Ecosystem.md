---
cmsId: 2670
title: "Ergo Infrastructure DAO: Decentralizing the Backbone of the Ergo Ecosystem"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: en
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T13:30:43.282"
author: Ergo Platform
tags: ["DAOs"]
spotlight: true
subtitle: null
image: {"url":"/uploads/dao_4bb9b2ff23.png","alt":"dao.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dao_4bb9b2ff23.png","hash":"large_dao_4bb9b2ff23","mime":"image/png","name":"large_dao.png","path":null,"size":685.89,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dao_4bb9b2ff23.png","hash":"small_dao_4bb9b2ff23","mime":"image/png","name":"small_dao.png","path":null,"size":194.19,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dao_4bb9b2ff23.png","hash":"medium_dao_4bb9b2ff23","mime":"image/png","name":"medium_dao.png","path":null,"size":405.28,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dao_4bb9b2ff23.png","hash":"thumbnail_dao_4bb9b2ff23","mime":"image/png","name":"thumbnail_dao.png","path":null,"size":55.51,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Ergo’s mission has always been rooted in decentralization, not just at the consensus layer, but across the entire stack. With the launch of the **Ergo Infrastructure DAO (InfraDAO)**, that vision is expanding into the services and infrastructure that power the ecosystem every day.

The InfraDAO is now officially live on [Paideia](https://app.paideia.im/ergoinfradao), following a successful governance vote. What began as a grassroots proposal from within the **Sigmanauts contributor group**—spearheaded by everyone's favourite Sigmanaut, **qx**, known for his appearances on Ergo AMAs and everywhere else in the ecosystem—has now matured into a community-owned initiative that will reshape how core services are delivered and maintained.

---

## What Is the Ergo Infrastructure DAO?

The InfraDAO is a decentralized, peer-operated network of infrastructure providers responsible for maintaining key services in the Ergo ecosystem. This includes:

* Full nodes and APIs
* Blockchain explorers
* Testnet and mining infrastructure
* Community documentation and mirrors
* Tools like SigmaSpace, ErgoDocs, and Sigmaverse
* Future hosting and management of ergoplatform.org

This DAO will reduce reliance on the Ergo Foundation and ensure that infrastructure is censorship-resistant, fault-tolerant, and transparently governed.

---

## Why It Matters

Until now, much of Ergo’s infrastructure, including public endpoints, block explorers, and hosted documentation, has been maintained by the **Ergo Foundation** and later the **Developer DAO**. While this model provided early stability and reliability, it also created central points of dependency.

InfraDAO changes that by distributing responsibilities across a global, self-managed network of contributors who run and maintain the stack. It ensures:

* More resilient and geographically distributed services
* Long-term sustainability without Foundation dependence
* Community control over governance and deployment
* A truly decentralized operational model to match Ergo’s core principles

---

## What’s Already Live and Migrated

The InfraDAO has already made progress. Three high-performance machines, load balanced across multiple endpoints, are now live and synced using the faster **RocksDB** storage backend:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (HTTPS-compatible for wallets)

These endpoints are **fully compatible with mobile and browser-based wallets** and serve as a foundation for decentralized access to the Ergo network.

You can monitor uptime and peer availability via the public dashboard:
[Ergo Infrastructure DAO – Real-time Status Dashboard](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Load Balancing, and Community Operators

While “P2P” here refers loosely to a distributed network, the infrastructure is truly community-run. The initial load balancing will include machines operated by:

* qx (three nodes)
* Jumei
* 2ndTL Mining
* Sheetoshi

These are strategically deployed to support global geolocation-based load balancing. More community machines will be added as the DAO expands, forming a fully decentralized and globally resilient backbone.

The selection process for new participants will involve:

1. A **static IP address**
2. **Sufficient upload bandwidth**
3. A **basic understanding of infrastructure** (or ability to follow command-line setup instructions)
4. A **mailing address** for shipping a preconfigured node or explorer (provided free of charge)

---

## From Idea to Execution: Built by the Community

The InfraDAO began as an internal initiative among the Sigmanauts. Recognizing the need to decentralize infrastructure, **qx** proposed the creation of a DAO and led its deployment.

In July 2025, a proposal requesting **50,000 \$PAIDEIA** passed successfully on Paideia. These funds are covering startup costs such as machine preparation, shipping, and contributor onboarding. The DAO’s token is now live, and governance is active.

---

## Technical Requirements

**Hardware and Network Requirements:**
* Upload bandwidth: 50 Mbps or more
* Latency: \~100ms or lower to your local region
* IPv4: Static or long-term dynamic IP
* Machine specs:
  * Ubuntu OS
  * 16GB RAM (32GB recommended)
  * 1TB SSD
  * Docker, tmux, SSH access, and config editing skills

These systems are optimized for high availability and are currently serving production traffic through load-balanced endpoints.

---

## Not Just Hosting: Future Expansion

While InfraDAO's first phase centers on hosting, it will grow to support:

* Infrastructure maintenance and monitoring
* Dependency and security updates
* Docker orchestration and software deployment
* CMS management for ergoplatform.org
* Publishing and documentation updates
* Hosting services like SigmaSpace, ErgoDocs, and Sigmaverse

This opens participation to sysadmins, backend developers, content maintainers, and other contributors beyond node operators.

---

## Current Status

* DAO live on Paideia
* Initial funding proposal passed
* Token minted and voting live
* First wave of infrastructure live and operational
* Public monitoring dashboard online
* Next: additional contributors and global expansion

---

## How to Get Involved

If you're technically capable and want to run infrastructure, maintain uptime, update sites, or participate in DAO governance, now is the time to step in.

→ Join the DAO or follow proposals here:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Monitor the infrastructure status:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Final Thoughts

The launch of the Ergo Infrastructure DAO is a major step toward full-stack decentralization, autonomy, community control, and the sustainability of a mission-driven blockchain ecosystem.

With governance on-chain, infrastructure owned by the community, and global contributors already running critical services, Ergo is showing what real decentralization looks like.

Help build the foundation. Get involved.
