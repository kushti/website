---
cmsId: 2700
title: "DexyGold Beta startet auf dem Ergo Mainnet: Ein neuer Standard für On-Chain Gold"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: de
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T11:27:46.108"
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

### Ein Meilenstein für Ergo DeFi

Die öffentliche Mainnet-Beta von DexyGold ist live und bewegt bereits echten Wert. Die Münze zielt auf den USD-Preis einer Feinunze Gold und basiert auf zwei Kernverträgen:

* **Bankvertrag** — mintet DexyGold, wenn Benutzer ERG zum Orakelpreis einzahlen.
* **AMM-Liquiditätspool** — ermöglicht Händlern, einen Marktpreis zu entdecken und setzt Schutzmaßnahmen durch, die Reserven schützen.

Beide Verträge nutzen den neuen [**Gold v2 Orakel-Feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), der schneller aktualisiert wird und zusätzliche Schutzmaßnahmen gegen Manipulation bietet. Da DexyGold gut abschneidet, bereitet sich die Community nun darauf vor, den USD-Orakelpool auf v2 zu aktualisieren und **GluonUSD** sowie **DexyUSD** zu starten. Eine Telegram-Gruppe bildet sich für Personen, die v2-Orakel betreiben möchten, und Hilfe beim Testen des Orakelpool-Updates auf dem Testnet wird ebenfalls dringend benötigt.

---

### Warum auf Gold und nicht auf Dollar abzielen?

Gold umgeht das Risiko einer einzelnen Regierung und hat sich seit Jahrhunderten gegenüber langfristiger Inflation behauptet. Ein goldgedeckter Stablecoin ergänzt den DeFi-Stack von Ergo und bietet den Benutzern eine Absicherung, die USD-Tracker wie SigmaUSD ergänzt.

---

### Unter der Haube

| Motorenteil        | Rolle im Peg                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bankvertrag**    | Mintet DexyGold für ERG zum Orakelpreis. Das Angebot wächst nur, wenn Benutzer ERG hinzufügen.                                                                 |
| **Liquiditätspool**| Veröffentlicht einen Live-DexyGold / ERG-Preis. Die Pool-Mathematik spiegelt Uniswap V2 wider und blockiert die Einlösung von LP-Token, wenn der Orakelpreis mehr als 10 % unter dem Poolpreis liegt. |
| **Arbitrage-Schleife** | *Orakel > Pool* → Benutzer minten DexyGold und verkaufen an den Pool. *Orakel < Pool* → die Bank gibt untätige ERG aus und kauft DexyGold nach einer Verzögerung von 50 Blöcken.                  |
| **Sicherheitsventile** | Zeitverriegelungen für frisches DexyGold, ERG-Verriegelungen in der Bank und eine automatische Mint-Pause, wenn die Gewinne übermäßig erscheinen.                                                     |

---

### So probieren Sie DexyGold heute aus

1. **Installieren Sie [Nautilus](https://nautiluswallet.io/)** und wählen Sie das Mainnet-Netzwerk aus.
2. **Fügen Sie ein bescheidenes ERG-Guthaben** über eine Börse, Miner-Auszahlung oder die [Rosen-Brücke](https://app.rosenbridge.io/) hinzu.
3. **Öffnen Sie [Crystal Pool](https://crystalpool.cc)**—der einzige Ort, um DexyGold zu minten und zu handeln. Minten Sie in der Bank-Benutzeroberfläche, stellen Sie Liquidität bereit oder platzieren Sie Limit-Orders.
4. **Fangen Sie klein an:** Verträge sind live und halten echten Wert, während Audits und Parameteranpassungen fortgesetzt werden. Bestellungen werden in Sekunden on-chain abgewickelt.


#### Crystal Pool im Fokus

Crystal Pool ist ein neuer Layer-1 DEX auf der Ergo-Blockchain, der sich auf die direkte Interaktion mit Smart Contracts und die beste verfügbare On-Chain-Liquidität konzentriert. Er bietet:

* Direkte Auftragsabwicklung on-chain ohne off-chain Orderbücher
* Multi-Token, Multi-Verkäufer-Transaktionen in einer einzigen Transaktion
* Echtzeit-Transaktionsverkettung, die nahtloses Trading für Hunderte von Benutzern parallel ermöglicht
* Integrierte Charting- und Handelsgeschichte, die Ihre Geschäfte direkt auf Preisdiagrammen anzeigt

Kommt später im Jahr 2025: Limit-Order-Liquiditätspools, die tiefere Marktstrategien ermöglichen.

Crystal Pool zielt darauf ab, die zentrale Liquiditätsschicht für Ergo DeFi zu werden—einfach, schnell und transparent.


---

### DexyGold-Roadmap

* **Zweite Audit-Runde**, um die Arbitrage-Schleife zu testen und die Parameteranpassung zu verbessern.
* **Sicherheitenquote-Ziel** über 150 Prozent, während die Minting-Gebühren Reserven in der Bank aufbauen.
* **USD-Orakel-Pool v2**-Rollout mit Community-Betreibern und Tests auf dem Testnet.
* **GluonUSD und DexyUSD**-Starts nach dem Upgrade des USD-Orakel-Feeds, um die Stablecoin-Suite zu erweitern.

---

### Gold v2 Orakel-Adoption wächst

DexyGold ist das zweite Projekt, das den Gold v2-Feed übernimmt. Das erste, **gluon.gold**, hat kürzlich ein [aktualisiertes Beta-Frontend](https://gluon.gold/reactor) vorgestellt, das Gebühren, Reservenquote, TVL, Volumen und ausstehende Transaktionen mit größerer Klarheit verfolgt—ein Beweis dafür, wie schnell das neue Orakel zum Rückgrat von Ergos goldbasierten Produkten wird.

---

### Nehmen Sie an der Diskussion teil

Lesen Sie das Entwurfspapier von Dexy, teilen Sie Ihr Feedback auf **r/ergonauts** und treten Sie der Community auf [Telegram](http://t.me/dexygold) oder [Discord](https://discord.gg/xjfnk9A2cU) bei. Ihre Tests in der realen Welt und Fehlerberichte werden helfen, die endgültigen Parameter einer widerstandsfähigen, gold- und dollarunterstützten Stablecoin-Familie auf Ergo zu gestalten.
