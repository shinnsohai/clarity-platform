import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { deploymentCuts } from '../data/hierarchy'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC = '/videos/deployment-sequence.mp4'

function findCut(t) {
  let active = deploymentCuts[0]
  for (const c of deploymentCuts) {
    if (t >= c.start) active = c
  }
  return active
}

export default function DeploymentSequence() {
  const pinWrapRef = useRef(null)
  const frameRef = useRef(null)
  const lineRef = useRef(null)
  const topHalfRef = useRef(null)
  const bottomHalfRef = useRef(null)
  const videoRef = useRef(null)

  const [videoOk, setVideoOk] = useState(true)
  const [activeCut, setActiveCut] = useState(deploymentCuts[0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(frameRef.current, { scale: 0.62, borderRadius: 24 })
      gsap.set(topHalfRef.current, { y: 0 })
      gsap.set(bottomHalfRef.current, { y: 0 })
      gsap.set(lineRef.current, { scaleX: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
          pin: true,
        },
      })
        .to(frameRef.current, { scale: 1, borderRadius: 0, ease: 'power3.out' }, 0)
        .to(topHalfRef.current, { y: -80, ease: 'power3.out' }, 0)
        .to(bottomHalfRef.current, { y: 80, ease: 'power3.out' }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'power3.out' }, 0)
    }, pinWrapRef)

    return () => ctx.revert()
  }, [])

  // Auto-cycle overlay when no video is present yet, purely so the interaction/design
  // is visible before the real file is dropped in — never drives real playback.
  useEffect(() => {
    if (videoOk) return
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % deploymentCuts.length
      setActiveCut(deploymentCuts[i])
    }, 3200)
    return () => clearInterval(id)
  }, [videoOk])

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    setActiveCut(findCut(v.currentTime))
  }

  return (
    <section ref={pinWrapRef} className="relative bg-paper" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={topHalfRef}
          className="absolute top-0 left-0 right-0 z-20 px-8 xl:px-16 pt-16 flex justify-between items-start pointer-events-none"
        >
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-none">
            THE DEPLOYMENT
          </h2>
          <span className="font-mono text-accent text-sm tracking-widest mt-2">/// 02</span>
        </div>

        <div
          ref={bottomHalfRef}
          className="absolute bottom-0 left-0 right-0 z-20 px-8 xl:px-16 pb-16 flex justify-end pointer-events-none"
        >
          <h2 className="font-display text-3xl md:text-5xl text-accent leading-none">SEQUENCE.</h2>
        </div>

        <div
          ref={lineRef}
          className="absolute left-0 right-0 top-1/2 h-px bg-accent z-20 origin-left pointer-events-none"
        />

        <div
          ref={frameRef}
          className="relative w-[92%] max-w-[1600px] aspect-video overflow-hidden bg-graphite border border-white/10 shadow-2xl"
        >
          {videoOk ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              onTimeUpdate={onTimeUpdate}
              onError={() => setVideoOk(false)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_50%,#12294f_0%,#0a0c10_75%)]">
              <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
                Deployment Reel Pending
              </span>
              <span className="text-concrete text-xs max-w-sm text-center leading-relaxed">
                Drop the concatenated 4-cut file at <code>/public/videos/deployment-sequence.mp4</code>{' '}
                — this frame, the pin/scale entrance, and the timecoded overlay are already wired.
              </span>
            </div>
          )}

          <div className="absolute bottom-6 left-6 z-10 max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCut.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-ink/85 backdrop-blur-sm border-l-2 border-accent px-5 py-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-accent text-xs">{activeCut.id}</span>
                  <span className="text-paper text-sm font-semibold tracking-[0.15em]">
                    {activeCut.label}
                  </span>
                </div>
                <div className="text-concrete text-[11px] tracking-[0.2em] uppercase mb-2">
                  {activeCut.sub}
                </div>
                <p className="text-concrete-light text-xs leading-relaxed">{activeCut.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
