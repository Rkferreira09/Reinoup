import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { weekKey } from '../lib/dates';
import { uid } from '../lib/id';

export interface MockFriend {
  id: string;
  name: string;
  avatarEmoji: string;
}

const MOCK_FRIENDS: MockFriend[] = [
  { id: 'f1', name: 'Alice', avatarEmoji: '🐑' },
  { id: 'f2', name: 'Theo', avatarEmoji: '🦁' },
  { id: 'f3', name: 'Sofia', avatarEmoji: '🕊️' },
  { id: 'f4', name: 'Lucas', avatarEmoji: '⭐' },
  { id: 'f5', name: 'Helena', avatarEmoji: '🌈' },
  { id: 'f6', name: 'Davi S.', avatarEmoji: '👑' },
  { id: 'f7', name: 'Manu', avatarEmoji: '🍯' },
];

function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

interface FriendsState {
  weekKey: string;
  weeklyXp: Record<string, number>;
  classCode: string;
  reactions: Record<string, string>; // friendId -> last emoji reaction sent

  ensureCurrentWeek: () => void;
  sendReaction: (friendId: string, emoji: string) => void;
  regenerateClassCode: () => void;
}

export const useFriendsStore = create<FriendsState>()(
  persist(
    (set, get) => ({
      weekKey: '',
      weeklyXp: {},
      classCode: uid('turma').toUpperCase().slice(0, 8),
      reactions: {},

      ensureCurrentWeek: () => {
        const current = weekKey();
        if (get().weekKey === current) return;
        const weeklyXp: Record<string, number> = {};
        for (const f of MOCK_FRIENDS) {
          const r = seededRandom(`${current}-${f.id}`);
          weeklyXp[f.id] = Math.round(80 + r * 420);
        }
        set({ weekKey: current, weeklyXp, reactions: {} });
      },

      sendReaction: (friendId, emoji) => set((s) => ({ reactions: { ...s.reactions, [friendId]: emoji } })),

      regenerateClassCode: () => set({ classCode: uid('turma').toUpperCase().slice(0, 8) }),
    }),
    { name: 'reinoup-friends' }
  )
);

export { MOCK_FRIENDS };
