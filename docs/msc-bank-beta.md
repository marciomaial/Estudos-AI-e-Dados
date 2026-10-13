# MSC Bank — especificação da versão beta

> Documento de construção do MVP/beta. Serve para o grupo e para quem for programar (pessoa ou agente de código).
> Versão 0.1 · 13/10/2026 · Grupo: André Goes, Márcio Maia, Leonardo Muniz, Lucas Inthurn

---

## 1. Contexto em uma página

**Problema:** a pequena indústria (até 99 pessoas) vende para compradores médios e grandes e recebe em 60 a 90 dias. Nesse intervalo, falta dinheiro para comprar matéria-prima e pagar a folha. Ela recusa pedidos ou recorre a cheque especial, cartão e dinheiro pessoal.

**Solução:** uma plataforma onde o fornecedor antecipa o valor de notas fiscais já **confirmadas pelo comprador âncora**. Como quem paga no vencimento é o comprador (mais sólido), a taxa fica menor. O dinheiro vem de um financiador parceiro (FIDC ou cooperativa). O MSC Bank cuida da plataforma, da análise e do relacionamento.

**Quem paga:**
- **Fornecedor:** custo sobre o valor antecipado (deságio do financiador + tarifa MSC).
- **Comprador âncora:** mensalidade pelo programa de desenvolvimento de fornecedores e pelo painel (que alimenta o relatório ESG da cadeia dele).

**Meta de impacto:** ODS 9, meta 9.3 (crédito acessível para pequenas indústrias e integração em cadeias de valor).

---

## 2. Objetivo da beta

Provar, com **1 comprador âncora e 10 a 20 fornecedores**, que:

1. O comprador aceita confirmar as notas dos fornecedores na plataforma.
2. O fornecedor usa a antecipação quando precisa e volta a usar.
3. O custo final para o fornecedor fica claramente abaixo das alternativas que ele usa hoje.
4. O fluxo inteiro (nota → confirmação → antecipação → pagamento no vencimento) roda sem erro de conciliação.

**O que a beta NÃO faz:**
- Não movimenta dinheiro sozinha. A liquidação é feita pelo financiador parceiro, e a plataforma só registra o que aconteceu (ver seção 9, regulatório).
- Não faz análise de crédito automática com bureau (Serasa, SCR). Na beta, o risco é do comprador e a aprovação é manual.
- Não tem app nativo. É web responsiva (funciona no celular).

---

## 3. Perfis de usuário

| Perfil | Quem é | O que faz na beta |
|---|---|---|
| **Fornecedor** | Dono ou financeiro da pequena indústria | Vê notas elegíveis, simula, pede antecipação, acompanha status, vê o painel de saúde financeira |
| **Comprador âncora** | Compras ou contas a pagar da empresa média/grande | Cadastra fornecedores do programa, envia ou confirma notas, vê o painel da cadeia |
| **Operador MSC** | Sócios do MSC Bank (admin) | Aprova cadastros, aprova antecipações, registra liquidações, configura taxas e limites, vê indicadores |
| **Financiador** *(opcional na beta)* | Gestor do FIDC/cooperativa | Visão somente leitura da carteira. Na beta pode ser substituído por relatório exportado |

---

## 4. Fluxo principal

```
1. Comprador âncora convida o fornecedor   →  fornecedor cria conta e completa cadastro
2. Operador MSC aprova o cadastro (KYC simples)
3. Nota fiscal entra na plataforma         →  (a) comprador importa CSV de títulos a pagar
                                              ou (b) fornecedor sobe XML/dados da NF
4. Comprador CONFIRMA a nota (valor, vencimento, "vou pagar") → nota fica ELEGÍVEL
5. Fornecedor simula: escolhe notas, vê valor líquido e custo
6. Fornecedor solicita antecipação e aceita os termos
7. Operador MSC aprova (checa limites) → envia ao financiador
8. Financiador paga o fornecedor (fora da plataforma) → operador registra "PAGO AO FORNECEDOR"
9. No vencimento, comprador paga o valor cheio ao financiador → operador registra "LIQUIDADO"
```

**Status da antecipação:**
`RASCUNHO → SOLICITADA → APROVADA → PAGA_AO_FORNECEDOR → LIQUIDADA`
Saídas alternativas: `RECUSADA`, `CANCELADA` (antes de paga), `EM_ATRASO` (vencimento passou sem liquidação).

**Status da nota:**
`IMPORTADA → CONFIRMADA (elegível) → EM_ANTECIPAÇÃO → ANTECIPADA → PAGA`
Saídas alternativas: `CONTESTADA` (comprador não reconhece), `VENCIDA_SEM_ANTECIPAÇÃO`.

---

## 5. Funcionalidades por prioridade

### P0 — sem isso a beta não roda

**Autenticação e empresas**
- Login por e-mail + senha (ou link mágico). Um usuário pertence a uma empresa.
- Cadastro da empresa: CNPJ, razão social, setor, nº de funcionários, cidade/UF, dados bancários para recebimento, sócio responsável.
- Validação de CNPJ (dígito verificador). Consulta automática à Receita é P1.
- Aceite de termos de uso e de política de privacidade (LGPD).

**Notas / títulos**
- Comprador importa CSV com: CNPJ do fornecedor, nº da NF, chave de acesso (opcional), valor, data de emissão, data de vencimento.
- Fornecedor pode cadastrar a nota manualmente (fica pendente de confirmação do comprador).
- Comprador confirma ou contesta notas em lote.

**Simulação e antecipação**
- Lista de notas elegíveis com filtro por vencimento e valor.
- Simulador: seleciona notas → mostra valor bruto, deságio, tarifa MSC, **valor líquido** e **custo equivalente ao mês**.
- Comparativo na tela: "quanto você pagaria no cheque especial pelo mesmo prazo" (taxa de referência configurável pelo admin).
- Solicitação com aceite eletrônico dos termos (registrar data, hora, IP e usuário).

**Painel do operador MSC**
- Fila de cadastros para aprovar.
- Fila de antecipações para aprovar, com checagem automática de limites (seção 6).
- Registro manual de pagamento ao fornecedor e de liquidação pelo comprador (data, valor, comprovante em anexo).
- Configuração de taxas e limites por comprador âncora.

**Notificações por e-mail**
- Fornecedor: nota confirmada, antecipação aprovada, dinheiro pago.
- Comprador: notas aguardando confirmação, vencimentos da semana.
- Operador: nova solicitação, liquidação atrasada.

### P1 — importante, entra se der tempo

- **Painel de saúde financeira do fornecedor:** faturamento confirmado por mês, prazo médio de recebimento, concentração por cliente, total antecipado, economia estimada versus cheque especial.
- **Painel da cadeia para o comprador:** fornecedores ativos, volume antecipado, prazo médio, indicadores de impacto (base para relatório ESG).
- Upload de XML da NF-e com leitura automática dos campos (emitente, destinatário, valor, duplicatas/vencimentos).
- Consulta de CNPJ em API pública (ex.: BrasilAPI) para preencher cadastro.
- Exportação CSV da carteira para o financiador.
- Trilha de auditoria visível (quem fez o quê e quando) em cada nota e antecipação.

### P2 — depois da beta

- Integração bancária para pagamento automático (via parceiro).
- Registro das duplicatas em registradora (exigência para operação em escala).
- Análise de crédito com dados de bureau e histórico de entregas.
- Antecipação automática (fornecedor define regra: "antecipar toda nota acima de R$ X").
- Multi-financiador (leilão de taxa entre parceiros).

---

## 6. Regras de negócio

### Elegibilidade de uma nota
Uma nota só pode ser antecipada se **todas** as condições forem verdadeiras:
1. Confirmada pelo comprador âncora.
2. Fornecedor com cadastro aprovado.
3. Vencimento entre **15 e 120 dias** a partir de hoje (configurável).
4. Não está em outra antecipação ativa nem foi contestada.
5. Valor mínimo de **R$ 1.000** por nota (configurável).

### Limites
- **Limite por comprador âncora:** soma de antecipações em aberto contra aquele comprador (definido pelo financiador). Ex.: R$ 2 milhões.
- **Limite por fornecedor:** ex.: até 30% do limite do âncora para um único fornecedor (evita concentração).
- Se a solicitação estourar algum limite, o sistema bloqueia e mostra quanto ainda está disponível.

### Cálculo do custo (configurável por âncora)

```
dias            = data_vencimento − data_pagamento_ao_fornecedor
desagio         = valor_bruto × taxa_financiador_am × (dias / 30)
tarifa_elo      = valor_bruto × tarifa_elo_pct
valor_liquido   = valor_bruto − desagio − tarifa_elo
custo_total_pct = (desagio + tarifa_elo) / valor_bruto
custo_am_equiv  = (1 + custo_total_pct)^(30 / dias) − 1
```

**Exemplo** (valores ilustrativos, a calibrar com o financiador):
- Nota de R$ 50.000, vencimento em 60 dias
- Taxa do financiador: 1,4% ao mês → deságio = 50.000 × 1,4% × 2 = **R$ 1.400**
- Tarifa MSC: 1% → **R$ 500**
- **Valor líquido: R$ 48.100**. Custo total: 3,8% no período ≈ **1,88% ao mês**

> Taxa e tarifa ficam guardadas **na antecipação** no momento da solicitação. Mudar a configuração depois não altera operações antigas.

### Teto de custo (regra de propósito)
- Existe um **teto de custo mensal equivalente** por âncora (ex.: 2,5% a.m.).
- O sistema não deixa configurar taxa + tarifa acima do teto.
- Alterar o teto exige aprovação registrada do Comitê de Impacto (na beta: campo "aprovado por" + data + justificativa, preenchido pelo admin).

### Mensalidade do âncora
- Na beta: registro manual (valor e status de pagamento). Referência usada no SOM: R$ 3 mil/mês.

---

## 7. Modelo de dados (sugestão)

```
empresas
  id, tipo (FORNECEDOR | COMPRADOR | MSC | FINANCIADOR), cnpj (único), razao_social,
  nome_fantasia, setor, num_funcionarios, cidade, uf, banco, agencia, conta, pix,
  status_cadastro (PENDENTE | APROVADO | RECUSADO), criado_em

usuarios
  id, empresa_id → empresas, nome, email (único), papel (ADMIN_EMPRESA | MEMBRO),
  criado_em, ultimo_login

programas                      -- vínculo comprador âncora ↔ fornecedor
  id, comprador_id → empresas, fornecedor_id → empresas, status (CONVIDADO | ATIVO | SUSPENSO),
  convidado_em, ativado_em

config_ancora
  comprador_id → empresas, taxa_financiador_am, tarifa_elo_pct, teto_custo_am,
  limite_total, limite_por_fornecedor_pct, prazo_min_dias, prazo_max_dias, valor_min_nota,
  teto_aprovado_por, teto_aprovado_em, teto_justificativa, atualizado_em

notas
  id, fornecedor_id, comprador_id, numero_nf, chave_acesso, valor, data_emissao,
  data_vencimento, origem (CSV_COMPRADOR | MANUAL_FORNECEDOR | XML),
  status (IMPORTADA | CONFIRMADA | CONTESTADA | EM_ANTECIPACAO | ANTECIPADA | PAGA | VENCIDA_SEM_ANTECIPACAO),
  confirmada_por, confirmada_em, motivo_contestacao, criado_em

antecipacoes
  id, fornecedor_id, comprador_id, valor_bruto, desagio, tarifa_elo, valor_liquido,
  taxa_financiador_am_snapshot, tarifa_elo_pct_snapshot, dias_medios, custo_am_equiv,
  status (SOLICITADA | APROVADA | RECUSADA | CANCELADA | PAGA_AO_FORNECEDOR | LIQUIDADA | EM_ATRASO),
  aceite_termos_em, aceite_ip, aprovado_por, aprovado_em, motivo_recusa,
  pago_fornecedor_em, liquidado_em, criado_em

antecipacao_notas              -- uma antecipação pode ter várias notas
  antecipacao_id, nota_id, valor, desagio, data_vencimento

comprovantes
  id, antecipacao_id, tipo (PAGAMENTO_FORNECEDOR | LIQUIDACAO), arquivo_url, valor, data, enviado_por

eventos_auditoria
  id, entidade, entidade_id, acao, usuario_id, dados_antes (json), dados_depois (json), ip, criado_em

mensalidades
  id, comprador_id, competencia (AAAA-MM), valor, status (ABERTA | PAGA), pago_em
```

**Regras de acesso (essencial):**
- Fornecedor só vê as próprias notas e antecipações.
- Comprador só vê notas emitidas contra ele e fornecedores do próprio programa.
- Operador MSC vê tudo.
- Implementar no banco (ex.: Row Level Security), não só na interface.

---

## 8. Telas

| # | Tela | Perfil | Conteúdo principal |
|---|---|---|---|
| 1 | Login / cadastro | Todos | E-mail, senha, aceite de termos |
| 2 | Cadastro da empresa | Fornecedor, comprador | Dados da empresa, dados bancários, upload de contrato social |
| 3 | Início do fornecedor | Fornecedor | Cartões: "disponível para antecipar", "a receber nos próximos 30/60/90 dias", "antecipações em andamento" |
| 4 | Notas elegíveis + simulador | Fornecedor | Tabela com checkbox, resumo fixo no rodapé com valor líquido e custo ao mês, comparativo com cheque especial |
| 5 | Confirmação da antecipação | Fornecedor | Resumo, termos, botão "Solicitar" |
| 6 | Minhas antecipações | Fornecedor | Lista com status e linha do tempo |
| 7 | Saúde financeira *(P1)* | Fornecedor | Gráficos de faturamento, prazo médio, economia acumulada |
| 8 | Início do comprador | Comprador | Notas aguardando confirmação, vencimentos da semana, fornecedores ativos |
| 9 | Importar / confirmar notas | Comprador | Upload de CSV, pré-visualização com erros por linha, confirmar/contestar em lote |
| 10 | Fornecedores do programa | Comprador | Convidar fornecedor (CNPJ + e-mail), lista e status |
| 11 | Painel da cadeia *(P1)* | Comprador | Volume antecipado, prazo médio, indicadores de impacto, exportar relatório |
| 12 | Filas do operador | MSC | Cadastros e antecipações pendentes, alertas de atraso |
| 13 | Detalhe da antecipação | MSC | Notas, cálculo, checagem de limites, aprovar/recusar, registrar pagamento e liquidação |
| 14 | Configuração do âncora | MSC | Taxas, limites, teto de custo com registro de aprovação |
| 15 | Indicadores | MSC | Painel mensal da governança (seção 10) |

**Diretrizes de interface:**
- Linguagem simples, sem jargão financeiro. Ex.: "Receba hoje R$ 48.100 em vez de R$ 50.000 daqui a 60 dias".
- Sempre mostrar o **valor líquido** em destaque e o custo em R$ (não só em %).
- Funcionar bem no celular: o dono da fábrica vai abrir pelo WhatsApp.
- Formato brasileiro: R$ 1.234,56 · dd/mm/aaaa · CNPJ com máscara.

---

## 9. Regulatório e segurança (atenção)

- **O MSC Bank não empresta dinheiro próprio na beta.** Quem compra os recebíveis é o financiador parceiro (FIDC, securitizadora ou cooperativa), que tem a estrutura legal para isso. O MSC Bank atua como plataforma de originação. Antes de operar com dinheiro real, validar o desenho com um advogado da área e com o parceiro.
- **Uso de "Bank" no nome:** o Banco Central restringe o uso de "banco"/"bank" no nome de empresas que não são instituições autorizadas como banco. Para a beta e o hackathon, tudo bem como nome de projeto. Antes de registrar a empresa e a marca, confirmar a regra com o advogado e, se precisar, ajustar a razão social ou a marca.
- **Cessão de crédito:** o comprador precisa ser notificado e concordar que vai pagar ao financiador no vencimento. Isso deve constar no contrato do programa e no aceite dentro da plataforma.
- **Duplicata escritural:** em escala, os títulos precisam ser registrados em registradora autorizada pelo Banco Central. Fora do escopo da beta, mas o modelo de dados já guarda o necessário (chave da NF, vencimento, valor).
- **LGPD:** coletar só o necessário, política de privacidade clara, base legal registrada (execução de contrato), opção de exclusão de conta.
- **Segurança mínima:** HTTPS, senhas com hash (o provedor de autenticação cuida disso), 2FA opcional para operador MSC, backups diários, logs de auditoria imutáveis, nenhum dado bancário em log.

---

## 10. Métricas da beta

**Produto (painel mensal da governança):**
- Volume antecipado (R$) e nº de operações
- Fornecedores ativos (antecipou ao menos uma vez nos últimos 60 dias)
- % de notas confirmadas pelo comprador em até 3 dias úteis
- Tempo entre solicitação e dinheiro na conta do fornecedor
- Inadimplência / atraso na liquidação (R$ e %)
- Custo efetivo médio ao mês para o fornecedor

**Impacto (Comitê de Impacto, trimestral):**
- Nº de fornecedores atendidos
- % que teve o primeiro crédito formal pelo MSC Bank (pergunta no cadastro)
- Economia estimada versus cheque especial (R$)
- Faturamento e nº de empregos dos fornecedores (pergunta no cadastro e a cada 6 meses)
- Pedidos que deixaram de ser recusados por falta de caixa (pesquisa curta após cada antecipação)

**Critério de sucesso da beta (3 meses):**
- ≥ 10 fornecedores ativos
- ≥ 60% dos fornecedores ativos antecipam mais de uma vez
- Custo médio ≤ teto definido e abaixo do cheque especial
- Zero erro de conciliação entre o registrado e o pago

---

## 11. Stack sugerida

Escolha pensada para 4 pessoas construírem rápido e com pouco custo. Pode ser trocada.

| Camada | Sugestão | Por quê |
|---|---|---|
| Front + back | **Next.js** (App Router, TypeScript) | Um projeto só, deploy simples |
| Banco + autenticação + arquivos | **Supabase** (Postgres, Auth, Storage, RLS) | Regras de acesso no banco, plano gratuito para a beta |
| Interface | Tailwind + shadcn/ui | Componentes prontos e responsivos |
| E-mail | Resend ou similar | Envio transacional simples |
| Deploy | Vercel | Integrado ao Next.js |
| Leitura de NF-e (P1) | Parser de XML no servidor | Extrair emitente, destinatário, valor e duplicatas |
| CNPJ (P1) | BrasilAPI | Gratuita |

**Ambientes:** `dev` (dados fictícios) e `beta` (piloto real). Nunca usar dados reais no `dev`.

**Dados de teste (seed):** 1 comprador âncora fictício ("Alimentos Vale Ltda."), 5 fornecedores fictícios de embalagens, confecção e metalurgia, 40 notas com vencimentos variados, 6 antecipações em status diferentes.

---

## 12. Plano de construção (6 sprints de 1 semana)

| Sprint | Entrega | Responsável principal |
|---|---|---|
| 1 | Projeto criado, autenticação, cadastro de empresas, regras de acesso, seed | André (Produto e Dados) |
| 2 | Importação de CSV e confirmação de notas pelo comprador; convite de fornecedor | André + Lucas |
| 3 | Simulador e solicitação de antecipação com cálculo, limites e aceite | André + Leonardo (validar regras e números) |
| 4 | Painel do operador: filas, aprovação, registro de pagamento e liquidação, auditoria | André + Leonardo |
| 5 | E-mails, painel de indicadores, configuração do âncora com teto de custo | André + Márcio |
| 6 | Testes com 2–3 fornecedores reais, ajustes de linguagem, termos revisados | Lucas (Operações) + todos |

**Em paralelo (fora do código):**
- **Márcio:** fechar o comprador âncora piloto e o financiador parceiro (sem eles a beta não roda).
- **Leonardo:** definir taxa, tarifa, limites e teto com o financiador; modelo de contrato do programa.
- **Lucas:** recrutar os primeiros fornecedores e roteiro de suporte (WhatsApp).

---

## 13. Critérios de aceite (checklist para testar antes do piloto)

- [ ] Fornecedor A não consegue ver notas nem antecipações do fornecedor B (testar direto na API, não só na tela)
- [ ] Nota não confirmada não aparece como elegível
- [ ] Nota com vencimento em 10 dias ou 150 dias não aparece como elegível (com prazo 15–120)
- [ ] Mesma nota não entra em duas antecipações ao mesmo tempo
- [ ] Simulador do exemplo da seção 6 mostra R$ 48.100,00 líquido e ≈ 1,88% a.m.
- [ ] Solicitação que estoura o limite do âncora é bloqueada com mensagem clara
- [ ] Mudar a taxa do âncora não altera antecipações já solicitadas
- [ ] Não é possível salvar taxa + tarifa acima do teto de custo
- [ ] Toda mudança de status gera registro em `eventos_auditoria`
- [ ] Antecipação com vencimento passado e sem liquidação vira `EM_ATRASO` e gera alerta ao operador
- [ ] CSV com linha inválida (CNPJ errado, valor negativo, data no passado) mostra erro na linha e não importa só ela
- [ ] Telas principais funcionam em celular com 360 px de largura

---

## 14. Perguntas em aberto

1. Qual financiador parceiro (FIDC, securitizadora, cooperativa)? Ele define taxa, limite e o contrato de cessão.
2. O comprador âncora piloto aceita confirmar notas em até 3 dias úteis?
3. Prazo médio real de recebimento dos fornecedores (premissa do TAM: 60 dias), a confirmar nas entrevistas.
4. O fornecedor prefere receber via Pix ou TED? Quem paga a tarifa?
5. A mensalidade do âncora entra na beta ou só depois de provar valor?
6. Quem compõe o Comitê de Impacto (conselheiro externo) para aprovar o teto de custo?
