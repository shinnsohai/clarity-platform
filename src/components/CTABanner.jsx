import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ctaBanner } from '../data/hierarchy'

export default function CTABanner() {
  return (
    <section className="relative bg-azure py-28 overflow-hidden">
      {/* Static architectural grid texture — no motion, no glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1100px] mx-auto px-8 xl:px-16 text-center"
      >
        <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] max-w-3xl mx-auto">
          {ctaBanner.heading}
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-white/70 text-lg leading-relaxed">
          {ctaBanner.subtext}
        </p>
        <div className="mt-10 inline-block">
          <Link
            to={ctaBanner.buttonLink}
            className="inline-flex items-center gap-3 bg-gold text-azure-dim font-display text-lg px-10 py-5 rounded-md hover:brightness-110 transition-all"
          >
            {ctaBanner.buttonLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
