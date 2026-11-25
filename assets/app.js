/* Uprep platform. Texts live in content/*.json (edited in Pages CMS). Accounts and payment: Supabase + Stripe,
   switched on by assets/config.js. This file only draws pages; nothing here needs editing to add content. */
(function(){
  "use strict";

  /* ---------------- icons ---------------- */
  /* icons: Lucide (ISC license), https://lucide.dev */
  var ICONS = {
    "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />",
    "stamp": "<path d=\"M5 22h14\" /> <path d=\"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z\" /> <path d=\"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13\" />",
    "laptop": "<path d=\"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16\" />",
    "passport": "<path d=\"M15 13a3 3 0 1 0-6 0\" /> <path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" /> <circle cx=\"12\" cy=\"8\" r=\"2\" />",
    "coin": "<path d=\"M4 10h12\" /> <path d=\"M4 14h9\" /> <path d=\"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2\" />",
    "plane": "<path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\" />",
    "cap": "<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\" /> <path d=\"M22 10v6\" /> <path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\" />",
    "home2": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
    "doc": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />",
    "home": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
    "cal": "<path d=\"M8 2v4\" /> <path d=\"M16 2v4\" /> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /> <path d=\"M3 10h18\" /> <path d=\"M8 14h.01\" /> <path d=\"M12 14h.01\" /> <path d=\"M16 14h.01\" /> <path d=\"M8 18h.01\" /> <path d=\"M12 18h.01\" /> <path d=\"M16 18h.01\" />",
    "chat": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />",
    "play": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <polygon points=\"10 8 16 12 10 16 10 8\" />",
    "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />",
    "file": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M12 18v-6\" /> <path d=\"m9 15 3 3 3-3\" />",
    "link": "<path d=\"M15 3h6v6\" /> <path d=\"M10 14 21 3\" /> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />",
    "list": "<path d=\"M3 12h.01\" /> <path d=\"M3 18h.01\" /> <path d=\"M3 6h.01\" /> <path d=\"M8 12h13\" /> <path d=\"M8 18h13\" /> <path d=\"M8 6h13\" />",
    "checklist": "<path d=\"m3 17 2 2 4-4\" /> <path d=\"m3 7 2 2 4-4\" /> <path d=\"M13 6h8\" /> <path d=\"M13 12h8\" /> <path d=\"M13 18h8\" />",
    "steps": "<path d=\"M10 12h11\" /> <path d=\"M10 18h11\" /> <path d=\"M10 6h11\" /> <path d=\"M4 10h2\" /> <path d=\"M4 6h1v4\" /> <path d=\"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1\" />",
    "text": "<path d=\"M15 12H3\" /> <path d=\"M17 18H3\" /> <path d=\"M21 6H3\" />",
    "back": "<path d=\"m15 18-6-6 6-6\" />",
    "next": "<path d=\"m9 18 6-6-6-6\" />",
    "down": "<path d=\"m6 9 6 6 6-6\" />",
    "check": "<path d=\"M20 6 9 17l-5-5\" />",
    "bulb": "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\" /> <path d=\"M9 18h6\" /> <path d=\"M10 22h4\" />",
    "stop": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /> <path d=\"M12 9v4\" /> <path d=\"M12 17h.01\" />",
    "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" />",
    "route": "<circle cx=\"6\" cy=\"19\" r=\"3\" /> <path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\" /> <circle cx=\"18\" cy=\"5\" r=\"3\" />",
    "folder": "<path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\" />",
    "user": "<path d=\"M18 20a6 6 0 0 0-12 0\" /> <circle cx=\"12\" cy=\"10\" r=\"4\" /> <circle cx=\"12\" cy=\"12\" r=\"10\" />",
    "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
    "pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /> <circle cx=\"12\" cy=\"10\" r=\"3\" />",
    "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /> <path d=\"M2 12h20\" />",
    "star": "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\" /> <circle cx=\"12\" cy=\"8\" r=\"6\" />",
    "out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /> <polyline points=\"16 17 21 12 16 7\" /> <line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" />",
    "search": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <path d=\"m21 21-4.3-4.3\" />",
    "uni": "<circle cx=\"12\" cy=\"10\" r=\"1\" /> <path d=\"M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2\" /> <path d=\"M6 17v.01\" /> <path d=\"M6 13v.01\" /> <path d=\"M18 17v.01\" /> <path d=\"M18 13v.01\" /> <path d=\"M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5\" />",
    "landmark": "<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\" /> <line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\" /> <line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\" /> <line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\" /> <line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\" /> <polygon points=\"12 2 20 7 4 7\" />",
    "map": "<path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\" /> <path d=\"M15 5.764v15\" /> <path d=\"M9 3.236v15\" />",
    "book": "<path d=\"M12 7v14\" /> <path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\" />",
    "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <polyline points=\"12 6 12 12 16 14\" />",
    "wallet": "<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\" /> <path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\" />",
    "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />",
    "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" /> <path d=\"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27\" />",
    "briefcase": "<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\" /> <rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\" />",
    "train": "<path d=\"M8 3.1V7a4 4 0 0 0 8 0V3.1\" /> <path d=\"m9 15-1-1\" /> <path d=\"m15 15 1-1\" /> <path d=\"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z\" /> <path d=\"m8 19-2 3\" /> <path d=\"m16 19 2 3\" />",
    "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" /> <path d=\"M12 2v2\" /> <path d=\"M12 20v2\" /> <path d=\"m4.93 4.93 1.41 1.41\" /> <path d=\"m17.66 17.66 1.41 1.41\" /> <path d=\"M2 12h2\" /> <path d=\"M20 12h2\" /> <path d=\"m6.34 17.66-1.41 1.41\" /> <path d=\"m19.07 4.93-1.41 1.41\" />",
    "plus": "<path d=\"M7 10v12\" /> <path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\" />",
    "minus": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
    "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
    "filter": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /> <line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /> <line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /> <line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /> <line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /> <line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /> <line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /> <line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /> <line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" />",
    "bank": "<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\" /> <line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\" /> <line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\" /> <line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\" /> <line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\" /> <polygon points=\"12 2 20 7 4 7\" />",
    "languages": "<path d=\"m5 8 6 6\" /> <path d=\"m4 14 6-6 2-3\" /> <path d=\"M2 5h12\" /> <path d=\"M7 2h1\" /> <path d=\"m22 22-5-10-5 10\" /> <path d=\"M14 18h6\" />",
    "id": "<path d=\"M16 10h2\" /> <path d=\"M16 14h2\" /> <path d=\"M6.17 15a3 3 0 0 1 5.66 0\" /> <circle cx=\"9\" cy=\"11\" r=\"2\" /> <rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\" />",
    "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" />",
    "building": "<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\" /> <path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\" /> <path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\" /> <path d=\"M10 6h4\" /> <path d=\"M10 10h4\" /> <path d=\"M10 14h4\" /> <path d=\"M10 18h4\" />"
    };
  function ic(name, cls){
    var s = document.createElementNS("http://www.w3.org/2000/svg","svg");
    s.setAttribute("viewBox","0 0 24 24"); s.setAttribute("fill","none"); s.setAttribute("stroke","currentColor");
    s.setAttribute("stroke-width","1.8"); s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round"); s.setAttribute("aria-hidden","true");
    s.innerHTML = ICONS[name] || ICONS.doc; if(cls) s.setAttribute("class", cls); return s;
  }
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null && text !== "") e.textContent = text; return e; }
  function str(v){ return typeof v === "string" ? v.trim() : (v == null ? "" : String(v)); }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function safeUrl(u){
    u = str(u); if(!u) return "";
    if(/^https:\/\//i.test(u)) return u;
    if(/^\/?media\//i.test(u)) return u.replace(/^\//, "");
    return "";
  }
  function host(u){ try{ return new URL(u).hostname.replace(/^www\./, ""); }catch(e){ return u; } }
  function videoEmbed(u){
    var m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/i);
    if(m) return "https://www.youtube-nocookie.com/embed/" + m[1];
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if(m) return "https://player.vimeo.com/video/" + m[1];
    return "";
  }
  function isVideoFile(u){ return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u); }
  function fileName(u){ return decodeURIComponent(str(u).split("/").pop() || ""); }

  /* ---------------- dates ---------------- */
  var TODAY = new Date(); TODAY.setHours(0,0,0,0);
  function deadline(text){
    var all = str(text).match(/\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g); if(!all) return null;
    var p = all[all.length - 1].split("."), d = new Date(+p[2], +p[1] - 1, +p[0]);
    return isNaN(d) ? null : d;
  }
  function daysLeft(d){ return Math.round((d - TODAY) / 86400000); }
  function leftLabel(n){ return n === 0 ? "Bugun" : n === 1 ? "Ertaga" : n + " kun qoldi"; }

  /* ---------------- per-visitor state ---------------- */
  var PKEY = "uprep-progress-v1", prog = {};
  try{ prog = JSON.parse(localStorage.getItem(PKEY) || "{}") || {}; }catch(e){ prog = {}; }
  function saveProg(){ try{ localStorage.setItem(PKEY, JSON.stringify(prog)); }catch(e){} }
  var open = {};
  try{ open = JSON.parse(sessionStorage.getItem("uprep-open") || "{}") || {}; }catch(e){ open = {}; }
  function saveOpen(){ try{ sessionStorage.setItem("uprep-open", JSON.stringify(open)); }catch(e){} }

  /* ---------------- accounts (Supabase) ---------------- */
  var CFG = window.UPREP_CONFIG || {};
  var LIVE = !!(str(CFG.supabaseUrl) && str(CFG.supabaseAnonKey));
  var A = { sb:null, user:null, paid:false, ready:!LIVE };
  var PREVIEW = false; /* owner's design preview, only while accounts are not switched on */
  try{ PREVIEW = !LIVE && localStorage.getItem("uprep-preview") === "1"; }catch(e){}
  function hasCourse(){ return LIVE ? A.paid : PREVIEW; }

  function loadScript(src){ return new Promise(function(res, rej){ var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  function initAuth(){
    if(!LIVE) return Promise.resolve();
    return loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js").then(function(){
      A.sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);
      A.sb.auth.onAuthStateChange(function(ev, session){
        var was = A.user && A.user.id; A.user = session ? session.user : null;
        if((A.user && A.user.id) !== was) refreshAccess().then(function(){ if(S.loaded) render(false); });
      });
      return A.sb.auth.getSession().then(function(r){ A.user = r.data.session ? r.data.session.user : null; return refreshAccess(); });
    }).catch(function(){ LIVE = false; }).then(function(){ A.ready = true; });
  }
  function refreshAccess(){
    if(!A.sb || !A.user){ A.paid = false; return Promise.resolve(); }
    return A.sb.from("profiles").select("paid").eq("id", A.user.id).maybeSingle().then(function(r){
      A.paid = !!(r.data && r.data.paid);
      if(!A.paid) return;
      return A.sb.from("course_stages").select("id,data").then(function(c){
        arr(c.data).forEach(function(row){ var st = S.stages.filter(function(s){ return s.id === row.id; })[0]; if(st && row.data && row.data.blocks) st.blocks = row.data.blocks; });
      });
    }).catch(function(){});
  }

  /* ---------------- data ---------------- */
  var root = document.getElementById("app");
  var S = { site:{}, stages:[], calendar:[], library:[], countries:[], italy:{}, cities:[], unis:[], loaded:false };
  var firstPaint = true;
  function load(name, fallback){
    return fetch("content/" + name + ".json", {cache:"no-cache"}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).catch(function(){ return fallback; });
  }
  Promise.all([load("site",{}), load("stages",[]), load("calendar",[]), load("library",[]), load("countries",[]), load("italy",{}), load("cities",[]), load("universities",[])]).then(function(r){
    S.site = r[0] || {}; S.stages = arr(r[1]); S.calendar = arr(r[2]); S.library = arr(r[3]); S.countries = arr(r[4]); S.italy = r[5] || {}; S.cities = arr(r[6]); S.unis = arr(r[7]);
    S.stages.forEach(function(s, i){ if(!str(s.id)) s.id = "b" + (i + 1); s.id = str(s.id).replace(/[^\w-]/g, "-"); });
    S.calendar.forEach(function(c){ c._d = deadline(c.date); });
    return initAuth();
  }).then(function(){ S.loaded = true; render(false); });

  function tgUrl(){ var u = str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); return "https://t.me/" + encodeURIComponent(u); }
  function tgName(){ return "@" + str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); }
  function price(){ return str(S.site.price) || "$399"; }
  function doneCount(){ return S.stages.filter(function(s){ return prog[s.id]; }).length; }
  function nextStage(){ return S.stages.filter(function(s){ return !prog[s.id]; })[0] || null; }
  function upcoming(){ return S.calendar.filter(function(c){ return c._d && daysLeft(c._d) >= 0; }).sort(function(a, b){ return a._d - b._d; }); }
  function isOpenStage(s){ return !!s.free || hasCourse(); }
  function cityById(id){ return S.cities.filter(function(c){ return c.id === id; })[0] || null; }
  function uniById(id){ return S.unis.filter(function(u){ return u.id === id; })[0] || null; }

  /* ---------------- routing ---------------- */
  function route(){
    var h = (location.hash || "").replace(/^#/, ""), m;
    if(h === "oldindan-korish"){ try{ localStorage.setItem("uprep-preview", "1"); }catch(e){} PREVIEW = !LIVE; location.replace("#kurs"); return {view:"course"}; }
    if(h === "italiya") return {view:"italy"};
    if(h === "universitetlar") return {view:"unis"};
    if(h === "shaharlar") return {view:"cities"};
    if(h === "kurs") return {view:"course"};
    if(h === "kalendar") return {view:"cal"};
    if(h === "materiallar") return {view:"lib"};
    if(h === "kirish") return {view:"login", mode:"in"};
    if(h === "royxat") return {view:"login", mode:"up"};
    if(h.indexOf("hisob") === 0) return {view:"account", paidReturn:/paid=1/.test(h)};
    if((m = h.match(/^m-(\d+)$/)) && S.library[+m[1]]) return {view:"item", i:+m[1]};
    if((m = h.match(/^shahar-([\w-]+)$/)) && cityById(m[1])) return {view:"city", c:cityById(m[1])};
    if((m = h.match(/^uni-([\w-]+)(?:\/([\w-]+))?$/)) && uniById(m[1])) return {view:"uni", u:uniById(m[1]), tab:m[2] || ""};
    var st = S.stages.filter(function(s){ return s.id === h; })[0];
    if(st) return {view:"stage", st:st};
    return {view:"home"};
  }
  function go(hash){ if(location.hash.replace(/^#/, "") === hash) render(true); else location.hash = hash; }
  var lastView = "";
  window.addEventListener("hashchange", function(){ if(S.loaded) render(true); });
  window.addEventListener("scroll", function(){ var b = document.querySelector(".appbar"); if(b) b.classList.toggle("scrolled", window.scrollY > 4); }, {passive:true});

  function render(top){
    var r = route();
    var keepScroll = r.view === "uni" && lastView === "uni:" + r.u.id;
    lastView = r.view + (r.view === "uni" ? ":" + r.u.id : "");
    root.textContent = "";
    root.appendChild(appbar(r));
    var wide = r.view === "home" || r.view === "italy";
    var main = el("main", "wrap" + (wide ? "" : " narrow"));
    var crumbs = crumbsFor(r); if(crumbs) main.appendChild(crumbs);
    ({home:homeView, italy:italyView, unis:unisView, cities:citiesView, course:courseView, cal:calView, lib:libView, login:loginView, account:accountView,
      item:function(m){ itemView(m, r.i); }, city:function(m){ cityView(m, r.c); }, uni:function(m){ uniView(m, r.u, r.tab); }, stage:function(m){ stageView(m, r.st); }
    }[r.view] || homeView)(main, r);
    root.appendChild(main);
    root.appendChild(tabbar(r));
    if(top && !keepScroll) window.scrollTo(0, 0);
    firstPaint = false;
  }

  /* ---------------- chrome ---------------- */
  function logo(h){ var c = el("span", "chip"), l = el("span", "logo"); l.style.setProperty("--h", h + "px"); l.setAttribute("role", "img"); l.setAttribute("aria-label", "Uprep"); c.appendChild(l); return c; }
  function section(r){
    if(r.view === "home") return "home";
    if(["italy","unis","cities","city","uni"].indexOf(r.view) >= 0) return "italy";
    if(["course","stage","cal","lib","item"].indexOf(r.view) >= 0) return "course";
    return "account";
  }
  function appbar(r){
    var bar = el("header", "appbar"), w = el("div", "wrap");
    var hl = el("a", "brandlink"); hl.href = "#"; hl.setAttribute("aria-label", "Uprep, bosh sahifa"); hl.appendChild(logo(20)); w.appendChild(hl);
    var nav = el("nav", "topnav"); nav.setAttribute("aria-label", "Asosiy bo'limlar");
    var sec = section(r);
    [["Bosh sahifa","","home"],["Italiya","italiya","italy"],["Universitetlar","universitetlar","unis"],["Kurs","kurs","course"]].forEach(function(x){
      var a = el("a", null, x[0]); a.href = "#" + x[1];
      var on = x[2] === "unis" ? (r.view === "unis" || r.view === "uni") : x[2] === "italy" ? (sec === "italy" && r.view !== "unis" && r.view !== "uni") : sec === x[2];
      if(on){ a.className = "on"; a.setAttribute("aria-current", "page"); }
      nav.appendChild(a);
    });
    w.appendChild(nav);
    w.appendChild(el("span", "ttl"));
    var acc = el("button", "iconbtn" + (A.user ? " me" : " tg")); acc.type = "button";
    acc.appendChild(ic("user")); acc.appendChild(el("span", null, A.user ? "Hisob" : "Kirish"));
    acc.onclick = function(){ go(A.user ? "hisob" : "kirish"); };
    w.appendChild(acc);
    bar.appendChild(w); return bar;
  }
  function crumbsFor(r){
    var c = [["Bosh sahifa", ""]];
    if(r.view === "home") return null;
    if(r.view === "italy") c.push(["Italiya"]);
    else if(r.view === "unis"){ c.push(["Italiya","italiya"]); c.push(["Universitetlar"]); }
    else if(r.view === "cities"){ c.push(["Italiya","italiya"]); c.push(["Shaharlar"]); }
    else if(r.view === "city"){ c.push(["Italiya","italiya"]); c.push(["Shaharlar","shaharlar"]); c.push([r.c.name]); }
    else if(r.view === "uni"){ c.push(["Italiya","italiya"]); c.push(["Universitetlar","universitetlar"]); c.push([r.u.short || r.u.name]); }
    else if(r.view === "course") c.push(["Kurs"]);
    else if(r.view === "stage"){ c.push(["Kurs","kurs"]); c.push([(S.stages.indexOf(r.st) + 1) + ". " + str(r.st.title)]); }
    else if(r.view === "cal"){ c.push(["Kurs","kurs"]); c.push(["Kalendar"]); }
    else if(r.view === "lib"){ c.push(["Kurs","kurs"]); c.push(["Materiallar"]); }
    else if(r.view === "item"){ c.push(["Materiallar","materiallar"]); c.push([str(S.library[r.i].title)]); }
    else return null;
    var nav = el("nav", "crumbs"); nav.setAttribute("aria-label", "Siz turgan joy");
    var ol = el("ol");
    c.forEach(function(x, i){
      var li = el("li");
      if(i < c.length - 1){ var a = el("a", null, x[0]); a.href = "#" + x[1]; li.appendChild(a); }
      else { var sp = el("span", null, x[0]); sp.setAttribute("aria-current", "page"); li.appendChild(sp); }
      ol.appendChild(li);
    });
    nav.appendChild(ol); return nav;
  }
  function tabbar(r){
    var nav = el("nav", "tabbar"), inn = el("div", "in"); nav.setAttribute("aria-label", "Asosiy menyu");
    var sec = section(r);
    function tab(name, label, on, hash){ var b = el("button", "tab" + (on ? " on" : "")); b.type = "button"; if(on) b.setAttribute("aria-current", "page"); b.appendChild(ic(name)); b.appendChild(el("span", null, label)); b.onclick = function(){ go(hash); }; inn.appendChild(b); }
    tab("home", "Bosh sahifa", sec === "home", "");
    tab("globe", "Italiya", sec === "italy" && r.view !== "unis" && r.view !== "uni", "italiya");
    tab("uni", "Universitet", r.view === "unis" || r.view === "uni", "universitetlar");
    tab("route", "Kurs", sec === "course", "kurs");
    tab("user", "Hisob", sec === "account", A.user ? "hisob" : "kirish");
    nav.appendChild(inn); return nav;
  }
  function footer(main){
    var f = el("footer", "foot");
    if(S.site.footer) f.appendChild(el("p", null, S.site.footer));
    var p = el("p", "brand"); p.appendChild(logo(13)); p.appendChild(document.createTextNode("© " + new Date().getFullYear() + " Uprep"));
    var tg = el("a", null, tgName()); tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener"; p.appendChild(tg);
    f.appendChild(p); main.appendChild(f);
  }
  function secHead(title, linkText, hash, id){
    var h = el("div", "sec-head"); if(id) h.id = id; h.appendChild(el("h2", null, title));
    if(linkText){ var a = el("a", null, linkText); a.href = "#" + hash; h.appendChild(a); }
    return h;
  }
  function rowBtn(icon, title, sub, kind, href, fn){
    var ext = href && /^https:/.test(href);
    var b = el(href ? "a" : "button", "row" + (kind ? " " + kind : ""));
    if(href){ b.href = href; if(ext){ b.target = "_blank"; b.rel = "noopener"; } } else { b.type = "button"; b.onclick = fn; }
    var i = el("span", "ic" + (kind === "g" ? " g" : "")); i.appendChild(ic(icon)); b.appendChild(i);
    var t = el("span", "txt"); t.appendChild(el("b", null, title)); if(sub) t.appendChild(el("small", null, sub)); b.appendChild(t);
    b.appendChild(ic(ext ? "link" : "next", "chev")); return b;
  }
  function pageHead(main, title, lead){ var h = el("div", "pagehead"); h.appendChild(el("h1", null, title)); if(lead) h.appendChild(el("p", null, lead)); main.appendChild(h); }
  function norm(x){ return str(x).toLowerCase().replace(/[`'ʻʼ’"]/g, "").normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function searchBox(placeholder, value, onInput){
    var l = el("label", "search"); l.appendChild(ic("search"));
    var i = el("input"); i.type = "search"; i.placeholder = placeholder; i.value = value || ""; i.setAttribute("aria-label", placeholder); i.autocomplete = "off";
    i.addEventListener("input", function(){ onInput(i.value); });
    l.appendChild(i); return {node:l, input:i};
  }

  /* ---------------- payments ---------------- */
  function startPurchase(){
    if(!LIVE || !str(CFG.paymentLink)){ toast("To'lov tez orada ochiladi. Hozircha " + tgName() + " ga yozing."); return; }
    if(!A.user){ try{ sessionStorage.setItem("uprep-after-login", "pay"); }catch(e){} go("royxat"); return; }
    var u = safeUrl(CFG.paymentLink); if(!u) return;
    location.href = u + (u.indexOf("?") < 0 ? "?" : "&") + "client_reference_id=" + encodeURIComponent(A.user.id) + "&prefilled_email=" + encodeURIComponent(A.user.email || "");
  }
  function toast(msg){
    var t = document.querySelector(".toast"); if(t) t.remove();
    t = el("div", "toast", msg); t.setAttribute("role", "status"); document.body.appendChild(t);
    setTimeout(function(){ t.classList.add("hide"); setTimeout(function(){ t.remove(); }, 400); }, 3600);
  }
  function priceCard(compact){
    var c = el("section", "price");
    var top = el("div", "price-top");
    var l = el("div"); l.appendChild(el("span", "price-k", "To'liq kurs: Italiya")); l.appendChild(el("b", "price-v", price())); l.appendChild(el("small", null, str(S.site.priceNote) || "Bir marta to'lov. Kurs umrbod ochiq.")); top.appendChild(l);
    c.appendChild(top);
    if(!compact){
      var ul = el("ul", "ticks"); arr(S.site.includes).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); c.appendChild(ul);
    }
    var b = el("button", "go"); b.type = "button";
    var sp = el("span"); sp.appendChild(el("small", null, A.user ? "Karta, Google Pay yoki Apple Pay" : "Avval ro'yxatdan o'ting"));
    sp.appendChild(el("span", "t", A.user ? "To'lash: " + price() : "Ro'yxatdan o'tish va to'lash")); b.appendChild(sp); b.appendChild(ic("next"));
    b.onclick = startPurchase; c.appendChild(b);
    if(!LIVE) c.appendChild(el("p", "soon-note", "Onlayn to'lov tez orada ishga tushadi."));
    return c;
  }

  /* ================= HOME ================= */
  function homeView(main){
    var grid = el("div", "home"), side = el("div", "col side"), rest = el("div", "col");
    /* phone shows one column in this order; desktop keeps two columns */
    function put(col, node, o){ if(!node) return; node.style.order = o; col.appendChild(node); }
    put(side, boardingPass(), 1);
    var nx = upcoming()[0]; if(nx) put(side, departure(nx), 4);
    if(!hasCourse()) put(side, priceCard(false), 7);
    put(side, rowBtn("chat", tgName() + " ga yozing", "Savollaringizga javob beramiz", "tg", tgUrl()), 20);

    put(rest, globalSearch(), 2);
    put(rest, secHead("Qayerda o'qimoqchisiz?"), 2);
    put(rest, countryGrid(), 3);
    put(rest, secHead("Kurs ichida", hasCourse() ? "Kursni ochish" : "Batafsil", "kurs"), 5);
    put(rest, routeLine(), 6);
    put(rest, secHead("Qanday ishlaydi"), 8);
    var how = el("ol", "how");
    [["Ro'yxatdan o'ting","Email va parol bilan, bir daqiqada."],["Kursni oching", price() + ", bir marta. Karta yoki Google Pay."],["Bosqichma-bosqich boring","Har bosqichda nima qilish, qaysi hujjat va qachongacha."]].forEach(function(x){
      var li = el("li"); li.appendChild(el("b", null, x[0])); li.appendChild(el("span", null, x[1])); how.appendChild(li);
    });
    put(rest, how, 9);
    if(S.unis.length){
      put(rest, secHead("Italiya universitetlari", "Hammasi (" + S.unis.length + ")", "universitetlar"), 10);
      var rail = el("div", "rail"); S.unis.filter(function(u){ return u.detailed; }).forEach(function(u){ rail.appendChild(uniCard(u)); }); put(rest, rail, 11);
    }
    footer(rest); if(rest.lastChild) rest.lastChild.style.order = 30;
    grid.appendChild(side); grid.appendChild(rest); main.appendChild(grid);
  }

  function globalSearch(){
    var wrap = el("section", "gsearch");
    wrap.appendChild(el("h2", null, "Universitet yoki shahar qidiring"));
    var res = el("div", "list gres");
    var sb = searchBox("Masalan: Sapienza, Milan, Bolonya", "", function(v){
      var q = norm(v); res.textContent = ""; if(q.length < 2) return;
      var cs = S.cities.filter(function(c){ return norm(c.name + " " + c.region).indexOf(q) >= 0; }).slice(0, 3);
      var us = S.unis.filter(function(u){ var c = cityById(u.city); return norm(u.short + " " + u.name + " " + (c ? c.name : "")).indexOf(q) >= 0; }).slice(0, 6);
      cs.forEach(function(c){ res.appendChild(cityRow(c)); }); us.forEach(function(u){ res.appendChild(uniRow(u)); });
      if(!cs.length && !us.length) res.appendChild(el("div", "empty", "Topilmadi. Boshqa nom bilan urinib ko'ring."));
    });
    wrap.appendChild(sb.node); wrap.appendChild(res); return wrap;
  }
  function boardingPass(){
    var total = S.stages.length, n = doneCount(), nx = nextStage(), owned = hasCourse();
    var pass = el("section", "pass"); pass.setAttribute("aria-label", "Sizning yo'lingiz");
    var m = el("div", "pass-main");
    if(S.site.eyebrow){ var top = el("div", "pass-top"); top.appendChild(el("span", "year", str(S.site.eyebrow))); m.appendChild(top); }
    m.appendChild(el("h1", null, S.site.title || "Chet elda o'qishga yo'l"));
    var rt = el("div", "route");
    var a = el("div", "city"); a.appendChild(el("b", null, "TAS")); a.appendChild(el("small", null, "Toshkent")); rt.appendChild(a);
    var tr = el("div", "track"); tr.setAttribute("role", "img"); tr.setAttribute("aria-label", n + " / " + total + " bosqich bajarildi");
    tr.appendChild(el("span", "fill")); var pl = el("span", "plane"); pl.appendChild(ic("plane")); tr.appendChild(pl); rt.appendChild(tr);
    var b = el("div", "city r"); b.appendChild(el("b", null, "ITA")); b.appendChild(el("small", null, "Italiya")); rt.appendChild(b);
    m.appendChild(rt);
    if(S.site.lead) m.appendChild(el("p", "lead", S.site.lead));
    pass.appendChild(m);
    var pct = total ? Math.round(n / total * 100) : 0;
    if(firstPaint && pct > 0 && !matchMedia("(prefers-reduced-motion: reduce)").matches){
      tr.style.setProperty("--p", "0%"); requestAnimationFrame(function(){ requestAnimationFrame(function(){ tr.style.setProperty("--p", pct + "%"); }); });
    } else tr.style.setProperty("--p", pct + "%");

    var stub = el("div", "pass-stub");
    var c = el("div", "stub-count"); c.appendChild(el("small", null, "Bajarildi")); c.appendChild(el("b", null, n + "/" + total)); stub.appendChild(c);
    var g = el("button", "go"); g.type = "button";
    var sp = el("span");
    if(owned){
      sp.appendChild(el("small", null, nx ? (n ? "Davom etish" : "Boshlash") : "Hammasi tayyor"));
      sp.appendChild(el("span", "t", nx ? (S.stages.indexOf(nx) + 1) + ". " + str(nx.title) : "Italiyaga xush kelibsiz!"));
      g.onclick = function(){ go(nx ? nx.id : "kurs"); };
    } else {
      sp.appendChild(el("small", null, "1-bosqich bepul"));
      sp.appendChild(el("span", "t", "Yo'lni boshlash"));
      g.onclick = function(){ go(S.stages[0] ? S.stages[0].id : "kurs"); };
    }
    g.appendChild(sp); g.appendChild(ic("next")); stub.appendChild(g); pass.appendChild(stub);
    return pass;
  }
  function flaps(n){
    var f = el("div", "flaps"); f.setAttribute("aria-hidden", "true");
    String(Math.min(n, 999)).split("").forEach(function(d){ f.appendChild(el("span", "flap", d)); });
    return f;
  }
  function departure(c){
    var n = daysLeft(c._d), a = el("a", "board" + (n <= 7 ? " soon" : "")); a.href = "#kalendar";
    a.appendChild(flaps(n));
    var t = el("div", "txt");
    t.appendChild(el("div", "k", n === 0 ? "Eng yaqin muddat: bugun" : "Eng yaqin muddatgacha " + n + " kun"));
    t.appendChild(el("b", null, c.text));
    t.appendChild(el("div", "d", str(c.date) + (c.tag ? ", " + str(c.tag) : "")));
    a.appendChild(t); return a;
  }
  function countryGrid(){
    var g = el("div", "countries"), soonBox = null;
    S.countries.forEach(function(c){
      if(c.status !== "open"){
        if(!soonBox){ soonBox = el("div", "soonlist"); soonBox.appendChild(el("span", "soon-k", "Tez orada:")); }
        var sb = el("button", "soonchip"); sb.type = "button"; sb.appendChild(el("span", "code", str(c.code))); sb.appendChild(document.createTextNode(str(c.name)));
        sb.onclick = function(){ toast(str(c.name) + ": qo'llanma tayyorlanmoqda."); }; soonBox.appendChild(sb); return;
      }
      var on = c.status === "open";
      var b = el(on ? "a" : "button", "country" + (on ? " on" : ""));
      if(on){ b.href = "#" + str(c.id); } else { b.type = "button"; b.onclick = function(){ toast(str(c.name) + ": qo'llanma tayyorlanmoqda."); }; }
      var code = el("span", "code", str(c.code)); if(on && c.code === "IT") code.classList.add("it"); b.appendChild(code);
      var t = el("span", "txt"); t.appendChild(el("b", null, c.name)); t.appendChild(el("small", null, on ? (str(c.blurb) || "Ochiq") : "Tez orada")); b.appendChild(t);
      if(on) b.appendChild(ic("next", "chev"));
      g.appendChild(b);
    });
    if(soonBox) g.appendChild(soonBox);
    return g;
  }
  function routeLine(){
    var ol = el("ol", "line"), nx = nextStage(), owned = hasCourse();
    S.stages.forEach(function(s, i){
      var done = !!prog[s.id], cur = owned && s === nx, locked = !isOpenStage(s);
      var li = el("li", "stop" + (done ? " done" : "") + (cur ? " current" : "") + (locked ? " locked" : ""));
      var b = el("button"); b.type = "button";
      var d = el("span", "dot"); if(done) d.appendChild(ic("check")); else d.textContent = String(i + 1); b.appendChild(d);
      var t = el("span", "txt"); t.appendChild(el("b", null, s.title));
      if(s.sub) t.appendChild(el("small", null, s.sub));
      if(cur) t.appendChild(el("span", "now", "Siz shu yerdasiz"));
      else if(s.free && !owned) t.appendChild(el("span", "now free", "Bepul"));
      b.appendChild(t); b.appendChild(ic(locked ? "lock" : "next", "chev"));
      b.setAttribute("aria-label", (i + 1) + "-bosqich: " + str(s.title) + (done ? ", bajarildi" : locked ? ", kursda" : ""));
      b.onclick = function(){ go(s.id); };
      li.appendChild(b); ol.appendChild(li);
    });
    return ol;
  }

  /* ================= ITALY ================= */
  function italyView(main){
    var I = S.italy;
    var head = el("section", "countryhead");
    head.appendChild(el("span", "tricolor"));
    head.appendChild(el("h1", null, I.title || "Italiya"));
    if(I.lead) head.appendChild(el("p", "intro", I.lead));
    var st = statsBlock({items:I.stats}); if(st) head.appendChild(st);
    main.appendChild(head);

    var hub = el("div", "hub");
    function tile(icon, title, sub, hash){ var a = el("a", "hubtile"); a.href = "#" + hash; var i = el("span", "ic"); i.appendChild(ic(icon)); a.appendChild(i); var t = el("span", "txt"); t.appendChild(el("b", null, title)); t.appendChild(el("small", null, sub)); a.appendChild(t); a.appendChild(ic("next", "chev")); hub.appendChild(a); }
    tile("uni", "Universitetlar", S.unis.length + " ta: davlat va xususiy", "universitetlar");
    tile("pin", "Shaharlar", S.cities.length + " ta shahar, viloyatlar bo'yicha", "shaharlar");
    tile("cal", "Muhim sanalar", "Ariza, viza va stipendiya muddatlari", "kalendar");
    main.appendChild(hub);

    var secs = arr(I.sections);
    var cols = el("div", "italy"), left = el("div", "col"), right = el("div", "col side");
    secs.forEach(function(s, si){
      var box = el("div", "blocks flat"); arr(s.blocks).forEach(function(b, bi){ var n = blockNode({id:"it-" + s.id}, b, bi, true); if(n) box.appendChild(n); });
      left.appendChild(fold("it:" + s.id, s.title, box, si === 0));
    });
    var top = S.cities.filter(function(c){ return c.intro; });
    if(top.length){
      left.appendChild(secHead("Mashhur talaba shaharlari", "Hammasi", "shaharlar"));
      var cg = el("div", "list"); top.forEach(function(c){ cg.appendChild(cityRow(c)); }); left.appendChild(cg);
    }
    var nx = upcoming()[0]; if(nx) right.appendChild(departure(nx));
    right.appendChild(hasCourse() ? rowBtn("route", "Kursni davom ettirish", "Bosqichma-bosqich yo'riqnoma", "g", "#kurs") : priceCard(true));
    cols.appendChild(left); cols.appendChild(right); main.appendChild(cols);
    footer(main);
  }
  /* a section that opens and closes like an official FAQ */
  function fold(key, title, body, defOpen){
    var isOpen = key in open ? open[key] : !!defOpen;
    var sec = el("section", "fold");
    var b = el("button", "fold-btn"); b.type = "button"; b.setAttribute("aria-expanded", isOpen ? "true" : "false");
    b.appendChild(el("span", null, title)); b.appendChild(ic("down", "chev"));
    var bd = el("div", "fold-body"); bd.appendChild(body); bd.hidden = !isOpen;
    b.onclick = function(){ var o = bd.hidden; bd.hidden = !o; b.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
    sec.appendChild(b); sec.appendChild(bd); return sec;
  }
  function unisIn(cid){ return S.unis.filter(function(u){ return u.city === cid; }); }
  function cityRow(c){
    var a = el("a", "lrow"); a.href = "#shahar-" + c.id;
    var t = el("span", "txt"); t.appendChild(el("b", null, c.name)); t.appendChild(el("small", null, str(c.region) + (c.dsu ? ". Stipendiya: " + str(c.dsu) : ""))); a.appendChild(t);
    var n = unisIn(c.id).length; if(n) a.appendChild(el("span", "count", n + " ta"));
    a.appendChild(ic("next", "chev")); return a;
  }
  function uniNext(u){
    var list = arr(u.deadlines).map(function(d){ return {d:deadline(d.date), x:d}; }).filter(function(o){ return o.d && daysLeft(o.d) >= 0; }).sort(function(a, b){ return a.d - b.d; });
    return list[0] || null;
  }
  function mono(u){ return str(u.short || u.name).replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase(); }
  function uniRow(u){
    var a = el("a", "lrow uni"); a.href = "#uni-" + u.id;
    a.appendChild(el("span", "u-mono" + (u.detailed ? "" : " plain"), mono(u)));
    var city = cityById(u.city);
    var t = el("span", "txt"); t.appendChild(el("b", null, u.short || u.name));
    var meta = (city ? city.name : "") + ", " + str(u.type).toLowerCase(); t.appendChild(el("small", null, meta));
    var tags = el("span", "u-tags");
    if(u.rank) tags.appendChild(el("span", "tag", u.rank));
    var nx = uniNext(u); if(nx) tags.appendChild(el("span", "tag hot", leftLabel(daysLeft(nx.d))));
    if(u.detailed) tags.appendChild(el("span", "tag ok", "To'liq ma'lumot"));
    if(tags.children.length) t.appendChild(tags);
    a.appendChild(t); a.appendChild(ic("next", "chev")); return a;
  }
  function uniCard(u){
    var a = el("a", "unicard"); a.href = "#uni-" + u.id;
    var top = el("span", "u-top"); top.appendChild(el("span", "u-mono", mono(u)));
    var city = cityById(u.city); var meta = el("span", "u-meta"); meta.appendChild(el("b", null, u.short || u.name)); meta.appendChild(el("small", null, (city ? city.name : "") + (u.founded ? ", " + u.founded + "-yil" : ""))); top.appendChild(meta);
    a.appendChild(top);
    var tags = el("span", "u-tags"); if(u.rank) tags.appendChild(el("span", "tag", u.rank));
    var nx = uniNext(u); if(nx) tags.appendChild(el("span", "tag hot", leftLabel(daysLeft(nx.d))));
    a.appendChild(tags); return a;
  }

  /* ---------- universities list with search and filters ---------- */
  var UF = { q:"", type:"", city:"" };
  function unisView(main){
    pageHead(main, "Italiya universitetlari", S.unis.length + " ta universitet: Italiya ta'lim vazirligi (MUR) ro'yxatidagi davlat va xususiy universitetlar.");
    var bar = el("div", "filters");
    var sb = searchBox("Universitet yoki shahar nomi", UF.q, function(v){ UF.q = v; draw(); });
    bar.appendChild(sb.node);
    var chips = el("div", "chips");
    [["","Hammasi"],["Davlat","Davlat"],["Xususiy","Xususiy"],["detailed","To'liq ma'lumotli"]].forEach(function(x){
      var b = el("button", "chipf" + (UF.type === x[0] ? " on" : ""), x[1]); b.type = "button"; b.setAttribute("aria-pressed", UF.type === x[0] ? "true" : "false");
      b.onclick = function(){ UF.type = x[0]; Array.prototype.forEach.call(chips.children, function(c){ c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); }); b.classList.add("on"); b.setAttribute("aria-pressed", "true"); draw(); };
      chips.appendChild(b);
    });
    bar.appendChild(chips);
    var sel = el("select", "cityselect"); sel.setAttribute("aria-label", "Shahar");
    var o0 = el("option", null, "Barcha shaharlar"); o0.value = ""; sel.appendChild(o0);
    S.cities.slice().sort(function(a, b){ return a.name.localeCompare(b.name); }).forEach(function(c){ if(!unisIn(c.id).length) return; var o = el("option", null, c.name + " (" + unisIn(c.id).length + ")"); o.value = c.id; if(UF.city === c.id) o.selected = true; sel.appendChild(o); });
    sel.onchange = function(){ UF.city = sel.value; draw(); };
    bar.appendChild(sel);
    main.appendChild(bar);
    var count = el("p", "count-line"); count.setAttribute("aria-live", "polite"); main.appendChild(count);
    var list = el("div", "list"); main.appendChild(list);
    function draw(){
      var q = norm(UF.q);
      var res = S.unis.filter(function(u){
        if(UF.type === "detailed" && !u.detailed) return false;
        if(UF.type && UF.type !== "detailed" && u.type !== UF.type) return false;
        if(UF.city && u.city !== UF.city) return false;
        if(q){ var c = cityById(u.city); if(norm(u.short + " " + u.name + " " + (c ? c.name + " " + c.region : "")).indexOf(q) < 0) return false; }
        return true;
      }).sort(function(a, b){ return (b.detailed ? 1 : 0) - (a.detailed ? 1 : 0) || str(a.short).localeCompare(str(b.short)); });
      list.textContent = "";
      count.textContent = res.length + " ta topildi";
      if(!res.length){ list.appendChild(el("div", "empty", "Hech narsa topilmadi. Boshqa nom bilan qidiring yoki filtrni olib tashlang.")); return; }
      res.forEach(function(u){ list.appendChild(uniRow(u)); });
    }
    draw();
    main.appendChild(el("p", "muted-note", "Onlayn (telematik) universitetlar ro'yxatga kiritilmagan. Manba: mur.gov.it"));
    footer(main);
  }

  /* ---------- cities list ---------- */
  var CQ = "";
  function citiesView(main){
    pageHead(main, "Italiya shaharlari", "Universiteti bor " + S.cities.length + " ta shahar, viloyatlar bo'yicha. Har bir viloyatda stipendiyani o'z idorasi beradi.");
    var sb = searchBox("Shahar yoki viloyat nomi", CQ, function(v){ CQ = v; draw(); });
    var bar = el("div", "filters"); bar.appendChild(sb.node); main.appendChild(bar);
    var box = el("div"); main.appendChild(box);
    function draw(){
      var q = norm(CQ), regions = {};
      S.cities.forEach(function(c){ if(q && norm(c.name + " " + c.region).indexOf(q) < 0) return; (regions[c.region] = regions[c.region] || []).push(c); });
      box.textContent = "";
      var names = Object.keys(regions).sort();
      if(!names.length){ box.appendChild(el("div", "empty", "Hech narsa topilmadi.")); return; }
      names.forEach(function(r){
        var g = el("section", "region"); g.appendChild(el("h2", null, r));
        var l = el("div", "list"); regions[r].sort(function(a, b){ return unisIn(b.id).length - unisIn(a.id).length; }).forEach(function(c){ l.appendChild(cityRow(c)); });
        g.appendChild(l); box.appendChild(g);
      });
    }
    draw(); footer(main);
  }

  /* ---------- city page ---------- */
  function cityView(main, c){
    var head = el("section", "pagecard");
    var k = el("span", "kicker"); k.appendChild(ic("pin")); k.appendChild(document.createTextNode(str(c.region) + " viloyati")); head.appendChild(k);
    head.appendChild(el("h1", null, c.name));
    if(c.intro) head.appendChild(el("p", "intro", c.intro));
    var facts = factTable([["Viloyat", c.region], ["Stipendiya idorasi", c.dsu], ["Universitetlar", unisIn(c.id).length + " ta"]]);
    head.appendChild(facts);
    main.appendChild(head);
    if(arr(c.pros).length || arr(c.cons).length){
      var pc = el("div", "proscons");
      if(arr(c.pros).length){ var p = el("section", "pc pro"); var h = el("h3"); h.appendChild(ic("plus")); h.appendChild(document.createTextNode("Nega " + c.name)); p.appendChild(h); var ul = el("ul"); arr(c.pros).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); p.appendChild(ul); pc.appendChild(p); }
      if(arr(c.cons).length){ var q = el("section", "pc con"); var h2 = el("h3"); h2.appendChild(ic("minus")); h2.appendChild(document.createTextNode("Bilib qo'ying")); q.appendChild(h2); var ul2 = el("ul"); arr(c.cons).forEach(function(x){ var li = el("li"); li.appendChild(ic("info")); li.appendChild(el("span", null, x)); ul2.appendChild(li); }); q.appendChild(ul2); pc.appendChild(q); }
      main.appendChild(pc);
    }
    if(arr(c.points).length){ var card = el("section", "card"); card.appendChild(el("h3", null, "Bilish kerak")); var ul3 = el("ul", "bullets"); arr(c.points).forEach(function(x){ ul3.appendChild(el("li", null, x)); }); card.appendChild(ul3); main.appendChild(card); }
    var us = unisIn(c.id);
    if(us.length){ main.appendChild(secHead("Universitetlar (" + us.length + ")")); var g = el("div", "list"); us.sort(function(a, b){ return (b.detailed ? 1 : 0) - (a.detailed ? 1 : 0); }).forEach(function(u){ g.appendChild(uniRow(u)); }); main.appendChild(g); }
    footer(main);
  }
  function factTable(rows){
    var t = el("dl", "facts");
    rows.forEach(function(r){ if(!str(r[1])) return; var d = el("div", "fact"); d.appendChild(el("dt", "k", r[0])); d.appendChild(el("dd", "v", r[1])); t.appendChild(d); });
    return t;
  }

  /* ---------- university page ---------- */
  var PF = { level:"", q:"" };
  function uniView(main, u, tab){
    var city = cityById(u.city);
    var head = el("section", "pagecard unihead");
    head.appendChild(el("span", "u-mono big", mono(u)));
    var k = el("a", "kicker link"); k.href = city ? "#shahar-" + city.id : "#shaharlar"; k.appendChild(ic("pin")); k.appendChild(document.createTextNode((city ? city.name : "") + ", " + str(u.type).toLowerCase() + " universitet")); head.appendChild(k);
    head.appendChild(el("h1", null, u.short || u.name));
    if(u.short && u.name !== u.short) head.appendChild(el("p", "sub", u.name));
    if(u.rank){ var rk = el("span", "rank"); rk.appendChild(ic("star")); rk.appendChild(document.createTextNode(u.rank)); head.appendChild(rk); }
    main.appendChild(head);

    var tabs = [["", "Umumiy"]];
    if(arr(u.programmes).length) tabs.push(["yonalishlar", "Yo'nalishlar (" + u.programmes.length + ")"]);
    if(u.detailed){ tabs.push(["qabul", "Qabul"]); tabs.push(["hujjatlar", "Hujjatlar"]); }
    if(tabs.map(function(t){ return t[0]; }).indexOf(tab) < 0) tab = "";
    if(tabs.length > 1){
      var tb = el("nav", "tabs"); tb.setAttribute("aria-label", "Universitet bo'limlari");
      tabs.forEach(function(t){ var a = el("a", t[0] === tab ? "on" : "", t[1]); a.href = "#uni-" + u.id + (t[0] ? "/" + t[0] : ""); if(t[0] === tab) a.setAttribute("aria-current", "page"); tb.appendChild(a); });
      main.appendChild(tb);
    }
    var box = el("div", "blocks");
    if(tab === "yonalishlar") programmesPanel(box, u);
    else if(tab === "qabul") admissionPanel(box, u);
    else if(tab === "hujjatlar") docsPanel(box, u);
    else overviewPanel(box, u, city);
    main.appendChild(box);
    if(tab !== "yonalishlar") main.appendChild(upsell());
    arr(u.sources).forEach(function(s){ var su = safeUrl(s.url); if(!su) return; var a = el("a", "src"); a.href = su; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Rasmiy manba: " + (s.label || su))); main.appendChild(a); });
    footer(main);
  }
  function overviewPanel(box, u, city){
    if(u.intro) box.appendChild(el("p", "lead-p", u.intro));
    box.appendChild(factTable([["Shahar", city ? city.name : ""], ["Viloyat", city ? city.region : ""], ["Turi", u.type], ["Tashkil topgan", u.founded ? u.founded + "-yil" : ""], ["Reyting", u.rank], ["Stipendiya", u.scholarship || (city && city.dsu ? city.dsu : "")], ["Qabul foizi", u.acceptance]]));
    var vb = videoBlock({url:u.video, title:"Ariza topshirish: video"}); if(vb) box.appendChild(vb);
    if(u.tip) box.appendChild(callout({style:"tip", text:u.tip}));
    var links = el("div", "links");
    if(u.detailed && safeUrl(u.portalUrl)) links.appendChild(rowBtn("send", u.portalLabel || "Ariza portali", host(u.portalUrl), "g", safeUrl(u.portalUrl)));
    if(safeUrl(u.web)) links.appendChild(rowBtn("globe", "Rasmiy sayt", host(u.web), null, safeUrl(u.web)));
    if(safeUrl(u.infoUrl)) links.appendChild(rowBtn("info", "Xalqaro talabalar sahifasi", host(u.infoUrl), null, safeUrl(u.infoUrl)));
    box.appendChild(links);
    if(!u.detailed) box.appendChild(callout({style:"info", text:"Bu universitet bo'yicha to'liq sahifa tayyorlanmoqda. Ariza tartibini rasmiy saytdagi International yoki Admission bo'limidan toping, yoki " + tgName() + " ga yozing."}));
  }
  function admissionPanel(box, u){
    var pu = safeUrl(u.portalUrl);
    if(pu){
      var cta = el("a", "go wide"); cta.href = pu; cta.target = "_blank"; cta.rel = "noopener";
      var sp = el("span"); sp.appendChild(el("small", null, "Ariza to'lovi: " + (u.fee || "rasmiy saytda"))); sp.appendChild(el("span", "t", u.portalLabel || "Ro'yxatdan o'tish")); cta.appendChild(sp); cta.appendChild(ic("link"));
      box.appendChild(cta);
    }
    if(arr(u.deadlines).length || u.deadlineNote){
      var dc = el("section", "card"); dc.appendChild(el("h3", null, "Muddatlar"));
      if(arr(u.deadlines).length){
        var ol = el("ol", "agenda inset");
        arr(u.deadlines).forEach(function(d){
          var dd = deadline(d.date), n = dd ? daysLeft(dd) : null;
          var li = el("li", n != null && n < 0 ? "past" : "");
          var w = el("div", "when", d.date); if(n != null) w.appendChild(el("span", "left", n < 0 ? "O'tdi" : leftLabel(n))); li.appendChild(w);
          li.appendChild(el("p", null, d.label)); ol.appendChild(li);
        });
        dc.appendChild(ol);
      }
      if(u.deadlineNote) dc.appendChild(el("p", "note", u.deadlineNote));
      box.appendChild(dc);
    }
    if(arr(u.levels).length){
      var lv = el("div", "levels");
      arr(u.levels).forEach(function(L){
        var c = el("section", "level"); var hh = el("div", "lv-h"); hh.appendChild(el("b", null, L.name)); if(L.duration) hh.appendChild(el("span", "dur", L.duration)); c.appendChild(hh);
        var ul = el("ul", "ticks small"); arr(L.req).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); c.appendChild(ul);
        lv.appendChild(c);
      });
      box.appendChild(lv);
    }
  }
  function docsPanel(box, u){
    if(arr(u.docs).length){ var dk = el("section", "card"); dk.appendChild(el("h3", null, "Ariza uchun hujjatlar")); var ul2 = el("ul", "ticks"); arr(u.docs).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul2.appendChild(li); }); dk.appendChild(ul2); box.appendChild(dk); }
    box.appendChild(callout({style:"info", text:"Pre-acceptance'dan keyin DoV/CIMEA, Universitaly va viza uchun alohida hujjatlar kerak bo'ladi: ular kursning 2–4-bosqichlarida ro'yxat bilan berilgan."}));
  }
  function programmesPanel(box, u){
    var bar = el("div", "filters");
    var levels = []; arr(u.programmes).forEach(function(p){ if(levels.indexOf(p.level) < 0) levels.push(p.level); });
    var chips = el("div", "chips");
    [""].concat(levels).forEach(function(L){
      var n = L ? u.programmes.filter(function(p){ return p.level === L; }).length : u.programmes.length;
      var b = el("button", "chipf" + (PF.level === L ? " on" : ""), (L || "Hammasi") + " (" + n + ")"); b.type = "button"; b.setAttribute("aria-pressed", PF.level === L ? "true" : "false");
      b.onclick = function(){ PF.level = L; Array.prototype.forEach.call(chips.children, function(c){ c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); }); b.classList.add("on"); b.setAttribute("aria-pressed", "true"); draw(); };
      chips.appendChild(b);
    });
    var sb = searchBox("Yo'nalish nomi (masalan Economics, Data)", PF.q, function(v){ PF.q = v; draw(); });
    bar.appendChild(sb.node); bar.appendChild(chips); box.appendChild(bar);
    var count = el("p", "count-line"); count.setAttribute("aria-live", "polite"); box.appendChild(count);
    var list = el("div", "progs"); box.appendChild(list);
    if(u.programmesNote) box.appendChild(el("p", "muted-note", u.programmesNote));
    if(safeUrl(u.programmesUrl)) box.appendChild(rowBtn("book", "Rasmiy yo'nalishlar katalogi", host(u.programmesUrl), null, safeUrl(u.programmesUrl)));
    function draw(){
      var q = norm(PF.q);
      var res = arr(u.programmes).filter(function(p){ return (!PF.level || p.level === PF.level) && (!q || norm(p.name).indexOf(q) >= 0); });
      list.textContent = ""; count.textContent = res.length + " ta yo'nalish";
      if(!res.length){ list.appendChild(el("div", "empty", "Bunday yo'nalish topilmadi.")); return; }
      res.forEach(function(p){
        var d = el("details", "prog"); var s = el("summary");
        var t = el("span", "txt"); t.appendChild(el("b", null, p.name)); var m = el("small"); m.appendChild(el("span", "tag" + (p.level === "Bakalavr" ? "" : " alt"), p.level)); m.appendChild(el("span", "tag lang", p.lang)); t.appendChild(m); s.appendChild(t);
        s.appendChild(ic("down", "chev")); d.appendChild(s);
        d.appendChild(factTable([["Kim topshira oladi", p.req], ["Minimal GPA", p.gpa ? p.gpa + " / 100" : ""], ["Test yoki suhbat", p.test || "Hujjatlar asosida"], ["Ariza to'lovi", u.fee]]));
        list.appendChild(d);
      });
    }
    draw();
  }
  function upsell(){
    if(hasCourse()) return rowBtn("route", "Kursda davom eting", "Ariza, DoV/CIMEA, viza: bosqichma-bosqich", "g", "#kurs");
    var c = el("section", "upsell");
    c.appendChild(el("b", null, "Ariza topshirildi. Keyin nima?"));
    c.appendChild(el("p", null, "DoV yoki CIMEA, pre-enrollment, viza, stipendiya va Italiyaga kelgandan keyingi ishlar: hammasi kursda, hujjatlar ro'yxati bilan."));
    var b = el("button", "go"); b.type = "button"; var sp = el("span"); sp.appendChild(el("small", null, "Bir marta to'lov")); sp.appendChild(el("span", "t", "Kursni ochish: " + price())); b.appendChild(sp); b.appendChild(ic("next")); b.onclick = function(){ go("kurs"); };
    c.appendChild(b); return c;
  }

  /* ================= COURSE ================= */
  function courseView(main){
    var owned = hasCourse(), n = doneCount();
    var head = el("section", "stagehead");
    var k = el("span", "kicker" + (owned ? " ok" : "")); k.appendChild(ic(owned ? "check" : "route")); k.appendChild(document.createTextNode(owned ? "Kurs ochiq" + (PREVIEW ? " (ko'rib chiqish rejimi)" : "") : "To'liq kurs: Italiya")); head.appendChild(k);
    head.appendChild(el("h1", null, "Italiyaga yo'l"));
    head.appendChild(el("p", "intro", owned ? n + " / " + S.stages.length + " bosqich bajarildi. Bosqichni bosing: nima qilinadi, qaysi hujjat kerak va qachongacha." : S.stages.length + " bosqich: universitet tanlashdan Italiyadagi full enrollment'gacha. 1-bosqich bepul, qolganlari kursda."));
    main.appendChild(head);
    main.appendChild(routeLine());
    if(!owned) main.appendChild(priceCard(false));
    var more = el("div", "links");
    more.appendChild(rowBtn("cal", "Kalendar", "Yil davomidagi muhim sanalar", null, "#kalendar"));
    more.appendChild(rowBtn("folder", "Materiallar", "Rasmiy hujjatlar va havolalar", null, "#materiallar"));
    main.appendChild(more);
    footer(main);
  }
  function minimap(s){
    var nav = el("nav", "minimap"); nav.setAttribute("aria-label", "Bosqichlar xaritasi");
    S.stages.forEach(function(x, i){
      var b = el("button", (prog[x.id] ? "done" : "") + (x === s ? " here" : "") + (!isOpenStage(x) ? " locked" : "")); b.type = "button";
      b.setAttribute("aria-label", (i + 1) + "-bosqich: " + str(x.title)); if(x === s) b.setAttribute("aria-current", "step");
      b.appendChild(el("span", null, String(i + 1)));
      b.onclick = function(){ go(x.id); }; nav.appendChild(b);
    });
    return nav;
  }
  function stageView(main, s){
    var idx = S.stages.indexOf(s), done = !!prog[s.id], unlocked = isOpenStage(s);
    main.appendChild(minimap(s));
    var head = el("section", "stagehead");
    head.appendChild(el("span", "big", String(idx + 1)));
    var k = el("span", "kicker" + (done ? " ok" : "")); if(done) k.appendChild(ic("check")); else if(!unlocked) k.appendChild(ic("lock"));
    k.appendChild(document.createTextNode(done ? "Bajarildi" : (idx + 1) + "-bosqich, jami " + S.stages.length + " ta" + (s.free && !hasCourse() ? ", bepul" : ""))); head.appendChild(k);
    head.appendChild(el("h1", null, s.title));
    if(s.sub) head.appendChild(el("p", "sub", s.sub));
    if(s.when){
      var w = el("div", "whenchip"); w.appendChild(ic("cal")); w.appendChild(el("span", null, s.when));
      var d = deadline(s.when), n = d ? daysLeft(d) : -1;
      if(d && n >= 0 && !done) w.appendChild(el("span", "left" + (n <= 7 ? " soon" : ""), leftLabel(n)));
      head.appendChild(w);
    }
    if(s.intro) head.appendChild(el("p", "intro", s.intro));
    main.appendChild(head);

    if(!unlocked){
      var lk = el("section", "lockcard");
      var li = el("span", "lk-ic"); li.appendChild(ic("lock")); lk.appendChild(li);
      lk.appendChild(el("b", null, "Bu bosqich kursda"));
      var inside = arr(s.blocks).map(function(b){ return str(b.title || b.label); }).filter(Boolean);
      if(inside.length){ var ul = el("ul", "ticks small"); inside.forEach(function(x){ var l2 = el("li"); l2.appendChild(ic("check")); l2.appendChild(el("span", null, x)); ul.appendChild(l2); }); lk.appendChild(ul); }
      main.appendChild(lk);
      main.appendChild(priceCard(true));
      footer(main); return;
    }

    var box = el("div", "blocks"), firstAcc = {v:true};
    arr(s.blocks).forEach(function(b, bi){ var node = blockNode(s, b, bi, false, firstAcc); if(node) box.appendChild(node); });
    main.appendChild(box);

    var big = el("button", "markdone" + (done ? " on" : "")); big.type = "button"; big.setAttribute("aria-pressed", done ? "true" : "false");
    big.appendChild(ic("check")); big.appendChild(el("span", null, done ? "Bajarildi" : "Bajarildi deb belgilash"));
    big.onclick = function(){ if(prog[s.id]) delete prog[s.id]; else prog[s.id] = true; saveProg(); render(false); };
    main.appendChild(big);

    var nxt = S.stages[idx + 1], prev = S.stages[idx - 1];
    if(nxt){
      var nc = el("button", "nextcard"); nc.type = "button";
      nc.appendChild(el("span", "dot", String(idx + 2)));
      var t = el("span", "txt"); t.appendChild(el("small", null, "Keyingi bosqich")); t.appendChild(el("b", null, nxt.title)); nc.appendChild(t);
      nc.appendChild(ic(isOpenStage(nxt) ? "next" : "lock")); nc.onclick = function(){ go(nxt.id); }; main.appendChild(nc);
    }
    if(prev){ var pb = el("button", "prevlink"); pb.type = "button"; pb.appendChild(ic("back")); pb.appendChild(el("span", null, "Oldingi: " + str(prev.title))); pb.onclick = function(){ go(prev.id); }; main.appendChild(pb); }
    var u = safeUrl(s.srcUrl);
    if(u){ var a = el("a", "src"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Rasmiy manba: " + (s.srcLabel || u))); main.appendChild(a); }
    footer(main);
  }

  /* ================= LIBRARY / CALENDAR ================= */
  var KIND = { video:["play","Video"], file:["file","Fayl"], link:["link","Havola"], image:["image","Rasm"] };
  function kindOf(m){ var k = str(m.kind); return KIND[k] ? k : (m.file ? "file" : m.image ? "image" : "link"); }
  function mediaCard(m, i){
    var k = kindOf(m), b = el("a", "mcard"); b.href = "#m-" + i;
    var th = el("span", "thumb" + (k === "video" ? " v" : k === "file" ? " g" : ""));
    var img = safeUrl(m.image);
    if(img){ var im = el("img"); im.src = img; im.alt = ""; im.loading = "lazy"; th.appendChild(im); } else th.appendChild(ic(KIND[k][0]));
    b.appendChild(th); b.appendChild(el("span", "kind", KIND[k][1])); b.appendChild(el("b", null, m.title));
    if(m.desc) b.appendChild(el("small", null, m.desc));
    return b;
  }
  function libView(main){
    pageHead(main, "Materiallar", "Rasmiy hujjatlar, videolar va foydali havolalar.");
    if(!S.library.length){ main.appendChild(el("div", "empty", "Hozircha material yo'q.")); footer(main); return; }
    var g = el("div", "libgrid"); S.library.forEach(function(m, i){ g.appendChild(mediaCard(m, i)); });
    main.appendChild(g); footer(main);
  }
  function itemView(main, i){
    var m = S.library[i], k = kindOf(m);
    var head = el("section", "stagehead");
    var kk = el("span", "kicker"); kk.appendChild(ic(KIND[k][0])); kk.appendChild(document.createTextNode(KIND[k][1])); head.appendChild(kk);
    head.appendChild(el("h1", null, m.title));
    if(m.desc) head.appendChild(el("p", "intro", m.desc));
    main.appendChild(head);
    var box = el("div", "blocks"), node;
    if(k === "video") node = videoBlock({url:m.url, file:m.file});
    else if(k === "image") node = imageBlock({image:m.image || m.file});
    else if(k === "file") node = fileBlock({file:m.file || m.url, label:m.title});
    else node = linkBlock({url:m.url, label:"Ochish", note:host(m.url)});
    if(node) box.appendChild(node);
    main.appendChild(box);
  }
  function agenda(list, short){
    var ul = el("ol", "agenda" + (short ? " short" : "")), first = upcoming()[0];
    list.forEach(function(c){
      var n = c._d ? daysLeft(c._d) : null;
      var li = el("li", n != null && n < 0 ? "past" : c === first ? "next" : "");
      var w = el("div", "when", c.date);
      if(n != null) w.appendChild(el("span", "left", n < 0 ? "O'tdi" : leftLabel(n)));
      li.appendChild(w);
      var t = el("div"); if(c.tag) t.appendChild(el("span", "tag", c.tag)); t.appendChild(el("p", null, c.text)); li.appendChild(t);
      ul.appendChild(li);
    });
    return ul;
  }
  function calView(main){
    pageHead(main, "Kalendar", "Yil davomidagi muhim sanalar. O'tib ketganlari xira ko'rinadi.");
    if(!S.calendar.length){ main.appendChild(el("div", "empty", "Hozircha sana yo'q.")); footer(main); return; }
    main.appendChild(agenda(S.calendar, false)); footer(main);
  }

  /* ================= ACCOUNT ================= */
  function loginView(main, r){
    if(A.user){ go("hisob"); return; }
    var up = r.mode === "up";
    var card = el("section", "auth");
    card.appendChild(el("h1", null, up ? "Ro'yxatdan o'tish" : "Kirish"));
    card.appendChild(el("p", "intro", up ? "Hisob oching: kurs, bosqichlar va belgilaringiz shu hisobda saqlanadi." : "Email va parolingiz bilan kiring."));
    var seg = el("div", "seg");
    var b1 = el("button", up ? "" : "on", "Kirish"); b1.type = "button"; b1.onclick = function(){ go("kirish"); };
    var b2 = el("button", up ? "on" : "", "Ro'yxatdan o'tish"); b2.type = "button"; b2.onclick = function(){ go("royxat"); };
    seg.appendChild(b1); seg.appendChild(b2); card.appendChild(seg);

    var f = el("form", "form"); f.noValidate = true;
    function field(label, type, name, auto){ var l = el("label", "fld"); l.appendChild(el("span", null, label)); var i = el("input"); i.type = type; i.name = name; i.autocomplete = auto; i.required = true; if(type === "password") i.minLength = 8; l.appendChild(i); f.appendChild(l); return i; }
    var em = field("Email", "email", "email", "email");
    var pw = field("Parol" + (up ? " (kamida 8 belgi)" : ""), "password", "password", up ? "new-password" : "current-password");
    var msg = el("p", "formmsg"); msg.setAttribute("role", "alert");
    var sub = el("button", "go wide", null); sub.type = "submit"; var sp = el("span"); sp.appendChild(el("span", "t", up ? "Hisob ochish" : "Kirish")); sub.appendChild(sp); sub.appendChild(ic("next"));
    f.appendChild(msg); f.appendChild(sub);
    f.onsubmit = function(e){
      e.preventDefault(); msg.textContent = ""; msg.className = "formmsg";
      var email = str(em.value), pass = pw.value;
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ msg.textContent = "Email manzilini to'g'ri yozing."; em.focus(); return; }
      if(pass.length < (up ? 8 : 1)){ msg.textContent = up ? "Parol kamida 8 belgidan iborat bo'lsin." : "Parolni yozing."; pw.focus(); return; }
      if(!LIVE || !A.sb){ msg.textContent = "Ro'yxatdan o'tish tez orada ochiladi. Hozircha " + tgName() + " ga yozing."; return; }
      sub.disabled = true;
      var p = up ? A.sb.auth.signUp({email:email, password:pass, options:{emailRedirectTo: location.origin + location.pathname + "#hisob"}}) : A.sb.auth.signInWithPassword({email:email, password:pass});
      p.then(function(res){
        sub.disabled = false;
        if(res.error){ msg.textContent = authError(res.error.message); return; }
        if(up && !res.data.session){ msg.className = "formmsg ok"; msg.textContent = "Emailingizga tasdiqlash xati yubordik. Xatdagi havolani bosing, keyin shu yerdan kiring."; return; }
        A.user = res.data.user; refreshAccess().then(afterLogin);
      });
    };
    card.appendChild(f);
    if(LIVE && CFG.googleLogin){
      var g = el("button", "gbtn"); g.type = "button"; g.appendChild(el("span", "g", "G")); g.appendChild(el("span", null, "Google orqali davom etish"));
      g.onclick = function(){ A.sb.auth.signInWithOAuth({provider:"google", options:{redirectTo: location.origin + location.pathname + "#hisob"}}); };
      card.appendChild(g);
    }
    if(!LIVE) card.appendChild(el("p", "soon-note", "Hisoblar tez orada ishga tushadi. Bepul ma'lumotlar hozir ham ochiq."));
    main.appendChild(card); footer(main);
  }
  function authError(m){
    m = str(m).toLowerCase();
    if(m.indexOf("invalid login") >= 0) return "Email yoki parol noto'g'ri.";
    if(m.indexOf("already registered") >= 0) return "Bu email bilan hisob bor. Kirish bo'limidan kiring.";
    if(m.indexOf("not confirmed") >= 0) return "Avval emailingizdagi tasdiqlash havolasini bosing.";
    if(m.indexOf("rate limit") >= 0) return "Juda ko'p urinish. Bir necha daqiqadan keyin qayta urinib ko'ring.";
    return "Xatolik: " + m;
  }
  function afterLogin(){
    var next = ""; try{ next = sessionStorage.getItem("uprep-after-login") || ""; sessionStorage.removeItem("uprep-after-login"); }catch(e){}
    if(next === "pay" && !A.paid){ startPurchase(); return; }
    go(A.paid ? "kurs" : "hisob");
  }
  function accountView(main, r){
    if(!A.user){
      if(PREVIEW){ pageHead(main, "Hisob", "Ko'rib chiqish rejimi: hisoblar hali ishga tushmagan."); var off = el("button", "markdone", "Ko'rib chiqish rejimini o'chirish"); off.type = "button"; off.onclick = function(){ try{ localStorage.removeItem("uprep-preview"); }catch(e){} PREVIEW = false; go(""); }; main.appendChild(off); footer(main); return; }
      go("kirish"); return;
    }
    pageHead(main, "Hisob", A.user.email || "");
    var st = el("section", "card status" + (A.paid ? " ok" : ""));
    var si = el("span", "lk-ic"); si.appendChild(ic(A.paid ? "check" : "lock")); st.appendChild(si);
    var tt = el("div"); tt.appendChild(el("b", null, A.paid ? "Kurs ochiq" : "Kurs hali ochilmagan")); tt.appendChild(el("small", null, A.paid ? "Umrbod kirish. Bosqichlardagi belgilaringiz shu qurilmada saqlanadi." : "To'lovdan keyin hamma bosqichlar ochiladi.")); st.appendChild(tt);
    main.appendChild(st);
    if(r.paidReturn && !A.paid){
      main.appendChild(callout({style:"info", text:"To'lov qabul qilinmoqda. Bir necha soniyadan keyin sahifa yangilanadi."}));
      setTimeout(function(){ refreshAccess().then(function(){ if(route().view === "account") render(false); }); }, 4000);
    }
    if(A.paid) main.appendChild(rowBtn("route", "Kursni ochish", "Bosqichma-bosqich yo'riqnoma", "g", "#kurs"));
    else main.appendChild(priceCard(false));
    main.appendChild(rowBtn("chat", tgName() + " ga yozish", "Savol va yordam", null, tgUrl()));
    var out = el("button", "prevlink"); out.type = "button"; out.appendChild(ic("out")); out.appendChild(el("span", null, "Hisobdan chiqish"));
    out.onclick = function(){ A.sb.auth.signOut().then(function(){ A.user = null; A.paid = false; go(""); }); };
    main.appendChild(out);
    footer(main);
  }

  /* ================= BLOCKS ================= */
  function blockNode(s, b, bi, flat, firstAcc){
    var type = str(b && (b.type || b._block)), node = null;
    firstAcc = firstAcc || {v:true};
    if(type === "text") node = flat ? flatCard(b.title, textBody(b.body)) : accordion(s, bi, b.title || "Ma'lumot", "text", textBody(b.body), firstAcc.v);
    else if(type === "list") node = flat ? flatCard(b.title, listBody(s, b)) : accordion(s, bi, b.title || "Ro'yxat", b.style === "checklist" ? "checklist" : b.style === "steps" ? "steps" : "list", listBody(s, b), firstAcc.v, b.style === "checklist" ? checkMeter(s, b) : null);
    else if(type === "callout") node = callout(b);
    else if(type === "video") node = videoBlock(b);
    else if(type === "image") node = imageBlock(b);
    else if(type === "file") node = fileBlock(b);
    else if(type === "button") node = linkBlock(b);
    else if(type === "stats") node = statsBlock(b);
    else if(type === "cards") node = cardsBlock(b);
    if(node && node.classList && node.classList.contains("acc")) firstAcc.v = false;
    return node;
  }
  function flatCard(title, body){ var c = el("section", "card"); if(title) c.appendChild(el("h3", null, title)); c.appendChild(body); return c; }
  function accordion(s, bi, title, icon, body, defOpen, meter){
    var key = s.id + ":" + bi, isOpen = key in open ? open[key] : defOpen;
    var wrap = el("section", "acc");
    var btn = el("button", "acc-btn"); btn.type = "button"; btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    var i = el("span", "ic"); i.appendChild(ic(icon)); btn.appendChild(i);
    var t = el("span", "t"); t.appendChild(document.createTextNode(title)); if(meter) t.appendChild(meter); btn.appendChild(t);
    btn.appendChild(ic("down", "chev"));
    var bd = el("div", "acc-body"); bd.appendChild(body); bd.hidden = !isOpen;
    btn.onclick = function(){ var o = bd.hidden; bd.hidden = !o; btn.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
    wrap.appendChild(btn); wrap.appendChild(bd); return wrap;
  }
  function textBody(body){
    var f = el("div");
    str(body).split(/\n\s*\n/).forEach(function(p){ if(p.trim()) f.appendChild(el("p", "prose", p.trim())); });
    return f;
  }
  function items(b){ return arr(b.items).map(function(x){ return typeof x === "string" ? x : str(x && (x.text || x.value)); }).filter(Boolean); }
  function checkMeter(s, b){
    var list = items(b).filter(function(x){ return !/^#/.test(x); }), n = list.filter(function(x){ return prog[s.id + "|" + x]; }).length;
    var f = document.createDocumentFragment(); f.appendChild(el("small", null, n + " / " + list.length + " tayyor"));
    var m = el("span", "meter"), i = el("i"); i.style.width = (list.length ? n / list.length * 100 : 0) + "%"; m.appendChild(i); f.appendChild(m);
    return f;
  }
  function listBody(s, b){
    var list = items(b), style = str(b.style) || "bullets";
    if(style === "steps"){ var ol = el("ol", "steps"); list.forEach(function(x){ ol.appendChild(el("li", null, x)); }); return ol; }
    if(style === "checklist"){
      var f = el("div");
      list.forEach(function(x){
        if(/^#/.test(x)){ f.appendChild(el("div", "grp", x.replace(/^#\s*/, ""))); return; }
        var key = s.id + "|" + x, on = !!prog[key];
        var d = el("button", "doc"); d.type = "button"; d.setAttribute("aria-pressed", on ? "true" : "false");
        var bx = el("span", "box"); bx.appendChild(ic("check")); d.appendChild(bx); d.appendChild(el("span", "lbl", x));
        d.onclick = function(){ if(prog[key]) delete prog[key]; else prog[key] = true; saveProg(); render(false); };
        f.appendChild(d);
      });
      return f;
    }
    var ul = el("ul", "bullets"); list.forEach(function(x){ ul.appendChild(el("li", null, x)); }); return ul;
  }
  function callout(b){
    var st = ["tip","warn","info"].indexOf(str(b.style)) >= 0 ? str(b.style) : "info";
    var c = el("div", "callout " + st); c.appendChild(ic(st === "tip" ? "bulb" : st === "warn" ? "stop" : "info"));
    var sp = el("span"); if(st === "tip") sp.appendChild(el("b", null, "Uprep maslahati: ")); if(st === "warn") sp.appendChild(el("b", null, "Diqqat: ")); sp.appendChild(document.createTextNode(str(b.text))); c.appendChild(sp);
    return c;
  }
  function videoBlock(b){
    var url = safeUrl(b.url), file = safeUrl(b.file), emb = url ? videoEmbed(url) : "";
    if(!url && !file) return null;
    var fig = el("figure", "media");
    if(b.title) fig.appendChild(el("div", "ttl", b.title));
    var fr = el("div", "frame");
    if(emb){ var f = el("iframe"); f.src = emb; f.title = str(b.title) || "Video"; f.loading = "lazy"; f.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true; fr.appendChild(f); fig.appendChild(fr); }
    else if(file || isVideoFile(url)){ var v = el("video"); v.controls = true; v.preload = "metadata"; v.playsInline = true; v.src = file || url; fr.appendChild(v); fig.appendChild(fr); }
    else return linkBlock({url:url, label:str(b.title) || "Videoni ochish", note:b.caption});
    if(b.caption) fig.appendChild(el("figcaption", null, b.caption));
    return fig;
  }
  function imageBlock(b){
    var src = safeUrl(b.image); if(!src) return null;
    var fig = el("figure", "media");
    var im = el("img"); im.src = src; im.alt = str(b.caption); im.loading = "lazy"; fig.appendChild(im);
    if(b.caption) fig.appendChild(el("figcaption", null, b.caption));
    return fig;
  }
  function fileBlock(b){
    var u = safeUrl(b.file); if(!u) return null;
    var a = el("a", "row"); a.href = u; a.target = "_blank"; a.rel = "noopener"; if(!/^https:/i.test(u)) a.setAttribute("download", "");
    var i = el("span", "ic g"); i.appendChild(ic("file")); a.appendChild(i);
    var t = el("span", "txt"); t.appendChild(el("b", null, str(b.label) || fileName(u))); t.appendChild(el("small", null, str(b.note) || "Yuklab olish")); a.appendChild(t);
    a.appendChild(ic("next", "chev")); return a;
  }
  function linkBlock(b){
    var u = safeUrl(b.url); if(!u) return null;
    var a = el("a", "linkbtn"); a.href = u; a.target = "_blank"; a.rel = "noopener";
    var t = el("span", "txt"); t.appendChild(el("b", null, str(b.label) || "Ochish")); if(b.note) t.appendChild(el("small", null, b.note)); a.appendChild(t);
    a.appendChild(ic("link")); return a;
  }
  function statsBlock(b){
    var g = el("div", "stats");
    arr(b.items).forEach(function(x){ if(!x) return; var d = el("div", "stat"); d.appendChild(el("b", null, x.big)); if(x.small) d.appendChild(el("small", null, x.small)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
  function cardsBlock(b){
    var g = el("div", "cards");
    arr(b.items).forEach(function(x){ if(!x) return; var d = el("div", "ccard"); d.appendChild(el("b", null, x.title)); if(x.text) d.appendChild(el("p", null, x.text)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
})();
