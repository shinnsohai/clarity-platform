import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { partners } from '../data/hierarchy'

// This page describes E&F Recruitment — an independently owned and operated company,
// not a Clarity Group subsidiary. All facts here are sourced from their own site,
// https://enf.sg/. The logo used is their real, provided brand asset.
export default function StrategicPartner() {
  const partner = partners[0]
  if (!partner) return null

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden bg-azure">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full bg-gold/20 blur-3xl" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 xl:px-16 py-28">
          <Link
            to="/our-business"
            className="text-gold text-xs tracking-[0.25em] uppercase mb-8 inline-flex items-center gap-2 w-fit font-semibold hover:brightness-110 transition-all"
          >
            ← Our Business
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="mb-6"
          >
            <img src={partner.logo} alt={`${partner.fullName} logo`} className="h-20 w-20 object-contain drop-shadow-lg" />
          </motion.div>

          <div className="flex items-center gap-4 mb-6 text-white/70 text-xs tracking-[0.3em] uppercase font-semibold">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            {partner.relationship} — External Company
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[9vw] md:text-7xl leading-[0.9] tracking-tightest text-white max-w-[16ch]"
          >
            {partner.name}<span className="text-gold">.</span>
          </motion.h1>

          <p className="mt-6 max-w-xl text-white/80 text-lg leading-relaxed">{partner.tagline}</p>
          <p className="mt-4 max-w-2xl text-white/60 text-sm leading-relaxed">{partner.summary}</p>

          <motion.a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 bg-gold text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-full shadow-soft-lg hover:bg-gold-dim hover:text-white transition-colors duration-300 w-fit"
          >
            Visit {partner.website.replace('https://', '').replace(/\/$/, '')}
            <span aria-hidden>↗</span>
          </motion.a>
        </div>
      </section>

      {/* Real brand lockup — shown on white so the full wordmark reads correctly */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl shadow-soft-lg border border-ink/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <img src={partner.logoFull} alt={partner.fullName} className="h-14 md:h-16 object-contain" />
          <span className="text-concrete text-xs tracking-[0.2em] uppercase font-semibold text-center md:text-right">
            Official brand mark — courtesy of {partner.fullName}
          </span>
        </motion.div>
      </section>

      {/* Relationship disclosure */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="border border-ink/10 bg-pearl rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center justify-between"
        >
          <p className="text-ink text-base md:text-lg leading-relaxed max-w-2xl">
            <strong className="font-display">{partner.fullName}</strong> is an independently owned
            and operated recruitment agency. Clarity Group works with them as a{' '}
            {partner.relationship.toLowerCase()} for talent sourcing — they are not a Clarity
            Group subsidiary. For their official branding, current vacancies, and to apply or hire
            directly, use the link to their site.
          </p>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-azure text-xs font-bold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
          >
            enf.sg ↗
          </a>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-ink/10 rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
        >
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-dim font-bold mb-3">Vision</div>
          <p className="font-display text-xl leading-snug text-ink">{partner.vision}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-ink/10 rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
        >
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-dim font-bold mb-3">Mission</div>
          <p className="text-ink text-base leading-relaxed">{partner.mission}</p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            What They Offer
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-14">
            RECRUITMENT SERVICES<span className="text-azure">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {partner.services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-ink/10 rounded-2xl p-7 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className="font-display text-lg text-ink mb-2">{s.title}</div>
              <p className="text-concrete text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform features — real, from their job-seeker/employer portal */}
      <section className="bg-pearl py-24">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              For Job Seekers
            </div>
            <h3 className="font-display text-2xl text-ink mb-6">ON THEIR PLATFORM</h3>
            <div className="flex flex-col gap-3">
              {partner.platform.jobSeekers.map((f) => (
                <motion.div
                  key={f}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 bg-white border border-ink/10 rounded-xl px-5 py-3.5 shadow-soft"
                >
                  <span className="text-azure font-display text-lg">↗</span>
                  <span className="text-ink text-sm font-medium">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              For Employers
            </div>
            <h3 className="font-display text-2xl text-ink mb-6">ON THEIR PLATFORM</h3>
            <div className="flex flex-col gap-3">
              {partner.platform.employers.map((f) => (
                <motion.div
                  key={f}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 bg-white border border-ink/10 rounded-xl px-5 py-3.5 shadow-soft"
                >
                  <span className="text-azure font-display text-lg">↗</span>
                  <span className="text-ink text-sm font-medium">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries covered */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Job Categories
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-14">
            INDUSTRIES COVERED<span className="text-azure">.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {partner.industries.map((ind, i) => (
            <motion.span
              key={ind}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="bg-white border border-ink/10 rounded-full px-5 py-2.5 text-ink text-sm font-medium shadow-soft cursor-default"
            >
              {ind}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Source countries + strengths */}
      <section className="bg-pearl py-24">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              Sourcing Footprint
            </div>
            <h3 className="font-display text-2xl text-ink mb-6">TALENT SOURCED FROM</h3>
            <div className="flex flex-wrap gap-3">
              {partner.sourceCountries.map((c) => (
                <motion.span
                  key={c}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="bg-white border border-ink/10 rounded-full px-5 py-2.5 text-ink text-sm font-medium shadow-soft cursor-default"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              Why Clients Choose Them
            </div>
            <h3 className="font-display text-2xl text-ink mb-6">STATED STRENGTHS</h3>
            <div className="flex flex-col gap-3">
              {partner.strengths.map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 bg-white border border-ink/10 rounded-xl px-5 py-3.5 shadow-soft"
                >
                  <span className="text-gold font-display text-lg">✓</span>
                  <span className="text-ink text-sm font-medium">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fair Employment Principles */}
      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            TAFEP Alignment
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-14">
            FAIR EMPLOYMENT PRINCIPLES<span className="text-azure">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partner.fairEmployment.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 bg-white border border-ink/10 rounded-xl p-5 shadow-soft"
            >
              <span className="font-display text-azure text-sm shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-ink text-sm leading-relaxed">{f}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-azure py-20">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <img src={partner.logo} alt="" className="h-16 w-16 object-contain shrink-0 hidden sm:block" />
            <div>
              <div className="text-gold text-xs tracking-[0.3em] uppercase font-semibold mb-4">Reach Them Directly</div>
              <div className="flex flex-col gap-2 text-white/90 text-sm leading-relaxed">
                <span>{partner.contact.address}</span>
                <span>{partner.contact.phone}</span>
                <span>{partner.contact.email}</span>
              </div>
            </div>
          </motion.div>
          <motion.a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-full shadow-soft-lg hover:bg-gold hover:text-azure transition-colors duration-300 w-fit"
          >
            Open enf.sg <span aria-hidden>↗</span>
          </motion.a>
        </div>
      </section>
    </div>
  )
}
