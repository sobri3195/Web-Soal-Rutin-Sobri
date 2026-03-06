import { useEffect, useMemo, useState } from 'react';

const modules = [
  'Matematika Simak UI',
  'Matematika LPDP',
  'Tes Potensi Akademik',
  'Soal Onkologi Radiasi',
  'Soal Toefl',
];

const questionBank = {
  mcq: [
    {
      id: 'mcq-1',
      module: 'Matematika Simak UI',
      prompt: 'Jika 2x + 3 = 11, maka nilai x adalah...',
      options: ['2', '3', '4', '5'],
      answer: '4',
    },
    {
      id: 'mcq-2',
      module: 'Tes Potensi Akademik',
      prompt: 'Sinonim kata "akurat" adalah...',
      options: ['tepat', 'sulit', 'samar', 'tumpul'],
      answer: 'tepat',
    },
    {
      id: 'mcq-3',
      module: 'Soal Toefl',
      prompt: 'Choose the correct word: She ___ to campus every day.',
      options: ['go', 'goes', 'going', 'gone'],
      answer: 'goes',
    },
  ],
  essay: [
    {
      id: 'essay-1',
      module: 'Matematika LPDP',
      prompt: 'Jelaskan strategi Anda dalam menyelesaikan soal limit fungsi secara sistematis.',
    },
    {
      id: 'essay-2',
      module: 'Soal Onkologi Radiasi',
      prompt: 'Uraikan perbedaan prinsip dasar radioterapi kuratif dan paliatif.',
    },
  ],
  flashcards: [
    {
      id: 'fc-1',
      module: 'Soal Toefl',
      front: 'Abundant',
      back: 'Berlimpah; banyak sekali.',
    },
    {
      id: 'fc-2',
      module: 'Tes Potensi Akademik',
      front: 'Premis',
      back: 'Pernyataan awal yang menjadi dasar penalaran.',
    },
    {
      id: 'fc-3',
      module: 'Matematika Simak UI',
      front: 'Turunan fungsi',
      back: 'Laju perubahan suatu fungsi terhadap variabelnya.',
    },
  ],
};

const STORAGE_KEY = 'sobri-practice-state-v1';

const initialState = {
  selectedModule: modules[0],
  selectedType: 'mcq',
  mcqAnswers: {},
  essayAnswers: {},
  flashcardFlips: {},
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

  const filteredItems = useMemo(() => {
    const list = questionBank[state.selectedType] || [];
    return list.filter((item) => item.module === state.selectedModule);
  }, [state.selectedModule, state.selectedType]);

  const updateState = (next) => setState((prev) => ({ ...prev, ...next }));

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Panel Modul</h1>
        <p className="subtle">Frontend latihan soal dengan local storage</p>
        <div className="menu-group">
          {modules.map((module) => (
            <button
              key={module}
              className={state.selectedModule === module ? 'active menu-btn' : 'menu-btn'}
              onClick={() => updateState({ selectedModule: module })}
            >
              {module}
            </button>
          ))}
        </div>
      </aside>

      <main className="content">
        <header>
          <h2>{state.selectedModule}</h2>
          <div className="tabs">
            {[
              { id: 'mcq', label: 'MCQ' },
              { id: 'essay', label: 'Essai' },
              { id: 'flashcards', label: 'Flashcard' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => updateState({ selectedType: tab.id })}
                className={state.selectedType === tab.id ? 'tab active' : 'tab'}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {filteredItems.length === 0 ? (
          <div className="card empty">Belum ada konten untuk kombinasi modul dan tipe ini.</div>
        ) : null}

        {state.selectedType === 'mcq' &&
          filteredItems.map((q) => {
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
          filteredItems.map((q) => (
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
            </section>
          ))}

        {state.selectedType === 'flashcards' &&
          filteredItems.map((card) => {
            const flipped = !!state.flashcardFlips[card.id];
            return (
              <button
                key={card.id}
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
            );
          })}
      </main>
    </div>
  );
}

export default App;
