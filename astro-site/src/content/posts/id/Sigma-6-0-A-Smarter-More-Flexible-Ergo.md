---
cmsId: 2752
title: "Sigma 6.0: Ergo yang Lebih Cerdas dan Fleksibel"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: id
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T13:45:22.53"
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

**Sigma 6.0** adalah peningkatan besar yang diusulkan untuk blockchain Ergo. Ini memberikan pengembang alat yang lebih kuat untuk membangun kontrak pintar, memperbaiki batasan yang telah ada lama, dan mempersiapkan jaringan untuk perbaikan di masa depan—semua tanpa merusak kompatibilitas dengan kontrak atau node yang ada.

Peningkatan ini terjadi melalui soft-fork, yang berarti node non-penambangan yang ada dapat terus beroperasi, sementara node penambangan yang ditingkatkan diharuskan untuk mengaktifkan dan menegakkan fitur baru.

Pemungutan suara oleh penambang sudah berlangsung, dengan dukungan saat ini lebih dari 90%, dan devnet sudah aktif untuk pengujian awal. Jika ini berlanjut, Sigma 6.0 akan diaktifkan pada akhir September 2025.


---

## Mengapa Sigma 6.0 Diperlukan?

Sejak Ergo diluncurkan pada 2019, bahasa kontrak pintarnya (ErgoTree) tetap stabil. Stabilitas itu telah membantu jaringan tetap aman, tetapi juga membuatnya lebih sulit bagi pengembang untuk menambahkan fitur baru atau menyederhanakan logika mereka. Beberapa perbaikan direncanakan sejak zaman testnet pada 2018 tetapi tidak pernah sampai ke mainnet—hingga sekarang.

Sigma 6.0 membawa peningkatan tersebut ke depan. Ini memperluas apa yang mungkin dalam sebuah kontrak, menghapus batasan teknis, dan membuka jalan untuk perbaikan tata kelola dan skala di masa depan.

---

## Apa yang Berubah?

* **Angka yang lebih kuat** dengan tipe integer 256-bit tidak bertanda baru untuk operasi kriptografi dan keuangan
* **Penanganan data yang lebih baik** melalui dukungan penuh untuk serialisasi dan deserialisasi tipe kompleks dalam kontrak
* **Transaksi yang lebih cerdas** yang dapat mengakses variabel konteks dari input lain untuk logika yang lebih terkoordinasi
* **Alat matematika dan daftar baru** termasuk operasi bitwise, pergeseran, dan metode koleksi yang ditingkatkan seperti `.get` dan `.startsWith`
* **Validasi PoW bawaan** sehingga kontrak dapat memeriksa header blok atau pesan kustom terhadap Autolykos2
* **Tata kelola yang dapat ditingkatkan** memungkinkan jaringan untuk memberikan suara pada parameter baru melalui soft-fork di masa depan, dimulai dengan dukungan untuk sub-blok



---

## Garis Waktu Aktivasi

Sigma 6.0 melalui proses aktivasi soft-fork yang memerlukan dua fase: periode pemungutan suara dan periode pembaruan. Masing-masing berlangsung sekitar 45 hari, sehingga peluncuran penuh memakan waktu sekitar 90 hari.

Penambang mulai memberikan suara pada awal Juli 2025, dan dukungan sudah melebihi ambang batas 90% yang diperlukan. Jika tingkat dukungan itu bertahan, peningkatan akan diaktifkan pada akhir September 2025.

Bahkan jika konsensus tercapai lebih awal, protokol masih menunggu periode pemungutan suara dan pembaruan penuh sebelum diluncurkan.

Devnet sudah aktif untuk Sigma 6.0, dan pengembang dapat menemukan informasi tentang cara bergabung dalam obrolan dev komunitas. Pada bulan Juli, pengujian node penambangan yang mendukung sub-blok dimulai di testnet. Setelah itu, fokus akan beralih ke penyempurnaan dokumentasi dan meningkatkan penalaran formal tentang keamanan sepanjang bulan Agustus, memastikan bahwa peningkatan tetap didorong oleh penelitian. Setelah selesai, perhatian dapat beralih ke potensi penerapan mainnet.

---

## Untuk Pengembang

Fitur baru memerlukan versi ErgoTree 3 atau lebih tinggi. Beberapa tipe—seperti `Option`, `Header`, dan `UnsignedBigInt`—tidak dapat disimpan langsung di register atau ekstensi konteks, tetapi dapat disimpan sebagai data byte dan dipulihkan di dalam kontrak.

Contoh penggunaan dapat ditemukan di [Sigma test suite di GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Mengapa Ini Penting

Sigma 6.0 adalah peningkatan terbesar pada lapisan kontrak pintar Ergo sejak jaringan diluncurkan. Ini memberikan pengembang lebih banyak kebebasan, membuka kasus penggunaan yang sama sekali baru, dan memperkuat fondasi protokol—sambil tetap sepenuhnya kompatibel ke belakang.

Dengan dukungan penambang sekarang di atas 90%, peningkatan ini berada di jalur untuk diaktifkan bulan September ini. Sigma 6.0 menempatkan Ergo dalam posisi yang lebih kuat untuk masa depan.


## Sumber Daya

- Proposal teknis lengkap: [EIP-0050: Sigma 6.0 di GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [Proposal Soft-Fork 6.0 (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Ringkasan Dokumentasi Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
