export type AgeBand = '5-7' | '8-10';

export type Theme =
  | 'coragem'
  | 'obediencia'
  | 'perdao'
  | 'fe'
  | 'segunda-chance'
  | 'fidelidade'
  | 'gratidao'
  | 'amor'
  | 'generosidade';

export type SkyMood = 'dia' | 'entardecer' | 'noite' | 'tempestade';
export type GroundMood = 'campo' | 'deserto' | 'agua' | 'pedra' | 'palacio';

export type Motif =
  | 'sheep'
  | 'shepherd-boy'
  | 'sling'
  | 'giant'
  | 'sword'
  | 'ark'
  | 'rain'
  | 'rainbow'
  | 'dove'
  | 'tent'
  | 'coat-colorful'
  | 'well'
  | 'grain'
  | 'crown'
  | 'staff'
  | 'sea-split'
  | 'chariot'
  | 'fire-column'
  | 'boat'
  | 'big-fish'
  | 'storm-waves'
  | 'plant'
  | 'lion'
  | 'den'
  | 'star'
  | 'angel'
  | 'scroll'
  | 'mountain'
  | 'palace'
  | 'basket';

export interface SceneConfig {
  sky: SkyMood;
  ground: GroundMood;
  motifs: Motif[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StoryChoice {
  question: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

export interface Chapter {
  id: string;
  title: string;
  pages: string[]; // narration paragraphs, one "page" each
  scene: SceneConfig;
  choice?: StoryChoice; // appears after the last page of this chapter
}

export interface Story {
  id: string;
  title: string;
  reference: string;
  theme: Theme;
  summary: string;
  cover: SceneConfig;
  chapters: Chapter[];
  quiz: QuizQuestion[];
  verseId: string; // the verse to memorize tied to this story
  wordBank: string[]; // for the word-search game
  memoryPairs: { icon: Motif; label: string }[]; // for the memory game
}

export interface VerseVariant {
  '5-7': string;
  '8-10': string;
}

export interface Verse {
  id: string;
  reference: string;
  text: VerseVariant;
  category: Theme;
}

export interface Disciple {
  id: string;
  name: string;
  fact: string;
}

export type BadgeCategory = 'progresso' | 'constancia' | 'dominio' | 'carater' | 'secreta';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string; // emoji glyph used inside the medal
}

export type MissionKind = 'trilha' | 'tematica' | 'colecao' | 'vida-real';

export interface Mission {
  id: string;
  kind: MissionKind;
  title: string;
  subtitle: string;
  target: number;
  reward: { coins: number; xp: number };
}

export interface Plan {
  id: 'essencial' | 'completo' | 'familia';
  name: string;
  monthlyPrice: number;
  features: string[];
  highlight?: boolean;
}
