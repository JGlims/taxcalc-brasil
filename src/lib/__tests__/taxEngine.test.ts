import { describe, it, expect } from 'vitest';
import { calculateTax } from '../taxEngine';
import type { TaxInput } from '@/types/tax';

describe('calculateTax', () => {
  it('calculates correctly for US$45 total, ICMS 17%', () => {
    const input: TaxInput = {
      productValueUSD: 40,
      shippingValueUSD: 5,
      exchangeRate: 5.75,
      icmsRate: 0.17,
    };
    const result = calculateTax(input);
    expect(result.customsValueUSD).toBe(45);
    expect(result.customsValueBRL).toBe(258.75);
    expect(result.bracket).toBe('up_to_50');
    expect(result.iiRate).toBe(0.20);
    expect(result.iiNetBRL).toBe(51.75);
    expect(result.iiDiscountBRL).toBe(0);
  });

  it('calculates correctly for US$110 total, ICMS 17%', () => {
    const input: TaxInput = {
      productValueUSD: 100,
      shippingValueUSD: 10,
      exchangeRate: 5.75,
      icmsRate: 0.17,
    };
    const result = calculateTax(input);
    expect(result.customsValueUSD).toBe(110);
    expect(result.bracket).toBe('above_50');
    expect(result.iiRate).toBe(0.60);
    expect(result.iiAmountBRL).toBe(379.50);
    expect(result.iiDiscountBRL).toBe(115.00);
    expect(result.iiNetBRL).toBe(264.50);
  });

  it('calculates correctly with ICMS 20%', () => {
    const input: TaxInput = {
      productValueUSD: 50,
      shippingValueUSD: 0,
      exchangeRate: 5.75,
      icmsRate: 0.20,
    };
    const result = calculateTax(input);
    expect(result.customsValueBRL).toBe(287.50);
    expect(result.iiNetBRL).toBe(57.50);
    expect(result.totalCostBRL).toBe(431.25);
    expect(result.icmsAmountBRL).toBe(86.25);
  });

  it('applies reduced rate at exactly US$50', () => {
    const input: TaxInput = {
      productValueUSD: 45,
      shippingValueUSD: 5,
      exchangeRate: 5.75,
      icmsRate: 0.17,
    };
    const result = calculateTax(input);
    expect(result.bracket).toBe('up_to_50');
  });

  it('applies full rate at US$50.01', () => {
    const input: TaxInput = {
      productValueUSD: 50.01,
      shippingValueUSD: 0,
      exchangeRate: 5.75,
      icmsRate: 0.17,
    };
    const result = calculateTax(input);
    expect(result.bracket).toBe('above_50');
  });

  it('handles zero value', () => {
    const input: TaxInput = {
      productValueUSD: 0,
      shippingValueUSD: 0,
      exchangeRate: 5.75,
      icmsRate: 0.17,
    };
    const result = calculateTax(input);
    expect(result.totalCostBRL).toBe(0);
  });

  it('throws on negative value', () => {
    expect(() =>
      calculateTax({ productValueUSD: -10, shippingValueUSD: 0, exchangeRate: 5.75, icmsRate: 0.17 })
    ).toThrow();
  });

  it('throws on zero exchange rate', () => {
    expect(() =>
      calculateTax({ productValueUSD: 50, shippingValueUSD: 0, exchangeRate: 0, icmsRate: 0.17 })
    ).toThrow();
  });
});
