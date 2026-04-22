export const getMcqStats = (moduleMcq, mcqAnswers) => {
  const answeredCount = moduleMcq.filter((q) => mcqAnswers[q.id]).length;
  const correctCount = moduleMcq.filter((q) => mcqAnswers[q.id] === q.answer).length;
  const progressPercent = moduleMcq.length > 0 ? Math.round((answeredCount / moduleMcq.length) * 100) : 0;
  const accuracyRate = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return {
    answeredCount,
    correctCount,
    progressPercent,
    accuracyRate,
    remainingMcqCount: moduleMcq.length - answeredCount,
  };
};

export const getTypeSummary = ({
  selectedType,
  answeredCount,
  correctCount,
  remainingMcqCount,
  moduleMcqLength,
  essayAnsweredCount,
  moduleEssayLength,
  masteredFlashcardsCount,
  moduleFlashcardsLength,
}) => {
  if (selectedType === 'mcq') {
    return {
      title: 'Progress MCQ',
      done: answeredCount,
      total: moduleMcqLength,
      helper: `${correctCount} jawaban benar • ${remainingMcqCount} belum dijawab`,
    };
  }

  if (selectedType === 'essay') {
    return {
      title: 'Progress Essai',
      done: essayAnsweredCount,
      total: moduleEssayLength,
      helper: `${moduleEssayLength - essayAnsweredCount} essai belum terisi`,
    };
  }

  return {
    title: 'Progress Flashcard',
    done: masteredFlashcardsCount,
    total: moduleFlashcardsLength,
    helper: `${moduleFlashcardsLength - masteredFlashcardsCount} kartu belum dikuasai`,
  };
};

export const getReadinessScore = ({ accuracyRate, progressPercent, typeProgressPercent }) => Math.round(
  ((accuracyRate * 0.45) + (progressPercent * 0.35) + ((typeProgressPercent || 0) * 0.2)) || 0,
);

export const buildModuleCompletionMap = (moduleConfigs, moduleQuestionMap, mcqAnswers) => moduleConfigs.reduce((acc, module) => {
  const moduleQuestions = moduleQuestionMap[module.name]?.mcq || [];
  const moduleAnswered = moduleQuestions.filter((item) => mcqAnswers[item.id]).length;
  acc[module.name] = moduleQuestions.length
    ? Math.round((moduleAnswered / moduleQuestions.length) * 100)
    : 0;
  return acc;
}, {});
