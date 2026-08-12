/**
 * Os valores do ReinoUp — a taxonomia oficial de caráter.
 *
 * Derivados dos "10 GRANDES VALORES DA SÉRIE" do material REINOUP KIDS.
 * Esta é a única classificação de caráter do app: alimenta a Trilha de Valores
 * do relatório dos pais, as missões temáticas e a Árvore da Palavra.
 *
 * `gratidao` é o 11º: ele já existia no banco de versículos e é distinto o
 * bastante para o relatório do pai (não dá pra dobrar em `amor` sem perder dado).
 */
export type Valor =
  | 'identidade'
  | 'obediencia'
  | 'confianca'
  | 'promessa'
  | 'presenca'
  | 'perdao'
  | 'coragem'
  | 'generosidade'
  | 'amor'
  | 'gratidao'
  | 'proposito';

/** As 8 palavras da Árvore da Palavra (o desafio final do REINOUP KIDS). */
export type PalavraArvore =
  | 'FÉ'
  | 'AMOR'
  | 'OBEDIÊNCIA'
  | 'PERDÃO'
  | 'CORAGEM'
  | 'GENEROSIDADE'
  | 'ESPERANÇA'
  | 'PROPÓSITO';

export interface ValorInfo {
  id: Valor;
  /** Rótulo curto, usado nos chips do app. */
  label: string;
  /** Como a criança entende. Primeira pessoa, linguagem do material. */
  frase: string;
  /** Como o pai lê no relatório. */
  descricaoPai: string;
  icone: string;
  cor: string;
  palavraArvore: PalavraArvore;
}

export const VALORES: Record<Valor, ValorInfo> = {
  identidade: {
    id: 'identidade',
    label: 'Identidade',
    frase: 'Deus me criou e eu sou importante para Ele.',
    descricaoPai: 'Entende que foi criado por Deus com valor e intenção.',
    icone: '✨',
    cor: '#FFC93C',
    palavraArvore: 'PROPÓSITO',
  },
  obediencia: {
    id: 'obediencia',
    label: 'Obediência',
    frase: 'Eu escolho obedecer a Deus.',
    descricaoPai: 'Aprende que escolhas têm consequências e que obedecer protege.',
    icone: '🛡️',
    cor: '#1D4E89',
    palavraArvore: 'OBEDIÊNCIA',
  },
  confianca: {
    id: 'confianca',
    label: 'Confiança',
    frase: 'Eu posso confiar em Deus.',
    descricaoPai: 'Desenvolve fé: confiar mesmo sem saber todos os detalhes.',
    icone: '🙏',
    cor: '#FF7A29',
    palavraArvore: 'FÉ',
  },
  promessa: {
    id: 'promessa',
    label: 'Promessa',
    frase: 'Deus nunca esquece o que promete.',
    descricaoPai: 'Aprende a esperar: o tempo de Deus não é esquecimento.',
    icone: '🌈',
    cor: '#EBA317',
    palavraArvore: 'ESPERANÇA',
  },
  presenca: {
    id: 'presenca',
    label: 'Presença',
    frase: 'Deus está comigo onde eu estiver.',
    descricaoPai: 'Encontra segurança: Deus permanece nos momentos difíceis.',
    icone: '🕯️',
    cor: '#14213D',
    palavraArvore: 'ESPERANÇA',
  },
  perdao: {
    id: 'perdao',
    label: 'Perdão',
    frase: 'Eu escolho perdoar.',
    descricaoPai: 'Aprende a perdoar e a pedir perdão sem guardar rancor.',
    icone: '🕊️',
    cor: '#FFA45C',
    palavraArvore: 'PERDÃO',
  },
  coragem: {
    id: 'coragem',
    label: 'Coragem',
    frase: 'Eu posso ser corajoso com Deus.',
    descricaoPai: 'Enfrenta o medo apoiado na confiança em Deus.',
    icone: '🦁',
    cor: '#FF7A29',
    palavraArvore: 'CORAGEM',
  },
  generosidade: {
    id: 'generosidade',
    label: 'Generosidade',
    frase: 'Eu posso ser generoso.',
    descricaoPai: 'Aprende a repartir e a servir sem esperar retorno.',
    icone: '🤲',
    cor: '#FFC93C',
    palavraArvore: 'GENEROSIDADE',
  },
  amor: {
    id: 'amor',
    label: 'Amor',
    frase: 'Eu cuido das pessoas que Deus colocou perto de mim.',
    descricaoPai: 'Cuida da família e dos amigos como expressão de amor.',
    icone: '❤️',
    cor: '#FF7A29',
    palavraArvore: 'AMOR',
  },
  gratidao: {
    id: 'gratidao',
    label: 'Gratidão',
    frase: 'Eu agradeço a Deus pelo que Ele fez.',
    descricaoPai: 'Reconhece e agradece o cuidado de Deus.',
    icone: '🌻',
    cor: '#EBA317',
    palavraArvore: 'AMOR',
  },
  proposito: {
    id: 'proposito',
    label: 'Propósito',
    frase: 'Deus pode transformar minha história.',
    descricaoPai: 'Percebe que sua vida tem propósito e pode abençoar outros.',
    icone: '🌱',
    cor: '#1D4E89',
    palavraArvore: 'PROPÓSITO',
  },
};

export const VALOR_IDS = Object.keys(VALORES) as Valor[];

export function valorInfo(id: Valor): ValorInfo {
  return VALORES[id];
}

/**
 * Mapa dos temas antigos (`Theme`) para os valores novos.
 * Existe só para migrar o conteúdo legado do MVP; conteúdo novo usa `Valor`.
 */
export const THEME_LEGADO_PARA_VALOR: Record<string, Valor> = {
  coragem: 'coragem',
  obediencia: 'obediencia',
  perdao: 'perdao',
  fe: 'confianca',
  'segunda-chance': 'proposito',
  fidelidade: 'confianca',
  gratidao: 'gratidao',
  amor: 'amor',
  generosidade: 'generosidade',
};
