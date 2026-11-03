import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../../data/corporateProfile.json'
import PhotoLightbox from '../../components/csr/PhotoLightbox'
import { csrPath, photoCount } from '../../components/csr/CsrSection'

// /about/corporate-profile/csr/:slug — one affiliated body's event gallery, grouped by event album.
export default function CsrGallery() {
  const { slug } = useParams()
  const partners = profile.csr?.partners || []
  const idx = partners.findIndex((p) => p.slug === slug)
  const partner = partners[idx]
  const [album, setAlbum] = useState('all')
  const [open, setOpen] = useState(null)

  const albums = partner?.albums || []
  const photos = useMemo(
    () =>
      albums
        .filter((a) => album === 'all' || a.id === album)
        .flatMap((a) => (a.photos || []).map((ph) => ({ ...ph, album: a.title }))),
    [albums, album],
  )

  if (!partner) return <Navigate to="/about/corporate-profile#csr" replace />
  const next = partners[(idx + 1) % partners.length]
  const total = photoCount(partner)

  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-azure-light">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-gold/20 blur-3xl" />
        <div className="relative max-w-[1440px] mx-auto px-8 xl:px-16 pt-14 pb-16 grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <div className="md:col-span-2">
            <Link to="/about/corporate-profile#csr" className="text-azure text-xs tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-2 hover:text-gold-dim transition-colors">
              ← Corporate Social Responsibility
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-56 md:w-72 bg-white rounded-3xl shadow-soft-lg border border-ink/10 p-8 flex items-center justify-center"
          >
            <img src={partner.logo} alt={`${partner.name} logo`} className="w-full max-h-32 object-contain" />
          </motion.div>
          <div>
            <h1 className="font-display text-4xl md:text-6xl leading-[0.92] tracking-tightest text-ink">{partner.name}</h1>
            {partner.fullName && <p className="mt-3 text-azure text-xs font-semibold tracking-[0.2em] uppercase">{partner.fullName}</p>}
            <p className="mt-6 max-w-2xl text-azure text-lg leading-relaxed">{partner.description}</p>
            <p className="mt-5 text-concrete text-xs tracking-[0.2em] uppercase">
              {total > 0 ? `${total} photos · ${albums.length} event${albums.length === 1 ? '' : 's'}` : 'Gallery coming soon'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16 min-h-[320px]">
        {albums.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {[{ id: 'all', title: 'All events' }, ...albums].map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAlbum(a.id)}
                className={`text-[11px] font-bold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
                  album === a.id ? 'bg-azure border-azure text-white' : 'border-ink/15 text-ink hover:border-azure hover:text-azure'
                }`}
              >
                {a.title}
                {a.date ? <span className="opacity-60 normal-case tracking-normal font-medium"> · {a.date}</span> : null}
              </button>
            ))}
          </div>
        )}

        {photos.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {photos.map((p, i) => (
              <motion.button
                key={p.src}
                type="button"
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                className="group relative block w-full overflow-hidden rounded-xl bg-pearl break-inside-avoid"
              >
                <img src={p.src} alt={p.caption || p.album} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-3 right-3 text-left text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity truncate">{p.caption || p.album}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="csr-shimmer rounded-xl bg-pearl" style={{ aspectRatio: '4 / 3' }} />
              ))}
            </div>
            <p className="font-display text-xl text-ink">PHOTOS COMING SOON</p>
            <p className="text-azure mt-3 max-w-md mx-auto">Photos from our events with {partner.name} will be shared here.</p>
          </div>
        )}
      </section>

      {partners.length > 1 && (
        <section className="pb-24 max-w-[1440px] mx-auto px-8 xl:px-16">
          <Link to={csrPath(next)} className="group flex items-center justify-between gap-6 bg-pearl border border-ink/10 rounded-2xl p-6 hover:border-gold/60 hover:shadow-soft transition-all">
            <span>
              <span className="block text-concrete text-[10px] tracking-[0.25em] uppercase">Next</span>
              <span className="block font-display text-xl text-ink mt-1">{next.name}</span>
            </span>
            <img src={next.logo} alt="" className="h-12 w-24 object-contain" />
          </Link>
        </section>
      )}

      {open !== null && <PhotoLightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  )
}
