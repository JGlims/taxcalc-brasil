import { useState, type FormEvent } from 'react';
import { DollarSign, Truck, ArrowRightLeft, Info, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ICMS_OPTIONS, DEFAULT_EXCHANGE_RATE } from '@/config/taxRates';
import type { TaxInput } from '@/types/tax';

interface Props {
  onCalculate: (input: TaxInput) => void;
  onReset: () => void;
}

export function CalculatorForm({ onCalculate, onReset }: Props) {
  const [productValue, setProductValue] = useState('');
  const [shippingValue, setShippingValue] = useState('');
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_EXCHANGE_RATE.toString());
  const [selectedICMS, setSelectedICMS] = useState(ICMS_OPTIONS[0].rate);
  const [showICMSInfo, setShowICMSInfo] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input: TaxInput = {
      productValueUSD: parseFloat(productValue) || 0,
      shippingValueUSD: parseFloat(shippingValue) || 0,
      exchangeRate: parseFloat(exchangeRate) || DEFAULT_EXCHANGE_RATE,
      icmsRate: selectedICMS,
    };
    onCalculate(input);
  };

  const handleReset = () => {
    setProductValue('');
    setShippingValue('');
    setExchangeRate(DEFAULT_EXCHANGE_RATE.toString());
    setSelectedICMS(ICMS_OPTIONS[0].rate);
    onReset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="glass-card p-6 sm:p-8"
    >
      {/* Product Value */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-muted mb-2">
          <DollarSign className="w-4 h-4" />
          Valor do Produto (US$)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 49.99"
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
          className="input-field text-lg font-mono"
          required
          aria-label="Valor do produto em dolares americanos"
        />
      </div>

      {/* Shipping Value */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-muted mb-2">
          <Truck className="w-4 h-4" />
          Valor do Frete (US$)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00 (se frete gratis)"
          value={shippingValue}
          onChange={(e) => setShippingValue(e.target.value)}
          className="input-field text-lg font-mono"
          aria-label="Valor do frete em dolares americanos"
        />
      </div>

      {/* Exchange Rate */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-muted mb-2">
          <ArrowRightLeft className="w-4 h-4" />
          Cotacao do Dolar (R$)
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Ex: 5.75"
          value={exchangeRate}
          onChange={(e) => setExchangeRate(e.target.value)}
          className="input-field text-lg font-mono"
          required
          aria-label="Cotacao do dolar em reais"
        />
        <p className="mt-1.5 text-xs text-brand-muted/70">
          Dica: use a cotacao do seu cartao (geralmente dolar comercial + spread do banco).
        </p>
      </div>

      {/* ICMS Selector */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-muted mb-2">
          Aliquota ICMS do seu Estado
          <button
            type="button"
            onClick={() => setShowICMSInfo(!showICMSInfo)}
            className="p-0.5 rounded-full hover:bg-brand-border/50 transition-colors"
            aria-label="Informacoes sobre aliquotas ICMS"
          >
            <Info className="w-3.5 h-3.5 text-brand-purple-light" />
          </button>
        </label>

        <div className="flex gap-3">
          {ICMS_OPTIONS.map((option) => (
            <button
              key={option.rate}
              type="button"
              onClick={() => setSelectedICMS(option.rate)}
              className={`flex-1 py-3 px-4 rounded-xl border text-center font-semibold transition-all duration-200 ${
                selectedICMS === option.rate
                  ? 'bg-brand-purple/20 border-brand-purple text-brand-purple-light'
                  : 'bg-brand-darker/50 border-brand-border/50 text-brand-muted hover:border-brand-muted/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {showICMSInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 rounded-xl bg-brand-darker/80 border border-brand-border/40 text-xs text-brand-muted space-y-2"
          >
            {ICMS_OPTIONS.map((option) => (
              <div key={option.rate}>
                <span className="font-semibold text-white">{option.label}:</span>{' '}
                {option.description}
              </div>
            ))}
            <div className="pt-2 border-t border-brand-border/30">
              <a
                href="https://comsefaz.org.br/novo/informacoes-fiscais/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple-light hover:underline"
              >
                Ver tabela completa no COMSEFAZ
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Buttons */}
      <button type="submit" className="btn-primary">
        Calcular Impostos
      </button>
      <button type="button" onClick={handleReset} className="btn-secondary mt-3 flex items-center justify-center gap-2">
        <RotateCcw className="w-4 h-4" />
        Limpar
      </button>
    </motion.form>
  );
}
