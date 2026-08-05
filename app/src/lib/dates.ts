/** Local (device) date helpers — no timezone gymnastics needed for a kids app. */

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function daysBetween(aKey: string, bKey: string): number {
  const a = new Date(`${aKey}T00:00:00`);
  const b = new Date(`${bKey}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** Monday-based ISO week key, e.g. "2026-W05" — used to reset weekly ranking. */
export function weekKey(d = new Date()): string {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  // ISO: Monday = 1 ... Sunday = 7
  const day = date.getDay() === 0 ? 7 : date.getDay();
  date.setDate(date.getDate() + 1 - day);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${date.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export function weekdayLabel(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`);
  return WEEKDAY_LABELS[d.getDay()];
}

/** Returns the 7 date keys for the Mon..Sun week containing `d`. */
export function currentWeekDates(d = new Date()): string[] {
  const date = new Date(d.getTime());
  const day = date.getDay() === 0 ? 7 : date.getDay();
  date.setDate(date.getDate() - (day - 1));
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    out.push(todayKey(date));
    date.setDate(date.getDate() + 1);
  }
  return out;
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function minutesToLabel(min: number): string {
  if (min < 60) return `${min}min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

export function isWithinAllowedHours(now: Date, fromHHMM: string, toHHMM: string): boolean {
  const [fh, fm] = fromHHMM.split(':').map(Number);
  const [th, tm] = toHHMM.split(':').map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const fromMin = fh * 60 + fm;
  const toMin = th * 60 + tm;
  if (fromMin <= toMin) return nowMin >= fromMin && nowMin <= toMin;
  // overnight window (e.g. 20:00 -> 06:00)
  return nowMin >= fromMin || nowMin <= toMin;
}
