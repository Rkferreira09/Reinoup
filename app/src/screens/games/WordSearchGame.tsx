import { useEffect, useMemo, useState } from 'react';
import { TopBar } from '../../components/ui/TopBar';
import { Button } from '../../components/ui/Button';
import { SpeechBubble } from '../../components/mascot/SpeechBubble';
import { UnlockedStoryPicker } from '../../components/games/UnlockedStoryPicker';
import { getStory } from '../../content/stories';
import { useProgressStore } from '../../store/progressStore';
import { generateWordSearch, type WordSearchGrid } from '../../lib/wordsearch-generator';

function cellsBetween(a: { row: number; col: number }, b: { row: number; col: number }): { row: number; col: number }[] | null {
  const dr = Math.sign(b.row - a.row);
  const dc = Math.sign(b.col - a.col);
  const len = Math.max(Math.abs(b.row - a.row), Math.abs(b.col - a.col));
  if (a.row !== b.row && a.col !== b.col && Math.abs(b.row - a.row) !== Math.abs(b.col - a.col)) return null;
  const cells: { row: number; col: number }[] = [];
  for (let i = 0; i <= len; i++) cells.push({ row: a.row + dr * i, col: a.col + dc * i });
  return cells;
}

export function WordSearchGame() {
  const [storyId, setStoryId] = useState<string | null>(null);
  const story = storyId ? getStory(storyId) : undefined;
  const recordGameWin = useProgressStore((s) => s.recordGameWin);

  const [grid, setGrid] = useState<WordSearchGrid | null>(null);
  const [anchor, setAnchor] = useState<{ row: number; col: number } | null>(null);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [won, setWon] = useState(false);

  function startGame(id: string) {
    setStoryId(id);
    const s = getStory(id);
    const g = generateWordSearch(s?.wordBank ?? [], 10);
    setGrid(g);
    setAnchor(null);
    setFoundCells(new Set());
    setWon(false);
  }

  const allFound = useMemo(() => grid?.words.every((w) => w.found) ?? false, [grid]);

  function handleCellTap(row: number, col: number) {
    if (!grid || won) return;
    if (!anchor) {
      setAnchor({ row, col });
      return;
    }
    const line = cellsBetween(anchor, { row, col });
    setAnchor(null);
    if (!line) return;

    const forward = line.map((c) => grid.letters[c.row][c.col]).join('');
    const backward = [...forward].reverse().join('');

    const match = grid.words.find((w) => !w.found && (w.word === forward || w.word === backward));
    if (match) {
      match.found = true;
      setGrid({ ...grid });
      setFoundCells((prev) => {
        const next = new Set(prev);
        line.forEach((c) => next.add(`${c.row}-${c.col}`));
        return next;
      });
    }
  }

  useEffect(() => {
    if (allFound && grid && !won && story) {
      setWon(true);
      recordGameWin(`Caça-Palavras — ${story.title}`);
    }
  }, [allFound, grid, won, story, recordGameWin]);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Caça-Palavras" backTo={story ? undefined : '/app/jogos'} onBack={story ? () => setStoryId(null) : undefined} />
      {!story || !grid ? (
        <UnlockedStoryPicker onPick={startGame} />
      ) : (
        <div className="flex flex-col items-center gap-4 px-4">
          <p className="text-center text-sm font-semibold text-navy/60">Toque na primeira e na última letra de cada palavra</p>

          <div
            className="grid gap-0.5 rounded-2xl bg-white p-2 shadow-[var(--shadow-card)]"
            style={{ gridTemplateColumns: `repeat(${grid.size}, minmax(0,1fr))` }}
          >
            {grid.letters.map((row, r) =>
              row.map((letter, c) => {
                const isFound = foundCells.has(`${r}-${c}`);
                const isAnchor = anchor?.row === r && anchor?.col === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellTap(r, c)}
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold sm:h-8 sm:w-8 ${
                      isFound ? 'bg-green-light text-green-dark' : isAnchor ? 'bg-orange text-white' : 'text-navy'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {grid.words.map((w) => (
              <span
                key={w.word}
                className={`rounded-full px-3 py-1 text-xs font-bold ${w.found ? 'bg-green-light text-green-dark line-through' : 'bg-navy/5 text-navy/70'}`}
              >
                {w.word}
              </span>
            ))}
          </div>

          {won && (
            <>
              <SpeechBubble pose="comemorando" tone="success">
                Você encontrou todas as palavras! +12 moedas, +18 XP
              </SpeechBubble>
              <Button full onClick={() => setStoryId(null)}>
                Jogar outra história
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
