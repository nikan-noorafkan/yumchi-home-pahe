# راهنمای کامل بک‌گراند متحرک و تعاملی (Ingredient Background)

این پروژه همین حالا یک بک‌گراند متحرکِ تعاملی دارد که با ایموجی مواد غذایی روی `canvas` رندر می‌شود.

- فایل اصلی افکت: `components/landing/floating-particles.tsx`
- محل استفاده در صفحه اصلی: `app/page.tsx`

## 1) ایده‌ی فنی در یک نگاه

این بک‌گراند با `requestAnimationFrame` در هر فریم:
1. کل canvas را پاک می‌کند.
2. موقعیت هر ذره (ایموجی) را با سرعت خودش آپدیت می‌کند.
3. اگر ماوس نزدیک باشد، ذره را با نیروی دافعه جابه‌جا می‌کند.
4. وقتی ذره از کادر خارج شد، از سمت مقابل برمی‌گرداند (wrap around).

نتیجه: یک حرکت نرم، رندوم و زنده که با حرکت کاربر هم تعامل دارد.

## 2) کد کلیدی بک‌گراند

در این پروژه، این قطعه‌ها مهم هستند:

- آرایه‌ی آیتم‌های غذایی:

```ts
const FOOD_ITEMS = ["🍅", "🥕", "🌽", "🍋", ...]
```

- مقداردهی اولیه‌ی ذرات با ویژگی‌های رندوم:

```ts
particles.push({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 14 + Math.random() * 22,
  speedX: (Math.random() - 0.5) * 0.4,
  speedY: (Math.random() - 0.5) * 0.3 - 0.15,
  opacity: 0.08 + Math.random() * 0.2,
  emoji: FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)],
  rotation: Math.random() * 360,
  rotationSpeed: (Math.random() - 0.5) * 0.8,
})
```

- حلقه انیمیشن:

```ts
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particlesRef.current.forEach((p) => {
    // mouse repulsion + movement + wrap + draw
  })
  requestAnimationFrame(animate)
}
```

## 3) تعامل با کاربر (Interactive)

رویداد `mousemove` روی `window` گرفته می‌شود. در هر فریم فاصله‌ی ذره تا ماوس حساب می‌شود:

- اگر فاصله کمتر از 150px بود، ذره کمی از ماوس دور می‌شود.
- هر چه فاصله کمتر باشد، نیرو بیشتر است.

این باعث می‌شود کاربر «اثر حضور» ببیند و حس زنده بودن فضا بیشتر شود.

## 4) اتصال به User Journey در همین پروژه

در `app/page.tsx`، بک‌گراند همیشه فعال است اما شدت (`intensity`) با توجه به مرحله‌ی سفر کاربر تغییر می‌کند:

- `landing` و `worldSelect` → شدت 1 (پررنگ‌تر)
- `cookShowcase` / `cookApp` → شدت 0.5
- سایر حالت‌ها → شدت 0.4

یعنی در نقاط مهم تجربه (ورود/انتخاب دنیا) انرژی بصری بالاتر است، و در صفحات محتوایی کمی آرام‌تر می‌شود تا تمرکز کاربر روی محتوا بماند.

## 5) چطور پروژه را اجرا کنیم

پیش‌نیاز: Node.js نسخه 18+ (بهتر 20+) و pnpm.

```bash
pnpm install
pnpm dev
```

بعد، در مرورگر بروید به:

- `http://localhost:3000` (نسخه انگلیسی)
- `http://localhost:3000/fa` (نسخه فارسی)

## 6) اگر بخواهی نسخه‌ی مشابه از صفر بسازی

1. یک کامپوننت `FloatingParticles` بساز (client component).
2. یک `canvas` فول‌اسکرین (`fixed inset-0`) رندر کن.
3. در `useEffect`:
   - `resize` هندل کن.
   - `mousemove` هندل کن.
   - حلقه‌ی `requestAnimationFrame` راه بینداز.
4. لیست `ingredients` را ایموجی/آیکون/تصویر تعریف کن.
5. با prop مثل `intensity` تعداد ذرات را بر اساس مرحله‌ی user journey تغییر بده.
6. حتما cleanup انجام بده (`cancelAnimationFrame` و removeEventListener).

## 7) تنظیمات پیشنهادی برای Product حس بهتر

- در onboarding: شدت بیشتر، سرعت کمتر (حس جادویی).
- در صفحات task-heavy: شدت کمتر، opacity کمتر.
- برای موبایل: تعداد ذرات را 30-40% کم‌تر کن.
- اگر performance مهم است:
  - تعداد ذرات را adaptive کن.
  - فقط ایموجی/بردار سبک بکش.
  - از blur زیاد پرهیز کن.

---

اگر بخواهی، قدم بعدی می‌تواند این باشد که همین کامپوننت را به‌جای ایموجی با SVG مواد اولیه واقعی (گوجه، پیاز، فلفل...) و parallax چندلایه ارتقا بدهیم تا حس «ingredient cloud» حرفه‌ای‌تر شود.
