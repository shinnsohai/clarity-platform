import { motion } from 'framer-motion'
import about from '../data/about.json'
import { parent } from '../data/hierarchy'
import LeadershipAvatar from '../components/icons/LeadershipAvatar'

const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3']

function LeadershipCard({ person, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`${spans[index % spans.length]} col-span-1 group relative h-72 border border-navy/10 overflow-hidden bg-[#F4F5F7]`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-navy/70 grayscale group-hover:grayscale-0 group-hover:text-accent-dim transition-all duration-500">
        <LeadershipAvatar seed={person.seed} className="w-24 h-32" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-accent text-[10px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {person.category}
        </span>
        <div className="font-display text-lg text-navy group-hover:text-white leading-tight transition-colors duration-300">
          {person.title}
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="bg-white">
      <section className="relative bg-ink py-32">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            About {parent.name}
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            OPERATIONAL DISCIPLINE<span className="text-accent">.</span> AT SCALE.
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">{about.profile}</p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-t-2 border-accent pt-6">
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">Mission</span>
          <p className="mt-4 font-display text-2xl md:text-3xl text-navy leading-snug">
            {about.mission}
          </p>
        </div>
        <div className="border-t-2 border-navy pt-6">
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">Vision</span>
          <p className="mt-4 font-display text-2xl md:text-3xl text-navy leading-snug">
            {about.vision}
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Leadership &amp; Governance
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-navy leading-[0.95] mb-14">
            THE BOARD<span className="text-accent">.</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {about.leadership.map((p, i) => (
              <LeadershipCard key={p.id} person={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
