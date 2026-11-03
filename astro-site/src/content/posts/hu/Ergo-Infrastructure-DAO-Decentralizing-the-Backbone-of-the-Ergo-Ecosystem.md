---
cmsId: 2748
title: "Ergo Infrastructure DAO: Az Ergo Ökoszisztéma Gerincének Decentralizálása"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: hu
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T13:43:40.342"
author: Ergo Platform
tags: ["DAOs"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dao_4bb9b2ff23.png","alt":"dao.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dao_4bb9b2ff23.png","hash":"large_dao_4bb9b2ff23","mime":"image/png","name":"large_dao.png","path":null,"size":685.89,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dao_4bb9b2ff23.png","hash":"small_dao_4bb9b2ff23","mime":"image/png","name":"small_dao.png","path":null,"size":194.19,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dao_4bb9b2ff23.png","hash":"medium_dao_4bb9b2ff23","mime":"image/png","name":"medium_dao.png","path":null,"size":405.28,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dao_4bb9b2ff23.png","hash":"thumbnail_dao_4bb9b2ff23","mime":"image/png","name":"thumbnail_dao.png","path":null,"size":55.51,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Az Ergo küldetése mindig is a decentralizáción alapult, nemcsak a konszenzus rétegén, hanem az egész stack-en. Az **Ergo Infrastructure DAO (InfraDAO)** elindításával ez a vízió kiterjed a szolgáltatásokra és az infrastruktúrára, amelyek nap mint nap működtetik az ökoszisztémát.

Az InfraDAO most hivatalosan is él a [Paideia](https://app.paideia.im/ergoinfradao) platformon, a sikeres kormányzati szavazást követően. Ami a **Sigmanauts contributor group** keretein belül egy grassroots javaslatként indult—melyet mindenki kedvenc Sigmanautja, **qx**, irányított, aki az Ergo AMA-kon és az ökoszisztéma minden más területén is ismert—most egy közösség által birtokolt kezdeményezéssé fejlődött, amely átalakítja a kulcsszolgáltatások nyújtását és fenntartását.

---

## Mi az Ergo Infrastructure DAO?

Az InfraDAO egy decentralizált, peer-üzemeltetett infrastruktúra szolgáltatók hálózata, amely a kulcsszolgáltatások fenntartásáért felelős az Ergo ökoszisztémában. Ez magában foglalja:

* Teljes csomópontok és API-k
* Blockchain felfedezők
* Tesztelési és bányászati infrastruktúra
* Közösségi dokumentáció és tüköroldalak
* Olyan eszközök, mint a SigmaSpace, ErgoDocs és Sigmaverse
* Az ergoplatform.org jövőbeli hosztolása és kezelése

Ez a DAO csökkenti az Ergo Alapítványra való támaszkodást, és biztosítja, hogy az infrastruktúra cenzúra-ellenálló, hibátűrő és átláthatóan irányított legyen.

---

## Miért fontos ez?

Eddig az Ergo infrastruktúrájának nagy része, beleértve a nyilvános végpontokat, blokk felfedezőket és hosztolt dokumentációt, az **Ergo Alapítvány** és később a **Developer DAO** által volt fenntartva. Míg ez a modell korai stabilitást és megbízhatóságot biztosított, központi függőségi pontokat is létrehozott.

Az InfraDAO ezt megváltoztatja azáltal, hogy a felelősségeket egy globális, önállóan kezelt hozzájárulói hálózatra osztja el, akik üzemeltetik és fenntartják a stack-et. Biztosítja:

* Ellenállóbb és földrajzilag elosztott szolgáltatásokat
* Hosszú távú fenntarthatóságot Alapítványi függőség nélkül
* Közösségi ellenőrzést a kormányzás és a telepítés felett
* Egy igazán decentralizált működési modellt, amely megfelel az Ergo alapelveinek

---

## Mi az, ami már él és migrált?

Az InfraDAO már előrelépett. Három nagy teljesítményű gép, amelyeket több végpont között terheléselosztással üzemeltetnek, most él és szinkronizálva van a gyorsabb **RocksDB** tárolási háttérrel:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (HTTPS-kompatibilis pénztárcákhoz)

Ezek a végpontok **teljesen kompatibilisek a mobil és böngésző alapú pénztárcákkal**, és alapot szolgáltatnak a decentralizált hozzáféréshez az Ergo hálózathoz.

Nyomon követheti az üzemidőt és a peer elérhetőséget a nyilvános irányítópulton:
[Ergo Infrastructure DAO – Valós idejű állapot irányítópult](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Terheléselosztás és Közösségi Üzemeltetők

Míg a „P2P” itt lazán egy elosztott hálózatra utal, az infrastruktúra valóban közösségi üzemeltetésű. A kezdeti terheléselosztás magában foglalja az alábbi gépeket:

* qx (három csomópont)
* Jumei
* 2ndTL Mining
* Sheetoshi

Ezek stratégiailag vannak telepítve a globális geolokáció alapú terheléselosztás támogatására. További közösségi gépek kerülnek hozzáadásra, ahogy a DAO bővül, teljesen decentralizált és globálisan ellenálló gerincet alkotva.

Az új résztvevők kiválasztási folyamata a következőket fogja tartalmazni:

1. Egy **statikus IP cím**
2. **Megfelelő feltöltési sávszélesség**
3. Egy **alapvető infrastruktúra ismeret** (vagy a parancssori beállítási utasítások követésének képessége)
4. Egy **levelezési cím** egy előkonfigurált csomópont vagy felfedező szállításához (ingyenesen biztosítva)

---

## Az ötlettől a végrehajtásig: Közösség által építve

Az InfraDAO a Sigmanauts között belső kezdeményezésként indult. Felismerve az infrastruktúra decentralizálásának szükségességét, **qx** javasolta egy DAO létrehozását és irányította annak telepítését.

2025 júliusában egy javaslat, amely **50,000 \$PAIDEIA** támogatást kért, sikeresen átment a Paideia-n. Ezek az alapok a startup költségeit fedezik, mint például a gépek előkészítése, szállítás és a hozzájárulók beillesztése. A DAO tokenje most él, és a kormányzás aktív.

---

## Technikai követelmények

**Hardver és hálózati követelmények:**
* Feltöltési sávszélesség: 50 Mbps vagy annál több
* Késleltetés: \~100ms vagy alacsonyabb a helyi régióhoz képest
* IPv4: Statikus vagy hosszú távú dinamikus IP
* Gépes specifikációk:
  * Ubuntu OS
  * 16GB RAM (32GB ajánlott)
  * 1TB SSD
  * Docker, tmux, SSH hozzáférés és konfigurációs szerkesztési készségek

Ezek a rendszerek a magas rendelkezésre állásra optimalizáltak, és jelenleg termelési forgalmat szolgálnak ki terheléselosztott végpontokon keresztül.

---

## Nemcsak hosztolás: Jövőbeli bővítés

Míg az InfraDAO első fázisa a hosztolásra összpontosít, bővülni fog, hogy támogassa:

* Infrastruktúra karbantartás és monitoring
* Függőségi és biztonsági frissítések
* Docker orchestration és szoftver telepítés
* CMS kezelés az ergoplatform.org számára
* Kiadási és dokumentációs frissítések
* Hosztolási szolgáltatások, mint a SigmaSpace, ErgoDocs és Sigmaverse

Ez lehetővé teszi a részvételt rendszergazdák, backend fejlesztők, tartalom karbantartók és más hozzájárulók számára, akik nem csomópont üzemeltetők.

---

## Jelenlegi állapot

* DAO él a Paideia-n
* Kezdeti finanszírozási javaslat átment
* Token kibocsátva és szavazás él
* Az infrastruktúra első hulláma él és működőképes
* Nyilvános monitoring irányítópult online
* Következő: további hozzájárulók és globális bővítés

---

## Hogyan lehet részt venni

Ha technikailag képes vagy, és szeretnél infrastruktúrát üzemeltetni, üzemidőt fenntartani, weboldalakat frissíteni, vagy részt venni a DAO kormányzásában, most van itt az ideje, hogy belépj.

→ Csatlakozz a DAO-hoz vagy kövesd a javaslatokat itt:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Kövesd nyomon az infrastruktúra állapotát:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Záró gondolatok

Az Ergo Infrastructure DAO elindítása jelentős lépés a teljes stack decentralizáció, autonómia, közösségi ellenőrzés és a küldetés-vezérelt blockchain ökoszisztéma fenntarthatósága felé.

A kormányzás láncon belül, az infrastruktúra a közösség által birtokolt, és a globális hozzájárulók már kritikus szolgáltatásokat üzemeltetnek, az Ergo megmutatja, milyen is az igazi decentralizáció.

Segíts építeni az alapokat. Csatlakozz.
