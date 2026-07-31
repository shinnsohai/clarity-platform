import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import info from '../../data/corporateInformation.json'

export default function CorporateInformation() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <Link to="/about" className="text-azure text-xs tracking-[0.25em] uppercase mb-6 inline-block">
            ← About
          </Link>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-3xl">
            CORPORATE INFORMATION<span className="text-azure">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">{info.intro}</p>
        </div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <p className="max-w-3xl text-ink text-lg leading-relaxed mb-16">{info.history}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {info.siteImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden shadow-soft h-72 relative group"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-xs tracking-[0.15em] uppercase">
                {img.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
