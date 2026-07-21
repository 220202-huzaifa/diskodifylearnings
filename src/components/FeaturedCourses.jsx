import { motion } from 'framer-motion'

/**
 * "New Horizon" light section — cream editorial layout. Split header
 * with a hairline rule, soft accent glows in the background, and a
 * bento grid: one oversized internship program card plus compact
 * process cards, all using the gold / coral / violet accents sampled
 * from the hero sky gradient. Bricolage Grotesque / Inter / JetBrains Mono.
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

const StepCard = ({ step, index, featured = false }) => {
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
            {step.tag.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-[#8A8398]">{step.meta}</span>
        </div>

        <h3
          className={`mb-3 font-display font-bold text-[#170F2B] ${
            featured ? 'text-3xl md:text-5xl md:leading-[1.05]' : 'text-xl'
          }`}
        >
          {step.title}
        </h3>
        <p className={`leading-relaxed text-[#5C5470] ${featured ? 'max-w-md text-base md:text-lg' : 'text-sm'}`}>
          {step.description}
        </p>
        {featured && step.highlights && (
          <ul className="mt-6 space-y-2">
            {step.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#5C5470] md:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9563F]" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <span
          className="inline-flex items-center gap-2 font-medium text-[#170F2B] transition-colors group-hover:text-[color:var(--accent)]"
          style={{ '--accent': accent }}
        >
          {step.cta}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </span>

        {featured && <MiniSkyline accent={accent} className="h-28 w-44 opacity-80 md:h-36 md:w-56" />}
      </div>
    </motion.div>
  )
}

const HowWeWork = () => {
  const steps = [
    {
      title: 'Internship Program',
      description:
        'Our flagship program puts you inside real projects with real deadlines. Work alongside senior engineers, ship production features, and graduate with a portfolio and experience letter that actually mean something.',
      tag: 'Flagship',
      meta: '3–6 months',
      cta: 'Apply for internship',
      highlights: [
        'Hands-on work on live client and in-house projects',
        'Weekly 1-on-1 mentorship and code reviews',
        'Certificate + experience letter on completion',
        'Top performers get full-time offers',
      ],
    },
    {
      title: 'Learn the Fundamentals',
      description: 'Start with structured, mentor-led training tailored to your track — web, mobile, or AI.',
      tag: 'Step 01',
      meta: '4–8 weeks',
      cta: 'Explore tracks',
    },
    {
      title: 'Build Real Projects',
      description: 'Move from tutorials to shipping. Build portfolio-grade projects reviewed by senior devs.',
      tag: 'Step 02',
      meta: 'Project-based',
      cta: 'See student work',
    },
    {
      title: 'Join a Team',
      description: 'Get placed into a small squad with a team lead, sprints, standups, and real collaboration.',
      tag: 'Step 03',
      meta: 'Agile squads',
      cta: 'How teams work',
    },
    {
      title: 'Get Mentored',
      description: 'Regular feedback, code reviews, and career guidance from engineers working in the industry.',
      tag: 'Ongoing',
      meta: '1-on-1 support',
      cta: 'Meet the mentors',
    },
    {
      title: 'Launch Your Career',
      description: 'CV reviews, interview prep, and referrals. We help you land your first role or freelance clients.',
      tag: 'Step 04',
      meta: 'Career support',
      cta: 'Success stories',
    },
  ]

  return (
    <section id="courses" className="relative overflow-hidden bg-[#FBF4E8] py-32">
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
              04 — HOW WE WORK
            </span>
            <h2 className="font-display text-5xl font-extrabold text-[#170F2B] md:text-7xl">
              Learn by{' '}
              <em className="font-display italic text-[#C9563F]">doing</em>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-[#5C5470] md:pb-2 md:text-right">
            From fundamentals to a real internship a clear, mentor-guided path that turns learners into working engineers.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 h-px origin-left bg-[#170F2B]/15"
        />

        {/* bento grid: internship feature card + process cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2">
            <StepCard step={steps[0]} index={0} featured />
          </div>
          {steps.slice(1).map((step, i) => (
            <StepCard key={step.title} step={step} index={i + 1} />
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
            Apply to the internship program
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeWork