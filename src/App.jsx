import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_QUESTION_COUNT_PER_MODULE,
  moduleConfigs,
  moduleQuestionMap,
  moduleResearchNotes,
  modules,
  PAGE_SIZE,
  questionBank,
} from './questionBank';
import {
  MAX_IMPORT_FILE_SIZE,
  isValidImportFile,
  sanitizeImportedState,
} from './utils/stateUtils';
import {
  buildModuleCompletionMap,
  getMcqStats,
  getReadinessScore,
  getTypeSummary,
} from './utils/progressUtils';

const STORAGE_KEY = 'sobri-practice-state-v4';
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
  favorites: {},
  query: '',
  page: 1,
  mcqFilter: 'all',
  showMasteredFlashcards: true,
  showBookmarkedOnly: false,
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

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;
    try {
      const parsed = JSON.parse(savedState);
      const safeParsed = sanitizeImportedState({
        snapshot: parsed,
        initialState,
        modules,
        validTypes: VALID_TYPES,
        validMcqFilters: VALID_MCQ_FILTERS,
      });
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
  const moduleResearch = moduleResearchNotes[state.selectedModule];

  const moduleMcq = moduleQuestionMap[state.selectedModule]?.mcq || [];
  const moduleEssay = moduleQuestionMap[state.selectedModule]?.essay || [];
  const moduleFlashcards = moduleQuestionMap[state.selectedModule]?.flashcards || [];
  const moduleFavorites = [...moduleMcq, ...moduleEssay, ...moduleFlashcards].filter((item) => state.favorites[item.id]).length;

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
      const matchesBookmark = !state.showBookmarkedOnly || !!state.favorites[item.id];

      if (state.selectedType !== 'mcq') {
        return matchesQuery && matchesBookmark;
      }

      const selectedAnswer = state.mcqAnswers[item.id];
      const matchesFilter =
        state.mcqFilter === 'all' ||
        (state.mcqFilter === 'unanswered' && !selectedAnswer) ||
        (state.mcqFilter === 'correct' && selectedAnswer === item.answer) ||
        (state.mcqFilter === 'wrong' && selectedAnswer && selectedAnswer !== item.answer);

      return matchesQuery && matchesFilter && matchesBookmark;
    });
  }, [state.selectedModule, state.selectedType, state.query, state.mcqAnswers, state.mcqFilter, state.showBookmarkedOnly, state.favorites]);

  const displayItems = useMemo(() => {
    if (state.selectedType !== 'flashcards' || state.showMasteredFlashcards) {
      return filteredItems;
    }
    return filteredItems.filter((item) => !state.masteredFlashcards[item.id]);
  }, [filteredItems, state.selectedType, state.showMasteredFlashcards, state.masteredFlashcards]);

  const totalPages = Math.max(1, Math.ceil(displayItems.length / PAGE_SIZE));
  const currentPage = Math.min(state.page, totalPages);
  const pagedItems = displayItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const { answeredCount, correctCount, progressPercent, accuracyRate, remainingMcqCount } = getMcqStats(
    moduleMcq,
    state.mcqAnswers,
  );
  const essayAnsweredCount = moduleEssay.filter((q) => (state.essayAnswers[q.id] || '').trim()).length;
  const masteredFlashcardsCount = moduleFlashcards.filter((q) => state.masteredFlashcards[q.id]).length;

  const filteredSummary = displayItems.length === filteredItems.length
    ? `${displayItems.length} item tampil`
    : `${displayItems.length} dari ${filteredItems.length} item tampil`;
  const canResetView = state.page > 1 || !!state.query || state.mcqFilter !== 'all' || !state.showMasteredFlashcards || state.showBookmarkedOnly;

  const typeSummary = getTypeSummary({
    selectedType: state.selectedType,
    answeredCount,
    correctCount,
    remainingMcqCount,
    moduleMcqLength: moduleMcq.length,
    essayAnsweredCount,
    moduleEssayLength: moduleEssay.length,
    masteredFlashcardsCount,
    moduleFlashcardsLength: moduleFlashcards.length,
  });
  const typeProgressPercent = typeSummary.total > 0 ? Math.round((typeSummary.done / typeSummary.total) * 100) : 0;
  const readinessScore = getReadinessScore({ accuracyRate, progressPercent, typeProgressPercent });

  const moduleCompletionMap = useMemo(() => {
    return buildModuleCompletionMap(moduleConfigs, moduleQuestionMap, state.mcqAnswers);
  }, [state.mcqAnswers]);

  const overallFavorites = Object.values(state.favorites).filter(Boolean).length;
  const nextAction = state.selectedType === 'mcq'
    ? remainingMcqCount > 0
      ? `Selesaikan ${remainingMcqCount} MCQ tersisa agar progress modul menyentuh 100%.`
      : 'Semua MCQ di modul ini sudah selesai. Lanjutkan review jawaban salah untuk menaikkan akurasi.'
    : state.selectedType === 'essay'
      ? essayAnsweredCount < moduleEssay.length
        ? `Masih ada ${moduleEssay.length - essayAnsweredCount} essai kosong. Isi poin-poin penting lalu rapikan argumen.`
        : 'Semua essai sudah terisi. Sekarang fokus revisi kualitas jawaban terbaikmu.'
      : masteredFlashcardsCount < moduleFlashcards.length
        ? `Masih ada ${moduleFlashcards.length - masteredFlashcardsCount} flashcard belum dikuasai. Gunakan filter bookmark untuk fokus review.`
        : 'Semua flashcard sudah dikuasai. Pertahankan dengan sesi review acak.';

  const jumpToRandomQuestion = () => {
    if (!displayItems.length) return;
    const randomIndex = Math.floor(Math.random() * displayItems.length);
    updateState({ page: Math.floor(randomIndex / PAGE_SIZE) + 1 });
  };

  const jumpToItem = (itemId) => {
    const targetIndex = displayItems.findIndex((item) => item.id === itemId);
    if (targetIndex === -1) return;
    updateState({ page: Math.floor(targetIndex / PAGE_SIZE) + 1 });
    setToast('Navigasi soal diperbarui.');
  };

  const jumpToFirstUnanswered = () => {
    if (state.selectedType !== 'mcq') return;
    const firstUnansweredIndex = moduleMcq.findIndex((q) => !state.mcqAnswers[q.id]);
    if (firstUnansweredIndex === -1) {
      setToast('Semua MCQ sudah terjawab. Mantap! 🎉');
      return;
    }
    updateState({ mcqFilter: 'all', page: Math.floor(firstUnansweredIndex / PAGE_SIZE) + 1, showBookmarkedOnly: false });
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
    updateState({ mcqFilter: 'wrong', page: 1, showBookmarkedOnly: false });
    setToast(`Review soal salah dimulai dari #${firstWrongIndex + 1}`);
  };

  const jumpToFirstUnansweredEssay = () => {
    if (state.selectedType !== 'essay') return;
    const firstUnansweredIndex = moduleEssay.findIndex((q) => !(state.essayAnswers[q.id] || '').trim());
    if (firstUnansweredIndex === -1) {
      setToast('Semua essai di modul ini sudah terisi. Mantap! 🎉');
      return;
    }
    updateState({ page: Math.floor(firstUnansweredIndex / PAGE_SIZE) + 1, showBookmarkedOnly: false });
    setToast(`Lanjut ke essai #${firstUnansweredIndex + 1}`);
  };

  const jumpToFirstUnmasteredFlashcard = () => {
    if (state.selectedType !== 'flashcards') return;
    const firstUnmasteredIndex = moduleFlashcards.findIndex((card) => !state.masteredFlashcards[card.id]);
    if (firstUnmasteredIndex === -1) {
      setToast('Semua flashcard di modul ini sudah dikuasai. Keren! 🌟');
      return;
    }
    updateState({ showMasteredFlashcards: false, showBookmarkedOnly: false, page: 1 });
    setToast(`Fokus ulang dari kartu #${firstUnmasteredIndex + 1}`);
  };

  const toggleFavorite = (itemId) => {
    const nextValue = !state.favorites[itemId];
    updateState({
      favorites: {
        ...state.favorites,
        [itemId]: nextValue,
      },
    });
    setToast(nextValue ? 'Item ditandai sebagai favorit.' : 'Item dihapus dari favorit.');
  };

  const clearMcqAnswer = (questionId) => {
    const nextAnswers = { ...state.mcqAnswers };
    const nextExplanations = { ...state.mcqShowExplanation };
    delete nextAnswers[questionId];
    delete nextExplanations[questionId];
    updateState({ mcqAnswers: nextAnswers, mcqShowExplanation: nextExplanations });
    setToast('Jawaban MCQ dibersihkan.');
  };

  const clearEssayAnswer = (questionId) => {
    const nextAnswers = { ...state.essayAnswers };
    delete nextAnswers[questionId];
    updateState({ essayAnswers: nextAnswers });
    setToast('Jawaban essai dibersihkan.');
  };

  const markFlashcardReview = (cardId) => {
    updateState({
      flashcardFlips: {
        ...state.flashcardFlips,
        [cardId]: true,
      },
      masteredFlashcards: {
        ...state.masteredFlashcards,
        [cardId]: false,
      },
    });
    setToast('Flashcard dipindahkan ke antrian review.');
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
      if (event.key.toLowerCase() === 'b') updateState({ showBookmarkedOnly: !state.showBookmarkedOnly, page: 1 });
      if (event.key === '?') setShowShortcutHelp(true);
      if (event.key === 'Escape') setShowShortcutHelp(false);
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [currentPage, totalPages, state.showBookmarkedOnly]);

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
      favorites: filteredObject(state.favorites, new Set([...moduleQuestionIds, ...moduleEssayIds, ...moduleFlashcardIds])),
      page: 1,
      query: '',
      mcqFilter: 'all',
      showBookmarkedOnly: false,
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
    updateState({ selectedModule: moduleName, page: 1, query: '', mcqFilter: 'all', showBookmarkedOnly: false });
  };

  const onChangeType = (type) => {
    updateState({ selectedType: type, page: 1, query: '', mcqFilter: 'all', showBookmarkedOnly: false });
  };

  const resetViewState = () => {
    updateState({
      page: 1,
      query: '',
      mcqFilter: 'all',
      showMasteredFlashcards: true,
      showBookmarkedOnly: false,
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
        favorites: state.favorites,
        query: '',
        page: 1,
        mcqFilter: 'all',
        showMasteredFlashcards: state.showMasteredFlashcards,
        showBookmarkedOnly: state.showBookmarkedOnly,
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
        favorites: moduleFavorites,
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
    if (!isValidImportFile(file)) {
      setToast(`File import harus JSON dan maksimal ${Math.round(MAX_IMPORT_FILE_SIZE / 1024)}KB.`);
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.stateSnapshot) {
        throw new Error('Invalid file format');
      }

      const safeData = sanitizeImportedState({
        snapshot: parsed.stateSnapshot,
        initialState,
        modules,
        validTypes: VALID_TYPES,
        validMcqFilters: VALID_MCQ_FILTERS,
      });

      setState((prev) => ({ ...prev, ...safeData }));
      setToast('Progress berhasil di-import.');
    } catch {
      setToast('File import tidak valid. Gunakan file hasil export aplikasi.');
    }
  };

  const getItemStatus = (item) => {
    if (state.selectedType === 'mcq') {
      const selected = state.mcqAnswers[item.id];
      if (!selected) return 'pending';
      return selected === item.answer ? 'correct' : 'wrong';
    }
    if (state.selectedType === 'essay') {
      return (state.essayAnswers[item.id] || '').trim() ? 'answered' : 'pending';
    }
    return state.masteredFlashcards[item.id] ? 'mastered' : state.flashcardFlips[item.id] ? 'reviewing' : 'pending';
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
              {moduleResearch && (
                <div className="research-note">
                  <strong>Riset blueprint</strong>
                  <p>{moduleResearch.summary}</p>
                  <ul>
                    {moduleResearch.priorities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="research-links">
                    {moduleResearch.sources.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                        {source.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
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

          <section className="insight-grid">
            <article className="card progress-panel">
              <div>
                <p>{typeSummary.title}</p>
                <strong>{typeProgressPercent}%</strong>
                <p>{typeSummary.done}/{typeSummary.total} selesai • {typeSummary.helper}</p>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${typeProgressPercent}%` }} />
              </div>
            </article>
            <article className="card progress-panel">
              <div>
                <p>Readiness score</p>
                <strong>{readinessScore}%</strong>
                <p>{moduleFavorites} favorit di modul ini • {overallFavorites} favorit total</p>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill warm" style={{ width: `${Math.min(readinessScore, 100)}%` }} />
              </div>
            </article>
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
            <label className="toggle-label bookmark-toggle">
              <input
                type="checkbox"
                checked={state.showBookmarkedOnly}
                onChange={(e) => updateState({ showBookmarkedOnly: e.target.checked, page: 1 })}
              />
              Hanya favorit
            </label>
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

          <section className="insight-grid compact-grid">
            <article className="card progress-panel">
              <p>
                Ringkas cepat: {remainingMcqCount} MCQ belum dijawab di modul ini.
                Gunakan tombol <strong>Review jawaban salah</strong> untuk fokus perbaikan.
              </p>
              <p className="subtle-info">{filteredSummary} • Shortcut: ←/→ halaman, 1/2/3 ganti mode, R soal acak, B toggle favorit, Ctrl/Cmd+K fokus cari.</p>
            </article>
            <article className="card progress-panel">
              <p><strong>Rekomendasi belajar berikutnya</strong></p>
              <p>{nextAction}</p>
              <p className="subtle-info">Favorit cocok untuk menandai soal jebakan, template jawaban essai, atau flashcard yang ingin direview lagi.</p>
            </article>
          </section>

          {displayItems.length > 0 && (
            <section className="card progress-panel">
              <div className="question-map-header">
                <div>
                  <p>Peta navigasi cepat</p>
                  <strong>{state.selectedType === 'flashcards' ? 'Flashcard Navigator' : 'Question Navigator'}</strong>
                </div>
                <p className="subtle-info">Klik nomor untuk lompat langsung. Warna menandakan status pengerjaan.</p>
              </div>
              <div className="question-map">
                {displayItems.map((item, index) => {
                  const status = getItemStatus(item);
                  const isFavorite = !!state.favorites[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`question-chip ${status} ${pagedItems.some((entry) => entry.id === item.id) ? 'active' : ''}`}
                      onClick={() => jumpToItem(item.id)}
                      title={isFavorite ? 'Favorit' : 'Klik untuk lompat'}
                    >
                      <span>{index + 1}</span>
                      {isFavorite ? <small>★</small> : null}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {toast ? <div className="card toast" role="status" aria-live="polite">{toast}</div> : null}

          {displayItems.length === 0 ? (
            <div className="card empty">
              {state.selectedType === 'flashcards' && !state.showMasteredFlashcards
                ? 'Semua flashcard sudah dikuasai! 🎉 Atau coba aktifkan "Tampilkan yang sudah dikuasai"'
                : state.showBookmarkedOnly
                  ? 'Belum ada item favorit pada tampilan ini. Tambahkan bintang pada soal atau kartu yang ingin kamu simpan.'
                  : 'Tidak ada konten sesuai pencarian. Coba kata kunci lain.'}
            </div>
          ) : null}

          {state.selectedType === 'mcq' &&
            pagedItems.map((q, index) => {
              const selected = state.mcqAnswers[q.id];
              const isCorrect = selected === q.answer;
              const showExplanation = state.mcqShowExplanation[q.id];
              return (
                <section className="card" key={q.id}>
                  <div className="question-header">
                    <span className="question-number">Soal {(currentPage - 1) * PAGE_SIZE + index + 1}</span>
                    <div className="question-actions-inline">
                      <button className={state.favorites[q.id] ? 'ghost small starred' : 'ghost small'} onClick={() => toggleFavorite(q.id)}>
                        {state.favorites[q.id] ? '★ Favorit' : '☆ Favorit'}
                      </button>
                      {selected && (
                        <span className={`status-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                          {isCorrect ? '✓ Benar' : '✗ Salah'}
                        </span>
                      )}
                    </div>
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
                      <div className="inline-actions-wrap">
                        <button
                          className="ghost small"
                          onClick={() => toggleExplanation(q.id)}
                        >
                          {showExplanation ? 'Sembunyikan penjelasan' : 'Lihat penjelasan'}
                        </button>
                        <button className="ghost small" onClick={() => clearMcqAnswer(q.id)}>
                          ↺ Ulangi soal ini
                        </button>
                      </div>
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
            pagedItems.map((q, index) => {
              const wordCount = (state.essayAnswers[q.id] || '').trim().split(/\s+/).filter(Boolean).length;
              const charCount = (state.essayAnswers[q.id] || '').length;
              return (
                <section className="card" key={q.id}>
                  <div className="question-header">
                    <span className="question-number">Soal {(currentPage - 1) * PAGE_SIZE + index + 1}</span>
                    <div className="question-actions-inline">
                      <button className={state.favorites[q.id] ? 'ghost small starred' : 'ghost small'} onClick={() => toggleFavorite(q.id)}>
                        {state.favorites[q.id] ? '★ Favorit' : '☆ Favorit'}
                      </button>
                      {wordCount > 0 && (
                        <span className="status-badge answered">
                          {wordCount} kata
                        </span>
                      )}
                    </div>
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
                  <div className="inline-actions-wrap top-space">
                    <button className="ghost small" onClick={() => clearEssayAnswer(q.id)}>
                      🧹 Bersihkan jawaban
                    </button>
                    <button
                      className="ghost small"
                      onClick={() =>
                        updateState({
                          essayAnswers: {
                            ...state.essayAnswers,
                            [q.id]: `${state.essayAnswers[q.id] ? `${state.essayAnswers[q.id]}\n\n` : ''}Kerangka jawaban:\n1. Ide utama\n2. Argumen/analisis\n3. Contoh atau data pendukung\n4. Kesimpulan`,
                          },
                        })
                      }
                    >
                      🧩 Sisipkan kerangka jawaban
                    </button>
                  </div>
                  <p className="subtle-info">
                    {wordCount} kata • {charCount} karakter
                    {wordCount < 10 && wordCount > 0 && ' (tambahkan lebih banyak untuk jawaban yang lengkap)'}
                  </p>
                </section>
              );
            })}

          {state.selectedType === 'flashcards' &&
            pagedItems.map((card, index) => {
              const flipped = !!state.flashcardFlips[card.id];
              const mastered = !!state.masteredFlashcards[card.id];
              return (
                <section key={card.id} className={`card flashcard-wrapper ${mastered ? 'mastered-card' : ''}`}>
                  <div className="question-header">
                    <span className="question-number">Kartu {(currentPage - 1) * PAGE_SIZE + index + 1}</span>
                    <div className="question-actions-inline">
                      <button className={state.favorites[card.id] ? 'ghost small starred' : 'ghost small'} onClick={() => toggleFavorite(card.id)}>
                        {state.favorites[card.id] ? '★ Favorit' : '☆ Favorit'}
                      </button>
                      {mastered && <span className="status-badge mastered">✓ Dikuasai</span>}
                    </div>
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
                    <button className="ghost" onClick={() => markFlashcardReview(card.id)}>
                      🔁 Tandai review ulang
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
                  <li><strong>B</strong> → aktif/nonaktif filter favorit</li>
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
