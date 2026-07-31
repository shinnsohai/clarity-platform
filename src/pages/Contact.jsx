import { useState } from 'react'
import contact from '../data/contact.json'
import { entities } from '../data/hierarchy'

function DarkMap() {
  return (
    <div className="relative w-full aspect-[4/3] bg-ink border-2 border-navy overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#FFD400" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {contact.offices.map((o) => (
        <div
          key={o.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${o.x}%`, top: `${o.y}%` }}
        >
          <span className="block w-3 h-3 bg-accent rounded-full animate-pulse" />
          <span className="absolute left-1/2 -translate-x-1/2 top-5 w-max text-[10px] tracking-[0.1em] uppercase text-white bg-navy px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {o.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', entity: 'General Inquiry', message: '' })
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`CEC Inquiry — ${form.entity}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="bg-white">
      <section className="relative bg-ink py-28">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <div className="flex items-center gap-4 mb-6 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Contact
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] max-w-4xl">
            INITIATE CONTACT<span className="text-accent">.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <form onSubmit={onSubmit} className="border-4 border-navy p-8">
          <h2 className="font-display text-2xl text-navy mb-8">SEND A DIRECT MESSAGE.</h2>

          <label className="block text-[11px] tracking-[0.2em] uppercase text-navy font-bold mb-2">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-2 border-navy px-4 py-3 mb-6 text-navy focus:outline-none focus:border-accent"
          />

          <label className="block text-[11px] tracking-[0.2em] uppercase text-navy font-bold mb-2">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-2 border-navy px-4 py-3 mb-6 text-navy focus:outline-none focus:border-accent"
          />

          <label className="block text-[11px] tracking-[0.2em] uppercase text-navy font-bold mb-2">
            Entity of Interest
          </label>
          <select
            value={form.entity}
            onChange={(e) => setForm({ ...form, entity: e.target.value })}
            className="w-full border-2 border-navy px-4 py-3 mb-6 text-navy focus:outline-none focus:border-accent bg-white"
          >
            <option>General Inquiry</option>
            {entities.map((ent) => (
              <option key={ent.id} value={ent.name}>
                {ent.name}
              </option>
            ))}
          </select>

          <label className="block text-[11px] tracking-[0.2em] uppercase text-navy font-bold mb-2">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border-2 border-navy px-4 py-3 mb-8 text-navy focus:outline-none focus:border-accent"
          />

          <button
            type="submit"
            className="w-full bg-accent text-navy font-display text-lg py-4 hover:brightness-110 transition-all"
          >
            {sent ? 'MESSAGE PREPARED →' : 'SEND MESSAGE'}
          </button>
        </form>

        <div>
          <h2 className="font-display text-2xl text-navy mb-8">GLOBAL COORDINATES.</h2>
          <DarkMap />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contact.offices.map((o) => (
              <div key={o.id} className="border-l-2 border-accent pl-4">
                <div className="font-display text-sm text-navy">{o.name}</div>
                <div className="text-concrete text-xs mt-1">{o.city}</div>
                <div className="text-concrete text-[11px] font-mono mt-1">{o.coords}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-navy/15 flex flex-col gap-2">
            <a href={`mailto:${contact.email}`} className="text-navy font-semibold hover:text-accent-dim transition-colors">
              {contact.email}
            </a>
            <span className="text-concrete text-sm">{contact.phone}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
