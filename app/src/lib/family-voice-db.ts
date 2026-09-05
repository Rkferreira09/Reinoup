import { createBlobStore } from './blob-store';

/**
 * "Voz da Família" — armazenamento local dos áudios que os pais gravam
 * narrando os capítulos das histórias.
 *
 * Cada gravação é uma narração completa de um capítulo, feita uma única vez
 * pelo pai/mãe, e reproduzida depois para a criança no lugar da narração
 * sintetizada (TTS). O áudio nunca sai do aparelho onde foi gravado.
 */
const store = createBlobStore('reinoup-family-voice', 'recordings');

/** Chave estável por capítulo — independe da ordem/índice, só do conteúdo. */
export function chapterRecordingKey(storyId: string, chapterId: string): string {
  return `${storyId}::${chapterId}`;
}

export const saveRecording = store.save;
export const getRecording = store.get;
export const deleteRecording = store.remove;
