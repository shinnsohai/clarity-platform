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
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Career Opportunities
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            DEPLOYMENT READY<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">{careers.intro}</p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex gap-2 flex-wrap mb-12">
          {entityFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                filter === f ? 'bg-navy text-white border-navy' : 'border-navy/20 text-navy hover:border-navy'
              }`}
            >
              {f === 'All' ? 'All' : entityById[f]?.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col border-t border-navy/15">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-navy/15 hover:bg-[#F9FAFB] transition-colors px-2"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={entityById[job.entity]?.logo}
                  alt=""
                  className="h-9 w-9 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-display text-lg text-navy leading-tight">{job.title}</div>
                  <div className="text-concrete text-xs mt-1">
                    {entityById[job.entity]?.name} · {job.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-[10px] tracking-[0.2em] uppercase text-accent-dim font-bold">
                  {job.type}
                </span>
                <a
                  href={`mailto:careers@cec.com.sg?subject=${encodeURIComponent(job.title)}`}
                  className="text-[11px] tracking-[0.15em] uppercase border border-navy text-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors"
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
