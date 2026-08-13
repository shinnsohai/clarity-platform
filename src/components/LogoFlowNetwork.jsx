import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Ported from the user's standalone prototype (11. Logo Animation/app.js + index.html):
// a central subsidiary logo with partner-company badges continuously flowing inward
// along circuit-style traces, absorbed into the hub with a ripple + particle burst.
// Geometry (viewBox 1344x455, all path/dot coordinates, origin badge positions) is
// ported verbatim from the prototype — it's a reusable stage, not brand-specific, so
// the same 8 slots work for every subsidiary as their own partner logos are added.
// Per-brand accent colors from the original were replaced with Clarity navy/gold only,
// to keep the widget on-theme. The prototype's standalone control panel (play/pause,
// speed slider, effect toggles, trigger chips) was dropped — this runs ambiently.

const VIEW_W = 1344
const VIEW_H = 455

const SLOTS = [
  {
    id: 'slot-1',
    d: 'M0 0H182.257C184.695 0 187.074 0.742084 189.079 2.12753L326.921 97.3725C328.926 98.7579 331.305 99.5 333.743 99.5H470.285C473.316 99.5 476.234 100.647 478.454 102.71L570.546 188.29C572.766 190.353 575.684 191.5 578.715 191.5H673',
    origin: { left: '2%', top: '4%' },
  },
  {
    id: 'slot-2',
    d: 'M0 92H148.257C150.695 92 153.074 92.7421 155.079 94.1275L292.921 189.372C294.926 190.758 297.305 191.5 299.743 191.5H673',
    origin: { left: '2%', top: '22%' },
  },
  {
    id: 'slot-3',
    d: 'M0 253.5H356.77C360.271 253.5 363.597 251.972 365.876 249.316L411.909 195.684C414.188 193.028 417.514 191.5 421.014 191.5H673',
    origin: { left: '2%', top: '56%' },
  },
  {
    id: 'slot-4',
    d: 'M0 313.5H394.598C397.051 313.5 399.444 312.749 401.457 311.347L537.409 216.653C539.421 215.251 541.815 214.5 544.267 214.5H673',
    origin: { left: '2%', top: '72%' },
  },
  {
    id: 'slot-5',
    d: 'M1344 70H952.733C950.302 70 947.928 70.7384 945.926 72.1175L809.074 166.382C807.072 167.762 804.698 168.5 802.267 168.5H673',
    origin: { right: '2%', top: '15%' },
  },
  {
    id: 'slot-6',
    d: 'M1344 128H989.231C985.895 128 982.71 129.388 980.44 131.832L928.56 187.668C926.29 190.112 923.105 191.5 919.769 191.5H673',
    origin: { right: '2%', top: '29%' },
  },
  {
    id: 'slot-7',
    d: 'M1344 290.5H1199.37C1196.96 290.5 1194.61 289.773 1192.61 288.414L1053.56 193.586C1051.57 192.227 1049.21 191.5 1046.8 191.5H673',
    origin: { right: '2%', top: '64%' },
  },
  {
    id: 'slot-8',
    d: 'M1344 382.5H1164.26C1161.81 382.5 1159.42 381.751 1157.41 380.354L1022.59 286.646C1020.58 285.249 1018.19 284.5 1015.74 284.5H877.788C874.714 284.5 871.757 283.32 869.527 281.204L778.473 194.796C776.243 192.68 773.286 191.5 770.212 191.5H673',
    origin: { right: '2%', top: '84%' },
  },
]

// Ambient PCB-texture via dots — decorative only, ported verbatim from the prototype.
const CIRCUIT_DOTS = [
  [658, 83], [106, 85], [973, 63], [684, 83], [333, 185], [1063, 121], [393, 93],
  [263, 47], [1123, 63], [152, 247], [852, 185], [292, 247], [1102, 220], [480, 185],
  [1190, 121], [461, 262], [1211, 284], [151, 307], [1102, 335], [1256, 375],
]

const NAVY = '#1B224E'
const GOLD = '#F29C21'

function PlaceholderGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  )
}

export default function LogoFlowNetwork({ entity }) {
  const slotData = (entity.connectedCompanies || []).slice(0, SLOTS.length)
  const populated = slotData.filter((c) => c?.logo).length

  const stageRef = useRef(null)
  const svgRef = useRef(null)
  const logosContainerRef = useRef(null)
  const hubInnerRef = useRef(null)
  const rippleRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (populated === 0) return undefined // nothing real to animate — static pending state only

    const svg = svgRef.current
    const container = logosContainerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let cancelled = false
    const timeouts = []
    let rafParticles = null

    // Particle system (energy trail + absorption burst)
    let pulseBeads = []
    let burstParticles = []

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function getPathPointAtRatio(pathEl, ratio) {
      const totalLength = pathEl.getTotalLength()
      const point = pathEl.getPointAtLength(ratio * totalLength)
      const bounds = svg.getBoundingClientRect()
      return { x: (point.x / VIEW_W) * bounds.width, y: (point.y / VIEW_H) * bounds.height }
    }

    function triggerAbsorption() {
      const ripple = rippleRef.current
      const hubInner = hubInnerRef.current
      if (ripple) {
        ripple.classList.remove('lfn-ripple-active')
        // eslint-disable-next-line no-unused-expressions
        ripple.offsetWidth
        ripple.classList.add('lfn-ripple-active')
      }
      if (hubInner) {
        hubInner.style.transform = 'scale(1.08)'
        const t = setTimeout(() => {
          if (hubInner) hubInner.style.transform = 'scale(1)'
        }, 150)
        timeouts.push(t)
      }

      const bounds = svg.getBoundingClientRect()
      const cx = (673 / VIEW_W) * bounds.width
      const cy = (191.5 / VIEW_H) * bounds.height
      const n = 16
      for (let i = 0; i < n; i++) {
        const angle = ((Math.PI * 2) / n) * i + Math.random() * 0.2
        const speed = Math.random() * 3.6 + 1.8
        burstParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.2 + 1.6,
          color: i % 2 === 0 ? GOLD : NAVY,
          life: 1,
        })
      }
    }

    function spawnMovingLogo(slot, company) {
      if (cancelled) return
      const pathEl = svg.querySelector(`[data-slot="${slot.id}"]`)
      if (!pathEl) return

      const el = document.createElement('div')
      el.className = 'lfn-moving-item'
      const img = document.createElement('img')
      img.src = company.logo
      img.alt = company.name || ''
      el.appendChild(img)
      container.appendChild(el)

      const baseDuration = 4.6 + Math.random() * 1.8
      const start = performance.now()

      function step(now) {
        if (cancelled) {
          el.remove()
          return
        }
        const elapsed = (now - start) / 1000
        const progress = elapsed / baseDuration

        if (progress >= 1) {
          triggerAbsorption()
          el.remove()
          return
        }

        const eased = Math.pow(progress, 1.25)
        const pos = getPathPointAtRatio(pathEl, eased)

        let scale = 1
        let opacity = 1
        if (progress > 0.82) {
          const k = (1 - progress) / 0.18
          scale = Math.max(0, k)
          opacity = k
        } else if (progress < 0.08) {
          opacity = progress / 0.08
          scale = Math.min(1, progress / 0.08)
        }

        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`
        el.style.opacity = String(opacity)

        if (Math.random() < 0.3) {
          pulseBeads.push({
            x: pos.x,
            y: pos.y,
            radius: Math.random() * 2.6 + 1,
            color: Math.random() > 0.5 ? GOLD : NAVY,
            alpha: opacity * 0.7,
            life: 0.4,
          })
        }

        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    function renderParticles() {
      if (cancelled) return
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      for (let i = pulseBeads.length - 1; i >= 0; i--) {
        const p = pulseBeads[i]
        p.life -= 0.035
        p.alpha = Math.max(0, p.life)
        if (p.life <= 0) {
          pulseBeads.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const p = burstParticles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.035
        if (p.life <= 0) {
          burstParticles.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafParticles = requestAnimationFrame(renderParticles)
    }
    rafParticles = requestAnimationFrame(renderParticles)

    const activeSlots = SLOTS.map((slot, i) => ({ slot, company: slotData[i] })).filter((s) => s.company?.logo)

    // Staggered initial launch, then a continuous ambient loop. Spawning (not the
    // animation itself) is skipped while the tab is backgrounded — requestAnimationFrame
    // already pauses automatically, but setTimeout doesn't, so without this a
    // long-backgrounded tab would queue up a pile of items that all "arrive" in one
    // burst the moment the tab regains focus.
    const initial = setTimeout(() => {
      activeSlots.forEach(({ slot, company }, i) => {
        const t = setTimeout(() => {
          if (!document.hidden) spawnMovingLogo(slot, company)
        }, i * 500)
        timeouts.push(t)
      })
      let idx = 0
      function scheduleNext() {
        if (cancelled) return
        if (!document.hidden) {
          const { slot, company } = activeSlots[idx % activeSlots.length]
          spawnMovingLogo(slot, company)
          idx++
        }
        const t = setTimeout(scheduleNext, 1300 + Math.random() * 900)
        timeouts.push(t)
      }
      const t = setTimeout(scheduleNext, 1500)
      timeouts.push(t)
    }, 400)
    timeouts.push(initial)

    // Hover-highlight + click-to-send on real origin badges.
    const badgeEls = stageRef.current.querySelectorAll('[data-badge-slot]')
    const listeners = []
    badgeEls.forEach((badgeEl) => {
      const slotId = badgeEl.getAttribute('data-badge-slot')
      const slot = SLOTS.find((s) => s.id === slotId)
      const company = slotData[SLOTS.indexOf(slot)]
      if (!company?.logo) return
      const pathEl = svg.querySelector(`[data-slot="${slotId}"]`)
      const onEnter = () => pathEl?.classList.add('lfn-line-active')
      const onLeave = () => pathEl?.classList.remove('lfn-line-active')
      const onClick = () => spawnMovingLogo(slot, company)
      badgeEl.addEventListener('mouseenter', onEnter)
      badgeEl.addEventListener('mouseleave', onLeave)
      badgeEl.addEventListener('click', onClick)
      listeners.push({ badgeEl, onEnter, onLeave, onClick })
    })

    return () => {
      cancelled = true
      window.removeEventListener('resize', resizeCanvas)
      if (rafParticles) cancelAnimationFrame(rafParticles)
      timeouts.forEach(clearTimeout)
      listeners.forEach(({ badgeEl, onEnter, onLeave, onClick }) => {
        badgeEl.removeEventListener('mouseenter', onEnter)
        badgeEl.removeEventListener('mouseleave', onLeave)
        badgeEl.removeEventListener('click', onClick)
      })
      if (container) container.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity.slug])

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <style>{`
        .lfn-moving-item {
          position: absolute; top: 0; left: 0;
          width: 40px; height: 40px; border-radius: 9999px;
          background: #fff; border: 1.8px solid ${GOLD};
          box-shadow: 0 4px 15px rgba(242,156,33,0.25);
          display: flex; align-items: center; justify-content: center;
          padding: 5px; will-change: transform, opacity; pointer-events: none;
        }
        .lfn-moving-item img { width: 100%; height: 100%; object-fit: contain; }
        .lfn-ripple { position: absolute; inset: 0; border-radius: 20px; border: 2.5px solid ${GOLD}; opacity: 0; pointer-events: none; }
        .lfn-ripple-active { animation: lfnRipple 0.6s cubic-bezier(0,0.2,0.8,1) forwards; }
        @keyframes lfnRipple { 0% { transform: scale(1); opacity: 0.9; } 100% { transform: scale(2.1); opacity: 0; } }
        .lfn-circuit-path { transition: stroke 0.3s ease, stroke-width 0.3s ease; }
        .lfn-circuit-path.lfn-line-active { stroke: ${GOLD} !important; stroke-width: 2.4px; }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-gold rounded-full inline-block" />
            Our Network
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-[0.95]">
            COMPANIES WORKING WITH<span className="text-azure"> {entity.name.toUpperCase()}.</span>
          </h2>
        </motion.div>

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[1344/455] min-h-[300px] bg-white rounded-3xl border border-ink/10 shadow-soft-lg overflow-hidden"
        >
          {/* Particle canvas overlay */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />

          {/* Circuit trace layer */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 w-full h-full z-[1]"
            preserveAspectRatio="none"
          >
            <g>
              {SLOTS.map((slot, i) => (
                <path
                  key={slot.id}
                  data-slot={slot.id}
                  d={slot.d}
                  fill="none"
                  stroke="#DFE4EC"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  className="lfn-circuit-path"
                  opacity={slotData[i]?.logo ? 1 : 0.5}
                />
              ))}
            </g>
            <g fill="#FFFFFF" stroke="#DFE4EC" strokeWidth={1.5}>
              {CIRCUIT_DOTS.map(([x, y], i) => (
                <rect key={i} x={x} y={y} width={7} height={7} rx={1.5} />
              ))}
            </g>
          </svg>

          {/* Moving logo badges spawn here imperatively */}
          <div ref={logosContainerRef} className="absolute inset-0 z-[8] pointer-events-none" />

          {/* Origin badges */}
          <div className="absolute inset-0 z-[5]">
            {SLOTS.map((slot, i) => {
              const company = slotData[i]
              const live = Boolean(company?.logo)
              return (
                <div
                  key={slot.id}
                  data-badge-slot={slot.id}
                  style={slot.origin}
                  className={`group absolute -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-soft transition-transform duration-300 ${
                    live ? 'border border-ink/10 cursor-pointer hover:scale-[1.16] hover:border-gold hover:shadow-soft-lg' : 'border border-dashed border-ink/15'
                  }`}
                >
                  {live ? (
                    <img src={company.logo} alt={company.name || ''} className="w-full h-full object-contain rounded-full" />
                  ) : (
                    <span className="text-ink/25">
                      <PlaceholderGlyph />
                    </span>
                  )}
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-azure-dim px-2 py-1 text-[9px] tracking-[0.1em] uppercase text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
                    {live ? company.name : 'Logo Pending'}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Central hub */}
          <div
            className="absolute z-10 left-1/2 -translate-x-1/2"
            style={{ top: '42%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-10px] rounded-[28px]"
                style={{ background: `radial-gradient(circle, rgba(242,156,33,0.5) 0%, rgba(27,34,78,0.25) 55%, transparent 75%)` }}
              />
              <div ref={rippleRef} className="lfn-ripple" />
              <div
                ref={hubInnerRef}
                className="relative w-full h-full bg-white rounded-2xl border-[3px] border-gold shadow-soft-lg flex items-center justify-center p-2.5"
                style={{ transition: 'transform 0.15s cubic-bezier(0.175,0.885,0.32,1.275)' }}
              >
                <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain rounded-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
