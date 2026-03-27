/**
 * ============================================================
 * TAX RATES CONFIGURATION - Remessa Conforme 2026
 * ============================================================
 *
 * THIS IS THE ONLY FILE YOU NEED TO EDIT WHEN TAX RULES CHANGE.
 *
 * Last verified: 2026-03-27
 * Sources:
 *   - Receita Federal: gov.br/receitafederal
 *   - COMSEFAZ: comsefaz.org.br
 *   - Lei 14.902/2024
 * ============================================================
 */

import type { TaxBracketConfig, ICMSOption, ReferenceLink } from '@/types/tax';

// --- Federal Import Tax Brackets ---
export const TAX_BRACKETS: TaxBracketConfig[] = [
  {
    label: 'Ate US$ 50,00',
    maxUSD: 50,
    iiRate: 0.20,       // 20% Imposto de Importacao
    iiDiscountUSD: 0,   // No discount for this bracket
  },
  {
    label: 'Acima de US$ 50,00',
    maxUSD: Infinity,
    iiRate: 0.60,       // 60% Imposto de Importacao
    iiDiscountUSD: 20,  // Flat US$20 discount on tax amount
  },
];

// --- ICMS State Options ---
export const ICMS_OPTIONS: ICMSOption[] = [
  {
    rate: 0.17,
    label: '17%',
    description: 'Maioria dos estados (SP, RJ, PR, RS, SC, GO, etc.)',
    states: [
      'SP', 'RJ', 'PR', 'RS', 'SC', 'GO', 'MT', 'MS', 'ES', 'DF',
      'PA', 'TO', 'RO', 'RR', 'AM', 'MA', 'PE',
    ],
  },
  {
    rate: 0.20,
    label: '20%',
    description: 'MG, AC, AP, AL, BA, CE, PB, PI, RN, SE (desde Abril/2025)',
    states: [
      'MG', 'AC', 'AP', 'AL', 'BA', 'CE', 'PB', 'PI', 'RN', 'SE',
    ],
  },
];

// --- Default Exchange Rate ---
export const DEFAULT_EXCHANGE_RATE = 5.75;

// --- Official Reference Links ---
export const REFERENCE_LINKS: ReferenceLink[] = [
  {
    title: 'Receita Federal - Remessa Conforme',
    url: 'https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/programa-remessa-conforme-o-que-e-como-funciona',
    description: 'Pagina oficial com todas as regras do programa',
    icon: 'shield-check',
  },
  {
    title: 'Calculadora Oficial da Receita Federal',
    url: 'https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/calculadora-versao-iii/calculadora.html',
    description: 'Ferramenta oficial para conferencia dos valores',
    icon: 'calculator',
  },
  {
    title: 'COMSEFAZ - Aliquotas ICMS por Estado',
    url: 'https://comsefaz.org.br/novo/informacoes-fiscais/',
    description: 'Tabela oficial das aliquotas estaduais de ICMS',
    icon: 'map-pin',
  },
  {
    title: 'Empresas Certificadas no PRC',
    url: 'https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/empresas-certificadas-no-programa-remessa-conforme-prc',
    description: 'Lista de sites certificados pelo Remessa Conforme',
    icon: 'badge-check',
  },
  {
    title: 'Lei 14.902/2024',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14902.htm',
    description: 'Texto da lei que instituiu a Taxa das Blusinhas',
    icon: 'scale',
  },
];

// --- App Metadata ---
export const APP_META = {
  name: 'TaxCalc Brasil',
  subtitle: 'Simulador Remessa Conforme 2026',
  version: '2.0.0',
  lastUpdated: '2026-03-27',
  disclaimer:
    'Ferramenta financeira destinada a maiores de 18 anos. Nenhum dado pessoal e coletado ou armazenado. Os valores apresentados sao estimativas baseadas nas regras vigentes do Programa Remessa Conforme e podem variar conforme a cotacao do dia e alteracoes legislativas. Para valores oficiais, consulte a calculadora da Receita Federal.',
};
