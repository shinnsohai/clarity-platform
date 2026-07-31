import { motion } from 'framer-motion'
import ir from '../data/investorRelations.json'

const donutColors = ['#0B1F3F', '#FFD400', '#64748B', '#C9A200']

function EquityDonut() {
  const size = 260
  const r = 92
  const circumference = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2},${size / 2}) rotate(-90)`}>
          <circle r={r} fill="none" stroke="#EEF1F5" strokeWidth={28} />
          {ir.equityModel.map((seg, i) => {
            const len = (seg.value / 100) * circumference
            const dash = `${len} ${circumference - len}`
            const dashoffset = -offset
            offset += len
            return (
              <motion.circle
                key={seg.label}
                r={r}
                fill="none"
                stroke={donutColors[i % donutColors.length]}
                strokeWidth={28}
                strokeDasharray={dash}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: dashoffset }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
              />
            )
          })}
        </g>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display"
          fontSize="34"
          fill="#0B1F3F"
        >
          100%
        </text>
      </svg>

      <div className="flex flex-col gap-4">
        {ir.equityModel.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-3">
            <span
              className="w-3 h-3 shrink-0"
              style={{ backgroundColor: donutColors[i % donutColors.length] }}
            />
            <span className="text-navy text-sm font-semibold w-12">{seg.value}%</span>
            <span className="text-concrete text-sm">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EsopBarChart() {
  return (
    <div className="flex items-end gap-6 h-56">
      {ir.esopVesting.map((v, i) => (
        <div key={v.year} className="flex flex-col items-center gap-3 flex-1">
          <div className="w-full flex items-end h-40 bg-[#EEF1F5]">
            <motion.div
              className="w-full bg-accent"
              initial={{ height: 0 }}
              whileInView={{ height: `${v.cumulative}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
            />
          </div>
          <span className="font-display text-navy text-sm">{v.cumulative}%</span>
          <span className="text-concrete text-[10px] tracking-[0.15em] uppercase">{v.year}</span>
          {v.note && <span className="text-accent-dim text-[9px] uppercase tracking-[0.15em]">{v.note}</span>}
        </div>
      ))}
    </div>
  )
}

export default function InvestorRelations() {
  return (
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Investor Relations &amp; Governance
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            CAPITAL STRUCTURE<span className="text-accent">.</span> DISCLOSED.
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">{ir.intro}</p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Equity Model
          </div>
          <h2 className="font-display text-3xl text-navy leading-[0.95] mb-10">
            OWNERSHIP DISTRIBUTION<span className="text-accent">.</span>
          </h2>
          <EquityDonut />
        </div>

        <div>
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            ESOP
          </div>
          <h2 className="font-display text-3xl text-navy leading-[0.95] mb-10">
            VESTING SCHEDULE<span className="text-accent">.</span>
          </h2>
          <EsopBarChart />
        </div>
      </section>

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Instrument Comparison
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-navy leading-[0.95] mb-10">
            EQUITY, ESOP &amp; PHANTOM STOCK<span className="text-accent">.</span>
          </h2>

          <div className="overflow-x-auto border border-navy/15 bg-white">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-navy text-white text-[11px] tracking-[0.15em] uppercase">
                  <th className="px-5 py-4 font-semibold">Instrument</th>
                  <th className="px-5 py-4 font-semibold">Ownership</th>
                  <th className="px-5 py-4 font-semibold">Voting Rights</th>
                  <th className="px-5 py-4 font-semibold">Liquidity Trigger</th>
                </tr>
              </thead>
              <tbody>
                {ir.instruments.map((row, i) => (
                  <tr key={row.instrument} className={`text-sm border-t border-navy/10 ${i % 2 === 1 ? 'bg-[#F7F8FA]' : ''}`}>
                    <td className="px-5 py-4 font-semibold text-navy whitespace-nowrap">{row.instrument}</td>
                    <td className="px-5 py-4 text-concrete">{row.ownership}</td>
                    <td className="px-5 py-4 text-concrete">{row.voting}</td>
                    <td className="px-5 py-4 text-concrete">{row.liquidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
