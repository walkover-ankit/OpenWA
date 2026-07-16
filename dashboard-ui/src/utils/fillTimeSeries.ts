export type StatsPeriod = '24h' | '7d' | '30d';

export interface MessageTimeSeriesPoint {
  timestamp: string;
  sent: number;
  received: number;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Match StatsService bucket format: `YYYY-MM-DD HH:00:00` (hour) or `YYYY-MM-DD` (day). */
export function formatBucket(date: Date, interval: 'hour' | 'day'): string {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  if (interval === 'day') return `${y}-${m}-${d}`;
  return `${y}-${m}-${d} ${pad2(date.getHours())}:00:00`;
}

/**
 * Zero-fill missing hour/day buckets so charts show a continuous axis instead of
 * sparse points only where traffic existed.
 */
export function fillTimeSeries(
  points: MessageTimeSeriesPoint[],
  period: StatsPeriod,
  now: Date = new Date(),
): MessageTimeSeriesPoint[] {
  const byTs = new Map(points.map(p => [p.timestamp, p]));
  const out: MessageTimeSeriesPoint[] = [];

  if (period === '24h') {
    const end = new Date(now);
    end.setMinutes(0, 0, 0);
    for (let i = 23; i >= 0; i--) {
      const bucket = new Date(end.getTime() - i * 3_600_000);
      const ts = formatBucket(bucket, 'hour');
      const existing = byTs.get(ts);
      out.push(existing ?? { timestamp: ts, sent: 0, received: 0 });
    }
    return out;
  }

  const days = period === '7d' ? 7 : 30;
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = days - 1; i >= 0; i--) {
    const bucket = new Date(end.getTime() - i * 86_400_000);
    const ts = formatBucket(bucket, 'day');
    const existing = byTs.get(ts);
    out.push(existing ?? { timestamp: ts, sent: 0, received: 0 });
  }
  return out;
}
