# MSC Bank · site e plataforma beta

Site institucional e (em breve) plataforma de antecipação de notas do MSC Bank, com a linguagem visual do design system **Ledger**.
Plano completo em [`../docs/plano-construcao-site-msc-bank.md`](../docs/plano-construcao-site-msc-bank.md) e especificação em [`../docs/msc-bank-beta.md`](../docs/msc-bank-beta.md).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # cálculo da antecipação e formatação BR
npm run lint && npm run typecheck && npm run build
```

## Rotas

| Rota | O que é |
|---|---|
| `/` | Site institucional: hero, problema, como funciona, simulador, compradores, impacto, transparência, FAQ, lista de interesse |
| `/design` | Catálogo interno do design system (tokens e componentes), fora da indexação |
| `/termos`, `/privacidade` | Páginas legais provisórias (texto em revisão jurídica) |
| `POST /api/interesse` | Valida perfil, CNPJ e e-mail da lista de interesse. **Ainda não grava**: só registra no log do servidor (Supabase na Sprint 1) |

## Estrutura

```
src/
  app/globals.css         tokens (@theme), keyframes e motion do Ledger, reduced-motion
  lib/pricing.ts          cálculo da seção 6 da especificação (fonte única do site e do app)
  lib/format.ts           R$, %, datas, máscara e validação de CNPJ
  components/ledger/      Button, Card/surface, Section, Chips (status), Figures, AreaChart,
                          Controls, CountUp, Reveal, Terminal, Flashlight
  components/site/        seções do site
```

## Regras de design (resumo)

- Cores, superfícies e motion só pelos tokens de `globals.css` e por `surface` em `components/ledger/Card.tsx`.
- Uma ação primária (`shiny` ou `white`) por tela.
- Valor líquido é sempre o maior número; custo também em reais.
- Loops de animação só no site, nunca em valores reais da plataforma; tudo respeita `prefers-reduced-motion`.
- Layout testado em 360 px de largura.
