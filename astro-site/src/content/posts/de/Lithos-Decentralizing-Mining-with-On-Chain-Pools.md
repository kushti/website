---
cmsId: 2673
title: "Lithos: Dezentralisierung des Minings mit On-Chain-Pools"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: de
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T10:17:49.978"
author: Ergo Platform
tags: ["Ecosystem","Mining"]
spotlight: true
subtitle: null
image: null
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Lithos ist ein neues Protokoll, das darauf abzielt, die Funktionsweise von Mining-Pools zu revolutionieren, indem es sie on-chain verlagert, den Minern die volle Kontrolle gibt und die Notwendigkeit zentraler Pool-Betreiber beseitigt. Im Gegensatz zu den meisten früheren Versuchen, dezentrales Mining zu ermöglichen, wurde Lithos so konzipiert, dass es effizient, skalierbar und sicher ist.

---

## Was ist Lithos?

Lithos ist ein dezentrales Mining-Pool-Protokoll, das Miner direkt mit Smart Contracts auf Ergo verbindet. Diese Verträge verwalten alles – Arbeitsübermittlung, Schwierigkeitsmanagement und Zahlungen – ohne auf zentrale Server oder Treuhänder angewiesen zu sein.

Das Protokoll verwendet **Stratum**, um Mining-Hardware mit dem Lithos-Client zu verbinden, aber alle wichtigen Logiken laufen on-chain. Miner reichen Arbeiten bei Smart Contracts ein und werden direkt basierend auf einem neuen kryptografischen Beweisformat bezahlt.

Es ist so konzipiert, dass es **blockchain-agnostisch** ist, was bedeutet, dass es in Zukunft Mining-Pools für jede Proof-of-Work-Chain unterstützen könnte. Die Arbeitsberechnung und -speicherung erfolgt auf Ergo unter Verwendung von ErgoScript-Smart Contracts, während die Zahlungsüberprüfung für andere Chains leichte Brücken erfordern würde.

Erste Forschungen sind bereits im Gange, um die Unterstützung von Lithos für Bitcoin über ein interoperables Design zu erweitern.

---

## Wie es funktioniert

Lithos kombiniert zwei Schlüsselideen: **Non-Interactive Share Proofs (NISPs)** und **kollateralisierten Mining-Pools**, die über Layer-2-Smart Contracts (insbesondere ein optimistisches Rollup) auf Ergo implementiert sind.

### NISPs: Beweis ohne Interaktion

Non-Interactive Share Proofs ermöglichen es Minern, einen Arbeitsnachweis einzureichen, ohne mit einem Server hin und her interagieren zu müssen. Jeder Miner wählt seine eigene Schwierigkeit, die bestimmt, wie oft er bezahlt wird und wie hoch diese Zahlungen sind.

Smart Contracts validieren diese Beweise und geben Auszahlungen aus, ohne dass eine zentrale Koordination erforderlich ist.

### Kollateralisierten Pools

Mining-Pools auf Lithos sind durch Sicherheiten gedeckt. Miner und Nicht-Miner können ERG oder LITHOS-Token einsetzen, um einen Pool zu kollateralizieren. Dies ermöglicht:

* Lokale Blockproduktion mit vollständiger Transaktionsauswahl
* Zensurresistenz
* On-Chain-Durchsetzung der Zahlungsfairness
* Ein natives DeFi-Kreditmechanismus zwischen Pool-Erstellern und Stakern

---

## Vorteile für Miner

* **Volle Blockkontrolle**: Miner wählen Transaktionen aus, sammeln Demurrage und MEV.
* **Faire Auszahlungen**: Smart Contracts verwalten alle Belohnungen transparent.
* **Kein Risiko für Pool-Betreiber**: Es gibt keine zentrale Partei, die betrügen oder Zahlungen verzögern kann.
* **Lokaler Client**: Der Lithos-Miner läuft lokal, um Latenz oder veraltete Shares zu vermeiden.
* **Einstellbare Schwierigkeit**: Miner können ihre Share-Schwierigkeit an ihre Hardware und Risikopräferenzen anpassen.

---

## Schwierigkeit und Zahlungen

Das Protokoll führt ein einzigartiges Zahlungsmodell ein:

* **Höhere Schwierigkeit** = weniger, aber größere Zahlungen
* **Niedrigere Schwierigkeit** = häufigere, aber kleinere Zahlungen

Tests in der realen Welt zeigen, dass die Gesamtbelohnungen proportional zur Hashrate bleiben, aber Miner können wählen, wie stabil oder volatil ihre Einnahmen sind.

---

## LITHOS-Token

Das Protokoll wird einen nativen Token beinhalten:

* **Verdient** von Minern als Belohnung für die Nutzung dezentraler Pools.
* **Erforderlich** für die Kollateralisation von Pools, die Miner und Kreditgeber verbinden.
* **Verwendet** um Spam, Betrug zu verhindern und bei der Rollup-Sequenzierung zu helfen.

Weitere Informationen werden im kommenden Whitepaper veröffentlicht.

---

## Neueste Entwicklungsupdates

* Endgültige Betrugsnachweisverträge werden überprüft
* Implementierung der Speichermiete verfeinert, um Angriffe auf Blockebene zu verhindern
* Schwierigkeitsvertrag wird erstellt, um Manipulationen nach dem Mining zu verhindern
* Rollup-Vertragstests und Stratum-Fixes sind im Gange
* Der Code wird vor dem Testnet-Start öffentlich gemacht
* Forschung zur Bitcoin-Integration im Gange

Der Testnet-Start rückt näher, abhängig von der endgültigen Rollup-Integration und der Stratum-Stabilität.

---

## Was kommt als Nächstes

Der Lithos-Fahrplan ist eng mit der Veröffentlichung von Sigma 6.0 im Ergo-Hauptnetz verbunden, die eine Voraussetzung für den Live-Betrieb von Lithos ist.

Bis dahin wird an dem ersten öffentlichen Testnet weitergearbeitet. Der letzte Abschnitt umfasst:

* Abschluss und Test von Rollup- und Betrugsnachweisverträgen
* Finalisierung der Stratum-Client-Integration
* Veröffentlichung des öffentlichen Codebases zur Peer-Überprüfung
* Fortsetzung der Entwicklung der Emissions-, Konfigurations- und Kollateralverträge
* Planung der BTC-Integration für breitere Protokollkompatibilität
* Finalisierung des Whitepapers, das das Design und die Token-Mechanik des Systems umreißt

Sobald diese Meilensteine erreicht sind und Sigma 6.0 im Hauptnetz aktiviert ist, wird Lithos bereit sein, gestartet zu werden.

---

## Ressourcen

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
