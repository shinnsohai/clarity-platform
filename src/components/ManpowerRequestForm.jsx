import { useState } from 'react'
import contact from '../data/contact.json'
import { accessKeyFor, submitEnquiry, mailtoFallback } from '../utils/formSubmit'

const EMPTY = { company: '', contactPerson: '', email: '', phone: '', workers: '', workType: '', message: '' }

export default function ManpowerRequestForm({ entity }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [trap, setTrap] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const inbox = contact.email

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const subject = `Manpower Solution Request — ${entity.name} — ${form.company || 'New Enquiry'}`
    const fields = {
      Subsidiary: entity.fullName || entity.name,
      Company: form.company,
      'Contact Person': form.contactPerson,
      Email: form.email,
      Phone: form.phone,
      'Workers Needed': form.workers,
      'Work Type': form.workType,
      'Additional Details': form.message || '—',
    }
    const accessKey = accessKeyFor(contact)
    if (!accessKey) {
      // No form service configured yet: hand the visitor a ready-made email instead.
      window.location.href = mailtoFallback(inbox, subject, Object.entries(fields).map(([k, v]) => `${k}: ${v}`))
      setStatus('sent')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry({
        accessKey,
        subject,
        fromName: form.contactPerson,
        replyTo: form.email,
        fields,
        honeypot: trap,
      })
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <section className="py-24 bg-azure-light">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="flex items-center gap-4 mb-4 text-azure text-xs tracking-[0.3em] uppercase font-semibold">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Manpower Solution Request
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-6">
            NEED WORKERS<span className="text-azure">?</span> TELL US.
          </h2>
          <p className="text-concrete text-lg leading-relaxed max-w-md">
            {entity.name} deploys certified manpower on short notice. Submit your requirement and
            our team will respond directly.
          </p>
        </div>

        {status === 'sent' ? (
          <div role="status" className="bg-white rounded-2xl shadow-soft-lg p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-azure-light text-azure flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-ink mb-3">REQUEST RECEIVED.</h3>
            <p className="text-concrete leading-relaxed mb-8">
              Thank you — our team will review your requirement and reply to you directly.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="inline-flex items-center border border-ink/15 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:border-azure hover:text-azure transition-colors"
            >
              Send another request
            </button>
          </div>
        ) : (
        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-soft-lg p-8">
          {/* honeypot: hidden from people, bots tick it */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Company Name
              </label>
              <input
                required
                value={form.company}
                onChange={set('company')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Contact Person
              </label>
              <input
                required
                value={form.contactPerson}
                onChange={set('contactPerson')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set('email')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Phone
              </label>
              <input
                required
                value={form.phone}
                onChange={set('phone')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Workers Needed
              </label>
              <input
                required
                type="number"
                min="1"
                value={form.workers}
                onChange={set('workers')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
                Work Type
              </label>
              <input
                required
                placeholder="e.g. Scaffolding, RE/RTO"
                value={form.workType}
                onChange={set('workType')}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-azure"
              />
            </div>
          </div>

          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink font-bold mb-2">
            Additional Details
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={set('message')}
            className="w-full border border-ink/15 rounded-lg px-4 py-3 mb-6 text-ink focus:outline-none focus:border-azure"
          />

          {status === 'error' && (
            <p role="alert" className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              Sorry, we could not send your request{error ? ` (${error})` : ''}. Please try again, or email us
              directly at{' '}
              <a href={`mailto:${inbox}`} className="underline font-semibold">{inbox}</a>.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-azure text-white font-display text-lg py-4 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-wait"
          >
            {status === 'sending' ? 'SENDING…' : 'SUBMIT REQUEST'}
          </button>
        </form>
        )}
      </div>
    </section>
  )
}
