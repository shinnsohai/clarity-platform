function StoreButton({ href, label, sub }) {
  const enabled = Boolean(href)
  const Tag = enabled ? 'a' : 'div'
  return (
    <Tag
      {...(enabled ? { href, target: '_blank', rel: 'noreferrer' } : {})}
      className={`flex items-center gap-3 rounded-xl border px-6 py-4 transition-colors ${
        enabled
          ? 'border-ink/15 bg-white hover:border-azure cursor-pointer'
          : 'border-ink/10 bg-pearl cursor-not-allowed opacity-60'
      }`}
    >
      <div>
        <div className="text-[10px] tracking-[0.15em] uppercase text-concrete">{sub}</div>
        <div className="font-display text-base text-ink">{enabled ? label : `${label} — Coming Soon`}</div>
      </div>
    </Tag>
  )
}

export default function AppLinksPanel({ entity }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="flex items-center gap-4 mb-4 text-azure text-xs tracking-[0.3em] uppercase font-semibold">
            <span className="w-2 h-2 bg-azure rounded-full inline-block" />
            Get The App
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95] mb-8">
            {entity.name.toUpperCase()}<span className="text-azure">.</span> ON THE GO.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StoreButton href={entity.appStoreUrl} sub="Download on the" label="App Store" />
            <StoreButton href={entity.playStoreUrl} sub="Get it on" label="Google Play" />
            <StoreButton href={entity.apkUrl} sub="Direct Download" label="APK" />
          </div>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden shadow-soft-lg bg-pearl flex items-center justify-center">
          {entity.youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${entity.youtubeId}`}
              title={`${entity.name} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center px-8">
              <span className="text-azure text-xs tracking-[0.3em] uppercase font-semibold">
                Demo Video Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
