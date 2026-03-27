import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Calculator,
  MapPin,
  BadgeCheck,
  Scale,
  ExternalLink,
} from 'lucide-react';
import { REFERENCE_LINKS } from '@/config/taxRates';

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="w-5 h-5" />,
  calculator: <Calculator className="w-5 h-5" />,
  'map-pin': <MapPin className="w-5 h-5" />,
  'badge-check': <BadgeCheck className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
};

export function ReferenceLinksSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-10"
    >
      <h2 className="text-lg font-semibold text-white mb-4 text-center">
        Fontes Oficiais - Verifique Voce Mesmo
      </h2>
      <div className="space-y-3">
        {REFERENCE_LINKS.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 glass-card hover:border-brand-purple/40 transition-all duration-200 group"
          >
            <div className="shrink-0 p-2 rounded-lg bg-brand-purple/10 text-brand-purple-light group-hover:bg-brand-purple/20 transition-colors">
              {iconMap[link.icon] || <ExternalLink className="w-5 h-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white group-hover:text-brand-purple-light transition-colors">
                {link.title}
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                {link.description}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-brand-muted/50 shrink-0 mt-1 group-hover:text-brand-purple-light transition-colors" />
          </a>
        ))}
      </div>
    </motion.section>
  );
}
