# Uprep — chet elda o'qish platformasi

Sayt: https://xoliqberdiyevdalerjon-hub.github.io/uprep-site/

## Matnlarni tahrirlash
app.pagescms.org → uprep-site. Bo'limlar: Bosh sahifa, Biz haqimizda, Noldan: to'liq yo'riqnoma, Bosqichlar (kurs), Davlatlar, Italiya sahifasi, Shaharlar, Universitetlar, Kalendar, Materiallar. **Save** bosilgach sayt 1–2 daqiqada yangilanadi.

**Eslatma:** «Noldan» matni CMS'da o'zgartirilsa, sahifa darhol yangilanadi, lekin `media/uprep-italiyada-oqish-noldan.pdf` fayli avtomatik o'zgarmaydi. Uni Playwright bilan `#noldan` sahifasidan qayta yaratish kerak.

## Hisob va to'lovni yoqish (bir marta)
1. **Supabase** (supabase.com, GitHub bilan kiring) → New project.
   - SQL Editor → `supabase/schema.sql` ni ishga tushiring.
   - Authentication → URL Configuration → Site URL: sayt manzili.
   - Project Settings → API → `Project URL` va `anon public` kalitni `assets/config.js` ga yozing.
2. **Stripe** (stripe.com, Italiya) → Managed Payments'ni yoqing.
   - Mahsulot: "Uprep: Italiya kursi", $399, bir martalik, tax code `txcd_20060358` (Online courses – written material).
   - Payment Link yarating; "After payment" → redirect: `<sayt>/#hisob?paid=1`. Havolani `assets/config.js` dagi `paymentLink` ga yozing.
3. **Webhook**: Supabase → Edge Functions → `stripe-webhook` (`supabase/functions/stripe-webhook/index.ts`), Verify JWT: off.
   - Secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
   - Stripe → Developers → Webhooks → endpoint: `https://<project>.supabase.co/functions/v1/stripe-webhook`, event: `checkout.session.completed`.
4. **Pullik kontentni yopish**: kurs bloklarini `course_stages` jadvaliga ko'chirib, `content/stages.json` da faqat sarlavhalar qoldiriladi.

Hisoblar yoqilmaguncha sayt "tez orada" rejimida ishlaydi. Egasi uchun ko'rib chiqish: `<sayt>/#oldindan-korish`.

## Saytdan xabarlar avtomatik @Uprep_Admin'ga kelishi (Uprep bot)
Hozir «Profil tahlili», «Tariflar» va «Fikr» formalari xabarni tayyorlab, foydalanuvchiga Telegram'da qo'lda yuborishni ko'rsatadi. Avtomatik yuborish uchun:
1. Telegram'da **@BotFather** → `/newbot` → nom bering (masalan Uprep yordamchi) → **token**ni saqlang.
2. Admin akkauntidan yangi botga `/start` yozing. Brauzerda `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching va `"chat":{"id": ...}` raqamini oling: bu **ADMIN_CHAT_ID**.
3. Supabase → Edge Functions → yangi funksiya `lead` (`supabase/functions/lead/index.ts`), **Verify JWT: off**.
   Secrets: `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID`, `ALLOWED_ORIGIN` = `https://xoliqberdiyevdalerjon-hub.github.io`.
4. `assets/config.js` dagi `leadUrl` ga `https://<project>.supabase.co/functions/v1/lead` ni yozing.
Shundan keyin har bir natija botdan admin chatiga keladi, ichida talabaning aloqasi (@username yoki telefon) bo'ladi.

## Google uchun sahifalar
`python3 scripts/build_seo.py` har bir universitet (`uni/<kod>/`) va asosiy mavzular (`noldan/`, `stipendiya/`, `universitetlar/`, `foundation/`, `testlar/`, `ota-onalar/`, `tariflar/`, `qollanma/`) uchun statik sahifa, `sitemap.xml` va `robots.txt` yozadi. `content/*.json` o'zgarganda qayta ishga tushiring (haftalik tekshiruv buni o'zi qiladi). O'z domeningizga o'tsangiz, skriptdagi `BASE` ni va `index.html` dagi canonical manzilni o'zgartiring.

Google Search Console (ixtiyoriy, tavsiya etiladi): search.google.com/search-console → «URL prefix» → sayt manzili → «HTML tag» usuli. Berilgan `<meta name="google-site-verification" ...>` tegini `index.html` ning `<head>` qismiga qo'ying, so'ng «Sitemaps» bo'limiga `sitemap.xml` ni kiriting.
