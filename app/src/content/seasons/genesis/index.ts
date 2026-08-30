import type { Story } from '../../types';
import { GENESIS_ROADMAP } from '../../seasons';
import { gn01Criacao } from './01-criacao';
import { gn02AdaoEva } from './02-adao-eva';
import { gn03CaimAbel } from './03-caim-abel';

/**
 * Temporada 1 — Gênesis: Deus estava lá.
 *
 * Acrescente aqui cada aula nova, uma por arquivo, na ordem do roteiro.
 * O roteiro completo das 39 está em `content/seasons.ts` (GENESIS_ROADMAP).
 */
export const GENESIS_STORIES: Story[] = [
  gn01Criacao,
  gn02AdaoEva,
  gn03CaimAbel,
  // ... até gn-39-perdao-ate-o-fim
].sort((a, b) => a.order - b.order);

/** Quantas das 39 aulas já foram escritas. */
export const GENESIS_PROGRESSO_PRODUCAO = {
  escritas: GENESIS_STORIES.length,
  planejadas: GENESIS_ROADMAP.length,
};
