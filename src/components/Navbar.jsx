import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { parent, entities } from '../data/hierarchy'

const ABOUT_LINKS = [
  { to: '/about/corporate-information', label: 'Corporate Information' },
  { to: '/about/corporate-profile', label: 'Corporate Profile' },
  { to: '/about/leadership-team', label: 'Leadership Team' },
  { to: '/about/founder-advisor', label: 'Founders & Advisors' },
  { to: '/about/mission-vision', label: 'Mission & Vision' },
  { to: '/how-it-works', label: 'How It Works' },
]

function NavItem({ label, to, children }) {
  return (
    <div className="group relative py-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative text-[11px] tracking-[0.15em] uppercase transition-colors ${
            isActive ? 'text-azure' : 'text-ink/70 group-hover:text-ink'
          }`
        }
      >
        {label}
        <span className="absolute left-0 -bottom-1.5 h-[2px] w-full bg-gold scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </NavLink>
      {children}
    </div>
  )
}

function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavItem label={label} to={to}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
            >
              <div className="bg-white rounded-xl shadow-soft-lg border border-ink/5 py-2 min-w-[220px] overflow-hidden">
                {items.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.03 }}
                  >
                    <Link
                      to={item.to}
                      className="block px-5 py-2.5 text-sm text-ink hover:bg-gold-light hover:text-azure hover:pl-6 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </NavItem>
    </div>
  )
}

function MobileSection({ label, to, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-ink/10">
      <div className="flex items-center justify-between">
        <Link
          to={to}
          onClick={onNavigate}
          className="flex-1 py-4 text-sm font-display text-ink tracking-tight"
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={`Toggle ${label} submenu`}
          aria-expanded={open}
          className="p-4 -m-1 text-ink/50"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="block">
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-3 pl-4">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className="py-2.5 text-sm text-ink/60 hover:text-azure transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open, and auto-close on viewport
  // resize back up to desktop so the drawer never gets stuck open behind the scroll lock.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const businessLinks = entities.map((e) => ({ to: `/our-business/${e.slug}`, label: e.name }))
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      {/* Scroll progress indicator — fills as the visitor scrolls down the page */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        className={`max-w-[1680px] mx-auto px-5 sm:px-8 xl:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-24'
        }`}
      >
        <Link to="/" onClick={closeMobile} className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <motion.img
            src="/images/logo-clarity-icon.png"
            alt={parent.name}
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-10 w-10 lg:h-12 lg:w-12' : 'h-12 w-12 lg:h-16 lg:w-16'}`}
          />
          <span
            className={`font-display tracking-tight text-ink transition-all duration-300 ${
              scrolled ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'
            }`}
          >
            {parent.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <Dropdown label="About" to="/about" items={ABOUT_LINKS} />
          <Dropdown label="Our Business" to="/our-business" items={businessLinks} />
          <NavItem label="Strategic Partner" to="/strategic-partner" />
          <NavItem label="Investors" to="/investor-relations" />
          <NavItem label="Careers" to="/careers" />
        </nav>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="hidden md:block lg:block shrink-0">
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center bg-gold text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full shadow-soft hover:bg-gold-dim hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </motion.div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-ink hover:bg-pearl transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-ink/10 shadow-soft-lg max-h-[calc(100vh-4.5rem)] overflow-y-auto"
          >
            <div className="px-5 sm:px-8">
              <MobileSection label="About" to="/about" items={ABOUT_LINKS} onNavigate={closeMobile} />
              <MobileSection label="Our Business" to="/our-business" items={businessLinks} onNavigate={closeMobile} />
              <Link
                to="/strategic-partner"
                onClick={closeMobile}
                className="block py-4 text-sm font-display text-ink tracking-tight border-b border-ink/10"
              >
                Strategic Partner
              </Link>
              <Link
                to="/investor-relations"
                onClick={closeMobile}
                className="block py-4 text-sm font-display text-ink tracking-tight border-b border-ink/10"
              >
                Investors
              </Link>
              <Link
                to="/careers"
                onClick={closeMobile}
                className="block py-4 text-sm font-display text-ink tracking-tight border-b border-ink/10"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                onClick={closeMobile}
                className="mt-5 mb-6 inline-flex w-full items-center justify-center bg-gold text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-4 rounded-full shadow-soft hover:bg-gold-dim hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
