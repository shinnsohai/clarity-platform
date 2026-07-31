import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subsidiaries, strategicPartners } from '../data/hierarchy'

function EntityCard({ entity, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Link
        to={`/our-business/${entity.slug}`}
        className="group relative block h-80 overflow-hidden border border-navy/10"
      >
        <img
          src={entity.image}
          alt={entity.name}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-3">
          <img src={entity.logo} alt="" className="h-8 w-8 object-contain" />
          <span className="text-accent text-[10px] tracking-[0.25em] uppercase">
            {entity.kind === 'subsidiary' ? 'Subsidiary' : 'Strategic Partner'}
          </span>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <span className="text-white/60 text-[10px] tracking-[0.25em] uppercase mb-2">
            {entity.role}
          </span>
          <span className="font-display text-2xl text-white flex items-center gap-3">
            {entity.name}
            <span className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
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
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Our Business
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            THE PORTFOLIO<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            Five subsidiaries executing across construction, facilities, technology, and
            manufacturing. One strategic partner running global talent acquisition. Select an
            entity to open its full operational record.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-8 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-navy inline-block" />
          Subsidiaries
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {subsidiaries.map((e, i) => (
            <EntityCard key={e.id} entity={e} index={i} />
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Strategic Partner
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategicPartners.map((e, i) => (
            <EntityCard key={e.id} entity={e} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
