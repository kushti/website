---
cmsId: 2783
title: "DexyGold Beta Ergo Ana Ağaçta: Zincir Üzerinde Altın için Yeni Bir Standart"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: tr
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T13:55:12.48"
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

### Ergo DeFi için Bir Dönüm Noktası

DexyGold’un halka açık ana ağ beta sürümü yayında ve gerçek değeri hareket ettiriyor. Coin, bir troy ons altının USD fiyatını hedefliyor ve iki ana sözleşmeye dayanıyor:

* **Banka Sözleşmesi** — Kullanıcılar ERG'yi oracle fiyatında yatırdığında DexyGold basar.
* **AMM Likidite Havuzu** — Tüccarların piyasa oranını keşfetmesine olanak tanır ve rezervleri koruyan güvenlik önlemleri uygular.

Her iki sözleşme de daha hızlı güncellenen ve manipülasyona karşı ek korumalar ekleyen yeni [**Gold v2 oracle feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg) kullanıyor. DexyGold iyi bir performans gösterdiği için, topluluk şimdi USD oracle havuzunu v2'ye güncellemeye ve **GluonUSD** ile **DexyUSD**'yi başlatmaya hazırlanıyor. V2 oracle'ları çalıştırmak isteyenler için bir Telegram grubu oluşturuluyor ve testnet'teki oracle havuzu güncellemesini test etme yardımı da çok gerekli.

---

### Neden Dolar Değil Altın Hedefleniyor?

Altın, tek bir hükümet riskinden kaçınır ve yüzyıllardır uzun vadeli enflasyondan önde kalmıştır. Altına sabitlenmiş bir stablecoin, Ergo’nun DeFi yığınını tamamlayarak kullanıcılara SigmaUSD gibi USD izleyicilerini tamamlayan bir koruma sağlar.

---

### Motorun İçinde

| Motor Parçası      | Peg'deki Rolü                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Banka Sözleşmesi**  | Oracle fiyatında ERG için DexyGold basar. Arz yalnızca kullanıcılar ERG eklediğinde artar.                                                                                 |
| **Likidite Havuzu** | Canlı bir DexyGold / ERG fiyatı yayınlar. Havuz matematiği Uniswap V2'yi yansıtır ve oracle fiyatı havuz fiyatının %10'undan fazla düşerse LP-token geri alımını engeller. |
| **Arbitraj Döngüsü** | *Oracle > Havuz* → kullanıcılar DexyGold basar ve havuza satar. *Oracle < Havuz* → banka boşta kalan ERG'yi harcar ve 50 blok gecikmeyle DexyGold satın alır.                  |
| **Güvenlik Valfleri**  | Yeni DexyGold için zaman kilitleri, bankada ERG kilitleri ve karlar aşırı görünürse otomatik mint-durdurma.                                                     |

---

### DexyGold'u Bugün Nasıl Deneyebilirsiniz

1. **[Nautilus](https://nautiluswallet.io/)**'u yükleyin ve ana ağ ağını seçin.
2. **Borsa, madenci ödemesi veya [Rosen köprüsü](https://app.rosenbridge.io/) aracılığıyla mütevazı bir ERG bakiyesi ekleyin.**
3. **[Crystal Pool](https://crystalpool.cc)**'u açın—DexyGold basmak ve ticaret yapmak için tek yer. Banka arayüzünde mint yapın, likidite sağlayın veya limit emirleri verin.
4. **Küçük başlayın:** Sözleşmeler yayında ve gerçek değeri tutuyor, denetimler ve parametre ayarlamaları devam ediyor. Emirler zincir üzerinde saniyeler içinde sonuçlanır.


#### Crystal Pool'a Dikkat

Crystal Pool, Ergo blockchain üzerinde doğrudan akıllı sözleşme etkileşimine odaklanan yeni bir Layer-1 DEX'tir ve en iyi mevcut zincir içi likiditeyi sunar. Sunar:

* Zincir üzerinde doğrudan emir eşleştirme, off-chain emir defterleri olmadan
* Tek bir işlemde Çoklu Token, Çoklu Satıcı Ticaretleri
* Gerçek Zamanlı İşlem Zincirleme, yüzlerce kullanıcı için kesintisiz ticaret sağlar
* Entegre Grafik ve Ticaret Geçmişi, işlemlerinizi doğrudan fiyat grafiklerinde gösterir

2025'te gelecek: Derin piyasa yapma stratejilerini mümkün kılan Limit Emir Likidite Havuzları.

Crystal Pool, Ergo DeFi için temel likidite katmanı olmayı hedefliyor—basit, hızlı ve şeffaf.


---

### DexyGold Yol Haritası

* **İkinci Denetim Geçişi**, arbitraj döngüsünü stres testine tabi tutmak ve parametre ayarlamalarını geliştirmek için.
* **Teminat Oranı Hedefi**, bankada rezerv biriktirirken mintleme ücretlerinin %150'nin üzerinde olması.
* **USD Oracle Havuzu v2** dağıtımı, topluluk operatörleri ile ve testnet'te test edilmesi.
* **GluonUSD ve DexyUSD** lansmanları, USD oracle feed güncellemesinden sonra, stablecoin yelpazesini genişletiyor.

---

### Gold v2 Oracle Benimsemesi Artıyor

DexyGold, Gold v2 feed'ini benimseyen ikinci projedir. İlk olan **gluon.gold**, yakın zamanda [yenilenmiş beta ön yüzünü](https://gluon.gold/reactor) tanıttı ve ücretleri, rezerv oranını, TVL'yi, hacmi ve bekleyen işlemleri daha net bir şekilde takip ediyor—bu, yeni oracle'ın Ergo’nun altın tabanlı ürünlerinin belkemiği haline gelme hızını gösteriyor.

---

### Tartışmaya Katılın

Dexy beyaz kağıdının taslağını okuyun, **r/ergonauts** üzerinde geri bildirim paylaşın ve topluluğa [Telegram](http://t.me/dexygold) veya [Discord](https://discord.gg/xjfnk9A2cU) üzerinden katılın. Gerçek dünya testleriniz ve hata raporlarınız, Ergo'da dayanıklı bir altın ve dolar destekli stablecoin ailesinin nihai parametrelerini şekillendirmeye yardımcı olacaktır.
