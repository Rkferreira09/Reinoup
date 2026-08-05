import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { simpleHash } from '../lib/hash';
import type { AgeBand } from '../content/types';

export type Audience = 'crianca' | 'pai' | null;

export interface ChildProfile {
  name: string;
  age: number;
  ageBand: AgeBand;
  avatarSeed: string;
}

interface AuthState {
  audience: Audience;
  isAuthenticated: boolean;
  email: string | null;
  passwordHash: string | null;
  childProfile: ChildProfile | null;
  parentPinHash: string | null;

  setAudience: (a: Audience) => void;
  register: (email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  mockSocialLogin: (provider: 'google' | 'apple') => void;
  logout: () => void;
  completeChildOnboarding: (profile: ChildProfile) => void;
  setParentPin: (pin: string) => void;
  verifyParentPin: (pin: string) => boolean;
  hasParentPin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      audience: null,
      isAuthenticated: false,
      email: null,
      passwordHash: null,
      childProfile: null,
      parentPinHash: null,

      setAudience: (a) => set({ audience: a }),

      register: (email, password) => {
        if (!email.includes('@')) return { ok: false, error: 'Digite um e-mail válido.' };
        if (password.length < 4) return { ok: false, error: 'A senha precisa ter pelo menos 4 caracteres.' };
        set({ email, passwordHash: simpleHash(password), isAuthenticated: true });
        return { ok: true };
      },

      login: (email, password) => {
        const state = get();
        if (state.email && state.email.toLowerCase() === email.toLowerCase() && state.passwordHash === simpleHash(password)) {
          set({ isAuthenticated: true });
          return { ok: true };
        }
        if (!state.email) {
          // No local account yet in this browser — create one on the fly (this is a local-only demo).
          return get().register(email, password);
        }
        return { ok: false, error: 'E-mail ou senha incorretos.' };
      },

      mockSocialLogin: (provider) => {
        set({
          email: get().email ?? `contato+${provider}@reinoup.app`,
          passwordHash: get().passwordHash ?? simpleHash('social-login'),
          isAuthenticated: true,
        });
      },

      logout: () => set({ isAuthenticated: false }),

      completeChildOnboarding: (profile) => set({ childProfile: profile }),

      setParentPin: (pin) => set({ parentPinHash: simpleHash(pin) }),

      verifyParentPin: (pin) => {
        const state = get();
        if (!state.parentPinHash) return pin === '0000';
        return state.parentPinHash === simpleHash(pin);
      },

      hasParentPin: () => Boolean(get().parentPinHash),
    }),
    { name: 'reinoup-auth' }
  )
);
