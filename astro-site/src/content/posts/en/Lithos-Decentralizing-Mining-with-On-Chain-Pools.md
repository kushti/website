---
cmsId: 2668
title: "Lithos: Decentralizing Mining with On-Chain Pools"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: en
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-26T12:55:17.266"
author: Ergo Platform
tags: ["Ecosystem","Mining","DeFi"]
spotlight: true
subtitle: null
image: {"url":"/uploads/lithos_3a4c5e9c7b.png","alt":"lithos.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_lithos_3a4c5e9c7b.png","hash":"large_lithos_3a4c5e9c7b","mime":"image/png","name":"large_lithos.png","path":null,"size":380.96,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_lithos_3a4c5e9c7b.png","hash":"small_lithos_3a4c5e9c7b","mime":"image/png","name":"small_lithos.png","path":null,"size":114.45,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_lithos_3a4c5e9c7b.png","hash":"medium_lithos_3a4c5e9c7b","mime":"image/png","name":"medium_lithos.png","path":null,"size":229.61,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_lithos_3a4c5e9c7b.png","hash":"thumbnail_lithos_3a4c5e9c7b","mime":"image/png","name":"thumbnail_lithos.png","path":null,"size":34.85,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Lithos is a new protocol designed to overhaul how mining pools work by moving them on-chain, giving miners full control, and eliminating the need for centralized pool operators. Unlike most previous attempts at decentralized mining, Lithos is built to be efficient, scalable, and secure.

---

## What Is Lithos?

Lithos is a decentralized mining pool protocol that connects miners directly to smart contracts on Ergo. These contracts handle everything—work submission, difficulty management, and payments—without relying on centralized servers or custodians.

The protocol uses **Stratum** to connect mining hardware to the Lithos client, but all key logic runs on-chain. Miners submit work to smart contracts and get paid directly based on a new cryptographic proof format.

It is designed to be **blockchain agnostic**, meaning it could support mining pools for any proof-of-work chain in the future. Work computation and storage happens on Ergo using ErgoScript smart contracts, while payment verification for other chains would require lightweight bridges.

Initial research is already underway to extend Lithos support to Bitcoin via an interoperable design.

---

## How It Works

Lithos combines two key ideas: **Non-Interactive Share Proofs (NISPs)** and **collateralized mining pools**, implemented via Layer 2 smart contracts (specifically, an optimistic rollup) on Ergo.

### NISPs: Proof Without Interaction

Non-Interactive Share Proofs allow miners to submit proof of work without needing to interact back and forth with a server. Each miner chooses their own difficulty, which determines how often they get paid and how large those payments are.

Smart contracts validate these proofs and issue payouts, with no need for centralized coordination.

### Collateralized Pools

Mining pools on Lithos are backed by collateral. Miners and non-miners can stake ERG or LITHOS tokens to collateralize a pool. This enables:

* Local block production with full transaction selection
* Censorship resistance
* On-chain enforcement of payment fairness
* A native DeFi lending mechanism between pool creators and stakers

---

## Benefits for Miners

* **Full block control**: Miners select transactions, collect demurrage and MEV.
* **Fair payouts**: Smart contracts handle all rewards transparently.
* **No pool operator risk**: There is no centralized party who can cheat or delay payments.
* **Local client**: The Lithos miner runs locally to avoid latency or stale shares.
* **Adjustable difficulty**: Miners can tune their share difficulty to match their hardware and risk preferences.

---

## Difficulty and Payments

The protocol introduces a unique payment model:

* **Higher difficulty** = fewer but larger payments
* **Lower difficulty** = more frequent but smaller payments

Real-world testing shows that total rewards remain proportional to hashrate, but miners can choose how stable or volatile their earnings are.

---

## LITHOS Token

The protocol will include a native token:

* **Earned** by miners as a reward for using decentralized pools.
* **Required** for pool collateralization, linking miners and lenders.
* **Used** used to prevent spam, fraud, and to help with rollup sequencing.

More information will be released in the upcoming whitepaper.

---

## Latest Development Updates

* Final fraud proof contracts are under review
* Storage rent implementation refined to prevent block-level replacement attacks
* Difficulty contract is being built to prevent post-mining manipulation
* Rollup contract testing and stratum fixes are ongoing
* Codebase will be made public before testnet launch
* Research underway on Bitcoin integration

Testnet launch is approaching, pending final rollup integration and stratum stability.

---

## What’s Next

The Lithos roadmap is closely tied to the release of Sigma 6.0 on Ergo mainnet, which is a prerequisite for Lithos to go live.

Until then, work continues toward the first public testnet. The final stretch includes:

* Completing and testing rollup and fraud-proof contracts
* Finalizing stratum client integration
* Releasing the public codebase for peer review
* Continuing development of the emission, configuration, and collateral contracts
* Planning BTC integration for broader protocol compatibility
* Finalizing the whitepaper outlining the system’s design and token mechanics

Once these milestones are reached and Sigma 6.0 is activated on mainnet, Lithos will be ready to launch.

---

## Resources

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
