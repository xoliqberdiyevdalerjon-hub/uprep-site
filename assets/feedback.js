/* Uprep feedback service: sends a message to the Cloudflare Worker relay (-> Telegram).
   - settings come from assets/relay-config.js (window.UPREP_RELAY)
   - one request at a time, with a total timeout
   - drafts: the text the user typed is kept on the device until a send succeeds
   Exposes window.UprepFeedback. No personal data is added: only what the caller passes plus
   coarse technical info (site version, device type, browser, language, open page). */
(function(root){
  "use strict";

  var DRAFT_KEY = "uprep-feedback-draft";
  var store = null; /* {getItem, setItem, removeItem}; app.js plugs in its unified store */

  function cfg(){ return root.UPREP_RELAY || {}; }
  function isConfigured(){ var c = cfg(); return /^https:\/\/[^\s/]+/.test(String(c.url || "")) && String(c.appKey || "").length >= 16; }

  function storage(){
    if(store) return store;
    try{ if(root.localStorage) return root.localStorage; }catch(e){}
    return null;
  }
  function setStorage(s){ store = s; }

  /* ---------- drafts ---------- */
  function draftKey(scope){ return DRAFT_KEY + (scope ? "-" + scope : ""); }
  function getDraft(scope){
    var s = storage(); if(!s) return null;
    try{ var d = JSON.parse(s.getItem(draftKey(scope)) || "null"); return d && typeof d === "object" && typeof d.text === "string" ? d : null; }catch(e){ return null; }
  }
  function saveDraft(d, scope){
    var s = storage(); if(!s) return false;
    try{
      if(!d || !String(d.text || "").trim()){ s.removeItem(draftKey(scope)); return true; }
      s.setItem(draftKey(scope), JSON.stringify({ kind:String(d.kind || ""), text:String(d.text), contact:String(d.contact || ""), at:new Date().toISOString() }));
      return true;
    }catch(e){ return false; }
  }
  function clearDraft(scope){ var s = storage(); if(!s) return; try{ s.removeItem(draftKey(scope)); }catch(e){} }

  /* ---------- coarse, non-personal technical info ---------- */
  function platform(){
    var ua = String((root.navigator && root.navigator.userAgent) || "");
    var os = /Android/i.test(ua) ? "Android" : /iPhone|iPad|iPod/i.test(ua) ? "iOS" : /Windows/i.test(ua) ? "Windows" : /Mac OS X|Macintosh/i.test(ua) ? "macOS" : /Linux/i.test(ua) ? "Linux" : "Boshqa";
    var br = /SamsungBrowser/i.test(ua) ? "Samsung Internet" : /Edg\//i.test(ua) ? "Edge" : /OPR\/|Opera/i.test(ua) ? "Opera" : /YaBrowser/i.test(ua) ? "Yandex" : /Firefox|FxiOS/i.test(ua) ? "Firefox" : /Chrome|CriOS/i.test(ua) ? "Chrome" : /Safari/i.test(ua) ? "Safari" : "Brauzer";
    var w = root.innerWidth || 0;
    return os + " · " + br + (w ? (w < 720 ? " · telefon" : w < 1024 ? " · planshet" : " · kompyuter") : "");
  }
  function meta(){
    var c = cfg(), loc = root.location || {};
    return {
      app: String(c.appName || "Uprep"),
      version: String(c.appVersion || ""),
      platform: platform(),
      lang: String((root.navigator && root.navigator.language) || ""),
      page: String(loc.hash || "#").split("?")[0].slice(0, 80) || "#"
    };
  }

  /* ---------- sending ---------- */
  var busy = false;
  function isBusy(){ return busy; }

  /* Resolves (never rejects) with {ok:true} or {ok:false, reason}.
     reason: "busy" | "config" | "empty" | "offline" | "timeout" | "rate" | "server" */
  function send(msg){
    if(busy) return Promise.resolve({ ok:false, reason:"busy" });
    if(!isConfigured()) return Promise.resolve({ ok:false, reason:"config" });
    var text = String((msg && msg.text) || "").trim();
    if(text.length < 3) return Promise.resolve({ ok:false, reason:"empty" });
    if(root.navigator && root.navigator.onLine === false) return Promise.resolve({ ok:false, reason:"offline" });

    var c = cfg(), ms = Math.min(Math.max(Number(c.timeoutMs) || 18000, 3000), 30000);
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timedOut = false;
    var timer = setTimeout(function(){ timedOut = true; if(ctrl) ctrl.abort(); }, ms);
    var body = JSON.stringify({ kind:String(msg.kind || "fikr"), text:text.slice(0, 3500), contact:String(msg.contact || "").trim().slice(0, 100), meta:meta(), hp:String(msg.hp || "") });
    busy = true;

    var done = function(r){ clearTimeout(timer); busy = false; return r; };
    var req = root.fetch(String(c.url), {
      method:"POST",
      headers:{ "Content-Type":"application/json", "x-app-key":String(c.appKey) },
      body:body,
      signal: ctrl ? ctrl.signal : undefined,
      credentials:"omit",
      cache:"no-store"
    }).then(function(r){
      if(r.ok) return { ok:true };
      return { ok:false, reason: r.status === 429 ? "rate" : "server", status:r.status };
    }, function(){
      if(timedOut) return { ok:false, reason:"timeout" };
      return { ok:false, reason: (root.navigator && root.navigator.onLine === false) ? "offline" : "server" };
    });
    /* a hard stop even if fetch ignores the abort signal */
    var guard = new Promise(function(res){ setTimeout(function(){ res({ ok:false, reason:"timeout" }); }, ms + 1000); });
    return Promise.race([req, guard]).then(done);
  }

  root.UprepFeedback = {
    send:send, isConfigured:isConfigured, isBusy:isBusy, meta:meta,
    getDraft:getDraft, saveDraft:saveDraft, clearDraft:clearDraft, setStorage:setStorage,
    DRAFT_KEY:DRAFT_KEY
  };
})(typeof window !== "undefined" ? window : globalThis);
