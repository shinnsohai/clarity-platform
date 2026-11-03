import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// "Giving back" section on /about/corporate-profile (content: src/data/corporateProfile.json → csr,
// editable in the CMS). A rolling strip of the affiliated bodies' logos — each one opens that body's
// event gallery — and, underneath, a preview panel that cycles through them: pick one to see its
// event albums and photos (empty for now: the panel shows a placeholder until photos are uploaded).

export const csrPath = (p) => `/about/corporate-profile/csr/${p.slug}`
export const photoCount = (p) => (p.albums || []).reduce((n, a) => n + (a.photos || []).length, 0)
export const allPhotos = (p) =>
  (p.albums || []).flatMap((a) => (a.photos || []).map((ph) => ({ ...ph, album: a.title })))

function CameraIcon({ className = '' }) {
  return (
    <svg className={className} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  )
}

function LogoCard({ partner, index }) {
  const n = photoCount(partner)
  return (
    <Link
      to={csrPath(partner)}
      aria-label={`${partner.name} — event gallery`}
      className="csr-bob group shrink-0 w-[260px] md:w-[300px] bg-white border border-ink/10 rounded-2xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 hover:border-gold/60 transition-all duration-300 p-6"
      style={{ animationDelay: `${(index % 5) * 0.45}s` }}
    >
      <span className="flex items-center justify-center h-24">
        <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-full max-w-full object-contain grayscale-[35%] group-hover:grayscale-0 transition-[filter] duration-300" />
      </span>
      <span className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <span className="text-azure text-[11px] font-bold tracking-[0.15em] uppercase truncate">{partner.name}</span>
        <span className="shrink-0 text-concrete text-[10px] tracking-wide uppercase group-hover:text-gold-dim transition-colors">
          {n > 0 ? `${n} photos` : 'Gallery'} →
        </span>
      </span>
    </Link>
  )
}

function PreviewPanel({ partner }) {
  const [album, setAlbum] = useState('all')
  useEffect(() => setAlbum('all'), [partner.id])
  const albums = partner.albums || []
  const photos = allPhotos(partner).filter((p) => album === 'all' || p.album === album)
  const shown = photos.slice(0, 6)

  return (
    <motion.div
      key={partner.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-8 items-start"
    >
      <div>
        <h3 className="font-display text-2xl text-ink leading-tight">{partner.name}</h3>
        {partner.fullName && <p className="text-azure text-xs font-semibold tracking-[0.15em] uppercase mt-2">{partner.fullName}</p>}
        <p className="text-azure text-base leading-relaxed mt-4">{partner.description}</p>
        <Link
          to={csrPath(partner)}
          className="mt-6 inline-flex items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3.5 rounded-full shadow-soft hover:brightness-110 transition-all"
        >
          Open full gallery →
        </Link>
      </div>

      <div>
        {albums.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {[{ id: 'all', title: 'All events' }, ...albums].map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAlbum(a.id === 'all' ? 'all' : a.title)}
                className={`text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  (a.id === 'all' ? album === 'all' : album === a.title) ? 'bg-azure border-azure text-white' : 'border-ink/15 text-ink hover:border-azure hover:text-azure'
                }`}
              >
                {a.title}
              </button>
            ))}
          </div>
        )}
        {shown.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {shown.map((p, i) => (
              <Link key={p.src} to={csrPath(partner)} className={`group relative overflow-hidden rounded-xl bg-pearl ${i === 0 ? 'col-span-2 row-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '4 / 3' : '1 / 1' }}>
                <img src={p.src} alt={p.caption || ''} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {p.caption && <span className="absolute bottom-2 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity truncate">{p.caption}</span>}
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3" aria-label="Photos coming soon">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`csr-shimmer relative rounded-xl bg-pearl overflow-hidden flex items-center justify-center text-ink/20 ${i === 0 ? 'col-span-2 row-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '4 / 3' : '1 / 1' }}>
                <CameraIcon />
              </div>
            ))}
            <p className="col-span-3 text-concrete text-sm mt-1">Event photos from {partner.name} will appear here soon.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function CsrSection({ csr }) {
  const partners = csr?.partners || []
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [paused, setPaused] = useState(false)

  // rolling strip: enough repeats of the logo set to always overflow the screen, doubled so the loop is seamless
  const half = useMemo(() => Array.from({ length: Math.max(2, Math.ceil(8 / Math.max(partners.length, 1))) }).flatMap(() => partners), [partners])

  useEffect(() => {
    if (!auto || paused || partners.length < 2) return undefined
    const t = setInterval(() => setActive((a) => (a + 1) % partners.length), 6500)
    return () => clearInterval(t)
  }, [auto, paused, partners.length])

  if (partners.length === 0) return null
  const current = partners[Math.min(active, partners.length - 1)]

  return (
    <section className="py-24 bg-pearl overflow-hidden scroll-mt-24" id="csr">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-gold rounded-full inline-block" />
          Corporate Social Responsibility
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-6 max-w-4xl"
        >
          {csr.heading}
          <span className="text-azure">.</span>
        </motion.h2>
        <p className="text-azure text-lg leading-relaxed max-w-3xl mb-14">{csr.intro}</p>
      </div>

      {/* rolling logos */}
      <div className="relative mb-16 group/strip" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-pearl to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-pearl to-transparent z-10 pointer-events-none" />
        <div className="flex gap-6 w-max py-4 animate-[marquee_46s_linear_infinite] group-hover/strip:[animation-play-state:paused] motion-reduce:animate-none">
          {[...half, ...half].map((p, i) => (
            <LogoCard key={`${p.id}-${i}`} partner={p} index={i} />
          ))}
        </div>
      </div>

      {/* preview */}
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="text-concrete text-xs tracking-[0.3em] uppercase">Event photos</span>
          <button
            type="button"
            onClick={() => setAuto((a) => !a)}
            className="text-[11px] font-bold tracking-[0.12em] uppercase text-azure hover:text-gold-dim transition-colors"
          >
            {auto ? '❚❚ Pause auto-play' : '▶ Auto-play'}
          </button>
        </div>
        <div role="tablist" aria-label="Affiliated bodies" className="flex flex-wrap gap-3 mb-8">
          {partners.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => {
                  setActive(i)
                  setAuto(false)
                }}
                className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${on ? 'bg-white border-gold shadow-soft-lg -translate-y-0.5' : 'bg-white/60 border-ink/10 hover:border-azure/40 hover:-translate-y-0.5'}`}
              >
                <img src={p.logo} alt="" className="h-9 w-14 object-contain" />
                <span className="text-azure text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap">{p.name}</span>
                {on && auto && !paused && partners.length > 1 && (
                  <span key={`bar-${active}`} className="csr-progress absolute left-3 right-3 bottom-0 h-0.5 bg-gold rounded-full origin-left" />
                )}
              </button>
            )
          })}
        </div>
        <div className="bg-white border border-ink/10 rounded-3xl shadow-soft p-6 md:p-10">
          <PreviewPanel partner={current} />
        </div>
      </div>
    </section>
  )
}
