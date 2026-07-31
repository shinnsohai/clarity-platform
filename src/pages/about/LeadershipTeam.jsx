import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import team from '../../data/leadershipTeam.json'
import LeadershipAvatar from '../../components/icons/LeadershipAvatar'

export default function LeadershipTeam() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <Link to="/about" className="text-azure text-xs tracking-[0.25em] uppercase mb-6 inline-block">
            ← About
          </Link>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-3xl">
            LEADERSHIP TEAM<span className="text-azure">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">{team.intro}</p>
        </div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-azure-light text-azure flex items-center justify-center mb-5">
                <LeadershipAvatar seed={m.seed} className="w-12 h-16" />
              </div>
              <div className="font-display text-lg text-ink leading-tight mb-1">{m.name}</div>
              <div className="text-azure text-xs font-semibold tracking-[0.15em] uppercase">
                {m.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
