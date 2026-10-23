import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

// Interactive BuiltSync demo. Every screen is a pre-rendered image (src/data/builtsync.json,
// editable in the CMS) with optional tap targets ("hotspots", in % of the image) that jump to
// another screen — so the visitor can actually click through the check-in flow, the console
// sidebar, and so on. Worker app screens sit in a phone frame, admin screens in a browser frame.

const GRADIENT = 'linear-gradient(135deg, #2F9BFF 0%, #5B5BFF 55%, #8A1CFF 100%)'

const UI = {
  en: { play: '▶ Play tour', pause: '❚❚ Pause tour', tryIt: 'Try it:', tap: 'tap', click: 'click', areas: 'the highlighted areas.', hl1: 'Highlight tappable areas', hl2: 'Highlight clickable areas', scroll: 'Scroll ↓', enlarge: 'Enlarge screen', prev: 'Previous screen', next: 'Next screen' },
  zh: { play: '▶ 播放演示', pause: '❚❚ 暂停演示', tryIt: '试一试：', tap: '点击', click: '点击', areas: '高亮区域。', hl1: '高亮可点击区域', hl2: '高亮可点击区域', scroll: '向下滑动 ↓', enlarge: '放大', prev: '上一屏', next: '下一屏' },
}
// pick the Chinese or English version of a field ("title" → titleZh), falling back to English
const L = (obj, key, lang) => (lang === 'zh' && obj[key + 'Zh']) || obj[key]
const srcOf = (screen, lang) => (lang === 'zh' && screen.imageZh) || screen.image
const hotspotsOf = (screen, lang) => (lang === 'zh' && screen.hotspotsZh) || screen.hotspots || []

function useScreens(group) {
  return useMemo(() => {
    const screens = group.screens
    const byId = Object.fromEntries(screens.map((s) => [s.id, s]))
    const known = group.modules.map((m) => m.id)
    const extra = [...new Set(screens.map((s) => s.module))].filter((m) => !known.includes(m)).map((id) => ({ id, label: id, description: '' }))
    const modules = [...group.modules, ...extra].filter((m) => screens.some((s) => s.module === m.id))
    // play order: module order, then screen order within the module
    const ordered = modules.flatMap((m) => screens.filter((s) => s.module === m.id))
    return { screens, byId, modules, ordered }
  }, [group])
}

function Hotspots({ list, show, onGo }) {
  return list.map((h, i) => (
    <button
      key={i}
      type="button"
      onClick={() => onGo(h.goto)}
      aria-label={h.label || 'Open'}
      title={h.label}
      style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
      className={`absolute rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5BFF] hover:bg-[#5B5BFF]/15 hover:ring-2 hover:ring-[#5B5BFF]/70 ${
        show ? 'bs-hotspot ring-2 ring-[#5B5BFF]/50 bg-[#5B5BFF]/[0.07]' : ''
      }`}
    />
  ))
}

function PhoneFrame({ screen, lang, showHints, onGo, onZoom }) {
  const scroller = useRef(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0
  }, [screen.id])
  const tall = screen.width && screen.height ? screen.height / screen.width > 844 / 390 + 0.02 : false
  return (
    <div className="relative mx-auto w-[min(100%,300px)]">
      <div className="rounded-[44px] bg-[#0f1226] p-[10px] shadow-soft-lg ring-1 ring-black/10">
        <div className="relative rounded-[34px] overflow-hidden bg-white" style={{ aspectRatio: '390 / 844' }}>
          <div ref={scroller} data-lenis-prevent className="absolute inset-0 overflow-y-auto no-scrollbar">
                          <motion.div
                key={screen.id}
                initial={{ opacity: 0.2, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                className="relative"
              >
                <img src={srcOf(screen, lang)} alt={L(screen, 'title', lang)} className="block w-full h-auto select-none" draggable="false" />
                <Hotspots list={hotspotsOf(screen, lang)} show={showHints} onGo={onGo} />
              </motion.div>
                      </div>
          {tall && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.15em] uppercase text-white bg-black/55 backdrop-blur px-3 py-1 rounded-full">
              {UI[lang].scroll}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onZoom}
        aria-label={UI[lang].enlarge}
        className="absolute -right-2 top-6 hidden md:flex w-9 h-9 rounded-full bg-white shadow-soft-lg border border-ink/10 items-center justify-center text-ink hover:text-azure"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2H14v4.5M6.5 14H2V9.5M14 2L9 7M2 14l5-5" />
        </svg>
      </button>
    </div>
  )
}

function BrowserFrame({ screen, lang, showHints, onGo, onZoom }) {
  const scroller = useRef(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0
  }, [screen.id])
  return (
    <div className="rounded-2xl bg-white shadow-soft-lg border border-ink/10 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-pearl border-b border-ink/10">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center text-[11px] text-concrete tracking-wide truncate">BuiltSync Admin Console</span>
        <button type="button" onClick={onZoom} aria-label={UI[lang].enlarge} className="text-concrete hover:text-azure">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2H14v4.5M6.5 14H2V9.5M14 2L9 7M2 14l5-5" />
          </svg>
        </button>
      </div>
      <div ref={scroller} data-lenis-prevent className="overflow-auto max-h-[72vh] md:max-h-[640px] bg-white">
                  <motion.div
            key={screen.id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative min-w-[720px]"
          >
            <img src={srcOf(screen, lang)} alt={L(screen, 'title', lang)} className="block w-full h-auto select-none" draggable="false" />
            <Hotspots list={hotspotsOf(screen, lang)} show={showHints} onGo={onGo} />
          </motion.div>
              </div>
    </div>
  )
}

function Lightbox({ screen, kind, lang, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-8"
      data-lenis-prevent
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={L(screen, 'title', lang)}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-ink shadow-soft-lg flex items-center justify-center"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
      <img
        src={srcOf(screen, lang)}
        alt={L(screen, 'title', lang)}
        className={`rounded-2xl shadow-soft-lg bg-white h-auto ${kind === 'app' ? 'w-[min(100%,460px)]' : 'w-full max-w-[1500px]'}`}
      />
    </div>,
    document.body,
  )
}

export default function DemoShowcase({ data, initialTab = 'app', initialScreen, focusKey }) {
  const [tab, setTab] = useState(initialTab)
  const [current, setCurrent] = useState({ app: 'app-home', admin: 'adm-dashboard' })
  const [hints, setHints] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [lang, setLang] = useState('en')
  const ui = UI[lang]
  const root = useRef(null)

  const app = useScreens(data.app)
  const admin = useScreens(data.admin)
  const view = tab === 'app' ? app : admin
  const group = tab === 'app' ? data.app : data.admin
  const screen = view.byId[current[tab]] || view.ordered[0]
  const idx = view.ordered.findIndex((s) => s.id === screen.id)

  const goto = useCallback(
    (id, t = tab) => {
      setCurrent((c) => ({ ...c, [t]: id }))
    },
    [tab],
  )

  // external jump (the "From check-in to payslip" strip): focusKey changes when a step is chosen
  useEffect(() => {
    if (!initialScreen) return
    const t = initialScreen.startsWith('adm-') ? 'admin' : 'app'
    setTab(t)
    setCurrent((c) => ({ ...c, [t]: initialScreen }))
    setPlaying(false)
  }, [initialScreen, focusKey])

  const step = useCallback(
    (d) => {
      const next = view.ordered[(idx + d + view.ordered.length) % view.ordered.length]
      goto(next.id)
    },
    [idx, view, goto],
  )

  // autoplay tour
  useEffect(() => {
    if (!playing) return undefined
    const t = setInterval(() => step(1), 4200)
    return () => clearInterval(t)
  }, [playing, step])

  // warm the neighbouring screens so a tap feels instant
  useEffect(() => {
    const ids = new Set([view.ordered[(idx + 1) % view.ordered.length]?.id, view.ordered[(idx - 1 + view.ordered.length) % view.ordered.length]?.id])
    hotspotsOf(screen, lang).forEach((h) => ids.add(h.goto))
    ids.forEach((id) => {
      const s = view.byId[id]
      if (s) new Image().src = srcOf(s, lang)
    })
  }, [screen, idx, view, lang])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setPlaying(false)
      step(1)
    }
    if (e.key === 'ArrowLeft') {
      setPlaying(false)
      step(-1)
    }
  }

  const userGo = (id) => {
    setPlaying(false)
    goto(id)
  }
  const moduleStart = (m) => view.screens.find((s) => s.module === m.id)

  const Frame = tab === 'app' ? PhoneFrame : BrowserFrame
  const moduleScreens = view.screens.filter((s) => s.module === screen.module)

  return (
    <div ref={root} id="demo" tabIndex={-1} onKeyDown={onKeyDown} className="scroll-mt-28 outline-none">
      {/* tab switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div role="tablist" className="inline-flex p-1 rounded-full bg-pearl border border-ink/10">
          {[
            ['app', L(data.app, 'title', lang)],
            ['admin', L(data.admin, 'title', lang)],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => {
                setTab(id)
                setPlaying(false)
              }}
              className={`px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${
                tab === id ? 'text-white shadow-soft' : 'text-ink hover:text-azure'
              }`}
              style={tab === id ? { background: GRADIENT } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div role="group" aria-label="Language" className="inline-flex p-1 rounded-full bg-pearl border border-ink/10">
            {[
              ['en', 'EN'],
              ['zh', '中文'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={lang === id}
                onClick={() => setLang(id)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.1em] transition-all ${lang === id ? 'bg-azure text-white shadow-soft' : 'text-ink hover:text-azure'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p lang={lang === 'zh' ? 'zh-CN' : 'en'} className="text-concrete text-sm max-w-md">{L(group, 'blurb', lang)}</p>
        </div>
      </div>

      <div className={`grid gap-8 items-start ${tab === 'app' ? 'lg:grid-cols-[220px_minmax(0,1fr)_320px]' : 'lg:grid-cols-[minmax(0,1fr)_300px]'}`}>
        {/* modules */}
        <div
          className={`flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0 -mx-1 px-1 ${tab === 'app' ? 'lg:flex-col' : 'lg:col-span-2 lg:flex-wrap lg:overflow-visible'}`}
          role="tablist"
          aria-label="Modules"
        >
          {view.modules.map((m) => {
            const active = m.id === screen.module
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setPlaying(false)
                  const s = moduleStart(m)
                  if (s) goto(s.id)
                }}
                className={`shrink-0 text-left px-4 py-3 rounded-xl border transition-all ${
                  active ? 'bg-white border-[#5B5BFF]/60 shadow-soft text-ink' : 'border-ink/10 text-ink hover:border-[#5B5BFF]/40 bg-white/60'
                }`}
              >
                <span className="block text-[12px] font-bold tracking-[0.1em] uppercase whitespace-nowrap">{L(m, 'label', lang)}</span>
                {active && L(m, 'description', lang) && <span className="hidden lg:block text-xs text-concrete mt-1.5 leading-snug normal-case tracking-normal font-normal">{L(m, 'description', lang)}</span>}
              </button>
            )
          })}
        </div>

        {/* device */}
        <div className="min-w-0">
          <Frame screen={screen} lang={lang} showHints={hints} onGo={userGo} onZoom={() => setZoom(true)} />
        </div>

        {/* caption */}
        <div className="lg:sticky lg:top-28">
                      <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              className="bg-white border border-ink/10 rounded-2xl shadow-soft p-6"
            >
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#5B5BFF]">
                {L(view.modules.find((m) => m.id === screen.module) || {}, 'label', lang) || screen.module} · {String(moduleScreens.findIndex((s) => s.id === screen.id) + 1)}/{moduleScreens.length}
              </span>
              <h3 className="font-display text-xl text-ink mt-2 mb-3 leading-tight"><span lang={lang === 'zh' ? 'zh-CN' : 'en'}>{L(screen, 'title', lang)}</span></h3>
              <p lang={lang === 'zh' ? 'zh-CN' : 'en'} className="text-concrete text-sm leading-relaxed">{L(screen, 'caption', lang)}</p>
              {hotspotsOf(screen, lang).length > 0 && (
                <p className="mt-4 text-xs text-concrete">
                  <span className="font-semibold">{ui.tryIt}</span> {tab === 'app' ? ui.tap : ui.click} {lang === 'zh' ? '' : 'the '}{ui.areas}
                </p>
              )}
            </motion.div>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPlaying(false)
                step(-1)
              }}
              aria-label={ui.prev}
              className="w-10 h-10 rounded-full border border-ink/15 text-ink hover:border-[#5B5BFF] hover:text-[#5B5BFF] flex items-center justify-center"
            >
              ←
            </button>
            <span className="text-xs text-concrete tabular-nums w-14 text-center">
              {idx + 1} / {view.ordered.length}
            </span>
            <button
              type="button"
              onClick={() => {
                setPlaying(false)
                step(1)
              }}
              aria-label={ui.next}
              className="w-10 h-10 rounded-full border border-ink/15 text-ink hover:border-[#5B5BFF] hover:text-[#5B5BFF] flex items-center justify-center"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="ml-1 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2.5 rounded-full text-white"
              style={{ background: GRADIENT }}
            >
              {playing ? ui.pause : ui.play}
            </button>
          </div>
          <label className="mt-4 flex items-center gap-2 text-xs text-concrete cursor-pointer select-none">
            <input type="checkbox" checked={hints} onChange={(e) => setHints(e.target.checked)} className="accent-[#5B5BFF]" />
            {tab === 'app' ? ui.hl1 : ui.hl2}
          </label>
        </div>
      </div>

      <p lang={lang === 'zh' ? 'zh-CN' : 'en'} className="mt-8 text-xs text-concrete">{L(data, 'demoNote', lang)}</p>
      {zoom && <Lightbox screen={screen} kind={tab} lang={lang} onClose={() => setZoom(false)} />}
    </div>
  )
}
