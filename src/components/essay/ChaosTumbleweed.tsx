import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TumbleweedPath {
  d: string
  strokeWidth: number
  opacity: number
  // Animation properties for chaotic movement
  animDelay: number
  animDuration: number
  translateRange: { x: number; y: number }
  rotateRange: number
}

// Generate chaotic tangled paths like a real tumbleweed
function generateTumbleweedPaths(): TumbleweedPath[] {
  const paths: TumbleweedPath[] = []
  const centerX = 350  // Wider viewBox center
  const centerY = 100

  // Inner tangled mess - tight loops
  for (let i = 0; i < 20; i++) {
    const startAngle = Math.random() * Math.PI * 2
    const radius = 15 + Math.random() * 25
    const startX = centerX + Math.cos(startAngle) * radius
    const startY = centerY + Math.sin(startAngle) * radius

    const cp1x = centerX + (Math.random() - 0.5) * 80
    const cp1y = centerY + (Math.random() - 0.5) * 80
    const cp2x = centerX + (Math.random() - 0.5) * 90
    const cp2y = centerY + (Math.random() - 0.5) * 90
    const endAngle = startAngle + (Math.random() - 0.5) * Math.PI * 1.5
    const endRadius = 20 + Math.random() * 30
    const endX = centerX + Math.cos(endAngle) * endRadius
    const endY = centerY + Math.sin(endAngle) * endRadius

    paths.push({
      d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      strokeWidth: 1.5 + Math.random() * 2,
      opacity: 0.7 + Math.random() * 0.3,
      animDelay: Math.random() * 2,
      animDuration: 2 + Math.random() * 3,
      translateRange: { x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 10 },
      rotateRange: (Math.random() - 0.5) * 30,
    })
  }

  // Middle layer - more spread out tangles
  for (let i = 0; i < 25; i++) {
    const startAngle = Math.random() * Math.PI * 2
    const radius = 25 + Math.random() * 45
    const startX = centerX + Math.cos(startAngle) * radius
    const startY = centerY + Math.sin(startAngle) * radius

    const cp1x = centerX + (Math.random() - 0.5) * 120
    const cp1y = centerY + (Math.random() - 0.5) * 100
    const cp2x = centerX + (Math.random() - 0.5) * 110
    const cp2y = centerY + (Math.random() - 0.5) * 100
    const endAngle = startAngle + Math.PI * (0.5 + Math.random())
    const endRadius = 30 + Math.random() * 45
    const endX = centerX + Math.cos(endAngle) * endRadius
    const endY = centerY + Math.sin(endAngle) * endRadius

    paths.push({
      d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      strokeWidth: 1.2 + Math.random() * 1.8,
      opacity: 0.6 + Math.random() * 0.4,
      animDelay: Math.random() * 2,
      animDuration: 1.5 + Math.random() * 2.5,
      translateRange: { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 12 },
      rotateRange: (Math.random() - 0.5) * 45,
    })
  }

  // Outer wild strands sticking out
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
    const innerRadius = 40 + Math.random() * 20
    const outerRadius = 80 + Math.random() * 60
    const startX = centerX + Math.cos(angle) * innerRadius
    const startY = centerY + Math.sin(angle) * innerRadius
    const endX = centerX + Math.cos(angle + (Math.random() - 0.5) * 1.2) * outerRadius
    const endY = centerY + Math.sin(angle + (Math.random() - 0.5) * 1.2) * outerRadius

    const cpAngle = angle + (Math.random() - 0.5) * 1.5
    const cpRadius = innerRadius + (outerRadius - innerRadius) * 0.5 + (Math.random() - 0.5) * 40
    const cpX = centerX + Math.cos(cpAngle) * cpRadius
    const cpY = centerY + Math.sin(cpAngle) * cpRadius

    paths.push({
      d: `M ${startX} ${startY} Q ${cpX} ${cpY}, ${endX} ${endY}`,
      strokeWidth: 1 + Math.random() * 1.5,
      opacity: 0.5 + Math.random() * 0.4,
      animDelay: Math.random() * 2,
      animDuration: 1 + Math.random() * 2,
      translateRange: { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 15 },
      rotateRange: (Math.random() - 0.5) * 60,
    })
  }

  // Extra chaotic cross-hatching
  for (let i = 0; i < 25; i++) {
    const angle1 = Math.random() * Math.PI * 2
    const angle2 = angle1 + Math.PI * (0.3 + Math.random() * 0.7)
    const r1 = 20 + Math.random() * 60
    const r2 = 20 + Math.random() * 60

    const x1 = centerX + Math.cos(angle1) * r1
    const y1 = centerY + Math.sin(angle1) * r1
    const x2 = centerX + Math.cos(angle2) * r2
    const y2 = centerY + Math.sin(angle2) * r2

    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 50
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 50

    paths.push({
      d: `M ${x1} ${y1} Q ${midX} ${midY}, ${x2} ${y2}`,
      strokeWidth: 1.3 + Math.random() * 1.7,
      opacity: 0.65 + Math.random() * 0.35,
      animDelay: Math.random() * 2,
      animDuration: 1.2 + Math.random() * 2.3,
      translateRange: { x: (Math.random() - 0.5) * 70, y: (Math.random() - 0.5) * 12 },
      rotateRange: (Math.random() - 0.5) * 40,
    })
  }

  // Extra sprawling lines that reach far
  for (let i = 0; i < 12; i++) {
    const angle = Math.random() * Math.PI * 2
    const startX = centerX + (Math.random() - 0.5) * 40
    const startY = centerY + (Math.random() - 0.5) * 40
    const endX = centerX + Math.cos(angle) * (120 + Math.random() * 80)
    const endY = centerY + Math.sin(angle) * (60 + Math.random() * 40)

    const cp1x = startX + (Math.random() - 0.5) * 100
    const cp1y = startY + (Math.random() - 0.5) * 60
    const cp2x = endX + (Math.random() - 0.5) * 60
    const cp2y = endY + (Math.random() - 0.5) * 40

    paths.push({
      d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      strokeWidth: 0.8 + Math.random() * 1.2,
      opacity: 0.4 + Math.random() * 0.3,
      animDelay: Math.random() * 2,
      animDuration: 2 + Math.random() * 3,
      translateRange: { x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 15 },
      rotateRange: (Math.random() - 0.5) * 50,
    })
  }

  return paths
}

// Animated path component with random movement
function AnimatedPath({ path }: { path: TumbleweedPath }) {
  const centerX = 350
  const centerY = 100

  return (
    <motion.path
      d={path.d}
      fill="none"
      stroke="#2d2d2d"
      strokeWidth={path.strokeWidth}
      strokeLinecap="round"
      opacity={path.opacity}
      animate={{
        x: [0, path.translateRange.x, -path.translateRange.x * 0.7, path.translateRange.x * 0.5, 0],
        y: [0, path.translateRange.y, -path.translateRange.y * 0.6, path.translateRange.y * 0.4, 0],
        rotate: [0, path.rotateRange, -path.rotateRange * 0.8, path.rotateRange * 0.3, 0],
      }}
      transition={{
        duration: path.animDuration,
        delay: path.animDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        originX: `${centerX}px`,
        originY: `${centerY}px`,
      }}
    />
  )
}

// Generate paths once at module level
const tumbleweedPaths = generateTumbleweedPaths()

export function ChaosTumbleweed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const baseFrequency = useTransform(smoothX, [0, 1], [0.01, 0.035])
  const displacementScale = useTransform(smoothY, [0, 1], [15, 50])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '250px',
        margin: '2rem auto',
        cursor: 'crosshair',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 700 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="chaos-distort" x="-50%" y="-50%" width="200%" height="200%">
            <motion.feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves={3}
              seed={5}
              result="noise"
            />
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g
          filter={isHovered ? "url(#chaos-distort)" : undefined}
          style={{ transition: 'filter 0.3s ease' }}
        >
          {tumbleweedPaths.map((path, i) => (
            <AnimatedPath key={i} path={path} />
          ))}
        </g>
      </svg>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#888',
        marginTop: '0.5rem',
        fontFamily: 'sans-serif',
      }}>
        {isHovered ? 'even more chaos' : 'hover to disturb'}
      </p>
    </div>
  )
}
