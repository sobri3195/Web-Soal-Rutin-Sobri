export const MAX_IMPORT_FILE_SIZE = 1024 * 1024;

const asRecord = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});

export const isValidImportFile = (file) => {
  if (!file) return false;

  const hasJsonMime = file.type === 'application/json' || file.type === '';
  const hasJsonExtension = file.name?.toLowerCase().endsWith('.json');
  const validType = hasJsonMime || hasJsonExtension;

  return validType && file.size <= MAX_IMPORT_FILE_SIZE;
};

export const sanitizeImportedState = ({
  snapshot = {},
  initialState,
  modules,
  validTypes,
  validMcqFilters,
}) => {
  const safe = { ...initialState };

  if (typeof snapshot.selectedModule === 'string' && modules.includes(snapshot.selectedModule)) {
    safe.selectedModule = snapshot.selectedModule;
  }
  if (typeof snapshot.selectedType === 'string' && validTypes.includes(snapshot.selectedType)) {
    safe.selectedType = snapshot.selectedType;
  }

  safe.mcqAnswers = asRecord(snapshot.mcqAnswers);
  safe.mcqShowExplanation = asRecord(snapshot.mcqShowExplanation);
  safe.essayAnswers = asRecord(snapshot.essayAnswers);
  safe.flashcardFlips = asRecord(snapshot.flashcardFlips);
  safe.masteredFlashcards = asRecord(snapshot.masteredFlashcards);
  safe.favorites = asRecord(snapshot.favorites);

  if (typeof snapshot.query === 'string') {
    safe.query = snapshot.query;
  }
  if (typeof snapshot.page === 'number' && Number.isFinite(snapshot.page) && snapshot.page > 0) {
    safe.page = Math.floor(snapshot.page);
  }
  if (typeof snapshot.mcqFilter === 'string' && validMcqFilters.includes(snapshot.mcqFilter)) {
    safe.mcqFilter = snapshot.mcqFilter;
  }
  if (typeof snapshot.showMasteredFlashcards === 'boolean') {
    safe.showMasteredFlashcards = snapshot.showMasteredFlashcards;
  }
  if (typeof snapshot.showBookmarkedOnly === 'boolean') {
    safe.showBookmarkedOnly = snapshot.showBookmarkedOnly;
  }
  if (typeof snapshot.darkMode === 'boolean') {
    safe.darkMode = snapshot.darkMode;
  }

  return safe;
};
