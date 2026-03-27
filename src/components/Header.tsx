import { Calculator } from 'lucide-react';
import { APP_META } from '@/config/taxRates';

export function Header() {
  return (
    <header className="pt-8 pb-6 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-brand-purple/20 border border-brand-purple/30">
          <Calculator className="w-6 h-6 text-brand-purple-light" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {APP_META.name}
        </h1>
      </div>
      <p className="text-brand-muted text-sm sm:text-base">
        {APP_META.subtitle}
      </p>
      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse-soft" />
        <span className="text-brand-mint text-xs font-medium">
          Regras atualizadas — {APP_META.lastUpdated}
        </span>
      </div>
    </header>
  );
}
