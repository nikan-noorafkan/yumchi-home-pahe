"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PortalTransitionProps {
  isActive: boolean
  targetWorld: "cook" | "maps" | null
  onComplete: () => void
}

export function PortalTransition({ isActive, targetWorld, onComplete }: PortalTransitionProps) {
  const color = targetWorld === "cook" ? "#e75e3c" : "#5bc2aa"
  const label = targetWorld === "cook" ? "Entering Kitchen..." : "Exploring Maps..."

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#f4ebdc" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => {
            if (isActive) {
              setTimeout(onComplete, 800)
            }
          }}
        >
          {/* Expanding ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}30, ${color}05)`,
            }}
            initial={{ width: 0, height: 0 }}
            animate={{ width: 800, height: 800 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Core burst */}
          <motion.div
            className="relative z-10 w-24 h-24 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}, ${color}90)`,
              boxShadow: `0 0 60px 20px ${color}40`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Particle burst */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{ background: color }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                y: Math.sin((i * 30 * Math.PI) / 180) * 150,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          ))}

          {/* Label */}
          <motion.p
            className="relative z-10 mt-8 text-lg font-bold"
            style={{ color }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {label}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
