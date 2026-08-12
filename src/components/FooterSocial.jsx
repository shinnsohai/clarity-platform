import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { entities, groupSocial } from '../data/hierarchy'
import SocialIcon from './icons/SocialIcon'

const PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
]

// A single social circle. If the CMS URL is filled in it's a live link; otherwise it
// renders as an inert "coming soon" placeholder — we never invent a company's social URL.
function SocialCircle({ platform, url, size = 'md' }) {
  const dims = size === 'sm' ? 'w-9 h-9' : 'w-12 h-12'
  const iconDims = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const live = Boolean(url)

  const content = (
    <motion.span
      whileHover={live ? { y: -4, scale: 1.08 } : {}}
      className={`group/icon relative flex items-center justify-center ${dims} rounded-full border transition-colors duration-300 ${
        live
          ? 'border-azure/20 bg-white text-azure hover:bg-azure hover:text-white hover:border-azure shadow-soft'
          : 'border-ink/10 bg-white/60 text-ink/25 cursor-not-allowed'
      }`}
    >
      <SocialIcon name={platform.key} className={iconDims} />
      <span
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-azure-dim px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-white opacity-0 transition-opacity duration-200 ${
          live ? 'group-hover/icon:opacity-100' : 'group-hover/icon:opacity-100'
        }`}
      >
        {live ? platform.label : 'Coming Soon'}
      </span>
    </motion.span>
  )

  if (!live) return content

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform.label}>
      {content}
    </a>
  )
}

export default function FooterSocial() {
  const [hoveredEntity, setHoveredEntity] = useState(null)

  return (
    <div className="border-t border-ink/10">
      {/* Group-level follow block */}
      <div className="relative overflow-hidden py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(27,34,78,0.14) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            maskImage: 'radial-gradient(ellipse 480px 220px at center, black 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 480px 220px at center, black 0%, transparent 75%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-5 w-14 h-14 rounded-2xl bg-white shadow-soft-lg border border-ink/10 flex items-center justify-center p-2.5"
          >
            <img src="/images/logo-clarity-icon.png" alt="Clarity Group" className="w-full h-full object-contain" />
          </motion.div>
          <div className="text-concrete text-[10px] tracking-[0.3em] uppercase mb-1">Stay Connected</div>
          <h3 className="font-display text-xl md:text-2xl text-ink mb-7">FOLLOW CLARITY GROUP.</h3>
          <div className="flex items-center gap-4">
            {PLATFORMS.map((p) => (
              <SocialCircle key={p.key} platform={p} url={groupSocial[p.key]} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Per-subsidiary social — hover to reveal each entity's own channels */}
      <div className="border-t border-ink/10 py-12">
        <div className="max-w-[1680px] mx-auto px-8 xl:px-12">
          <div className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-6 text-center">
            Our Subsidiaries — Follow Each One
          </div>
          <div className="flex flex-wrap items-start justify-center gap-3">
            {entities.map((e) => {
              const isOpen = hoveredEntity === e.id
              return (
                <div
                  key={e.id}
                  onMouseEnter={() => setHoveredEntity(e.id)}
                  onMouseLeave={() => setHoveredEntity((h) => (h === e.id ? null : h))}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 transition-colors duration-300 cursor-default ${
                      isOpen ? 'border-azure/30 shadow-soft' : 'border-ink/10'
                    }`}
                  >
                    <img src={e.logo} alt="" className="w-5 h-5 object-contain shrink-0" />
                    <span className="font-display text-xs text-ink whitespace-nowrap">{e.name}</span>
                  </motion.div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.92 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 flex items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2 shadow-soft-lg"
                      >
                        {PLATFORMS.map((p) => (
                          <SocialCircle key={p.key} platform={p} url={e.social?.[p.key]} size="sm" />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
