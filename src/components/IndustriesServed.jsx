import { motion } from 'framer-motion'
import industries from '../data/industries.json'

// Restrained by design: no glow, no gradients, no decorative motion — a plain grid
// of real sectors, each backed by named clients already on the roster (see
// src/data/industries.json). No sector appears here without evidence.
export default function IndustriesServed() {
  return (
    <section className="relative bg-paper py-24 border-t border-ink/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          {industries.kicker}
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-3">
          {industries.headline}
        </h2>
        <p className="text-concrete text-base max-w-xl mb-14">{industries.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {industries.sectors.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-paper p-7 flex flex-col"
            >
              <span className="font-mono text-[11px] text-gold-dim mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-base text-ink mb-2 leading-tight">{s.name}</h3>
              <p className="text-concrete text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2 border-t border-ink/10">
                {s.evidence.map((e) => (
                  <span
                    key={e}
                    className="text-[10px] tracking-wide text-concrete/80 bg-ink/[0.03] border border-ink/10 rounded px-2 py-1"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
