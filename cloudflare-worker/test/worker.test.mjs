// Tests for the feedback relay Worker. Run: node --test cloudflare-worker/test/
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.js";
const { cutSafe, formatMessage, safeEqual, corsFor, resetRateLimit, LIMITS } = worker.fetch._internals;

const KEY = "test-app-key-0123456789abcdef";
const ORIGIN = "https://xoliqberdiyevdalerjon-hub.github.io";
const ENV = { BOT_TOKEN: "123:ABC", CHAT_ID: "42", APP_KEY: KEY, ALLOWED_ORIGINS: ORIGIN + ", http://localhost:8765" };

let calls = [];
let tgStatus = 200;
const realFetch = globalThis.fetch;
beforeEach(() => {
  calls = []; tgStatus = 200; resetRateLimit();
  globalThis.fetch = async (url, init) => { calls.push({ url: String(url), init }); return new Response(JSON.stringify({ ok: tgStatus === 200 }), { status: tgStatus }); };
});
process.on("exit", () => { globalThis.fetch = realFetch; });

function req(body, { method = "POST", key = KEY, origin = ORIGIN, type = "application/json", ip = "1.1.1.1" } = {}) {
  const headers = new Headers();
  if (origin) headers.set("Origin", origin);
  if (key != null) headers.set("x-app-key", key);
  if (type) headers.set("Content-Type", type);
  headers.set("CF-Connecting-IP", ip);
  return new Request("https://relay.example.workers.dev/", { method, headers, body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined });
}
const good = { kind: "xato", text: "Kalkulyator ishlamayapti", contact: "", meta: { app: "Uniroad", version: "2026.11.26", platform: "Android · Chrome · telefon", lang: "uz-UZ", page: "#kalkulyator" }, hp: "" };

test("OPTIONS preflight returns 204 with CORS for an allowed origin", async () => {
  const r = await worker.fetch(req(null, { method: "OPTIONS" }), ENV);
  assert.equal(r.status, 204);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.match(r.headers.get("Access-Control-Allow-Headers"), /x-app-key/i);
  assert.match(r.headers.get("Access-Control-Allow-Methods"), /POST/);
});

test("unknown origin is refused (403) and nothing is sent", async () => {
  const r = await worker.fetch(req(good, { origin: "https://evil.example" }), ENV);
  assert.equal(r.status, 403);
  assert.equal(calls.length, 0);
});

test("ALLOWED_ORIGINS='*' = any origin (wildcard)", () => {
  const h = corsFor(req(good, { origin: "https://any.example" }), { ...ENV, ALLOWED_ORIGINS: "*" });
  assert.equal(h["Access-Control-Allow-Origin"], "*");
});

test("ALLOWED_ORIGINS not set = only the Uniroad site", () => {
  const env = { ...ENV }; delete env.ALLOWED_ORIGINS;
  assert.equal(corsFor(req(good, { origin: ORIGIN }), env)["Access-Control-Allow-Origin"], ORIGIN);
  assert.equal(corsFor(req(good, { origin: "https://any.example" }), env), null);
  assert.equal(corsFor(req(good, { origin: "" }), { ...env, ALLOWED_ORIGINS: "" }), null, "no Origin header = refused");
});

test("wrong or missing app key -> 401, Telegram not called", async () => {
  assert.equal((await worker.fetch(req(good, { key: "nope" }), ENV)).status, 401);
  assert.equal((await worker.fetch(req(good, { key: null }), ENV)).status, 401);
  assert.equal((await worker.fetch(req(good, { key: KEY + "x" }), ENV)).status, 401);
  assert.equal(calls.length, 0);
});

test("valid request is forwarded to Telegram sendMessage with secrets from env", async () => {
  const r = await worker.fetch(req(good), ENV);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.telegram.org/bot123:ABC/sendMessage");
  const payload = JSON.parse(calls[0].init.body);
  assert.equal(payload.chat_id, "42");
  assert.equal(payload.disable_web_page_preview, true);
  assert.equal(payload.parse_mode, undefined, "plain text: user input can not inject formatting");
  assert.match(payload.text, /Muammo haqida xabar/);
  assert.match(payload.text, /Uniroad v2026\.11\.26/);
  assert.match(payload.text, /Android · Chrome · telefon · uz-UZ/);
  assert.match(payload.text, /#kalkulyator/);
  assert.match(payload.text, /anonim/);
  assert.match(payload.text, /Kalkulyator ishlamayapti$/);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});

test("contact is included only when the user typed it", async () => {
  await worker.fetch(req({ ...good, contact: "@talaba" }), ENV);
  assert.match(JSON.parse(calls[0].init.body).text, /Aloqa: @talaba/);
});

test("the bot token never appears in a response", async () => {
  tgStatus = 400;
  const r = await worker.fetch(req(good), ENV);
  assert.equal(r.status, 502);
  assert.ok(!(await r.text()).includes("123:ABC"));
});

test("missing secrets -> 500 not_configured (fails closed)", async () => {
  assert.equal((await worker.fetch(req(good), { ...ENV, BOT_TOKEN: "" })).status, 500);
  assert.equal((await worker.fetch(req(good), { ...ENV, CHAT_ID: "" })).status, 500);
  assert.equal(calls.length, 0);
});

test("APP_KEY not set: only the built-in site key is accepted", async () => {
  const env = { ...ENV }; delete env.APP_KEY;
  assert.equal((await worker.fetch(req(good, { key: KEY }), env)).status, 401);
  assert.equal(calls.length, 0);
  const r = await worker.fetch(req(good, { key: "pJBaGKvnMu7IQiTQN0ekW-tC0xC1luCZEBdTZRKFs_g" }), env);
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
});

test("method, content type, JSON and size checks", async () => {
  assert.equal((await worker.fetch(req(null, { method: "GET" }), ENV)).status, 405);
  assert.equal((await worker.fetch(req(good, { type: "text/plain" }), ENV)).status, 415);
  assert.equal((await worker.fetch(req("{not json", {}), ENV)).status, 400);
  assert.equal((await worker.fetch(req({ ...good, text: " " }), ENV)).status, 400);
  assert.equal((await worker.fetch(req({ ...good, text: "x".repeat(LIMITS.body + 10) }), ENV)).status, 413);
  assert.equal(calls.length, 0);
});

test("honeypot filled -> 200 but nothing is sent", async () => {
  const r = await worker.fetch(req({ ...good, hp: "http://spam" }), ENV);
  assert.equal(r.status, 200);
  assert.equal(calls.length, 0);
});

test("rate limit: too many messages from one IP -> 429", async () => {
  let last;
  for (let i = 0; i <= LIMITS.rateCount; i++) last = await worker.fetch(req(good, { ip: "9.9.9.9" }), ENV);
  assert.equal(last.status, 429);
  assert.equal(calls.length, LIMITS.rateCount);
});

test("Telegram unreachable -> 502", async () => {
  globalThis.fetch = async () => { throw new TypeError("network"); };
  assert.equal((await worker.fetch(req(good), ENV)).status, 502);
});

test("long text is cut to the Telegram limit without breaking emoji", async () => {
  const text = "😀".repeat(3000); // 6000 UTF-16 units
  await worker.fetch(req({ ...good, text }), ENV);
  const out = JSON.parse(calls[0].init.body).text;
  assert.ok(out.length <= LIMITS.telegram, "length " + out.length);
  assert.ok(out.endsWith("…"));
  assert.ok(!/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(out), "no lone high surrogate");
  assert.ok(!/(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/.test(out), "no lone low surrogate");
});

test("the whole message never exceeds the limit even with long technical fields", () => {
  const meta = { app: "A".repeat(500), version: "9".repeat(500), platform: "P".repeat(500), lang: "L".repeat(500), page: "#".repeat(500) };
  const out = formatMessage({ kind: "xato", text: "🙂".repeat(5000), contact: "c".repeat(500), meta }, {});
  assert.ok(out.length <= LIMITS.telegram);
});

test("cutSafe keeps whole graphemes (ZWJ family emoji, flags)", () => {
  const fam = "👨‍👩‍👧‍👦"; // 11 UTF-16 units, one grapheme
  assert.equal(cutSafe("ab" + fam, 5), "ab");
  assert.equal(cutSafe("ab" + fam + "c", 13), "ab" + fam);
  assert.equal(cutSafe("🇺🇿🇮🇹", 5), "🇺🇿");
  assert.equal(cutSafe("short", 10), "short");
  assert.equal(cutSafe("abcdef", 4, "…"), "abc…");
});

test("cutSafe fallback without Intl.Segmenter never splits a surrogate pair", () => {
  const saved = Intl.Segmenter;
  try {
    Intl.Segmenter = undefined;
    const out = cutSafe("a😀😀", 4); // cut would land inside the second emoji
    assert.equal(out, "a😀");
  } finally { Intl.Segmenter = saved; }
});

test("safeEqual works with and without crypto.subtle.timingSafeEqual", async () => {
  assert.equal(await safeEqual("abc", "abc"), true);
  assert.equal(await safeEqual("abc", "abd"), false);
  assert.equal(await safeEqual("abc", "abcd"), false);
  const subtle = crypto.subtle;
  const had = "timingSafeEqual" in subtle;
  let used = false;
  subtle.timingSafeEqual = (a, b) => { used = true; const x = new Uint8Array(a), y = new Uint8Array(b); return x.length === y.length && x.every((v, i) => v === y[i]); };
  try {
    assert.equal(await safeEqual("k", "k"), true);
    assert.equal(used, true);
  } finally { if (!had) delete subtle.timingSafeEqual; }
});

test("formatMessage strips control characters and unknown kinds get a neutral title", () => {
  const t = formatMessage({ kind: "<b>x</b>", text: "salom\u0000\u0007 dunyo", meta: {} }, {});
  assert.match(t, /^📩 Saytdan xabar/);
  assert.ok(!/[\u0000\u0007]/.test(t));
  assert.match(t, /salom dunyo$/);
});
