import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, Info, Search, Filter, BookOpen } from 'lucide-react';
import { claims, sources } from '../data/researchData';
import { Claim, Source } from '../types';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelectId: (id: string) => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  selectedId,
  onSelectId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChapter, setFilterChapter] = useState<string>('all');

  if (!isOpen) return null;

  // Selected item data
  const selectedClaim: Claim | undefined = selectedId ? claims[selectedId] : undefined;
  const selectedSource: Source | undefined = selectedClaim
    ? sources.find((s) => s.source_id === selectedClaim.source_id)
    : sources.find((s) => s.source_id === selectedId);

  const claimList = Object.values(claims);

  const filteredClaims = claimList.filter((c) => {
    const matchesSearch =
      c.claim_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.safe_wording.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caveat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChapter = filterChapter === 'all' || c.chapter === filterChapter;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#0C1016] text-[#EEF2F6] h-full shadow-2xl flex flex-col border-l border-[#222B38] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#222B38] bg-[#161C25] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0C1016] text-[#22D3EE] flex items-center justify-center font-bold border border-[#222B38]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#EEF2F6]">Evidence & Research Audit Drawer</h2>
              <p className="text-xs text-[#94A3B8]">Atomic Claims, Methodologies & Factual Caveats</p>
            </div>
          </div>
          <button
            id="close-evidence-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#EEF2F6] hover:bg-[#222B38] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: detail view or index */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0C1016]">
          {selectedClaim || selectedSource ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Back to list */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectId('')}
                  className="text-xs text-[#22D3EE] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  ← Back to full claim database
                </button>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-[#161C25] text-[#94A3B8] border border-[#222B38]">
                  {selectedClaim ? selectedClaim.claim_id : selectedSource?.source_id}
                </span>
              </div>

              {/* Main Claim Title */}
              {selectedClaim && (
                <div className="border-l-3 border-[#22D3EE] pl-4 py-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#22D3EE] block mb-1">
                    {selectedClaim.evidence_type.replace(/_/g, ' ')}
                  </span>
                  <p className="text-lg font-semibold text-[#EEF2F6] leading-snug font-serif">
                    "{selectedClaim.claim}"
                  </p>
                </div>
              )}

              {/* Verified Value & Confidence */}
              {selectedClaim && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#161C25] p-4 rounded-xl border border-[#222B38] text-xs">
                  <div>
                    <span className="text-[#94A3B8] block">Stated Metric</span>
                    <span className="font-semibold text-[#EEF2F6] text-sm font-mono">
                      {typeof selectedClaim.value === 'object'
                        ? JSON.stringify(selectedClaim.value)
                        : `${selectedClaim.value} ${selectedClaim.unit || ''}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block">Target Population</span>
                    <span className="font-semibold text-[#EEF2F6]">{selectedClaim.population}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block">Data Period</span>
                    <span className="font-semibold text-[#EEF2F6]">{selectedClaim.period}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block">Evidence Confidence</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#10B981]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {selectedClaim.confidence.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#94A3B8] block">Chapter Context</span>
                    <span className="font-semibold text-[#EEF2F6] capitalize">
                      {selectedClaim.chapter.replace('_', ': ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Safe Wording Requirement */}
              {selectedClaim && (
                <div className="p-4 rounded-xl bg-[#161C25] border border-[#222B38] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#22D3EE] text-xs font-bold uppercase tracking-wider">
                    <Info className="w-4 h-4 text-[#22D3EE]" />
                    Mandatory Safe Wording
                  </div>
                  <p className="text-xs text-[#EEF2F6] leading-relaxed font-medium">
                    {selectedClaim.safe_wording}
                  </p>
                </div>
              )}

              {/* Methodological Caveat */}
              {selectedClaim && (
                <div className="p-4 rounded-xl bg-[#161C25] border border-[#F43F5E]/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#F43F5E] text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#F43F5E]" />
                    Methodological Caveat & Anti-Hype Guardrail
                  </div>
                  <p className="text-xs text-[#EEF2F6] leading-relaxed font-medium">
                    {selectedClaim.caveat}
                  </p>
                </div>
              )}

              {/* Source Details */}
              {selectedSource && (
                <div className="p-4 rounded-xl border border-[#222B38] bg-[#161C25] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#EEF2F6] flex items-center gap-1.5">
                      <span className="text-[#22D3EE]">[{selectedSource.source_id}]</span>
                      {selectedSource.organization}
                    </h3>
                    <span className="text-xs text-[#94A3B8]">{selectedSource.date}</span>
                  </div>
                  <p className="text-xs font-medium text-[#EEF2F6]">{selectedSource.title}</p>
                  <div className="text-xs text-[#94A3B8] bg-[#0C1016] p-2.5 rounded border border-[#222B38] space-y-1">
                    <span className="font-bold text-[#22D3EE] block">Methodology & Sampling:</span>
                    <p>{selectedSource.method_note}</p>
                  </div>
                  {selectedSource.url && selectedSource.url.startsWith('http') && (
                    <a
                      href={selectedSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:underline pt-1"
                    >
                      <span>Read original publication / study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Claim Explorer Search/Filter list */
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search claims, keywords, sources, or caveats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#161C25] text-[#EEF2F6] border border-[#222B38] rounded-lg focus:outline-none focus:border-[#22D3EE] placeholder-[#94A3B8]"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <Filter className="w-3 h-3 text-[#94A3B8] shrink-0" />
                  {['all', '01_fear', '02_boost', '03_value_gap', '04_first_rung', '05_new_advantage', '06_who_gets_value'].map(
                    (ch) => (
                      <button
                        key={ch}
                        onClick={() => setFilterChapter(ch)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          filterChapter === ch
                            ? 'bg-[#22D3EE] text-[#0C1016] font-bold'
                            : 'bg-[#161C25] text-[#94A3B8] hover:bg-[#222B38] hover:text-[#EEF2F6] border border-[#222B38]'
                        }`}
                      >
                        {ch === 'all' ? 'All Chapters' : ch.replace('_', ' ')}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs text-[#94A3B8]">
                  Showing {filteredClaims.length} verified research claims across external peer-reviewed literature and curated datasets.
                </p>
                {filteredClaims.map((item) => (
                  <div
                    key={item.claim_id}
                    onClick={() => onSelectId(item.claim_id)}
                    className="p-3.5 rounded-xl border border-[#222B38] bg-[#161C25] hover:border-[#22D3EE]/50 hover:bg-[#1E2633] transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#22D3EE] bg-[#0C1016] px-1.5 py-0.5 rounded border border-[#222B38]">
                        {item.claim_id}
                      </span>
                      <span className="text-[#94A3B8] capitalize">{item.chapter.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs font-medium text-[#EEF2F6] group-hover:text-[#22D3EE]">
                      {item.claim}
                    </p>
                    <p className="text-[11px] text-[#94A3B8] line-clamp-1">
                      <span className="font-semibold text-[#22D3EE]">Caveat:</span> {item.caveat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#222B38] bg-[#161C25] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>The Work Observatory · Audit Layer v1.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0C1016] hover:bg-[#222B38] text-[#EEF2F6] border border-[#222B38] font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
