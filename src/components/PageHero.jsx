import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Shared hero for every secondary page (About, Careers, Contact, How It Works,
// Investor Relations, etc). Two modes:
//  - No `video` prop (default, today): an ambient animated backdrop — a slowly
//    drifting dot-grid plus soft pulsing gold/azure glow orbs — reusing the same
//    motifs already established on StrategicPartner and CTABanner, so the page
//    feels alive even before a real video asset exists.
//  - `video` prop set: a looping muted background video with a white scrim for
//    text legibility, replacing the ambient backdrop entirely.
export default function PageHero({
  kicker,
  title,
  description,
  backTo,
  backLabel,
  video,
  poster,
  size = 'md',
}) {
  const padding = size === 'lg' ? 'py-28' : 'py-24'
  const titleClass =
    size === 'lg'
      ? 'font-display text-5xl md:text-7xl text-ink leading-[0.9] max-w-4xl'
      : 'font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-4xl'

  return (
    <section className={`relative overflow-hidden bg-pearl ${padding}`}>
      {video ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/75" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#1B224E 1px, transparent 1px), linear-gradient(90deg, #1B224E 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1440px] mx-auto px-8 xl:px-16"
      >
        {backTo && (
          <Link
            to={backTo}
            className="text-azure text-xs tracking-[0.25em] uppercase mb-6 inline-block hover:text-gold-dim transition-colors"
          >
            ← {backLabel}
          </Link>
        )}
        <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          {kicker}
        </div>
        <h1 className={titleClass}>{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">{description}</p>
        )}
      </motion.div>
    </section>
  )
}
