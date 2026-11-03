---
cmsId: 2523
title: "The Ergo Roadmap: What’s Next. Part #1"
slug: The-Ergo-Roadmap-What’s-Next
type: blog
locale: en
date: "2022-09-25T21:00:00"
publishedAt: "2022-09-29T17:44:50.075"
updatedAt: "2025-08-25T08:58:19.518"
author: Ergo Platform
tags: ["Announcements"]
spotlight: false
subtitle: null
image: {"url":"/uploads/News_blog_31_c43956eb17.png","alt":"News blog 31.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_31_c43956eb17.png","hash":"large_News_blog_31_c43956eb17","mime":"image/png","name":"large_News blog 31.png","path":null,"size":720.31,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_31_c43956eb17.png","hash":"small_News_blog_31_c43956eb17","mime":"image/png","name":"small_News blog 31.png","path":null,"size":180.15,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_31_c43956eb17.png","hash":"medium_News_blog_31_c43956eb17","mime":"image/png","name":"medium_News blog 31.png","path":null,"size":401.74,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_31_c43956eb17.png","hash":"thumbnail_News_blog_31_c43956eb17","mime":"image/png","name":"thumbnail_News blog 31.png","path":null,"size":48.36,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Since the mainnet launch of Ergo on July 1, 2019, the blockchain has reached many important milestones. In just the last year, Ergo has successfully implemented [EIP-27](/en/blog/A-New-Era-for-Ergo-EIP-27-Begins-Today/), and witnessed extensive improvements for existing wallets, a significant increase in the number of dApps in the ecosystem, the first DEX, NFT marketplaces, new developer tooling, progress in research development and much more. The Ergo team has been especially busy from a developer standpoint, accomplishing [5811 developer commits](https://twitter.com/ergoplatformorg/status/1542643911960973312). 

Although Ergo’s progress has been extensive thus far, the next year and beyond will unveil plans to continually position Ergo as one of the top technology-focused blockchains in the industry. It is important to note that future features are not only being developed by the Ergo core team, but also by various projects building on top of the Ergo blockchain. In fact, many of those builders are alumni of Ergo’s incredibly successful ErgoHack hackathons (see the [ErgoHack website](https://ergohack.io/) for details on the upcoming ErgoHack V: Mining and Minting). Over the next couple of weeks, we will highlight various parts of the roadmap in these articles. For a complete overview of the long-term roadmap, please visit the [Ergo Platform website](/en/ecosystem/#Roadmap). We will begin our discussion today with a look at Spectrum and DexyUSD.

## Spectrum on Ada

Spectrum (formerly known as ErgoDEX) has launched a decentralized exchange on top of the Ergo blockchain known for its fast, seamless and easy-to-use user interface. It is currently operational and fully functional on the Ergo blockchain, however, Spectrum is set to release an important update that will enable the dApp to be a cross-chain DEX on both the Ergo and Cardano networks. Spectrum is currently on the Cardano testnet and is scheduled to deploy on the mainnet as soon as the Vasil hard fork combinator goes live. On the Ergo network, Spectrum provides ERG swaps with a variety of native tokens on the Ergo blockchain. For more information about this DEX, please visit the [Spectrum website](https://spectrum.fi/). Interested parties can also stay up to date on details about launching on the Cardano mainnet via the [Spectrum Twitter account](https://twitter.com/SpectrumLabs_?s=20&t=NDifHzBWmsyvxiM3SJdaZw).

## DexyUSD

The need to continually innovate, improve and evolve blockchain technology on Ergo is an identifying feature of the blockchain. There is already an algorithmic stablecoin live on Ergo (SigUSD) which is crypto-backed and overcollateralized, and has never lost its peg throughout extreme market volatility. Ergo’s founder, Alexander Chepurnoy, along with Scalahub and community members are currently working on implementing another stablecoin, called DexyUSD. DexyUSD is an algorithmic stablecoin with various features that will continue to improve on the success of SigUSD. For instance, DexyUSD will not have any governance or external reserves. [In a recent video](https://www.youtube.com/watch?v=Jg5IzoqhChI&ab_channel=ErgoPlatform), Chepurnoy explains in depth, stating that “there are no external reserves . . . external reserves are always about centralized protocols” (Time index 2:55-3:15).

Delving deeper into DexyUSD’s design, Alex Chepurnoy highlights three prominent features in his video. The design components consist of oracles, liquidity pools and an algorithmic bank. The oracle will act as a trusted data point in targeting the price of ERG/stablecoin from a variety of external markets. The oracle will provide the information regarding the price of ERG so that DexyUSD keeps its peg. The algorithmic bank also showcases some unique features that will ensure DexyUSD’s reliability and validity. Chepurnoy states that the algorithmic bank has two primary goals. These goals are “to provide liquidity by minting stablecoins in exchange for ERG, using [the] oracle’s price,” while ensuring “stability in the liquidity pool by injecting ERGs when needed” (Time index 4:45-5:48). The algorithmic bank also takes actions to protect DexyUSD’s peg by charging a fee for minting, thereby preventing the oracle from front-running and building up reserves. Chepurnoy also states that an additional feature of DexyUSD is that “if [the] exchange rate differs from [the] oracle’s for enough time, which means interventions did not succeed, [it] burns stablecoins in the pool to get the price back to normal” (Time index 11:45-12:10). The burning mechanism is designed to guarantee the stabilization of DexyUSD, however it can have a negative effect for those who provide liquidity. Chepurnoy states that they try to avoid burning the stablecoin by first burning reserves in the case of a catastrophic event. The bank and liquidity pool charges fees to build its reserves up which allows the burning of reserves to take place rather than burning the stablecoin initially. For a comprehensive overview of this new stablecoin protocol, please view the entirety of [Chepurnoy’s video](https://www.youtube.com/watch?v=Jg5IzoqhChI&ab_channel=ErgoPlatform). 

Stay tuned for the next article about Ergo’s Roadmap as we explore the topic of exchange listings and oracle pools v2.
