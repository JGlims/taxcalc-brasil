/**
 * ============================================================
 * TaxCalc Brasil - Type Definitions
 * ============================================================
 */

/** User-provided input values */
export interface TaxInput {
  productValueUSD: number;
  shippingValueUSD: number;
  exchangeRate: number;
  icmsRate: number;
}

/** Complete tax breakdown returned by the engine */
export interface TaxBreakdown {
  customsValueUSD: number;
  customsValueBRL: number;
  bracket: 'up_to_50' | 'above_50';
  iiRate: number;
  iiAmountBRL: number;
  iiDiscountBRL: number;
  iiNetBRL: number;
  icmsRate: number;
  icmsAmountBRL: number;
  totalCostBRL: number;
  totalTaxesBRL: number;
  effectiveTaxPercent: number;
}

/** A single configurable tax rule */
export interface TaxBracketConfig {
  label: string;
  maxUSD: number;
  iiRate: number;
  iiDiscountUSD: number;
}

/** ICMS option for the UI selector */
export interface ICMSOption {
  rate: number;
  label: string;
  description: string;
  states: string[];
}

/** External reference link */
export interface ReferenceLink {
  title: string;
  url: string;
  description: string;
  icon: string;
}
