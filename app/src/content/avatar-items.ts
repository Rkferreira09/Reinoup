export type AvatarItemKind = 'outfit' | 'accessory' | 'background';

export type AvatarUnlock = { type: 'free' } | { type: 'coins'; cost: number } | { type: 'badge'; badgeId: string };

export interface AvatarItem {
  id: string;
  kind: AvatarItemKind;
  label: string;
  /** hex color for outfits/backgrounds, or a glyph key the SVG renderer understands for accessories */
  value: string;
  unlock: AvatarUnlock;
}

export const AVATAR_ITEMS: AvatarItem[] = [
  // outfits (hoodie color)
  { id: 'outfit-azul', kind: 'outfit', label: 'Manto Azul', value: '#1B3A6B', unlock: { type: 'free' } },
  { id: 'outfit-verde', kind: 'outfit', label: 'Manto Verde', value: '#2E7D32', unlock: { type: 'coins', cost: 40 } },
  { id: 'outfit-vermelho', kind: 'outfit', label: 'Manto Vermelho', value: '#B3432B', unlock: { type: 'coins', cost: 40 } },
  { id: 'outfit-roxo', kind: 'outfit', label: 'Manto Roxo', value: '#5B3A8E', unlock: { type: 'coins', cost: 55 } },
  { id: 'outfit-dourado', kind: 'outfit', label: 'Manto Dourado do Reino', value: '#C9971F', unlock: { type: 'badge', badgeId: 'old-testament-complete' } },
  { id: 'outfit-familia', kind: 'outfit', label: 'Manto da Voz de Casa', value: '#7A4B2E', unlock: { type: 'badge', badgeId: 'family-voice' } },

  // accessories
  { id: 'acc-nenhum', kind: 'accessory', label: 'Nenhum', value: 'none', unlock: { type: 'free' } },
  { id: 'acc-capa', kind: 'accessory', label: 'Capa de Herói', value: 'capa', unlock: { type: 'coins', cost: 50 } },
  { id: 'acc-mochila', kind: 'accessory', label: 'Mochila de Jornada', value: 'mochila', unlock: { type: 'coins', cost: 30 } },
  { id: 'acc-cajado', kind: 'accessory', label: 'Cajado de Moisés', value: 'cajado', unlock: { type: 'badge', badgeId: 'quiz-master' } },
  { id: 'acc-funda', kind: 'accessory', label: 'Funda de Davi', value: 'funda', unlock: { type: 'badge', badgeId: 'streak-7' } },
  { id: 'acc-coroa', kind: 'accessory', label: 'Coroa do Reino', value: 'coroa', unlock: { type: 'badge', badgeId: 'streak-30' } },

  // backgrounds
  { id: 'bg-campo', kind: 'background', label: 'Campo Verde', value: '#DFF2E1', unlock: { type: 'free' } },
  { id: 'bg-deserto', kind: 'background', label: 'Deserto Dourado', value: '#F3E6CD', unlock: { type: 'coins', cost: 30 } },
  { id: 'bg-noite', kind: 'background', label: 'Noite Estrelada', value: '#152F57', unlock: { type: 'coins', cost: 50 } },
  { id: 'bg-palacio', kind: 'background', label: 'Palácio do Reino', value: '#E8D9B5', unlock: { type: 'badge', badgeId: 'five-stories' } },
];

export function getAvatarItem(id: string): AvatarItem | undefined {
  return AVATAR_ITEMS.find((i) => i.id === id);
}

export function itemsByKind(kind: AvatarItemKind): AvatarItem[] {
  return AVATAR_ITEMS.filter((i) => i.kind === kind);
}

export function badgeGrantedItems(badgeId: string): AvatarItem[] {
  return AVATAR_ITEMS.filter((i) => i.unlock.type === 'badge' && i.unlock.badgeId === badgeId);
}
