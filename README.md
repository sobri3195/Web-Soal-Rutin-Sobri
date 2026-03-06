# Web Soal Rutin Sobri

Frontend React (tanpa Next.js) untuk latihan soal dengan mode:

- MCQ
- Essai
- Flashcard

## Fitur

- Sidebar ala admin panel untuk memilih modul:
  - Matematika Simak UI
  - Matematika LPDP
  - Tes Potensi Akademik
  - Soal Onkologi Radiasi
  - Soal Toefl
- Penyimpanan jawaban ke `localStorage`
- Siap deploy di Vercel (SPA rewrite via `vercel.json`)

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Deploy Vercel

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
