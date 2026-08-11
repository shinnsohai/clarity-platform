import { useState } from 'react'
import { motion } from 'framer-motion'
import { offices } from '../data/hierarchy'

export default function WorldMap() {
  const [activeId, setActiveId] = useState(offices[0]?.id)
  const active = offices.find((o) => o.id === activeId) || offices[0]

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
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
      </div>
    </section>
  )
}
