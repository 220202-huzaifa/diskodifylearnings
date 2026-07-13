import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

/**
 * "New Horizon" closing section — community / newsletter. A warm cream
 * panel that contrasts with the dark InstructorSpotlight above it.
 * Coral / gold accents, Bricolage Grotesque / Inter / JetBrains Mono.
 */

const STATS = [
  { number: '50K+', label: 'STUDENTS' },
  { number: '200+', label: 'COURSES' },
  { number: '50+', label: 'INSTRUCTORS' },
  { number: '95%', label: 'SATISFACTION' },
]

const Community = () => {
  const containerRef = useRef(null)
  const [email, setEmail] = useState('')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#FBF4E8] py-32" style={{ position: 'relative' }}>
      {/* soft accent glows */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFC65C33 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF6F5926 0%, transparent 70%)' }}
      />

      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#C9563F]">
            06 — JOIN OUR COMMUNITY
          </span>
          <h2 className="mb-6 font-display text-5xl font-extrabold leading-[1.02] text-[#170F2B] md:text-7xl">
            Stay <em className="italic text-[#C9563F]">connected</em>
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-[#5C5470]">
            Get weekly insights, course updates, and exclusive content delivered 
            straight to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-[#170F2B]/15 bg-white px-6 py-4 text-[#170F2B] placeholder-[#8A8398] transition-colors focus:border-[#C9563F] focus:outline-none"
              required
            />
            <motion.button
              type="submit"
              className="rounded-full bg-[#FF6F59] px-8 py-4 text-sm font-medium tracking-wide text-[#FBF4E8] transition-colors duration-300 hover:bg-[#C9563F]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hoverable
            >
              Subscribe
            </motion.button>
          </form>
          
          <p className="mt-4 text-center font-mono text-xs tracking-wide text-[#8A8398]">
            Join 10,000+ learners. Unsubscribe anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-[#170F2B]/10 pt-12 md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 font-display text-4xl font-extrabold text-[#C9563F] md:text-5xl">
                {stat.number}
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] text-[#8A8398]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Community
