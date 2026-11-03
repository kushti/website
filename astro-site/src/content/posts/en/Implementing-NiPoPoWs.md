---
cmsId: 2630
title: Implementing NiPoPoWs
slug: Implementing-NiPoPoWs
type: blog
locale: en
date: "2024-03-18T21:00:00"
publishedAt: "2024-03-19T20:35:42.766"
updatedAt: "2025-08-25T10:10:38.669"
author: Ergo Platform
tags: ["Core","Tooling"]
spotlight: true
subtitle: null
image: {"url":"/uploads/NIPOPOWS_858bdd3fdd.png","alt":"NIPOPOWS.png","width":3000,"height":1503,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_NIPOPOWS_858bdd3fdd.png","hash":"large_NIPOPOWS_858bdd3fdd","mime":"image/png","name":"large_NIPOPOWS.png","path":null,"size":864.68,"width":1000,"height":501},"small":{"ext":".png","url":"/uploads/small_NIPOPOWS_858bdd3fdd.png","hash":"small_NIPOPOWS_858bdd3fdd","mime":"image/png","name":"small_NIPOPOWS.png","path":null,"size":225.82,"width":500,"height":251},"medium":{"ext":".png","url":"/uploads/medium_NIPOPOWS_858bdd3fdd.png","hash":"medium_NIPOPOWS_858bdd3fdd","mime":"image/png","name":"medium_NIPOPOWS.png","path":null,"size":493.76,"width":750,"height":376},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_NIPOPOWS_858bdd3fdd.png","hash":"thumbnail_NIPOPOWS_858bdd3fdd","mime":"image/png","name":"thumbnail_NIPOPOWS.png","path":null,"size":57.59,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

_Non-Interactive Proofs of Proof-of-Work (NIPoPoWs) are one of several innovations used by Ergo. Here’s what they are, and why they matter._

NiPoPoWs (non-interactive proofs of proof-of-work) are a type of cryptographic construct that enable secure shortcuts to be taken in verifying the large amount of computational operations performed in a [proof-of-work (PoW)](/en/blog/Everything-You-Need-to-Know-About-Proof-of-Work/) system. The combination of security and efficiency offered by NiPoPoWs opens the way for a number of powerful use cases.

## Understanding NiPoPoWs

To better understand NiPoPoWs, it is important to first understand the role of PoW in blockchains like Bitcoin and Ergo.

PoW is a consensus mechanism, or a means by which the unrelated nodes of a blockchain network reach agreement on the content of the decentralized ledger without a single authority controlling the process.

PoW involves miners solving computationally difficult puzzles (hash functions). This is the mathematical equivalent of finding a needle in a haystack. The computer that solves the puzzle first wins the right to add a new block of transactions to the blockchain and to collect block rewards and transaction fees in return.

Proof of PoW is a way of cryptographically verifying the state of the blockchain without needing to check the entire chain of mathematical operations from the Genesis block to the present day. While PoPoWs (proofs of proof-of-work) are lightweight and efficient, they are also provably accurate. This makes it possible to access a reliable representation of the blockchain that is abstracted from the blockchain itself. 

The last element of NiPoPoWs is their non-interactive nature. This simply means they can be used by anyone without needing to interact with other users (like miners, or verifiers). NiPoPoWs, and the applications that use them, are self-contained.

These succinct, non-interactive proofs open a myriad of possibilities for a number of powerful applications, since they facilitate fast and secure blockchain communication and transactions.

## NiPoPoW Applications

One of the clearest and most powerful applications for NiPoPoWs is reducing the size of a blockchain. Because blockchains store every transaction, they become steadily larger as time goes on. Bitcoin’s blockchain is 550 GB at the time of writing. Even though it is younger, Ethereum’s is larger, due to the additional data associated with smart contracts. This means that anyone who wants to run a node needs to invest in the necessary storage infrastructure. They will also need to potentially wait days for their copy of the blockchain to sync.

NiPoPoWs enable the use of ultra-light clients that can sync to the blockchain with less than 1 MB of data, meaning even a low-end smartphone with limited data service can have the same security as a full node. This offers the possibility of a high level of decentralization, democratizing the activity of running nodes.

NiPoPoWs also have benefits for miners (who need to run full nodes). Every new block consumes only a tiny amount of additional data, once again helping network decentralization by enabling more users to mine without investing in terabyte hard drives.

The same technology powers the efficient operation of side chains, and underpins Ergo’s Layer-2 strategy. NiPoPoWs also facilitate cross-chain interoperability, since light clients can verify proofs quickly and reliably.

Overall, NiPoPoWs are an incredibly important element of the Ergo blockchain ecosystem, increasing security, scalability, and interoperability.
