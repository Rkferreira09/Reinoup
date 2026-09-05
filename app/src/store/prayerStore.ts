import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { todayKey } from '../lib/dates';
import { uid } from '../lib/id';
import { createBlobStore } from '../lib/blob-store';

/**
 * Diário de Orações — a criança registra um pedido (por voz, já que nem toda
 * criança de 5-7 anos lê e escreve) e, depois, marca "Deus respondeu!" quando
 * sentir que sim.
 *
 * De propósito, isso não dá moeda nem XP: é o único cantinho do app que não é
 * sobre pontuação, é sobre coração — e é isso que aparece no relatório dos
 * pais como uma dimensão diferente dos números de histórias e quizzes.
 */
export interface PrayerEntry {
  id: string;
  label: string;
  hasAudio: boolean;
  createdDate: string;
  answered: boolean;
  answeredDate?: string;
}

const prayerAudio = createBlobStore('reinoup-prayer-audio', 'recordings');

export function prayerAudioKey(id: string): string {
  return id;
}

export const savePrayerAudio = prayerAudio.save;
export const getPrayerAudio = prayerAudio.get;
export const deletePrayerAudio = prayerAudio.remove;

interface PrayerState {
  entries: PrayerEntry[];

  addPrayer: (label: string, audioBlob?: Blob) => Promise<string>;
  markAnswered: (id: string) => void;
  removePrayer: (id: string) => Promise<void>;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set) => ({
      entries: [],

      addPrayer: async (label, audioBlob) => {
        const id = uid('oracao');
        if (audioBlob) await savePrayerAudio(prayerAudioKey(id), audioBlob);
        const entry: PrayerEntry = {
          id,
          label: label.trim(),
          hasAudio: Boolean(audioBlob),
          createdDate: todayKey(),
          answered: false,
        };
        set((s) => ({ entries: [entry, ...s.entries] }));
        return id;
      },

      markAnswered: (id) => {
        set((s) => ({
          entries: s.entries.map((e) => (e.id === id ? { ...e, answered: true, answeredDate: todayKey() } : e)),
        }));
      },

      removePrayer: async (id) => {
        await deletePrayerAudio(prayerAudioKey(id));
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) }));
      },
    }),
    { name: 'reinoup-prayer-journal' }
  )
);

/** Quantos pedidos foram registrados/respondidos dentro de um conjunto de datas (ver `lib/dates.ts`). */
export function countPrayersInDates(entries: PrayerEntry[], dateKeys: Set<string>) {
  const logged = entries.filter((e) => dateKeys.has(e.createdDate)).length;
  const answered = entries.filter((e) => e.answeredDate && dateKeys.has(e.answeredDate)).length;
  return { logged, answered };
}
