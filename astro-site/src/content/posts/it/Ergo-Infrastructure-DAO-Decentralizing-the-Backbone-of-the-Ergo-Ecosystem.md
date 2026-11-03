---
cmsId: 2707
title: "Ergo Infrastructure DAO: Decentralizzare la Spina Dorsale dell'Ecosistema Ergo"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: it
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T12:56:15.886"
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

La missione di Ergo è sempre stata radicata nella decentralizzazione, non solo a livello di consenso, ma in tutto lo stack. Con il lancio del **Ergo Infrastructure DAO (InfraDAO)**, quella visione si sta espandendo nei servizi e nell'infrastruttura che alimentano l'ecosistema ogni giorno.

L'InfraDAO è ora ufficialmente attivo su [Paideia](https://app.paideia.im/ergoinfradao), dopo un voto di governance di successo. Quello che è iniziato come una proposta di base all'interno del **gruppo di contributori Sigmanauts**—guidato dal Sigmanaut preferito da tutti, **qx**, noto per le sue apparizioni negli AMA di Ergo e ovunque nell'ecosistema—si è ora evoluto in un'iniziativa di proprietà della comunità che ridefinirà come i servizi fondamentali vengono forniti e mantenuti.

---

## Cos'è l'Ergo Infrastructure DAO?

L'InfraDAO è una rete decentralizzata e gestita da pari di fornitori di infrastruttura responsabili della manutenzione dei servizi chiave nell'ecosistema Ergo. Questo include:

* Nodi completi e API
* Esploratori di blockchain
* Infrastruttura di testnet e mining
* Documentazione e specchi della comunità
* Strumenti come SigmaSpace, ErgoDocs e Sigmaverse
* Futuro hosting e gestione di ergoplatform.org

Questo DAO ridurrà la dipendenza dalla Fondazione Ergo e garantirà che l'infrastruttura sia resistente alla censura, tollerante ai guasti e governata in modo trasparente.

---

## Perché è Importante

Fino ad ora, gran parte dell'infrastruttura di Ergo, inclusi gli endpoint pubblici, gli esploratori di blocchi e la documentazione ospitata, è stata mantenuta dalla **Fondazione Ergo** e successivamente dal **Developer DAO**. Sebbene questo modello abbia fornito stabilità e affidabilità iniziali, ha anche creato punti di dipendenza centralizzati.

L'InfraDAO cambia tutto ciò distribuendo le responsabilità attraverso una rete globale e autogestita di contributori che gestiscono e mantengono lo stack. Garantisce:

* Servizi più resilienti e geograficamente distribuiti
* Sostenibilità a lungo termine senza dipendenza dalla Fondazione
* Controllo della comunità sulla governance e sul dispiegamento
* Un modello operativo veramente decentralizzato che si allinea ai principi fondamentali di Ergo

---

## Cosa è Già Attivo e Migrato

L'InfraDAO ha già fatto progressi. Tre macchine ad alte prestazioni, bilanciate su più endpoint, sono ora attive e sincronizzate utilizzando il backend di archiviazione più veloce **RocksDB**:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (compatibile con HTTPS per i portafogli)

Questi endpoint sono **completamente compatibili con portafogli mobili e basati su browser** e fungono da base per l'accesso decentralizzato alla rete Ergo.

Puoi monitorare il tempo di attività e la disponibilità dei peer tramite il dashboard pubblico:
[Ergo Infrastructure DAO – Dashboard di Stato in Tempo Reale](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Bilanciamento del Carico e Operatori della Comunità

Mentre "P2P" qui si riferisce vagamente a una rete distribuita, l'infrastruttura è veramente gestita dalla comunità. Il bilanciamento del carico iniziale includerà macchine operate da:

* qx (tre nodi)
* Jumei
* 2ndTL Mining
* Sheetoshi

Queste sono distribuite strategicamente per supportare il bilanciamento del carico basato sulla geolocalizzazione globale. Ulteriori macchine della comunità saranno aggiunte man mano che il DAO si espande, formando una spina dorsale completamente decentralizzata e globalmente resiliente.

Il processo di selezione per nuovi partecipanti comporterà:

1. Un **indirizzo IP statico**
2. **Larghezza di banda di upload sufficiente**
3. Una **comprensione di base dell'infrastruttura** (o capacità di seguire le istruzioni di configurazione da riga di comando)
4. Un **indirizzo postale** per la spedizione di un nodo o esploratore preconfigurato (fornito gratuitamente)

---

## Dall'Idea all'Esecuzione: Costruito dalla Comunità

L'InfraDAO è iniziato come un'iniziativa interna tra i Sigmanauts. Riconoscendo la necessità di decentralizzare l'infrastruttura, **qx** ha proposto la creazione di un DAO e ha guidato il suo dispiegamento.

Nel luglio 2025, una proposta che richiedeva **50.000 \$PAIDEIA** è stata approvata con successo su Paideia. Questi fondi coprono i costi di avvio come la preparazione delle macchine, la spedizione e l'inserimento dei contributori. Il token del DAO è ora attivo e la governance è attiva.

---

## Requisiti Tecnici

**Requisiti Hardware e di Rete:**
* Larghezza di banda di upload: 50 Mbps o più
* Latenza: \~100ms o inferiore alla tua regione locale
* IPv4: IP statico o dinamico a lungo termine
* Specifiche della macchina:
  * Ubuntu OS
  * 16GB di RAM (32GB raccomandati)
  * 1TB SSD
  * Competenze in Docker, tmux, accesso SSH e modifica della configurazione

Questi sistemi sono ottimizzati per alta disponibilità e attualmente servono traffico di produzione attraverso endpoint bilanciati.

---

## Non Solo Hosting: Espansione Futura

Mentre la prima fase dell'InfraDAO si concentra sull'hosting, crescerà per supportare:

* Manutenzione e monitoraggio dell'infrastruttura
* Aggiornamenti di dipendenza e sicurezza
* Orchestrazione Docker e distribuzione software
* Gestione CMS per ergoplatform.org
* Pubblicazione e aggiornamenti della documentazione
* Servizi di hosting come SigmaSpace, ErgoDocs e Sigmaverse

Questo apre la partecipazione a sysadmin, sviluppatori backend, manutentori di contenuti e altri contributori oltre agli operatori di nodi.

---

## Stato Attuale

* DAO attivo su Paideia
* Proposta di finanziamento iniziale approvata
* Token coniato e voto attivo
* Prima ondata di infrastruttura attiva e operativa
* Dashboard di monitoraggio pubblico online
* Prossimo: ulteriori contributori ed espansione globale

---

## Come Partecipare

Se sei tecnicamente capace e vuoi gestire l'infrastruttura, mantenere il tempo di attività, aggiornare i siti o partecipare alla governance del DAO, ora è il momento di intervenire.

→ Unisciti al DAO o segui le proposte qui:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Monitora lo stato dell'infrastruttura:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Considerazioni Finali

Il lancio dell'Ergo Infrastructure DAO è un passo importante verso la decentralizzazione a tutto stack, l'autonomia, il controllo della comunità e la sostenibilità di un ecosistema blockchain guidato da una missione.

Con la governance on-chain, l'infrastruttura di proprietà della comunità e i contributori globali già attivi nei servizi critici, Ergo sta mostrando come appare la vera decentralizzazione.

Aiuta a costruire le fondamenta. Partecipa.
