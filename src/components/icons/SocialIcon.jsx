// Hand-coded, simplified line-icon set for social platforms — matches the geometric
// line-icon language already established in SubIcon.jsx (not a trace of any official
// logo file, just a minimal recognizable glyph per platform).
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" {...stroke} />
      <circle cx="8" cy="8.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8 11v6" {...stroke} />
      <path d="M12.5 17v-3.5c0-1.4 1-2.2 2.2-2.2s1.8.9 1.8 2.3V17" {...stroke} />
      <path d="M12.5 11v6" {...stroke} />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M14 8.5h-1.3c-1 0-1.7.7-1.7 1.8V12M9.7 12h4.3M12.7 12v6.3" {...stroke} />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.3 20.8l4.3-1.1A8.8 8.8 0 1 0 12 3.2z" {...stroke} />
      <path d="M9.2 8.6c-.3.4-.5 1-.3 1.7.5 1.6 1.9 3.2 3.6 4 .7.3 1.4.2 1.9-.3l.4-.5-1.6-1-.6.4c-.9-.4-1.7-1.2-2.1-2.1l.4-.6-.8-1.7z" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" {...stroke} />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function SocialIcon({ name, className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name] || null}
    </svg>
  )
}
