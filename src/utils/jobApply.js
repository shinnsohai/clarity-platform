import careers from '../data/careers.json'

// Where applications for a job go. Routing is per subsidiary (src/data/careers.json →
// applyRouting, editable in the CMS); anything without its own entry uses "default".
export function getApply(job) {
  const routes = careers.applyRouting || []
  const route = routes.find((r) => r.entity === job.entity) || routes.find((r) => r.entity === 'default') || {}
  const emails = (route.emails || []).filter(Boolean)
  const phone = route.phone || ''
  const subject = `Application: ${job.title}${job.client ? ` – ${job.client}` : ''}`
  return {
    emails,
    phone,
    telHref: phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '',
    mailHref: emails.length ? `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}` : '',
  }
}
