import { useState } from 'react'
import contact from '../data/contact.json'

export default function ManpowerRequestForm({ entity }) {
  const [form, setForm] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    workers: '',
    workType: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Manpower Solution Request — ${form.company || 'New Enquiry'}`)
    const body = encodeURIComponent(
      `Company: ${form.company}\nContact Person: ${form.contactPerson}\nEmail: ${form.email}\nPhone: ${form.phone}\nWorkers Needed: ${form.workers}\nWork Type: ${form.workType}\n\n${form.message}`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
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

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-soft-lg p-8">
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

          <button
            type="submit"
            className="w-full bg-azure text-white font-display text-lg py-4 rounded-lg hover:brightness-110 transition-all"
          >
            {sent ? 'REQUEST PREPARED →' : 'SUBMIT REQUEST'}
          </button>
        </form>
      </div>
    </section>
  )
}
