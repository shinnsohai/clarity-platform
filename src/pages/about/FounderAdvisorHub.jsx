import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import founders from '../../data/founders.json'
import LeadershipAvatar from '../../components/icons/LeadershipAvatar'

export default function FounderAdvisorHub() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <Link to="/about" className="text-azure text-xs tracking-[0.25em] uppercase mb-6 inline-block hover:text-gold-dim transition-colors">
            ← About
          </Link>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-3xl">
            FOUNDERS &amp; ADVISORS<span className="text-azure">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">
            The people who built Clarity Group, and the advisors who guide it.
          </p>
        </motion.div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {founders.people.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={`/about/founder-advisor/${p.slug}`}
                className="group block bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center h-full"
              >
                <div className="w-24 h-24 rounded-full bg-azure-light text-azure flex items-center justify-center mb-5">
                  <LeadershipAvatar seed={p.seed} className="w-12 h-16" />
                </div>
                <div className="font-display text-lg text-ink leading-tight mb-1">{p.name}</div>
                <div className="text-azure text-xs font-semibold tracking-[0.15em] uppercase mb-4">
                  {p.role}
                </div>
                <span className="mt-auto text-ink/60 text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 group-hover:text-azure transition-colors">
                  Full Profile
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
