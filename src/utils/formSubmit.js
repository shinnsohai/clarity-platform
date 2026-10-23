// Sends an enquiry through Web3Forms (https://web3forms.com) — the access key is tied to the
// inbox that receives the mail and is safe to ship in the page. Keys live in the CMS:
// Contact Content → Form Access Key. One key, one inbox (admin@clarity.com.sg) for every form.
// With no key configured yet, `configured` is false and the forms fall back to a mailto: draft.
const ENDPOINT = 'https://api.web3forms.com/submit'

export const accessKeyFor = (contact) => (contact?.formAccessKey || '').trim()

// fields: { label: value } shown in the email body, in order.
export async function submitEnquiry({ accessKey, subject, fromName, replyTo, fields, honeypot }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: fromName,
      replyto: replyTo,
      botcheck: honeypot ? 'on' : '',
      ...fields,
    }),
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON error page */
  }
  if (!res.ok || !data?.success) throw new Error(data?.message || `Request failed (${res.status})`)
  return data
}

export const mailtoFallback = (to, subject, lines) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
