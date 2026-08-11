import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { parent } from '../../data/hierarchy'

const sections = [
  {
    to: '/about/corporate-information',
    title: 'Corporate Information',
    desc: 'Company history and physical site photography.',
  },
  {
    to: '/about/corporate-profile',
    title: 'Corporate Profile',
    desc: 'Accreditations, recruitment licenses, and operations galleries.',
  },
  {
    to: '/about/leadership-team',
    title: 'Leadership Team',
    desc: 'The managers running day-to-day operations.',
  },
  {
    to: '/about/founder-advisor',
    title: 'Founders & Advisors',
    desc: 'The people who built and guide Clarity Group.',
  },
  {
    to: '/about/mission-vision',
    title: 'Mission & Vision',
    desc: 'What we stand for, in plain terms.',
  },
]

export default function AboutHub() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            About {parent.name}
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-[0.9] max-w-4xl">
            TRANSPARENCY<span className="text-azure">.</span> BY DESIGN.
          </h1>
        </motion.div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={s.to}
                className="group block h-56 bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="font-display text-xl text-ink leading-tight mb-2">{s.title}</div>
                  <p className="text-concrete text-sm leading-relaxed">{s.desc}</p>
                </div>
                <span className="text-azure text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2">
                  View
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
