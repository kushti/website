---
cmsId: 2747
title: "Lithos: A Bányászat Decentralizálása On-Chain Poolokkal"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: hu
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T13:43:33.402"
author: Ergo Platform
tags: ["Ecosystem","Mining"]
spotlight: false
subtitle: null
image: {"url":"/uploads/lithos_3a4c5e9c7b.png","alt":"lithos.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_lithos_3a4c5e9c7b.png","hash":"large_lithos_3a4c5e9c7b","mime":"image/png","name":"large_lithos.png","path":null,"size":380.96,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_lithos_3a4c5e9c7b.png","hash":"small_lithos_3a4c5e9c7b","mime":"image/png","name":"small_lithos.png","path":null,"size":114.45,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_lithos_3a4c5e9c7b.png","hash":"medium_lithos_3a4c5e9c7b","mime":"image/png","name":"medium_lithos.png","path":null,"size":229.61,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_lithos_3a4c5e9c7b.png","hash":"thumbnail_lithos_3a4c5e9c7b","mime":"image/png","name":"thumbnail_lithos.png","path":null,"size":34.85,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

A Lithos egy új protokoll, amely a bányászati poolok működésének átalakítására készült azáltal, hogy azokat on-chain helyezi, teljes ellenőrzést biztosít a bányászok számára, és megszünteti a központosított pool üzemeltetők szükségességét. A legtöbb korábbi decentralizált bányászati kísérlettel ellentétben a Lithos hatékony, skálázható és biztonságos.

---

## Mi a Lithos?

A Lithos egy decentralizált bányászati pool protokoll, amely közvetlenül összeköti a bányászokat az Ergo okos szerződéseivel. Ezek a szerződések mindent kezelnek—munka benyújtás, nehézségkezelés és kifizetések—anélkül, hogy központosított szerverekre vagy őrzőkre támaszkodnának.

A protokoll **Stratum**-ot használ a bányászati hardverek Lithos klienshez való csatlakoztatására, de minden kulcsfontosságú logika on-chain fut. A bányászok munkát nyújtanak be az okos szerződésekhez, és közvetlenül kapják meg a kifizetéseket egy új kriptográfiai bizonyíték formátum alapján.

Úgy van tervezve, hogy **blockchain agnosztikus** legyen, ami azt jelenti, hogy a jövőben támogathat bányászati poolokat bármilyen proof-of-work lánc számára. A munka számítása és tárolása az Ergon történik ErgoScript okos szerződésekkel, míg más láncok kifizetési ellenőrzése könnyű hidakat igényelne.

Kezdeti kutatások már folyamatban vannak a Lithos Bitcoin támogatásának kiterjesztésére egy interoperábilis dizájn révén.

---

## Hogyan működik

A Lithos két kulcsfontosságú ötletet kombinál: **Non-Interactive Share Proofs (NISPs)** és **kollaterális bányászati poolok**, amelyeket Layer 2 okos szerződéseken (konkrétan egy optimista rollup-on) valósítanak meg az Ergon.

### NISPs: Bizonyíték interakció nélkül

A Non-Interactive Share Proofs lehetővé teszik a bányászok számára, hogy munkabizonyítékot nyújtsanak be anélkül, hogy folyamatosan interakcióba lépnének egy szerverrel. Minden bányász saját nehézségét választja, amely meghatározza, hogy milyen gyakran kap kifizetéseket és mekkora azok nagysága.

Az okos szerződések érvényesítik ezeket a bizonyítékokat és kifizetéseket bocsátanak ki, központosított koordináció nélkül.

### Kollaterális Poolok

A Lithos bányászati pooljai kollaterálisan vannak fedezve. A bányászok és nem bányászok ERG vagy LITHOS tokeneket stakelhetnek a pool kollaterálizálására. Ez lehetővé teszi:

* Helyi blokkgyártás teljes tranzakcióválasztással
* Cenzúra ellenállás
* Kifizetési méltányosság on-chain érvényesítése
* Natív DeFi kölcsönzési mechanizmus a pool létrehozói és stakerei között

---

## Előnyök a bányászok számára

* **Teljes blokkellenőrzés**: A bányászok választják ki a tranzakciókat, gyűjtik a demurrage-t és az MEV-t.
* **Méltányos kifizetések**: Az okos szerződések átláthatóan kezelik az összes jutalmat.
* **Nincs pool üzemeltetői kockázat**: Nincs központosított fél, aki csalhat vagy késleltetheti a kifizetéseket.
* **Helyi kliens**: A Lithos bányász helyben fut, hogy elkerülje a késleltetést vagy a régi részvényeket.
* **Állítható nehézség**: A bányászok beállíthatják a részvény nehézségét, hogy illeszkedjen a hardverükhöz és kockázati preferenciáikhoz.

---

## Nehézség és kifizetések

A protokoll egy egyedi kifizetési modellt vezet be:

* **Magasabb nehézség** = kevesebb, de nagyobb kifizetések
* **Alacsonyabb nehézség** = gyakoribb, de kisebb kifizetések

A valós tesztelés azt mutatja, hogy a teljes jutalmak arányosak maradnak a hashrate-tel, de a bányászok választhatják meg, hogy mennyire stabilak vagy volatilisek a bevételeik.

---

## LITHOS Token

A protokoll tartalmazni fog egy natív tokent:

* **Megkeresett** a bányászok által a decentralizált poolok használatáért.
* **Szükséges** a pool kollaterálizálásához, összekötve a bányászokat és a hitelezőket.
* **Használják** a spam, csalás megelőzésére és a rollup szekvenciázásának segítésére.

További információk a közelgő fehér könyvben lesznek elérhetők.

---

## Legfrissebb Fejlesztési Frissítések

* A végső csalás bizonyíték szerződések felülvizsgálat alatt állnak
* A tárolási bérleti megvalósítást finomították a blokk szintű helyettesítési támadások megelőzése érdekében
* A nehézség szerződés építése folyamatban van a bányászat utáni manipuláció megelőzésére
* A rollup szerződés tesztelése és a stratum javítások folyamatban vannak
* A kódalap nyilvánossá válik a teszthálózat indítása előtt
* Kutatás folyamatban a Bitcoin integrációról

A teszthálózat indítása közeleg, a végső rollup integráció és stratum stabilitás függvényében.

---

## Mi a következő lépés

A Lithos ütemterve szorosan összefonódik a Sigma 6.0 Ergo mainnetre való kiadásával, amely előfeltétele a Lithos élesítésének.

Addig is, a munka folytatódik az első nyilvános teszthálózaton. A végső szakasz tartalmazza:

* A rollup és csalás bizonyíték szerződések befejezése és tesztelése
* A stratum kliens integráció véglegesítése
* A nyilvános kódalap kiadása a peer review számára
* A kibocsátási, konfigurációs és kollaterális szerződések fejlesztésének folytatása
* A BTC integráció tervezése a szélesebb protokoll kompatibilitás érdekében
* A fehér könyv véglegesítése, amely a rendszer tervezését és token mechanikáját vázolja fel

Miután ezeket a mérföldköveket elérték és a Sigma 6.0 aktiválódik a mainneten, a Lithos készen áll a bevezetésre.

---

## Források

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
