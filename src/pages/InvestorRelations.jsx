import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ir from '../data/investorRelations.json'
import { groupMetrics } from '../data/hierarchy'
import contact from '../data/contact.json'
import FlywheelDiagram from '../components/FlywheelDiagram'
import PageHero from '../components/PageHero'

const hasFundraiseDetails = Boolean(ir.fundraise?.stage || ir.fundraise?.targetRaise || ir.fundraise?.useOfFunds?.length)

export default function InvestorRelations() {
  return (
    <div className="bg-paper">
      <PageHero kicker={ir.kicker} title={ir.headline} description={ir.thesis} />

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
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

        <div className="flex items-center gap-4 mb-10 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Why This Structure Wins
        </div>
        <FlywheelDiagram />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-2xl text-concrete text-base leading-relaxed"
        >
          {ir.whyNow}
        </motion.p>
        <Link
          to="/how-it-works"
          className="mt-4 inline-flex items-center gap-2 text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
        >
          Read the full flywheel breakdown <span aria-hidden>→</span>
        </Link>
      </section>

      <section className="py-20 bg-pearl">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-ink/10 rounded-2xl shadow-soft p-8"
          >
            <div className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-4">Fundraise</div>
            {hasFundraiseDetails ? (
              <div>
                {ir.fundraise.stage && <p className="text-ink font-display text-xl mb-2">{ir.fundraise.stage}</p>}
                {ir.fundraise.targetRaise && <p className="text-concrete mb-4">Target: {ir.fundraise.targetRaise}</p>}
                {ir.fundraise.useOfFunds?.length > 0 && (
                  <ul className="text-concrete text-sm leading-relaxed list-disc pl-5 space-y-1">
                    {ir.fundraise.useOfFunds.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p className="text-concrete leading-relaxed">
                Fundraise stage, target, and use-of-funds are not yet published on this page.
                {' '}{ir.dataRoomNote}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-white border border-ink/10 rounded-2xl shadow-soft p-8"
          >
            <div className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-4">Leadership</div>
            <p className="text-concrete leading-relaxed mb-5">
              Meet the team running certified operations across the portfolio and building the
              data infrastructure underneath it.
            </p>
            <Link
              to="/about/leadership-team"
              className="inline-flex items-center gap-2 text-azure text-xs font-semibold tracking-[0.15em] uppercase hover:text-gold-dim transition-colors"
            >
              View Leadership Team <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="border-2 border-azure rounded-2xl p-8 md:p-10 max-w-3xl bg-white shadow-soft flex flex-col gap-5"
        >
          <p className="font-display text-xl md:text-2xl text-ink leading-snug">
            Request the data room — financials, cap table, and technology roadmap.
          </p>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent('Investor Inquiry — Clarity Group')}`}
            className="inline-flex w-fit items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3.5 rounded-full shadow-soft hover:brightness-110 transition-all"
          >
            {contact.email}
          </a>
        </motion.div>
      </section>
    </div>
  )
}
