---
cmsId: 2709
title: "Lithos: Decentralizzare il Mining con Pool On-Chain"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: it
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T13:03:23.621"
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

Lithos è un nuovo protocollo progettato per ristrutturare il funzionamento delle pool di mining spostandole on-chain, dando ai miner il pieno controllo e eliminando la necessità di operatori di pool centralizzati. A differenza della maggior parte dei tentativi precedenti di mining decentralizzato, Lithos è costruito per essere efficiente, scalabile e sicuro.

---

## Cos'è Lithos?

Lithos è un protocollo di pool di mining decentralizzato che collega i miner direttamente a smart contract su Ergo. Questi contratti gestiscono tutto—invio di lavoro, gestione della difficoltà e pagamenti—senza fare affidamento su server o custodi centralizzati.

Il protocollo utilizza **Stratum** per collegare l'hardware di mining al client Lithos, ma tutta la logica chiave viene eseguita on-chain. I miner inviano lavoro agli smart contract e vengono pagati direttamente in base a un nuovo formato di prova crittografica.

È progettato per essere **blockchain agnostic**, il che significa che potrebbe supportare pool di mining per qualsiasi catena proof-of-work in futuro. Il calcolo e l'archiviazione del lavoro avvengono su Ergo utilizzando smart contract ErgoScript, mentre la verifica dei pagamenti per altre catene richiederebbe ponti leggeri.

La ricerca iniziale è già in corso per estendere il supporto di Lithos a Bitcoin tramite un design interoperabile.

---

## Come Funziona

Lithos combina due idee chiave: **Non-Interactive Share Proofs (NISPs)** e **pool di mining collateralizzati**, implementati tramite smart contract di Layer 2 (specificamente, un optimistic rollup) su Ergo.

### NISPs: Prova Senza Interazione

Le Non-Interactive Share Proofs consentono ai miner di inviare prove di lavoro senza dover interagire continuamente con un server. Ogni miner sceglie la propria difficoltà, che determina con quale frequenza vengono pagati e quanto sono grandi quei pagamenti.

Gli smart contract convalidano queste prove e emettono pagamenti, senza necessità di coordinamento centralizzato.

### Pool Collateralizzati

Le pool di mining su Lithos sono supportate da garanzie. I miner e i non-miner possono mettere in stake token ERG o LITHOS per collateralizzare una pool. Questo consente:

* Produzione locale di blocchi con piena selezione delle transazioni
* Resistenza alla censura
* Esecuzione on-chain dell'equità nei pagamenti
* Un meccanismo di prestito DeFi nativo tra i creatori di pool e i partecipanti al staking

---

## Vantaggi per i Miner

* **Controllo completo dei blocchi**: I miner selezionano le transazioni, raccolgono demurrage e MEV.
* **Pagamenti equi**: Gli smart contract gestiscono tutte le ricompense in modo trasparente.
* **Nessun rischio di operatore di pool**: Non c'è una parte centralizzata che può imbrogliare o ritardare i pagamenti.
* **Client locale**: Il miner Lithos funziona localmente per evitare latenza o share obsolete.
* **Difficoltà regolabile**: I miner possono regolare la difficoltà delle loro share per adattarsi all'hardware e alle preferenze di rischio.

---

## Difficoltà e Pagamenti

Il protocollo introduce un modello di pagamento unico:

* **Difficoltà maggiore** = meno pagamenti ma più grandi
* **Difficoltà minore** = pagamenti più frequenti ma più piccoli

I test nel mondo reale mostrano che le ricompense totali rimangono proporzionali al hashrate, ma i miner possono scegliere quanto stabili o volatili siano i loro guadagni.

---

## Token LITHOS

Il protocollo includerà un token nativo:

* **Guadagnato** dai miner come ricompensa per l'uso di pool decentralizzati.
* **Richiesto** per la collateralizzazione delle pool, collegando miner e prestatori.
* **Utilizzato** per prevenire spam, frodi e per aiutare con la sequenza dei rollup.

Maggiore informazione sarà rilasciata nel prossimo whitepaper.

---

## Ultimi Aggiornamenti sullo Sviluppo

* I contratti finali di prova di frode sono in fase di revisione
* L'implementazione dell'affitto di archiviazione è stata affinata per prevenire attacchi di sostituzione a livello di blocco
* Il contratto di difficoltà è in fase di costruzione per prevenire manipolazioni post-mining
* I test del contratto di rollup e le correzioni di stratum sono in corso
* Il codice sarà reso pubblico prima del lancio della testnet
* Ricerca in corso sull'integrazione di Bitcoin

Il lancio della testnet si avvicina, in attesa dell'integrazione finale del rollup e della stabilità di stratum.

---

## Cosa C'è Dopo

La roadmap di Lithos è strettamente legata al rilascio di Sigma 6.0 sulla mainnet di Ergo, che è un prerequisito per il lancio di Lithos.

Fino ad allora, il lavoro continua verso la prima testnet pubblica. L'ultimo tratto include:

* Completare e testare i contratti di rollup e prova di frode
* Finalizzare l'integrazione del client stratum
* Rilasciare il codice pubblico per la revisione da parte dei pari
* Continuare lo sviluppo dei contratti di emissione, configurazione e collateralizzazione
* Pianificare l'integrazione di BTC per una maggiore compatibilità del protocollo
* Finalizzare il whitepaper che delinea il design del sistema e la meccanica del token

Una volta raggiunti questi traguardi e attivato Sigma 6.0 sulla mainnet, Lithos sarà pronto per il lancio.

---

## Risorse

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [Demo di Lithos di ErgoHack](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
