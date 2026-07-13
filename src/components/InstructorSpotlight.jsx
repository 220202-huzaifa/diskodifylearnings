import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * "New Horizon" dark section — instructor spotlight. A deep-violet
 * night panel (echoing the hero sky) that contrasts with the cream
 * FeaturedCourses section above it. Editorial two-column layout:
 * copy on the left, a portrait card with a floating quote card on
 * the right. Gold / coral / violet accents, Bricolage Grotesque /
 * Inter / JetBrains Mono.
 */

const STATS = [
  { value: '50+', label: 'EXPERT INSTRUCTORS' },
  { value: '12', label: 'FAANG COMPANIES' },
  { value: '8', label: 'AI RESEARCH LABS' },
]

const InstructorSpotlight = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const quoteY = useTransform(scrollYProgress, [0, 1], [90, -30])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#170F2B] py-32"
      style={{ position: 'relative' }}
    >
      {/* soft accent glows echoing the hero sky */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #B085E029 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF6F5921 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#FFC65C]">
              05 — MEET OUR INSTRUCTORS
            </span>
            <h2 className="mb-8 font-display text-5xl font-extrabold leading-[1.02] text-[#FBF4E8] md:text-6xl">
              Learn from people who{' '}
              <em className="italic text-[#FFC65C]">ship</em>
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed text-[#B9AFC9]">
              <p>
                Our instructors aren't just teachers—they're practitioners who work at
                the world's leading tech companies. They bring real-world experience and
                insights that you won't find in textbooks.
              </p>
              <p>
                From AI researchers at top labs to senior engineers at FAANG companies,
                our team is committed to sharing the knowledge that matters most in
                today's rapidly evolving tech landscape.
              </p>
            </div>

            {/* stat row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-[#FBF4E8]/10 pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-extrabold text-[#FFC65C] md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.15em] text-[#8A8398]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-hoverable
                className="rounded-full bg-[#FFC65C] px-8 py-4 text-sm font-medium tracking-wide text-[#170F2B] transition-colors duration-300 hover:bg-[#FFD97E]"
              >
                Meet the team
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* portrait card */}
              <motion.div style={{ y: portraitY }}>
                <div
                  className="relative aspect-square overflow-hidden rounded-3xl border border-[#FBF4E8]/10"
                  style={{
                    background:
                      'linear-gradient(160deg, #241640 0%, #6A2E52 55%, #C9563F 100%)',
                  }}
                >
                  {/* faint window grid texture */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent 0 26px, #FFC65C22 26px 28px), repeating-linear-gradient(90deg, transparent 0 26px, #FFC65C22 26px 28px)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full border border-[#FFC65C]/40 bg-[#170F2B]/40 backdrop-blur-sm">
                        <span className="font-display text-5xl font-extrabold text-[#FFC65C]">RK</span>
                      </div>
                      <div className="font-display text-xl font-bold text-[#FBF4E8]">Dr. Rachel Kim</div>
                      <div className="mt-2 inline-block rounded-full border border-[#FFC65C]/40 bg-[#170F2B]/50 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#FFC65C] backdrop-blur-sm">
                        AI RESEARCH LEAD
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* floating quote card */}
              <motion.div
                style={{ y: quoteY }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-4 max-w-xs rounded-2xl border border-[#FFC65C]/25 bg-[#0D0A19]/95 p-6 shadow-2xl backdrop-blur-sm md:-right-8"
              >
                <p className="mb-4 font-display text-lg italic leading-snug text-[#FBF4E8]">
                  "The best way to predict the future is to create it. We're here to
                  give you the tools to do exactly that."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#FFC65C', '#FF6F59', '#B085E0'].map((accent) => (
                      <div
                        key={accent}
                        className="h-8 w-8 rounded-full border-2 border-[#0D0A19]"
                        style={{ background: `linear-gradient(135deg, ${accent} 0%, #6A2E52 100%)` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs tracking-wide text-[#8A8398]">
                    50+ expert instructors
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InstructorSpotlight
