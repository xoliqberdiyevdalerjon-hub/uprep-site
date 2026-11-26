/**
 * Uprep feedback relay: Cloudflare Worker.
 *
 * The website POSTs a small JSON message here; the Worker checks it and forwards it to the
 * owner's Telegram chat with the Bot API (sendMessage). The bot token and chat id live ONLY in
 * the Worker's secrets, never in the website code.
 *
 * Secrets / variables (Cloudflare dashboard > Worker > Settings > Variables and Secrets):
 *   BOT_TOKEN        (Secret)  token from @BotFather
 *   CHAT_ID          (Secret)  your Telegram user id (or a group id)
 *   APP_KEY          (Secret, optional)  must match assets/relay-config.js. Not set = DEFAULT_APP_KEY below
 *                    (the same public key the site sends; set APP_KEY only when you rotate the key)
 *   ALLOWED_ORIGINS  (Text, optional)  comma-separated list of sites allowed to call the Worker.
 *                    Not set = only the Uprep site (DEFAULT_ORIGINS below). "*" = any origin.
 *   TIME_ZONE        (Text, optional)  default "Asia/Tashkent"
 *
 * Request:  POST /  headers: Content-Type: application/json, x-app-key: <APP_KEY>
 *           body: { kind, text, contact?, meta?: { app, version, platform, lang, page }, hp? }
 * Response: { ok: true } or { ok: false, error: "<code>" }
 */

const LIMITS = {
  telegram: 4000,      // Telegram allows 4096; we keep a safety margin
  body: 16 * 1024,     // max request size in bytes
  text: 3500,          // max user text length (characters)
  minText: 3,
  rateCount: 6,        // best-effort: max requests per IP ...
  rateWindowMs: 10 * 60 * 1000, // ... per 10 minutes (per Worker instance)
  telegramTimeoutMs: 10000,
};

const KINDS = {
  xato: "🐞 Muammo haqida xabar",
  taklif: "💡 Taklif",
  savol: "❓ Savol",
  fikr: "💬 Fikr",
  profil: "🧭 Profil tahlili",
  tarif: "💳 Tarif so'rovi",
};

/* ---------------- helpers ---------------- */

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cors },
  });
}

const DEFAULT_ORIGINS = "https://xoliqberdiyevdalerjon-hub.github.io";
/* not a secret: the website sends it openly; it only filters out random bots */
const DEFAULT_APP_KEY = "pJBaGKvnMu7IQiTQN0ekW-tC0xC1luCZEBdTZRKFs_g";

function allowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS == null || String(env.ALLOWED_ORIGINS).trim() === "" ? DEFAULT_ORIGINS : String(env.ALLOWED_ORIGINS);
  if (raw.trim() === "*") return [];
  return raw
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

/** CORS headers for this request, or null if the origin is not allowed. */
function corsFor(request, env) {
  const list = allowedOrigins(env);
  const origin = request.headers.get("Origin") || "";
  const base = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-app-key",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
  if (!list.length) return { ...base, "Access-Control-Allow-Origin": "*" };
  if (origin && list.includes(origin)) return { ...base, "Access-Control-Allow-Origin": origin };
  return null;
}

/** Constant-time comparison. Both sides are hashed first so their lengths never leak. */
async function safeEqual(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(String(a))),
    crypto.subtle.digest("SHA-256", enc.encode(String(b))),
  ]);
  if (typeof crypto.subtle.timingSafeEqual === "function") {
    return crypto.subtle.timingSafeEqual(ha, hb); // Cloudflare Workers
  }
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

/** Removes control characters (keeps newlines and tabs), trims, caps length. */
function clean(value, max) {
  const s = String(value == null ? "" : value)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
  return max ? cutSafe(s, max) : s;
}

/**
 * Shortens text to at most `max` UTF-16 units without splitting an emoji or a letter with accents:
 * cuts on grapheme boundaries (Intl.Segmenter) and never in the middle of a surrogate pair.
 */
function cutSafe(text, max, suffix = "") {
  const s = String(text);
  if (s.length <= max) return s;
  const room = Math.max(0, max - suffix.length);
  let end = 0;
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    for (const g of new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s)) {
      if (g.index + g.segment.length > room) break;
      end = g.index + g.segment.length;
    }
  } else {
    end = room;
    const c = s.charCodeAt(end - 1);
    if (c >= 0xd800 && c <= 0xdbff) end -= 1; // do not leave a lone high surrogate
  }
  return s.slice(0, end) + suffix;
}

function stamp(env) {
  const tz = env.TIME_ZONE || "Asia/Tashkent";
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: tz, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    }).format(new Date()) + " (" + tz.split("/").pop().replace(/_/g, " ") + ")";
  } catch {
    return new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  }
}

/** Builds the plain-text Telegram message. Plain text = no formatting can be injected by the user. */
function formatMessage(data, env) {
  const meta = data && typeof data.meta === "object" && data.meta ? data.meta : {};
  const title = KINDS[clean(data.kind, 20)] || "📩 Saytdan xabar";
  const app = clean(meta.app, 40) || "Uprep";
  const version = clean(meta.version, 30);
  const platform = [clean(meta.platform, 60), clean(meta.lang, 20)].filter(Boolean).join(" · ");
  const page = clean(meta.page, 120);
  const contact = clean(data.contact, 100);
  const line = "━━━━━━━━━━━━━━";
  const head = [
    title,
    line,
    "📱 " + app + (version ? " v" + version : ""),
    "🕒 " + stamp(env),
    platform ? "💻 " + platform : "",
    page ? "📄 " + page : "",
    "👤 " + (contact ? "Aloqa: " + contact : "Aloqa ko'rsatilmagan (anonim)"),
    line,
  ].filter(Boolean).join("\n");
  const text = cutSafe(clean(data.text), LIMITS.text, "…");
  return cutSafe(head + "\n" + text, LIMITS.telegram, "…");
}

/* best-effort per-instance rate limit (use Cloudflare Rate Limiting rules for a hard limit) */
const hits = new Map();
function limited(ip, now = Date.now()) {
  const list = (hits.get(ip) || []).filter((t) => now - t < LIMITS.rateWindowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMITS.rateCount;
}
function resetRateLimit() { hits.clear(); }

/* ---------------- handler ---------------- */

async function handle(request, env) {
  const cors = corsFor(request, env);
  if (!cors) return json({ ok: false, error: "origin" }, 403, { "Vary": "Origin" });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { ...cors, "Allow": "POST, OPTIONS" });

  if (!env.BOT_TOKEN || !env.CHAT_ID) return json({ ok: false, error: "not_configured" }, 500, cors);
  if (!(await safeEqual(request.headers.get("x-app-key") || "", env.APP_KEY || DEFAULT_APP_KEY))) return json({ ok: false, error: "key" }, 401, cors);

  if (!/^application\/json\b/i.test(request.headers.get("Content-Type") || "")) return json({ ok: false, error: "type" }, 415, cors);
  const declared = Number(request.headers.get("Content-Length") || 0);
  if (declared > LIMITS.body) return json({ ok: false, error: "too_large" }, 413, cors);
  const raw = await request.text();
  if (raw.length > LIMITS.body) return json({ ok: false, error: "too_large" }, 413, cors);

  let data;
  try { data = JSON.parse(raw); } catch { return json({ ok: false, error: "json" }, 400, cors); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return json({ ok: false, error: "json" }, 400, cors);
  if (clean(data.hp, 50)) return json({ ok: true }, 200, cors); // honeypot: a bot filled the hidden field
  if (clean(data.text).length < LIMITS.minText) return json({ ok: false, error: "empty" }, 400, cors);

  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "?";
  if (limited(ip)) return json({ ok: false, error: "rate" }, 429, { ...cors, "Retry-After": "600" });

  let tg;
  try {
    tg = await fetch("https://api.telegram.org/bot" + env.BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: formatMessage(data, env), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(LIMITS.telegramTimeoutMs),
    });
  } catch {
    return json({ ok: false, error: "telegram_unreachable" }, 502, cors);
  }
  if (!tg.ok) return json({ ok: false, error: "telegram_" + tg.status }, 502, cors);
  return json({ ok: true }, 200, cors);
}

/* helpers reachable from the tests; the deployed Worker exports only the fetch handler */
handle._internals = { LIMITS, corsFor, safeEqual, clean, cutSafe, formatMessage, limited, resetRateLimit };

export default { fetch: handle };
