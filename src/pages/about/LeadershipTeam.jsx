import { motion } from 'framer-motion'
import team from '../../data/leadershipTeam.json'
import LeadershipAvatar from '../../components/icons/LeadershipAvatar'
import PageHero from '../../components/PageHero'

export default function LeadershipTeam() {
  return (
    <div className="bg-paper">
      <PageHero
        backTo="/about"
        backLabel="About"
        kicker="Leadership Team"
        title={<>LEADERSHIP TEAM<span className="text-azure">.</span></>}
        description={team.intro}
      />

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
