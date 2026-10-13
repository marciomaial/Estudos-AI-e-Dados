# MSC Bank — plano de construção do site e da plataforma beta

> Base: `msc-bank-beta.md` (especificação v0.1, 13/10/2026) + design system **Ledger** (“developer-monetizati”, ds.asimov.academy).
> Objetivo deste documento: dizer **o que construir, em que ordem e com qual linguagem visual**, para que o grupo (ou um agente de código) execute sem precisar reinterpretar o design system.

---

## 1. Visão geral: dois produtos, um design system

| Produto | Para quem | Objetivo | Referência no Ledger |
|---|---|---|---|
| **Site institucional** (`/`) | Pequena indústria, comprador âncora, financiador, banca do hackathon | Explicar a proposta, gerar confiança e capturar interesse (convite / lista de espera) | Página “Overview”: hero com cena laser, seções em moldura gradiente, cards de métrica, pricing, depoimentos, footer com wordmark |
| **Plataforma beta** (`/app`) | Fornecedor, comprador âncora, operador MSC | Rodar o fluxo nota → confirmação → antecipação → liquidação | “Dashboard” do Ledger: sidebar `#0c0d10`, header sticky com breadcrumb, KPI cards, gráfico de área, lista de atividade, segmented range |

Os dois vivem no **mesmo projeto Next.js** (stack da seção 11 da especificação) e compartilham os mesmos tokens, componentes e motion.

**Princípio de adaptação:** o Ledger é um DS “dark fintech para desenvolvedores”. Mantemos **canvas preto, bordas hairline brancas, acento esmeralda, tipografia Geist leve e motion de entrada com blur**, mas trocamos o tom: o público é dono de fábrica abrindo pelo WhatsApp. Então: menos jargão, números grandes e legíveis, valor líquido sempre em destaque, motion que nunca atrapalha a leitura.

---

## 2. Fundamentos visuais (tokens a implementar)

### 2.1 Tipografia

Fonte única de UI: **Geist** (via `next/font/google` ou pacote `geist`). Mono: `Geist Mono` / `ui-monospace` para códigos de NF, chaves de acesso e trilha de auditoria.

| Papel | Especificação Ledger | Uso no MSC Bank |
|---|---|---|
| Display · hero | Geist 300, `tracking-tight`, `leading-[1.1]`, 72px / 48px mobile | H1 do site: “Receba hoje pelo que você já vendeu.” |
| Metric display | Geist 300, `tabular-nums`, 60px | Contador do hero: “R$ 2,4 mi antecipados” |
| H2 seção | Geist 300, `tracking-tight`, 48px / 30px | Títulos de seção do site |
| Balance figure | Geist 600, `tracking-tight`, 36px + centavos 24px em `neutral-600` | **Valor líquido** no simulador e saldo “disponível para antecipar” |
| H3 feature | Geist 600, 30px / 24px | Títulos de cards de recurso |
| Stat value | Geist 600, 30px | KPI cards do app |
| H4 card | Geist 600, 20px | Título de card |
| Lead | Geist 400, 18px, `leading-relaxed` | Subtítulo do hero |
| Texto seção | Geist 300, 18px/16px, `max-w-[60ch]`, `slate-400` | Parágrafos de seção |
| Texto card | Geist 300, 14px | Descrições em cards |
| Eyebrow | Geist 600, uppercase, `tracking-wide`, 14px + régua 24px esmeralda | Rótulo acima do H2 (“Como funciona”) |
| UI label | Geist 500, 14px | Nav, labels de formulário |
| Overline | Geist 600, uppercase, `tracking-wider`, 11px, `neutral-600` | Grupos da sidebar (“Antecipação”, “Cadastro”) |
| Caption / Micro | 12px / 10px | Eixos de gráfico, datas, badges |
| Wordmark | Geist 700, `tracking-tighter`, `text-[13vw]`, `text-white/5` | “MSC BANK” fantasma no footer |

> Regra MSC: todo valor monetário usa `tabular-nums` e formato `R$ 1.234,56` (`Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`).

### 2.2 Cores

```ts
// tailwind.config.ts — theme.extend.colors
ledger: {
  canvas:   '#000000', // página e navbar pill
  card:     '#0A0B0E', // cards do site, footer
  app:      '#0c0d10', // sidebar, main e header do app
  inner:    '#121317', // cards do app, campos, track do segmented
  track:    '#14181F', // pills de período
  tooltip:  '#1a1b20', // label de gráfico / hover de campo (#16171b)
  elevated: { from: '#1c1d24', to: '#121317' }, // card de saldo
  terminal: { from: '#0f1115', to: '#000000' },
}
```

| Função | Valor | Uso no MSC Bank |
|---|---|---|
| Acento | `emerald-500 #10b981` | CTAs de acento, toggle, dots “ao vivo”, pill selecionada |
| Texto de acento | `emerald-400 #34d399` | Eyebrows, **economia vs. cheque especial**, linha de gráfico |
| Gradiente de barra | `emerald-600 → emerald-400` (pico `→ emerald-300`) | Barras de recebíveis por mês |
| Glow | `rgba(16,185,129,.2–.5)` | Halo de pills/badges ativas |
| Texto primário | `#fff` | Títulos e valores |
| Texto padrão | `slate-300` | Corpo |
| Texto secundário | `slate-400` / `neutral-400` | Copy de seção, labels |
| Muted / Faint | `neutral-500` / `neutral-600` | Datas, unidades, centavos |
| Borda card | `white/10` → hover `white/20` | Cards |
| Hairline | `white/5` | Divisores, cards internos |
| Positivo | `#34d399` sobre `emerald-500/10` | Valor recebido, economia |
| Negativo | `rose-500 #f43f5e` sobre `rose-500/10` | Atraso, recusa, custo acima do teto |
| Aviso | `yellow-400 #facc15` | Pendências, notificação não lida, linha de comparação (cheque especial) |
| Secundário | `purple-500 #a855f7` | Orb de glow; série secundária de gráfico |

**Mapeamento de status (badges)** — reaproveitando os “delta chips” e “labels/pills” do Ledger:

| Status | Estilo |
|---|---|
| `IMPORTADA`, `RASCUNHO` | neutro: `bg-white/5 border-white/10 text-neutral-400` |
| `CONFIRMADA` (elegível), `APROVADA` | esmeralda: `bg-emerald-500/10 border-emerald-500/20 text-emerald-400` |
| `SOLICITADA`, `EM_ANTECIPACAO`, aguardando confirmação | amarelo: `bg-yellow-400/10 border-yellow-400/20 text-yellow-400` |
| `PAGA_AO_FORNECEDOR`, `ANTECIPADA` | esmeralda sólido: `bg-emerald-500 text-black` + glow |
| `LIQUIDADA`, `PAGA` | branco: `bg-white/10 text-white` |
| `RECUSADA`, `CONTESTADA`, `EM_ATRASO` | rosa: `bg-rose-500/10 border-rose-500/20 text-rose-500` |
| `CANCELADA`, `VENCIDA_SEM_ANTECIPACAO` | faint: `text-neutral-600 line-through` opcional |

Status nunca é só cor: sempre com texto (“Em atraso”) e, quando couber, ícone.

### 2.3 Superfícies

| Superfície | Classe | Onde usar |
|---|---|---|
| Card | `bg-[#0A0B0E] border border-white/10 rounded-3xl shadow-2xl hover:border-white/20` | Site: features, pricing, footer |
| Inner card | `bg-[#121317] border border-white/5 rounded-2xl hover:border-white/10` | App: KPIs, tabelas, simulador |
| Elevated | `bg-gradient-to-br from-[#1c1d24] to-[#121317]` + círculo `emerald-500/5 blur-[40px]` | Card “Disponível para antecipar” e resumo do simulador |
| Tile | `bg-white/[0.02] border-white/5 rounded-2xl hover:bg-white/[0.05]` | Mini-features, passos do “Como funciona” |
| List row | `bg-white/[0.03] border-white/5 rounded-xl hover:border-emerald-500/20` | Linhas de checklist, notas no mobile |
| Terminal well | `from-[#0f1115] to-black border-white/5 rounded-2xl` | Linha do tempo / trilha de auditoria (estilo log) |
| Tooltip glass | `bg-slate-900/90 backdrop-blur-md border-white/10 rounded-lg` | Tooltips de gráfico e explicações (“o que é deságio?”) |
| Navbar pill | `sticky top-4 bg-black border-white/10 rounded-full p-4 backdrop-blur-md` | Navbar do site |
| Moldura de seção | `bg-gradient-to-br from-white/10 via-white/0 to-white/10 rounded-3xl p-8` | Envolve cada seção do site |

### 2.4 Fundos

- **Hero:** cena laser/aurora (Unicorn Studio no Ledger). Plano: usar **uma versão própria e leve** — (a) criar a cena no Unicorn Studio com conta do grupo, ou (b) fallback CSS/WebGL simples (gradiente cônico + blur + noise). Carregar **só no desktop e só se `prefers-reduced-motion: no-preference`**; no mobile, imagem estática `webp` (< 80 KB).
- **Glow orbs:** `emerald-500/10` (topo-esquerda) e `purple-500/10` (baixo-direita), `blur-[120px]`, em cards de destaque.
- **App canvas:** `bg-[#0c0d10]` + `emerald-500/5` 800×600 topo-direita e `blue-500/5` baixo-esquerda.
- **Footer:** `radial-gradient(circle at top right, rgba(16,185,129,.1), transparent 40%)`.

### 2.5 Ícones

Ledger usa **Lucide** (+ alguns Solar). Plano: `lucide-react`, stroke 1.5, 16px na sidebar, 20–24px em cards. Mapeamento:

| Conceito MSC | Ícone |
|---|---|
| Início | `layout-dashboard` |
| Notas fiscais | `file-check` / `file-text` |
| Antecipar | `zap` |
| Minhas antecipações | `wallet` |
| Saúde financeira | `line-chart` |
| Fornecedores | `users` |
| Importar CSV | `upload` |
| Filas do operador | `inbox` |
| Configuração / teto | `scale` / `settings` |
| Segurança / LGPD | `shield-check`, `lock` |
| Indicadores / ESG | `trending-up`, `globe-2` |
| Notificações | `bell` (dot amarelo) |

---

## 3. Motion (o que copiar do Ledger e como adaptar)

| Padrão Ledger | Especificação | Uso no MSC Bank |
|---|---|---|
| **Blur-up entrance** | `@keyframes animationIn` 0% `opacity:0; translateY(30px); blur(8px)` → 100% normal · `0.8s ease-out` · delays 0.1→0.6s | Hero (pill → H1 → lead → CTAs → card de métrica) e cada seção do site |
| **Animate on scroll** | `IntersectionObserver` threshold 0.2, `rootMargin 0 0 -10% 0`, uma vez | Seções do site; no app só no primeiro carregamento do dashboard |
| **Count-up** | rAF 2000 ms `easeOutQuart`, hold 3000, fade 500 | Site: “R$ X antecipados”. **App: só uma vez, sem loop** (valor real não pode “piscar”) |
| **Bar cycle** | `barCycle 6s cubic-bezier(.33,1,.68,1)`, stagger 100 ms | Site: card “recebíveis nos próximos 90 dias”. App: barras crescem uma vez, sem loop |
| **Border spin (shiny CTA)** | conic `#059669 → #34d399`, `border-spin 2.5s linear infinite` via `@property --gradient-angle` | CTA principal do site (“Quero antecipar”) e **apenas** o botão “Solicitar antecipação” no app |
| **Ping / pulse** | `animate-ping`, `animate-pulse` | “Plataforma operando”, nota recém-confirmada |
| **Typing log** | 30–50 ms/char, 300 ms/linha | Site: “terminal” mostrando o fluxo (`> nota 4512 confirmada pela Alimentos Vale`) |
| **Marquee** | `marquee-rtl 40s linear infinite`, máscara 20%/80% | Logos de parceiros/apoiadores (quando houver) |
| **Carrossel 3D** | 700 ms `cubic-bezier(.25,1,.5,1)`, rotação ±6°, escala .9 | Depoimentos de fornecedores do piloto |
| **Toggle** | knob 300 ms `cubic-bezier(.25,1,.5,1)` | Simulador do site: “Cheque especial ↔ MSC Bank” |
| **Hover** | `transition-colors duration-300 ease-[cubic-bezier(.4,0,.2,1)]`; glows 500 ms | Todos os cards e botões |
| **Flashlight** | radial que segue o cursor (`--x/--y`), borda `rgba(16,185,129,.4)` | Card de preço/custo do site |

**Regras de motion do MSC Bank:**
1. `@media (prefers-reduced-motion: reduce)` desliga blur-up, loops, marquee, cena laser e count-up (mostra valor final).
2. No **app**, nada que represente dinheiro real fica em loop. Loops são exclusivos do site.
3. Recalcular simulador = transição numérica curta (300 ms), nunca count-up de 2 s.
4. Duas durações-base apenas: **300 ms** (UI) e **700–800 ms** (entrada/coreografia). Easing padrão: `cubic-bezier(.25,1,.5,1)`.
5. Tokens no Tailwind: `transitionTimingFunction: { ledger: 'cubic-bezier(.25,1,.5,1)', 'ledger-std': 'cubic-bezier(.4,0,.2,1)' }` e `keyframes`/`animation` para `animationIn`, `barCycle`, `border-spin`, `marquee-rtl`.

---

## 4. UX: princípios aplicados

1. **Valor líquido primeiro.** Em qualquer tela de antecipação, o maior número é o que cai na conta (Balance figure, 36px). Custo em R$ logo abaixo; % a.m. em terceiro.
2. **Frase-âncora:** “Receba hoje **R$ 48.100** em vez de R$ 50.000 daqui a 60 dias.”
3. **Comparativo sempre visível:** chip esmeralda “Você economiza R$ X vs. cheque especial” (texto de acento + delta chip).
4. **Mobile 360 px é o alvo principal.** Sidebar vira bottom nav (4 itens) + menu; tabelas viram list rows; resumo do simulador fica fixo no rodapé (`sticky bottom-0`, glass).
5. **Uma ação primária por tela** (shiny CTA ou botão branco). Secundárias em outline/ghost.
6. **Estados explícitos:** vazio (“Nenhuma nota confirmada ainda — avise seu comprador”), carregando (skeleton em `#121317` com shimmer sutil), erro (rosa + como resolver).
7. **Acessibilidade:** contraste AA (o `slate-400` sobre `#000` passa; `neutral-600` só para texto decorativo, nunca para informação essencial), foco visível `ring-2 ring-emerald-500/50`, alvos ≥ 44 px no mobile, status com texto.
8. **Linguagem:** glossário embutido via tooltip glass (“Deságio = desconto cobrado pelo financiador pelo prazo”).

---

## 5. Site institucional — mapa de seções

Cada seção usa o padrão Ledger: moldura gradiente + section header (eyebrow com régua esmeralda, H2 light, parágrafo 60ch) + entrada blur-up on scroll.

| # | Seção | Componente Ledger | Conteúdo MSC Bank |
|---|---|---|---|
| 0 | Navbar | Floating pill | Logo · Como funciona · Para fornecedores · Para compradores · Impacto · Entrar · **Quero participar** |
| 1 | Hero | Hero + cena laser + metric card | Pill “Novo · Beta aberta para a cadeia Alimentos Vale”; H1 “Receba hoje pelo que você já vendeu.”; lead sobre antecipação com taxa do comprador âncora; CTAs **Simular antecipação** (shiny) e **Sou comprador âncora** (outline); metric card com count-up + barras “a receber 30/60/90 dias” |
| 2 | Problema | Chart card (recovery) | “60 a 90 dias para receber” — barras mostrando o buraco de caixa; copy curta |
| 3 | Como funciona | Feature card grande + 4 tiles | 4 passos: Comprador confirma a nota → Você simula → Aprovamos → Dinheiro na conta |
| 4 | Simulador público | Plan card (flashlight) + billing toggle | Inputs: valor da nota, dias até vencimento → valor líquido, custo em R$, % a.m.; toggle “cheque especial vs. MSC Bank”. Usa a mesma função de cálculo do app (`lib/pricing.ts`) com taxas de referência |
| 5 | Para compradores âncora | Checklist card + terminal card | Benefícios: cadeia mais forte, painel ESG, programa de desenvolvimento de fornecedores; terminal com log do fluxo de confirmação |
| 6 | Impacto | KPI cards + área chart | ODS 9.3, metas da beta (≥10 fornecedores ativos, custo ≤ teto); números do piloto quando existirem |
| 7 | Segurança e transparência | Tiles com `shield-check`, `lock`, `file-check`, `scale` | Financiador parceiro regulado, LGPD, trilha de auditoria, teto de custo aprovado por comitê |
| 8 | Depoimentos | Carrossel 3D | Fornecedores do piloto (após sprint 6; antes, ocultar a seção) |
| 9 | FAQ | List rows expansíveis | “Isso é empréstimo?”, “Quem paga a nota no vencimento?”, “Quanto custa?”, “Preciso de garantia?” |
| 10 | CTA final + footer | Footer Ledger | Formulário curto (CNPJ, e-mail, perfil) · colunas Produto / Empresa / Legal · status “Plataforma operando” · wordmark **MSC BANK** `text-white/5` |

> ⚠️ Regulatório (seção 9 da especificação): no site, evitar se apresentar como banco. Texto do footer: “MSC Bank é uma plataforma de originação. As operações são realizadas por [financiador parceiro].” Revisar com o advogado antes de publicar.

---

## 6. Plataforma beta — telas no idioma do Ledger

Layout base (todas as telas logadas): **sidebar** `w-72 bg-[#0c0d10] border-r border-white/5` (≥ lg) com overlines por grupo + card do usuário no rodapé; **header** `sticky h-20 bg-[#0c0d10]/80 backdrop-blur-md` com breadcrumb (`neutral-500 / neutral-700 / white`), busca (≥ lg), sino com dot amarelo; **main** com glow FX.

| # spec | Tela | Composição |
|---|---|---|
| 1 | Login / cadastro | Card centralizado `#0A0B0E` sobre canvas preto com orb esmeralda; campos `#121317` com foco `emerald-500/30`; checkbox de termos/LGPD; link mágico como opção |
| 2 | Cadastro da empresa | Stepper (3 passos: Empresa · Dados bancários · Documentos), máscara de CNPJ, validação de DV inline, upload em terminal well |
| 3 | Início do fornecedor | **Elevated card** “Disponível para antecipar” (Balance figure) + botão branco “Antecipar agora”; 3 KPI cards (a receber 30/60/90 dias); breakdown bar por comprador; lista “Antecipações em andamento” (activity list) |
| 4 | Notas elegíveis + simulador | Inner card com tabela (checkbox, NF em mono, vencimento, valor, status chip); filtros com segmented range (`15–30d · 31–60d · 61–120d`); **resumo fixo no rodapé** (glass) com valor bruto → deságio → tarifa → **valor líquido** + chip “economia vs. cheque especial” + shiny CTA |
| 5 | Confirmação | Elevated card com a frase-âncora; detalhamento em list rows; termos em accordion; checkbox de aceite; CTA “Solicitar antecipação” (shiny). Grava data, hora, IP, usuário |
| 6 | Minhas antecipações | Lista com status chip; detalhe com **linha do tempo** em terminal well (`> 13/10 14:02 SOLICITADA por Ana`) |
| 7 | Saúde financeira (P1) | Área chart (faturamento confirmado, linha esmeralda + comparação amarela tracejada), KPI cards (prazo médio, concentração, economia acumulada) |
| 8 | Início do comprador | KPI cards (notas aguardando, vencimentos da semana, fornecedores ativos); activity list de pendências com ação rápida |
| 9 | Importar / confirmar notas | Dropzone (terminal well) → pré-visualização com **erro por linha** (linha rosa + motivo) → confirmar/contestar em lote (barra de ações fixa) |
| 10 | Fornecedores do programa | Form “Convidar” (CNPJ + e-mail) + lista com avatares de iniciais (`bg-white/5 ring-white/10 text-emerald-400`) e status |
| 11 | Painel da cadeia (P1) | Área chart de volume, KPIs de impacto ODS 9.3, botão “Exportar relatório ESG” |
| 12 | Filas do operador | Segmented “Cadastros · Antecipações · Alertas”; contadores com ping; linhas com SLA |
| 13 | Detalhe da antecipação | Cálculo (snapshot de taxas), **checagem de limites** com barras de uso (gradiente esmeralda; rosa se estoura), aprovar/recusar, registrar pagamento e liquidação com upload de comprovante, trilha de auditoria |
| 14 | Configuração do âncora | Form de taxas/limites com **validação ao vivo contra o teto** (chip rosa “acima do teto de 2,5% a.m.”); bloco de aprovação do Comitê de Impacto |
| 15 | Indicadores | KPI cards + gráficos das métricas da seção 10 da especificação |

**Mobile (360 px):** sidebar → bottom nav (Início · Notas · Antecipações · Mais); tabelas → list rows; header com h-14; resumo do simulador vira sheet expansível.

---

## 7. Arquitetura de front-end

```
app/
  (site)/            page.tsx, layout.tsx, components/sections/*
  (auth)/            login, cadastro
  (app)/app/
    fornecedor/      inicio, notas, antecipacoes, saude
    comprador/       inicio, notas, fornecedores, cadeia
    operador/        filas, antecipacoes/[id], ancoras/[id], indicadores
components/
  ui/                shadcn/ui re-tematizado com tokens Ledger
  ledger/            ShinyCta, SectionFrame, SectionHeader, MetricCard, KpiCard,
                     BalanceCard, StatusChip, DeltaChip, SegmentedRange, TerminalWell,
                     ActivityList, AreaChart, BarStack, GlowOrbs, AnimateOnScroll, CountUp
lib/
  pricing.ts         cálculo da seção 6 (única fonte, usada no site e no app)
  format.ts          BRL, datas dd/mm/aaaa, máscara CNPJ
  eligibility.ts     regras de elegibilidade e limites
styles/
  ledger.css         keyframes (animationIn, barCycle, border-spin, marquee), @property, .shiny-cta, reduced-motion
```

- **shadcn/ui:** gerar componentes e trocar as variáveis CSS (`--background: #000`, `--card: #0A0B0E`, `--primary: #fff`, `--accent: #10b981`, `--border: rgba(255,255,255,.1)`, `--radius: 1rem`). Ajustar `Button` com variantes `shiny`, `white`, `outline`, `ghost`, `accent`.
- **Gráficos:** Recharts (ou SVG próprio como no Ledger) com os mesmos tokens: área `#10b981` 20%→0, linha `#34d399` 2px, comparação `#facc15` 1.5px tracejada, eixos 10px `neutral-600`.
- **Motion:** CSS puro + `IntersectionObserver` (como no Ledger). `framer-motion` só se precisar do carrossel 3D/sheets.
- **Performance:** Lighthouse mobile ≥ 90; cena do hero carregada com `dynamic(..., { ssr: false })` e somente em desktop.
- **Não copiar** imagens/logos de terceiros do pacote do Ledger (Unsplash, Midjourney, logos de parceiros); usar apenas a linguagem visual e tokens.

---

## 8. Cronograma

Acrescentamos uma **Sprint 0** de design system e intercalamos o site com as sprints da especificação.

| Sprint | Entregas de produto (spec) | Entregas de site / design | Pronto quando… |
|---|---|---|---|
| **0** (3–4 dias) | Repositório Next.js + Supabase + Vercel; CI (lint, typecheck, testes) | Tokens Tailwind, `ledger.css`, fontes Geist, tema shadcn, componentes `components/ledger/*` em página `/design` (catálogo interno) | Catálogo `/design` replica tipografia, cores, superfícies, botões, chips e motion do Ledger |
| **1** | Auth, cadastro de empresas, RLS, seed | Layout do app (sidebar/header/bottom nav), telas 1 e 2 | Login e cadastro funcionando no celular 360 px |
| **2** | CSV + confirmação; convite | Telas 8, 9, 10; **site v1** (navbar, hero sem cena, como funciona, CTA/footer) publicado | Site no ar com formulário de interesse |
| **3** | Simulador, solicitação, limites, aceite | Telas 3, 4, 5; `lib/pricing.ts` com testes; **simulador público** no site | Exemplo da spec mostra R$ 48.100,00 e ≈ 1,88% a.m. no site e no app |
| **4** | Painel do operador, auditoria | Telas 6, 12, 13 (linha do tempo terminal well) | Fluxo completo nota → liquidação registrado |
| **5** | E-mails, indicadores, configuração do âncora | Telas 14, 15; e-mails transacionais no mesmo visual (React Email, fundo `#0A0B0E`); **site v2** (cena do hero, impacto, segurança, FAQ) | Teto de custo bloqueia configuração inválida |
| **6** | Testes com fornecedores reais | P1 se houver tempo (telas 7, 11); revisão de linguagem; auditoria de acessibilidade e performance; depoimentos | Checklist da seção 9 abaixo verde |

**Responsáveis sugeridos (somando à spec):** André — fundação e app; Márcio — site, copy e narrativa para âncoras/financiador; Leonardo — validação de números do simulador público; Lucas — testes de usabilidade no celular com fornecedores.

---

## 9. Critérios de aceite de design/UX (somar à seção 13 da spec)

- [ ] Tokens de cor, tipografia e raio vêm de um só lugar (`tailwind.config.ts` + variáveis shadcn); nenhum hex solto em componentes.
- [ ] Hero do site reproduz a sequência blur-up (delays 0.1→0.6 s) e respeita `prefers-reduced-motion`.
- [ ] Nenhum loop de animação em valores monetários reais dentro do app.
- [ ] Valor líquido é o maior número nas telas 3, 4 e 5.
- [ ] Todos os status aparecem com texto + cor conforme a tabela da seção 2.2.
- [ ] Contraste AA em todo texto informativo; foco visível em todos os controles.
- [ ] Telas 1–6 e 8–9 usáveis em 360 px sem rolagem horizontal; alvos ≥ 44 px.
- [ ] Lighthouse mobile ≥ 90 (performance e acessibilidade) no site.
- [ ] Simulador do site e do app usam a mesma função e dão o mesmo resultado.
- [ ] Footer e páginas legais trazem o aviso de plataforma de originação e política de privacidade (LGPD).

---

## 10. Decisões em aberto (design)

1. **Cena do hero:** criar no Unicorn Studio (conta própria, verificar licença) ou fallback CSS? Recomendação: começar com fallback CSS na Sprint 2 e trocar na Sprint 5 se sobrar tempo.
2. **Tema claro no app?** O Ledger é só escuro. Recomendação: beta só escuro; avaliar com fornecedores na Sprint 6 (uso em chão de fábrica com sol pode pedir tema claro).
3. **Logo / marca:** definir antes da Sprint 2, considerando a ressalva sobre o uso de “Bank” (seção 9 da spec).
4. **Domínio e e-mail remetente** para o site e os e-mails transacionais.
