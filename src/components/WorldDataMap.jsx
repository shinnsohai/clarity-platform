import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Real capital-city coordinates (lat, long) — used to place a country's pin on the
// world map image via standard equirectangular projection. Not fabricated: these are
// public geographic facts. If a country name in the CMS data doesn't match an entry
// here, its pin is simply not plotted (rather than guessing a wrong position) — it
// still appears in the coverage list below the map.
const COUNTRY_COORDS = {
  singapore: { lat: 1.3521, long: 103.8198 },
  malaysia: { lat: 3.139, long: 101.6869 },
  philippines: { lat: 14.5995, long: 120.9842 },
  bangladesh: { lat: 23.8103, long: 90.4125 },
  india: { lat: 28.6139, long: 77.209 },
  china: { lat: 39.9042, long: 116.4074 },
  indonesia: { lat: -6.2088, long: 106.8456 },
  vietnam: { lat: 21.0278, long: 105.8342 },
  thailand: { lat: 13.7563, long: 100.5018 },
  myanmar: { lat: 19.7633, long: 96.0785 },
  nepal: { lat: 27.7172, long: 85.324 },
  'sri lanka': { lat: 6.9271, long: 79.8612 },
  pakistan: { lat: 33.6844, long: 73.0479 },
  japan: { lat: 35.6762, long: 139.6503 },
  'south korea': { lat: 37.5665, long: 126.978 },
  australia: { lat: -35.2809, long: 149.13 },
  'united states': { lat: 38.9072, long: -77.0369 },
  usa: { lat: 38.9072, long: -77.0369 },
  'united kingdom': { lat: 51.5074, long: -0.1278 },
  uk: { lat: 51.5074, long: -0.1278 },
  uae: { lat: 24.4539, long: 54.3773 },
  'united arab emirates': { lat: 24.4539, long: 54.3773 },
  'saudi arabia': { lat: 24.7136, long: 46.6753 },
  'hong kong': { lat: 22.3193, long: 114.1694 },
  taiwan: { lat: 25.033, long: 121.5654 },
  cambodia: { lat: 11.5564, long: 104.9282 },
  laos: { lat: 17.9757, long: 102.6331 },
  brunei: { lat: 4.9031, long: 114.9398 },
}

function project(lat, long) {
  return {
    x: ((long + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  }
}

function hasCoords(countryName) {
  return Boolean(COUNTRY_COORDS[countryName?.trim().toLowerCase()])
}

export default function WorldDataMap({ label, title, rows, renderTooltip, emptyHint }) {
  const [hoveredId, setHoveredId] = useState(null)
  const plottable = rows.filter((r) => hasCoords(r.country))
  const unplottable = rows.filter((r) => !hasCoords(r.country))

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            {label}
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-4">
            {title}
          </h2>
          <p className="text-concrete text-sm mb-10 max-w-xl">{emptyHint}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-white shadow-soft"
        >
          <img
            src="/images/world-map.png"
            alt="World map"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />

          {plottable.map((row) => {
            const coords = COUNTRY_COORDS[row.country.trim().toLowerCase()]
            const { x, y } = project(coords.lat, coords.long)
            const isHovered = hoveredId === row.id

            return (
              <div
                key={row.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setHoveredId(row.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.5 }}
                  className="relative w-4 h-4 rounded-full bg-azure border-2 border-white shadow-soft cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full bg-azure animate-ping opacity-40" />
                </motion.div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 w-56 bg-white rounded-xl shadow-soft-lg border border-ink/10 p-4"
                    >
                      <div className="font-display text-sm text-ink mb-2">{row.country}</div>
                      {renderTooltip(row)}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-ink/10 rotate-45 -mt-1.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

        {unplottable.length > 0 && (
          <p className="text-concrete/60 text-[11px] mt-4 italic">
            Also covering: {unplottable.map((r) => r.country).join(', ')} — added via CMS, pin position not yet mapped.
          </p>
        )}
      </div>
    </section>
  )
}
