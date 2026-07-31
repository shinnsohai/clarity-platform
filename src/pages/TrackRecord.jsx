import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import trackRecord from '../data/trackRecord.json'

export default function TrackRecord() {
  const categories = useMemo(
    () => ['All', ...new Set(trackRecord.projects.map((p) => p.category))],
    []
  )
  const [filter, setFilter] = useState('All')
  const projects =
    filter === 'All' ? trackRecord.projects : trackRecord.projects.filter((p) => p.category === filter)

  return (
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Track Record
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            EXECUTION<span className="text-accent">.</span> ON RECORD.
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            Semiconductor packages. Manufacturing turnarounds. Civil works. Every project below
            was executed by a CEC subsidiary or strategic partner.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex gap-2 flex-wrap mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                filter === c ? 'bg-navy text-white border-navy' : 'border-navy/20 text-navy hover:border-navy'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative mb-4 break-inside-avoid overflow-hidden border border-navy/10 ${
                p.tall ? 'h-[420px]' : 'h-[260px]'
              }`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-accent text-[10px] tracking-[0.25em] uppercase">{p.category}</span>
                <div className="font-display text-lg text-white leading-tight mt-1 mb-2">{p.title}</div>
                <p className="text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                  {p.blurb}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
