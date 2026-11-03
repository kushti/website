---
cmsId: 2727
title: "DexyGold Beta Arriva su Ergo Mainnet: Un Nuovo Standard per l'Oro On-Chain"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: it
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T13:20:06.935"
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

### Un Traguardo per Ergo DeFi

La beta pubblica del mainnet di DexyGold è attiva e sta già muovendo valore reale. La moneta punta al prezzo in USD di un'oncia troy d'oro, facendo affidamento su due contratti principali:

* **Contratto Bancario** — conia DexyGold quando gli utenti depositano ERG al prezzo dell'oracolo.
* **Pool di Liquidità AMM** — consente ai trader di scoprire un tasso di mercato e impone guardrail che proteggono le riserve.

Entrambi i contratti utilizzano il nuovo [**Gold v2 oracle feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), che si aggiorna più rapidamente e aggiunge protezioni extra contro la manipolazione. Con DexyGold che sta andando bene, la comunità si sta preparando ad aggiornare il pool oracolo USD a v2 e lanciare **GluonUSD** e **DexyUSD**. Si sta formando un gruppo Telegram per le persone che vogliono gestire oracoli v2, e anche aiuto per testare l'aggiornamento del pool oracolo su testnet è molto necessario.

---

### Perché Puntare sull'Oro, Non sui Dollari?

L'oro evita il rischio di un singolo governo e ha mantenuto un vantaggio sull'inflazione a lungo termine per secoli. Un stablecoin ancorato all'oro completa lo stack DeFi di Ergo, offrendo agli utenti una copertura che integra i tracker USD come SigmaUSD.

---

### Sotto il Cofano

| Parte del Motore    | Ruolo nel Peg                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Contratto Bancario**  | Conia DexyGold per ERG al prezzo dell'oracolo. L'offerta cresce solo quando gli utenti aggiungono ERG.                                                                                 |
| **Pool di Liquidità** | Pubblica un prezzo live di DexyGold / ERG. La matematica del pool rispecchia Uniswap V2 e blocca il riscatto dei token LP se il prezzo dell'oracolo scende di oltre il 10 % rispetto al prezzo del pool. |
| **Ciclo di Arbitraggio** | *Oracolo > Pool* → gli utenti coniano DexyGold e vendono al pool. *Oracolo < Pool* → la banca spende ERG inattivo e acquista DexyGold dopo un ritardo di 50 blocchi.                  |
| **Valvole di Sicurezza**  | Time-lock su DexyGold freschi, blocchi ERG nella banca e una pausa automatica nella coniazione quando i profitti sembrano eccessivi.                                                     |

---

### Come Provare DexyGold Oggi

1. **Installa [Nautilus](https://nautiluswallet.io/)** e scegli la rete mainnet.
2. **Aggiungi un saldo ERG modesto** tramite scambio, pagamento miner, o il [ponte Rosen](https://app.rosenbridge.io/).
3. **Apri [Crystal Pool](https://crystalpool.cc)**—l'unico posto per coniare DexyGold e scambiarlo. Conia nell'interfaccia della Banca, fornisci liquidità o piazza ordini limite.
4. **Inizia in piccolo:** I contratti sono attivi e detengono valore reale mentre gli audit e la regolazione dei parametri continuano. Gli ordini si completano on-chain in pochi secondi.


#### Crystal Pool in Primo Piano

Crystal Pool è un nuovo DEX Layer-1 sulla blockchain di Ergo focalizzato sull'interazione diretta con i contratti intelligenti e la migliore liquidità on-chain disponibile. Offre:

* Matching degli Ordini Diretto on-chain senza libri degli ordini off-chain
* Trades Multi-Token, Multi-Venditore in una singola transazione
* Catena di Transazioni in Tempo Reale, che consente trading senza soluzione di continuità per centinaia di utenti in parallelo
* Grafici Integrati e Cronologia delle Transazioni, mostrando i tuoi affari direttamente sui grafici dei prezzi

In arrivo nel 2025: Pool di Liquidità per Ordini Limite, che abilitano strategie di market-making più profonde.

Crystal Pool mira a diventare il layer di liquidità centrale per Ergo DeFi—semplice, veloce e trasparente.


---

### Roadmap di DexyGold

* **Secondo Audit** per stress-testare il ciclo di arbitraggio e migliorare la regolazione dei parametri.
* **Obiettivo del Rapporto di Collaterale** sopra il 150 percento mentre le commissioni di coniazione costruiscono riserve nella banca.
* **Rollout del Pool Oracolo USD v2** con operatori della comunità e test su testnet.
* **Lanci di GluonUSD e DexyUSD** dopo l'aggiornamento del feed oracolo USD, espandendo la suite di stablecoin.

---

### Cresce l'Adozione dell'Oracolo Gold v2

DexyGold è il secondo progetto ad adottare il feed Gold v2. Il primo, **gluon.gold**, ha recentemente svelato un [front-end beta rinnovato](https://gluon.gold/reactor) che traccia commissioni, rapporto di riserva, TVL, volume e transazioni in sospeso con maggiore chiarezza—una testimonianza di quanto rapidamente il nuovo oracolo stia diventando la spina dorsale dei prodotti basati sull'oro di Ergo.

---

### Unisciti alla Conversazione

Leggi la bozza del white paper di Dexy, condividi feedback su **r/ergonauts**, e unisciti alla comunità su [Telegram](http://t.me/dexygold) o [Discord](https://discord.gg/xjfnk9A2cU). I tuoi test nel mondo reale e i report di bug aiuteranno a plasmare i parametri finali di una famiglia di stablecoin resilienti sostenute da oro e dollari su Ergo.
