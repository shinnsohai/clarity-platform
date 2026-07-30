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
        alt="Clarity E&C Group command center"
        className="absolute inset-0 w-[110%] h-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-ink/70" />

      <ThreeBackground className="absolute inset-0" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 xl:px-16 flex flex-col justify-end pb-24">
        <div className="hairline pt-6 mb-10 flex items-center gap-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          {parent.tagline}
        </div>

        <motion.h1
          style={{ x: titleX, y: titleY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[13vw] leading-[0.86] tracking-tightest text-paper max-w-[16ch]"
        >
          CLARITY
          <br />
          <span className="text-accent">E&amp;C</span> GROUP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-xl text-concrete-light text-lg leading-relaxed"
        >
          Six operating divisions. One command structure. Workforce deployment, structural
          engineering, digital infrastructure, facilities, and precision manufacturing — run as a
          single operational system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex items-center gap-8 text-concrete text-sm tracking-wide"
        >
          <span className="font-mono text-accent">01 / 06</span>
          <span className="uppercase tracking-[0.2em]">Scroll to deploy</span>
          <span className="h-px w-16 bg-concrete/40" />
        </motion.div>
      </div>
    </section>
  )
}
