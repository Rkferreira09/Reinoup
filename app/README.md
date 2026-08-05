# ReinoUp

Web App (PWA) de histórias bíblicas gamificadas para crianças — React + TypeScript + Vite.

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build de produção

```bash
npm run build      # gera dist/ (inclui manifest + service worker)
npm run preview     # serve o build de produção localmente
```

Depois de `npm run preview`, abra no navegador do celular (mesma rede) ou no Chrome desktop e use "Instalar app" — é um PWA instalável e funciona offline.

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** — paleta e tokens em `src/index.css` (`@theme`)
- **React Router v7** (`src/router.tsx`) — rotas de onboarding, app principal (`/app/*`) e Área dos Pais (`/pais/*`, protegida por PIN)
- **Zustand + persist** (`src/store/`) — todo o progresso é salvo em `localStorage`, sem backend
- **Framer Motion** — transições de tela e microanimações
- **vite-plugin-pwa** — manifest + service worker (offline-first)

## Estrutura

```
src/
  content/       # histórias, versículos, missões, medalhas, planos, itens de avatar (dados estáticos)
  store/         # authStore, progressStore, settingsStore, friendsStore
  lib/           # economia (moedas/XP), streak, medalhas, missões, gerador de caça-palavras, datas
  components/    # ui/ (botões, cards...), mascot/ (o cordeirinho em SVG), illustrations/ (cenas por história)
  screens/       # onboarding/, main/, story/, games/, parent/, subscription/
  hooks/         # narração por voz, gravação de áudio, cronômetro de uso, bloqueio por horário
```

## Limitações conhecidas (protótipo local)

- Sem backend: login social (Google/Apple) é simulado; não há sincronização entre aparelhos.
- Planos de assinatura são apenas UI — "Assinar agora" não cobra de verdade.
- Ranking de amigos usa dados fictícios (não há servidor multiplayer).
- Notificações usam a Notification API do navegador (lembretes locais); não é push real em segundo plano.
- O PIN da Área dos Pais é uma barreira de uso, não segurança real — é a limitação inerente de um app 100% client-side.
