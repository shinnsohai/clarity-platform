import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import testimonials from '../data/testimonials.json'

// CMS-driven quote carousel. Renders nothing until real testimonials are added via
// /admin — we never fabricate quotes on behalf of real people or clients.
export default function TestimonialCarousel() {
  const items = testimonials.items
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [items.length])

  if (!items.length) return null

  const t = items[index]

  return (
    <section className="relative bg-azure py-24 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-gold/10" />

      <div className="relative max-w-[900px] mx-auto px-8 xl:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-10 text-gold text-xs tracking-[0.3em] uppercase"
        >
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          What Our Clients Say
        </motion.div>

        <div className="min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-2xl md:text-3xl text-white leading-snug mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-white/70 text-sm">
                <span className="font-semibold text-white">{t.name}</span>
                {t.role && <span> — {t.role}</span>}
                {t.company && <span>, {t.company}</span>}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-10 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
