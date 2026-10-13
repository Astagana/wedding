/* ============================================================
   KONFIGURASI UNDANGAN — edit file ini saja untuk ganti isi.
   Foto: taruh di assets/photos/  |  Lagu: taruh di assets/music/
   ============================================================ */
window.WEDDING = {

  /* Foto (path relatif ke folder website) */
  coverPhoto: "assets/photos/cover.jpg",
  heroPhoto:  "assets/photos/hero.jpg",

  groom: {
    name: "Raka Pratama",
    nick: "Raka",
    parents: "Putra pertama dari Bpk Ahmad dan Ibu Siti",
    instagram: "https://www.instagram.com/username_pria",   // 🔗 LINK EXTERNAL
    igLabel: "@username_pria",
    photo: "assets/photos/groom.jpg"
  },
  bride: {
    name: "Nadia Putri, S.Pd",
    nick: "Nadia",
    parents: "Putri pertama dari Bpk Budi dan Ibu Rina",
    instagram: "https://www.instagram.com/username_wanita", // 🔗 LINK EXTERNAL
    igLabel: "@username_wanita",
    photo: "assets/photos/bride.jpg"
  },

  heroDate: "12 – 13 Desember 2026",

  quote: {
    text: "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”",
    source: "(QS Ar-Rum : 21)"
  },

  opening: "Assalamualaikum Wr. Wb. Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.",

  /* Acara. Tambah/hapus blok sesuai kebutuhan */
  events: [
    {
      title: "Akad Nikah",
      dow: "Sabtu", day: "12", month: "Desember 2026",
      time: "09.00 WITA s/d Selesai",
      place: "Masjid Contoh",
      address: "Jl. Contoh No. 1, Kota Contoh",
      maps: "https://maps.app.goo.gl/GANTI"                  // 🔗 LINK EXTERNAL
    },
    {
      title: "Resepsi",
      dow: "Minggu", day: "13", month: "Desember 2026",
      time: "08.00 WITA s/d Selesai",
      place: "Gedung Contoh",
      address: "Jl. Contoh Raya No. 2, Kota Contoh",
      maps: "https://maps.app.goo.gl/GANTI"                  // 🔗 LINK EXTERNAL
    }
  ],

  /* Peta tertanam. Ganti teks setelah q= dengan nama/alamat lokasi (spasi → %20).
     Kosongkan ("") untuk menyembunyikan peta. */
  mapEmbed: "https://maps.google.com/maps?q=Monas%20Jakarta&t=m&z=15&output=embed&iwloc=near", // 🔗 LINK EXTERNAL

  /* Waktu hitung mundur, format ISO. +08:00 = WITA, +07:00 = WIB, +09:00 = WIT */
  countdownTo: "2026-12-13T08:00:00+08:00",

  story: [
    { title: "Pertemuan",      text: "Setiap kejadian memiliki alasan. Berawal dari percakapan sederhana yang akhirnya tidak pernah berhenti." },
    { title: "Mengenal",       text: "Banyak cerita yang kami lewati bersama, hingga kami yakin untuk melangkah ke arah yang sama." },
    { title: "Keraguan",       text: "Rasa ragu sempat datang, tetapi keyakinan akhirnya kembali menguat." },
    { title: "Lamaran",        text: "Dengan restu keluarga, kami memantapkan niat untuk menggenapkan separuh agama." },
    { title: "Hari Bahagia",   text: "Kini kami menanti hari itu, dan berharap Anda hadir untuk memberi doa terbaik." }
  ],

  /* Galeri: tambah/hapus nama file sesuai foto yang ada di assets/photos/ */
  gallery: [
    "assets/photos/gallery-1.jpg",
    "assets/photos/gallery-2.jpg",
    "assets/photos/gallery-3.jpg",
    "assets/photos/gallery-4.jpg",
    "assets/photos/gallery-5.jpg",
    "assets/photos/gallery-6.jpg",
    "assets/photos/gallery-7.jpg",
    "assets/photos/gallery-8.jpg"
  ],

  giftText: "Doa Bapak/Ibu/Saudara/i sudah merupakan hadiah terbaik bagi kami. Namun jika memberi adalah bentuk tanda kasih Anda, kami menyediakan fitur berikut untuk memudahkan.",
  gifts: [
    { bank: "Bank BCA",  name: "Nadia Putri",  number: "0000000000" },
    { bank: "Bank BRI",  name: "Raka Pratama", number: "0000000000" }
  ],
  giftAddress: "Jl. Contoh No. 1 RT 01 RW 02, Kelurahan Contoh, Kota Contoh",

  closing: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Wassalamualaikum Wr. Wb.",

  whatsapp: "https://wa.me/6281234567890",                    // 🔗 LINK EXTERNAL (ganti nomor, format 62xxx tanpa +)

  music: "assets/music/lagu.mp3",                              // taruh lagu dengan nama ini, atau ubah nama file di sini

  apiUrl: "/api/comments"                                      // jangan diubah (Vercel Serverless Function)
};
