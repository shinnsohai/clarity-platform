import { motion } from 'framer-motion'

// The group's data flywheel, reused across /about/mission-vision, /how-it-works, and
// /investor-relations: Field Operations (the four operating subsidiaries) generate real
// operational data → Lenix captures and connects it (Builtsync, IT Solutions) → Lenix refines
// it into decision-grade intelligence (Pilot Data, Digital Transformation) → applied back into
// the next deployment. Every figure is Lenix's own published telemetry (src/data/entities.json:
// 24 sites synced, <400ms latency, 40+ systems integrated, 9 active pilots, 2.4M data points a
// day) — nothing projected. Lenix absorbed Techsphere's functions and stats.
export default function FlywheelDiagram({ compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-ink/10 rounded-3xl shadow-soft-lg overflow-x-auto"
    >
      <svg
        viewBox="0 0 920 360"
        role="img"
        aria-label="Flywheel diagram: Field Operations subsidiaries generate data, captured and connected by Lenix's Builtsync and IT Solutions, refined into decision-grade intelligence by Lenix's Pilot Data and Digital Transformation, then applied back into Field Operations — a compounding loop."
        className={compact ? 'w-full h-auto min-w-[640px]' : 'w-full h-auto min-w-[720px]'}
      >
        <defs>
          <marker id="fw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#1B224E" />
          </marker>
        </defs>

        {/* Stage 1: Field Operations */}
        <rect x="20" y="40" width="230" height="150" rx="14" fill="#FFFFFF" stroke="#1B224E" strokeOpacity="0.18" strokeWidth="1.6" />
        <text x="135" y="66" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" letterSpacing="1.5" fill="#F29C21">STAGE 1</text>
        <text x="135" y="90" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Field Operations</text>
        <text x="135" y="112" textAnchor="middle" fontSize="11.5" fill="#64748B">Clarity E&amp;C · Durabuild</text>
        <text x="135" y="128" textAnchor="middle" fontSize="11.5" fill="#64748B">CFM · Clarity Manufacturing</text>
        <text x="135" y="160" textAnchor="middle" fontSize="10.5" fill="#94A3B8">people + assets, deployed on real sites</text>

        {/* Stage 2: Capture & Connect */}
        <rect x="345" y="40" width="230" height="150" rx="14" fill="#FFFFFF" stroke="#1B224E" strokeOpacity="0.18" strokeWidth="1.6" />
        <text x="460" y="66" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" letterSpacing="1.5" fill="#F29C21">STAGE 2</text>
        <text x="460" y="90" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Capture &amp; Connect</text>
        <text x="460" y="112" textAnchor="middle" fontSize="11.5" fill="#64748B">Lenix — Builtsync</text>
        <text x="460" y="128" textAnchor="middle" fontSize="11.5" fill="#64748B">Lenix — IT Solutions</text>
        <text x="460" y="152" textAnchor="middle" fontSize="10.5" fill="#94A3B8">24 sites synced · &lt;400ms latency</text>
        <text x="460" y="168" textAnchor="middle" fontSize="10.5" fill="#94A3B8">40+ systems integrated</text>

        {/* Stage 3: Intelligence */}
        <rect x="670" y="40" width="230" height="150" rx="14" fill="#FFFFFF" stroke="#1B224E" strokeOpacity="0.18" strokeWidth="1.6" />
        <text x="785" y="66" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" letterSpacing="1.5" fill="#F29C21">STAGE 3</text>
        <text x="785" y="90" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Intelligence</text>
        <text x="785" y="112" textAnchor="middle" fontSize="11.5" fill="#64748B">Lenix — Pilot Data</text>
        <text x="785" y="128" textAnchor="middle" fontSize="11.5" fill="#64748B">Lenix — Digital Transformation</text>
        <text x="785" y="152" textAnchor="middle" fontSize="10.5" fill="#94A3B8">9 active pilots · 2.4M data points / day</text>
        <text x="785" y="168" textAnchor="middle" fontSize="10.5" fill="#94A3B8">decision-grade intelligence</text>

        {/* forward arrows */}
        <line x1="250" y1="115" x2="340" y2="115" stroke="#1B224E" strokeWidth="1.6" markerEnd="url(#fw-arrow)" />
        <text x="295" y="104" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#64748B">captures</text>

        <line x1="575" y1="115" x2="665" y2="115" stroke="#1B224E" strokeWidth="1.6" markerEnd="url(#fw-arrow)" />
        <text x="620" y="104" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#64748B">refines</text>

        {/* return loop */}
        <path d="M785 190 C 785 280, 135 280, 135 190" fill="none" stroke="#F29C21" strokeWidth="1.6" markerEnd="url(#fw-arrow)" />
        <text x="460" y="300" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="0.5" fill="#D6820D">applied back into the next deployment</text>
        <text x="460" y="326" textAnchor="middle" fontSize="10.5" fill="#94A3B8">each cycle compounds the data advantage the next entrant doesn't have</text>
      </svg>
    </motion.div>
  )
}
