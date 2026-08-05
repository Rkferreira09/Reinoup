/** XP required to go from level n to n+1. Matches the "Nível 7 · 450/800 XP" reference from the mockup. */
export function xpRequiredForLevel(level: number): number {
  return 200 + (level - 1) * 100;
}

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  totalXp: number;
}

export function getLevelProgress(totalXp: number): LevelProgress {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= xpRequiredForLevel(level)) {
    remaining -= xpRequiredForLevel(level);
    level += 1;
  }
  return {
    level,
    xpIntoLevel: remaining,
    xpForNextLevel: xpRequiredForLevel(level),
    totalXp,
  };
}

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Pequeno Discípulo',
  3: 'Aprendiz Fiel',
  5: 'Guardião da Palavra',
  7: 'Cavaleiro da Fé',
  10: 'Escudeiro do Reino',
  15: 'Guardião do Reino',
  20: 'Herói do Reino',
};

export function levelTitle(level: number): string {
  const keys = Object.keys(LEVEL_TITLES)
    .map(Number)
    .sort((a, b) => a - b);
  let title = LEVEL_TITLES[1];
  for (const k of keys) {
    if (level >= k) title = LEVEL_TITLES[k];
  }
  return title;
}
