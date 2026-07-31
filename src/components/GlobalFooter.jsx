import { Link } from 'react-router-dom'
import { parent, entities } from '../data/hierarchy'

const PAGES = [
  { to: '/about', label: 'About' },
  { to: '/our-business', label: 'Our Business' },
  { to: '/hse-compliance', label: 'HSE & Compliance' },
  { to: '/track-record', label: 'Track Record' },
  { to: '/investor-relations', label: 'Investor Relations' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

export default function GlobalFooter() {
  return (
    <footer className="relative bg-navy text-white">
      <div className="max-w-[1680px] mx-auto px-8 xl:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo-clarity-icon.png" alt={parent.name} className="h-9 w-9 object-contain" />
              <span className="font-display text-2xl">{parent.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">{parent.tagline}.</p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-4">Corporate</div>
            <div className="flex flex-col gap-3">
              {PAGES.map((p) => (
                <Link key={p.to} to={p.to} className="text-white/70 hover:text-accent text-sm transition-colors">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-4">Portfolio</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {entities.map((e) => (
                <Link
                  key={e.id}
                  to={`/our-business/${e.slug}`}
                  className="text-white/70 hover:text-accent text-sm transition-colors"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 text-white/50 text-xs tracking-wide">
          <span>© {new Date().getFullYear()} {parent.fullName} — Singapore</span>
          <span className="uppercase tracking-[0.2em]">5 Subsidiaries · 1 Strategic Partner</span>
        </div>
      </div>
    </footer>
  )
}
