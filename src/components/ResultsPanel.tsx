import { motion } from 'framer-motion';
import {
  Package,
  Landmark,
  Building2,
  Banknote,
  TrendingUp,
  Tag,
  BadgeMinus,
} from 'lucide-react';
import type { TaxBreakdown } from '@/types/tax';
import { formatBRL, formatPercent } from '@/lib/taxEngine';

interface Props {
  breakdown: TaxBreakdown;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

function ResultRow({
  icon,
  label,
  value,
  sublabel,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel?: string;
  highlight?: 'danger' | 'success';
}) {
  const valueColor =
    highlight === 'danger'
      ? 'text-red-400'
      : highlight === 'success'
      ? 'text-brand-mint'
      : 'text-white';

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-200">{label}</div>
          {sublabel && (
            <div className="text-xs text-brand-muted/70 mt-0.5">{sublabel}</div>
          )}
        </div>
      </div>
      <div className={`text-base sm:text-lg font-semibold font-mono shrink-0 ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-brand-border/30" />;
}

export function ResultsPanel({ breakdown }: Props) {
  const bracketLabel =
    breakdown.bracket === 'up_to_50'
      ? 'Ate US$ 50 - Aliquota Reduzida (20%)'
      : 'Acima de US$ 50 - Aliquota Integral (60%)';

  const bracketColor =
    breakdown.bracket === 'up_to_50'
      ? 'text-brand-mint bg-brand-mint/10 border-brand-mint/20'
      : 'text-brand-warning bg-yellow-500/10 border-yellow-500/20';

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 space-y-4"
    >
      {/* Bracket Badge */}
      <motion.div variants={item} className="flex justify-center">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${bracketColor}`}
        >
          <Tag className="w-3.5 h-3.5" />
          {bracketLabel}
        </span>
      </motion.div>

      {/* Breakdown Grid */}
      <motion.div variants={item} className="glass-card p-5 sm:p-6 space-y-3">
        <ResultRow
          icon={<Package className="w-4 h-4 text-blue-400" />}
          label="Valor Aduaneiro (Produto + Frete)"
          value={formatBRL(breakdown.customsValueBRL)}
          sublabel={`US$ ${breakdown.customsValueUSD.toFixed(2)}`}
        />

        <Divider />

        <ResultRow
          icon={<Landmark className="w-4 h-4 text-orange-400" />}
          label={`Imposto de Importacao (${(breakdown.iiRate * 100).toFixed(0)}%)`}
          value={formatBRL(breakdown.iiNetBRL)}
          sublabel={
            breakdown.iiDiscountBRL > 0
              ? `Bruto: ${formatBRL(breakdown.iiAmountBRL)} - Desconto: ${formatBRL(breakdown.iiDiscountBRL)}`
              : undefined
          }
        />

        {breakdown.iiDiscountBRL > 0 && (
          <div className="flex items-center gap-2 ml-8 text-xs text-brand-mint">
            <BadgeMinus className="w-3.5 h-3.5" />
            Desconto de US$ 20 aplicado (Lei 14.902/2024)
          </div>
        )}

        <Divider />

        <ResultRow
          icon={<Building2 className="w-4 h-4 text-purple-400" />}
          label={`ICMS (${(breakdown.icmsRate * 100).toFixed(0)}% "por dentro")`}
          value={formatBRL(breakdown.icmsAmountBRL)}
          sublabel="Calculado sobre base que inclui o proprio ICMS"
        />

        <Divider />

        <ResultRow
          icon={<TrendingUp className="w-4 h-4 text-red-400" />}
          label="Total de Impostos"
          value={formatBRL(breakdown.totalTaxesBRL)}
          sublabel={`Impacto: ${formatPercent(breakdown.effectiveTaxPercent)} sobre o valor original`}
          highlight="danger"
        />
      </motion.div>

      {/* Grand Total */}
      <motion.div
        variants={item}
        className="glass-card p-6 sm:p-8 text-center border-brand-purple/30"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Banknote className="w-5 h-5 text-brand-mint" />
          <span className="text-sm font-medium text-brand-muted">
            CUSTO TOTAL ESTIMADO
          </span>
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-brand-mint tracking-tight">
          {formatBRL(breakdown.totalCostBRL)}
        </div>
        <p className="mt-2 text-xs text-brand-muted/70">
          Valor que voce pagara incluindo produto, frete e todos os impostos.
        </p>
      </motion.div>
    </motion.div>
  );
}
