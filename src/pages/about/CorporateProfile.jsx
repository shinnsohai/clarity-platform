import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../../data/corporateProfile.json'

export default function CorporateProfile() {
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
            CORPORATE PROFILE<span className="text-azure">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">{profile.intro}</p>
        </motion.div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Accreditations &amp; Licensing
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {profile.accreditations.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-8"
            >
              <div className="w-14 h-14 rounded-full bg-azure-light text-azure flex items-center justify-center font-display text-sm mb-5">
                {a.code.split(' ')[0].slice(0, 4)}
              </div>
              <div className="font-display text-lg text-ink mb-1">{a.code}</div>
              <div className="text-azure text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                {a.name}
              </div>
              <p className="text-concrete text-sm leading-relaxed">{a.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="border-t-2 border-azure pt-8 mb-20 max-w-3xl"
        >
          <span className="text-concrete text-[10px] tracking-[0.25em] uppercase">
            Recruitment Licensing
          </span>
          <p className="mt-4 text-ink text-lg leading-relaxed">{profile.recruitmentLicense}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              Overseas Recruitment
            </div>
            {profile.galleries.overseas.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden shadow-soft h-80 relative group"
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
          <div>
            <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-gold rounded-full inline-block" />
              In-House Recruitment
            </div>
            {profile.galleries.inhouse.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden shadow-soft h-80 relative group"
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
        </div>
      </section>
    </div>
  )
}
