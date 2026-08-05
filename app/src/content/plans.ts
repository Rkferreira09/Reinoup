import type { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    monthlyPrice: 10.9,
    features: ['Histórias', 'Versículo do dia', 'Quiz', 'Desafios diários'],
  },
  {
    id: 'completo',
    name: 'Completo',
    monthlyPrice: 19.9,
    highlight: true,
    features: ['Tudo do Essencial', 'Jogos ilimitados', 'Missões exclusivas', 'Relatórios dos pais', 'Avatares exclusivos'],
  },
  {
    id: 'familia',
    name: 'Família',
    monthlyPrice: 29.9,
    features: ['Tudo do Completo', 'Até 4 crianças', 'Suporte prioritário'],
  },
];

export const ANNUAL_DISCOUNT = 0.2;
