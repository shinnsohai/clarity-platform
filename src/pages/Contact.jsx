import { useState } from 'react'
import { motion } from 'framer-motion'
import contact from '../data/contact.json'
import { entities, offices } from '../data/hierarchy'
import PageHero from '../components/PageHero'
import { accessKeyFor, submitEnquiry, mailtoFallback } from '../utils/formSubmit'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', entity: 'General Inquiry', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [trap, setTrap] = useState(false)
  const headquarters = offices.find((o) => o.id === 'sg') || offices[0]

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const subject = `Clarity Group Inquiry — ${form.entity}`
    const fields = { Name: form.name, Email: form.email, 'Subsidiary of Interest': form.entity, Message: form.message }
    const accessKey = accessKeyFor(contact)
    if (!accessKey) {
      window.location.href = mailtoFallback(contact.email, subject, Object.entries(fields).map(([k, v]) => `${k}: ${v}`))
      setStatus('sent')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry({ accessKey, subject, fromName: form.name, replyTo: form.email, fields, honeypot: trap })
      setStatus('sent')
      setForm({ name: '', email: '', entity: 'General Inquiry', message: '' })
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
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
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            checked={trap}
            onChange={(e) => setTrap(e.target.checked)}
            className="hidden"
            aria-hidden="true"
          />

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
              <option key={ent.id} value={ent.fullName}>
                {ent.fullName}
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

          {status === 'sent' && (
            <p role="status" className="mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
              Thank you — your message has been received and our team will reply to you directly.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              Sorry, we could not send your message{error ? ` (${error})` : ''}. Please try again, or email us
              directly at{' '}
              <a href={`mailto:${contact.email}`} className="underline font-semibold">{contact.email}</a>.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-azure text-white font-display text-lg py-4 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-wait"
          >
            {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
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
          {entities.some((e) => e.contact?.phone || e.contact?.email) && (
            <div className="mt-8 pt-8 border-t border-ink/10">
              <div className="font-display text-sm text-ink mb-4">DIRECT LINES.</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {entities
                  .filter((e) => e.contact?.phone || e.contact?.email)
                  .map((e) => (
                    <div key={e.id} className="border-l-2 border-gold pl-4">
                      <div className="font-display text-sm text-ink">{e.fullName}</div>
                      {e.contact.phone && (
                        <a
                          href={`tel:${e.contact.phone.replace(/[^+\d]/g, '')}`}
                          className="block text-concrete text-sm mt-1 hover:text-azure transition-colors w-fit"
                        >
                          {e.contact.phone}
                        </a>
                      )}
                      {e.contact.email && (
                        <a href={`mailto:${e.contact.email}`} className="block text-concrete text-sm hover:text-azure transition-colors w-fit">
                          {e.contact.email}
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
