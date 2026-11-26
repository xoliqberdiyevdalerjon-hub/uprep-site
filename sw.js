/* Uprep service worker: the site opens offline and loads fast.
   Pages and content (content/*.json) are always fetched fresh first, so CMS edits show up immediately;
   the cached copy is used only when the network fails. Versioned assets are served from cache. */
const CACHE = "uprep-v9";
const CORE = ["./", "index.html", "assets/style.css", "assets/app.js", "assets/config.js", "manifest.webmanifest", "media/favicon.svg", "media/icon-192.png", "media/hero-rome-sm.webp",
  "content/site.json", "content/stages.json", "content/calendar.json", "content/library.json", "content/countries.json", "content/italy.json", "content/cities.json",
  "content/universities.json", "content/guide.json", "content/dsu.json", "content/living.json", "content/news.json", "content/reviews.json", "content/foundation.json", "content/tests.json", "content/noldan.json", "content/about.json", "content/parents.json", "content/ambassadors.json", "content/outcomes.json", "content/events.json"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  const fresh = req.mode === "navigate" || url.pathname.endsWith(".json") || url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  if (fresh) {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })));
  }
});
