import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import mv from '../../data/missionVision.json'
import PageHero from '../../components/PageHero'

export default function MissionVision() {
  return (
    <div className="bg-paper">
      <PageHero
        backTo="/about"
        backLabel="About"
        kicker="Mission & Vision"
        title={<>MISSION &amp; VISION<span className="text-azure">.</span></>}
      />

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

      <section className="max-w-[1440px] mx-auto px-8 xl:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-ink/10 rounded-2xl shadow-soft p-8 md:p-10 max-w-4xl"
        >
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">How This Actually Works</span>
          <p className="mt-4 text-ink text-lg md:text-xl leading-relaxed">{mv.thesis}</p>
          <Link
            to="/how-it-works"
            className="mt-6 inline-flex items-center gap-2 text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
          >
            See the full flywheel <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>

      <section className="pb-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
