---
cmsId: 2532
title: EIP37 Hardfork
slug: EIP37-Hard-Fork
type: blog
locale: it
date: "2022-10-03T22:00:00"
publishedAt: "2022-10-12T07:42:05.492"
updatedAt: "2022-10-12T07:42:05.512"
author: Ergo Platform
tags: ["Mining community"]
spotlight: true
subtitle: null
image: {"url":"/uploads/News_blog_10_27f0dc6c61.png","alt":"News blog 10.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_10_27f0dc6c61.png","hash":"large_News_blog_10_27f0dc6c61","mime":"image/png","name":"large_News blog 10.png","path":null,"size":763.36,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_10_27f0dc6c61.png","hash":"small_News_blog_10_27f0dc6c61","mime":"image/png","name":"small_News blog 10.png","path":null,"size":184.71,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_10_27f0dc6c61.png","hash":"medium_News_blog_10_27f0dc6c61","mime":"image/png","name":"medium_News blog 10.png","path":null,"size":418.8,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_10_27f0dc6c61.png","hash":"thumbnail_News_blog_10_27f0dc6c61","mime":"image/png","name":"thumbnail_News blog 10.png","path":null,"size":48.02,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Dopo il merge di Ethereum, l'industria del mining di criptovalute ha assistito a un impressionante riorientamento del potere di hashing su diversi blockchain Proof of Work. La rete Ergo ha subito picchi improvvisi e drastici nell'hashrate generale della rete. Sebbene l'aggiunta di nuovi minatori sia stato un evento gradito, anche la difficoltà della rete è aumentata notevolmente. Quando le acque si sono calmate, è diventato chiaro che gli ex minatori di Ethereum si stavano unendo e testando diverse reti per il loro hardware. Con l'improvviso picco dell'hashrate di Ergo, anche la difficoltà della rete è aumentata. Quando i minatori se ne sono andati, l'hashrate si è abbassato. Tuttavia, la difficoltà NON è diminuita proporzionalmente con la diminuzione dell'hashrate di rete. Ciò è dovuto ad alcune funzionalità che erano in atto per proteggere la sicurezza della rete. Nel tentativo di proteggere la rete, la difficoltà della rete cambierebbe solo con ogni nuova epoca. Come risultato di questo scenario, molti minatori fedeli di Ergo sono rimasti con tempi di blocco estremamente grandi e ricompense di mining molto inferiori.

## Una soluzione al problema: EIP37

Dopo aver consultato un campione della comunità mineraria, la Fondazione Ergo ha rilasciato un client di riferimento immediato per affrontare questo problema. EIP37 mirava a ridurre la quantità di tempo tra le epoche a 128 blocchi, limitando anche qualsiasi modifica alla difficoltà della rete a non più del 50%.

Il Core Developer della Ergo Foundation, Alex Chepurnoy (alias Kushti) ha pubblicato quanto segue su [EIP37 on the Ergo Github](https://github.com/ergoplatform/eips/pull/79/files):

“Proponiamo di rendere il riadattamento della difficoltà attuale più reattivo e più fluido accorciando la lunghezza dell'epoca, amplificando il peso dell'ultima epoca e ponendo alcuni limiti al cambio di difficoltà come segue.

1. Lunghezza epoca da impostare su 128 blocchi.
2. Calcoliamo la difficoltà "predittiva" in base a 8 epoche, 128 blocchi ciascuna e la difficoltà "classica" come fatto in Bitcoin. Limitiamo il cambiamento della difficoltà predittiva in modo che non possa mai essere modificato di oltre il 50% per epoca. Quindi prendiamo la media dalle difficoltà classiche e predittive.
3. Limitiamo il cambiamento in modo che la difficoltà non possa mai essere modificata di oltre il 50% per epoca.

## Governance: la comunità mineraria vota su EIP37

Poiché la piattaforma Ergo è gestita dai minatori, qualsiasi modifica (inclusa la proposta di hard fork EIP37) deve essere votata dalla comunità mineraria. Una volta iniziata la votazione, è stata necessaria una super maggioranza del 90% per passare la votazione e avviare l'hard fork EIP37. Quella che segue è una ripartizione di come i minatori e i pool minerari hanno potuto votare.

Ci sono quattro client di riferimento separati di cui gli elettori devono essere a conoscenza:

**4.0.100**: questa versione supportava il nuovo algoritmo di regolazione della difficoltà e l'attivazione. I minatori che estraggono con un nodo completo (e hanno utilizzato questa versione) dovevano impostare un valore di "6 = 2400" nella configurazione del client. Per maggiori dettagli su come sono state delineate queste istruzioni, vedere le istruzioni complete su Ergo Github.

**4.0.101**: questa versione ha votato automaticamente per l'implementazione EIP37.

**4.0.102**: questa versione consentiva agli utenti di specificare il proprio voto durante l'epoca precedente.

**4.0.103**: questa versione ha votato automaticamente per EIP37 durante l'ultima epoca.

I client di riferimento 4.0.100 e 4.0.101 avrebbero iniziato a calcolare i voti all'inizio dell'epoca corrente (iniziata da 844800), mentre le versioni 4.0.102 e 4.0.103 consentivano il voto immediato.

Il client di riferimento conteneva un meccanismo che scansionava la catena di voti e, una volta raggiunta la necessaria super maggioranza del 90%, si attivava l'hard fork.

## Il futuro dell'Ergo Mining

I minatori sono caldamente incoraggiati a partecipare alle discussioni che influiscono sul futuro di Ergo e sul protocollo minerario. Se sei interessato a partecipare, queste discussioni si svolgono principalmente su Ergo Github. Per quanto riguarda il futuro, Joseph Armeanio, membro del consiglio di Ergo Foundation, ha accennato ad alcuni piani in una recente [intervista con Hobbyist Miner](https://www.youtube.com/watch?v=UIvCHM7UxmQ&ab_channel=TheHobbyistMiner). Ha indicato che la Ergo Foundation sta discutendo piani per borse di ricerca che esploreranno i miglioramenti del mining della GPU man mano che la rete e l'ecosistema crescono.

L'EIP37 è ufficialmente passato e la difficoltà di rete è notevolmente diminuita da un picco di 22,67P (subito dopo l'unione di Ethereum) a 7,25P. Nel frattempo, l'hashrate della rete di Ergo è cresciuto costantemente negli ultimi giorni e ora si attesta a circa 50TH/s.

Il protocollo minerario sta mostrando una stabilità incoraggiante e l'ecosistema continua a mostrare una crescita positiva. Se non conosci Ergo, assicurati di dare un'occhiata a ErgoHack V che è attualmente in corso. Questo ultimo hackathon si concentra principalmente sui partecipanti che creano strumenti e dApp incentrati sul mining e sul conio. Restate sintonizzati sui nostri canali social per tutti i dettagli!
