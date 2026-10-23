import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Generic subsidiary subpage, driven entirely by the CMS (Subsidiary Subpages → src/data/subpages.json):
// title, tagline, logo, hero image, intro, any number of sections (heading, text, bullets, image) and a CTA.
export default function StandardSubpage({ subpage, entity }) {
  const sections = subpage.sections || []
  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-azure-light">
        {subpage.heroImage && (
          <>
            <img src={subpage.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20" />
          </>
        )}
        <div className="relative max-w-[1440px] mx-auto px-8 xl:px-16 pt-14 pb-20">
          <Link to={`/our-business/${entity.slug}`} className="text-azure text-xs tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-2 hover:text-gold-dim transition-colors">
            ← {entity.name}
          </Link>
          <div className="mt-8 flex items-center gap-5">
            {subpage.logo && <img src={subpage.logo} alt={`${subpage.title} logo`} className="h-16 md:h-20 w-auto" />}
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tightest text-ink">{subpage.title}</h1>
          </div>
          {subpage.tagline && <p className="mt-8 font-display text-xl md:text-3xl text-azure leading-tight max-w-2xl">{subpage.tagline}</p>}
          {subpage.intro && <p className="mt-6 max-w-2xl text-azure text-lg leading-relaxed">{subpage.intro}</p>}
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={i} className={`py-20 ${i % 2 ? 'bg-pearl' : ''}`}>
          <div className={`max-w-[1440px] mx-auto px-8 xl:px-16 grid gap-12 items-center ${s.image ? 'lg:grid-cols-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className={s.image && i % 2 ? 'lg:order-2' : ''}
            >
              {s.heading && (
                <h2 className="font-display text-2xl md:text-4xl text-ink leading-[1] mb-5">
                  {s.heading}
                  <span className="text-azure">.</span>
                </h2>
              )}
              {s.body && <p className="text-azure text-lg leading-relaxed whitespace-pre-line max-w-2xl">{s.body}</p>}
              {s.bullets?.length > 0 && (
                <ul className="mt-6 space-y-3 max-w-2xl">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-ink leading-relaxed">
                      <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
            {s.image && <img src={s.image} alt={s.heading || subpage.title} className="w-full rounded-2xl shadow-soft-lg object-cover" loading="lazy" />}
          </div>
        </section>
      ))}

      {subpage.ctaLabel && (
        <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
          <Link
            to={subpage.ctaLink || '/contact'}
            className="inline-flex items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-full shadow-soft hover:brightness-110 transition-all"
          >
            {subpage.ctaLabel} →
          </Link>
        </section>
      )}
    </div>
  )
}
