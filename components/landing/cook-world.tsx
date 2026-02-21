"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  ChefHat,
  Flame,
  Timer,
  CalendarDays,
  Search,
  Trophy,
  Star,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react"

interface CookWorldProps {
  isVisible: boolean
  onEnterApp: () => void
  onBack: () => void
}

interface FeatureStation {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  emoji: string
  xp: number
}

const FEATURES: FeatureStation[] = [
  {
    id: "gamified",
    title: "Gamified Cooking",
    description: "Level up your culinary skills. Earn XP for every dish you master.",
    icon: <Trophy className="w-7 h-7" />,
    color: "#e75e3c",
    emoji: "🏆",
    xp: 150,
  },
  {
    id: "recipes",
    title: "Smart Recipes",
    description: "AI-powered recipes that adapt to your ingredients and skill level.",
    icon: <Sparkles className="w-7 h-7" />,
    color: "#f9bf43",
    emoji: "📖",
    xp: 100,
  },
  {
    id: "guided",
    title: "Guided Cooking",
    description: "Step-by-step guidance with smart timers and real-time assistance.",
    icon: <Timer className="w-7 h-7" />,
    color: "#5bc2aa",
    emoji: "⏱️",
    xp: 120,
  },
  {
    id: "planner",
    title: "Meal Planning",
    description: "Smart weekly meal plans built from your preferences and goals.",
    icon: <CalendarDays className="w-7 h-7" />,
    color: "#e75e3c",
    emoji: "📅",
    xp: 80,
  },
  {
    id: "intelligence",
    title: "Ingredient Intelligence",
    description: "Tap any ingredient and discover what you can create with it.",
    icon: <Search className="w-7 h-7" />,
    color: "#f9bf43",
    emoji: "🧠",
    xp: 200,
  },
]

function FeatureCard({
  feature,
  index,
  onInteract,
  isCompleted,
}: {
  feature: FeatureStation
  index: number
  onInteract: () => void
  isCompleted: boolean
}) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setIsPressed(true)
        onInteract()
        setTimeout(() => setIsPressed(false), 600)
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-6 h-full"
        style={{
          background: `linear-gradient(135deg, ${feature.color}08, ${feature.color}15)`,
          border: `1.5px solid ${isCompleted ? feature.color : feature.color + "30"}`,
        }}
      >
        {/* Completion glow */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle at center, ${feature.color}15, transparent 70%)`,
            }}
          />
        )}

        {/* XP Burst */}
        <AnimatePresence>
          {isPressed && (
            <motion.div
              className="absolute top-2 right-2 font-bold text-sm z-20"
              style={{ color: feature.color }}
              initial={{ scale: 0, y: 10, opacity: 0 }}
              animate={{ scale: 1.2, y: -20, opacity: 1 }}
              exit={{ scale: 0, y: -40, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              +{feature.xp} XP
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col gap-3">
          {/* Icon container */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl text-card"
              style={{ background: feature.color }}
              animate={
                isCompleted
                  ? {
                      boxShadow: [
                        `0 4px 12px ${feature.color}40`,
                        `0 4px 24px ${feature.color}60`,
                        `0 4px 12px ${feature.color}40`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {feature.icon}
            </motion.div>

            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Star
                  className="w-5 h-5"
                  style={{ color: feature.color }}
                  fill={feature.color}
                />
              </motion.div>
            )}
          </div>

          <div>
            <h4 className="font-bold text-foreground text-base">{feature.title}</h4>
            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Interactive hint */}
          <div className="flex items-center gap-1.5 mt-1">
            <Zap className="w-3.5 h-3.5" style={{ color: feature.color }} />
            <span className="text-xs font-medium" style={{ color: feature.color }}>
              {isCompleted ? "Discovered" : "Tap to discover"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CookWorld({ isVisible, onEnterApp, onBack }: CookWorldProps) {
  const [completedFeatures, setCompletedFeatures] = useState<Set<string>>(new Set())
  const [totalXP, setTotalXP] = useState(0)
  const portalReady = completedFeatures.size >= 2

  const handleFeatureInteract = (feature: FeatureStation) => {
    if (!completedFeatures.has(feature.id)) {
      setCompletedFeatures((prev) => new Set([...prev, feature.id]))
      setTotalXP((prev) => prev + feature.xp)
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Warm ambient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #e75e3c08 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #f9bf4308 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={onBack}
            whileHover={{ x: -4 }}
          >
            <span>&larr;</span> Back to worlds
          </motion.button>

          {/* XP Counter */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm"
            animate={
              totalXP > 0
                ? { scale: [1, 1.05, 1] }
                : {}
            }
            transition={{ duration: 0.3 }}
          >
            <Flame className="w-4 h-4" style={{ color: "#e75e3c" }} />
            <span className="text-sm font-bold text-foreground">{totalXP} XP</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero section */}
      <motion.div
        className="relative z-10 text-center px-4 pt-12 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
          style={{
            background: "linear-gradient(135deg, #e75e3c, #f9bf43)",
            boxShadow: "0 8px 32px rgba(231,94,60,0.3)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChefHat className="w-10 h-10 text-card" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 text-balance">
          Welcome to your
          <br />
          <span style={{ color: "#e75e3c" }}>cooking universe</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Discover what makes Yumchi Cook magical. Tap each feature to experience it.
        </p>

        {/* Progress indicator */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.id}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: completedFeatures.has(f.id)
                  ? f.color
                  : "#e0d5c4",
              }}
              animate={
                completedFeatures.has(f.id) ? { scale: [1, 1.3, 1] } : {}
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Feature grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={i}
              onInteract={() => handleFeatureInteract(feature)}
              isCompleted={completedFeatures.has(feature.id)}
            />
          ))}
        </div>
      </div>

      {/* Kitchen Portal CTA */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto px-4 pt-4 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all"
          style={{
            background: portalReady
              ? "linear-gradient(135deg, #e75e3c, #c94a2e)"
              : "#e0d5c4",
            color: portalReady ? "#ffffff" : "#7a7570",
            boxShadow: portalReady
              ? "0 8px 32px rgba(231,94,60,0.4)"
              : "none",
          }}
          onClick={onEnterApp}
          whileHover={portalReady ? { scale: 1.03, y: -2 } : {}}
          whileTap={portalReady ? { scale: 0.97 } : {}}
          animate={
            portalReady
              ? {
                  boxShadow: [
                    "0 8px 32px rgba(231,94,60,0.3)",
                    "0 8px 48px rgba(231,94,60,0.5)",
                    "0 8px 32px rgba(231,94,60,0.3)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChefHat className="w-5 h-5" />
          {portalReady ? "Start Cooking" : `Discover ${2 - completedFeatures.size} more feature${2 - completedFeatures.size !== 1 ? "s" : ""}`}
          {portalReady && <ArrowRight className="w-5 h-5" />}
        </motion.button>

        {/* Skip option */}
        <motion.button
          className="w-full text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onEnterApp}
          whileHover={{ scale: 1.02 }}
        >
          Enter kitchen now &rarr;
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
