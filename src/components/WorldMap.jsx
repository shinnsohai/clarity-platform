import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { offices } from '../data/hierarchy'

function DepthLayer() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 12)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const count = 70
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0x0a6cff, size: 0.045, transparent: true, opacity: 0.35 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let targetX = 0
    let targetY = 0
    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let raf
    const animate = () => {
      points.rotation.y += (targetX * 0.08 - points.rotation.y) * 0.02
      points.rotation.x += (-targetY * 0.05 - points.rotation.x) * 0.02
      points.rotation.z += 0.0003
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}

export default function WorldMap() {
  const [active, setActive] = useState(null)

  return (
    <section className="relative bg-pearl py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-azure rounded-full inline-block" />
          Global Reach
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] mb-14">
          GROUP OFFICES<span className="text-azure">.</span> WORLDWIDE.
        </h2>

        <div className="relative w-full aspect-[16/8] bg-white rounded-2xl shadow-soft overflow-hidden">
          <DepthLayer />
          <img
            src="/images/world-map.png"
            alt="Clarity E&C global office network"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {offices.map((o) => (
            <button
              key={o.id}
              onMouseEnter={() => setActive(o.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === o.id ? null : o.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${o.x}%`, top: `${o.y}%` }}
            >
              <span className="block w-3 h-3 rounded-full bg-azure shadow-[0_0_0_4px_rgba(10,108,255,0.2)] group-hover:scale-125 transition-transform" />
              <span className="absolute inset-0 rounded-full bg-azure animate-ping opacity-40" />
            </button>
          ))}

          <AnimatePresence>
            {active &&
              offices
                .filter((o) => o.id === active)
                .map((o) => (
                  <motion.div
                    key={o.id}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    className="absolute -translate-x-1/2 bg-white border border-ink/10 shadow-soft-lg rounded-lg px-4 py-3 pointer-events-none"
                    style={{ left: `${o.x}%`, top: `calc(${o.y}% - 60px)` }}
                  >
                    <div className="font-display text-sm text-ink whitespace-nowrap">{o.name}</div>
                    <div className="text-concrete text-xs whitespace-nowrap">{o.city}</div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {offices.map((o) => (
            <div key={o.id} className="flex items-center gap-2 text-sm text-concrete">
              <span className="w-1.5 h-1.5 rounded-full bg-azure" />
              {o.city}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
