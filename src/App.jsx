import { useEffect, useMemo, useRef, useState } from 'react';

const moduleConfigs = [
  { name: 'Matematika Simak UI', tag: 'Analitik Kuantitatif', questionCount: 200 },
  { name: 'Matematika LPDP', tag: 'Reasoning Numerik', questionCount: 200 },
  { name: 'Tes Substansi LPDP', tag: 'Kebijakan & Kepemimpinan', questionCount: 150 },
  { name: 'Tes Potensi Akademik', tag: 'Verbal & Logika', questionCount: 200 },
  { name: 'Soal Onkologi Radiasi', tag: 'Konsep Medis', questionCount: 200 },
  { name: 'Soal Toefl', tag: 'English Mastery', questionCount: 200 },
  { name: 'UKMPPD', tag: 'Semua Stase Kedokteran', questionCount: 150 },
  { name: 'TPA Bappenas', tag: 'Verbal, Numerik & Logika', questionCount: 100 },
  { name: 'IELTS', tag: 'Academic English', questionCount: 100 },
  { name: 'Bahasa Spanyol', tag: 'Español Básico', questionCount: 100 },
  { name: 'Tes IQ', tag: 'Penalaran & Pola', questionCount: 150 },
];

const modules = moduleConfigs.map((module) => module.name);
const DEFAULT_QUESTION_COUNT_PER_MODULE = 200;
const PAGE_SIZE = 10;


// Hash function untuk generate seed unik per modul
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const shuffleDeterministic = (items, seed) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 13) % (i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

// ===== SOAL MATEMATIKA SIMAK UI =====
const createSimakMathQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;
  
  const variants = [
    () => {
      const a = ((baseSeed * 3) % 20) + 5;
      const b = ((baseSeed * 7) % 15) + 3;
      const c = ((baseSeed * 11) % 10) + 2;
      const result = a * b + c;
      const answer = String(result);
      return {
        prompt: `Diketahui f(x) = ${a}x + ${b}. Jika f(${c}) = y, berapakah nilai 2y + ${b}?`,
        answer,
        explanation: `f(${c}) = ${a}(${c}) + ${b} = ${a * c} + ${b} = ${a * c + b}. Maka 2y + ${b} = 2(${a * c + b}) + ${b} = ${result}.`,
        options: shuffleDeterministic(
          [answer, String(result + 5), String(result - 3), String(result + 10)],
          baseSeed,
        ),
      };
    },
    () => {
      const p = ((baseSeed * 5) % 50) + 100;
      const r = ((baseSeed * 3) % 5) + 5;
      const t = ((baseSeed * 7) % 3) + 2;
      const result = Math.round((p * r * t) / 100);
      const answer = String(result);
      return {
        prompt: `Sebuah tabungan sebesar Rp ${p}.000 dengan bunga ${r}% per tahun. Berapa bunga setelah ${t} tahun? (dalam ribuan)`,
        answer,
        explanation: `Bunga = (P × R × T) / 100 = (${p} × ${r} × ${t}) / 100 = ${result}`,
        options: shuffleDeterministic(
          [answer, String(result + 10), String(result - 5), String(result + 20)],
          baseSeed,
        ),
      };
    },
    () => {
      const a = ((baseSeed * 13) % 8) + 2;
      const b = ((baseSeed * 17) % 5) + 1;
      const result = Math.pow(a, b) + a * b;
      const answer = String(result);
      return {
        prompt: `Jika a = ${a} dan b = ${b}, berapakah nilai a^b + ab?`,
        answer,
        explanation: `a^b = ${Math.pow(a, b)}, ab = ${a * b}. Total = ${Math.pow(a, b)} + ${a * b} = ${result}`,
        options: shuffleDeterministic(
          [answer, String(result + a), String(result - b), String(result + a + b)],
          baseSeed,
        ),
      };
    },
    () => {
      const total = ((baseSeed * 19) % 50) + 150;
      const percent = ((baseSeed * 23) % 20) + 10;
      const result = Math.round(total * percent / 100);
      const answer = String(result);
      return {
        prompt: `Dari ${total} siswa, ${percent}% mengikuti les matematika. Berapa banyak siswa yang les?`,
        answer,
        explanation: `${percent}% dari ${total} = ${total} × ${percent}/100 = ${result}`,
        options: shuffleDeterministic(
          [answer, String(result + 5), String(result - 5), String(Math.round(total * (percent + 5) / 100))],
          baseSeed,
        ),
      };
    },
    () => {
      const speed = ((baseSeed * 29) % 40) + 40;
      const time = ((baseSeed * 31) % 3) + 2;
      const distance = speed * time;
      const answer = String(distance);
      return {
        prompt: `Sebuah mobil bergerak dengan kecepatan ${speed} km/jam selama ${time} jam. Berapa jarak yang ditempuh?`,
        answer,
        explanation: `Jarak = Kecepatan × Waktu = ${speed} × ${time} = ${distance} km`,
        options: shuffleDeterministic(
          [answer, String(distance + speed), String(distance - time), String(distance + 20)],
          baseSeed,
        ),
      };
    },
    () => {
      const a = ((baseSeed * 37) % 10) + 1;
      const b = ((baseSeed * 41) % 10) + 5;
      const discriminant = b * b - 4 * a * 2;
      const result = discriminant > 0 ? 2 : (discriminant === 0 ? 1 : 0);
      const answer = String(result);
      const options = result === 2 ? ['2', '1', '0', 'Tidak terdefinisi'] : 
                     result === 1 ? ['1', '2', '0', 'Tak terhingga'] :
                     ['0', '1', '2', 'Tak terhingga'];
      return {
        prompt: `Berapa banyak akar real dari persamaan ${a}x² + ${b}x + 2 = 0?`,
        answer,
        explanation: `Diskriminan D = b² - 4ac = ${b}² - 4(${a})(2) = ${discriminant}. D ${discriminant > 0 ? '> 0' : discriminant === 0 ? '= 0' : '< 0'} sehingga ada ${result} akar real.`,
        options: shuffleDeterministic(options, baseSeed),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};

// ===== SOAL MATEMATIKA LPDP =====
const createLpdpMathQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;
  
  const variants = [
    () => {
      const present = ((baseSeed * 3) % 200) + 300;
      const absent = ((baseSeed * 5) % 50) + 20;
      const total = present + absent;
      const result = Math.round((absent / total) * 100 * 10) / 10;
      const answer = String(result) + '%';
      return {
        prompt: `Dari ${total} peserta tes, ${present} hadir. Berapa persen tingkat ketidakhadiran?`,
        answer,
        explanation: `Tidak hadir = ${absent}. Persentase = (${absent}/${total}) × 100 = ${result}%`,
        options: shuffleDeterministic(
          [answer, String(Math.round((present/total)*100)) + '%', String(result + 2) + '%', String(result - 2) + '%'],
          baseSeed,
        ),
      };
    },
    () => {
      const salary = ((baseSeed * 7) % 3000) + 5000;
      const increase = ((baseSeed * 11) % 15) + 5;
      const newSalary = Math.round(salary * (1 + increase/100));
      const answer = 'Rp ' + newSalary.toLocaleString('id-ID');
      return {
        prompt: `Gaji awal Rp ${salary.toLocaleString('id-ID')}. Naik ${increase}%. Berapa gaji baru?`,
        answer,
        explanation: `Gaji baru = ${salary} × (1 + ${increase}/100) = ${salary} × ${1 + increase/100} = ${newSalary}`,
        options: shuffleDeterministic(
          [answer, 'Rp ' + (newSalary + 500).toLocaleString('id-ID'), 'Rp ' + (newSalary - 500).toLocaleString('id-ID'), 'Rp ' + Math.round(salary * 1.1).toLocaleString('id-ID')],
          baseSeed,
        ),
      };
    },
    () => {
      const ratioA = ((baseSeed * 13) % 4) + 2;
      const ratioB = ((baseSeed * 17) % 3) + 2;
      const totalParts = ratioA + ratioB;
      const amount = ((baseSeed * 19) % 50) + 100;
      const totalAmount = amount * totalParts;
      const shareA = amount * ratioA;
      const answer = 'Rp ' + shareA.toLocaleString('id-ID');
      return {
        prompt: `Uang Rp ${totalAmount.toLocaleString('id-ID')} dibagi dengan perbandingan ${ratioA}:${ratioB}. Berapa bagian yang lebih besar?`,
        answer,
        explanation: `Total bagian = ${ratioA} + ${ratioB} = ${totalParts}. Bagian besar = ${totalAmount} × ${ratioA}/${totalParts} = ${shareA}`,
        options: shuffleDeterministic(
          [answer, 'Rp ' + (amount * ratioB).toLocaleString('id-ID'), 'Rp ' + (shareA + 1000).toLocaleString('id-ID'), 'Rp ' + (totalAmount / 2).toLocaleString('id-ID')],
          baseSeed,
        ),
      };
    },
    () => {
      const price = ((baseSeed * 23) % 20000) + 50000;
      const discount = ((baseSeed * 29) % 20) + 10;
      const finalPrice = Math.round(price * (1 - discount/100));
      const answer = 'Rp ' + finalPrice.toLocaleString('id-ID');
      return {
        prompt: `Harga barang Rp ${price.toLocaleString('id-ID')} didiskon ${discount}%. Berapa harga setelah diskon?`,
        answer,
        explanation: `Diskon = ${price} × ${discount}% = ${Math.round(price * discount/100)}. Harga akhir = ${price} - ${Math.round(price * discount/100)} = ${finalPrice}`,
        options: shuffleDeterministic(
          [answer, 'Rp ' + (finalPrice + 5000).toLocaleString('id-ID'), 'Rp ' + (price - discount * 1000).toLocaleString('id-ID'), 'Rp ' + Math.round(price * 0.8).toLocaleString('id-ID')],
          baseSeed,
        ),
      };
    },
    () => {
      const principal = ((baseSeed * 31) % 5000) + 10000;
      const rate = ((baseSeed * 37) % 5) + 5;
      const years = ((baseSeed * 41) % 3) + 2;
      const interest = Math.round(principal * rate * years / 100);
      const answer = 'Rp ' + interest.toLocaleString('id-ID');
      return {
        prompt: `Tabungan Rp ${principal.toLocaleString('id-ID')} dengan bunga tunggal ${rate}% per tahun. Berapa bunga setelah ${years} tahun?`,
        answer,
        explanation: `Bunga = P × R × T / 100 = ${principal} × ${rate} × ${years} / 100 = ${interest}`,
        options: shuffleDeterministic(
          [answer, 'Rp ' + (interest + 1000).toLocaleString('id-ID'), 'Rp ' + Math.round(principal * Math.pow(1 + rate/100, years) - principal).toLocaleString('id-ID'), 'Rp ' + (interest * 2).toLocaleString('id-ID')],
          baseSeed,
        ),
      };
    },
    () => {
      const workers = ((baseSeed * 43) % 10) + 5;
      const days = ((baseSeed * 47) % 15) + 10;
      const newWorkers = workers + ((baseSeed * 53) % 5) + 2;
      const newDays = Math.round((workers * days) / newWorkers);
      const answer = String(newDays) + ' hari';
      return {
        prompt: `${workers} pekerja menyelesaikan proyek dalam ${days} hari. Berapa hari jika menggunakan ${newWorkers} pekerja?`,
        answer,
        explanation: `Ini perbandingan berbalik nilai. ${workers} × ${days} = ${newWorkers} × x. x = ${workers * days}/${newWorkers} = ${newDays} hari`,
        options: shuffleDeterministic(
          [answer, String(newDays + 3) + ' hari', String(newDays - 2) + ' hari', String(Math.round(days * newWorkers / workers)) + ' hari'],
          baseSeed,
        ),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};

// ===== SOAL TES SUBSTANSI LPDP =====
const createLpdpSubstanceQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;

  const variants = [
    () => ({
      prompt: 'Dalam menyusun proposal studi LPDP, bagian yang paling menunjukkan relevansi dengan kebutuhan Indonesia adalah?',
      answer: 'Rencana kontribusi pascastudi yang spesifik, terukur, dan sesuai isu prioritas nasional',
      explanation: 'Substansi LPDP menilai dampak nyata untuk Indonesia. Kontribusi yang spesifik dan terukur menunjukkan kesiapan implementasi setelah studi.',
      options: shuffleDeterministic([
        'Rencana kontribusi pascastudi yang spesifik, terukur, dan sesuai isu prioritas nasional',
        'Daftar universitas luar negeri dengan ranking tertinggi saja',
        'Pengalaman organisasi tanpa kaitan dengan tujuan studi',
        'Ringkasan CV tanpa rencana implementasi',
      ], baseSeed),
    }),
    () => ({
      prompt: 'Jika terjadi konflik kepentingan dalam tim proyek sosial, langkah pertama yang paling tepat adalah?',
      answer: 'Memetakan akar masalah dan menyepakati aturan keputusan yang transparan',
      explanation: 'Konflik perlu ditangani berbasis data dan proses yang adil, bukan asumsi personal. Transparansi memperkuat kepercayaan tim.',
      options: shuffleDeterministic([
        'Memetakan akar masalah dan menyepakati aturan keputusan yang transparan',
        'Menunda diskusi hingga konflik mereda dengan sendirinya',
        'Mengikuti pendapat mayoritas tanpa klarifikasi masalah',
        'Memindahkan anggota yang berbeda pendapat ke tim lain',
      ], baseSeed),
    }),
    () => ({
      prompt: 'Indikator keberhasilan program pemberdayaan masyarakat yang paling kuat adalah?',
      answer: 'Peningkatan kapasitas warga yang berkelanjutan setelah program selesai',
      explanation: 'Program substansial dinilai dari keberlanjutan dampak, bukan hanya output jangka pendek saat intervensi berlangsung.',
      options: shuffleDeterministic([
        'Peningkatan kapasitas warga yang berkelanjutan setelah program selesai',
        'Jumlah seminar yang diselenggarakan selama proyek',
        'Banyaknya unggahan media sosial tentang program',
        'Total anggaran yang berhasil dibelanjakan',
      ], baseSeed),
    }),
    () => ({
      prompt: 'Pada wawancara LPDP, ketika ditanya tentang kegagalan terbesar, jawaban terbaik seharusnya?',
      answer: 'Menjelaskan konteks, refleksi pembelajaran, dan perbaikan konkret yang sudah dilakukan',
      explanation: 'Penilai mencari growth mindset: kemampuan refleksi, akuntabilitas, dan pembuktian perbaikan.',
      options: shuffleDeterministic([
        'Menjelaskan konteks, refleksi pembelajaran, dan perbaikan konkret yang sudah dilakukan',
        'Menyalahkan kondisi eksternal agar terlihat tidak bersalah',
        'Menghindari cerita gagal dan hanya menonjolkan prestasi',
        'Memberikan jawaban umum tanpa contoh nyata',
      ], baseSeed),
    }),
    () => ({
      prompt: 'Kebijakan publik yang evidence-based ditandai oleh?',
      answer: 'Keputusan berbasis data valid, evaluasi berkala, dan mekanisme umpan balik',
      explanation: 'Evidence-based policy menuntut siklus data: pengumpulan, analisis, implementasi, evaluasi, lalu perbaikan.',
      options: shuffleDeterministic([
        'Keputusan berbasis data valid, evaluasi berkala, dan mekanisme umpan balik',
        'Keputusan cepat berdasarkan intuisi pimpinan semata',
        'Program yang populer walau tanpa baseline data',
        'Kebijakan yang tidak membuka ruang evaluasi publik',
      ], baseSeed),
    }),
    () => ({
      prompt: 'Saat diminta menjelaskan kontribusi untuk daerah 3T, pendekatan paling meyakinkan adalah?',
      answer: 'Memaparkan intervensi realistis berbasis kebutuhan lokal serta kolaborasi multipihak',
      explanation: 'Kontribusi untuk daerah 3T harus kontekstual, realistis, dan melibatkan aktor lokal agar solusi berkelanjutan.',
      options: shuffleDeterministic([
        'Memaparkan intervensi realistis berbasis kebutuhan lokal serta kolaborasi multipihak',
        'Mereplikasi program kota besar tanpa adaptasi konteks',
        'Berfokus pada target jangka pendek untuk laporan cepat',
        'Menunggu dukungan penuh pusat sebelum menyusun rencana',
      ], baseSeed),
    }),
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};

// ===== SOAL TES POTENSI AKADEMIK (TPA) =====
const createTpaQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;
  
  const analogies = [
    { pair1: ['Dokter', 'Rumah Sakit'], pair2: ['Guru', 'Sekolah'], relation: 'tempat kerja' },
    { pair1: ['Pesawat', 'Pilot'], pair2: ['Kereta', 'Masinis'], relation: 'kendaraan dan pengemudi' },
    { pair1: ['Kucing', 'Meong'], pair2: ['Anjing', 'Guk'], relation: 'hewan dan suara' },
    { pair1: ['Padi', 'Nasi'], pair2: ['Gandum', 'Roti'], relation: 'bahan baku dan hasil' },
    { pair1: ['Api', 'Panas'], pair2: ['Es', 'Dingin'], relation: 'sifat' },
    { pair1: ['Mata', 'Melihat'], pair2: ['Telinga', 'Mendengar'], relation: 'indra dan fungsi' },
    { pair1: ['Buku', 'Halaman'], pair2: ['Rumah', 'Ruangan'], relation: 'keseluruhan dan bagian' },
    { pair1: ['Marah', 'Merah'], pair2: ['Iri', 'Hijau'], relation: 'emosi dan warna' },
  ];
  
  const synonyms = [
    { word: 'Efisien', correct: 'Efektif', wrong: ['Lambat', 'Boros', 'Ribet'] },
    { word: 'Kontradiksi', correct: 'Pertentangan', wrong: ['Kesepakatan', 'Harmoni', 'Persamaan'] },
    { word: 'Relevan', correct: 'Sesuai', wrong: ['Tidak penting', 'Usang', 'Asing'] },
    { word: 'Elaborasi', correct: 'Penjelasan rinci', wrong: ['Ringkasan', 'Penolakan', 'Penyederhanaan'] },
    { word: 'Premis', correct: 'Dasar pikiran', wrong: ['Kesimpulan', 'Hasil', 'Akibat'] },
    { word: 'Valid', correct: 'Sahih', wrong: ['Salah', 'Palsu', 'Ditolak'] },
  ];
  
  const antonyms = [
    { word: 'Optimis', correct: 'Pesimis', wrong: ['Senang', 'Semangat', 'Bahagia'] },
    { word: 'Fleksibel', correct: 'Kaku', wrong: ['Lentur', 'Elastis', 'Adaptif'] },
    { word: 'Konkret', correct: 'Abstrak', wrong: ['Nyata', 'Jelas', 'Terlihat'] },
    { word: 'Progresif', correct: 'Regresif', wrong: ['Maju', 'Berkembang', 'Positif'] },
    { word: 'Platonic', correct: 'Sensual', wrong: ['Spiritual', 'Murni', 'Suci'] },
  ];

  const variants = [
    () => {
      const analogy = analogies[baseSeed % analogies.length];
      const answer = analogy.pair2[1];
      return {
        prompt: `${analogy.pair1[0]} : ${analogy.pair1[1]} = ${analogy.pair2[0]} : ?`,
        answer,
        explanation: `Hubungan: ${analogy.relation}. ${analogy.pair1[0]} ada di ${analogy.pair1[1]}, maka ${analogy.pair2[0]} ada di ${answer}.`,
        options: shuffleDeterministic([answer, analogy.pair1[0], analogy.pair2[0], 'Tidak ada hubungan'], baseSeed),
      };
    },
    () => {
      const syn = synonyms[baseSeed % synonyms.length];
      return {
        prompt: `Sinonim (persamaan kata) dari "${syn.word}" adalah...`,
        answer: syn.correct,
        explanation: `"${syn.word}" memiliki arti yang sama dengan "${syn.correct}"`,
        options: shuffleDeterministic([syn.correct, ...syn.wrong.slice(0, 3)], baseSeed),
      };
    },
    () => {
      const ant = antonyms[baseSeed % antonyms.length];
      return {
        prompt: `Antonim (lawan kata) dari "${ant.word}" adalah...`,
        answer: ant.correct,
        explanation: `"${ant.word}" adalah lawan dari "${ant.correct}"`,
        options: shuffleDeterministic([ant.correct, ...ant.wrong.slice(0, 3)], baseSeed),
      };
    },
    () => {
      const patterns = [
        { seq: '2, 4, 8, 16, ...', next: '32', rule: 'dikalikan 2' },
        { seq: '1, 1, 2, 3, 5, ...', next: '8', rule: 'Fibonacci (jumlah 2 angka sebelumnya)' },
        { seq: '3, 6, 9, 12, ...', next: '15', rule: 'ditambah 3' },
        { seq: '100, 90, 80, 70, ...', next: '60', rule: 'dikurangi 10' },
        { seq: '1, 4, 9, 16, ...', next: '25', rule: 'kuadrat (1², 2², 3², ...)' },
      ];
      const pattern = patterns[baseSeed % patterns.length];
      return {
        prompt: `Lanjutkan pola: ${pattern.seq}`,
        answer: pattern.next,
        explanation: `Pola: ${pattern.rule}`,
        options: shuffleDeterministic([pattern.next, String(parseInt(pattern.next) + 2), String(parseInt(pattern.next) - 2), String(parseInt(pattern.next) * 2)], baseSeed),
      };
    },
    () => {
      const shapes = ['Segitiga', 'Persegi', 'Lingkaran', 'Kubus'];
      const different = 'Kubus';
      return {
        prompt: `Manakah yang berbeda dari kelompoknya?`,
        answer: different,
        explanation: `${different} adalah bangun ruang 3D, sedangkan yang lain adalah bangun datar 2D.`,
        options: shuffleDeterministic(shapes, baseSeed),
      };
    },
    () => {
      const syllogisms = [
        { 
          premise1: 'Semua mahasiswa pintar', 
          premise2: 'Budi adalah mahasiswa', 
          conclusion: 'Budi pintar',
          distractors: ['Budi bukan mahasiswa', 'Semua yang pintar adalah mahasiswa', 'Tidak dapat disimpulkan']
        },
        {
          premise1: 'Semua burung bisa terbang',
          premise2: 'Penguin adalah burung',
          conclusion: 'Penguin bisa terbang',
          distractors: ['Penguin bukan burung', 'Semua yang terbang adalah burung', 'Tidak ada kesimpulan']
        },
      ];
      const syl = syllogisms[baseSeed % syllogisms.length];
      return {
        prompt: `${syl.premise1}. ${syl.premise2}. Kesimpulan:`,
        answer: syl.conclusion,
        explanation: `Dari premis yang diberikan, kesimpulan logis adalah "${syl.conclusion}"`,
        options: shuffleDeterministic([syl.conclusion, ...syl.distractors], baseSeed),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};

// ===== SOAL TES IQ =====
const createIqQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;

  const variants = [
    () => {
      const start = ((baseSeed * 3) % 8) + 2;
      const ratio = ((baseSeed * 5) % 3) + 2;
      const sequence = [start, start * ratio, start * ratio ** 2, start * ratio ** 3];
      const result = start * ratio ** 4;
      const answer = String(result);
      return {
        prompt: `Lengkapi deret: ${sequence.join(', ')}, ...`,
        answer,
        explanation: `Pola deret dikali ${ratio} setiap langkah. Angka berikutnya ${sequence[3]} × ${ratio} = ${result}.`,
        options: shuffleDeterministic([answer, String(result + ratio), String(result - start), String(result + start)], baseSeed),
      };
    },
    () => {
      const age = ((baseSeed * 7) % 12) + 8;
      const future = ((baseSeed * 11) % 6) + 4;
      const result = age + future;
      const answer = String(result) + ' tahun';
      return {
        prompt: `Usia Dita sekarang ${age} tahun. Berapa usia Dita ${future} tahun lagi?`,
        answer,
        explanation: `Usia masa depan = usia sekarang + selisih tahun = ${age} + ${future} = ${result}.`,
        options: shuffleDeterministic(
          [answer, String(result - 2) + ' tahun', String(result + 2) + ' tahun', String(age + future + 5) + ' tahun'],
          baseSeed,
        ),
      };
    },
    () => {
      const a = ((baseSeed * 13) % 20) + 10;
      const b = ((baseSeed * 17) % 10) + 5;
      const c = ((baseSeed * 19) % 6) + 2;
      const result = (a + b) - c;
      const answer = String(result);
      return {
        prompt: `Jika nilai A = ${a}, B = ${b}, dan C = ${c}, maka nilai (A + B) - C adalah...`,
        answer,
        explanation: `(${a} + ${b}) - ${c} = ${a + b} - ${c} = ${result}.`,
        options: shuffleDeterministic([answer, String(result + c), String(result - b), String(a - b + c)], baseSeed),
      };
    },
    () => {
      const items = ['apel', 'jeruk', 'anggur', 'pisang'];
      const odd = 'pisang';
      return {
        prompt: 'Manakah yang paling berbeda berdasarkan jumlah suku kata?',
        answer: odd,
        explanation: 'Kata "pisang" memiliki 2 suku kata, sedangkan opsi lainnya dipilih sebagai kelompok 3 suku kata dalam pola soal ini.',
        options: shuffleDeterministic(items, baseSeed),
      };
    },
    () => {
      const men = ((baseSeed * 23) % 5) + 4;
      const women = ((baseSeed * 29) % 5) + 3;
      const result = men + women;
      const answer = String(result);
      return {
        prompt: `Dalam sebuah tim ada ${men} pria dan ${women} wanita. Total anggota tim adalah...`,
        answer,
        explanation: `Total anggota = ${men} + ${women} = ${result}.`,
        options: shuffleDeterministic([answer, String(result + 2), String(result - 1), String(men * women)], baseSeed),
      };
    },
    () => {
      const side = ((baseSeed * 31) % 8) + 4;
      const result = side * side;
      const answer = String(result);
      return {
        prompt: `Sebuah persegi memiliki panjang sisi ${side} cm. Berapa luasnya?`,
        answer,
        explanation: `Luas persegi = sisi × sisi = ${side} × ${side} = ${result} cm².`,
        options: shuffleDeterministic([answer, String(side * 4), String(result + side), String(result - side)], baseSeed),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};

// ===== SOAL ONKOLOGI RADIASI =====
const createOncologyQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;
  
  const questions = [
    {
      prompt: 'Radiasi ionisasi yang paling sering digunakan dalam radioterapi kanker adalah...',
      answer: 'Sinar-X dan sinar gamma',
      explanation: 'Radioterapi menggunakan sinar-X berenergi tinggi atau sinar gamma dari Co-60 untuk membunuh sel kanker.',
      options: ['Sinar-X dan sinar gamma', 'Sinar ultraviolet', 'Radiasi inframerah', 'Gelombang radio'],
    },
    {
      prompt: 'Unit SI untuk dosis radiasi yang diserap jaringan adalah...',
      answer: 'Gray (Gy)',
      explanation: 'Gray (Gy) adalah unit SI untuk dosis serap, didefinisikan sebagai 1 joule energi per kilogram jaringan.',
      options: ['Gray (Gy)', 'Sievert (Sv)', 'Becquerel (Bq)', 'Curie (Ci)'],
    },
    {
      prompt: 'Efek samping akut radioterapi pada kulit yang paling umum adalah...',
      answer: 'Dermatitis radiasi',
      explanation: 'Dermatitis radiasi adalah peradangan kulit akibat radiasi, mirip dengan sunburn, yang terjadi selama atau segera setelah terapi.',
      options: ['Dermatitis radiasi', 'Kanker kulit', 'Vitiligo', 'Psoriasis'],
    },
    {
      prompt: 'Fraksionasi dalam radioterapi bertujuan untuk...',
      answer: 'Memaksimalkan kerusakan tumor sambil melindungi jaringan normal',
      explanation: 'Fraksionasi (pemberian dosis dalam beberapa sesi) memanfaatkan perbedaan kemampuan regenerasi sel normal vs sel kanker.',
      options: ['Memaksimalkan kerusakan tumor sambil melindungi jaringan normal', 'Mengurangi biaya pengobatan', 'Mempercepat waktu pengobatan', 'Menghindari efek samping sama sekali'],
    },
    {
      prompt: 'Organ yang paling sensitif terhadap radiasi adalah...',
      answer: 'Sumsum tulang dan usus',
      explanation: 'Jaringan yang memiliki tingkat proliferasi tinggi seperti sumsum tulang dan epitel usus sangat sensitif terhadap radiasi.',
      options: ['Sumsum tulang dan usus', 'Tulang', 'Otot', 'Tendon'],
    },
    {
      prompt: 'Brachytherapy adalah teknik radioterapi yang...',
      answer: 'Menempatkan sumber radiasi di dalam atau dekat tumor',
      explanation: 'Brachytherapy menggunakan sumber radioaktif yang ditempatkan secara internal untuk memberikan dosis tinggi ke target spesifik.',
      options: ['Menempatkan sumber radiasi di dalam atau dekat tumor', 'Menggunakan radiasi dari luar tubuh', 'Menggunakan partikel alpha', 'Menggunakan gelombang suara'],
    },
    {
      prompt: 'Dosis lethal 50/30 (LD50/30) mengacu pada...',
      answer: 'Dosis radiasi yang mematikan 50% populasi dalam 30 hari',
      explanation: 'LD50/30 adalah dosis total radiasi whole-body yang diperkirakan akan menyebabkan kematian pada 50% individu dalam 30 hari.',
      options: ['Dosis radiasi yang mematikan 50% populasi dalam 30 hari', 'Dosis harian maksimum yang aman', 'Dosis untuk menyembuhkan 50% kanker', 'Dosis untuk terapi selama 30 hari'],
    },
    {
      prompt: 'Linear Energy Transfer (LET) yang tinggi lebih efektif membunuh sel kanker karena...',
      answer: 'Kerusakan DNA yang lebih terkonsentrasi dan sulit diperbaiki',
      explanation: 'Radiasi LET tinggi (seperti partikel alpha) menyebabkan kerusakan DNA yang padat dan kompleks, sulit diperbaiki oleh mekanisme repair sel.',
      options: ['Kerusakan DNA yang lebih terkonsentrasi dan sulit diperbaiki', 'Dapat menembus lebih dalam', 'Tidak memiliki efek samping', 'Lebih murah dalam pengobatan'],
    },
    {
      prompt: 'Efek bystander dalam radioterapi merujuk pada...',
      answer: 'Sel yang tidak teriradiasi mengalami kerusakan akibat sinyal dari sel yang teriradiasi',
      explanation: 'Efek bystander adalah fenomena di mana sel yang tidak langsung terkena radiasi mengalami efek biologis akibat sinyal dari sel tetangga yang teriradiasi.',
      options: ['Sel yang tidak teriradiasi mengalami kerusakan akibat sinyal dari sel yang teriradiasi', 'Dokter yang terpapar radiasi', 'Pasien di ruang tunggu', 'Efek pada generasi mendatang'],
    },
    {
      prompt: 'Tumor hypoxic (kekurangan oksigen) lebih resisten terhadap radiasi karena...',
      answer: 'Oksigen diperlukan untuk memperkuat efek radiasi pada DNA',
      explanation: 'Efek oksigen (oxygen effect): oksigen diperlukan untuk memperkuat dan mempertahankan kerusakan DNA yang disebabkan oleh radikal bebas dari radiasi.',
      options: ['Oksigen diperlukan untuk memperkuat efek radiasi pada DNA', 'Tumor hipoksik lebih besar', 'Tumor hipoksik bergerak lebih cepat', 'Oksigen melindungi sel kanker'],
    },
    {
      prompt: 'CT Simulator dalam radioterapi digunakan untuk...',
      answer: 'Perencanaan dosis dan visualisasi target 3D',
      explanation: 'CT Simulator memungkinkan visualisasi 3D tumor dan organ at-risk, serta perencanaan dosis yang presisi sebelum terapi.',
      options: ['Perencanaan dosis dan visualisasi target 3D', 'Mendiagnosis kanker saja', 'Mengobati kanker', 'Menghasilkan radiasi'],
    },
    {
      prompt: 'Radiosensitizer adalah zat yang...',
      answer: 'Meningkatkan sensitivitas sel kanker terhadap radiasi',
      explanation: 'Radiosensitizer adalah agen kimia yang membuat sel kanker lebih sensitif terhadap efek radiasi, meningkatkan efektivitas terapi.',
      options: ['Meningkatkan sensitivitas sel kanker terhadap radiasi', 'Melindungi jaringan normal', 'Mengurangi efek radiasi', 'Menyebabkan radiasi'],
    },
  ];

  const q = questions[index % questions.length];
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: q.prompt,
    answer: q.answer,
    explanation: q.explanation,
    options: shuffleDeterministic(q.options, baseSeed),
  };
};

// ===== SOAL TOEFL =====
const createToeflQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;
  
  const grammarQuestions = [
    {
      prompt: 'She ___ to the office every day.',
      answer: 'goes',
      explanation: 'Subject "She" memerlukan verb bentuk ketiga tunggal (goes) untuk present simple tense.',
      options: ['goes', 'going', 'gone', 'go'],
    },
    {
      prompt: 'By the time we arrived, the movie ___.',
      answer: 'had already started',
      explanation: 'Past perfect tense (had + V3) digunakan untuk aksi yang selesai sebelum aksi lain di masa lampau.',
      options: ['had already started', 'has already started', 'already started', 'was already starting'],
    },
    {
      prompt: 'If I ___ rich, I would travel the world.',
      answer: 'were',
      explanation: 'Conditional type 2 (unreal present) menggunakan "were" untuk semua subject setelah "if".',
      options: ['were', 'am', 'was', 'be'],
    },
    {
      prompt: 'The book ___ on the table belongs to my sister.',
      answer: 'lying',
      explanation: '"Lying" (present participle) digunakan sebagai adjective untuk menggambarkan posisi buku.',
      options: ['lying', 'laying', 'laid', 'lied'],
    },
    {
      prompt: 'Neither the teacher nor the students ___ the answer.',
      answer: 'know',
      explanation: 'Dengan "neither...nor", verb disesuaikan dengan subject terdekat (students = plural).',
      options: ['know', 'knows', 'known', 'knowing'],
    },
    {
      prompt: 'I look forward ___ from you soon.',
      answer: 'to hearing',
      explanation: '"Look forward to" diikuti oleh gerund (V-ing), bukan infinitive.',
      options: ['to hearing', 'to hear', 'hearing', 'for hearing'],
    },
    {
      prompt: 'The meeting will be held ___ Monday morning.',
      answer: 'on',
      explanation: 'Preposisi "on" digunakan untuk hari spesifik dan bagian hari tertentu.',
      options: ['on', 'in', 'at', 'by'],
    },
    {
      prompt: '___ of the students passed the exam.',
      answer: 'All',
      explanation: '"All" digunakan dengan plural noun dan plural verb untuk menyatakan seluruh kelompok.',
      options: ['All', 'Each', 'Every', 'Much'],
    },
    {
      prompt: 'This is the ___ book I have ever read.',
      answer: 'most interesting',
      explanation: 'Superlative degree untuk adjective panjang menggunakan "most" + adjective.',
      options: ['most interesting', 'more interesting', 'interestinger', 'interestingly'],
    },
    {
      prompt: 'The project ___ by next month.',
      answer: 'will have been completed',
      explanation: 'Future perfect passive tense digunakan untuk aksi pasif yang akan selesai pada waktu tertentu di masa depan.',
      options: ['will have been completed', 'will be completed', 'is completed', 'has been completed'],
    },
    {
      prompt: 'She insisted that he ___ the job.',
      answer: 'take',
      explanation: 'Setelah "insist", "suggest", "recommend", verb menggunakan base form (subjunctive mood).',
      options: ['take', 'takes', 'took', 'taken'],
    },
    {
      prompt: '___ the rain, we went for a walk.',
      answer: 'Despite',
      explanation: '"Despite" diikuti oleh noun/gerund untuk menunjukkan kontras, tidak diikuti clause lengkap.',
      options: ['Despite', 'Although', 'Because', 'Since'],
    },
  ];

  const vocabQuestions = [
    {
      word: 'Aberration',
      correct: 'Deviation from the norm',
      wrong: ['Agreement', 'Conformity', 'Regularity'],
    },
    {
      word: 'Benevolent',
      correct: 'Kind and generous',
      wrong: ['Cruel', 'Selfish', 'Malicious'],
    },
    {
      word: 'Candid',
      correct: 'Honest and straightforward',
      wrong: ['Deceitful', 'Evasive', 'Dishonest'],
    },
    {
      word: 'Diligent',
      correct: 'Hardworking and careful',
      wrong: ['Lazy', 'Careless', 'Negligent'],
    },
    {
      word: 'Eloquent',
      correct: 'Fluent and persuasive in speech',
      wrong: ['Inarticulate', 'Tongue-tied', 'Mute'],
    },
    {
      word: 'Fragile',
      correct: 'Easily broken or damaged',
      wrong: ['Strong', 'Durable', 'Sturdy'],
    },
    {
      word: 'Grave',
      correct: 'Serious and solemn',
      wrong: ['Trivial', 'Cheerful', 'Light'],
    },
    {
      word: 'Hostile',
      correct: 'Unfriendly and antagonistic',
      wrong: ['Friendly', 'Hospitable', 'Amicable'],
    },
    {
      word: 'Inevitable',
      correct: 'Unavoidable and certain to happen',
      wrong: ['Preventable', 'Uncertain', 'Avoidable'],
    },
    {
      word: 'Jubilant',
      correct: 'Extremely joyful and triumphant',
      wrong: ['Depressed', 'Dejected', 'Sorrowful'],
    },
    {
      word: 'Keen',
      correct: 'Eager and enthusiastic',
      wrong: ['Indifferent', 'Apathetic', 'Reluctant'],
    },
    {
      word: 'Lucid',
      correct: 'Clear and easily understood',
      wrong: ['Confusing', 'Unclear', 'Obscure'],
    },
  ];

  const variants = [
    () => {
      const grammar = grammarQuestions[baseSeed % grammarQuestions.length];
      return {
        prompt: grammar.prompt,
        answer: grammar.answer,
        explanation: grammar.explanation,
        options: shuffleDeterministic(grammar.options, baseSeed),
      };
    },
    () => {
      const vocab = vocabQuestions[baseSeed % vocabQuestions.length];
      return {
        prompt: `The word "${vocab.word}" is closest in meaning to...`,
        answer: vocab.correct,
        explanation: `"${vocab.word}" berarti "${vocab.correct}"`,
        options: shuffleDeterministic([vocab.correct, ...vocab.wrong], baseSeed),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};



// ===== SOAL BAHASA SPANYOL =====
const createSpanishQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;

  const grammarQuestions = [
    {
      prompt: 'Yo ___ estudiante de medicina.',
      answer: 'soy',
      explanation: 'Kata kerja "ser" untuk subjek "yo" adalah "soy".',
      options: ['soy', 'eres', 'es', 'somos'],
    },
    {
      prompt: 'Nosotros ___ en la biblioteca todos los días.',
      answer: 'estudiamos',
      explanation: 'Konjugasi regular -ar untuk "nosotros" adalah akhiran -amos.',
      options: ['estudiamos', 'estudia', 'estudian', 'estudio'],
    },
    {
      prompt: '¿Cómo se dice "good morning" en español?',
      answer: 'Buenos días',
      explanation: 'Sapaan pagi hari dalam bahasa Spanyol adalah "Buenos días".',
      options: ['Buenos días', 'Buenas noches', 'Hasta luego', 'Por favor'],
    },
    {
      prompt: 'Ella ___ en el hospital central.',
      answer: 'trabaja',
      explanation: 'Subjek "ella" memakai konjugasi orang ketiga tunggal: trabaja.',
      options: ['trabaja', 'trabajo', 'trabajamos', 'trabajas'],
    },
    {
      prompt: 'Mereka (ellos) tinggal di Madrid = Ellos ___ en Madrid.',
      answer: 'viven',
      explanation: 'Untuk "ellos", kata kerja vivir menjadi "viven".',
      options: ['viven', 'vive', 'vivimos', 'vivo'],
    },
    {
      prompt: '¿Cuál es la traducción de "thank you"?',
      answer: 'Gracias',
      explanation: '"Thank you" dalam bahasa Spanyol adalah "Gracias".',
      options: ['Gracias', 'Perdón', 'De nada', 'Hola'],
    },
  ];

  const vocabQuestions = [
    { word: 'Libro', correct: 'Book', wrong: ['Pen', 'Chair', 'Window'] },
    { word: 'Comida', correct: 'Food', wrong: ['Drink', 'School', 'Street'] },
    { word: 'Ciudad', correct: 'City', wrong: ['Village', 'Mountain', 'River'] },
    { word: 'Hospital', correct: 'Hospital', wrong: ['Hotel', 'Office', 'Airport'] },
    { word: 'Escuela', correct: 'School', wrong: ['Market', 'Bank', 'Station'] },
    { word: 'Familia', correct: 'Family', wrong: ['Friend', 'Neighbor', 'Teacher'] },
  ];

  const variants = [
    () => {
      const grammar = grammarQuestions[baseSeed % grammarQuestions.length];
      return {
        prompt: grammar.prompt,
        answer: grammar.answer,
        explanation: grammar.explanation,
        options: shuffleDeterministic(grammar.options, baseSeed),
      };
    },
    () => {
      const vocab = vocabQuestions[baseSeed % vocabQuestions.length];
      return {
        prompt: `The Spanish word "${vocab.word}" means...`,
        answer: vocab.correct,
        explanation: `Arti kata "${vocab.word}" adalah "${vocab.correct}".`,
        options: shuffleDeterministic([vocab.correct, ...vocab.wrong], baseSeed),
      };
    },
  ];

  const question = variants[index % variants.length]();
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    ...question,
  };
};


const createUkmppdQuestion = (moduleName, index) => {
  const n = index + 1;
  const baseSeed = hashString(moduleName) + n * 997;

  const staseBlueprints = [
    {
      stase: 'Penyakit Dalam',
      prompt: 'Laki-laki 58 tahun DM tipe 2 datang dengan nyeri dada 2 jam, EKG elevasi ST II, III, aVF. Terapi awal paling tepat di IGD adalah?',
      answer: 'Aspirin kunyah + P2Y12 inhibitor + rujuk reperfusi segera',
      options: [
        'Aspirin kunyah + P2Y12 inhibitor + rujuk reperfusi segera',
        'Nitrat sublingual saja lalu observasi 24 jam',
        'Heparin profilaksis tanpa antiplatelet',
        'Tunda terapi hingga hasil troponin serial 6 jam',
      ],
      explanation: 'Gambaran STEMI inferior membutuhkan terapi anti-platelet ganda dan strategi reperfusi sesegera mungkin sesuai jejaring layanan jantung akut.',
    },
    {
      stase: 'Bedah',
      prompt: 'Pasien trauma abdomen dengan hipotensi persisten, FAST positif cairan bebas intraperitoneal. Langkah berikut yang paling tepat adalah?',
      answer: 'Resusitasi damage control dan laparotomi emergensi',
      options: [
        'Resusitasi damage control dan laparotomi emergensi',
        'CT-scan abdomen kontras sebelum tindakan',
        'Observasi ketat sambil menunggu Hb ulang',
        'Analgesik opioid dan rawat jalan',
      ],
      explanation: 'Trauma abdomen tidak stabil dengan FAST positif adalah indikasi eksplorasi bedah segera bersamaan dengan protokol resusitasi.',
    },
    {
      stase: 'Anak',
      prompt: 'Anak 2 tahun diare akut dengan mata cekung, turgor kembali lambat, masih bisa minum. Klasifikasi dan tata laksana awal yang benar?',
      answer: 'Dehidrasi ringan-sedang, rehidrasi oralit rencana B',
      options: [
        'Dehidrasi ringan-sedang, rehidrasi oralit rencana B',
        'Syok hipovolemik, bolus 20 ml/kg berulang segera',
        'Tanpa dehidrasi, cukup zinc tanpa cairan',
        'Dehidrasi berat, cairan rumatan intravena saja',
      ],
      explanation: 'Tanda klinis sesuai dehidrasi ringan-sedang sehingga rencana B WHO/MTBS dengan oralit terukur menjadi pilihan awal.',
    },
    {
      stase: 'Obstetri',
      prompt: 'Ibu hamil 34 minggu dengan tekanan darah 170/110 mmHg, nyeri kepala, proteinuria +2. Terapi awal yang diprioritaskan?',
      answer: 'Stabilisasi preeklamsia berat dengan MgSO4 dan antihipertensi',
      options: [
        'Stabilisasi preeklamsia berat dengan MgSO4 dan antihipertensi',
        'Observasi tanpa obat hingga usia kehamilan aterm',
        'Berikan tokolitik untuk menunda persalinan 2 minggu',
        'Diuretik dosis tinggi sebagai terapi tunggal',
      ],
      explanation: 'Preeklamsia berat memerlukan pencegahan kejang dengan magnesium sulfat dan kontrol tekanan darah sebelum terminasi kehamilan sesuai indikasi.',
    },
    {
      stase: 'Ginekologi',
      prompt: 'Perempuan 28 tahun nyeri perut bawah, demam, nyeri goyang serviks, keputihan purulen. Diagnosis kerja paling mungkin?',
      answer: 'Penyakit radang panggul (PID)',
      options: [
        'Penyakit radang panggul (PID)',
        'Kista ovarium fungsional tanpa komplikasi',
        'Dismenore primer',
        'Endometriosis stadium awal tanpa inflamasi',
      ],
      explanation: 'Trias nyeri pelvis, demam, dan nyeri goyang serviks sangat mengarah ke PID dan perlu antibiotik spektrum luas serta evaluasi IMS.',
    },
    {
      stase: 'Neurologi',
      prompt: 'Pasien 64 tahun datang 90 menit sejak onset hemiparesis kanan dan afasia, CT-scan tanpa perdarahan. Tatalaksana definitif paling sesuai?',
      answer: 'Evaluasi kelayakan trombolisis intravena segera',
      options: [
        'Evaluasi kelayakan trombolisis intravena segera',
        'Berikan aspirin dosis loading lalu pulang',
        'Tunda terapi hingga 24 jam untuk observasi',
        'Berikan manitol rutin pada semua stroke iskemik',
      ],
      explanation: 'Stroke iskemik onset <4,5 jam tanpa perdarahan perlu skrining kontraindikasi untuk trombolisis sesegera mungkin.',
    },
    {
      stase: 'Psikiatri',
      prompt: 'Pria 24 tahun halusinasi auditorik >6 bulan, waham kejar, fungsi sosial menurun, tanpa gangguan mood dominan. Diagnosis paling mungkin?',
      answer: 'Skizofrenia',
      options: ['Skizofrenia', 'Gangguan bipolar episode manik', 'Gangguan skizoafektif tipe depresif', 'Gangguan cemas menyeluruh'],
      explanation: 'Durasi >6 bulan dengan gejala psikotik khas dan disfungsi sosial menegakkan skizofrenia.',
    },
    {
      stase: 'Kulit dan Kelamin',
      prompt: 'Lesi vesikel berkelompok nyeri di dasar eritem pada dermatom torakal unilateral. Terapi lini pertama?',
      answer: 'Antivirus oral (asiklovir/valasiklovir) sedini mungkin',
      options: [
        'Antivirus oral (asiklovir/valasiklovir) sedini mungkin',
        'Antijamur topikal selama 2 minggu',
        'Antibiotik penisilin intramuskular dosis tunggal',
        'Kortikosteroid topikal potensi tinggi sebagai monoterapi',
      ],
      explanation: 'Gambaran klinis herpes zoster; antiviral dini mengurangi durasi gejala dan risiko neuralgia pascaherpetik.',
    },
    {
      stase: 'THT',
      prompt: 'Anak 6 tahun demam tinggi, nyeri telinga, membran timpani hiperemis menonjol. Diagnosis dan terapi awal?',
      answer: 'Otitis media akut, analgesik + amoksisilin sesuai indikasi',
      options: [
        'Otitis media akut, analgesik + amoksisilin sesuai indikasi',
        'Otitis eksterna, tetes antijamur',
        'Serumen obturans, irigasi rutin tanpa evaluasi',
        'Mastoiditis, observasi di rumah',
      ],
      explanation: 'Otitis media akut ditandai inflamasi telinga tengah; terapi nyeri dan antibiotik pada kondisi terpilih merupakan standar.',
    },
    {
      stase: 'Mata',
      prompt: 'Pasien mata merah nyeri hebat, melihat halo, mual muntah, pupil mid-dilatasi, TIO meningkat. Diagnosis paling mungkin?',
      answer: 'Glaukoma sudut tertutup akut',
      options: [
        'Glaukoma sudut tertutup akut',
        'Konjungtivitis viral',
        'Blefaritis anterior',
        'Ulkus kornea superfisial tanpa komplikasi',
      ],
      explanation: 'Gejala khas glaukoma akut adalah nyeri berat, halo, mual, dan tekanan intraokular tinggi, membutuhkan rujukan emergensi.',
    },
    {
      stase: 'Ortopedi',
      prompt: 'Cedera pergelangan kaki inversi, nyeri pada maleolus lateral dan tidak mampu menapak. Kriteria Ottawa mengarah pada?',
      answer: 'Perlu foto rontgen untuk menyingkirkan fraktur',
      options: [
        'Perlu foto rontgen untuk menyingkirkan fraktur',
        'Cukup kompres hangat tanpa imobilisasi',
        'Tidak perlu evaluasi lanjutan karena sprain ringan',
        'Langsung fisioterapi intensif hari pertama',
      ],
      explanation: 'Nyeri maleolus dan ketidakmampuan menapak memenuhi Ottawa ankle rules untuk indikasi radiografi.',
    },
    {
      stase: 'Anestesi',
      prompt: 'Pra-operasi pasien ASA III dengan riwayat PPOK. Tujuan utama evaluasi pra-anestesi adalah?',
      answer: 'Menilai risiko perioperatif dan optimasi komorbid sebelum operasi',
      options: [
        'Menilai risiko perioperatif dan optimasi komorbid sebelum operasi',
        'Menentukan jenis jahitan luka operasi',
        'Menggantikan informed consent operator',
        'Memastikan pasien puasa tanpa menilai status klinis',
      ],
      explanation: 'Pra-anestesi berfokus pada stratifikasi risiko, perencanaan teknik anestesi, dan optimasi kondisi pasien.',
    },
    {
      stase: 'Radiologi',
      prompt: 'Pasien trauma kepala GCS 11, muntah berulang. Modalitas pencitraan awal paling tepat?',
      answer: 'CT-scan kepala non-kontras segera',
      options: [
        'CT-scan kepala non-kontras segera',
        'MRI kepala dengan kontras sebagai pilihan awal',
        'Foto polos tengkorak AP-lateral saja',
        'USG transkranial rutin',
      ],
      explanation: 'Pada trauma kepala akut sedang, CT non-kontras adalah modalitas cepat untuk deteksi perdarahan intrakranial.',
    },
    {
      stase: 'Kedokteran Komunitas',
      prompt: 'Puskesmas menemukan peningkatan kasus DBD di satu kelurahan selama 3 minggu. Langkah epidemiologi pertama?',
      answer: 'Verifikasi diagnosis dan konfirmasi adanya KLB',
      options: [
        'Verifikasi diagnosis dan konfirmasi adanya KLB',
        'Langsung fogging seluruh kota tanpa investigasi',
        'Menutup puskesmas sementara',
        'Menghentikan pencatatan surveilans mingguan',
      ],
      explanation: 'Investigasi wabah dimulai dari verifikasi diagnosis dan memastikan benar terjadi peningkatan kasus bermakna (KLB).',
    },
    {
      stase: 'Forensik dan Medikolegal',
      prompt: 'Dokter IGD menerima permintaan visum korban kekerasan hidup dari kepolisian. Dokumen yang harus dibuat adalah?',
      answer: 'Visum et repertum sesuai temuan objektif medis',
      options: [
        'Visum et repertum sesuai temuan objektif medis',
        'Surat kematian biasa tanpa pemeriksaan',
        'Resume pulang pasien sebagai pengganti visum',
        'Resep analgesik sebagai dokumen legal utama',
      ],
      explanation: 'Pada kasus hukum, dokter menyusun visum et repertum berdasarkan pemeriksaan objektif dan prosedur medikolegal.',
    },
  ];

  const item = staseBlueprints[index % staseBlueprints.length];
  return {
    id: `mcq-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[Stase ${item.stase}] ${item.prompt}`,
    answer: item.answer,
    explanation: item.explanation,
    options: shuffleDeterministic(item.options, baseSeed),
  };
};

// ===== FACTORY FUNCTION =====
const createMcqQuestion = (moduleName, index) => {
  switch (moduleName) {
    case 'Matematika Simak UI':
      return createSimakMathQuestion(moduleName, index);
    case 'Matematika LPDP':
      return createLpdpMathQuestion(moduleName, index);
    case 'Tes Substansi LPDP':
      return createLpdpSubstanceQuestion(moduleName, index);
    case 'Tes Potensi Akademik':
      return createTpaQuestion(moduleName, index);
    case 'Soal Onkologi Radiasi':
      return createOncologyQuestion(moduleName, index);
    case 'Soal Toefl':
      return createToeflQuestion(moduleName, index);
    case 'UKMPPD':
      return createUkmppdQuestion(moduleName, index);
    case 'TPA Bappenas':
      return createTpaQuestion(moduleName, index);
    case 'IELTS':
      return createToeflQuestion(moduleName, index);
    case 'Bahasa Spanyol':
      return createSpanishQuestion(moduleName, index);
    case 'Tes IQ':
      return createIqQuestion(moduleName, index);
    default:
      return createSimakMathQuestion(moduleName, index);
  }
};

// ===== ESSAY QUESTIONS =====
const essayPrompts = {
  'Matematika Simak UI': [
    'Jelaskan konsep limit fungsi dan berikan contoh penerapannya dalam menyelesaikan persoalan tak tentu.',
    'Bagaimana hubungan antara turunan pertama fungsi dengan kecekungan dan titik ekstrem grafik fungsi?',
    'Jelaskan metode substitusi dan metode eliminasi dalam sistem persamaan linear. Kapan masing-masing metode lebih efektif?',
    'Apa yang dimaksud dengan barisan dan deret geometri? Berikan contoh aplikasinya dalam kehidupan nyata.',
    'Jelaskan teorema Pythagoras dan buktikan kebenarannya.',
    'Bagaimana cara menentukan persamaan garis singgung pada kurva di suatu titik?',
    'Jelaskan konsep matriks dan operasi-operasi dasar yang dapat dilakukan pada matriks.',
    'Apa perbedaan antara permutasi dan kombinasi? Berikan contoh kasus untuk masing-masing.',
    'Jelaskan konsep integral tak tentu dan aplikasinya dalam menghitung luas daerah.',
    'Bagaimana menyelesaikan pertidaksamaan kuadrat? Jelaskan langkah-langkahnya.',
  ],
  'Matematika LPDP': [
    'Jelaskan konsep rasio dan proporsi serta aplikasinya dalam pemecahan masalah keuangan.',
    'Bagaimana cara menghitung bunga tunggal dan bunga majemak? Berikan perbedaan utama keduanya.',
    'Jelaskan konsep present value dan future value dalam konteks investasi.',
    'Apa yang dimaksud dengan anuitas? Bagaimana cara menghitung cicilan anuitas?',
    'Jelaskan konsep persentase kenaikan dan penurunan dalam konteks ekonomi.',
    'Bagaimana analisis break-even point dapat membantu dalam pengambilan keputusan bisnis?',
    'Jelaskan konsep statistika deskriptif: mean, median, modus, dan standar deviasi.',
    'Apa perbedaan antara probabilitas teoritis dan probabilitas empiris?',
    'Jelaskan konsep sampling dan bagaimana menentukan ukuran sampel yang representatif.',
    'Bagaimana interpretasi data dari tabel dan grafik dalam pengambilan keputusan?',
  ],

  'Tes Substansi LPDP': [
    'Jelaskan isu pembangunan nasional yang paling Anda kuasai dan strategi intervensi yang realistis.',
    'Bagaimana menyusun rencana kontribusi pascastudi yang terukur, terjadwal, dan relevan dengan kebutuhan Indonesia?',
    'Apa pendekatan terbaik untuk membangun kolaborasi lintas sektor dalam menyelesaikan masalah publik?',
    'Bagaimana Anda memastikan program sosial yang dirancang tetap berkelanjutan setelah fase pendanaan berakhir?',
    'Jelaskan pengalaman kepemimpinan Anda saat menghadapi konflik tim dan keputusan sulit.',
    'Bagaimana cara mengintegrasikan data dan evidence dalam proses perumusan kebijakan?',
    'Apa strategi Anda untuk memberikan dampak nyata di daerah 3T secara bertahap?',
    'Bagaimana Anda mengukur keberhasilan intervensi sosial selain indikator output jangka pendek?',
    'Jelaskan nilai integritas dalam pengelolaan program publik dan contoh implementasinya.',
    'Bagaimana Anda menyeimbangkan idealisme perubahan dengan keterbatasan sumber daya di lapangan?',
  ],
  'Tes Potensi Akademik': [
    'Jelaskan struktur penalaran logis dalam argumen deduktif dan induktif. Berikan contoh masing-masing.',
    'Bagaimana cara mengidentifikasi asumsi yang mendasari suatu argumen?',
    'Jelaskan jenis-jenis fallacy (kesalahan berpikir) yang sering muncul dalam argumen.',
    'Apa yang dimaksud dengan inferensi? Bagaimana membuat inferensi yang valid dari teks?',
    'Jelaskan teknik membaca cepat (skimming dan scanning) dan kapan menggunakannya.',
    'Bagaimana cara menganalisis hubungan sebab-akibat dalam teks akademik?',
    'Jelaskan konsep analogi verbal dan bagaimana mengidentifikasi pola hubungan antar kata.',
    'Apa strategi terbaik untuk menyelesaikan soal deret dan pola angka?',
    'Jelaskan metode eliminasi dalam menjawab soal pilihan ganda yang kompleks.',
    'Bagaimana mengelola waktu secara efektif saat mengerjakan tes potensi akademik?',
  ],
  'Soal Onkologi Radiasi': [
    'Jelaskan mekanisme kerja radiasi dalam membunuh sel kanker pada tingkat molekuler.',
    'Apa yang dimaksud dengan fraksionasi radioterapi? Mengapa penting dalam perawatan pasien?',
    'Jelaskan perbedaan antara teleterapi (external beam) dan brachytherapy.',
    'Bagaimana radiasi mempengaruhi jaringan normal dan apa strategi untuk melindunginya?',
    'Jelaskan konsep Linear Energy Transfer (LET) dan Relative Biological Effectiveness (RBE).',
    'Apa yang dimaksud dengan radiosensitizer dan radioprotector? Berikan contoh masing-masing.',
    'Jelaskan proses simulasi dan perencanaan radioterapi menggunakan CT simulator.',
    'Bagaimana manajemen efek samping akut dan kronis radioterapi pada pasien?',
    'Jelaskan konsep biologi tumor: hipoksia, repopulasi, dan redistribusi sel.',
    'Apa peran imaging (CT, MRI, PET) dalam perencanaan dan evaluasi radioterapi modern?',
  ],
  'Soal Toefl': [
    'Jelaskan perbedaan penggunaan Simple Present Tense dan Present Continuous Tense. Berikan contoh kalimat.',
    'Bagaimana menggunakan conditional sentences (type 0, 1, 2, 3) dengan benar?',
    'Jelaskan perbedaan antara active voice dan passive voice. Kapan sebaiknya menggunakan passive?',
    'Apa yang dimaksud dengan reported speech? Bagaimana aturan perubahan tense-nya?',
    'Jelaskan penggunaan phrasal verbs dalam bahasa Inggris dan berikan contoh.',
    'Bagaimana cara mengidentifikasi main idea dan supporting details dalam reading comprehension?',
    'Jelaskan strategi note-taking yang efektif untuk listening comprehension test.',
    'Apa yang dimaksud dengan cohesive devices? Berikan contoh dan fungsinya.',
    'Jelaskan struktur essay akademik yang baik: introduction, body, dan conclusion.',
    'Bagaimana cara meningkatkan vocabulary untuk persiapan TOEFL secara efektif?',
  ],

  'UKMPPD': [
    'Stase Penyakit Dalam: Jelaskan pendekatan diagnosis dan tatalaksana awal sindrom koroner akut di layanan primer dan rujukan.',
    'Stase Bedah: Uraikan algoritma penilaian trauma (ATLS) pada pasien dengan kecurigaan perdarahan intraabdomen.',
    'Stase Anak: Jelaskan tata laksana diare akut anak berbasis derajat dehidrasi dan edukasi oralit-zinc.',
    'Stase Obstetri: Bahas diagnosis preeklamsia berat, stabilisasi ibu, dan indikasi terminasi kehamilan.',
    'Stase Ginekologi: Jelaskan diagnosis penyakit radang panggul, antibiotik empiris, dan indikasi rawat inap.',
    'Stase Neurologi: Uraikan alur penanganan stroke akut dari door-to-imaging hingga terapi reperfusi.',
    'Stase Psikiatri: Jelaskan pendekatan biopsikososial pada pasien skizofrenia fase akut dan pemeliharaan.',
    'Stase Kulit Kelamin: Bandingkan tatalaksana herpes zoster, impetigo, dan dermatitis kontak pada fasilitas primer.',
    'Stase THT-Mata: Jelaskan red flags pada mata merah nyeri dan otalgia yang membutuhkan rujukan segera.',
    'Stase Ortopedi-Rehabilitasi: Bahas evaluasi cedera muskuloskeletal akut menggunakan Ottawa rules dan prinsip RICE.',
    'Stase Anestesi: Jelaskan penilaian pra-anestesi, klasifikasi ASA, serta optimasi komorbid sebelum operasi.',
    'Stase Radiologi: Uraikan indikasi pemilihan CT, MRI, dan USG berdasarkan pertanyaan klinis kasus gawat darurat.',
    'Stase Kedokteran Komunitas: Jelaskan langkah investigasi KLB DBD dari verifikasi diagnosis sampai intervensi populasi.',
    'Stase Forensik: Jelaskan tata cara pembuatan visum et repertum pada korban hidup sesuai etika dan hukum Indonesia.',
  ],
  'TPA Bappenas': [
    'Jelaskan strategi menyelesaikan soal sinonim dan antonim dengan cepat.',
    'Bagaimana cara mengidentifikasi pola deret angka yang kompleks?',
    'Apa langkah efektif untuk menyelesaikan soal logika analitik?',
    'Jelaskan teknik eliminasi jawaban pada soal verbal reasoning.',
    'Bagaimana manajemen waktu saat mengerjakan TPA dengan durasi terbatas?',
    'Jelaskan cara membaca grafik dan tabel untuk menarik kesimpulan valid.',
    'Apa perbedaan pendekatan deduktif dan induktif dalam soal penalaran?',
    'Bagaimana cara meningkatkan akurasi pada soal hitung cepat numerik?',
    'Jelaskan strategi menghadapi soal cerita matematika pada TPA.',
    'Apa metode evaluasi diri setelah latihan tryout TPA?',
  ],
  'IELTS': [
    'Jelaskan struktur jawaban ideal untuk IELTS Writing Task 1 Academic.',
    'Bagaimana menyusun argumen yang koheren pada IELTS Writing Task 2?',
    'Apa strategi efektif meningkatkan skor IELTS Reading?',
    'Bagaimana teknik mencatat poin penting pada IELTS Listening?',
    'Jelaskan cara memperluas lexical resource untuk IELTS Speaking.',
    'Bagaimana menghindari grammar error yang umum pada tes IELTS?',
    'Apa perbedaan register formal dan informal dalam konteks IELTS?',
    'Bagaimana cara menjawab pertanyaan opini pada Speaking Part 3?',
    'Jelaskan pentingnya cohesion dan coherence pada writing IELTS.',
    'Bagaimana membuat rencana belajar 4 minggu untuk persiapan IELTS?',
  ],
  'Bahasa Spanyol': [
    'Jelaskan perbedaan penggunaan kata kerja ser dan estar beserta contohnya.',
    'Bagaimana pola konjugasi kata kerja regular berakhiran -ar, -er, dan -ir?',
    'Apa strategi efektif menghafal kosakata dasar bahasa Spanyol?',
    'Jelaskan penggunaan artikel tertentu dan tidak tertentu dalam bahasa Spanyol.',
    'Bagaimana menyusun kalimat negatif dan interogatif sederhana?',
    'Apa perbedaan antara por dan para dalam kalimat sehari-hari?',
    'Jelaskan struktur kalimat sederhana Subject-Verb-Object dalam bahasa Spanyol.',
    'Bagaimana menggunakan kata sifat dan kesesuaian gender/number?',
    'Apa cara terbaik melatih listening bahasa Spanyol untuk pemula?',
    'Bagaimana menulis paragraf perkenalan diri dalam bahasa Spanyol?',
  ],
};

const createEssayQuestion = (moduleName, index) => {
  const n = index + 1;
  const prompts = essayPrompts[moduleName] || essayPrompts['Matematika Simak UI'];
  const promptIndex = (index) % prompts.length;
  return {
    id: `essay-${moduleName}-${n}`,
    module: moduleName,
    prompt: `Soal ${n}: ${prompts[promptIndex]}`,
    hint: getEssayHint(moduleName, promptIndex),
  };
};

const getEssayHint = (moduleName, promptIndex) => {
  const hints = {
    'Matematika Simak UI': [
      'Gunakan konsep limit kiri dan limit kanan.',
      'Perhatikan tanda turunan pertama dan kedua.',
      'Bandingkan kelebihan dan kekurangan kedua metode.',
      'Rumuskan suku pertama dan rasio.',
      'Gambarkan segitiga siku-siku.',
      'Gunakan konsep turunan sebagai gradien garis singgung.',
      'Sebutkan sifat-sifat operasi matriks.',
      'Perhatikan urutan penting atau tidak.',
      'Jelaskan teorema dasar kalkulus.',
      'Perhatikan tanda koefisien x².',
    ],
    'Matematika LPDP': [
      'Gunakan contoh perbandingan harga.',
      'Rumuskan bunga tunggal: B = P×r×t.',
      'Jelaskan faktor diskon dan compound interest.',
      'Gunakan tabel amortisasi.',
      'Hitung selisih dan proporsinya.',
      'Tentukan titik di mana TC = TR.',
      'Jelaskan interpretasi masing-masing ukuran.',
      'Gunakan contoh pelemparan dadu.',
      'Jelaskan margin of error dan confidence level.',
      'Identifikasi tren dan anomali data.',
    ],

    'Tes Substansi LPDP': [
      'Pilih isu spesifik, jelaskan akar masalah dan aktor kunci.',
      'Gunakan kerangka SMART: specific, measurable, achievable, relevant, time-bound.',
      'Petakan peran pemerintah, komunitas, akademisi, dan sektor swasta.',
      'Sertakan strategi exit plan dan penguatan kapasitas lokal.',
      'Fokus pada situasi, tindakan, hasil, dan refleksi (STAR + learning).',
      'Jelaskan sumber data, baseline, target, serta mekanisme evaluasi.',
      'Uraikan tahapan implementasi dan prioritas intervensi.',
      'Bedakan indikator output, outcome, dan impact secara jelas.',
      'Tunjukkan transparansi, akuntabilitas, dan mitigasi risiko etika.',
      'Berikan contoh trade-off dan cara menetapkan prioritas program.',
    ],
    'Tes Potensi Akademik': [
      'Contoh: silogisme dan generalisasi.',
      'Cari premis yang tidak dinyatakan eksplisit.',
      'Sebutkan: ad hominem, false cause, dll.',
      'Berdasarkan informasi yang tersedia.',
      'Skimming untuk gambaran umum.',
      'Identifikasi kata penghubung sebab-akibat.',
      'Sebutkan jenis hubungan: sinonim, antonim, fungsi.',
      'Cari pola aritmatika atau geometri.',
      'Eliminasi opsi yang paling jelas salah.',
      'Alokasikan waktu per soal secara proporsional.',
    ],
    'Soal Onkologi Radiasi': [
      'Jelaskan radikal bebas dan kerusakan DNA.',
      'Sebutkan 4 R biologis radiasi.',
      'Bandingkan jarak sumber dan dosis jatuh.',
      'Gunakan teknik fraksionasi dan shielding.',
      'LET tinggi = RBE tinggi.',
      'Contoh: cisplatin dan amifostine.',
      'Jelaskan immobilization dan contouring.',
      'Bedakan efek akut (minggu) dan kronis (bulan/tahun).',
      'Jelaskan reoxygenation dan reassortment.',
      'PET untuk target volume biologis.',
    ],
    'Soal Toefl': [
      'Simple present untuk kebiasaan, present continuous untuk yang sedang terjadi.',
      'Type 0 (fakta), 1 (mungkin terjadi), 2 (tidak mungkin), 3 (menyesal).',
      'Passive: objek menjadi subjek + be + V3.',
      'Lihat perubahan tense dan kata kerja.',
      'Phrasal verb = verb + preposition/adverb.',
      'Main idea biasanya di awal paragraf.',
      'Gunakan simbol dan singkatan.',
      'Contoh: however, therefore, moreover.',
      'Introduction: hook + thesis statement.',
      'Baca kontekstual dan buat word map.',
    ],
    'UKMPPD': [
      'Tulis urutan stabilisasi, antiplatelet, antikoagulan, dan strategi reperfusi.',
      'Gunakan kerangka primary survey, FAST, dan keputusan laparotomi.',
      'Cantumkan klasifikasi dehidrasi, volume oralit, zinc, serta tanda bahaya.',
      'Sebutkan kriteria berat, regimen MgSO4, kontrol tekanan darah, dan timing terminasi.',
      'Jabarkan kriteria klinis PID, pilihan antibiotik, serta follow-up pasangan.',
      'Susun target waktu door-to-CT dan syarat trombolisis/trombektomi.',
      'Bedakan gejala positif-negatif, fase terapi, dan dukungan keluarga.',
      'Buat tabel diagnosis banding lesi kulit infeksius dan antiinfeksi yang tepat.',
      'Sebutkan gejala red flag, terapi awal, dan kriteria rujukan emergensi.',
      'Tuliskan indikasi imaging, imobilisasi, analgesia, dan rencana rehabilitasi awal.',
      'Jelaskan komponen evaluasi airway, risiko ASA, dan informed consent anestesi.',
      'Hubungkan modality choice dengan kecepatan, sensitivitas, dan keamanan pasien.',
      'Gunakan langkah epidemiologi: verifikasi, definisi kasus, epi curve, intervensi.',
      'Tekankan objektivitas temuan, chain of custody, dan kerahasiaan medis.',
    ],
    'TPA Bappenas': [
      'Gunakan konteks kata dan eliminasi opsi.',
      'Cek selisih, rasio, dan pola campuran.',
      'Visualisasikan hubungan antar pernyataan.',
      'Singkirkan distraktor yang tidak relevan.',
      'Bagi waktu per bagian dan sisakan review.',
      'Fokus pada tren, perbandingan, dan outlier.',
      'Deduktif dari umum ke khusus; induktif sebaliknya.',
      'Latih aritmetika mental dan estimasi cepat.',
      'Terjemahkan narasi ke model matematika.',
      'Catat jenis salah untuk bahan perbaikan.',
    ],
    'IELTS': [
      'Gunakan overview yang jelas dan data utama.',
      'Bangun 2-3 paragraf body dengan contoh relevan.',
      'Latih skimming, scanning, dan keyword matching.',
      'Prediksi jawaban sebelum audio diputar.',
      'Gunakan collocation dan sinonim bervariasi.',
      'Prioritaskan subject-verb agreement dan tenses.',
      'Task 2 menuntut register formal konsisten.',
      'Jawab, beri alasan, lalu contoh konkret.',
      'Pastikan antar kalimat terhubung logis.',
      'Atur target harian: reading, listening, writing, speaking.',
    ],
    'Bahasa Spanyol': [
      'Ser untuk identitas; estar untuk kondisi/lokasi.',
      'Hafalkan pola yo/tú/él-nosotros-vosotros/ellos.',
      'Gunakan flashcard dan spaced repetition.',
      'Perhatikan maskulin/feminin serta singular/plural.',
      'Letakkan "no" sebelum kata kerja utama.',
      'Por = sebab/proses; para = tujuan/arah.',
      'Mulai dari pola sederhana sebelum kalimat majemuk.',
      'Adjektiva menyesuaikan noun yang dijelaskan.',
      'Dengarkan podcast level A1-A2 secara rutin.',
      'Gunakan struktur: me llamo..., soy de..., me gusta....',
    ],
  };
  const moduleHints = hints[moduleName] || hints['Matematika Simak UI'];
  return moduleHints[promptIndex % moduleHints.length];
};

// ===== FLASHCARD CONTENT =====
const flashcardContent = {
  'Matematika Simak UI': [
    { front: 'Limit Fungsi', back: 'Nilai yang didekati fungsi saat variabel mendekati suatu nilai tertentu. Notasi: lim(x→a) f(x) = L' },
    { front: 'Turunan (Derivatif)', back: 'Ukuran laju perubahan fungsi. f\'(x) = lim(h→0) [f(x+h) - f(x)]/h' },
    { front: 'Integral', back: 'Kebalikan dari turunan. Digunakan untuk menghitung luas, volume, dan akumulasi.' },
    { front: 'Teorema Pythagoras', back: 'Pada segitiga siku-siku: a² + b² = c², di mana c adalah sisi miring.' },
    { front: 'Barisan Aritmatika', back: 'Barisan dengan beda tetap. Rumus: Un = a + (n-1)b' },
    { front: 'Barisan Geometri', back: 'Barisan dengan rasio tetap. Rumus: Un = ar^(n-1)' },
    { front: 'Matriks', back: 'Susunan bilangan dalam baris dan kolom. Operasi: penjumlahan, perkalian, determinan.' },
    { front: 'Persamaan Kuadrat', back: 'ax² + bx + c = 0. Penyelesaian: faktorisasi, rumus abc, melengkapkan kuadrat.' },
    { front: 'Trigonometri', back: 'Sin = o/h, Cos = a/h, Tan = o/a. Identitas: sin² + cos² = 1' },
    { front: 'Logaritma', back: 'Logₐb = c berarti a^c = b. Sifat: log(ab) = log a + log b' },
    { front: 'Fungsi Eksponensial', back: 'f(x) = a^x, a > 0. Grafik selalu di atas sumbu x.' },
    { front: 'Program Linear', back: 'Optimasi fungsi linear dengan kendala linear. Gunakan garis selidik.' },
  ],
  'Matematika LPDP': [
    { front: 'Bunga Tunggal', back: 'B = P × r × t. Bunga dihitung hanya dari pokok pinjaman.' },
    { front: 'Bunga Majemak', back: 'A = P(1 + r)^t. Bunga dihitung dari pokok + bunga sebelumnya.' },
    { front: 'Rasio', back: 'Perbandingan dua besaran. a:b atau a/b.' },
    { front: 'Proporsi', back: 'Persamaan dua rasio yang setara. a/b = c/d' },
    { front: 'Persentase', back: 'Per seratus. % = (bagian/keseluruhan) × 100%' },
    { front: 'Diskon', back: 'Potongan harga. Harga akhir = Harga awal × (1 - %diskon)' },
    { front: 'Present Value', back: 'Nilai sekarang dari uang di masa depan. PV = FV/(1+r)^n' },
    { front: 'Future Value', back: 'Nilai uang di masa depan. FV = PV(1+r)^n' },
    { front: 'Mean (Rata-rata)', back: 'Jumlah data dibagi banyaknya data. μ = Σx/n' },
    { front: 'Median', back: 'Nilai tengah data yang terurut.' },
    { front: 'Modus', back: 'Nilai yang paling sering muncul.' },
    { front: 'Standar Deviasi', back: 'Ukuran penyebaran data. σ = √[Σ(x-μ)²/n]' },
  ],

  'Tes Substansi LPDP': [
    { front: 'Kontribusi Pascastudi', back: 'Rencana dampak nyata setelah lulus yang relevan dengan kebutuhan strategis Indonesia.' },
    { front: 'SMART Goals', back: 'Target yang Specific, Measurable, Achievable, Relevant, Time-bound.' },
    { front: 'Evidence-based Policy', back: 'Kebijakan berbasis data valid, evaluasi, dan perbaikan berkelanjutan.' },
    { front: 'Stakeholder Mapping', back: 'Pemetaan aktor kunci, kepentingan, pengaruh, dan strategi pelibatan.' },
    { front: 'Theory of Change', back: 'Alur logis dari input, aktivitas, output, outcome, hingga impact.' },
    { front: 'Output vs Outcome', back: 'Output = hasil langsung; Outcome = perubahan perilaku/kondisi penerima manfaat.' },
    { front: 'Skalabilitas Program', back: 'Kemampuan program diperluas tanpa menurunkan kualitas dampak.' },
    { front: 'Keberlanjutan', back: 'Program tetap berjalan karena kapasitas lokal dan dukungan sistem.' },
    { front: 'Integritas Publik', back: 'Konsistensi antara nilai, keputusan, dan akuntabilitas penggunaan sumber daya.' },
    { front: 'Daerah 3T', back: 'Wilayah terdepan, terluar, tertinggal yang butuh pendekatan kebijakan kontekstual.' },
  ],
  'Tes Potensi Akademik': [
    { front: 'Silogisme', back: 'Penarikan kesimpulan dari dua premis. Contoh: Socrates adalah manusia, semua manusia fana.' },
    { front: 'Analogi', back: 'Kesesuaian hubungan antara dua pasang kata. A:B = C:D' },
    { front: 'Inferensi', back: 'Penarikan kesimpulan berdasarkan bukti dan penalaran.' },
    { front: 'Premis', back: 'Pernyataan yang menjadi dasar argumen atau kesimpulan.' },
    { front: 'Kesimpulan', back: 'Pernyataan yang diperoleh dari premis-premis.' },
    { front: 'Fallacy', back: 'Kesalahan dalam penalaran yang membuat argumen tidak valid.' },
    { front: 'Skimming', back: 'Teknik membaca cepat untuk mendapatkan gambaran umum.' },
    { front: 'Scanning', back: 'Teknik membaca cepat untuk mencari informasi spesifik.' },
    { front: 'Main Idea', back: 'Gagasan utama atau pokok pikiran dalam teks.' },
    { front: 'Supporting Detail', back: 'Detail yang mendukung dan menjelaskan main idea.' },
    { front: 'Sinonim', back: 'Kata yang memiliki makna sama atau mirip.' },
    { front: 'Antonim', back: 'Kata yang memiliki makna berlawanan.' },
  ],
  'Soal Onkologi Radiasi': [
    { front: 'Radiasi Ionisasi', back: 'Radiasi dengan energi cukup untuk mengionisasi atom, menyebabkan kerusakan DNA.' },
    { front: 'Gray (Gy)', back: 'Unit dosis serap radiasi. 1 Gy = 1 joule/kg.' },
    { front: 'Sievert (Sv)', back: 'Unit dosis ekuivalen yang memperhitungkan efek biologis radiasi.' },
    { front: 'Fraksionasi', back: 'Pembagian dosis radiasi total menjadi beberapa sesi kecil.' },
    { front: 'Brachytherapy', back: 'Radioterapi dengan sumber radioaktif ditempatkan di dalam/dekat tumor.' },
    { front: 'Teletherapy', back: 'Radioterapi dengan sumber radiasi di luar tubuh (external beam).' },
    { front: 'LET (Linear Energy Transfer)', back: 'Energi yang diserap radiasi per satuan panjang lintasan.' },
    { front: 'RBE (Relative Biological Effectiveness)', back: 'Efektivitas biologis relatif suatu radiasi dibandingkan sinar-X.' },
    { front: 'Oxygen Effect', back: 'Oksigen meningkatkan efek radiasi dengan memperkuat radikal bebas.' },
    { front: 'Radiosensitizer', back: 'Zat yang meningkatkan sensitivitas sel terhadap radiasi.' },
    { front: 'Radioprotector', back: 'Zat yang melindungi jaringan normal dari efek radiasi.' },
    { front: '4 R Biologis', back: 'Repair, Reassortment, Repopulation, Reoxygenation - respons sel terhadap fraksionasi.' },
  ],
  'Soal Toefl': [
    { front: 'Simple Present', back: 'Untuk kebiasaan dan fakta. S+V1(s/es), S+do/does+not+V1' },
    { front: 'Present Continuous', back: 'Untuk yang sedang terjadi. S+am/is/are+V-ing' },
    { front: 'Past Perfect', back: 'Aksi yang selesai sebelum aksi lain di masa lalu. S+had+V3' },
    { front: 'Future Perfect', back: 'Aksi yang akan selesai pada waktu tertentu. S+will+have+V3' },
    { front: 'Passive Voice', back: 'Subjek menerima aksi. S+to be+V3+(by agent)' },
    { front: 'Conditional Type 1', back: 'Real future possible. If+S+V1, S+will+V1' },
    { front: 'Conditional Type 2', back: 'Unreal present. If+S+V2, S+would+V1' },
    { front: 'Conditional Type 3', back: 'Unreal past. If+S+had+V3, S+would+have+V3' },
    { front: 'Reported Speech', back: 'Penuturan tidak langsung. Perhatikan perubahan tense dan kata.' },
    { front: 'Gerund', back: 'Bentuk V-ing yang berfungsi sebagai nomina. Suka + V-ing' },
    { front: 'Infinitive', back: 'Bentuk to+V1. Digunakan setelah certain verbs dan adj.' },
    { front: 'Comparative', back: 'Perbandingan. Adj+er/more+Adj+than' },
  ],

  'UKMPPD': [
    { front: 'Penyakit Dalam - STEMI', back: 'ST elevasi kontigu + gejala iskemik: berikan DAPT, antikoagulan, dan reperfusi segera sesuai jejaring.' },
    { front: 'Bedah - Trauma Abdomen', back: 'Pasien tidak stabil + FAST positif adalah indikasi laparotomi emergensi (damage control surgery).' },
    { front: 'Anak - Diare Akut', back: 'Klasifikasikan dehidrasi, rehidrasi oral/intravena sesuai derajat, tambah zinc 10-14 hari.' },
    { front: 'Obstetri - Preeklamsia Berat', back: 'TD ≥160/110 dengan tanda berat: MgSO4, antihipertensi, monitor ibu-janin, rencanakan terminasi.' },
    { front: 'Ginekologi - PID', back: 'Nyeri pelvis + nyeri goyang serviks + keputihan: antibiotik empiris spektrum luas dan skrining IMS.' },
    { front: 'Neurologi - Stroke Akut', back: 'Prinsip time is brain: CT non-kontras cepat, tentukan kandidat trombolisis/trombektomi.' },
    { front: 'Psikiatri - Skizofrenia', back: 'Gejala psikotik >6 bulan dengan disfungsi: antipsikotik, psikososial, dan follow-up jangka panjang.' },
    { front: 'Kulit Kelamin - Herpes Zoster', back: 'Vesikel dermatomal nyeri: antiviral dini dan kontrol nyeri untuk cegah neuralgia pascaherpetik.' },
    { front: 'THT - Otitis Media Akut', back: 'Membran timpani hiperemis menonjol: analgesia adekuat, antibiotik bila indikasi klinis terpenuhi.' },
    { front: 'Mata - Glaukoma Akut', back: 'Mata merah nyeri + halo + mual + TIO tinggi adalah emergensi oftalmologi.' },
    { front: 'Ortopedi - Ottawa Rules', back: 'Nyeri maleolus + tidak mampu menapak menandakan kebutuhan rontgen untuk menyingkirkan fraktur.' },
    { front: 'Anestesi - Klasifikasi ASA', back: 'ASA menilai status fisik praoperatif untuk memperkirakan risiko anestesi perioperatif.' },
    { front: 'Radiologi - CT Kepala', back: 'Trauma kepala akut dengan red flag neurologis: CT non-kontras adalah modalitas awal utama.' },
    { front: 'Komunitas - Investigasi KLB', back: 'Mulai dari verifikasi diagnosis, definisi kasus, epi curve, hingga intervensi dan komunikasi risiko.' },
    { front: 'Forensik - Visum et Repertum', back: 'Dokumen medikolegal objektif yang dibuat dokter atas permintaan penyidik untuk pembuktian hukum.' },
  ],
  'TPA Bappenas': [
    { front: 'Sinonim', back: 'Kata dengan makna sama atau sangat mirip.' },
    { front: 'Antonim', back: 'Kata dengan makna berlawanan.' },
    { front: 'Deret Aritmetika', back: 'Pola bilangan dengan beda tetap antar suku.' },
    { front: 'Deret Geometri', back: 'Pola bilangan dengan rasio tetap antar suku.' },
    { front: 'Silogisme', back: 'Penarikan kesimpulan logis dari dua premis.' },
    { front: 'Analogi Verbal', back: 'Hubungan makna antar pasangan kata.' },
    { front: 'Skimming', back: 'Membaca cepat untuk menangkap gagasan utama.' },
    { front: 'Scanning', back: 'Membaca cepat untuk menemukan informasi spesifik.' },
    { front: 'Estimasi', back: 'Perkiraan nilai untuk mempercepat perhitungan.' },
    { front: 'Eliminasi Opsi', back: 'Menyisihkan pilihan jelas salah untuk meningkatkan peluang benar.' },
  ],
  'IELTS': [
    { front: 'Coherence', back: 'Keterpaduan ide agar tulisan/pembicaraan mudah diikuti.' },
    { front: 'Cohesion', back: 'Penggunaan kata hubung agar antar kalimat saling terikat.' },
    { front: 'Lexical Resource', back: 'Rentang dan ketepatan kosakata yang digunakan.' },
    { front: 'Task Response', back: 'Seberapa lengkap jawaban memenuhi tuntutan soal writing.' },
    { front: 'Band Descriptor', back: 'Kriteria penilaian resmi IELTS untuk tiap band score.' },
    { front: 'Paraphrase', back: 'Menyampaikan makna sama dengan struktur/kata berbeda.' },
    { front: 'Skimming', back: 'Teknik membaca cepat untuk overview teks reading.' },
    { front: 'Keyword Matching', back: 'Mencocokkan kata kunci soal dengan informasi di teks/audio.' },
    { front: 'Signposting', back: 'Frasa penanda alur seperti firstly, however, in conclusion.' },
    { front: 'Fluency', back: 'Kelancaran berbicara dengan jeda alami dan minim ragu.' },
  ],
  'Bahasa Spanyol': [
    { front: 'Ser', back: 'Kata kerja untuk identitas, karakteristik, dan asal.' },
    { front: 'Estar', back: 'Kata kerja untuk kondisi sementara dan lokasi.' },
    { front: 'Hola', back: 'Sapaan: halo.' },
    { front: 'Gracias', back: 'Ucapan terima kasih.' },
    { front: 'Por favor', back: 'Ucapan tolong/silakan.' },
    { front: 'Buenos días', back: 'Sapaan selamat pagi.' },
    { front: 'Buenas tardes', back: 'Sapaan selamat siang/sore.' },
    { front: 'Buenas noches', back: 'Sapaan selamat malam.' },
    { front: '¿Cómo estás?', back: 'Pertanyaan: apa kabar?' },
    { front: 'Me llamo...', back: 'Ekspresi: nama saya ...' },
  ],
};

const createFlashcard = (moduleName, index) => {
  const n = index + 1;
  const cards = flashcardContent[moduleName] || flashcardContent['Matematika Simak UI'];
  const cardIndex = index % cards.length;
  const card = cards[cardIndex];
  return {
    id: `fc-${moduleName}-${n}`,
    module: moduleName,
    front: card.front,
    back: card.back,
  };
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

  return { mcq, essay, flashcards };
};

const questionBank = buildQuestionBank();
const moduleQuestionMap = moduleConfigs.reduce((acc, module) => {
  acc[module.name] = {
    mcq: questionBank.mcq.filter((question) => question.module === module.name),
    essay: questionBank.essay.filter((question) => question.module === module.name),
    flashcards: questionBank.flashcards.filter((question) => question.module === module.name),
  };
  return acc;
}, {});

const STORAGE_KEY = 'sobri-practice-state-v3';
const VALID_TYPES = ['mcq', 'essay', 'flashcards'];
const VALID_MCQ_FILTERS = ['all', 'unanswered', 'correct', 'wrong'];

const initialState = {
  selectedModule: modules[0],
  selectedType: 'mcq',
  mcqAnswers: {},
  mcqShowExplanation: {},
  essayAnswers: {},
  flashcardFlips: {},
  masteredFlashcards: {},
  query: '',
  page: 1,
  mcqFilter: 'all',
  showMasteredFlashcards: true,
  darkMode: true,
};

function App() {
  const [state, setState] = useState(initialState);
  const [toast, setToast] = useState('');
  const importInputRef = useRef(null);
  const searchInputRef = useRef(null);

  const sanitizeImportedState = (snapshot = {}) => {
    const safe = { ...initialState };

    if (typeof snapshot.selectedModule === 'string' && modules.includes(snapshot.selectedModule)) {
      safe.selectedModule = snapshot.selectedModule;
    }
    if (typeof snapshot.selectedType === 'string' && VALID_TYPES.includes(snapshot.selectedType)) {
      safe.selectedType = snapshot.selectedType;
    }
    if (snapshot.mcqAnswers && typeof snapshot.mcqAnswers === 'object') {
      safe.mcqAnswers = snapshot.mcqAnswers;
    }
    if (snapshot.mcqShowExplanation && typeof snapshot.mcqShowExplanation === 'object') {
      safe.mcqShowExplanation = snapshot.mcqShowExplanation;
    }
    if (snapshot.essayAnswers && typeof snapshot.essayAnswers === 'object') {
      safe.essayAnswers = snapshot.essayAnswers;
    }
    if (snapshot.flashcardFlips && typeof snapshot.flashcardFlips === 'object') {
      safe.flashcardFlips = snapshot.flashcardFlips;
    }
    if (snapshot.masteredFlashcards && typeof snapshot.masteredFlashcards === 'object') {
      safe.masteredFlashcards = snapshot.masteredFlashcards;
    }
    if (typeof snapshot.query === 'string') {
      safe.query = snapshot.query;
    }
    if (typeof snapshot.page === 'number' && Number.isFinite(snapshot.page) && snapshot.page > 0) {
      safe.page = Math.floor(snapshot.page);
    }
    if (typeof snapshot.mcqFilter === 'string' && VALID_MCQ_FILTERS.includes(snapshot.mcqFilter)) {
      safe.mcqFilter = snapshot.mcqFilter;
    }
    if (typeof snapshot.showMasteredFlashcards === 'boolean') {
      safe.showMasteredFlashcards = snapshot.showMasteredFlashcards;
    }
    if (typeof snapshot.darkMode === 'boolean') {
      safe.darkMode = snapshot.darkMode;
    }

    return safe;
  };

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;
    try {
      const parsed = JSON.parse(savedState);
      const safeParsed = sanitizeImportedState(parsed);
      setState(safeParsed);
    } catch {
      setState(initialState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2300);
    return () => clearTimeout(timer);
  }, [toast]);

  const updateState = (next) => setState((prev) => ({ ...prev, ...next }));

  const moduleMeta = useMemo(
    () => moduleConfigs.find((item) => item.name === state.selectedModule),
    [state.selectedModule],
  );
  const moduleQuestionCount = moduleMeta?.questionCount || DEFAULT_QUESTION_COUNT_PER_MODULE;

  const filteredItems = useMemo(() => {
    const list = questionBank[state.selectedType] || [];
    const normalizedQuery = state.query.trim().toLowerCase();

    return list.filter((item) => {
      const sameModule = item.module === state.selectedModule;
      if (!sameModule) return false;

      const searchable =
        state.selectedType === 'flashcards'
          ? `${item.front} ${item.back}`.toLowerCase()
          : item.prompt.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      if (state.selectedType !== 'mcq') {
        return matchesQuery;
      }

      const selectedAnswer = state.mcqAnswers[item.id];
      const matchesFilter =
        state.mcqFilter === 'all' ||
        (state.mcqFilter === 'unanswered' && !selectedAnswer) ||
        (state.mcqFilter === 'correct' && selectedAnswer === item.answer) ||
        (state.mcqFilter === 'wrong' && selectedAnswer && selectedAnswer !== item.answer);

      return matchesQuery && matchesFilter;
    });
  }, [state.selectedModule, state.selectedType, state.query, state.mcqAnswers, state.mcqFilter]);

  // Filter flashcards for mastered toggle
  const displayItems = useMemo(() => {
    if (state.selectedType !== 'flashcards' || state.showMasteredFlashcards) {
      return filteredItems;
    }
    return filteredItems.filter((item) => !state.masteredFlashcards[item.id]);
  }, [filteredItems, state.selectedType, state.showMasteredFlashcards, state.masteredFlashcards]);

  const totalPages = Math.max(1, Math.ceil(displayItems.length / PAGE_SIZE));
  const currentPage = Math.min(state.page, totalPages);
  const pagedItems = displayItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const moduleMcq = moduleQuestionMap[state.selectedModule]?.mcq || [];
  const moduleEssay = moduleQuestionMap[state.selectedModule]?.essay || [];
  const moduleFlashcards = moduleQuestionMap[state.selectedModule]?.flashcards || [];

  const answeredCount = moduleMcq.filter((q) => state.mcqAnswers[q.id]).length;
  const correctCount = moduleMcq.filter((q) => state.mcqAnswers[q.id] === q.answer).length;
  const progressPercent = moduleMcq.length > 0 ? Math.round((answeredCount / moduleMcq.length) * 100) : 0;
  const essayAnsweredCount = moduleEssay.filter((q) => (state.essayAnswers[q.id] || '').trim()).length;
  const masteredFlashcardsCount = moduleFlashcards.filter((q) => state.masteredFlashcards[q.id]).length;

  // Calculate accuracy rate
  const accuracyRate = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const remainingMcqCount = moduleMcq.length - answeredCount;

  const moduleCompletionMap = useMemo(() => {
    return moduleConfigs.reduce((acc, module) => {
      const moduleQuestions = moduleQuestionMap[module.name]?.mcq || [];
      const moduleAnswered = moduleQuestions.filter((item) => state.mcqAnswers[item.id]).length;
      acc[module.name] = moduleQuestions.length
        ? Math.round((moduleAnswered / moduleQuestions.length) * 100)
        : 0;
      return acc;
    }, {});
  }, [state.mcqAnswers]);

  const jumpToRandomQuestion = () => {
    if (!displayItems.length) return;
    const randomIndex = Math.floor(Math.random() * displayItems.length);
    updateState({ page: Math.floor(randomIndex / PAGE_SIZE) + 1 });
  };

  const jumpToFirstUnanswered = () => {
    if (state.selectedType !== 'mcq') return;
    const firstUnansweredIndex = moduleMcq.findIndex((q) => !state.mcqAnswers[q.id]);
    if (firstUnansweredIndex === -1) {
      setToast('Semua MCQ sudah terjawab. Mantap! 🎉');
      return;
    }
    updateState({ mcqFilter: 'all', page: Math.floor(firstUnansweredIndex / PAGE_SIZE) + 1 });
    setToast(`Lanjut ke soal MCQ #${firstUnansweredIndex + 1}`);
  };

  const jumpToFirstWrong = () => {
    if (state.selectedType !== 'mcq') return;
    const wrongItems = moduleMcq.filter((q) => {
      const answer = state.mcqAnswers[q.id];
      return answer && answer !== q.answer;
    });
    if (!wrongItems.length) {
      setToast('Belum ada jawaban salah di modul ini. Keren! ✨');
      return;
    }
    const firstWrongQuestion = wrongItems[0];
    const firstWrongIndex = moduleMcq.findIndex((q) => q.id === firstWrongQuestion.id);
    updateState({ mcqFilter: 'wrong', page: 1 });
    setToast(`Review soal salah dimulai dari #${firstWrongIndex + 1}`);
  };

  const jumpToFirstUnansweredEssay = () => {
    if (state.selectedType !== 'essay') return;
    const firstUnansweredIndex = moduleEssay.findIndex((q) => !(state.essayAnswers[q.id] || '').trim());
    if (firstUnansweredIndex === -1) {
      setToast('Semua essai di modul ini sudah terisi. Mantap! 🎉');
      return;
    }
    updateState({ page: Math.floor(firstUnansweredIndex / PAGE_SIZE) + 1 });
    setToast(`Lanjut ke essai #${firstUnansweredIndex + 1}`);
  };

  const jumpToFirstUnmasteredFlashcard = () => {
    if (state.selectedType !== 'flashcards') return;
    const firstUnmasteredIndex = moduleFlashcards.findIndex((card) => !state.masteredFlashcards[card.id]);
    if (firstUnmasteredIndex === -1) {
      setToast('Semua flashcard di modul ini sudah dikuasai. Keren! 🌟');
      return;
    }
    updateState({ showMasteredFlashcards: false, page: 1 });
    setToast(`Fokus ulang dari kartu #${firstUnmasteredIndex + 1}`);
  };

  useEffect(() => {
    const onKeydown = (event) => {
      const targetTag = event.target?.tagName;
      const isTyping = targetTag === 'INPUT' || targetTag === 'TEXTAREA' || event.target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === 'ArrowLeft' && currentPage > 1) {
        updateState({ page: currentPage - 1 });
      }

      if (event.key === 'ArrowRight' && currentPage < totalPages) {
        updateState({ page: currentPage + 1 });
      }
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [currentPage, totalPages]);

  const resetCurrentType = () => {
    const typeLabel = state.selectedType === 'mcq' ? 'MCQ' : state.selectedType === 'essay' ? 'Essai' : 'Flashcard';
    const proceed = window.confirm(`Reset semua data ${typeLabel} pada modul aktif?`);
    if (!proceed) return;

    if (state.selectedType === 'mcq') {
      const nextAnswers = { ...state.mcqAnswers };
      const nextExplanations = { ...state.mcqShowExplanation };
      moduleMcq.forEach((q) => {
        delete nextAnswers[q.id];
        delete nextExplanations[q.id];
      });
      updateState({ mcqAnswers: nextAnswers, mcqShowExplanation: nextExplanations });
      setToast('Progress MCQ modul aktif berhasil direset.');
      return;
    }

    if (state.selectedType === 'essay') {
      const nextAnswers = { ...state.essayAnswers };
      questionBank.essay
        .filter((q) => q.module === state.selectedModule)
        .forEach((q) => delete nextAnswers[q.id]);
      updateState({ essayAnswers: nextAnswers });
      setToast('Jawaban essai modul aktif berhasil direset.');
      return;
    }

    const nextFlips = { ...state.flashcardFlips };
    const nextMastered = { ...state.masteredFlashcards };
    questionBank.flashcards
      .filter((q) => q.module === state.selectedModule)
      .forEach((q) => {
        delete nextFlips[q.id];
        delete nextMastered[q.id];
      });
    updateState({ flashcardFlips: nextFlips, masteredFlashcards: nextMastered });
    setToast('Progress flashcard modul aktif berhasil direset.');
  };

  const resetModuleProgress = () => {
    const proceed = window.confirm(`Reset semua progress di modul ${state.selectedModule}?`);
    if (!proceed) return;

    const moduleQuestionIds = new Set(
      questionBank.mcq.filter((q) => q.module === state.selectedModule).map((q) => q.id),
    );
    const moduleEssayIds = new Set(
      questionBank.essay.filter((q) => q.module === state.selectedModule).map((q) => q.id),
    );
    const moduleFlashcardIds = new Set(
      questionBank.flashcards.filter((q) => q.module === state.selectedModule).map((q) => q.id),
    );

    const filteredObject = (source, idSet) => Object.fromEntries(
      Object.entries(source).filter(([key]) => !idSet.has(key)),
    );

    updateState({
      mcqAnswers: filteredObject(state.mcqAnswers, moduleQuestionIds),
      mcqShowExplanation: filteredObject(state.mcqShowExplanation, moduleQuestionIds),
      essayAnswers: filteredObject(state.essayAnswers, moduleEssayIds),
      flashcardFlips: filteredObject(state.flashcardFlips, moduleFlashcardIds),
      masteredFlashcards: filteredObject(state.masteredFlashcards, moduleFlashcardIds),
      page: 1,
      query: '',
      mcqFilter: 'all',
    });
    setToast(`Semua progress di modul ${state.selectedModule} sudah direset.`);
  };

  const resetAllProgress = () => {
    const proceed = window.confirm('Reset semua progress di seluruh modul? Tindakan ini tidak bisa dibatalkan.');
    if (!proceed) return;

    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
    setToast('Semua progress berhasil dihapus dan aplikasi direset.');
  };

  const toggleExplanation = (questionId) => {
    updateState({
      mcqShowExplanation: {
        ...state.mcqShowExplanation,
        [questionId]: !state.mcqShowExplanation[questionId],
      },
    });
  };

  const onChangeModule = (moduleName) => {
    updateState({ selectedModule: moduleName, page: 1, query: '', mcqFilter: 'all' });
  };

  const onChangeType = (type) => {
    updateState({ selectedType: type, page: 1, query: '', mcqFilter: 'all' });
  };

  const exportProgress = () => {
    const data = {
      module: state.selectedModule,
      type: state.selectedType,
      timestamp: new Date().toISOString(),
      stateSnapshot: {
        selectedModule: state.selectedModule,
        selectedType: state.selectedType,
        mcqAnswers: state.mcqAnswers,
        mcqShowExplanation: state.mcqShowExplanation,
        essayAnswers: state.essayAnswers,
        flashcardFlips: state.flashcardFlips,
        masteredFlashcards: state.masteredFlashcards,
        query: '',
        page: 1,
        mcqFilter: 'all',
        showMasteredFlashcards: state.showMasteredFlashcards,
        darkMode: state.darkMode,
      },
      stats: {
        mcqAnswered: answeredCount,
        mcqCorrect: correctCount,
        mcqTotal: moduleMcq.length,
        essayAnswered: essayAnsweredCount,
        essayTotal: moduleEssay.length,
        flashcardsMastered: masteredFlashcardsCount,
        flashcardsTotal: moduleFlashcards.length,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-${state.selectedModule}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('Progress berhasil di-export.');
  };

  const triggerImportProgress = () => {
    if (importInputRef.current) {
      importInputRef.current.value = '';
      importInputRef.current.click();
    }
  };

  const importProgress = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.stateSnapshot) {
        throw new Error('Invalid file format');
      }

      const safeData = sanitizeImportedState(parsed.stateSnapshot);

      setState((prev) => ({ ...prev, ...safeData }));
      setToast('Progress berhasil di-import.');
    } catch {
      setToast('File import tidak valid. Gunakan file hasil export aplikasi.');
    }
  };

  return (
    <div className="app-shell">
      <div className="glow glow-top" />
      <div className="glow glow-bottom" />
      <div className="layout">
        <aside className="sidebar">
          <h1>Sobri Practice Hub</h1>
          <p className="subtle">{moduleQuestionCount} soal pada modul aktif • responsif • autosave</p>
          <div className="menu-group">
            {moduleConfigs.map((module) => (
              <button
                key={module.name}
                className={state.selectedModule === module.name ? 'active menu-btn' : 'menu-btn'}
                onClick={() => onChangeModule(module.name)}
              >
                <strong>{module.name}</strong>
                <small>{module.tag}</small>
                <small>Progress MCQ {moduleCompletionMap[module.name] || 0}%</small>
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              onChange={importProgress}
              style={{ display: 'none' }}
            />
            <button className="ghost" onClick={() => updateState({ darkMode: !state.darkMode })}>
              {state.darkMode ? '☀️ Light mode' : '🌙 Dark mode'}
            </button>
            <button className="ghost" onClick={exportProgress}>
              📊 Export Progress
            </button>
            <button className="ghost" onClick={triggerImportProgress}>
              📥 Import Progress
            </button>
            <button className="ghost danger" onClick={resetAllProgress}>
              ♻️ Reset Semua Progress
            </button>
          </div>
        </aside>

        <main className="content">
          <header>
            <div>
              <h2>{state.selectedModule}</h2>
              <p>{moduleMeta?.tag}</p>
            </div>
            <div className="tabs">
              {[
                { id: 'mcq', label: 'MCQ' },
                { id: 'essay', label: 'Essai' },
                { id: 'flashcards', label: 'Flashcard' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onChangeType(tab.id)}
                  className={state.selectedType === tab.id ? 'tab active' : 'tab'}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          <section className="stats-grid">
            <article className="stat-card">
              <span>Total Soal</span>
              <strong>{moduleQuestionCount}</strong>
            </article>
            <article className="stat-card">
              <span>MCQ Terjawab</span>
              <strong>
                {answeredCount}/{moduleMcq.length}
              </strong>
            </article>
            <article className="stat-card">
              <span>Akurasi</span>
              <strong>{accuracyRate}%</strong>
            </article>
            <article className="stat-card">
              <span>Progress</span>
              <strong>{progressPercent}%</strong>
            </article>
            <article className="stat-card">
              <span>Essai Terisi</span>
              <strong>{essayAnsweredCount}/{moduleEssay.length}</strong>
            </article>
            <article className="stat-card">
              <span>Flashcard Dikuasai</span>
              <strong>{masteredFlashcardsCount}/{moduleFlashcards.length}</strong>
            </article>
          </section>

          <section className="card progress-panel">
            <div>
              <p>Progress modul aktif</p>
              <strong>{progressPercent}%</strong>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </section>

          <section className="toolbar card">
            <input
              ref={searchInputRef}
              value={state.query}
              onChange={(e) => updateState({ query: e.target.value, page: 1 })}
              placeholder="Cari soal, kata kunci, atau konsep... (Ctrl/Cmd + K)"
            />
            {state.query ? (
              <button className="ghost" onClick={() => updateState({ query: '', page: 1 })}>❎ Bersihkan pencarian</button>
            ) : null}
            {state.selectedType === 'mcq' ? (
              <select
                value={state.mcqFilter}
                onChange={(e) => updateState({ mcqFilter: e.target.value, page: 1 })}
              >
                <option value="all">Semua</option>
                <option value="unanswered">Belum dijawab</option>
                <option value="correct">Jawaban benar</option>
                <option value="wrong">Jawaban salah</option>
              </select>
            ) : state.selectedType === 'flashcards' ? (
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={state.showMasteredFlashcards}
                  onChange={(e) => updateState({ showMasteredFlashcards: e.target.checked })}
                />
                Tampilkan yang sudah dikuasai
              </label>
            ) : null}
            <button className="ghost" onClick={jumpToRandomQuestion}>🎲 Soal acak</button>
            {state.selectedType === 'mcq' && (
              <button className="ghost" onClick={jumpToFirstUnanswered}>➡️ Lanjut soal belum dijawab</button>
            )}
            {state.selectedType === 'mcq' && (
              <button className="ghost" onClick={jumpToFirstWrong}>🧠 Review jawaban salah</button>
            )}
            {state.selectedType === 'essay' && (
              <button className="ghost" onClick={jumpToFirstUnansweredEssay}>✍️ Lanjut essai kosong</button>
            )}
            {state.selectedType === 'flashcards' && (
              <button className="ghost" onClick={jumpToFirstUnmasteredFlashcard}>📌 Fokus yang belum dikuasai</button>
            )}
            <button className="ghost danger" onClick={resetModuleProgress}>♻️ Reset modul aktif</button>
            <button className="ghost danger" onClick={resetCurrentType}>🗑️ Reset data</button>
          </section>

          <section className="card progress-panel">
            <p>
              Ringkas cepat: {remainingMcqCount} MCQ belum dijawab di modul ini.
              Gunakan tombol <strong>Review jawaban salah</strong> untuk fokus perbaikan.
            </p>
            <p className="subtle-info">Shortcut navigasi: ←/→ pindah halaman.</p>
          </section>

          {toast ? <div className="card toast">{toast}</div> : null}

          {displayItems.length === 0 ? (
            <div className="card empty">
              {state.selectedType === 'flashcards' && !state.showMasteredFlashcards
                ? 'Semua flashcard sudah dikuasai! 🎉 Atau coba aktifkan "Tampilkan yang sudah dikuasai"'
                : 'Tidak ada konten sesuai pencarian. Coba kata kunci lain.'}
            </div>
          ) : null}

          {state.selectedType === 'mcq' &&
            pagedItems.map((q) => {
              const selected = state.mcqAnswers[q.id];
              const isCorrect = selected === q.answer;
              const showExplanation = state.mcqShowExplanation[q.id];
              return (
                <section className="card" key={q.id}>
                  <div className="question-header">
                    <span className="question-number">Soal {(currentPage - 1) * PAGE_SIZE + pagedItems.indexOf(q) + 1}</span>
                    {selected && (
                      <span className={`status-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                        {isCorrect ? '✓ Benar' : '✗ Salah'}
                      </span>
                    )}
                  </div>
                  <h3>{q.prompt}</h3>
                  <div className="stack">
                    {q.options.map((option) => (
                      <label 
                        key={option} 
                        className={`option ${selected ? (option === q.answer ? 'correct-answer' : (option === selected && option !== q.answer ? 'wrong-answer' : '')) : ''}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={selected === option}
                          onChange={() =>
                            updateState({
                              mcqAnswers: { ...state.mcqAnswers, [q.id]: option },
                            })
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {selected ? (
                    <div className="feedback-section">
                      <p className={isCorrect ? 'ok' : 'wrong'}>
                        {isCorrect ? 'Jawaban benar! ✅' : `Jawabanmu: "${selected}" — Belum tepat. Jawaban benar: "${q.answer}"`}
                      </p>
                      <button 
                        className="ghost small"
                        onClick={() => toggleExplanation(q.id)}
                      >
                        {showExplanation ? 'Sembunyikan penjelasan' : 'Lihat penjelasan'}
                      </button>
                      {showExplanation && q.explanation && (
                        <div className="explanation-box">
                          <strong>💡 Penjelasan:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </section>
              );
            })}

          {state.selectedType === 'essay' &&
            pagedItems.map((q) => {
              const wordCount = (state.essayAnswers[q.id] || '').trim().split(/\s+/).filter(Boolean).length;
              const charCount = (state.essayAnswers[q.id] || '').length;
              return (
                <section className="card" key={q.id}>
                  <div className="question-header">
                    <span className="question-number">Soal {(currentPage - 1) * PAGE_SIZE + pagedItems.indexOf(q) + 1}</span>
                    {wordCount > 0 && (
                      <span className="status-badge answered">
                        {wordCount} kata
                      </span>
                    )}
                  </div>
                  <h3>{q.prompt}</h3>
                  {q.hint && (
                    <div className="hint-box">
                      <strong>💡 Petunjuk:</strong> {q.hint}
                    </div>
                  )}
                  <textarea
                    rows={6}
                    placeholder="Tulis jawaban essai kamu di sini..."
                    value={state.essayAnswers[q.id] || ''}
                    onChange={(e) =>
                      updateState({
                        essayAnswers: { ...state.essayAnswers, [q.id]: e.target.value },
                      })
                    }
                  />
                  <p className="subtle-info">
                    {wordCount} kata • {charCount} karakter
                    {wordCount < 10 && wordCount > 0 && ' (tambahkan lebih banyak untuk jawaban yang lengkap)'}
                  </p>
                </section>
              );
            })}

          {state.selectedType === 'flashcards' &&
            pagedItems.map((card) => {
              const flipped = !!state.flashcardFlips[card.id];
              const mastered = !!state.masteredFlashcards[card.id];
              return (
                <section key={card.id} className={`card flashcard-wrapper ${mastered ? 'mastered-card' : ''}`}>
                  <div className="question-header">
                    <span className="question-number">Kartu {(currentPage - 1) * PAGE_SIZE + pagedItems.indexOf(card) + 1}</span>
                    {mastered && <span className="status-badge mastered">✓ Dikuasai</span>}
                  </div>
                  <button
                    className={flipped ? 'flashcard flipped' : 'flashcard'}
                    onClick={() =>
                      updateState({
                        flashcardFlips: {
                          ...state.flashcardFlips,
                          [card.id]: !flipped,
                        },
                      })
                    }
                  >
                    <small>{flipped ? 'Sisi Belakang' : 'Sisi Depan'}</small>
                    <p>{flipped ? card.back : card.front}</p>
                    <span className="flip-hint">{flipped ? '👆 Klik untuk kembali' : '👆 Klik untuk membalik'}</span>
                  </button>
                  <div className="flashcard-actions">
                    <button
                      className={mastered ? 'ghost mastered' : 'ghost'}
                      onClick={() =>
                        updateState({
                          masteredFlashcards: {
                            ...state.masteredFlashcards,
                            [card.id]: !mastered,
                          },
                        })
                      }
                    >
                      {mastered ? '✓ Sudah dikuasai' : '✓ Tandai dikuasai'}
                    </button>
                    <button
                      className="ghost"
                      onClick={() =>
                        updateState({
                          flashcardFlips: {
                            ...state.flashcardFlips,
                            [card.id]: false,
                          },
                        })
                      }
                    >
                      ↺ Reset kartu
                    </button>
                  </div>
                </section>
              );
            })}

          <footer className="pagination">
            <button
              className="tab"
              onClick={() => updateState({ page: Math.max(1, currentPage - 1) })}
              disabled={currentPage === 1}
            >
              ← Sebelumnya
            </button>
            <div className="page-info">
              <p>Halaman {currentPage} / {totalPages}</p>
              <small>{displayItems.length} item total</small>
            </div>
            <button
              className="tab"
              onClick={() => updateState({ page: Math.min(totalPages, currentPage + 1) })}
              disabled={currentPage === totalPages}
            >
              Berikutnya →
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
