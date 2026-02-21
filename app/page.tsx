"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FloatingParticles } from "@/components/landing/floating-particles"
import { EnergyOrb } from "@/components/landing/energy-orb"
import { WorldSelector, type WorldChoice } from "@/components/landing/world-selector"
import { PortalTransition } from "@/components/landing/portal-transition"
import { CookWorld } from "@/components/landing/cook-world"
import { MapsWorld } from "@/components/landing/maps-world"
import { CookAppHome } from "@/components/landing/cook-app-home"

type ExperiencePhase =
  | "landing"
  | "worldSelect"
  | "transitioning"
  | "cookShowcase"
  | "mapsPreview"
  | "cookApp"

type TransitionDestination = Exclude<ExperiencePhase, "landing" | "worldSelect" | "transitioning">

export default function HomePage() {
  const [phase, setPhase] = useState<ExperiencePhase>("landing")
  const [targetWorld, setTargetWorld] = useState<WorldChoice>(null)
  const [transitionDestination, setTransitionDestination] = useState<TransitionDestination | null>(null)

  const handleOrbActivate = useCallback(() => {
    setPhase("worldSelect")
  }, [])

  const handleWorldSelect = useCallback((world: WorldChoice) => {
    setTargetWorld(world)
    setTransitionDestination(world === "cook" ? "cookShowcase" : "mapsPreview")
    setPhase("transitioning")
  }, [])

  const handleTransitionComplete = useCallback(() => {
    if (transitionDestination) {
      setPhase(transitionDestination)
      setTransitionDestination(null)
    }
  }, [transitionDestination])

  const handleBackToWorlds = useCallback(() => {
    setPhase("worldSelect")
    setTargetWorld(null)
  }, [])

  const handleEnterCookApp = useCallback(() => {
    setTargetWorld("cook")
    setTransitionDestination("cookApp")
    setPhase("transitioning")
  }, [])

  const handleGoToCookFromMaps = useCallback(() => {
    setTargetWorld("cook")
    setTransitionDestination("cookShowcase")
    setPhase("transitioning")
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <a href="/fa" className="absolute top-4 right-4 z-20 rounded-full px-3 py-1.5 text-xs font-bold border border-border bg-card/80 backdrop-blur-sm hover:bg-card transition-colors">
        فارسی
      </a>

      {/* Floating food particles - always present */}
      <FloatingParticles
        intensity={
          phase === "landing" || phase === "worldSelect"
            ? 1
            : phase === "cookShowcase" || phase === "cookApp"
              ? 0.5
              : 0.4
        }
      />

      {/* Portal Transition */}
      <PortalTransition
        isActive={phase === "transitioning"}
        targetWorld={targetWorld}
        onComplete={handleTransitionComplete}
      />

      {/* Landing Phase */}
      <AnimatePresence mode="wait">
        {phase === "landing" && (
          <motion.div
            key="landing"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight text-center">
                <span style={{ color: "#e75e3c" }}>yum</span>
                <span style={{ color: "#f9bf43" }}>chi</span>
              </h1>
              <motion.p
                className="text-center text-muted-foreground text-sm md:text-base mt-2 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                your magical food universe
              </motion.p>
            </motion.div>

            {/* Energy Orb */}
            <EnergyOrb
              onActivate={handleOrbActivate}
              isActive={phase !== "landing"}
            />
          </motion.div>
        )}

        {phase === "worldSelect" && (
          <motion.div
            key="worldSelect"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo small */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight text-center">
                <span style={{ color: "#e75e3c" }}>yum</span>
                <span style={{ color: "#f9bf43" }}>chi</span>
              </h2>
              <p className="text-center text-muted-foreground text-sm mt-1">
                Choose your world
              </p>
            </motion.div>

            <WorldSelector
              onSelect={handleWorldSelect}
              isVisible={phase === "worldSelect"}
            />
          </motion.div>
        )}

        {phase === "cookShowcase" && (
          <motion.div
            key="cookShowcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CookWorld
              isVisible={phase === "cookShowcase"}
              onEnterApp={handleEnterCookApp}
              onBack={handleBackToWorlds}
            />
          </motion.div>
        )}

        {phase === "mapsPreview" && (
          <motion.div
            key="mapsPreview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MapsWorld
              isVisible={phase === "mapsPreview"}
              onNotify={() => {}}
              onGoToCook={handleGoToCookFromMaps}
              onBack={handleBackToWorlds}
            />
          </motion.div>
        )}

        {phase === "cookApp" && (
          <motion.div
            key="cookApp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CookAppHome isVisible={phase === "cookApp"} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
