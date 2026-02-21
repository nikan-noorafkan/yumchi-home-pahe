"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChefHat, Map, Flame, Compass, Star, Sparkles } from "lucide-react"

export type WorldChoice = "cook" | "maps" | null

type Locale = "en" | "fa"

interface WorldSelectorProps {
  onSelect: (world: WorldChoice) => void
  isVisible: boolean
  locale?: Locale
}

const COPY = {
  en: {
    title: "Choose your world",
    subtitle: "Where does your food journey begin?",
    cookDesc:
      "Your gamified cooking universe. Level up your skills, discover smart recipes, and master the kitchen.",
    cookPills: ["Gamified XP", "Smart Recipes", "Meal Plans"],
    cookCta: "Enter Kitchen",
    or: "or",
    mapsDesc:
      "Discover signature dishes and perfect restaurants. Your mood-based food adventure awaits.",
    mapsPills: ["Dish Radar", "Mood Match", "Food City"],
    mapsCta: "Explore Maps",
    preview: "PREVIEW",
  },
  fa: {
    title: "دنیای خودت را انتخاب کن",
    subtitle: "سفر خوشمزه‌ات را از کجا شروع می‌کنی؟",
    cookDesc:
      "یومچی کوک دنیای بازی‌گونه‌ی آشپزی توست؛ مهارتت را بالا ببر، دستورهای هوشمند کشف کن و آشپزخانه را فتح کن.",
    cookPills: ["XP بازی‌محور", "دستورهای هوشمند", "برنامه غذایی"],
    cookCta: "ورود به آشپزخانه",
    or: "یا",
    mapsDesc:
      "غذاهای امضادار و بهترین رستوران‌ها را کشف کن. ماجراجویی غذاییِ متناسب با حال‌وهوایت منتظر توست.",
    mapsPills: ["رادار غذا", "تطبیق با حال‌وهوا", "شهر غذا"],
    mapsCta: "ورود به نقشه‌ها",
    preview: "پیش‌نمایش",
  },
} as const

export function WorldSelector({ onSelect, isVisible, locale = "en" }: WorldSelectorProps) {
  const [hoveredWorld, setHoveredWorld] = useState<WorldChoice>(null)
  const t = COPY[locale]

  if (!isVisible) return null

  return (
    <motion.div
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0 w-full max-w-5xl mx-auto px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="w-full text-center mb-4 lg:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t.subtitle}</p>
      </motion.div>

      <motion.button
        className="relative flex-1 overflow-hidden rounded-3xl border-2 border-transparent cursor-pointer group w-full lg:w-auto backdrop-blur-[2px]"
        style={{
          background: "linear-gradient(135deg, rgba(231,94,60,0.16), rgba(249,191,67,0.20), rgba(255,248,239,0.92))",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect("cook")}
        onMouseEnter={() => setHoveredWorld("cook")}
        onMouseLeave={() => setHoveredWorld(null)}
        animate={{ borderColor: hoveredWorld === "cook" ? "#e75e3c" : "transparent" }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col items-center gap-4 p-8 lg:p-12">
          <motion.div className="absolute top-4 right-6 text-primary/20" animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Flame className="w-8 h-8" />
          </motion.div>
          <motion.div className="absolute bottom-6 left-6 text-secondary/30" animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
            <Star className="w-6 h-6" />
          </motion.div>

          <motion.div className="flex items-center justify-center w-20 h-20 rounded-2xl" style={{ background: "linear-gradient(135deg, #e75e3c, #f9bf43)" }} animate={{ boxShadow: hoveredWorld === "cook" ? "0 8px 32px rgba(231,94,60,0.4)" : "0 4px 16px rgba(231,94,60,0.2)" }}>
            <ChefHat className="w-10 h-10 text-card" />
          </motion.div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Yumchi Cook</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t.cookDesc}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {t.cookPills.map((f) => (
              <span key={f} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "#e75e3c18", color: "#e75e3c" }}>
                {f}
              </span>
            ))}
          </div>

          <motion.div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "#e75e3c" }} animate={{ x: hoveredWorld === "cook" ? [0, 4, 0] : 0 }} transition={{ duration: 0.8, repeat: hoveredWorld === "cook" ? Infinity : 0 }}>
            <Sparkles className="w-4 h-4" /> {t.cookCta}
            <motion.span animate={{ x: hoveredWorld === "cook" ? [0, 6, 0] : 0 }} transition={{ duration: 0.8, repeat: hoveredWorld === "cook" ? Infinity : 0 }}>
              &rarr;
            </motion.span>
          </motion.div>
        </div>
      </motion.button>

      <div className="flex items-center justify-center lg:mx-8 shrink-0">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-card border-2 border-border shadow-lg">
          <span className="text-muted-foreground font-bold text-sm">{t.or}</span>
        </div>
      </div>

      <motion.button
        className="relative flex-1 overflow-hidden rounded-3xl border-2 border-transparent cursor-pointer group w-full lg:w-auto backdrop-blur-[2px]"
        style={{
          background: "linear-gradient(135deg, rgba(91,194,170,0.16), rgba(249,191,67,0.14), rgba(246,251,247,0.92))",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect("maps")}
        onMouseEnter={() => setHoveredWorld("maps")}
        onMouseLeave={() => setHoveredWorld(null)}
        animate={{ borderColor: hoveredWorld === "maps" ? "#5bc2aa" : "transparent" }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col items-center gap-4 p-8 lg:p-12">
          <motion.div className="absolute top-4 left-6 text-accent/20" animate={{ y: [-4, 6, -4], rotate: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <Compass className="w-7 h-7" />
          </motion.div>
          <motion.div className="absolute bottom-6 right-6 text-secondary/25" animate={{ y: [4, -6, 4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Star className="w-5 h-5" />
          </motion.div>

          <motion.div className="flex items-center justify-center w-20 h-20 rounded-2xl" style={{ background: "linear-gradient(135deg, #5bc2aa, #3a9d87)" }} animate={{ boxShadow: hoveredWorld === "maps" ? "0 8px 32px rgba(91,194,170,0.4)" : "0 4px 16px rgba(91,194,170,0.2)" }}>
            <Map className="w-10 h-10 text-card" />
          </motion.div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Yumchi Maps</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t.mapsDesc}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {t.mapsPills.map((f) => (
              <span key={f} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "#5bc2aa18", color: "#3a9d87" }}>
                {f}
              </span>
            ))}
          </div>

          <motion.div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "#5bc2aa" }} animate={{ x: hoveredWorld === "maps" ? [0, 4, 0] : 0 }} transition={{ duration: 0.8, repeat: hoveredWorld === "maps" ? Infinity : 0 }}>
            <Sparkles className="w-4 h-4" /> {t.mapsCta}
            <motion.span animate={{ x: hoveredWorld === "maps" ? [0, 6, 0] : 0 }} transition={{ duration: 0.8, repeat: hoveredWorld === "maps" ? Infinity : 0 }}>
              &rarr;
            </motion.span>
          </motion.div>

          <div className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#f9bf43", color: "#443422" }}>
            {t.preview}
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}
