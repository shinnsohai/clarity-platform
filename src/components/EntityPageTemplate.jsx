import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { entities } from '../data/hierarchy'
import SubIcon from './icons/SubIcon'
import ManpowerRequestForm from './ManpowerRequestForm'
import AppLinksPanel from './AppLinksPanel'

function galleryFor(entity) {
  const others = entities.filter((e) => e.id !== entity.id)
  return [
    { src: entity.image, label: `${entity.name} — Operational Floor`, tag: 'Operations', tall: true },
    { src: others[0]?.image, label: `${others[0]?.name} — Portfolio Site`, tag: 'Portfolio', tall: false },
    { src: others[1]?.image, label: `${others[1]?.name} — Portfolio Site`, tag: 'Portfolio', tall: false },
    { src: others[2]?.image, label: `${others[2]?.name} — Portfolio Site`, tag: 'Portfolio', tall: true },
  ].filter((g) => g.src)
}

function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-pearl py-8">
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_22s_linear_infinite] w-max">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="font-display text-3xl md:text-4xl text-azure">{t.value}</span>
            <span className="text-concrete text-xs tracking-[0.2em] uppercase">{t.label}</span>
            <span className="w-1.5 h-1.5 bg-ink/20 rounded-full ml-8" />
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
      whileHover={{ y: -6 }}
      className="group relative h-64 rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-full">
        <SubIcon name={sub.icon} className="w-10 h-10 text-azure" />
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-concrete mb-2">
            Core Competency {String(index + 1).padStart(2, '0')}
          </div>
          <div className="font-display text-lg leading-tight text-ink">{sub.name}</div>
        </div>
      </div>

      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-azure p-6 flex flex-col justify-center">
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
    <div className="bg-paper">
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-screen min-h-[720px] overflow-hidden">
        <motion.img
          style={{ y: parallaxY }}
          src={entity.image}
          alt={entity.name}
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/0" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-20">
          <Link
            to="/our-business"
            className="text-azure text-xs tracking-[0.25em] uppercase mb-8 inline-flex items-center gap-2 w-fit font-semibold hover:text-gold-dim transition-colors"
          >
            ← Our Business
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <motion.img
              src={entity.logo}
              alt=""
              whileHover={{ scale: 1.1, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="h-10 w-10 object-contain"
            />
            <span className="text-concrete text-xs tracking-[0.3em] uppercase font-semibold">
              Clarity E&C Subsidiary — {entity.role}
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[9vw] leading-[0.86] tracking-tightest text-ink max-w-[18ch]"
          >
            {entity.name}
          </motion.h1>
          <p className="mt-8 max-w-xl text-concrete text-lg leading-relaxed">{entity.summary}</p>
        </div>
      </section>

      {/* Sub-Division Grid */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Core Competencies
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-14">
          OPERATING DESK<span className="text-azure">.</span>
        </h2>

        {entity.subDivisions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {entity.subDivisions.map((s, i) => (
              <CompetencyCard key={s.id} sub={s} index={i} />
            ))}
          </div>
        ) : (
          <div className="border-2 border-azure rounded-2xl p-10 max-w-2xl bg-white shadow-soft">
            <p className="font-display text-xl md:text-2xl text-ink leading-snug">{entity.summary}</p>
          </div>
        )}
      </section>

      {/* Key Performance Telemetry */}
      <Marquee items={entity.telemetry} />

      {/* Entity-specific feature blocks */}
      {entity.manpowerFormEnabled && <ManpowerRequestForm entity={entity} />}
      {entity.slug === 'lenix' && <AppLinksPanel entity={entity} />}

      {/* Case Studies & Gallery */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              Field Record
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95]">
              CASE STUDIES &amp; GALLERY<span className="text-azure">.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {tags.map((t) => (
              <motion.button
                key={t}
                onClick={() => setFilter(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  filter === t
                    ? 'bg-azure text-white border-azure'
                    : 'border-ink/15 text-ink hover:border-azure'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:auto-rows-[180px]">
          {filtered.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl shadow-soft md:col-span-2 ${
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Uplink Navigation */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40"
      >
      <Link
        to="/our-business"
        className="bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-4 rounded-full shadow-soft-lg hover:brightness-110 transition-all inline-block"
      >
        ← Our Business
      </Link>
      </motion.div>
    </div>
  )
}
