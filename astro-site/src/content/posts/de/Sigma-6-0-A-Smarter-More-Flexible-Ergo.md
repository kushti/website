---
cmsId: 2677
title: "Sigma 6.0: Ein intelligenteres, flexibleres Ergo"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: de
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T10:35:23.97"
author: Ergo Platform
tags: ["Core","Explainers","Tooling"]
spotlight: false
subtitle: null
image: null
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

**Sigma 6.0** ist ein bedeutendes vorgeschlagenes Upgrade für die Ergo-Blockchain. Es gibt Entwicklern leistungsstärkere Werkzeuge, um Smart Contracts zu erstellen, behebt langjährige Einschränkungen und bereitet das Netzwerk auf zukünftige Verbesserungen vor – alles, ohne die Kompatibilität mit bestehenden Verträgen oder Knoten zu brechen.

Das Upgrade erfolgt durch einen Soft-Fork, was bedeutet, dass bestehende nicht-mining Knoten weiterhin betrieben werden können, während aktualisierte Mining-Knoten erforderlich sind, um die neuen Funktionen zu aktivieren und durchzusetzen.

Die Abstimmung der Miner ist bereits im Gange, mit einer Unterstützung von über 90 %, und ein Devnet ist für frühe Tests live. Wenn dies so weitergeht, wird Sigma 6.0 Ende September 2025 aktiviert.


---

## Warum wird Sigma 6.0 benötigt?

Seit Ergo 2019 gestartet ist, ist die Programmiersprache für Smart Contracts (ErgoTree) stabil geblieben. Diese Stabilität hat dazu beigetragen, das Netzwerk sicher zu halten, aber es hat es Entwicklern auch erschwert, neue Funktionen hinzuzufügen oder ihre Logik zu vereinfachen. Einige Verbesserungen waren bereits in den Testnet-Tagen 2018 geplant, schafften es aber nie auf das Mainnet – bis jetzt.

Sigma 6.0 bringt diese Upgrades voran. Es erweitert, was in einem Vertrag möglich ist, entfernt technische Einschränkungen und ebnet den Weg für zukünftige Governance- und Skalierungsverbesserungen.

---

## Was ändert sich?

* **Leistungsstärkere Zahlen** mit einem neuen unsigned 256-Bit-Ganzzahltyp für kryptografische und finanzielle Operationen
* **Bessere Datenverarbeitung** durch volle Unterstützung für die Serialisierung und Deserialisierung komplexer Typen in Verträgen
* **Intelligentere Transaktionen**, die auf Kontextvariablen von anderen Eingaben zugreifen können, um eine koordiniertere Logik zu ermöglichen
* **Neue Mathematik- und Listentools**, einschließlich bitweiser Operationen, Verschiebungen und verbesserter Sammlungsmethoden wie `.get` und `.startsWith`
* **Integrierte PoW-Validierung**, sodass Verträge Blockheader oder benutzerdefinierte Nachrichten gegen Autolykos2 überprüfen können
* **Upgradefähige Governance**, die es dem Netzwerk ermöglicht, über neue Parameter durch zukünftige Soft-Forks abzustimmen, beginnend mit der Unterstützung für Sub-Blocks



---

## Aktivierungszeitplan

Sigma 6.0 durchläuft einen Soft-Fork-Aktivierungsprozess, der zwei Phasen erfordert: eine Abstimmungsperiode und eine Aktualisierungsperiode. Jede dauert etwa 45 Tage, sodass die vollständige Einführung ungefähr 90 Tage in Anspruch nimmt.

Die Miner begannen Anfang Juli 2025 mit der Abstimmung, und die Unterstützung liegt bereits über der erforderlichen 90%-Schwelle. Wenn dieses Unterstützungsniveau anhält, wird das Upgrade Ende September 2025 aktiviert.

Selbst wenn frühzeitig ein Konsens erreicht wird, wartet das Protokoll weiterhin auf die vollständigen Abstimmungs- und Aktualisierungsperioden, bevor es live geht.

Ein Devnet ist bereits für Sigma 6.0 live, und Entwickler können Informationen darüber finden, wie sie im Community-Entwickler-Chat teilnehmen können. Im Juli begann das Testen von Sub-Block-unterstützenden Mining-Knoten im Testnet. Danach wird der Fokus auf die Verfeinerung der Dokumentation und die Verbesserung des formalen Denkens über Sicherheit im gesamten August gelegt, um sicherzustellen, dass das Upgrade forschungsgetrieben bleibt. Nach Abschluss kann die Aufmerksamkeit auf eine potenzielle Mainnet-Bereitstellung gerichtet werden.

---

## Für Entwickler

Die neuen Funktionen erfordern ErgoTree Version 3 oder höher. Einige Typen – wie `Option`, `Header` und `UnsignedBigInt` – können nicht direkt in Registern oder Kontext-Erweiterungen gespeichert werden, können jedoch als Byte-Daten gespeichert und innerhalb des Vertrags wiederhergestellt werden.

Beispielverwendungen finden Sie in der [Sigma-Test-Suite auf GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Warum es wichtig ist

Sigma 6.0 ist das größte Upgrade der Smart Contract-Schicht von Ergo seit dem Start des Netzwerks. Es gibt Entwicklern mehr Freiheit, schaltet völlig neue Anwendungsfälle frei und stärkt die Grundlagen des Protokolls – während es vollständig rückwärtskompatibel bleibt.

Mit der Unterstützung der Miner, die jetzt über 90 % liegt, ist das Upgrade auf dem besten Weg, diesen September aktiviert zu werden. Sigma 6.0 versetzt Ergo in eine stärkere Position für die Zukunft.


## Ressourcen

- Vollständiger technischer Vorschlag: [EIP-0050: Sigma 6.0 auf GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [6.0 Soft-Fork-Vorschlag (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Zusammenfassung der Sigma 6.0-Dokumentation](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
