import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { parent } from '../../data/hierarchy'
import PageHero from '../../components/PageHero'

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
      <PageHero
        size="lg"
        kicker={`About ${parent.name}`}
        title={<>TRANSPARENCY<span className="text-azure">.</span> BY DESIGN.</>}
      />

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
