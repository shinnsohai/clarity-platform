import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import data from '../../data/builtsync.json'
import DemoShowcase from './DemoShowcase'

const GRADIENT = 'linear-gradient(135deg, #2F9BFF 0%, #5B5BFF 55%, #8A1CFF 100%)'

const ICONS = {
  pin: <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  pay: <path d="M3 7h18v10H3zM3 11h18M7 15h3" />,
  leave: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4" />,
  cert: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  safety: <path d="M4 17a8 8 0 0 1 16 0zM2 20h20M12 6V3M9 17V9a3 3 0 0 1 6 0v8" />,
  console: <path d="M3 5h18v11H3zM8 21h8M12 16v5M7 12l3-3 3 2 4-4" />,
}

function Icon({ name }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name] || ICONS.console}
    </svg>
  )
}

const appById = Object.fromEntries(data.app.screens.map((s) => [s.id, s]))
const adminById = Object.fromEntries(data.admin.screens.map((s) => [s.id, s]))

export default function BuiltSyncPage({ subpage, entity }) {
  const [jump, setJump] = useState({ screen: undefined, key: 0 })

  const openInDemo = (screenId) => {
    setJump((j) => ({ screen: screenId, key: j.key + 1 }))
    requestAnimationFrame(() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const heroApp = appById['app-checkin'] || data.app.screens[0]
  const heroAdmin = adminById['adm-dashboard'] || data.admin.screens[0]

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden bg-azure-light">
        <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full opacity-25 blur-3xl" style={{ background: GRADIENT }} />
        <div className="relative max-w-[1440px] mx-auto px-8 xl:px-16 pt-14 pb-20 lg:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <Link to={`/our-business/${entity.slug}`} className="text-azure text-xs tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-2 hover:text-gold-dim transition-colors">
              ← {entity.name}
            </Link>
            <div className="mt-8 flex items-center gap-4 md:gap-5">
              <img src={subpage.logo || data.logo} alt={`${data.name} logo`} className="h-14 md:h-20 w-auto shrink-0" />
              <div className="min-w-0">
                <h1 className="font-display text-[2.1rem] sm:text-5xl md:text-7xl leading-[0.9] tracking-tightest text-ink">{data.name}</h1>
                <span className="block mt-2 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#5B5BFF]">{data.kicker}</span>
              </div>
            </div>
            <p className="mt-10 font-display text-2xl md:text-4xl leading-[1.05] text-ink max-w-xl">{data.headline}</p>
            <p className="mt-6 text-azure text-lg leading-relaxed max-w-xl">{data.tagline}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center text-white text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-full shadow-soft-lg hover:brightness-110 transition-all"
                style={{ background: GRADIENT }}
              >
                Explore the live demo ↓
              </a>
              <Link
                to={data.ctaLink || '/contact'}
                className="inline-flex items-center border border-ink/20 bg-white/70 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-full hover:border-azure hover:text-azure transition-colors"
              >
                {data.ctaLabel || 'Contact Lenix'}
              </Link>
            </div>
          </div>

          {/* hero composite: console behind, phone in front */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative hidden md:block h-[520px] lg:h-[560px]">
            <div className="absolute right-0 top-4 w-[88%] rounded-2xl bg-white shadow-soft-lg border border-ink/10 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-pearl border-b border-ink/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <img src={heroAdmin.image} alt={heroAdmin.title} className="block w-full h-[400px] object-cover object-top" />
            </div>
            <div className="absolute left-0 bottom-0 w-[230px] lg:w-[250px] rounded-[40px] bg-[#0f1226] p-[9px] shadow-soft-lg ring-1 ring-black/10 bs-float">
              <div className="rounded-[31px] overflow-hidden bg-white" style={{ aspectRatio: '390 / 844' }}>
                <img src={heroApp.image} alt={heroApp.title} className="block w-full h-full object-cover object-top" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro + pillars */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          What it does
        </div>
        <p className="font-display text-2xl md:text-4xl text-ink leading-[1.1] max-w-4xl mb-6">
          One platform from the first check-in to the last payslip<span className="text-azure">.</span>
        </p>
        <p className="text-concrete text-lg leading-relaxed max-w-3xl mb-14">{data.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow p-7"
            >
              <div className="w-12 h-12 rounded-xl text-white flex items-center justify-center mb-5" style={{ background: GRADIENT }}>
                <Icon name={p.icon} />
              </div>
              <h3 className="font-display text-lg text-ink leading-tight mb-3">{p.title}</h3>
              <p className="text-concrete text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive demo */}
      <section className="py-24 bg-pearl">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Interactive demo
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-12">
            SEE IT WORK<span className="text-azure">.</span>
          </h2>
          <DemoShowcase data={data} initialScreen={jump.screen} focusKey={jump.key} />
        </div>
      </section>

      {/* From check-in to payslip */}
      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          How it fits together
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-12">
          FROM CHECK-IN TO PAYSLIP<span className="text-azure">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.flow.map((f, i) => (
            <div key={f.title} className="relative bg-white border border-ink/10 rounded-2xl shadow-soft p-7">
              <span className="font-mono text-xs text-[#5B5BFF] font-bold">0{i + 1}</span>
              <h3 className="font-display text-xl text-ink mt-2 mb-3">{f.title}</h3>
              <p className="text-concrete text-sm leading-relaxed mb-6">{f.text}</p>
              <div className="flex flex-wrap gap-2">
                {f.app && (
                  <button type="button" onClick={() => openInDemo(f.app)} className="text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2.5 rounded-full border border-ink/15 text-ink hover:border-[#5B5BFF] hover:text-[#5B5BFF] transition-colors">
                    See it in the app
                  </button>
                )}
                {f.admin && (
                  <button type="button" onClick={() => openInDemo(f.admin)} className="text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2.5 rounded-full border border-ink/15 text-ink hover:border-[#5B5BFF] hover:text-[#5B5BFF] transition-colors">
                    See it in the console
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row md:items-center justify-between gap-8" style={{ background: GRADIENT }}>
          <div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">{data.ctaHeading}</h2>
            <p className="mt-3 text-white/85 text-lg max-w-xl">{data.ctaText}</p>
          </div>
          <Link to={data.ctaLink || '/contact'} className="shrink-0 inline-flex items-center bg-white text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-full shadow-soft-lg hover:brightness-95 transition-all">
            {data.ctaLabel || 'Contact Lenix'} →
          </Link>
        </div>
      </section>
    </div>
  )
}
