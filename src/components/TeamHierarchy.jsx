import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/**
 * Team section — horizontal expanding accordion. All members sit
 * side by side in one row of tall panels. Hovering a panel expands
 * it wide, revealing the portrait in full color plus name, role and
 * experience; the other panels compress into slim strips showing
 * only a vertical name. Same palette (gold / coral / violet) and
 * Bricolage Grotesque / Inter / JetBrains Mono stack as the rest
 * of the site.
 */

const TEAM = [
  { id: '01', initials: 'MH', name: 'Huzaifa Zahid', role: 'Founder & CEO', accent: '#FFC65C',photo:'/assets/Huzaifa.png' },
  { id: '02', initials: 'MA', name: 'Muhammad Adil', role: 'Full Stack Developer', exp: '3+ years industrial experience', accent: '#B085E0', photo: '/assets/awaab.jpeg' },
  { id: '03', initials: 'AJ', name: 'Awaab Javed', role: 'Back-End Developer', exp: '3+ years industrial experience', accent: '#FF6F59', photo: '/assets/adil.jpeg' },
  { id: '04', initials: 'AS', name: 'Ammar Shahid', role: 'Front-End Developer', exp: '2+ years industrial experience', accent: '#FFC65C', photo: '/assets/Ammar.jpeg' },
  { id: '05', initials: 'AM', name: 'Ali Mardan', role: 'MERN Stack Developer', exp: '3+ years industrial experience', accent: '#B085E0', photo: '/assets/mardan.jpeg' },
  { id: '06', initials: 'TW', name: 'Talha Waqar', role: 'AI Engineer', exp: '2+ years industrial experience', accent: '#FF6F59', photo: '/assets/talha.png' },
  { id: '07', initials: 'ZI', name: 'Zain Irfan', role: 'Python Developer', exp: '2+ years industrial experience', accent: '#FFC65C', photo: '/assets/zain.png' },
   { id: '08', initials: 'MB', name: 'Muzammal Bajwa', role: 'PHP & Laravel Developer', exp: '3+ years industrial experience', accent: '#FFC65C', photo: '/assets/muzammal.png' },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const AccordionPanel = ({ person, isActive, onHover }) => {
  return (
    <motion.div
      data-hoverable
      onMouseEnter={onHover}
      animate={{ flexGrow: isActive ? 3.5 : 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className="relative h-[30rem] min-w-0 basis-0 cursor-pointer overflow-hidden rounded-3xl bg-[#170F2B]"
    >
      {/* visual */}
      {person.photo ? (
        <motion.img
          src={person.photo}
          alt={person.name}
          animate={{ filter: isActive ? 'grayscale(0)' : 'grayscale(1)', scale: isActive ? 1 : 1.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(150deg, #241640 0%, ${person.accent}33 100%)` }}
        >
          <span className="font-display text-7xl font-extrabold text-white/15">
            {person.initials}
          </span>
        </div>
      )}

      {/* scrim */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0D0A19] via-[#0D0A19]/50 to-transparent" />

      {/* index */}
      <span className="absolute left-6 top-6 font-mono text-xs tracking-[0.2em] text-white/50">
        {person.id}
      </span>

      {/* collapsed state: vertical name */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <span
              className="whitespace-nowrap font-display text-xl font-bold text-[#FBF4E8]"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {person.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* expanded state: full details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="absolute inset-x-0 bottom-0 p-8"
          >
            <div className="mb-4 h-[2px] w-14" style={{ backgroundColor: person.accent }} />
            <h3 className="whitespace-nowrap font-display text-3xl font-extrabold text-[#FBF4E8] md:text-4xl">
              {person.name}
            </h3>
            <p
              className="mt-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: person.accent }}
            >
              {person.role}
            </p>
            {person.exp && (
              <p className="mt-3 whitespace-nowrap text-sm font-light text-white/60">
                {person.exp}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TeamHierarchy = () => {
  const [active, setActive] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#FBF4E8] py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* heading */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-[#C9563F]">
              06 — MEET THE TEAM
            </span>
            <h2 className="font-display text-5xl font-extrabold leading-[1.02] text-[#170F2B] md:text-7xl">
              The people <em className="italic text-[#C9563F]">behind</em>
              <br />
              Diskodify
            </h2>
          </div>
          <div className="max-w-xs md:pb-2 md:text-right">
            <p className="text-lg font-light leading-relaxed text-[#5C5468]">
              A small team with one goal getting you from curious to career-ready.
            </p>
            <span className="mt-4 inline-block font-mono text-xs tracking-[0.2em] text-[#8A8398]">
              ({String(TEAM.length).padStart(2, '0')}) MEMBERS
            </span>
          </div>
        </motion.div>

        {/* horizontal accordion — hover a panel to expand it */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden gap-4 md:flex"
          onMouseLeave={() => setActive(0)}
        >
          {TEAM.map((person, i) => (
            <AccordionPanel
              key={person.name}
              person={person}
              isActive={active === i}
              onHover={() => setActive(i)}
            />
          ))}
        </motion.div>

        {/* mobile fallback: simple stacked cards */}
        <div className="flex flex-col gap-6 md:hidden">
          {TEAM.map((person, i) => (
            <motion.div
              key={person.name}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative h-96 overflow-hidden rounded-3xl bg-[#170F2B]"
            >
              {person.photo ? (
                <img src={person.photo} alt={person.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(150deg, #241640 0%, ${person.accent}33 100%)` }}
                >
                  <span className="font-display text-7xl font-extrabold text-white/15">{person.initials}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0D0A19] via-[#0D0A19]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-3 h-[2px] w-10" style={{ backgroundColor: person.accent }} />
                <h3 className="font-display text-2xl font-bold text-[#FBF4E8]">{person.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: person.accent }}>
                  {person.role}
                </p>
                {person.exp && <p className="mt-2 text-sm font-light text-white/60">{person.exp}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamHierarchy