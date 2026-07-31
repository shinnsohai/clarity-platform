import { motion } from 'framer-motion'
import hse from '../data/hse.json'

const categoryColor = {
  Standard: 'bg-navy/10 text-navy',
  Advanced: 'bg-accent/20 text-accent-dim',
  Critical: 'bg-navy text-white',
}

export default function HseCompliance() {
  return (
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            HSE &amp; Compliance
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            ZERO TOLERANCE<span className="text-accent">.</span> FULL PROTOCOL.
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">{hse.intro}</p>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          Annual Cycle
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-navy leading-[0.95] mb-10">
          EMERGENCY DRILL SCHEDULE<span className="text-accent">.</span>
        </h2>

        <div className="overflow-x-auto border border-navy/15">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-navy text-white text-[11px] tracking-[0.15em] uppercase">
                <th className="px-5 py-4 font-semibold">Month</th>
                <th className="px-5 py-4 font-semibold">Drill</th>
                <th className="px-5 py-4 font-semibold">Area</th>
                <th className="px-5 py-4 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {hse.drillSchedule.map((row, i) => (
                <motion.tr
                  key={row.month}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F8FA]'} border-t border-navy/10`}
                >
                  <td className="px-5 py-4 font-semibold text-navy whitespace-nowrap">{row.month}</td>
                  <td className="px-5 py-4 text-navy">{row.drill}</td>
                  <td className="px-5 py-4 text-concrete">{row.area}</td>
                  <td className="px-5 py-4 text-concrete whitespace-nowrap">{row.duration}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Response Protocols
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-navy leading-[0.95] mb-10">
            SCENARIO MATRIX<span className="text-accent">.</span>
          </h2>

          <div className="overflow-x-auto border border-navy/15 bg-white">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-navy text-white text-[11px] tracking-[0.15em] uppercase">
                  <th className="px-5 py-4 font-semibold">Scenario</th>
                  <th className="px-5 py-4 font-semibold">Severity</th>
                  <th className="px-5 py-4 font-semibold">Protocol</th>
                  <th className="px-5 py-4 font-semibold">Agencies</th>
                </tr>
              </thead>
              <tbody>
                {hse.scenarioMatrix.map((row, i) => (
                  <motion.tr
                    key={row.scenario}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="text-sm border-t border-navy/10"
                  >
                    <td className="px-5 py-4 font-semibold text-navy whitespace-nowrap">
                      {row.scenario}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-bold ${categoryColor[row.category]}`}
                      >
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-concrete max-w-md">{row.protocol}</td>
                    <td className="px-5 py-4 text-concrete whitespace-nowrap">{row.agencies}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
