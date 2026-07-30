import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { parent, branches } from '../data/hierarchy'
import SubIcon from './icons/SubIcon'

const accent = {
  clarity: '#F5A623',
  durabuild: '#E8A93A',
  lenix: 'linear-gradient(90deg,#4fd1ff,#7c3aed 55%,#ff7a18)',
  cfm: '#17B6A7',
  ef: 'linear-gradient(90deg,#ffc93c,#e63946)',
}

function AccentBar({ theme }) {
  const v = accent[theme] || accent.clarity
  const isGradient = v.startsWith('linear')
  return (
    <span
      className="block h-[3px] w-10 mb-4"
      style={isGradient ? { backgroundImage: v } : { backgroundColor: v }}
    />
  )
}

export default function HierarchyMap() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const parentRef = useRef(null)
  const branchRefs = useRef({})
  const [lines, setLines] = useState([])
  const [openId, setOpenId] = useState(null)

  const recompute = useCallback(() => {
    const c = containerRef.current
    const p = parentRef.current
    if (!c || !p) return
    const cRect = c.getBoundingClientRect()
    const pRect = p.getBoundingClientRect()
    const px = pRect.left + pRect.width / 2 - cRect.left
    const py = pRect.bottom - cRect.top
    const next = branches
      .map((b) => {
        const el = branchRefs.current[b.id]
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          id: b.id,
          x1: px,
          y1: py,
          x2: r.left + r.width / 2 - cRect.left,
          y2: r.top - cRect.top,
        }
      })
      .filter(Boolean)
    setLines(next)
  }, [])

  useEffect(() => {
    recompute()
    const ro = new ResizeObserver(recompute)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [recompute])

  useEffect(() => {
    let raf
    let frames = 0
    const loop = () => {
      recompute()
      frames++
      if (frames < 24) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [openId, recompute])

  return (
    <section className="relative bg-paper py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-accent inline-block" />
              Group Structure
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95]">
              THE HIERARCHY<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-concrete text-sm leading-relaxed">
            Click a division to expand its sub-divisions. Enter a division to open its full
            operational page.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {lines.map((l) => {
              const midY = (l.y1 + l.y2) / 2
              const d = `M ${l.x1} ${l.y1} C ${l.x1} ${midY}, ${l.x2} ${midY}, ${l.x2} ${l.y2}`
              const active = openId === l.id
              return (
                <motion.path
                  key={l.id}
                  d={d}
                  fill="none"
                  stroke={active ? '#F5A623' : '#C7CCD6'}
                  strokeWidth={active ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{ stroke: active ? '#F5A623' : '#C7CCD6', strokeWidth: active ? 2 : 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              )
            })}
          </svg>

          <div className="relative flex justify-center mb-16" style={{ zIndex: 1 }}>
            <div
              ref={parentRef}
              className="inline-flex items-center gap-5 px-8 py-5 border border-ink/30 bg-ink"
            >
              <div className="w-14 h-14 rounded-full bg-white shrink-0 flex items-center justify-center p-1.5">
                <img
                  src="/images/logo-clarity-icon.png"
                  alt="Clarity E&C Group"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white/60 text-[11px] tracking-[0.25em] uppercase mb-1">
                  Parent Entity
                </span>
                <span className="font-display text-xl md:text-2xl text-white">{parent.name}</span>
              </div>
            </div>
          </div>

          <div
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
            style={{ zIndex: 1 }}
          >
            {branches.map((b, i) => {
              const isOpen = openId === b.id
              return (
                <div
                  key={b.id}
                  ref={(el) => (branchRefs.current[b.id] = el)}
                  className={`lg:col-span-1 ${i % 5 === 2 ? 'lg:mt-6' : ''} ${
                    isOpen ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.7 }}
                    className="border border-ink/10 bg-paper shadow-sm hover:border-accent/60 transition-colors"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : b.id)}
                      className="w-full text-left p-5 flex flex-col"
                    >
                      <AccentBar theme={b.theme} />
                      <span className="text-concrete text-[10px] tracking-[0.2em] uppercase mb-2">
                        Division {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-lg leading-tight text-ink mb-1">
                        {b.name}
                      </span>
                      <span className="text-concrete text-xs leading-snug">{b.role}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.6 }}
                          className="overflow-hidden border-t border-ink/10"
                        >
                          <div className="p-5">
                            <p className="text-concrete text-sm leading-relaxed mb-5">
                              {b.summary}
                            </p>

                            {b.subDivisions.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {b.subDivisions.map((s, si) => (
                                  <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 420,
                                      damping: 14,
                                      delay: si * 0.06,
                                    }}
                                    className="flex items-start gap-3 p-3 bg-[#F7F8FA] border border-ink/10"
                                  >
                                    <SubIcon
                                      name={s.icon}
                                      className="w-7 h-7 text-accent shrink-0 mt-0.5"
                                    />
                                    <div>
                                      <div className="text-ink text-xs font-semibold tracking-wide mb-1">
                                        {s.name}
                                      </div>
                                      <div className="text-concrete text-[11px] leading-relaxed">
                                        {s.description}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-accent-dim text-[11px] uppercase tracking-[0.2em] mb-6">
                                Single unified operating desk — no sub-divisions
                              </p>
                            )}

                            <button
                              onClick={() => navigate(`/${b.slug}`)}
                              className="inline-flex items-center gap-3 border border-accent text-accent-dim text-xs tracking-[0.2em] uppercase px-5 py-3 hover:bg-accent hover:text-ink transition-colors"
                            >
                              Enter Division
                              <span aria-hidden>→</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
