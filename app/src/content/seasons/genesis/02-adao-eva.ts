import type { Story } from '../../types';

/** AULA 02 — ADÃO E EVA · Gênesis 3 */
export const gn02AdaoEva: Story = {
  id: 'gn-02-adao-eva',
  seasonId: 'genesis',
  blocoId: 'gn-b1',
  order: 2,
  title: 'Adão e Eva',
  reference: 'Gênesis 3',

  objetivo: 'Ensinar sobre obediência e as consequências das escolhas.',
  personagens: ['Deus', 'Adão', 'Eva', 'Serpente'],
  licao: 'Deus deseja que confiemos em sua palavra e escolhamos obedecer.',
  fraseMemoravel: 'Eu escolho obedecer a Deus.',
  oracao:
    'Deus, ajude-nos a confiar na sua palavra e a fazer boas escolhas. Quando errarmos, dê-nos coragem para falar a verdade e pedir perdão. Amém.',
  valor: 'obediencia',
  valoresSecundarios: ['confianca'],
  summary: 'No jardim, Adão e Eva enfrentam uma escolha e descobrem que Deus continua a procurá-los mesmo depois do erro.',
  cover: { sky: 'dia', ground: 'jardim', motifs: ['garden', 'fruit-tree', 'serpent'] },

  chapters: [
    {
      id: 'gn-02-c1',
      title: 'Um jardim cheio de presentes',
      scene: { sky: 'dia', ground: 'jardim', motifs: ['garden', 'tree-of-life', 'fruit-tree'] },
      pages: {
        '5-7': [
          'Deus deu a Adão e Eva um lar maravilhoso: o Jardim do Éden. Havia árvores bonitas, frutas gostosas e água limpa. Eles cuidavam daquele lugar e conversavam com Deus sem medo.',
          'Eles podiam aproveitar todas as árvores, menos uma. Deus explicou que não deveriam comer da árvore do conhecimento do bem e do mal. Era uma orientação para protegê-los.',
        ],
        '8-10': [
          'Deus colocou Adão e Eva no Jardim do Éden, um lugar cheio de árvores bonitas e frutas boas para comer. Eles tinham um trabalho importante: cultivar e cuidar do jardim. Ali havia alimento, companhia e amizade com Deus. Não precisavam se esconder dele, porque viviam juntos em confiança e segurança.',
          'Deus lhes deu liberdade para comer das árvores do jardim, mas estabeleceu um limite: não deveriam comer da árvore do conhecimento do bem e do mal. A orientação era clara e amorosa. Eles podiam confiar que Deus sabia o que era melhor. Mas, certo dia, uma voz diferente apareceu entre as árvores.',
        ],
      },
    },
    {
      id: 'gn-02-c2',
      title: 'Uma pergunta enganosa',
      scene: { sky: 'dia', ground: 'jardim', motifs: ['serpent', 'fruit-tree'] },
      pages: {
        '5-7': [
          'A serpente perguntou a Eva sobre a orientação de Deus. Depois, disse que nada ruim aconteceria. Suas palavras fizeram Eva duvidar do que Deus havia falado.',
          'Eva olhou para o fruto. Parecia bonito e gostoso. A serpente queria que ela acreditasse mais naquela conversa do que em Deus. Agora Eva precisava fazer uma escolha.',
        ],
        '8-10': [
          'A serpente se aproximou de Eva e começou com uma pergunta: “Foi isso mesmo que Deus disse?” Eva explicou o limite dado por Deus. Então a serpente contradisse a palavra dele e prometeu que o fruto traria algo melhor. A conversa parecia esperta, mas estava levando Eva a desconfiar de quem sempre cuidara dela.',
          'Eva olhou para o fruto e percebeu que ele parecia bonito e saboroso. Também desejou a sabedoria que a serpente havia prometido. Aos poucos, o presente de todo o jardim pareceu menor do que aquela única coisa proibida. Diante dela estavam duas vozes: a orientação de Deus e a mentira da serpente. Qual delas Eva escolheria ouvir?',
        ],
      },
    },
    {
      id: 'gn-02-c3',
      title: 'A escolha e o esconderijo',
      scene: { sky: 'entardecer', ground: 'jardim', motifs: ['fruit-tree', 'footprints'] },
      pages: {
        '5-7': [
          'Eva pegou o fruto e comeu. Depois, ofereceu a Adão, e ele também comeu. Os dois escolheram desobedecer. Logo perceberam que algo havia mudado dentro deles.',
          'Adão e Eva sentiram vergonha e medo. Quando ouviram Deus andando pelo jardim, correram para se esconder entre as árvores. Antes gostavam de estar perto dele. E agora?',
        ],
        '8-10': [
          'Eva tomou o fruto e comeu. Depois o ofereceu a Adão, que estava com ela, e ele também comeu. Nenhum deles foi obrigado: os dois escolheram ignorar a orientação de Deus. A serpente prometera algo maravilhoso, mas o que chegou primeiro foi uma sensação muito nova e pesada de vergonha.',
          'Adão e Eva improvisaram roupas com folhas. Quando ouviram Deus andando pelo jardim, esconderam-se entre as árvores. Antes, a presença dele significava amizade; agora eles estavam com medo. A desobediência não havia apenas quebrado uma regra: tinha ferido a confiança daquele relacionamento. Mesmo assim, Deus não os abandonou no esconderijo.',
        ],
      },
    },
    {
      id: 'gn-02-c4',
      title: 'Deus veio procurar',
      scene: { sky: 'entardecer', ground: 'jardim', motifs: ['footprints', 'garden'] },
      pages: {
        '5-7': [
          'Deus chamou: — Onde você está? Ele sabia onde Adão e Eva estavam, mas queria que saíssem do esconderijo e falassem com Ele. Deus ouviu cada resposta.',
          'Adão culpou Eva. Eva culpou a serpente. Eles tinham errado e precisavam contar a verdade. Deus mostrou que toda escolha traz consequências. O que aconteceria com eles?',
        ],
        '8-10': [
          'Deus chamou Adão: “Onde você está?” Ele não havia perdido Adão entre as árvores daquele grande jardim. A pergunta era um convite para sair do esconderijo e contar toda a verdade. Adão respondeu que sentira medo. Quando Deus perguntou sobre o fruto, Adão culpou Eva, e Eva culpou a serpente.',
          'Deus ouviu todos e mostrou que a desobediência teria consequências reais. A serpente foi julgada, a vida se tornaria difícil e o jardim já não poderia continuar como antes. Ainda assim, Deus não deixou de falar com eles nem de cuidar deles. Antes de explicar sua saída, fez roupas para protegê-los.',
        ],
      },
      choice: {
        question: 'Depois de errar, qual é a melhor escolha?',
        options: [
          {
            text: 'Contar a verdade e pedir perdão',
            correct: true,
            feedback: 'Isso mesmo! Deus nos chama para sair do esconderijo, falar a verdade e receber sua ajuda.',
          },
          {
            text: 'Esconder o erro e culpar alguém',
            correct: false,
            feedback: 'Esconder e culpar não conserta o erro. A melhor escolha é falar a verdade e pedir perdão.',
          },
        ],
      },
    },
    {
      id: 'gn-02-c5',
      title: 'Fora do jardim, perto de Deus',
      scene: { sky: 'entardecer', ground: 'campo', motifs: ['garden', 'angel', 'footprints'] },
      pages: {
        '5-7': [
          'Adão e Eva precisaram sair do jardim. A desobediência trouxe uma consequência triste. Mas Deus fez roupas para eles e prometeu que o mal não venceria para sempre.',
          'Quando erramos, não precisamos fugir de Deus. Podemos contar a verdade, pedir perdão e escolher de novo. Ele nos ama, nos ensina e nos ajuda a obedecer.',
        ],
        '8-10': [
          'Adão e Eva precisaram deixar o Jardim do Éden. Um anjo guardou o caminho para a árvore da vida. Foi uma consequência triste e séria de sua escolha. Porém, Deus lhes deu roupas e uma promessa: um dia, alguém pisaria o mal e venceria aquilo que a serpente havia começado.',
          'A história mostra que desobedecer fere pessoas e traz consequências, mas também revela um Deus que procura quem se esconde. Quando erramos, podemos reconhecer o que fizemos, pedir perdão e aceitar ajuda para recomeçar. Obedecer não é apenas cumprir regras; é confiar naquele que nos ama e sabe o que é bom.',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'gn-02-q1',
      question: 'Onde Adão e Eva moravam?',
      options: ['No Jardim do Éden', 'Em um palácio', 'Dentro de uma arca', 'Em uma cidade'],
      optionIcons: ['garden', 'palace', 'ark', 'tower'],
      correctIndex: 0,
      explanation: 'Deus colocou Adão e Eva no Jardim do Éden, onde cuidavam da criação.',
    },
    {
      id: 'gn-02-q2',
      question: 'Quem fez Eva duvidar da palavra de Deus?',
      options: ['A serpente', 'Um leão', 'Um anjo', 'Adão'],
      optionIcons: ['serpent', 'lion', 'angel', 'shepherd-boy'],
      correctIndex: 0,
      explanation: 'A serpente contradisse a orientação de Deus e tentou enganar Eva.',
    },
    {
      id: 'gn-02-q3',
      question: 'O que Adão e Eva fizeram quando ouviram Deus no jardim?',
      options: ['Esconderam-se', 'Foram dormir', 'Saíram correndo do jardim', 'Subiram numa torre'],
      correctIndex: 0,
      explanation: 'Eles sentiram medo e se esconderam entre as árvores, mas Deus foi procurá-los.',
    },
    {
      id: 'gn-02-q4',
      question: 'Por que a serpente conseguiu confundir Eva?',
      options: ['Ela fez Eva duvidar do que Deus disse', 'Ela arrancou todas as árvores', 'Ela fechou o jardim', 'Ela falou mais alto'],
      correctIndex: 0,
      explanation: 'A serpente levou Eva a desconfiar da palavra e do cuidado de Deus.',
    },
    {
      id: 'gn-02-q5',
      question: 'Por que Deus perguntou “Onde você está?”',
      options: ['Para convidar Adão a falar a verdade', 'Porque não conhecia o jardim', 'Porque tinha esquecido Adão', 'Para brincar de esconder'],
      correctIndex: 0,
      explanation: 'Deus sabia onde Adão estava. A pergunta o convidava a sair do esconderijo e responder.',
    },
    {
      id: 'gn-02-q6',
      question: 'O que as roupas feitas por Deus mostram?',
      options: ['Que Deus continuou cuidando deles', 'Que o erro não teve consequência', 'Que as folhas eram proibidas', 'Que precisavam voltar à árvore'],
      correctIndex: 0,
      explanation: 'Mesmo aplicando consequências, Deus não deixou Adão e Eva sem cuidado.',
    },
    {
      id: 'gn-02-q7',
      question: 'Complete: “Eu escolho ___ a Deus.”',
      options: ['obedecer', 'esconder', 'culpar', 'enganar'],
      correctIndex: 0,
      explanation: 'A frase da aula é “Eu escolho obedecer a Deus”.',
    },
    {
      id: 'gn-02-q8',
      question: 'O que você pode fazer depois de uma escolha errada?',
      options: ['Falar a verdade e pedir perdão', 'Culpar outra pessoa', 'Fingir que não aconteceu', 'Esconder-se de todos'],
      correctIndex: 0,
      explanation: 'Podemos reconhecer o erro, falar a verdade, pedir perdão e aceitar ajuda para recomeçar.',
    },
  ],

  verseId: 'v-gn-02',
  wordBank: ['JARDIM', 'FRUTO', 'ESCOLHA', 'VERDADE', 'PERDAO', 'CUIDADO', 'CONFIAR', 'SERPENTE'],
  memoryPairs: [
    { icon: 'garden', label: 'Jardim' },
    { icon: 'fruit-tree', label: 'Fruto' },
    { icon: 'serpent', label: 'Serpente' },
    { icon: 'footprints', label: 'Procura' },
    { icon: 'angel', label: 'Anjo' },
    { icon: 'tree-of-life', label: 'Vida' },
  ],
  orderSteps: [
    'Deus dá a Adão e Eva um lar e uma orientação',
    'A serpente faz Eva duvidar da palavra de Deus',
    'Eva e Adão comem o fruto',
    'Os dois se escondem, e Deus os procura',
    'Adão e Eva deixam o jardim sob o cuidado de Deus',
  ],
  perguntasConversa: [
    'Por que Deus deu uma orientação a Adão e Eva?',
    'O que podemos fazer quando alguém nos deixa em dúvida sobre uma regra boa?',
    'Por que falar a verdade é melhor do que culpar outra pessoa?',
    'Qual boa escolha você quer fazer esta semana?',
  ],
  salaDeAula: {
    quebraGelo: 'O professor diz escolhas simples do cotidiano, e as crianças mostram com os polegares se elas ajudam ou machucam alguém.',
    dinamica: 'Brincadeira “Pode ou não pode?”: o professor apresenta situações, e as crianças respondem “Pode!” ou “Não pode!”, explicando quem a orientação protege.',
    atividade: 'Desenhar o Jardim do Éden e escrever ao lado de uma árvore: “Eu escolho obedecer a Deus.”',
  },
};
