import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import mv from '../../data/missionVision.json'

export default function MissionVision() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <Link to="/about" className="text-azure text-xs tracking-[0.25em] uppercase mb-6 inline-block hover:text-gold-dim transition-colors">
            ← About
          </Link>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-3xl">
            MISSION &amp; VISION<span className="text-azure">.</span>
          </h1>
        </motion.div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="border-t-2 border-azure pt-6"
        >
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">Mission</span>
          <p className="mt-4 font-display text-2xl md:text-3xl text-ink leading-snug">{mv.mission}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="border-t-2 border-ink pt-6"
        >
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">Vision</span>
          <p className="mt-4 font-display text-2xl md:text-3xl text-ink leading-snug">{mv.vision}</p>
        </motion.div>
      </section>

      <section className="pb-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mv.values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-8"
            >
              <div className="font-display text-lg text-ink mb-3">{v.title}</div>
              <p className="text-concrete text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
