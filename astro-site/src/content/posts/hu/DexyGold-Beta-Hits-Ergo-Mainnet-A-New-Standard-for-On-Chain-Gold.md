---
cmsId: 2749
title: "DexyGold Beta elérte az Ergo Mainnetet: Új standard az on-chain arany számára"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: hu
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T13:44:17.009"
author: Ergo Platform
tags: ["Ecosystem"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dexy_1880f3be68.png","alt":"dexy.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dexy_1880f3be68.png","hash":"large_dexy_1880f3be68","mime":"image/png","name":"large_dexy.png","path":null,"size":733.13,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dexy_1880f3be68.png","hash":"small_dexy_1880f3be68","mime":"image/png","name":"small_dexy.png","path":null,"size":194.26,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dexy_1880f3be68.png","hash":"medium_dexy_1880f3be68","mime":"image/png","name":"medium_dexy.png","path":null,"size":421.49,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dexy_1880f3be68.png","hash":"thumbnail_dexy_1880f3be68","mime":"image/png","name":"thumbnail_dexy.png","path":null,"size":53.43,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

### Mérföldkő az Ergo DeFi számára

A DexyGold nyilvános mainnet bétája él és már valós értéket mozgat. A coin célja az egy troy uncia arany USD ára, két alapvető szerződésre támaszkodva:

* **Bank Szerződés** — DexyGold-ot bocsát ki, amikor a felhasználók ERG-t helyeznek el az oracle áron.
* **AMM Likviditási Medence** — lehetővé teszi a kereskedők számára, hogy felfedezzék a piaci árat, és védőkereteket érvényesít, amelyek megvédik a tartalékokat.

Mindkét szerződés az új [**Gold v2 oracle feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg) rendszert használja, amely gyorsabban frissít és extra védelmet nyújt a manipuláció ellen. Mivel a DexyGold jól teljesít, a közösség most készül az USD oracle medence v2-re való frissítésére és a **GluonUSD** és **DexyUSD** elindítására. Telegram csoport alakul azok számára, akik v2 orákulumokat szeretnének futtatni, és a teszthálózaton az orákulum medence frissítésének tesztelésében is nagy szükség van.

---

### Miért az aranyra, nem a dollárra célozzunk?

Az arany kikerüli az egykormányzati kockázatot, és évszázadok óta megelőzi a hosszú távú inflációt. Az aranyhoz kötött stabilcoin kiegészíti az Ergo DeFi stack-jét, lehetővé téve a felhasználók számára, hogy fedezetet biztosítsanak, amely kiegészíti az olyan USD nyomkövetőket, mint a SigmaUSD.

---

### A motorháztető alatt

| Motoralkatrész      | Szerep a pegben                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bank Szerződés**  | DexyGold-ot bocsát ki ERG-ért az oracle áron. A kínálat csak akkor nő, ha a felhasználók ERG-t adnak hozzá.                                                                                 |
| **Likviditási Medence** | Élő DexyGold / ERG árat publikál. A medence matematikája tükrözi az Uniswap V2-t, és blokkolja az LP-token beváltást, ha az oracle ár több mint 10%-kal csökken a medence ár alatt. |
| **Arbitrázs Hurok** | *Oracle > Medence* → a felhasználók DexyGold-ot bocsátanak ki és eladják a medencének. *Oracle < Medence* → a bank felhasználja a tétlen ERG-t és DexyGold-ot vásárol 50 blokk késleltetéssel.                  |
| **Biztonsági Szelepek**  | Időzárak az új DexyGold-ra, ERG zárolva a bankban, és automatikus kibocsátás-szünet, amikor a nyereség túlzottan magasnak tűnik.                                                     |

---

### Hogyan próbálhatja ki a DexyGold-ot ma

1. **Telepítse a [Nautilus](https://nautiluswallet.io/)**-t, és válassza a mainnet hálózatot.
2. **Adjon hozzá egy szerény ERG egyenleget** tőzsdén, bányász kifizetésen vagy a [Rosen hídon](https://app.rosenbridge.io/).
3. **Nyissa meg a [Crystal Pool](https://crystalpool.cc)**-t—az egyetlen hely, ahol DexyGold-ot bocsáthat ki és kereskedhet vele. Bocsásson ki a Bank UI-n, biztosítson likviditást, vagy helyezzen el limit megbízásokat.
4. **Kezdje kicsiben:** A szerződések élnek és valós értéket képviselnek, miközben az auditok és a paraméterek finomhangolása folytatódik. A megbízások másodpercek alatt rendeződnek on-chain.


#### Crystal Pool a középpontban

A Crystal Pool egy új Layer-1 DEX az Ergo blokkláncon, amely közvetlen okos szerződés interakcióra összpontosít a legjobb elérhető on-chain likviditással. A következőket kínálja:

* Közvetlen megbízás-illesztés on-chain, off-chain megbízáskönyvek nélkül
* Több token, több eladó kereskedések egyetlen tranzakcióban
* Valós idejű tranzakcióláncolás, lehetővé téve a zökkenőmentes kereskedést több száz felhasználó számára párhuzamosan
* Integrált grafikonok és kereskedési előzmények, amelyek közvetlenül mutatják az ügyleteit az árdiagramokon

2025 végén érkezik: Limit megbízás likviditási medencék, amelyek mélyebb piaci készítési stratégiákat tesznek lehetővé.

A Crystal Pool célja, hogy az Ergo DeFi alapvető likviditási rétegévé váljon—egyszerű, gyors és átlátható.


---

### DexyGold Útiterv

* **Második audit átvizsgálás** az arbitrázs hurok stressztesztelésére és a paraméterek finomhangolásának javítására.
* **Kollaterális arány cél** 150% felett, ahogy a kibocsátási díjak tartalékokat építenek a bankban.
* **USD Oracle Pool v2** bevezetése közösségi üzemeltetőkkel és tesztelés a teszthálózaton.
* **GluonUSD és DexyUSD** elindítása az USD orákulum feed frissítése után, bővítve a stabilcoin portfóliót.

---

### A Gold v2 Oracle elfogadása növekszik

A DexyGold a második projekt, amely elfogadja a Gold v2 feedet. Az első, **gluon.gold**, nemrégiben bemutatta a [frissített bétát](https://gluon.gold/reactor), amely világosabban követi a díjakat, a tartalék arányt, a TVL-t, a forgalmat és a függő tranzakciókat—bizonyíték arra, hogy az új orákulum milyen gyorsan válik az Ergo aranyalapú termékeinek gerincévé.

---

### Csatlakozzon a beszélgetéshez

Olvassa el a Dexy fehér könyv tervezetét, ossza meg véleményét a **r/ergonauts**-on, és csatlakozzon a közösséghez a [Telegram](http://t.me/dexygold) vagy a [Discord](https://discord.gg/xjfnk9A2cU) platformon. Az Ön valós tesztelése és hibajelentései segítenek formálni a végső paramétereket egy ellenálló arany- és dolláralapú stabilcoin család számára az Ergon.
