import { motion } from 'framer-motion'

/**
 * "New Horizon" light section — cream editorial layout. Split header
 * with a hairline rule, soft accent glows in the background, and a
 * bento grid: one oversized feature course card plus compact cards,
 * all using the gold / coral / violet accents sampled from the hero
 * sky gradient. Bricolage Grotesque / Inter / JetBrains Mono.
 */

const TOWER_HEIGHTS = [0.5, 1, 0.65, 0.85]

const MiniSkyline = ({ accent, className = 'h-20 w-32' }) => (
  <svg viewBox="0 0 120 100" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
    {TOWER_HEIGHTS.map((h, i) => {
      const barW = 20
      const gap = 8
      const x = i * (barW + gap) + 6
      const barH = h * 84
      return (
        <rect key={i} x={x} width={barW} y={100 - barH} height={barH} rx={3} fill={accent} opacity={0.9} />
      )
    })}
  </svg>
)

const ACCENTS = ['#FFC65C', '#FF6F59', '#B085E0']

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CourseCard = ({ course, index, featured = false }) => {
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-[#FFFDF8] shadow-sm transition-shadow duration-300 hover:shadow-xl ${
        featured ? 'p-8 md:p-12' : 'p-6 md:p-8'
      }`}
      style={{ borderColor: `${accent}40` }}
      data-hoverable
    >
      {/* accent edge */}
      <span
        className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: accent }}
      />
      {/* soft accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(150deg, transparent 40%, ${accent}1F 100%)` }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.15em]"
            style={{ backgroundColor: `${accent}26`, color: '#170F2B' }}
          >
            {course.level.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-[#8A8398]">{course.duration}</span>
        </div>

        <h3
          className={`mb-3 font-display font-bold text-[#170F2B] ${
            featured ? 'text-3xl md:text-5xl md:leading-[1.05]' : 'text-xl'
          }`}
        >
          {course.title}
        </h3>
        <p className={`leading-relaxed text-[#5C5470] ${featured ? 'max-w-md text-base md:text-lg' : 'text-sm'}`}>
          {course.description}
        </p>
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <span
          className="inline-flex items-center gap-2 font-medium text-[#170F2B] transition-colors group-hover:text-[color:var(--accent)]"
          style={{ '--accent': accent }}
        >
          View course
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </span>

        {featured && <MiniSkyline accent={accent} className="h-28 w-44 opacity-80 md:h-36 md:w-56" />}
      </div>
    </motion.div>
  )
}

const FeaturedCourses = () => {
  const courses = [
    {
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML and build your first models.',
      level: 'Beginner',
      duration: '8 weeks',
    },
    {
      title: 'Advanced React Patterns',
      description: 'Master complex React architectures and performance optimization.',
      level: 'Advanced',
      duration: '6 weeks',
    },
    {
      title: 'iOS Development with Swift',
      description: 'Build professional iOS apps from scratch using Swift and SwiftUI.',
      level: 'Intermediate',
      duration: '10 weeks',
    },
    {
      title: 'Neural Networks Deep Dive',
      description: 'Understand and implement deep learning architectures.',
      level: 'Advanced',
      duration: '12 weeks',
    },
    {
      title: 'Full-Stack Next.js',
      description: 'Build production-ready full-stack applications with Next.js.',
      level: 'Intermediate',
      duration: '8 weeks',
    },
    {
      title: 'Flutter Mobile Mastery',
      description: 'Create beautiful cross-platform apps with Flutter and Dart.',
      level: 'Beginner',
      duration: '10 weeks',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#FBF4E8] py-32">
      {/* soft accent glows */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFC65C33 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, #B085E033 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* editorial split header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#C9563F]">
              04 — FEATURED COURSES
            </span>
            <h2 className="font-display text-5xl font-extrabold text-[#170F2B] md:text-7xl">
              Start learning{' '}
              <em className="font-display italic text-[#C9563F]">today</em>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-[#5C5470] md:pb-2 md:text-right">
            Hand-picked courses designed to give you practical skills you can apply immediately.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 h-px origin-left bg-[#170F2B]/15"
        />

        {/* bento grid: feature card + compact cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2">
            <CourseCard course={courses[0]} index={0} featured />
          </div>
          {courses.slice(1).map((course, i) => (
            <CourseCard key={course.title} course={course} index={i + 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            data-hoverable
            className="rounded-full border border-[#170F2B]/25 px-8 py-4 font-medium text-[#170F2B] transition-colors hover:border-[#C9563F] hover:text-[#C9563F]"
          >
            View all courses
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCourses