"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Map,
  MapPin,
  Compass,
  Heart,
  Star,
  Sparkles,
  Bell,
  ChefHat,
  ArrowRight,
  Utensils,
  Search,
  Radar,
} from "lucide-react"

interface MapsWorldProps {
  isVisible: boolean
  onNotify: () => void
  onGoToCook: () => void
  onBack: () => void
  locale?: "en" | "fa"
}

interface PreviewFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const PREVIEW_FEATURES: PreviewFeature[] = [
  {
    id: "dish-finder",
    title: "Find best dish instantly",
    description:
      "Search by craving, cuisine, or mood. Our AI finds the perfect dish at the perfect restaurant.",
    icon: <Search className="w-6 h-6" />,
    color: "#5bc2aa",
  },
  {
    id: "mood-discovery",
    title: "Mood-based discovery",
    description:
      "Feeling adventurous? Cozy? Celebratory? Your mood shapes your restaurant recommendations.",
    icon: <Heart className="w-6 h-6" />,
    color: "#e75e3c",
  },
  {
    id: "dish-radar",
    title: "Signature food radar",
    description:
      "Discover legendary dishes around you. See what makes each restaurant famous.",
    icon: <Radar className="w-6 h-6" />,
    color: "#f9bf43",
  },
  {
    id: "smart-dining",
    title: "Smart dining recommendations",
    description:
      "Learn your taste profile over time. Get better suggestions with every meal.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "#5bc2aa",
  },
]

function CityMapVisualization() {
  const pins = [
    { x: 20, y: 30, delay: 0, size: "lg" },
    { x: 55, y: 20, delay: 0.3, size: "md" },
    { x: 75, y: 45, delay: 0.6, size: "lg" },
    { x: 35, y: 60, delay: 0.9, size: "sm" },
    { x: 65, y: 70, delay: 1.2, size: "md" },
    { x: 15, y: 75, delay: 0.5, size: "sm" },
    { x: 85, y: 25, delay: 0.8, size: "sm" },
    { x: 45, y: 40, delay: 0.2, size: "lg" },
  ]

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-2xl backdrop-blur-[2px]" style={{ background: "#5bc2aa20", border: "1px solid #5bc2aa2e" }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={`${(i + 1) * 12.5}%`}
            x2="100%"
            y2={`${(i + 1) * 12.5}%`}
            stroke="#5bc2aa"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${(i + 1) * 8.33}%`}
            y1="0"
            x2={`${(i + 1) * 8.33}%`}
            y2="100%"
            stroke="#5bc2aa"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
          />
        ))}
      </svg>

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 z-10"
        style={{ background: "linear-gradient(90deg, transparent, #5bc2aa80, transparent)" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Map pins */}
      {pins.map((pin, i) => (
        <motion.div
          key={i}
          className="absolute z-10 flex flex-col items-center"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          initial={{ scale: 0, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.5 + pin.delay, type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MapPin
              className={`${pin.size === "lg" ? "w-6 h-6" : pin.size === "md" ? "w-5 h-5" : "w-4 h-4"}`}
              style={{ color: i % 3 === 0 ? "#e75e3c" : i % 3 === 1 ? "#f9bf43" : "#5bc2aa" }}
              fill={i % 3 === 0 ? "#e75e3c" : i % 3 === 1 ? "#f9bf43" : "#5bc2aa"}
            />
          </motion.div>
          {/* Pulse ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: pin.size === "lg" ? 30 : pin.size === "md" ? 24 : 18,
              height: pin.size === "lg" ? 30 : pin.size === "md" ? 24 : 18,
              border: `1px solid ${i % 3 === 0 ? "#e75e3c" : i % 3 === 1 ? "#f9bf43" : "#5bc2aa"}`,
            }}
            animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: pin.delay }}
          />
        </motion.div>
      ))}

      {/* Compass */}
      <motion.div
        className="absolute bottom-3 right-3 z-10"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Compass className="w-8 h-8" style={{ color: "#5bc2aa", opacity: 0.4 }} />
      </motion.div>
    </div>
  )
}

function FeaturePreviewCard({
  feature,
  index,
  isFa,
}: {
  feature: PreviewFeature
  index: number
  isFa: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="flex items-start gap-4 p-4 rounded-xl transition-all backdrop-blur-[1px]"
        style={{
          background: isExpanded ? `${feature.color}14` : "transparent",
          border: `1.5px solid ${isExpanded ? feature.color + "40" : "transparent"}`,
        }}
        whileHover={{ x: 4, background: `${feature.color}12` }}
      >
        <motion.div
          className="flex items-center justify-center w-10 h-10 rounded-xl text-card shrink-0"
          style={{ background: feature.color }}
          animate={isExpanded ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {feature.icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm">{feature.title}</h4>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                className="text-muted-foreground text-sm mt-1 leading-relaxed"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <p className="text-muted-foreground/80 text-xs mt-0.5">{isFa ? "برای پیش‌نمایش لمس کن" : "Tap to preview"}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MapsWorld({ isVisible, onNotify, onGoToCook, onBack, locale = "en" }: MapsWorldProps) {
  const isFa = locale === "fa"
  const localizedFeatures = PREVIEW_FEATURES.map((feature) => {
    if (!isFa) return feature
    if (feature.id === "dish-finder") {
      return { ...feature, title: "بهترین غذا را فوری پیدا کن", description: "براساس هوس، سبک غذا یا حال‌وهوا جست‌وجو کن. هوش مصنوعی ما بهترین غذا را در بهترین رستوران پیدا می‌کند." }
    }
    if (feature.id === "mood-discovery") {
      return { ...feature, title: "کشف بر پایه حال‌وهوا", description: "حال ماجراجویی داری؟ فضای دنج می‌خواهی؟ یا حال جشن داری؟ حال‌وهوایت پیشنهادها را می‌سازد." }
    }
    if (feature.id === "dish-radar") {
      return { ...feature, title: "رادار غذای امضادار", description: "غذاهای معروف اطرافت را کشف کن و ببین هر رستوران با کدام غذا مشهور شده." }
    }
    return { ...feature, title: "پیشنهاد هوشمند رستوران‌گردی", description: "سلیقه‌ات را به مرور یاد می‌گیریم تا با هر وعده پیشنهادهای دقیق‌تری بگیری." }
  })
  const [notifyEmail, setNotifyEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNotify = () => {
    if (notifyEmail) {
      setIsSubmitted(true)
      onNotify()
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      dir={isFa ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Teal ambient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, #5bc2aa08 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #f9bf4306 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-8"
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
            <span>&larr;</span> {isFa ? "بازگشت به دنیاها" : "Back to worlds"}
          </motion.button>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "#f9bf43", color: "#443422" }}
          >
            <Star className="w-3 h-3" />
            {isFa ? "پیش‌نمایش" : "PREVIEW"}
          </div>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="relative z-10 text-center px-4 pt-12 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
          style={{
            background: "linear-gradient(135deg, #5bc2aa, #3a9d87)",
            boxShadow: "0 8px 32px rgba(91,194,170,0.3)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Map className="w-10 h-10 text-card" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 text-balance">
          {isFa ? "شهر غذایی تو" : "Your food city"}
          <br />
          <span style={{ color: "#5bc2aa" }}>{isFa ? "در حال نقشه‌برداری است" : "is being mapped"}</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          {isFa ? "Yumchi Maps روش کشف غذا را متحول می‌کند. پیش‌نمایشی از آینده‌ی خوشمزه ببین." : "Yumchi Maps will transform how you discover food. Get a sneak peek at what's cooking."}
        </p>
      </motion.div>

      {/* City Map Visualization */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <CityMapVisualization />
      </motion.div>

      {/* Vision mini-cinematic */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { label: isFa ? "حال‌وهوا را انتخاب کن" : "Select your mood", icon: <Heart className="w-5 h-5" />, color: "#e75e3c" },
            { label: isFa ? "رستوران‌ها را کشف کن" : "Discover restaurants", icon: <Utensils className="w-5 h-5" />, color: "#f9bf43" },
            { label: isFa ? "غذاهای امضادار را پیدا کن" : "Find signature dishes", icon: <Star className="w-5 h-5" />, color: "#5bc2aa" },
          ].map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3 flex-shrink-0 px-4 py-3 rounded-xl"
              style={{
                background: `${step.color}10`,
                border: `1px solid ${step.color}25`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2 }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg text-card"
                style={{ background: step.color }}
              >
                {step.icon}
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {step.label}
              </span>
              {i < 2 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 ml-1" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feature Preview Cards */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pb-6">
        <motion.h3
          className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {isFa ? "ویژگی‌های آینده" : "Upcoming features"}
        </motion.h3>
        <div className="flex flex-col gap-1">
          {localizedFeatures.map((feature, i) => (
            <FeaturePreviewCard key={feature.id} feature={feature} index={i} isFa={isFa} />
          ))}
        </div>
      </div>

      {/* Coming Soon + Progress */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto px-4 pt-4 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <div className="text-center">
          <p className="text-lg font-bold text-foreground mb-3">
            {isFa ? "Yumchi Maps در حال آماده‌سازی است..." : "Yumchi Maps is cooking..."}
          </p>
          {/* Progress bar */}
          <div className="relative h-2 rounded-full overflow-hidden mx-auto max-w-xs" style={{ background: "#e0d5c4" }}>
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #5bc2aa, #3a9d87)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "68%" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.3) 50%)",
                backgroundSize: "20px 20px",
              }}
              animate={{ backgroundPosition: ["0px 0px", "20px 0px"] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{isFa ? "۶۸٪ تکمیل" : "68% complete"}</p>
        </div>
      </motion.div>

      {/* Notify CTA */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto px-4 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              className="flex flex-col gap-3"
              exit={{ opacity: 0, y: -10 }}
            >
              <div
                className="flex items-center gap-2 rounded-xl overflow-hidden border"
                style={{ borderColor: "#5bc2aa40" }}
              >
                <input
                  type="email"
                  placeholder={isFa ? "ایمیل@شما.com" : "your@email.com"}
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none"
                  aria-label={isFa ? "ایمیل برای اطلاع‌رسانی" : "Email for notification"}
                />
                <button
                  onClick={handleNotify}
                  className="flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-card transition-all shrink-0"
                  style={{ background: "#5bc2aa" }}
                >
                  <Bell className="w-4 h-4" />
                  {isFa ? "من را باخبر کن" : "Notify Me"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center p-6 rounded-2xl"
              style={{ background: "#5bc2aa12", border: "1.5px solid #5bc2aa30" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Star className="w-8 h-8 mx-auto mb-2" style={{ color: "#5bc2aa" }} fill="#5bc2aa" />
              </motion.div>
              <p className="font-bold text-foreground">{isFa ? "ثبت شدی!" : "You're on the list!"}</p>
              <p className="text-sm text-muted-foreground mt-1">{isFa ? "به‌محض آماده شدن Maps به تو خبر می‌دهیم." : "We'll notify you when Maps is ready to explore."}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cross-product funnel */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto px-4 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <motion.button
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-card transition-all"
          style={{
            background: "linear-gradient(135deg, #e75e3c, #c94a2e)",
            boxShadow: "0 8px 32px rgba(231,94,60,0.3)",
          }}
          onClick={onGoToCook}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <ChefHat className="w-5 h-5" />
          {isFa ? "تا آماده شدن ماجراجویی‌های غذایی‌ات، آشپزی را شروع کن" : "Start cooking while we prepare your food adventures"}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
