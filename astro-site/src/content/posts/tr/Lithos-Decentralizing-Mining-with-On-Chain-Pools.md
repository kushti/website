---
cmsId: 2779
title: "Lithos: Madenciliği On-Chain Havuzlarla Merkeziyetsizleştirmek"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: tr
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T13:54:55.869"
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

Lithos, madencilik havuzlarının nasıl çalıştığını köklü bir şekilde değiştirmek için tasarlanmış yeni bir protokoldür; havuzları on-chain taşıyarak madencilere tam kontrol sağlar ve merkezi havuz operatörlerine olan ihtiyacı ortadan kaldırır. Önceki merkeziyetsiz madencilik girişimlerinin çoğunun aksine, Lithos verimli, ölçeklenebilir ve güvenli olacak şekilde inşa edilmiştir.

---

## Lithos Nedir?

Lithos, madencileri doğrudan Ergo üzerindeki akıllı sözleşmelere bağlayan merkeziyetsiz bir madencilik havuzu protokolüdür. Bu sözleşmeler, merkezi sunuculara veya yöneticilere güvenmeden her şeyi—iş gönderimi, zorluk yönetimi ve ödemeler—yönetir.

Protokol, madencilik donanımını Lithos istemcisine bağlamak için **Stratum** kullanır, ancak tüm ana mantık on-chain çalışır. Madenciler, akıllı sözleşmelere iş gönderir ve yeni bir kriptografik kanıt formatına dayalı olarak doğrudan ödeme alırlar.

**Blockchain bağımsız** olacak şekilde tasarlanmıştır; bu, gelecekte herhangi bir iş kanıtı zinciri için madencilik havuzlarını destekleyebileceği anlamına gelir. İş hesaplama ve depolama, ErgoScript akıllı sözleşmeleri kullanarak Ergo üzerinde gerçekleşirken, diğer zincirler için ödeme doğrulaması hafif köprüler gerektirecektir.

Lithos'un Bitcoin desteğini genişletmek için etkileşimli bir tasarım üzerinde ilk araştırmalar zaten devam etmektedir.

---

## Nasıl Çalışır

Lithos, iki ana fikri birleştirir: **Etkileşimsiz Pay Kanıtları (NISPs)** ve **teminatlı madencilik havuzları**, Ergo üzerindeki Katman 2 akıllı sözleşmeleri (özellikle, iyimser bir rollup) aracılığıyla uygulanır.

### NISPs: Etkileşim Olmadan Kanıt

Etkileşimsiz Pay Kanıtları, madencilerin bir sunucu ile gidip gelmeden iş kanıtı sunmalarına olanak tanır. Her madenci kendi zorluğunu seçer; bu, ne sıklıkla ödeme alacaklarını ve bu ödemelerin ne kadar büyük olacağını belirler.

Akıllı sözleşmeler bu kanıtları doğrular ve ödemeleri gerçekleştirir; merkezi bir koordinasyona ihtiyaç yoktur.

### Teminatlı Havuzlar

Lithos üzerindeki madencilik havuzları teminatla desteklenir. Madenciler ve madenci olmayanlar, bir havuzu teminatlandırmak için ERG veya LITHOS token'larını stake edebilir. Bu, aşağıdakileri sağlar:

* Tam işlem seçimi ile yerel blok üretimi
* Sansüre karşı direnç
* Ödeme adaletinin on-chain uygulanması
* Havuz oluşturucuları ile stake edenler arasında yerel bir DeFi kredi mekanizması

---

## Madenciler İçin Faydalar

* **Tam blok kontrolü**: Madenciler işlemleri seçer, demurrage ve MEV toplar.
* **Adil ödemeler**: Akıllı sözleşmeler tüm ödülleri şeffaf bir şekilde yönetir.
* **Havuz operatörü riski yok**: Ödemeleri aldatabilecek veya geciktirebilecek merkezi bir taraf yoktur.
* **Yerel istemci**: Lithos madencisi, gecikmeyi veya eski payları önlemek için yerel olarak çalışır.
* **Ayarlanabilir zorluk**: Madenciler, donanımlarına ve risk tercihlerine uygun olarak pay zorluklarını ayarlayabilir.

---

## Zorluk ve Ödemeler

Protokol, benzersiz bir ödeme modeli sunar:

* **Daha yüksek zorluk** = daha az ama daha büyük ödemeler
* **Daha düşük zorluk** = daha sık ama daha küçük ödemeler

Gerçek dünya testleri, toplam ödüllerin hash oranına orantılı kalmaya devam ettiğini gösteriyor, ancak madenciler kazançlarının ne kadar istikrarlı veya dalgalı olacağını seçebilirler.

---

## LITHOS Token

Protokol, yerel bir token içerecektir:

* **Madenciler tarafından merkeziyetsiz havuzları kullanma ödülü olarak kazanılır.**
* **Havuz teminatlandırması için gereklidir, madencileri ve kredi verenleri bağlar.**
* **Spam, dolandırıcılığı önlemek ve rollup sıralamasına yardımcı olmak için kullanılır.**

Daha fazla bilgi, yaklaşan beyaz kitapta yayınlanacaktır.

---

## Son Geliştirme Güncellemeleri

* Son dolandırıcılık kanıtı sözleşmeleri gözden geçiriliyor
* Blok düzeyinde değiştirme saldırılarını önlemek için depolama kirası uygulaması geliştirildi
* Madencilik sonrası manipülasyonu önlemek için zorluk sözleşmesi inşa ediliyor
* Rollup sözleşmesi testi ve stratum düzeltmeleri devam ediyor
* Testnet lansmanından önce kod tabanı halka açılacak
* Bitcoin entegrasyonu üzerine araştırmalar devam ediyor

Testnet lansmanı, son rollup entegrasyonu ve stratum stabilitesine bağlı olarak yaklaşmaktadır.

---

## Sırada Ne Var

Lithos yol haritası, Lithos'un canlıya geçmesi için bir ön koşul olan Sigma 6.0'ın Ergo ana ağında yayınlanmasıyla yakından ilişkilidir.

O zamana kadar, ilk kamu testnet'i için çalışmalar devam ediyor. Son aşama şunları içerir:

* Rollup ve dolandırıcılık kanıtı sözleşmelerinin tamamlanması ve test edilmesi
* Stratum istemci entegrasyonunun sonlandırılması
* Kamu kod tabanının akran incelemesi için yayınlanması
* Emisyon, yapılandırma ve teminat sözleşmelerinin geliştirilmesine devam edilmesi
* Daha geniş protokol uyumluluğu için BTC entegrasyonu planlanması
* Sistem tasarımını ve token mekaniklerini özetleyen beyaz kitabın sonlandırılması

Bu kilometre taşları aşıldığında ve Sigma 6.0 ana ağda etkinleştirildiğinde, Lithos lansmana hazır olacaktır.

---

## Kaynaklar

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [ErgoHack Lithos Demo](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
