// Abstract geometric identity marks stand in for leadership photography — a deliberate
// design choice (no fabricated portraits of real or fictitious named individuals).
const variants = [
  { d: 'M32 10a14 14 0 1 1 0 28 14 14 0 0 1 0-28z', accentD: 'M8 78c0-14 10-24 24-24s24 10 24 24' },
  { d: 'M32 10l14 14-14 14-14-14z', accentD: 'M8 78c2-16 12-26 24-26s22 10 24 26' },
  { d: 'M18 10h28v28H18z', accentD: 'M8 78c0-15 11-25 24-25s24 10 24 25' },
  { d: 'M32 8l16 24-16 24-16-24z', accentD: 'M8 78c1-16 11-26 24-26s23 10 24 26' },
  { d: 'M32 10a14 14 0 1 1-0.01 0z', accentD: 'M6 78c3-17 13-27 26-27s23 10 26 27' },
  { d: 'M18 12l28 0-8 26 8 24-28 0 8-24z', accentD: 'M8 78c0-15 11-25 24-25s24 10 24 25' },
]

export default function LeadershipAvatar({ seed = 0, className = 'w-full h-full' }) {
  const v = variants[seed % variants.length]
  return (
    <svg viewBox="0 0 64 88" className={className} aria-hidden="true">
      <path d={v.accentD} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d={v.d} fill="currentColor" />
    </svg>
  )
}
