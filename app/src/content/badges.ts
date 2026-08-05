import type { Badge } from './types';

export const BADGES: Badge[] = [
  { id: 'first-story', name: 'Primeira História', description: 'Concluiu sua primeira história bíblica.', category: 'progresso', icon: '📖' },
  { id: 'five-stories', name: 'Cinco Histórias', description: 'Concluiu 5 histórias bíblicas.', category: 'progresso', icon: '📚' },
  { id: 'old-testament-complete', name: 'Todas as Histórias', description: 'Concluiu todas as histórias disponíveis.', category: 'progresso', icon: '👑' },

  { id: 'streak-7', name: '7 Dias de Fé', description: 'Manteve a ofensiva por 7 dias seguidos.', category: 'constancia', icon: '🔥' },
  { id: 'streak-14', name: '14 Dias de Fé', description: 'Manteve a ofensiva por 14 dias seguidos.', category: 'constancia', icon: '🔥' },
  { id: 'streak-30', name: '30 Dias de Fé', description: 'Manteve a ofensiva por 30 dias seguidos.', category: 'constancia', icon: '🏆' },

  { id: 'first-verse', name: 'Primeiro Versículo', description: 'Decorou o primeiro versículo.', category: 'dominio', icon: '⭐' },
  { id: 'verse-master-20', name: '20 Versículos Decorados', description: 'Decorou 20 versículos.', category: 'dominio', icon: '📜' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Acertou pelo menos 80% em 10 quizzes.', category: 'dominio', icon: '🧠' },

  { id: 'generous-heart', name: 'Coração Generoso', description: 'Completou uma missão de ajudar alguém.', category: 'carater', icon: '❤️' },
  { id: 'faithful-friend', name: 'Amigo Fiel', description: 'Completou uma missão de orar por um amigo.', category: 'carater', icon: '🤝' },
  { id: 'forgiveness-in-action', name: 'Perdão em Ação', description: 'Completou uma missão de perdoar alguém.', category: 'carater', icon: '🕊️' },

  { id: 'early-bird', name: 'Madrugador', description: 'Usou o ReinoUp antes das 7h da manhã.', category: 'secreta', icon: '🌅' },
];

export function getBadge(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
