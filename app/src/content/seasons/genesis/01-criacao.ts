import type { Story } from '../../types';

/**
 * AULA 01 — DEUS CRIOU TUDO
 *
 * História-piloto: é a régua de tom, tamanho e estrutura para as outras 38.
 * Segue a gramática do CONTENT-MODEL.md — 5 capítulos, 2 a 3 páginas cada,
 * escolha no penúltimo capítulo, 6 perguntas de quiz.
 */
export const gn01Criacao: Story = {
  id: 'gn-01-criacao',
  seasonId: 'genesis',
  blocoId: 'gn-b1',
  order: 1,
  title: 'Deus criou tudo',
  reference: 'Gênesis 1–2',

  objetivo:
    'Ensinar que Deus é o Criador de todas as coisas e que cada criança foi criada por Ele com propósito.',
  personagens: ['Deus', 'Adão', 'Eva'],
  licao: 'Deus criou tudo o que existe — e criou você também, com muito cuidado.',
  fraseMemoravel: 'Deus criou tudo e criou a mim!',
  oracao:
    'Deus, obrigado porque o Senhor criou o mundo e criou cada um de nós. Ajude-nos a lembrar que somos importantes para o Senhor. Amém.',
  valor: 'identidade',
  valoresSecundarios: ['gratidao'],

  summary: 'No começo não havia nada — mas Deus estava lá. E Ele criou tudo, inclusive você.',
  cover: { sky: 'dia', ground: 'jardim', motifs: ['garden', 'tree-of-life', 'star'] },

  chapters: [
    {
      id: 'gn-01-c1',
      title: 'No começo, só Deus',
      scene: { sky: 'noite', ground: 'pedra', motifs: ['star'] },
      pages: {
        '5-7': [
          'No começo não existia nada do jeito que a gente conhece. Não havia árvores. Não havia bichos. Não havia gente. Mas Deus estava lá.',
          'Deus não precisou de ajuda de ninguém. Ele só falou, e as coisas começaram a existir. Deus é assim: forte, sábio e cheio de amor.',
        ],
        '8-10': [
          'No começo, não existia nada do jeito que conhecemos hoje. Não havia árvores nem montanhas. Não havia animais correndo pelo campo. Não havia cidades, nem casas, nem pessoas. Só existia escuridão e vazio. Mas Deus já estava lá — antes de tudo e acima de tudo.',
          'Deus não precisou de material nem de ajudantes. Ele não pegou nada emprestado de ninguém, porque não havia nada para pegar. Deus simplesmente falou — e o que Ele falou passou a existir. É isso que a Bíblia quer que a gente entenda logo na primeira página: tudo começa em Deus.',
        ],
      },
    },
    {
      id: 'gn-01-c2',
      title: 'Haja luz!',
      scene: { sky: 'dia', ground: 'agua', motifs: ['plant', 'fruit-tree'] },
      pages: {
        '5-7': [
          'Deus disse: — Haja luz! E a luz apareceu na hora. Deus separou a luz do escuro. Chamou a luz de dia e o escuro de noite.',
          'Depois Deus fez o céu lá em cima e o mar aqui embaixo. E fez a terra seca aparecer no meio da água. Ficou lindo.',
          'Aí Deus encheu a terra de verde. Nasceu capim, nasceram flores, arbustos e árvores cheias de frutas gostosas. Tudo isso só porque Deus falou.',
        ],
        '8-10': [
          'Então Deus falou: "Haja luz!" E a luz apareceu naquele instante. Deus viu que a luz era boa e separou a luz da escuridão. À luz Ele chamou dia, e à escuridão chamou noite. Assim terminou o primeiro dia da criação.',
          'No segundo dia, Deus fez o céu, esticado como um teto imenso sobre tudo. No terceiro, Ele juntou as águas num só lugar e fez a terra seca aparecer. Onde antes só havia mar, agora havia praia, campo e montanha — chão firme, pronto para receber a vida.',
          'E Deus não parou aí. Ele encheu a terra de verde: capim, flores, arbustos e árvores carregadas de frutas. Cada planta ganhou sementes, para que pudesse nascer de novo e de novo. Deus não criou só o que existia naquele dia — Ele criou o que continuaria existindo.',
        ],
      },
    },
    {
      id: 'gn-01-c3',
      title: 'Luzes, peixes e aves',
      scene: { sky: 'entardecer', ground: 'agua', motifs: ['star', 'dove'] },
      pages: {
        '5-7': [
          'Deus pendurou o sol no céu para iluminar o dia. Colocou a lua e as estrelas para brilhar de noite. Assim ninguém ficava no escuro.',
          'Depois Deus encheu o mar de peixes. Peixe grande, peixe pequeno, peixe colorido. E encheu o céu de aves voando e cantando. Que barulho bonito!',
        ],
        '8-10': [
          'No quarto dia, Deus colocou luzes no céu: o sol, para governar o dia, e a lua com as estrelas, para governar a noite. Elas serviriam também para marcar as estações, os dias e os anos. Foi Deus quem inventou o tempo — e Ele mesmo não depende dele.',
          'No quinto dia, Deus encheu as águas de vida: peixes enormes, peixes minúsculos, criaturas coloridas que ninguém tinha visto antes. E encheu o céu de aves de todo tipo, cada uma com seu jeito de voar e sua própria canção. O mundo, que era silêncio e vazio, agora tinha som e movimento.',
        ],
      },
    },
    {
      id: 'gn-01-c4',
      title: 'Os animais',
      scene: { sky: 'dia', ground: 'campo', motifs: ['lion', 'sheep', 'garden'] },
      pages: {
        '5-7': [
          'No dia seguinte, Deus fez os bichos da terra. Leão, elefante, cachorro, formiga, girafa. Grandes e pequenininhos, cada um do seu jeito. Todos feitos por Deus.',
          'O mundo estava lindo, cheio de cor e de barulho. Mas ainda faltava uma coisa muito, muito especial. Deus tinha guardado o melhor para o final.',
        ],
        '8-10': [
          'No sexto dia, Deus criou os animais que andam sobre a terra: o leão e a formiga, o elefante e o coelho, o cavalo e a girafa. Cada um com seu tamanho, sua cor e seu jeito próprio de viver. Nenhum deles foi feito por acaso.',
          'O mundo estava pronto: tinha luz, tinha mar, tinha plantas, tinha bichos. Era bonito e estava cheio de vida. Mas alguma coisa ainda faltava — algo diferente de tudo o que Deus tinha feito até ali. Deus havia guardado o melhor para o fim daquele dia.',
        ],
      },
      choice: {
        question: 'Faltava a criação mais especial de todas. O que você acha que Deus criou por último?',
        options: [
          {
            text: 'O ser humano — Adão e Eva',
            correct: true,
            feedback:
              'Isso mesmo! Deus deixou por último a sua criação mais especial: as pessoas. E fez cada uma delas parecida com Ele.',
          },
          {
            text: 'Mais estrelas para o céu',
            correct: false,
            feedback:
              'As estrelas Deus já tinha feito no quarto dia. No sexto dia Ele criou as pessoas — Adão e Eva —, sua criação mais especial.',
          },
        ],
      },
    },
    {
      id: 'gn-01-c5',
      title: 'Deus criou você',
      scene: { sky: 'dia', ground: 'jardim', motifs: ['garden', 'tree-of-life', 'seed'] },
      pages: {
        '5-7': [
          'Deus criou o ser humano. Primeiro Adão, depois Eva. Eles não eram iguais aos bichos: podiam conversar com Deus e cuidar de tudo.',
          'Deus olhou para tudo o que tinha feito e disse: — Ficou muito bom! No sétimo dia, Deus descansou e abençoou aquele dia.',
          'E tem mais: Deus criou você também. Você não apareceu por acaso, nem por engano. Você foi feito por Deus, com muito cuidado. E Ele te ama.',
        ],
        '8-10': [
          'Então Deus criou o ser humano — primeiro Adão e depois Eva. Eles eram diferentes de tudo o que existia: foram feitos à imagem de Deus. Podiam conversar com Ele, tomar decisões, amar e cuidar do mundo inteiro que Ele acabara de fazer.',
          'Quando terminou, Deus olhou para tudo o que havia feito e viu que era muito bom. No sétimo dia Ele descansou — não porque estivesse cansado, mas para mostrar que a obra estava completa e que descansar também faz parte da vida.',
          'E existe uma parte dessa história que fala diretamente com você: Deus também criou você. Você não é um acidente, nem sobrou. Você foi pensado, escolhido e feito por Deus, com propósito. O mesmo Deus que fez as estrelas fez você.',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'gn-01-q1',
      question: 'O que Deus criou primeiro?',
      options: ['A luz', 'Os animais', 'As pessoas', 'As montanhas'],
      correctIndex: 0,
      explanation: 'Deus disse "Haja luz!" e a luz apareceu. Foi a primeira coisa que Ele criou.',
    },
    {
      id: 'gn-01-q2',
      question: 'Quem Deus criou por último?',
      options: ['Os peixes', 'As estrelas', 'O ser humano', 'As árvores'],
      correctIndex: 2,
      explanation: 'Deus criou Adão e Eva por último — sua criação mais especial.',
    },
    {
      id: 'gn-01-q3',
      question: 'Como Deus criou todas as coisas?',
      options: ['Usando máquinas', 'Falando', 'Pedindo ajuda aos anjos', 'Pegando emprestado'],
      correctIndex: 1,
      explanation: 'Deus falou, e as coisas passaram a existir. Ele não precisou de ajuda nem de material.',
    },
    {
      id: 'gn-01-q4',
      question: 'Por que Deus descansou no sétimo dia?',
      options: [
        'Porque estava muito cansado',
        'Porque tinha ficado sem ideias',
        'Porque a obra estava completa',
        'Porque já era noite',
      ],
      correctIndex: 2,
      explanation:
        'Deus não descansou por cansaço. Ele descansou porque tinha terminado — e para mostrar que descansar faz parte da vida.',
    },
    {
      id: 'gn-01-q5',
      question: 'Complete o versículo: "Deus criou os céus e a ___."',
      options: ['luz', 'terra', 'noite', 'água'],
      correctIndex: 1,
      explanation: '"Deus criou os céus e a terra." — Gênesis 1:1, o primeiro versículo da Bíblia.',
    },
    {
      id: 'gn-01-q6',
      question: 'O que essa história ensina sobre você?',
      options: [
        'Que você foi criado por Deus, com propósito',
        'Que você apareceu por acaso',
        'Que você não é importante',
        'Que você é igual aos animais',
      ],
      correctIndex: 0,
      explanation: 'Você não é um acidente. Deus pensou em você e te criou com muito cuidado.',
    },
  ],

  verseId: 'v-gn-01',

  wordBank: ['CRIACAO', 'ESTRELAS', 'ANIMAIS', 'PLANTAS', 'TERRA', 'NOITE', 'FRUTAS', 'ADAO'],
  memoryPairs: [
    { icon: 'star', label: 'Estrela' },
    { icon: 'plant', label: 'Planta' },
    { icon: 'fruit-tree', label: 'Árvore' },
    { icon: 'dove', label: 'Ave' },
    { icon: 'lion', label: 'Animal' },
    { icon: 'garden', label: 'Jardim' },
  ],
  orderSteps: [
    'Deus cria a luz e separa o dia da noite',
    'Deus faz o céu, o mar e a terra seca',
    'Deus enche a terra de plantas e árvores',
    'Deus cria o sol, a lua, as estrelas, os peixes e as aves',
    'Deus cria os animais e, por último, Adão e Eva',
  ],

  perguntasConversa: [
    'Quem criou o mundo?',
    'Qual foi a coisa mais legal que Deus criou, na sua opinião?',
    'Quem criou você?',
    'Por que a gente precisa cuidar daquilo que Deus criou?',
  ],
  salaDeAula: {
    quebraGelo:
      'Cada criança diz uma coisa que Deus criou e que ela gosta muito — sem repetir o que já foi dito.',
    dinamica:
      'O professor fala "Deus criou..." e as crianças completam em voz alta: "O cachorro!", "As árvores!". Quem repetir sai da roda e vira juiz.',
    atividade: 'Desenhar algo que Deus criou e escrever embaixo: "Deus criou isso — e criou a mim!"',
  },
};
