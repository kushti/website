---
cmsId: 2509
title: "Ergo e il meccanismo di consenso di Autolykos: parte I"
slug: Ergo-and-the-Autolykos-Consensus-Mechanism-Part-I
type: blog
locale: it
date: "2022-08-28T22:00:00"
publishedAt: "2022-08-29T13:43:33.453"
updatedAt: "2022-08-29T13:52:11.444"
author: Ergo Platform
tags: ["Explainers","Devs","Mining"]
spotlight: false
subtitle: null
image: {"url":"/uploads/News_blog_51_695882f84e.png","alt":"News blog 51.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_News_blog_51_695882f84e.png","hash":"large_News_blog_51_695882f84e","mime":"image/png","name":"large_News blog 51.png","path":null,"size":738.93,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_News_blog_51_695882f84e.png","hash":"small_News_blog_51_695882f84e","mime":"image/png","name":"small_News blog 51.png","path":null,"size":188.59,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_News_blog_51_695882f84e.png","hash":"medium_News_blog_51_695882f84e","mime":"image/png","name":"medium_News blog 51.png","path":null,"size":413.64,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_News_blog_51_695882f84e.png","hash":"thumbnail_News_blog_51_695882f84e","mime":"image/png","name":"thumbnail_News blog 51.png","path":null,"size":52.03,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

_Quello che segue è un'analisi tecnica approfondita del meccanismo di consenso di Ergo, Autolykos. Poiché si tratta di un argomento lungo e dettagliato, lo pubblicheremo in segmenti nelle prossime due settimane. Per la parte I, l'autore inizia a scomporre lo pseudocodice di block mining e ci guida attraverso la creazione della "lista R"._

## Parte I

Autolykos, il meccanismo di consenso Ergo, è uno dei pochi enigmi asimmetrici con memoria dura, a prova di lavoro che è ancora resistente all'ASIC, assicurando così che la blockchain sia mantenuta il più decentralizzata possibile. Autolykos si basa sul documento Equihash[1] e sul cosiddetto problema del compleanno. Per riassumere, il minatore ha il compito di trovare _k (=32)_ su _N_ elementi, in modo tale che l'hash della somma degli elementi sia inferiore al target. Il seguente pseudocodice spiega il processo di mining e questa analisi analizzerà ampiamente ogni riga poiché ci sono pochissime risorse online che spiegano Autolykos nella sua interezza.
 
<em>Autolykos Block Mining Pseudocode</em>
![Screenshot 2022-06-01 at 23.41.49.png](https://storage.googleapis.com/ergo-cms-media/Screenshot_2022_06_01_at_23_41_49_b2cdf73a2a/Screenshot_2022_06_01_at_23_41_49_b2cdf73a2)

Prima di discutere la procedura di block mining, l'algoritmo richiede innanzitutto un gruppo ciclico molto grande _G_ di ordine primo _q_ con generatore fisso _g_ ed elemento di identità _e_. Questo gruppo principale viene utilizzato per restituire numeri interi in _Z/qZ_ durante la funzione di hashing basata su Blake2b256.

<em>_Esempio gruppo ciclico con generatore z, elemento identità 1, ordine 6[2]_</em>
![senza nome (1).png](https://storage.googleapis.com/ergo-cms-media/unnamed_1_44d138eaaf/unnamed_1_44d138eaaf.png)

Non ci concentreremo ampiamente sul gruppo ciclico poiché copre solo un piccolo segmento dello schema PoW. Ora, affrontiamo il mining di Autolykos Block linea per linea.

 _Linea 1 – Ingresso h e m_

Il PoW inizia con i due input: l'altezza del blocco h e l'hash dell'intestazione del blocco in arrivo m. L'hash dell'intestazione del blocco è un hash dei componenti dell'intestazione del blocco, come l'hash dell'intestazione del blocco precedente, merkle root, nonce, ecc.
 
 _Riga 2 – Calcola lista R_
 
In primo luogo, è importante notare la notazione _H()_ nella riga 2. Questa notazione chiama la funzione di hashing Algoritmo 3. L'algoritmo 3 è una funzione hash basata su Blake2b256 ed è usata in Autolykos. L'algoritmo 3 afferma che se l'hash Blake degli input è inferiore a 2<sup>256</sup> (= 16<sup>64</sup> = 0xFFFFFFFFFFFF86633A9E8F1256D61ED5325EBF2A4B4366BA00000000000000000), viene restituito _hash.mod(q)_. In caso contrario, l'algoritmo 3 si ripete finché non raggiunge un hash numerico all'interno dell'intervallo valido. Per riferimento, si noti che _q_ è l'ordine primo del gruppo _G_, gli output hash Blake2b256 sono lunghi 256 bit e 64 cifre e l'algoritmo 3 restituirà sempre un hash numerico in _Z/qZ_.
 
<em>_Funzione hash basata su Blake2b256_</em>
![Screenshot 2022-06-02 at 03.17.18.png](https://storage.googleapis.com/ergo-cms-media/Screenshot_2022_06_02_at_03_17_18_ce898813d8/Screenshot_2022_06_02_at_03_17_18_ce898813d8.png)
 
Nella riga 2, il focus è la creazione di _list R_. _Lista R_ contiene valori _r_ che sono hash numerici a 31 byte creati da numeri interi in [0, N). I valori _r_ sono generati da _takeright(31,H(j||h||M))_. Le variabili sono le seguenti:

- _j_, intero in [0, N)
- _h_, altezza del blocco
- _M_, 8kb di dati costanti - riempimento per rallentare il calcolo dell'hash
 
 La sezione _takeRight(31,H(…))_ significa che dato _H(…)_, un output Blake2b256 a 32 byte, i 31 byte a destra (cioè in little endian (mentre altri algoritmi hash sono bit endian)) sono restituito. In altre parole, viene eliminato il byte più significativo, il byte più a sinistra. Di conseguenza, ogni valore _r_ corrisponde ai 31 byte meno significativi derivati ​​dall'output _H(j||h||M))_ a 32 byte. Ad esempio, se _j_ = 1, _r1 = takeRight(31,H(1||h||M))_._List R_ è costituito da _N_ elementi e può essere generato per ogni blocco incrementando _j_ di 1 _N-1_ volte. Poiché _H(…)_ restituisce _hash.mod(q)_, possiamo affermare che _list R_ consiste di _r0, 1, 2, 3 … N-1_ e _list R ⊂ Z/qZ_. Come affermato nel whitepaper di Autolykos v2[3], "_N_ elementi derivano dall'altezza e dalle costanti del blocco, a differenza di Autolykos v1, quindi i minatori possono ricalcolare facilmente i candidati al blocco ora (solo gli indici dipendono da essi)." In altre parole, _j_ è sempre in [0,N), _N_ è determinato da _h_, _M_ è sempre costante e _h_ cambia ogni blocco, l'unica variabile di cui un minatore ha bisogno per calcolare _list R_ è _h_.
 
_Lista R_ è memorizzato nella RAM. In Autolykos, _N_ = 2<sup>26</sup> (67.108.864 interi) viene utilizzato nell'implementazione per ogni blocco prima di 614400. Pertanto, il requisito di memoria per i blocchi prima del blocco 614400 è (226 * 31 byte =) 2,08 GB. N è aumentato per la prima volta nel blocco 614400. Post blocco 614400, ogni 51200 blocchi, _N_ aumenta del 5%. In altre parole, il fabbisogno di memoria di un minatore Ergo aumenta del 5% ogni ~71 giorni. Sul blocco 4198400 il valore di _N_ diventa costante e uguale a 2.143.944.600[4]. Si noti che gli ultimi 2 valori elencati nella tabella devono essere 2.143.944.600 e non 2.147.387.550. Dopo il blocco 4198400, il requisito di archiviazione di _list R_ sarà (31 byte * 2.143.944.600) = 66,46 GB.

<em>_N elementi basati sull'altezza del blocco_</em>
![senza nome (3).png](https://storage.googleapis.com/ergo-cms-media/unnamed_3_978ffb3d8a/unnamed_3_978ffb3d8a.png)
<em>_N elementi, Ethash vs. Autolykos_</em>
 
Autolykos è come Ethash nel senso che l'altezza del blocco determina _N_ elementi da memorizzare nella RAM. Con Autolykos, l'altezza del blocco determina _N_ hash numerici a 31 byte da memorizzare. Con Ethash, l'altezza del blocco determina _N_ 128B pagine DAG da memorizzare. Potresti chiederti, se si verifica un blocco Ergo ogni 2 minuti, in che modo i minatori Ergo sono in grado di generare un set di dati di oltre 2 GB così rapidamente? I minatori di Ethereum rigenerano il DAG solo ogni 100 ore perché ci vuole così tanto tempo... Per un minatore Ergo, l'onere per calcolare _list R_ è _N_ istanze dell'algoritmo 3; ricorda, ogni _r valore_ è calcolato come _takeRight(31,H(j||h||M))_. Tuttavia, una GPU può farlo molto rapidamente. Le GPU generalmente hanno multiprocessori da 32 o 64 larghezze, il che significa che è possibile eseguire 32 o 64 istanze dell'algoritmo 3 contemporaneamente a seconda della GPU. Ad esempio, una GPU da 32 pollici come l'RTX570 può riempire l'_elenco R_ in pochi secondi.

**Per la Parte II**, riprenderemo da qui e continueremo la spiegazione di Autolykos v2. Resta sintonizzato sui canali dei social media di Ergo per gli aggiornamenti sulla Parte II di questa serie.


[1] https://www.researchgate.net/publication/316904748_Equihash_Asymmetric_Proof-of-Work_Based_on_the_Generalized_Birthday_Problem
[2] https://en.wikipedia.org/wiki/Cyclic_group#/media/File:Cyclic_group.svg
[3] https://www.docdroid.net/mcoitvK/ergopow-pdf
[4] https://www.ergoforum.org/t/autolykos-v-2-details/480
[5] Ringraziamo Wolf9466#9466 su Discord
