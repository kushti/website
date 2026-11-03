---
cmsId: 2753
title: "Lithos: Mendekentralisasi Penambangan dengan Kolam On-Chain"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: id
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T13:45:25.092"
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

Lithos adalah protokol baru yang dirancang untuk merombak cara kerja kolam penambangan dengan memindahkannya ke on-chain, memberikan kontrol penuh kepada penambang, dan menghilangkan kebutuhan akan operator kolam terpusat.

---

## Apa Itu Lithos?

Lithos adalah protokol kolam penambangan terdesentralisasi yang menghubungkan penambang langsung ke kontrak pintar di Ergo. Kontrak ini menangani semuanya—pengiriman kerja, manajemen kesulitan, dan pembayaran—tanpa bergantung pada server atau kustodian terpusat.

Protokol ini menggunakan **Stratum** untuk menghubungkan perangkat keras penambangan ke klien Lithos, tetapi semua logika kunci berjalan di on-chain. Penambang mengirimkan pekerjaan ke kontrak pintar dan dibayar langsung berdasarkan format bukti kriptografi baru.

Ini dirancang untuk bersifat **agnostik blockchain**, yang berarti dapat mendukung kolam penambangan untuk rantai proof-of-work mana pun di masa depan. Perhitungan dan penyimpanan kerja terjadi di Ergo menggunakan kontrak pintar ErgoScript, sementara verifikasi pembayaran untuk rantai lain akan memerlukan jembatan ringan.

Penelitian awal sudah dilakukan untuk memperluas dukungan Lithos ke Bitcoin melalui desain yang saling beroperasi.

---

## Cara Kerjanya

Lithos menggabungkan dua ide kunci: **Non-Interactive Share Proofs (NISPs)** dan **kolam penambangan yang dijamin**, yang diimplementasikan melalui kontrak pintar Layer 2 (khususnya, rollup optimis) di Ergo.

### NISPs: Bukti Tanpa Interaksi

Non-Interactive Share Proofs memungkinkan penambang untuk mengirimkan bukti kerja tanpa perlu berinteraksi bolak-balik dengan server. Setiap penambang memilih kesulitan mereka sendiri, yang menentukan seberapa sering mereka dibayar dan seberapa besar pembayaran tersebut.

Kontrak pintar memvalidasi bukti ini dan mengeluarkan pembayaran, tanpa perlu koordinasi terpusat.

### Kolam yang Dijamin

Kolam penambangan di Lithos didukung oleh jaminan. Penambang dan non-penambang dapat mempertaruhkan token ERG atau LITHOS untuk menjamin kolam. Ini memungkinkan:

* Produksi blok lokal dengan pemilihan transaksi penuh
* Ketahanan terhadap sensor
* Penegakan keadilan pembayaran di on-chain
* Mekanisme peminjaman DeFi asli antara pencipta kolam dan penstaker

---

## Manfaat bagi Penambang

* **Kontrol blok penuh**: Penambang memilih transaksi, mengumpulkan demurrage dan MEV.
* **Pembayaran yang adil**: Kontrak pintar menangani semua hadiah secara transparan.
* **Tidak ada risiko operator kolam**: Tidak ada pihak terpusat yang dapat menipu atau menunda pembayaran.
* **Klien lokal**: Penambang Lithos berjalan secara lokal untuk menghindari latensi atau saham yang kadaluarsa.
* **Kesulitan yang dapat disesuaikan**: Penambang dapat menyesuaikan kesulitan saham mereka agar sesuai dengan perangkat keras dan preferensi risiko mereka.

---

## Kesulitan dan Pembayaran

Protokol ini memperkenalkan model pembayaran yang unik:

* **Kesulitan lebih tinggi** = pembayaran lebih sedikit tetapi lebih besar
* **Kesulitan lebih rendah** = pembayaran lebih sering tetapi lebih kecil

Pengujian dunia nyata menunjukkan bahwa total hadiah tetap proporsional dengan hashrate, tetapi penambang dapat memilih seberapa stabil atau fluktuatif penghasilan mereka.

---

## Token LITHOS

Protokol ini akan mencakup token asli:

* **Diperoleh** oleh penambang sebagai hadiah untuk menggunakan kolam terdesentralisasi.
* **Diperlukan** untuk jaminan kolam, menghubungkan penambang dan pemberi pinjaman.
* **Digunakan** untuk mencegah spam, penipuan, dan membantu dengan urutan rollup.

Informasi lebih lanjut akan dirilis dalam whitepaper yang akan datang.

---

## Pembaruan Pengembangan Terbaru

* Kontrak bukti penipuan akhir sedang ditinjau
* Implementasi sewa penyimpanan disempurnakan untuk mencegah serangan penggantian tingkat blok
* Kontrak kesulitan sedang dibangun untuk mencegah manipulasi pasca-penambangan
* Pengujian kontrak rollup dan perbaikan stratum sedang berlangsung
* Basis kode akan dipublikasikan sebelum peluncuran testnet
* Penelitian sedang dilakukan tentang integrasi Bitcoin

Peluncuran testnet semakin dekat, menunggu integrasi rollup akhir dan stabilitas stratum.

---

## Apa Selanjutnya

Peta jalan Lithos sangat terkait dengan rilis Sigma 6.0 di mainnet Ergo, yang merupakan prasyarat agar Lithos dapat diluncurkan.

Sampai saat itu, pekerjaan terus berlanjut menuju testnet publik pertama. Tahap akhir mencakup:

* Menyelesaikan dan menguji kontrak rollup dan bukti penipuan
* Menyelesaikan integrasi klien stratum
* Merilis basis kode publik untuk tinjauan sejawat
* Melanjutkan pengembangan kontrak emisi, konfigurasi, dan jaminan
* Merencanakan integrasi BTC untuk kompatibilitas protokol yang lebih luas
* Menyelesaikan whitepaper yang menguraikan desain sistem dan mekanika token

Setelah tonggak ini tercapai dan Sigma 6.0 diaktifkan di mainnet, Lithos akan siap untuk diluncurkan.

---

## Sumber Daya

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [Demo Lithos ErgoHack](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
