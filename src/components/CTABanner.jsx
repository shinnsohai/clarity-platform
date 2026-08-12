import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ctaBanner } from '../data/hierarchy'

export default function CTABanner() {
  return (
    <section className="relative bg-azure py-28 overflow-hidden">
      {/* animated background sweep */}
      <motion.div
        aria-hidden
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[140%] -translate-x-1/2 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #F29C21 0, #F29C21 2px, transparent 2px, transparent 42px)',
        }}
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-gold blur-3xl"
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
        <motion.div className="mt-10 inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to={ctaBanner.buttonLink}
            className="inline-flex items-center gap-3 bg-gold text-azure-dim font-display text-lg px-10 py-5 rounded-full shadow-soft-lg hover:brightness-110 transition-all"
          >
            {ctaBanner.buttonLabel}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
