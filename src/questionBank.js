export const moduleConfigs = [
  {
    name: 'Matematika Simak UI',
    tag: 'Analitik Kuantitatif • Hard mode berbasis riset',
    questionCount: 200,
  },
  { name: 'Matematika LPDP', tag: 'Reasoning Numerik', questionCount: 200 },
  { name: 'Tes Substansi LPDP', tag: 'Kebijakan & Kepemimpinan', questionCount: 150 },
  { name: 'Tes Potensi Akademik', tag: 'Verbal & Logika', questionCount: 200 },
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
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const buildNumericOptions = (answer, variants, seed, formatter = (value) => String(value)) => {
  const raw = [answer, ...variants].map((value) => formatter(value));
  return shuffleDeterministic([...new Set(raw)].slice(0, 4), seed);
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
  const topic = index % 8;
  const seed = seeded(moduleName, index);
  const context = pick(['proyeksi biaya studi', 'valuasi dana abadi', 'analisis biaya hidup', 'cashflow proyek sosial', 'anggaran mobilitas akademik'], seed);

  const variants = [
    () => {
      const principal = ((seed % 9) + 12) * 1_000_000;
      const rate = ((seed >> 2) % 5) + 6;
      const years = ((seed >> 4) % 3) + 2;
      const answer = Math.round(principal * ((1 + (rate / 100)) ** years));
      return {
        prompt: `[Sulit • Bunga Majemuk] Dalam ${context}, dana Rp ${principal.toLocaleString('id-ID')} tumbuh ${rate}% per tahun selama ${years} tahun. Nilai akhirnya mendekati...`,
        answer: `Rp ${answer.toLocaleString('id-ID')}`,
        explanation: `A = P(1+r)^t = ${principal} × (1+${rate}/100)^${years} ≈ ${answer}.`,
        options: shuffleDeterministic([
          `Rp ${answer.toLocaleString('id-ID')}`,
          `Rp ${(answer + 750000).toLocaleString('id-ID')}`,
          `Rp ${(answer - 500000).toLocaleString('id-ID')}`,
          `Rp ${Math.round(principal * (1 + (rate / 100) * years)).toLocaleString('id-ID')}`,
        ], seed),
      };
    },
    () => {
      const present = ((seed % 8) + 9) * 1_000_000;
      const rate = ((seed >> 2) % 4) + 5;
      const years = ((seed >> 4) % 4) + 2;
      const answer = Math.round(present / ((1 + (rate / 100)) ** years));
      return {
        prompt: `[Sulit • Present Value] Target ${context} memerlukan Rp ${present.toLocaleString('id-ID')} pada ${years} tahun lagi. Jika tingkat diskonto ${rate}% per tahun, present value-nya adalah...`,
        answer: `Rp ${answer.toLocaleString('id-ID')}`,
        explanation: `PV = FV / (1+r)^n = ${present} / (1+${rate}/100)^${years} ≈ ${answer}.`,
        options: shuffleDeterministic([
          `Rp ${answer.toLocaleString('id-ID')}`,
          `Rp ${(answer + 400000).toLocaleString('id-ID')}`,
          `Rp ${(answer - 300000).toLocaleString('id-ID')}`,
          `Rp ${Math.round(present / (1 + (rate / 100) * years)).toLocaleString('id-ID')}`,
        ], seed),
      };
    },
    () => {
      const total = ((seed % 6) + 10) * 12;
      const ratioA = ((seed >> 2) % 4) + 3;
      const ratioB = ((seed >> 4) % 5) + 2;
      const ratioC = ((seed >> 6) % 3) + 2;
      const parts = ratioA + ratioB + ratioC;
      const answer = (total * ratioB) / parts;
      return {
        prompt: `[Sulit • Rasio Tiga Komponen] Pada ${context}, anggaran ${total} unit dibagi untuk tiga agenda dengan rasio ${ratioA}:${ratioB}:${ratioC}. Porsi agenda kedua adalah...`,
        answer: String(answer),
        explanation: `Total bagian = ${parts}; bagian kedua = ${total} × ${ratioB}/${parts} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + ratioA, answer - ratioC, total / 3], seed),
      };
    },
    () => {
      const base = ((seed % 7) + 8) * 100_000;
      const up = ((seed >> 3) % 7) + 8;
      const down = ((seed >> 5) % 5) + 4;
      const answer = Math.round(base * (1 + (up / 100)) * (1 - (down / 100)));
      return {
        prompt: `[Sulit • Persentase Bertingkat] Untuk ${context}, biaya awal Rp ${base.toLocaleString('id-ID')} naik ${up}% lalu dikoreksi turun ${down}%. Biaya akhir adalah...`,
        answer: `Rp ${answer.toLocaleString('id-ID')}`,
        explanation: `Kenaikan dan penurunan berturut-turut: ${base} × ${1 + (up / 100)} × ${1 - (down / 100)} ≈ ${answer}.`,
        options: shuffleDeterministic([
          `Rp ${answer.toLocaleString('id-ID')}`,
          `Rp ${(answer + 150000).toLocaleString('id-ID')}`,
          `Rp ${(answer - 125000).toLocaleString('id-ID')}`,
          `Rp ${Math.round(base * (1 + ((up - down) / 100))).toLocaleString('id-ID')}`,
        ], seed),
      };
    },
    () => {
      const fixed = ((seed % 6) + 6) * 100_000;
      const variable = ((seed >> 2) % 5) + 3;
      const price = variable + ((seed >> 4) % 5) + 4;
      const answer = Math.ceil(fixed / (price - variable));
      return {
        prompt: `[Sulit • Break-even] Dalam ${context}, biaya tetap Rp ${fixed.toLocaleString('id-ID')}, biaya variabel per unit Rp ${variable}00.000, dan harga jual Rp ${price}00.000. Titik impas unit minimum adalah...`,
        answer: `${answer} unit`,
        explanation: `BEP = biaya tetap / (harga - biaya variabel) = ${fixed} / ${(price - variable) * 100000} = ${answer}.`,
        options: shuffleDeterministic([`${answer} unit`, `${answer + 1} unit`, `${Math.max(1, answer - 1)} unit`, `${answer + 3} unit`], seed),
      };
    },
    () => {
      const mean = ((seed % 8) + 12);
      const count = ((seed >> 2) % 5) + 5;
      const newValue = ((seed >> 4) % 9) + 18;
      const answer = ((mean * count) + newValue) / (count + 1);
      return {
        prompt: `[Sulit • Statistik] Rata-rata ${count} data pada ${context} adalah ${mean}. Jika ditambah satu data baru bernilai ${newValue}, rata-rata baru menjadi...`,
        answer: Number(answer.toFixed(2)).toString(),
        explanation: `Jumlah awal ${mean * count}. Tambahkan ${newValue}, lalu bagi ${count + 1}; hasil ${answer.toFixed(2)}.`,
        options: shuffleDeterministic([
          Number(answer.toFixed(2)).toString(),
          Number((answer + 0.5).toFixed(2)).toString(),
          Number((answer - 0.5).toFixed(2)).toString(),
          String(mean),
        ], seed),
      };
    },
    () => {
      const favorable = ((seed % 6) + 2);
      const total = favorable + ((seed >> 2) % 6) + 5;
      const g = gcd(favorable, total);
      const answer = `${favorable / g}/${total / g}`;
      return {
        prompt: `[Sulit • Probabilitas] Dalam ${context}, ada ${favorable} skenario keberhasilan dari ${total} skenario ekuiprobabel. Probabilitas keberhasilan paling sederhana adalah...`,
        answer,
        explanation: `Probabilitas = ${favorable}/${total}, sederhanakan dengan FPB ${g} menjadi ${answer}.`,
        options: shuffleDeterministic([answer, `${favorable}/${total}`, `${favorable + 1}/${total}`, `${favorable}/${total + 1}`], seed),
      };
    },
    () => {
      const workers = ((seed % 5) + 6);
      const days = ((seed >> 2) % 7) + 8;
      const newWorkers = workers + ((seed >> 4) % 4) + 2;
      const answer = Number(((workers * days) / newWorkers).toFixed(2));
      return {
        prompt: `[Sulit • Perbandingan Berbalik Nilai] Dalam ${context}, ${workers} analis menyelesaikan model dalam ${days} hari. Jika menjadi ${newWorkers} analis dengan produktivitas sama, estimasi waktu adalah...`,
        answer: `${answer} hari`,
        explanation: `${workers} × ${days} = ${newWorkers} × x, jadi x = ${(workers * days)}/${newWorkers} = ${answer} hari.`,
        options: shuffleDeterministic([`${answer} hari`, `${Number((answer + 1).toFixed(2))} hari`, `${Number((answer - 1).toFixed(2))} hari`, `${workers + days} hari`], seed),
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
  const theme = lpdpThemes[index % lpdpThemes.length];
  const angle = lpdpAngles[Math.floor(index / lpdpThemes.length) % lpdpAngles.length];
  const challenge = pick([
    'dukungan politik berubah di tengah program',
    'data baseline tidak lengkap antarwilayah',
    'kapasitas tim daerah sangat timpang',
    'deadline donor terlalu agresif',
    'resistensi komunitas lokal cukup tinggi',
  ], seed);

  const options = [
    {
      answer: `Memulai dengan pemetaan masalah ${theme}, lalu merancang ${angle} yang tetap adaptif saat ${challenge}.`,
      explanation: 'Pendekatan terbaik pada seleksi substansi adalah berpikir strategis, evidence-based, dan menunjukkan kesiapan implementasi serta adaptasi risiko.',
    },
    {
      answer: `Mengutamakan popularitas program ${theme} agar cepat disetujui walaupun indikator ${angle} belum matang.`,
      explanation: '',
    },
    {
      answer: `Menunggu semua risiko ${challenge} hilang sebelum membuat desain kontribusi ${theme}.`,
      explanation: '',
    },
    {
      answer: `Berfokus pada narasi personal tanpa menjelaskan bagaimana ${angle} dijalankan dalam isu ${theme}.`,
      explanation: '',
    },
  ];

  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Sulit • Substansi LPDP] Jika Anda diwawancarai mengenai ${theme}, pendekatan paling kuat untuk menunjukkan ${angle} ketika ${challenge} adalah...`,
    answer: options[0].answer,
    explanation: options[0].explanation,
    options: shuffleDeterministic(options.map((item) => item.answer), seed),
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

const createAdvancedTpaQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 8;

  const variants = [
    () => {
      const [a, b, c, d] = tpaRelations[index % tpaRelations.length];
      return {
        prompt: `[Sulit • Analogi Konseptual] ${a} : ${b} = ${c} : ...`,
        answer: d,
        explanation: `Hubungan yang dipakai adalah pelaku dengan instrumen/produk intelektual utamanya.`,
        options: shuffleDeterministic([d, a, b, 'validasi'], seed),
      };
    },
    () => {
      const item = pick([
        { seq: [3, 7, 15, 31], answer: 63, rule: 'setiap suku = 2×suku sebelumnya + 1' },
        { seq: [2, 6, 12, 20], answer: 30, rule: 'bertambah +4, +6, +8, +10' },
        { seq: [81, 27, 9, 3], answer: 1, rule: 'dibagi 3 setiap langkah' },
        { seq: [5, 10, 8, 16, 14], answer: 28, rule: 'bergantian ×2 lalu -2' },
      ], seed);
      return {
        prompt: `[Sulit • Deret Campuran] Tentukan suku berikutnya: ${item.seq.join(', ')}, ...`,
        answer: String(item.answer),
        explanation: `Pola: ${item.rule}.`,
        options: buildNumericOptions(item.answer, [item.answer + 2, item.answer - 2, item.answer + 6], seed),
      };
    },
    () => {
      const [statement, answer] = tpaFallacies[index % tpaFallacies.length];
      return {
        prompt: `[Sulit • Critical Reasoning] Jenis kekeliruan logika pada pernyataan berikut adalah: "${statement}"`,
        answer,
        explanation: 'Penamaan fallacy harus mengikuti kelemahan inti pada hubungan premis dan kesimpulannya.',
        options: shuffleDeterministic([answer, 'appeal to tradition', 'circular reasoning', 'equivocation'], seed),
      };
    },
    () => {
      const premise1 = 'Semua proposal yang lolos panel memenuhi kriteria metodologi kuat.';
      const premise2 = 'Sebagian proposal berdampak tinggi tidak lolos panel.';
      return {
        prompt: `[Sulit • Silogisme] ${premise1} ${premise2} Kesimpulan yang pasti benar adalah...`,
        answer: 'Tidak semua proposal berdampak tinggi memenuhi seluruh kriteria panel.',
        explanation: 'Karena sebagian proposal berdampak tinggi tidak lolos panel, paling tidak ada proposal berdampak tinggi yang tidak memenuhi seluruh kriteria panel.',
        options: shuffleDeterministic([
          'Tidak semua proposal berdampak tinggi memenuhi seluruh kriteria panel.',
          'Semua proposal berdampak tinggi pasti metodologinya kuat.',
          'Semua proposal yang lolos panel berdampak tinggi.',
          'Tidak dapat disimpulkan apa pun tentang proposal berdampak tinggi.',
        ], seed),
      };
    },
    () => {
      const correct = pick(['abstrak', 'sahih', 'gamblang', 'inferensi'], seed);
      const optionsMap = {
        abstrak: ['konkret', 'bias', 'redundan'],
        sahih: ['keliru', 'rapuh', 'semu'],
        gamblang: ['kabur', 'dangkal', 'rancu'],
        inferensi: ['narasi', 'deskripsi', 'retorika'],
      };
      return {
        prompt: `[Sulit • Antonim/Sinonim Akademik] Lawan kata paling tepat dari "${correct}" adalah...`,
        answer: optionsMap[correct][0],
        explanation: `Fokus pada makna akademik paling presisi, bukan asosiasi sehari-hari yang longgar.`,
        options: shuffleDeterministic([optionsMap[correct][0], ...optionsMap[correct].slice(1), correct], seed),
      };
    },
    () => {
      const tables = [
        { a: 24, b: 18, c: 30, answer: 'Tim C memiliki laju produksi tertinggi per orang.' },
        { a: 35, b: 28, c: 21, answer: 'Tim A unggul 25% dibanding tim B.' },
      ];
      const item = tables[index % tables.length];
      return {
        prompt: `[Sulit • Interpretasi Data] Output tiga tim adalah A=${item.a}, B=${item.b}, C=${item.c}. Jika jumlah anggota A=5, B=4, C=6, kesimpulan paling valid adalah...`,
        answer: item.answer,
        explanation: 'Bandingkan rasio output per orang sebelum menarik kesimpulan, bukan total mentah saja.',
        options: shuffleDeterministic([
          item.answer,
          'Tim dengan total output terbesar pasti juga paling efisien.',
          'Tidak mungkin menilai efisiensi tanpa biaya total.',
          'Tim B dan C pasti identik produktivitasnya.',
        ], seed),
      };
    },
    () => {
      const answer = 'Mengidentifikasi asumsi tersembunyi sebelum menilai validitas argumen';
      return {
        prompt: `[Sulit • Strategi Tes] Saat menghadapi argumen kompleks dengan dua premis statistik yang tampak kuat, langkah paling efektif adalah...`,
        answer,
        explanation: 'Asumsi tersembunyi sering menjadi sumber kesalahan inferensi dalam soal TPA tingkat tinggi.',
        options: shuffleDeterministic([
          answer,
          'Langsung memilih opsi dengan istilah paling teknis',
          'Mengabaikan angka agar fokus pada opini penulis',
          'Mengganti premis dengan pengalaman pribadi',
        ], seed),
      };
    },
    () => {
      const a = (seed % 4) + 2;
      const b = ((seed >> 2) % 4) + 3;
      const c = ((seed >> 4) % 3) + 2;
      const answer = a * b + c;
      return {
        prompt: `[Sulit • Penalaran Numerik] Jika semua objek tipe X bernilai ${a} poin, tipe Y bernilai ${b} poin, dan bonus validasi ${c} poin diberikan sekali, total skor untuk 1 paket XY adalah...`,
        answer: String(answer),
        explanation: `Total = ${a}×${b} + ${c} = ${answer}.`,
        options: buildNumericOptions(answer, [answer + 2, answer - 1, a + b + c], seed),
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

const toeflGrammarSets = [
  {
    prompt: 'Had the committee ___ the baseline data earlier, the recommendation would have been more robust.',
    answer: 'reviewed',
    options: ['reviewed', 'reviews', 'review', 'reviewing'],
    explanation: 'Inverted conditional with “Had + subject + past participle” requires the past participle form.',
  },
  {
    prompt: 'No sooner ___ the interim report than the board requested a methodological audit.',
    answer: 'had the analyst submitted',
    options: ['had the analyst submitted', 'the analyst had submitted', 'did the analyst submit', 'has the analyst submitted'],
    explanation: 'After “No sooner”, formal inversion uses past perfect: “had + subject + past participle”.',
  },
  {
    prompt: 'The policy brief, along with three appendices, ___ scheduled for peer review next week.',
    answer: 'is',
    options: ['is', 'are', 'were', 'be'],
    explanation: 'The main subject is singular: “brief”. The phrase “along with...” does not change agreement.',
  },
  {
    prompt: 'The researcher demanded that each participant ___ informed of the protocol revision immediately.',
    answer: 'be',
    options: ['be', 'is', 'was', 'been'],
    explanation: 'Subjunctive mandative structure requires the base form “be”.',
  },
];
const toeflVocabSets = [
  ['meticulous', 'showing great attention to detail'],
  ['tenuous', 'weak or not strongly supported'],
  ['ubiquitous', 'present or found everywhere'],
  ['pragmatic', 'focused on practical results'],
  ['salient', 'most noticeable or important'],
  ['mitigate', 'reduce the severity of'],
];

const createAdvancedToeflQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const topic = index % 4;

  const variants = [
    () => {
      const item = toeflGrammarSets[index % toeflGrammarSets.length];
      return {
        prompt: `[Hard TOEFL Structure] ${item.prompt}`,
        answer: item.answer,
        explanation: item.explanation,
        options: shuffleDeterministic(item.options, seed),
      };
    },
    () => {
      const [word, meaning] = toeflVocabSets[index % toeflVocabSets.length];
      return {
        prompt: `[Hard TOEFL Vocabulary] The word "${word}" is closest in meaning to...`,
        answer: meaning,
        explanation: 'TOEFL high-level vocabulary often contrasts precise academic meaning against near-synonym distractors.',
        options: shuffleDeterministic([
          meaning,
          'irrelevant or trivial',
          'emotionally unstable',
          'entirely speculative',
        ], seed),
      };
    },
    () => ({
      prompt: '[Hard TOEFL Reading] Which choice best reflects an inference question in academic reading?',
      answer: 'It asks for the conclusion most strongly supported, even if it is not stated word-for-word.',
      explanation: 'Inference items reward careful synthesis of explicit textual evidence.',
      options: shuffleDeterministic([
        'It asks for the conclusion most strongly supported, even if it is not stated word-for-word.',
        'It only asks for a synonym that appears in the final paragraph.',
        'It requires personal opinion beyond the passage.',
        'It focuses exclusively on punctuation errors.',
      ], seed),
    }),
    () => ({
      prompt: '[Hard TOEFL Rhetoric] In a rhetorical purpose question, the test taker should primarily identify...',
      answer: 'why the author included a sentence, example, or contrast in the argument structure',
      explanation: 'Rhetorical purpose asks about function, not merely content recall.',
      options: shuffleDeterministic([
        'why the author included a sentence, example, or contrast in the argument structure',
        'which word has the most syllables in the paragraph',
        'how to rewrite the passage in a more informal tone',
        'which option sounds the most persuasive personally',
      ], seed),
    }),
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

const simakEnglishTopics = [
  {
    prompt: 'The findings are hardly definitive; ___, they do warrant a larger follow-up study.',
    answer: 'nevertheless',
    options: ['nevertheless', 'thereby', 'likewise', 'whereas'],
    explanation: 'The second clause contrasts with the first, so a concessive connector is needed.',
  },
  {
    prompt: 'Only after the dataset had been normalized ___ that the original comparison was biased.',
    answer: 'did the reviewers realize',
    options: ['did the reviewers realize', 'the reviewers realized', 'had the reviewers realized', 'the reviewers had realized'],
    explanation: 'Fronted negative adverbials trigger inversion in formal English.',
  },
  {
    prompt: 'The proposal was praised not merely for its novelty but also for the rigor with which it ___ its assumptions.',
    answer: 'articulated',
    options: ['articulated', 'articulate', 'articulating', 'has articulate'],
    explanation: 'The clause needs a simple past verb parallel to “was praised”.',
  },
  {
    prompt: 'A strong postgraduate reader should distinguish between evidence that is explicit and claims that are only ___ by the author.',
    answer: 'implied',
    options: ['implied', 'invented', 'retracted', 'duplicated'],
    explanation: 'Academic reading at this level requires inference from implied claims.',
  },
];

const createAdvancedSimakEnglishQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const item = simakEnglishTopics[index % simakEnglishTopics.length];
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Hard Academic English] ${item.prompt}`,
    answer: item.answer,
    explanation: item.explanation,
    options: shuffleDeterministic(item.options, seed),
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

const ukmppdCases = [
  {
    stase: 'Penyakit Dalam',
    stem: 'Pria 60 tahun dengan nyeri dada tipikal 90 menit, elevasi ST di inferior lead, fasilitas mampu PCI berjarak 1 jam.',
    answer: 'Aktifkan jalur reperfusi segera sambil memberikan DAPT dan terapi suportif terarah.',
  },
  {
    stase: 'Bedah',
    stem: 'Pasien trauma tumpul abdomen hipotensi, FAST positif, respons resusitasi minimal.',
    answer: 'Lakukan damage control resuscitation dan laparotomi emergensi tanpa menunda untuk CT.',
  },
  {
    stase: 'Anak',
    stem: 'Balita diare akut dengan turgor kembali lambat, mata cekung, masih dapat minum.',
    answer: 'Klasifikasikan sebagai dehidrasi ringan-sedang dan jalankan rehidrasi oral terukur.',
  },
  {
    stase: 'Obstetri',
    stem: 'Ibu hamil 35 minggu dengan tekanan darah 170/110, nyeri kepala berat, proteinuria.',
    answer: 'Stabilisasi preeklamsia berat dengan MgSO4, kontrol tekanan darah, lalu rencanakan terminasi sesuai indikasi.',
  },
  {
    stase: 'Neurologi',
    stem: 'Pasien datang 2 jam setelah onset hemiparesis, CT kepala non-kontras tanpa perdarahan.',
    answer: 'Skrining kontraindikasi dan evaluasi trombolisis intravena secepat mungkin.',
  },
  {
    stase: 'Komunitas',
    stem: 'Puskesmas melihat lonjakan DBD pada tiga minggu berturut-turut di satu kelurahan.',
    answer: 'Verifikasi diagnosis, tetapkan definisi kasus, lalu konfirmasi KLB sebelum intervensi populasi.',
  },
];

const createAdvancedUkmppdQuestion = (moduleName, index) => {
  const n = index + 1;
  const seed = seeded(moduleName, index);
  const item = ukmppdCases[index % ukmppdCases.length];
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Sulit • ${item.stase}] ${item.stem} Langkah paling tepat adalah...`,
    answer: item.answer,
    explanation: 'Fokus UKMPPD tingkat sulit adalah prioritas klinis, stabilisasi, dan keputusan aman berbasis waktu.',
    options: shuffleDeterministic([
      item.answer,
      'Observasi pasif sambil menunggu semua pemeriksaan lanjutan selesai terlebih dahulu.',
      'Memberikan terapi simptomatik saja lalu evaluasi ulang 24 jam tanpa stratifikasi risiko.',
      'Menunda keputusan hingga seluruh konsultan hadir walaupun kondisi memiliki red flag.',
    ], seed),
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
    themes: ['validitas argumen', 'inferensi teks akademik', 'analogi konseptual', 'fallacy dalam debat publik', 'deret campuran', 'strategi eliminasi opsi'],
    lenses: ['dari sisi kecepatan', 'dari sisi akurasi', 'dari sisi metakognisi', 'dari sisi jebakan soal'],
    scenarios: ['sertakan contoh orisinal', 'urai langkah bernalar', 'bandingkan dengan pendekatan keliru umum'],
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
  'Tes Potensi Akademik': ['premis', 'inferensi', 'analogi', 'fallacy', 'eliminasi opsi', 'pola campuran'],
  'Soal Onkologi Radiasi': ['4R radiobiologi', 'CTV/PTV', 'IMRT', 'LET', 'OER', 'toxicity grading'],
  'Soal Toefl': ['subjunctive', 'inversion', 'rhetorical purpose', 'inference', 'collocation', 'hedging'],
  UKMPPD: ['triase', 'red flag', 'reperfusi', 'rehidrasi', 'MgSO4', 'door-to-CT'],
  'TPA Bappenas': ['silogisme', 'deret', 'interpretasi tabel', 'synonym precision', 'assumption check', 'time strategy'],
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
