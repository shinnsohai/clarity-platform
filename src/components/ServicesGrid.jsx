import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { entities } from '../data/hierarchy'

export default function ServicesGrid() {
  return (
    <section className="relative bg-paper py-24">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Services Provided
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] mb-14">
          SIX SUBSIDIARIES<span className="text-azure">.</span> ONE STANDARD.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {entities.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={`/our-business/${e.slug}`}
                className="group relative flex flex-col h-80 bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.name}
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/0 to-white/0" />
                </div>
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <img src={e.logo} alt="" className="h-8 w-8 object-contain mb-3" />
                    <div className="font-display text-lg text-ink leading-tight mb-1">{e.name}</div>
                    <div className="text-concrete text-xs leading-snug">{e.role}</div>
                  </div>
                  <span className="mt-4 text-azure text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
