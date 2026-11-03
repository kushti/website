---
cmsId: 2711
title: "Sigma 6.0: Un Ergo più Intelligente e Flessibile"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: it
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T13:06:42.298"
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

**Sigma 6.0** è un importante aggiornamento proposto per la blockchain Ergo. Fornisce agli sviluppatori strumenti più potenti per costruire contratti intelligenti, risolve limitazioni di lunga data e prepara la rete per miglioramenti futuri, il tutto senza compromettere la compatibilità con contratti o nodi esistenti.

L'aggiornamento avviene tramite un soft-fork, il che significa che i nodi non minerari esistenti possono continuare a operare, mentre i nodi minerari aggiornati devono attivare e far rispettare le nuove funzionalità.

Il voto dei miner è già in corso, con un supporto attualmente superiore al 90%, e un devnet è attivo per test preliminari. Se questo continua, Sigma 6.0 si attiverà a fine settembre 2025.


---

## Perché è Necessario Sigma 6.0?

Da quando Ergo è stato lanciato nel 2019, il suo linguaggio di contratto intelligente (ErgoTree) è rimasto stabile. Quella stabilità ha aiutato la rete a rimanere sicura, ma ha anche reso più difficile per gli sviluppatori aggiungere nuove funzionalità o semplificare la loro logica. Alcuni miglioramenti erano previsti già ai tempi del testnet nel 2018, ma non sono mai arrivati al mainnet, fino ad ora.

Sigma 6.0 porta avanti quegli aggiornamenti. Espande ciò che è possibile in un contratto, rimuove limitazioni tecniche e apre la strada a futuri miglioramenti di governance e scalabilità.

---

## Cosa Cambia?

* **Numeri più potenti** con un nuovo tipo di intero non firmato a 256 bit per operazioni crittografiche e finanziarie
* **Migliore gestione dei dati** attraverso il pieno supporto per la serializzazione e deserializzazione di tipi complessi nei contratti
* **Transazioni più intelligenti** che possono accedere a variabili di contesto da altri input per una logica più coordinata
* **Nuovi strumenti matematici e di lista** inclusi operazioni bitwise, shifting e metodi di raccolta migliorati come `.get` e `.startsWith`
* **Validazione PoW integrata** in modo che i contratti possano controllare gli header dei blocchi o messaggi personalizzati contro Autolykos2
* **Governance aggiornabile** che consente alla rete di votare su nuovi parametri attraverso futuri soft-fork, a partire dal supporto per sub-blocchi



---

## Cronologia di Attivazione

Sigma 6.0 sta attraversando un processo di attivazione soft-fork che richiede due fasi: un periodo di voto e un periodo di aggiornamento. Ognuno dura circa 45 giorni, rendendo il rollout completo di circa 90 giorni.

I miner hanno iniziato a votare all'inizio di luglio 2025, e il supporto è già oltre la soglia richiesta del 90%. Se quel livello di supporto si mantiene, l'aggiornamento si attiverà a fine settembre 2025.

Anche se il consenso viene raggiunto presto, il protocollo attende comunque il completamento dei periodi di voto e aggiornamento prima di andare live.

Un devnet è già attivo per Sigma 6.0, e gli sviluppatori possono trovare informazioni su come partecipare nella chat dev della comunità. A luglio, è iniziato il test dei nodi minerari che supportano i sub-blocchi sul testnet. Dopo di ciò, l'attenzione si sposterà sul perfezionamento della documentazione e sul miglioramento del ragionamento formale sulla sicurezza per tutto agosto, assicurando che l'aggiornamento rimanga guidato dalla ricerca. Una volta completato, l'attenzione potrà spostarsi verso un potenziale deployment sul mainnet.

---

## Per gli Sviluppatori

Le nuove funzionalità richiedono ErgoTree versione 3 o superiore. Alcuni tipi—come `Option`, `Header` e `UnsignedBigInt`—non possono essere memorizzati direttamente nei registri o nelle estensioni di contesto, ma possono essere memorizzati come dati byte e ripristinati all'interno del contratto.

Esempi di utilizzo possono essere trovati nel [Sigma test suite su GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Perché è Importante

Sigma 6.0 è il più grande aggiornamento al livello di contratto intelligente di Ergo da quando la rete è stata lanciata. Offre agli sviluppatori maggiore libertà, sblocca casi d'uso completamente nuovi e rafforza le fondamenta del protocollo, rimanendo completamente retrocompatibile.

Con il supporto dei miner ora sopra il 90%, l'aggiornamento è sulla buona strada per attivarsi questo settembre. Sigma 6.0 mette Ergo in una posizione più forte per il futuro.


## Risorse

- Proposta tecnica completa: [EIP-0050: Sigma 6.0 su GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [Proposta di Soft-Fork 6.0 (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Sintesi della Documentazione di Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
