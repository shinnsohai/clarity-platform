import { AnimatePresence, motion } from 'framer-motion'
import { X, UserCheck, Users, Building2, Calendar, MapPin, Briefcase, Mail, Award } from 'lucide-react'

// Ported + restyled from the user's standalone build (10. World Map/src/components/CountryDetailModal.jsx).
export default function CountryDetailModal({ country, onClose }) {
  return (
    <AnimatePresence>
      {country && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden bg-ink/50 backdrop-blur-md flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col bg-white border-l border-ink/10"
          >
            {(() => {
              const {
                name, fullName, flag, directWorkers, indirectWorkers, directWorkersRaw, indirectWorkersRaw,
                totalWorkers, clients, status, region, establishedYear, keyProjects, contactPerson, email,
              } = country
              const totalRaw = (directWorkersRaw || 0) + (indirectWorkersRaw || 0)
              const directPercentage = totalRaw > 0 ? Math.round((directWorkersRaw / totalRaw) * 100) : 0
              const indirectPercentage = 100 - directPercentage

              return (
                <>
                  <div className="relative p-6 border-b border-ink/10 bg-pearl">
                    <button
                      onClick={onClose}
                      className="absolute top-5 right-5 p-2 rounded-xl border border-ink/10 bg-white text-concrete hover:text-ink transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{flag}</span>
                      <div>
                        <h2 className="font-display text-2xl text-ink">{fullName || name}</h2>
                        <div className="flex items-center gap-3 text-xs font-medium mt-0.5 text-concrete">
                          <span className="flex items-center gap-1 text-azure">
                            <MapPin className="w-3.5 h-3.5" /> {region}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> Est. {establishedYear || '—'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Operational Status: {status}
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-concrete">
                        <Users className="w-4 h-4 text-azure" /> Operational Workforce Deployment
                      </h3>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="rounded-2xl p-4 border border-ink/10 bg-pearl flex flex-col">
                          <div className="flex items-center gap-2 text-xs font-semibold text-azure mb-1">
                            <UserCheck className="w-4 h-4" /> Direct Workers
                          </div>
                          <span className="text-2xl font-display text-ink">{directWorkers}</span>
                          <span className="text-[11px] mt-1 text-concrete">Full-time on-site specialists</span>
                        </div>
                        <div className="rounded-2xl p-4 border border-ink/10 bg-pearl flex flex-col">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gold-dim mb-1">
                            <Users className="w-4 h-4" /> Indirect Workers
                          </div>
                          <span className="text-2xl font-display text-ink">{indirectWorkers}</span>
                          <span className="text-[11px] mt-1 text-concrete">Subcontracted & support staff</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-ink/10 bg-pearl space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-azure">Direct ({directPercentage}%)</span>
                          <span className="text-gold-dim">Indirect ({indirectPercentage}%)</span>
                        </div>
                        <div className="w-full h-3 rounded-full overflow-hidden flex bg-white">
                          <div className="h-full bg-azure transition-all duration-500" style={{ width: `${directPercentage}%` }} />
                          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${indirectPercentage}%` }} />
                        </div>
                        <div className="text-[11px] text-right text-concrete">
                          Combined Regional Workforce: <strong className="text-ink">{totalWorkers}</strong>
                        </div>
                      </div>
                    </div>

                    {clients?.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-concrete">
                          <Building2 className="w-4 h-4 text-azure" /> Key Clients & EPC Partners
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {clients.map((client, idx) => (
                            <div key={idx} className="p-3 rounded-xl border border-ink/10 bg-pearl flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg border border-azure/20 bg-azure-light font-display text-xs flex items-center justify-center text-azure shrink-0">
                                {client.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-ink truncate">{client}</h4>
                                <span className="text-[10px] text-concrete">Client</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {keyProjects?.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-concrete">
                          <Briefcase className="w-4 h-4 text-azure" /> Active Scope & Projects
                        </h3>
                        <div className="space-y-2">
                          {keyProjects.map((proj, idx) => (
                            <div key={idx} className="p-3 rounded-xl border border-ink/10 bg-pearl flex items-center gap-3 text-xs text-ink">
                              <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>{proj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl border border-ink/10 bg-pearl space-y-2">
                      <h4 className="text-xs font-bold flex items-center gap-2 text-ink">
                        <Mail className="w-4 h-4 text-azure" /> Operational Support Contact
                      </h4>
                      <div className="text-xs">
                        <p className="font-semibold text-ink">{contactPerson || 'Regional Lead'}</p>
                        <p className="text-concrete">{email || '—'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-ink/10 bg-pearl flex items-center justify-end">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl border border-ink/10 bg-white hover:bg-pearl text-xs font-semibold text-ink transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
