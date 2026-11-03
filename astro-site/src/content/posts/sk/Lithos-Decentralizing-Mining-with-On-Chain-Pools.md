---
cmsId: 2818
title: "Lithos: Decentralizácia ťažby s on-chain poolmi"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: sk
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T20:01:05.641"
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

Lithos je nový protokol navrhnutý na prepracovanie fungovania ťažobných poolov presunutím ich na on-chain, čo dáva ťažiarom plnú kontrolu a eliminuje potrebu centralizovaných operátorov poolov. Na rozdiel od väčšiny predchádzajúcich pokusov o decentralizovanú ťažbu je Lithos navrhnutý tak, aby bol efektívny, škálovateľný a bezpečný.

---

## Čo je Lithos?

Lithos je protokol decentralizovaného ťažobného poolu, ktorý spája ťažiarov priamo so smart kontraktmi na Ergo. Tieto kontrakty spravujú všetko—predloženie práce, riadenie obtiažnosti a platby—bez závislosti na centralizovaných serveroch alebo správcov.

Protokol používa **Stratum** na pripojenie ťažobného hardvéru k klientovi Lithos, ale všetka kľúčová logika beží on-chain. Ťaziari predkladajú prácu smart kontraktom a dostávajú platby priamo na základe nového formátu kryptografického dôkazu.

Je navrhnutý tak, aby bol **blockchain agnostický**, čo znamená, že by mohol podporovať ťažobné pooly pre akýkoľvek proof-of-work reťazec v budúcnosti. Výpočty práce a ukladanie prebieha na Ergo pomocou smart kontraktov ErgoScript, zatiaľ čo overenie platieb pre iné reťazce by vyžadovalo ľahké mosty.

Počiatočný výskum už prebieha na rozšírenie podpory Lithos pre Bitcoin prostredníctvom interoperabilného dizajnu.

---

## Ako to funguje

Lithos kombinuje dve kľúčové myšlienky: **Non-Interactive Share Proofs (NISPs)** a **kolateralizované ťažobné pooly**, implementované prostredníctvom Layer 2 smart kontraktov (konkrétne optimistického rollupu) na Ergo.

### NISPs: Dôkaz bez interakcie

Non-Interactive Share Proofs umožňujú ťažiarom predkladať dôkaz o práci bez potreby interakcie so serverom. Každý ťažiar si vyberá svoju vlastnú obtiažnosť, ktorá určuje, ako často dostáva platby a aké veľké sú tieto platby.

Smart kontrakty overujú tieto dôkazy a vydávajú platby, bez potreby centralizovanej koordinácie.

### Kolateralizované pooly

Ťažobné pooly na Lithos sú zabezpečené kolaterálom. Ťaziari a ne-ťažiarovia môžu stakovať ERG alebo LITHOS tokeny na kolateralizáciu poolu. To umožňuje:

* Lokálnu produkciu blokov s plným výberom transakcií
* Odolnosť voči cenzúre
* On-chain vynucovanie spravodlivosti platieb
* Nativný DeFi mechanizmus pôžičiek medzi tvorcami poolov a stakerami

---

## Výhody pre ťažiarov

* **Plná kontrola nad blokmi**: Ťaziari vyberajú transakcie, zbierajú demurrage a MEV.
* **Spravodlivé platby**: Smart kontrakty spravujú všetky odmeny transparentne.
* **Žiadne riziko operátora poolu**: Neexistuje centralizovaná strana, ktorá by mohla podvádzať alebo oneskoriť platby.
* **Lokálny klient**: Ťažiar Lithos beží lokálne, aby sa predišlo latencii alebo zastaraným podielom.
* **Nastaviteľná obtiažnosť**: Ťaziari môžu prispôsobiť obtiažnosť svojich podielov, aby zodpovedala ich hardvéru a preferenciám rizika.

---

## Obtiažnosť a platby

Protokol zavádza jedinečný model platieb:

* **Vyššia obtiažnosť** = menej, ale väčších platieb
* **Nižšia obtiažnosť** = častejšie, ale menších platieb

Testovanie v reálnom svete ukazuje, že celkové odmeny zostávajú proporcionálne k hashrate, ale ťažiar môže zvoliť, ako stabilné alebo volatilné sú jeho výnosy.

---

## LITHOS Token

Protokol bude obsahovať natívny token:

* **Získaný** ťažiarom ako odmena za používanie decentralizovaných poolov.
* **Požadovaný** na kolateralizáciu poolu, spájajúci ťažiarov a veriteľov.
* **Používaný** na prevenciu spamu, podvodu a na pomoc s rollup sekvenovaním.

Viac informácií bude zverejnených v nadchádzajúcej whitepaper.

---

## Najnovšie vývojové aktualizácie

* Konečné zmluvy o dôkaze podvodu sú v revízii
* Implementácia prenájmu úložiska bola vylepšená na prevenciu útokov na úrovni blokov
* Zmluva o obtiažnosti sa buduje na prevenciu manipulácie po ťažbe
* Testovanie zmluvy o rollupe a opravy stratum sú v priebehu
* Kódová základňa bude sprístupnená verejnosti pred spustením testnetu
* Výskum prebieha na integrácii Bitcoinu

Spustenie testnetu sa blíži, čaká sa na konečnú integráciu rollupu a stabilitu stratum.

---

## Čo je ďalej

Roadmap Lithos je úzko spojená s vydaním Sigma 6.0 na Ergo mainnete, čo je predpoklad pre spustenie Lithos.

Do tej doby pokračuje práca na prvom verejnom testnete. Konečná fáza zahŕňa:

* Dokončenie a testovanie zmlúv o rollupe a dôkaze podvodu
* Finalizácia integrácie stratum klienta
* Uvoľnenie verejnej kódovej základne na posúdenie
* Pokračovanie vo vývoji emisie, konfigurácie a kolateralizačných zmlúv
* Plánovanie integrácie BTC pre širšiu kompatibilitu protokolu
* Finalizácia whitepaperu, ktorý popisuje dizajn systému a mechaniku tokenov

Akonáhle budú tieto míľniky dosiahnuté a Sigma 6.0 bude aktivovaná na mainnete, Lithos bude pripravený na spustenie.

---

## Zdroje

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
