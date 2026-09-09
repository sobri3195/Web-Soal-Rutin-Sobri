import { writeFile } from 'node:fs/promises';
import { questionAudit } from '../src/questionBank.js';

const rows = Object.entries(questionAudit.modules).map(([module, stats]) =>
  `| ${module} | ${stats.initial} | ${stats.added} | ${stats.duplicates} | ${stats.active} | ${stats.review} |`,
);
const report = `# Audit Bank Soal MCQ\n\nAudit ini dihasilkan otomatis. “Perlu tinjau” adalah penyaring kemiripan, bukan penghapusan otomatis. Penambahan valid masih 0; target 100 soal baru per modul **belum diklaim selesai** agar variasi dangkal/soal tanpa verifikasi tidak diterbitkan.\n\n| Modul | Jumlah awal | Baru lolos | Duplikat dinonaktifkan | Akhir aktif | Perlu tinjau |\n|---|---:|---:|---:|---:|---:|\n${rows.join('\n')}\n\n## Aturan aktivasi\n\n- ID ganda, metadata wajib yang kosong, opsi duplikat, kunci yang tidak tersedia, dan pembahasan kosong ditolak.\n- Pertanyaan identik setelah normalisasi Unicode, kapitalisasi, spasi, dan tanda baca dinonaktifkan; operator matematika tetap dipertahankan.\n- ID soal yang dinonaktifkan dipetakan ke ID kanonis agar progres lama tetap dapat dimigrasikan.\n- Kemiripan tinggi di dalam keluarga soal hanya masuk antrean tinjau manusia.\n`;
await writeFile(new URL('../AUDIT_BANK_SOAL.md', import.meta.url), report);
console.log(report);
