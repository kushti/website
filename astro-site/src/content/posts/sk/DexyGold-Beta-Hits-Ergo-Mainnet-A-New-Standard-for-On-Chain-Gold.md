---
cmsId: 2824
title: "DexyGold Beta na Ergo Mainnete: Nový Štandard pre On-Chain Zlato"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: sk
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T20:01:27.952"
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

### Kameňom úrazu pre Ergo DeFi

Verejná beta mainnetu DexyGold je spustená a už prenáša skutočnú hodnotu. Mince cielené na cenu jedného troy unca zlata v USD sa spoliehajú na dva základné kontrakty:

* **Bankový kontrakt** — razí DexyGold, keď používatelia vkladajú ERG za cenu z orákula.
* **AMM likviditný fond** — umožňuje obchodníkom objaviť trhovú cenu a uplatňuje ochranné opatrenia, ktoré chránia rezervy.

Oba kontrakty používajú nový [**Gold v2 orákulový feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), ktorý sa aktualizuje rýchlejšie a pridáva dodatočné ochrany proti manipulácii. S dobrým výkonom DexyGold sa komunita teraz pripravuje na aktualizáciu USD orákulového fondu na v2 a spustenie **GluonUSD** a **DexyUSD**. Formuje sa skupina na Telegrame pre ľudí, ktorí chcú prevádzkovať v2 orákula, a pomoc pri testovaní aktualizácie orákulového fondu na testnete je tiež veľmi potrebná.

---

### Prečo sa zamerať na zlato, nie doláre?

Zlato obchádza riziko jedného štátu a po stáročia predchádza dlhodobej inflácii. Stabilná minca viazaná na zlato dopĺňa DeFi stack Ergo, poskytujúc používateľom ochranu, ktorá dopĺňa USD sledovače ako SigmaUSD.

---

### Pod kapotou

| Časť motora       | Úloha v peg                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bankový kontrakt**  | Razí DexyGold za ERG za cenu z orákula. Ponuka rastie iba vtedy, keď používatelia pridávajú ERG.                                                                                 |
| **Likviditný fond** | Publikuje živú cenu DexyGold / ERG. Matematika fondu zrkadlí Uniswap V2 a blokuje výmenu LP-tokenov, ak cena z orákula klesne o viac ako 10 % pod cenu fondu. |
| **Arbitrážny cyklus** | *Orákulum > Fond* → používatelia razia DexyGold a predávajú ho do fondu. *Orákulum < Fond* → banka míňa nečinný ERG a kupuje DexyGold po 50-blokovom oneskorení.                  |
| **Bezpečnostné ventily**  | Časové zámky na čerstvom DexyGold, ERG zablokované v banke a automatické pozastavenie razenia, keď sa zisky zdajú byť nadmerné.                                                     |

---

### Ako vyskúšať DexyGold dnes

1. **Nainštalujte [Nautilus](https://nautiluswallet.io/)** a vyberte sieť mainnet.
2. **Pridajte skromný zostatok ERG** cez burzu, vyplatenie baníka alebo [Rosen bridge](https://app.rosenbridge.io/).
3. **Otvorenie [Crystal Pool](https://crystalpool.cc)**—jediné miesto na razenie DexyGold a jeho obchodovanie. Razte v Bank UI, poskytujte likviditu alebo zadávajte limitné objednávky.
4. **Začnite s malým:** Kontrakty sú aktívne a držia skutočnú hodnotu, zatiaľ čo audity a ladenie parametrov pokračujú. Objednávky sa vyrovnávajú na reťazci za sekundy.


#### Crystal Pool v centre pozornosti

Crystal Pool je nový Layer-1 DEX na blockchaine Ergo zameraný na priamu interakciu so smart kontraktmi s najlepšou dostupnou on-chain likviditou. Ponúka:

* Priame zhodovanie objednávok na reťazci bez off-chain objednávkových kníh
* Obchody s viacerými tokenmi a viacerými predajcami v jednej transakcii
* Reálne časové reťazenie transakcií, umožňujúce bezproblémové obchodovanie pre stovky používateľov paralelne
* Integrované grafy a história obchodovania, zobrazujúce vaše obchody priamo na cenových grafoch

Prichádza neskôr v roku 2025: Likviditné fondy limitných objednávok, umožňujúce hlbšie stratégie tvorby trhu.

Crystal Pool sa snaží stať sa základnou likviditnou vrstvou pre Ergo DeFi—jednoduchou, rýchlou a transparentnou.


---

### Roadmap DexyGold

* **Druhá auditná kontrola** na stres-testovanie arbitrážneho cyklu a zlepšenie ladenia parametrov.
* **Cieľová miera kolaterálu** nad 150 percent, keď sa poplatky za razenie hromadia v banke.
* **USD orákulový fond v2** spustenie s komunitnými operátormi a testovanie na testnete.
* **GluonUSD a DexyUSD** spustenie po aktualizácii orákulového feedu USD, rozširujúce portfólio stabilných mincí.

---

### Rýchlo rastúca adopcia Gold v2 orákula

DexyGold je druhý projekt, ktorý prijal Gold v2 feed. Prvý, **gluon.gold**, nedávno predstavil [obnovené beta front-end](https://gluon.gold/reactor), ktorý sleduje poplatky, pomer rezerv, TVL, objem a čakajúce transakcie s väčšou jasnosťou—svedectvo o tom, ako rýchlo sa nové orákulum stáva základom produktov Ergo založených na zlate.

---

### Pridajte sa k diskusii

Prečítajte si návrh bielej knihy Dexy, zdieľajte spätnú väzbu na **r/ergonauts** a pridajte sa k komunite na [Telegrame](http://t.me/dexygold) alebo [Discorne](https://discord.gg/xjfnk9A2cU). Vaše testovanie v reálnom svete a správy o chybách pomôžu formovať konečné parametre odolnej rodiny stabilných mincí viazaných na zlato a dolár na Ergu.
