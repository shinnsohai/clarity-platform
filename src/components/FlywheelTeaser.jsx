import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FlywheelDiagram from './FlywheelDiagram'

export default function FlywheelTeaser() {
  return (
    <section className="relative bg-paper py-24">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            How It Works
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-6">
            THE INDUSTRIES WE RUN<span className="text-azure"> ARE THE DATA WE RUN ON.</span>
          </h2>
          <p className="text-concrete text-lg leading-relaxed">
            Four subsidiaries run real physical operations. Two turn what they do every day
            into software and decision-grade intelligence — applied back into the next
            deployment.
          </p>
        </motion.div>

        <FlywheelDiagram compact />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
          >
            Read the full breakdown <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
