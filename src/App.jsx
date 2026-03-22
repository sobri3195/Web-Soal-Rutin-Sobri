import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_QUESTION_COUNT_PER_MODULE,
  moduleConfigs,
  moduleQuestionMap,
  modules,
  PAGE_SIZE,
  questionBank,
} from './questionBank';

const STORAGE_KEY = 'sobri-practice-state-v3';
const VALID_TYPES = ['mcq', 'essay', 'flashcards'];
const VALID_MCQ_FILTERS = ['all', 'unanswered', 'correct', 'wrong'];
const asRecord = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});

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
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const importInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);

  const sanitizeImportedState = (snapshot = {}) => {
    const safe = { ...initialState };

    if (typeof snapshot.selectedModule === 'string' && modules.includes(snapshot.selectedModule)) {
      safe.selectedModule = snapshot.selectedModule;
    }
    if (typeof snapshot.selectedType === 'string' && VALID_TYPES.includes(snapshot.selectedType)) {
      safe.selectedType = snapshot.selectedType;
    }
    safe.mcqAnswers = asRecord(snapshot.mcqAnswers);
    safe.mcqShowExplanation = asRecord(snapshot.mcqShowExplanation);
    safe.essayAnswers = asRecord(snapshot.essayAnswers);
    safe.flashcardFlips = asRecord(snapshot.flashcardFlips);
    safe.masteredFlashcards = asRecord(snapshot.masteredFlashcards);
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
  const filteredSummary = displayItems.length === filteredItems.length
    ? `${displayItems.length} item tampil`
    : `${displayItems.length} dari ${filteredItems.length} item tampil`;
  const canResetView = state.page > 1 || !!state.query || state.mcqFilter !== 'all' || !state.showMasteredFlashcards;

  const typeSummary =
    state.selectedType === 'mcq'
      ? {
          title: 'Progress MCQ',
          done: answeredCount,
          total: moduleMcq.length,
          helper: `${correctCount} jawaban benar • ${remainingMcqCount} belum dijawab`,
        }
      : state.selectedType === 'essay'
        ? {
            title: 'Progress Essai',
            done: essayAnsweredCount,
            total: moduleEssay.length,
            helper: `${moduleEssay.length - essayAnsweredCount} essai belum terisi`,
          }
        : {
            title: 'Progress Flashcard',
            done: masteredFlashcardsCount,
            total: moduleFlashcards.length,
            helper: `${moduleFlashcards.length - masteredFlashcardsCount} kartu belum dikuasai`,
          };
  const typeProgressPercent = typeSummary.total > 0 ? Math.round((typeSummary.done / typeSummary.total) * 100) : 0;

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

      if (event.key === '1') onChangeType('mcq');
      if (event.key === '2') onChangeType('essay');
      if (event.key === '3') onChangeType('flashcards');
      if (event.key.toLowerCase() === 'r') jumpToRandomQuestion();
      if (event.key === '?') setShowShortcutHelp(true);
      if (event.key === 'Escape') setShowShortcutHelp(false);
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return undefined;

    const onScroll = () => setShowBackToTop(contentEl.scrollTop > 220);

    contentEl.addEventListener('scroll', onScroll);
    return () => contentEl.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.selectedModule, state.selectedType, currentPage]);

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

  const resetViewState = () => {
    updateState({
      page: 1,
      query: '',
      mcqFilter: 'all',
      showMasteredFlashcards: true,
    });
    setToast('Tampilan berhasil direset ke default.');
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

        <main className="content" ref={contentRef}>
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
              <button className="tab" onClick={() => setShowShortcutHelp(true)}>⌨️ Shortcut</button>
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
              <p>{typeSummary.title}</p>
              <strong>{typeProgressPercent}%</strong>
              <p>{typeSummary.done}/{typeSummary.total} selesai • {typeSummary.helper}</p>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${typeProgressPercent}%` }} />
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
            {canResetView && (
              <button className="ghost" onClick={resetViewState}>🔄 Reset tampilan</button>
            )}
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
            <p className="subtle-info">{filteredSummary} • Shortcut: ←/→ halaman, 1/2/3 ganti mode, R soal acak, Ctrl/Cmd+K fokus cari.</p>
          </section>

          {toast ? <div className="card toast" role="status" aria-live="polite">{toast}</div> : null}

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
            <label className="page-jump">
              <span>Ke halaman</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const nextPage = Number(e.target.value);
                  if (Number.isNaN(nextPage)) return;
                  updateState({ page: Math.max(1, Math.min(totalPages, nextPage)) });
                }}
              />
            </label>
            <button
              className="tab"
              onClick={() => updateState({ page: Math.min(totalPages, currentPage + 1) })}
              disabled={currentPage === totalPages}
            >
              Berikutnya →
            </button>
          </footer>

          {showBackToTop && (
            <button className="back-to-top" onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Kembali ke atas
            </button>
          )}

          {showShortcutHelp && (
            <div className="shortcut-overlay" role="dialog" aria-modal="true">
              <div className="shortcut-modal card">
                <h3>Panduan Shortcut</h3>
                <ul>
                  <li><strong>Ctrl/Cmd + K</strong> → fokus ke pencarian</li>
                  <li><strong>← / →</strong> → pindah halaman</li>
                  <li><strong>1 / 2 / 3</strong> → pindah tipe (MCQ/Essai/Flashcard)</li>
                  <li><strong>R</strong> → lompat ke soal acak</li>
                  <li><strong>?</strong> → buka bantuan ini</li>
                  <li><strong>Esc</strong> → tutup bantuan</li>
                </ul>
                <button className="ghost" onClick={() => setShowShortcutHelp(false)}>Tutup</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
