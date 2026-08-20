import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { parent, heroVideo } from '../data/hierarchy'

// Background is a real Singapore skyline video loop (Marina Bay Sands, at night) —
// public/videos/hero-singapore.mp4, converted+compressed from the source GIF.
// The `poster` frame reuses an existing real site photo so first paint (and any
// browser that blocks video autoplay) still shows something meaningful, not a blank.
export default function HeroSlider() {
  const sectionRef = useRef(null)

  // Scroll-driven parallax — the video drifts and the copy fades/lifts away as the
  // visitor scrolls the hero out of view, so the front page feels alive immediately.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[760px] w-full overflow-hidden bg-paper">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.video
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: 'linear' } }}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-site.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/0 to-white/40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-24"
      >
        <div className="flex items-center gap-4 mb-6 text-azure text-xs tracking-[0.3em] uppercase font-semibold">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          {parent.tagline}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[10vw] leading-[0.9] tracking-tightest text-ink max-w-[16ch]"
        >
          {parent.name}<span className="text-gold">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-concrete text-lg leading-relaxed"
        >
          Six subsidiaries delivering structural engineering, facilities operations,
          precision manufacturing, and certified manpower — across oil &amp; gas, marine,
          aviation, and industrial construction sites in Singapore and the region.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/our-business"
            className="inline-flex items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-md hover:brightness-110 transition-all"
          >
            Explore Our Capabilities
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center border border-ink/20 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-4 rounded-md hover:border-azure hover:text-azure transition-colors"
          >
            Discuss a Project
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
          <span className="text-concrete text-xs tracking-[0.15em] uppercase">Marina Bay, Singapore</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-6 right-8 xl:right-16 hidden md:flex flex-col items-center gap-2 text-concrete"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
