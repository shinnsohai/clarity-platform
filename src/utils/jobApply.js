import careers from '../data/careers.json'

// "22 Oct 2026" from an ISO date. Parsed as a local date so it never shifts a day across time zones.
export function formatPosted(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const slotsOf = (job) => Number(job.vacancies) || 0

// newest: latest post date first, then most open slots.  slots: most open slots first, then latest post.
// Equal on both → keep the order they appear in the CMS (Array.sort is stable).
export function sortJobs(jobs, mode) {
  const byPosted = (a, b) => (b.posted || '').localeCompare(a.posted || '')
  const bySlots = (a, b) => slotsOf(b) - slotsOf(a)
  return [...jobs].sort(mode === 'slots' ? (a, b) => bySlots(a, b) || byPosted(a, b) : (a, b) => byPosted(a, b) || bySlots(a, b))
}

// Where applications for a job go. Routing is per subsidiary (src/data/careers.json →
// applyRouting, editable in the CMS); anything without its own entry uses "default".
export function getApply(job) {
  const routes = careers.applyRouting || []
  const route = routes.find((r) => r.entity === job.entity) || routes.find((r) => r.entity === 'default') || {}
  const emails = (route.emails || []).filter(Boolean)
  const phone = route.phone || ''
  const subject = `Application: ${job.title}${job.client ? ` – ${job.client}` : ''}`
  // WhatsApp opens a chat with the number and a pre-filled message naming the role, so the
  // recruiter knows what the applicant is replying to. wa.me wants digits only, no "+".
  const waDigits = (route.whatsapp || '').replace(/\D/g, '')
  const waText = `Hi, I would like to apply for ${job.title}${job.client ? ` (${job.client})` : ''}. I saw it on www.clarity.com.sg/careers.`
  return {
    emails,
    phone,
    whatsapp: route.whatsapp || '',
    telHref: phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '',
    mailHref: emails.length ? `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}` : '',
    waHref: waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}` : '',
  }
}
