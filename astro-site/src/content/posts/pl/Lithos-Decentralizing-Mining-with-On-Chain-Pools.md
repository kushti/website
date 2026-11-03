---
cmsId: 2829
title: "Lithos: Decentralizacja wydobycia z użyciem pul on-chain"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: pl
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T22:27:51.288"
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

Lithos to nowy protokół zaprojektowany w celu przekształcenia sposobu działania pul wydobywczych poprzez przeniesienie ich na łańcuch, dając górnikom pełną kontrolę i eliminując potrzebę centralnych operatorów pul. W przeciwieństwie do większości wcześniejszych prób decentralizacji wydobycia, Lithos został zbudowany, aby być wydajnym, skalowalnym i bezpiecznym.

---

## Czym jest Lithos?

Lithos to protokół zdecentralizowanej puli wydobywczej, który łączy górników bezpośrednio z inteligentnymi kontraktami na Ergo. Te kontrakty zajmują się wszystkim — przesyłaniem pracy, zarządzaniem trudnością i płatnościami — bez polegania na centralnych serwerach lub kustoszach.

Protokół używa **Stratum** do łączenia sprzętu wydobywczego z klientem Lithos, ale cała kluczowa logika działa na łańcuchu. Górnicy przesyłają pracę do inteligentnych kontraktów i otrzymują płatności bezpośrednio na podstawie nowego formatu dowodu kryptograficznego.

Został zaprojektowany jako **niezależny od blockchaina**, co oznacza, że w przyszłości może wspierać pule wydobywcze dla dowolnego łańcucha proof-of-work. Obliczenia pracy i przechowywanie odbywa się na Ergo przy użyciu inteligentnych kontraktów ErgoScript, podczas gdy weryfikacja płatności dla innych łańcuchów wymagałaby lekkich mostów.

Wstępne badania już trwają, aby rozszerzyć wsparcie Lithos na Bitcoin poprzez interoperacyjny projekt.

---

## Jak to działa

Lithos łączy dwie kluczowe idee: **Dowody udziału bez interakcji (NISPs)** i **zabezpieczone pule wydobywcze**, wdrożone za pomocą inteligentnych kontraktów warstwy 2 (konkretnie, optymistycznego rollupu) na Ergo.

### NISPs: Dowód bez interakcji

Dowody udziału bez interakcji pozwalają górnikom przesyłać dowody pracy bez potrzeby interakcji z serwerem. Każdy górnik wybiera swoją własną trudność, co określa, jak często otrzymuje płatności i jak duże są te płatności.

Inteligentne kontrakty weryfikują te dowody i wydają wypłaty, bez potrzeby centralnej koordynacji.

### Zabezpieczone pule

Pule wydobywcze na Lithos są wspierane przez zabezpieczenie. Górnicy i nie-górnicy mogą stakować tokeny ERG lub LITHOS, aby zabezpieczyć pulę. To umożliwia:

* Lokalną produkcję bloków z pełnym wyborem transakcji
* Oporność na cenzurę
* Egzekwowanie sprawiedliwości płatności na łańcuchu
* Rodzaj mechanizmu pożyczkowego DeFi między twórcami pul a stakerami

---

## Korzyści dla górników

* **Pełna kontrola nad blokiem**: Górnicy wybierają transakcje, zbierają demurrage i MEV.
* **Sprawiedliwe wypłaty**: Inteligentne kontrakty obsługują wszystkie nagrody w sposób przejrzysty.
* **Brak ryzyka operatora puli**: Nie ma centralnej strony, która mogłaby oszukiwać lub opóźniać płatności.
* **Lokalny klient**: Górnik Lithos działa lokalnie, aby uniknąć opóźnień lub przestarzałych udziałów.
* **Regulowana trudność**: Górnicy mogą dostosować trudność swoich udziałów do swojego sprzętu i preferencji ryzyka.

---

## Trudność i płatności

Protokół wprowadza unikalny model płatności:

* **Wyższa trudność** = mniej, ale większe płatności
* **Niższa trudność** = częstsze, ale mniejsze płatności

Testy w rzeczywistych warunkach pokazują, że całkowite nagrody pozostają proporcjonalne do hashrate, ale górnicy mogą wybierać, jak stabilne lub zmienne są ich zarobki.

---

## Token LITHOS

Protokół będzie zawierał natywny token:

* **Zarobiony** przez górników jako nagroda za korzystanie z zdecentralizowanych pul.
* **Wymagany** do zabezpieczenia puli, łącząc górników i pożyczkodawców.
* **Używany** do zapobiegania spamowi, oszustwom i do pomocy w sekwencjonowaniu rollupów.

Więcej informacji zostanie opublikowanych w nadchodzącym białym papierze.

---

## Najnowsze aktualizacje rozwoju

* Ostateczne kontrakty dowodowe oszustw są w trakcie przeglądu
* Wdrożenie wynajmu pamięci zostało udoskonalone, aby zapobiec atakom na poziomie bloków
* Kontrakt trudności jest budowany, aby zapobiec manipulacjom po wydobyciu
* Testowanie kontraktu rollup i poprawki stratum są w toku
* Kod źródłowy zostanie udostępniony publicznie przed uruchomieniem testnetu
* Badania nad integracją z Bitcoinem są w toku

Uruchomienie testnetu zbliża się, czekając na ostateczną integrację rollup i stabilność stratum.

---

## Co dalej

Mapa drogowa Lithos jest ściśle związana z wydaniem Sigma 6.0 na głównym łańcuchu Ergo, co jest warunkiem wstępnym dla uruchomienia Lithos.

Do tego czasu prace nad pierwszym publicznym testnetem trwają. Ostateczny etap obejmuje:

* Ukończenie i testowanie kontraktów rollup i dowodowych oszustw
* Finalizację integracji klienta stratum
* Publikację kodu źródłowego do przeglądu społeczności
* Kontynuację rozwoju kontraktów emisji, konfiguracji i zabezpieczeń
* Planowanie integracji BTC dla szerszej kompatybilności protokołu
* Finalizację białego papieru opisującego projekt systemu i mechanikę tokenów

Gdy te kamienie milowe zostaną osiągnięte, a Sigma 6.0 zostanie aktywowana na głównym łańcuchu, Lithos będzie gotowy do uruchomienia.

---

## Zasoby

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
