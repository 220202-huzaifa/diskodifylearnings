import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('[data-hoverable]')) {
        setHovered(true)
      }
    }

    const handleMouseOut = () => {
      setHovered(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-off-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-2 border-off-black mix-blend-difference transition-all duration-300 ease-out ${
          hovered ? 'w-16 h-16' : 'w-8 h-8'
        }`}
        style={{
          transform: `translate(${position.x - (hovered ? 32 : 16)}px, ${position.y - (hovered ? 32 : 16)}px)`,
        }}
      />
    </>
  )
}

export default CustomCursor
