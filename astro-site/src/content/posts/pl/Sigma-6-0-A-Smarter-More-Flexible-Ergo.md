---
cmsId: 2830
title: "Sigma 6.0: Mądrzejszy, bardziej elastyczny Ergo"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: pl
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T22:27:53.406"
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

**Sigma 6.0** to główna proponowana aktualizacja blockchaina Ergo. Daje deweloperom potężniejsze narzędzia do budowania inteligentnych kontraktów, naprawia długoletnie ograniczenia i przygotowuje sieć na przyszłe ulepszenia—wszystko to bez łamania kompatybilności z istniejącymi kontraktami lub węzłami.

Aktualizacja odbywa się poprzez soft-fork, co oznacza, że istniejące węzły niekopiące mogą nadal działać, podczas gdy zaktualizowane węzły kopiące muszą aktywować i egzekwować nowe funkcje.

Głosowanie przez górników już trwa, a wsparcie wynosi obecnie ponad 90%, a devnet jest aktywny do wczesnych testów. Jeśli to się utrzyma, Sigma 6.0 zostanie aktywowana pod koniec września 2025.


---

## Dlaczego Sigma 6.0 jest potrzebna?

Od momentu uruchomienia Ergo w 2019 roku, jego język kontraktów inteligentnych (ErgoTree) pozostał stabilny. Ta stabilność pomogła sieci pozostać bezpieczną, ale również utrudniła deweloperom dodawanie nowych funkcji lub upraszczanie ich logiki. Niektóre ulepszenia były planowane już w czasach testnetu w 2018 roku, ale nigdy nie trafiły na mainnet—aż do teraz.

Sigma 6.0 wprowadza te ulepszenia. Rozszerza możliwości w kontrakcie, usuwa ograniczenia techniczne i otwiera drogę do przyszłych ulepszeń w zakresie zarządzania i skalowania.

---

## Co się zmienia?

* **Potężniejsze liczby** z nowym niesigned 256-bitowym typem całkowitym do operacji kryptograficznych i finansowych
* **Lepsze zarządzanie danymi** dzięki pełnemu wsparciu dla serializacji i deserializacji złożonych typów w kontraktach
* **Inteligentniejsze transakcje** mogące uzyskiwać dostęp do zmiennych kontekstowych z innych wejść dla bardziej skoordynowanej logiki
* **Nowe narzędzia matematyczne i listowe** w tym operacje bitowe, przesunięcia i ulepszone metody kolekcji, takie jak `.get` i `.startsWith`
* **Wbudowana walidacja PoW** umożliwiająca kontraktom sprawdzanie nagłówków bloków lub niestandardowych wiadomości w stosunku do Autolykos2
* **Ulepszona governance** pozwalająca sieci głosować nad nowymi parametrami poprzez przyszłe soft-forki, zaczynając od wsparcia dla sub-bloków



---

## Harmonogram aktywacji

Sigma 6.0 przechodzi przez proces aktywacji soft-fork, który wymaga dwóch faz: okresu głosowania i okresu aktualizacji. Każda trwa około 45 dni, co sprawia, że pełne wdrożenie zajmuje około 90 dni.

Górnicy zaczęli głosować na początku lipca 2025 roku, a wsparcie już przekracza wymagany próg 90%. Jeśli ten poziom wsparcia się utrzyma, aktualizacja zostanie aktywowana pod koniec września 2025.

Nawet jeśli konsensus zostanie osiągnięty wcześniej, protokół nadal czeka na pełne okresy głosowania i aktualizacji przed uruchomieniem.

Devnet jest już aktywny dla Sigma 6.0, a deweloperzy mogą znaleźć informacje o tym, jak dołączyć w czacie deweloperskim społeczności. W lipcu rozpoczęto testowanie węzłów kopiących wspierających sub-bloki na testnecie. Po tym uwaga skupi się na udoskonaleniu dokumentacji i poprawie formalnego rozumowania w zakresie bezpieczeństwa przez cały sierpień, zapewniając, że aktualizacja pozostaje napędzana badaniami. Po zakończeniu, uwaga może skupić się na potencjalnym wdrożeniu na mainnet.

---

## Dla deweloperów

Nowe funkcje wymagają wersji ErgoTree 3 lub wyższej. Niektóre typy—takie jak `Option`, `Header` i `UnsignedBigInt`—nie mogą być przechowywane bezpośrednio w rejestrach lub rozszerzeniach kontekstowych, ale mogą być przechowywane jako dane bajtowe i przywracane wewnątrz kontraktu.

Przykładowe użycie można znaleźć w [zestawie testowym Sigma na GitHubie](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Dlaczego to ma znaczenie

Sigma 6.0 to największa aktualizacja warstwy kontraktów inteligentnych Ergo od momentu uruchomienia sieci. Daje deweloperom większą swobodę, odblokowuje całkowicie nowe przypadki użycia i wzmacnia fundamenty protokołu—przy pełnej kompatybilności wstecznej.

Z wsparciem górników teraz powyżej 90%, aktualizacja jest na dobrej drodze do aktywacji we wrześniu. Sigma 6.0 stawia Ergo w silniejszej pozycji na przyszłość.


## Zasoby

- Pełna propozycja techniczna: [EIP-0050: Sigma 6.0 na GitHubie](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [Propozycja soft-fork 6.0 (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Podsumowanie dokumentacji Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
