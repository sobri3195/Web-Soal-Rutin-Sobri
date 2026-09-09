const normalizeWhitespace = (value) => String(value ?? '').normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');

// Punctuation is ignored, but mathematical operators remain significant.
export const normalizeQuestionText = (value) => normalizeWhitespace(value)
  .replace(/[.,!?;:'"“”‘’()[\]{}]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export const normalizeOptionSet = (options) => [...options]
  .map(normalizeQuestionText)
  .sort()
  .join(' || ');

const tokenSet = (value) => new Set(normalizeQuestionText(value).split(' ').filter(Boolean));
const jaccard = (left, right) => {
  const a = tokenSet(left);
  const b = tokenSet(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
};

const stableOptionId = (questionId, index) => `${questionId}::option-${index + 1}`;

export const auditMcqBank = (items, { similarityThreshold = 0.88 } = {}) => {
  const ids = new Map();
  const exact = new Map();
  const active = [];
  const aliases = {};
  const duplicates = [];
  const review = [];
  const byFamily = new Map();

  items.forEach((raw) => {
    const options = raw.options || [];
    const structuralErrors = [];
    if (!raw.id) structuralErrors.push('missing-id');
    if (!raw.module || !raw.prompt || !raw.topic || !raw.difficulty) structuralErrors.push('missing-metadata');
    if (options.length < 2 || new Set(options.map(normalizeQuestionText)).size !== options.length) structuralErrors.push('invalid-options');
    if (!options.some((option) => normalizeQuestionText(option) === normalizeQuestionText(raw.answer))) structuralErrors.push('answer-not-in-options');
    if (!raw.explanation) structuralErrors.push('missing-explanation');

    const idOwner = ids.get(raw.id);
    const exactKey = normalizeQuestionText(raw.prompt);
    const exactOwner = exact.get(exactKey);
    if (idOwner || exactOwner || structuralErrors.length) {
      const canonicalId = idOwner?.id || exactOwner?.id || null;
      duplicates.push({ id: raw.id, module: raw.module, canonicalId, reasons: idOwner ? ['duplicate-id'] : exactOwner ? [normalizeOptionSet(exactOwner.options) === normalizeOptionSet(options) ? 'identical-content' : 'identical-question-text'] : structuralErrors });
      if (canonicalId && raw.id !== canonicalId) aliases[raw.id] = canonicalId;
      return;
    }

    const family = raw.family || `${raw.module}::${raw.topic}`;
    const candidate = {
      ...raw,
      family,
      subtopic: raw.subtopic || raw.topic,
      optionIds: options.map((_, index) => stableOptionId(raw.id, index)),
      correctOptionId: stableOptionId(raw.id, options.findIndex((option) => normalizeQuestionText(option) === normalizeQuestionText(raw.answer))),
    };
    const familyItems = byFamily.get(family) || [];
    familyItems.forEach((other) => {
      const score = jaccard(other.prompt, candidate.prompt);
      if (score >= similarityThreshold) review.push({ ids: [other.id, candidate.id], modules: [other.module, candidate.module], family, score: Number(score.toFixed(3)) });
    });
    familyItems.push(candidate);
    byFamily.set(family, familyItems);
    ids.set(candidate.id, candidate);
    exact.set(exactKey, candidate);
    active.push(candidate);
  });

  const modules = {};
  items.forEach((item) => { modules[item.module] ||= { initial: 0, active: 0, duplicates: 0, review: 0, added: 0 }; modules[item.module].initial += 1; });
  active.forEach((item) => { modules[item.module].active += 1; });
  duplicates.forEach((item) => { modules[item.module].duplicates += 1; });
  review.forEach((item) => new Set(item.modules).forEach((module) => { modules[module].review += 1; }));
  return { active, aliases, duplicates, review, report: modules };
};
