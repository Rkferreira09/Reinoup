import type { Mission } from './types';

export const MISSIONS: Mission[] = [
  {
    id: 'trilha-discipulos',
    kind: 'trilha',
    title: 'Conheça os 12 discípulos',
    subtitle: 'Descubra quem foram os amigos mais próximos de Jesus.',
    target: 12,
    reward: { coins: 120, xp: 150 },
  },
  {
    id: 'tematica-coragem',
    kind: 'tematica',
    title: 'Semana da Coragem',
    subtitle: 'Complete histórias que ensinam sobre coragem.',
    target: 5,
    reward: { coins: 80, xp: 100 },
  },
  {
    id: 'colecao-amor',
    kind: 'colecao',
    title: 'Versículos sobre amor',
    subtitle: 'Junte 10 versículos sobre o amor de Deus.',
    target: 10,
    reward: { coins: 100, xp: 120 },
  },
  {
    id: 'vida-real-ajudar',
    kind: 'vida-real',
    title: 'Ajude sua família hoje',
    subtitle: 'Ajude alguém da sua casa sem que peçam.',
    target: 1,
    reward: { coins: 40, xp: 50 },
  },
  {
    id: 'vida-real-orar',
    kind: 'vida-real',
    title: 'Ore por um amigo',
    subtitle: 'Escolha um amigo e ore por ele hoje.',
    target: 1,
    reward: { coins: 40, xp: 50 },
  },
  {
    id: 'vida-real-perdoar',
    kind: 'vida-real',
    title: 'Pratique o perdão',
    subtitle: 'Perdoe alguém ou peça perdão a alguém hoje.',
    target: 1,
    reward: { coins: 40, xp: 50 },
  },
  {
    id: 'vida-real-compartilhar',
    kind: 'vida-real',
    title: 'Compartilhe algo seu',
    subtitle: 'Divida um brinquedo, doce ou seu tempo com alguém.',
    target: 1,
    reward: { coins: 40, xp: 50 },
  },
  {
    id: 'vida-real-versiculo',
    kind: 'vida-real',
    title: 'Espalhe a Palavra',
    subtitle: 'Diga um versículo para alguém da sua família.',
    target: 1,
    reward: { coins: 40, xp: 50 },
  },
];

/** Which badge (if any) a completed vida-real mission unlocks. */
export const VIDA_REAL_BADGE: Record<string, string> = {
  'vida-real-ajudar': 'generous-heart',
  'vida-real-orar': 'faithful-friend',
  'vida-real-perdoar': 'forgiveness-in-action',
};

export function getMission(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
