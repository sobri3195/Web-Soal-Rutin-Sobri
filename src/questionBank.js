export const moduleConfigs = [
  {
    name: 'Matematika Simak UI',
    tag: 'Analitik Kuantitatif • Hard mode berbasis riset',
    questionCount: 200,
  },
  { name: 'Matematika LPDP', tag: 'Reasoning Numerik', questionCount: 200 },
  { name: 'Tes Substansi LPDP', tag: 'Kebijakan & Kepemimpinan', questionCount: 150 },
  { name: 'Tes Potensi Akademik', tag: 'Verbal, Numerik & Logika • Hard mode', questionCount: 200 },
  { name: 'Soal Onkologi Radiasi', tag: 'Konsep Medis', questionCount: 200 },
  { name: 'Soal Toefl', tag: 'English Mastery', questionCount: 200 },
  { name: 'UKMPPD', tag: 'Semua Stase Kedokteran', questionCount: 150 },
  { name: 'TPA Bappenas', tag: 'Verbal, Numerik & Logika', questionCount: 100 },
  { name: 'TPA Simak UI Paskasarjana', tag: 'Verbal, Numerik & Logika', questionCount: 100 },
  { name: 'IELTS', tag: 'Academic English', questionCount: 100 },
  { name: 'Bahasa inggris Simak UI Paskasarjana', tag: 'Academic English', questionCount: 100 },
  { name: 'Bahasa Spanyol', tag: 'Español Intermedio', questionCount: 100 },
  { name: 'Tes IQ', tag: 'Penalaran & Pola', questionCount: 150 },
];

export const moduleResearchNotes = {
  'Matematika Simak UI': {
    summary: 'Prioritas soal sulit disusun dari topik paling sering muncul pada Matematika dasar dan Matematika IPA SIMAK UI, lalu dinaikkan levelnya dengan multi-step reasoning dan jebakan konseptual.',
    priorities: [
      'Frekuensi tinggi: peluang, persamaan kuadrat, fungsi komposisi/invers, barisan-deret, pertidaksamaan, SPL/SPLK, logaritma, matriks.',
      'Frekuensi tinggi saintek: trigonometri, dimensi tiga, suku banyak, limit, barisan-deret.',
      'Frekuensi menengah untuk variasi sulit: integral, vektor, statistika, program linear, persamaan lingkaran, turunan/optimasi.',
    ],
    sources: [
      {
        label: 'Pahamify — Persebaran materi SIMAK UI 2011–2019',
        url: 'https://pahamify.com/blog/persebaran-materi-simak-ui/',
      },
      {
        label: 'detikEdu — Materi SIMAK UI 2025 (Matematika dalam TKD)',
        url: 'https://www.detik.com/edu/seleksi-masuk-pt/d-7947124/pendaftaran-simak-ui-2025-resmi-dibuka-melalui-enrollment-ui-ac-id-cek-biayanya',
      },
    ],
  },
  'Tes Potensi Akademik': {
    summary: 'Riset awal saya pakai untuk menggeser modul ini ke level sulit penuh: komposisi TPA paling sering bergerak pada verbal, kuantitatif/numerik, dan penalaran-logika; versi sulit lalu ditingkatkan lewat multi-step inference, distraktor dekat, dan data yang tidak bisa dijawab dengan hafalan satu langkah.',
    priorities: [
      'Verbal sulit: analogi presisi, sinonim-antonim akademik, kelengkapan kalimat, dan inferensi paragraf pendek dengan asumsi tersembunyi.',
      'Logika sulit: silogisme, ordering constraint, evaluasi argumen, fallacy, strengthening-weakening, dan data sufficiency.',
      'Numerik sulit: deret multiaturan, perbandingan kuantitatif, aritmetika cerita singkat, himpunan, tabel, serta coding-decoding dengan jebakan pola.',
      'Semua butir dibuat unik per indeks soal, sehingga tidak lagi mengulang stem yang sama lalu hanya mengganti label varian.',
    ],
    sources: [
      {
        label: 'Pusat Asesmen Pendidikan — Juknis Asesmen Bakat dan Minat 2023 (domain verbal, kuantitatif, penalaran)',
        url: 'https://pusmendik.kemdikbud.go.id/abm2023/files/Juknis_Pelayanan_ABM_2023.pdf',
      },
      {
        label: 'Siapkerja Kemnaker — SKBT BUMN 2024 (komponen verbal, numerik, logika, analitik)',
        url: 'https://siapkerja.kemnaker.go.id/uploads/pengumuman/SKBT_BUMN.pdf',
      },
    ],
  },
  'TPA Bappenas': {
    summary: 'Pola sulit untuk TPA Bappenas saya samakan dengan kerangka verbal–numerik–logika, tetapi proporsi soal diarahkan ke presisi inferensi dan efisiensi waktu.',
    priorities: [
      'Fokus pada verbal presisi, deret multiaturan, silogisme ketat, dan interpretasi data yang menuntut pembandingan rasio.',
      'Distraktor didesain dekat dengan jawaban benar agar menguji akurasi, bukan sekadar tebakan permukaan.',
    ],
    sources: [
      {
        label: 'Siapkerja Kemnaker — SKBT BUMN 2024 (verbal, numerik, logika, analitik)',
        url: 'https://siapkerja.kemnaker.go.id/uploads/pengumuman/SKBT_BUMN.pdf',
      },
    ],
  },
  'TPA Simak UI Paskasarjana': {
    summary: 'Modul TPA pascasarjana ini disusun dengan penekanan pada reasoning yang lebih akademik: analogi konseptual, evaluasi argumen, inferensi data, dan numerik multi-langkah.',
    priorities: [
      'Soal verbal menuntut ketepatan makna akademik dan inferensi implisit.',
      'Soal logika menuntut validitas kesimpulan, asumsi, serta pengujian argumen.',
      'Soal numerik menuntut pattern recognition dan perhitungan singkat namun tidak langsung.',
    ],
    sources: [
      {
        label: 'Pusat Asesmen Pendidikan — Juknis Asesmen Bakat dan Minat 2023',
        url: 'https://pusmendik.kemdikbud.go.id/abm2023/files/Juknis_Pelayanan_ABM_2023.pdf',
      },
    ],
  },
  'Soal Toefl': {
    summary: 'Saya naikkan modul TOEFL ke level sulit dengan meniru domain resmi ETS yang menekankan academic reading, inference, rhetorical purpose, dan control atas structure/vocabulary presisi.',
    priorities: [
      'Reading sulit diarahkan ke inference, rhetorical purpose, dan generalization control dari paragraf akademik ringkas.',
      'Structure sulit memakai inversion, third conditional, mandative subjunctive, dan agreement dengan pengganggu frasa.',
      'Vocabulary diarahkan ke makna akademik presisi dengan distraktor dekat, bukan sinonim kasar.',
      'Semua butir digenerasikan unik per indeks agar tidak mengulang stem yang sama sepanjang 200 soal.',
    ],
    sources: [
      {
        label: 'ETS — TOEFL iBT Test Content and Structure',
        url: 'https://www.ets.org/toefl/test-takers/ibt/about/content/',
      },
      {
        label: 'ETS — TOEFL iBT Reading question types (Inference and Rhetorical Purpose)',
        url: 'https://www.br.ets.org/toefl/test-takers/ibt/about/content/reading.html/ets.html',
      },
    ],
  },
  'Bahasa inggris Simak UI Paskasarjana': {
    summary: 'Karena SIMAK UI pascasarjana mensyaratkan tes Bahasa Inggris untuk konteks studi lanjut, modul ini saya arahkan ke academic English berat: cohesion, inversion, precision grammar, dan inferensi paragraf akademik.',
    priorities: [
      'Porsi besar diberikan pada connector logic, inversion formal, dan verb control yang biasa muncul pada bacaan akademik.',
      'Reading comprehension dibuat berbasis inferensi, claim limitation, dan ketelitian makna yang relevan untuk studi pascasarjana.',
      'Setiap indeks menghasilkan prompt berbeda supaya bank soal tidak memutar ulang item yang sama.',
    ],
    sources: [
      {
        label: 'Penerimaan UI — Persyaratan S2 SIMAK UI (tes bahasa Inggris sebagai komponen seleksi)',
        url: 'https://penerimaan.ui.ac.id/period/requirement/3261',
      },
      {
        label: 'FTUI brochure — Tes Bahasa Inggris 90 menit untuk Pascasarjana',
        url: 'https://eng.ui.ac.id/wp-content/uploads/Brosur_Magister_S2_2019.pdf',
      },
    ],
  },
  UKMPPD: {
    summary: 'Modul UKMPPD saya arahkan ke level sulit dengan fokus pada prioritas klinis, stabilisasi, dan keputusan next best step lintas stase yang konsisten dengan orientasi SKDI dan pembelajaran kompetensi KKI.',
    priorities: [
      'Kasus sulit difokuskan pada emergency recognition, time-sensitive management, dan sequencing tindakan aman.',
      'Variasi stase diperluas lintas penyakit dalam, bedah, anak, obstetri, neurologi, komunitas, psikiatri, dan paru.',
      'Distraktor dibuat menyerupai kesalahan klinis umum: menunda tindakan definitif, over-testing, atau salah urutan prioritas.',
      'Semua kasus diacak berbasis parameter berbeda agar tidak ada stem identik antarsoal.',
    ],
    sources: [
      {
        label: 'KKI — Standar Kompetensi Dokter Indonesia (SKDI)',
        url: 'https://kki.go.id/uploads/media/1683689635_fa3dea59333025ae148a.pdf',
      },
      {
        label: 'KKI — Modul pembelajaran berbasis SKDI untuk persiapan uji kompetensi',
        url: 'https://kki.go.id/kolegium-dokter/ujian/course/index.php?categoryid=13&lang=id',
      },
    ],
  },
};

export const modules = moduleConfigs.map((module) => module.name);
export const DEFAULT_QUESTION_COUNT_PER_MODULE = 200;
export const PAGE_SIZE = 10;

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const shuffleDeterministic = (items, seed) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.abs(seed + i * 17) % (i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const seeded = (moduleName, index, step = 0) => hashString(`${moduleName}-${index}-${step}`);
const pick = (list, seed) => list[Math.abs(seed) % list.length];
const formatPercent = (value) => `${Number(value.toFixed(2)).toString().replace(/\.00$/, '')}%`;
const formatRupiah = (value) => `Rp ${Math.round(value).toLocaleString('id-ID')}`;
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const buildNumericOptions = (answer, variants, seed, formatter = (value) => String(value)) => {
  const raw = [answer, ...variants].map((value) => formatter(value));
  return shuffleDeterministic([...new Set(raw)].slice(0, 4), seed);
};

const buildUniqueOptions = (answer, pool, seed, count = 4) => {
  const distractors = shuffleDeterministic(
    pool.filter((item) => item !== answer),
    seed,
  );
  return shuffleDeterministic([answer, ...distractors.slice(0, count - 1)], seed + 97);
};

const quantContexts = [
  'simulasi audit data seleksi',
  'pemodelan kapasitas ruang ujian',
  'analisis performa tryout nasional',
  'optimasi distribusi logistik kampus',
  'evaluasi reliabilitas skor kuantitatif',
  'penjadwalan kelas intensif',
  'pengolahan sampel laboratorium',
  'perencanaan pipeline riset mahasiswa',
];

const countIntegersInInterval = (min, max) => Math.max(0, Math.floor(max) - Math.ceil(min) + 1);

const createAdvancedSimakMathQuestion = (moduleName, index) => {
  const n = index + 1;
  const topic = index % 20;
  const cycle = Math.floor(index / 20);
  const seed = seeded(moduleName, index);
  const context = pick(quantContexts, seed + cycle);

  const variants = [
    () => {
      const total = 12 + cycle;
      const mathOnly = 4 + (cycle % 4);
      const englishOnly = 3 + (cycle % 3);
      const both = total - mathOnly - englishOnly;
      const denominator = total - englishOnly;
      const answer = `${both}/${denominator}`;
      return {
        prompt: `[Sulit • Peluang Bersyarat] Di ${context}, dari ${total} peserta terdapat ${mathOnly} hanya lolos simulasi Matematika, ${englishOnly} hanya lolos Bahasa Inggris, dan sisanya lolos keduanya. Jika dipilih acak seorang peserta yang diketahui lolos Matematika, peluang ia juga lolos Bahasa Inggris adalah...`,
        answer,
        explanation: `Peserta yang lolos keduanya = ${both}. Yang lolos Matematika = ${mathOnly + both}. Jadi peluang bersyarat = ${both}/${mathOnly + both} = ${answer}.`,
        options: shuffleDeterministic([answer, `${both}/${total}`, `${mathOnly}/${denominator}`, `${englishOnly}/${denominator}`], seed),
      };
    },
    () => {
      const r1 = cycle + 2;
      const r2 = cycle + 5;
      const shift = 3 + (cycle % 3);
      const answer = r1 ** 2 + r2 ** 2 - shift;
      return {
        prompt: `[Sulit • Persamaan Kuadrat] Pada ${context}, persamaan x²-${r1 + r2}x+${r1 * r2}=0 memiliki akar α dan β. Nilai α²+β²-${shift} adalah...`,
        answer: String(answer),
        explanation: `α+β=${r1 + r2} dan αβ=${r1 * r2}. Maka α²+β²=(α+β)²-2αβ=${(r1 + r2) ** 2}-2(${r1 * r2})=${r1 ** 2 + r2 ** 2}. Kurangi ${shift} menjadi ${answer}.`,
        options: buildNumericOptions(answer, [answer + shift, answer - (cycle + 1), (r1 + r2) ** 2 - shift], seed),
      };
    },
    () => {
      const a = cycle + 2;
      const b = cycle + 3;
      const c = cycle + 4;
      const input = cycle + 1;
      const answer = a * (input + b) - c;
      return {
        prompt: `[Sulit • Fungsi Komposisi] Dalam ${context}, diketahui f(x)=${a}x-${c} dan g(x)=x+${b}. Nilai (f∘g)(${input}) adalah...`,
        answer: String(answer),
        explanation: `g(${input})=${input + b}. Maka f(g(${input}))=${a}(${input + b})-${c}=${answer}.`,
        options: buildNumericOptions(answer, [answer + a, answer - b, (a * input) + b - c], seed),
      };
    },
    () => {
      const first = 5 + cycle;
      const diff = 2 + (cycle % 3);
      const terms = 7 + (cycle % 4);
      const answer = (terms / 2) * ((2 * first) + ((terms - 1) * diff));
      return {
        prompt: `[Sulit • Barisan & Deret] Pada ${context}, suku pertama deret aritmetika ${first}, bedanya ${diff}, dan diambil ${terms} suku pertama. Jumlah deret tersebut adalah...`,
        answer: String(answer),
        explanation: `Sn = n/2 [2a + (n-1)b] = ${terms}/2 [${2 * first} + ${(terms - 1) * diff}] = ${answer}.`,
        options: buildNumericOptions(answer, [answer + diff, answer - first, answer + terms], seed),
      };
    },
    () => {
      const lower = -(cycle + 4);
      const upper = cycle + 6;
      const answer = countIntegersInInterval(lower, upper);
      return {
        prompt: `[Sulit • Pertidaksamaan Nilai Mutlak] Di ${context}, banyak bilangan bulat yang memenuhi |x-1| ≤ ${cycle + 5} adalah...`,
        answer: String(answer),
        explanation: `|x-1| ≤ ${cycle + 5} setara dengan ${lower} ≤ x ≤ ${upper}. Banyak bilangan bulat pada interval itu adalah ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, answer - 2, upper - lower], seed),
      };
    },
    () => {
      const x = cycle + 2;
      const y = cycle + 4;
      const answer = 3 * x + 2 * y;
      return {
        prompt: `[Sulit • SPLDV] Dalam ${context}, pasangan (x,y) memenuhi x+y=${x + y} dan x-y=${x - y}. Nilai 3x+2y adalah...`,
        answer: String(answer),
        explanation: `Dari sistem diperoleh x=${x} dan y=${y}. Jadi 3x+2y=3(${x})+2(${y})=${answer}.`,
        options: buildNumericOptions(answer, [answer + x, answer - y, (2 * x) + (3 * y)], seed),
      };
    },
    () => {
      const base = 2 + (cycle % 3);
      const exponent = cycle + 2;
      const shift = 1 + (cycle % 4);
      const answer = exponent + shift;
      return {
        prompt: `[Sulit • Logaritma] Pada ${context}, jika log_${base}(${base ** exponent}) + ${shift} = k, maka nilai k adalah...`,
        answer: String(answer),
        explanation: `log_${base}(${base ** exponent})=${exponent}. Tambah ${shift} menghasilkan ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, answer - shift, exponent * shift], seed),
      };
    },
    () => {
      const a = cycle + 2;
      const d = cycle + 5;
      const b = 2 + (cycle % 3);
      const c = 1 + (cycle % 2);
      const answer = (a * d) - (b * c);
      return {
        prompt: `[Sulit • Matriks] Determinan matriks [[${a}, ${b}], [${c}, ${d}]] pada ${context} adalah...`,
        answer: String(answer),
        explanation: `det(A)=ad-bc=${a}×${d}-${b}×${c}=${answer}.`,
        options: buildNumericOptions(answer, [answer + b, answer - c, (a * c) + (b * d)], seed),
      };
    },
    () => {
      const k = cycle + 2;
      const answer = 2 * k;
      return {
        prompt: `[Sulit • Trigonometri] Untuk ${context}, jika sin θ = 3/5 dan θ di kuadran I, maka nilai 5cos θ + ${cycle + 1} adalah...`,
        answer: String(answer),
        explanation: `Karena sin θ=3/5, maka cos θ=4/5. Jadi 5cos θ + ${cycle + 1} = 4 + ${cycle + 1} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, answer - 2, 5 + cycle], seed),
      };
    },
    () => {
      const p = cycle + 1;
      const q = cycle + 2;
      const r = cycle + 3;
      const wrong2 = p + q + r;
      const wrong3 = (p ** 2) + (q ** 2) + (r ** 2);
      return {
        prompt: `[Sulit • Dimensi Tiga] Dalam ${context}, balok memiliki rusuk ${p}, ${q}, dan ${r}. Panjang diagonal ruangnya adalah...`,
        answer: `√${(p ** 2) + (q ** 2) + (r ** 2)}`,
        explanation: `Diagonal ruang balok = √(p²+q²+r²) = √(${p ** 2}+${q ** 2}+${r ** 2}) = √${(p ** 2) + (q ** 2) + (r ** 2)}.`,
        options: shuffleDeterministic([`√${(p ** 2) + (q ** 2) + (r ** 2)}`, `√${(p ** 2) + (q ** 2)}`, String(wrong2), String(wrong3)], seed),
      };
    },
    () => {
      const root = cycle + 2;
      const rem = cycle + 3;
      const value = ((root ** 2) - 3 * root + 5);
      const answer = value - rem;
      return {
        prompt: `[Sulit • Suku Banyak] Misalkan P(x)=x²-3x+5. Pada ${context}, sisa pembagian P(x) oleh (x-${root}) adalah r. Nilai r-${rem} sama dengan...`,
        answer: String(answer),
        explanation: `Teorema sisa memberi r=P(${root})=${value}. Maka r-${rem}=${value}-${rem}=${answer}.`,
        options: buildNumericOptions(answer, [answer + rem, answer - root, value + rem], seed),
      };
    },
    () => {
      const a = cycle + 3;
      const b = cycle + 1;
      const answer = 2 * a;
      return {
        prompt: `[Sulit • Limit] Pada ${context}, nilai limit lim x→${a} (x²-${a ** 2})/(x-${a}) + ${b} adalah...`,
        answer: String(answer + b),
        explanation: `Faktorkan x²-${a ** 2}=(x-${a})(x+${a}), sehingga limit pecahan = 2${a}. Tambah ${b} menghasilkan ${answer + b}.`,
        options: buildNumericOptions(answer + b, [answer + b + 1, answer, (a ** 2) + b], seed),
      };
    },
    () => {
      const a = cycle + 2;
      const b = cycle + 5;
      const answer = (b ** 2 - a ** 2) / 2;
      return {
        prompt: `[Sulit • Integral Tentu] Dalam ${context}, nilai ∫_${a}^${b} x dx adalah...`,
        answer: String(answer),
        explanation: `∫x dx = x²/2. Jadi hasilnya = (${b}²-${a}²)/2 = (${b ** 2}-${a ** 2})/2 = ${answer}.`,
        options: buildNumericOptions(answer, [answer + a, answer - b, (b - a) * ((a + b) / 2)], seed),
      };
    },
    () => {
      const u1 = cycle + 1;
      const u2 = cycle + 3;
      const v1 = cycle + 2;
      const v2 = cycle + 4;
      const answer = (u1 * v1) + (u2 * v2);
      return {
        prompt: `[Sulit • Vektor] Pada ${context}, jika u=(${u1},${u2}) dan v=(${v1},${v2}), maka hasil dot product u·v adalah...`,
        answer: String(answer),
        explanation: `u·v = ${u1}(${v1}) + ${u2}(${v2}) = ${answer}.`,
        options: buildNumericOptions(answer, [answer + u1, answer - v2, (u1 + u2) * (v1 + v2)], seed),
      };
    },
    () => {
      const n1 = 12 + cycle;
      const n2 = 8 + cycle;
      const mean1 = 70 + cycle;
      const mean2 = 82 + cycle;
      const total = (n1 * mean1) + (n2 * mean2);
      const answer = total / (n1 + n2);
      return {
        prompt: `[Sulit • Statistika] Dalam ${context}, kelompok A berisi ${n1} data dengan rata-rata ${mean1}, kelompok B berisi ${n2} data dengan rata-rata ${mean2}. Rata-rata gabungannya adalah...`,
        answer: String(answer),
        explanation: `Mean gabungan = (${n1}×${mean1} + ${n2}×${mean2}) / (${n1}+${n2}) = ${total}/${n1 + n2} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, answer - 2, (mean1 + mean2) / 2], seed),
      };
    },
    () => {
      const x = 2 + cycle;
      const y = 4 + cycle;
      const answer = (3 * x) + (2 * y);
      return {
        prompt: `[Sulit • Program Linear] Pada ${context}, titik pojok optimum suatu model berada di (${x},${y}). Jika fungsi objektifnya Z=3x+2y, maka nilai optimum Z adalah...`,
        answer: String(answer),
        explanation: `Substitusi titik pojok optimum: Z=3(${x})+2(${y})=${answer}.`,
        options: buildNumericOptions(answer, [answer + x, answer - y, (2 * x) + (3 * y)], seed),
      };
    },
    () => {
      const h = cycle + 2;
      const k = cycle + 1;
      const r = cycle + 4;
      const answer = r ** 2;
      return {
        prompt: `[Sulit • Persamaan Lingkaran] Dalam ${context}, lingkaran berpusat di (${h},${k}) dan melalui titik (${h + r},${k}). Nilai konstanta di ruas kanan bentuk (x-${h})²+(y-${k})² = ... adalah...`,
        answer: String(answer),
        explanation: `Jari-jari = ${r}, sehingga r²=${answer}.`,
        options: buildNumericOptions(answer, [answer + r, answer - h, 2 * answer], seed),
      };
    },
    () => {
      const base = 2 + (cycle % 4);
      const exponent = cycle + 3;
      const answer = exponent - 1;
      return {
        prompt: `[Sulit • Eksponen-Logaritma] Pada ${context}, jika log_${base}(${base ** exponent}) - 1 = m, maka nilai m adalah...`,
        answer: String(answer),
        explanation: `log_${base}(${base ** exponent})=${exponent}. Kurangi 1 menjadi ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, exponent, exponent + 1], seed),
      };
    },
    () => {
      const nObj = 6 + cycle;
      const take = 2;
      const answer = (nObj * (nObj - 1)) / 2;
      return {
        prompt: `[Sulit • Kombinatorika] Dalam ${context}, dari ${nObj} calon tutor akan dipilih ${take} orang tanpa memperhatikan urutan. Banyak cara pemilihannya adalah...`,
        answer: String(answer),
        explanation: `Banyak cara = C(${nObj},2) = ${nObj}(${nObj}-1)/2 = ${answer}.`,
        options: buildNumericOptions(answer, [answer + nObj, answer - 1, nObj * (nObj - 1)], seed),
      };
    },
    () => {
      const vertex = cycle + 2;
      const minimum = -(cycle + 5);
      const x = vertex + 1;
      const answer = ((x - vertex) ** 2) + minimum;
      return {
        prompt: `[Sulit • Turunan & Optimasi] Pada ${context}, fungsi f(x)=(x-${vertex})²${minimum < 0 ? minimum : `+${minimum}`}. Nilai minimum lokal fungsi tersebut adalah...`,
        answer: String(minimum),
        explanation: `Bentuk puncak menunjukkan nilai minimum terjadi saat x=${vertex}, yaitu ${minimum}. Nilai f(${x})=${answer} hanya sebagai pengecekan bahwa titik lain lebih besar.`,
        options: buildNumericOptions(minimum, [minimum + 1, minimum - 2, answer], seed),
      };
    },
  ];

  return { id: `mcq-${moduleName}-${n}`, module: moduleName, ...variants[topic]() };
};

const createAdvancedLpdpMathQuestion = (moduleName, index) => {
  const n = index + 1;
  const topic = index % 16;
  const cycle = Math.floor(index / 16);
  const seed = seeded(moduleName, index);
  const context = pick([
    'perencanaan biaya studi dua tahun',
    'proyeksi dana hidup lintas semester',
    'cashflow proyek pemberdayaan desa',
    'simulasi endowment mini kampus',
    'anggaran riset kolaboratif',
    'evaluasi skema matching fund',
    'program inkubasi wirausaha sosial',
    'peta biaya mobilitas akademik',
  ], seed + cycle);

  const variants = [
    () => {
      const principal = ((seed % 8) + 18 + cycle) * 1_000_000;
      const rate = ((seed >> 2) % 4) + 6;
      const years = ((seed >> 4) % 3) + 2;
      const admin = (((seed >> 6) % 4) + 1) * 250_000;
      const gross = principal * ((1 + (rate / 100)) ** years);
      const answer = Math.round(gross - admin);
      return {
        prompt: `[Sulit • Bunga Majemuk Bersih] Dalam ${context}, dana awal ${formatRupiah(principal)} ditempatkan pada instrumen dengan imbal hasil ${rate}% per tahun selama ${years} tahun. Jika pada akhir periode ada biaya administrasi tetap ${formatRupiah(admin)}, nilai bersih akhirnya adalah...`,
        answer: formatRupiah(answer),
        explanation: `Hitung dulu nilai majemuk kotor P(1+r)^t = ${formatRupiah(gross)}, lalu kurangi biaya tetap ${formatRupiah(admin)} sehingga diperoleh ${formatRupiah(answer)}.`,
        options: shuffleDeterministic([
          formatRupiah(answer),
          formatRupiah(gross),
          formatRupiah(answer + admin),
          formatRupiah(Math.round(principal * (1 + (rate / 100) * years) - admin)),
        ], seed),
      };
    },
    () => {
      const target = ((seed % 7) + 24 + cycle) * 1_000_000;
      const rate = ((seed >> 2) % 4) + 5;
      const years = ((seed >> 4) % 3) + 2;
      const inflation = ((seed >> 6) % 3) + 3;
      const nominalFuture = target * ((1 + (inflation / 100)) ** years);
      const answer = Math.round(nominalFuture / ((1 + (rate / 100)) ** years));
      return {
        prompt: `[Sulit • Present Value Riil] Target biaya pada ${context} saat ini adalah ${formatRupiah(target)}. Bila biaya tersebut diperkirakan naik ${inflation}% per tahun selama ${years} tahun dan dana didiskontokan dengan tingkat ${rate}% per tahun, present value yang perlu disiapkan sekarang adalah...`,
        answer: formatRupiah(answer),
        explanation: `Naikkan dulu target menjadi future cost riil ${formatRupiah(nominalFuture)}, lalu diskontokan kembali: PV = FV/(1+r)^n = ${formatRupiah(answer)}.`,
        options: shuffleDeterministic([
          formatRupiah(answer),
          formatRupiah(Math.round(target / ((1 + (rate / 100)) ** years))),
          formatRupiah(Math.round(nominalFuture)),
          formatRupiah(Math.round(target * ((1 + (inflation - rate) / 100) ** years))),
        ], seed),
      };
    },
    () => {
      const deposit = (((seed % 6) + 5 + cycle) * 500_000);
      const rate = ((seed >> 2) % 4) + 4;
      const years = ((seed >> 4) % 3) + 3;
      const multiplier = ((((1 + (rate / 100)) ** years) - 1) / (rate / 100));
      const answer = Math.round(deposit * multiplier);
      return {
        prompt: `[Sulit • Anuitas Tabungan] Dalam ${context}, seorang peserta menabung ${formatRupiah(deposit)} pada akhir setiap tahun selama ${years} tahun ke instrumen berimbal hasil ${rate}% per tahun. Nilai masa depan tabungan itu paling dekat dengan...`,
        answer: formatRupiah(answer),
        explanation: `Gunakan future value annuity immediate: A × [((1+r)^n - 1)/r] = ${formatRupiah(answer)}.`,
        options: shuffleDeterministic([
          formatRupiah(answer),
          formatRupiah(Math.round(deposit * years)),
          formatRupiah(Math.round(deposit * ((1 + (rate / 100)) ** years))),
          formatRupiah(Math.round(answer + deposit)),
        ], seed),
      };
    },
    () => {
      const fixed = ((seed % 5) + 12 + cycle) * 1_000_000;
      const variable = (((seed >> 2) % 4) + 4) * 100_000;
      const price = variable + ((((seed >> 4) % 4) + 5) * 100_000);
      const rejectRate = (((seed >> 6) % 3) + 2) / 100;
      const effectiveMargin = price - variable - (price * rejectRate);
      const answer = Math.ceil(fixed / effectiveMargin);
      return {
        prompt: `[Sulit • Break-even dengan Reject Rate] Pada ${context}, biaya tetap ${formatRupiah(fixed)}, biaya variabel per unit ${formatRupiah(variable)}, dan harga per unit ${formatRupiah(price)}. Jika setiap unit menanggung kehilangan pendapatan rata-rata ${formatPercent(rejectRate * 100)} karena reject/retur, jumlah unit minimum untuk impas adalah...`,
        answer: `${answer} unit`,
        explanation: `Margin efektif per unit = harga - biaya variabel - loss reject = ${formatRupiah(effectiveMargin)}. Maka BEP = ceil(${fixed}/${Math.round(effectiveMargin)}) = ${answer} unit.`,
        options: shuffleDeterministic([
          `${answer} unit`,
          `${Math.max(1, answer - 1)} unit`,
          `${answer + 2} unit`,
          `${Math.ceil(fixed / (price - variable))} unit`,
        ], seed),
      };
    },
    () => {
      const scores = [
        ((seed % 11) + 68),
        (((seed >> 2) % 11) + 72),
        (((seed >> 4) % 9) + 78),
      ];
      const weights = [2, 3, 5];
      const answer = Number(((scores[0] * weights[0] + scores[1] * weights[1] + scores[2] * weights[2]) / 10).toFixed(1));
      return {
        prompt: `[Sulit • Rata-rata Tertimbang] Dalam ${context}, tiga komponen evaluasi memiliki skor ${scores.join(', ')} dengan bobot berturut-turut ${weights.join(':')}. Nilai akhir tertimbang peserta adalah...`,
        answer: answer.toString(),
        explanation: `Hitung jumlah berbobot lalu bagi total bobot: (${scores[0]}×2 + ${scores[1]}×3 + ${scores[2]}×5)/10 = ${answer}.`,
        options: shuffleDeterministic([
          answer.toString(),
          Number((answer + 1.2).toFixed(1)).toString(),
          Number((answer - 1.1).toFixed(1)).toString(),
          Math.round((scores[0] + scores[1] + scores[2]) / 3).toString(),
        ], seed),
      };
    },
    () => {
      const base = ((seed % 7) + 11 + cycle) * 1_000_000;
      const inc = ((seed >> 2) % 5) + 8;
      const dec = ((seed >> 4) % 4) + 5;
      const tax = ((seed >> 6) % 3) + 2;
      const answer = Math.round(base * (1 + (inc / 100)) * (1 - (dec / 100)) * (1 + (tax / 100)));
      return {
        prompt: `[Sulit • Persentase Bertingkat] Pada ${context}, biaya awal ${formatRupiah(base)} naik ${inc}%, lalu didiskon ${dec}%, kemudian dikenai pajak administrasi ${tax}%. Nilai akhir yang harus dibayar adalah...`,
        answer: formatRupiah(answer),
        explanation: `Terapkan berurutan, bukan menjumlahkan persen: ${base} × (1+${inc}%) × (1-${dec}%) × (1+${tax}%) = ${formatRupiah(answer)}.`,
        options: shuffleDeterministic([
          formatRupiah(answer),
          formatRupiah(Math.round(base * (1 + ((inc - dec + tax) / 100)))),
          formatRupiah(Math.round(base * (1 + (inc / 100)) * (1 - (dec / 100)))),
          formatRupiah(Math.round(answer + 200_000)),
        ], seed),
      };
    },
    () => {
      const scholarship = ((seed % 8) + 10 + cycle) * 5;
      const living = ((seed >> 2) % 6) + 12;
      const books = ((seed >> 4) % 5) + 4;
      const travel = ((seed >> 6) % 5) + 3;
      const total = living + books + travel;
      const g = gcd(scholarship, scholarship + total);
      const answer = `${scholarship / g}/${(scholarship + total) / g}`;
      return {
        prompt: `[Sulit • Probabilitas Bersyarat] Dalam ${context}, dari ${scholarship + total} pengajuan, ${scholarship} lolos pendanaan penuh. Sisanya terbagi pada kategori living=${living}, buku=${books}, dan mobilitas=${travel}. Jika sebuah berkas diketahui lolos salah satu komponen pendanaan, peluang berkas itu lolos pendanaan penuh adalah...`,
        answer,
        explanation: `Karena semua berkas pada himpunan ini lolos setidaknya satu komponen, peluang bersyaratnya = ${scholarship}/${scholarship + total} = ${answer}.`,
        options: shuffleDeterministic([
          answer,
          `${scholarship}/${scholarship + total}`,
          `${living}/${scholarship + total}`,
          `${scholarship}/${total}`,
        ], seed),
      };
    },
    () => {
      const success = (((seed % 5) + 4) / 10);
      const grant = ((seed >> 2) % 6) + 7;
      const failCost = ((seed >> 5) % 3) + 2;
      const answer = Number(((success * grant) - ((1 - success) * failCost)).toFixed(2));
      return {
        prompt: `[Sulit • Expected Value] Pada ${context}, sebuah intervensi memiliki peluang berhasil ${formatPercent(success * 100)}. Jika berhasil, manfaat bersih dinilai ${grant} poin; jika gagal, terjadi kerugian ${failCost} poin. Nilai harapan bersih intervensi tersebut adalah...`,
        answer: answer.toString(),
        explanation: `EV = p×gain - (1-p)×loss = ${success}×${grant} - ${Number((1 - success).toFixed(2))}×${failCost} = ${answer}.`,
        options: shuffleDeterministic([
          answer.toString(),
          Number((answer + 0.8).toFixed(2)).toString(),
          Number((answer - 0.8).toFixed(2)).toString(),
          (grant - failCost).toString(),
        ], seed),
      };
    },
    () => {
      const teamA = ((seed % 4) + 4);
      const teamB = ((seed >> 2) % 5) + 5;
      const daysA = ((seed >> 4) % 4) + 6;
      const rateA = 1 / daysA;
      const rateB = rateA * (teamB / teamA);
      const downtime = ((seed >> 6) % 2) + 1;
      const answer = Number((1 / (rateA + rateB) + downtime).toFixed(2));
      return {
        prompt: `[Sulit • Work Rate dengan Downtime] Dalam ${context}, tim A beranggotakan ${teamA} analis menyelesaikan satu model dalam ${daysA} hari. Tim B beranggotakan ${teamB} analis dengan produktivitas per orang sama. Jika kedua tim bekerja bersama tetapi terdapat downtime koordinasi ${downtime} hari, total waktu penyelesaian model adalah...`,
        answer: `${answer} hari`,
        explanation: `Laju A = 1/${daysA}, laju B = (${teamB}/${teamA})×1/${daysA}. Waktu gabungan = 1/(laju A + laju B), lalu tambah downtime ${downtime} hari = ${answer} hari.`,
        options: shuffleDeterministic([
          `${answer} hari`,
          `${Number((answer + 1).toFixed(2))} hari`,
          `${Number((answer - 1).toFixed(2))} hari`,
          `${daysA + downtime} hari`,
        ], seed),
      };
    },
    () => {
      const start = ((seed % 8) + 8 + cycle) * 10;
      const end = start + ((((seed >> 2) % 5) + 4) * 10);
      const years = ((seed >> 4) % 3) + 2;
      const answer = Number((((end / start) ** (1 / years) - 1) * 100).toFixed(2));
      return {
        prompt: `[Sulit • CAGR] Pada ${context}, indikator naik dari ${start} menjadi ${end} dalam ${years} tahun. Compound annual growth rate (CAGR) indikator tersebut adalah...`,
        answer: formatPercent(answer),
        explanation: `CAGR = ((${end}/${start})^(1/${years}) - 1) × 100% = ${formatPercent(answer)}.`,
        options: shuffleDeterministic([
          formatPercent(answer),
          formatPercent(Number((((end - start) / start) * 100 / years).toFixed(2))),
          formatPercent(Number((answer + 1.2).toFixed(2))),
          formatPercent(Number((answer - 0.9).toFixed(2))),
        ], seed),
      };
    },
    () => {
      const budget = ((seed % 7) + 18 + cycle) * 1_000_000;
      const costA = (((seed >> 2) % 3) + 3) * 1_000_000;
      const costB = (((seed >> 4) % 4) + 2) * 1_000_000;
      const minA = ((seed >> 6) % 3) + 2;
      const remaining = budget - (minA * costA);
      const answer = Math.floor(remaining / costB);
      return {
        prompt: `[Sulit • Optimasi Anggaran Integer] Dalam ${context}, total anggaran ${formatRupiah(budget)} harus membiayai minimal ${minA} paket riset tipe A dengan biaya ${formatRupiah(costA)} per paket dan sisanya dapat dipakai untuk paket tipe B seharga ${formatRupiah(costB)} per paket. Jumlah maksimum paket tipe B yang masih dapat dibiayai adalah...`,
        answer: `${answer} paket`,
        explanation: `Setelah memenuhi minimal tipe A, sisa anggaran = ${formatRupiah(remaining)}. Banyak paket B maksimum = floor(sisa/${formatRupiah(costB)}) = ${answer}.`,
        options: shuffleDeterministic([
          `${answer} paket`,
          `${Math.max(0, answer - 1)} paket`,
          `${answer + 1} paket`,
          `${Math.floor(budget / costB)} paket`,
        ], seed),
      };
    },
    () => {
      const concentrationA = ((seed % 4) + 18);
      const concentrationB = concentrationA + (((seed >> 2) % 4) + 6);
      const volumeA = ((seed >> 4) % 4) + 3;
      const volumeB = ((seed >> 6) % 5) + 4;
      const answer = Number((((concentrationA * volumeA) + (concentrationB * volumeB)) / (volumeA + volumeB)).toFixed(2));
      return {
        prompt: `[Sulit • Campuran Tertimbang] Pada ${context}, dua sumber data memiliki akurasi ${concentrationA}% dan ${concentrationB}% dengan bobot volume ${volumeA} dan ${volumeB}. Akurasi tertimbang setelah digabung adalah...`,
        answer: formatPercent(answer),
        explanation: `Gunakan weighted mean: (${concentrationA}×${volumeA} + ${concentrationB}×${volumeB})/(${volumeA + volumeB}) = ${formatPercent(answer)}.`,
        options: shuffleDeterministic([
          formatPercent(answer),
          formatPercent(Number(((concentrationA + concentrationB) / 2).toFixed(2))),
          formatPercent(Number((answer + 1.5).toFixed(2))),
          formatPercent(Number((answer - 1.25).toFixed(2))),
        ], seed),
      };
    },
    () => {
      const baseline = ((seed % 7) + 55);
      const month1 = baseline + (((seed >> 2) % 6) + 4);
      const month2 = month1 - (((seed >> 4) % 4) + 1);
      const month3 = month2 + (((seed >> 6) % 5) + 3);
      const answer = Number((((month1 + month2 + month3) / 3) - baseline).toFixed(2));
      return {
        prompt: `[Sulit • Deviasi Rata-rata dari Baseline] Dalam ${context}, baseline indikator adalah ${baseline}. Tiga observasi berikutnya berturut-turut ${month1}, ${month2}, dan ${month3}. Selisih rata-rata tiga observasi terhadap baseline adalah...`,
        answer: answer.toString(),
        explanation: `Rata-rata observasi = ${Number(((month1 + month2 + month3) / 3).toFixed(2))}. Kurangi baseline ${baseline} sehingga diperoleh ${answer}.`,
        options: shuffleDeterministic([
          answer.toString(),
          Number((answer + 1).toFixed(2)).toString(),
          Number((answer - 1).toFixed(2)).toString(),
          Number((((month3 - baseline))).toFixed(2)).toString(),
        ], seed),
      };
    },
    () => {
      const grantA = ((seed % 5) + 3);
      const grantB = ((seed >> 2) % 4) + 2;
      const grantC = ((seed >> 4) % 3) + 1;
      const total = grantA + grantB + grantC + ((seed >> 6) % 4) + 3;
      const answer = `${grantA + grantB}/${total}`;
      const g = gcd(grantA + grantB, total);
      const simplified = `${(grantA + grantB) / g}/${total / g}`;
      return {
        prompt: `[Sulit • Probabilitas Gabungan] Pada ${context}, terdapat ${grantA} proposal kategori A, ${grantB} kategori B, ${grantC} kategori C, dan sisanya kategori D hingga total proposal ${total}. Jika dipilih satu proposal acak, peluang terambil proposal kategori A atau B adalah...`,
        answer: simplified,
        explanation: `P(A atau B) = (${grantA}+${grantB})/${total} = ${answer}, lalu sederhanakan menjadi ${simplified}.`,
        options: shuffleDeterministic([
          simplified,
          answer,
          `${grantA}/${total}`,
          `${grantB + grantC}/${total}`,
        ], seed),
      };
    },
    () => {
      const term1 = ((seed % 6) + 8);
      const diff = ((seed >> 2) % 4) + 3;
      const periods = ((seed >> 4) % 4) + 5;
      const answer = (periods / 2) * ((2 * term1) + ((periods - 1) * diff));
      return {
        prompt: `[Sulit • Deret Aritmetika Anggaran] Dalam ${context}, alokasi semester pertama ${term1} unit dan tiap semester naik tetap ${diff} unit selama ${periods} semester. Total alokasi kumulatif seluruh semester adalah...`,
        answer: String(answer),
        explanation: `Jumlah deret aritmetika: n/2 [2a + (n-1)d] = ${answer}.`,
        options: buildNumericOptions(answer, [answer + diff, answer - term1, term1 * periods], seed),
      };
    },
    () => {
      const male = ((seed % 5) + 7);
      const female = ((seed >> 2) % 4) + 6;
      const choose = 2;
      const answer = (male * female) + (((male * (male - 1)) / 2));
      return {
        prompt: `[Sulit • Kombinatorika Seleksi] Pada ${context}, tersedia ${male} kandidat STEM dan ${female} kandidat sosial-kebijakan. Jika dipilih 2 orang dengan syarat minimal satu berasal dari STEM, banyak cara pemilihannya adalah...`,
        answer: String(answer),
        explanation: `Kasus valid = (1 STEM, 1 sosial) + (2 STEM) = ${male}×${female} + C(${male},${choose}) = ${answer}.`,
        options: buildNumericOptions(answer, [answer + female, answer - male, (male + female) * 2], seed),
      };
    },
    () => {
      const total = ((seed % 6) + 15 + cycle) * 1_000_000;
      const ratio = [((seed >> 2) % 3) + 2, ((seed >> 4) % 4) + 3, ((seed >> 6) % 3) + 2];
      const parts = ratio.reduce((acc, value) => acc + value, 0);
      const reserve = ((seed >> 8) % 3) + 1;
      const distributable = total * (1 - (reserve / 10));
      const answer = Math.round((distributable * ratio[1]) / parts);
      return {
        prompt: `[Sulit • Rasio dengan Dana Cadangan] Dalam ${context}, total anggaran ${formatRupiah(total)} menyisihkan ${reserve * 10}% sebagai cadangan. Sisa anggaran dibagi untuk tiga komponen dengan rasio ${ratio.join(':')}. Besar porsi komponen kedua adalah...`,
        answer: formatRupiah(answer),
        explanation: `Dana yang dibagi = ${formatRupiah(distributable)}. Bagian kedua = ${ratio[1]}/${parts} × ${formatRupiah(distributable)} = ${formatRupiah(answer)}.`,
        options: shuffleDeterministic([
          formatRupiah(answer),
          formatRupiah(Math.round((total * ratio[1]) / parts)),
          formatRupiah(Math.round(answer + 500_000)),
          formatRupiah(Math.round(answer - 500_000)),
        ], seed),
      };
    },
  ];

  return { id: `mcq-${moduleName}-${n}`, module: moduleName, ...variants[topic]() };
};

const lpdpThemes = [
  'hilirisasi riset daerah',
  'transformasi layanan publik digital',
  'penguatan SDM STEM',
  'ketahanan pangan adaptif iklim',
  'pengurangan stunting berbasis data',
  'reformasi tata kelola pendidikan vokasi',
  'dekarbonisasi industri regional',
  'kewirausahaan sosial untuk 3T',
];
const lpdpAngles = [
  'integritas pengambilan keputusan',
  'prioritisasi trade-off anggaran',
  'kolaborasi multipihak',
  'monitoring dan evaluasi',
  'mitigasi resistensi pemangku kepentingan',
  'desain implementasi bertahap',
  'skema exit strategy',
  'indikator outcome jangka menengah',
];

const createAdvancedLpdpSubstanceQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 12;
  const cycle = Math.floor(index / 12);
  const theme = lpdpThemes[index % lpdpThemes.length];
  const angle = lpdpAngles[Math.floor(index / lpdpThemes.length) % lpdpAngles.length];
  const challenge = pick([
    'dukungan politik berubah di tengah program',
    'data baseline tidak lengkap antarwilayah',
    'kapasitas tim daerah sangat timpang',
    'deadline donor terlalu agresif',
    'resistensi komunitas lokal cukup tinggi',
    'koordinasi lintas kementerian berjalan lambat',
  ], seed + cycle);

  const variants = [
    () => {
      const answer = `Memetakan masalah inti ${theme}, menjelaskan target outcome 12 bulan, lalu menunjukkan ${angle} beserta indikator, risiko, dan adaptasi bila ${challenge}.`;
      return {
        prompt: `[Sulit • Substansi LPDP] Dalam wawancara tentang ${theme}, jawaban paling kuat untuk menunjukkan ${angle} ketika ${challenge} adalah...`,
        answer,
        explanation: 'Jawaban yang kuat pada substansi LPDP harus menurunkan visi menjadi outcome, indikator, risiko, dan mekanisme adaptasi; bukan sekadar slogan kontribusi.',
        options: shuffleDeterministic([
          answer,
          `Menonjolkan motivasi pribadi terhadap ${theme} tanpa menjelaskan ukuran keberhasilan maupun mitigasi ${challenge}.`,
          `Menyampaikan bahwa ${theme} penting, lalu menunggu arahan lengkap pemerintah sebelum menyusun rencana kontribusi.`,
          `Fokus pada kepopuleran isu ${theme} agar pewawancara menangkap antusiasme meski ${angle} belum operasional.`,
        ], seed),
      };
    },
    () => {
      const answer = 'Menyusun theory of change sederhana: input → aktivitas → output → outcome, lalu menyebut asumsi kunci yang perlu diuji di lapangan.';
      return {
        prompt: `[Sulit • Theory of Change] Saat diminta menjelaskan bagaimana studi Anda akan berdampak pada ${theme}, respons terbaik adalah...`,
        answer,
        explanation: 'LPDP biasanya mencari alur kontribusi yang logis dan dapat diuji, bukan hanya niat baik yang abstrak.',
        options: shuffleDeterministic([
          answer,
          'Menjelaskan daftar mata kuliah yang ingin diambil tanpa menghubungkannya ke perubahan nyata di Indonesia.',
          'Menyebut outcome akhir yang sangat besar tetapi sengaja menghindari asumsi agar terdengar lebih pasti.',
          'Langsung membahas gelar dan reputasi kampus sebagai bukti bahwa dampak otomatis akan terjadi.',
        ], seed),
      };
    },
    () => {
      const answer = 'Memetakan stakeholder berdasarkan pengaruh dan kepentingan, lalu menentukan siapa yang harus diajak co-design, siapa yang cukup diinformasikan, dan siapa yang perlu dikelola resistensinya.';
      return {
        prompt: `[Sulit • Stakeholder Mapping] Untuk kasus ${theme} dengan kondisi ${challenge}, jawaban wawancara paling matang terkait kolaborasi multipihak adalah...`,
        answer,
        explanation: 'Pendekatan multipihak yang baik harus menunjukkan prioritas aktor dan strategi keterlibatan yang berbeda, bukan mengundang semua pihak tanpa hirarki.',
        options: shuffleDeterministic([
          answer,
          'Mengajak sebanyak mungkin pihak sejak awal tanpa memilah kepentingan agar proses tampak inklusif.',
          'Menghindari aktor yang berpotensi menolak agar implementasi terasa lebih cepat pada tahap awal.',
          'Menyerahkan seluruh komunikasi pemangku kepentingan pada konsultan eksternal agar lebih netral.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menjelaskan prioritas minimum yang tidak boleh dikorbankan, item yang bisa ditunda, dan dasar evidence mengapa penyesuaian tersebut tetap menjaga outcome inti.';
      return {
        prompt: `[Sulit • Trade-off Anggaran] Jika pendanaan untuk program ${theme} dipotong 30% tepat sebelum implementasi, jawaban substansi terbaik adalah...`,
        answer,
        explanation: 'Pada level sulit, pewawancara ingin melihat kemampuan menjaga tujuan inti sambil mengambil keputusan prioritas secara eksplisit.',
        options: shuffleDeterministic([
          answer,
          'Mempertahankan semua komponen seperti semula sambil berharap efisiensi muncul selama pelaksanaan.',
          'Memotong komponen yang paling sulit dijelaskan terlebih dahulu agar presentasi tetap sederhana.',
          'Menunda seluruh program hingga anggaran kembali penuh agar desain tidak berubah.',
        ], seed),
      };
    },
    () => {
      const answer = 'Mengakui keterbatasan baseline, menetapkan proxy metric sementara yang defensible, dan menjelaskan rencana memperbaiki kualitas data pada fase awal implementasi.';
      return {
        prompt: `[Sulit • Baseline Lemah] Saat ditanya bagaimana mengukur keberhasilan ${theme} jika ${challenge}, jawaban paling kuat adalah...`,
        answer,
        explanation: 'Respons matang tidak menutupi kelemahan data; justru menunjukkan cara tetap mengambil keputusan sambil memperbaiki basis evidensinya.',
        options: shuffleDeterministic([
          answer,
          'Menunggu data sempurna sebelum menyusun indikator agar evaluasi bebas dari kritik.',
          'Menggunakan satu angka nasional sebagai pengganti seluruh baseline daerah tanpa penyesuaian.',
          'Mengganti seluruh indikator outcome menjadi narasi kualitatif agar tidak bergantung pada data awal.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menolak intervensi yang melanggar tata kelola, menjelaskan risiko jangka panjangnya, lalu menawarkan alternatif yang tetap menjaga target namun sesuai prinsip integritas.';
      return {
        prompt: `[Sulit • Integritas Keputusan] Dalam simulasi wawancara, Anda diminta merespons tekanan untuk mempercepat ${theme} dengan mem-bypass prosedur. Sikap terbaik adalah...`,
        answer,
        explanation: 'Sinyal penting pada seleksi substansi LPDP adalah integritas: berani menolak shortcut yang merusak legitimasi program.',
        options: shuffleDeterministic([
          answer,
          'Menerima percepatan informal selama dampaknya dinilai positif dan tidak menimbulkan protes publik.',
          'Mengikuti arahan senior terlebih dahulu karena tanggung jawab akhir ada pada atasan.',
          'Diam terhadap pelanggaran kecil agar hubungan kerja tetap harmonis sebelum program berjalan penuh.',
        ], seed),
      };
    },
    () => {
      const answer = 'Memulai dengan pilot terukur, mendokumentasikan pelajaran implementasi, lalu menyebut kriteria objektif kapan program layak diperluas dan kapan harus dihentikan.';
      return {
        prompt: `[Sulit • Scaling Strategy] Ketika ditanya strategi memperluas solusi ${theme} secara nasional, respons wawancara yang paling kuat adalah...`,
        answer,
        explanation: 'Jawaban sulit yang baik menampilkan disiplin scaling: ada fase uji, learning loop, dan threshold ekspansi yang jelas.',
        options: shuffleDeterministic([
          answer,
          'Mendorong ekspansi nasional sejak awal agar manfaat program segera terasa luas.',
          'Menyamakan keberhasilan satu pilot sebagai bukti bahwa model berlaku otomatis di seluruh daerah.',
          'Fokus pada pencitraan keberhasilan awal agar dukungan politik tidak turun saat scale-up.',
        ], seed),
      };
    },
    () => {
      const answer = 'Mengaitkan studi, jejaring, dan kompetensi yang dibangun dengan posisi atau platform konkret setelah pulang, termasuk institusi target, horizon waktu, dan bentuk kontribusi awal.';
      return {
        prompt: `[Sulit • Komitmen Kembali] Saat pewawancara menggali komitmen kembali ke Indonesia untuk isu ${theme}, jawaban paling meyakinkan adalah...`,
        answer,
        explanation: 'Komitmen kembali yang kuat harus spesifik: ke mana pulang, melakukan apa, dengan siapa, dan dalam jangka waktu berapa lama.',
        options: shuffleDeterministic([
          answer,
          'Menegaskan bahwa pulang adalah prioritas moral tanpa perlu menyebut posisi atau kendaraan implementasi.',
          'Menyatakan siap bekerja di mana saja nanti sambil melihat peluang paling nyaman setelah lulus.',
          'Fokus pada peluang karier global terlebih dahulu baru mempertimbangkan kontribusi saat sudah mapan.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menyampaikan satu kegagalan nyata, pelajaran yang ditarik, perubahan sistem yang dibuat setelahnya, dan bagaimana pembelajaran itu relevan untuk ${theme}.';
      return {
        prompt: `[Sulit • Refleksi Kegagalan] Bila diminta menceritakan kegagalan kepemimpinan yang relevan dengan ${theme}, respons paling kuat adalah...`,
        answer,
        explanation: 'Pewawancara biasanya lebih menghargai refleksi jujur yang menunjukkan learning loop ketimbang cerita sempurna tanpa koreksi diri.',
        options: shuffleDeterministic([
          answer,
          'Memilih contoh yang sangat kecil agar aman dan tidak membuka kemungkinan dinilai negatif.',
          'Menceritakan kegagalan tim sepenuhnya sebagai akibat orang lain tanpa menyebut bagian tanggung jawab diri.',
          'Menghindari kegagalan dan menggantinya dengan cerita keberhasilan agar kesan profesional tetap terjaga.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menjelaskan desain M&E yang memadukan indikator output, outcome, dan umpan balik lapangan sehingga keputusan koreksi bisa dilakukan sebelum program terlambat.';
      return {
        prompt: `[Sulit • Monitoring dan Evaluasi] Dalam konteks ${theme}, jawaban wawancara paling matang tentang M&E adalah...`,
        answer,
        explanation: 'M&E yang baik tidak berhenti pada pelaporan output; harus ada sinyal dini untuk koreksi implementasi.',
        options: shuffleDeterministic([
          answer,
          'Menyusun indikator sebanyak mungkin agar evaluasi terlihat komprehensif walau sulit digunakan.',
          'Mengutamakan output karena outcome dianggap terlalu lama untuk dinilai selama program berjalan.',
          'Menyerahkan evaluasi akhir pada auditor eksternal tanpa mekanisme learning internal.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menyeimbangkan bukti kuantitatif dengan wawasan lapangan, lalu menjelaskan kapan data harus diutamakan dan kapan konteks lokal menuntut penyesuaian kebijakan.';
      return {
        prompt: `[Sulit • Evidence vs Context] Jika pewawancara menantang Anda karena data pusat berbeda dengan aspirasi lapangan pada isu ${theme}, jawaban terbaik adalah...`,
        answer,
        explanation: 'Seleksi substansi sulit biasanya menguji apakah kandidat mampu berpikir evidence-based tanpa buta konteks.',
        options: shuffleDeterministic([
          answer,
          'Mengikuti data pusat sepenuhnya karena angka dianggap selalu lebih objektif daripada pengalaman lapangan.',
          'Mengikuti aspirasi lokal sepenuhnya agar program diterima meski bertentangan dengan evidence yang ada.',
          'Menghindari posisi yang tegas dan menunda keputusan sampai semua pihak sepakat total.',
        ], seed),
      };
    },
    () => {
      const answer = 'Menutup jawaban dengan prioritas 100 hari pertama: pemetaan aktor, quick wins yang realistis, indikator awal, dan mekanisme akuntabilitas publik.';
      return {
        prompt: `[Sulit • 100 Hari Pertama] Saat diminta membuat rencana awal kontribusi untuk ${theme}, jawaban substansi paling tajam adalah...`,
        answer,
        explanation: 'Rencana 100 hari menguji kemampuan menerjemahkan visi ke eksekusi awal yang konkret dan akuntabel.',
        options: shuffleDeterministic([
          answer,
          'Menyusun target lima tahun langsung tanpa menjelaskan pijakan implementasi bulan pertama.',
          'Berfokus pada membangun citra program dahulu agar dukungan publik terbentuk sebelum detail dirumuskan.',
          'Menunggu struktur organisasi final sebelum menyiapkan langkah awal sama sekali.',
        ], seed),
      };
    },
  ];

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...variants[topic](),
  };
};

const tpaRelations = [
  ['arsitek', 'cetak biru', 'peneliti', 'protokol'],
  ['hakim', 'putusan', 'analis', 'rekomendasi'],
  ['kurator', 'koleksi', 'editor', 'naskah'],
  ['navigator', 'peta', 'epidemiolog', 'surveilans'],
  ['katalis', 'reaksi', 'mentor', 'pengembangan'],
  ['auditor', 'kepatuhan', 'dokter', 'triase'],
];
const tpaFallacies = [
  ['Setelah kebijakan A diberlakukan, kinerja naik; berarti A pasti satu-satunya penyebab.', 'post hoc / false cause'],
  ['Usul itu salah karena dia bukan lulusan kampus top.', 'ad hominem'],
  ['Hanya ada dua pilihan: terapkan program sekarang atau biarkan masalah memburuk.', 'false dilemma'],
  ['Sampel dua kota dianggap mewakili seluruh Indonesia.', 'hasty generalization'],
];

const tpaAcademicWords = [
  ['abstrak', 'konkret'],
  ['sahih', 'cacat'],
  ['gamblang', 'kabur'],
  ['parsial', 'menyeluruh'],
  ['inferensial', 'eksplisit'],
  ['redundan', 'esensial'],
  ['koheren', 'acak'],
  ['objektif', 'tendensius'],
];
const tpaConnectors = [
  ['namun', 'pertentangan'],
  ['karena itu', 'kesimpulan'],
  ['sebaliknya', 'kontras dua arah'],
  ['meskipun demikian', 'konsesi'],
  ['selain itu', 'penambahan argumen'],
  ['akibatnya', 'hubungan sebab-akibat'],
];
const tpaInferenceCases = [
  {
    passage: 'Dalam uji coba pertama, akurasi model naik 11%, tetapi hanya pada data yang sudah dibersihkan manual. Pada data mentah, peningkatan tidak signifikan.',
    answer: 'Kenaikan performa model bergantung pada kualitas pra-pemrosesan data.',
    distractors: [
      'Model pasti gagal diterapkan pada semua data mentah.',
      'Pra-pemrosesan manual selalu tidak diperlukan.',
      'Akurasi model turun pada semua kondisi.',
    ],
  },
  {
    passage: 'Sebagian besar peserta dengan skor tinggi menyelesaikan soal lebih lambat dari median, tetapi tingkat kesalahan mereka jauh lebih rendah.',
    answer: 'Kecepatan tinggi tidak selalu lebih menentukan daripada akurasi pada tes ini.',
    distractors: [
      'Peserta tercepat pasti memperoleh skor tertinggi.',
      'Semua peserta lambat memiliki skor tinggi.',
      'Median waktu selalu menjadi target terbaik.',
    ],
  },
  {
    passage: 'Ketika distraktor diperhalus, proporsi jawaban salah meningkat terutama pada peserta yang membaca premis terakhir secara terburu-buru.',
    answer: 'Ketelitian membaca premis akhir memengaruhi kemampuan menghindari distraktor halus.',
    distractors: [
      'Distraktor halus selalu mudah dideteksi.',
      'Premis terakhir tidak relevan terhadap jawaban.',
      'Peserta cermat justru lebih sering tertipu.',
    ],
  },
  {
    passage: 'Setelah tabel diubah dari angka mentah ke rasio per orang, peringkat efisiensi tim berubah total walaupun output absolut tidak berubah.',
    answer: 'Kesimpulan efisiensi dapat berubah jika ukuran pembanding yang dipakai juga berubah.',
    distractors: [
      'Output absolut tidak pernah boleh dipakai.',
      'Rasio per orang selalu identik dengan total output.',
      'Tim dengan output terbesar pasti tetap paling efisien.',
    ],
  },
];
const tpaAssumptionCases = [
  {
    argument: 'Program pelatihan ini layak diperluas nasional karena tingkat kelulusannya 92% di tiga kota pilot.',
    answer: 'Tiga kota pilot cukup mewakili variasi konteks implementasi yang lebih luas.',
  },
  {
    argument: 'Kampus sebaiknya mengganti seluruh tryout lama dengan format digital karena nilai rerata peserta digital lebih tinggi.',
    answer: 'Kenaikan rerata tidak semata-mata disebabkan oleh perbedaan karakteristik peserta.',
  },
  {
    argument: 'Divisi riset harus menambah staf karena backlog laporan naik 30% dalam dua bulan terakhir.',
    answer: 'Kenaikan backlog tidak dapat diselesaikan memadai hanya dengan perbaikan alur kerja yang ada.',
  },
  {
    argument: 'Kelas intensif malam lebih efektif, sebab peserta malam melaporkan kepuasan lebih tinggi.',
    answer: 'Tingkat kepuasan mempunyai hubungan relevan dengan efektivitas belajar yang dimaksud.',
  },
];
const tpaCodingPairs = [
  ['LOGIKA', 'MPHJLB'],
  ['NALAR', 'OBMBS'],
  ['KRITIS', 'LSJUJT'],
  ['VALID', 'WBMJE'],
];

const createAdvancedTpaQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 20;
  const cycle = Math.floor(index / 20);

  const variants = [
    () => {
      const [a, b, c, d] = tpaRelations[index % tpaRelations.length];
      const extra = pick(['instrumen inti', 'produk kerja utama', 'alat representasi utama', 'hasil analisis khas'], seed);
      return {
        prompt: `[Sulit • Analogi Profesi] ${a} : ${b} = ${c} : ... (fokus pada ${extra})`,
        answer: d,
        explanation: `Hubungan yang dipakai adalah pelaku dengan ${extra} yang paling melekat pada perannya.`,
        options: shuffleDeterministic([d, a, b, 'verifikasi'], seed),
      };
    },
    () => {
      const pairs = [
        ['hipotesis', 'pengujian', 'diagnosis', 'pemeriksaan'],
        ['kurikulum', 'implementasi', 'kebijakan', 'regulasi'],
        ['data', 'validasi', 'argumen', 'evaluasi'],
        ['sampel', 'representativitas', 'instrumen', 'reliabilitas'],
      ];
      const [a, b, c, d] = pairs[(cycle + index) % pairs.length];
      return {
        prompt: `[Sulit • Analogi Konseptual] ${a} : ${b} = ${c} : ...`,
        answer: d,
        explanation: `${b} merupakan proses/kriteria utama yang melekat pada ${a}; pola yang sama dipakai untuk ${c}.`,
        options: shuffleDeterministic([d, a, b, 'interpretasi'], seed),
      };
    },
    () => {
      const groups = [
        {
          words: ['deduktif', 'induktif', 'analitis', 'berlari'],
          answer: 'berlari',
          reason: 'tiga kata lain adalah istilah mode bernalar',
        },
        {
          words: ['premis', 'konklusi', 'inferensi', 'arsip'],
          answer: 'arsip',
          reason: 'tiga kata lain adalah komponen penalaran',
        },
        {
          words: ['koheren', 'konsisten', 'valid', 'berenang'],
          answer: 'berenang',
          reason: 'tiga kata lain adalah sifat argumen/penyajian',
        },
      ];
      const item = groups[(cycle + seed) % groups.length];
      return {
        prompt: `[Sulit • Klasifikasi Verbal] Manakah yang tidak sekelompok: ${item.words.join(', ')}?`,
        answer: item.answer,
        explanation: `${item.answer} berbeda karena ${item.reason}.`,
        options: shuffleDeterministic(item.words, seed),
      };
    },
    () => {
      const [word, opposite] = tpaAcademicWords[(index + cycle) % tpaAcademicWords.length];
      const near = {
        konkret: ['fisik', 'padat'],
        cacat: ['lemah', 'semu'],
        kabur: ['dangkal', 'rumit'],
        menyeluruh: ['umum', 'luas'],
        eksplisit: ['langsung', 'terang'],
        esensial: ['utama', 'penting'],
        acak: ['bebas', 'liar'],
        tendensius: ['bias', 'sepihak'],
      };
      return {
        prompt: `[Sulit • Antonim Akademik] Lawan kata yang paling tepat untuk "${word}" adalah...`,
        answer: opposite,
        explanation: `Yang dicari adalah antonim akademik paling presisi untuk ${word}.`,
        options: shuffleDeterministic([opposite, ...near[opposite], word], seed),
      };
    },
    () => {
      const synonyms = [
        ['sahih', 'valid'],
        ['gamblang', 'jelas'],
        ['redundan', 'berlebih'],
        ['parsial', 'sebagian'],
        ['koheren', 'padu'],
        ['implisit', 'tersirat'],
      ];
      const [word, answer] = synonyms[(cycle + index) % synonyms.length];
      return {
        prompt: `[Sulit • Sinonim Akademik] Makna yang paling dekat dengan kata "${word}" adalah...`,
        answer,
        explanation: `Pada konteks akademik, ${word} paling dekat dengan ${answer}.`,
        options: shuffleDeterministic([answer, 'acak', 'dangkal', 'reaktif'], seed),
      };
    },
    () => {
      const [connector, functionLabel] = tpaConnectors[(index + cycle) % tpaConnectors.length];
      const sentences = [
        `Data awal menunjukkan korelasi cukup kuat; ___, peneliti tetap menolak menyimpulkan hubungan sebab-akibat karena desainnya observasional.`,
        `Tim A menghasilkan output paling tinggi; ___, setelah dihitung per anggota, efisiensinya justru bukan yang terbaik.`,
        `Instrumen versi kedua lebih ringkas; ___, reliabilitasnya perlu diuji ulang sebelum dipakai luas.`,
      ];
      const stem = sentences[(seed + cycle) % sentences.length].replace('___', connector);
      const wrongs = tpaConnectors.map(([item]) => item).filter((item) => item !== connector).slice(0, 3);
      return {
        prompt: `[Sulit • Kelengkapan Kalimat] Pilih penghubung paling tepat: ${stem.replace(connector, '___')}`,
        answer: connector,
        explanation: `Kalimat menuntut fungsi ${functionLabel}, sehingga penghubung yang tepat adalah ${connector}.`,
        options: shuffleDeterministic([connector, ...wrongs], seed),
      };
    },
    () => {
      const item = tpaInferenceCases[(index + cycle) % tpaInferenceCases.length];
      return {
        prompt: `[Sulit • Inferensi Paragraf] Bacalah pernyataan berikut: ${item.passage} Kesimpulan yang PALING didukung adalah...`,
        answer: item.answer,
        explanation: 'Kesimpulan benar harus paling kuat ditopang data pada paragraf, tanpa melompat terlalu jauh.',
        options: shuffleDeterministic([item.answer, ...item.distractors], seed),
      };
    },
    () => {
      const item = tpaAssumptionCases[(index + cycle) % tpaAssumptionCases.length];
      return {
        prompt: `[Sulit • Asumsi Tersembunyi] Argumen: "${item.argument}" Asumsi yang paling diperlukan agar argumen kuat adalah...`,
        answer: item.answer,
        explanation: 'Asumsi benar adalah jembatan yang harus berlaku agar kesimpulan dapat ditopang premis.',
        options: shuffleDeterministic([
          item.answer,
          'Semua program yang populer pasti efektif.',
          'Setiap data kuantitatif otomatis lebih baik dari data kualitatif.',
          'Tidak ada faktor luar yang mungkin memengaruhi hasil apa pun.',
        ], seed),
      };
    },
    () => {
      const cases = [
        {
          argument: 'Kelas intensif online dianggap efektif karena rerata skor pascates naik 8 poin.',
          answer: 'Menunjukkan bahwa karakteristik awal peserta kelas online setara dengan kelompok pembanding.',
        },
        {
          argument: 'Tim B dinilai paling efisien karena menyelesaikan proyek paling cepat.',
          answer: 'Menambahkan data bahwa kompleksitas proyek tiap tim setara.',
        },
        {
          argument: 'Paket tryout baru lebih baik sebab tingkat kepuasan pengguna lebih tinggi.',
          answer: 'Menambahkan bukti bahwa akurasi prediksi hasil ujian juga meningkat.',
        },
      ];
      const item = cases[(seed + cycle) % cases.length];
      return {
        prompt: `[Sulit • Strengthening] Pernyataan mana yang PALING memperkuat argumen berikut? "${item.argument}"`,
        answer: item.answer,
        explanation: 'Penguat terbaik menutup celah utama pada argumen, bukan sekadar menambah informasi yang tampak positif.',
        options: shuffleDeterministic([
          item.answer,
          'Sebagian peserta menyukai tampilan antarmuka program.',
          'Pengelola merasa program tersebut lebih modern.',
          'Ada kota lain yang belum mencoba program itu.',
        ], seed),
      };
    },
    () => {
      const cases = [
        {
          argument: 'Metode belajar X paling efektif karena siswa yang memakainya memperoleh skor tertinggi.',
          answer: 'Siswa pengguna metode X sejak awal memang memiliki rerata kemampuan dasar paling tinggi.',
        },
        {
          argument: 'Aplikasi baru harus diadopsi penuh karena pengguna aktifnya naik tajam dalam dua minggu.',
          answer: 'Kenaikan pengguna terjadi bersamaan dengan kebijakan wajib login yang tidak memberi alternatif lain.',
        },
        {
          argument: 'Tim riset kecil lebih produktif sebab laporan mereka terbit lebih sering.',
          answer: 'Rata-rata panjang dan kompleksitas laporan tim kecil jauh lebih rendah.',
        },
      ];
      const item = cases[(seed + cycle) % cases.length];
      return {
        prompt: `[Sulit • Weakening] Pernyataan mana yang PALING melemahkan argumen berikut? "${item.argument}"`,
        answer: item.answer,
        explanation: 'Pelemah terbaik menunjukkan alternatif penjelasan atau membongkar dasar perbandingan argumen.',
        options: shuffleDeterministic([
          item.answer,
          'Program tersebut cukup dikenal di media sosial.',
          'Beberapa peserta merasa soal lebih menantang.',
          'Biaya pelaksanaan program relatif moderat.',
        ], seed),
      };
    },
    () => {
      const [statement, answer] = tpaFallacies[index % tpaFallacies.length];
      return {
        prompt: `[Sulit • Fallacy] Kekeliruan logika dominan pada pernyataan berikut adalah: "${statement}"`,
        answer,
        explanation: 'Penamaan fallacy harus mengikuti titik lemah paling utama pada hubungan premis dan kesimpulan.',
        options: shuffleDeterministic([answer, 'appeal to tradition', 'equivocation', 'slippery slope'], seed),
      };
    },
    () => {
      const quant = 18 + cycle;
      const analyst = 10 + cycle;
      const tech = 6 + cycle;
      const both = 4 + (cycle % 4);
      return {
        prompt: `[Sulit • Silogisme Himpunan] Dari ${quant} peserta menyukai kuantitatif, ${analyst} menyukai analitik, dan ${both} menyukai keduanya. Jika total peserta ${quant + analyst - both + tech}, kesimpulan yang PASTI benar adalah...`,
        answer: `Paling sedikit ${quant - both} peserta hanya menyukai kuantitatif.`,
        explanation: `Yang hanya menyukai kuantitatif = ${quant} - ${both} = ${quant - both}. Nilai ini pasti.`,
        options: shuffleDeterministic([
          `Paling sedikit ${quant - both} peserta hanya menyukai kuantitatif.`,
          `Semua peserta menyukai minimal dua bidang.`,
          `Jumlah peserta yang menyukai analitik saja pasti ${analyst}.`,
          `Tidak ada peserta yang tidak menyukai keduanya.`,
        ], seed),
      };
    },
    () => {
      const people = ['Alya', 'Bima', 'Citra', 'Damar', 'Eka'];
      const first = people[(cycle + 1) % people.length];
      const last = people[(cycle + 3) % people.length];
      return {
        prompt: `[Sulit • Ordering Constraint] Lima peserta duduk berjajar. ${first} harus duduk lebih kiri daripada ${last}, Citra tidak boleh di kursi paling ujung, dan Bima harus berdampingan dengan Eka. Pernyataan yang pasti benar adalah...`,
        answer: `${first} tidak mungkin duduk di kanan ${last}.`,
        explanation: 'Ini langsung mengikuti constraint utama dan tetap benar di semua susunan yang mungkin.',
        options: shuffleDeterministic([
          `${first} tidak mungkin duduk di kanan ${last}.`,
          'Citra pasti duduk di tengah.',
          'Damar pasti duduk di kursi paling kiri.',
          'Bima selalu duduk di kiri Eka.',
        ], seed),
      };
    },
    () => {
      const sequences = [
        { seq: [4, 9, 19, 39], answer: 79, rule: 'setiap langkah ×2 lalu +1' },
        { seq: [6, 11, 19, 30], answer: 44, rule: 'bertambah +5, +8, +11, +14' },
        { seq: [3, 6, 12, 24, 48], answer: 96, rule: 'setiap suku dikali 2' },
        { seq: [2, 5, 11, 23], answer: 47, rule: 'setiap langkah ×2 lalu +1 kecuali suku awal' },
        { seq: [81, 54, 36, 24], answer: 16, rule: 'setiap suku dikali 2/3' },
      ];
      const item = sequences[(index + cycle) % sequences.length];
      return {
        prompt: `[Sulit • Deret Multiaturan] Tentukan suku berikutnya: ${item.seq.join(', ')}, ...`,
        answer: String(item.answer),
        explanation: `Pola: ${item.rule}.`,
        options: buildNumericOptions(item.answer, [item.answer + 2, item.answer - 2, item.answer + 6], seed),
      };
    },
    () => {
      const packA = 3 + (cycle % 4);
      const packB = 2 + (cycle % 3);
      const valueA = 14 + cycle;
      const valueB = 9 + cycle;
      const bonus = 5 + (cycle % 5);
      const answer = (packA * valueA) + (packB * valueB) - bonus;
      return {
        prompt: `[Sulit • Aritmetika Cerita] Sebuah paket tryout terdiri atas ${packA} subtes verbal bernilai ${valueA} poin masing-masing dan ${packB} subtes numerik bernilai ${valueB} poin masing-masing. Jika ada penalti administrasi ${bonus} poin, total skor paket adalah...`,
        answer: String(answer),
        explanation: `Total = ${packA}×${valueA} + ${packB}×${valueB} - ${bonus} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + bonus, answer - packA, (packA + packB) * valueB], seed),
      };
    },
    () => {
      const a = 3 + (cycle % 5);
      const b = 4 + (cycle % 4);
      const c = 2 + (cycle % 3);
      const left = a * b;
      const right = (a + c) * (b - 1);
      const relation = left > right ? 'Kuantitas A lebih besar' : left < right ? 'Kuantitas B lebih besar' : 'Keduanya sama';
      return {
        prompt: `[Sulit • Perbandingan Kuantitatif] Kuantitas A = ${a} × ${b}. Kuantitas B = (${a}+${c}) × (${b}-1). Hubungan yang benar adalah...`,
        answer: relation,
        explanation: `Kuantitas A = ${left} dan Kuantitas B = ${right}, sehingga jawabannya: ${relation}.`,
        options: shuffleDeterministic([
          relation,
          'Informasi tidak cukup',
          'Kuantitas A lebih kecil karena penjumlahan selalu kalah oleh perkalian',
          'Keduanya sama untuk semua nilai',
        ], seed),
      };
    },
    () => {
      const x = 2 + (cycle % 4);
      const y = 5 + (cycle % 5);
      const total = x + y;
      return {
        prompt: `[Sulit • Data Sufficiency] Diketahui x dan y bilangan bulat positif. Pertanyaan: berapa nilai x+y? (1) x=${x}. (2) y=${y}. Pilihan yang benar adalah...`,
        answer: 'Kedua pernyataan bersama-sama cukup, tetapi masing-masing sendiri tidak cukup.',
        explanation: `Pernyataan (1) hanya memberi x, pernyataan (2) hanya memberi y; gabungan keduanya memberi x+y=${total}.`,
        options: shuffleDeterministic([
          'Kedua pernyataan bersama-sama cukup, tetapi masing-masing sendiri tidak cukup.',
          'Pernyataan (1) saja cukup.',
          'Pernyataan (2) saja cukup.',
          'Kedua pernyataan bersama-sama masih tidak cukup.',
        ], seed),
      };
    },
    () => {
      const total = 40 + cycle;
      const verbal = 24 + cycle;
      const numerik = 18 + cycle;
      const both = verbal + numerik - total;
      return {
        prompt: `[Sulit • Himpunan] Dalam satu kelas ada ${total} peserta. Sebanyak ${verbal} menyukai verbal dan ${numerik} menyukai numerik. Jika semua peserta menyukai minimal salah satu, banyak peserta yang menyukai keduanya adalah...`,
        answer: String(both),
        explanation: `Gunakan rumus |V ∩ N| = |V| + |N| - |V ∪ N| = ${verbal}+${numerik}-${total} = ${both}.`,
        options: buildNumericOptions(both, [both + 2, both - 2, total - both], seed),
      };
    },
    () => {
      const [plain, coded] = tpaCodingPairs[(index + cycle) % tpaCodingPairs.length];
      const next = ['TES', 'DATA', 'PREMIS', 'ARGUMEN'][(index + cycle) % 4];
      const encoded = next.split('').map((char) => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
      return {
        prompt: `[Sulit • Coding-Decoding] Jika pola pengkodean ${plain} → ${coded}, maka ${next} dikodekan menjadi...`,
        answer: encoded,
        explanation: 'Pola pengkodean menaikkan setiap huruf satu langkah dalam alfabet.',
        options: shuffleDeterministic([
          encoded,
          next.split('').reverse().join(''),
          next,
          next.split('').map((char) => String.fromCharCode(char.charCodeAt(0) + 2)).join(''),
        ], seed),
      };
    },
    () => {
      const a = 36 + (cycle * 3);
      const b = 30 + (cycle * 2);
      const c = 42 + (cycle * 4);
      const sizeA = 6 + (cycle % 3);
      const sizeB = 5 + (cycle % 4);
      const sizeC = 7 + (cycle % 3);
      const rates = [a / sizeA, b / sizeB, c / sizeC];
      const labels = ['Tim A', 'Tim B', 'Tim C'];
      const answer = `${labels[rates.indexOf(Math.max(...rates))]} memiliki output per orang tertinggi.`;
      return {
        prompt: `[Sulit • Interpretasi Tabel] Output tiga tim berturut-turut adalah A=${a}, B=${b}, C=${c}. Jika jumlah anggota masing-masing ${sizeA}, ${sizeB}, dan ${sizeC}, kesimpulan paling valid adalah...`,
        answer,
        explanation: `Bandingkan output per orang: A=${Number((a / sizeA).toFixed(2))}, B=${Number((b / sizeB).toFixed(2))}, C=${Number((c / sizeC).toFixed(2))}.`,
        options: shuffleDeterministic([
          answer,
          'Tim dengan output total terbesar pasti paling efisien.',
          'Tidak mungkin membandingkan tanpa biaya tetap.',
          'Semua tim memiliki produktivitas identik.',
        ], seed),
      };
    },
  ];

  return { id: `mcq-${moduleName}-${n}`, module: moduleName, ...variants[topic]() };
};

const iqPatterns = [
  { seq: [1, 4, 9, 16], answer: 25, explanation: 'kuadrat bilangan bulat' },
  { seq: [2, 5, 10, 17], answer: 26, explanation: 'selisih +3, +5, +7, +9' },
  { seq: [64, 32, 16, 8], answer: 4, explanation: 'setiap suku dibagi 2' },
  { seq: [7, 10, 16, 25], answer: 37, explanation: 'selisih +3, +6, +9, +12' },
];

const createAdvancedIqQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 6;

  const variants = [
    () => {
      const pattern = iqPatterns[index % iqPatterns.length];
      return {
        prompt: `[Sulit • Deret IQ] Lengkapi pola berikut: ${pattern.seq.join(', ')}, ...`,
        answer: String(pattern.answer),
        explanation: `Pola menggunakan ${pattern.explanation}.`,
        options: buildNumericOptions(pattern.answer, [pattern.answer + 2, pattern.answer - 2, pattern.answer + 6], seed),
      };
    },
    () => {
      const answer = 'Hubungan 2 dimensi vs 3 dimensi';
      return {
        prompt: '[Sulit • Klasifikasi] Segitiga, persegi, lingkaran, kubus. Dasar paling tepat untuk memilih item yang berbeda adalah...',
        answer,
        explanation: 'Kubus merupakan bangun ruang, sedangkan tiga lainnya bangun datar.',
        options: shuffleDeterministic([
          answer,
          'Jumlah huruf pada nama benda',
          'Urutan alfabet awal kata',
          'Frekuensi kemunculan dalam buku sekolah',
        ], seed),
      };
    },
    () => {
      const age = ((seed % 9) + 12);
      const delta = ((seed >> 2) % 7) + 4;
      const answer = 2 * age + delta;
      return {
        prompt: `[Sulit • Umur Relasional] Umur Arga dua kali umur Nisa. Jika umur Nisa ${age} tahun dan Arga ${delta} tahun lebih tua dari dua kali umur Nisa lima tahun lalu, umur Arga sekarang adalah...`,
        answer: String(answer),
        explanation: `Dari konstruksi soal, umur Arga saat ini = 2×${age} + ${delta} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 2, answer - 2, age + delta], seed),
      };
    },
    () => {
      const side = ((seed % 6) + 5);
      const answer = side ** 2 - ((side - 2) ** 2);
      return {
        prompt: `[Sulit • Visual-Spasial Numerik] Sebuah bingkai persegi luar bersisi ${side} cm dan lubang persegi dalam bersisi ${side - 2} cm. Luas bingkai adalah...`,
        answer: String(answer),
        explanation: `Luas bingkai = ${side}² - ${side - 2}² = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 4, answer - 4, side * 4], seed),
      };
    },
    () => {
      const total = ((seed % 4) + 5) * 3;
      const men = ((seed >> 3) % 5) + 4;
      const answer = total - men;
      return {
        prompt: `[Sulit • Alokasi] Sebuah tim berisi ${total} orang. Jika ${men} orang adalah analis senior dan sisanya analis junior, jumlah analis junior adalah...`,
        answer: String(answer),
        explanation: `${total} - ${men} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 1, answer - 1, total + men], seed),
      };
    },
    () => {
      const answer = 'Perubahan satu aturan pada tiap langkah sambil mempertahankan struktur global';
      return {
        prompt: '[Sulit • Meta-Penalaran] Prinsip inti pada soal pola IQ tingkat lanjut biasanya adalah...',
        answer,
        explanation: 'Soal sulit umumnya menggabungkan konsistensi makro dengan perubahan mikro yang harus dibaca sistematis.',
        options: shuffleDeterministic([
          answer,
          'Mencari kata yang paling panjang',
          'Mengutamakan tebakan pertama agar hemat waktu',
          'Mengabaikan pola visual dan hanya membaca angka mentah',
        ], seed),
      };
    },
  ];

  return { id: `mcq-${moduleName}-${n}`, module: moduleName, ...variants[topic]() };
};

const oncologyTopics = [
  ['fraksionasi hipofraksinasi', 'mengompensasi perbedaan repair jaringan normal dan tumor'],
  ['oxygen enhancement ratio', 'fiksasi kerusakan DNA oleh oksigen'],
  ['IMRT', 'membentuk distribusi dosis sangat konformal'],
  ['brachytherapy HDR', 'menempatkan sumber dekat target dengan gradien dosis tajam'],
  ['LET tinggi', 'menimbulkan klaster kerusakan DNA yang sukar diperbaiki'],
  ['CTV dan PTV', 'membedakan cakupan biologis target dari margin ketidakpastian geometris'],
  ['radiosensitizer', 'meningkatkan kerentanan sel tumor terhadap efek radiasi'],
  ['radiation recall', 'reaksi inflamasi pada area yang sebelumnya pernah diradiasi setelah obat tertentu'],
];

const createAdvancedOncologyQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const [topic, rationale] = oncologyTopics[index % oncologyTopics.length];
  const scenario = pick([
    'tumor kepala-leher dekat organ kritis',
    'lesi prostat lokal dengan target terdefinisi baik',
    'kasus paliatif tulang dengan nyeri berat',
    'pasien dengan beban penyakit mikroskopik pasca operasi',
    'massa paru dengan hipoksia regional',
  ], seed);

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Sulit • Onkologi Radiasi] Pada ${scenario}, konsep ${topic} paling tepat dipahami sebagai strategi yang...`,
    answer: rationale,
    explanation: `Pada level lanjut, ${topic} dinilai dari tujuan biologis/fisisnya, bukan sekadar definisi hafalan.`,
    options: shuffleDeterministic([
      rationale,
      'menghilangkan kebutuhan verifikasi posisi harian sama sekali',
      'menjamin jaringan normal tidak pernah menerima dosis radiasi',
      'menggantikan seluruh proses konturing target dan OAR',
    ], seed),
  };
};


const toeflStructureScenarios = [
  {
    frame: 'Had the {subject} {verb} the baseline data before the {event}, the final recommendation would have been more defensible.',
    answer: '{verbPast}',
    distractors: ['{verbBase}', '{verbIng}', '{verbThird}'],
    explanation: 'Inverted third conditional after “Had” requires a past participle.',
    verbs: [
      { base: 'review', past: 'reviewed', ing: 'reviewing', third: 'reviews' },
      { base: 'verify', past: 'verified', ing: 'verifying', third: 'verifies' },
      { base: 'compile', past: 'compiled', ing: 'compiling', third: 'compiles' },
      { base: 'triangulate', past: 'triangulated', ing: 'triangulating', third: 'triangulates' },
    ],
  },
  {
    frame: 'No sooner ___ the {artifact} than the {committee} requested an independent audit of the {focus}.',
    answer: 'had the {subject} {verbPast}',
    distractors: ['the {subject} had {verbPast}', 'did the {subject} {verbBase}', 'has the {subject} {verbPast}'],
    explanation: 'After “No sooner”, formal written English uses inversion with the past perfect.',
    verbs: [
      { base: 'submit', past: 'submitted' },
      { base: 'circulate', past: 'circulated' },
      { base: 'release', past: 'released' },
      { base: 'finalize', past: 'finalized' },
    ],
  },
  {
    frame: 'The {headNoun}, along with two technical appendices and a replication memo, ___ scheduled for review at the {venue}.',
    answer: 'is',
    distractors: ['are', 'were', 'be'],
    explanation: 'The singular head noun controls subject–verb agreement despite the interrupting phrase.',
  },
  {
    frame: 'The chair insisted that each participant ___ informed of the revised {policy} before the {milestone}.',
    answer: 'be',
    distractors: ['is', 'was', 'been'],
    explanation: 'Mandative subjunctive keeps the base form after verbs such as “insisted” or “recommended”.',
  },
  {
    frame: 'Rarely ___ a longitudinal study so quickly after peer reviewers identified a flaw in the {focus}.',
    answer: 'has a research team revised',
    distractors: ['a research team has revised', 'did a research team revise', 'a research team revised'],
    explanation: 'Fronted restrictive adverbs such as “Rarely” trigger inversion with an auxiliary.',
  },
];

const toeflStructureLexicon = {
  subjects: ['committee', 'review panel', 'methods team', 'curriculum board', 'oversight unit'],
  events: ['policy briefing', 'grant hearing', 'final vote', 'funding decision', 'public consultation'],
  artifacts: ['interim report', 'draft synthesis', 'methodology memo', 'field summary', 'evidence table'],
  committees: ['ethics board', 'admissions panel', 'steering group', 'quality team', 'editorial committee'],
  focuses: ['sampling strategy', 'causal claim', 'coding framework', 'cost projection', 'comparison group'],
  headNouns: ['policy brief', 'research dossier', 'evaluation memo', 'conference abstract', 'technical note'],
  venues: ['colloquium', 'senate meeting', 'faculty forum', 'grant panel', 'defense session'],
  policies: ['consent protocol', 'reporting rubric', 'review schedule', 'safety procedure', 'grading policy'],
  milestones: ['site visit', 'pilot launch', 'ethics submission', 'data freeze', 'committee debrief'],
};

const toeflVocabularyBank = [
  {
    word: 'meticulous',
    meaning: 'showing extremely careful attention to detail',
    distractors: ['highly speculative and uncertain', 'temporarily irrelevant', 'emotionally impulsive'],
  },
  {
    word: 'tenuous',
    meaning: 'weak and not strongly supported by evidence',
    distractors: ['widely accepted without debate', 'densely technical but precise', 'morally controversial'],
  },
  {
    word: 'ubiquitous',
    meaning: 'present or encountered nearly everywhere',
    distractors: ['limited to one rare setting', 'difficult to classify clearly', 'hidden from observation'],
  },
  {
    word: 'salient',
    meaning: 'most noticeable or especially important',
    distractors: ['historically outdated', 'deliberately concealed', 'indirectly quantified'],
  },
  {
    word: 'mitigate',
    meaning: 'reduce the severity or impact of something',
    distractors: ['intensify without warning', 'delay indefinitely', 'document neutrally'],
  },
  {
    word: 'pragmatic',
    meaning: 'guided by practical results rather than theory alone',
    distractors: ['hostile to all compromise', 'concerned only with aesthetics', 'dependent on intuition only'],
  },
  {
    word: 'lucid',
    meaning: 'expressed clearly and easy to understand',
    distractors: ['densely ambiguous', 'purely symbolic', 'highly sensational'],
  },
  {
    word: 'anomalous',
    meaning: 'deviating from what is typical or expected',
    distractors: ['fully representative', 'carefully replicated', 'clinically urgent'],
  },
];

const toeflReadingPassages = [
  {
    topic: 'urban ecology',
    passage: 'Researchers tracking rooftop gardens found that plots with fewer plant species still attracted many insects, but only diverse plots sustained pollinators late into the dry season. The authors therefore caution cities against treating early insect counts as proof of long-term ecological resilience.',
    question: 'Which inference is best supported by the passage?',
    answer: 'Early biodiversity indicators may overstate how stable the ecosystem will remain later.',
    distractors: [
      'Any rooftop garden automatically restores a city ecosystem completely.',
      'Pollinator decline occurs only in cities with no gardens at all.',
      'The authors reject insect counting as a useless method in every context.',
    ],
    explanation: 'The passage contrasts early counts with long-term resilience, so the supported inference is the caution against overinterpreting early signals.',
  },
  {
    topic: 'science communication',
    passage: 'When the museum replaced dense labels with layered captions, novice visitors remembered more of the main claim, while advanced visitors continued reading the optional technical notes. The curators concluded that clarity need not eliminate complexity if information is staged rather than removed.',
    question: 'What can be inferred from the passage?',
    answer: 'Presenting information in layers can improve access without necessarily oversimplifying the content.',
    distractors: [
      'Advanced visitors avoided every exhibit with simplified labels.',
      'Technical notes should never be offered to general audiences.',
      'Visitor memory depends only on exhibit length, not design.',
    ],
    explanation: 'The conclusion explicitly links clarity with preserved complexity through staged information.',
  },
  {
    topic: 'historical linguistics',
    passage: 'A corpus study showed that merchants adopted the new accounting term decades before government clerks did. Because the earliest uses cluster in shipping records rather than official decrees, the authors argue that administrative language may sometimes follow commercial practice instead of directing it.',
    question: 'Which inference is most justified?',
    answer: 'Institutional vocabulary can spread upward from practical trade usage rather than only downward from state policy.',
    distractors: [
      'Government clerks refused to use any new terminology.',
      'Shipping records are always more reliable than decrees.',
      'The accounting term disappeared once officials adopted it.',
    ],
    explanation: 'The evidence supports a bottom-up pathway of adoption, not the extreme alternatives.',
  },
  {
    topic: 'behavioral economics',
    passage: 'Participants saved more money when reminders highlighted the future inconvenience of being unprepared, yet the effect faded after three months unless they also set a concrete transfer date. The authors propose that emotion may trigger intention, but routines stabilize it.',
    question: 'What does the passage most strongly suggest?',
    answer: 'Emotional prompts may initiate behavior change, but durable follow-through depends on procedural commitment.',
    distractors: [
      'Savings behavior is unaffected by the timing of reminders.',
      'Participants ignored every reminder after the first month.',
      'Concrete planning matters only when people are already wealthy.',
    ],
    explanation: 'The passage distinguishes between starting action and sustaining it over time.',
  },
];

const toeflRhetoricalSets = [
  {
    stem: 'In a passage about marine archaeology, the author notes that one harbor ledger survived only because it was copied into a tax dispute decades later.',
    question: 'Why did the author most likely include this detail?',
    answer: 'To illustrate how accidental preservation can shape what evidence historians are able to study.',
    distractors: [
      'To argue that tax disputes were the primary cause of harbor decline.',
      'To show that copying documents always makes them less reliable.',
      'To shift the passage away from archaeology and toward maritime law only.',
    ],
    explanation: 'The sentence functions as support for the argument about the uneven survival of evidence.',
  },
  {
    stem: 'In a passage on renewable grids, the author briefly contrasts batteries with demand-response programs before returning to storage costs.',
    question: 'What is the rhetorical purpose of that contrast?',
    answer: 'To clarify that grid flexibility can come from more than one strategy before focusing on one of them.',
    distractors: [
      'To prove that storage costs are irrelevant to renewable adoption.',
      'To suggest that demand-response has replaced all battery research.',
      'To introduce an unrelated criticism of electricity pricing.',
    ],
    explanation: 'The contrast broadens the frame, then helps the reader understand why the author narrows back to storage.',
  },
  {
    stem: 'In a paragraph about medieval universities, the author inserts a sentence explaining that lectures were often copied by students from memory rather than from distributed notes.',
    question: 'Why is that sentence included?',
    answer: 'To explain a practical condition that helps account for variation in surviving texts.',
    distractors: [
      'To claim that medieval students opposed formal lectures entirely.',
      'To argue that memory-based learning is superior in modern universities.',
      'To identify the single oldest manuscript in the archive.',
    ],
    explanation: 'The inserted detail explains the mechanism behind textual variation.',
  },
  {
    stem: 'In an economics passage, the author mentions one city that reduced congestion after changing bus lane enforcement, then immediately notes that the result may not generalize to cities with different commuting patterns.',
    question: 'What is the function of the second sentence?',
    answer: 'To qualify the example so the reader does not overgeneralize from a single case.',
    distractors: [
      'To dismiss the city example as fabricated evidence.',
      'To show that commuting patterns never affect policy outcomes.',
      'To argue that bus lanes are less important than subway fares in every city.',
    ],
    explanation: 'The author is limiting the scope of the example, not rejecting it.',
  },
];

const academicEnglishConnectorSets = [
  {
    prompt: 'The findings are not conclusive; ___, they still justify a more cautious reanalysis of the {noun}.',
    answer: 'nevertheless',
    rationale: 'there is a contrast between limitation and continuing value',
    distractors: ['likewise', 'thereby', 'meanwhile'],
  },
  {
    prompt: 'The survey instrument was revised after piloting; ___, the response rate improved in the second cohort.',
    answer: 'consequently',
    rationale: 'the second clause states a direct result of the revision',
    distractors: ['whereas', 'namely', 'instead'],
  },
  {
    prompt: 'The first article emphasizes policy diffusion, ___ the second focuses on institutional resistance.',
    answer: 'whereas',
    rationale: 'the sentence contrasts two parallel clauses',
    distractors: ['therefore', 'moreover', 'otherwise'],
  },
  {
    prompt: 'The model is parsimonious and empirically stable; ___, it remains interpretable for non-specialist readers.',
    answer: 'moreover',
    rationale: 'the author adds a reinforcing point rather than a contrast',
    distractors: ['nevertheless', 'instead', 'otherwise'],
  },
  {
    prompt: 'Writers must define their key terms precisely; ___, later comparisons may become internally inconsistent.',
    answer: 'otherwise',
    rationale: 'the second clause warns about the consequence if the first is ignored',
    distractors: ['meanwhile', 'moreover', 'consequently'],
  },
];

const academicEnglishTopics = {
  findings: ['findings', 'estimates', 'conclusions', 'projections', 'observations'],
  actions: ['recalibrated', 'contextualized', 'substantiated', 'reframed', 'triangulated'],
  nouns: ['assumptions', 'methodology', 'sampling frame', 'causal claim', 'baseline model'],
  audiences: ['postgraduate readers', 'reviewers', 'seminar participants', 'policy analysts', 'thesis examiners'],
  lenses: ['implicit bias', 'scope limitation', 'causal overreach', 'hidden assumptions', 'disciplinary nuance'],
};

const simakReadingPassages = [
  {
    passage: 'The reviewer acknowledges that the archive is incomplete, yet argues that its gaps are patterned rather than random: records from ordinary households disappear most often, while tax disputes and inheritance claims remain. The article therefore warns that silence in the archive may reveal power structures as much as missing paperwork.',
    question: 'Which conclusion is best supported by the passage?',
    answer: 'Missing records can itself be evidence when the absence follows a social pattern.',
    distractors: [
      'Tax disputes provide an unbiased picture of all households.',
      'Ordinary households produced no written records at all.',
      'Incomplete archives should be excluded from historical analysis entirely.',
    ],
    explanation: 'The author treats patterned absence as analytically meaningful, not as a reason to abandon interpretation.',
  },
  {
    passage: 'A seminar compared two abstracts with identical findings. Participants judged one more credible because it explicitly limited its claims and separated observed results from broader speculation. The instructor concluded that precision can strengthen persuasion by signaling intellectual control rather than weakness.',
    question: 'What inference is most reasonable?',
    answer: 'Careful qualification can increase credibility in academic writing.',
    distractors: [
      'Readers prefer abstracts that avoid all mention of limitations.',
      'Speculation is always more persuasive than evidence.',
      'Credibility depends only on the number of references cited.',
    ],
    explanation: 'The passage links credibility to disciplined claim-making, not exaggeration.',
  },
  {
    passage: 'The department moved key definitions from footnotes into the main text. Students then performed better on application questions but not on memorization items, suggesting that the change helped them use concepts while reading rather than simply recall terms afterward.',
    question: 'Which statement is most strongly supported?',
    answer: 'Making definitions more visible improved conceptual application more than rote recall.',
    distractors: [
      'Students ignored the main text once definitions were moved.',
      'Footnotes are unsuitable for all forms of academic writing.',
      'Application questions are easier than memorization items by definition.',
    ],
    explanation: 'The score pattern differentiates conceptual use from memorization.',
  },
  {
    passage: 'An editor rejected several vivid but vague verbs from a manuscript and replaced them with narrower terms. Although the prose became less dramatic, peer reviewers reported that the argument was easier to evaluate because each claim now specified who acted, under what conditions, and with what evidence.',
    question: 'What does the passage imply?',
    answer: 'Precision in wording can make an argument more assessable even if it sounds less dramatic.',
    distractors: [
      'Peer reviewers value style over accuracy in every discipline.',
      'Vivid verbs are inherently inappropriate in academic prose.',
      'Detailed wording guarantees that reviewers will agree with a claim.',
    ],
    explanation: 'The implication concerns evaluability through precision, not guaranteed agreement.',
  },
];

const ukmppdCaseTemplates = [
  {
    stase: 'Penyakit Dalam',
    stem: ({ age, symptom, duration, ekg, access }) => `Pria ${age} tahun datang dengan ${symptom} sejak ${duration}, ${ekg}, dan fasilitas reperfusi definitif dapat dicapai dalam ${access}.`,
    answer: 'Aktifkan tata laksana sindrom koroner akut segera, berikan terapi awal berbasis guideline, dan percepat reperfusi.',
    distractors: [
      'Tunda terapi antiplatelet sampai seluruh biomarker serial selesai walaupun gambaran klinis sangat khas.',
      'Pulangkan pasien dengan analgesik karena nyeri sudah sedikit berkurang di IGD.',
      'Fokus pada observasi EKG ulang besok pagi tanpa strategi reperfusi.',
    ],
    explanation: 'Kasus sulit UKMPPD pada kardiovaskular menilai prioritas reperfusi berbasis waktu, bukan sekadar mengenali diagnosis.',
    variants: {
      age: [52, 58, 63, 67],
      symptom: ['nyeri dada tipikal menjalar ke lengan kiri', 'rasa tertekan retrosternal disertai diaforesis', 'nyeri dada hebat dengan mual dan keringat dingin', 'keluhan dada berat yang muncul saat istirahat'],
      duration: ['70 menit', '95 menit', '2 jam', '110 menit'],
      ekg: ['EKG menunjukkan elevasi ST inferior', 'EKG memperlihatkan elevasi ST anteroseptal', 'EKG konsisten dengan STEMI inferior posterior', 'EKG menunjukkan elevasi ST luas di prekordial'],
      access: ['45 menit', '60 menit', '75 menit', '90 menit'],
    },
  },
  {
    stase: 'Bedah',
    stem: ({ mechanism, pressure, imaging, response }) => `Pasien trauma ${mechanism} tiba dengan tekanan darah ${pressure}, ${imaging}, dan ${response} setelah resusitasi awal.`,
    answer: 'Lanjutkan damage control resuscitation dan bawa ke operasi emergensi tanpa menunda untuk pencitraan lanjutan.',
    distractors: [
      'Tunggu CT-scan lengkap terlebih dahulu karena operasi tanpa CT dianggap terlalu agresif.',
      'Lanjutkan observasi serial sambil menilai nyeri selama beberapa jam sebelum keputusan definitif.',
      'Berikan sedasi dan rencanakan pulang jika FAST tidak diulang dalam 30 menit.',
    ],
    explanation: 'Trauma dengan instabilitas hemodinamik dan bukti perdarahan intraabdomen menuntut keputusan definitif cepat.',
    variants: {
      mechanism: ['tumpul abdomen akibat kecelakaan lalu lintas', 'penetrans abdomen akibat luka tusuk', 'tumpul multisistem pascajatuh dari ketinggian', 'tumpul abdomen setelah tertimpa benda berat'],
      pressure: ['80/50 mmHg', '85/55 mmHg', '78/46 mmHg', '90/60 mmHg dengan takikardi'],
      imaging: ['FAST positif di Morrison pouch', 'FAST positif dengan cairan bebas pelvis', 'pemeriksaan FAST menunjukkan cairan bebas intraabdomen', 'temuan FAST mengarah ke hemoperitoneum'],
      response: ['respons hemodinamik minimal', 'tekanan darah hanya naik sesaat', 'perbaikan sementara lalu kembali hipotensi', 'respon transien terhadap bolus cairan'],
    },
  },
  {
    stase: 'Anak',
    stem: ({ age, complaint, hydration, ability }) => `Anak ${age} tahun datang dengan ${complaint}; pemeriksaan menunjukkan ${hydration}, dan pasien ${ability}.`,
    answer: 'Nilai sebagai dehidrasi ringan-sedang dan mulai rehidrasi oral terukur sambil memantau tanda bahaya.',
    distractors: [
      'Langsung berikan antibiotik intravena rutin tanpa menilai status hidrasi.',
      'Tunda cairan oral karena semua diare akut pada anak harus dipuasakan sementara.',
      'Observasi di rumah tanpa edukasi cairan maupun tanda bahaya karena masih sadar.',
    ],
    explanation: 'UKMPPD pediatri sering menguji klasifikasi dehidrasi dan pilihan rehidrasi yang aman.',
    variants: {
      age: [2, 3, 4, 5],
      complaint: ['diare akut 6 kali sejak pagi', 'muntah-diare sejak semalam', 'BAB cair berulang selama 24 jam', 'gastroenteritis akut dengan intake menurun'],
      hydration: ['mata cekung dan turgor kembali lambat', 'mukosa mulut kering dengan turgor menurun', 'haus namun masih sadar baik dengan turgor melambat', 'nadi masih teraba baik dengan tanda dehidrasi ringan-sedang'],
      ability: ['masih bisa minum', 'masih mau minum sedikit demi sedikit', 'dapat menerima cairan oral', 'tidak tampak letargis dan masih dapat minum'],
    },
  },
  {
    stase: 'Obstetri',
    stem: ({ gestation, pressure, redFlag, urine }) => `Ibu hamil ${gestation} minggu datang dengan tekanan darah ${pressure}, ${redFlag}, dan ${urine}.`,
    answer: 'Stabilisasi preeklamsia berat dengan MgSO4, kontrol tekanan darah, dan rencanakan terminasi sesuai indikasi maternal-fetal.',
    distractors: [
      'Pulangkan dengan antihipertensi oral tunggal tanpa profilaksis kejang karena usia kehamilan belum aterm.',
      'Tunggu proteinuria 24 jam sebelum memulai tata laksana meskipun terdapat tanda berat.',
      'Fokus pada istirahat total tanpa evaluasi kebutuhan terminasi kehamilan.',
    ],
    explanation: 'Kasus obstetri level sulit menilai stabilisasi ibu dahulu, kemudian keputusan terminasi berbasis indikasi.',
    variants: {
      gestation: [32, 34, 35, 37],
      pressure: ['170/110 mmHg', '168/112 mmHg', '174/108 mmHg', '172/114 mmHg'],
      redFlag: ['nyeri kepala berat dan pandangan kabur', 'epigastric pain dengan refleks meningkat', 'nyeri kepala hebat disertai hiperrefleksia', 'keluhan visual dan nyeri ulu hati'],
      urine: ['proteinuria ++', 'proteinuria +++', 'dipstick protein 2+', 'urinalisis menunjukkan protein signifikan'],
    },
  },
  {
    stase: 'Neurologi',
    stem: ({ onset, deficit, imaging, pressure }) => `Pasien datang ${onset} setelah onset ${deficit}; CT kepala non-kontras ${imaging} dan tekanan darah ${pressure}.`,
    answer: 'Lakukan penilaian cepat kontraindikasi dan evaluasi reperfusi akut sesegera mungkin.',
    distractors: [
      'Tunda seluruh intervensi karena semua stroke harus diobservasi 24 jam lebih dulu.',
      'Berikan antikoagulan penuh segera tanpa menilai jenis stroke dan kontraindikasi.',
      'Pulangkan setelah gejala sedikit membaik karena CT awal belum menunjukkan perdarahan.',
    ],
    explanation: 'Fokusnya adalah time-sensitive pathway pada stroke iskemik akut setelah perdarahan tersingkir.',
    variants: {
      onset: ['90 menit', '2 jam', '2,5 jam', '3 jam'],
      deficit: ['hemiparesis kanan dan afasia', 'hemiparesis kiri dengan deviasi wajah', 'kelemahan satu sisi tubuh mendadak', 'defisit neurologis fokal akut'],
      imaging: ['tanpa perdarahan', 'tidak menunjukkan perdarahan akut', 'negatif untuk perdarahan intraserebral', 'belum tampak perdarahan'],
      pressure: ['170/100 mmHg', '165/95 mmHg', '178/102 mmHg', '160/98 mmHg'],
    },
  },
  {
    stase: 'Komunitas',
    stem: ({ disease, pattern, location, weeks }) => `Puskesmas melaporkan ${pattern} kasus ${disease} di ${location} selama ${weeks} minggu berturut-turut.`,
    answer: 'Verifikasi diagnosis dan definisi kasus dahulu, lalu konfirmasi KLB sebelum intervensi populasi berskala luas.',
    distractors: [
      'Langsung umumkan wabah tanpa validasi data karena peningkatan kasus sudah cukup.',
      'Tunggu laporan bulanan selesai seluruhnya sebelum melakukan langkah epidemiologi awal.',
      'Batasi respons pada terapi individu tanpa surveilans lanjutan maupun pencarian kasus.',
    ],
    explanation: 'Kasus komunitas menguji urutan respon wabah: validasi, definisi kasus, konfirmasi, lalu intervensi.',
    variants: {
      disease: ['DBD', 'hepatitis A', 'diare akut', 'chikungunya'],
      pattern: ['lonjakan', 'peningkatan tajam', 'klaster baru', 'kenaikan bermakna'],
      location: ['satu kelurahan padat penduduk', 'wilayah kerja pesisir', 'dua RW yang berdekatan', 'satu kompleks sekolah dan sekitarnya'],
      weeks: [2, 3, 4, 5],
    },
  },
  {
    stase: 'Psikiatri',
    stem: ({ patient, risk, history }) => `${patient} datang ke IGD dengan ${risk}; keluarga melaporkan ${history}.`,
    answer: 'Pastikan keamanan pasien, nilai risiko bunuh diri secara aktif, dan pertimbangkan rawat/involuntary protection bila perlu.',
    distractors: [
      'Fokus pada pemberian vitamin dan jadwalkan kontrol rutin bulan depan tanpa asesmen risiko.',
      'Biarkan pasien pulang sendiri karena ia masih dapat menjawab pertanyaan dasar.',
      'Tunda eksplorasi ide bunuh diri agar pasien tidak tersinggung oleh pertanyaan langsung.',
    ],
    explanation: 'Kasus psikiatri emergensi menilai keselamatan, asesmen risiko, dan kebutuhan proteksi segera.',
    variants: {
      patient: ['Mahasiswa 22 tahun', 'Pria 30 tahun', 'Perempuan 27 tahun', 'Karyawan 35 tahun'],
      risk: ['ucapan ingin mengakhiri hidup disertai rencana spesifik', 'percobaan overdosis ringan beberapa jam sebelumnya', 'agitasi berat setelah menyatakan niat bunuh diri', 'depresi berat dengan akses ke alat berbahaya di rumah'],
      history: ['menarik diri selama dua minggu dan tidak tidur semalaman', 'kehilangan pekerjaan baru-baru ini dan makin putus asa', 'pernah melakukan percobaan serupa tahun lalu', 'ada pesan perpisahan yang ditemukan keluarga'],
    },
  },
  {
    stase: 'Paru',
    stem: ({ history, vitals, finding, gas }) => `Pasien dengan riwayat ${history} datang sesak; didapatkan ${vitals}, ${finding}, dan analisis gas darah menunjukkan ${gas}.`,
    answer: 'Tata laksana eksaserbasi berat secara segera dengan oksigen terukur, bronkodilator, steroid, dan evaluasi kebutuhan ventilasi.',
    distractors: [
      'Tunda bronkodilator sampai sputum culture keluar agar terapi lebih spesifik.',
      'Berikan sedasi penuh untuk mengurangi rasa panik tanpa menilai ventilasi.',
      'Pulangkan dengan obat batuk karena wheezing dapat membaik spontan.',
    ],
    explanation: 'Kasus paru sulit menekankan stabilisasi respirasi, titrasi oksigen, dan antisipasi gagal napas.',
    variants: {
      history: ['asma persisten', 'PPOK lama', 'asma dengan rawat inap berulang', 'PPOK perokok berat'],
      vitals: ['takipnea 32/menit dan saturasi 88%', 'napas 34/menit dengan saturasi 86%', 'takikardi dan saturasi 89% udara bebas', 'retraksi dengan saturasi 87%'],
      finding: ['wheezing difus', 'ekspirasi memanjang dengan wheeze bilateral', 'penggunaan otot bantu napas', 'suara napas menurun dengan mengi'],
      gas: ['retensi CO2 ringan', 'hiperkapnia yang mulai meningkat', 'asidosis respiratorik parsial', 'gangguan ventilasi tipe II awal'],
    },
  },
];

const fillTemplate = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const buildToeflStructureQuestion = (moduleName, index, seed) => {
  const cycle = Math.floor(index / 5);
  const pattern = toeflStructureScenarios[index % toeflStructureScenarios.length];
  const values = {
    subject: pick(toeflStructureLexicon.subjects, cycle + seed),
    event: pick(toeflStructureLexicon.events, cycle * 3 + seed),
    artifact: pick(toeflStructureLexicon.artifacts, cycle * 5 + seed),
    committee: pick(toeflStructureLexicon.committees, cycle * 7 + seed),
    focus: pick(toeflStructureLexicon.focuses, cycle * 11 + seed),
    headNoun: pick(toeflStructureLexicon.headNouns, cycle * 13 + seed),
    venue: pick(toeflStructureLexicon.venues, cycle * 17 + seed),
    policy: pick(toeflStructureLexicon.policies, cycle * 19 + seed),
    milestone: pick(toeflStructureLexicon.milestones, cycle * 23 + seed),
  };
  const verb = pattern.verbs ? pick(pattern.verbs, cycle * 29 + seed) : null;
  const enrichedValues = {
    ...values,
    verbBase: verb?.base,
    verbPast: verb?.past,
    verbIng: verb?.ing,
    verbThird: verb?.third,
  };
  const answer = fillTemplate(pattern.answer, enrichedValues);
  const options = buildUniqueOptions(
    answer,
    pattern.distractors.map((item) => fillTemplate(item, enrichedValues)),
    seed,
  );
  return {
    prompt: `[Hard TOEFL Structure] ${fillTemplate(pattern.frame, enrichedValues)}`,
    answer,
    explanation: pattern.explanation,
    options,
  };
};

const buildToeflVocabularyQuestion = (index, seed) => {
  const item = toeflVocabularyBank[index % toeflVocabularyBank.length];
  const cycle = Math.floor(index / 4);
  const contexts = [
    'describing a research methodology',
    'summarizing an academic lecture',
    'evaluating a policy brief',
    'contrasting two historical interpretations',
    'reporting an experimental result',
  ];
  const context = pick(contexts, cycle + seed);
  return {
    prompt: `[Hard TOEFL Vocabulary] In a sentence ${context}, the word “${item.word}” is closest in meaning to...`,
    answer: item.meaning,
    explanation: 'TOEFL vocabulary items at a hard level reward precision against very close distractors.',
    options: buildUniqueOptions(item.meaning, item.distractors, seed),
  };
};

const buildToeflReadingQuestion = (index, seed) => {
  const item = toeflReadingPassages[index % toeflReadingPassages.length];
  const cycle = Math.floor(index / 4);
  const frames = ['Consider the following passage.', 'Read the excerpt carefully.', 'Use the passage below to answer the question.', "Focus on the author's implied claim in the passage below."]; 
  return {
    prompt: `[Hard TOEFL Reading • ${item.topic}] ${pick(frames, cycle + seed)} ${item.passage} ${item.question}`,
    answer: item.answer,
    explanation: item.explanation,
    options: buildUniqueOptions(item.answer, item.distractors, seed),
  };
};

const buildToeflRhetoricQuestion = (index, seed) => {
  const item = toeflRhetoricalSets[index % toeflRhetoricalSets.length];
  const cycle = Math.floor(index / 4);
  const leads = ['Within the paragraph,', 'In the broader argument,', 'At that point in the passage,', 'From a rhetorical-purpose perspective,'];
  return {
    prompt: `[Hard TOEFL Rhetorical Purpose] ${item.stem} ${pick(leads, cycle + seed)} ${item.question}`,
    answer: item.answer,
    explanation: item.explanation,
    options: buildUniqueOptions(item.answer, item.distractors, seed),
  };
};

const createAdvancedToeflQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 4;
  const variants = [
    () => buildToeflStructureQuestion(moduleName, index, seed),
    () => buildToeflVocabularyQuestion(index, seed),
    () => buildToeflReadingQuestion(index, seed),
    () => buildToeflRhetoricQuestion(index, seed),
  ];

  return { id: `mcq-${moduleName}-${n}`, module: moduleName, ...variants[topic]() };
};

const ieltsDescriptors = [
  ['Task Response', 'develop a position fully and support it with relevant, extended ideas'],
  ['Coherence and Cohesion', 'sequence information logically and manage referencing without overuse'],
  ['Lexical Resource', 'use flexible, precise vocabulary with accurate collocation'],
  ['Grammatical Range and Accuracy', 'maintain wide structural range with very few errors'],
];

const createAdvancedIeltsQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const [criterion, descriptor] = ieltsDescriptors[index % ieltsDescriptors.length];

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Hard IELTS] For a candidate targeting band 7+ in ${criterion}, the strongest strategy is to...`,
    answer: descriptor,
    explanation: 'IELTS high bands reward completeness, precision, and control rather than formulaic templates alone.',
    options: shuffleDeterministic([
      descriptor,
      'maximize word count even if ideas become repetitive and loosely connected',
      'avoid paraphrasing to reduce grammatical risk',
      'prioritize memorized idioms over accuracy and relevance',
    ], seed),
  };
};

const buildAcademicEnglishConnectorQuestion = (index, seed) => {
  const cycle = Math.floor(index / 5);
  const item = academicEnglishConnectorSets[index % academicEnglishConnectorSets.length];
  const noun = pick(academicEnglishTopics.nouns, cycle * 5 + seed);
  return {
    prompt: `[Hard Academic English] ${item.prompt.replace('{noun}', noun)}`,
    answer: item.answer,
    explanation: `The connector is correct because ${item.rationale}.`,
    options: buildUniqueOptions(item.answer, item.distractors, seed),
  };
};

const buildAcademicEnglishInversionQuestion = (index, seed) => {
  const cycle = Math.floor(index / 5);
  const action = pick(academicEnglishTopics.actions, cycle * 7 + seed);
  const noun = pick(academicEnglishTopics.nouns, cycle * 11 + seed);
  return {
    prompt: `[Hard Academic English] Only after the dataset had been ${action} ___ that the original ${noun} was internally inconsistent.`,
    answer: 'did the reviewers realize',
    explanation: 'Fronted restrictive adverbials trigger subject–auxiliary inversion in formal academic English.',
    options: shuffleDeterministic([
      'did the reviewers realize',
      'the reviewers realized',
      'had the reviewers realized',
      'the reviewers had realized',
    ], seed),
  };
};

const buildAcademicEnglishPrecisionQuestion = (index, seed) => {
  const cycle = Math.floor(index / 5);
  const audience = pick(academicEnglishTopics.audiences, cycle * 13 + seed);
  const lens = pick(academicEnglishTopics.lenses, cycle * 17 + seed);
  return {
    prompt: `[Hard Academic English] Skilled ${audience} distinguish between evidence that is explicit and claims that are only ___ through ${lens}.`,
    answer: 'implied',
    explanation: 'Advanced academic reading requires separating direct statement from inference.',
    options: shuffleDeterministic(['implied', 'retracted', 'duplicated', 'invented'], seed),
  };
};

const buildAcademicEnglishVerbQuestion = (index, seed) => {
  const cycle = Math.floor(index / 5);
  const action = pick(academicEnglishTopics.actions, cycle * 19 + seed);
  const noun = pick(academicEnglishTopics.nouns, cycle * 23 + seed);
  return {
    prompt: `[Hard Academic English] The proposal was praised not merely for its novelty but also for the rigor with which it ___ its ${noun}.`,
    answer: action,
    explanation: 'The clause requires a simple past verb parallel to the surrounding academic narrative.',
    options: buildUniqueOptions(action, ['articulate', 'has articulated', 'articulating', 'was articulating'], seed),
  };
};

const buildAcademicEnglishReadingQuestion = (index, seed) => {
  const item = simakReadingPassages[index % simakReadingPassages.length];
  const cycle = Math.floor(index / 5);
  const leads = ['Read the following academic excerpt.', 'Consider the passage below.', 'Use the excerpt to answer the inference item.', "Focus on the author's implied academic claim below."]; 
  return {
    prompt: `[Hard Academic English Reading] ${pick(leads, cycle + seed)} ${item.passage} ${item.question}`,
    answer: item.answer,
    explanation: item.explanation,
    options: buildUniqueOptions(item.answer, item.distractors, seed),
  };
};

const createAdvancedSimakEnglishQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 5;
  const variants = [
    () => buildAcademicEnglishConnectorQuestion(index, seed),
    () => buildAcademicEnglishInversionQuestion(index, seed),
    () => buildAcademicEnglishVerbQuestion(index, seed),
    () => buildAcademicEnglishPrecisionQuestion(index, seed),
    () => buildAcademicEnglishReadingQuestion(index, seed),
  ];

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...variants[topic](),
  };
};

const createAdvancedUkmppdQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const template = ukmppdCaseTemplates[index % ukmppdCaseTemplates.length];
  const cycle = Math.floor(index / ukmppdCaseTemplates.length);
  const values = Object.fromEntries(
    Object.entries(template.variants).map(([key, choices], offset) => [
      key,
      pick(choices, cycle * (offset + 3) + seed),
    ]),
  );

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Sulit • ${template.stase}] ${template.stem(values)} Langkah paling tepat adalah...`,
    answer: template.answer,
    explanation: template.explanation,
    options: buildUniqueOptions(template.answer, template.distractors, seed),
  };
};

const spanishAdvanced = [
  {
    prompt: 'Si el comité ___ más evidencia, habría cambiado la decisión.',
    answer: 'hubiera tenido',
    options: ['hubiera tenido', 'tuviera', 'tiene', 'tendría'],
    explanation: 'Condicional irreal del pasado memakai pluscuamperfecto de subjuntivo di klausa “si”.',
  },
  {
    prompt: 'Aunque la hipótesis parezca sólida, conviene que la investigadora la ___ con más datos.',
    answer: 'corrobore',
    options: ['corrobore', 'corrobora', 'corroboró', 'corroboraría'],
    explanation: 'Después de “conviene que”, se usa subjuntivo.',
  },
  {
    prompt: 'El informe fue redactado ___ gran precisión terminológica y sin ambigüedades.',
    answer: 'con',
    options: ['con', 'por', 'para', 'desde'],
    explanation: 'La construcción correcta es “con precisión”.',
  },
  {
    prompt: 'La expresión más cercana a “carry out a study” es...',
    answer: 'llevar a cabo un estudio',
    options: ['llevar a cabo un estudio', 'tomar un estudio', 'cargar un estudio', 'sostener un estudio'],
    explanation: '“Llevar a cabo” adalah kolokasi yang tepat untuk melaksanakan studi.',
  },
];

const createAdvancedSpanishQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const item = spanishAdvanced[index % spanishAdvanced.length];
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Difícil • Español Intermedio] ${item.prompt}`,
    answer: item.answer,
    explanation: item.explanation,
    options: shuffleDeterministic(item.options, seed),
  };
};

const createMcqQuestion = (moduleName, index) => {
  switch (moduleName) {
    case 'Matematika Simak UI':
      return createAdvancedSimakMathQuestion(moduleName, index);
    case 'Matematika LPDP':
      return createAdvancedLpdpMathQuestion(moduleName, index);
    case 'Tes Substansi LPDP':
      return createAdvancedLpdpSubstanceQuestion(moduleName, index);
    case 'Tes Potensi Akademik':
    case 'TPA Bappenas':
    case 'TPA Simak UI Paskasarjana':
      return createAdvancedTpaQuestion(moduleName, index);
    case 'Soal Onkologi Radiasi':
      return createAdvancedOncologyQuestion(moduleName, index);
    case 'Soal Toefl':
      return createAdvancedToeflQuestion(moduleName, index);
    case 'IELTS':
      return createAdvancedIeltsQuestion(moduleName, index);
    case 'Bahasa inggris Simak UI Paskasarjana':
      return createAdvancedSimakEnglishQuestion(moduleName, index);
    case 'Bahasa Spanyol':
      return createAdvancedSpanishQuestion(moduleName, index);
    case 'UKMPPD':
      return createAdvancedUkmppdQuestion(moduleName, index);
    case 'Tes IQ':
      return createAdvancedIqQuestion(moduleName, index);
    default:
      return createAdvancedSimakMathQuestion(moduleName, index);
  }
};

const essayBlueprints = {
  'Matematika Simak UI': {
    themes: ['limit multilangkah', 'optimasi fungsi', 'kombinatorika tingkat lanjut', 'integral tentu', 'barisan campuran', 'transformasi fungsi', 'logaritma dan eksponen', 'geometri analitik'],
    lenses: ['buktikan secara formal', 'bandingkan dua metode penyelesaian', 'bahas sumber kesalahan umum', 'beri contoh kontraintuisi', 'turunkan rumus umum', 'hubungkan ke interpretasi grafik'],
    scenarios: ['tanpa kalkulator', 'dengan batas waktu ketat', 'untuk soal pilihan ganda jebakan', 'pada konteks data riil', 'dalam format pembuktian singkat'],
  },
  'Matematika LPDP': {
    themes: ['present value vs future value', 'break-even analysis', 'probabilitas keputusan', 'rasio bertingkat', 'statistika deskriptif', 'analisis sensitivitas biaya', 'bunga majemuk', 'sampling representatif'],
    lenses: ['untuk pengambilan keputusan publik', 'untuk beasiswa luar negeri', 'untuk evaluasi program sosial', 'untuk alokasi anggaran terbatas', 'untuk mitigasi risiko finansial'],
    scenarios: ['sertakan asumsi eksplisit', 'jelaskan bias yang mungkin muncul', 'buat langkah hitung sistematis', 'beri interpretasi manajerial'],
  },
  'Tes Substansi LPDP': {
    themes: lpdpThemes,
    lenses: lpdpAngles,
    scenarios: ['sertakan indikator hasil', 'jelaskan trade-off kebijakan', 'masukkan strategi kolaborasi', 'tuliskan peta implementasi 12 bulan'],
  },
  'Tes Potensi Akademik': {
    themes: ['validitas argumen', 'inferensi teks akademik', 'analogi konseptual', 'fallacy dalam debat publik', 'deret multiaturan', 'strategi eliminasi opsi', 'data sufficiency', 'himpunan dan irisan', 'perbandingan kuantitatif', 'ordering constraint'],
    lenses: ['dari sisi kecepatan', 'dari sisi akurasi', 'dari sisi metakognisi', 'dari sisi jebakan soal', 'dari sisi evaluasi asumsi', 'dari sisi review kesalahan'],
    scenarios: ['sertakan contoh orisinal', 'urai langkah bernalar', 'bandingkan dengan pendekatan keliru umum', 'buat checklist singkat sebelum memilih jawaban'],
  },
  'Soal Onkologi Radiasi': {
    themes: ['4R radiobiologi', 'konturing GTV/CTV/PTV', 'fraksionasi', 'LET dan RBE', 'efek akut vs lambat', 'peran imaging multimodal'],
    lenses: ['pada kasus dekat organ kritis', 'pada tujuan kuratif', 'pada konteks paliatif', 'dalam evaluasi kualitas rencana'],
    scenarios: ['sertakan implikasi klinis', 'jelaskan kompromi antara kontrol tumor dan toksisitas', 'tambahkan contoh aplikasi'],
  },
  'Soal Toefl': {
    themes: ['inference reading', 'rhetorical purpose', 'advanced clause structure', 'subjunctive and inversion', 'academic vocabulary precision'],
    lenses: ['untuk target skor tinggi', 'untuk menghindari jebakan distraktor', 'untuk membaca cepat namun akurat', 'untuk revisi mandiri'],
    scenarios: ['beri contoh kalimat baru', 'jelaskan error pattern umum', 'bandingkan jawaban benar dan hampir benar'],
  },
  UKMPPD: {
    themes: ['prioritas stabilisasi', 'penentuan diagnosis kerja', 'indikasi rujukan emergensi', 'pemilihan terapi awal', 'interpretasi red flags'],
    lenses: ['pada layanan primer', 'di IGD rujukan', 'saat sumber daya terbatas', 'pada pasien dengan komorbid'],
    scenarios: ['sertakan algoritma singkat', 'jelaskan alasan keselamatan pasien', 'bedakan dengan tindakan yang tampak benar tetapi terlambat'],
  },
  'TPA Bappenas': {
    themes: ['strategi verbal presisi', 'deret dan pola multiaturan', 'silogisme ketat', 'membaca tabel dengan inferensi'],
    lenses: ['untuk efisiensi waktu', 'untuk akurasi tinggi', 'untuk review pascatryout'],
    scenarios: ['sertakan contoh mini', 'jelaskan pola salah umum', 'buat checklist praktis'],
  },
  IELTS: {
    themes: ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy', 'reading skimming-scanning', 'speaking part 3 development'],
    lenses: ['untuk target band 7', 'untuk target band 8', 'untuk memperbaiki tulisan akademik'],
    scenarios: ['sertakan mini-outline', 'jelaskan band descriptor yang relevan', 'bandingkan respons lemah vs kuat'],
  },
  'Bahasa inggris Simak UI Paskasarjana': {
    themes: ['inversi formal', 'connector akademik', 'inferensi tersirat', 'kolokasi ilmiah', 'struktur kalimat kompleks'],
    lenses: ['untuk membaca jurnal', 'untuk soal cloze test', 'untuk sentence completion'],
    scenarios: ['sertakan contoh akademik', 'jelaskan pilihan kata paling presisi', 'bandingkan dengan distraktor dekat'],
  },
  'Bahasa Spanyol': {
    themes: ['subjuntivo', 'condicional compuesto', 'perífrasis verbales', 'por vs para tingkat lanjut', 'kolokasi akademik'],
    lenses: ['dalam esai formal', 'dalam konteks riset', 'dalam percakapan profesional'],
    scenarios: ['sertakan kalimat contoh', 'jelaskan nuansa makna', 'bandingkan dengan bentuk yang keliru'],
  },
  'Tes IQ': {
    themes: ['deret numerik berlapis', 'klasifikasi abstrak', 'penalaran spasial sederhana', 'relasi kuantitatif', 'strategi pola'],
    lenses: ['untuk soal cepat', 'untuk soal jebakan', 'untuk soal multiaturan'],
    scenarios: ['jelaskan proses eliminasi', 'tunjukkan aturan inti', 'beri satu variasi serupa'],
  },
};

const essayHints = {
  'Matematika Simak UI': ['Cari invariant atau bentuk ekuivalen.', 'Tunjukkan alasan setiap transformasi aljabar.', 'Pisahkan strategi utama dan pengecekan akhir.'],
  'Matematika LPDP': ['Nyatakan asumsi numerik sebelum menghitung.', 'Bedakan hasil hitung dan interpretasi kebijakan.', 'Uji sensitivitas jika variabel kunci berubah.'],
  'Tes Substansi LPDP': ['Gunakan struktur masalah → strategi → indikator → risiko.', 'Hubungkan kontribusi dengan prioritas nasional.', 'Tunjukkan trade-off dan keputusan prioritas.'],
  'Tes Potensi Akademik': ['Pisahkan premis eksplisit dan implisit.', 'Jelaskan mengapa distraktor tampak meyakinkan.', 'Tulis langkah bernalar, bukan hanya hasil.'],
  'Soal Onkologi Radiasi': ['Masukkan tujuan biologis dan konsekuensi klinis.', 'Bandingkan manfaat dan toksisitas.', 'Gunakan istilah teknis secara presisi.'],
  'Soal Toefl': ['Berikan contoh akademik, bukan percakapan kasual.', 'Soroti jebakan grammar atau inference.', 'Bandingkan opsi tepat dan hampir tepat.'],
  UKMPPD: ['Utamakan keselamatan pasien dan waktu kritis.', 'Sebutkan red flag, diagnosis kerja, lalu tindakan.', 'Bedakan stabilisasi dari terapi definitif.'],
  'TPA Bappenas': ['Buat pola berpikir yang dapat diulang.', 'Tekankan efisiensi keputusan.', 'Cantumkan kesalahan umum yang harus dihindari.'],
  IELTS: ['Selaraskan jawaban dengan band descriptor.', 'Tunjukkan struktur respons yang jelas.', 'Berikan contoh frasa akademik yang natural.'],
  'Bahasa inggris Simak UI Paskasarjana': ['Fokus pada formal register dan inference.', 'Jelaskan fungsi konektor atau struktur.', 'Tunjukkan alasan eliminasi opsi.'],
  'Bahasa Spanyol': ['Perhatikan mode verbal dan konteks.', 'Jelaskan nuansa makna, bukan sekadar terjemahan.', 'Berikan contoh lawan/kontras bila perlu.'],
  'Tes IQ': ['Cari pola global sebelum detail.', 'Uji dua hipotesis lalu eliminasi.', 'Pastikan aturan konsisten untuk semua suku.'],
};

const createEssayQuestion = (moduleName, index) => {
  const n = index + 1;
  const blueprint = essayBlueprints[moduleName] || essayBlueprints['Matematika Simak UI'];
  const theme = blueprint.themes[index % blueprint.themes.length];
  const lens = blueprint.lenses[Math.floor(index / blueprint.themes.length) % blueprint.lenses.length];
  const scenario = blueprint.scenarios[Math.floor(index / (blueprint.themes.length * blueprint.lenses.length)) % blueprint.scenarios.length];
  const hintList = essayHints[moduleName] || essayHints['Matematika Simak UI'];
  return {
    id: `essay-${moduleName}-${n}`,
    module: moduleName,
    prompt: `Soal ${n}: Uraikan pendekatan tingkat lanjut untuk topik ${theme} dengan fokus ${lens}, lalu sesuaikan jawaban ${scenario}.`,
    hint: hintList[index % hintList.length],
  };
};

const flashcardBlueprints = {
  'Matematika Simak UI': ['identitas aljabar', 'diskriminan', 'deret aritmetika', 'deret geometri', 'optimasi kuadrat', 'transformasi grafik'],
  'Matematika LPDP': ['present value', 'future value', 'BEP', 'persentase bertingkat', 'rasio majemuk', 'probabilitas keputusan'],
  'Tes Substansi LPDP': ['theory of change', 'stakeholder mapping', 'SMART metric', 'risk register', 'impact pathway', 'exit strategy'],
  'Tes Potensi Akademik': ['premis', 'inferensi', 'analogi', 'fallacy', 'eliminasi opsi', 'pola campuran', 'data sufficiency', 'rasio tabel', 'asumsi', 'constraint'],
  'Soal Onkologi Radiasi': ['4R radiobiologi', 'CTV/PTV', 'IMRT', 'LET', 'OER', 'toxicity grading'],
  'Soal Toefl': ['subjunctive', 'inversion', 'rhetorical purpose', 'inference', 'collocation', 'hedging'],
  UKMPPD: ['triase', 'red flag', 'reperfusi', 'rehidrasi', 'MgSO4', 'door-to-CT'],
  'TPA Bappenas': ['silogisme', 'deret', 'interpretasi tabel', 'synonym precision', 'assumption check', 'time strategy', 'rasio', 'strengthening'],
  IELTS: ['Task Response', 'Cohesion', 'Lexical Resource', 'Band 7 evidence', 'Part 3 development', 'overview statement'],
  'Bahasa inggris Simak UI Paskasarjana': ['connector', 'inference', 'formal inversion', 'academic collocation', 'cloze logic', 'sentence completion'],
  'Bahasa Spanyol': ['subjuntivo', 'por vs para', 'condicional', 'perífrasis', 'registro formal', 'colocación'],
  'Tes IQ': ['rule detection', 'sequence gap', 'classification', 'spatial cue', 'ratio thinking', 'trap pattern'],
};

const createFlashcard = (moduleName, index) => {
  const n = index + 1;
  const concepts = flashcardBlueprints[moduleName] || flashcardBlueprints['Matematika Simak UI'];
  const concept = concepts[index % concepts.length];
  const angle = ['definisi inti', 'jebakan umum', 'indikator cepat', 'contoh aplikasi', 'kontras penting', 'langkah evaluasi'][Math.floor(index / concepts.length) % 6];
  return {
    id: `fc-${moduleName}-${n}`,
    module: moduleName,
    front: `${concept.toUpperCase()} • ${angle} • kartu ${n}`,
    back: `Modul ${moduleName}: fokus ${concept} dengan sudut ${angle}. Gunakan kartu ini untuk mengingat ciri tingkat sulit, alasan konsep ini penting, dan bagaimana membedakannya dari distraktor yang tampak benar.`,
  };
};

const ensureUniquePrompts = (items, type) => {
  const seen = new Map();
  return items.map((item) => {
    const key = `${type}-${item.module}-${type === 'flashcards' ? item.front : item.prompt}`;
    const count = seen.get(key) || 0;
    seen.set(key, count + 1);
    if (count === 0) return item;
    if (type === 'flashcards') {
      return { ...item, front: `${item.front} • varian ${count + 1}` };
    }
    return { ...item, prompt: `${item.prompt} [Varian ${count + 1}]` };
  });
};

const validateUniqueness = (items, type) => {
  const seen = new Set();
  items.forEach((item) => {
    const value = type === 'flashcards' ? item.front : item.prompt;
    const key = `${type}-${item.module}-${value}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate ${type} detected for ${item.module}: ${value}`);
    }
    seen.add(key);
  });
};

const buildQuestionBank = () => {
  const mcq = [];
  const essay = [];
  const flashcards = [];

  moduleConfigs.forEach((module) => {
    for (let i = 0; i < (module.questionCount || DEFAULT_QUESTION_COUNT_PER_MODULE); i += 1) {
      mcq.push(createMcqQuestion(module.name, i));
      essay.push(createEssayQuestion(module.name, i));
      flashcards.push(createFlashcard(module.name, i));
    }
  });

  const bank = {
    mcq: ensureUniquePrompts(mcq, 'mcq'),
    essay: ensureUniquePrompts(essay, 'essay'),
    flashcards: ensureUniquePrompts(flashcards, 'flashcards'),
  };

  validateUniqueness(bank.mcq, 'mcq');
  validateUniqueness(bank.essay, 'essay');
  validateUniqueness(bank.flashcards, 'flashcards');

  return bank;
};

export const questionBank = buildQuestionBank();
export const moduleQuestionMap = moduleConfigs.reduce((acc, module) => {
  acc[module.name] = {
    mcq: questionBank.mcq.filter((question) => question.module === module.name),
    essay: questionBank.essay.filter((question) => question.module === module.name),
    flashcards: questionBank.flashcards.filter((question) => question.module === module.name),
  };
  return acc;
}, {});
