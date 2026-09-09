import test from 'node:test';
import assert from 'node:assert/strict';
import { markDisplayed, nextUnseenId, reconcileCycle, reshuffleRemaining, startNewCycle } from '../src/utils/sessionQueue.js';
import { auditMcqBank, normalizeQuestionText } from '../src/utils/questionValidation.js';

const zeroRandom = () => 0;

test('queue draws without replacement and only a new cycle repeats IDs', () => {
  let cycle = startNewCycle(['a', 'b', 'c'], null, zeroRandom);
  const drawn = [];
  while (nextUnseenId(cycle, ['a', 'b', 'c'])) {
    const id = nextUnseenId(cycle, ['a', 'b', 'c']);
    drawn.push(id);
    cycle = markDisplayed(cycle, id);
  }
  assert.equal(new Set(drawn).size, 3);
  assert.equal(nextUnseenId(cycle, ['a', 'b', 'c']), null);
  assert.equal(startNewCycle(['a', 'b', 'c'], cycle, zeroRandom).displayed.length, 0);
});

test('reload, filters, new questions, and reshuffle preserve displayed history', () => {
  let cycle = reconcileCycle(null, ['a', 'b', 'c'], zeroRandom);
  cycle = markDisplayed(cycle, 'a');
  const reloaded = reconcileCycle(JSON.parse(JSON.stringify(cycle)), ['a', 'b', 'c', 'd'], zeroRandom);
  assert.deepEqual(reloaded.displayed, ['a']);
  assert.ok(reloaded.order.includes('d'));
  assert.notEqual(nextUnseenId(reloaded, ['b', 'c']), 'a');
  assert.deepEqual(reshuffleRemaining(reloaded, zeroRandom).displayed, ['a']);
});

test('audit rejects normalized duplicates and emits stable option keys and aliases', () => {
  const base = { module: 'M', topic: 'T', difficulty: 'Sulit', explanation: 'Alasan', options: ['x + 1', 'x - 1'], answer: 'x + 1' };
  const result = auditMcqBank([
    { ...base, id: 'old', prompt: 'Nilai x + 1?' },
    { ...base, id: 'duplicate', prompt: ' NILAI   x + 1!!! ' },
  ]);
  assert.equal(normalizeQuestionText('x + 1'), 'x + 1');
  assert.equal(normalizeQuestionText('x - 1'), 'x - 1');
  assert.equal(result.active.length, 1);
  assert.equal(result.aliases.duplicate, 'old');
  assert.equal(result.active[0].correctOptionId, 'old::option-1');
});
