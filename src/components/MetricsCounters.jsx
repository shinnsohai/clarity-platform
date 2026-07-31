import { motion } from 'framer-motion'
import Counter from './Counter'
import { groupMetrics } from '../data/hierarchy'

export default function MetricsCounters() {
  return (
    <section className="relative bg-white border-y border-navy/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 py-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Group Performance
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-navy/10">
          {groupMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-6 flex flex-col gap-3"
            >
              <span className="font-display text-3xl xl:text-4xl text-accent-dim">
                <Counter value={m.value} suffix={m.suffix} decimals={Number.isInteger(m.value) ? 0 : 1} />
              </span>
              <span className="text-navy text-xs tracking-[0.15em] uppercase leading-snug font-semibold">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
