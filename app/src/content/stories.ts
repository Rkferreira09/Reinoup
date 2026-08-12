import type { AgeBand, Chapter, SeasonId, Story } from './types';
import { SEASONS, SEASON_ORDER, blocoDaOrdem } from './seasons';
import { GENESIS_STORIES } from './seasons/genesis';
import { BONUS_STORIES } from './seasons/bonus';

/**
 * Catálogo de histórias do ReinoUp.
 *
 * A ordem importa: a trilha é sequencial dentro de cada temporada, e Gênesis
 * vem antes do bônus. Conteúdo novo entra em `seasons/<livro>/`, um arquivo
 * por história — nunca neste arquivo.
 */
export const STORIES: Story[] = [...GENESIS_STORIES, ...BONUS_STORIES];

export const STORIES_POR_TEMPORADA: Record<SeasonId, Story[]> = {
  genesis: GENESIS_STORIES,
  bonus: BONUS_STORIES,
};

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function storiesDaTemporada(seasonId: SeasonId): Story[] {
  return STORIES_POR_TEMPORADA[seasonId];
}

export function blocoDaHistoria(story: Story) {
  return blocoDaOrdem(story.seasonId, story.order);
}

/** Histórias de um bloco, na ordem. */
export function storiesDoBloco(seasonId: SeasonId, blocoId: string): Story[] {
  return storiesDaTemporada(seasonId).filter((s) => s.blocoId === blocoId);
}

// ============================================================
// Desbloqueio
// ============================================================

/**
 * Em temporada sequencial, a fase N+1 abre quando a N é concluída.
 * A primeira fase de cada temporada está sempre aberta.
 */
export function isStoryUnlocked(story: Story, completedIds: Set<string>): boolean {
  const season = SEASONS[story.seasonId];
  if (!season.sequencial) return true;

  const daTemporada = storiesDaTemporada(story.seasonId);
  const posicao = daTemporada.findIndex((s) => s.id === story.id);
  if (posicao <= 0) return true;

  return completedIds.has(daTemporada[posicao - 1].id);
}

/** A próxima história a jogar: a primeira não concluída, respeitando a ordem. */
export function proximaHistoria(completedIds: Set<string>): Story {
  for (const seasonId of SEASON_ORDER) {
    const pendente = storiesDaTemporada(seasonId).find((s) => !completedIds.has(s.id));
    if (pendente) return pendente;
  }
  return STORIES[STORIES.length - 1];
}

// ============================================================
// Leitura por faixa etária
// ============================================================

/** As páginas do capítulo na faixa etária escolhida pelo responsável. */
export function pagesForAge(chapter: Chapter, ageBand: AgeBand): string[] {
  return chapter.pages[ageBand];
}
