---
cmsId: 2489
title: Ergo’s EIP-27 Rollout
slug: Ergo’s-EIP-27-Rollout
type: news
locale: en
date: "2022-05-18T23:00:00"
publishedAt: "2022-05-19T19:32:46.805"
updatedAt: "2025-08-25T08:17:31.25"
author: Ergo Platform
tags: ["Mining","Core"]
spotlight: false
subtitle: Alex Chepurnoy Releases Ergo Reference Client 4.0.29 with EIP27 Support
image: {"url":"/uploads/News_blog_32_2_4ac00df5f1.png","alt":"News blog 32 (2).png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_32_2_4ac00df5f1.png","hash":"large_News_blog_32_2_4ac00df5f1","mime":"image/png","name":"large_News blog 32 (2).png","path":null,"size":682.61,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_32_2_4ac00df5f1.png","hash":"small_News_blog_32_2_4ac00df5f1","mime":"image/png","name":"small_News blog 32 (2).png","path":null,"size":159.74,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_32_2_4ac00df5f1.png","hash":"medium_News_blog_32_2_4ac00df5f1","mime":"image/png","name":"medium_News blog 32 (2).png","path":null,"size":369.5,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_32_2_4ac00df5f1.png","hash":"thumbnail_News_blog_32_2_4ac00df5f1","mime":"image/png","name":"thumbnail_News blog 32 (2).png","path":null,"size":42.76,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Over the last several months, there has been a lot of work undertaken to implement a plan that would adjust the emission schedule of ERG (Ergo’s native token). Until recently, the emission of ERG would have ended after 8 years (from mainnet launch). However, out of a concern for ensuring the long term crypto-economic security of the blockchain, core developer, Alex Chepunoy, proposed extending the emission schedule, while maintaining a fixed supply of 97,739,925 ERG.

That proposal (EIP27) entails a calculated reduction to block rewards, where the subtracted ERG are stored in a smart contract. The ERG in that contract will then pay mining rewards for an additional ~17.38 years. If you are new to EIP27, please read this article for a complete and comprehensive breakdown of the proposal.

In order for EIP27 to be implemented, it requires the support of the mining community (with a 90% pass vote). Recently, the various Ergo mining pools indicated their initial support for the proposal, and the core developer team began work on preparing the necessary data to fully implement EIP27.

Just yesterday, Chepurnoy released Ergo Protocol Reference Client 4.0.29 and it contains important information for EIP27 support. In addition to several downloadable assets, Chepurnoy highlighted the following settings that need to updated:

_The following is quoted from Chepurnoy’s Github post:_

To vote for EIP-27, use the following setting:

```
ergo {
  voting {
    8 = 1000
  }
}
```

To check EIP-27 rules after successful activation, the following setting is needed, which is off by default but needed for mining nodes (to be on proper chain in case of chain-split where old nodes can generate blocks not compatible with EIP-27):

```
ergo {
  chain {
    reemission {
      checkReemissionRules = true
    }
  }
}
```

To make proper EIP-27 compatible transactions in the presence of re-emission tokens in the node wallet, another setting is needed:

```
ergo {
  wallet {
    checkEIP27 = true
  }
}
```

So combined config (for a pool node also doing payments) could be like:

```
ergo {
  networkType = "mainnet"
  node {
    mining = true
  }
  voting {
    8 = 1000
  }
  chain {
    reemission {
      checkReemissionRules = true
    }
  }
  wallet {
    checkEIP27 = true
  }
}
```

Also, this release has a new setting to switch peer discovery off (discovery is on by default), for that, use the following setting:

```
scorex {
  network {
    peerDiscovery = true
  }
}
```

### Conclusion
It is important for all parties that operate Ergo mining operations (and anyone else who deploys an Ergo node) to check these updates and implement them for the successful activation of EIP27. Currently, EIP27 is scheduled to go live at block #777217 - near the end of June 2022. Be sure to keep an eye on Ergo’s social media channels for more important updates on EIP27 as they unfold.
