import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { Search, Filter, RotateCcw, ZoomIn, ZoomOut, ChevronDown } from 'lucide-react'
import worldMapData from '../../data/worldMapCountries.json'
import MapTooltip from './MapTooltip'
import CountryDetailModal from './CountryDetailModal'

// Ported from the user's own standalone build (see "10. World Map/" in the project root)
// and restyled onto Clarity's Navy/Gold theme. Real country geometry via react-simple-maps
// + world-atlas (public MIT-licensed TopoJSON, fetched from jsDelivr at runtime) — this
// replaced an earlier hand-rolled SVG hover map that kept mispositioning small countries.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Derive display-formatted fields + the fields the map/tooltip/modal expect from the raw
// CMS-editable data (which stores just raw numbers so it stays easy to update).
function enrichCountry(c) {
  const totalRaw = (c.directWorkersRaw || 0) + (c.indirectWorkersRaw || 0)
  return {
    ...c,
    coordinates: [c.longitude, c.latitude],
    directWorkers: `${c.directWorkersRaw.toLocaleString()}+`,
    indirectWorkers: `${c.indirectWorkersRaw.toLocaleString()}+`,
    totalWorkers: `${totalRaw.toLocaleString()}+`,
  }
}

const COUNTRIES = worldMapData.countries.map(enrichCountry)
const ALL_CLIENTS = Array.from(new Set(COUNTRIES.flatMap((c) => c.clients || []))).sort()
const GLOBAL_STATS = {
  totalDirect: COUNTRIES.reduce((s, c) => s + c.directWorkersRaw, 0),
  totalIndirect: COUNTRIES.reduce((s, c) => s + c.indirectWorkersRaw, 0),
  totalClients: ALL_CLIENTS.length,
}

export default function InteractiveWorldMap() {
  const [selectedClient, setSelectedClient] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [hovered, setHovered] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [zoom, setZoom] = useState(1.2)
  const [center, setCenter] = useState([70, 20])

  const markerScale = Math.max(0.35, 1 / Math.pow(zoom, 0.85))

  const onHover = (country, pos) => {
    setHovered(country)
    if (pos) setTooltipPos(pos)
  }

  const resetView = () => {
    setSelectedClient('')
    setSearchQuery('')
    setZoom(1.2)
    setCenter([70, 20])
  }

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
            Global Operations
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-4">
            WORKFORCE &amp; CLIENTELE<span className="text-azure">.</span> BY COUNTRY.
          </h2>
          <p className="text-concrete text-sm mb-8 max-w-2xl">
            Real geography, not a stylized illustration — hover or click a country for its
            direct/indirect workforce and served clients. Search, filter by client, and zoom in.
          </p>
        </motion.div>

        {/* Quick stats + toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5"
        >
          <div className="flex items-center gap-3 p-1.5 rounded-2xl border border-ink/10 bg-white shadow-soft w-fit">
            <div className="px-3.5 py-1.5 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-concrete">Direct</span>
              <span className="text-sm font-display text-gold-dim">{GLOBAL_STATS.totalDirect.toLocaleString()}+</span>
            </div>
            <div className="h-6 w-px bg-ink/10" />
            <div className="px-3.5 py-1.5 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-concrete">Indirect</span>
              <span className="text-sm font-display text-azure">{GLOBAL_STATS.totalIndirect.toLocaleString()}+</span>
            </div>
            <div className="h-6 w-px bg-ink/10" />
            <div className="px-3.5 py-1.5 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-concrete">Clients</span>
              <span className="text-sm font-display text-emerald-600">{GLOBAL_STATS.totalClients}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-concrete pointer-events-none" />
              <input
                type="text"
                placeholder="Search country…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ink/10 bg-white text-ink placeholder-concrete focus:outline-none focus:border-azure transition-colors"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-soft-lg overflow-hidden z-30 border border-ink/10 bg-white">
                  {COUNTRIES.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCountry(c)
                        setSearchQuery('')
                      }}
                      className="w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-pearl transition-colors"
                    >
                      <span className="flex items-center gap-2 font-bold text-ink">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[10px] text-concrete">{c.directWorkers} direct</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center border border-ink/10 rounded-xl px-2.5 py-2 bg-white">
                <Filter className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0" />
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="bg-transparent text-xs focus:outline-none w-full cursor-pointer appearance-none pr-4 font-bold text-ink"
                >
                  <option value="">Client: All</option>
                  {ALL_CLIENTS.map((client) => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-concrete absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={resetView}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-ink/10 bg-white text-xs font-bold text-ink hover:border-azure transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gold" />
              Reset
            </motion.button>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-azure-light border border-ink/10 shadow-soft"
        >
          <div className="absolute bottom-5 right-5 z-20 flex flex-col gap-1.5 p-1.5 rounded-2xl border border-ink/10 bg-white/95 shadow-soft-lg backdrop-blur-md">
            <button
              onClick={() => zoom < 6 && setZoom((z) => z * 1.4)}
              className="p-2.5 rounded-xl text-ink hover:bg-gold-light hover:text-gold-dim transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => zoom > 1 && setZoom((z) => z / 1.4)}
              className="p-2.5 rounded-xl text-ink hover:bg-gold-light hover:text-gold-dim transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <div className="w-full h-px bg-ink/10 my-0.5" />
            <button
              onClick={resetView}
              className="p-2.5 rounded-xl text-gold hover:bg-gold-light transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Featured hubs legend */}
          <div className="absolute bottom-5 left-5 z-20 p-4 rounded-2xl border border-ink/10 bg-white/95 shadow-soft-lg backdrop-blur-md text-xs max-w-[220px]">
            <h4 className="font-display text-ink mb-2.5">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-md bg-azure border-2 border-gold shrink-0" />
                <span className="font-bold text-ink">Active Operational Hub</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-md bg-ink/20 border border-ink/20 shrink-0" />
                <span className="font-semibold text-concrete">Global Landmasses</span>
              </div>
            </div>
            {selectedClient && (
              <div className="mt-3 pt-2 border-t border-ink/10 text-[10px] font-bold text-gold-dim">
                Filtering: {selectedClient}
              </div>
            )}
          </div>

          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} className="w-full h-full">
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={(position) => {
                setCenter(position.coordinates)
                setZoom(position.zoom)
              }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso3 = geo.properties.ISO_A3 || geo.properties.iso_a3
                    const countryName = geo.properties.name
                    const data = COUNTRIES.find(
                      (c) => c.id === iso3 || c.name.toLowerCase() === countryName?.toLowerCase() || (c.fullName && c.fullName.toLowerCase() === countryName?.toLowerCase())
                    )
                    const isActive = !!data
                    const matchesFilter = !selectedClient || (data && data.clients.includes(selectedClient))
                    const isHighlighted = isActive && matchesFilter

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(evt) => isHighlighted && data && onHover(data, { x: evt.clientX, y: evt.clientY - 10 })}
                        onMouseMove={(evt) => isHighlighted && data && onHover(data, { x: evt.clientX, y: evt.clientY - 10 })}
                        onMouseLeave={() => onHover(null, null)}
                        onClick={() => data && setSelectedCountry(data)}
                        style={{
                          default: {
                            fill: isHighlighted ? '#1B224E' : '#c7ccd6',
                            stroke: isHighlighted ? '#F29C21' : '#a8afbd',
                            strokeWidth: isHighlighted ? 1.5 : 0.8,
                            outline: 'none',
                            transition: 'all 200ms ease',
                          },
                          hover: {
                            fill: isHighlighted ? '#2d3c5e' : '#a8afbd',
                            stroke: '#F29C21',
                            strokeWidth: 2,
                            outline: 'none',
                            cursor: isHighlighted ? 'pointer' : 'default',
                          },
                          pressed: { fill: '#10142F', outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>

              {COUNTRIES.filter((c) => !selectedClient || c.clients.includes(selectedClient)).map((country) => (
                <Marker
                  key={country.id}
                  coordinates={country.coordinates}
                  onMouseEnter={(evt) => onHover(country, { x: evt.clientX, y: evt.clientY - 10 })}
                  onMouseMove={(evt) => onHover(country, { x: evt.clientX, y: evt.clientY - 10 })}
                  onMouseLeave={() => onHover(null, null)}
                  onClick={() => setSelectedCountry(country)}
                >
                  <g className="cursor-pointer" transform={`scale(${markerScale})`} style={{ transition: 'transform 150ms ease-out' }}>
                    <circle r={6} fill="none" stroke="#F29C21" strokeWidth="1.5" className="animate-ping opacity-80" />
                    <circle r={4} fill="#F29C21" stroke="#1B224E" strokeWidth="1.5" />
                    <circle r={1.5} fill="#ffffff" />
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>
      </div>

      <MapTooltip content={hovered} position={tooltipPos} />
      <CountryDetailModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </section>
  )
}
