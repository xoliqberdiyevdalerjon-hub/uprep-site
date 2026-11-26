// Supabase Edge Function "lead": the site's forms (profil tahlili, tariflar, feedback) send their message here,
// and the Uprep Telegram bot forwards it to the admin's Telegram chat.
// Secrets (Supabase > Edge Functions > Secrets):
//   TELEGRAM_BOT_TOKEN  - from @BotFather
//   ADMIN_CHAT_ID       - the admin's chat id (send /start to the bot, then open
//                         https://api.telegram.org/bot<TOKEN>/getUpdates and copy "chat":{"id": ...})
//   ALLOWED_ORIGIN      - optional, e.g. https://xoliqberdiyevdalerjon-hub.github.io
// Deploy with "Verify JWT" turned OFF (the public site calls it without a Supabase login).
// The bot token stays on the server; it is never sent to the browser.

const TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const CHAT = Deno.env.get("ADMIN_CHAT_ID") ?? "";
const ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "*";
const KINDS: Record<string, string> = { profil: "🧭 Profil tahlili", tarif: "💳 Tarif so'rovi", feedback: "💬 Fikr / savol" };

// best-effort limit: 5 messages per IP per 10 minutes (per function instance)
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now(), list = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  list.push(now); hits.set(ip, list);
  return list.length > 5;
}
const cors = { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const clip = (v: unknown, n: number) => String(v ?? "").replace(/[\u0000-\u0008\u000B-\u001F]/g, "").trim().slice(0, n);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
  if (!TOKEN || !CHAT) return new Response("Not configured", { status: 500, headers: cors });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "?";
  if (limited(ip)) return new Response("Too many requests", { status: 429, headers: cors });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400, headers: cors }); }
  if (clip(body.hp, 10)) return new Response("ok", { headers: cors }); // honeypot: bots fill hidden fields
  const text = clip(body.text, 3000), contact = clip(body.contact, 100), page = clip(body.page, 300);
  if (text.length < 5) return new Response("Empty", { status: 400, headers: cors });
  const title = KINDS[clip(body.kind, 20)] ?? "📩 Saytdan xabar";
  const msg = `${title}\n\n${text}\n\n👤 Aloqa: ${contact || "ko'rsatilmagan"}\n🔗 ${page}`;
  const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT, text: msg, disable_web_page_preview: true }),
  });
  if (!r.ok) return new Response("Telegram error", { status: 502, headers: cors });
  return new Response("ok", { headers: cors });
});
