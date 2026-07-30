import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { assets } from '../data/hierarchy'
import SubIcon from './icons/SubIcon'

function galleryFor(branch) {
  return [
    { src: branch.image, label: `${branch.name} — Operational Floor`, tall: true },
    { src: assets.wireframeCutout, label: 'Group Structural Blueprint', tall: false },
    { src: assets.master, label: 'Command Center Interface', tall: false },
    { src: assets.explosionCutout, label: 'Site Systems Cutaway', tall: true },
  ]
}

function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-8">
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_22s_linear_infinite] w-max">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="font-display text-3xl md:text-4xl text-[var(--brand-accent)]">
              {t.value}
            </span>
            <span className="text-concrete text-xs tracking-[0.2em] uppercase">{t.label}</span>
            <span className="w-1.5 h-1.5 bg-concrete/40 rounded-full ml-8" />
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
      className="group relative h-64 border border-[var(--brand-muted)]/30 overflow-hidden bg-[var(--brand-surface)]"
    >
      <div className="absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-full">
        <SubIcon name={sub.icon} className="w-10 h-10 text-[var(--brand-accent)]" />
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--brand-muted)] mb-2">
            Core Competency {String(index + 1).padStart(2, '0')}
          </div>
          <div className="font-display text-lg leading-tight text-[var(--brand-text)]">
            {sub.name}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[var(--brand-primary)] p-6 flex flex-col justify-center">
        <p className="font-display text-sm md:text-base leading-snug text-white uppercase">
          {sub.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function BranchPageTemplate({ branch }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const gallery = galleryFor(branch)

  return (
    <div data-theme={branch.theme} className="bg-[var(--brand-bg)]">
      {/* 1. Subpage Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[720px] overflow-hidden">
        <motion.img
          style={{ y: parallaxY }}
          src={branch.image}
          alt={branch.name}
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-primary)] via-[var(--brand-primary)]/40 to-[var(--brand-primary)]/10" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-20">
          <Link
            to="/"
            className="text-[var(--brand-accent)] text-xs tracking-[0.25em] uppercase mb-8 inline-flex items-center gap-2 w-fit"
          >
            ← Clarity E&amp;C Group
          </Link>
          <span className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4">
            {branch.role}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[9vw] leading-[0.86] tracking-tightest text-white max-w-[18ch]"
          >
            {branch.name}
          </motion.h1>
          <p className="mt-8 max-w-xl text-white/80 text-lg leading-relaxed">{branch.summary}</p>
        </div>
      </section>

      {/* 2. Core Competencies */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-[var(--brand-muted)] text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-[var(--brand-accent)] inline-block" />
          Core Competencies
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-[var(--brand-text)] leading-[0.95] mb-14">
          OPERATING DESK<span className="text-[var(--brand-accent)]">.</span>
        </h2>

        {branch.subDivisions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {branch.subDivisions.map((s, i) => (
              <CompetencyCard key={s.id} sub={s} index={i} />
            ))}
          </div>
        ) : (
          <div className="border border-[var(--brand-accent)] p-10 max-w-2xl">
            <p className="font-display text-xl md:text-2xl text-[var(--brand-text)] leading-snug">
              {branch.summary}
            </p>
          </div>
        )}
      </section>

      {/* 3. Operational Telemetry */}
      <Marquee items={branch.telemetry} />

      {/* 4. Project / Case Study Gallery */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-[var(--brand-muted)] text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-[var(--brand-accent)] inline-block" />
          Field Record
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-[var(--brand-text)] leading-[0.95] mb-14">
          PROJECT GALLERY<span className="text-[var(--brand-accent)]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
          {gallery.map((g, i) => (
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

      {/* 5. Return Navigation */}
      <Link
        to="/"
        className="fixed bottom-6 right-6 z-40 bg-[var(--brand-accent)] text-[var(--brand-primary)] text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-4 shadow-2xl hover:brightness-110 transition-all"
      >
        [ Initiate Uplink: Return to Clarity Group Hub ]
      </Link>

      <footer className="bg-[var(--brand-primary)] py-10">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 flex justify-between items-center text-white/60 text-xs tracking-wide">
          <span>{branch.fullName}</span>
          <Link to="/" className="hover:text-white transition-colors">
            ← Return to Clarity Group Hub
          </Link>
        </div>
      </footer>
    </div>
  )
}
