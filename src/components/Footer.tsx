import { ShieldCheck } from 'lucide-react';
import { APP_META } from '@/config/taxRates';

export function Footer() {
  return (
    <footer className="border-t border-brand-border/30 mt-8">
      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-card/40 border border-brand-border/30 text-left">
          <ShieldCheck className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
          <p className="text-xs text-brand-muted leading-relaxed">
            {APP_META.disclaimer}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-brand-muted/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-mint/60" />
            Zero cookies
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-mint/60" />
            Zero rastreamento
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-mint/60" />
            100% client-side
          </span>
        </div>

        <div className="text-xs text-brand-muted/40 space-y-1">
          <p>TaxCalc Brasil v{APP_META.version} - Atualizado em {APP_META.lastUpdated}</p>
          <p>Nao e um produto do governo. Ferramenta independente de uso publico.</p>
        </div>
      </div>
    </footer>
  );
}
