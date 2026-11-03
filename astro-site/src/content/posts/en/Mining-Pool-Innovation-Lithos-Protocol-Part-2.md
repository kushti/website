---
cmsId: 2581
title: "Mining Pool Innovation: Lithos Protocol Part II"
slug: "Mining-Pool-Innovation-Lithos-Protocol-Part-2"
type: blog
locale: en
date: "2023-04-13T21:00:00"
publishedAt: "2023-04-14T12:16:43.984"
updatedAt: "2025-08-26T12:56:48.284"
author: Ergo Platform
tags: ["Mining","Ecosystem","DeFi"]
spotlight: false
subtitle: null
image: {"url":"/uploads/ergo_blog_mining_pool_lithos_120423_11_ec18b61e93.png","alt":"ergo_blog_mining_pool_lithos_120423 11.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93.png","hash":"large_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93","mime":"image/png","name":"large_ergo_blog_mining_pool_lithos_120423 11.png","path":null,"size":336.88,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93.png","hash":"small_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93","mime":"image/png","name":"small_ergo_blog_mining_pool_lithos_120423 11.png","path":null,"size":105.13,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93.png","hash":"medium_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93","mime":"image/png","name":"medium_ergo_blog_mining_pool_lithos_120423 11.png","path":null,"size":205.72,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93.png","hash":"thumbnail_ergo_blog_mining_pool_lithos_120423_11_ec18b61e93","mime":"image/png","name":"thumbnail_ergo_blog_mining_pool_lithos_120423 11.png","path":null,"size":33.3,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

_For the first segment of this two-part series, please see [Mining Pool Innovation: Lithos Protocol Part I.](/en/blog/Mining-Pool-Innovation-Lithos-Protocol-Part-1/)_

During a recent ErgoHack, the Lithos Protocol team submitted a proposal to develop a way to fully decentralize collateralized mining pools. Lithos Protocol plans to revolutionize Proof of Work mining by having mining pools be on-chain, promoting trustlessness and full decentralization. The Lithos Protocol Litepaper outlines three components that will fulfill this goal: NISPs, collateralization and tokenization.

## NISPs

NISP stands for Non-Interactive Share Proofs. The [Lithos Protocol](https://github.com/Lithos-Protocol/LitePaper#readme) team states that “NISPs allow for work created by miners, [called] shares, to be compressed down and efficiently calculated so that miners can be paid fairly according to the shares they submitted.” In essence, this allows for work to be calculated on-chain via smart contracts. Through NISPs, miners will have more control over various aspects of mining. Specifically, NISPs will allow miners to select their own share difficulty and have more control over “their own risk to reward ratio when receiving rewards.” It is important to note that any blockchain that supports Proof of Work mining can implement the Lithos Protocol approach to decentralized mining pools. Although initially designed to be compatible with the Ergo blockchain, this product is designed for implementation with any PoW protocol. 

## Collateralization

Collateralized mining pools enable the creation of blocks locally. Miners have the ability to select which transactions to include in their blocks in addition to setting governance parameters for the Ergo blockchain. Lithos protocol will include a native DeFi application where lenders can provide collateral to miners in return for fees. It is important to note that Lithos is using collateralization as the foundation of their protocol.

In a special guest appearance on the [Sigmanaut Youtube Channel](https://www.youtube.com/watch?v=VO7_B0e8vSk&ab_channel=ErgoSigmanauts) (40:57-41:04), Rob from Lithos stated that instead of using ERG as collateral, participants can use native tokens. The collateralization will essentially be the pool of funds that will be paid out to miners. Collateralization enables lenders to provide a form of security deposit to miners in exchange for fees. This creates a fascinating market between miners and lenders, where miners can earn additional capital and lenders can make money off of fees. The mining pool operator (or the lender) will be able to collect the ERG that the miner earns and use the collateral of a different token to pay out the miners. Miners will also be able to earn both ERG and native tokens.

## Tokenization

Lithos Protocol plans to incorporate a token into their platform. The token will be needed as a part of the collateralization, which will aid in building a market between lenders and miners.
More information about Lithos and its token will be provided as they begin work on their full whitepaper. For now, interested parties can view the [Litepaper on Github](https://github.com/Lithos-Protocol/LitePaper#readme).
