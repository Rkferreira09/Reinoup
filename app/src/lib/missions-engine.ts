import { STORIES } from '../content/stories';
import { DISCIPLES } from '../content/disciples';
import { versesByCategory } from '../content/verses';
import { MISSIONS } from '../content/missions';
import type { ProgressState } from './progress-types';

import type { Valor } from '../content/valores';

/** A missão "Semana da Coragem" conta histórias de coragem e das que exigem confiar. */
const VALORES_DE_CORAGEM: Valor[] = ['coragem', 'confianca'];

/** Derived (computed, not stored) progress for trilha/temática/coleção missions. */
export function getDerivedMissionProgress(missionId: string, state: ProgressState): number {
  switch (missionId) {
    case 'trilha-discipulos':
      return state.disciplesLearned.length;
    case 'tematica-coragem':
      return STORIES.filter((s) => VALORES_DE_CORAGEM.includes(s.valor) && state.stories[s.id]?.completed).length;
    case 'colecao-amor': {
      const amorIds = new Set(versesByCategory('amor').map((v) => v.id));
      return state.versesCollected.filter((id) => amorIds.has(id)).length;
    }
    default: {
      // vida-real missions: stored, binary (0 or target)
      const mission = MISSIONS.find((m) => m.id === missionId);
      const completed = state.missions[missionId]?.completed;
      return completed ? mission?.target ?? 1 : 0;
    }
  }
}

export function isMissionComplete(missionId: string, state: ProgressState): boolean {
  const mission = MISSIONS.find((m) => m.id === missionId);
  if (!mission) return false;
  return getDerivedMissionProgress(missionId, state) >= mission.target;
}

export const TOTAL_DISCIPLES = DISCIPLES.length;
