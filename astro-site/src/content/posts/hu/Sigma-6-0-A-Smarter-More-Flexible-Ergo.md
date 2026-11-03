---
cmsId: 2751
title: "Sigma 6.0: Egy Okosabb, Rugalmasabb Ergo"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: hu
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T13:44:44.905"
author: Ergo Platform
tags: ["Core","Explainers","Tooling"]
spotlight: false
subtitle: null
image: {"url":"/uploads/sigma6_be7ed67853.png","alt":"sigma6.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_sigma6_be7ed67853.png","hash":"large_sigma6_be7ed67853","mime":"image/png","name":"large_sigma6.png","path":null,"size":673.43,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_sigma6_be7ed67853.png","hash":"small_sigma6_be7ed67853","mime":"image/png","name":"small_sigma6.png","path":null,"size":185.9,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_sigma6_be7ed67853.png","hash":"medium_sigma6_be7ed67853","mime":"image/png","name":"medium_sigma6.png","path":null,"size":394.85,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_sigma6_be7ed67853.png","hash":"thumbnail_sigma6_be7ed67853","mime":"image/png","name":"thumbnail_sigma6.png","path":null,"size":50.56,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

**Sigma 6.0** egy jelentős javasolt frissítés az Ergo blokklánc számára. Erősebb eszközöket ad a fejlesztők kezébe az okos szerződések készítéséhez, megoldja a régóta fennálló korlátokat, és felkészíti a hálózatot a jövőbeli fejlesztésekre—mindezt anélkül, hogy megszakítaná a meglévő szerződésekkel vagy csomópontokkal való kompatibilitást.

A frissítés egy soft-fork révén történik, ami azt jelenti, hogy a meglévő nem bányászati csomópontok tovább működhetnek, míg a frissített bányászati csomópontoknak aktiválniuk és érvényesíteniük kell az új funkciókat.

A bányászok szavazása már folyamatban van, a támogatás jelenleg meghaladja a 90%-ot, és egy devnet élő a korai teszteléshez. Ha ez így folytatódik, a Sigma 6.0 2025 szeptember végén aktiválódik.


---

## Miért van szükség a Sigma 6.0-ra?

Mióta az Ergo 2019-ben elindult, az okos szerződés nyelve (ErgoTree) stabil maradt. Ez a stabilitás segítette a hálózat biztonságát, de nehezebbé tette a fejlesztők számára új funkciók hozzáadását vagy logikájuk egyszerűsítését. Néhány fejlesztést már 2018-ban, a teszthálózati időszakban terveztek, de soha nem jutottak el a főhálózatra—mostanáig.

A Sigma 6.0 előrehozza ezeket a frissítéseket. Kiterjeszti, hogy mi lehetséges egy szerződésben, eltávolítja a technikai korlátokat, és utat nyit a jövőbeli irányítási és skálázási fejlesztések előtt.

---

## Mi változik?

* **Erősebb számok** egy új aláíratlan 256-bites egész szám típussal a kriptográfiai és pénzügyi műveletekhez
* **Jobb adatkezelés** a komplex típusok szerződésekben való sorosításának és desorozásának teljes támogatásával
* **Okosabb tranzakciók** amelyek hozzáférhetnek más bemenetek kontextusváltozóihoz a koordináltabb logika érdekében
* **Új matematikai és lista eszközök** beleértve a bitműveleteket, eltolást, és a fejlettebb gyűjtési módszereket, mint a `.get` és `.startsWith`
* **Beépített PoW érvényesítés** így a szerződések ellenőrizhetik a blokkfejléceket vagy egyedi üzeneteket az Autolykos2 ellen
* **Frissíthető irányítás** lehetővé téve a hálózat számára, hogy szavazzon új paraméterekre a jövőbeli soft-forkokon keresztül, kezdve a szub-blokkok támogatásával



---

## Aktiválási idővonal

A Sigma 6.0 egy soft-fork aktiválási folyamaton megy keresztül, amely két fázist igényel: egy szavazási időszakot és egy frissítési időszakot. Mindkettő körülbelül 45 napig tart, így a teljes bevezetés körülbelül 90 napot vesz igénybe.

A bányászok 2025 júliusának elején kezdték el a szavazást, és a támogatás már meghaladja a szükséges 90%-os küszöböt. Ha ez a támogatási szint megmarad, a frissítés 2025 szeptember végén aktiválódik.

Még ha a konszenzus korán is létrejön, a protokoll még mindig vár a teljes szavazási és frissítési időszakokra, mielőtt élesbe lépne.

Egy devnet már él a Sigma 6.0 számára, és a fejlesztők információt találhatnak arról, hogyan csatlakozhatnak a közösségi fejlesztői csevegésben. Júliusban megkezdődött a szub-blokk támogatású bányászati csomópontok tesztelése a teszthálózaton. Ezt követően a figyelem a dokumentáció finomítására és a biztonsággal kapcsolatos formális érvelés javítására összpontosít augusztus folyamán, biztosítva, hogy a frissítés kutatás-vezérelt maradjon. Miután ez befejeződik, a figyelem a potenciális főhálózati telepítés felé fordulhat.

---

## Fejlesztőknek

Az új funkciók az ErgoTree 3-as vagy annál magasabb verzióját igénylik. Néhány típus—mint az `Option`, `Header`, és `UnsignedBigInt`—nem tárolható közvetlenül regiszterekben vagy kontextus kiterjesztésekben, de byte adatokként tárolhatók és visszaállíthatók a szerződésen belül.

Példa használat található a [Sigma tesztcsomagban a GitHub-on](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Miért fontos

A Sigma 6.0 a legnagyobb frissítés az Ergo okos szerződés rétegében a hálózat elindulása óta. Több szabadságot ad a fejlesztőknek, teljesen új felhasználási eseteket nyit meg, és megerősíti a protokoll alapjait—miközben teljes mértékben visszafelé kompatibilis marad.

A bányászok támogatása most már 90% felett van, a frissítés a tervek szerint aktiválódik idén szeptemberben. A Sigma 6.0 erősebb pozícióba helyezi az Ergot a jövőre nézve.


## Források

- Teljes technikai javaslat: [EIP-0050: Sigma 6.0 a GitHub-on](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [6.0 Soft-Fork Javaslat (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Sigma 6.0 Dokumentáció Összefoglaló](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
