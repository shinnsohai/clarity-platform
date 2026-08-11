import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Real vector world map (MIT-licensed, simplemaps.com — see public/images/world-countries.svg)
// with 2000x857 viewBox. Countries in the file use either name="Country" or
// class="Country" attributes on their <path> — this matches CMS country strings against
// both, case-insensitively.
//
// Verified projection calibration for this exact file (checked against Malaysia and
// Bangladesh path coordinates): x = (long+180)/360*2000, y = (83-lat)/141*857.
// Used only as a *fallback pin* for countries too small to render as their own path at
// this scale (e.g. Singapore has no path in this map at all).
const FALLBACK_COORDS = {
  singapore: { lat: 1.3521, long: 103.8198 },
  'hong kong': { lat: 22.3193, long: 114.1694 },
  brunei: { lat: 4.9031, long: 114.9398 },
}

function projectFallback(lat, long) {
  return {
    xPct: ((long + 180) / 360) * 100,
    yPct: ((83 - lat) / 141) * 100,
  }
}

function normalize(str) {
  return (str || '').trim().toLowerCase()
}

export default function SvgWorldMap({ rows, renderTooltip }) {
  const containerRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState(null)
  const [hovered, setHovered] = useState(null) // { row, x, y }

  const rowByCountry = new Map(rows.map((r) => [normalize(r.country), r]))

  useEffect(() => {
    fetch('/images/world-countries.svg')
      .then((res) => res.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null))
  }, [])

  useEffect(() => {
    if (!svgMarkup || !containerRef.current) return
    const svgEl = containerRef.current.querySelector('svg')
    if (!svgEl) return
    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')
    svgEl.style.display = 'block'

    const paths = svgEl.querySelectorAll('path')
    const listeners = []

    paths.forEach((path) => {
      const countryName = path.getAttribute('name') || path.getAttribute('class') || ''
      const row = rowByCountry.get(normalize(countryName))
      path.style.transition = 'fill 0.15s ease'
      path.style.cursor = row ? 'pointer' : 'default'

      const onEnter = () => {
        path.style.fill = row ? '#1B224E' : '#d8dce6'
      }
      const onLeave = () => {
        path.style.fill = ''
      }
      const onMove = (e) => {
        if (!row) return
        const rect = containerRef.current.getBoundingClientRect()
        setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
      const onLeaveTooltip = () => {
        if (row) setHovered(null)
      }

      path.addEventListener('mouseenter', onEnter)
      path.addEventListener('mouseleave', onLeave)
      path.addEventListener('mousemove', onMove)
      path.addEventListener('mouseleave', onLeaveTooltip)
      listeners.push({ path, onEnter, onLeave, onMove, onLeaveTooltip })
    })

    return () => {
      listeners.forEach(({ path, onEnter, onLeave, onMove, onLeaveTooltip }) => {
        path.removeEventListener('mouseenter', onEnter)
        path.removeEventListener('mouseleave', onLeave)
        path.removeEventListener('mousemove', onMove)
        path.removeEventListener('mouseleave', onLeaveTooltip)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgMarkup, rows])

  // Countries present in CMS data but too small to have their own path in this map
  // (matched against a small known lat/long table) — shown as a manual pin instead.
  const pinnedFallbacks = rows.filter((r) => FALLBACK_COORDS[normalize(r.country)])

  return (
    <div className="relative w-full aspect-[2000/857] rounded-2xl overflow-hidden bg-white shadow-soft">
      <div ref={containerRef} className="absolute inset-0" dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined} />

      {!svgMarkup && (
        <div className="absolute inset-0 flex items-center justify-center text-concrete text-sm">
          Loading map…
        </div>
      )}

      {pinnedFallbacks.map((row) => {
        const coords = FALLBACK_COORDS[normalize(row.country)]
        const { xPct, yPct } = projectFallback(coords.lat, coords.long)
        return (
          <div
            key={row.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
            onMouseEnter={(e) => {
              const rect = containerRef.current.getBoundingClientRect()
              setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onMouseMove={(e) => {
              const rect = containerRef.current.getBoundingClientRect()
              setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-2.5 h-2.5 rounded-full bg-gold border-2 border-white shadow-soft"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-50" />
            </motion.div>
          </div>
        )
      })}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute z-20 w-52 bg-white rounded-xl shadow-soft-lg border border-ink/10 p-4 pointer-events-none"
            style={{ left: hovered.x + 14, top: hovered.y + 14 }}
          >
            <div className="font-display text-sm text-ink mb-2">{hovered.row.country}</div>
            {renderTooltip(hovered.row)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
