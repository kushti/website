---
cmsId: 2692
title: Verdienen Mit Der Rosen Brücke
slug: Earning-With-The-Rosen-Bridge
type: blog
locale: de
date: "2024-08-08T21:00:00"
publishedAt: "2024-08-09T15:24:01.421"
updatedAt: "2025-08-25T11:01:25.844"
author: Ergo Platform
tags: ["Explainers","Community","Ecosystem"]
spotlight: true
subtitle: null
image: null
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: true
---

Bitcoin hat offiziell die Ergo-Ökosystem über die Rosen Brücke verbunden! Diese neu gebaute, dezentrale Infrastruktur ermöglicht vertrauenslose Transfers zwischen BTC und Ergo, wodurch Bitcoin innerhalb des wachsenden DeFi-Ökosystems von Ergo als rsnBTC eingesetzt werden kann. Als eUTXO-Blockchain werden die Smart Contracts von Ergo durch ErgoScript und Sigma-Protokolle unterstützt, was die Entwicklung leistungsstarker dApps ermöglicht, die auf einer extrem sicheren Basisschicht laufen – die nun Bitcoin als Sicherheiten nutzen kann.

Lassen Sie uns einen genaueren Blick auf die Rosen Brücke, die vertrauenslosen Entitäten, die sie sichern, und darauf werfen, wie Sie Einkommen erzielen können, indem Sie an diesem innovativen Element der Infrastruktur von Ergo teilnehmen und es vorantreiben.

**Diejenigen, die Vermögenswerte über die Rosen Brücke bewegen möchten, können darauf zugreifen unter [app.rosen.tech](https://t.co/SBhBAhWvWV). Derzeit unterstützt die Brücke Ergo-, Cardano- und Bitcoin-Vermögenswerte, aber die Brücke wird in naher Zukunft auch andere Chains unterstützen, einschließlich EVM.**

## Was Ist Die Rosen Brücke?

Die Rosen Brücke ist eine Cross-Chain-Brücke, die speziell für die Ergo-Blockchain entwickelt wurde. Sie ermöglicht den sicheren Transfer von Vermögenswerten zwischen verschiedenen Blockchains (zunächst Cardano und Ergo, und jetzt auch Bitcoin), sodass Benutzer die Vorteile mehrerer Netzwerke genießen können.

Es gibt viele verschiedene Modelle für Brücken, aber im Allgemeinen war die Brückentechnologie historisch gesehen ein einzigartig anfälliges Element im Blockchain-Bereich. Die Komplexität von Brücken hat oft erfordert, dass zahlreiche Smart Contracts gleichzeitig zwischen zwei oder mehr Blockchains ausgeführt werden. Das bedeutet, dass Brücken oft eine besonders große Angriffsfläche darstellen, und in der Vergangenheit haben Hacker diese Schwachstellen ausgenutzt, um gesperrte Gelder zu extrahieren und zu stehlen.

Ergo hat einen einfachen Ansatz gewählt, um die Rolle von Smart Contracts auf den Chains, mit denen Rosen Brücken verbindet, zu minimieren. **Dies wird erreicht, indem die Ausführung aller Smart Contract-Funktionen nur auf der Ergo-Blockchain beschränkt wird**, und das Sicherheitsmodell beruht auf zwei Schlüsselparteien: Wächtern und Wächtern. 

Wächter überwachen die Zielblockchains auf wichtige Ereignisse. Sie übermitteln diese dann an die Wächter, indem sie eine Transaktion auf Ergo erstellen, die diese analysieren, auf ein genaues Ereignis und Konsens überprüfen und Transaktionen auf der relevanten Blockchain ausführen. Rosen ist so konzipiert, dass die Sicherheit beim Skalieren aufrechterhalten wird, wobei für jede neue Chain separate Module hinzugefügt werden, die in das Ökosystem integriert sind. 

Es ist wichtig zu beachten, dass Ergo als Hub für die Smart Contracts der Rosen Brücke gewählt wurde, aufgrund der bewährten Sicherheit der Plattform. Als Netzwerk, das die Entwicklung von Open Source fördert, haben sich Ergos Skriptsprache und Smart Contracts als einige der robustesten und sichersten in der gesamten Branche etabliert. 

## Rosen Gebühren Und Der RSN Token

Die Gebühr für die Nutzung der Rosen Brücke beträgt 0,5 % des gesamten Transaktionsbetrags oder 10 USD - je nachdem, was höher ist, zuzüglich Netzwerkgebühren. Wächter können die Brückengebühren kollektiv anpassen, während die Netzwerkgebühren je nach Blockchain-Plattform variieren (die Gebühren für Ergo sind statisch).

Darüber hinaus spielt der RSN-Token eine wichtige Rolle bei der Sicherstellung der Sicherheit der Brücke. Zusammen bieten die Gebühren und die Nutzung des RSN-Tokens eine Reihe von Möglichkeiten, Einkommen durch die Unterstützung der Rosen-Infrastruktur zu erzielen.

### Wächter Gebühren

Wächter können als Orakel betrachtet werden, die Einzahlungsereignisse für ihre jeweiligen Blockchains überwachen (Wächter werden für jede Chain benötigt, die Teil der Rosen Brücke ist) und diese Informationen an die Wächter weitergeben. Wächter bieten einen wichtigen Dienst, und zusammen bilden sie ein dezentrales p2p-Netzwerk von Knoten, das sicherstellt, dass es keinen einzelnen Ausfallpunkt gibt. 

Jeder Wächter-Set hat keine theoretische Grenze (derzeit ein weicher Limit von 999), und 60 % + 1 davon müssen einem Ereignis zustimmen, bevor es als gültig betrachtet und an die Wächter kommuniziert wird. Dieser Parameter kann vom Wächter-Set angepasst werden. Bei einem vollständigen Set von Wächtern erfordert dies, dass 601 Wächter zustimmen, was die Möglichkeit von Kollusion verringert. Es ist möglich, mehr als ein Wächter-Set zu haben, obwohl es unwahrscheinlich ist, dass mehr als zwei langfristig notwendig wären.

Wächter erhalten 70 % der Transaktionsgebühren von der Rosen Brücke.

### Wächter Gebühren

Während Wächter Informationen über ihr Zielnetzwerk sammeln und kommunizieren, führen Wächter Transaktionen als Reaktion auf diese Informationen aus. Das Modell ähnelt ein wenig der Infrastruktur des Bitcoin-Netzwerks von Vollknoten, die die Kommunikation zuverlässiger Informationen im Netzwerk sicherstellen, und Minern, die mit der Sicherheit beauftragt sind. Im Fall von Bitcoin ist jeder Mining-Knoten ein Vollknoten, aber nicht jeder Vollknoten ist ein Mining-Knoten.

Das Wächter-Set ist eine föderierte Gruppe von Knoten mit einer kollektiven Verantwortung für die Verwaltung des Rosen-Kerns. Wächter müssen einen bestimmten Betrag an Geldern als Sicherheiten in RSN-Token hinterlegen, um ihre Ehrlichkeit zu gewährleisten. Sollte ein Wächter böswillig handeln, wird sofort seine Sicherheit gekürzt. Das Wächter-Set kann sicher arbeiten, selbst wenn eine Anzahl von Wächtern als unzuverlässig erweist. Wächter erhalten insgesamt 30 % der Brückentransaktionsgebühren.

## Zwei Weitere Möglichkeiten Zu Verdienen

Die Rosen Brücke von Ergo ist auf eine genaue Preisgestaltung von RSN und liquide Märkte angewiesen. Die Einbeziehung von RSN in Ergos DeFi-Ökosystem ist daher entscheidend für das reibungslose Funktionieren des Dienstes.

Benutzer, die RSN besitzen, können ihre Token in einen [Liquiditätspool](https://app.spectrum.fi/ergo/liquidity) auf Spectrum/Splash - Ergos Hauptdezentralisierte Börse einzahlen. Um dies zu tun, benötigen Sie ERG sowie RSN. Liquidität kann jederzeit abgehoben werden, aber Liquiditätsanbieter (LPs) müssen sich bewusst sein, dass sie von impermanenten Verlusten (IL) betroffen sein können. Dies tritt auf, wenn das Verhältnis der Preise von Vermögenswerten steigt oder fällt, nachdem sie in den Liquiditätspool eingezahlt wurden. Wenn ein LP seine Vermögenswerte aus dem Pool abhebt, erhält er möglicherweise weniger in dollaräquivalenten Beträgen, als wenn er die Vermögenswerte einfach gehalten und keine Liquidität bereitgestellt hätte. Der Verlust wird als „impermanent“ bezeichnet, da er nur bei der Abhebung kristallisiert wird. Wenn der LP wartet und das Preisverhältnis zu seinem Ausgangspunkt zurückkehrt, kann er den ursprünglichen Wert der Token abheben. Dies geschieht, weil LPs einen Prozentsatz des Pools besitzen, nicht eine absolute Anzahl von Token. 

Um Benutzer für das Risiko des impermanenten Verlusts zu entschädigen, erhalten LPs einen Anteil an den Handelsgebühren für den Pool. Sie können auch zusätzliche Token erhalten, die als Erträge aus der Landwirtschaft bekannt sind. Der aktuelle Ertragssatz für LPs kann auf der [Liquiditätspool-Seite](https://app.spectrum.fi/ergo/liquidity) für Spectrum/Splash eingesehen werden.

Eine weitere Möglichkeit, mit RSN zu verdienen, besteht darin, Token auf [Duck Pools](https://www.duckpools.io/) zu verleihen, Ergos Kreditprotokoll. Wie bei der Einzahlung von RSN in einen Liquiditätspool variieren die Renditen.

Darüber hinaus können interessierte Parteien Anleihen bei [SigmaFi](https://sigmafi.app/#/) erstellen, um Rosen zu verleihen oder zu leihen. SigmaFi ist einzigartig, da es bis zur Fälligkeit keine Liquidationsaktion gibt und Kreditnehmer ihre eigenen Sätze im Antragsformular festlegen können. 

## Erfahren Sie Mehr

Sie können mehr über die Rosen Brücke erfahren, indem Sie [Ergos Dokumentation](https://docs.ergoplatform.com/eco/rosen/) lesen oder weitere Informationen über Ergo und sein Ökosystem von der [Ergo-Website](/) erhalten.

Treten Sie dem [Ergo Discord](https://discord.gg/ergo-platform-668903786361651200) bei, um sich mit der Community zu verbinden und die Rosen Brücke sowie DeFi-Möglichkeiten mit Experten zu diskutieren. Erfahren Sie, wie Sie einen Wächter oder Wächter einrichten und erkunden Sie, wie Sie Ergos dezentrale Handels- und Kredit-Anwendungen nutzen können.
