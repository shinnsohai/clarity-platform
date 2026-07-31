import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entities } from '../data/hierarchy'

gsap.registerPlugin(ScrollTrigger)

export default function HighlightReel() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const distance = track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, pinRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={pinRef} className="relative bg-ink overflow-hidden">
      <div className="h-screen flex flex-col justify-center">
        <div className="px-8 xl:px-16 mb-8">
          <div className="flex items-center gap-4 mb-4 text-white/50 text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 bg-accent inline-block" />
            Highlight Reel
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white leading-[0.95]">
            THE PORTFOLIO IN MOTION<span className="text-accent">.</span>
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-6 px-8 xl:px-16 w-max">
          {entities.map((e) => (
            <Link
              key={e.id}
              to={`/our-business/${e.slug}`}
              className="group relative w-[480px] h-[340px] shrink-0 overflow-hidden border border-white/10"
            >
              <img
                src={e.image}
                alt={e.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <span className="absolute top-4 left-4 text-accent text-[10px] tracking-[0.2em] uppercase">
                {e.kind === 'subsidiary' ? 'Subsidiary' : 'Strategic Partner'}
              </span>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-display text-xl text-white mb-1">{e.name}</div>
                <div className="text-white/60 text-xs">{e.role}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
