import type { Session } from '../services/api';

/** Prefer WhatsApp account push name when known; fall back to the gateway session name. */
export function sessionDisplayName(session: Pick<Session, 'name' | 'pushName'>): string {
  const account = session.pushName?.trim();
  return account || session.name;
}
