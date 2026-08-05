export interface ChestReward {
  coins: number;
  xp: number;
  sticker: boolean;
}

/** Variable reward roll — always something, occasionally a sticker (the "variable reward" hook). */
export function rollChestReward(): ChestReward {
  const coins = 30 + Math.floor(Math.random() * 41); // 30-70
  const xp = 15 + Math.floor(Math.random() * 21); // 15-35
  const sticker = Math.random() < 0.35;
  return { coins, xp, sticker };
}

export const CHAPTER_COINS = 8;
export const CHAPTER_XP = 20;
export const QUIZ_CORRECT_COINS = 4;
export const QUIZ_CORRECT_XP = 10;
export const QUIZ_PERFECT_BONUS_COINS = 20;
export const VERSE_MEMORIZED_COINS = 15;
export const VERSE_MEMORIZED_XP = 25;
export const DAILY_TASK_XP = 15;
export const MISSION_VIDA_REAL_APPROVAL_BONUS_XP = 10;
export const GAME_WIN_COINS = 12;
export const GAME_WIN_XP = 18;

export const STREAK_MILESTONE_BONUS: Record<number, { coins: number; xp: number }> = {
  3: { coins: 20, xp: 20 },
  7: { coins: 50, xp: 60 },
  14: { coins: 90, xp: 100 },
  30: { coins: 200, xp: 220 },
};

export const SHIELD_COST_COINS = 60;
