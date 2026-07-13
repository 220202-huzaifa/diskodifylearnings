import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * DESIGN CONCEPT — "New Horizon"
 * -----------------------------------------------------------------------
 * The old blueprint background is gone. In its place: a dawn sky over a
 * rising skyline, built one silhouette at a time on load. The metaphor
 * is literal — you're watching something get built as the page opens —
 * and three of the towers are tagged as the three real course tracks,
 * so the skyline doubles as a curriculum map instead of pure decoration.
 *
 * Fonts (add to your <head>, or via next/font):
 *   Bricolage Grotesque — display / headline (its name literally means
 *   "assembled from what's at hand" — fits a page about building things)
 *   Inter               — body copy
 *   JetBrains Mono      — small labels / tags
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
 *
 * Tailwind config (font families):
 *   fontFamily: {
 *     display: ['"Bricolage Grotesque"', 'sans-serif'],
 *     mono: ['"JetBrains Mono"', 'monospace'],
 *     body: ['"Inter"', 'sans-serif'],
 *   }
 * -----------------------------------------------------------------------
 */

// Skyline silhouette — hand-tuned, not random, so the three tagged
// towers land at readable, deliberate positions.
const BUILDINGS = [
  { x: 0, w: 60, h: 120 },
  { x: 60, w: 40, h: 80 },
  { x: 100, w: 70, h: 190, tag: 'AI' },
  { x: 170, w: 45, h: 100 },
  { x: 215, w: 55, h: 150 },
  { x: 270, w: 65, h: 230, tag: 'WEB' },
  { x: 335, w: 40, h: 90 },
  { x: 375, w: 50, h: 140 },
  { x: 425, w: 68, h: 200, tag: 'APP' },
  { x: 493, w: 42, h: 110 },
  { x: 535, w: 58, h: 160 },
  { x: 593, w: 45, h: 95 },
  { x: 638, w: 62, h: 175 },
  { x: 700, w: 50, h: 130 },
]
const SKYLINE_WIDTH = 750

const Stars = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        top: Math.random() * 55,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
      })),
    []
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-[#FBF4E8]"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 3 + s.delay, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </div>
  )
}

const Skyline = ({ prefersReducedMotion }) => (
  <div className="absolute inset-x-0 bottom-0 h-[42%] min-h-[220px]">
    <svg
      viewBox={`0 0 ${SKYLINE_WIDTH} 240`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {BUILDINGS.map((b, i) => (
        <motion.g key={i}>
          <motion.rect
            x={b.x}
            width={b.w}
            y={240 - b.h}
            height={b.h}
            fill={b.tag ? '#170F2B' : '#0D0A19'}
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: `${b.x + b.w / 2}px 240px` }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.5 + i * 0.045, ease: 'easeOut' }}
          />
          {/* lit windows */}
          {Array.from({ length: Math.floor(b.h / 26) }).map((_, wi) => (
            <motion.rect
              key={wi}
              x={b.x + 8}
              y={240 - b.h + 14 + wi * 26}
              width={Math.max(b.w - 24, 6)}
              height={7}
              fill="#FFC65C"
              initial={{ opacity: 0 }}
              animate={{ opacity: (i + wi) % 3 === 0 ? 0.85 : 0.25 }}
              transition={{ duration: 1, delay: prefersReducedMotion ? 0 : 1.2 + i * 0.045 }}
            />
          ))}
        </motion.g>
      ))}
    </svg>

    {/* tower tags for the three real tracks */}
    {BUILDINGS.filter((b) => b.tag).map((b, i) => (
      <motion.div
        key={b.tag}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 + i * 0.15 }}
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ left: `${((b.x + b.w / 2) / SKYLINE_WIDTH) * 100}%`, top: `${((240 - b.h) / 240) * 100}%` }}
      >
        <span className="rounded-full border border-[#FFC65C]/40 bg-[#170F2B]/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#FFC65C] backdrop-blur-sm">
          {b.tag}
        </span>
      </motion.div>
    ))}
  </div>
)

const PillButton = ({ children, variant = 'primary', ...props }) => {
  const isPrimary = variant === 'primary'
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-hoverable
      className={`rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300 ${
        isPrimary
          ? 'bg-[#FFC65C] text-[#170F2B] hover:bg-[#FFD97E]'
          : 'border border-[#B9AFC9]/40 text-[#FBF4E8] hover:border-[#FFC65C] hover:text-[#FFC65C]'
      }`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

const Hero = () => {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '35%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const skylineY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '15%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-body"
      style={{
        background:
          'linear-gradient(180deg, #170F2B 0%, #241640 32%, #6A2E52 58%, #C9563F 78%, #FF6F59 92%, #FFC65C 100%)',
      }}
    >
      <Stars />
      <motion.div style={{ y: skylineY }}>
        <Skyline prefersReducedMotion={prefersReducedMotion} />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D0A19] to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-32 pt-16 lg:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 inline-block rounded-full border border-[#FFC65C]/30 bg-[#170F2B]/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFC65C] backdrop-blur-sm"
        >
          A new horizon for builders
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-center font-display text-6xl font-extrabold leading-[0.95] text-[#FBF4E8] md:text-8xl lg:text-[7rem]"
        >
          Learn to build
          <br />
          <span className="text-[#FFC65C]">the future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 max-w-xl text-center text-lg font-light leading-relaxed text-[#D9D2E4] md:text-xl"
        >
          Master AI, web development, and app development with courses built
          by people who ship for a living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <PillButton variant="primary">Explore courses</PillButton>
          <PillButton variant="secondary">Watch demo</PillButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#FBF4E8]"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D9D2E4]">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-[#FFC65C] to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default Hero
