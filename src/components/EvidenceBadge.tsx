import React from 'react';
import { claims, sources } from '../data/researchData';
import { ShieldCheck } from 'lucide-react';

interface EvidenceBadgeProps {
  id: string;
  onClick: (id: string) => void;
  className?: string;
  labelOverride?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  id,
  onClick,
  className = '',
  labelOverride
}) => {
  const claim = claims[id];
  const source = sources.find((s) => s.source_id === (claim ? claim.source_id : id));

  const label =
    labelOverride ||
    (claim
      ? `${claim.claim_id} · ${source ? source.organization.split(' ')[0] : 'Audit'}`
      : source
      ? `${source.source_id} · ${source.organization.split(' ')[0]}`
      : id);

  return (
    <button
      id={`evidence-badge-${id}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md border border-[#1d3f71] bg-[#0c2142]/90 text-[#f7faeb] hover:bg-[#122e58] hover:text-[#d7e63b] hover:border-[#d7e63b]/50 transition-all cursor-pointer whitespace-nowrap align-baseline shadow-xs group ${className}`}
      title={`Inspect empirical evidence peel for ${id}`}
    >
      <ShieldCheck className="w-3 h-3 text-[#d7e63b] group-hover:scale-110 transition-transform" />
      <span>{label}</span>
      <span className="text-[9px] text-[#6dc361] font-sans opacity-80 group-hover:opacity-100">peel ↗</span>
    </button>
  );
};
