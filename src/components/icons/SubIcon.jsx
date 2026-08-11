// Coded geometric line-icon set standing in for the sub-division "abstract UI/texture icons".
// Deliberate choice (see PR context): keeps AI-generation credits reserved for the hero/
// environment renders while still matching the industrial-tech, geometric-line aesthetic.
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  dataFlow: (
    <>
      <path d="M6 12h10M6 24h20M6 36h14" {...stroke} />
      <circle cx="34" cy="12" r="4" {...stroke} />
      <circle cx="30" cy="36" r="4" {...stroke} />
      <path d="M16 12h10M26 24h4" {...stroke} />
    </>
  ),
  hardwareNode: (
    <>
      <rect x="10" y="10" width="28" height="28" rx="2" {...stroke} />
      <circle cx="24" cy="24" r="6" {...stroke} />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6" {...stroke} />
    </>
  ),
  hardHat: (
    <>
      <path d="M8 32c0-10 7-18 16-18s16 8 16 18" {...stroke} />
      <rect x="6" y="32" width="36" height="6" rx="1" {...stroke} />
      <path d="M24 14v-4" {...stroke} />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="24" r="16" {...stroke} />
      <path d="M30 18l-9 6-3 9 9-6 3-9z" {...stroke} />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="24" cy="24" r="14" {...stroke} />
      <circle cx="24" cy="24" r="4" {...stroke} />
      <path d="M24 4v8M24 36v8M4 24h8M36 24h8" {...stroke} />
    </>
  ),
  incubation: (
    <>
      <path d="M24 6v10M16 30a8 8 0 0016 0c0-6-4-8-8-14-4 6-8 8-8 14z" {...stroke} />
      <path d="M14 40h20" {...stroke} />
    </>
  ),
  sync: (
    <>
      <path d="M12 20a12 12 0 0120-6M36 28a12 12 0 01-20 6" {...stroke} />
      <path d="M30 8l2 6-6 2M18 40l-2-6 6-2" {...stroke} />
    </>
  ),
  telemetry: (
    <>
      <path d="M6 34l8-10 6 6 10-14 8 10" {...stroke} />
      <circle cx="14" cy="24" r="2" fill="currentColor" stroke="none" />
      <circle cx="20" cy="30" r="2" fill="currentColor" stroke="none" />
      <circle cx="30" cy="16" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  aviation: (
    <>
      <path d="M24 6l4 14 14 6-14 2-4 14-4-14-14-2 14-6z" {...stroke} />
    </>
  ),
  sterile: (
    <>
      <path d="M24 6l14 6v10c0 10-6 17-14 20-8-3-14-10-14-20V12z" {...stroke} />
      <path d="M17 24l5 5 9-11" {...stroke} />
    </>
  ),
  operatorHMI: (
    <>
      <rect x="6" y="10" width="36" height="22" rx="2" {...stroke} />
      <path d="M14 38h20M24 32v6" {...stroke} />
      <circle cx="16" cy="21" r="2" fill="currentColor" stroke="none" />
      <path d="M22 21h14" {...stroke} />
    </>
  ),
  caliper: (
    <>
      <path d="M6 14h36M6 14v8M42 14v20M12 14v6M18 14v10M24 14v14M30 14v18M36 14v20" {...stroke} />
    </>
  ),
  workforce: (
    <>
      <circle cx="16" cy="14" r="6" {...stroke} />
      <path d="M6 40c0-8 4-14 10-14s10 6 10 14" {...stroke} />
      <circle cx="34" cy="16" r="5" {...stroke} />
      <path d="M26 40c1-7 4-12 8-12s8 5 9 12" {...stroke} />
    </>
  ),
  network: (
    <>
      <circle cx="24" cy="10" r="4" {...stroke} />
      <circle cx="10" cy="34" r="4" {...stroke} />
      <circle cx="38" cy="34" r="4" {...stroke} />
      <path d="M24 14v10M24 24l-11 8M24 24l11 8" {...stroke} />
    </>
  ),
}

export default function SubIcon({ name, className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {icons[name] || icons.crosshair}
    </svg>
  )
}
