# Uprep — chet elda o'qish platformasi

Sayt: https://xoliqberdiyevdalerjon-hub.github.io/uprep-site/

## Matnlarni tahrirlash
app.pagescms.org → uprep-site. Bo'limlar: Bosh sahifa, Biz haqimizda, Noldan: to'liq yo'riqnoma, Bosqichlar (kurs), Davlatlar, Italiya sahifasi, Shaharlar, Universitetlar, Kalendar, Materiallar. **Save** bosilgach sayt 1–2 daqiqada yangilanadi.

**Eslatma:** «Noldan» matni CMS'da o'zgartirilsa, sahifa darhol yangilanadi, lekin `media/uprep-noldan-yoriqnoma.pdf` fayli avtomatik o'zgarmaydi. Uni Playwright bilan `#noldan` sahifasidan qayta yaratish kerak.

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

## Saytdan xabarlar Telegram'ga (Cloudflare Worker + bot)
«Fikr bildirish» (`#xabar`), «Profil tahlili» va «Tariflar» xabarlari shunday yo'l bilan keladi:
sayt → `cloudflare-worker/worker.js` (Cloudflare Worker) → Telegram Bot API → sizning Telegramingiz.

- Bot tokeni va chat ID faqat Worker'ning **Secrets**ida turadi: `BOT_TOKEN`, `CHAT_ID`. Sayt kodida ular yo'q. `APP_KEY` ixtiyoriy: qo'yilmasa, Worker ichidagi `DEFAULT_APP_KEY` ishlatiladi (u `relay-config.js` dagi bilan bir xil).
- `assets/relay-config.js`: `url` = Worker manzili, `appKey` = Worker'dagi `APP_KEY` bilan aynan bir xil. `url` bo'sh bo'lsa, sayt xabarni nusxalab, Telegram chatini ochadi (qo'lda yuborish).
- Worker faqat `https://xoliqberdiyevdalerjon-hub.github.io` saytidan kelgan xabarni qabul qiladi (`worker.js` dagi `DEFAULT_ORIGINS`). Boshqa sayt qo'shish kerak bo'lsa, Worker'da `ALLOWED_ORIGINS` (Text) o'zgaruvchisini yarating.
- Internet bo'lmasa yoki xato bo'lsa, yozilgan matn qoralama bo'lib qurilmada qoladi va faqat muvaffaqiyatli yuborilgandan keyin o'chadi.
- Testlar: `node --test cloudflare-worker/test/*.test.mjs` (Worker), `node --test tests/feedback.e2e.mjs` (brauzerda forma), lint: `npx eslint@9 cloudflare-worker assets/feedback.js assets/relay-config.js`.
- Spam ko'paysa: yangi kalit yarating, uni Worker'da `APP_KEY` secret qilib va `relay-config.js` ga yozing.

## Google (hozircha yopiq)
Sayt hozircha qidiruv tizimlaridan yashirilgan: `index.html` da `<meta name="robots" content="noindex, nofollow">`.
Google uchun tayyor sahifalar `google-seo` tarmog'ida saqlangan (`scripts/build_seo.py`). Ochishga qaror qilinganda: noindex tegini olib tashlash, `google-seo` tarmog'ini birlashtirish va `python3 scripts/build_seo.py` ni ishga tushirish.

## Faqat veb-sayt
Uprep telefonga o'rnatiladigan ilova (PWA) emas, oddiy veb-sayt. `manifest.webmanifest` olib tashlangan. `sw.js` faqat avval o'rnatilgan eski ilovani tozalash uchun qoldirilgan: u keshni o'chiradi va o'zini ro'yxatdan chiqaradi. `index.html` ham har ochilganda eski service worker'larni o'chiradi.

## Asosiy raqamlar bitta joyda

Viza summasi, uning yili va SSN to'lovi `content/site.json` ichidagi `facts` bo'limida, stipendiya chegaralari esa `content/dsu.json` ichidagi `national` bo'limida turadi. Matnlarda ular `{{viza}}`, `{{vizaYil}}`, `{{ssn}}`, `{{isee}}`, `{{ispe}}`, `{{stip}}`, `{{dsuYil}}` ko'rinishida yoziladi va sayt ochilganda haqiqiy qiymat bilan almashtiriladi. Raqam o'zgarsa, faqat shu ikki joyni yangilang.

## Brauzerda saqlanadigan ma'lumotlar

Foydalanuvchining rejasi, profil tahlili, saqlangan universitetlar va sozlamalari brauzerda bitta `uprep_state_v2` yozuvida saqlanadi. Eski `uprep-*` yozuvlari birinchi ochilishda avtomatik ko'chiriladi.
