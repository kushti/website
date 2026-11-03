---
cmsId: 2815
title: "Sigma 6.0: Inteligentnejší, flexibilnejší Ergo"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: sk
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T20:00:52.63"
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

**Sigma 6.0** je významná navrhovaná aktualizácia blockchainu Ergo. Poskytuje vývojárom mocnejšie nástroje na vytváranie smart kontraktov, odstraňuje dlhodobé obmedzenia a pripravuje sieť na budúce vylepšenia—všetko bez narušenia kompatibility s existujúcimi kontraktmi alebo uzlami.

Aktualizácia prebieha prostredníctvom soft-forku, čo znamená, že existujúce uzly, ktoré neťažia, môžu pokračovať v prevádzke, zatiaľ čo aktualizované ťažobné uzly sú povinné aktivovať a vynucovať nové funkcie.

Hlasovanie ťažiarov už prebieha, pričom podpora je aktuálne nad 90 %, a devnet je aktívny pre skoré testovanie. Ak to takto pôjde ďalej, Sigma 6.0 sa aktivuje koncom septembra 2025.


---

## Prečo je Sigma 6.0 potrebná?

Od spustenia Ergo v roku 2019 zostal jeho jazyk smart kontraktov (ErgoTree) stabilný. Táto stabilita pomohla sieti zostať bezpečnou, ale tiež sťažovala vývojárom pridávať nové funkcie alebo zjednodušovať svoju logiku. Niektoré vylepšenia boli plánované už v testnetových dňoch v roku 2018, ale nikdy sa nedostali na mainnet—až doteraz.

Sigma 6.0 posúva tieto vylepšenia dopredu. Rozširuje, čo je možné v kontrakte, odstraňuje technické obmedzenia a otvára cestu pre budúce zlepšenia správy a škálovania.

---

## Čo sa mení?

* **Mocnejšie čísla** s novým nepodpísaným 256-bitovým celým číslom pre kryptografické a finančné operácie
* **Lepšie spracovanie dát** prostredníctvom plnej podpory pre serializáciu a deserializáciu komplexných typov v kontraktoch
* **Inteligentnejšie transakcie**, ktoré môžu pristupovať k kontextovým premenným z iných vstupov pre koordinovanejšiu logiku
* **Nové matematické a zoznamové nástroje** vrátane bitových operácií, posúvania a vylepšených metód zbierania ako `.get` a `.startsWith`
* **Vstavaná PoW validácia**, takže kontrakty môžu kontrolovať hlavičky blokov alebo vlastné správy voči Autolykos2
* **Upgradovateľná správa** umožňujúca sieti hlasovať o nových parametroch prostredníctvom budúcich soft-forkov, počnúc podporou sub-blokov



---

## Časová os aktivácie

Sigma 6.0 prechádza procesom aktivácie soft-forku, ktorý vyžaduje dve fázy: hlasovacie obdobie a aktualizačné obdobie. Každé trvá približne 45 dní, čo robí celkovú realizáciu približne 90 dní.

Ťažiari začali hlasovať začiatkom júla 2025 a podpora už presahuje požadovaný prah 90 %. Ak táto úroveň podpory vydrží, aktualizácia sa aktivuje koncom septembra 2025.

Aj keď sa konsenzus dosiahne skôr, protokol stále čaká na plné hlasovacie a aktualizačné obdobia predtým, než sa spustí.

Devnet je už aktívny pre Sigma 6.0 a vývojári môžu nájsť informácie o tom, ako sa pripojiť v komunitnom dev chate. V júli sa začalo testovanie ťažobných uzlov podporujúcich sub-bloky na testnete. Po tom sa zameranie presunie na zdokonaľovanie dokumentácie a zlepšovanie formálneho uvažovania o bezpečnosti počas augusta, čím sa zabezpečí, že aktualizácia zostane orientovaná na výskum. Po dokončení sa pozornosť môže presunúť na potenciálne nasadenie na mainnet.

---

## Pre vývojárov

Nové funkcie vyžadujú ErgoTree verziu 3 alebo vyššiu. Niektoré typy—ako `Option`, `Header` a `UnsignedBigInt`—nemôžu byť uložené priamo v registroch alebo kontextových rozšíreniach, ale môžu byť uložené ako bajtové dáta a obnovené v rámci kontraktu.

Príklad použitia nájdete v [Sigma test suite na GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Prečo je to dôležité

Sigma 6.0 je najväčšia aktualizácia vrstvy smart kontraktov Ergo od spustenia siete. Poskytuje vývojárom väčšiu slobodu, odomyká úplne nové prípady použitia a posilňuje základy protokolu—pričom zostáva plne spätne kompatibilná.

S podporou ťažiarov teraz nad 90 % je aktualizácia na dobrej ceste k aktivácii tento september. Sigma 6.0 posúva Ergo do silnejšej pozície pre budúcnosť.


## Zdroje

- Plný technický návrh: [EIP-0050: Sigma 6.0 na GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [6.0 Soft-Fork Návrh (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Zhrnutie dokumentácie Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
