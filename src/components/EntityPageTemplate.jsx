import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { parent, entities } from '../data/hierarchy'
import SubIcon from './icons/SubIcon'

function galleryFor(entity) {
  const others = entities.filter((e) => e.id !== entity.id)
  const items = [
    { src: entity.image, label: `${entity.name} — Operational Floor`, tag: 'Operations', tall: true },
    { src: parent.image, label: 'CEC Command Center', tag: 'Corporate', tall: false },
    { src: others[0]?.image, label: `${others[0]?.name} — Cross-Portfolio Site`, tag: 'Portfolio', tall: false },
    { src: others[1]?.image, label: `${others[1]?.name} — Cross-Portfolio Site`, tag: 'Portfolio', tall: true },
  ].filter((g) => g.src)
  return items
}

function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-8">
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_22s_linear_infinite] w-max">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="font-display text-3xl md:text-4xl text-accent">{t.value}</span>
            <span className="text-white/50 text-xs tracking-[0.2em] uppercase">{t.label}</span>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full ml-8" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetencyCard({ sub, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative h-64 border border-navy/15 overflow-hidden bg-[#F4F5F7]"
    >
      <div className="absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-full">
        <SubIcon name={sub.icon} className="w-10 h-10 text-accent-dim" />
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-concrete mb-2">
            Core Competency {String(index + 1).padStart(2, '0')}
          </div>
          <div className="font-display text-lg leading-tight text-navy">{sub.name}</div>
        </div>
      </div>

      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-navy p-6 flex flex-col justify-center">
        <p className="font-display text-sm md:text-base leading-snug text-white uppercase">
          {sub.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function EntityPageTemplate({ entity }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const gallery = useMemo(() => galleryFor(entity), [entity])
  const tags = useMemo(() => ['All', ...new Set(gallery.map((g) => g.tag))], [gallery])
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? gallery : gallery.filter((g) => g.tag === filter)

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-screen min-h-[720px] overflow-hidden">
        <motion.img
          style={{ y: parallaxY }}
          src={entity.image}
          alt={entity.name}
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-20">
          <Link
            to="/our-business"
            className="text-accent text-xs tracking-[0.25em] uppercase mb-8 inline-flex items-center gap-2 w-fit"
          >
            ← CEC Business Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <img src={entity.logo} alt="" className="h-10 w-10 object-contain" />
            <span className="text-white/70 text-xs tracking-[0.3em] uppercase">
              {entity.kind === 'subsidiary' ? 'CEC Subsidiary' : 'CEC Strategic Partner'} —{' '}
              {entity.role}
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[9vw] leading-[0.86] tracking-tightest text-white max-w-[18ch]"
          >
            {entity.name}
          </motion.h1>
          <p className="mt-8 max-w-xl text-white/80 text-lg leading-relaxed">{entity.summary}</p>
        </div>
      </section>

      {/* Sub-Division Grid */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Core Competencies
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-navy leading-[0.95] mb-14">
          OPERATING DESK<span className="text-accent">.</span>
        </h2>

        {entity.subDivisions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {entity.subDivisions.map((s, i) => (
              <CompetencyCard key={s.id} sub={s} index={i} />
            ))}
          </div>
        ) : (
          <div className="border-2 border-accent p-10 max-w-2xl bg-[#F4F5F7]">
            <p className="font-display text-xl md:text-2xl text-navy leading-snug">
              {entity.summary}
            </p>
          </div>
        )}
      </section>

      {/* Key Performance Telemetry */}
      <Marquee items={entity.telemetry} />

      {/* Case Studies & Gallery */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-accent inline-block" />
              Field Record
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-navy leading-[0.95]">
              CASE STUDIES &amp; GALLERY<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                  filter === t
                    ? 'bg-navy text-white border-navy'
                    : 'border-navy/20 text-navy hover:border-navy'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
          {filtered.map((g, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden md:col-span-2 ${
                g.tall ? 'md:row-span-2' : 'md:row-span-1'
              }`}
            >
              <img
                src={g.src}
                alt={g.label}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-white text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Uplink Navigation */}
      <Link
        to="/our-business"
        className="fixed bottom-6 right-6 z-40 bg-accent text-navy text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-4 shadow-2xl hover:brightness-110 transition-all"
      >
        [ Return to CEC Business Hub ]
      </Link>
    </div>
  )
}
