export interface StoryArtAsset {
  alt: string;
  focalPoint?: string;
  guide?: 'left' | 'right';
  src: string;
}

const base = import.meta.env.BASE_URL;
const creation = `${base}story-art/genesis/gn-01`;

const STORY_ART: Record<string, StoryArtAsset> = {
  'gn-01-criacao': {
    alt: 'Jardim cheio de vida, árvores, rio e animais sob a luz do amanhecer',
    focalPoint: '50% 50%',
    guide: 'right',
    src: `${creation}/cover.svg`,
  },
  'gn-01-c1': {
    alt: 'A escuridão do começo sendo iluminada por estrelas e pela primeira luz',
    focalPoint: '50% 45%',
    guide: 'right',
    src: `${creation}/01-no-comeco.svg`,
  },
  'gn-01-c2': {
    alt: 'A luz surgindo sobre o mar, a terra e as primeiras plantas',
    focalPoint: '50% 55%',
    guide: 'left',
    src: `${creation}/02-haja-luz.svg`,
  },
  'gn-01-c3': {
    alt: 'Sol, lua e estrelas sobre um mar com peixes e um céu cheio de aves',
    focalPoint: '50% 45%',
    guide: 'right',
    src: `${creation}/03-luzes-peixes-aves.svg`,
  },
  'gn-01-c4': {
    alt: 'Animais grandes e pequenos reunidos em um campo cheio de vida',
    focalPoint: '50% 58%',
    guide: 'left',
    src: `${creation}/04-animais.svg`,
  },
  'gn-01-c5': {
    alt: 'Adão e Eva contemplando o jardim criado por Deus',
    focalPoint: '50% 52%',
    src: `${creation}/05-deus-criou-voce.svg`,
  },
};

export function getStoryArt(id?: string): StoryArtAsset | undefined {
  return id ? STORY_ART[id] : undefined;
}
