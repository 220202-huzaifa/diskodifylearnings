import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * "New Horizon" dark section — team spotlight. A deep-violet
 * night panel (echoing the hero sky) that contrasts with the cream
 * FeaturedCourses section above it. Editorial two-column layout:
 * copy on the left, a founder portrait card with a floating quote
 * card on the right. Gold / coral / violet accents, Bricolage
 * Grotesque / Inter / JetBrains Mono.
 */

const STATS = [
  { value: '10+', label: 'PROJECTS SHIPPED' },
  { value: '3+', label: 'YEARS IN INDUSTRY' },
  { value: '100%', label: 'HANDS-ON MENTORSHIP' },
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
      id="about"
      ref={containerRef}
      className="relative overflow-hidden bg-[#170F2B] py-20 md:py-32 pb-32 md:pb-20"
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
        <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#FFC65C] mt-12 md:mt-1">
              05 — OUR TEAM
            </span>
            <h2 className="mb-8 font-display text-5xl font-extrabold leading-[1.02] text-[#FBF4E8] md:text-6xl">
              Built by people who{' '}
              <em className="italic text-[#FFC65C]">ship</em>
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed text-[#B9AFC9]">
              <p>
                Diskodify is run by working engineers, not career lecturers. Every
                mentor on the team builds real products for real clients and brings
                that day-to-day experience straight into your training.
              </p>
              <p>
                From full-stack development to front-end craft, our small, tight-knit
                team reviews your code, guides your projects, and treats you like a
                junior teammate not a student in a lecture hall.
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
  className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-2xl md:rounded-3xl border border-[#FBF4E8]/10"
>
  {/* Full background image */}
  <img
    src="/assets/Huzaifa.png"
    alt="Muhammad Huzaifa"
    className="absolute inset-0 h-full w-full object-cover object-top"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A19] via-[#0D0A19]/40 to-transparent" />

  {/* Optional accent overlay */}
  <div className="absolute inset-0 bg-[#170F2B]/20" />

  {/* Content */}
 <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
    <div className="mb-4 h-[3px] w-16 bg-[#FFC65C]" />

  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FBF4E8]">
      Huzaifa Zahid
    </h3>

   <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-[#FFC65C]">
      Founder &amp; CEO
    </p>
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
                className="
absolute
left-4
right-4
-bottom-6
sm:left-auto
sm:right-4
sm:max-w-xs
md:-right-8
md:-bottom-8
rounded-2xl
border
border-[#FFC65C]/25
bg-[#0D0A19]/95
p-4
sm:p-6
shadow-2xl
backdrop-blur-sm
"
              >
                <p className="mb-4 text-base md:text-lg font-display italic leading-relaxed text-[#FBF4E8]">
                  "We don't just teach code we bring you into the room where real
                  products get built, and make sure you leave career-ready."
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
                    The Diskodify team
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
