import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) return

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const onDown = () => ringRef.current?.classList.add('scale-75', 'bg-[var(--gold,#f29c21)]/25')
    const onUp = () => ringRef.current?.classList.remove('scale-75', 'bg-[var(--gold,#f29c21)]/25')

    let raf
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="hidden lg:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-azure/70 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
        style={{ borderRadius: '2px' }}
      >
        <span className="absolute top-1/2 left-0 w-full h-px bg-azure/50 -translate-y-1/2" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-azure/50 -translate-x-1/2" />
      </div>
    </div>
  )
}
