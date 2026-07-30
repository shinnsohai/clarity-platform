import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Subtle depth layer for the hero: a tilted wireframe grid + point field that drifts
// with pointer position. Purely atmospheric — never intercepts pointer events.
export default function ThreeBackground({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 2.4, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const grid = new THREE.GridHelper(26, 26, 0x1e5cff, 0x1c2230)
    grid.position.y = -1.6
    grid.material.transparent = true
    grid.material.opacity = 0.35
    scene.add(grid)

    const particleCount = 260
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = Math.random() * 7 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0x9fb0cc, size: 0.035, transparent: true, opacity: 0.55 })
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
      camera.position.x += (targetX * 1.4 - camera.position.x) * 0.03
      camera.position.y += (2.4 - targetY * 0.6 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)
      points.rotation.y += 0.0006
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      if (!mount) return
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
      grid.geometry.dispose()
      grid.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={`pointer-events-none ${className}`} />
}
