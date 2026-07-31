import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ThreeBackground from './ThreeBackground'
import { parent } from '../data/hierarchy'

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const titleX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const titleY = useTransform(sy, [-0.5, 0.5], [-8, 8])
  const imgX = useTransform(sx, [-0.5, 0.5], [10, -10])

  const onPointerMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative h-screen min-h-[760px] w-full overflow-hidden bg-ink"
    >
      <motion.img
        style={{ x: imgX }}
        src={parent.image}
        alt="CEC corporate headquarters and industrial operations"
        className="absolute inset-0 w-[110%] h-full object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-ink/80" />

      <ThreeBackground className="absolute inset-0" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-24">
        <div className="hairline pt-6 mb-10 flex items-center gap-4 text-white/60 text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          {parent.tagline}
        </div>

        <motion.h1
          style={{ x: titleX, y: titleY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[15vw] leading-[0.86] tracking-tightest text-white max-w-[16ch]"
        >
          {parent.name}<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-xl text-white/70 text-lg leading-relaxed"
        >
          Five subsidiaries. One strategic partner. Construction, facilities, technology,
          manufacturing, and global talent — run under a single command structure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex items-center gap-8 text-white/50 text-sm tracking-wide"
        >
          <span className="font-mono text-accent">05 + 01</span>
          <span className="uppercase tracking-[0.2em]">Scroll to review the portfolio</span>
          <span className="h-px w-16 bg-white/20" />
        </motion.div>
      </div>
    </section>
  )
}
