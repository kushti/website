---
cmsId: 2642
title: "ErgoHack VIII: Ergo As A Smart Layer"
slug: ErgoHack-8-Ergo-As-A-Smart-Layer
type: news
locale: en
date: "2024-05-29T21:00:00"
publishedAt: "2024-05-30T11:03:22.122"
updatedAt: "2025-08-23T22:36:38.633"
author: Ergo Platform
tags: ["Events"]
spotlight: true
subtitle: null
image: {"url":"/uploads/ergo_hack_VIII_newsblog_15042024_66eae09e2f.png","alt":"ergo_hackVIII_newsblog_15042024.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_ergo_hack_VIII_newsblog_15042024_66eae09e2f.png","hash":"large_ergo_hack_VIII_newsblog_15042024_66eae09e2f","mime":"image/png","name":"large_ergo_hackVIII_newsblog_15042024.png","path":null,"size":122.14,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_ergo_hack_VIII_newsblog_15042024_66eae09e2f.png","hash":"small_ergo_hack_VIII_newsblog_15042024_66eae09e2f","mime":"image/png","name":"small_ergo_hackVIII_newsblog_15042024.png","path":null,"size":46.66,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_ergo_hack_VIII_newsblog_15042024_66eae09e2f.png","hash":"medium_ergo_hack_VIII_newsblog_15042024_66eae09e2f","mime":"image/png","name":"medium_ergo_hackVIII_newsblog_15042024.png","path":null,"size":82.6,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_ergo_hack_VIII_newsblog_15042024_66eae09e2f.png","hash":"thumbnail_ergo_hack_VIII_newsblog_15042024_66eae09e2f","mime":"image/png","name":"thumbnail_ergo_hackVIII_newsblog_15042024.png","path":null,"size":18.48,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Since the launch of Ergo in 2019, ErgoHacks have emerged as a critical event in the Ergo community’s year. These hackathons are a chance for community devs to work intensively on specific projects. While ErgoHacks were originally conceived as competitive events, they have evolved into opportunities to work with experienced mentors, and have significantly contributed to the development of essential tools and decentralized applications (dApps) that form the core infrastructure of the Ergo ecosystem.

The theme for current hackathon, [ErgoHack VIII](https://ergohack.io/), which takes place from 25 May to 2 June, is **Ergo As A Smart Layer For Bitcoin**. The aim is to leverage Ergo’s unique features, such as the extended UTXO model and Sigma protocols, to build DeFi applications that help position Ergo as a means of extending Bitcoin’s own functionality. 

Participants – both solo and in teams of up to six – have the chance to showcase their skills, collaborate with fellow developers, and contribute to the ecosystem's growth. The event includes planning, designing, and workshopping proposals with guidance from industry experts in blockchain, AI, finance, and project development. 

Here are some of the key projects that participants are building. 

### Lightning Swaps (Analog Ergo)

The Atomic Swap Software team is working on a proof-of-concept integration for atomic cross-chain swaps between Bitcoin’s Lightning Network and Ergo. 

Their solution will use Lightning Network “Submarine Swaps,” which use HTLC or Hash Time Lock Contracts to enable swaps between Lightning Network BTC and Mainnet BTC. The Atomic Swap Software team has implemented a similar system on Ergo using EC Point Time Lock Contracts. Their main goal is to modify Ergo contracts to be compatible with Lightning Network's hashed preimage system. Future compatibility with PTLCs (Point Time Lock Contracts) may allow broader use of their existing contracts with Lightning Network swaps. Additionally, they plan to implement Reverse Submarine Swaps to ensure smooth liquidity paths in both directions for integrated chains.

The team has already implemented a unidirectional swap between Sepolia EVM Testnet and Testnet Ergo, and are now developing critical security features before public testing and Mainnet launch. The Lightning link will act as a secondary liquidity path for their market network. 

### CrystalPool 

The CrystalPool team plans to deliver a proof-of-concept for a self-custodial exchange that offers a real-time user experience similar to conventional centralized exchanges. They aim to develop a user interface for trading, an order book management system, and core functionalities for handling chains of unsubmitted transactions. Key components include a transaction processing system, a communication protocol for multi-signatures, integrated wallet functions, and a user interface for order creation and balance tracking.

CrystalPool uses time-limited multisig smart contracts and a headless wallet to facilitate real-time exchange transactions on Layer 1. The exchange ensures self-custody by requiring both the user's and pool's public keys to sign operations, with the user gaining full control after a specified time limit. The integrated wallet provides real-time balance updates and seamless transaction processing.

The team has already implemented mathematical functions for the Black-Scholes model in ErgoScript, pricing call options, and dual asset exchanges. Upcoming tasks involve refining option exercising stages, supporting various strikes and expirations, and further enhancing the UI.

### Cup of Sugar

Cup of Sugar seeks to use the blockchain in a real-world setting, facilitating the creation of a LETS (local exchange-trading system). LETS are micro-economies in which goods and services are exchanged for a local or native currency. (The project has already airdropped some $COS tokens to community members’ wallets.)

Cup of Sugar offers farm-fresh, traceable products that promote local agriculture. However, the project intends to go further than this by offering a blueprint for micro-grocers and coffee shops who want to use the same approach.

### OptionPools (Duckpools) 

The initiative targets the creation of highly liquid option markets, using Ergo's unique capabilities and the Rosen Bridge to establish the network as the hub of crypto options trading.

OptionPools has integrated complex mathematical functions into ErgoScript to develop an on-chain Black-Scholes options pricing model. This includes logarithmic, exponential, and square root functions, along with a rough implementation of the Cumulative Distribution Function (CDF). The model has been tested on-chain by pricing and selling call options from a dual-asset option pool. Test asset exchanges are being carried out.

### Ephemeral Token Messaging

This project aims to create a private messaging system that uses the Ergo blockchain and mempool to deliver messages, paying Ergo miners for their support. 

The alpha PoC aims to deliver a secure, instant messaging desktop app for all operating systems. The app reads messages from the mempool for speed, and uses a smart contract to ensure assets for paying miners cannot be tampered with. This version employs the “creationHeight” parameter for message expiry. An offchain bot burns tokens in the smart contract and sends the ERG to the Sigmanauts Mining bonus payout wallet.

To use the service, users input an address and type their message. Upon submission, the backend creates an NFT with the message and sends it to the smart contract with approximately 0.01 ERG. The creationHeight parameter is set to determine the message expiry duration. The app monitors the mempool for the smart contract, displaying messages from the NFT in a user-friendly conversation window.

This service prioritizes privacy, providing a foundation for encrypted messaging on a public ledger. It offers potential use cases for dApps, such as facilitating trades, loans, and secure information exchanges.

### Moria Finance 

Moria Finance offers a set of new tools for managing funds, including Bitcoin that has been bridged to Ergo via Rosen (rsBTC).

Bitcoin itself has limited scripting, and although there are several platforms that seek to implement smart contracts directly on the Bitcoin network, these are controversial for various reasons and have a number of drawbacks. 

Moria’s initial solutions for Bitcoin will include timelocked wallets, which control where and when funds are sent; reversible addresses that are subject to third-party oversight; and simplified handling of group funds using multisig addresses.

### Reputation System

Two implementations of a reputation system based on the Runes protocol on Bitcoin are being developed and tested. 

The first is a simplified version, while the second incorporates Sigma Script for greater versatility. This version, called “Sigma Runes”, while based on the Runes protocol, does not follow it in every detail since the reputation proofs serve different purposes in each case.

Work still to be completed includes adding the Bitcoin network to the Sigma Reputation Panel interface, implementing a server that connects to a Bitcoin RPC (similar to the "Ord" library of the original Runes), and creating additional documentation and videos.

### Mining BTC Swap

This project aims to create a permissionless on-chain system to allow miners to configure pools and swap mining rewards for other tokens.

The service uses a smart contract to hold tokens, which are sent out to Ergo addresses when the payment threshold is reached. NFTs are used to define pool parameters, with backend bots tasked with performing maintenance. 

### RNG

Random number generators have many applications in blockchain, including gaming, lotteries and NFTs, but creating high levels of reliable randomness is difficult. This project intends to address this gap on Ergo, aiming to ensure strong security and a tamper-proof commit-reveal protocol to ensure unbiased outcomes that cannot be exploited. 

### Sigma Wallet 

This project will see the creation of a new React Native and Rust mobile wallet. The aim is to provide a different kind of UI/UX, inspired by wallets such as Green Wallet, Kaspium and Mutiny. Ideally this will be a user-friendly wallet for everyone that nonetheless retains some more complex and niche “cypherpunk” features, including non-reusable addresses for greater privacy.

### Space Wallet

The PoC for Space Wallet will be a cross-platform (mobile, desktop and ideally web) wallet that uses NiPoPoWs – non-interactive proofs of proof-of-work – to sync with the blockchain and provide basic functionality for connecting to dApps. An additional goal is to chain multiple actions together without needing to wait for the next block using mempool spending. The tech used will be Flutter for the UI and Sigma-Rust for wallet functionality.

### Trustless Relays

This project will enable trustless transfers, facilitate advancements like RGB++, and support the creation of trustless Bitcoin hashrate derivatives on Ergo.

### Wallet Wonderland

The plan here is to create visual guides and tutorials for popular wallets, providing detailed documentation that can be maintained on an ongoing basis.

Ergo has multiple wallets in current use, but development for some key wallets has been discontinued, or updates are infrequent. It can be difficult to know which wallet, or even type of wallet (mobile, node, browser plug-in, etc) is best for different users, including newcomers, games, dApp users, developers, and so on.

Wallet Wonderland aims to provide comprehensive information about the different options available, what each of them offer, and some of the key terms and questions users need to understand. These include understanding seed phrases, cold wallet creation and use, wallet restoration, multisig addresses, UTXOs and consolidation, Ergo’s demurrage, and much more. 

As well as gathering existing documentation, Wallet Wonderland’s team will interview 25-30 community members about their preferences and tips for wallet use, and consult with wallet developers for further insights. The result will be a set of visual guides and video tutorials.

### Huangians

This was a late entry from a group of computer science students at Cornell University. Further details will be confirmed in due course.

### Rosen Port

Rosen Port aims to facilitate cross-chain bridging with lower fees, particularly benefiting smaller funds. By enabling batch bridging, this approach allows small holders to participate in the bridging process and explore the Ergo ecosystem without incurring high fees. Their goal is to build an inclusive system that allows everyone to use the Rosen Bridge, regardless of the amount of tokens they hold, thereby increasing adoption.

## Find Out More

ErgoHack VIII promises to be a valuable event for the community – creating new software to bring the benefits of Ergo to a wider audience – and to Ergo developers. $18,000 in prize money has been donated by the Ergo Foundation. The Rosen team has also donated 100,000 $RSN, worth around $9,000, and [the community has raised](https://ergoraffle.com/raffle/show/91547b4f55a049553dc8629c246431dd904ed16565a1ed859b59f7cbe6e92514) a further 8,462 ERG to reward participants. This means the total prize pool is around $40,000!

You can find out more about any of these projects by joining the [Ergo Discord](https://discord.gg/EPCUjAV5)! Each group has its own channel within the ERGOHACK category.

Good luck to all those participating!
