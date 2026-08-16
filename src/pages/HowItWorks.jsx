import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hiw from '../data/howItWorks.json'
import { entities, groupMetrics } from '../data/hierarchy'
import FlywheelDiagram from '../components/FlywheelDiagram'

// Which flywheel stage each subsidiary sits in, and the real evidence (already published
// on that subsidiary's own page) that backs it up — nothing here is projected.
const ROLE_MAP = {
  lenix: { tag: 'Data Capture', evidence: 'Builds the software layer between site and strategy. BuiltSync syncs live site data across every project; Pilot Data turns raw field signal into forecasting. 24 sites synced, <400ms latency.' },
  techsphere: { tag: 'Intelligence', evidence: 'Converts operational data into decision-grade intelligence — the digital backbone the rest of the portfolio runs on. 40+ systems integrated, 2.4M data points/day.' },
  durabuild: { tag: 'Field Ops · Data Source', evidence: 'Structural engineering & manpower on active certified sites — the physical operation the data layer describes.' },
  cfm: { tag: 'Field Ops · Data Source', evidence: 'Facility & infrastructure operations, 24/7 coverage — a continuous telemetry surface for the intelligence layer.' },
  'clarity-manufacturing': { tag: 'Field Ops · Data Source', evidence: 'Precision manufacturing manpower — production-line uptime and QA data, a natural predictive-maintenance surface.' },
  'clarity-ec': { tag: 'Field Ops · Distribution', evidence: 'Direct & indirect manpower across multiple countries — the interactive workforce map is the clearest visual proof of operating scale.' },
}

export default function HowItWorks() {
  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-8 xl:px-16"
        >
          <div className="flex items-center gap-4 mb-6 text-azure text-xs tracking-[0.3em] uppercase font-semibold">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            {hiw.kicker}
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] max-w-4xl">
            {hiw.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-concrete text-lg leading-relaxed">{hiw.intro}</p>
        </motion.div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          The Flywheel
        </div>
        <FlywheelDiagram />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {hiw.flywheelStages.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft p-7"
            >
              <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase">{s.role}</span>
              <div className="font-display text-lg text-ink mt-2 mb-3">{s.label}</div>
              <p className="text-concrete text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-pearl">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Where Each Subsidiary Sits
          </div>
          <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white shadow-soft">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-azure-light">
                  <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-concrete font-semibold whitespace-nowrap">Subsidiary</th>
                  <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-concrete font-semibold whitespace-nowrap">Flywheel Role</th>
                  <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-concrete font-semibold">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((e, i) => {
                  const meta = ROLE_MAP[e.slug]
                  return (
                    <motion.tr
                      key={e.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="border-t border-ink/10"
                    >
                      <td className="px-6 py-4 font-display text-sm text-ink whitespace-nowrap">
                        <Link to={`/our-business/${e.slug}`} className="hover:text-azure transition-colors">
                          {e.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-[11px] text-azure bg-azure-light rounded px-2 py-1">
                          {meta?.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-concrete text-sm leading-relaxed">{meta?.evidence}</td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Proof, Not Projection
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {groupMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft p-5 text-center"
            >
              <div className="font-mono text-2xl text-azure">{m.value}{m.suffix}</div>
              <div className="text-concrete text-[10px] tracking-[0.1em] uppercase mt-1 leading-tight">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="border-2 border-azure rounded-2xl p-8 md:p-10 max-w-3xl bg-white shadow-soft"
        >
          <p className="font-display text-xl md:text-2xl text-ink leading-snug">{hiw.closing}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/investor-relations"
            className="inline-flex items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3.5 rounded-full shadow-soft hover:brightness-110 transition-all"
          >
            Investor Relations →
          </Link>
          <Link
            to="/our-business"
            className="inline-flex items-center border border-ink/15 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3.5 rounded-full hover:border-azure hover:text-azure transition-colors"
          >
            Explore Our Business
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
