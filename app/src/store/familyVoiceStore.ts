import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chapterRecordingKey, deleteRecording, saveRecording } from '../lib/family-voice-db';

interface FamilyVoiceState {
  /** Só metadados aqui — os áudios em si vivem no IndexedDB (`family-voice-db.ts`). */
  recordedKeys: string[];

  hasRecording: (storyId: string, chapterId: string) => boolean;
  saveChapterRecording: (storyId: string, chapterId: string, blob: Blob) => Promise<void>;
  removeChapterRecording: (storyId: string, chapterId: string) => Promise<void>;
}

export const useFamilyVoiceStore = create<FamilyVoiceState>()(
  persist(
    (set, get) => ({
      recordedKeys: [],

      hasRecording: (storyId, chapterId) => get().recordedKeys.includes(chapterRecordingKey(storyId, chapterId)),

      saveChapterRecording: async (storyId, chapterId, blob) => {
        const key = chapterRecordingKey(storyId, chapterId);
        await saveRecording(key, blob);
        set((s) => ({ recordedKeys: s.recordedKeys.includes(key) ? s.recordedKeys : [...s.recordedKeys, key] }));
      },

      removeChapterRecording: async (storyId, chapterId) => {
        const key = chapterRecordingKey(storyId, chapterId);
        await deleteRecording(key);
        set((s) => ({ recordedKeys: s.recordedKeys.filter((k) => k !== key) }));
      },
    }),
    { name: 'reinoup-family-voice-meta' }
  )
);
