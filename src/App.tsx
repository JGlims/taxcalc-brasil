import { useState } from 'react';
import { Header } from '@/components/Header';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsPanel } from '@/components/ResultsPanel';
import { ReferenceLinksSection } from '@/components/ReferenceLinks';
import { AdSlot } from '@/components/AdSlot';
import { Footer } from '@/components/Footer';
import { calculateTax } from '@/lib/taxEngine';
import type { TaxInput, TaxBreakdown } from '@/types/tax';

export default function App() {
  const [result, setResult] = useState<TaxBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (input: TaxInput) => {
    try {
      setError(null);
      const breakdown = calculateTax(input);
      setResult(breakdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado no calculo.');
      setResult(null);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-brand-dark via-brand-card/30 to-brand-darker pointer-events-none" />
      <div className="relative z-10">
        <Header />
        <main className="max-w-2xl mx-auto px-4 pb-12">
          <AdSlot id="ad-slot-top" className="mb-6" />
          <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} />
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          {result && <ResultsPanel breakdown={result} />}
          <AdSlot id="ad-slot-bottom" className="mt-8" />
          <ReferenceLinksSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
