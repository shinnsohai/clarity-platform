import { motion } from 'framer-motion'
import SvgWorldMap from './SvgWorldMap'

// Real vector world map with per-country hover — see SvgWorldMap.jsx for the
// projection/matching details. Below the map is a plain always-visible list of the
// same data, since hover doesn't work on touch devices.
export default function WorldDataMap({ label, title, rows, renderTooltip, renderStats, emptyHint }) {
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
        >
          <SvgWorldMap rows={rows} renderTooltip={renderTooltip} />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
          {rows.map((row, i) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl shadow-soft p-4"
            >
              <div className="text-ink text-xs font-semibold mb-2">{row.country}</div>
              {renderStats(row)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
