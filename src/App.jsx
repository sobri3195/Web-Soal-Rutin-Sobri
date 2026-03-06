import { useEffect, useMemo, useState } from 'react';

const moduleConfigs = [
  { name: 'Matematika Simak UI', tag: 'Analitik Kuantitatif' },
  { name: 'Matematika LPDP', tag: 'Reasoning Numerik' },
  { name: 'Tes Potensi Akademik', tag: 'Verbal & Logika' },
  { name: 'Soal Onkologi Radiasi', tag: 'Konsep Medis' },
  { name: 'Soal Toefl', tag: 'English Mastery' },
];

const modules = moduleConfigs.map((module) => module.name);
const QUESTION_COUNT_PER_MODULE = 100;
const PAGE_SIZE = 10;

const shuffleDeterministic = (items, seed) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 13) % (i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const createMcqQuestion = (moduleName, index) => {
  const n = index + 1;
  const variants = [
    () => {
      const a = (n % 9) + 2;
      const b = (n % 5) + 3;
      const result = a * b;
      const answer = String(result);
      return {
        prompt: `[${moduleName}] Hitung nilai ${a} × ${b}.`,
        answer,
        options: shuffleDeterministic(
          [answer, String(result + 2), String(result - 1), String(result + 5)],
          n,
        ),
      };
    },
    () => {
      const base = (n % 11) + 10;
      const delta = (n % 4) + 6;
      const answer = String(base + delta);
      return {
        prompt: `[${moduleName}] Jika skor awal ${base} lalu meningkat ${delta}, skor akhir adalah...`,
        answer,
        options: shuffleDeterministic(
          [answer, String(base - delta), String(base + delta + 3), String(base + 1)],
          n,
        ),
      };
    },
    () => {
      const words = ['akurasi', 'konsisten', 'objektif', 'efektif'];
      const correct = words[n % words.length];
      return {
        prompt: `[${moduleName}] Pilih kata yang paling tepat untuk melengkapi kalimat: "Latihan rutin membuat hasil belajar lebih ____".`,
        answer: correct,
        options: shuffleDeterministic([correct, 'kabur', 'acak', 'labil'], n),
      };
    },
    () => {
      const k = (n % 8) + 2;
      const answer = String(k * k);
      return {
        prompt: `[${moduleName}] Nilai kuadrat dari ${k} adalah...`,
        answer,
        options: shuffleDeterministic(
          [answer, String(k * 2), String(k + 5), String(k * k + 2)],
          n,
        ),
      };
    },
    () => {
      const verbs = ['analyze', 'improve', 'review', 'compare'];
      const answer = `${verbs[n % verbs.length]}s`;
      return {
        prompt: `[${moduleName}] Choose the correct verb form: "She ___ the concept every night."`,
        answer,
        options: shuffleDeterministic([answer, verbs[n % verbs.length], 'is improve', 'have reviewed'], n),
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

const createEssayQuestion = (moduleName, index) => {
  const n = index + 1;
  return {
    id: `essay-${moduleName}-${n}`,
    module: moduleName,
    prompt: `[${moduleName}] Soal Essai ${n}: Jelaskan langkah terstruktur yang Anda gunakan untuk menyelesaikan topik "${moduleName}" dan bagaimana Anda mengevaluasi hasilnya.`,
  };
};

const createFlashcard = (moduleName, index) => {
  const n = index + 1;
  return {
    id: `fc-${moduleName}-${n}`,
    module: moduleName,
    front: `[${moduleName}] Konsep ${n}`,
    back: `Ringkasan konsep ${n}: pahami definisi, contoh penerapan, dan kesalahan umum agar performa latihan meningkat.`,
  };
};

const buildQuestionBank = () => {
  const mcq = [];
  const essay = [];
  const flashcards = [];

  moduleConfigs.forEach((module) => {
    for (let i = 0; i < QUESTION_COUNT_PER_MODULE; i += 1) {
      mcq.push(createMcqQuestion(module.name, i));
      essay.push(createEssayQuestion(module.name, i));
      flashcards.push(createFlashcard(module.name, i));
    }
  });

  return { mcq, essay, flashcards };
};

const questionBank = buildQuestionBank();

const STORAGE_KEY = 'sobri-practice-state-v2';

const initialState = {
  selectedModule: modules[0],
  selectedType: 'mcq',
  mcqAnswers: {},
  essayAnswers: {},
  flashcardFlips: {},
  masteredFlashcards: {},
  query: '',
  page: 1,
  mcqFilter: 'all',
};

function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;
    try {
      const parsed = JSON.parse(savedState);
      setState({ ...initialState, ...parsed });
    } catch {
      setState(initialState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (next) => setState((prev) => ({ ...prev, ...next }));

  const moduleMeta = useMemo(
    () => moduleConfigs.find((item) => item.name === state.selectedModule),
    [state.selectedModule],
  );

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

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(state.page, totalPages);
  const pagedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const moduleMcq = useMemo(
    () => questionBank.mcq.filter((question) => question.module === state.selectedModule),
    [state.selectedModule],
  );
  const moduleEssay = useMemo(
    () => questionBank.essay.filter((question) => question.module === state.selectedModule),
    [state.selectedModule],
  );
  const moduleFlashcards = useMemo(
    () => questionBank.flashcards.filter((question) => question.module === state.selectedModule),
    [state.selectedModule],
  );

  const answeredCount = moduleMcq.filter((q) => state.mcqAnswers[q.id]).length;
  const correctCount = moduleMcq.filter((q) => state.mcqAnswers[q.id] === q.answer).length;
  const progressPercent = Math.round((answeredCount / moduleMcq.length) * 100);
  const essayAnsweredCount = moduleEssay.filter((q) => (state.essayAnswers[q.id] || '').trim()).length;
  const masteredFlashcardsCount = moduleFlashcards.filter((q) => state.masteredFlashcards[q.id]).length;

  const jumpToRandomQuestion = () => {
    if (!filteredItems.length) return;
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    updateState({ page: Math.floor(randomIndex / PAGE_SIZE) + 1 });
  };

  const resetCurrentType = () => {
    if (state.selectedType === 'mcq') {
      const nextAnswers = { ...state.mcqAnswers };
      moduleMcq.forEach((q) => delete nextAnswers[q.id]);
      updateState({ mcqAnswers: nextAnswers });
      return;
    }

    if (state.selectedType === 'essay') {
      const nextAnswers = { ...state.essayAnswers };
      questionBank.essay
        .filter((q) => q.module === state.selectedModule)
        .forEach((q) => delete nextAnswers[q.id]);
      updateState({ essayAnswers: nextAnswers });
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
  };

  const onChangeModule = (moduleName) => {
    updateState({ selectedModule: moduleName, page: 1, query: '', mcqFilter: 'all' });
  };

  const onChangeType = (type) => {
    updateState({ selectedType: type, page: 1, query: '', mcqFilter: 'all' });
  };

  return (
    <div className="app-shell">
      <div className="glow glow-top" />
      <div className="glow glow-bottom" />
      <div className="layout">
        <aside className="sidebar">
          <h1>Sobri Practice Hub</h1>
          <p className="subtle">{QUESTION_COUNT_PER_MODULE} soal per modul • responsif • autosave</p>
          <div className="menu-group">
            {moduleConfigs.map((module) => (
              <button
                key={module.name}
                className={state.selectedModule === module.name ? 'active menu-btn' : 'menu-btn'}
                onClick={() => onChangeModule(module.name)}
              >
                <strong>{module.name}</strong>
                <small>{module.tag}</small>
              </button>
            ))}
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
              <strong>{QUESTION_COUNT_PER_MODULE}</strong>
            </article>
            <article className="stat-card">
              <span>MCQ Terjawab</span>
              <strong>
                {answeredCount}/{QUESTION_COUNT_PER_MODULE}
              </strong>
            </article>
            <article className="stat-card">
              <span>Benar</span>
              <strong>{correctCount}</strong>
            </article>
            <article className="stat-card">
              <span>Progress</span>
              <strong>{progressPercent}%</strong>
            </article>
            <article className="stat-card">
              <span>Essai Terisi</span>
              <strong>{essayAnsweredCount}</strong>
            </article>
            <article className="stat-card">
              <span>Flashcard Dikuasai</span>
              <strong>{masteredFlashcardsCount}</strong>
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
              value={state.query}
              onChange={(e) => updateState({ query: e.target.value, page: 1 })}
              placeholder="Cari soal, kata kunci, atau konsep..."
            />
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
            ) : null}
            <button className="ghost" onClick={jumpToRandomQuestion}>Soal acak</button>
            <button className="ghost" onClick={resetCurrentType}>Reset data tipe ini</button>
          </section>

          {filteredItems.length === 0 ? (
            <div className="card empty">Tidak ada konten sesuai pencarian. Coba kata kunci lain.</div>
          ) : null}

          {state.selectedType === 'mcq' &&
            pagedItems.map((q) => {
              const selected = state.mcqAnswers[q.id];
              const isCorrect = selected === q.answer;
              return (
                <section className="card" key={q.id}>
                  <h3>{q.prompt}</h3>
                  <div className="stack">
                    {q.options.map((option) => (
                      <label key={option} className="option">
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
                    <p className={isCorrect ? 'ok' : 'wrong'}>
                      {isCorrect ? 'Jawaban benar ✅' : `Belum tepat. Jawaban benar: ${q.answer}`}
                    </p>
                  ) : null}
                </section>
              );
            })}

          {state.selectedType === 'essay' &&
            pagedItems.map((q) => (
              <section className="card" key={q.id}>
                <h3>{q.prompt}</h3>
                <textarea
                  rows={5}
                  placeholder="Tulis jawaban essai kamu di sini..."
                  value={state.essayAnswers[q.id] || ''}
                  onChange={(e) =>
                    updateState({
                      essayAnswers: { ...state.essayAnswers, [q.id]: e.target.value },
                    })
                  }
                />
                <p className="subtle-info">
                  Jumlah kata: {(state.essayAnswers[q.id] || '').trim().split(/\s+/).filter(Boolean).length}
                </p>
              </section>
            ))}

          {state.selectedType === 'flashcards' &&
            pagedItems.map((card) => {
              const flipped = !!state.flashcardFlips[card.id];
              const mastered = !!state.masteredFlashcards[card.id];
              return (
                <section key={card.id} className="card">
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
                    <small>{flipped ? 'Back' : 'Front'}</small>
                    <p>{flipped ? card.back : card.front}</p>
                    <span>Klik untuk membalik kartu</span>
                  </button>
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
                    {mastered ? 'Sudah dikuasai ✅' : 'Tandai dikuasai'}
                  </button>
                </section>
              );
            })}

          <footer className="pagination">
            <button
              className="tab"
              onClick={() => updateState({ page: Math.max(1, currentPage - 1) })}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </button>
            <p>
              Halaman {currentPage} / {totalPages}
            </p>
            <button
              className="tab"
              onClick={() => updateState({ page: Math.min(totalPages, currentPage + 1) })}
              disabled={currentPage === totalPages}
            >
              Berikutnya
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
