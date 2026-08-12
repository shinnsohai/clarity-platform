import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import advantages from '../data/advantages.json'

// Stacked "card deck" widget — inspired by the shuffling hero-card slider pattern.
// The front card is active; the deck behind it is visible at a shrinking scale/offset.
// Auto-advances, and the stacked cards are clickable to jump directly.
export default function GroupAdvantages() {
  const items = advantages.items
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 4200)
    return () => clearInterval(id)
  }, [items.length])

  const order = (i) => (i - active + items.length) % items.length

  return (
    <section className="relative bg-paper py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Why Clarity Group
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] mb-8">
            BUILT ON<span className="text-azure">.</span> PROVEN AT SCALE.
          </h2>

          {/* Advantage index — click to jump the deck */}
          <div className="flex flex-col gap-1">
            {items.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-5 text-left py-4 border-b transition-colors ${
                  i === active ? 'border-azure' : 'border-ink/10'
                }`}
              >
                <span
                  className={`font-display text-2xl w-14 shrink-0 transition-colors ${
                    i === active ? 'text-azure' : 'text-ink/25'
                  }`}
                >
                  {a.stat}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-base md:text-lg leading-tight transition-colors ${
                      i === active ? 'text-ink' : 'text-ink/50 group-hover:text-ink/80'
                    }`}
                  >
                    {a.title}
                  </span>
                  <AnimatePresence>
                    {i === active && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-concrete text-sm leading-relaxed mt-2 max-w-md overflow-hidden"
                      >
                        {a.description}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Card deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] md:h-[480px] [perspective:1400px]"
        >
          {items.map((a, i) => {
            const pos = order(i)
            const isFront = pos === 0
            return (
              <motion.div
                key={a.id}
                onClick={() => setActive(i)}
                animate={{
                  x: pos * 22,
                  y: pos * -16,
                  scale: 1 - pos * 0.06,
                  rotate: pos === 0 ? 0 : pos * 2.5,
                  zIndex: items.length - pos,
                  opacity: pos > 2 ? 0 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft-lg border border-ink/10 bg-white cursor-pointer"
                style={{ pointerEvents: isFront ? 'auto' : 'none' }}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-azure-dim/90 via-azure-dim/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-display text-5xl text-white mb-1">{a.stat}</div>
                  <div className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                    {a.statLabel}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
