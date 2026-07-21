import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

/**
 * "New Horizon" closing section — community / newsletter, floating-card
 * layout. The cream panel stays as a backdrop, but the signup form now
 * lives in its own raised card that visually floats above it (deeper
 * shadow, slight independent parallax, a touch more rotation than the
 * rest of the section) rather than sitting as a plain input row.
 */

const Community = () => {
  const containerRef = useRef(null)
  const [email, setEmail] = useState('')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  // The card drifts a little more than the rest of the section and
  // gets a very slight rotation, so it reads as a separate floating
  // object rather than part of the flat panel.
  const cardY = useTransform(scrollYProgress, [0, 1], [90, -90])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section id="community" ref={containerRef} className="relative overflow-hidden bg-[#FBF4E8] py-32">
      {/* soft accent glows */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFC65C33 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #FF6F5926 0%, transparent 70%)' }}
      />

      <motion.div style={{ y }} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-center"
        >
          <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#C9563F]">
            07 — JOIN OUR COMMUNITY
          </span>
          <h2 className="mb-6 font-display text-5xl font-extrabold leading-[1.02] text-[#170F2B] md:text-7xl">
            Stay <em className="italic text-[#C9563F]">connected</em>
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-[#5C5470]">
            Get weekly insights, course updates, and exclusive content delivered
            straight to your inbox.
          </p>
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: cardY, rotate: cardRotate }}
          className="relative z-10 mx-auto mt-12 max-w-2xl rounded-[2rem] border border-[#170F2B]/8 bg-white p-10 shadow-[0_50px_100px_-30px_rgba(23,15,43,0.35)] md:p-14"
        >
          {/* corner accent to keep it tied to the palette, not just plain white */}
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, #FFC65C55 0%, transparent 70%)' }}
          />

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-[#170F2B]/15 bg-[#FBF4E8] px-6 py-4 text-[#170F2B] placeholder-[#8A8398] transition-colors focus:border-[#C9563F] focus:outline-none"
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

          
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Community