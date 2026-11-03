---
cmsId: 2856
title: Rosen Bridge Nears Bitcoin Runes Launch
slug: Rosen-Bridge-Nears-Bitcoin-Runes-Launch
type: blog
locale: en
date: "2025-11-23T21:00:00"
publishedAt: "2025-11-24T13:48:30.549"
updatedAt: "2025-11-27T13:21:44.219"
author: Ergo Platform
tags: ["Ecosystem Announcement"]
spotlight: true
subtitle: Bringing Multi-Chain Assets Closer to Ergo Users
image: {"url":"/uploads/News_blog_ergo_smartlayer_59c0a46fa1.png","alt":"News_blog_ergo_smartlayer.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_ergo_smartlayer_59c0a46fa1.png","hash":"large_News_blog_ergo_smartlayer_59c0a46fa1","mime":"image/png","name":"large_News_blog_ergo_smartlayer.png","path":null,"size":547.82,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_ergo_smartlayer_59c0a46fa1.png","hash":"small_News_blog_ergo_smartlayer_59c0a46fa1","mime":"image/png","name":"small_News_blog_ergo_smartlayer.png","path":null,"size":161.6,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_ergo_smartlayer_59c0a46fa1.png","hash":"medium_News_blog_ergo_smartlayer_59c0a46fa1","mime":"image/png","name":"medium_News_blog_ergo_smartlayer.png","path":null,"size":328.89,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_ergo_smartlayer_59c0a46fa1.png","hash":"thumbnail_News_blog_ergo_smartlayer_59c0a46fa1","mime":"image/png","name":"thumbnail_News_blog_ergo_smartlayer.png","path":null,"size":46.41,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Rosen Bridge has entered the final phase for its [Bitcoin Runes integration](/en/blog/Bitcoin-Runes-Rosen-Bridge-A-Practical-Path-for-Multi-Chain-Fungible-Assets/). You can now set up your Bitcoin-Runes watcher. The collateral requirement for the Bitcoin-Runes network has changed. You need to lock 50K RSN and 10 ERG as collateral to run a Bitcoin-Runes watcher. You can find the latest configuration documentation [here](https://github.com/rosen-bridge/operation/blob/dev/docs/watcher/deploy-docker.md#bitcoin-runes-config-just-for-bitcoin-runes-watchers). 

This update matters for anyone trading or building on Ergo. Runes are Bitcoin’s native fungible asset standard. Integrating them into Rosen means that tokens minted on Bitcoin can move across chains through Ergo, Cardano, and others already linked through the bridge. That makes Rosen one of the first working paths between Bitcoin Runes and UTXO-based DeFi.

## Current Status

The Rosen team has successfully moved beyond the testing phase and executed the on-chain creation of the necessary assets. **Rune balance**s destined for the bridge are now minted and live on Bitcoin.

The team has established the ```•ROSEN•TECH```  namespace, creating Runes that represent a wide variety of external assets. This includes major liquidity tokens like **ETH, BNB, ADA**, and **DOGE**, as well as ecosystem-specific assets like **RSN, Paideia**, and the **SigmaUSD** stablecoin (```•SIGMA•ROSEN•TECH```). These newly created balances act as the foundational liquidity layer on Bitcoin, signaling that the infrastructure is now primed to facilitate the actual bridging and swapping of these tokens across networks.

As of November 22nd, the Runes+ bridge is ready to launch and watchers are invited to get set-up.

⚠️ _Please Note:  This release is not limited to Bitcoin-Runes operators – all watcher operators must update their images as soon as possible!_

## Technical Progress
- Several core systems were upgraded for this milestone.
- The legacy P2P layer has been replaced with Rosenet, improving message routing and reducing load.
- A new Ergo Multisig package now handles key coordination and validation logic on the code level.
- All major services moved to Node v22.18 to align with current runtime standards.
- And the obvious step, the Bitcoin Runes chain is now part of the network list.

Alongside these, Rosen is introducing an **On-Chain Token Map**. Until now, supported assets were defined in a JSON file shared among watchers and guards. Every token update required manual synchronisation. The new model stores supported token data directly on-chain, so bridge participants can fetch verified configs straight from Ergo boxes. This change removes manual delays and adds transparency to how assets become bridge-eligible.

The migration is happening in two stages. The first updated TokenMap structures to recognise configs stored on-chain. The second, now in motion, shifts live services to read from blockchain data rather than local files. UI applications are the first to adopt the change, followed by guard and watcher services.

## Meaning in Practice

The Runes integration turns Ergo into a route for Bitcoin-denominated tokens. Instead of waiting for centralised exchanges to list them, you’ll be able to mint, transfer, and trade Runes assets across supported networks. Rosen’s on-chain token mapping simplifies deployment and removes the need to patch configs manually. Also, it opens opportunities to build liquidity scripts and automated swaps directly around Bitcoin-native tokens once liquidity pools form on [ErgoDEX](https://www.ergodex.io/ergo/swap).

When Bitcoin Runes go live through [Rosen](https://rosen.tech/), cross-chain fungible assets will become a day-to-day tool.

Deployment to mainnet and asset minting are now in progress. The team expects the full bridge release before the end of the month.
