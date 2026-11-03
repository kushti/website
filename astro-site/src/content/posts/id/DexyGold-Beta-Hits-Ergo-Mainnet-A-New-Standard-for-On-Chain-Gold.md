---
cmsId: 2755
title: "DexyGold Beta Mencapai Ergo Mainnet: Standar Baru untuk Emas On-Chain"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: id
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T13:45:28.156"
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

### Tonggak Sejarah untuk Ergo DeFi

Beta mainnet publik DexyGold sudah aktif dan sudah memindahkan nilai nyata. Koin ini menargetkan harga USD untuk satu ons troy emas, bergantung pada dua kontrak inti:

* **Kontrak Bank** — mencetak DexyGold ketika pengguna menyetor ERG pada harga oracle.
* **Kolam Likuiditas AMM** — memungkinkan trader menemukan tarif pasar dan menegakkan batasan yang melindungi cadangan.

Kedua kontrak menggunakan [**Gold v2 oracle feed**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg) yang baru, yang memperbarui lebih cepat dan menambahkan perlindungan ekstra terhadap manipulasi. Dengan DexyGold yang berjalan baik, komunitas kini bersiap untuk memperbarui kolam oracle USD ke v2 dan meluncurkan **GluonUSD** dan **DexyUSD**. Sebuah grup Telegram sedang dibentuk untuk orang-orang yang ingin menjalankan oracle v2, dan bantuan untuk menguji pembaruan kolam oracle di testnet juga sangat dibutuhkan.

---

### Mengapa Mengincar Emas, Bukan Dolar?

Emas menghindari risiko pemerintah tunggal dan telah menjaga keunggulan terhadap inflasi jangka panjang selama berabad-abad. Stablecoin yang dipatok emas melengkapi tumpukan DeFi Ergo, memberikan pengguna perlindungan yang melengkapi pelacak USD seperti SigmaUSD.

---

### Di Balik Layar

| Bagian Mesin       | Peran dalam Patokan                                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kontrak Bank**   | Mencetak DexyGold untuk ERG pada harga oracle. Pasokan hanya tumbuh ketika pengguna menambahkan ERG.                                                                 |
| **Kolam Likuiditas** | Menerbitkan harga DexyGold / ERG secara langsung. Matematika kolam mencerminkan Uniswap V2 dan memblokir penukaran token LP jika harga oracle turun lebih dari 10 % di bawah harga kolam. |
| **Loop Arbitrase** | *Oracle > Kolam* → pengguna mencetak DexyGold dan menjual ke kolam. *Oracle < Kolam* → bank menghabiskan ERG yang tidak terpakai dan membeli DexyGold setelah penundaan 50 blok.                  |
| **Katup Keamanan** | Penguncian waktu pada DexyGold baru, penguncian ERG di bank, dan jeda pencetakan otomatis ketika keuntungan terlihat berlebihan.                                                     |

---

### Cara Mencoba DexyGold Hari Ini

1. **Instal [Nautilus](https://nautiluswallet.io/)** dan pilih jaringan mainnet.
2. **Tambahkan saldo ERG yang moderat** melalui pertukaran, pembayaran penambang, atau [jembatan Rosen](https://app.rosenbridge.io/).
3. **Buka [Crystal Pool](https://crystalpool.cc)**—satu-satunya tempat untuk mencetak DexyGold dan memperdagangkannya. Mencetak di UI Bank, menyediakan likuiditas, atau menempatkan pesanan batas.
4. **Mulai kecil:** Kontrak sudah aktif dan memegang nilai nyata sementara audit dan penyesuaian parameter terus berlanjut. Pesanan diselesaikan di on-chain dalam hitungan detik.


#### Crystal Pool dalam Fokus

Crystal Pool adalah DEX Layer-1 baru di blockchain Ergo yang fokus pada interaksi kontrak pintar langsung dengan likuiditas on-chain terbaik yang tersedia. Ini menawarkan:

* Pencocokan Pesanan Langsung di on-chain tanpa buku pesanan off-chain
* Perdagangan Multi-Token, Multi-Penjual dalam satu transaksi
* Rantai Transaksi Waktu Nyata, memungkinkan perdagangan tanpa hambatan untuk ratusan pengguna secara paralel
* Grafik Terintegrasi dan Riwayat Perdagangan, menunjukkan kesepakatan Anda langsung di grafik harga

Akan datang pada akhir 2025: Kolam Likuiditas Pesanan Batas, memungkinkan strategi pembuatan pasar yang lebih dalam.

Crystal Pool bertujuan untuk menjadi lapisan likuiditas inti untuk Ergo DeFi—sederhana, cepat, dan transparan.


---

### Peta Jalan DexyGold

* **Audit Kedua** untuk menguji loop arbitrase dan meningkatkan penyesuaian parameter.
* **Target Rasio Jaminan** di atas 150 persen saat biaya pencetakan membangun cadangan di bank.
* **Peluncuran Kolam Oracle USD v2** dengan operator komunitas dan pengujian di testnet.
* **Peluncuran GluonUSD dan DexyUSD** setelah peningkatan umpan oracle USD, memperluas suite stablecoin.

---

### Adopsi Gold v2 Oracle Meningkat

DexyGold adalah proyek kedua yang mengadopsi umpan Gold v2. Yang pertama, **gluon.gold**, baru-baru ini meluncurkan [antarmuka beta yang diperbarui](https://gluon.gold/reactor) yang melacak biaya, rasio cadangan, TVL, volume, dan transaksi yang tertunda dengan lebih jelas—sebuah bukti betapa cepatnya oracle baru ini menjadi tulang punggung produk berbasis emas Ergo.

---

### Bergabunglah dalam Percakapan

Baca draf kertas putih Dexy, bagikan umpan balik di **r/ergonauts**, dan bergabunglah dengan komunitas di [Telegram](http://t.me/dexygold) atau [Discord](https://discord.gg/xjfnk9A2cU). Pengujian dunia nyata dan laporan bug Anda akan membantu membentuk parameter akhir dari keluarga stablecoin yang didukung emas dan dolar yang tangguh di Ergo.
