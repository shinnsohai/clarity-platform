import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { entities } from '../data/hierarchy'
import PageHero from '../components/PageHero'
import SocialIcon from '../components/icons/SocialIcon'
import EmailApply from '../components/EmailApply'
import { getApply, formatPosted, openJobs } from '../utils/jobApply'

const entityById = Object.fromEntries(entities.map((e) => [e.id, e]))

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <div className="flex items-center gap-4 mb-5 text-concrete text-xs tracking-[0.3em] uppercase">
        <span className="w-2 h-2 bg-gold rounded-full inline-block" />
        {title}
      </div>
      {children}
    </motion.section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-3 max-w-2xl">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-ink/85 leading-relaxed">
          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

function Fact({ label, children }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-concrete mb-1">{label}</div>
      <div className="text-ink font-semibold leading-snug">{children}</div>
    </div>
  )
}

export default function JobDetail() {
  const { slug } = useParams()
  const job = openJobs.find((j) => j.id === slug)

  if (!job) {
    return (
      <div className="bg-paper">
        <PageHero
          backTo="/careers"
          backLabel="Careers"
          kicker="Career Opportunities"
          title={<>POSITION NOT FOUND<span className="text-azure">.</span></>}
          description="This role may have been filled or removed. See everything that is currently open."
        />
      </div>
    )
  }

  const entity = entityById[job.entity]
  const apply = getApply(job)
  const others = openJobs.filter((j) => j.entity === job.entity && j.id !== job.id).slice(0, 4)

  return (
    <div className="bg-paper">
      <PageHero
        backTo="/careers"
        backLabel="Careers"
        kicker={`${entity?.fullName || ''}${job.client ? ` · ${job.client}` : ''}`}
        title={<>{job.title}<span className="text-azure">.</span></>}
        description={job.location}
      />

      {job.image && (
        <figure className="pt-12 max-w-[1440px] mx-auto px-8 xl:px-16">
          <img
            src={job.image}
            alt={`${job.title}${job.client ? ` — ${job.client}` : ''}`}
            className="w-full h-auto rounded-xl border border-ink/10"
          />
          {job.imageNote && <figcaption className="mt-2 text-concrete text-[11px]">{job.imageNote}</figcaption>}
        </figure>
      )}

      <section className="py-16 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
          {job.note && (
            <div className="mb-12 max-w-2xl border-l-2 border-gold bg-gold-light/60 px-5 py-4 text-ink text-sm leading-relaxed">
              {job.note}
            </div>
          )}

          {job.shifts?.length > 0 && (
            <Section title="Shifts">
              <div className="grid gap-px bg-ink/10 border border-ink/10 rounded-lg overflow-hidden max-w-2xl">
                {job.shifts.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6"
                  >
                    <div className="font-display text-sm text-ink">{s.label}</div>
                    <div className="sm:text-right">
                      <div className="text-ink font-semibold tabular-nums">{s.hours}</div>
                      {s.detail && <div className="text-concrete text-xs mt-0.5">{s.detail}</div>}
                      {s.salary && <div className="text-azure text-xs font-semibold mt-0.5">{s.salary}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {job.scope?.length > 0 && (
            <Section title="Job Scope">
              <BulletList items={job.scope} />
            </Section>
          )}
          {job.requirements?.length > 0 && (
            <Section title="Requirements">
              <BulletList items={job.requirements} />
            </Section>
          )}
          {job.profile?.length > 0 && (
            <Section title="Suitable Candidate Profile">
              <BulletList items={job.profile} />
            </Section>
          )}

          {(job.workLocations?.length > 0 || job.reporting) && (
            <Section title="Where You Will Work">
              <div className="flex flex-col gap-4 max-w-2xl text-ink/85 leading-relaxed">
                {job.workLocations?.length > 0 && (
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-concrete mb-2">Working locations</div>
                    <ul className="flex flex-col gap-1.5">
                      {job.workLocations.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.reporting && (
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-concrete mb-2">Reporting location</div>
                    <div>{job.reporting}</div>
                  </div>
                )}
              </div>
            </Section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 border border-ink/10 rounded-xl bg-white p-7">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 pb-6 mb-6 border-b border-ink/10">
              {job.vacancies && <Fact label="Vacancies">{job.vacancies}</Fact>}
              {job.salary && <Fact label="Salary">{job.salary}</Fact>}
              <Fact label="Type">{job.type}</Fact>
              <Fact label="Location">{job.location.replace(/^Singapore — /, '')}</Fact>
              {job.posted && <Fact label="Posted">{formatPosted(job.posted)}</Fact>}
            </div>

            <div className="font-display text-sm text-ink mb-4">APPLY.</div>
            <div className="flex flex-col gap-3">
              {/* WhatsApp first: it works on any phone, unlike mailto: which needs a configured mail app */}
              {apply.waHref && (
                <a
                  href={apply.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-4 rounded-md hover:brightness-110 transition-all"
                >
                  <SocialIcon name="whatsapp" className="w-4 h-4" />
                  Apply on WhatsApp
                </a>
              )}
              {apply.telHref && (
                <a
                  href={apply.telHref}
                  className="flex items-center justify-center border border-ink/20 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-4 rounded-md hover:border-azure hover:text-azure transition-colors"
                >
                  Call {apply.phone}
                </a>
              )}
              <EmailApply apply={apply} primary={!apply.waHref && !apply.telHref} />
            </div>
            <div className="mt-5 text-concrete text-xs leading-relaxed">
              Send your resume to{' '}
              {apply.emails.map((e, i) => (
                <span key={e}>
                  {i > 0 && ' and '}
                  <span className="text-ink font-semibold select-all">{e}</span>
                </span>
              ))}
              {apply.phone && <>, or call {apply.phone}</>}. Quote the position title.
            </div>
          </div>
        </aside>
      </section>

      {others.length > 0 && (
        <section className="pb-24 max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            More at {entity?.fullName}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.id}
                to={`/careers/${o.id}`}
                className="group flex items-center justify-between gap-4 bg-white border border-ink/10 rounded-xl px-6 py-4 hover:border-azure/40 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-display text-base text-ink group-hover:text-azure transition-colors leading-tight">
                    {o.title}
                  </div>
                  <div className="text-concrete text-xs mt-1">{o.client || o.location}</div>
                </div>
                <span className="text-azure" aria-hidden>→</span>
              </Link>
            ))}
          </div>
          <Link
            to="/careers"
            className="mt-6 inline-block text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
          >
            All openings →
          </Link>
        </section>
      )}
    </div>
  )
}
