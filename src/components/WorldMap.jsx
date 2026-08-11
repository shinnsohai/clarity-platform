import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { offices } from '../data/hierarchy'

export default function WorldMap() {
  const [activeId, setActiveId] = useState(offices[0]?.id)
  const active = offices.find((o) => o.id === activeId) || offices[0]
  const photos = active?.photos || []

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-azure rounded-full inline-block" />
          Global Reach
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] mb-14">
          GROUP OFFICES<span className="text-azure">.</span> WORLDWIDE.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5">
          <div className="relative w-full aspect-[16/9] rounded-2xl shadow-soft overflow-hidden bg-white">
            <iframe
              key={active?.id}
              title={`Clarity E&C — ${active?.city}`}
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(active?.city || 'Singapore')}&output=embed`}
            />
          </div>

          <div className="flex flex-col gap-2">
            {offices.map((o) => (
              <motion.button
                key={o.id}
                onClick={() => setActiveId(o.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`text-left rounded-xl px-5 py-4 border transition-colors ${
                  activeId === o.id
                    ? 'bg-azure border-azure text-white shadow-soft'
                    : 'bg-white border-ink/10 text-ink hover:border-azure'
                }`}
              >
                <div className="font-display text-sm leading-tight">{o.name}</div>
                <div className={`text-xs mt-1 ${activeId === o.id ? 'text-white/80' : 'text-concrete'}`}>
                  {o.city}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Photo Showcase — reflects whichever office is selected above */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">
                {active?.name} Photo Showcase
              </span>
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((p, i) => (
                  <div
                    key={i}
                    className="group relative h-40 rounded-xl overflow-hidden shadow-soft"
                  >
                    <img
                      src={p.src}
                      alt={p.caption || active.city}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-[10px] tracking-[0.15em] uppercase">
                          {p.caption}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ink/15 rounded-2xl py-10 text-center bg-white/50">
                <span className="text-azure text-xs tracking-[0.3em] uppercase font-semibold">
                  Photos Coming Soon
                </span>
                <p className="text-concrete text-sm mt-2">
                  Site photography for {active?.city} will appear here once uploaded.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
