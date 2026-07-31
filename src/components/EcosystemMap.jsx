import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { parent, subsidiaries, strategicPartners } from '../data/hierarchy'

function EcosystemThreeLayer() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 14)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Node field — a loose 3D lattice suggesting a data/ecosystem network behind the DOM cards.
    const nodeCount = 90
    const positions = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0xffd400, size: 0.05, transparent: true, opacity: 0.55 })
    const points = new THREE.Points(geo, mat)
    group.add(points)

    const lineMat = new THREE.LineBasicMaterial({ color: 0x0b1f3f, transparent: true, opacity: 0.5 })
    for (let i = 0; i < 26; i++) {
      const a = Math.floor(Math.random() * nodeCount)
      const b = Math.floor(Math.random() * nodeCount)
      const lg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]),
        new THREE.Vector3(positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]),
      ])
      group.add(new THREE.Line(lg, lineMat))
    }

    let targetX = 0
    let targetY = 0
    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let raf
    const animate = () => {
      group.rotation.y += (targetX * 0.25 - group.rotation.y) * 0.02
      group.rotation.x += (-targetY * 0.12 - group.rotation.x) * 0.02
      group.rotation.z += 0.0004
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
      lineMat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}

function EntityNode({ entity, index, side, onMeasure }) {
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    onMeasure(entity.id, ref.current)
  }, [entity.id, onMeasure])

  return (
    <motion.button
      ref={ref}
      onClick={() => navigate(`/our-business/${entity.slug}`)}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.04, rotateY: side === 'left' ? 4 : -4 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 800 }}
      className="group relative flex items-center gap-3 border border-navy/15 bg-white shadow-sm hover:shadow-lg hover:border-accent px-4 py-3 text-left transition-all w-full"
    >
      <img src={entity.logo} alt={entity.name} className="h-8 w-8 object-contain shrink-0" />
      <div className="min-w-0">
        <div className="font-display text-sm text-navy leading-tight truncate">{entity.name}</div>
        <div className="text-concrete text-[10px] leading-snug truncate">{entity.role}</div>
      </div>
      <span className="ml-auto text-accent-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        →
      </span>
    </motion.button>
  )
}

export default function EcosystemMap() {
  const containerRef = useRef(null)
  const centerRef = useRef(null)
  const nodeRefs = useRef({})
  const [lines, setLines] = useState([])

  const registerNode = useCallback((id, el) => {
    nodeRefs.current[id] = el
  }, [])

  const recompute = useCallback(() => {
    const c = containerRef.current
    const center = centerRef.current
    if (!c || !center) return
    const cRect = c.getBoundingClientRect()
    const centerRect = center.getBoundingClientRect()
    const cx = centerRect.left + centerRect.width / 2 - cRect.left
    const cy = centerRect.top + centerRect.height / 2 - cRect.top

    const all = [...subsidiaries, ...strategicPartners]
    const next = all
      .map((e) => {
        const el = nodeRefs.current[e.id]
        if (!el) return null
        const r = el.getBoundingClientRect()
        const side = r.left + r.width / 2 < centerRect.left ? 'left' : 'right'
        const x2 = side === 'left' ? r.right - cRect.left : r.left - cRect.left
        return { id: e.id, x1: cx, y1: cy, x2, y2: r.top + r.height / 2 - cRect.top, side }
      })
      .filter(Boolean)
    setLines(next)
  }, [])

  useEffect(() => {
    recompute()
    const ro = new ResizeObserver(recompute)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', recompute)
    const t = setTimeout(recompute, 400)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
      clearTimeout(t)
    }
  }, [recompute])

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <EcosystemThreeLayer />
      <div className="relative max-w-[1440px] mx-auto px-8 xl:px-16">
        <div className="flex items-center gap-4 mb-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-accent inline-block" />
          The CEC Ecosystem
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-navy leading-[0.95] mb-16">
          PORTFOLIO STRUCTURE<span className="text-accent">.</span>
        </h2>

        <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
            {lines.map((l) => {
              const midX = (l.x1 + l.x2) / 2
              const d = `M ${l.x1} ${l.y1} C ${midX} ${l.y1}, ${midX} ${l.y2}, ${l.x2} ${l.y2}`
              return (
                <motion.path
                  key={l.id}
                  d={d}
                  fill="none"
                  stroke={l.side === 'left' ? '#0B1F3F' : '#C9A200'}
                  strokeWidth={1.5}
                  strokeDasharray={l.side === 'right' ? '4 4' : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              )
            })}
          </svg>

          <div className="relative z-10 flex flex-col gap-3">
            <span className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-1">
              Subsidiaries
            </span>
            {subsidiaries.map((e, i) => (
              <EntityNode key={e.id} entity={e} index={i} side="left" onMeasure={registerNode} />
            ))}
          </div>

          <div ref={centerRef} className="relative z-10 flex justify-center py-6 lg:py-0">
            <div className="inline-flex flex-col items-center gap-3 px-10 py-8 bg-navy text-white">
              <img src="/images/logo-clarity-icon.png" alt={parent.name} className="h-14 w-14 object-contain" />
              <span className="text-white/60 text-[10px] tracking-[0.25em] uppercase">
                Corporate Holding Entity
              </span>
              <span className="font-display text-2xl">{parent.name}</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            <span className="text-concrete text-[10px] tracking-[0.25em] uppercase mb-1 lg:text-right">
              Strategic Partner
            </span>
            {strategicPartners.map((e, i) => (
              <EntityNode key={e.id} entity={e} index={i} side="right" onMeasure={registerNode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
