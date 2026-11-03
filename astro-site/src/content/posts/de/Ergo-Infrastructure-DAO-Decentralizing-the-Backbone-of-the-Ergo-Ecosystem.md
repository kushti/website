---
cmsId: 2703
title: "Ergo Infrastructure DAO: Dezentralisierung des Rückgrats des Ergo-Ökosystems"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: de
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T12:14:11.776"
author: Ergo Platform
tags: ["Community","DAOs"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dao_4bb9b2ff23.png","alt":"dao.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dao_4bb9b2ff23.png","hash":"large_dao_4bb9b2ff23","mime":"image/png","name":"large_dao.png","path":null,"size":685.89,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dao_4bb9b2ff23.png","hash":"small_dao_4bb9b2ff23","mime":"image/png","name":"small_dao.png","path":null,"size":194.19,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dao_4bb9b2ff23.png","hash":"medium_dao_4bb9b2ff23","mime":"image/png","name":"medium_dao.png","path":null,"size":405.28,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dao_4bb9b2ff23.png","hash":"thumbnail_dao_4bb9b2ff23","mime":"image/png","name":"thumbnail_dao.png","path":null,"size":55.51,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Die Mission von Ergo war schon immer in der Dezentralisierung verwurzelt, nicht nur auf der Konsensschicht, sondern über den gesamten Stack hinweg. Mit der Einführung des **Ergo Infrastructure DAO (InfraDAO)** erweitert sich diese Vision auf die Dienstleistungen und Infrastrukturen, die das Ökosystem jeden Tag antreiben.

Das InfraDAO ist jetzt offiziell live auf [Paideia](https://app.paideia.im/ergoinfradao), nach einer erfolgreichen Governance-Abstimmung. Was als Basisvorschlag aus der **Sigmanauts-Beitragsgruppe** begann – angeführt von jedem Lieblings-Sigmanaut, **qx**, bekannt für seine Auftritte bei Ergo AMAs und überall im Ökosystem – hat sich nun zu einer gemeinschaftlich geführten Initiative entwickelt, die die Art und Weise, wie zentrale Dienstleistungen bereitgestellt und gewartet werden, neu gestalten wird.

---

## Was ist das Ergo Infrastructure DAO?

Das InfraDAO ist ein dezentrales, von Peers betriebenes Netzwerk von Infrastruktur-Anbietern, die für die Wartung wichtiger Dienstleistungen im Ergo-Ökosystem verantwortlich sind. Dazu gehören:

* Vollknoten und APIs
* Blockchain-Explorer
* Testnet- und Mining-Infrastruktur
* Community-Dokumentation und Mirrors
* Tools wie SigmaSpace, ErgoDocs und Sigmaverse
* Zukünftiges Hosting und Management von ergoplatform.org

Dieses DAO wird die Abhängigkeit von der Ergo Foundation verringern und sicherstellen, dass die Infrastruktur zensurresistent, fehlertolerant und transparent verwaltet wird.

---

## Warum es wichtig ist

Bis jetzt wurde ein Großteil der Ergo-Infrastruktur, einschließlich öffentlicher Endpunkte, Block-Explorer und gehosteter Dokumentation, von der **Ergo Foundation** und später dem **Developer DAO** gewartet. Während dieses Modell frühe Stabilität und Zuverlässigkeit bot, schuf es auch zentrale Abhängigkeitspunkte.

Das InfraDAO ändert das, indem es die Verantwortlichkeiten auf ein globales, selbstverwaltetes Netzwerk von Beitragsleistenden verteilt, die den Stack betreiben und warten. Es stellt sicher:

* Widerstandsfähigere und geografisch verteilte Dienstleistungen
* Langfristige Nachhaltigkeit ohne Abhängigkeit von der Foundation
* Gemeinschaftskontrolle über Governance und Bereitstellung
* Ein wirklich dezentrales Betriebsmodell, das mit den Grundprinzipien von Ergo übereinstimmt

---

## Was bereits live und migriert ist

Das InfraDAO hat bereits Fortschritte gemacht. Drei Hochleistungsmaschinen, die über mehrere Endpunkte lastenausgeglichen sind, sind jetzt live und synchronisiert mit dem schnelleren **RocksDB**-Speicher-Backend:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (HTTPS-kompatibel für Wallets)

Diese Endpunkte sind **vollständig kompatibel mit mobilen und browserbasierten Wallets** und dienen als Grundlage für den dezentralen Zugang zum Ergo-Netzwerk.

Sie können die Betriebszeit und die Verfügbarkeit von Peers über das öffentliche Dashboard überwachen:
[Ergo Infrastructure DAO – Echtzeit-Status-Dashboard](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Lastenausgleich und Community-Betreiber

Während „P2P“ hier lose auf ein verteiltes Netzwerk verweist, wird die Infrastruktur tatsächlich von der Community betrieben. Der anfängliche Lastenausgleich wird Maschinen umfassen, die betrieben werden von:

* qx (drei Knoten)
* Jumei
* 2ndTL Mining
* Sheetoshi

Diese sind strategisch eingesetzt, um einen globalen, geolokationsbasierten Lastenausgleich zu unterstützen. Weitere Gemeinschaftsmaschinen werden hinzugefügt, während das DAO wächst, und bilden ein vollständig dezentrales und global widerstandsfähiges Rückgrat.

Der Auswahlprozess für neue Teilnehmer wird Folgendes umfassen:

1. Eine **statische IP-Adresse**
2. **Ausreichende Upload-Bandbreite**
3. Ein **grundlegendes Verständnis von Infrastruktur** (oder die Fähigkeit, Anweisungen zur Einrichtung über die Kommandozeile zu befolgen)
4. Eine **Postanschrift** für den Versand eines vorkonfigurierten Knotens oder Explorers (kostenlos bereitgestellt)

---

## Von der Idee zur Ausführung: Von der Community gebaut

Das InfraDAO begann als interne Initiative unter den Sigmanauts. In Anerkennung des Bedarfs an einer Dezentralisierung der Infrastruktur schlug **qx** die Schaffung eines DAO vor und leitete dessen Einführung.

Im Juli 2025 wurde ein Vorschlag zur Beantragung von **50.000 \$PAIDEIA** erfolgreich auf Paideia angenommen. Diese Mittel decken die Startkosten wie Maschinenvorbereitung, Versand und Einarbeitung von Beitragsleistenden. Der Token des DAO ist jetzt live, und die Governance ist aktiv.

---

## Technische Anforderungen

**Hardware- und Netzwerk-Anforderungen:**
* Upload-Bandbreite: 50 Mbps oder mehr
* Latenz: \~100ms oder weniger zu Ihrer lokalen Region
* IPv4: Statische oder langfristig dynamische IP
* Maschinen-Spezifikationen:
  * Ubuntu OS
  * 16GB RAM (32GB empfohlen)
  * 1TB SSD
  * Docker, tmux, SSH-Zugriff und Fähigkeiten zur Konfiguration

Diese Systeme sind für hohe Verfügbarkeit optimiert und bedienen derzeit Produktionsverkehr über lastenausgeglichene Endpunkte.

---

## Nicht nur Hosting: Zukünftige Expansion

Während die erste Phase des InfraDAO sich auf das Hosting konzentriert, wird es wachsen, um Folgendes zu unterstützen:

* Infrastrukturwartung und -überwachung
* Abhängigkeits- und Sicherheitsupdates
* Docker-Orchestrierung und Softwarebereitstellung
* CMS-Management für ergoplatform.org
* Veröffentlichungs- und Dokumentationsupdates
* Hosting-Dienste wie SigmaSpace, ErgoDocs und Sigmaverse

Dies öffnet die Teilnahme für Sysadmins, Backend-Entwickler, Inhaltsverwalter und andere Beitragsleistende über Knotenbetreiber hinaus.

---

## Aktueller Status

* DAO live auf Paideia
* Erster Finanzierungsantrag genehmigt
* Token geprägt und Abstimmung live
* Erste Welle der Infrastruktur live und betriebsbereit
* Öffentliches Überwachungsdashboard online
* Nächster Schritt: zusätzliche Beitragsleistende und globale Expansion

---

## So können Sie sich beteiligen

Wenn Sie technisch versiert sind und Infrastruktur betreiben, Betriebszeiten aufrechterhalten, Websites aktualisieren oder an der DAO-Governance teilnehmen möchten, ist jetzt der Zeitpunkt, um einzusteigen.

→ Treten Sie dem DAO bei oder folgen Sie den Vorschlägen hier:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Überwachen Sie den Infrastrukturstatus:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Abschließende Gedanken

Die Einführung des Ergo Infrastructure DAO ist ein großer Schritt in Richtung vollständiger Dezentralisierung, Autonomie, Gemeinschaftskontrolle und Nachhaltigkeit eines mission-driven Blockchain-Ökosystems.

Mit Governance on-chain, Infrastruktur, die der Community gehört, und globalen Beitragsleistenden, die bereits kritische Dienstleistungen betreiben, zeigt Ergo, wie echte Dezentralisierung aussieht.

Helfen Sie, die Grundlage zu schaffen. Beteiligen Sie sich.
