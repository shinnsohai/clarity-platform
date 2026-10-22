import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import careers from '../data/careers.json'
import { entities } from '../data/hierarchy'
import PageHero from '../components/PageHero'
import SocialIcon from '../components/icons/SocialIcon'
import { getApply, formatPosted, slotsOf, sortJobs } from '../utils/jobApply'

const entityById = Object.fromEntries(entities.map((e) => [e.id, e]))

const SORTS = [
  { id: 'newest', label: 'Newest' },
  { id: 'slots', label: 'Most slots open' },
]

export default function Careers() {
  const entityFilters = useMemo(() => ['All', ...new Set(careers.jobs.map((j) => j.entity))], [])
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('newest')
  const jobs = useMemo(
    () => sortJobs(filter === 'All' ? careers.jobs : careers.jobs.filter((j) => j.entity === filter), sort),
    [filter, sort]
  )
  const totalSlots = jobs.reduce((n, j) => n + slotsOf(j), 0)

  return (
    <div className="bg-paper">
      <PageHero
        size="lg"
        kicker="Career Opportunities"
        title={<>JOIN THE PORTFOLIO<span className="text-azure">.</span></>}
        description={careers.intro}
      />

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex gap-2 flex-wrap mb-6">
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

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 mb-8 pb-5 border-b border-ink/10">
          <p className="text-concrete text-sm" aria-live="polite">
            <span className="text-ink font-semibold">{jobs.length}</span> {jobs.length === 1 ? 'opening' : 'openings'}
            {totalSlots > 0 && (
              <>
                {' · '}
                <span className="text-ink font-semibold">{totalSlots}</span> {totalSlots === 1 ? 'slot' : 'slots'} open
              </>
            )}
          </p>
          <div className="flex items-center gap-3" role="group" aria-label="Sort openings">
            <span className="text-[10px] tracking-[0.2em] uppercase text-concrete">Sort by</span>
            <div className="flex rounded-md border border-ink/15 overflow-hidden">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  aria-pressed={sort === s.id}
                  className={`text-[11px] tracking-[0.1em] uppercase px-4 py-2 transition-colors ${
                    sort === s.id ? 'bg-azure text-white' : 'bg-white text-ink hover:text-azure'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => {
            const apply = getApply(job)
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 px-6 bg-white rounded-xl border border-ink/10 hover:border-azure/40 hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img src={entityById[job.entity]?.logo} alt="" className="h-9 w-9 object-contain shrink-0" />
                  <div className="min-w-0">
                    {/* Stretched link: the whole card opens the job; Apply sits above it (z-10) */}
                    <Link
                      to={`/careers/${job.id}`}
                      className="font-display text-lg text-ink leading-tight group-hover:text-azure transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-azure focus-visible:after:rounded-xl"
                    >
                      {job.title}
                    </Link>
                    <div className="text-concrete text-xs mt-1">
                      {entityById[job.entity]?.name}
                      {job.client ? ` · ${job.client}` : ''}
                    </div>
                    <div className="text-concrete/80 text-xs mt-0.5">
                      {job.location}
                      {job.posted && <> · Posted {formatPosted(job.posted)}</>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 shrink-0">
                  {job.vacancies && (
                    <span className="text-[10px] tracking-[0.15em] uppercase text-ink font-semibold">
                      {job.vacancies} {Number(job.vacancies) === 1 ? 'vacancy' : 'vacancies'}
                    </span>
                  )}
                  {job.salary && (
                    <span className="text-[10px] tracking-[0.15em] uppercase text-concrete font-semibold">{job.salary}</span>
                  )}
                  <span className="text-[10px] tracking-[0.2em] uppercase text-azure font-bold">{job.type}</span>
                  {/* WhatsApp when the subsidiary has a number (works without a mail app), else email */}
                  <a
                    href={apply.waHref || apply.mailHref}
                    {...(apply.waHref ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="relative z-10 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase bg-azure text-white rounded-md px-5 py-2.5 hover:brightness-110 transition-all"
                  >
                    {apply.waHref && <SocialIcon name="whatsapp" className="w-4 h-4" />}
                    {apply.waHref ? 'WhatsApp' : 'Apply →'}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
