import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Full-screen photo viewer for the CSR galleries: arrow keys / buttons to move, Esc to close.
export default function PhotoLightbox({ photos, index, onIndex, onClose }) {
  const photo = photos[index]
  const step = (d) => onIndex((index + d + photos.length) % photos.length)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  })

  if (!photo) return null
  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || 'Event photo'}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-ink shadow-soft-lg flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-ink shadow-soft-lg">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-ink shadow-soft-lg">
            →
          </button>
        </>
      )}
      <figure className="max-w-5xl max-h-full flex flex-col items-center">
        <img src={photo.src} alt={photo.caption || ''} className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-soft-lg object-contain" />
        <figcaption className="mt-4 text-white/90 text-sm text-center">
          {photo.caption && <span className="block">{photo.caption}</span>}
          <span className="block text-white/60 text-xs mt-1 tabular-nums">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  )
}
