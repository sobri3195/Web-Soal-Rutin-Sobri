export const shuffleIds = (ids, random = Math.random) => {
  const result = [...ids];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
};

export const reconcileCycle = (cycle, eligibleIds, random = Math.random) => {
  const eligible = new Set(eligibleIds);
  const previous = cycle || { order: [], displayed: [], position: 0, cycleNumber: 1 };
  const displayed = previous.displayed.filter((id) => eligible.has(id));
  const known = new Set(previous.order);
  const additions = eligibleIds.filter((id) => !known.has(id) && !displayed.includes(id));
  const order = [...previous.order.filter((id) => eligible.has(id)), ...shuffleIds(additions, random)];
  return { ...previous, order, displayed, position: Math.min(previous.position || 0, Math.max(0, order.length - 1)) };
};

export const markDisplayed = (cycle, id) => cycle.displayed.includes(id)
  ? cycle
  : { ...cycle, displayed: [...cycle.displayed, id], position: cycle.order.indexOf(id) };

export const nextUnseenId = (cycle, eligibleIds) => {
  const eligible = new Set(eligibleIds);
  const seen = new Set(cycle.displayed);
  return cycle.order.find((id) => eligible.has(id) && !seen.has(id)) || null;
};

export const reshuffleRemaining = (cycle, random = Math.random) => {
  const seen = new Set(cycle.displayed);
  const remaining = shuffleIds(cycle.order.filter((id) => !seen.has(id)), random);
  return { ...cycle, order: [...cycle.order.filter((id) => seen.has(id)), ...remaining] };
};

export const startNewCycle = (eligibleIds, previous, random = Math.random) => ({
  order: shuffleIds(eligibleIds, random), displayed: [], position: 0, cycleNumber: (previous?.cycleNumber || 0) + 1,
});
