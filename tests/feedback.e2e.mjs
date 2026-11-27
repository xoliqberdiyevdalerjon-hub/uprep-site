// End-to-end test of the feedback form (assets/feedback.js + the #xabar page) in a real browser.
// Run from the repo root: node --test tests/feedback.e2e.mjs   (needs Playwright + Chromium)
// The relay is simulated with request interception, so no Worker or Telegram is touched.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const RELAY = "https://relay-test.example.workers.dev/"; // a *.workers.dev host, so the site's Content-Security-Policy applies as in production
const KEY = "e2e-key-0123456789abcdef";
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".pdf": "application/pdf" };

let server, base, browser;
before(async () => {
  server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = path.join(ROOT, p === "/" ? "index.html" : p);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = "http://127.0.0.1:" + server.address().port + "/";
  browser = await chromium.launch();
});
after(async () => { await browser?.close(); server?.close(); });

/* a page whose relay config points to the fake relay; `relay` decides how the relay answers */
async function open({ relay, url = RELAY, timeoutMs = 18000, viewport = { width: 390, height: 844 }, colorScheme = "light" } = {}) {
  const ctx = await browser.newContext({ viewport, colorScheme });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/assets/relay-config.js*", (r) => r.fulfill({ contentType: "text/javascript", body: `window.UNIROAD_RELAY=${JSON.stringify({ url, appKey: KEY, appName: "Uniroad", appVersion: "test-1", timeoutMs })};` }));
  const sent = [];
  await page.route(RELAY + "**", async (r) => { sent.push({ headers: r.request().headers(), body: JSON.parse(r.request().postData() || "{}") }); await relay(r, sent.length); });
  await page.goto(base + "#xabar?tur=xato");
  await page.waitForSelector(".fb-form");
  return { ctx, page, sent, errors };
}
const state = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("uniroad_state") || "{}"));
const statusOf = (page) => page.evaluate(() => { const s = document.querySelector(".fb-status"); return { cls: s.className, text: s.innerText }; });

test("success: message is sent once with app key and coarse metadata, draft is cleared", async () => {
  const { ctx, page, sent, errors } = await open({ relay: (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }) });
  await page.fill("#fb-text", "Kalkulyatorda xato bor");
  await page.waitForTimeout(400); // draft autosave
  assert.equal((await state(page)).feedbackDraft.text, "Kalkulyatorda xato bor");
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.ok");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].headers["x-app-key"], KEY);
  const b = sent[0].body;
  assert.equal(b.kind, "xato");
  assert.equal(b.text, "Kalkulyatorda xato bor");
  assert.equal(b.contact, "", "contact only when typed");
  assert.equal(b.meta.app, "Uniroad");
  assert.equal(b.meta.version, "test-1");
  assert.match(b.meta.platform, /·/);
  assert.equal(b.meta.page, "#xabar");
  assert.equal(b.hp, "");
  assert.equal(await page.inputValue("#fb-text"), "");
  assert.equal((await state(page)).feedbackDraft, null);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("double click sends only one request; button is locked while sending", async () => {
  const { ctx, page, sent } = await open({ relay: async (r) => { await new Promise((x) => setTimeout(x, 800)); await r.fulfill({ status: 200, body: '{"ok":true}' }); } });
  await page.fill("#fb-text", "Ikki marta bosaman");
  await page.click(".fb-send");
  assert.equal(await page.isDisabled(".fb-send"), true);
  assert.match(await page.innerText(".fb-send"), /Yuborilmoqda/);
  await page.click(".fb-send", { force: true }).catch(() => {});
  await page.evaluate(() => document.querySelector(".fb-form").requestSubmit());
  await page.waitForSelector(".fb-status.ok");
  assert.equal(sent.length, 1);
  assert.equal(await page.isDisabled(".fb-send"), false);
  await ctx.close();
});

test("offline: text is kept as a draft and restored after reopening", async () => {
  const { ctx, page, sent } = await open({ relay: (r) => r.fulfill({ status: 200, body: '{"ok":true}' }) });
  await page.click('.fb-k:has-text("Taklif")');
  await page.fill("#fb-text", "Internet yo'q paytida yozdim");
  await page.fill("#fb-contact", "@talaba");
  await ctx.setOffline(true);
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.warn");
  assert.match((await statusOf(page)).text, /Internet yo'q/);
  assert.equal(sent.length, 0);
  const d = (await state(page)).feedbackDraft;
  assert.equal(d.text, "Internet yo'q paytida yozdim");
  assert.equal(d.kind, "taklif");
  await ctx.setOffline(false);
  await page.waitForFunction(() => /Internet qaytdi/.test(document.querySelector(".fb-status").innerText));
  await page.reload();
  await page.waitForSelector(".fb-form");
  assert.equal(await page.inputValue("#fb-text"), "Internet yo'q paytida yozdim");
  assert.equal(await page.inputValue("#fb-contact"), "@talaba");
  assert.match(await page.getAttribute('.fb-k:has-text("Taklif")', "aria-checked"), /true/);
  assert.match((await statusOf(page)).text, /qoralamangiz tiklandi/);
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.ok");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].body.contact, "@talaba");
  await ctx.close();
});

test("server error: draft kept, error shown with a manual Telegram fallback", async () => {
  const { ctx, page } = await open({ relay: (r) => r.fulfill({ status: 502, contentType: "application/json", body: '{"ok":false,"error":"telegram_401"}' }) });
  await page.fill("#fb-text", "Server xatosi sinovi");
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.err");
  assert.match((await statusOf(page)).text, /yuborilmadi/);
  assert.match((await statusOf(page)).text, /Texnik kod: HTTP 502 · telegram_401 \(BOT_TOKEN/);
  assert.equal((await state(page)).feedbackDraft.text, "Server xatosi sinovi");
  await page.click('.fb-status .textbtn:has-text("Telegram")');
  await page.waitForSelector(".sheet");
  assert.match(await page.inputValue(".sheet-ta"), /Server xatosi sinovi/);
  await ctx.close();
});

test("a 200 answer that is not the relay's {ok:true} is NOT reported as sent", async () => {
  const { ctx, page } = await open({ relay: (r) => r.fulfill({ status: 200, contentType: "text/plain", body: "Hello World!" }) });
  await page.fill("#fb-text", "Noto'g'ri manzil sinovi");
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.err");
  assert.match((await statusOf(page)).text, /bad_response/);
  assert.equal((await state(page)).feedbackDraft.text, "Noto'g'ri manzil sinovi");
  await ctx.close();
});

test("no answer from the relay (CORS / wrong URL) shows the network code", async () => {
  const { ctx, page } = await open({ relay: (r) => r.abort("failed") });
  await page.fill("#fb-text", "Ulanish yo'q sinovi");
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.err");
  assert.match((await statusOf(page)).text, /Texnik kod: network/);
  await ctx.close();
});

test("rate limited (429): friendly warning, draft kept", async () => {
  const { ctx, page } = await open({ relay: (r) => r.fulfill({ status: 429, body: '{"ok":false}' }) });
  await page.fill("#fb-text", "Ko'p yubordim");
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.warn");
  assert.match((await statusOf(page)).text, /10 daqiqadan/);
  assert.ok((await state(page)).feedbackDraft);
  await ctx.close();
});

test("timeout: request is aborted, button unlocks, draft kept", async () => {
  const { ctx, page } = await open({ timeoutMs: 3000, relay: () => new Promise(() => {}) });
  await page.fill("#fb-text", "Javob kelmaydi");
  const t0 = Date.now();
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.err", { timeout: 8000 });
  const took = Date.now() - t0;
  assert.ok(took >= 2800 && took < 6000, "took " + took);
  assert.match((await statusOf(page)).text, /javob bermadi/);
  assert.equal(await page.isDisabled(".fb-send"), false);
  assert.ok((await state(page)).feedbackDraft);
  await ctx.close();
});

test("empty message is not sent", async () => {
  const { ctx, page, sent } = await open({ relay: (r) => r.fulfill({ status: 200, body: "{}" }) });
  await page.click(".fb-send");
  await page.waitForSelector(".fb-status.err");
  assert.equal(sent.length, 0);
  await ctx.close();
});

test("relay not configured: falls back to copy-and-open-Telegram sheet", async () => {
  const { ctx, page, sent } = await open({ url: "", relay: (r) => r.fulfill({ status: 200, body: "{}" }) });
  assert.match(await page.innerText(".fb-send"), /Telegram orqali/);
  await page.fill("#fb-text", "Relay yo'q");
  await page.click(".fb-send");
  await page.waitForSelector(".sheet");
  assert.equal(sent.length, 0);
  await ctx.close();
});

test("dark mode and desktop render without errors or overflow", async () => {
  for (const [viewport, colorScheme] of [[{ width: 390, height: 844 }, "dark"], [{ width: 1280, height: 800 }, "light"], [{ width: 1280, height: 800 }, "dark"]]) {
    const { ctx, page, errors } = await open({ viewport, colorScheme, relay: (r) => r.fulfill({ status: 200, body: "{}" }) });
    const r = await page.evaluate(() => ({ ovf: document.documentElement.scrollWidth > innerWidth, h1: document.querySelector("h1").innerText, segs: document.querySelectorAll(".fb-k").length }));
    assert.equal(r.ovf, false);
    assert.equal(r.h1, "Fikr bildirish");
    assert.equal(r.segs, 4);
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});
