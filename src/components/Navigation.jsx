import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-2xl font-serif font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
          data-hoverable
        >
          Diskodify
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {['Courses', 'Tracks', 'About', 'Community'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-blue-500 transition-colors"
              whileHover={{ y: -2 }}
              data-hoverable
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-blue-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-hoverable
        >
          Start Learning
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navigation
