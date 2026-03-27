/**
 * ============================================================
 * TAX CALCULATION ENGINE - Remessa Conforme 2026
 * ============================================================
 * Pure functions. No side effects. No DOM. No React.
 *
 * MATH:
 *   STEP 1: customsUSD = product + shipping
 *   STEP 2: II (Import Tax) based on bracket
 *     <= US$50: 20%
 *     >  US$50: 60% minus US$20 discount
 *   STEP 3: ICMS "por dentro" (tax-inclusive)
 *     icmsBase = (customsBRL + II) / (1 - icmsRate)
 *     ICMS = icmsBase - (customsBRL + II)
 *   STEP 4: totalCost = icmsBase
 * ============================================================
 */

import type { TaxInput, TaxBreakdown, TaxBracketConfig } from '@/types/tax';
import { TAX_BRACKETS } from '@/config/taxRates';

function findBracket(customsValueUSD: number): TaxBracketConfig {
  const bracket = TAX_BRACKETS.find((b) => customsValueUSD <= b.maxUSD);
  if (!bracket) {
    return TAX_BRACKETS[TAX_BRACKETS.length - 1];
  }
  return bracket;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateTax(input: TaxInput): TaxBreakdown {
  const { productValueUSD, shippingValueUSD, exchangeRate, icmsRate } = input;

  // Validation
  if (productValueUSD < 0 || shippingValueUSD < 0 || exchangeRate <= 0) {
    throw new Error('Valores invalidos: nao podem ser negativos e a cotacao deve ser maior que zero.');
  }
  if (icmsRate < 0 || icmsRate >= 1) {
    throw new Error('Aliquota ICMS invalida: deve estar entre 0 e 1.');
  }

  // STEP 1: Customs Value
  const customsValueUSD = round2(productValueUSD + shippingValueUSD);
  const customsValueBRL = round2(customsValueUSD * exchangeRate);

  // STEP 2: Import Tax (II)
  const bracket = findBracket(customsValueUSD);
  const bracketKey = customsValueUSD <= 50 ? 'up_to_50' : 'above_50';

  const iiGrossBRL = round2(customsValueBRL * bracket.iiRate);
  const iiDiscountBRL = round2(bracket.iiDiscountUSD * exchangeRate);
  const iiNetBRL = round2(Math.max(0, iiGrossBRL - iiDiscountBRL));

  // STEP 3: ICMS "por dentro"
  const subtotalBeforeICMS = round2(customsValueBRL + iiNetBRL);
  const icmsBase = round2(subtotalBeforeICMS / (1 - icmsRate));
  const icmsAmountBRL = round2(icmsBase - subtotalBeforeICMS);

  // STEP 4: Totals
  const totalCostBRL = round2(icmsBase);
  const totalTaxesBRL = round2(iiNetBRL + icmsAmountBRL);
  const effectiveTaxPercent =
    customsValueBRL > 0
      ? round2((totalTaxesBRL / customsValueBRL) * 100)
      : 0;

  return {
    customsValueUSD,
    customsValueBRL,
    bracket: bracketKey,
    iiRate: bracket.iiRate,
    iiAmountBRL: iiGrossBRL,
    iiDiscountBRL: bracketKey === 'above_50' ? iiDiscountBRL : 0,
    iiNetBRL,
    icmsRate,
    icmsAmountBRL,
    totalCostBRL,
    totalTaxesBRL,
    effectiveTaxPercent,
  };
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatUSD(value: number): string {
  return 'US$ ' + value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + '%';
}
