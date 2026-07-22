const MobileCard = ({ title, description, accent, tag }) => (
  <div
    className="rounded-3xl border p-6"
    style={{
      background: `linear-gradient(160deg, #170F2B 0%, #0D0A19 60%, ${accent}1A 100%)`,
      borderColor: `${accent}33`,
    }}
  >
    <div className="flex flex-col items-center text-center">
      <div
        className="mb-6 h-32 w-32 rounded-2xl border p-4"
        style={{
          backgroundColor: `${accent}14`,
          borderColor: `${accent}33`,
        }}
      >
        <MiniSkyline accent={accent} />
      </div>

      <span
        className="mb-3 rounded-full border px-3 py-1 text-xs tracking-[0.15em]"
        style={{
          borderColor: `${accent}55`,
          color: accent,
        }}
      >
        {tag}
      </span>

      <h2 className="mb-4 text-3xl font-bold text-[#FBF4E8]">
        {title}
      </h2>

      <p className="mb-6 text-base leading-7 text-[#B9AFC9]">
        {description}
      </p>

      <button
        className="rounded-full px-6 py-3 font-medium text-[#170F2B]"
        style={{ backgroundColor: accent }}
      >
        Explore Track
      </button>
    </div>
  </div>
)
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Scroll behavior: pinned stage. The whole section sticks to the
 * viewport — the page visually stays put — while scroll progress
 * drives the cards. Card 1 sits in the frame; as you keep scrolling,
 * card 2 slides up from the bottom and covers it, then card 3 does
 * the same. Only after all cards have stacked does the page release
 * and continue to the next component.
 *
 * Same "New Horizon" tokens as Hero.jsx: Bricolage Grotesque / Inter /
 * JetBrains Mono, and each track's accent sampled from the hero sky
 * gradient (gold / coral / violet).
 */

const TOWER_HEIGHTS = [0.5, 1, 0.7, 0.85]

const MiniSkyline = ({ accent }) => (
  <svg viewBox="0 0 120 100" className="h-full w-full" aria-hidden="true">
    {TOWER_HEIGHTS.map((h, i) => {
      const barW = 22
      const gap = 8
      const x = i * (barW + gap) + 6
      const barH = h * 84
      return (
        <motion.rect
          key={i}
          x={x}
          width={barW}
          y={100 - barH}
          height={barH}
          rx={3}
          fill={accent}
          initial={{ scaleY: 0, opacity: 0.9 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${x + barW / 2}px 100px` }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
        />
      )
    })}
  </svg>
)

const StackCard = ({ title, description, count, accent, tag, index, scrollYProgress, total }) => {
  // Card 0 is already in the frame. Every card after it slides up from
  // the bottom of the pinned stage during its own slice of the scroll.
  // Progress is divided across the (total - 1) transitions so the
  // section releases right as the last card lands — no dead scroll.
  const segment = 1 / (total - 1)
  const start = (index - 1) * segment
  const end = index * segment

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [start, end],
    index === 0 ? ['0%', '0%'] : ['100%', '0%']
  )

  // As the NEXT card slides over this one, scale this card down and dim
  // it so it visibly recedes instead of just being covered by a dark block.
  const nextStart = index * segment
  const nextEnd = (index + 1) * segment
  const isLast = index === total - 1
  const scale = useTransform(
    scrollYProgress,
    isLast ? [0, 1] : [nextStart, nextEnd],
    isLast ? [1, 1] : [1, 0.92]
  )
  const brightness = useTransform(
    scrollYProgress,
    isLast ? [0, 1] : [nextStart, nextEnd],
    isLast ? [1, 1] : [1, 0.5]
  )
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: 10 + index, y, scale, filter }}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden px-6 md:px-8 ${
          index === 0 ? '' : 'rounded-t-[2.5rem] border-t'
        }`}
        style={index === 0 ? undefined : { borderColor: `${accent}66` }}
      >
        {/* card surface — full bleed, this is a full screen "slide" */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(160deg, #170F2B 0%, #0D0A19 60%, ${accent}1A 100%)` }}
        />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row">
          <div className="h-56 w-56 flex-shrink-0">
            <div
              className="relative h-full w-full overflow-hidden rounded-3xl border p-6"
              style={{ backgroundColor: `${accent}14`, borderColor: `${accent}33` }}
            >
              <span
                className="absolute left-5 top-5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em]"
                style={{ borderColor: `${accent}55`, color: accent }}
              >
                {tag}
              </span>
              <div className="flex h-full items-end pb-2">
                <MiniSkyline accent={accent} />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* <span
              className="mb-4 inline-block rounded-full px-4 py-2 font-mono text-xs tracking-[0.15em]"
              style={{ backgroundColor: `${accent}1F`, color: accent }}
            >
              {count} COURSES
            </span> */}

            <h2 className="mb-6 font-display text-5xl font-extrabold leading-[1] text-[#FBF4E8] md:text-7xl">
              {title}
            </h2>

            <p className="mb-8 max-w-lg text-lg font-light leading-relaxed text-[#B9AFC9] md:text-xl">
              {description}
            </p>

            <motion.button
              data-hoverable
              className="rounded-full px-8 py-4 font-medium tracking-wide text-[#170F2B] transition-colors duration-300"
              style={{ backgroundColor: accent }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore track
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const LearningTracks = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const tracks = [
    {
      tag: 'AI',
      title: 'AI Development',
      description:
        'Master machine learning, neural networks, and the AI techniques reshaping every industry.',
      
      accent: '#FFC65C',
    },
    {
      tag: 'WEB',
      title: 'Web Development',
      description:
        'Build modern, responsive web applications with React, Next.js, and the latest frontend tools.',
      
      accent: '#FF6F59',
    },
    {
      tag: 'APP',
      title: 'App Development',
      description:
        'Create native and cross-platform mobile apps using React Native, Flutter, and more.',
      
      accent: '#B085E0',
    },
    {
      tag: 'MERN',
      title: 'MERN Stack',
      description:
        'Become a full-stack developer with MongoDB, Express, React, and Node.js — from APIs to deployment.',
    
      accent: '#5CD6A9',
    },
    {
      tag: 'PY',
      title: 'Python',
      description:
        'Learn Python from the ground up — scripting, automation, data handling, and backend development.',
      
      accent: '#6FA8FF',
    },
    {
      tag: 'ML',
      title: 'Machine Learning',
      description:
        'Dive into supervised and unsupervised learning, model training, and real-world ML pipelines.',
      
      accent: '#FF8FB1',
    },
  ]

return (
  <>
    {/* Mobile */}
    <section
      id="tracks"
      className="block bg-[#0D0A19] px-5 py-16 md:hidden"
    >
      <span className="font-mono text-xs tracking-[0.2em] text-[#FFC65C]">
        02 — LEARNING TRACKS
      </span>

      <h1 className="mt-3 mb-10 text-4xl font-extrabold text-[#FBF4E8]">
        Choose your path
      </h1>

      <div className="space-y-6">
        {tracks.map((track) => (
          <MobileCard key={track.title} {...track} />
        ))}
      </div>
    </section>

    {/* Desktop */}
    <section
      id="tracks"
      ref={containerRef}
      className="relative hidden bg-[#0D0A19] md:block"
      style={{ height: `${tracks.length * 100}dvh` }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {tracks.map((track, i) => (
          <StackCard
            key={track.title}
            {...track}
            index={i}
            total={tracks.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="pointer-events-none absolute left-0 top-0 z-50 w-full px-8 pt-24">
          <div className="mx-auto max-w-7xl">
            <span className="mb-2 inline-block font-mono text-xs tracking-[0.2em] text-[#FFC65C]">
              02 — LEARNING TRACKS
            </span>

            <h1 className="text-5xl font-extrabold text-[#FBF4E8]">
              Choose your path
            </h1>
          </div>
        </div>
      </div>
    </section>
  </>
)
}

export default LearningTracks
