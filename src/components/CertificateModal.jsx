import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Pop-up viewer for an accreditation's certificate files (src/data/corporateProfile.json →
// accreditations[].certificates). One file shows straight away; several show as tabs.
// Every file can be downloaded or opened in a new tab. The PDF preview is desktop-only —
// phone browsers can't embed PDFs, so there the buttons carry it.
// Entries the CMS left without a PDF are ignored; a missing label falls back to a number.
export const certsOf = (a) =>
  (a?.certificates ?? [])
    .filter((c) => c?.file)
    .map((c, i) => ({ ...c, label: c.label || `Certificate ${i + 1}` }))

export default function CertificateModal({ accreditation, onClose }) {
  const certs = certsOf(accreditation)
  const [active, setActive] = useState(0)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!accreditation) return
    setActive(0)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [accreditation, onClose])

  const cert = certs[active]

  return createPortal(
    <AnimatePresence>
      {accreditation && cert && (
        <motion.div
          key="cert-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${accreditation.code} certificate`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="bg-white rounded-2xl shadow-soft-lg w-full max-w-4xl max-h-full flex flex-col overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <div className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-1">Certificate</div>
                <div className="font-display text-xl text-ink leading-tight">{accreditation.code}</div>
                <div className="text-concrete text-xs tracking-[0.12em] uppercase mt-1">{accreditation.name}</div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 w-9 h-9 rounded-full border border-ink/15 text-ink hover:border-azure hover:text-azure transition-colors flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {certs.length > 1 && (
              <div className="flex flex-wrap gap-2 px-6 pb-4" role="tablist">
                {certs.map((c, i) => (
                  <button
                    key={c.file}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full border transition-colors ${
                      i === active
                        ? 'bg-azure border-azure text-white'
                        : 'border-ink/15 text-ink hover:border-azure hover:text-azure'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            <div className="hidden md:block flex-1 min-h-0 px-6">
              <iframe
                key={cert.file}
                src={`${cert.file}#view=FitH&toolbar=0`}
                title={cert.label}
                className="w-full h-[62vh] rounded-lg border border-ink/10 bg-pearl"
              />
            </div>
            <p className="md:hidden px-6 pb-2 text-concrete text-sm">
              {cert.label} — open or download the certificate below.
            </p>

            <div className="flex flex-wrap items-center gap-3 px-6 py-5">
              <a
                href={cert.file}
                download
                className="inline-flex items-center gap-2 bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full shadow-soft hover:brightness-110 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 1v8M3.5 6L7 9.5 10.5 6M2 12.5h10" />
                </svg>
                Download PDF
              </a>
              <a
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-ink/15 text-ink text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:border-azure hover:text-azure transition-colors"
              >
                Open in new tab
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
