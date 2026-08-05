export interface OrderSequence {
  id: string;
  title: string;
  /** Steps already in the correct order — the game shuffles them for play. */
  steps: string[];
  requiresStoryId?: string; // unlocks only after this story is completed
}

export const ORDER_SEQUENCES: OrderSequence[] = [
  {
    id: 'seq-davi-golias',
    title: 'A história de Davi e Golias',
    requiresStoryId: 'davi-golias',
    steps: [
      'Davi é escolhido por Samuel',
      'Golias desafia o exército de Israel',
      'Davi ouve o desafio e se oferece',
      'Davi pega sua funda e 5 pedras',
      'Davi vence Golias',
    ],
  },
  {
    id: 'seq-arca-de-noe',
    title: 'A história da Arca de Noé',
    requiresStoryId: 'arca-de-noe',
    steps: [
      'Deus pede para Noé construir a arca',
      'Noé constrói a arca por muitos anos',
      'Os animais entram em pares',
      'Chove por 40 dias e 40 noites',
      'A pomba traz um ramo de oliveira',
      'Deus coloca o arco-íris no céu',
    ],
  },
  {
    id: 'seq-jose',
    title: 'A história de José',
    requiresStoryId: 'jose-e-seus-irmaos',
    steps: [
      'José ganha a túnica colorida',
      'Os irmãos vendem José como escravo',
      'José é levado ao Egito',
      'José interpreta os sonhos do Faraó',
      'José se torna governador',
      'José perdoa seus irmãos',
    ],
  },
  {
    id: 'seq-pragas-egito',
    title: 'As pragas do Egito (versão resumida)',
    requiresStoryId: 'moises-mar-vermelho',
    steps: [
      'As águas viram sangue',
      'Uma praga de rãs toma conta do Egito',
      'Uma praga de piolhos',
      'Uma praga de gafanhotos',
      'Trevas cobrem a terra',
      'O Faraó finalmente deixa o povo partir',
    ],
  },
  {
    id: 'seq-dias-da-criacao',
    title: 'Os dias da Criação',
    steps: [
      'Dia 1: Deus cria a luz',
      'Dia 2: Deus cria o céu',
      'Dia 3: Deus cria a terra e as plantas',
      'Dia 4: Deus cria o sol, a lua e as estrelas',
      'Dia 5: Deus cria os peixes e as aves',
      'Dia 6: Deus cria os animais e os seres humanos',
    ],
  },
];

export function getOrderSequence(id: string): OrderSequence | undefined {
  return ORDER_SEQUENCES.find((s) => s.id === id);
}
