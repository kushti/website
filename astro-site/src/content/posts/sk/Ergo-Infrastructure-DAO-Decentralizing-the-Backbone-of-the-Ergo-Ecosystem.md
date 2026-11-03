---
cmsId: 2817
title: "Ergo Infrastructure DAO: Decentralizácia chrbtice ekosystému Ergo"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: sk
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T20:01:03.793"
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

Misia Ergo bola vždy zakorenená v decentralizácii, nielen na konsenzuálnej vrstve, ale naprieč celým stackom. Spustením **Ergo Infrastructure DAO (InfraDAO)** sa táto vízia rozširuje na služby a infraštruktúru, ktoré každý deň poháňajú ekosystém.

InfraDAO je teraz oficiálne spustené na [Paideia](https://app.paideia.im/ergoinfradao), po úspešnom hlasovaní o správe. To, čo sa začalo ako grassroots návrh z vnútra **Sigmanauts contributor group**—v čele s obľúbeným Sigmanautom, **qx**, známym svojimi vystúpeniami na Ergo AMAs a všade inde v ekosystéme—sa teraz vyvinulo na iniciatívu vlastnenú komunitou, ktorá preformuje spôsob, akým sú dodávané a udržiavané základné služby.

---

## Čo je Ergo Infrastructure DAO?

InfraDAO je decentralizovaná, peer-prevádzkovaná sieť poskytovateľov infraštruktúry zodpovedná za udržiavanie kľúčových služieb v ekosystéme Ergo. To zahŕňa:

* Plné uzly a API
* Blockchainové prehliadače
* Testnet a ťažobnú infraštruktúru
* Dokumentáciu komunity a zrkadlá
* Nástroje ako SigmaSpace, ErgoDocs a Sigmaverse
* Budúce hostovanie a správa ergoplatform.org

Tento DAO zníži závislosť od Ergo Foundation a zabezpečí, že infraštruktúra bude odolná voči cenzúre, tolerantná voči chybám a transparentne spravovaná.

---

## Prečo je to dôležité

Doteraz bola väčšina infraštruktúry Ergo, vrátane verejných koncových bodov, blokových prehliadačov a hostenej dokumentácie, udržiavaná **Ergo Foundation** a neskôr **Developer DAO**. Hoci tento model poskytoval počiatočnú stabilitu a spoľahlivosť, vytvoril aj centrálné body závislosti.

InfraDAO to mení rozdelením zodpovedností naprieč globálnou, samosprávnou sieťou prispievateľov, ktorí prevádzkujú a udržiavajú stack. Zabezpečuje:

* Odolnejšie a geograficky rozdelené služby
* Dlhodobú udržateľnosť bez závislosti na Foundation
* Kontrolu komunity nad správou a nasadením
* Skutočne decentralizovaný operačný model, ktorý zodpovedá základným princípom Ergo

---

## Čo je už spustené a migrované

InfraDAO už dosiahlo pokrok. Tri vysokovýkonné stroje, vyvážené medzi viacerými koncovými bodmi, sú teraz spustené a synchronizované pomocou rýchlejšieho **RocksDB** úložného backendu:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (kompatibilné s HTTPS pre peňaženky)

Tieto koncové body sú **plne kompatibilné s mobilnými a prehliadačovými peňaženkami** a slúžia ako základ pre decentralizovaný prístup k sieti Ergo.

Môžete sledovať dostupnosť a dostupnosť peerov prostredníctvom verejného panela:
[Ergo Infrastructure DAO – Dashboard stavu v reálnom čase](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, vyvažovanie záťaže a operátori komunity

Hoci „P2P“ sa tu voľne vzťahuje na distribuovanú sieť, infraštruktúra je skutočne prevádzkovaná komunitou. Počiatočné vyvažovanie záťaže bude zahŕňať stroje prevádzkované:

* qx (tri uzly)
* Jumei
* 2ndTL Mining
* Sheetoshi

Tieto sú strategicky nasadené na podporu globálneho vyvažovania záťaže na základe geolokácie. Viac komunitných strojov bude pridaných, keď sa DAO rozšíri, čím sa vytvorí plne decentralizovaná a globálne odolná chrbtica.

Výberový proces pre nových účastníkov bude zahŕňať:

1. **statická IP adresa**
2. **dostatočná šírka pásma pre upload**
3. **základné porozumenie infraštruktúre** (alebo schopnosť sledovať pokyny na nastavenie príkazového riadku)
4. **poštová adresa** na zaslanie predkonfigurovaného uzla alebo prehliadača (poskytnuté bez poplatku)

---

## Od nápadu k realizácii: Vytvorené komunitou

InfraDAO sa začalo ako interná iniciatíva medzi Sigmanauts. Uvedomujúc si potrebu decentralizovať infraštruktúru, **qx** navrhol vytvorenie DAO a viedol jeho nasadenie.

V júli 2025 prešiel návrh na **50,000 \$PAIDEIA** úspešne na Paideia. Tieto prostriedky pokrývajú náklady na začiatok, ako je príprava strojov, doprava a onboardovanie prispievateľov. Token DAO je teraz spustený a správa je aktívna.

---

## Technické požiadavky

**Požiadavky na hardvér a sieť:**
* Šírka pásma pre upload: 50 Mbps alebo viac
* Latencia: \~100ms alebo menej do vašej miestnej oblasti
* IPv4: Statická alebo dlhodobá dynamická IP
* Špecifikácie stroja:
  * Ubuntu OS
  * 16GB RAM (odporúča sa 32GB)
  * 1TB SSD
  * Docker, tmux, SSH prístup a zručnosti na úpravu konfigurácie

Tieto systémy sú optimalizované pre vysokú dostupnosť a aktuálne slúžia produkčnému prevádzkovému toku prostredníctvom vyvážených koncových bodov.

---

## Nie len hostovanie: Budúce rozšírenie

Hoci prvá fáza InfraDAO sa sústreďuje na hostovanie, rozšíri sa na podporu:

* Údržba a monitorovanie infraštruktúry
* Aktualizácie závislostí a zabezpečenia
* Orchestrácia Dockeru a nasadenie softvéru
* Správa CMS pre ergoplatform.org
* Publikovanie a aktualizácie dokumentácie
* Hostiteľské služby ako SigmaSpace, ErgoDocs a Sigmaverse

Toto otvára účasť pre sysadminov, backend vývojárov, správcov obsahu a ďalších prispievateľov nad rámec operátorov uzlov.

---

## Aktuálny stav

* DAO žije na Paideia
* Počiatočný návrh na financovanie prešiel
* Token vyrazený a hlasovanie aktívne
* Prvá vlna infraštruktúry je spustená a funkčná
* Verejný monitorovací panel online
* Ďalšie: ďalší prispievatelia a globálne rozšírenie

---

## Ako sa zapojiť

Ak ste technicky zdatní a chcete prevádzkovať infraštruktúru, udržiavať dostupnosť, aktualizovať stránky alebo sa zúčastniť správy DAO, teraz je čas zapojiť sa.

→ Pridajte sa k DAO alebo sledujte návrhy tu:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Monitorujte stav infraštruktúry:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Záverečné myšlienky

Spustenie Ergo Infrastructure DAO je veľký krok smerom k plnej decentralizácii stacku, autonómii, kontrole komunity a udržateľnosti blockchainového ekosystému orientovaného na misiu.

S riadením na reťazci, infraštruktúrou vlastnenou komunitou a globálnymi prispievateľmi, ktorí už prevádzkujú kritické služby, Ergo ukazuje, ako vyzerá skutočná decentralizácia.

Pomôžte budovať základ. Zapojte sa.
