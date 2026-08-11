import { motion } from 'framer-motion'
import Counter from './Counter'
import { groupMetrics } from '../data/hierarchy'

export default function MetricsCounters() {
  return (
    <section className="relative bg-white border-y border-ink/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 py-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-azure rounded-full inline-block" />
          Group Performance
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ink/10 rounded-2xl">
          {groupMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.04 }}
              className="group relative bg-white hover:bg-white p-6 flex flex-col gap-3 rounded-2xl cursor-default"
              style={{ transformOrigin: 'center' }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl shadow-soft-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <span className="relative font-display text-3xl xl:text-4xl text-azure transition-transform duration-300 group-hover:scale-110 origin-left">
                <Counter value={m.value} suffix={m.suffix} decimals={Number.isInteger(m.value) ? 0 : 1} />
              </span>
              <span className="relative text-ink text-xs tracking-[0.15em] uppercase leading-snug font-semibold">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
