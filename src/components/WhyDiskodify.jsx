import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const WhyDiskodify = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rightY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section ref={containerRef} className="py-32 bg-[#FBF4E8]" style={{ position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: leftY }}
          >
            <span className="inline-block mb-6 font-mono text-xs tracking-[0.2em] text-[#C9563F]">
              03 — WHY DISKODIFY
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-extrabold text-[#170F2B] mb-8">
              Education Reimagined for the Modern Era
            </h2>
            <div className="space-y-6 text-[#5C5470] text-lg">
              <p>
                We believe learning should be an immersive experience, not a passive one. 
                Our platform combines cutting-edge technology with world-class instruction 
                to create an environment where you don't just learn—you thrive.
              </p>
              <p>
                Every course is designed by industry professionals who understand what 
                it takes to succeed in today's competitive tech landscape. From hands-on 
                projects to real-world applications, we ensure you're ready to make an 
                impact from day one.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            style={{ y: rightY }}
          >
            <div className="p-12 rounded-3xl border border-[#170F2B]/10 shadow-sm" style={{ background: 'linear-gradient(150deg, #FFC65C26 0%, #FF6F5926 100%)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <svg className="w-16 h-16 text-[#C9563F] mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-3xl font-display text-[#170F2B] mb-6 leading-relaxed">
                  "Diskodify transformed my career. The hands-on approach and mentorship 
                  gave me the confidence to land my dream job at a top tech company."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #FF6F59 0%, #B085E0 100%)' }} />
                  <div>
                    <div className="text-[#170F2B] font-medium">Sarah Chen</div>
                    <div className="text-[#8A8398] text-sm">Software Engineer, Google</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyDiskodify
