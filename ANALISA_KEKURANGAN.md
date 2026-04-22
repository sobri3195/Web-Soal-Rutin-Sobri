# Analisa Kekurangan Project `Web Soal Rutin Sobri` (Revisi)

Dokumen ini adalah versi revisi yang lebih operasional: setiap gap dilengkapi **indikasi bukti di repo**, **dampak**, dan **aksi prioritas** supaya bisa langsung dieksekusi.

## Snapshot cepat

- **Kondisi saat ini:** aplikasi sudah kaya fitur belajar, tetapi fondasi engineering belum kuat untuk skala tim/fitur lebih besar.
- **Prioritas tertinggi:** testing + linting + refactor struktur komponen.
- **Target jangka pendek (1–2 minggu):** pasang quality gate minimum di lokal dan CI.

---

## 1) Testing belum tersedia (critical)

### Indikasi di repo
- Script pada `package.json` hanya `dev`, `build`, `preview` (belum ada `test`).

### Risiko
- Bug regresi sulit terdeteksi saat menambah fitur.
- Fitur kritikal (filter MCQ, progress, import/export) rawan rusak tanpa alarm otomatis.

### Aksi yang disarankan
1. Tambahkan Vitest + React Testing Library.
2. Buat minimal 8–12 test untuk logic inti:
   - perhitungan akurasi/progress,
   - filter MCQ (`all/unanswered/correct/wrong`),
   - sanitasi state import,
   - behavior pagination.
3. Tambahkan script:
   - `test`,
   - `test:watch`,
   - `test:coverage`.

### Definisi selesai
- `npm run test` berjalan hijau di lokal dan CI.
- Coverage baseline tercatat (misal awal 40%+, naik bertahap).

---

## 2) Linting & formatting automation belum ada (high)

### Indikasi di repo
- Belum ada script `lint`/`format`.

### Risiko
- Konsistensi style manual, review PR melambat.
- Potensi defect kecil (unused vars, dependency hook) lolos.

### Aksi yang disarankan
1. Tambahkan ESLint (React Hooks rules) + Prettier.
2. Tambahkan script:
   - `lint`,
   - `lint:fix`,
   - `format`.
3. Jadikan lint sebagai quality gate sebelum merge.

### Definisi selesai
- `npm run lint` wajib hijau sebelum merge.
- Format otomatis konsisten lintas kontributor.

---

## 3) `src/App.jsx` terlalu besar (high)

### Indikasi di repo
- Banyak state, derived data, dan handler terkonsentrasi di satu file.

### Risiko
- Sulit maintenance dan code review.
- Refactor kecil berisiko memengaruhi banyak area sekaligus.

### Aksi yang disarankan
Refactor bertahap (tanpa big-bang):
1. Ekstrak util murni ke `src/utils/` (mis. kalkulasi progress, helper filter).
2. Ekstrak custom hooks ke `src/hooks/` (persist state, keyboard shortcut, pagination state).
3. Ekstrak UI menjadi komponen per domain:
   - `features/mcq/`,
   - `features/essay/`,
   - `features/flashcards/`.

### Definisi selesai
- `App.jsx` jadi orchestration tipis.
- Logic inti bisa dites terpisah via unit test.

---

## 4) Aksesibilitas (a11y) belum dijadikan quality gate (medium-high)

### Indikasi di repo
- Belum ada checklist/audit a11y terdokumentasi.

### Risiko
- Navigasi keyboard tidak konsisten.
- Pengalaman screen reader bisa menurun seiring penambahan fitur.

### Aksi yang disarankan
1. Audit komponen interaktif (button/filter/modal/navigator soal).
2. Pastikan semantic HTML, focus visible, label ARIA penting.
3. Tambahkan audit Lighthouse/Axe minimal pada halaman utama.

### Definisi selesai
- Tidak ada issue a11y severity tinggi di audit awal.

---

## 5) Strategi data soal belum scalable (medium-high)

### Indikasi di repo
- Konten soal masih tertanam langsung di source.

### Risiko
- Update konten harus redeploy.
- Sulit kolaborasi dengan editor konten non-developer.

### Aksi yang disarankan
1. Pisahkan konten ke JSON terstruktur per modul/tipe.
2. Tambahkan schema validation saat build/runtime.
3. Siapkan jalur migrasi ke CMS/API jika jumlah modul tumbuh.

### Definisi selesai
- Penambahan/perubahan soal bisa dilakukan tanpa sentuh logic UI.

---

## 6) Observability & error reporting belum ada (medium)

### Indikasi di repo
- Belum ada integrasi pelacakan error runtime.

### Risiko
- Error production sulit ditelusuri.
- Sulit tahu fitur mana yang paling sering dipakai/bermasalah.

### Aksi yang disarankan
1. Pasang Error Boundary.
2. Integrasikan layanan error monitoring (mis. Sentry).
3. Definisikan event analytics minimal:
   - submit jawaban,
   - bookmark,
   - import/export,
   - reset progress.

### Definisi selesai
- Error utama bisa ditrace hingga konteks user action.

---

## 7) Keamanan data sisi klien masih basic (medium)

### Indikasi di repo
- Progress disimpan di `localStorage`.

### Risiko
- Data mudah dimodifikasi user.
- File import berpotensi membawa payload tidak sesuai format.

### Aksi yang disarankan
1. Hardening validasi import: tipe, ukuran file, required fields, value constraints.
2. Tambahkan versioning schema state (`stateVersion`) + migrator.
3. Tampilkan pesan error import yang jelas (bukan gagal diam-diam).

### Definisi selesai
- Payload import invalid ditolak dengan pesan yang informatif.

---

## 8) Dokumentasi kontribusi belum lengkap (medium)

### Indikasi di repo
- README sudah ada run/build/deploy, namun belum ada panduan kontribusi teknis detail.

### Risiko
- Onboarding contributor lebih lama.
- Standar review dan release tidak seragam.

### Aksi yang disarankan
Tambahkan `CONTRIBUTING.md` berisi:
1. alur branch/commit/PR,
2. standar lint/test sebelum merge,
3. struktur folder & ownership area,
4. checklist review,
5. troubleshooting umum.

### Definisi selesai
- Kontributor baru bisa setup + kirim PR pertama tanpa asistensi intensif.

---

## Rencana eksekusi bertahap

## Fase 1 (Quick Wins, 1–2 minggu)
- Setup ESLint + Prettier.
- Setup Vitest + 8 test prioritas.
- Tambah workflow CI: lint + test + build.

## Fase 2 (Stabilisasi, 2–4 minggu)
- Refactor `App.jsx` ke hooks/utils/features.
- Audit a11y baseline dan perbaikan severity tinggi.

## Fase 3 (Skalabilitas, 1–2 bulan)
- Pisah question bank ke data layer tervalidasi.
- Integrasi monitoring error + analytics dasar.

---

## KPI keberhasilan (agar terukur)

- PR gagal merge otomatis jika lint/test merah.
- Waktu review PR turun (lebih sedikit komentar style).
- Bug regresi fitur inti menurun setelah 2 sprint.
- Kecepatan tambah modul/soal meningkat karena data terpisah dari UI.

---

## Ringkasan

Secara produk, aplikasi sudah menarik dan fungsional. Gap terbesarnya ada pada **engineering maturity**. Fokus ke quality gate (lint/test/CI), modularisasi code, dan data strategy akan memberi dampak paling besar untuk stabilitas serta kecepatan pengembangan berikutnya.
