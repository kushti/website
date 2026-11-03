---
cmsId: 2784
title: "Sigma 6.0: Daha Akıllı, Daha Esnek Ergo"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: tr
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T13:55:13.302"
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

**Sigma 6.0** Ergo blockchain için önerilen büyük bir güncellemedir. Geliştiricilere akıllı sözleşmeler oluşturmak için daha güçlü araçlar sunar, uzun süredir devam eden sınırlamaları giderir ve ağı gelecekteki iyileştirmelere hazırlar—tüm bunları mevcut sözleşmeler veya düğümlerle uyumluluğu bozmadan yapar.

Güncelleme, mevcut madencilik yapmayan düğümlerin çalışmaya devam edebileceği bir soft-fork aracılığıyla gerçekleşiyor, güncellenmiş madencilik düğümlerinin ise yeni özellikleri etkinleştirmesi ve uygulaması gerekiyor.

Madencilerin oylaması zaten başladı, destek şu anda %90'ın üzerinde ve erken testler için bir devnet aktif. Bu devam ederse, Sigma 6.0 Eylül 2025'in sonlarında etkinleşecek.


---

## Sigma 6.0 Neden Gerekiyor?

Ergo 2019'da piyasaya sürüldüğünden beri, akıllı sözleşme dili (ErgoTree) stabil kalmıştır. Bu istikrar, ağın güvenli kalmasına yardımcı oldu, ancak geliştiricilerin yeni özellikler eklemesini veya mantıklarını basitleştirmesini zorlaştırdı. Bazı iyileştirmeler, 2018'deki testnet günlerinde planlanmıştı ama ana ağa hiç ulaşmadı—şimdiye kadar.

Sigma 6.0 bu güncellemeleri öne çıkarıyor. Sözleşmede mümkün olanı genişletir, teknik sınırlamaları kaldırır ve gelecekteki yönetişim ve ölçeklenebilirlik iyileştirmeleri için bir yol açar.

---

## Ne Değişiyor?

* **Daha güçlü sayılar** için kriptografik ve finansal işlemler için yeni bir imzasız 256-bit tam sayı türü
* **Daha iyi veri yönetimi** için sözleşmelerde karmaşık türlerin serileştirilmesi ve serileştirilmesinde tam destek
* **Daha akıllı işlemler** diğer girdilerden bağlam değişkenlerine erişebilen daha koordineli mantık için
* **Yeni matematik ve liste araçları** bit düzeyinde işlemler, kaydırma ve `.get` ve `.startsWith` gibi geliştirilmiş toplama yöntemleri dahil
* **Yerleşik PoW doğrulaması** böylece sözleşmeler blok başlıklarını veya özel mesajları Autolykos2 ile kontrol edebilir
* **Yükseltilebilir yönetişim** ağın gelecekteki soft-forklar aracılığıyla yeni parametreler üzerinde oy kullanmasına izin verir, alt bloklar için destekle başlar



---

## Etkinleştirme Zaman Çizelgesi

Sigma 6.0, iki aşama gerektiren bir soft-fork etkinleştirme sürecinden geçiyor: bir oylama dönemi ve bir güncelleme dönemi. Her biri yaklaşık 45 gün sürer, bu da tam dağıtımın yaklaşık 90 gün alacağı anlamına gelir.

Madenciler Temmuz 2025'in başlarında oylamaya başladı ve destek zaten gereken %90 eşiğinin üzerinde. Eğer bu destek seviyesi devam ederse, güncelleme Eylül 2025'in sonlarında etkinleşecek.

Konsensüs erken sağlansa bile, protokol hala canlıya geçmeden önce tam oylama ve güncelleme dönemlerini bekler.

Sigma 6.0 için bir devnet zaten aktif ve geliştiriciler topluluk geliştirici sohbetinde nasıl katılacaklarına dair bilgi bulabilir. Temmuz'da, testnet üzerinde alt blok destekleyen madencilik düğümlerinin testine başlandı. Bunun ardından, Ağustos boyunca güvenlik etrafında resmi akıl yürütmeyi geliştirmek ve belgeleri iyileştirmek için odaklanılacak, böylece güncellemenin araştırma odaklı kalması sağlanacak. Tamamlandığında, dikkat potansiyel bir ana ağ dağıtımına yönlendirilebilir.

---

## Geliştiriciler İçin

Yeni özellikler ErgoTree sürüm 3 veya daha yüksek gerektirir. `Option`, `Header` ve `UnsignedBigInt` gibi bazı türler doğrudan kayıtlar veya bağlam uzantılarında saklanamaz, ancak bayt verisi olarak saklanabilir ve sözleşme içinde geri yüklenebilir.

Örnek kullanım [Sigma test paketi GitHub'da](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040) bulunabilir.

---

## Neden Önemli

Sigma 6.0, ağın piyasaya sürülmesinden bu yana Ergo'nun akıllı sözleşme katmanındaki en büyük güncellemedir. Geliştiricilere daha fazla özgürlük verir, tamamen yeni kullanım senaryolarını açar ve protokolün temellerini güçlendirir—tamamen geriye dönük uyumlu kalırken.

Madenci desteği şimdi %90'ın üzerinde olduğuna göre, güncelleme bu Eylül'de etkinleşmek üzere yolda. Sigma 6.0, Ergo'yu gelecekte daha güçlü bir konuma getiriyor.


## Kaynaklar

- Tam teknik öneri: [EIP-0050: Sigma 6.0 GitHub'da](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [6.0 Soft-Fork Önerisi (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Sigma 6.0 Dokümantasyon Özeti](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
