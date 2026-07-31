import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { entities } from '../data/hierarchy'

function EntityCard({ entity, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/our-business/${entity.slug}`}
        className="group relative block h-80 overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
      >
        <img
          src={entity.image}
          alt={entity.name}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-3">
          <img src={entity.logo} alt="" className="h-9 w-9 object-contain bg-white rounded-full p-1.5" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase mb-2">
            {entity.role}
          </span>
          <span className="font-display text-2xl text-white flex items-center gap-3">
            {entity.name}
            <span className="text-azure opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function OurBusiness() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-azure rounded-full inline-block" />
            Our Business
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-[0.9] max-w-4xl">
            THE PORTFOLIO<span className="text-azure">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-concrete text-lg leading-relaxed">
            Five subsidiaries executing across construction, technology, facilities, and
            manufacturing. Select a subsidiary to open its full operational record.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {entities.map((e, i) => (
            <EntityCard key={e.id} entity={e} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
