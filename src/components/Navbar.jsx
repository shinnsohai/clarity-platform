import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { parent, entities } from '../data/hierarchy'

const ABOUT_LINKS = [
  { to: '/about/corporate-information', label: 'Corporate Information' },
  { to: '/about/corporate-profile', label: 'Corporate Profile' },
  { to: '/about/leadership-team', label: 'Leadership Team' },
  { to: '/about/founder-advisor', label: 'Founders & Advisors' },
  { to: '/about/mission-vision', label: 'Mission & Vision' },
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const businessLinks = entities.map((e) => ({ to: `/our-business/${e.slug}`, label: e.name }))

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
        className={`max-w-[1680px] mx-auto px-8 xl:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-20' : 'h-24'
        }`}
      >
        <Link to="/" className="flex items-center gap-3.5 shrink-0">
          <motion.img
            src="/images/logo-clarity-icon.png"
            alt={parent.name}
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-12 w-12' : 'h-16 w-16'}`}
          />
          <span
            className={`font-display tracking-tight text-ink transition-all duration-300 ${
              scrolled ? 'text-lg' : 'text-xl'
            }`}
          >
            {parent.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <Dropdown label="About" to="/about" items={ABOUT_LINKS} />
          <Dropdown label="Our Business" to="/our-business" items={businessLinks} />
          <NavItem label="Careers" to="/careers" />
        </nav>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="hidden md:block shrink-0">
          <Link
            to="/contact"
            className="inline-flex items-center bg-gold text-azure text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-full shadow-soft hover:bg-gold-dim hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </header>
  )
}
