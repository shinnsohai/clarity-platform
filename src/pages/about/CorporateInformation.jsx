import { motion } from 'framer-motion'
import info from '../../data/corporateInformation.json'
import PageHero from '../../components/PageHero'

export default function CorporateInformation() {
  return (
    <div className="bg-paper">
      <PageHero
        backTo="/about"
        backLabel="About"
        kicker="Corporate Information"
        title={<>CORPORATE INFORMATION<span className="text-azure">.</span></>}
        description={info.intro}
      />

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl text-ink text-lg leading-relaxed mb-16"
        >
          {info.history}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {info.siteImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
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
