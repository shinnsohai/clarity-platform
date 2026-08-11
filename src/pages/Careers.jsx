import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import careers from '../data/careers.json'
import { entities } from '../data/hierarchy'

const entityById = Object.fromEntries(entities.map((e) => [e.id, e]))

export default function Careers() {
  const entityFilters = useMemo(() => ['All', ...new Set(careers.jobs.map((j) => j.entity))], [])
  const [filter, setFilter] = useState('All')
  const jobs = filter === 'All' ? careers.jobs : careers.jobs.filter((j) => j.entity === filter)

  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Career Opportunities
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-[0.9] max-w-4xl">
            JOIN THE PORTFOLIO<span className="text-azure">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-concrete text-lg leading-relaxed">{careers.intro}</p>
        </motion.div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex gap-2 flex-wrap mb-12">
          {entityFilters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-colors ${
                filter === f ? 'bg-azure text-white border-azure' : 'border-ink/15 text-ink hover:border-azure'
              }`}
            >
              {f === 'All' ? 'All' : entityById[f]?.name}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 px-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={entityById[job.entity]?.logo}
                  alt=""
                  className="h-9 w-9 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-display text-lg text-ink leading-tight">{job.title}</div>
                  <div className="text-concrete text-xs mt-1">
                    {entityById[job.entity]?.name} · {job.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-[10px] tracking-[0.2em] uppercase text-azure font-bold">
                  {job.type}
                </span>
                <a
                  href={`mailto:careers@clarityec.com.sg?subject=${encodeURIComponent(job.title)}`}
                  className="text-[11px] tracking-[0.15em] uppercase bg-azure text-white rounded-full px-5 py-2.5 hover:brightness-110 transition-all"
                >
                  Apply →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
