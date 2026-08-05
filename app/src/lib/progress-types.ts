export interface StoryProgress {
  chaptersCompleted: number;
  completed: boolean;
  choiceIndex?: number;
  quizBestScore?: number;
  quizAttempts: number;
}

export type DailyTaskId = 'ouvir-historia' | 'acertar-quiz' | 'decorar-versiculo';

export interface DailyTask {
  id: DailyTaskId;
  label: string;
  done: boolean;
  target: number;
  progress: number;
}

export interface DailyChallengeState {
  date: string;
  tasks: DailyTask[];
  chestOpened: boolean;
}

export interface QuizAttemptLog {
  storyId: string;
  score: number;
  total: number;
  date: string;
}

export interface MissionRuntimeState {
  completed: boolean;
  pendingParentConfirm: boolean;
  completedDate?: string;
}

export interface AvatarState {
  outfit: string;
  accessory: string | null;
  background: string;
  unlockedOutfits: string[];
  unlockedAccessories: string[];
  unlockedBackgrounds: string[];
}

export type ToastKind = 'badge' | 'levelup' | 'mission' | 'coins' | 'info';

export interface ToastItem {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
  icon?: string;
}

export interface ProgressState {
  coins: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string | null;
  shieldsAvailable: number;
  stories: Record<string, StoryProgress>;
  versesCollected: string[];
  stickersCollected: string[];
  badgesUnlocked: string[];
  quizHistory: QuizAttemptLog[];
  dailyChallenge: DailyChallengeState;
  missions: Record<string, MissionRuntimeState>;
  disciplesLearned: string[];
  activityLog: { date: string; kind: 'historia' | 'quiz' | 'versiculo' | 'jogo' | 'missao'; label: string }[];
  activityMinutes: Record<string, number>;
  avatar: AvatarState;
  weeklyXp: { weekKey: string; xp: number };
  usedBeforeSevenAm: boolean;
  toasts: ToastItem[];
}
