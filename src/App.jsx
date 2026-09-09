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
  getTypeSummary,
} from './utils/progressUtils';

const STORAGE_KEY = 'sobri-practice-state-v4';
const VALID_TYPES = ['mcq', 'essay', 'flashcards'];
const VALID_MCQ_FILTERS = ['all', 'unanswered', 'correct', 'wrong'];

// Bank soal memakai notasi teks seperti x^2 dan a_1. Renderer kecil ini menjaga
// nilai sumber tetap utuh sambil menyajikan pangkat/indeks secara semantik.
function MathText({ children }) {
  const text = String(children ?? '');
  const parts = text.split(/([_^](?:\{[^}]+\}|-?\d+(?:\.\d+)?|[A-Za-z]))/g);
  return parts.map((part, index) => {
    if (part.startsWith('^')) return <sup key={`${part}-${index}`}>{part.slice(1).replace(/[{}]/g, '')}</sup>;
    if (part.startsWith('_')) return <sub key={`${part}-${index}`}>{part.slice(1).replace(/[{}]/g, '')}</sub>;
    return part;
  });
}

const initialState = {
  selectedModule: modules[0],
  selectedType: 'mcq',
  mcqAnswers: {},
  mcqSelections: {},
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
  shuffleSeed: Date.now(),
  darkMode: true,
  viewMode: 'focus',
};

function App() {
  const [state, setState] = useState(initialState);
  const [toast, setToast] = useState('');
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState('');
  const [jumpError, setJumpError] = useState('');
  const [moduleQuery, setModuleQuery] = useState('');
  const importInputRef = useRef(null);
  const searchInputRef = useRef(null);

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

  const shuffledItems = useMemo(() => {
    const list = [...filteredItems];
    if (list.length <= 1) return list;
    let seed = Math.abs(Number(state.shuffleSeed) || 1);
    for (let i = list.length - 1; i > 0; i -= 1) {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      const j = seed % (i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [filteredItems, state.shuffleSeed]);

  const displayItems = useMemo(() => {
    if (state.selectedType !== 'flashcards' || state.showMasteredFlashcards) {
      return shuffledItems;
    }
    return shuffledItems.filter((item) => !state.masteredFlashcards[item.id]);
  }, [shuffledItems, state.selectedType, state.showMasteredFlashcards, state.masteredFlashcards]);

  const itemsPerPage = state.viewMode === 'list' ? PAGE_SIZE : 1;
  const totalPages = Math.max(1, Math.ceil(displayItems.length / itemsPerPage));
  const currentPage = Math.min(state.page, totalPages);
  const activeIndex = Math.min(displayItems.length - 1, (currentPage - 1) * itemsPerPage);
  const pagedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const navigatorGroup = Math.max(0, Math.floor(Math.max(0, activeIndex) / 25));
  const navigatorStart = navigatorGroup * 25;
  const navigatorItems = displayItems.slice(navigatorStart, navigatorStart + 25);
  const navigatorGroups = Math.max(1, Math.ceil(displayItems.length / 25));

  const { answeredCount, correctCount, accuracyRate, remainingMcqCount } = getMcqStats(
    moduleMcq,
    state.mcqAnswers,
  );
  const essayAnsweredCount = moduleEssay.filter((q) => (state.essayAnswers[q.id] || '').trim()).length;
  const masteredFlashcardsCount = moduleFlashcards.filter((q) => state.masteredFlashcards[q.id]).length;

  const filteredSummary = displayItems.length === filteredItems.length
    ? `${displayItems.length} item tampil`
    : `${displayItems.length} dari ${filteredItems.length} item tampil`;

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

  const moduleCompletionMap = useMemo(() => {
    return buildModuleCompletionMap(moduleConfigs, moduleQuestionMap, state.mcqAnswers);
  }, [state.mcqAnswers]);
  const visibleModules = moduleConfigs.filter((module) =>
    `${module.name} ${module.tag}`.toLowerCase().includes(moduleQuery.trim().toLowerCase()),
  );

  const overallFavorites = Object.values(state.favorites).filter(Boolean).length;
  const nextAction = state.selectedType === 'mcq'
    ? remainingMcqCount > 0
      ? `Lanjutkan sesi ringan: kerjakan ${Math.min(10, remainingMcqCount)} dari ${remainingMcqCount} MCQ yang masih tersisa.`
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
    updateState({ page: Math.floor(randomIndex / itemsPerPage) + 1 });
  };

  const reshuffleQuestions = () => {
    updateState({ shuffleSeed: Date.now(), page: 1 });
    setToast('Urutan soal diacak ulang.');
  };

  const jumpToItem = (itemId) => {
    const targetIndex = displayItems.findIndex((item) => item.id === itemId);
    if (targetIndex === -1) return;
    updateState({ page: Math.floor(targetIndex / itemsPerPage) + 1 });
    setToast('Navigasi soal diperbarui.');
  };

  const jumpToNumber = (event) => {
    event.preventDefault();
    const number = Number(jumpValue);
    if (!Number.isInteger(number) || number < 1 || number > displayItems.length) {
      setJumpError(`Masukkan nomor 1–${displayItems.length}.`);
      return;
    }
    setJumpError('');
    jumpToItem(displayItems[number - 1].id);
    setNavigatorOpen(false);
  };

  const changeViewMode = (viewMode) => {
    const currentItem = pagedItems[0];
    const targetIndex = currentItem ? displayItems.findIndex((item) => item.id === currentItem.id) : 0;
    const nextPerPage = viewMode === 'list' ? PAGE_SIZE : 1;
    updateState({ viewMode, page: Math.floor(Math.max(0, targetIndex) / nextPerPage) + 1 });
  };

  const assessMcq = (question) => {
    const selection = state.mcqSelections[question.id];
    if (!selection) {
      setToast('Pilih satu jawaban terlebih dahulu.');
      return;
    }
    updateState({ mcqAnswers: { ...state.mcqAnswers, [question.id]: selection } });
  };

  const jumpToFirstUnanswered = () => {
    if (state.selectedType !== 'mcq') return;
    const firstUnansweredIndex = moduleMcq.findIndex((q) => !state.mcqAnswers[q.id]);
    if (firstUnansweredIndex === -1) {
      setToast('Semua MCQ sudah terjawab. Mantap! 🎉');
      return;
    }
    updateState({ mcqFilter: 'all', page: Math.floor(firstUnansweredIndex / itemsPerPage) + 1, showBookmarkedOnly: false });
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
    updateState({ page: Math.floor(firstUnansweredIndex / itemsPerPage) + 1, showBookmarkedOnly: false });
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
    const nextSelections = { ...state.mcqSelections };
    delete nextSelections[questionId];
    updateState({ mcqAnswers: nextAnswers, mcqSelections: nextSelections, mcqShowExplanation: nextExplanations });
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
      if (event.key === 'Escape') {
        setShowShortcutHelp(false);
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [currentPage, totalPages, state.showBookmarkedOnly]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 220);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.selectedModule, state.selectedType, currentPage]);

  const resetCurrentType = () => {
    const typeLabel = state.selectedType === 'mcq' ? 'MCQ' : state.selectedType === 'essay' ? 'Essai' : 'Flashcard';
    const proceed = window.confirm(`Reset semua data ${typeLabel} pada modul aktif?`);
    if (!proceed) return;

    if (state.selectedType === 'mcq') {
      const nextAnswers = { ...state.mcqAnswers };
      const nextSelections = { ...state.mcqSelections };
      const nextExplanations = { ...state.mcqShowExplanation };
      moduleMcq.forEach((q) => {
        delete nextAnswers[q.id];
        delete nextSelections[q.id];
        delete nextExplanations[q.id];
      });
      updateState({ mcqAnswers: nextAnswers, mcqSelections: nextSelections, mcqShowExplanation: nextExplanations });
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
      mcqSelections: filteredObject(state.mcqSelections, moduleQuestionIds),
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
    setSidebarOpen(false);
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
        mcqSelections: state.mcqSelections,
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
        viewMode: state.viewMode,
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

      const mcqById = new Map(questionBank.mcq.map((item) => [item.id, item]));
      const essayIds = new Set(questionBank.essay.map((item) => item.id));
      const flashcardIds = new Set(questionBank.flashcards.map((item) => item.id));
      const allIds = new Set([...mcqById.keys(), ...essayIds, ...flashcardIds]);
      safeData.mcqAnswers = Object.fromEntries(Object.entries(safeData.mcqAnswers)
        .filter(([id, answer]) => mcqById.get(id)?.options.includes(answer)));
      safeData.mcqSelections = Object.fromEntries(Object.entries(safeData.mcqSelections)
        .filter(([id, answer]) => mcqById.get(id)?.options.includes(answer)));
      safeData.mcqShowExplanation = Object.fromEntries(Object.entries(safeData.mcqShowExplanation)
        .filter(([id, value]) => mcqById.has(id) && typeof value === 'boolean'));
      safeData.essayAnswers = Object.fromEntries(Object.entries(safeData.essayAnswers)
        .filter(([id, answer]) => essayIds.has(id) && typeof answer === 'string'));
      safeData.flashcardFlips = Object.fromEntries(Object.entries(safeData.flashcardFlips)
        .filter(([id, value]) => flashcardIds.has(id) && typeof value === 'boolean'));
      safeData.masteredFlashcards = Object.fromEntries(Object.entries(safeData.masteredFlashcards)
        .filter(([id, value]) => flashcardIds.has(id) && typeof value === 'boolean'));
      safeData.favorites = Object.fromEntries(Object.entries(safeData.favorites)
        .filter(([id, value]) => allIds.has(id) && typeof value === 'boolean'));

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
      <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Buka daftar modul" aria-expanded={sidebarOpen}>☰ <span>Modul</span></button>
      {sidebarOpen && <button className="drawer-overlay" aria-label="Tutup menu modul" onClick={() => setSidebarOpen(false)} />}
      <div className="layout">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Navigasi modul">
          <div className="sidebar-title"><h1>Sobri Practice Hub</h1><button className="drawer-close ghost" onClick={() => setSidebarOpen(false)} aria-label="Tutup menu">✕</button></div>
          <p className="subtle">{moduleQuestionCount} soal pada modul aktif • responsif • autosave</p>
          <label className="module-search"><span className="sr-only">Cari modul</span><input value={moduleQuery} onChange={(e) => setModuleQuery(e.target.value)} placeholder="Cari modul..." /></label>
          <div className="menu-group">
            {visibleModules.map((module) => (
              <button
                key={module.name}
                className={state.selectedModule === module.name ? 'active menu-btn' : 'menu-btn'}
                onClick={() => onChangeModule(module.name)}
                aria-current={state.selectedModule === module.name ? 'page' : undefined}
              >
                <strong>{module.name}</strong>
                <small>{module.tag}</small>
                <small>Progress MCQ {moduleCompletionMap[module.name] || 0}%</small>
              </button>
            ))}
            {!visibleModules.length && <p className="sidebar-empty">Modul tidak ditemukan.</p>}
          </div>
          <div className="sidebar-footer">
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              onChange={importProgress}
              style={{ display: 'none' }}
            />
            <details className="settings"><summary>⚙️ Pengaturan & data</summary><div className="settings-actions">
              <button className="ghost" onClick={() => updateState({ darkMode: !state.darkMode })}>{state.darkMode ? '☀️ Tema terang' : '🌙 Tema gelap'}</button>
              <button className="ghost" onClick={exportProgress}>↗ Ekspor progres</button>
              <button className="ghost" onClick={triggerImportProgress}>↙ Impor progres</button>
              <button className="ghost" onClick={resetViewState}>↺ Reset tampilan</button>
              <button className="ghost danger" onClick={resetCurrentType}>Reset tipe aktif</button>
              <button className="ghost danger" onClick={resetModuleProgress}>Reset modul aktif</button>
              <button className="ghost danger" onClick={resetAllProgress}>Reset semua progres</button>
            </div></details>
          </div>
        </aside>

        <main className="content">
          <header>
            <div>
              <h2>{state.selectedModule}</h2>
              <p>{moduleMeta?.tag}</p>
              {moduleResearch && (
                <details className="research-note">
                  <summary><strong>Riset blueprint</strong><span>Buka referensi modul</span></summary>
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
                </details>
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
              <span>{typeSummary.title.replace('Progress ', '')}</span>
              <strong>{typeSummary.total} item</strong>
            </article>
            <article className="stat-card">
              <span>{state.selectedType === 'flashcards' ? 'Dikuasai' : 'Terjawab'}</span>
              <strong>{typeSummary.done}/{typeSummary.total}</strong>
            </article>
            <article className="stat-card">
              <span>Akurasi</span>
              <strong>{state.selectedType === 'mcq' ? (answeredCount ? `${accuracyRate}%` : '—') : '—'}</strong>
            </article>
            <article className="stat-card">
              <span>Progress</span>
              <strong>{typeProgressPercent}%</strong>
            </article>
          </section>

          <section className="toolbar card" aria-label="Pencarian dan tindakan soal">
            <div className="toolbar-filters">
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
            </div>
            <div className="toolbar-actions">
            <div className="view-switch" role="group" aria-label="Mode tampilan soal">
              <button className={state.viewMode === 'focus' ? 'ghost active' : 'ghost'} onClick={() => changeViewMode('focus')}>▣ Satu soal</button>
              <button className={state.viewMode === 'list' ? 'ghost active' : 'ghost'} onClick={() => changeViewMode('list')}>☷ Mode daftar</button>
            </div>
            <button className="ghost" onClick={jumpToRandomQuestion}>🎲 Soal acak</button>
            <button className="ghost" onClick={reshuffleQuestions}>🔀 Acak ulang urutan</button>
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
            </div>
          </section>

          {displayItems.length > 0 && (
            <section className="card progress-panel">
              <div className="question-map-header">
                <div>
                  <p>Peta navigasi cepat</p>
                  <strong>{state.selectedType === 'flashcards' ? 'Flashcard Navigator' : 'Question Navigator'}</strong>
                </div>
                <button className="ghost navigator-toggle" onClick={() => setNavigatorOpen((open) => !open)} aria-expanded={navigatorOpen}>☷ {navigatorOpen ? 'Tutup navigator' : 'Buka navigator'}</button>
              </div>
              <div className={navigatorOpen ? 'navigator-body open' : 'navigator-body'}>
              <div className="navigator-controls">
                <button className="ghost small" disabled={navigatorGroup === 0} onClick={() => jumpToItem(displayItems[Math.max(0, navigatorStart - 25)].id)}>← Kelompok</button>
                <span>Nomor {navigatorStart + 1}–{Math.min(navigatorStart + 25, displayItems.length)} dari {displayItems.length}</span>
                <button className="ghost small" disabled={navigatorGroup >= navigatorGroups - 1} onClick={() => jumpToItem(displayItems[Math.min(displayItems.length - 1, navigatorStart + 25)].id)}>Kelompok →</button>
              </div>
              <div className="question-map">
                {navigatorItems.map((item, index) => {
                  const status = getItemStatus(item);
                  const isFavorite = !!state.favorites[item.id];
                  const itemNumber = navigatorStart + index + 1;
                  const statusText = status === 'pending' ? 'Belum dijawab' : status === 'answered' ? 'Sudah dijawab' : status === 'correct' ? 'Benar' : status === 'wrong' ? 'Salah' : status === 'mastered' ? 'Dikuasai' : 'Ditinjau';
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`question-chip ${status} ${pagedItems.some((entry) => entry.id === item.id) ? 'active' : ''}`}
                      onClick={() => jumpToItem(item.id)}
                      title={`${statusText}${isFavorite ? ', favorit' : ''}`}
                      aria-label={`Soal ${itemNumber}: ${statusText}${isFavorite ? ', favorit' : ''}`}
                    >
                      <span>{itemNumber}</span>
                      <small aria-hidden="true">{isFavorite ? '★' : status === 'pending' ? '○' : status === 'correct' ? '✓' : status === 'wrong' ? '×' : '●'}</small>
                    </button>
                  );
                })}
              </div>
              <div className="navigator-legend"><span>▣ Aktif</span><span>○ Belum dijawab</span><span>● Sudah dijawab</span><span>★ Favorit</span></div>
              <form className="jump-form" onSubmit={jumpToNumber} noValidate>
                <label htmlFor="jump-question">Lompat ke soal</label>
                <input id="jump-question" type="number" min="1" max={displayItems.length} value={jumpValue} onChange={(e) => { setJumpValue(e.target.value); setJumpError(''); }} placeholder={`1–${displayItems.length}`} aria-invalid={!!jumpError} aria-describedby={jumpError ? 'jump-error' : undefined} />
                <button className="ghost" type="submit">Lompat</button>
                {jumpError && <span className="field-error" id="jump-error" role="alert">{jumpError}</span>}
              </form>
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
              const selected = state.mcqSelections[q.id] || state.mcqAnswers[q.id];
              const assessed = state.mcqAnswers[q.id];
              const isCorrect = assessed === q.answer;
              const showExplanation = state.mcqShowExplanation[q.id];
              return (
                <section className="card" key={q.id}>
                  <div className="question-header">
                    <div className="question-meta"><span className="question-number">Soal {(currentPage - 1) * itemsPerPage + index + 1}</span><span>{q.prompt.match(/^\[([^\]]+)\]/)?.[1] || moduleMeta?.tag}</span></div>
                    <div className="question-actions-inline">
                      <button className={state.favorites[q.id] ? 'ghost small starred' : 'ghost small'} onClick={() => toggleFavorite(q.id)}>
                        {state.favorites[q.id] ? '★ Favorit' : '☆ Favorit'}
                      </button>
                      {assessed && (
                        <span className={`status-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                          {isCorrect ? '✓ Benar' : '✗ Salah'}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3><MathText>{q.prompt}</MathText></h3>
                  <div className="stack">
                    {q.options.map((option, optionIndex) => (
                      <label
                        key={option}
                        className={`option ${selected === option ? 'selected-option' : ''} ${assessed ? (option === q.answer ? 'correct-answer' : (option === assessed && option !== q.answer ? 'wrong-answer' : '')) : ''}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={selected === option}
                          onChange={() =>
                            updateState({
                              mcqSelections: { ...state.mcqSelections, [q.id]: option },
                              ...(assessed ? { mcqAnswers: Object.fromEntries(Object.entries(state.mcqAnswers).filter(([id]) => id !== q.id)), mcqShowExplanation: { ...state.mcqShowExplanation, [q.id]: false } } : {}),
                            })
                          }
                        />
                        <strong className="option-letter">{String.fromCharCode(65 + optionIndex)}</strong><span><MathText>{option}</MathText></span>
                      </label>
                    ))}
                  </div>
                  {!assessed && <button className="assess-button tab" onClick={() => assessMcq(q)} disabled={!selected}>Periksa jawaban</button>}
                  {assessed ? (
                    <div className="feedback-section">
                      <p className={isCorrect ? 'ok' : 'wrong'}>
                        {isCorrect ? 'Jawaban benar! ✅' : `Jawabanmu: "${assessed}" — Belum tepat. Jawaban benar: "${q.answer}"`}
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
                          <p><MathText>{q.explanation}</MathText></p>
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
                    <span className="question-number">Soal {(currentPage - 1) * itemsPerPage + index + 1}</span>
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
                  <h3><MathText>{q.prompt}</MathText></h3>
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
                    <span className="question-number">Kartu {(currentPage - 1) * itemsPerPage + index + 1}</span>
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

          <section className="insight-grid learning-summary" aria-label="Ringkasan belajar">
            <article className="card progress-panel">
              <p><strong>Ringkasan sesi</strong></p>
              <p>{typeSummary.done} dari {typeSummary.total} item selesai. {typeSummary.helper}.</p>
              <p className="subtle-info">{filteredSummary} • Progres tersimpan otomatis di perangkat ini.</p>
            </article>
            <article className="card progress-panel">
              <p><strong>Rekomendasi belajar berikutnya</strong></p>
              <p>{nextAction}</p>
              <p className="subtle-info">{moduleFavorites} favorit di modul ini • {overallFavorites} favorit di seluruh modul.</p>
            </article>
          </section>

          {showBackToTop && (
            <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
