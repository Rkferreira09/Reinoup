import { daysBetween, todayKey } from './dates';

export interface StreakState {
  streakDays: number;
  lastActiveDate: string | null;
  shieldsAvailable: number;
}

export interface StreakResult extends StreakState {
  changed: boolean;
  usedShield: boolean;
  milestoneHit: number | null;
}

/**
 * Call once per "meaningful" action (finishing a chapter, a quiz, memorizing a verse).
 * Advances the streak at most once per calendar day.
 */
export function touchStreak(state: StreakState, now = new Date()): StreakResult {
  const today = todayKey(now);
  if (state.lastActiveDate === today) {
    return { ...state, changed: false, usedShield: false, milestoneHit: null };
  }

  if (!state.lastActiveDate) {
    return { streakDays: 1, lastActiveDate: today, shieldsAvailable: state.shieldsAvailable, changed: true, usedShield: false, milestoneHit: null };
  }

  const gap = daysBetween(state.lastActiveDate, today);

  if (gap === 1) {
    const streakDays = state.streakDays + 1;
    return {
      streakDays,
      lastActiveDate: today,
      shieldsAvailable: state.shieldsAvailable,
      changed: true,
      usedShield: false,
      milestoneHit: [3, 7, 14, 30].includes(streakDays) ? streakDays : null,
    };
  }

  if (gap > 1 && state.shieldsAvailable > 0) {
    // The shield bridges exactly one missed day, preserving the streak.
    return {
      streakDays: state.streakDays + 1,
      lastActiveDate: today,
      shieldsAvailable: state.shieldsAvailable - 1,
      changed: true,
      usedShield: true,
      milestoneHit: null,
    };
  }

  // Streak broken — restart at 1.
  return {
    streakDays: 1,
    lastActiveDate: today,
    shieldsAvailable: state.shieldsAvailable,
    changed: true,
    usedShield: false,
    milestoneHit: null,
  };
}
