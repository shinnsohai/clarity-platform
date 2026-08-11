import { motion } from 'framer-motion'
import clients from '../data/clients.json'

// Real client/served-company logos (src/data/clients.json — CMS-managed under the
// "Client Logos" collection). Grayscale by default, full color + slight lift on hover,
// continuous loop that pauses on hover, edges fade to transparent.
export default function ClientCarousel() {
  const doubled = [...clients.logos, ...clients.logos]

  return (
    <section className="relative bg-paper py-16 border-t border-ink/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1440px] mx-auto px-8 xl:px-16 mb-8"
      >
        <div className="flex items-center gap-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Companies We Serve
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1440px] mx-auto px-8 xl:px-16"
      >
        <div className="group relative h-32 overflow-hidden rounded-2xl bg-white shadow-soft">
          {/* edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

          <div className="flex items-center h-full gap-2 w-max animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
            {doubled.map((c, i) => (
              <div key={`${c.id}-${i}`} className="flex items-center justify-center h-32 w-48 shrink-0 px-5">
                <img
                  src={c.src}
                  alt={c.name}
                  title={c.name}
                  className="max-h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
