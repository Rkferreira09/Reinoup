# Modelo de Conteúdo — ReinoUp

Como o conteúdo bíblico do ReinoUp é estruturado, escrito e adicionado.
Vale para Gênesis e para todo livro que vier depois.

---

## 1. Hierarquia

```
TEMPORADA (livro)  →  BLOCO (arco)  →  HISTÓRIA (fase)  →  CAPÍTULO (cena)
```

| Nível | Onde vive | Exemplo |
|---|---|---|
| Temporada | `content/seasons.ts` | Gênesis — "Deus estava lá" |
| Bloco | `content/seasons.ts` | `gn-b5` — "José: do Poço ao Palácio" |
| História | `content/seasons/<livro>/NN-slug.ts` | `gn-01-criacao` |
| Capítulo | dentro do arquivo da história | `gn-01-c1` |

O **bloco** define onde ficam os baús da trilha, as missões temáticas e as
medalhas de progresso. Toda temporada precisa de blocos.

---

## 2. Convenção de IDs

Trave isso. É o que impede colisão quando houver 250 histórias.

| Coisa | Padrão | Exemplo |
|---|---|---|
| Livro | abreviação bíblica | `gn`, `ex`, `js`, `1sm` |
| História | `<livro>-<ordem 2 dígitos>-<slug>` | `gn-27-jose-irmaos` |
| Capítulo | `<id da história>-c<n>` | `gn-27-c3` |
| Quiz | `<id da história>-q<n>` | `gn-27-q4` |
| Versículo da história | `v-<livro>-<ordem>` | `v-gn-01` |
| Versículo temático | `v-<valor>-<n>` | `v-amor-3` |
| Bloco | `<livro>-b<n>` | `gn-b2` |
| Medalha de bloco | `md-<livro>-bloco-<n>` | `md-gn-bloco-2` |

Ordem com zero à esquerda (`01`, não `1`) — assim a ordenação alfabética dos
arquivos já é a ordem correta da temporada.

**Nenhuma história pode ser criada com um id que não esteja no roadmap**
(`GENESIS_ROADMAP` em `content/seasons.ts`).

---

## 3. Onde o conteúdo mora

```
app/src/content/
├── types.ts               # schema
├── valores.ts             # os 11 valores
├── seasons.ts             # temporadas, blocos e o roadmap das 39
├── stories.ts             # barrel: catálogo, desbloqueio, leitura por idade
├── verses.ts
└── seasons/
    ├── genesis/
    │   ├── index.ts       # registra as aulas escritas
    │   └── 01-criacao.ts  # uma história por arquivo
    └── bonus/
        ├── index.ts       # adapta o conteúdo do MVP
        └── legacy.ts      # schema antigo, não editar
```

**Um arquivo por história.** Não existe arquivo com duas histórias.

O conteúdo é **estático, versionado no git** — nunca no banco. É o que faz o
app funcionar offline e carregar instantâneo. O Postgres guarda só progresso,
perfis e eventos.

---

## 4. Gramática de autoria

Regras fixas. É o que faz 39 histórias parecerem uma coisa só.

| Elemento | Regra |
|---|---|
| Capítulos | 4 a 5 por história |
| Páginas por capítulo | 2 a 3 |
| Página `5-7` | 25 a 45 palavras · frases curtas · uma ideia por frase |
| Página `8-10` | 50 a 90 palavras · pode ter diálogo e subordinada |
| Corte | Todo capítulo termina em gancho, exceto o último |
| Ponto de escolha | Exatamente 1, no **penúltimo** capítulo |
| Quiz | 6 perguntas: 2 fato · 2 compreensão · 1 versículo · 1 aplicação |
| Feedback do erro | Sempre explica a resposta certa. **Nunca julga.** |
| `wordBank` | 6 a 8 palavras · MAIÚSCULAS · sem acento · 4 a 8 letras |
| `memoryPairs` | Exatamente 6 |
| `orderSteps` | Exatamente 5, já na ordem certa |
| Duração alvo | 5 a 7 minutos de leitura |

### As duas faixas etárias não são opcionais

`Chapter.pages` exige `'5-7'` e `'8-10'` escritos de verdade. Não duplique o
mesmo texto: o filho de 5 anos trava com o texto do de 10, e o de 10 acha
infantil o texto do de 5.

> O conteúdo legado em `seasons/bonus/` duplica o texto nas duas faixas — é um
> andaime temporário, marcado no código. Conteúdo novo nunca faz isso.

---

## 5. Segurança editorial

Marque `sensibilidade` e adapte a narração de `5-7`.

| Tag | Aparece em | Regra para `5-7` |
|---|---|---|
| `violencia` | Caim e Abel | "machucou o irmão" — foco na raiva e na escolha |
| `morte` | Caim, morte de Sara, morte de Jacó | nomear sem descrever; ir para o consolo |
| `destruicao` | Sodoma e Gomorra | "a cidade ia acabar"; sem detalhe |
| `engano` | Jacó e Isaque, Esaú | foco na consequência |
| `arranjo-familiar` | Agar, Raquel e Lia | "formou uma grande família"; sem explicar |

---

## 6. Os valores

`content/valores.ts` — a taxonomia oficial de caráter. Cada história tem **um**
`valor` primário; secundários são opcionais.

Ela alimenta três coisas: a Trilha de Valores no relatório dos pais, as missões
temáticas e a Árvore da Palavra (cada valor mapeia numa das 8 palavras da
árvore via `palavraArvore`).

Não invente valor novo por história. Se nenhum servir, o problema é o recorte
da lição, não a taxonomia.

---

## 7. Como adicionar uma história

1. Confirme o slot no `GENESIS_ROADMAP` (id, ordem, valor, sensibilidade).
2. Crie `content/seasons/<livro>/NN-slug.ts` exportando um `Story`.
3. Registre no `index.ts` da temporada.
4. Adicione o versículo `v-<livro>-NN` em `verses.ts`.
5. Se a cena pedir um motivo visual novo, adicione em `types.ts` **e** desenhe
   o SVG em `components/illustrations/MotifIcon.tsx`.
6. `npm run build` — o TypeScript recusa história incompleta.
7. Teste na Sala Zero antes de considerar pronta.

---

## 8. Desbloqueio

Temporada sequencial (`sequencial: true`): a fase N+1 abre quando a N é
concluída. A trilha mostra as fases travadas com cadeado desde o primeiro dia —
ver o que falta é o que puxa a criança.

Lógica em `stories.ts`: `isStoryUnlocked()` e `proximaHistoria()`.
