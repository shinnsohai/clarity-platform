import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../data/corporateProfile.json'

// Deliberately plain: a horizontal strip of the same real accreditation logos used
// on Corporate Profile, surfaced early as a trust signal. No glow, no animation
// beyond a simple fade-in — credentials should read as fact, not decoration.
export default function CertificationsStrip() {
  return (
    <section className="relative bg-pearl py-14 border-y border-ink/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-14">
        <span className="text-concrete text-xs tracking-[0.25em] uppercase whitespace-nowrap">
          Certified &amp; Audited
        </span>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 flex-1 justify-center md:justify-start">
          {profile.accreditations.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              {a.logo ? (
                <img src={a.logo} alt={a.code} className="h-8 w-auto object-contain" />
              ) : (
                <span className="font-display text-sm text-ink">{a.code}</span>
              )}
              <span className="text-ink text-sm font-medium">{a.code}</span>
            </motion.div>
          ))}
        </div>
        <Link
          to="/about/corporate-profile"
          className="text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors whitespace-nowrap"
        >
          View Credentials →
        </Link>
      </div>
    </section>
  )
}
