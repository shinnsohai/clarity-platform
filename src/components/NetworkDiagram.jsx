import { motion } from 'framer-motion'

// Circuit-board style hub-and-spoke diagram — the subsidiary's own logo sits in the
// center hub; up to 5 connected-company nodes sit at fixed satellite positions, joined
// by right-angled traces. Traces draw themselves in on scroll, then small pulses loop
// continuously inward along each trace toward the hub, echoing data/relationships
// flowing into the subsidiary.
//
// ViewBox is a fixed 900x480 stage. Each anchor defines the satellite's center point
// and the polyline waypoints of its trace back toward the hub (which sits at 450,240).
const HUB = { cx: 450, cy: 240 }

const ANCHORS = [
  { id: 'a', cx: 96, cy: 84, points: [[96, 84], [96, 176], [258, 176], [388, 222]] },
  { id: 'b', cx: 64, cy: 320, points: [[64, 320], [64, 258], [238, 258], [388, 248]] },
  { id: 'c', cx: 804, cy: 66, points: [[804, 66], [804, 148], [600, 148], [498, 206]] },
  { id: 'd', cx: 840, cy: 240, points: [[840, 240], [618, 240], [516, 240]] },
  { id: 'e', cx: 782, cy: 402, points: [[782, 402], [782, 320], [578, 320], [500, 272]] },
]

function pointsToPath(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
}

function PlaceholderGlyph({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  )
}

function Trace({ anchor, index, hasCompany }) {
  const d = pointsToPath(anchor.points)
  const vias = anchor.points.slice(1, -1)

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#1B224E"
        strokeOpacity={hasCompany ? 0.28 : 0.12}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      />
      {vias.map((v, i) => (
        <rect key={i} x={v[0] - 2.5} y={v[1] - 2.5} width={5} height={5} fill="#1B224E" fillOpacity={hasCompany ? 0.3 : 0.14} />
      ))}
      {hasCompany &&
        [0, 1].map((pulse) => (
          <motion.circle
            key={pulse}
            r={4}
            fill="#F29C21"
            initial={{ opacity: 0 }}
            animate={{
              cx: anchor.points.map((p) => p[0]),
              cy: anchor.points.map((p) => p[1]),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3 + pulse * 1.3 + 1,
            }}
          />
        ))}
    </g>
  )
}

function Node({ anchor, company, size, isHub, hubLogo }) {
  const s = size
  return (
    <foreignObject x={anchor.cx - s / 2} y={anchor.cy - s / 2} width={s} height={s} style={{ overflow: 'visible' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        whileHover={{ scale: 1.08 }}
        transition={isHub ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative w-full h-full rounded-2xl flex items-center justify-center bg-white ${
          isHub
            ? 'shadow-soft-lg border-2 border-azure/15 p-4'
            : company?.logo
              ? 'shadow-soft border border-ink/10 p-3'
              : 'shadow-soft border border-dashed border-ink/15 p-3'
        }`}
      >
        {isHub ? (
          <>
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-2xl border-2 border-azure/30"
            />
            <img src={hubLogo} alt="" className="w-full h-full object-contain relative" />
          </>
        ) : company?.logo ? (
          <img src={company.logo} alt={company.name || 'Connected company'} className="w-full h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-ink/25">
            <PlaceholderGlyph className="w-6 h-6" />
          </div>
        )}

        {!isHub && (
          <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-azure-dim px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
            {company?.name || 'Logo Pending'}
          </span>
        )}
      </motion.div>
    </foreignObject>
  )
}

export default function NetworkDiagram({ entity }) {
  const companies = (entity.connectedCompanies || []).slice(0, ANCHORS.length)
  if (companies.length === 0) return null

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Our Network
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95]">
            COMPANIES WORKING WITH<span className="text-azure"> {entity.name.toUpperCase()}.</span>
          </h2>
        </motion.div>

        <div className="mx-auto w-full max-w-[900px]">
          <svg viewBox="0 0 900 480" className="w-full h-auto">
            {companies.map((c, i) => (
              <Trace key={ANCHORS[i].id} anchor={ANCHORS[i]} index={i} hasCompany={Boolean(c?.logo)} />
            ))}

            {companies.map((c, i) => (
              <Node key={ANCHORS[i].id} anchor={ANCHORS[i]} company={c} size={92} />
            ))}

            <Node anchor={HUB} isHub hubLogo={entity.logo} size={140} />
          </svg>
        </div>
      </div>
    </section>
  )
}
