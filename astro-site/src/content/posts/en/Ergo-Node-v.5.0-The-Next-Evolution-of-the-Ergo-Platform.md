---
cmsId: 2499
title: "Ergo Node v.5.0: The Next Evolution of the Ergo Platform"
slug: Ergo-Node-v.5.0-The-Next-Evolution-of-the-Ergo-Platform
type: blog
locale: en
date: "2022-06-13T23:00:00"
publishedAt: "2022-07-14T18:04:47.488"
updatedAt: "2025-08-25T09:48:59.506"
author: Ergo Platform
tags: ["Core"]
spotlight: true
subtitle: null
image: {"url":"/uploads/News_blog_50_2_2bfc368064.png","alt":"News blog 50 (2).png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_50_2_2bfc368064.png","hash":"large_News_blog_50_2_2bfc368064","mime":"image/png","name":"large_News blog 50 (2).png","path":null,"size":745.56,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_50_2_2bfc368064.png","hash":"small_News_blog_50_2_2bfc368064","mime":"image/png","name":"small_News blog 50 (2).png","path":null,"size":192.18,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_50_2_2bfc368064.png","hash":"medium_News_blog_50_2_2bfc368064","mime":"image/png","name":"medium_News blog 50 (2).png","path":null,"size":419.55,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_50_2_2bfc368064.png","hash":"thumbnail_News_blog_50_2_2bfc368064","mime":"image/png","name":"thumbnail_News blog 50 (2).png","path":null,"size":53.77,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

It’s been an incredibly active year for development on the Ergo Platform. New dApps are launching on the blockchain, ErgoPad is actively promoting new projects through IDO’s, ErgoHacks are attracting more and more developers, and[ Stack continually ranks Ergo](https://www.google.com/url?q=https://twitter.com/StackDotMoney/status/1543705399366455302?s%3D20%26t%3D-CdjPZKqJp2G8OmXp29O4A&sa=D&source=docs&ust=1657825154704441&usg=AOvVaw245MK1MGYGd7t2w1LCXmQ7) among the highest for developer activity in the crypto industry. The forges are burning bright at Ergo, and it seems like Ergonauts remain undaunted by the current market climate. 

Recently, Alex Chepurnoy [tweeted about the activation of v.5.0](https://twitter.com/chepurnoy/status/1543880267290624000?s=20&t=-CdjPZKqJp2G8OmXp29O4A) on the Ergo testnet. This news is incredibly important as it signals steps are underway to launch the next significant update for the Ergo blockchain. Ergo has already executed a massive [reshuffling of the ERG emission schedule](https://twitter.com/ErgoFoundation/status/1539428241576009729?s=20&t=kR7JVq35V5BsfzNnfbpCww) in the last month, but Chepurnoy and the rest of the core developers continue to work tirelessly to build a blockchain with innovative and novel technology. To that end, v.5.0 activation will improve costing on the Ergo blockchain. Smart contracts need to be consistently verified for their legitimacy, and these actions have real costs on the blockchain. If left unchecked, the costs for checking the validity of smart contracts can have the potential to negatively impact the efficiency and security of a blockchain.

[In a previous blog post](/en/blog/2022-02-09-ergos-hybrid-method-for-counting-costs/), we discussed the two common methods for controlling costs:

“Ahead-Of-Time Costing (AOT Costing) - estimates costs before script execution so that an over-expensive script is not executed at all.
Just-In-Time Costing (JIT Costing) - calculates costs during the actual execution of a script.”

The testnet activation of v.5.0 employs a hybrid of these two costing methods. The process starts with JIT costing, where “[transaction inputs go through a verifier (one input after another) and each input’s script is reduced to a sigma proposition](/en/blog/2022-02-09-ergos-hybrid-method-for-counting-costs/).” Once all the inputs for the transaction have a sigma proposition, AOT costing is applied to determine the costs in the transaction in question. “[All costs are then added together to determine the final cost of the transaction itself. Once the final cost of the transaction is obtained it is added to the block cost, which must be within the block budget before it can be added to it.](/en/blog/2022-02-09-ergos-hybrid-method-for-counting-costs/)”

When asked about what kinds of improvements v.5.0 could provide to the blockchain, [Chepurnoy offered the following](https://twitter.com/chepurnoy/status/1544823256523460615?s=20&t=-CdjPZKqJp2G8OmXp29O4A):

“It depends, some contracts are heavily hit by ahead-of-time costing (the protocol [that is currently used]), and so we can see 10x costing improvement there, others not so.”

Ultimately, the goal of this new hybrid costing system is to increase the efficiency of the blockchain (by improving the number of transactions/block), while also reducing the current costing of smart contracts.

Keep an eye on Ergo’s social media channels for more updates on v.5.0, and for details on when it may be activated on mainnet.
