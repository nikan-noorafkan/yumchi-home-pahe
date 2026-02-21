"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

interface EnergyOrbProps {
  onActivate: () => void
  isActive: boolean
}

export function EnergyOrb({ onActivate, isActive }: EnergyOrbProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(springY, [-200, 200], [15, -15])
  const rotateY = useTransform(springX, [-200, 200], [-15, 15])

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setPulseCount((c) => c + 1)
      }, 600)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      onClick={onActivate}
      style={{ perspective: 800 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 0 : 1,
        opacity: isActive ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: isActive ? 0 : 0.5 }}
    >
      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 220 + i * 50,
            height: 220 + i * 50,
            border: `2px solid`,
            borderColor: i === 0 ? "#e75e3c" : i === 1 ? "#f9bf43" : "#5bc2aa",
            opacity: isHovered ? 0.3 - i * 0.08 : 0.1 - i * 0.03,
          }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{
            rotate: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Pulse rings on hover */}
      {isHovered &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${pulseCount}-${i}`}
            className="absolute rounded-full border-2 border-primary"
            style={{ width: 180, height: 180 }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}

      {/* Main orb body */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{
          width: 180,
          height: 180,
          rotateX,
          rotateY,
        }}
      >
        {/* Orb gradient */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #f9bf43 0%, #e75e3c 40%, #c94a2e 70%, #8a3420 100%)",
            boxShadow: isHovered
              ? "0 0 60px 20px rgba(231,94,60,0.4), 0 0 120px 40px rgba(249,191,67,0.2), inset 0 0 30px rgba(255,255,255,0.2)"
              : "0 0 40px 10px rgba(231,94,60,0.2), 0 0 80px 20px rgba(249,191,67,0.1), inset 0 0 20px rgba(255,255,255,0.15)",
          }}
          animate={{
            scale: isHovered ? [1, 1.05, 1] : [1, 1.02, 1],
          }}
          transition={{
            duration: isHovered ? 1.2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner shine */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            top: 25,
            left: 30,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Center icon */}
        <motion.div
          className="relative z-20 text-5xl select-none"
          animate={{
            y: [0, -6, 0],
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span role="img" aria-label="cooking">
            🍳
          </span>
        </motion.div>
      </motion.div>

      {/* Call to action text */}
      <motion.p
        className="absolute -bottom-14 font-sans text-base font-semibold tracking-wide text-foreground/70 whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Tap to enter the food universe
      </motion.p>
    </motion.div>
  )
}
