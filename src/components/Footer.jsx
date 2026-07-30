import { branches, parent } from '../data/hierarchy'

export default function Footer() {
  return (
    <footer id="inquiry" className="relative bg-ink border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6 text-concrete text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 bg-accent inline-block" />
              Initiate Inquiry
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-paper leading-[0.95] mb-8">
              DEPLOY WITH
              <br />
              <span className="text-accent">CLARITY.</span>
            </h2>
            <a
              href="mailto:operations@clarityec.com.sg"
              className="inline-flex items-center gap-4 border border-accent text-accent px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-accent hover:text-ink transition-colors"
            >
              operations@clarityec.com.sg
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-4">
            {branches.map((b) => (
              <a
                key={b.id}
                href={`/${b.slug}`}
                className="text-concrete hover:text-accent text-sm tracking-wide transition-colors"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 text-concrete text-xs tracking-wide">
          <span>© {new Date().getFullYear()} {parent.name} — Singapore</span>
          <span className="uppercase tracking-[0.2em]">
            Workforce · Construction · Digital · Facilities · Manufacturing
          </span>
        </div>
      </div>
    </footer>
  )
}
