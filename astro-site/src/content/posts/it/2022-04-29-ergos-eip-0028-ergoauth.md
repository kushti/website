---
cmsId: 2513
title: "EIP-0028 di Ergo: ErgoAuth"
slug: 2022-04-29-ergos-eip-0028-ergoauth
type: blog
locale: it
date: "2022-09-04T22:00:00"
publishedAt: "2022-10-12T07:43:20.903"
updatedAt: "2022-10-12T07:43:20.923"
author: Ergoplatform
tags: ["Tooling","Devs"]
spotlight: true
subtitle: null
image: null
authorPhoto: /img/uploads/1762.png
blogPhoto: /img/uploads/news-blog-31.png
externalUrl: null
superseded: false
---

Quando si parla di blockchain, è importante ricordare che i wallet sono completamente anonimi. Su Ergo, non sai chi possiede un particolare portafoglio. Poiché tutte le transazioni sono pubbliche, questo è un aspetto importante dei portafogli blockchain: se sai chi possiede un portafoglio, puoi vedere tutte le sue risorse, transazioni e qualsiasi altro portafoglio con cui interagiscono.

Detto questo, ci sono situazioni in cui potrebbe essere utile, o addirittura necessario, dimostrare chi ha accesso a un determinato portafoglio. Uno scenario possibile è quando si interagisce con i giochi sulla blockchain. Una situazione comune può verificarsi quando i gettoni vengono utilizzati come elementi di gioco e solo i giocatori che possiedono determinati gettoni possono partecipare ad azioni specifiche. Come si può sapere se un giocatore ha effettivamente accesso a un portafoglio che finge di avere?

In questa situazione, i giochi possono fare affidamento solo sulla richiesta al giocatore di effettuare una transazione dal portafoglio che possiede il token in questione. Questo approccio ha alcuni ovvi inconvenienti: il giocatore deve effettuare una transazione e pagare le commissioni di transazione e la transazione potrebbe richiedere diversi minuti per l'estrazione.

Per risolvere questo problema, gli sviluppatori principali di Ergo hanno proposto EIP-0028 ErgoAuth. È già implementato in Appkit, l'SDK di Ergo, e sarà integrato nella prossima versione 1.9 dell'app Ergo Wallet.

ErgoAuth aggira la necessità di effettuare una transazione sulla blockchain definendo un protocollo simile direttamente tra un'applicazione wallet e un server gestito dalla parte che necessita di autenticare un utente. Funziona come segue:

Il gioco (o dApp, sito Web, ecc.), volendo verificare se un utente ha accesso a un determinato portafoglio, mostra un codice QR da scansionare con un'app portafoglio o presenta un pulsante per aprire un'applicazione portafoglio.
Ciò farà sì che l'applicazione del portafoglio contatti il ​​server del gioco e richieda informazioni specifiche. Il portafoglio deve sapere quale indirizzo deve autenticare l'utente, poiché possono esserci più indirizzi.
L'applicazione del portafoglio presenterà all'utente una schermata e chiederà se desidera approvare l'accesso. Quando l'utente conferma, l'applicazione wallet firmerà il messaggio inviato dal server di gioco con le chiavi private e rispedirà il messaggio firmato.
Il server di gioco può ora verificare (tramite Appkit o una propria implementazione) se la prova inviata dall'utente è valida e se l'utente ha accesso al portafoglio.
Gli sviluppatori possono iniziare subito a integrare ErgoAuth nelle loro applicazioni. Per informazioni più dettagliate, fare riferimento a EIP-0028 e ai collegamenti di esempio di codice corrispondenti.
