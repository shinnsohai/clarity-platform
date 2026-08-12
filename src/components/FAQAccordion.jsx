import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import faq from '../data/faq.json'

export default function FAQAccordion() {
  const [open, setOpen] = useState(faq.items[0]?.id ?? null)

  return (
    <section className="relative bg-pearl py-24">
      <div className="max-w-[1000px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            FAQ
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95]">
            FREQUENTLY ASKED<span className="text-azure">.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === item.id
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base md:text-lg text-ink leading-snug">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-7 h-7 shrink-0 rounded-full bg-azure-light flex items-center justify-center"
                  >
                    <span className="absolute w-3 h-[2px] bg-azure rounded-full" />
                    <span className="absolute w-[2px] h-3 bg-azure rounded-full" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-concrete text-sm leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
