import { useEffect, useRef, useState } from 'react'

// "Apply by Email" that works whether or not the visitor has a mail app set up.
// A plain mailto: link silently does nothing on a desktop with no mail handler registered,
// so this offers Gmail, Outlook on the web, the device mail app, and a copy-the-address fallback.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers / blocked clipboard API: fall back to a temporary textarea
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(ta)
    return ok
  }
}

const itemClass =
  'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-ink hover:bg-pearl focus-visible:bg-pearl focus-visible:outline-none transition-colors'

export default function EmailApply({ apply, primary = false }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrap = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!apply.emailList) return null

  const onCopy = async () => {
    const ok = await copyText(apply.emailList)
    setCopied(ok ? 'Copied' : 'Press Ctrl+C to copy')
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex w-full items-center justify-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-4 rounded-md transition-colors ${
          primary
            ? 'bg-azure text-white hover:brightness-110'
            : 'border border-ink/20 text-ink hover:border-azure hover:text-azure'
        }`}
      >
        Apply by Email
        <span aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft-lg"
        >
          <a role="menuitem" href={apply.gmailHref} target="_blank" rel="noopener noreferrer" className={itemClass} onClick={() => setOpen(false)}>
            Open in Gmail <span aria-hidden className="text-concrete">↗</span>
          </a>
          <a role="menuitem" href={apply.outlookHref} target="_blank" rel="noopener noreferrer" className={`${itemClass} border-t border-ink/10`} onClick={() => setOpen(false)}>
            Open in Outlook <span aria-hidden className="text-concrete">↗</span>
          </a>
          <a role="menuitem" href={apply.mailHref} className={`${itemClass} border-t border-ink/10`} onClick={() => setOpen(false)}>
            Use my mail app
          </a>
          <button type="button" role="menuitem" onClick={onCopy} className={`${itemClass} border-t border-ink/10`}>
            <span>Copy email address</span>
            <span aria-live="polite" className="text-azure text-xs font-semibold">{copied || ''}</span>
          </button>
        </div>
      )}
    </div>
  )
}
