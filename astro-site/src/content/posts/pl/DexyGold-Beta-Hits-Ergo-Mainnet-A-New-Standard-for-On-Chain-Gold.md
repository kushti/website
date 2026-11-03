---
cmsId: 2828
title: "DexyGold Beta na Ergo Mainnet: Nowy Standard dla Złota On-Chain"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: pl
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T22:27:49.302"
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

### Kamień Milowy dla Ergo DeFi

Publiczna beta mainnet DexyGold jest już aktywna i przynosi realną wartość. Moneta celuje w cenę USD jednej uncji trojańskiej złota, opierając się na dwóch podstawowych kontraktach:

* **Kontrakt Bankowy** — emituje DexyGold, gdy użytkownicy wpłacają ERG po cenie z orakla.
* **Pula Płynności AMM** — pozwala traderom odkrywać rynkową stawkę i wprowadza zabezpieczenia chroniące rezerwy.

Oba kontrakty korzystają z nowego [**feedu orakla Gold v2**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), który aktualizuje się szybciej i dodaje dodatkowe zabezpieczenia przed manipulacją. Przy dobrych wynikach DexyGold, społeczność przygotowuje się teraz do aktualizacji puli orakli USD do v2 i uruchomienia **GluonUSD** oraz **DexyUSD**. Tworzy się grupa na Telegramie dla osób, które chcą uruchomić orakle v2, a pomoc w testowaniu aktualizacji puli orakli na testnecie jest również bardzo potrzebna.

---

### Dlaczego celować w złoto, a nie dolary?

Złoto omija ryzyko związane z pojedynczym rządem i od wieków przewyższa długoterminową inflację. Stabilna moneta powiązana ze złotem dopełnia stos DeFi Ergo, dając użytkownikom zabezpieczenie, które uzupełnia śledzenie USD, takie jak SigmaUSD.

---

### Pod Maską

| Część Silnika      | Rola w Powiązaniu                                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kontrakt Bankowy**  | Emisja DexyGold za ERG po cenie z orakla. Podaż rośnie tylko wtedy, gdy użytkownicy dodają ERG.                                                                 |
| **Pula Płynności** | Publikuje na żywo cenę DexyGold / ERG. Matematyka puli odzwierciedla Uniswap V2 i blokuje wymianę tokenów LP, jeśli cena z orakla spadnie o więcej niż 10 % poniżej ceny puli. |
| **Pętla Arbitrażowa** | *Orakel > Pula* → użytkownicy emitują DexyGold i sprzedają do puli. *Orakel < Pula* → bank wydaje nieużywany ERG i kupuje DexyGold po 50-blokowym opóźnieniu.                  |
| **Zawory Bezpieczeństwa**  | Zamykanie czasowe na świeżym DexyGold, blokady ERG w banku oraz automatyczne wstrzymanie emisji, gdy zyski wydają się nadmierne.                                                     |

---

### Jak Wypróbować DexyGold Dziś

1. **Zainstaluj [Nautilus](https://nautiluswallet.io/)** i wybierz sieć mainnet.
2. **Dodaj skromny bilans ERG** poprzez wymianę, wypłatę górniczą lub [most Rosen](https://app.rosenbridge.io/).
3. **Otwórz [Crystal Pool](https://crystalpool.cc)**—jedyną miejsce, aby emitować DexyGold i handlować nim. Emituj w interfejsie Banku, zapewnij płynność lub składaj zlecenia limitowane.
4. **Zacznij od małych kroków:** Kontrakty są aktywne i mają realną wartość, podczas gdy audyty i dostosowywanie parametrów trwają. Zlecenia rozliczają się na łańcuchu w ciągu kilku sekund.


#### Crystal Pool w Centrum Uwagi

Crystal Pool to nowy DEX warstwy 1 na blockchainie Ergo, skoncentrowany na bezpośredniej interakcji z inteligentnymi kontraktami z najlepszą dostępną płynnością on-chain. Oferuje:

* Bezpośrednie dopasowywanie zleceń on-chain bez off-chain książek zleceń
* Transakcje wielo-tokenowe, wielo-sprzedawców w jednej transakcji
* Łańcuch transakcji w czasie rzeczywistym, umożliwiający płynne handlowanie dla setek użytkowników równocześnie
* Zintegrowane wykresy i historia transakcji, pokazujące twoje transakcje bezpośrednio na wykresach cenowych

Nadchodzące w 2025 roku: Pula Płynności Zleceń Limitowych, umożliwiająca głębsze strategie tworzenia rynku.

Crystal Pool ma na celu stać się podstawową warstwą płynności dla Ergo DeFi—prosto, szybko i przejrzyście.


---

### Mapa Drogowa DexyGold

* **Druga Tura Audytu** w celu przetestowania pętli arbitrażowej i poprawy dostosowywania parametrów.
* **Cel Współczynnika Zabezpieczenia** powyżej 150 procent, gdy opłaty za emisję budują rezerwy w banku.
* **Wdrożenie Puli Orakli USD v2** z operatorami społeczności i testowaniem na testnecie.
* **Uruchomienia GluonUSD i DexyUSD** po aktualizacji feedu orakla USD, rozszerzając zestaw stabilnych monet.

---

### Wzrost Przyjęcia Orakla Gold v2

DexyGold jest drugim projektem, który przyjął feed Gold v2. Pierwszym, **gluon.gold**, niedawno ujawnił [odświeżony interfejs beta](https://gluon.gold/reactor), który śledzi opłaty, współczynnik rezerwy, TVL, wolumen i oczekujące transakcje z większą przejrzystością—świadectwo tego, jak szybko nowe orakle stają się kręgosłupem produktów opartych na złocie Ergo.

---

### Dołącz do Rozmowy

Przeczytaj szkic białej księgi Dexy, podziel się opinią na **r/ergonauts**, i dołącz do społeczności na [Telegramie](http://t.me/dexygold) lub [Discordzie](https://discord.gg/xjfnk9A2cU). Twoje testy w rzeczywistym świecie i raporty o błędach pomogą ukształtować ostateczne parametry odpornej rodziny stabilnych monet opartych na złocie i dolarze na Ergo.
