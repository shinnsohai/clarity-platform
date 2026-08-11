import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Real Google Maps embed (same pattern as the homepage Global Offices map) — pick a
// country from the list, its map loads on the left and its data shows below. No API
// key needed, no custom pin-placement math to get wrong.
export default function WorldDataMap({ label, title, rows, renderStats, emptyHint }) {
  const [activeId, setActiveId] = useState(rows[0]?.id)
  const active = rows.find((r) => r.id === activeId) || rows[0]

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            {label}
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-4">
            {title}
          </h2>
          <p className="text-concrete text-sm mb-10 max-w-xl">{emptyHint}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5"
        >
          <div className="relative w-full aspect-[16/9] rounded-2xl shadow-soft overflow-hidden bg-white">
            <iframe
              key={active?.id}
              title={`${label} — ${active?.country}`}
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(active?.country || 'Singapore')}&output=embed`}
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
            {rows.map((row) => (
              <motion.button
                key={row.id}
                onClick={() => setActiveId(row.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`text-left rounded-xl px-5 py-4 border transition-colors ${
                  activeId === row.id
                    ? 'bg-azure border-azure text-white shadow-soft'
                    : 'bg-white border-ink/10 text-ink hover:border-azure'
                }`}
              >
                <div className="font-display text-sm leading-tight">{row.country}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-soft p-6 md:p-8"
          >
            <div className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-4">
              {active?.country}
            </div>
            {renderStats(active)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
