UNDANGAN PERNIKAHAN — HTML + CSS + JS (+ API Vercel untuk ucapan/RSVP)

ISI FOLDER
  index.html            halaman utama
  css/style.css         tampilan
  js/config.js          SEMUA isi undangan (nama, tanggal, acara, rekening, dll) -> edit di sini
  js/script.js          logika (tidak perlu diubah)
  api/comments.js       API ucapan & RSVP (Vercel Serverless Function)
  assets/photos/        taruh foto (lihat BACA-SAYA.txt)
  assets/music/         taruh lagu.mp3
  vercel.json           pengaturan Vercel

LINK YANG BUTUH INTERNET / PERLU DIGANTI (ditandai 🔗)
  index.html    : og:image (ganti dengan domain Vercel Anda), Google Fonts
  js/config.js  : instagram mempelai, link Maps tiap acara, mapEmbed, whatsapp

LINK UNTUK TAMU
  https://DOMAIN-ANDA.vercel.app/?to=Nama+Tamu
  Nama tamu otomatis tampil di sampul.

DEPLOY KE VERCEL (WAJIB agar ucapan/RSVP tersimpan permanen)
  1. Ekstrak zip ini, upload folder ke GitHub (repo baru).
  2. vercel.com -> Add New -> Project -> import repo -> Framework "Other" -> Deploy.
  3. Setelah deploy: buka project -> tab Storage -> buat/hubungkan database
     "Upstash Redis" (pilih dari Marketplace, paket Free) -> Connect ke project ini.
     Variabel environment terisi otomatis (UPSTASH_REDIS_REST_URL / KV_REST_API_URL, dst).
  4. Redeploy (Deployments -> titik tiga -> Redeploy) agar variabel terbaca.
  5. Selesai. Tes kirim ucapan di website.

  Alternatif lewat CLI: npm i -g vercel, lalu jalankan "vercel" di folder ini.
  Tes lokal lengkap dengan API: "vercel dev" (butuh variabel env dari "vercel env pull").

CATATAN
  - Tanpa database, form ucapan tetap jalan tapi hanya tersimpan di browser tamu itu sendiri.
  - Jika tidak ada lagu.mp3, tombol musik otomatis disembunyikan.
  - Foto yang belum ada otomatis tidak ditampilkan (tidak error).
