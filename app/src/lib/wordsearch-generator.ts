export interface PlacedWord {
  word: string;
  cells: { row: number; col: number }[];
  found: boolean;
}

export interface WordSearchGrid {
  size: number;
  letters: string[][];
  words: PlacedWord[];
}

const DIRECTIONS = [
  { dr: 0, dc: 1 }, // horizontal
  { dr: 1, dc: 0 }, // vertical
  { dr: 1, dc: 1 }, // diagonal down-right
  { dr: 1, dc: -1 }, // diagonal down-left
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function generateWordSearch(words: string[], size = 10): WordSearchGrid {
  const grid: (string | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const placed: PlacedWord[] = [];

  const normalized = [...words].map((w) => w.toUpperCase().replace(/[^A-ZÀ-Ú]/g, '')).sort((a, b) => b.length - a.length);

  for (const word of normalized) {
    if (word.length > size) continue;
    let success = false;
    for (let attempt = 0; attempt < 60 && !success; attempt++) {
      const dir = DIRECTIONS[randomInt(DIRECTIONS.length)];
      const maxRow = dir.dr >= 0 ? size - (dir.dr ? word.length : 1) : size - 1;
      const minRow = dir.dr < 0 ? word.length - 1 : 0;
      const maxCol = dir.dc >= 0 ? size - (dir.dc ? word.length : 1) : size - 1;
      const minCol = dir.dc < 0 ? word.length - 1 : 0;
      if (maxRow < minRow || maxCol < minCol) continue;

      const row = minRow + randomInt(maxRow - minRow + 1);
      const col = minCol + randomInt(maxCol - minCol + 1);

      const cells: { row: number; col: number }[] = [];
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        if (r < 0 || r >= size || c < 0 || c >= size) {
          fits = false;
          break;
        }
        const existing = grid[r][c];
        if (existing && existing !== word[i]) {
          fits = false;
          break;
        }
        cells.push({ row: r, col: c });
      }

      if (fits) {
        cells.forEach((cell, i) => {
          grid[cell.row][cell.col] = word[i];
        });
        placed.push({ word, cells, found: false });
        success = true;
      }
    }
  }

  const letters: string[][] = grid.map((row) => row.map((cell) => cell ?? ALPHABET[randomInt(ALPHABET.length)]));

  return { size, letters, words: placed };
}
