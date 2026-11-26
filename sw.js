/* Uprep endi faqat veb-sayt. Bu fayl avval telefonga o'rnatilgan ilovani (service worker) o'chiradi:
   eski keshni tozalaydi, o'zini ro'yxatdan chiqaradi va ochiq sahifalarni yangilaydi. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.map(k => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: "window" });
    cs.forEach(c => { try { c.navigate(c.url); } catch (err) {} });
  })());
});
