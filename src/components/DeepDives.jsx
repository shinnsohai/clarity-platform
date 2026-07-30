import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { branches } from '../data/hierarchy'

// Deliberate asymmetric span pattern instead of a uniform grid.
const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-4']

export default function DeepDives() {
  return (
    <section className="relative bg-paper py-28">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Division Deep-Dives
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] mb-16">
          OPERATIONAL SCOPE<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {branches.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`${spans[i]} col-span-1`}
            >
              <Link
                to={`/${b.slug}`}
                className="group relative block h-72 overflow-hidden border border-ink/10"
              >
                <img
                  src={b.image}
                  alt={b.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-2">
                    {b.role}
                  </span>
                  <span className="font-display text-xl md:text-2xl text-paper flex items-center gap-3">
                    {b.name}
                    <span className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
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
