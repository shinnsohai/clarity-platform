import { motion } from 'framer-motion'
import { groupMetrics } from '../data/hierarchy'

export default function MetricsBar() {
  return (
    <section className="relative bg-paper border-y border-ink/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 py-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Group Performance
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ink/10">
          {groupMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="bg-paper p-6 flex flex-col gap-3"
            >
              <span className="font-display text-3xl xl:text-4xl text-ink">{m.value}</span>
              <span className="text-concrete text-xs tracking-[0.15em] uppercase leading-snug">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
