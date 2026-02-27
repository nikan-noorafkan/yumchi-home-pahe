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

## 2) حرکت ایموجی‌ها دقیقاً چطور ساخته شده؟

در این پروژه، هر ایموجی یک `Particle` با ویژگی‌های مستقل است. یعنی هرکدام:
- موقعیت خودش را دارد (`x`, `y`)
- سایز خودش را دارد (`size`)
- سرعت افقی/عمودی خودش را دارد (`speedX`, `speedY`)
- زاویه چرخش خودش را دارد (`rotation`, `rotationSpeed`)

به‌خاطر همین استقلال، حرکت‌ها «یکدست و رباتیک» نیستند و حالت طبیعی/رندوم می‌گیرند.

### کد مقداردهی اولیه (رندوم‌سازی)

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

**نکته:** همین بازه‌ها باعث می‌شوند ذرات بعضی آهسته‌تر، بعضی سریع‌تر، بعضی بزرگ‌تر و بعضی کم‌رنگ‌تر دیده شوند.

## 3) Opacity مناسب یعنی چه و اینجا چطور تنظیم شده؟

برای اینکه بک‌گراند شلوغ نشود و تمرکز از UI اصلی نگیرد، opacity روی بازه کم تنظیم شده:

```ts
opacity: 0.08 + Math.random() * 0.2
```

یعنی هر ذره بین **0.08 تا 0.28** شفافیت دارد. این انتخاب چند مزیت مهم دارد:
- افکت «حضور» دارد ولی مزاحم خوانایی متن نیست.
- ذرات روی هم افتادن شدید بصری ایجاد نمی‌کنند.
- حس ambient و نرم حفظ می‌شود.

### اگر بخواهی opacity را تیون کنی

- برای صفحات محتوایی: بازه را کم‌تر کن (مثلاً `0.05..0.18`).
- برای onboarding یا hero section: کمی بیشتر کن (مثلاً `0.12..0.32`).
- برای موبایل: همزمان تعداد ذرات و opacity را کمی پایین بیاور.

## 4) Interactive بودن دقیقاً کجاست؟

تعامل با حرکت ماوس انجام می‌شود. رویداد `mousemove` روی `window` ثبت می‌شود و مختصات لحظه‌ای ماوس داخل `mouseRef` ذخیره می‌گردد.

سپس در حلقه انیمیشن، برای هر ذره:
1. فاصله تا ماوس حساب می‌شود.
2. اگر فاصله کمتر از 150px بود، نیروی دافعه اعمال می‌شود.
3. هرچه نزدیک‌تر باشد، دافعه بیشتر می‌شود.

### کد اصلی دافعه

```ts
const dx = p.x - mouseRef.current.x
const dy = p.y - mouseRef.current.y
const dist = Math.sqrt(dx * dx + dy * dy)
if (dist < 150) {
  const force = (150 - dist) / 150
  p.x += (dx / dist) * force * 2
  p.y += (dy / dist) * force * 2
}
```

### چرا این مهم است؟

این باعث می‌شود user حس کند «صحنه به حضور او واکنش می‌دهد» و تجربه زنده‌تر شود.

> نکته فنی: برای جلوگیری از تقسیم بر صفر، می‌توان شرط ایمن‌تر `if (dist > 0 && dist < 150)` گذاشت.

## 5) حلقه رندر و اجرای روان

```ts
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particlesRef.current.forEach((p) => {
    p.x += p.speedX
    p.y += p.speedY
    p.rotation += p.rotationSpeed

    if (p.x < -50) p.x = canvas.width + 50
    if (p.x > canvas.width + 50) p.x = -50
    if (p.y < -50) p.y = canvas.height + 50
    if (p.y > canvas.height + 50) p.y = -50

    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.globalAlpha = p.opacity
    ctx.font = `${p.size}px serif`
    ctx.fillText(p.emoji, 0, 0)
    ctx.restore()
  })

  requestAnimationFrame(animate)
}
```

- `wrap around` باعث می‌شود ذرات قطع نشوند و جریان دائم حس شود.
- `requestAnimationFrame` هماهنگ با فریم مرورگر است و مصرف را بهتر مدیریت می‌کند.

## 6) اتصال به User Journey در همین پروژه

در `app/page.tsx`، بک‌گراند همیشه فعال است ولی شدت (`intensity`) متناسب با مرحله سفر کاربر تغییر می‌کند:

- `landing` و `worldSelect` → شدت `1`
- `cookShowcase` و `cookApp` → شدت `0.5`
- بقیه حالت‌ها → شدت `0.4`

### چرا این تصمیم UX خوبی است؟

- در لحظه‌های هویتی (ورود/انتخاب دنیا): انرژی بصری بیشتر.
- در صفحات عملیاتی: بک‌گراند آرام‌تر تا تمرکز روی task اصلی باشد.

### نمونه user journey کامل

1. کاربر وارد `landing` می‌شود → ذرات بیشتر، حس جادویی اولیه.
2. روی orb کلیک می‌کند و وارد `worldSelect` می‌شود → افکت هنوز پرانرژی است.
3. وارد world خاص (مثلاً cook) می‌شود → شدت کمتر می‌شود تا خوانایی کارت‌ها و CTA بالا بماند.
4. داخل app flow می‌رود → بک‌گراند هنوز زنده است اما مزاحم نیست.

## 7) چطور پروژه را اجرا کنیم

پیش‌نیاز: Node.js نسخه 18+ (ترجیحاً 20+) و pnpm.

```bash
pnpm install
pnpm dev
```

بعد، در مرورگر بروید به:
- `http://localhost:3000` (نسخه انگلیسی)
- `http://localhost:3000/fa` (نسخه فارسی)

## 8) اگر بخواهی نسخه‌ی مشابه از صفر بسازی

1. یک کامپوننت `FloatingParticles` بساز (client component).
2. یک `canvas` فول‌اسکرین (`fixed inset-0`) رندر کن.
3. در `useEffect`:
   - `resize` هندل کن.
   - `mousemove` (و برای موبایل در صورت نیاز `touchmove`) هندل کن.
   - حلقه‌ی `requestAnimationFrame` راه بینداز.
4. لیست ingredients را تعریف کن (emoji/SVG/image sprite).
5. با prop مثل `intensity` تعداد ذرات را با مرحله‌ی user journey سینک کن.
6. cleanup کامل انجام بده (`cancelAnimationFrame` + `removeEventListener`).

## 9) تیونینگ پیشنهادی برای محصول واقعی

- onboarding: سرعت کمتر + ذره بیشتر + opacity کمی بالاتر.
- task-heavy screens: ذره کمتر + opacity پایین‌تر.
- موبایل: تعداد ذرات 30-40% کم‌تر.
- performance:
  - adaptive particle count براساس viewport.
  - محدود کردن سایز ایموجی‌ها.
  - پرهیز از افکت‌های سنگین اضافی.

---

اگر بخواهی، قدم بعدی می‌تواند این باشد که همین کامپوننت را از ایموجی به SVG چندلایه با parallax تبدیل کنیم تا حس «ingredient cloud» کاملاً حرفه‌ای و برندمحور شود.
