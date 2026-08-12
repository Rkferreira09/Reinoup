import type { PagesByAge, SalaDeAula, Story } from '../../types';
import type { Valor } from '../../valores';
import { THEME_LEGADO_PARA_VALOR } from '../../valores';
import { ORDER_SEQUENCES } from '../../order-sequences';
import { LEGACY_STORIES, type LegacyStory } from './legacy';
import { NARRACAO_5_7 } from './narracao-5-7';

/**
 * Temporada Bônus — histórias do MVP adaptadas para o schema atual.
 *
 * `arca-de-noe` e `jose-e-seus-irmaos` são de Gênesis e serão substituídas
 * pelas aulas `gn-05-noe` e pelo arco `gn-27..gn-39`. Ficam aqui só para o app
 * continuar jogável enquanto a Temporada 1 é escrita.
 */

/**
 * Junta as duas faixas etárias: o texto original de `legacy.ts` é a versão
 * `8-10`; a de `5-7` vem de `narracao-5-7.ts`, escrita para essa idade.
 *
 * Falha alto se algum capítulo não tiver a versão de 5 a 7 — é melhor quebrar
 * o build do que servir texto de 10 anos para uma criança de 5.
 */
function narracaoPorFaixa(chapterId: string, pages8a10: string[]): PagesByAge {
  const pages5a7 = NARRACAO_5_7[chapterId];
  if (!pages5a7) {
    throw new Error(`Falta a narração 5-7 do capítulo "${chapterId}" em narracao-5-7.ts.`);
  }
  return { '5-7': pages5a7, '8-10': pages8a10 };
}

interface Pedagogia {
  objetivo: string;
  personagens: string[];
  licao: string;
  fraseMemoravel: string;
  oracao: string;
  valor?: Valor;
  perguntasConversa: string[];
  salaDeAula: SalaDeAula;
}

const PEDAGOGIA: Record<string, Pedagogia> = {
  'davi-golias': {
    objetivo: 'Ensinar que a coragem nasce da confiança em Deus, não do tamanho da gente.',
    personagens: ['Davi', 'Golias', 'Samuel', 'Rei Saul'],
    licao: 'Deus olha para o coração e usa quem confia nele, mesmo o menor de todos.',
    fraseMemoravel: 'Com Deus eu sou corajoso!',
    oracao:
      'Senhor, obrigado porque o Senhor está comigo quando eu tenho medo. Me dá coragem para fazer o certo. Amém.',
    perguntasConversa: [
      'Por que Davi não teve medo do gigante?',
      'Qual é o seu "gigante" hoje?',
      'O que Deus olha quando escolhe alguém?',
      'Como a gente pode ser corajoso do jeito de Davi?',
    ],
    salaDeAula: {
      dinamica: 'Alvo no chão: cada criança acerta um saquinho no alvo enquanto diz uma coisa que dá medo nela.',
      atividade: 'Desenhar o seu gigante e escrever por cima: "Deus é maior".',
    },
  },
  'arca-de-noe': {
    objetivo: 'Ensinar obediência e confiança mesmo quando não entendemos tudo.',
    personagens: ['Noé', 'A família de Noé', 'Os animais'],
    licao: 'Obedecer a Deus vale a pena, mesmo quando ninguém entende.',
    fraseMemoravel: 'Eu posso obedecer a Deus mesmo quando ninguém entende.',
    oracao:
      'Deus, obrigado porque o Senhor cumpre o que promete. Me ajude a obedecer mesmo quando é difícil. Amém.',
    perguntasConversa: [
      'Por que as pessoas riram de Noé?',
      'Você já fez o certo mesmo sendo o único?',
      'O que o arco-íris lembra a gente?',
      'Como é obedecer sem entender tudo?',
    ],
    salaDeAula: {
      dinamica: 'Em grupos, construir uma arca com blocos ou caixas em 5 minutos.',
      atividade: 'Pintar um arco-íris e escrever: "Deus cumpre Suas promessas".',
    },
  },
  'jose-e-seus-irmaos': {
    objetivo: 'Ensinar sobre inveja, propósito e a escolha de perdoar.',
    personagens: ['José', 'Jacó', 'Os irmãos de José', 'Faraó'],
    licao: 'Perdoar não é dizer que o errado foi certo — é escolher não viver preso à vingança.',
    fraseMemoravel: 'Eu escolho perdoar.',
    oracao:
      'Senhor, me ajude a perdoar quem me machucou, do jeito que José perdoou. Amém.',
    perguntasConversa: [
      'Por que os irmãos tiveram inveja de José?',
      'Como você se sentiria no lugar de José?',
      'Por que José escolheu perdoar?',
      'Tem alguém que você precisa perdoar hoje?',
    ],
    salaDeAula: {
      dinamica: 'Linha do tempo no chão: SONHO → POÇO → EGITO → PRISÃO → PALÁCIO → PERDÃO.',
      atividade: 'Colorir a túnica de José e escrever em cada faixa uma coisa que Deus fez de bom.',
    },
  },
  'moises-mar-vermelho': {
    objetivo: 'Ensinar fé: Deus abre caminho onde parece não existir saída.',
    personagens: ['Moisés', 'O povo de Israel', 'Faraó'],
    licao: 'Quando não há saída, Deus faz um caminho.',
    fraseMemoravel: 'Deus abre caminho para mim.',
    oracao: 'Deus, obrigado porque o Senhor abre caminho quando tudo parece fechado. Amém.',
    perguntasConversa: [
      'Como o povo se sentiu preso entre o mar e o exército?',
      'O que Moisés fez em vez de desistir?',
      'Você já viu Deus abrir um caminho na sua vida?',
      'O que dá pra fazer quando parece que não tem saída?',
    ],
    salaDeAula: {
      dinamica: 'Duas fileiras de crianças formam o "mar" e abrem quando o líder levanta o cajado.',
      atividade: 'Desenhar o mar aberto com o povo passando no meio.',
    },
  },
  'jonas-grande-peixe': {
    objetivo: 'Ensinar que Deus dá segunda chance e nos alcança onde estivermos.',
    personagens: ['Jonas', 'Os marinheiros', 'O povo de Nínive'],
    licao: 'Fugir de Deus não funciona — e Ele dá uma nova chance.',
    fraseMemoravel: 'Deus me dá uma nova chance.',
    oracao: 'Senhor, obrigado porque o Senhor não desiste de mim. Me ajude a obedecer de primeira. Amém.',
    perguntasConversa: [
      'Por que Jonas tentou fugir?',
      'Dá pra se esconder de Deus?',
      'O que Jonas fez dentro do peixe?',
      'Quando você precisou de uma segunda chance?',
    ],
    salaDeAula: {
      dinamica: 'Pique-esconde relâmpago: ninguém fica escondido pra sempre — conversar sobre isso depois.',
      atividade: 'Fazer um peixe de papel e escrever dentro: "Deus não desiste de mim".',
    },
  },
  'daniel-cova-dos-leoes': {
    objetivo: 'Ensinar fidelidade: continuar orando e fazendo o certo mesmo sob pressão.',
    personagens: ['Daniel', 'Rei Dario', 'Os governadores'],
    licao: 'Ser fiel a Deus vale mais do que agradar todo mundo.',
    fraseMemoravel: 'Eu sou fiel a Deus todos os dias.',
    oracao: 'Deus, me ajude a ser fiel ao Senhor mesmo quando é difícil. Amém.',
    perguntasConversa: [
      'Por que quiseram armar uma cilada para Daniel?',
      'O que Daniel fez quando a lei mudou?',
      'É difícil fazer o certo quando ninguém faz?',
      'Qual hábito bom você quer manter todo dia?',
    ],
    salaDeAula: {
      dinamica: 'Estátua: ao sinal, todos param na posição de oração de Daniel.',
      atividade: 'Desenhar Daniel entre os leões com a boca fechada e escrever: "Deus me protege".',
    },
  },
};

function orderStepsDe(storyId: string): string[] {
  return ORDER_SEQUENCES.find((s) => s.requiresStoryId === storyId)?.steps ?? [];
}

function adaptar(legacy: LegacyStory, index: number): Story {
  const pedagogia = PEDAGOGIA[legacy.id];
  if (!pedagogia) {
    throw new Error(`Falta pedagogia para a história legada "${legacy.id}".`);
  }

  return {
    id: legacy.id,
    seasonId: 'bonus',
    blocoId: 'bonus-b1',
    order: index + 1,
    title: legacy.title,
    reference: legacy.reference,

    objetivo: pedagogia.objetivo,
    personagens: pedagogia.personagens,
    licao: pedagogia.licao,
    fraseMemoravel: pedagogia.fraseMemoravel,
    oracao: pedagogia.oracao,
    valor: pedagogia.valor ?? THEME_LEGADO_PARA_VALOR[legacy.theme] ?? 'confianca',

    summary: legacy.summary,
    cover: legacy.cover,
    chapters: legacy.chapters.map((c) => ({
      id: c.id,
      title: c.title,
      scene: c.scene,
      pages: narracaoPorFaixa(c.id, c.pages),
      choice: c.choice,
    })),

    quiz: legacy.quiz,
    verseId: legacy.verseId,

    wordBank: legacy.wordBank,
    memoryPairs: legacy.memoryPairs,
    orderSteps: orderStepsDe(legacy.id),

    perguntasConversa: pedagogia.perguntasConversa,
    salaDeAula: pedagogia.salaDeAula,
  };
}

export const BONUS_STORIES: Story[] = LEGACY_STORIES.map(adaptar);
