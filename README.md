# TaxCalc Brasil

> Calculadora de Taxas de Importacao - Remessa Conforme 2026

Uma ferramenta 100% client-side para calcular impostos de importacao do programa Remessa Conforme. Zero cookies, zero rastreamento, zero banco de dados.

## Regras Implementadas (Marco 2026)

| Faixa | Imposto de Importacao | Desconto | ICMS |
|-------|----------------------|----------|------|
| Ate US$ 50 | 20% | - | 17% ou 20% (depende do estado) |
| Acima de US$ 50 | 60% | US$ 20 sobre o II | 17% ou 20% (depende do estado) |

O ICMS e calculado "por dentro" (base = subtotal / (1 - aliquota)).

## Quick Start

    npm install
    npm run dev

Acesse: http://localhost:5173

## Atualizar Taxas

Edite APENAS: src/config/taxRates.ts

## Build para Producao

    npm run build

Os arquivos otimizados serao gerados na pasta dist/

## Rodar Testes

    npm run test

## Arquitetura

    src/
      config/taxRates.ts    <- UNICO arquivo para editar quando taxas mudarem
      lib/taxEngine.ts      <- Motor de calculo puro (sem React)
      lib/__tests__/        <- Testes unitarios
      components/           <- Componentes React da interface
      types/                <- Definicoes TypeScript

## Fontes Oficiais

- [Receita Federal - Remessa Conforme](https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/programa-remessa-conforme-o-que-e-como-funciona)
- [Calculadora Oficial da Receita](https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/calculadora-versao-iii/calculadora.html)
- [COMSEFAZ - Aliquotas ICMS](https://comsefaz.org.br/novo/informacoes-fiscais/)
- [Lei 14.902/2024](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14902.htm)

## Seguranca e Privacidade

- Nenhum dado pessoal coletado
- Zero cookies
- Zero rastreamento / analytics
- 100% client-side (nada vai para servidor)
- Nenhum banco de dados

## Licenca

MIT