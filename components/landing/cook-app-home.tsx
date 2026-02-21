"use client"

import { motion } from "framer-motion"
import {
  ChefHat,
  Flame,
  BookOpen,
  CalendarDays,
  Trophy,
  Search,
  Bell,
  User,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react"

interface CookAppHomeProps {
  isVisible: boolean
}

const QUICK_ACTIONS = [
  { label: "Start Cooking", icon: <Flame className="w-5 h-5" />, color: "#e75e3c" },
  { label: "My Recipes", icon: <BookOpen className="w-5 h-5" />, color: "#f9bf43" },
  { label: "Meal Plan", icon: <CalendarDays className="w-5 h-5" />, color: "#5bc2aa" },
  { label: "Achievements", icon: <Trophy className="w-5 h-5" />, color: "#e75e3c" },
]

const TRENDING_RECIPES = [
  { name: "Truffle Mushroom Risotto", time: "35 min", xp: 250, difficulty: "Intermediate", stars: 4.8 },
  { name: "Thai Basil Stir Fry", time: "20 min", xp: 150, difficulty: "Easy", stars: 4.9 },
  { name: "Homemade Sourdough", time: "4 hrs", xp: 500, difficulty: "Advanced", stars: 4.7 },
]

export function CookAppHome({ isVisible }: CookAppHomeProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="relative min-h-screen z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* App header */}
      <motion.header
        className="sticky top-0 z-20 backdrop-blur-md border-b border-border"
        style={{ background: "#f4ebdcee" }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: "linear-gradient(135deg, #e75e3c, #f9bf43)" }}
            >
              <ChefHat className="w-5 h-5 text-card" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-none">Yumchi Cook</h1>
              <p className="text-xs text-muted-foreground">Level 1 Chef</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#e75e3c20" }}
              aria-label="Profile"
            >
              <User className="w-4 h-4" style={{ color: "#e75e3c" }} />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* Welcome card */}
        <motion.div
          className="rounded-2xl p-6 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #e75e3c, #c94a2e)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative z-10">
            <p className="text-sm font-medium" style={{ color: "#ffffff90" }}>
              Good morning, Chef
            </p>
            <h2 className="text-2xl font-bold text-card mt-1 text-balance">
              Ready to cook something amazing?
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-card text-sm">
                <Flame className="w-4 h-4" />
                <span className="font-semibold">0 XP</span>
              </div>
              <div className="flex items-center gap-1.5 text-card text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">3 day streak</span>
              </div>
            </div>
          </div>
          {/* Decorative float */}
          <motion.div
            className="absolute right-4 top-4 text-5xl opacity-20"
            animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>🍳</span>
          </motion.div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action, i) => (
              <motion.button
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: `${action.color}15` }}
                >
                  <span style={{ color: action.color }}>{action.icon}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Trending recipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Trending Recipes
          </h3>
          <div className="flex flex-col gap-3">
            {TRENDING_RECIPES.map((recipe, i) => (
              <motion.div
                key={recipe.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all cursor-pointer"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background:
                      i === 0 ? "#e75e3c12" : i === 1 ? "#5bc2aa12" : "#f9bf4312",
                  }}
                >
                  {i === 0 ? "🍄" : i === 1 ? "🌿" : "🍞"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm">{recipe.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#e75e3c" }}>
                      <Flame className="w-3 h-3" /> {recipe.xp} XP
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" fill="#f9bf43" style={{ color: "#f9bf43" }} /> {recipe.stars}
                    </span>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0"
                  style={{
                    background:
                      recipe.difficulty === "Easy"
                        ? "#5bc2aa18"
                        : recipe.difficulty === "Intermediate"
                          ? "#f9bf4318"
                          : "#e75e3c18",
                    color:
                      recipe.difficulty === "Easy"
                        ? "#3a9d87"
                        : recipe.difficulty === "Intermediate"
                          ? "#b88d20"
                          : "#c94a2e",
                  }}
                >
                  {recipe.difficulty}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
