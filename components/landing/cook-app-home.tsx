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
  locale?: "en" | "fa"
}

export function CookAppHome({ isVisible, locale = "en" }: CookAppHomeProps) {
  if (!isVisible) return null

  const isFa = locale === "fa"
  const quickActions = [
    { label: isFa ? "شروع آشپزی" : "Start Cooking", icon: <Flame className="w-5 h-5" />, color: "#e75e3c" },
    { label: isFa ? "دستورهای من" : "My Recipes", icon: <BookOpen className="w-5 h-5" />, color: "#f9bf43" },
    { label: isFa ? "برنامه غذایی" : "Meal Plan", icon: <CalendarDays className="w-5 h-5" />, color: "#5bc2aa" },
    { label: isFa ? "دستاوردها" : "Achievements", icon: <Trophy className="w-5 h-5" />, color: "#e75e3c" },
  ]

  const recipes = [
    { name: "Truffle Mushroom Risotto", time: isFa ? "۳۵ دقیقه" : "35 min", xp: 250, difficulty: isFa ? "متوسط" : "Intermediate", stars: 4.8 },
    { name: "Thai Basil Stir Fry", time: isFa ? "۲۰ دقیقه" : "20 min", xp: 150, difficulty: isFa ? "آسان" : "Easy", stars: 4.9 },
    { name: "Homemade Sourdough", time: isFa ? "۴ ساعت" : "4 hrs", xp: 500, difficulty: isFa ? "حرفه‌ای" : "Advanced", stars: 4.7 },
  ]

  return (
    <motion.div dir={isFa ? "rtl" : "ltr"} className="relative min-h-screen z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.header className="sticky top-0 z-20 backdrop-blur-md border-b border-border" style={{ background: "#f4ebdcee" }} initial={{ y: -60 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "linear-gradient(135deg, #e75e3c, #f9bf43)" }}>
              <ChefHat className="w-5 h-5 text-card" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-none">Yumchi Cook</h1>
              <p className="text-xs text-muted-foreground">{isFa ? "سرآشپز سطح ۱" : "Level 1 Chef"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={isFa ? "جستجو" : "Search"}><Search className="w-5 h-5 text-muted-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={isFa ? "اعلان‌ها" : "Notifications"}><Bell className="w-5 h-5 text-muted-foreground" /></button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#e75e3c20" }} aria-label={isFa ? "پروفایل" : "Profile"}><User className="w-4 h-4" style={{ color: "#e75e3c" }} /></button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
        <motion.div className="rounded-2xl p-6 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #e75e3c, #c94a2e)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="relative z-10">
            <p className="text-sm font-medium" style={{ color: "#ffffff90" }}>{isFa ? "صبح بخیر، سرآشپز" : "Good morning, Chef"}</p>
            <h2 className="text-2xl font-bold text-card mt-1 text-balance">{isFa ? "آماده‌ای یک غذای فوق‌العاده بپزی؟" : "Ready to cook something amazing?"}</h2>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-card text-sm"><Flame className="w-4 h-4" /><span className="font-semibold">0 XP</span></div>
              <div className="flex items-center gap-1.5 text-card text-sm"><TrendingUp className="w-4 h-4" /><span className="font-semibold">{isFa ? "۳ روز پیوسته" : "3 day streak"}</span></div>
            </div>
          </div>
          <motion.div className="absolute right-4 top-4 text-5xl opacity-20" animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><span>🍳</span></motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{isFa ? "اقدام‌های سریع" : "Quick Actions"}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <motion.button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: `${action.color}15` }}><span style={{ color: action.color }}>{action.icon}</span></div>
                <span className="text-xs font-semibold text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{isFa ? "دستورهای ترند" : "Trending Recipes"}</h3>
          <div className="flex flex-col gap-3">
            {recipes.map((recipe, i) => (
              <motion.div key={recipe.name} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all cursor-pointer" whileHover={{ x: 4 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: i === 0 ? "#e75e3c12" : i === 1 ? "#5bc2aa12" : "#f9bf4312" }}>{i === 0 ? "🍄" : i === 1 ? "🌿" : "🍞"}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm">{recipe.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {recipe.time}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#e75e3c" }}><Flame className="w-3 h-3" /> {recipe.xp} XP</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3" fill="#f9bf43" style={{ color: "#f9bf43" }} /> {recipe.stars}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0" style={{ background: recipe.difficulty === (isFa ? "آسان" : "Easy") ? "#5bc2aa18" : recipe.difficulty === (isFa ? "متوسط" : "Intermediate") ? "#f9bf4318" : "#e75e3c18", color: recipe.difficulty === (isFa ? "آسان" : "Easy") ? "#3a9d87" : recipe.difficulty === (isFa ? "متوسط" : "Intermediate") ? "#b88d20" : "#c94a2e" }}>
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
