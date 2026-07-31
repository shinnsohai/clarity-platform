import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { parent, entities } from '../data/hierarchy'

const ABOUT_LINKS = [
  { to: '/about/corporate-information', label: 'Corporate Information' },
  { to: '/about/corporate-profile', label: 'Corporate Profile' },
  { to: '/about/leadership-team', label: 'Leadership Team' },
  { to: '/about/founder-advisor', label: 'Founders & Advisors' },
  { to: '/about/mission-vision', label: 'Mission & Vision' },
]

function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-[11px] tracking-[0.15em] uppercase transition-colors ${
            isActive ? 'text-azure' : 'text-ink/70 hover:text-ink'
          }`
        }
      >
        {label}
      </NavLink>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
          <div className="bg-white rounded-xl shadow-soft-lg border border-ink/5 py-2 min-w-[220px]">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-5 py-2.5 text-sm text-ink hover:bg-pearl hover:text-azure transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const businessLinks = entities.map((e) => ({ to: `/our-business/${e.slug}`, label: e.name }))

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-8 xl:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/images/logo-clarity-icon.png" alt={parent.name} className="h-8 w-8 object-contain" />
          <span className="font-display text-lg tracking-tight text-ink">{parent.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Dropdown label="About" to="/about" items={ABOUT_LINKS} />
          <Dropdown label="Our Business" to="/our-business" items={businessLinks} />
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `text-[11px] tracking-[0.15em] uppercase transition-colors ${
                isActive ? 'text-azure' : 'text-ink/70 hover:text-ink'
              }`
            }
          >
            Careers
          </NavLink>
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center bg-azure text-white text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all shrink-0"
        >
          Contact
        </Link>
      </div>
    </header>
  )
}
