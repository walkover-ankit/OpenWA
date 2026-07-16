import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fillTimeSeries, formatBucket } from './fillTimeSeries.ts';

test('formatBucket formats hour and day buckets', () => {
  const d = new Date(2026, 6, 14, 12, 34, 56);
  assert.equal(formatBucket(d, 'hour'), '2026-07-14 12:00:00');
  assert.equal(formatBucket(d, 'day'), '2026-07-14');
});

test('fillTimeSeries fills 24 hourly buckets and preserves known counts', () => {
  const now = new Date(2026, 6, 14, 15, 30, 0);
  const knownTs = formatBucket(new Date(2026, 6, 14, 14, 0, 0), 'hour');
  const filled = fillTimeSeries([{ timestamp: knownTs, sent: 3, received: 5 }], '24h', now);
  assert.equal(filled.length, 24);
  assert.equal(filled[filled.length - 1].timestamp, formatBucket(new Date(2026, 6, 14, 15, 0, 0), 'hour'));
  const hit = filled.find(p => p.timestamp === knownTs);
  assert.deepEqual(hit, { timestamp: knownTs, sent: 3, received: 5 });
  assert.equal(filled.filter(p => p.sent === 0 && p.received === 0).length, 23);
});

test('fillTimeSeries fills 7 daily buckets', () => {
  const now = new Date(2026, 6, 14, 12, 0, 0);
  const filled = fillTimeSeries([], '7d', now);
  assert.equal(filled.length, 7);
  assert.equal(filled[0].timestamp, '2026-07-08');
  assert.equal(filled[6].timestamp, '2026-07-14');
});
