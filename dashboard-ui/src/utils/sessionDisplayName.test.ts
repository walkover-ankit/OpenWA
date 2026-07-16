import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sessionDisplayName } from './sessionDisplayName.ts';

test('prefers pushName over gateway name', () => {
  assert.equal(sessionDisplayName({ name: 'bot-1', pushName: 'Alice Smith' }), 'Alice Smith');
});

test('falls back to gateway name when pushName is missing or blank', () => {
  assert.equal(sessionDisplayName({ name: 'bot-1' }), 'bot-1');
  assert.equal(sessionDisplayName({ name: 'bot-1', pushName: '   ' }), 'bot-1');
  assert.equal(sessionDisplayName({ name: 'bot-1', pushName: undefined }), 'bot-1');
});
