/**
 * Verificador de conteúdo — roda com `bun run check:conteudo`.
 *
 * ERRO (quebra o build): coisas que chegam erradas na criança.
 *   - narração de 5-7 idêntica à de 8-10
 *   - campo pedagógico vazio
 *   - id fora do padrão / fora do roadmap
 *
 * AVISO (não quebra): desvios da gramática do CONTENT-MODEL.md. O conteúdo
 * legado do MVP viola vários de propósito — vão sendo acertados aos poucos.
 */
import { STORIES } from '../src/content/stories';
import { GENESIS_ROADMAP } from '../src/content/seasons';
import { getVerse } from '../src/content/verses';

const erros: string[] = [];
const avisos: string[] = [];

const contarPalavras = (t: string) => t.trim().split(/\s+/).length;

for (const story of STORIES) {
  const tag = `[${story.id}]`;

  // ---- erros ----
  if (!story.objetivo?.trim()) erros.push(`${tag} objetivo vazio`);
  if (!story.licao?.trim()) erros.push(`${tag} licao vazia`);
  if (!story.fraseMemoravel?.trim()) erros.push(`${tag} fraseMemoravel vazia`);
  if (!story.oracao?.trim()) erros.push(`${tag} oracao vazia`);
  if (story.personagens.length === 0) erros.push(`${tag} sem personagens`);
  if (story.perguntasConversa.length === 0) erros.push(`${tag} sem perguntasConversa`);
  if (!story.salaDeAula?.dinamica?.trim()) erros.push(`${tag} salaDeAula.dinamica vazia`);

  if (!getVerse(story.verseId)) erros.push(`${tag} verseId "${story.verseId}" não existe em verses.ts`);

  if (story.seasonId === 'genesis' && !GENESIS_ROADMAP.some((s) => s.id === story.id)) {
    erros.push(`${tag} id fora do GENESIS_ROADMAP`);
  }

  for (const chapter of story.chapters) {
    const p57 = chapter.pages['5-7'];
    const p810 = chapter.pages['8-10'];

    if (p57.length === 0 || p810.length === 0) {
      erros.push(`${tag} ${chapter.id}: falta narração em uma das faixas`);
      continue;
    }
    if (JSON.stringify(p57) === JSON.stringify(p810)) {
      erros.push(`${tag} ${chapter.id}: narração 5-7 idêntica à de 8-10`);
    }

    // ---- avisos de gramática ----
    p57.forEach((t, i) => {
      const n = contarPalavras(t);
      if (n < 20 || n > 50) avisos.push(`${tag} ${chapter.id} pág ${i + 1} (5-7): ${n} palavras (alvo 25–45)`);
    });
    p810.forEach((t, i) => {
      const n = contarPalavras(t);
      if (n < 40 || n > 100) avisos.push(`${tag} ${chapter.id} pág ${i + 1} (8-10): ${n} palavras (alvo 50–90)`);
    });
    if (p57.length < 2 || p57.length > 3) avisos.push(`${tag} ${chapter.id}: ${p57.length} páginas (alvo 2–3)`);
  }

  if (story.chapters.length < 4 || story.chapters.length > 5) {
    avisos.push(`${tag} ${story.chapters.length} capítulos (alvo 4–5)`);
  }
  if (story.quiz.length !== 8) avisos.push(`${tag} quiz com ${story.quiz.length} perguntas (alvo 8)`);

  for (const q of story.quiz) {
    if (q.optionIcons && q.optionIcons.length !== q.options.length) {
      erros.push(`${tag} ${q.id}: ${q.optionIcons.length} figuras para ${q.options.length} opções`);
    }
  }
  const ilustradas = story.quiz.filter((q) => q.optionIcons).length;
  if (ilustradas < 2) avisos.push(`${tag} só ${ilustradas} perguntas ilustradas (alvo mínimo 2, para quem não lê)`);
  if (story.memoryPairs.length !== 6) avisos.push(`${tag} ${story.memoryPairs.length} memoryPairs (alvo 6)`);
  if (story.orderSteps.length !== 5) avisos.push(`${tag} ${story.orderSteps.length} orderSteps (alvo 5)`);

  const comEscolha = story.chapters.filter((c) => c.choice).length;
  if (comEscolha !== 1) avisos.push(`${tag} ${comEscolha} pontos de escolha (alvo 1)`);
  else if (story.chapters.at(-2)?.choice === undefined) {
    avisos.push(`${tag} escolha fora do penúltimo capítulo`);
  }

  for (const w of story.wordBank) {
    if (w !== w.toUpperCase() || /[ÀÁÂÃÉÊÍÓÔÕÚÇ]/.test(w)) avisos.push(`${tag} wordBank "${w}": use MAIÚSCULAS sem acento`);
    if (w.length < 4 || w.length > 8) avisos.push(`${tag} wordBank "${w}": ${w.length} letras (alvo 4–8)`);
  }
}

const genesis = STORIES.filter((s) => s.seasonId === 'genesis').length;
console.log(`\n📚 ${STORIES.length} histórias · Gênesis: ${genesis}/${GENESIS_ROADMAP.length} aulas escritas\n`);

if (avisos.length) {
  console.log(`⚠️  ${avisos.length} avisos de gramática:`);
  for (const a of avisos) console.log(`   ${a}`);
  console.log('');
}

if (erros.length) {
  console.error(`❌ ${erros.length} erros:`);
  for (const e of erros) console.error(`   ${e}`);
  process.exit(1);
}

console.log('✅ Sem erros de conteúdo.\n');
