import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { parent, heroImages } from '../data/hierarchy'

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen min-h-[760px] w-full overflow-hidden bg-paper">
      <AnimatePresence mode="sync">
        {heroImages.map(
          (slide, i) =>
            i === index && (
              <motion.div
                key={slide.src}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1 }, scale: { duration: 6, ease: 'linear' } }}
                className="absolute inset-0"
              >
                <img src={slide.src} alt={slide.caption} className="w-full h-full object-cover" />
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/0 to-white/40" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-24">
        <div className="flex items-center gap-4 mb-6 text-azure text-xs tracking-[0.3em] uppercase font-semibold">
          <span className="w-2 h-2 bg-azure rounded-full inline-block" />
          {parent.tagline}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[10vw] leading-[0.9] tracking-tightest text-ink max-w-[16ch]"
        >
          {parent.name}<span className="text-azure">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-concrete text-lg leading-relaxed"
        >
          Five subsidiaries. One certified standard. Construction, technology, facilities,
          manufacturing, and global manpower — delivered with total transparency.
        </motion.p>

        <div className="mt-10 flex items-center gap-3">
          {heroImages.map((slide, i) => (
            <button
              key={slide.src}
              onClick={() => setIndex(i)}
              aria-label={slide.caption}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-10 bg-azure' : 'w-4 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
          <span className="ml-4 text-concrete text-xs tracking-[0.15em] uppercase">
            {heroImages[index].caption}
          </span>
        </div>
      </div>
    </section>
  )
}
