import { useState } from 'react'
import { motion } from 'framer-motion'
import contact from '../data/contact.json'
import { entities, offices } from '../data/hierarchy'
import PageHero from '../components/PageHero'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', entity: 'General Inquiry', message: '' })
  const [sent, setSent] = useState(false)
  const headquarters = offices.find((o) => o.id === 'sg') || offices[0]

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Clarity Group Inquiry — ${form.entity}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="bg-paper">
      <PageHero size="lg" kicker="Contact" title={<>LET'S TALK<span className="text-azure">.</span></>} />

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-14">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl shadow-soft-lg p-8"
        >
          <h2 className="font-display text-2xl text-ink mb-8">SEND A MESSAGE.</h2>

          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/15 rounded-lg px-4 py-3 mb-6 text-ink focus:outline-none focus:border-azure transition-colors"
          />

          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ink/15 rounded-lg px-4 py-3 mb-6 text-ink focus:outline-none focus:border-azure transition-colors"
          />

          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
            Subsidiary of Interest
          </label>
          <select
            value={form.entity}
            onChange={(e) => setForm({ ...form, entity: e.target.value })}
            className="w-full border border-ink/15 rounded-lg px-4 py-3 mb-6 text-ink focus:outline-none focus:border-azure transition-colors bg-white"
          >
            <option>General Inquiry</option>
            {entities.map((ent) => (
              <option key={ent.id} value={ent.name}>
                {ent.name}
              </option>
            ))}
          </select>

          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-ink/15 rounded-lg px-4 py-3 mb-8 text-ink focus:outline-none focus:border-azure transition-colors"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-azure text-white font-display text-lg py-4 rounded-lg hover:brightness-110 transition-all"
          >
            {sent ? 'MESSAGE PREPARED →' : 'SEND MESSAGE'}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-2xl text-ink mb-8">GLOBAL OFFICES.</h2>
          <div className="rounded-2xl overflow-hidden shadow-soft h-80 mb-8">
            <iframe
              title={`Clarity Group — ${headquarters?.city || 'Singapore'}`}
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(headquarters?.address || headquarters?.city || 'Singapore')}&output=embed`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offices.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className="border-l-2 border-azure pl-4"
              >
                <div className="font-display text-sm text-ink">{o.name}</div>
                <div className="text-concrete text-xs mt-1">{o.city}</div>
                {o.address && <div className="text-concrete/70 text-[11px] mt-1 leading-snug">{o.address}</div>}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-ink/10 flex flex-col gap-2">
            <a href={`mailto:${contact.email}`} className="text-ink font-semibold hover:text-azure transition-colors w-fit">
              {contact.email}
            </a>
            <span className="text-concrete text-sm">{contact.phone}</span>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
