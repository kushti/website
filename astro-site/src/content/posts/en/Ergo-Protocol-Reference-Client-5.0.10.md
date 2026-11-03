---
cmsId: 2584
title: "Ergo Protocol Reference Client 5.0.10"
slug: "Ergo-Protocol-Reference-Client-5.0.10"
type: news
locale: en
date: "2023-05-09T21:00:00"
publishedAt: "2023-05-10T12:35:40.088"
updatedAt: "2025-08-25T09:20:22.016"
author: Ergo Platform
tags: ["Core"]
spotlight: true
subtitle: "With each subsequent Protocol Reference Client update, the Ergo Platform continues to improve blockchain efficiency. The release of Reference Client 5.0.10 presents significant upgrades, offering several advancements and bug fixes to the node client. "
image: {"url":"/uploads/News_blog_14_5_18f8045760.png","alt":"News blog 14 (5).png","width":2560,"height":1280,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_14_5_18f8045760.png","hash":"large_News_blog_14_5_18f8045760","mime":"image/png","name":"large_News blog 14 (5).png","path":null,"size":824.48,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_14_5_18f8045760.png","hash":"small_News_blog_14_5_18f8045760","mime":"image/png","name":"small_News blog 14 (5).png","path":null,"size":206.03,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_14_5_18f8045760.png","hash":"medium_News_blog_14_5_18f8045760","mime":"image/png","name":"medium_News blog 14 (5).png","path":null,"size":461.78,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_14_5_18f8045760.png","hash":"thumbnail_News_blog_14_5_18f8045760","mime":"image/png","name":"thumbnail_News blog 14 (5).png","path":null,"size":52.94,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

### What’s New in Ergo Protocol Reference Client 5.0.10?

The new reference client provides important updates to the bootstrapping process, additional indexes, a new API method, and more. 

Bootstrapping is the process whereby the reference client is set up on one’s computer. Since bootstrapping can oftentimes be a time consuming procedure, the new update saves time by taking a snapshot of all of the unspent coins in a UTXO set. This snapshot allows the client to start up without having to do everything from scratch, thereby greatly improving the efficiency and speed of this process. 

The new reference client has also been updated with a new API method that allows users to obtain their private key bytes for a particular public key. This feature is only accessible if the user's wallet has the private key and is unlocked.

Additional updates include improved efficiency with the ErgoTree interpreter and Ergoscript compiler. Furthermore, fixes in additional indexes have been made - this includes fixes in paging for blockchain endpoints. 

For the complete breakdown on the updates in Ergo Protocol Reference Client 5.0.10, please consult the open source [GitHub](https://github.com/ergoplatform/ergo/releases/tag/v5.0.10).
