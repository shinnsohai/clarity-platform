import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { parent } from '../data/hierarchy'

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/our-business', label: 'Our Business' },
  { to: '/hse-compliance', label: 'HSE & Compliance' },
  { to: '/track-record', label: 'Track Record' },
  { to: '/investor-relations', label: 'Investor Relations' },
  { to: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-navy text-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.35)]' : ''
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-8 xl:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/images/logo-clarity-icon.png" alt={parent.name} className="h-8 w-8 object-contain" />
          <span className="font-display text-lg tracking-tight">{parent.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[11px] tracking-[0.15em] uppercase transition-colors ${
                  isActive ? 'text-accent' : 'text-white/75 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center bg-accent text-navy text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 hover:brightness-110 transition-all shrink-0"
        >
          Contact
        </Link>
      </div>
    </header>
  )
}
