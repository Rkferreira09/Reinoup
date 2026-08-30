import type { Story } from '../../types';

/** AULA 03 — CAIM E ABEL · Gênesis 4 */
export const gn03CaimAbel: Story = {
  id: 'gn-03-caim-abel',
  seasonId: 'genesis',
  blocoId: 'gn-b1',
  order: 3,
  title: 'Caim e Abel',
  reference: 'Gênesis 4',

  objetivo: 'Ensinar sobre ciúme, raiva e escolhas saudáveis para lidar com emoções fortes.',
  personagens: ['Deus', 'Caim', 'Abel'],
  licao: 'A raiva é um aviso, não uma chefe: podemos parar, falar e pedir ajuda a Deus.',
  fraseMemoravel: 'Eu entrego minha raiva a Deus.',
  oracao:
    'Deus, quando a raiva aparecer, ajude-nos a parar, falar a verdade e escolher o bem. Cuide do nosso coração e ensine-nos a tratar as pessoas com amor. Amém.',
  valor: 'obediencia',
  valoresSecundarios: ['amor'],
  sensibilidade: ['violencia', 'morte'],
  summary: 'Caim deixa a raiva crescer, mas sua história ensina que emoções fortes podem ser entregues a Deus antes de virarem escolhas ruins.',
  cover: { sky: 'entardecer', ground: 'campo', motifs: ['altar', 'sheep', 'grain'] },

  chapters: [
    {
      id: 'gn-03-c1',
      title: 'Dois irmãos, dois trabalhos',
      scene: { sky: 'dia', ground: 'campo', motifs: ['grain', 'sheep'] },
      pages: {
        '5-7': [
          'Adão e Eva tiveram dois filhos. O mais velho se chamava Caim, e o mais novo, Abel. Os irmãos cresceram juntos, mas cada um gostava de um trabalho diferente.',
          'Caim cultivava a terra e colhia alimentos. Abel cuidava das ovelhas do rebanho. Certo dia, os dois decidiram levar uma oferta para agradecer e honrar a Deus.',
        ],
        '8-10': [
          'Fora do Jardim do Éden, Adão e Eva formaram uma família. Seu primeiro filho se chamou Caim; depois nasceu Abel. Quando cresceram, os irmãos seguiram trabalhos bem diferentes. Caim se tornou agricultor e aprendeu a preparar o solo, plantar pequenas sementes, cuidar das plantas e esperar com paciência pela colheita.',
          'Abel se tornou pastor de ovelhas e cuidava do rebanho. Em determinado momento, os dois apresentaram ofertas a Deus. Caim levou frutos da terra. Abel escolheu as primeiras e melhores partes de seu rebanho. Por fora, eram dois presentes; Deus, porém, também via a disposição do coração de cada irmão.',
        ],
      },
    },
    {
      id: 'gn-03-c2',
      title: 'A raiva bate à porta',
      scene: { sky: 'entardecer', ground: 'campo', motifs: ['altar', 'grain', 'sheep'] },
      pages: {
        '5-7': [
          'Deus recebeu com alegria Abel e sua oferta. Com Caim e sua oferta foi diferente. Caim ficou muito triste, com ciúme do irmão e com o rosto fechado.',
          'Deus viu a raiva de Caim e conversou com ele. Disse que Caim poderia escolher fazer o bem. A raiva estava perto, mas não precisava mandar nele.',
        ],
        '8-10': [
          'Deus se agradou de Abel e de sua oferta, mas não recebeu Caim e sua oferta da mesma maneira. A Bíblia não diz que o problema era trabalhar com plantas. Ela chama atenção para a pessoa antes do presente: Deus conhecia bem o coração e as escolhas dos dois irmãos.',
          'Caim ficou furioso, envergonhado e com o rosto abatido. Deus percebeu e perguntou por que ele estava assim. Então o alertou: se escolhesse o bem, seria aceito; se não, o pecado estava à porta, desejando dominá-lo. Caim sentia uma emoção forte, mas ainda podia decidir o que faria com ela.',
        ],
      },
    },
    {
      id: 'gn-03-c3',
      title: 'Um coração que não ouviu',
      scene: { sky: 'entardecer', ground: 'campo', motifs: ['footprints', 'altar'] },
      pages: {
        '5-7': [
          'Caim poderia ter respirado, conversado com Deus ou pedido ajuda. Também poderia aprender com o irmão. Mas ele guardou a raiva e deixou que ela crescesse.',
          'Então Caim chamou Abel para ir ao campo. Ali, Caim machucou o irmão, e Abel morreu. Foi uma escolha terrível. A raiva não cuidada trouxe uma tristeza enorme.',
        ],
        '8-10': [
          'Caim tinha muitas opções. Poderia reconhecer sua raiva, conversar com Deus, pedir ajuda aos pais ou aprender com Abel. Em vez disso, alimentou o ciúme e planejou ferir o irmão. Uma emoção forte não obrigava Caim a agir; ele continuava responsável pela escolha que faria naquele momento.',
          'Caim chamou Abel para o campo. Longe de casa, atacou o irmão e o matou. A Bíblia nomeia essa morte sem transformá-la em espetáculo. Abel perdeu a vida, sua família sofreu, e Caim não poderia desfazer sua ação. A escolha foi terrível — e Deus viu o que havia acontecido.',
        ],
      },
    },
    {
      id: 'gn-03-c4',
      title: 'Onde está seu irmão?',
      scene: { sky: 'noite', ground: 'campo', motifs: ['footprints', 'star'] },
      pages: {
        '5-7': [
          'Deus perguntou a Caim: — Onde está Abel, seu irmão? Caim respondeu que não sabia. Mas Deus conhecia a verdade e se importava com o que aconteceu a Abel.',
          'Caim teria consequências e sairia daquele lugar. Mesmo assim, Deus colocou um sinal para que ninguém o matasse. Justiça e cuidado apareceram juntos. O que podemos aprender?',
        ],
        '8-10': [
          'Deus perguntou: “Onde está Abel, seu irmão?” Caim mentiu e respondeu: “Não sei. Sou responsável por ele?” Deus já sabia toda a verdade. A vida de Abel importava muito, e o mal cometido contra ele não seria ignorado. Nossas escolhas escondidas continuam sendo vistas por Deus, mesmo quando ninguém mais percebe.',
          'Caim não poderia continuar cultivando a terra como antes e viveria longe daquele lugar. Assustado, temeu que alguém também o matasse. Deus não fingiu que nada aconteceu, mas colocou um sinal de proteção sobre ele. Houve justiça pela escolha de Caim e, ao mesmo tempo, um limite para impedir mais violência.',
        ],
      },
      choice: {
        question: 'Quando a raiva fica muito forte, o que você pode fazer primeiro?',
        options: [
          {
            text: 'Parar, afastar-se e pedir ajuda',
            correct: true,
            feedback: 'Ótima escolha! Parar, respirar, ir para um lugar seguro e chamar um adulto ajuda a raiva a não mandar.',
          },
          {
            text: 'Machucar alguém para a raiva passar',
            correct: false,
            feedback: 'Machucar alguém aumenta a tristeza. O caminho seguro é parar, afastar-se e pedir ajuda a Deus e a um adulto.',
          },
        ],
      },
    },
    {
      id: 'gn-03-c5',
      title: 'A raiva não precisa mandar',
      scene: { sky: 'dia', ground: 'campo', motifs: ['plant', 'dove', 'footprints'] },
      pages: {
        '5-7': [
          'Sentir raiva não faz de você uma criança ruim. A raiva avisa que algo incomodou. Mas ela não pode mandar nas mãos, nos pés ou nas palavras.',
          'Você pode parar, respirar e contar o que sente. Pode chamar um adulto e orar. Deus ajuda você a escolher o bem. Ninguém precisa enfrentar a raiva sozinho.',
        ],
        '8-10': [
          'A história de Caim e Abel é triste, mas nos entrega um aviso muito importante: emoções fortes precisam ser ouvidas e cuidadas antes de virarem ações. Sentir raiva não torna alguém mau. Porém, usar a raiva como desculpa para ferir outra pessoa é uma escolha errada e traz consequências.',
          'Quando a raiva crescer, pare e se afaste antes de agir. Respire devagar, dê nome ao que sente e procure um adulto de confiança. Conte a verdade e peça ajuda a Deus. Ele nos dá caminhos para escolher o bem. A raiva pode bater à porta, mas não precisa entrar e assumir o controle.',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'gn-03-q1',
      question: 'Qual era o trabalho de Caim?',
      options: ['Cultivar a terra', 'Cuidar de ovelhas', 'Construir barcos', 'Guardar um palácio'],
      optionIcons: ['grain', 'sheep', 'boat', 'palace'],
      correctIndex: 0,
      explanation: 'Caim era agricultor: preparava a terra e colhia seus frutos.',
    },
    {
      id: 'gn-03-q2',
      question: 'Qual era o trabalho de Abel?',
      options: ['Cuidar de ovelhas', 'Cultivar a terra', 'Construir torres', 'Pescar no mar'],
      optionIcons: ['sheep', 'grain', 'tower', 'big-fish'],
      correctIndex: 0,
      explanation: 'Abel era pastor e cuidava das ovelhas do rebanho.',
    },
    {
      id: 'gn-03-q3',
      question: 'O que Deus fez quando viu Caim com raiva?',
      options: ['Conversou e o alertou', 'Escondeu-se dele', 'Mandou Abel embora', 'Ignorou a situação'],
      correctIndex: 0,
      explanation: 'Deus conversou com Caim e mostrou que ele ainda podia escolher fazer o bem.',
    },
    {
      id: 'gn-03-q4',
      question: 'O que significa dizer que a raiva não precisa mandar?',
      options: ['Podemos escolher como agir', 'Nunca sentimos raiva', 'A raiva sempre desaparece sozinha', 'Toda escolha fica sem consequência'],
      correctIndex: 0,
      explanation: 'Mesmo com raiva, podemos parar, buscar ajuda e escolher uma atitude segura.',
    },
    {
      id: 'gn-03-q5',
      question: 'Por que Deus perguntou onde Abel estava?',
      options: ['Porque a vida de Abel importava', 'Porque queria conhecer o campo', 'Porque esqueceu quem era Abel', 'Porque precisava de uma oferta'],
      correctIndex: 0,
      explanation: 'Deus sabia o que aconteceu e mostrou que Abel e a verdade importavam.',
    },
    {
      id: 'gn-03-q6',
      question: 'O que o sinal colocado em Caim mostrou?',
      options: ['Deus impediu mais violência', 'Caim não teria consequências', 'Abel voltaria para casa', 'A raiva de Caim estava certa'],
      correctIndex: 0,
      explanation: 'Caim recebeu consequências, mas Deus colocou um limite para que outras pessoas não o matassem.',
    },
    {
      id: 'gn-03-q7',
      question: 'Complete: “Eu entrego minha raiva a ___.”',
      options: ['Deus', 'ninguém', 'qualquer pessoa', 'um esconderijo'],
      correctIndex: 0,
      explanation: 'A frase da aula é “Eu entrego minha raiva a Deus”.',
    },
    {
      id: 'gn-03-q8',
      question: 'Se você sentir que pode machucar alguém, qual é a escolha segura?',
      options: ['Afastar-se e chamar um adulto', 'Ficar perto e gritar', 'Esconder o que sente', 'Descontar em outra pessoa'],
      correctIndex: 0,
      explanation: 'Afaste-se da situação e chame imediatamente um adulto de confiança para ajudar.',
    },
  ],

  verseId: 'v-gn-03',
  wordBank: ['IRMAOS', 'OFERTA', 'CORACAO', 'ESCOLHA', 'VERDADE', 'CUIDADO', 'AJUDAR', 'PARAR'],
  memoryPairs: [
    { icon: 'grain', label: 'Colheita' },
    { icon: 'sheep', label: 'Ovelha' },
    { icon: 'altar', label: 'Oferta' },
    { icon: 'footprints', label: 'Escolha' },
    { icon: 'dove', label: 'Paz' },
    { icon: 'plant', label: 'Recomeço' },
  ],
  orderSteps: [
    'Caim cultiva a terra, e Abel cuida das ovelhas',
    'Os irmãos apresentam ofertas a Deus',
    'Deus alerta Caim sobre sua raiva',
    'Caim deixa a raiva dominar e mata Abel',
    'Deus aplica consequências e impede mais violência',
  ],
  perguntasConversa: [
    'Como o seu corpo avisa que a raiva está chegando?',
    'Quem são os adultos que você pode chamar quando precisa de ajuda?',
    'O que Caim poderia ter feito antes de ir ao campo?',
    'Como podemos cuidar de alguém que está triste ou com raiva?',
  ],
  salaDeAula: {
    quebraGelo: 'Mostrar cartões de alegria, raiva, tristeza e medo; cada criança escolhe um e conta como percebe essa emoção no corpo.',
    dinamica: 'Ensaiar o plano “Pare, respire, conte”: as crianças fazem o gesto de parar, respiram três vezes e praticam pedir ajuda a um adulto.',
    atividade: 'Desenhar um coração e escrever dentro: “Eu posso pedir ajuda a Deus.” Ao redor, desenhar pessoas adultas de confiança.',
  },
};
