# Web Soal Rutin Sobri

Frontend React (Vite) untuk latihan soal dengan 3 mode utama:

- MCQ
- Essai
- Flashcard

## Upgrade terbaru

- ✅ **200 soal per modul** untuk setiap mode (MCQ, Essai, Flashcard).
- ✅ **UI/UX modern** dengan tampilan glassmorphism + gradient + tema dark/light.
- ✅ **Mobile responsive** (sidebar, statistik, toolbar, dan pagination adaptif).
- ✅ **Fitur pembelajaran lengkap**:
  - pencarian soal,
  - bookmark/favorit lintas mode,
  - navigator nomor soal interaktif untuk lompat cepat,
  - template jawaban essai sekali klik,
  - review ulang flashcard yang belum mantap,
  - readiness score dan rekomendasi belajar berikutnya,
  - progress tracker,
  - statistik jawaban benar,
  - pagination 10 soal per halaman,
  - reset data per tipe,
  - autosave ke `localStorage`,
  - export/import progress JSON,
  - tombol lanjut ke soal MCQ yang belum dijawab,
  - notifikasi aksi (toast) untuk feedback cepat.

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Build produksi

```bash
npm run build
npm run preview
```

## Deploy Vercel

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
