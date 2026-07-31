import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      type: 'spring',
      stiffness: 90,
      damping: 12,
      mass: 1,
      onUpdate: (v) => setDisplay(Math.max(0, v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}
