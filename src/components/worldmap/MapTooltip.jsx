import { UserCheck, Users, Building2, ChevronRight, MapPin } from 'lucide-react'

// Ported from the user's standalone world-map build (10. World Map/src/components/CustomTooltip.jsx),
// restyled onto Clarity's bright Navy/Gold tokens — original was a light/dark toggle,
// this site has no dark mode so only the light variant survives.
export default function MapTooltip({ content, position }) {
  if (!content) return null

  const { name, flag, directWorkers, indirectWorkers, clients, status, region } = content

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-150 ease-out transform -translate-x-1/2 -translate-y-full mb-3"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="relative w-80 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-soft-lg border border-ink/10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-azure/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-ink/10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl select-none">{flag}</span>
            <div>
              <h3 className="font-display text-lg leading-tight text-ink">{name}</h3>
              <p className="text-[11px] font-semibold text-concrete flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold" /> {region}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status || 'Active'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl p-2.5 border border-ink/10 bg-pearl flex flex-col">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gold-dim mb-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Direct Workers</span>
            </div>
            <span className="text-lg font-display text-ink">{directWorkers}</span>
          </div>
          <div className="rounded-xl p-2.5 border border-ink/10 bg-pearl flex flex-col">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-azure mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Indirect Workers</span>
            </div>
            <span className="text-lg font-display text-ink">{indirectWorkers}</span>
          </div>
        </div>

        {clients && clients.length > 0 && (
          <div className="space-y-1.5 mb-1">
            <div className="flex items-center justify-between text-xs font-bold text-ink">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-gold" />
                Clients Served ({clients.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {clients.map((client, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-bold rounded-lg border border-ink/10 bg-pearl text-ink"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 mt-2 text-[10px] flex items-center justify-between border-t border-ink/10 font-semibold text-concrete">
          <span className="flex items-center gap-1 text-gold-dim font-bold">Click for full detail</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}
