import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import founders from '../../data/founders.json'
import LeadershipAvatar from '../../components/icons/LeadershipAvatar'

function InfoSection({ title, items, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4 mb-5 text-concrete text-xs tracking-[0.3em] uppercase">
        <span className="w-2 h-2 bg-gold rounded-full inline-block" />
        {title}
      </div>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.06 }}
              whileHover={{ x: 4 }}
              className="text-ink text-base leading-relaxed pl-4 border-l-2 border-azure"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-concrete text-sm italic pl-4 border-l-2 border-ink/10">
          Content pending — to be updated via the CMS.
        </p>
      )}
    </motion.div>
  )
}

export default function FounderDetail() {
  const { slug } = useParams()
  const person = founders.people.find((p) => p.slug === slug)

  if (!person) return <Navigate to="/about/founder-advisor" replace />

  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <Link
            to="/about/founder-advisor"
            className="text-azure text-xs tracking-[0.25em] uppercase mb-8 inline-block hover:text-gold-dim transition-colors"
          >
            ← Founders &amp; Advisors
          </Link>
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-24 h-24 rounded-full bg-azure-light text-azure flex items-center justify-center shrink-0"
            >
              <LeadershipAvatar seed={person.seed} className="w-12 h-16" />
            </motion.div>
            <div>
              <div className="text-azure text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                {person.role}
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95]">
                {person.name}
              </h1>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-3 gap-14">
        <InfoSection title="Qualifications" items={person.qualifications} index={0} />
        <InfoSection title="Licenses" items={person.licenses} index={1} />
        <InfoSection title="Experience" items={person.experience} index={2} />
      </section>
    </div>
  )
}
