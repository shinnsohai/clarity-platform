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
  const wrapperRef = useRef(null)
  const injectRef = useRef(null)
  const activePathRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState(null)
  const [hovered, setHovered] = useState(null) // { row, x, y }

  const rowByCountry = new Map(rows.map((r) => [normalize(r.country), r]))

  useEffect(() => {
    fetch('/images/world-countries.svg')
      .then((res) => res.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null))
  }, [])

  // Single delegated mousemove/mouseleave pair on the whole map wrapper — recomputed
  // fresh on every event via e.target, rather than per-path enter/leave listeners.
  // Per-path listeners can miss their paired leave event on fast mouse movement across
  // adjacent country borders, leaving a stale highlight/tooltip stuck on the wrong
  // country — this approach self-corrects on every single mousemove tick instead.
  useEffect(() => {
    if (!svgMarkup || !injectRef.current) return
    const svgEl = injectRef.current.querySelector('svg')
    if (!svgEl) return
    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')
    svgEl.style.display = 'block'
    svgEl.querySelectorAll('path').forEach((p) => {
      p.style.transition = 'fill 0.1s ease'
    })

    const clearActive = () => {
      if (activePathRef.current) {
        activePathRef.current.style.fill = ''
        activePathRef.current = null
      }
    }

    const onMove = (e) => {
      const path = e.target.closest && e.target.closest('path')
      if (!path || !svgEl.contains(path)) {
        clearActive()
        setHovered(null)
        return
      }
      if (path !== activePathRef.current) {
        clearActive()
        activePathRef.current = path
      }
      const countryName = path.getAttribute('name') || path.getAttribute('class') || ''
      const row = rowByCountry.get(normalize(countryName))
      path.style.fill = row ? '#1B224E' : '#d8dce6'
      path.style.cursor = row ? 'pointer' : 'default'

      if (row) {
        const rect = wrapperRef.current.getBoundingClientRect()
        setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
      } else {
        setHovered(null)
      }
    }

    const onLeaveWrapper = () => {
      clearActive()
      setHovered(null)
    }

    const wrapperEl = wrapperRef.current
    wrapperEl.addEventListener('mousemove', onMove)
    wrapperEl.addEventListener('mouseleave', onLeaveWrapper)

    return () => {
      wrapperEl.removeEventListener('mousemove', onMove)
      wrapperEl.removeEventListener('mouseleave', onLeaveWrapper)
      clearActive()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgMarkup, rows])

  // Countries present in CMS data but too small to have their own path in this map
  // (matched against a small known lat/long table) — shown as a manual pin instead.
  const pinnedFallbacks = rows.filter((r) => FALLBACK_COORDS[normalize(r.country)])

  // Keep the tooltip fully inside the map bounds instead of overflowing at the edges.
  const TOOLTIP_W = 208
  const TOOLTIP_H = 110
  const clampedLeft = hovered ? Math.min(hovered.x + 14, (wrapperRef.current?.clientWidth || 9999) - TOOLTIP_W - 8) : 0
  const clampedTop = hovered ? Math.min(hovered.y + 14, (wrapperRef.current?.clientHeight || 9999) - TOOLTIP_H - 8) : 0

  return (
    <div ref={wrapperRef} className="relative w-full aspect-[2000/857] rounded-2xl overflow-hidden bg-white shadow-soft">
      <div ref={injectRef} className="absolute inset-0" dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined} />

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
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-8 h-8 flex items-center justify-center"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
            onMouseEnter={(e) => {
              const rect = wrapperRef.current.getBoundingClientRect()
              setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onMouseMove={(e) => {
              const rect = wrapperRef.current.getBoundingClientRect()
              setHovered({ row, x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-2.5 h-2.5 rounded-full bg-gold border-2 border-white shadow-soft pointer-events-none"
            >
              <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-50" />
            </motion.div>
            {/* Always-visible label — this country has no path in the map, only this
                manually-placed pin, so a permanent label avoids any ambiguity about
                where it is regardless of whether it's being hovered. */}
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wide text-azure bg-white/90 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
              {row.country}
            </span>
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
            style={{ left: clampedLeft, top: clampedTop }}
          >
            <div className="font-display text-sm text-ink mb-2">{hovered.row.country}</div>
            {renderTooltip(hovered.row)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
