import type { Story } from './types';

export const STORIES: Story[] = [
  // ============================================================
  // 1. DAVI E GOLIAS
  // ============================================================
  {
    id: 'davi-golias',
    title: 'Davi e Golias',
    reference: '1 Samuel 17',
    theme: 'coragem',
    summary: 'Um jovem pastor enfrenta um gigante confiando na força de Deus.',
    cover: { sky: 'dia', ground: 'campo', motifs: ['shepherd-boy', 'giant', 'sling'] },
    verseId: 'v-coragem-1',
    wordBank: ['DAVI', 'GOLIAS', 'FUNDA', 'PASTOR', 'PEDRA', 'CORAGEM', 'DEUS', 'VITORIA'],
    memoryPairs: [
      { icon: 'shepherd-boy', label: 'Davi' },
      { icon: 'sheep', label: 'Ovelha' },
      { icon: 'giant', label: 'Golias' },
      { icon: 'sling', label: 'Funda' },
      { icon: 'sword', label: 'Espada' },
      { icon: 'crown', label: 'Coroa' },
    ],
    chapters: [
      {
        id: 'dg-1',
        title: 'Davi é escolhido',
        scene: { sky: 'dia', ground: 'campo', motifs: ['shepherd-boy', 'sheep'] },
        pages: [
          'Davi era um jovem pastor que cuidava das ovelhas de seu pai. Ele amava a Deus e confiava sempre nele.',
          'Um dia, o profeta Samuel visitou a casa de Jessé, pai de Davi, para escolher um novo rei para Israel.',
          'Entre todos os irmãos mais velhos e fortes, foi Davi, o mais novo, quem Deus escolheu. Deus olha para o coração, não para a aparência.',
        ],
      },
      {
        id: 'dg-2',
        title: 'O gigante Golias',
        scene: { sky: 'dia', ground: 'campo', motifs: ['giant', 'tent'] },
        pages: [
          'O exército de Israel estava em guerra contra os filisteus. Todos os dias, um gigante chamado Golias saía e desafiava os soldados de Israel.',
          'Golias era enorme e usava uma armadura pesada. Ninguém tinha coragem de enfrentá-lo — nem mesmo o rei Saul.',
          'Por quarenta dias, Golias zombou do exército de Deus. Os soldados de Israel tremiam de medo só de olhar para ele.',
        ],
      },
      {
        id: 'dg-3',
        title: 'Davi ouve o desafio',
        scene: { sky: 'dia', ground: 'campo', motifs: ['shepherd-boy', 'giant'] },
        pages: [
          'Davi foi levar comida para seus irmãos que lutavam no exército. Foi lá que ele ouviu Golias desafiando o Deus vivo de Israel.',
          'Davi ficou indignado: "Quem é esse filisteu para desafiar os exércitos do Deus vivo?" Ele sabia que Deus era maior que qualquer gigante.',
        ],
        choice: {
          question: 'O que Davi decidiu fazer?',
          options: [
            { text: 'Confiar em Deus e enfrentar Golias', correct: true, feedback: 'Isso mesmo! Davi confiou em Deus, não em suas próprias forças, e se ofereceu para enfrentar o gigante.' },
            { text: 'Fugir com medo', correct: false, feedback: 'Na Bíblia, Davi não fugiu — ele confiou em Deus e decidiu enfrentar Golias, mesmo sendo tão jovem.' },
          ],
        },
      },
      {
        id: 'dg-4',
        title: 'Davi se prepara',
        scene: { sky: 'dia', ground: 'campo', motifs: ['sling', 'sword'] },
        pages: [
          'O rei Saul quis colocar sua própria armadura em Davi, mas ela era pesada demais e Davi não estava acostumado com ela.',
          'Davi preferiu ir com o que já conhecia bem: seu cajado, sua funda e cinco pedrinhas lisas que pegou num riacho.',
          '"O Senhor, que me livrou das garras do leão e do urso, também vai me livrar das mãos desse filisteu", disse Davi com confiança.',
        ],
      },
      {
        id: 'dg-5',
        title: 'A vitória de Davi',
        scene: { sky: 'dia', ground: 'campo', motifs: ['sling', 'giant', 'crown'] },
        pages: [
          'Golias riu ao ver Davi, apenas um garoto, se aproximando. Mas Davi respondeu: "Você vem contra mim com espada, e eu venho em nome do Senhor dos Exércitos."',
          'Davi correu em direção a Golias, girou sua funda e lançou uma pedra bem no meio da testa do gigante. Golias caiu ao chão.',
          'Todo o exército filisteu fugiu, e Israel comemorou a grande vitória. Deus tinha dado a vitória através de um jovem pastor corajoso.',
        ],
      },
    ],
    quiz: [
      { id: 'dg-q1', question: 'Quem era Davi antes de enfrentar Golias?', options: ['Um rei', 'Um pastor de ovelhas', 'Um soldado experiente', 'Um sacerdote'], correctIndex: 1, explanation: 'Davi cuidava das ovelhas do seu pai antes de ser chamado para a batalha.' },
      { id: 'dg-q2', question: 'Quem era Golias?', options: ['Um rei de Israel', 'Um profeta', 'Um gigante filisteu', 'Um irmão de Davi'], correctIndex: 2, explanation: 'Golias era um gigante guerreiro do exército filisteu.' },
      { id: 'dg-q3', question: 'Por quantos dias Golias desafiou o exército de Israel?', options: ['7 dias', '40 dias', '3 dias', '100 dias'], correctIndex: 1, explanation: 'Golias desafiou Israel todos os dias durante 40 dias.' },
      { id: 'dg-q4', question: 'O que Davi usou para enfrentar Golias?', options: ['Uma espada grande', 'Um arco e flecha', 'Uma funda e pedras', 'Uma lança'], correctIndex: 2, explanation: 'Davi usou sua funda de pastor e pedras do riacho.' },
      { id: 'dg-q5', question: 'Quantas pedras Davi pegou no riacho?', options: ['1', '3', '5', '10'], correctIndex: 2, explanation: 'Davi escolheu cinco pedras lisas do riacho.' },
      { id: 'dg-q6', question: 'Por que Davi não usou a armadura do rei Saul?', options: ['Não gostava da cor', 'Era pesada e ele não estava acostumado', 'Estava quebrada', 'O rei não deixou'], correctIndex: 1, explanation: 'A armadura era pesada demais e Davi preferiu usar o que já conhecia.' },
      { id: 'dg-q7', question: 'Quem derrotou Golias?', options: ['O rei Saul', 'Davi', 'Um general', 'Jônatas'], correctIndex: 1, explanation: 'Davi derrotou Golias com sua funda e sua fé em Deus.' },
      { id: 'dg-q8', question: 'Em nome de quem Davi disse que estava lutando?', options: ['Em seu próprio nome', 'Em nome do rei Saul', 'Em nome do Senhor dos Exércitos', 'Em nome do seu pai'], correctIndex: 2, explanation: 'Davi confiava que a vitória vinha de Deus, não de suas próprias forças.' },
    ],
  },

  // ============================================================
  // 2. A ARCA DE NOÉ
  // ============================================================
  {
    id: 'arca-de-noe',
    title: 'A Arca de Noé',
    reference: 'Gênesis 6–9',
    theme: 'obediencia',
    summary: 'Noé obedece a Deus e constrói uma arca gigante para salvar sua família.',
    cover: { sky: 'dia', ground: 'agua', motifs: ['ark', 'rainbow', 'dove'] },
    verseId: 'v-obed-2',
    wordBank: ['NOE', 'ARCA', 'DILUVIO', 'POMBA', 'ANIMAIS', 'OBEDIENCIA', 'DEUS', 'ALIANCA'],
    memoryPairs: [
      { icon: 'ark', label: 'Arca' },
      { icon: 'dove', label: 'Pomba' },
      { icon: 'rainbow', label: 'Arco-íris' },
      { icon: 'rain', label: 'Chuva' },
      { icon: 'sheep', label: 'Animais' },
      { icon: 'tent', label: 'Família' },
    ],
    chapters: [
      {
        id: 'an-1',
        title: 'Um homem justo',
        scene: { sky: 'dia', ground: 'campo', motifs: ['tent', 'sheep'] },
        pages: [
          'Há muito tempo, o mundo estava cheio de maldade. Mas havia um homem chamado Noé que era justo e andava com Deus.',
          'Deus viu o coração fiel de Noé e decidiu contar a ele um grande plano: viria um dilúvio para renovar a terra.',
        ],
      },
      {
        id: 'an-2',
        title: 'As instruções de Deus',
        scene: { sky: 'dia', ground: 'campo', motifs: ['ark', 'scroll'] },
        pages: [
          'Deus pediu para Noé construir uma arca enorme, de madeira, com medidas exatas — bem maior que qualquer casa.',
          'Noé deveria levar para dentro da arca sua família e um casal de cada tipo de animal, para que a vida continuasse depois do dilúvio.',
        ],
      },
      {
        id: 'an-3',
        title: 'Noé constrói a arca',
        scene: { sky: 'dia', ground: 'campo', motifs: ['ark', 'tent'] },
        pages: [
          'Noé trabalhou por muitos anos construindo a arca, exatamente como Deus tinha mandado, mesmo sem nunca ter visto chover antes.',
          'Os vizinhos riam e zombavam dele. "Para que construir um barco tão longe do mar?", perguntavam.',
        ],
        choice: {
          question: 'O que Noé decidiu fazer quando as pessoas riram dele?',
          options: [
            { text: 'Continuar obedecendo a Deus', correct: true, feedback: 'Isso mesmo! Noé confiou em Deus e continuou construindo, mesmo sem entender tudo.' },
            { text: 'Desistir e parar de construir', correct: false, feedback: 'Na Bíblia, Noé não desistiu — ele continuou obedecendo a Deus até terminar a arca.' },
          ],
        },
      },
      {
        id: 'an-4',
        title: 'A chuva começa',
        scene: { sky: 'tempestade', ground: 'agua', motifs: ['ark', 'rain'] },
        pages: [
          'Quando a arca ficou pronta, os animais chegaram em pares e entraram, e Noé entrou com sua esposa, seus filhos e suas noras.',
          'Foi Deus quem fechou a porta da arca. Depois, começou a chover — por quarenta dias e quarenta noites — até as águas cobrirem toda a terra.',
        ],
      },
      {
        id: 'an-5',
        title: 'O arco-íris da promessa',
        scene: { sky: 'entardecer', ground: 'agua', motifs: ['rainbow', 'dove'] },
        pages: [
          'Depois de muito tempo, Noé soltou uma pomba para ver se havia terra seca. Na segunda vez, ela voltou com um ramo de oliveira no bico!',
          'Finalmente a arca pousou em terra seca e todos saíram para começar de novo.',
          'Deus colocou um arco-íris no céu como promessa: nunca mais destruiria a terra com um dilúvio. O arco-íris ainda hoje nos lembra dessa promessa.',
        ],
      },
    ],
    quiz: [
      { id: 'an-q1', question: 'Como era Noé aos olhos de Deus?', options: ['Justo e fiel', 'Rico e famoso', 'Forte e guerreiro', 'Rei de Israel'], correctIndex: 0, explanation: 'Noé era justo e andava com Deus, por isso encontrou graça diante dele.' },
      { id: 'an-q2', question: 'O que Deus pediu para Noé construir?', options: ['Um templo', 'Uma arca', 'Uma cidade', 'Uma torre'], correctIndex: 1, explanation: 'Deus pediu para Noé construir uma arca enorme.' },
      { id: 'an-q3', question: 'Como os animais entraram na arca?', options: ['Sozinhos', 'Em pares', 'Em grupos de dez', 'Só os filhotes'], correctIndex: 1, explanation: 'Os animais entraram em pares, macho e fêmea.' },
      { id: 'an-q4', question: 'Quantos dias e noites choveu?', options: ['7', '100', '40', '3'], correctIndex: 2, explanation: 'Choveu por quarenta dias e quarenta noites.' },
      { id: 'an-q5', question: 'Quem fechou a porta da arca?', options: ['Noé', 'Deus', 'O filho mais velho', 'Um anjo'], correctIndex: 1, explanation: 'Foi Deus quem fechou a porta da arca, protegendo quem estava dentro.' },
      { id: 'an-q6', question: 'Qual ave Noé enviou para checar se havia terra seca?', options: ['Águia', 'Corvo primeiro e depois pomba', 'Pardal', 'Pavão'], correctIndex: 1, explanation: 'Noé soltou um corvo e depois, mais de uma vez, uma pomba.' },
      { id: 'an-q7', question: 'O que a pomba trouxe na segunda vez que voltou?', options: ['Um peixe', 'Um ramo de oliveira', 'Uma flor', 'Nada'], correctIndex: 1, explanation: 'A pomba trouxe um ramo de oliveira, sinal de que as águas estavam baixando.' },
      { id: 'an-q8', question: 'O que Deus colocou no céu como promessa?', options: ['Uma estrela', 'O sol', 'O arco-íris', 'Uma nuvem'], correctIndex: 2, explanation: 'Deus colocou o arco-íris como sinal de sua promessa para sempre.' },
    ],
  },

  // ============================================================
  // 3. JOSÉ E SEUS IRMÃOS
  // ============================================================
  {
    id: 'jose-e-seus-irmaos',
    title: 'José e seus Irmãos',
    reference: 'Gênesis 37; 39–45',
    theme: 'perdao',
    summary: 'José é traído pelos irmãos, mas anos depois escolhe perdoar.',
    cover: { sky: 'dia', ground: 'palacio', motifs: ['coat-colorful', 'palace', 'grain'] },
    verseId: 'v-perdao-2',
    wordBank: ['JOSE', 'TUNICA', 'EGITO', 'SONHO', 'PERDAO', 'FARAO', 'TRIGO', 'IRMAOS'],
    memoryPairs: [
      { icon: 'coat-colorful', label: 'Túnica' },
      { icon: 'well', label: 'Poço' },
      { icon: 'grain', label: 'Trigo' },
      { icon: 'palace', label: 'Palácio' },
      { icon: 'star', label: 'Estrela' },
      { icon: 'sheep', label: 'Rebanho' },
    ],
    chapters: [
      {
        id: 'jo-1',
        title: 'O sonho de José',
        scene: { sky: 'dia', ground: 'campo', motifs: ['coat-colorful', 'star'] },
        pages: [
          'José era o filho favorito de Jacó, e por isso ganhou de presente uma linda túnica colorida.',
          'José teve sonhos especiais em que seus irmãos se curvavam diante dele. Quando contou os sonhos, seus irmãos ficaram cheios de ciúmes e raiva.',
        ],
      },
      {
        id: 'jo-2',
        title: 'Vendido pelos irmãos',
        scene: { sky: 'dia', ground: 'deserto', motifs: ['well', 'coat-colorful'] },
        pages: [
          'Cheios de inveja, os irmãos jogaram José em um poço vazio no meio do deserto.',
          'Depois, o venderam como escravo para mercadores que passavam a caminho do Egito — e mentiram para o pai, dizendo que ele tinha morrido.',
        ],
      },
      {
        id: 'jo-3',
        title: 'José no Egito',
        scene: { sky: 'dia', ground: 'palacio', motifs: ['palace', 'grain'] },
        pages: [
          'No Egito, mesmo passando por injustiças e sendo preso sem culpa, José continuou confiando em Deus.',
          'Deus deu a José a habilidade de interpretar sonhos. Ele explicou o sonho do Faraó: viriam 7 anos de muita fartura e depois 7 anos de fome.',
          'Impressionado, o Faraó fez de José o governador de todo o Egito, responsável por guardar comida para os anos difíceis.',
        ],
      },
      {
        id: 'jo-4',
        title: 'Os irmãos voltam a se encontrar',
        scene: { sky: 'dia', ground: 'palacio', motifs: ['grain', 'coat-colorful'] },
        pages: [
          'Anos depois, a fome chegou também na terra onde vivia a família de José. Seus irmãos foram até o Egito comprar comida, sem saber que o governador era José.',
          'José reconheceu os irmãos na hora, mas eles não o reconheceram — afinal, muito tempo tinha passado.',
        ],
        choice: {
          question: 'Quando José reconheceu seus irmãos, o que ele decidiu fazer?',
          options: [
            { text: 'Perdoar os irmãos e cuidar da família', correct: true, feedback: 'Isso mesmo! Mesmo depois de tudo, José escolheu perdoar e ajudar sua família.' },
            { text: 'Guardar rancor e se vingar', correct: false, feedback: 'Na Bíblia, José não se vingou — ele escolheu perdoar seus irmãos.' },
          ],
        },
      },
      {
        id: 'jo-5',
        title: 'O perdão de José',
        scene: { sky: 'entardecer', ground: 'palacio', motifs: ['palace', 'sheep'] },
        pages: [
          'José se revelou aos irmãos e chorou muito. "Eu sou José, seu irmão!", disse, abraçando cada um deles.',
          '"Vocês pensaram em me fazer mal, mas Deus transformou tudo isso em bem, para salvar muita gente da fome", disse José.',
          'Toda a família de José se mudou para o Egito, e eles viveram unidos novamente, em paz.',
        ],
      },
    ],
    quiz: [
      { id: 'jo-q1', question: 'O que o pai de José deu de presente a ele?', options: ['Uma espada', 'Uma túnica colorida', 'Um cajado', 'Um cavalo'], correctIndex: 1, explanation: 'Jacó deu a José uma bela túnica colorida.' },
      { id: 'jo-q2', question: 'Por que os irmãos tinham ciúmes de José?', options: ['Ele era mais forte', 'Ele era o favorito e tinha sonhos especiais', 'Ele era mais rico', 'Ele era o mais velho'], correctIndex: 1, explanation: 'José era o filho favorito e contava sonhos sobre seu futuro.' },
      { id: 'jo-q3', question: 'O que os irmãos fizeram com José?', options: ['Ajudaram-no a fugir', 'Venderam-no como escravo', 'Ficaram amigos dele', 'Contaram tudo ao pai'], correctIndex: 1, explanation: 'Os irmãos venderam José a mercadores que iam para o Egito.' },
      { id: 'jo-q4', question: 'Para onde José foi levado?', options: ['Babilônia', 'Egito', 'Roma', 'Nínive'], correctIndex: 1, explanation: 'José foi levado como escravo para o Egito.' },
      { id: 'jo-q5', question: 'Qual habilidade especial José tinha?', options: ['Lutar com espada', 'Interpretar sonhos', 'Cantar', 'Construir barcos'], correctIndex: 1, explanation: 'Deus deu a José a habilidade de interpretar sonhos.' },
      { id: 'jo-q6', question: 'O que José se tornou no Egito?', options: ['Escravo para sempre', 'Governador', 'Sacerdote', 'Soldado'], correctIndex: 1, explanation: 'José se tornou o governador de todo o Egito.' },
      { id: 'jo-q7', question: 'Por que os irmãos foram ao Egito?', options: ['Para passear', 'Para comprar comida por causa da fome', 'Para visitar José', 'Para vender ovelhas'], correctIndex: 1, explanation: 'Uma grande fome atingiu a região, e eles foram comprar comida.' },
      { id: 'jo-q8', question: 'O que José fez ao reconhecer os irmãos?', options: ['Mandou prendê-los', 'Perdoou-os', 'Fingiu não conhecê-los para sempre', 'Expulsou-os do Egito'], correctIndex: 1, explanation: 'José escolheu perdoar seus irmãos e cuidar de toda a família.' },
    ],
  },

  // ============================================================
  // 4. MOISÉS E O MAR VERMELHO
  // ============================================================
  {
    id: 'moises-mar-vermelho',
    title: 'Moisés e o Mar Vermelho',
    reference: 'Êxodo 2; 14',
    theme: 'fe',
    summary: 'Moisés confia em Deus para libertar o povo de Israel da escravidão.',
    cover: { sky: 'dia', ground: 'agua', motifs: ['sea-split', 'staff', 'chariot'] },
    verseId: 'v-fe-4',
    wordBank: ['MOISES', 'EGITO', 'FARAO', 'BASTAO', 'MAR', 'LIBERDADE', 'DEUS', 'POVO'],
    memoryPairs: [
      { icon: 'basket', label: 'Cesto' },
      { icon: 'staff', label: 'Bastão' },
      { icon: 'chariot', label: 'Carruagem' },
      { icon: 'sea-split', label: 'Mar Vermelho' },
      { icon: 'fire-column', label: 'Coluna de Fogo' },
      { icon: 'palace', label: 'Palácio' },
    ],
    chapters: [
      {
        id: 'mv-1',
        title: 'O bebê no cesto',
        scene: { sky: 'dia', ground: 'agua', motifs: ['basket'] },
        pages: [
          'Um rei cruel do Egito mandou matar os bebês hebreus. Para proteger seu filho, a mãe de Moisés o colocou em um cesto e deixou o cesto no rio.',
          'A filha do Faraó encontrou o bebê e decidiu criá-lo como seu próprio filho, chamando-o de Moisés.',
          'Moisés cresceu no palácio, mas sempre soube que era hebreu — e que Deus tinha um plano especial para sua vida.',
        ],
      },
      {
        id: 'mv-2',
        title: 'Deus chama Moisés',
        scene: { sky: 'dia', ground: 'deserto', motifs: ['fire-column', 'staff'] },
        pages: [
          'Anos depois, cuidando de ovelhas no deserto, Moisés viu um arbusto pegando fogo que não se consumia. Era Deus falando com ele!',
          'Deus pediu que Moisés voltasse ao Egito e libertasse o povo de Israel da escravidão. Moisés ficou com medo, mas Deus prometeu estar com ele.',
        ],
      },
      {
        id: 'mv-3',
        title: '"Deixe meu povo ir"',
        scene: { sky: 'dia', ground: 'palacio', motifs: ['staff', 'palace'] },
        pages: [
          'Moisés e seu irmão Arão foram até o Faraó e disseram: "Assim diz o Senhor: deixe o meu povo ir."',
          'O Faraó se recusou várias vezes, até que, depois de muitas dificuldades, finalmente deixou o povo de Israel partir — mas logo mudou de ideia.',
          'O Faraó mandou seu exército, com carruagens e cavalos, perseguir o povo de Israel no deserto.',
        ],
      },
      {
        id: 'mv-4',
        title: 'Presos entre o mar e o exército',
        scene: { sky: 'entardecer', ground: 'agua', motifs: ['chariot', 'sea-split'] },
        pages: [
          'O povo de Israel chegou à beira do Mar Vermelho. Atrás deles, o exército egípcio se aproximava rapidamente. Não havia para onde fugir.',
          'O povo ficou apavorado e começou a reclamar com Moisés. Mas Moisés disse: "Não tenham medo, fiquem firmes e vejam a salvação do Senhor."',
        ],
        choice: {
          question: 'O que o povo deveria fazer diante do medo?',
          options: [
            { text: 'Confiar que Deus abriria um caminho', correct: true, feedback: 'Isso mesmo! Mesmo com medo, o povo precisava confiar que Deus cuidaria deles.' },
            { text: 'Voltar e se render ao Faraó', correct: false, feedback: 'Na Bíblia, o povo não voltou — Deus abriu um caminho em meio ao mar para eles.' },
          ],
        },
      },
      {
        id: 'mv-5',
        title: 'O mar se abre',
        scene: { sky: 'dia', ground: 'agua', motifs: ['sea-split', 'staff'] },
        pages: [
          'Moisés estendeu seu bastão sobre o mar, e Deus fez soprar um vento forte a noite toda, abrindo um caminho em terra seca no meio das águas.',
          'Todo o povo de Israel atravessou o mar em segurança. Quando o exército egípcio tentou seguir, as águas voltaram ao normal.',
          'Do outro lado, o povo cantou e dançou, agradecendo a Deus pela grande libertação.',
        ],
      },
    ],
    quiz: [
      { id: 'mv-q1', question: 'Onde a mãe de Moisés o escondeu quando ele era bebê?', options: ['Numa caverna', 'Num cesto no rio', 'Na casa de um vizinho', 'No deserto'], correctIndex: 1, explanation: 'Ela colocou o bebê Moisés num cesto e o deixou no rio.' },
      { id: 'mv-q2', question: 'Quem encontrou e criou Moisés?', options: ['Uma pastora', 'A filha do Faraó', 'Uma profetisa', 'A rainha do Egito'], correctIndex: 1, explanation: 'A filha do Faraó encontrou o bebê e o criou como filho.' },
      { id: 'mv-q3', question: 'Como Deus falou com Moisés no deserto?', options: ['Por um sonho', 'Por um arbusto que ardia sem se queimar', 'Por um anjo visível', 'Por uma carta'], correctIndex: 1, explanation: 'Deus falou através de uma sarça (arbusto) que ardia em fogo, mas não se queimava.' },
      { id: 'mv-q4', question: 'O que Moisés pediu ao Faraó?', options: ['Mais comida', 'Que deixasse o povo de Israel ir embora', 'Um novo palácio', 'Terras no Egito'], correctIndex: 1, explanation: 'Moisés pediu que o Faraó libertasse o povo de Israel.' },
      { id: 'mv-q5', question: 'O que aconteceu quando o povo chegou ao Mar Vermelho?', options: ['Encontraram um barco', 'O exército do Faraó os perseguiu', 'Ficaram e voltaram para casa', 'Construíram uma ponte'], correctIndex: 1, explanation: 'O exército egípcio perseguiu o povo até a beira do mar.' },
      { id: 'mv-q6', question: 'O que Moisés fez com o bastão?', options: ['Bateu no chão', 'Estendeu sobre o mar e ele se abriu', 'Jogou no mar', 'Quebrou ao meio'], correctIndex: 1, explanation: 'Moisés estendeu o bastão e Deus abriu um caminho no mar.' },
      { id: 'mv-q7', question: 'Como o povo atravessou o mar?', options: ['Nadando', 'De barco', 'A pé, em terra seca', 'Voando'], correctIndex: 2, explanation: 'O povo atravessou a pé, em terra seca, no meio do mar aberto.' },
      { id: 'mv-q8', question: 'O que aconteceu com o exército egípcio?', options: ['Também atravessou em segurança', 'As águas voltaram e eles não passaram', 'Desistiram antes de chegar', 'Viraram amigos do povo'], correctIndex: 1, explanation: 'Quando tentaram atravessar, as águas voltaram ao normal.' },
    ],
  },

  // ============================================================
  // 5. JONAS E O GRANDE PEIXE
  // ============================================================
  {
    id: 'jonas-grande-peixe',
    title: 'Jonas e o Grande Peixe',
    reference: 'Jonas 1–4',
    theme: 'segunda-chance',
    summary: 'Jonas foge de uma missão, mas Deus lhe dá uma segunda chance.',
    cover: { sky: 'tempestade', ground: 'agua', motifs: ['boat', 'big-fish', 'storm-waves'] },
    verseId: 'v-obed-2',
    wordBank: ['JONAS', 'NINIVE', 'PEIXE', 'TEMPESTADE', 'OBEDIENCIA', 'BARCO', 'DEUS', 'PERDAO'],
    memoryPairs: [
      { icon: 'boat', label: 'Barco' },
      { icon: 'storm-waves', label: 'Tempestade' },
      { icon: 'big-fish', label: 'Grande Peixe' },
      { icon: 'scroll', label: 'Mensagem' },
      { icon: 'plant', label: 'Planta' },
      { icon: 'palace', label: 'Nínive' },
    ],
    chapters: [
      {
        id: 'jg-1',
        title: 'Deus chama Jonas',
        scene: { sky: 'dia', ground: 'agua', motifs: ['boat'] },
        pages: [
          'Deus pediu para o profeta Jonas ir até a grande cidade de Nínive e avisar que as pessoas precisavam se arrepender.',
          'Mas Jonas não quis ir. Em vez disso, ele foi até o porto e embarcou num navio na direção contrária, tentando fugir de Deus.',
        ],
      },
      {
        id: 'jg-2',
        title: 'A tempestade no mar',
        scene: { sky: 'tempestade', ground: 'agua', motifs: ['boat', 'storm-waves'] },
        pages: [
          'No meio da viagem, Deus enviou uma tempestade tão forte que o navio quase se partiu. Os marinheiros ficaram apavorados.',
          'Jonas contou que estava fugindo de Deus. A pedido dele mesmo, os marinheiros o jogaram ao mar — e a tempestade parou imediatamente.',
        ],
      },
      {
        id: 'jg-3',
        title: 'Três dias no grande peixe',
        scene: { sky: 'noite', ground: 'agua', motifs: ['big-fish', 'storm-waves'] },
        pages: [
          'Deus preparou um grande peixe para engolir Jonas, e ele ficou lá dentro por três dias e três noites.',
          'Dentro do peixe, Jonas orou muito e reconheceu que precisava obedecer a Deus, não fugir dele.',
        ],
        choice: {
          question: 'O que Jonas decidiu fazer dentro do peixe?',
          options: [
            { text: 'Confiar em Deus e se arrepender', correct: true, feedback: 'Isso mesmo! Jonas orou, reconheceu seu erro e decidiu obedecer a Deus.' },
            { text: 'Continuar fugindo de Deus', correct: false, feedback: 'Na Bíblia, Jonas parou de fugir — ele orou e decidiu obedecer.' },
          ],
        },
      },
      {
        id: 'jg-4',
        title: 'A segunda chance',
        scene: { sky: 'dia', ground: 'campo', motifs: ['big-fish', 'scroll'] },
        pages: [
          'O peixe cuspiu Jonas em terra firme. Deus, cheio de graça, chamou Jonas pela segunda vez, dando a ele uma nova chance.',
          'Dessa vez, Jonas obedeceu: foi até Nínive e anunciou a mensagem de Deus para toda a cidade.',
        ],
      },
      {
        id: 'jg-5',
        title: 'Nínive se arrepende',
        scene: { sky: 'entardecer', ground: 'campo', motifs: ['plant', 'palace'] },
        pages: [
          'Para surpresa de Jonas, toda a cidade de Nínive — do rei ao povo mais simples — se arrependeu de coração.',
          'Deus, em sua compaixão, decidiu não destruir a cidade. Jonas ficou até um pouco chateado, mas Deus lhe ensinou, com uma planta que cresceu e depois murchou, sobre o valor da misericórdia.',
          'A história de Jonas nos lembra que Deus sempre nos dá novas chances — e que sua compaixão alcança todo mundo.',
        ],
      },
    ],
    quiz: [
      { id: 'jg-q1', question: 'O que Deus pediu para Jonas fazer?', options: ['Construir um templo', 'Avisar a cidade de Nínive', 'Lutar contra um exército', 'Cuidar de ovelhas'], correctIndex: 1, explanation: 'Deus pediu para Jonas anunciar uma mensagem em Nínive.' },
      { id: 'jg-q2', question: 'O que Jonas fez em vez de obedecer?', options: ['Foi imediatamente', 'Fugiu em um navio', 'Escondeu-se em casa', 'Pediu ajuda a um amigo'], correctIndex: 1, explanation: 'Jonas fugiu, embarcando num navio para longe de Nínive.' },
      { id: 'jg-q3', question: 'O que aconteceu no mar enquanto ele fugia?', options: ['Nada de diferente', 'Uma grande tempestade', 'Um eclipse', 'Um arco-íris'], correctIndex: 1, explanation: 'Deus enviou uma tempestade forte sobre o mar.' },
      { id: 'jg-q4', question: 'O que os marinheiros fizeram com Jonas?', options: ['Esconderam-no', 'Jogaram-no ao mar', 'Levaram-no de volta ao porto', 'Deram-lhe mais comida'], correctIndex: 1, explanation: 'A pedido do próprio Jonas, os marinheiros o jogaram ao mar.' },
      { id: 'jg-q5', question: 'O que Deus preparou para salvar Jonas?', options: ['Um barco de resgate', 'Um grande peixe', 'Uma ilha', 'Uma tábua'], correctIndex: 1, explanation: 'Deus preparou um grande peixe para engolir e proteger Jonas.' },
      { id: 'jg-q6', question: 'Quantos dias Jonas ficou dentro do peixe?', options: ['1', '3', '7', '40'], correctIndex: 1, explanation: 'Jonas ficou três dias e três noites dentro do peixe.' },
      { id: 'jg-q7', question: 'O que Jonas fez na segunda vez que Deus o chamou?', options: ['Fugiu de novo', 'Obedeceu e foi a Nínive', 'Ignorou o chamado', 'Pediu para outra pessoa ir'], correctIndex: 1, explanation: 'Na segunda chance, Jonas obedeceu a Deus.' },
      { id: 'jg-q8', question: 'O que aconteceu com o povo de Nínive?', options: ['Não acreditaram em nada', 'Se arrependeram e Deus teve compaixão', 'Expulsaram Jonas', 'Fizeram uma guerra'], correctIndex: 1, explanation: 'Todo o povo de Nínive se arrependeu, e Deus não destruiu a cidade.' },
    ],
  },

  // ============================================================
  // 6. DANIEL NA COVA DOS LEÕES
  // ============================================================
  {
    id: 'daniel-cova-dos-leoes',
    title: 'Daniel na Cova dos Leões',
    reference: 'Daniel 6',
    theme: 'fidelidade',
    summary: 'Daniel continua fiel a Deus mesmo diante do perigo.',
    cover: { sky: 'noite', ground: 'pedra', motifs: ['lion', 'den', 'angel'] },
    verseId: 'v-coragem-2',
    wordBank: ['DANIEL', 'LEOES', 'COVA', 'ORACAO', 'FIDELIDADE', 'REI', 'ANJO', 'DEUS'],
    memoryPairs: [
      { icon: 'lion', label: 'Leão' },
      { icon: 'den', label: 'Cova' },
      { icon: 'scroll', label: 'Lei' },
      { icon: 'crown', label: 'Rei Dario' },
      { icon: 'angel', label: 'Anjo' },
      { icon: 'star', label: 'Oração' },
    ],
    chapters: [
      {
        id: 'dl-1',
        title: 'Daniel, o servo fiel',
        scene: { sky: 'dia', ground: 'palacio', motifs: ['palace', 'scroll'] },
        pages: [
          'Daniel era um homem sábio e fiel a Deus, que servia o rei Dario com tanta excelência que o rei pensava em torná-lo o principal líder do reino.',
          'Todos os dias, três vezes ao dia, Daniel se ajoelhava perto da janela e orava a Deus, como sempre fazia desde jovem.',
        ],
      },
      {
        id: 'dl-2',
        title: 'A inveja dos outros líderes',
        scene: { sky: 'dia', ground: 'palacio', motifs: ['palace', 'crown'] },
        pages: [
          'Outros líderes do reino ficaram com inveja da confiança que o rei tinha em Daniel e queriam encontrar algum erro dele.',
          'Mas não encontraram nenhuma falha — Daniel era honesto e fiel em tudo. Então decidiram usar a fé dele contra ele.',
        ],
      },
      {
        id: 'dl-3',
        title: 'A lei armadilha',
        scene: { sky: 'noite', ground: 'palacio', motifs: ['scroll', 'crown'] },
        pages: [
          'Os líderes convenceram o rei Dario a assinar uma lei: por 30 dias, ninguém poderia orar a nenhum deus, só ao rei — sob pena de ser jogado na cova dos leões.',
          'Quando Daniel soube da nova lei, foi para casa e viu a janela aberta, na direção de Jerusalém, como sempre fazia.',
        ],
        choice: {
          question: 'O que Daniel decidiu fazer quando soube da lei?',
          options: [
            { text: 'Continuar orando a Deus todos os dias', correct: true, feedback: 'Isso mesmo! Daniel continuou fiel, orando a Deus mesmo sabendo do risco.' },
            { text: 'Parar de orar para se proteger', correct: false, feedback: 'Na Bíblia, Daniel não parou de orar — ele continuou fiel a Deus mesmo com a nova lei.' },
          ],
        },
      },
      {
        id: 'dl-4',
        title: 'Daniel na cova dos leões',
        scene: { sky: 'noite', ground: 'pedra', motifs: ['lion', 'den'] },
        pages: [
          'Os líderes viram Daniel orando e correram para contar ao rei. Com muita tristeza, o rei Dario precisou cumprir a lei que ele mesmo tinha assinado.',
          'Daniel foi jogado na cova dos leões, e uma pedra fechou a entrada. O rei passou a noite toda sem conseguir dormir, preocupado com Daniel.',
        ],
      },
      {
        id: 'dl-5',
        title: 'Deus fecha a boca dos leões',
        scene: { sky: 'dia', ground: 'pedra', motifs: ['lion', 'den', 'angel'] },
        pages: [
          'Bem cedo, o rei correu até a cova e gritou: "Daniel, o teu Deus conseguiu te livrar dos leões?"',
          'Daniel respondeu: "Meu Deus enviou um anjo que fechou a boca dos leões, porque fui encontrado inocente diante dele."',
          'O rei mandou tirar Daniel da cova, sem nenhum arranhão, e decretou que todos no reino deveriam respeitar o Deus de Daniel.',
        ],
      },
    ],
    quiz: [
      { id: 'dl-q1', question: 'Quem era Daniel?', options: ['Um rei estrangeiro', 'Um servo fiel e sábio do rei', 'Um soldado', 'Um comerciante'], correctIndex: 1, explanation: 'Daniel era conhecido por sua fidelidade e sabedoria a serviço do rei.' },
      { id: 'dl-q2', question: 'Quantas vezes por dia Daniel orava?', options: ['Uma vez', 'Duas vezes', 'Três vezes', 'Cinco vezes'], correctIndex: 2, explanation: 'Daniel orava três vezes ao dia, como sempre fazia.' },
      { id: 'dl-q3', question: 'O que os outros líderes fizeram por inveja?', options: ['Convidaram Daniel para uma festa', 'Criaram uma lei para prendê-lo', 'Foram embora do reino', 'Pediram desculpas'], correctIndex: 1, explanation: 'Eles convenceram o rei a criar uma lei que colocaria Daniel em perigo.' },
      { id: 'dl-q4', question: 'O que a nova lei proibia?', options: ['Comer certos alimentos', 'Orar a qualquer um além do rei', 'Sair à noite', 'Usar certas roupas'], correctIndex: 1, explanation: 'A lei proibia orar a qualquer deus ou pessoa além do rei, por 30 dias.' },
      { id: 'dl-q5', question: 'O que aconteceu quando Daniel foi pego orando?', options: ['Foi perdoado na hora', 'Foi jogado na cova dos leões', 'Fugiu do reino', 'Foi expulso da cidade'], correctIndex: 1, explanation: 'Daniel foi jogado na cova dos leões por causa da lei.' },
      { id: 'dl-q6', question: 'Quem fechou a boca dos leões?', options: ['O próprio Daniel', 'Um anjo de Deus', 'O rei Dario', 'Ninguém, os leões dormiram'], correctIndex: 1, explanation: 'Deus enviou um anjo para fechar a boca dos leões.' },
      { id: 'dl-q7', question: 'Por que Daniel foi protegido?', options: ['Por sorte', 'Porque foi encontrado inocente diante de Deus', 'Porque os leões já estavam alimentados', 'Porque o rei mudou a lei a tempo'], correctIndex: 1, explanation: 'Daniel foi protegido por sua fidelidade e inocência diante de Deus.' },
      { id: 'dl-q8', question: 'O que o rei fez depois de tirar Daniel da cova?', options: ['Puniu Daniel mesmo assim', 'Mandou todos respeitarem o Deus de Daniel', 'Esqueceu o assunto', 'Expulsou Daniel do reino'], correctIndex: 1, explanation: 'O rei Dario decretou que todos no reino deveriam respeitar o Deus de Daniel.' },
    ],
  },
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function storyIndex(id: string): number {
  return STORIES.findIndex((s) => s.id === id);
}
