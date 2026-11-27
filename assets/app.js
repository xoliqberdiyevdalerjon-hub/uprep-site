/* Uniroad platform. Texts live in content/*.json (edited in Pages CMS). Accounts and payment: Supabase + Stripe,
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
    "gear": "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
    "moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\" />",
    "type": "<polyline points=\"4 7 4 4 20 4 20 7\" /> <line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\" /> <line x1=\"12\" x2=\"12\" y1=\"4\" y2=\"20\" />",
    "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />",
    "download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <polyline points=\"7 10 12 15 17 10\" /> <line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" />",
    "upload": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <polyline points=\"17 8 12 3 7 8\" /> <line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\" />",
    "trash": "<path d=\"M3 6h18\" /> <path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\" /> <path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\" />",
    "phone": "<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /> <path d=\"M12 18h.01\" />",
    "share": "<circle cx=\"18\" cy=\"5\" r=\"3\" /> <circle cx=\"6\" cy=\"12\" r=\"3\" /> <circle cx=\"18\" cy=\"19\" r=\"3\" /> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" />",
    "help": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\" /> <path d=\"M12 17h.01\" />",
    "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /> <path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" />",
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
    if(/^#[\w-]*$/.test(u)) return u;
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

  /* ---------------- animated skyline (original drawing, no photos needed) ---------------- */
  var REDUCED = false; try{ REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
  function R(x, y, w, h, c, rx){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (rx ? ' rx="' + rx + '"' : '') + (c ? ' class="' + c + '"' : '') + '/>'; }
  function blocks(list){ return list.map(function(b){ var s = R(b[0], b[1], b[2], 340 - b[1]); if(b[3]) s += '<path d="M' + (b[0] - 3) + ' ' + b[1] + ' L' + (b[0] + b[2] / 2) + ' ' + (b[1] - 14) + ' L' + (b[0] + b[2] + 3) + ' ' + b[1] + 'Z"/>'; return s; }).join(""); }
  function windows(list){ return list.map(function(w){ return R(w[0], w[1], 6, 8, "win", 1); }).join(""); }
  function pine(x, s){ s = s || 1; return '<path d="M' + x + ' 340 L' + (x + 4) + ' 340 L' + (x + 11) + ' ' + (340 - 72 * s) + ' L' + (x + 7) + ' ' + (340 - 72 * s) + 'Z"/>' +
    '<ellipse cx="' + (x + 9) + '" cy="' + (340 - 77 * s) + '" rx="' + 40 * s + '" ry="' + 10 * s + '"/><ellipse cx="' + (x - 6) + '" cy="' + (340 - 83 * s) + '" rx="' + 24 * s + '" ry="' + 9 * s + '"/>' +
    '<ellipse cx="' + (x + 25) + '" cy="' + (340 - 85 * s) + '" rx="' + 22 * s + '" ry="' + 8 * s + '"/><ellipse cx="' + (x + 9) + '" cy="' + (340 - 90 * s) + '" rx="' + 18 * s + '" ry="' + 7 * s + '"/>'; }
  function cypress(x, h){ h = h || 120; return '<path d="M' + x + ' 340 C' + (x - 10) + ' 300 ' + (x - 9) + ' ' + (340 - h * .7) + ' ' + x + ' ' + (340 - h) + ' C' + (x + 9) + ' ' + (340 - h * .7) + ' ' + (x + 10) + ' 300 ' + x + ' 340Z"/>'; }
  function skylineSVG(kind){
    var far, mid, extra = "";
    if(kind === "town"){
      far = '<path d="M0 296 C160 262 300 284 460 270 C620 256 760 286 940 276 C1120 266 1300 290 1600 268 L1600 340 L0 340Z"/>' +
        R(318, 196, 22, 144) + R(348, 214, 18, 126) + R(372, 186, 24, 154) + R(404, 222, 18, 118) + R(1236, 206, 20, 134) + R(1262, 226, 18, 114) +
        '<path d="M1120 262 C1124 236 1168 236 1172 262Z"/>' + R(1114, 262, 64, 78);
      mid = blocks([[0,280,64,1],[64,266,46],[110,292,70,1],[180,276,52],[430,286,60,1],[490,270,44],[1010,282,56,1],[1066,270,48],[1330,276,64,1],[1394,262,44],[1438,286,72,1],[1510,272,90]]) +
        /* cathedral with a ribbed dome */
        R(676, 272, 268, 68) + '<path d="M668 274 L810 246 L952 274Z"/>' + R(756, 228, 108, 46) + '<path d="M750 232 C754 156 866 156 870 232Z"/>' + R(803, 140, 14, 22) + '<path d="M798 142 Q810 124 822 142Z"/>' +
        R(972, 168, 32, 172) + '<path d="M968 170 L988 138 L1008 170Z"/>' + R(982, 182, 12, 18, "arches", 6) + R(982, 214, 12, 18, "arches", 6) +
        R(584, 286, 70, 54) + '<path d="M580 288 C586 254 648 254 654 288Z"/>' +
        R(770, 288, 8, 30, "arches", 4) + R(796, 288, 8, 30, "arches", 4) + R(842, 288, 8, 30, "arches", 4) + R(816, 284, 10, 40, "arches", 5) +
        cypress(536, 128) + cypress(552, 104) + cypress(1036, 118) + cypress(1050, 96) + cypress(240, 110) + pine(1160, 1) + pine(30, .9) + pine(1290, .85) +
        windows([[18,292],[40,292],[18,310],[124,304],[148,304],[1024,296],[1078,284],[1078,304],[1344,290],[1366,290],[1406,278],[1452,300],[1526,288],[1556,288],[1526,308],[452,300],[500,286]]);
    } else {
      far = '<path d="M0 300 C180 276 340 290 520 282 C700 274 860 292 1040 284 C1220 276 1420 292 1600 280 L1600 340 L0 340Z"/>' +
        /* a great dome on a facade */
        R(1120, 262, 180, 78) + '<path d="M1112 264 L1210 240 L1308 264Z"/>' + R(1160, 206, 100, 40) + '<path d="M1156 210 C1156 150 1264 150 1264 210Z"/>' +
        R(1202, 140, 16, 22) + '<path d="M1198 142 Q1210 126 1222 142Z"/>' + R(1209, 112, 2, 16) + R(1204, 118, 12, 2) +
        '<path d="M1126 248 C1126 228 1154 228 1154 248Z"/><path d="M1266 248 C1266 228 1294 228 1294 248Z"/>' +
        R(470, 250, 14, 90) + '<path d="M470 250 L477 222 L484 250Z"/>' + R(520, 270, 60, 70) + R(1400, 262, 48, 78) + R(1460, 276, 64, 64);
      mid = blocks([[0,276,70,1],[70,262,50],[120,290,40,1],[372,284,62,1],[434,270,40],[1004,288,56,1],[1060,272,50],[1300,268,70],[1370,282,80,1],[1450,262,60],[1510,286,90,1]]) +
        /* temple with a dome */
        '<path d="M178 270 C184 222 288 222 294 270Z"/>' + '<path d="M160 272 L236 244 L312 272Z"/>' + R(166, 272, 140, 68) +
        [0,1,2,3,4,5,6,7].map(function(i){ return R(176 + i * 16, 280, 6, 48, "arches", 2); }).join("") +
        /* bell tower */
        R(330, 176, 30, 164) + '<path d="M326 178 L345 146 L364 178Z"/>' + R(339, 190, 12, 18, "arches", 6) + R(339, 222, 12, 18, "arches", 6) +
        /* amphitheatre: tall side on the left, broken steps to the right */
        '<path d="M600 340 L600 214 Q604 204 618 202 L790 192 L796 198 L806 198 L812 210 L824 210 L830 224 L856 226 L862 240 L900 242 L908 256 L960 258 L966 272 L1000 274 L1000 340Z"/>' +
        '<g clip-path="url(#amphi)"><rect x="600" y="220" width="400" height="96" fill="url(#arch)"/></g>' +
        [0,1,2,3,4,5,6,7].map(function(i){ return R(614 + i * 22, 206, 6, 8, "arches", 1); }).join("") +
        pine(470, 1) + pine(548, .85) + pine(1066, 1.05) + pine(1404, .9) + pine(36, .8) + cypress(1024, 124) + cypress(1040, 100) + cypress(414, 116) + cypress(1288, 110) +
        windows([[16,290],[40,290],[16,308],[84,276],[100,276],[84,296],[386,298],[408,298],[448,284],[1018,300],[1074,286],[1074,306],[1314,282],[1340,282],[1314,302],[1386,296],[1410,296],[1464,276],[1484,276],[1464,296],[1526,300],[1556,300]]);
      extra = '<clipPath id="amphi"><path d="M600 340 L600 214 Q604 204 618 202 L790 192 L796 198 L806 198 L812 210 L824 210 L830 224 L856 226 L862 240 L900 242 L908 256 L960 258 L966 272 L1000 274 L1000 340Z"/></clipPath>' +
        '<pattern id="arch" width="24" height="32" patternUnits="userSpaceOnUse" x="600" y="220"><path class="arches" d="M6 30 L6 14 A6 6 0 0 1 18 14 L18 30Z"/></pattern>';
    }
    var trail = "M-60 168 C260 70 620 40 980 60 C1260 76 1460 30 1680 -10";
    var jet = REDUCED ? "" : '<g class="jet"><path d="M10 0 L-6 -3 L-3 0 L-6 3Z"/><path d="M2 0 L-4 -10 L-1 -10 L6 0 L-1 10 L-4 10Z"/>' +
      '<animateMotion dur="28s" repeatCount="indefinite" rotate="auto" path="' + trail + '"/></g>';
    return '<svg class="skyline" viewBox="0 0 1600 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><defs>' + extra + '</defs>' +
      '<path class="trail" d="' + trail + '"/>' + jet +
      '<g class="pf pf1"><g class="l-far">' + far + '</g></g><g class="pf pf2"><g class="l-mid">' + mid + '</g></g>' +
      '<path class="l-front" d="M0 330 C400 324 800 334 1200 326 C1400 322 1500 328 1600 326 L1600 340 L0 340Z"/></svg>';
  }
  var CRUMBS = null, HZ = null;
  function hero(o){
    var h = el("section", "hero" + (o.cls ? " " + o.cls : ""));
    var sky = el("div", "sky"); sky.innerHTML = '<div class="stars"></div><div class="sun"></div><div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div>'; h.appendChild(sky);
    var img = safeUrl(o.image);
    if(img){
      if(/hero-rome\.jpg$/.test(img)) img = img.replace(/\.jpg$/, (window.innerWidth < 700 ? "-sm" : "") + ".webp");
      h.classList.add("has-photo"); var ph = el("div", "photo"); ph.style.backgroundImage = "url(" + JSON.stringify(img) + ")"; h.appendChild(ph);
      var cr = str(o.credit || S.site.heroCredit);
      if(cr){ var ca = el(safeUrl(S.site.heroCreditUrl) ? "a" : "span", "credit", cr); if(ca.tagName === "A"){ ca.href = safeUrl(S.site.heroCreditUrl); ca.target = "_blank"; ca.rel = "noopener"; } h.appendChild(ca); }
    }
    h.insertAdjacentHTML("beforeend", skylineSVG(o.scene || "rome"));
    var inn = el("div", "hero-in wrap" + (o.narrow ? " narrow" : "")); h.appendChild(inn);
    if(CRUMBS){ inn.appendChild(CRUMBS); CRUMBS = null; }
    h._in = inn; HZ.appendChild(h); return inn;
  }
  function heroTitle(t, cls){ t = str(t); var h = el("h1", cls), i = t.lastIndexOf(" "); if(i > 0){ h.appendChild(document.createTextNode(t.slice(0, i + 1))); h.appendChild(el("em", null, t.slice(i + 1))); } else h.textContent = t; return h; }
  function heroStats(list){ var g = el("div", "hero-stats"); list.forEach(function(x){ if(!x || !str(x[0])) return; var d = el("div"); d.appendChild(el("b", null, String(x[0]))); d.appendChild(el("small", null, x[1])); g.appendChild(d); }); return g; }
  function btn(cls, icon, label, href, fn){ var b = el(href ? "a" : "button", "btn " + cls); if(href){ b.href = href; if(/^https:/.test(href)){ b.target = "_blank"; b.rel = "noopener"; } } else { b.type = "button"; b.onclick = fn; } b.appendChild(el("span", null, label)); if(icon) b.appendChild(ic(icon)); return b; }
  function kicker(icon, text, href){ var k = el(href ? "a" : "span", "kicker"); if(href) k.href = href; if(icon === "flag") k.appendChild(el("span", "flag")); else if(icon) k.appendChild(ic(icon)); k.appendChild(document.createTextNode(text)); return k; }
  function sceneFor(cityId){ return cityId === "roma" ? "rome" : "town"; }

  /* ---------------- dates ---------------- */
  var TODAY = new Date(); TODAY.setHours(0,0,0,0);
  function deadline(text){
    var all = str(text).match(/\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g); if(!all) return null;
    var p = all[all.length - 1].split("."), d = new Date(+p[2], +p[1] - 1, +p[0]);
    return isNaN(d) ? null : d;
  }
  function daysLeft(d){ return Math.round((d - TODAY) / 86400000); }
  function leftLabel(n){ return n === 0 ? "Bugun" : n === 1 ? "Ertaga" : n + " kun qoldi"; }

  /* ---------------- one saved state (uprep_state_v2) ----------------
     Everything this visitor saves lives in ONE localStorage entry with a clear schema.
     LS keeps the old key names as an interface (backups and older code use them), maps each to a field,
     and on first run silently moves any legacy "uprep-*" entries into the new store. */
  var SKEY = "uprep_state_v2";
  var SMAP = { "uprep-profile":"profile", "uprep-quiz":"quiz", "uprep-me":"plan", "uprep-fav":"favorites", "uprep-track":"tracker",
    "uprep-progress-v1":"guideProgress", "uprep-docs-q":"docsAnswers", "uprep-docs-meter":"docsChecklist", "uprep-calc":"calc", "uprep-cmp":"compare",
    "uprep-xat":"letter", "uprep-feedback-draft":"feedbackDraft", "uprep-notif":"notif", "uprep-theme":"prefs.theme", "uprep-big":"prefs.big", "uprep-calm":"prefs.calm", "uprep-preview":"prefs.preview" };
  var STATE = { v:2, profile:null, quiz:null, plan:null, favorites:[], tracker:{}, guideProgress:{}, docsAnswers:null, docsChecklist:null, calc:null, compare:[], letter:{}, feedbackDraft:null, notif:null, prefs:{} };
  var stOK = true;
  (function(){
    try{
      var raw = localStorage.getItem(SKEY);
      if(raw){ var o = JSON.parse(raw); if(o && o.v === 2) for(var k in o) STATE[k] = o[k]; if(!STATE.prefs) STATE.prefs = {}; return; }
      var moved = [];
      Object.keys(SMAP).forEach(function(lk){ var v = localStorage.getItem(lk); if(v == null) return; stPut(SMAP[lk], parseVal(v)); moved.push(lk); });
      localStorage.setItem(SKEY, JSON.stringify(STATE));
      moved.forEach(function(lk){ localStorage.removeItem(lk); });
    }catch(e){ stOK = false; }
  })();
  function parseVal(v){ try{ return JSON.parse(v); }catch(e){ return v; } }
  function stPut(path, val){ var p = path.split("."); if(p.length === 2){ if(!STATE[p[0]]) STATE[p[0]] = {}; if(val === "" || val == null) delete STATE[p[0]][p[1]]; else STATE[p[0]][p[1]] = val; } else STATE[path] = val; }
  function stGet(path){ var p = path.split("."); return p.length === 2 ? (STATE[p[0]] || {})[p[1]] : STATE[path]; }
  function stSave(){ if(!stOK) return; try{ localStorage.setItem(SKEY, JSON.stringify(STATE)); }catch(e){} }
  var LS = {
    getItem:function(k){ if(!SMAP[k]){ try{ return localStorage.getItem(k); }catch(e){ return null; } } var v = stGet(SMAP[k]); if(v == null || v === "") return null; return typeof v === "string" ? v : JSON.stringify(v); },
    setItem:function(k, v){ if(!SMAP[k]){ try{ localStorage.setItem(k, v); }catch(e){} return; } stPut(SMAP[k], parseVal(String(v))); stSave(); },
    removeItem:function(k){ if(!SMAP[k]){ try{ localStorage.removeItem(k); }catch(e){} return; } var p = SMAP[k]; if(p.indexOf(".") > 0) stPut(p, null); else STATE[p] = null; stSave(); },
    keys:function(){ return Object.keys(SMAP).filter(function(k){ return LS.getItem(k) != null; }); }
  };
  if(window.UprepFeedback) window.UprepFeedback.setStorage(LS);

  /* ---------------- per-visitor state ---------------- */
  var PKEY = "uprep-progress-v1", prog = {};
  try{ prog = JSON.parse(LS.getItem(PKEY) || "{}") || {}; }catch(e){ prog = {}; }
  function saveProg(){ try{ LS.setItem(PKEY, JSON.stringify(prog)); }catch(e){} }
  var open = {};
  try{ open = JSON.parse(sessionStorage.getItem("uprep-open") || "{}") || {}; }catch(e){ open = {}; }
  function saveOpen(){ try{ sessionStorage.setItem("uprep-open", JSON.stringify(open)); }catch(e){} }

  /* ---------------- accounts (Supabase) ---------------- */
  var CFG = window.UPREP_CONFIG || {};
  var LIVE = !!(str(CFG.supabaseUrl) && str(CFG.supabaseAnonKey));
  var A = { sb:null, user:null, paid:false, ready:!LIVE };
  var PREVIEW = false; /* owner's design preview, only while accounts are not switched on */
  try{ PREVIEW = !LIVE && LS.getItem("uprep-preview") === "1"; }catch(e){}
  function hasCourse(){ if(CFG.openAll) return true; return LIVE ? A.paid : PREVIEW; }

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
  var S = { site:{}, stages:[], calendar:[], library:[], countries:[], italy:{}, cities:[], unis:[], guide:{}, dsu:{agencies:[]}, living:{}, news:[], reviews:[], foundation:{}, tests:{}, noldan:{}, about:{}, parents:{}, amb:[], out:[], ev:[], loaded:false };
  var firstPaint = true;
  function load(name, fallback){
    return fetch("content/" + name + ".json", {cache:"no-cache"}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).catch(function(){ return fallback; });
  }
  /* key figures live in ONE place: site.json "facts" (visa money, SSN) and dsu.json "national" (DSU limits).
     Texts write {{viza}}, {{isee}}, {{ispe}}, {{stip}}, {{ssn}} and get the current value, so a number is never out of sync. */
  var FX = {};
  function buildFX(){
    var f = S.site.facts || {}, N = (S.dsu || {}).national || {};
    FX = { viza:str(f.viza) || "10 179,85 €", vizaYil:str(f.vizaYil) || "2026/27", ssn:str(f.ssn) || "700 €",
      isee:str(N.isee) || "28 339,88 €", ispe:str(N.ispe) || "61 608,48 €", stip:str(N.fuoriSede) || "7 171,11 €", dsuYil:str(N.year) || "2026/27" };
  }
  function F(k){ return FX[k] || ""; }
  function fxv(o){
    if(typeof o === "string") return o.indexOf("{{") < 0 ? o : o.replace(/\{\{(\w+)\}\}/g, function(m, k){ return FX.hasOwnProperty(k) ? FX[k] : m; });
    if(o && typeof o === "object") for(var k in o) if(Object.prototype.hasOwnProperty.call(o, k)) o[k] = fxv(o[k]);
    return o;
  }
  /* boot loads only what the shell, home page and the tools need; page-specific texts are fetched on demand (cached) */
  Promise.all([load("site",{}), load("stages",[]), load("calendar",[]), load("cities",[]), load("universities",[]), load("dsu",{agencies:[]}), load("news",[]), load("reviews",[]), load("ambassadors",[]), load("outcomes",[]), load("events",[])]).then(function(r){
    S.site = r[0] || {}; S.stages = arr(r[1]); S.calendar = arr(r[2]); S.cities = arr(r[3]); S.unis = arr(r[4]);
    S.dsu = r[5] || {agencies:[]}; S.dsu.agencies = arr(S.dsu.agencies);
    S.news = arr(r[6]); S.reviews = arr(r[7]); S.amb = arr(r[8]); S.out = arr(r[9]); S.ev = arr(r[10]);
    buildFX(); ["site", "stages", "calendar", "cities", "unis", "dsu", "reviews", "amb", "out", "ev"].forEach(function(k){ fxv(S[k]); });
    S.stages.forEach(function(s, i){ if(!str(s.id)) s.id = "b" + (i + 1); s.id = str(s.id).replace(/[^\w-]/g, "-"); });
    S.calendar.forEach(function(c){ c._d = deadline(c.date); });
    return initAuth();
  }).then(function(){ S.loaded = true; render(false); setTimeout(function(){ need(Object.keys(LAZY)); }, 2500); });
  var LAZY = { privacy:{}, guide:{}, living:{}, foundation:{}, tests:{}, noldan:{}, about:{}, parents:{}, library:[], countries:[], italy:{} };
  var LZ = {}, LZok = {};
  function need(names){
    return Promise.all(names.map(function(n){
      if(!LZ[n]) LZ[n] = load(n, LAZY[n]).then(function(v){ S[n] = fxv(Array.isArray(LAZY[n]) ? arr(v) : (v || {})); LZok[n] = true; });
      return LZ[n];
    }));
  }
  /* which page texts a hash needs before it can be drawn */
  function needsFor(){
    var h = (location.hash || "").replace(/^#/, "").split("?")[0]; if(ALIAS.hasOwnProperty(h)) h = ALIAS[h];
    var m = { qollanma:["guide"], kurs:["guide"], yashash:["living"], foundation:["foundation"], testlar:["tests"], noldan:["noldan"], "biz-haqimizda":["about"], "ota-onalar":["parents"], maxfiylik:["privacy"], materiallar:["library"], italiya:["italy", "countries"] }[h] || (/^m-\d+$/.test(h) ? ["library"] : []);
    return m.filter(function(n){ return !LZok[n]; });
  }

  function tgUrl(){ var u = str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); return "https://t.me/" + encodeURIComponent(u); }
  function tgName(){ return "@" + str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); }
  function price(){ return str(S.site.price) || "$399"; }
  function doneCount(){ return S.stages.filter(function(s){ return prog[s.id]; }).length; }
  function nextStage(){ return S.stages.filter(function(s){ return !prog[s.id]; })[0] || null; }
  function upcoming(){ return S.calendar.filter(function(c){ return c._d && daysLeft(c._d) >= 0; }).sort(function(a, b){ return a._d - b._d; }); }
  function isOpenStage(s){ return !!s.free || hasCourse(); }
  function cityById(id){ return S.cities.filter(function(c){ return c.id === id; })[0] || null; }
  function uniById(id){ return S.unis.filter(function(u){ return u.id === id; })[0] || null; }
  /* number of English-taught programmes: the listed programmes win over the summary figure, so a page never shows two different counts */
  function enN(u){ var n = arr(u && u.programmes).length; return n || (u && u.enCount) || 0; }

  /* ---------------- routing ---------------- */
  var ALIAS = { "pul-kalkulyatori":"kalkulyator", "hujjatlar":"hujjatlarim", "taqvim":"kalendar", "muddatlar":"kalendar", "stipendiyalar":"stipendiya", "dsu":"stipendiya", "universitet":"universitetlar", "unis":"universitetlar", "settings":"sozlamalar", "profil-tahlili":"profil", "motivatsion-xat":"xat", "tarif":"tariflar", "narxlar":"tariflar", "haqimizda":"biz-haqimizda", "qadamlar":"qollanma", "fikr-bildirish":"xabar", "muammo":"xabar", "feedback":"xabar", "eslatmalar":"bildirishnomalar", "notifications":"bildirishnomalar", "obuna":"bildirishnomalar", "privacy":"maxfiylik", "maxfiylik-siyosati":"maxfiylik", "home":"", "bosh-sahifa":"" };
  function slug(x){ return norm(x).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function hashQuery(){ var h = location.hash || "", i = h.indexOf("?"), o = {}; if(i < 0) return o; h.slice(i + 1).split("&").forEach(function(kv){ if(!kv) return; var p = kv.split("="); try{ o[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || "").replace(/\+/g, " ")); }catch(e){} }); return o; }
  function route(){
    var h = (location.hash || "").replace(/^#/, "").split("?")[0], m;
    try{ h = decodeURIComponent(h); }catch(e){}
    if(ALIAS.hasOwnProperty(h)) h = ALIAS[h];
    if(h === "") return {view:"home"};
    if(h === "oldindan-korish"){ try{ LS.setItem("uprep-preview", "1"); }catch(e){} PREVIEW = !LIVE; location.replace("#kurs"); return {view:"course"}; }
    if(h === "italiya") return {view:"italy"};
    if(h === "qollanma") return {view:"guide"};
    if(h === "mos-universitet") return {view:"quiz"};
    if(h === "kalkulyator") return {view:"calc"};
    if(h === "yashash") return {view:"living"};
    if(h === "yangiliklar") return {view:"news"};
    if(h === "dasturlar") return {view:"progs"};
    if(h === "rejam") return {view:"plan"};
    if(h === "taqqoslash") return {view:"cmp"};
    if(h === "fikrlar") return {view:"reviews"};
    if(h === "xabar") return {view:"feedback"};
    if(h === "bildirishnomalar") return {view:"notif"};
    if(h === "maxfiylik") return {view:"privacy"};
    if(h === "foundation") return {view:"foundation"};
    if(h === "noldan") return {view:"noldan"};
    if(h === "biz-haqimizda") return {view:"about"};
    if(h === "tariflar") return plansOn() ? {view:"plans"} : {view:"home"};
    if(h === "profil") return {view:"profile"};
    if(h === "ota-onalar") return {view:"parents"};
    if(h === "sozlamalar") return {view:"settings"};
    if(h === "shablonlar") return {view:"tpl"};
    if(h === "xat") return {view:"xat"};
    if(h === "elchilar") return {view:"amb"};
    if(h === "natijalar") return {view:"out"};
    if(h === "efirlar") return {view:"events"};
    if(h === "testlar") return {view:"tests"};
    if(h === "hujjatlarim") return {view:"docs"};
    if(h === "stipendiya") return {view:"dsu"};
    if(h === "universitetlar") return {view:"unis"};
    if(h === "shaharlar") return {view:"cities"};
    if(h === "kurs") return {view:"guide"};
    if(h === "kalendar") return {view:"cal"};
    if(h === "materiallar") return {view:"lib"};
    if(h === "kirish") return {view:"login", mode:"in"};
    if(h === "royxat") return {view:"login", mode:"up"};
    if(h.indexOf("hisob") === 0) return {view:"account", paidReturn:/paid=1/.test(location.hash)};
    if((m = h.match(/^m-(\d+)$/)) && S.library[+m[1]]) return {view:"item", i:+m[1]};
    if((m = h.match(/^shahar-([\w-]+)$/))){ var cc = cityById(m[1]) || S.cities.filter(function(c){ return slug(c.name) === m[1] || slug(c.name).indexOf(m[1] + "-") === 0; })[0]; if(cc) return {view:"city", c:cc}; }
    if((m = h.match(/^uni-([\w-]+)(?:\/([\w-]+))?$/))){ var uu = uniById(m[1]) || S.unis.filter(function(u){ return slug(u.short || "") === m[1]; })[0]; if(uu) return {view:"uni", u:uu, tab:m[2] || ""}; }
    var st = S.stages.filter(function(s){ return s.id === h; })[0];
    if(st) return {view:"stage", st:st};
    return {view:"notfound", path:h};
  }
  function go(hash){ if(location.hash.replace(/^#/, "") === hash) render(true); else location.hash = hash; }
  var lastView = "";
  window.addEventListener("hashchange", function(){ if(S.loaded) render(true); });
  window.addEventListener("scroll", function(){ var b = document.querySelector(".appbar"); if(b) b.classList.toggle("scrolled", window.scrollY > 4); }, {passive:true});

  /* persistent app shell: header, footer and tab bar are built once; a route change swaps only <main> and the hero zone */
  var SH = null;
  function shell(r){
    if(SH) return SH;
    root.textContent = "";
    SH = { bar:appbar(r), hz:el("div", "herozone"), main:el("main", "wrap"), foot:footerNode(), tab:tabbar(r) };
    [SH.bar, SH.hz, SH.main, SH.foot, SH.tab].forEach(function(n){ root.appendChild(n); });
    return SH;
  }
  function markNav(r){
    var sec = section(r);
    Array.prototype.forEach.call(document.querySelectorAll("[data-sec]"), function(a){
      var on = a.getAttribute("data-sec") === sec;
      a.classList.toggle("on", on);
      if(on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  var SCROLLS = {};
  try{ SCROLLS = JSON.parse(sessionStorage.getItem("uprep-scroll") || "{}") || {}; }catch(e){ SCROLLS = {}; }
  var curKey = "", popNav = false;
  window.addEventListener("popstate", function(){ popNav = true; });
  function render(top){
    var nd = needsFor();
    if(nd.length){
      var sh0 = shell({view:"home"}), hold = location.hash;
      if(!sh0.main.querySelector(".loading")){ var ld = el("main", "wrap narrow"); ld.appendChild(el("div", "loading", "Yuklanmoqda…")); root.replaceChild(ld, sh0.main); sh0.main = ld; sh0.hz.textContent = ""; }
      need(nd).then(function(){ if(location.hash === hold) render(top); });
      return;
    }
    var r = route();
    var keepScroll = r.view === "uni" && lastView === "uni:" + r.u.id;
    lastView = r.view + (r.view === "uni" ? ":" + r.u.id : "");
    if(curKey){ SCROLLS[curKey] = window.scrollY; try{ sessionStorage.setItem("uprep-scroll", JSON.stringify(SCROLLS)); }catch(e){} }
    var key = (location.hash || "#").split("?")[0];
    var restore = popNav && SCROLLS[key] != null && key !== curKey; popNav = false; curKey = key;
    var sh = shell(r);
    var wide = ["home", "italy", "course", "stage", "guide", "dsu", "plans", "unis", "plan", "calc", "xat"].indexOf(r.view) >= 0;
    sh.hz.textContent = ""; HZ = sh.hz;
    var main = el("main", "wrap" + (wide ? "" : " narrow")); main.id = "app-main";
    CRUMBS = crumbsFor(r);
    ({home:homeView, italy:italyView, guide:guideView, dsu:dsuView, quiz:quizView, calc:calcView, living:livingView, news:newsView, progs:progSearchView, plan:planView, cmp:compareView, reviews:reviewsView, foundation:foundationView, noldan:noldanView, about:aboutView, plans:plansView, profile:profileView, parents:parentsView, amb:ambView, settings:settingsView, feedback:feedbackView, notif:notifView, privacy:privacyView, tpl:tplView, xat:xatView, out:outView, events:eventsView, tests:testsView, docs:docsView, unis:unisView, cities:citiesView, course:courseView, cal:calView, lib:libView, login:loginView, account:accountView, notfound:notFoundView,
      item:function(m){ itemView(m, r.i); }, city:function(m){ cityView(m, r.c); }, uni:function(m){ uniView(m, r.u, r.tab); }, stage:function(m){ stageView(m, r.st); }
    }[r.view] || homeView)(main, r);
    if(CRUMBS){ main.insertBefore(CRUMBS, main.firstChild); CRUMBS = null; }
    root.replaceChild(main, sh.main); sh.main = main;
    markNav(r); accLabel(); updateBell();
    if(!firstPaint && !REDUCED && !document.documentElement.classList.contains("calm")){ main.classList.add("enter"); setTimeout(function(){ main.classList.remove("enter"); }, 200); }
    if(restore){ var y = SCROLLS[key]; requestAnimationFrame(function(){ try{ window.scrollTo({top:y, left:0, behavior:"instant"}); }catch(e){ window.scrollTo(0, y); } }); }
    else if(top && !keepScroll){ try{ window.scrollTo({top:0, left:0, behavior:"instant"}); }catch(e){ window.scrollTo(0, 0); } }
    parallax();
    firstPaint = false;
  }
  /* skyline layers move at different speeds while scrolling */
  var pTick = false;
  function parallax(){
    var h = document.querySelector(".hero"); if(!h || REDUCED) return;
    var y = Math.min(window.scrollY, 700);
    h.style.setProperty("--sy", String(y));
  }
  window.addEventListener("scroll", function(){ if(pTick) return; pTick = true; requestAnimationFrame(function(){ pTick = false; parallax(); }); }, {passive:true});

  /* ---------------- chrome ---------------- */
  /* Uniroad brand mark: a white "U" (university, the road) under a gold graduation cap, on the violet brand gradient */
  var MKN = 0;
  function markSVG(){
    var n = ++MKN, b = "mkb" + n, h = "mkh" + n, g = "mkg" + n;
    return '<svg class="mark still" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="' + b + '" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#4338CA"/><stop offset=".55" stop-color="#6D3BF5"/><stop offset="1" stop-color="#C026D3"/></linearGradient>' +
      '<linearGradient id="' + h + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE38A"/><stop offset="1" stop-color="#F7B731"/></linearGradient></defs>' +
      '<rect width="64" height="64" rx="16" fill="url(#' + b + ')"/><rect width="64" height="64" rx="16" fill="url(#' + h + ')"/>' +
      '<path d="M20.5 28.5 V38.5 a11.5 11.5 0 0 0 23 0 V28.5" fill="none" stroke="#fff" stroke-width="7.8" stroke-linecap="round"/>' +
      '<g class="ur-cap"><path d="M23.5 21.5 V26.8 Q32 31 40.5 26.8 V21.5 Z" fill="#E09A12"/><path d="M32 10.5 L50.5 18.4 L32 26.3 L13.5 18.4 Z" fill="url(#' + g + ')"/>' +
      '<path d="M46.6 20 V28.6" stroke="#F7B731" stroke-width="1.9" stroke-linecap="round"/><rect x="44.8" y="27.6" width="3.6" height="5.6" rx="1.6" fill="#FFE38A"/></g></svg>';
  }
  function logo(h){
    var c = el("span", "logo-b"); c.style.setProperty("--h", h + "px"); c.setAttribute("role", "img"); c.setAttribute("aria-label", "Uniroad");
    c.innerHTML = markSVG(); var w = el("span", "word", "Uni"); w.appendChild(el("i", null, "road")); c.appendChild(w); return c;
  }
  function section(r){
    var v = r.view;
    if(v === "home") return "home";
    if(["guide","noldan","foundation","tests","course","stage","cal","lib","item","italy","living","tpl","xat"].indexOf(v) >= 0) return "guide";
    if(["unis","uni","progs","cmp","quiz","cities","city"].indexOf(v) >= 0) return "unis";
    if(v === "dsu" || v === "calc") return "dsu";
    if(v === "settings" || v === "plans" || v === "feedback") return "settings";
    if(v === "notif") return "notif";
    if(["plan","docs","profile"].indexOf(v) >= 0) return "plan";
    return "other";
  }

  function appbar(r){
    var bar = el("header", "appbar"), w = el("div", "wrap");
    var hl = el("a", "brandlink"); hl.href = "#"; hl.setAttribute("aria-label", "Uniroad, bosh sahifa"); hl.appendChild(logo(20)); w.appendChild(hl);
    var nav = el("nav", "topnav"); nav.setAttribute("aria-label", "Asosiy bo'limlar");
    [["Qo'llanma","qollanma","guide"],["Universitetlar","universitetlar","unis"],["Stipendiya","stipendiya","dsu"],["Rejam","rejam","plan"]].forEach(function(x){
      var a = el("a", null, x[0]); a.href = "#" + x[1]; a.setAttribute("data-sec", x[2]); nav.appendChild(a);
    });
    w.appendChild(nav);
    w.appendChild(el("span", "ttl"));
    var bl = el("a", "iconbtn bellbtn"); bl.href = "#bildirishnomalar"; bl.setAttribute("aria-label", "Bildirishnomalar"); bl.title = "Bildirishnomalar"; bl.setAttribute("data-sec", "notif"); bl.appendChild(ic("bell")); var bd = el("span", "bdg"); bd.hidden = true; bl.appendChild(bd); w.appendChild(bl);
    var gs = el("a", "iconbtn"); gs.href = "#sozlamalar"; gs.setAttribute("aria-label", "Sozlamalar"); gs.title = "Sozlamalar"; gs.setAttribute("data-sec", "settings"); gs.appendChild(ic("gear")); w.appendChild(gs);
    var acc = el("button", "iconbtn acc"); acc.type = "button"; acc.hidden = !LIVE;
    acc.appendChild(ic("user")); acc.appendChild(el("span"));
    acc.onclick = function(){ go(A.user ? "hisob" : "kirish"); };
    w.appendChild(acc);
    bar.appendChild(w); return bar;
  }
  function accLabel(){
    var a = document.querySelector(".appbar .acc"); if(!a) return;
    a.hidden = !LIVE; a.classList.toggle("me", !!A.user); a.classList.toggle("tg", !A.user);
    a.lastChild.textContent = A.user ? "Hisob" : "Kirish";
  }
  function crumbsFor(r){
    var c = [["Bosh sahifa", ""]];
    if(r.view === "home") return null;
    if(r.view === "italy") c.push(["Italiya"]);
    else if(r.view === "guide") c.push(["Qo'llanma"]);
    else if(r.view === "living"){ c.push(["Italiya","italiya"]); c.push(["Yashash"]); }
    else if(r.view === "news") c.push(["Yangiliklar"]);
    else if(r.view === "progs"){ c.push(["Universitetlar","universitetlar"]); c.push(["Dastur qidirish"]); }
    else if(r.view === "plan") c.push(["Rejam"]);
    else if(r.view === "reviews") c.push(["Fikrlar"]);
    else if(r.view === "about") c.push(["Biz haqimizda"]);
    else if(r.view === "plans"){ c.push(["Sozlamalar","sozlamalar"]); c.push(["Tariflar"]); }
    else if(r.view === "profile") c.push(["Profil tahlili"]);
    else if(r.view === "parents") c.push(["Ota-onalar uchun"]);
    else if(r.view === "amb") c.push(["Talaba-elchilar"]);
    else if(r.view === "settings") c.push(["Sozlamalar"]);
    else if(r.view === "notfound") c.push(["Sahifa topilmadi"]);
    else if(r.view === "notif") c.push(["Bildirishnomalar"]);
    else if(r.view === "privacy") c.push(["Maxfiylik siyosati"]);
    else if(r.view === "feedback"){ c.push(["Sozlamalar","sozlamalar"]); c.push(["Fikr bildirish"]); }
    else if(r.view === "tpl"){ c.push(["Qo'llanma","qollanma"]); c.push(["Shablonlar"]); }
    else if(r.view === "xat"){ c.push(["Qo'llanma","qollanma"]); c.push(["Motivatsion xat"]); }
    else if(r.view === "out") c.push(["Natijalar"]);
    else if(r.view === "events") c.push(["Jonli efirlar"]);
    else if(r.view === "noldan"){ c.push(["Qo'llanma","qollanma"]); c.push(["Noldan: to'liq yo'riqnoma"]); }
    else if(r.view === "foundation"){ c.push(["Qo'llanma","qollanma"]); c.push(["Foundation"]); }
    else if(r.view === "tests"){ c.push(["Qo'llanma","qollanma"]); c.push(["Testlar"]); }
    else if(r.view === "docs") c.push(["Hujjatlarim"]);
    else if(r.view === "cmp"){ c.push(["Universitetlar","universitetlar"]); c.push(["Taqqoslash"]); }
    else if(r.view === "calc"){ c.push(["Stipendiyalar","stipendiya"]); c.push(["Pul kalkulyatori"]); }
    else if(r.view === "quiz"){ c.push(["Universitetlar","universitetlar"]); c.push(["Menga mos universitet"]); }
    else if(r.view === "dsu"){ c.push(["Italiya","italiya"]); c.push(["Stipendiyalar"]); }
    else if(r.view === "unis"){ c.push(["Italiya","italiya"]); c.push(["Universitetlar"]); }
    else if(r.view === "cities"){ c.push(["Italiya","italiya"]); c.push(["Shaharlar"]); }
    else if(r.view === "city"){ c.push(["Italiya","italiya"]); c.push(["Shaharlar","shaharlar"]); c.push([r.c.name]); }
    else if(r.view === "uni"){ c.push(["Italiya","italiya"]); c.push(["Universitetlar","universitetlar"]); c.push([r.u.short || r.u.name]); }
    else if(r.view === "course") c.push(["Kurs"]);
    else if(r.view === "stage"){ c.push(["Qo'llanma","qollanma"]); c.push([(S.stages.indexOf(r.st) + 1) + "-qadam"]); }
    else if(r.view === "cal"){ c.push(["Qo'llanma","qollanma"]); c.push(["Kalendar"]); }
    else if(r.view === "lib"){ c.push(["Qo'llanma","qollanma"]); c.push(["Materiallar"]); }
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
    function tab(name, label, sec, hash){ var b = el("a", "tab"); b.href = "#" + hash; b.setAttribute("data-sec", sec); b.appendChild(ic(name)); b.appendChild(el("span", null, label)); b.onclick = function(e){ if(location.hash.replace(/^#/, "").split("?")[0] === hash){ e.preventDefault(); render(true); } }; inn.appendChild(b); }
    tab("home", "Bosh sahifa", "home", "");
    tab("book", "Qo'llanma", "guide", "qollanma");
    tab("uni", "Universitetlar", "unis", "universitetlar");
    tab("coin", "Stipendiya", "dsu", "stipendiya");
    tab("heart", "Rejam", "plan", "rejam");
    nav.appendChild(inn); return nav;
  }
  function footer(){ /* the footer is part of the persistent shell (footerNode) */ }
  function footerNode(){
    var f = el("footer", "foot wrap"), g = el("div", "foot-grid");
    var about = el("div"); about.appendChild(logo(16)); if(S.site.footer) about.appendChild(el("p", null, S.site.footer)); g.appendChild(about);
    function col(title, links){ var c = el("div"); c.appendChild(el("h2", "foot-h", title)); var ul = el("ul"); links.forEach(function(l){ var li = el("li"), a = el("a", null, l[0]); a.href = l[1]; if(/^https:/.test(l[1])){ a.target = "_blank"; a.rel = "noopener"; } li.appendChild(a); ul.appendChild(li); }); c.appendChild(ul); g.appendChild(c); }
    col("Qo'llanma", [["8 qadam", "#qollanma"], ["Hammasi bitta sahifada (PDF)", "#noldan"], ["Foundation", "#foundation"], ["Testlar", "#testlar"], ["Italiyada yashash", "#yashash"], ["Kalendar", "#kalendar"], ["Materiallar", "#materiallar"], ["Shablonlar", "#shablonlar"]]);
    col("Vositalar", [["Universitetlar", "#universitetlar"], ["Stipendiyalar", "#stipendiya"], ["Profil tahlili", "#profil"], ["Pul kalkulyatori", "#kalkulyator"], ["Motivatsion xat", "#xat"], ["Mening rejam", "#rejam"], ["Sozlamalar", "#sozlamalar"]]);
    col("Uniroad", [["Biz haqimizda", "#biz-haqimizda"]].concat(plansOn() ? [["Tariflar", "#tariflar"]] : []).concat([["Ota-onalar uchun", "#ota-onalar"]]).concat(realAmb().length ? [["Talaba-elchilar", "#elchilar"]] : []).concat(realOut().length ? [["Natijalar", "#natijalar"]] : []).concat(evList().length ? [["Jonli efirlar", "#efirlar"]] : []).concat([["Yangiliklar", "#yangiliklar"], ["Fikr bildirish", "#xabar"], ["Maxfiylik siyosati", "#maxfiylik"], ["Telegram: " + tgName(), tgUrl()]]));
    f.appendChild(g);
    var p = el("p", "brand"); p.appendChild(document.createTextNode("© " + new Date().getFullYear() + " Uniroad." + (S.site.updated ? " Ma'lumotlar oxirgi marta " + S.site.updated + " da yangilandi." : "")));
    var tg = el("a", null, tgName()); tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener"; p.appendChild(tg);
    f.appendChild(p); return f;
  }
  function secHead(title, linkText, hash, id, eyebrow, desc){
    var h = el("div", "sec-head"); if(id) h.id = id;
    var l = el("div"); if(eyebrow) l.appendChild(el("span", "eyebrow", eyebrow)); l.appendChild(el("h2", null, title)); if(desc) l.appendChild(el("p", null, desc)); h.appendChild(l);
    if(linkText){ var a = el("a", null, linkText); a.href = "#" + hash; a.appendChild(ic("next")); h.appendChild(a); }
    return h;
  }
  function sec(){ var s = el("section", "sec"); Array.prototype.forEach.call(arguments, function(n){ if(n) s.appendChild(n); }); return s; }
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
    var l = el("div"); l.appendChild(el("span", "price-k", "Sayt: «" + (str(plans()[0].name) || "Free") + "» tarifi")); l.appendChild(el("b", "price-v", price())); l.appendChild(el("small", null, str(S.site.priceNote) || "Bir marta to'lov. Kurs umrbod ochiq.")); top.appendChild(l);
    c.appendChild(top);
    if(!compact){
      var ul = el("ul", "ticks"); arr(S.site.includes).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); c.appendChild(ul);
    }
    var b = el("button", "go"); b.type = "button";
    var sp = el("span"); sp.appendChild(el("small", null, A.user ? "Karta, Google Pay yoki Apple Pay" : "Avval ro'yxatdan o'ting"));
    sp.appendChild(el("span", "t", A.user ? "To'lash: " + price() : "Ro'yxatdan o'tish va to'lash")); b.appendChild(sp); b.appendChild(ic("next"));
    b.onclick = startPurchase; c.appendChild(b);
    if(!LIVE) c.appendChild(el("p", "soon-note", "Onlayn to'lov tez orada ishga tushadi."));
    if(plansOn() && plans().length > 1){ var oa = el("a", "plan-more"); oa.href = "#tariflar"; oa.appendChild(el("span", null, "Yordam kerakmi? " + plans().slice(1).map(function(p){ return p.name + " " + p.price; }).join(" · "))); oa.appendChild(ic("next")); c.appendChild(oa); }
    return c;
  }

  /* ================= SEND TO ADMIN =================
     With the relay configured (assets/relay-config.js -> Cloudflare Worker -> Telegram bot) messages reach the admin automatically.
     Without it, or if sending fails: a sheet shows the message, copies it, and opens the admin chat directly from the tap
     (window.open inside a promise is blocked by mobile browsers, so the link is a real <a> the user taps). */
  function relayOn(){ return !!(window.UprepFeedback && window.UprepFeedback.isConfigured()); }
  function leadSheet(text, title){
    var old = document.querySelector(".sheet-bg"); if(old) old.remove();
    var bg = el("div", "sheet-bg"), sh = el("div", "sheet"); sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
    sh.appendChild(el("h3", null, title || "Xabaringiz tayyor"));
    var ol = el("ol", "sheet-steps");
    ["«Nusxalash» tugmasini bosing", "«Telegram'da ochish»ni bosing: " + tgName() + " chati ochiladi", "Xabar maydonini bosib turing, «Joylashtirish» (Вставить / Paste) ni tanlang va yuboring"].forEach(function(t){ ol.appendChild(el("li", null, t)); });
    sh.appendChild(ol);
    var ta = el("textarea", "sheet-ta"); ta.value = text; ta.rows = 7; ta.readOnly = true; sh.appendChild(ta);
    var row = el("div", "sheet-btns");
    var cp = el("button", "btn line"); cp.type = "button"; cp.appendChild(el("span", null, "Nusxalash")); cp.appendChild(ic("doc"));
    cp.onclick = function(){ copyText(text).then(function(){ cp.firstChild.textContent = "Nusxalandi ✓"; }); ta.select(); };
    var op = el("a", "btn gold"); op.href = tgUrl(); op.target = "_blank"; op.rel = "noopener"; op.appendChild(el("span", null, "Telegram'da ochish")); op.appendChild(ic("send"));
    op.onclick = function(){ copyText(text); };
    row.appendChild(cp); row.appendChild(op); sh.appendChild(row);
    var sh2 = el("a", "prevlink"); sh2.href = "https://t.me/share/url?url=" + encodeURIComponent(location.origin + location.pathname) + "&text=" + encodeURIComponent(text); sh2.target = "_blank"; sh2.rel = "noopener"; sh2.appendChild(el("span", null, "Yoki: Telegram «Ulashish» orqali " + tgName() + " ni tanlab yuborish")); sh.appendChild(sh2);
    var x = el("button", "sheet-x"); x.type = "button"; x.setAttribute("aria-label", "Yopish"); x.textContent = "×"; x.onclick = function(){ bg.remove(); }; sh.appendChild(x);
    bg.onclick = function(e){ if(e.target === bg) bg.remove(); };
    bg.appendChild(sh); document.body.appendChild(bg);
    copyText(text);
  }
  function sendLead(kind, text, contact, done){
    if(!relayOn()){ leadSheet(text); if(done) done(false); return; }
    window.UprepFeedback.send({kind:kind, text:text, contact:str(contact)}).then(function(r){
      if(r.ok){ toast("Yuborildi! " + tgName() + " tez orada javob beradi."); if(done) done(true); return; }
      if(r.reason === "busy") return;
      leadSheet(text, r.reason === "offline" ? "Internet yo'q: keyinroq yoki qo'lda yuboring" : "Avtomatik yuborilmadi: qo'lda yuboring");
      if(done) done(false);
    });
  }
  function leadContactField(){
    if(!relayOn()) return null;
    var l = el("label", "fld"); l.appendChild(el("span", null, "Siz bilan qanday bog'lanamiz? (Telegram @username yoki telefon)"));
    var i = el("input"); i.type = "text"; i.placeholder = "@username yoki +998…"; i.autocomplete = "tel"; l.appendChild(i); l._input = i; return l;
  }

  /* ================= PLANS (3 tiers) ================= */
  function plansOn(){ return arr(S.site.plans).filter(function(x){ return x && str(x.name) && str(x.price); }).length > 0; }
  function plans(){ var P = arr(S.site.plans).filter(function(x){ return x && str(x.name) && str(x.price); }); return P.length ? P : [{id:"app", name:"Free", price:price(), note:"Bir marta to'lov", items:arr(S.site.includes)}]; }
  function planAsk(p){
    var body = "Salom! Uniroad saytidan yozyapman. «" + str(p.name) + "» (" + str(p.price) + ") " + (p.id ? "tarifi" : "xizmati") + " bo'yicha ma'lumot olmoqchiman.";
    if(relayOn()){ var c = prompt("Siz bilan qanday bog'lanamiz? Telegram @username yoki telefon raqamingiz:"); if(!str(c)) return; sendLead("tarif", body, c); }
    else leadSheet(body);
  }
  function plansGrid(){
    var g = el("div", "plans");
    plans().forEach(function(p, i){
      var c = el("article", "plan" + (str(p.badge) ? " hot" : ""));
      if(str(p.badge)) c.appendChild(el("span", "plan-badge", p.badge));
      c.appendChild(el("span", "price-k", p.name));
      c.appendChild(el("b", "price-v", p.price));
      if(p.note) c.appendChild(el("small", "plan-note", p.note));
      if(p.tagline) c.appendChild(el("p", "plan-tag", p.tagline));
      var ul = el("ul", "ticks small"); arr(p.items).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); c.appendChild(ul);
      var self = i === 0 && str(p.id) !== "support" && str(p.id) !== "full";
      var b = el("button", self ? "go" : "go alt"); b.type = "button";
      var sp = el("span"); sp.appendChild(el("small", null, self ? (LIVE ? "Karta, Google Pay yoki Apple Pay" : "Onlayn to'lov tez orada") : "Telegram: " + tgName()));
      var free = self && CFG.openAll;
      if(free) sp.firstChild.textContent = "Hozircha barcha bosqichlar bepul ochiq";
      sp.appendChild(el("span", "t", free ? "Kursni ochish" : str(p.cta) || (self ? "To'lash" : "Yozish"))); b.appendChild(sp); b.appendChild(ic(self ? "next" : "send"));
      b.onclick = free ? function(){ go("kurs"); } : self ? (LIVE ? startPurchase : function(){ planAsk(p); }) : function(){ planAsk(p); };
      c.appendChild(b); g.appendChild(c);
    });
    return g;
  }
  function plansSection(title){
    var wrap = el("div");
    wrap.appendChild(plansGrid());
    var EX = arr(S.site.extras).filter(function(x){ return x && str(x.name) && str(x.price); });
    if(EX.length){ var xg = el("div", "extras"); xg.appendChild(el("h3", null, "Faqat bitta bosqichda yordam kerakmi?"));
      EX.forEach(function(x){ var b = el("button", "extra"); b.type = "button"; var t = el("span", "txt"); t.appendChild(el("b", null, x.name)); if(x.note) t.appendChild(el("small", null, x.note)); b.appendChild(t); b.appendChild(el("span", "extra-p", x.price)); b.onclick = function(){ planAsk(x); }; xg.appendChild(b); });
      wrap.appendChild(xg); }
    if(str(S.site.plansNote)) wrap.appendChild(el("p", "plans-note", S.site.plansNote));
    return sec(secHead(title || "Tariflar", null, null, "tariflar-box", "Narxlar", "O'zingizga mos yo'lni tanlang. Saytdagi ma'lumot va vositalar bepul, pullik qismi shaxsiy yordamimiz."), wrap);
  }
  function plansView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage});
    H.appendChild(kicker("wallet", "Uchta tarif"));
    H.appendChild(heroTitle("Tariflar va narxlar"));
    H.appendChild(el("p", "lead", "Saytdan o'zingiz foydalanasizmi, online yordam kerakmi yoki hammasini biz bilan birga qilasizmi: tanlov sizda."));
    main.appendChild(plansSection("Sizga qaysi biri mos?"));
    main.appendChild(rowBtn("book", "Avval bepul o'qing: Italiyada o'qish noldan", "10 bob, PDF bilan", "g", "#noldan"));
    footer(main);
  }

  /* ================= HOME (simple: one main action) ================= */
  function homeView(main){
    var nx = nextStage(), started = doneCount() > 0;
    var H = hero({cls:"home", scene:"rome", image:S.site.heroImage});
    H.appendChild(kicker("flag", str(S.site.eyebrow) || "Uniroad"));
    H.appendChild(heroTitle("Italiyada o'qishni shu yerdan boshlang"));
    H.appendChild(el("p", "lead", "Universitet tanlashdan Italiyadagi birinchi kuningizgacha: oddiy tilda, qadamma-qadam va bepul."));
    var act = el("div", "hero-actions");
    if(started && nx) act.appendChild(btn("gold", "next", "Davom etish: " + (S.stages.indexOf(nx) + 1) + "-qadam", "#" + nx.id));
    else act.appendChild(btn("gold", "next", "Imkoniyatimni bilish (2 daqiqa)", "#profil"));
    act.appendChild(btn("glass", "book", "Qadamlarni ko'rish", "#qollanma"));
    H.appendChild(act);
    H.appendChild(globalSearch());

    if(ME) main.appendChild(journeyMini());
    var n0 = ME ? null : S.news[0];
    if(n0){ var nb = el("a", "newsline"); nb.href = safeUrl(n0.link) || "#yangiliklar"; nb.appendChild(el("span", "tag alt", n0.tag || "Yangilik")); nb.appendChild(el("span", "t", n0.title)); nb.appendChild(ic("next", "chev")); main.appendChild(nb); }

    /* the whole path, plain words */
    var steps = el("ol", "hsteps");
    S.stages.forEach(function(s, i){ var li = el("li"); var a = el("a", prog[s.id] ? "done" : ""); a.href = "#" + s.id; a.appendChild(el("span", "n", prog[s.id] ? "✓" : String(i + 1))); var t = el("span", "txt"); t.appendChild(el("b", null, plainTitle(s))); t.appendChild(el("small", null, plainTerm(s))); a.appendChild(t); a.appendChild(ic("next", "chev")); li.appendChild(a); steps.appendChild(li); });
    main.appendChild(sec(secHead("Italiyada o'qish " + S.stages.length + " qadamda", "Batafsil", "qollanma", null, "Yo'l xaritasi"), steps));

    var NE = evList().filter(function(x){ return x.s.getTime() + 3600000 >= Date.now(); })[0];
    if(NE) main.appendChild(sec(secHead("Keyingi jonli efir", "Hammasi", "efirlar", null, "Jonli"), evCard(NE, false)));

    /* deadlines and popular universities: one section */
    var UP = upcomingAll(3), duo = [];
    if(UP.length){ var ul = el("div", "list"); UP.forEach(function(x){ var a = el("a", "lrow"); a.href = "#uni-" + x.u.id + "/qabul"; a.appendChild(el("span", "u-mono", mono(x.u))); var t = el("span", "txt"); t.appendChild(el("b", null, (x.u.short || x.u.name))); t.appendChild(el("small", null, x.x.label + " · " + x.x.date)); a.appendChild(t); a.appendChild(el("span", "tag hot", leftLabel(daysLeft(x.d)))); a.appendChild(ic("next", "chev")); ul.appendChild(a); });
      duo.push(ul); var cl = el("a", "res-link"); cl.href = "#kalendar"; cl.appendChild(el("span", null, "Barcha muddatlar kalendarda")); cl.appendChild(ic("next")); duo.push(cl); }
    if(S.unis.length){
      var top = S.unis.slice().sort(function(a, b){ return (b.detailed ? 1000 : 0) + enN(b) - ((a.detailed ? 1000 : 0) + enN(a)); }).slice(0, 10);
      var rail = el("div", "rail"); top.forEach(function(u){ rail.appendChild(uniCard(u)); });
      duo.push(el("h3", "sub-h", "Mashhur universitetlar")); duo.push(rail);
    }
    if(duo.length) main.appendChild(sec.apply(null, [secHead("Muddatlar va universitetlar", "Hammasi (" + S.unis.length + ")", "universitetlar", null, "Tanlang")].concat(duo)));
    var HA = realAmb(); if(HA.length){ var hr = el("div", "rail"); HA.slice(0, 8).forEach(function(a){ hr.appendChild(ambCard(a)); }); main.appendChild(sec(secHead("Italiyada o'qiyotgan talabalarga yozing", "Hammasi", "elchilar", null, "Elchilar"), hr)); }
    var RV = realReviews(); if(RV.length){ var rg = el("div", "rev-grid"); RV.slice(0, 3).forEach(function(r){ rg.appendChild(reviewCard(r)); }); main.appendChild(sec(secHead("Talabalar fikrlari", "Hammasi", "fikrlar", null, "Fikrlar"), rg)); }

    var faq = arr(S.site.faq).filter(function(x){ return x && str(x.q); });
    if(faq.length){
      var box = el("div", "faq");
      faq.forEach(function(x, i){ var b = el("div", "blocks flat"); str(x.a).split(/\n\s*\n/).forEach(function(p){ if(p.trim()) b.appendChild(el("p", "prose", p.trim())); }); box.appendChild(fold("faq:" + i, str(x.q), b, false)); });
      main.appendChild(sec(secHead("Savol-javob", tgName() + " ga yozish", "", null, "Yordam"), box, rowBtn("users", "Ota-onalar uchun", "Xarajatlar, viza puli, stipendiya va xavfsizlik", null, "#ota-onalar")));
      var tg = main.lastChild.querySelector(".sec-head a"); if(tg){ tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener"; }
    }
    footer(main);
  }


  function globalSearch(){
    var wrap = el("div", "gsearch");
    var res = el("div", "list gres");
    var sb = searchBox("Universitet yoki shahar", "", function(v){
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
    var top = el("div", "pass-top"); top.appendChild(el("span", null, "Sizning yo'lingiz")); top.appendChild(el("span", "seat", "Talaba · " + (str(S.site.eyebrow).match(/\d{4}\/\d{2}/) || ["2026/27"])[0])); m.appendChild(top);
    var rt = el("div", "route");
    var a = el("div", "city"); a.appendChild(el("b", null, "TAS")); a.appendChild(el("small", null, "Toshkent")); rt.appendChild(a);
    var tr = el("div", "track"); tr.setAttribute("role", "img"); tr.setAttribute("aria-label", n + " / " + total + " bosqich bajarildi");
    tr.appendChild(el("span", "fill")); var pl = el("span", "plane"); pl.appendChild(ic("plane")); tr.appendChild(pl); rt.appendChild(tr);
    var b = el("div", "city r"); b.appendChild(el("b", null, "ITA")); b.appendChild(el("small", null, "Italiya")); rt.appendChild(b);
    m.appendChild(rt);
    pass.appendChild(m);
    var pct = total ? Math.round(n / total * 100) : 0;
    if(firstPaint && pct > 0 && !REDUCED){
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
      var t = el("span", "txt"); t.appendChild(el("b", null, plainTitle(s)));
      t.appendChild(el("small", null, plainTerm(s)));
      if(cur) t.appendChild(el("span", "now", "Siz shu yerdasiz"));
      b.appendChild(t); b.appendChild(ic(locked ? "lock" : "next", "chev"));
      b.setAttribute("aria-label", (i + 1) + "-qadam: " + plainTitle(s) + (done ? ", bajarildi" : ""));
      b.onclick = function(){ go(s.id); };
      li.appendChild(b); ol.appendChild(li);
    });
    return ol;
  }

  /* ================= QO'LLANMA: one step-by-step guide (merges guide + course + noldan) ================= */
  var PLAIN = {s0:["Maqsadni aniqlang","Daraja, yo'nalish, universitet"], s1:["Universitetga ariza bering","Pre-acceptance"], s2:["Diplomingizni tan oldiring","DoV yoki CIMEA"], s3:["Vazirlik portalida ro'yxatdan o'ting","Universitaly pre-enrollment"], s4:["Talaba vizasini oling","D toifa viza"], s5:["Stipendiyaga ariza bering","DSU, yozda"], s6:["Italiyaga kelgach","Permesso, codice fiscale"], s7:["To'liq talaba bo'ling","Full enrollment"]};
  function plainTitle(s){ return (PLAIN[s.id] || [])[0] || str(s.title); }
  function plainTerm(s){ return (PLAIN[s.id] || [])[1] || str(s.sub); }
  function guideView(main){
    var G = S.guide || {}, n = doneCount(), total = S.stages.length, nx = nextStage();
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage});
    H.appendChild(kicker("book", "Bepul · " + total + " qadam · o'zbek tilida"));
    H.appendChild(heroTitle("Italiyada o'qish: qadamma-qadam"));
    H.appendChild(el("p", "lead", "Hech narsa bilmasangiz ham shu yerdan boshlang. Har bir qadamda nima qilish, qaysi hujjat kerak va qachongacha ekani yozilgan."));
    var act = el("div", "hero-actions");
    act.appendChild(btn("gold", "next", n && nx ? "Davom etish: " + (S.stages.indexOf(nx) + 1) + "-qadam" : "1-qadamdan boshlash", "#" + (nx || S.stages[0] || {id:""}).id));
    var pdf = btn("glass", "download", "PDF yuklab olish", NOLDAN_PDF); pdf.setAttribute("download", "Uniroad - Italiyada o'qish noldan.pdf"); act.appendChild(pdf);
    H.appendChild(act);
    if(n) H.appendChild(heroStats([[n + " / " + total, "qadam bajarildi"]]));

    main.appendChild(sec(secHead(total + " qadam", null, null, "g-yol", "Yo'l xaritasi", "Odatda 10–12 oy oladi. Stipendiya (6-qadam) boshqa qadamlar bilan yonma-yon, yozda boriladi."), routeLine()));

    var know = el("div", "faq");
    if(arr(G.timeline).length){ var tl = el("ol", "timeline"); arr(G.timeline).forEach(function(t, i){ var li = el("li"); li.appendChild(el("span", "tl-n", String(i + 1))); var b = el("div", "tl-b"); b.appendChild(el("span", "tl-when", t.when)); b.appendChild(el("h3", null, t.title)); b.appendChild(el("p", null, t.text)); li.appendChild(b); tl.appendChild(li); }); know.appendChild(fold("g:taqvim", "Qachon nima qilinadi? (oyma-oy taqvim)", tl, false)); }
    if(arr(G.levels).length){ var lv = el("div", "blocks flat"); arr(G.levels).forEach(function(l){ lv.appendChild(el("p", "prose", "")).innerHTML = ""; var p = lv.lastChild; p.appendChild(el("b", null, l.title + ". ")); p.appendChild(document.createTextNode(l.text)); }); know.appendChild(fold("g:lv", "Menga qaysi daraja mos? (11 yil, 12 yil, bakalavr)", lv, false)); }
    if(arr(G.budget).length){ var bd = el("div", "budget"); arr(G.budget).forEach(function(x){ var r = el("div", "bg-row"); var l = el("div"); l.appendChild(el("b", null, x.item)); if(x.note) l.appendChild(el("small", null, x.note)); r.appendChild(l); r.appendChild(el("span", "bg-cost", x.cost)); bd.appendChild(r); }); know.appendChild(fold("g:pul", "Qancha pul kerak?", bd, false)); }
    if(arr(G.mistakes).length){ var mk = el("ul", "mist"); arr(G.mistakes).forEach(function(x){ var li = el("li"); li.appendChild(ic("stop")); li.appendChild(el("span", null, x)); mk.appendChild(li); }); know.appendChild(fold("g:xato", "Ko'p uchraydigan xatolar", mk, false)); }
    if(arr(G.glossary).length){ var gl = el("div"), gq = "", gg = el("dl", "gloss");
      var gsb = searchBox("Atamani qidiring: ISEE, CIMEA, permesso…", "", function(v){ gq = norm(v); drawG(); });
      function drawG(){ gg.textContent = ""; var k = 0; arr(G.glossary).forEach(function(x){ if(gq && norm(x.term + " " + x.def).indexOf(gq) < 0) return; k++; var d = el("div"); d.appendChild(el("dt", null, x.term)); d.appendChild(el("dd", null, x.def)); gg.appendChild(d); }); if(!k) gg.appendChild(el("div", "empty", "Topilmadi.")); }
      drawG(); gl.appendChild(gsb.node); gl.appendChild(gg); know.appendChild(fold("g:lugat", "Lug'at: notanish so'zlar (" + arr(G.glossary).length + " ta)", gl, false)); }
    main.appendChild(sec(secHead("Boshlashdan oldin bilib oling", null, null, null, "Qisqa"), know));

    var more = el("div", "hub");
    [["book","Hammasini bitta sahifada o'qish","10 bob, PDF bilan","noldan"],["doc","Hujjat shablonlari","CV, homiylik xati, oila hujjatlari (Word, PDF)","shablonlar"],["text","Motivatsion xat konstruktori","8 savol: xat qoralamasi tayyor","xat"],["cap","Foundation","11 yillik attestat bilan","foundation"],["checklist","Testlar","IELTS, CEnT-S, TOLC, SAT","testlar"],["home2","Italiyada yashash","Uy, sog'liq, ish","yashash"],["globe","Italiya haqida","Ta'lim tizimi, talaba hayoti","italiya"],["cal","Kalendar","Barcha muhim sanalar","kalendar"],["folder","Materiallar","Rasmiy hujjatlar va havolalar","materiallar"],["chat","Yangiliklar","So'nggi e'lonlar","yangiliklar"]].forEach(function(x){ var a = el("a", "hubtile"); a.href = "#" + x[3]; var i = el("span", "ic"); i.appendChild(ic(x[0])); a.appendChild(i); var t = el("span", "txt"); t.appendChild(el("b", null, x[1])); t.appendChild(el("small", null, x[2])); a.appendChild(t); a.appendChild(ic("next", "chev")); more.appendChild(a); });
    main.appendChild(sec(secHead("Batafsil", null, null, null, "Qo'shimcha"), more));
    var srcs = el("div"); arr(G.sources).forEach(function(x){ var u = safeUrl(x.url); if(!u) return; var a = el("a", "src"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, x.label)); srcs.appendChild(a); });
    main.appendChild(sec(secHead("Manbalar", null, null, null, "Rasmiy"), srcs));
    footer(main);
  }

  /* ================= SCHOLARSHIPS BY REGION ================= */
  var DQ = "";
  function dsuView(main){
    var D = S.dsu || {}, N = D.national || {};
    var H = hero({cls:"compact", scene:"town"});
    H.appendChild(kicker("coin", "Italiya · 20 viloyat · " + (N.year || "2026/27")));
    H.appendChild(heroTitle("Viloyatlar bo'yicha stipendiyalar"));
    H.appendChild(el("p", "lead", "Italiyada stipendiyani universitet emas, viloyatning idorasi beradi (ba'zi viloyatlarda universitetning o'zi). Universitetingiz qaysi viloyatda bo'lsa, ariza o'sha idoraga beriladi."));
    H.appendChild(heroStats([[N.fuoriSede, "fuori sede, minimal summa"], [N.pendolare, "pendolare (qatnovchi)"], [N.isee, "ISEE chegarasi"], ["0 €", "g'oliblar uchun o'qish to'lovi"]]));

    main.appendChild(qlinks([["wallet","Imkoniyatimni hisoblash","kalkulyator"],["doc","Kerakli oila hujjatlari","s5"],["star","Profil tahlili","profil"]]));
    var how = el("ol", "how");
    [["Universitetni tanlang", "Universitet joylashgan viloyat stipendiya idorasini belgilaydi."], ["Yozda ariza bering", "Odatda iyun – sentyabr, siz hali O'zbekistondaligingizda. Muddat viloyatga qarab har xil."], ["Oila hujjatlari", "Oila tarkibi, daromad va mulk ma'lumotnomalari: apostil va italyancha tarjima bilan. Italiyada CAF ulardan ISEE parificato tuzadi."]].forEach(function(x){ var li = el("li"); li.appendChild(el("b", null, x[0])); li.appendChild(el("span", null, x[1])); how.appendChild(li); });
    main.appendChild(sec(secHead("Qanday ishlaydi", null, null, null, "3 qadam"), how));

    /* the documents every region asks for: one collapsible checklist */
    var GC = D.guidesCommon, GS = arr(D.guides);
    if(GC){ var cc = el("div", "blocks flat"); var ul0 = el("ul", "ticks small"); arr(GC.items).forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul0.appendChild(li); }); cc.appendChild(ul0);
      if(arr(GC.rules).length){ var ul1 = el("ul", "gnotes"); arr(GC.rules).forEach(function(t){ ul1.appendChild(el("li", null, t)); }); cc.appendChild(ul1); }
      var dw = el("div", "faq"); dw.appendChild(fold("dsu:common", (GC.title || "Hamma viloyatlarda so'raladigan hujjatlar") + " (" + arr(GC.items).length + ")", cc, false)); main.appendChild(sec(dw)); }

    /* one searchable list of all regions: row = region, office, amount, deadline; tap to see documents and rules */
    function guideFor(a){ return GS.filter(function(g){ return g.id === a.id || g.agency === a.name; })[0] || null; }
    var wrap = el("div", "dsu-list");
    var sb = searchBox("Shahar yoki viloyat: Rim, Milan, Toscana…", DQ, function(v){ DQ = v; draw(); });
    var cnt = el("p", "count-line"); cnt.setAttribute("aria-live", "polite");
    var rows = el("div", "dsu-rows"); wrap.appendChild(sb.node); wrap.appendChild(cnt); wrap.appendChild(rows);
    function regionRow(a){
      var g = guideFor(a), key = "dsur:" + a.id, isOpen = key in open ? open[key] : false;
      var box = el("section", "dsu-row" + (g ? " has-guide" : ""));
      var bt = el("button", "dsu-sum"); bt.type = "button"; bt.setAttribute("aria-expanded", isOpen ? "true" : "false");
      var l = el("span", "ds-l"); l.appendChild(el("small", null, a.region)); var nm = el("b", null, a.own ? a.name + " (universitet)" : a.name); l.appendChild(nm); if(g) l.appendChild(el("span", "tag ok", "Hujjatlar ro'yxati bor")); bt.appendChild(l);
      var r = el("span", "ds-r"); r.appendChild(el("b", "num", a.amount ? str(a.amount).replace(/ \(.*\)$/, "") : "min. " + str(N.fuoriSede))); r.appendChild(el("small", null, str(a.deadline).replace(/\.\s.*$/, ""))); bt.appendChild(r);
      bt.appendChild(ic("down", "chev"));
      var bd = el("div", "dsu-body"); bd.hidden = !isOpen;
      bt.onclick = function(){ var o = bd.hidden; if(o && !bd.firstChild) fill(); bd.hidden = !o; bt.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
      function fill(){
        var cities = arr(a.cities).map(function(id){ return cityById(id); }).filter(Boolean);
        if(cities.length){ var cl = el("div", "dc-cities"); cities.forEach(function(ct){ var lk = el("a", "tag", ct.name); lk.href = "#shahar-" + ct.id; cl.appendChild(lk); }); bd.appendChild(cl); }
        bd.appendChild(factTable([["Muddat", a.deadline], ["Summa", a.amount ? a.amount + " gacha" : "kamida " + str(N.fuoriSede) + " (fuori sede, davlat minimumi)"]].concat(g ? [["Universitetlar", g.unis]] : [])));
        if(a.note) bd.appendChild(el("p", "ic-note", a.note));
        if(g){
          if(arr(g.docs).length){ bd.appendChild(el("b", "greg-h", "Hujjatlar")); var u1 = el("ul", "ticks small"); arr(g.docs).forEach(function(t){ var li = el("li"); li.appendChild(ic("doc")); li.appendChild(el("span", null, t)); u1.appendChild(li); }); bd.appendChild(u1); }
          if(arr(g.rules).length){ bd.appendChild(el("b", "greg-h", "Muhim shartlar")); var u2 = el("ul", "gnotes"); arr(g.rules).forEach(function(t){ u2.appendChild(el("li", null, t)); }); bd.appendChild(u2); }
          var sr = arr(g.sources).filter(function(x){ return safeUrl(x.url); }); if(sr.length){ var sx = el("div", "greg-src"); sr.forEach(function(x){ var a2 = el("a", "src"); a2.href = safeUrl(x.url); a2.target = "_blank"; a2.rel = "noopener"; a2.appendChild(ic("link")); a2.appendChild(el("span", null, x.label)); sx.appendChild(a2); }); bd.appendChild(sx); }
        }
        var u = safeUrl(a.url); if(u) bd.appendChild(btn("navy", "link", "Rasmiy sayt: " + host(u), u));
      }
      if(isOpen) fill();
      box.appendChild(bt); box.appendChild(bd); return box;
    }
    function draw(){
      var q = norm(DQ); rows.textContent = "";
      var list = D.agencies.filter(function(a){ var cn = arr(a.cities).map(function(id){ var c = cityById(id); return c ? c.name : id; }).join(" "); return !q || norm(a.name + " " + a.region + " " + cn).indexOf(q) >= 0; });
      list.sort(function(a, b){ return a.region.localeCompare(b.region) || a.name.localeCompare(b.name); });
      cnt.textContent = list.length + " ta idora" + (q ? " topildi" : "") + " · hujjatlar ro'yxati bor: " + list.filter(guideFor).length;
      if(!list.length){ rows.appendChild(el("div", "empty", "Topilmadi. Shahar yoki viloyat nomini boshqacha yozib ko'ring.")); return; }
      list.forEach(function(a){ rows.appendChild(regionRow(a)); });
    }
    draw();
    main.appendChild(sec(secHead("Viloyatlar va idoralar", null, null, "dsu-docs", "Ro'yxat", "Sanalar " + (N.year || "2026/27") + " bandolaridan; keyingi yil sanalari odatda bahor–yozda e'lon qilinadi. Qatorni bosing: hujjatlar va shartlar ochiladi."), wrap));
    var US = arr(D.uniScholarships);
    if(US.length){ var ug = el("div", "dsu-rows"); US.forEach(function(x, i){ var u = uniById(x.uni), key = "dsuu:" + i, isOpen = key in open ? open[key] : false;
        var box = el("section", "dsu-row"), bt = el("button", "dsu-sum"); bt.type = "button"; bt.setAttribute("aria-expanded", isOpen ? "true" : "false");
        var l = el("span", "ds-l"); l.appendChild(el("small", null, u ? (u.short || u.name) + (cityById(u.city) ? " · " + cityById(u.city).name : "") : "")); l.appendChild(el("b", null, x.title)); bt.appendChild(l); bt.appendChild(ic("down", "chev"));
        var bd = el("div", "dsu-body"); bd.hidden = !isOpen; bd.appendChild(el("p", "ic-note", x.text)); var bx = el("div", "ic-btns"); if(u) bx.appendChild(btn("line", "uni", u.short || u.name, "#uni-" + u.id)); var lu = safeUrl(x.url); if(lu) bx.appendChild(btn("navy", "link", "Rasmiy sahifa", lu)); bd.appendChild(bx);
        bt.onclick = function(){ var o = bd.hidden; bd.hidden = !o; bt.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
        box.appendChild(bt); box.appendChild(bd); ug.appendChild(box); });
      main.appendChild(sec(secHead("Universitetlarning o'z stipendiyalari (" + US.length + ")", null, null, null, "Qo'shimcha", "Viloyat stipendiyasidan (DSU) tashqari, ba'zi universitetlar xalqaro talabalarga o'z stipendiyasini beradi."), ug)); }
    main.appendChild(callout({style:"info", text:"Summalar davlat minimumi (" + (N.source || "MUR") + "). Viloyat bundan ko'p berishi mumkin. Eng katta summa oilasidan uzoqda yashaydigan (fuori sede) va oila daromadi eng past talabaga beriladi."}));
    var su = safeUrl(N.sourceUrl); if(su){ var a = el("a", "src"); a.href = su; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Rasmiy manba: " + N.source)); main.appendChild(a); }
    footer(main);
  }

  /* ================= MATCH QUIZ: "Menga mos universitet" ================= */
  var FIELDS = {
    it:   {t:"Muhandislik va IT", i:"laptop", re:/engineer|computer|informat|data|artificial|software|electronic|telecom|cyber|robot|mechatron|automat|ict\b|comput|aerospace|energy|civil|mechanic|electric/},
    econ: {t:"Iqtisod va biznes", i:"coin", re:/econom|business|manag|financ|marketing|account|bank|entrepreneur|trade|commerce|tourism/},
    med:  {t:"Tibbiyot va biologiya", i:"heart", re:/medic|pharma|biotech|biolog|biomedic|health|nursing|dent|molecular|neuro|genetic|nutrition|veterin|sport/},
    soc:  {t:"Xalqaro munosabatlar, huquq, ijtimoiy", i:"globe", re:/international relation|politic|law\b|legal|sociolog|global|diploma|communication|psycholog|language|philosoph|histor|cultur|european|governance|public|development|peace|human right|media|linguist/},
    arch: {t:"Arxitektura va dizayn", i:"building", re:/architect|design|urban|planning|landscape|interior|fashion|restoration/},
    sci:  {t:"Tabiiy fanlar va matematika", i:"bulb", re:/physic|mathemat|chemi|geolog|earth|environment|agri|food|marine|astro|statist|ecolog|climate|forest|material/}
  };
  var NORTH = ["Piemonte","Valle d'Aosta","Lombardia","Trentino-Alto Adige","Veneto","Friuli-Venezia Giulia","Liguria","Emilia-Romagna"], CENTER = ["Toscana","Umbria","Marche","Lazio"];
  var BIG = ["roma","milano","torino","napoli","bologna","firenze","genova","palermo","bari","venezia","padova","catania"];
  var QS = [
    {k:"level", q:"Qaysi darajaga topshirmoqchisiz?", o:[["Bakalavr","Bakalavr","Maktab yoki kollejdan keyin (3 yil)"],["Magistratura","Magistratura","Bakalavr diplomingiz bor (2 yil)"],["Yagona sikl","5–6 yillik dastur","Tibbiyot, farmatsiya, arxitektura, huquq"]]},
    {k:"field", q:"Qaysi yo'nalish sizni qiziqtiradi?", o:Object.keys(FIELDS).map(function(k){ return [k, FIELDS[k].t, ""]; }).concat([["any","Hali bilmayman","Hamma yo'nalishlarni ko'rsat"]])},
    {k:"eng", q:"Ingliz tilingiz qanday?", o:[["none","Hali sertifikat yo'q","Tayyorlanyapman"],["b2","IELTS 5.5 – 6.5 (B2)","Ko'p dasturlarga yetadi"],["c1","IELTS 7+ (C1)","Eng kuchli dasturlarga ham"]]},
    {k:"test", q:"Kirish testiga tayyormisiz?", o:[["no","Testsiz bo'lsin","Faqat hujjatlar asosida qabul"],["yes","Ha, test topshiraman","SAT, CEnT-S, TOLC, GMAT"]]},
    {k:"area", q:"Italiyaning qaysi qismida o'qimoqchisiz?", o:[["any","Farqi yo'q","Butun Italiya"],["north","Shimol","Milan, Turin, Bolonya, Padova…"],["center","Markaz","Rim, Florensiya, Piza, Siena…"],["south","Janub va orollar","Neapol, Bari, Sitsiliya… (arzonroq)"],["big","Faqat katta shaharlar","Rim, Milan, Turin, Neapol…"]]},
    {k:"money", q:"O'qish xarajatini qanday qoplaysiz?", o:[["dsu","Stipendiyaga tayanaman","Faqat davlat universitetlari"],["self","Oilam to'laydi","Xususiy universitetlar ham"]]}
  ];
  var QZ = {step:0, a:{}};
  try{ var qs0 = JSON.parse(LS.getItem("uprep-quiz") || "null"); if(qs0 && qs0.a) QZ = qs0; }catch(e){}
  function saveQZ(){ try{ LS.setItem("uprep-quiz", JSON.stringify(QZ)); }catch(e){} }
  function quizMatch(a0){
    var a = a0 || QZ.a, out = [];
    S.unis.forEach(function(u){
      if(a.money === "dsu" && u.type !== "Davlat") return;
      var c = cityById(u.city), reg = c ? c.region : "";
      if(a.area === "north" && NORTH.indexOf(reg) < 0) return;
      if(a.area === "center" && CENTER.indexOf(reg) < 0) return;
      if(a.area === "south" && (NORTH.indexOf(reg) >= 0 || CENTER.indexOf(reg) >= 0)) return;
      if(a.area === "big" && BIG.indexOf(u.city) < 0) return;
      var F = FIELDS[a.field];
      var ps = arr(u.programmes).filter(function(p){
        if(p.online) return false;
        if(a.level && p.level !== a.level) return false;
        if(F && !F.re.test(String(p.name).toLowerCase())) return false;
        if(a.test === "no" && p.access && p.access !== "Erkin qabul") return false;
        return true;
      });
      if(!ps.length) return;
      var nx = uniNext(u), score = Math.min(ps.length, 12) * 3 + (u.detailed ? 4 : 0) + (u.admUpdated ? 3 : 0) + (nx ? 2 : 0) + (ps.filter(function(p){ return p.lang === "Ingliz"; }).length ? 2 : 0);
      out.push({u:u, ps:ps, score:score, city:c, nx:nx});
    });
    return out.sort(function(x, y){ return y.score - x.score; });
  }
  function quizView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("star", "1 daqiqalik test"));
    H.appendChild(heroTitle("Menga mos universitet"));
    H.appendChild(el("p", "lead", "6 ta savolga javob bering: Italiya ta'lim vazirligi bazasidagi " + S.unis.reduce(function(s, u){ return s + enN(u); }, 0) + " ta ingliz tilidagi dastur ichidan sizga moslarini topamiz."));
    var box = el("div", "quiz"); main.appendChild(box);
    function draw(){
      box.textContent = "";
      if(QZ.step >= QS.length){ results(); return; }
      var Q = QS[QZ.step];
      var top = el("div", "qz-top");
      var bar = el("div", "qz-bar"), fill = el("i"); fill.style.width = (QZ.step / QS.length * 100) + "%"; bar.appendChild(fill); top.appendChild(bar);
      top.appendChild(el("span", "qz-n", (QZ.step + 1) + " / " + QS.length)); box.appendChild(top);
      box.appendChild(el("h2", "qz-q", Q.q));
      var g = el("div", "qz-opts");
      Q.o.forEach(function(o){
        var b = el("button", "qz-opt" + (QZ.a[Q.k] === o[0] ? " on" : "")); b.type = "button";
        if(Q.k === "field" && FIELDS[o[0]]){ var ii = el("span", "ic"); ii.appendChild(ic(FIELDS[o[0]].i)); b.appendChild(ii); }
        var t = el("span", "txt"); t.appendChild(el("b", null, o[1])); if(o[2]) t.appendChild(el("small", null, o[2])); b.appendChild(t);
        b.appendChild(ic("next", "chev"));
        b.onclick = function(){ QZ.a[Q.k] = o[0]; QZ.step++; saveQZ(); draw(); box.scrollIntoView({behavior: REDUCED ? "auto" : "smooth", block:"start"}); };
        g.appendChild(b);
      });
      box.appendChild(g);
      if(QZ.step > 0){ var bk = el("button", "prevlink"); bk.type = "button"; bk.appendChild(ic("back")); bk.appendChild(el("span", null, "Orqaga")); bk.onclick = function(){ QZ.step--; saveQZ(); draw(); }; box.appendChild(bk); }
    }
    function results(){
      var R = quizMatch(), a = QZ.a;
      var sum = el("div", "qz-sum");
      QS.forEach(function(Q, i){ var o = Q.o.filter(function(x){ return x[0] === a[Q.k]; })[0]; if(!o) return; var c = el("button", "chipf", o[1]); c.type = "button"; c.title = "O'zgartirish"; c.onclick = function(){ QZ.step = i; saveQZ(); draw(); }; sum.appendChild(c); });
      box.appendChild(sum);
      if(a.eng === "none") box.appendChild(callout({style:"warn", text:"Deyarli hamma ingliz tilidagi dasturlar B2 (IELTS 5.5–6.5) sertifikatini so'raydi. Ariza ochilishidan oldin IELTS topshirib qo'ying."}));
      if(!R.length){
        box.appendChild(el("div", "empty", "Bu shartlarga mos dastur topilmadi. Hudud yoki test shartini yumshatib ko'ring."));
      } else {
        box.appendChild(el("h2", "qz-q", R.length + " ta universitet mos keldi"));
        var list = el("div", "qz-res");
        R.slice(0, 12).forEach(function(r, i){
          var u = r.u, c = el("article", "qz-card" + (i < 3 ? " top" : ""));
          var h = el("a", "qz-h"); h.href = "#uni-" + u.id + "/yonalishlar";
          h.appendChild(el("span", "u-mono", mono(u)));
          var t = el("span", "txt"); t.appendChild(el("b", null, u.short || u.name)); t.appendChild(el("small", null, (r.city ? r.city.name + ", " + r.city.region : "") + " · " + str(u.type).toLowerCase())); h.appendChild(t);
          if(i < 3) h.appendChild(el("span", "qz-rank", (i + 1) + "-o'rin"));
          c.appendChild(h);
          var tags = el("div", "u-tags"); tags.appendChild(el("span", "tag lang", r.ps.length + " ta mos dastur"));
          var ag = r.city ? dsuFor(r.city.id) : null; if(ag) tags.appendChild(el("span", "tag ok", "Stipendiya: " + (ag.own ? "universitet" : ag.name)));
          if(r.nx) tags.appendChild(el("span", "tag hot", leftLabel(daysLeft(r.nx.d))));
          c.appendChild(tags);
          var ul = el("ul", "qz-ps"); r.ps.slice(0, 4).forEach(function(p){ var li = el("li"); li.appendChild(el("span", null, p.name)); li.appendChild(el("small", null, p.access || p.level)); ul.appendChild(li); });
          if(r.ps.length > 4) ul.appendChild(el("li", "more", "+ yana " + (r.ps.length - 4) + " ta"));
          c.appendChild(ul);
          var bx = el("div", "ic-btns"); bx.appendChild(btn("navy", "next", "Dasturlarni ko'rish", "#uni-" + u.id + "/yonalishlar"));
          var au = safeUrl(u.applyUrl); if(au) bx.appendChild(btn("line", "link", "Ariza sahifasi", au));
          c.appendChild(bx); list.appendChild(c);
        });
        box.appendChild(list);
        if(R.length > 12) box.appendChild(el("p", "muted-note", "Eng mos 12 tasi ko'rsatildi. Qolganlarini «Universitetlar» bo'limida «Ingliz tilidagi dasturlar bor» filtri bilan ko'ring."));
      }
      box.appendChild(shareBtn("Menga mos universitet testi", "line"));
      var again = el("button", "markdone"); again.type = "button"; again.appendChild(ic("route")); again.appendChild(el("span", null, "Testni qaytadan boshlash")); again.onclick = function(){ QZ = {step:0, a:{}}; saveQZ(); draw(); }; box.appendChild(again);
      box.appendChild(rowBtn("book", "Keyingi qadam: 0 dan qo'llanma", "Ariza, DoV/CIMEA, viza va stipendiya tartibi", "g", "#qollanma"));
    }
    draw();
    footer(main);
  }

  /* ================= PROFILE ANALYSIS (lead form) ================= */
  var PRQ = [
    {k:"edu", q:"Hozir qanday ma'lumotingiz bor?", o:[["s11","11 yillik maktab attestati","Maktabni bitirgan yoki bitiryapman"],["s12","12 yillik ta'lim yoki OTMning 1-kursi","Litsey, kollej yoki universitetda o'qiyapman"],["ba","Bakalavr diplomi","Magistraturaga topshirmoqchiman"]]},
    {k:"field", q:"Qaysi yo'nalish sizni qiziqtiradi?", o:Object.keys(FIELDS).map(function(k){ return [k, FIELDS[k].t, ""]; }).concat([["any","Hali bilmayman",""]])},
    {k:"eng", q:"Ingliz tilingiz qanday?", o:[["none","Hali sertifikat yo'q","Tayyorlanyapman"],["b2","IELTS 5.5 – 6.5 (B2)",""],["c1","IELTS 7+ (C1)",""]]},
    {k:"gpa", q:"O'rtacha bahoingiz qanday?", o:[["hi","A'lo","5 ballik tizimda 4.5 dan yuqori yoki 85%+"],["mid","Yaxshi","4 – 4.5 yoki 70–85%"],["lo","O'rtacha","4 dan past yoki 70% dan kam"]]},
    {k:"area", q:"Italiyaning qaysi qismida o'qimoqchisiz?", o:[["any","Farqi yo'q",""],["north","Shimol","Milan, Turin, Bolonya, Padova…"],["center","Markaz","Rim, Florensiya, Piza, Siena…"],["south","Janub va orollar","Neapol, Bari, Sitsiliya…"]]},
    {k:"visa", q:"Viza uchun yiliga {{viza}} ko'rsata olasizmi?", o:[["yes","Ha, oilamda bor","O'zimning yoki oilamning hisobida"],["part","Qisman, yig'yapmiz",""],["no","Hozircha yo'q",""]]},
    {k:"fam", q:"Oilangiz haqida (stipendiya uchun, taxminan)", form:true},
    {k:"help", q:"Sizga qancha yordam kerak?", o:[["app","O'zim qilaman, yo'l-yo'riq yetadi","Free"],["support","Savollarimga javob berib turilsa bo'ldi","Plus"],["full","Hammasini siz bilan birga qilmoqchiman","Premium"]]}
  ];
  var PRF = {step:0, a:{members:"4", income:""}};
  try{ var pf0 = JSON.parse(LS.getItem("uprep-profile") || "null"); if(pf0 && pf0.a) PRF = pf0; }catch(e){}
  function savePRF(){ try{ LS.setItem("uprep-profile", JSON.stringify(PRF)); }catch(e){} }
  var INC = [["5000","5 000 € dan kam"],["10000","5 000 – 15 000 €"],["20000","15 000 – 25 000 €"],["32000","25 000 – 40 000 €"],["50000","40 000 € dan ko'p"]];
  function pfLabel(k, v){ var Q = PRQ.filter(function(q){ return q.k === k; })[0]; var o = Q && Q.o ? Q.o.filter(function(x){ return x[0] === v; })[0] : null; return o ? o[1] : ""; }
  function profileView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("star", "Bepul · 2 daqiqa"));
    H.appendChild(heroTitle("Profilingizni tahlil qilamiz"));
    H.appendChild(el("p", "lead", "8 ta savolga javob bering: qaysi yo'l sizga mos, qaysi universitetlar, stipendiya imkoniyati va viza bo'yicha holatingizni ko'rsatamiz."));
    var box = el("div", "quiz"); main.appendChild(box);
    function next(){ PRF.step++; savePRF(); draw(); box.scrollIntoView({behavior: REDUCED ? "auto" : "smooth", block:"start"}); }
    function draw(){
      box.textContent = "";
      if(PRF.step >= PRQ.length){ result(); return; }
      var Q = PRQ[PRF.step];
      var top = el("div", "qz-top"); var bar = el("div", "qz-bar"), fill = el("i"); fill.style.width = (PRF.step / PRQ.length * 100) + "%"; bar.appendChild(fill); top.appendChild(bar);
      top.appendChild(el("span", "qz-n", (PRF.step + 1) + " / " + PRQ.length)); box.appendChild(top);
      box.appendChild(el("h2", "qz-q", fxv(Q.q)));
      if(Q.form){
        var f = el("div", "form");
        var m = el("select", "cityselect"); ["1","2","3","4","5","6","7","8"].forEach(function(n){ var op = el("option", null, n); op.value = n; if(PRF.a.members === n) op.selected = true; m.appendChild(op); });
        var l1 = el("label", "fld"); l1.appendChild(el("span", null, "Oila a'zolari soni (siz bilan)")); l1.appendChild(m); f.appendChild(l1);
        var inc = el("select", "cityselect"); var op0 = el("option", null, "Tanlang"); op0.value = ""; inc.appendChild(op0);
        INC.forEach(function(x){ var op = el("option", null, x[1]); op.value = x[0]; if(PRF.a.income === x[0]) op.selected = true; inc.appendChild(op); });
        var l2 = el("label", "fld"); l2.appendChild(el("span", null, "Butun oilaning yillik daromadi (taxminan, evroda)")); l2.appendChild(inc); f.appendChild(l2);
        f.appendChild(el("p", "note", "Bu ma'lumot hech qayerga yuborilmaydi: faqat sizning brauzeringizda hisoblanadi."));
        var go2 = el("button", "btn gold"); go2.type = "button"; go2.appendChild(el("span", null, "Davom etish")); go2.appendChild(ic("next"));
        go2.onclick = function(){ PRF.a.members = m.value; PRF.a.income = inc.value; next(); };
        var sk = el("button", "prevlink"); sk.type = "button"; sk.appendChild(el("span", null, "Bilmayman, o'tkazib yuborish")); sk.onclick = function(){ PRF.a.members = m.value; PRF.a.income = ""; next(); };
        f.appendChild(go2); f.appendChild(sk); box.appendChild(f);
      } else {
        var g = el("div", "qz-opts");
        Q.o.forEach(function(o){
          var b = el("button", "qz-opt" + (PRF.a[Q.k] === o[0] ? " on" : "")); b.type = "button";
          if(Q.k === "field" && FIELDS[o[0]]){ var ii = el("span", "ic"); ii.appendChild(ic(FIELDS[o[0]].i)); b.appendChild(ii); }
          var t = el("span", "txt"); t.appendChild(el("b", null, o[1])); if(o[2]) t.appendChild(el("small", null, o[2])); b.appendChild(t); b.appendChild(ic("next", "chev"));
          b.onclick = function(){ PRF.a[Q.k] = o[0]; next(); };
          g.appendChild(b);
        });
        box.appendChild(g);
      }
      if(PRF.step > 0){ var bk = el("button", "prevlink"); bk.type = "button"; bk.appendChild(ic("back")); bk.appendChild(el("span", null, "Orqaga")); bk.onclick = function(){ PRF.step--; savePRF(); draw(); }; box.appendChild(bk); }
    }
    function card(title, status, cls, lines, link){
      var c = el("section", "pf-card " + (cls || "")); var h = el("div", "pf-h"); h.appendChild(el("b", null, title)); if(status) h.appendChild(el("span", "tag " + (cls === "ok" ? "ok" : cls === "no" ? "hot" : "lang"), status)); c.appendChild(h);
      lines.forEach(function(l){ if(l) c.appendChild(el("p", null, l)); });
      if(link) c.appendChild(btn("line", "next", link[0], link[1]));
      return c;
    }
    function result(){
      var a = PRF.a, out = [], summary = [];
      var level = a.edu === "ba" ? "Magistratura" : "Bakalavr";
      /* 1. path */
      if(a.edu === "s11") box.appendChild(card("Sizning yo'lingiz: Foundation", null, "mid", ["Italiyada bakalavrga odatda 12 yillik ta'lim kerak. 11 yillik attestat bilan ikki yo'l bor: 1 yillik Foundation (Sapienza, Pavia, Padova, Messina va boshqalarda) yoki O'zbekistondagi OTMda 1 yil o'qib, keyin topshirish."], ["Foundation bor universitetlar", "#foundation"]));
      else box.appendChild(card("Sizning yo'lingiz: " + level, null, "ok", [a.edu === "ba" ? "Bakalavr diplomingiz bilan magistraturaga (2 yil) topshirasiz. Bakalavrda o'qigan fanlaringiz tanlagan dasturga mos bo'lishi kerak." : "Bakalavrga (3 yil) to'g'ridan-to'g'ri topshira olasiz. Ko'p dasturlar SAT yoki CEnT-S natijasini so'raydi."], ["Testlar haqida", "#testlar"]));
      summary.push("Ma'lumot: " + pfLabel("edu", a.edu));
      /* 2. English + grades */
      var eng = a.eng === "none" ? ["no", "Sertifikat kerak", "Deyarli hamma ingliz tilidagi dasturlar B2 (IELTS 5.5–6.5) so'raydi. IELTS'ni ariza ochilishidan oldin topshiring."] : a.eng === "b2" ? ["ok", "Yetarli", "B2 ko'p dasturlar uchun yetadi. Ba'zi kuchli dasturlar yuqoriroq ball so'rashi mumkin: dastur sahifasini tekshiring."] : ["ok", "Kuchli", "C1 bilan eng talabchan dasturlarga ham topshira olasiz."];
      var gp = a.gpa === "lo" ? "O'rtacha baho bilan ham imkoniyat bor, lekin ba'zi dasturlarda minimal baho talabi bor. Ko'proq universitetga (5 ta va undan ko'p) topshiring va motivatsion xatga alohida e'tibor bering." : a.gpa === "mid" ? "Yaxshi baho ko'p dasturlarga yetadi. 3–5 ta universitetga topshiring." : "A'lo baholar kuchli dasturlar va universitetlarning o'z stipendiyalari uchun ham imkoniyat ochadi.";
      box.appendChild(card("Til va baholar", eng[1], eng[0], [eng[2], gp]));
      summary.push("Ingliz tili: " + pfLabel("eng", a.eng)); summary.push("Baho: " + pfLabel("gpa", a.gpa));
      /* 3. universities */
      var N0 = S.dsu.national || {}, m0 = Math.max(1, numv(a.members)), sc0 = [0, 1, 1.57, 2.04, 2.46, 2.85][m0] || (2.85 + (m0 - 5) * 0.35);
      var rich = a.visa === "yes" && a.income && numv(a.income) / sc0 > (numv(N0.isee) || 28339.88);
      var R = quizMatch({level:level, field:a.field, area:a.area, money: rich ? "self" : "dsu"}).slice(0, 3);
      if(a.edu !== "s11" && R.length){
        var uc = el("section", "pf-card"); var uh = el("div", "pf-h"); uh.appendChild(el("b", null, "Sizga mos 3 ta universitet")); uc.appendChild(uh);
        R.forEach(function(r){ var row = el("a", "lrow"); row.href = "#uni-" + r.u.id + "/yonalishlar"; row.appendChild(el("span", "u-mono", mono(r.u))); var t = el("span", "txt"); t.appendChild(el("b", null, r.u.short || r.u.name)); t.appendChild(el("small", null, (r.city ? r.city.name + " · " : "") + r.ps.length + " ta mos dastur" + (r.nx ? " · " + r.nx.x.label + ": " + r.nx.x.date : ""))); row.appendChild(t); row.appendChild(ic("next", "chev")); uc.appendChild(row); });
        uc.appendChild(btn("line", "star", "Batafsil tanlash", "#mos-universitet")); box.appendChild(uc);
        summary.push("Mos universitetlar: " + R.map(function(r){ return r.u.short || r.u.name; }).join(", "));
      }
      summary.push("Yo'nalish: " + pfLabel("field", a.field) + "; hudud: " + pfLabel("area", a.area));
      /* the analysis feeds "Mening rejam" and the home panel straight away */
      ME = ME || {lvl:"", year:""}; ME.lvl = a.edu === "s11" ? "fy" : a.edu === "ba" ? "ma" : "ba"; ME.src = "profil";
      ME.recs = a.edu === "s11" ? [] : R.map(function(r){ return r.u.id; }); saveME();
      var syn = el("a", "pf-sync"); syn.href = "#rejam"; syn.appendChild(ic("heart")); syn.appendChild(el("span", null, "Natija «Mening rejam»ga yozildi: maqsad " + lvlName(ME.lvl) + (ME.recs.length ? ", " + ME.recs.length + " ta tavsiya qilingan universitet" : "") + ".")); syn.appendChild(ic("next")); box.appendChild(syn);
      /* 4. scholarship */
      var N = S.dsu.national || {}, LIM = numv(N.isee) || 28339.88, m = Math.max(1, numv(a.members)), scale = [0, 1, 1.57, 2.04, 2.46, 2.85][m] || (2.85 + (m - 5) * 0.35);
      if(a.income){ var isee = numv(a.income) / scale, st = isee <= LIM * 2 / 3 ? ["ok", "Yuqori imkoniyat"] : isee <= LIM ? ["mid", "Mos kelishingiz mumkin"] : ["no", "Chegaradan oshishi mumkin"];
        box.appendChild(card("Davlat stipendiyasi (DSU)", st[1], st[0], ["Taxminiy hisob: faqat daromad va oila soni bo'yicha. Haqiqiy natija (ISEE parificato) oila mulki va jamg'armasini ham hisobga oladi. 2026/27 chegarasi: ISEE " + (N.isee || "28 339,88 €") + ".", "Oila hujjatlarini O'zbekistonda, jo'nab ketishdan oldin tayyorlash kerak."], ["Aniqroq hisoblash", "#kalkulyator"]));
        summary.push("Stipendiya: " + st[1] + " (" + m + " kishi, daromad ~" + (INC.filter(function(x){ return x[0] === a.income; })[0] || ["",""])[1] + ")"); }
      else box.appendChild(card("Davlat stipendiyasi (DSU)", "Hisoblanmadi", "mid", ["Oila daromadini kiritmadingiz. Pul kalkulyatorida aniqroq hisoblab ko'ring."], ["Pul kalkulyatori", "#kalkulyator"]));
      /* 5. visa money */
      var vz = a.visa === "yes" ? ["ok", "Tayyor", "Yaxshi. Pul qonuniy va kuzatiladigan manbadan bo'lishi, so'nggi 3 oylik ko'chirmada ko'rinishi kerak."] : a.visa === "part" ? ["mid", "Tayyorlash kerak", "Pulni oldindan, tushuntirsa bo'ladigan tarzda yig'ing: oxirgi kunlarda birdan tushgan katta summa elchixonada savol tug'diradi."] : ["no", "Muhim to'siq", "Bu viza uchun majburiy talab. Stipendiyaga ariza berganingiz uning o'rnini bosmaydi. Oila bilan oldindan reja qiling."];
      box.appendChild(card("Viza uchun pul: " + F("viza") + " / yil", vz[1], vz[0], [vz[2]], ["Viza qoidalari (5-qadam)", "#s4"]));
      summary.push("Viza puli: " + pfLabel("visa", a.visa));
      /* 6. plan */
      if(plansOn()){
        var P = plans(), want = P.filter(function(p){ return p.id === a.help; })[0] || P[0];
        var pc = el("section", "pf-card plan-pick"); var ph = el("div", "pf-h"); ph.appendChild(el("b", null, "Sizga mos tarif: " + want.name)); ph.appendChild(el("span", "tag ok", want.price)); pc.appendChild(ph);
        if(want.tagline) pc.appendChild(el("p", null, want.tagline));
        pc.appendChild(btn("line", "wallet", "Barcha tariflar", "#tariflar")); box.appendChild(pc);
      } else {
        var HT = {app:["Mustaqil yo'l", "Saytdagi 8 qadam, «Mening rejam» paneli va «Noldan» yo'riqnomasi sizga yetadi."], support:["Savollaringizga javob", "Natijangizni yuboring: savollaringizga Telegram'da javob beramiz."], full:["Har bir qadamda yordam", "Natijangizni yuboring: vaziyatingizni ko'rib, qanday yordam bera olishimizni aytamiz."]}[a.help] || ["Keyingi qadam", ""];
        var pc2 = el("section", "pf-card plan-pick"); var ph2 = el("div", "pf-h"); ph2.appendChild(el("b", null, HT[0])); pc2.appendChild(ph2); if(HT[1]) pc2.appendChild(el("p", null, HT[1])); box.appendChild(pc2);
      }
      summary.push("Kerakli yordam: " + pfLabel("help", a.help));
      box.appendChild(el("p", "muted-note", "Bu tahlil taxminiy va kafolat emas. Aniq talablar har bir universitet va viloyat sahifasida."));
      /* send */
      var sb = el("button", "go"); sb.type = "button"; var sp = el("span"); sp.appendChild(el("small", null, relayOn() ? "Natija to'g'ridan-to'g'ri adminga boradi" : "Natija va yuborish yo'riqnomasi chiqadi")); sp.appendChild(el("span", "t", "Natijani " + tgName() + " ga yuborish")); sb.appendChild(sp); sb.appendChild(ic("send"));
      var cf = leadContactField(); if(cf) box.appendChild(cf);
      sb.onclick = function(){
        var msg = "Salom! Uniroad saytida profil tahlilidan o'tdim:\n- " + summary.join("\n- ") + "\n\nMaslahat olmoqchiman.";
        if(cf && !str(cf._input.value)){ toast("Telegram username yoki telefon raqamingizni yozing"); cf._input.focus(); return; }
        if(sb.disabled) return; sb.disabled = true; sb.setAttribute("aria-busy", "true"); var t0 = sp.lastChild.textContent; sp.lastChild.textContent = "Yuborilmoqda…";
        sendLead("profil", msg, cf ? cf._input.value : "", function(ok){ sb.removeAttribute("aria-busy"); if(ok) sp.lastChild.textContent = "Yuborildi ✓"; else { sb.disabled = false; sp.lastChild.textContent = t0; } });
      };
      box.appendChild(sb);
      var again = el("button", "markdone"); again.type = "button"; again.appendChild(ic("route")); again.appendChild(el("span", null, "Qaytadan boshlash")); again.onclick = function(){ PRF = {step:0, a:{members:"4", income:""}}; savePRF(); draw(); }; box.appendChild(again);
      box.appendChild(rowBtn("book", "Keyingi qadam: Italiyada o'qish noldan", "To'liq yo'riqnoma va PDF", "g", "#noldan"));
    }
    draw();
    footer(main);
  }

  /* ================= PARENTS ================= */
  function parentsView(main){
    var P = S.parents || {};
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("users", "Ota-onalar uchun"));
    H.appendChild(heroTitle(P.title || "Ota-onalar uchun"));
    if(P.lead) H.appendChild(el("p", "lead", P.lead));
    var fx = arr(P.facts).filter(function(x){ return str(x.big); });
    if(fx.length){ var sg = el("div", "about-stats"); fx.forEach(function(x){ var d = el("div"); d.appendChild(el("b", null, x.big)); d.appendChild(el("small", null, x.small)); sg.appendChild(d); }); main.appendChild(sg); }
    var faq = arr(P.faq).filter(function(x){ return str(x.q); });
    if(faq.length){ var box = el("div", "faq"); faq.forEach(function(x, i){ var b = el("div", "blocks flat"); b.appendChild(paras(x.a)); var lk = x.link || {}; if(str(lk.url) && (/^#/.test(lk.url) || safeUrl(lk.url))){ var la = el("a", "res-link"); la.href = /^#/.test(lk.url) ? lk.url : safeUrl(lk.url); la.appendChild(el("span", null, str(lk.label) || "Batafsil")); la.appendChild(ic("next")); b.appendChild(la); } box.appendChild(fold("par:" + i, str(x.q), b, i === 0)); }); main.appendChild(sec(secHead("Eng ko'p beriladigan savollar", null, null, null, "Savol-javob"), box)); }
    if(arr(P.docs).length){ var ul = el("ul", "ticks"); arr(P.docs).forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul.appendChild(li); }); var dl = el("div", "links"); dl.appendChild(rowBtn("coin", "Stipendiya hujjatlari", "Viloyatlar bo'yicha aniq ro'yxat", null, "#stipendiya")); dl.appendChild(rowBtn("passport", "Viza hujjatlari", "Elchixona ro'yxati (5-qadam)", null, "#s4")); main.appendChild(sec(secHead("Sizdan qaysi hujjatlar kerak bo'ladi", null, null, null, "Ota-onadan"), ul, dl)); }
    if(arr(P.warnings).length){ var mk = el("ul", "mist"); arr(P.warnings).forEach(function(x){ var li = el("li"); li.appendChild(ic("shield")); li.appendChild(el("span", null, x)); mk.appendChild(li); }); main.appendChild(sec(secHead("Ehtiyot bo'ling", null, null, null, "Xavfsizlik"), mk)); }
    var cta = el("div", "links");
    var ask = el("button", "go"); ask.type = "button"; var sp = el("span"); sp.appendChild(el("small", null, "Ota-ona sifatida bevosita yozing")); sp.appendChild(el("span", "t", "Savol berish: " + tgName())); ask.appendChild(sp); ask.appendChild(ic("send"));
    ask.onclick = function(){ go("xabar?tur=savol"); };
    cta.appendChild(ask);
    cta.appendChild(rowBtn("star", "Farzandingiz profilini tahlil qiling", "8 savol, 2 daqiqa, bepul", "g", "#profil"));
    if(plansOn()) cta.appendChild(rowBtn("wallet", "Tariflar", plans().map(function(p){ return p.name + " " + p.price; }).join(" · "), null, "#tariflar"));
    cta.appendChild(rowBtn("book", "Italiyada o'qish noldan (PDF)", "Butun yo'l, oddiy tilda", null, "#noldan"));
    main.appendChild(sec(secHead("Keyingi qadam", null, null, null, "Bog'lanish"), cta));
    var srcs = el("div"); arr(P.sources).forEach(function(x){ var u = safeUrl(x.url); if(!u) return; var a2 = el("a", "src"); a2.href = u; a2.target = "_blank"; a2.rel = "noopener"; a2.appendChild(ic("link")); a2.appendChild(el("span", null, x.label)); srcs.appendChild(a2); });
    main.appendChild(sec(secHead("Manbalar", null, null, null, "Rasmiy"), srcs));
    footer(main);
  }

  /* ================= MONEY CALCULATOR ================= */
  var CK = "uprep-calc", CV = {cur:"EUR", rate:"", members:"4", income:"", m2:"", savings:"", apps:"3", fee:"30", cimea:"300"};
  try{ var cv0 = JSON.parse(LS.getItem(CK) || "null"); if(cv0) for(var k0 in cv0) CV[k0] = cv0[k0]; }catch(e){}
  function eur(n){ return (Math.round(n * 100) / 100).toLocaleString("ru-RU", {minimumFractionDigits:0, maximumFractionDigits:2}).replace(/ /g, " ") + " €"; }
  function numv(x){ var n = parseFloat(String(x || "").replace(/\s/g, "").replace(",", ".")); return isNaN(n) ? 0 : n; }
  /* money inputs: only digits and one decimal separator (no minus, no letters); never negative in calculations */
  function cleanNum(v){ var t = String(v || "").replace(/[^\d.,\s]/g, "").replace(/\s+/g, " ").replace(/^\s+/, ""); var i = t.search(/[.,]/); if(i >= 0) t = t.slice(0, i + 1) + t.slice(i + 1).replace(/[.,]/g, ""); return t; }
  function posv(x){ return Math.max(0, numv(cleanNum(x))); }
  function groupNum(v){ var t = cleanNum(v).replace(/\s/g, ""); if(!t) return ""; var p = t.split(/[.,]/), w = p[0].replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, " "); return p.length > 1 ? w + "," + p[1].slice(0, 2) : w; }
  for(var kc in CV) if(["cur","members","apps","cimea"].indexOf(kc) < 0) CV[kc] = cleanNum(CV[kc]);
  function calcView(main){
    var N = (S.dsu || {}).national || {};
    var LIM = numv(N.isee) || 28339.88, LIMP = numv(N.ispe) || 61608.48, MIN = numv(N.fuoriSede) || 7171.11, VISA = numv(F("viza")) || 10179.85;
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage});
    H.appendChild(kicker("wallet", "Bepul hisob-kitob"));
    H.appendChild(heroTitle("Pul kalkulyatori"));
    H.appendChild(el("p", "lead", "Viza uchun qancha pul ko'rsatish kerak, boshlanishda qancha xarajat bo'ladi va oilangiz daromadi bilan davlat stipendiyasiga mos kelasizmi: hammasini bir joyda hisoblang."));

    var FCHECK = [];
    /* realistic ranges; a value outside them is flagged next to the field and capped in the result */
    function calcLimit(key, n){
      var rate = CV.cur === "EUR" ? 1 : posv(CV.rate), e = rate ? n / rate : 0;
      if(key === "rate" && CV.cur !== "EUR"){ if(!n) return ""; var R = CV.cur === "USD" ? [0.5, 3] : [3000, 50000]; return n < R[0] || n > R[1] ? "Kurs odatiy emas: 1 € ≈ " + (CV.cur === "USD" ? "1,1 $" : "14 000 so'm") + " atrofida. Bank kursini tekshiring." : ""; }
      if(key === "income" && e > 2000000) return "Juda katta summa (2 mln € dan ortiq). Raqamni tekshiring: ortiqcha nol yozilgan bo'lishi mumkin.";
      if(key === "savings" && e > 5000000) return "Juda katta summa (5 mln € dan ortiq). Raqamni tekshiring.";
      if(key === "m2" && n > 3000) return "3 000 m² dan katta maydon odatiy emas. Raqamni tekshiring.";
      if(key === "fee" && n > 500) return "Ariza to'lovi odatda 20–150 €. Raqamni tekshiring.";
      return "";
    }
    function capped(key, v){ var M = {income:2000000, savings:5000000, m2:3000, fee:500}; return M[key] ? Math.min(v, M[key]) : v; }
    var form = el("section", "card calc-form");
    form.appendChild(el("h3", null, "1. Oila ma'lumotlari"));
    form.appendChild(el("p", "note", "Stipendiya oila daromadi va mulkiga qarab beriladi (ISEE parificato). Taxminiy raqamlarni kiriting."));
    var grid = el("div", "calc-grid");
    function field(key, label, hint, type, opts){
      var l = el("label", "fld"); l.appendChild(el("span", null, label));
      var inp;
      if(opts){ inp = el("select", "cityselect"); opts.forEach(function(o){ var op = el("option", null, o[1]); op.value = o[0]; if(String(CV[key]) === o[0]) op.selected = true; inp.appendChild(op); }); }
      else { inp = el("input"); inp.type = "text"; inp.inputMode = "decimal"; inp.autocomplete = "off"; inp.value = groupNum(CV[key]); inp.placeholder = hint || ""; }
      var err = el("small", "fld-err"); err.setAttribute("aria-live", "polite"); err.id = "err-" + key; if(!opts) inp.setAttribute("aria-describedby", err.id);
      function check(){ if(opts) return; var m = calcLimit(key, posv(inp.value)); err.textContent = m; inp.classList.toggle("bad", !!m); inp.setAttribute("aria-invalid", m ? "true" : "false"); }
      FCHECK.push(check);
      inp.addEventListener("input", function(){ if(!opts){ var c = cleanNum(inp.value); if(c !== inp.value){ var pos = inp.selectionStart - (inp.value.length - c.length); inp.value = c; try{ inp.setSelectionRange(pos, pos); }catch(e){} } } CV[key] = inp.value; try{ LS.setItem(CK, JSON.stringify(CV)); }catch(e){} FCHECK.forEach(function(f){ f(); }); draw(); });
      if(!opts) inp.addEventListener("blur", function(){ inp.value = groupNum(inp.value); CV[key] = inp.value; try{ LS.setItem(CK, JSON.stringify(CV)); }catch(e){} });
      l.appendChild(inp); if(hint && opts) l.appendChild(el("small", "fld-h", hint)); if(!opts) l.appendChild(err); grid.appendChild(l); return inp;
    }
    field("cur", "Valyuta", "", null, [["EUR","Yevro (€)"],["USD","AQSh dollari ($)"],["UZS","So'm"]]);
    var rateL = field("rate", "Kurs: 1 € necha (tanlangan valyutada)?", "masalan, bugungi bank kursi");
    field("members", "Oila a'zolari soni (siz bilan)", "", null, [["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"]]);
    field("income", "Oilaning bir yillik umumiy daromadi", "barcha ishlaydiganlar, soliqdan oldin");
    field("m2", "Oilaga tegishli uy-joylar maydoni (m²)", "barcha kvartira va uylar, jami");
    field("savings", "Bankdagi jamg'arma va depozitlar", "31-dekabr holatiga");
    form.appendChild(grid);

    var form2 = el("section", "card calc-form");
    form2.appendChild(el("h3", null, "2. Ariza xarajatlari"));
    var g2 = el("div", "calc-grid");
    grid = g2;
    field("apps", "Nechta universitetga topshirasiz?", "", null, [["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"]]);
    field("fee", "Bitta ariza to'lovi (€)", "davlat universitetlarida odatda 20–70 €");
    field("cimea", "Diplomni tasdiqlash", "", null, [["0","DoV (elchixona orqali)"],["150","CIMEA, 150 €"],["300","CIMEA, 300 €"],["400","CIMEA tezkor, 400 €"]]);
    form2.appendChild(g2);

    var out = el("div", "calc-out");
    var lay = el("div", "split calc-split"), colA = el("div", "split-main"), colB = el("aside", "split-side"); colA.appendChild(form); colA.appendChild(form2); colB.appendChild(out); lay.appendChild(colA); lay.appendChild(colB); main.appendChild(lay);

    function draw(){
      var cur = CV.cur, rate = cur === "EUR" ? 1 : posv(CV.rate);
      rateL.parentNode.style.display = cur === "EUR" ? "none" : "";
      out.textContent = "";
      function toE(v){ return rate ? posv(v) / rate : 0; }
      function loc(e){ return cur === "EUR" || !rate ? "" : " ≈ " + Math.round(e * rate).toLocaleString("ru-RU").replace(/ /g, " ") + (cur === "USD" ? " $" : " so'm"); }

      /* visa */
      var v = el("section", "res-card visa");
      v.appendChild(el("small", null, "Viza uchun"));
      v.appendChild(el("b", null, eur(VISA)));
      v.appendChild(el("p", null, "Bir o'quv yili uchun bankda (sizning yoki homiyingiz hisobida) bo'lishi kerak" + loc(VISA) + ". Bu pul sarflanmaydi, faqat ko'rsatiladi. " + F("vizaYil") + " talabi."));
      var vl = el("a", "res-link"); vl.href = "#s4"; vl.appendChild(el("span", null, "Viza qoidalari va hujjatlar (5-qadam)")); vl.appendChild(ic("next")); v.appendChild(vl);
      out.appendChild(v);

      /* one-time */
      var apps = posv(CV.apps), fee = capped("fee", posv(CV.fee)), cim = posv(CV.cimea), perm = 120;
      var once = apps * fee + cim + perm;
      var o = el("section", "res-card");
      o.appendChild(el("small", null, "Bir martalik xarajatlar (taxminan)"));
      o.appendChild(el("b", null, eur(once)));
      var ul = el("ul", "res-list");
      [[apps + " ta ariza × " + eur(fee), apps * fee], [cim ? "CIMEA" : "DoV (elchixona tartibi bo'yicha)", cim], ["Permesso di soggiorno (16 € marka + yig'imlar)", perm]].forEach(function(r){ var li = el("li"); li.appendChild(el("span", null, r[0])); li.appendChild(el("b", null, r[1] ? eur(r[1]) : "—")); ul.appendChild(li); });
      o.appendChild(ul);
      o.appendChild(el("p", null, "Qo'shilmagan: tarjima va apostil, sug'urta, chipta, birinchi oy ijarasi. Ular shahar va tanlovga qarab farq qiladi."));
      out.appendChild(o);

      /* ISEE */
      var m = Math.max(1, numv(CV.members)), scale = [0, 1, 1.57, 2.04, 2.46, 2.85][m] || (2.85 + (m - 5) * 0.35);
      var inc = capped("income", toE(CV.income)), sav = capped("savings", toE(CV.savings)), prop = capped("m2", posv(CV.m2)) * 500;
      var s = el("section", "res-card dsu");
      s.appendChild(el("small", null, "Davlat stipendiyasi (DSU) imkoniyati"));
      if(cur !== "EUR" && !rate){ s.appendChild(el("p", null, "Hisoblash uchun valyuta kursini kiriting.")); out.appendChild(s); return; }
      if(!numv(CV.income) && !numv(CV.m2) && !numv(CV.savings)){ s.appendChild(el("p", null, "Oila daromadi, uy-joy maydoni va jamg'armani kiriting.")); out.appendChild(s); return; }
      var isp = prop + sav, isee = (inc + 0.2 * isp) / scale, ispe = isp / scale;
      var lvl, cls;
      if(isee <= LIM * 2 / 3 && ispe <= LIMP){ lvl = "Yuqori imkoniyat"; cls = "ok"; }
      else if(isee <= LIM && ispe <= LIMP){ lvl = "Mos kelasiz"; cls = "mid"; }
      else { lvl = "Chegaradan yuqori"; cls = "no"; }
      s.classList.add(cls);
      s.appendChild(el("b", null, lvl));
      var ul2 = el("ul", "res-list");
      [["Taxminiy ISEE", eur(isee) + " (chegara " + eur(LIM) + ")"], ["Taxminiy ISPE", eur(ispe) + " (chegara " + eur(LIMP) + ")"], ["Uy-joy bahosi", groupNum(String(capped("m2", posv(CV.m2)))) + " m² × 500 € = " + eur(prop)], ["Oila koeffitsienti", m + " kishi → " + scale]].forEach(function(r){ var li = el("li"); li.appendChild(el("span", null, r[0])); li.appendChild(el("b", null, r[1])); ul2.appendChild(li); });
      s.appendChild(ul2);
      s.appendChild(el("p", null, cls === "ok" ? "ISEE chegaraning 2/3 qismidan past: eng katta summa va qonun bo'yicha +15% qo'shimcha. Fuori sede talaba uchun kamida " + eur(MIN) + " / yil, bepul ovqat va o'qish to'lovidan ozodlik." :
        cls === "mid" ? "Chegaradan past: stipendiyaga ariza bera olasiz. Summa viloyat va daromadga qarab belgilanadi (fuori sede uchun davlat minimumi " + eur(MIN) + ")." :
        "Davlat stipendiyasi chegarasidan yuqori. Universitetlarning o'z stipendiyalari va o'qish to'lovi chegirmalariga qarang."));
      out.appendChild(s);
      out.appendChild(callout({style:"info", text:"Bu taxminiy hisob. Haqiqiy ISEE parificato'ni Italiyada CAF hisoblaydi: u ba'zi chegirmalarni ham qo'llaydi, shuning uchun haqiqiy natija odatda shu yerdagidan past yoki unga teng chiqadi. Chet eldagi uy-joy har m² uchun 500 € deb baholanadi, yer hisobga olinmaydi."}));
      var bx = el("div", "ic-btns"); bx.appendChild(btn("navy", "coin", "Viloyatlar stipendiyasi", "#stipendiya")); bx.appendChild(btn("line", "book", "0 dan qo'llanma", "#qollanma")); out.appendChild(bx);
    }
    draw();
    footer(main);
  }

  /* ================= LIVING IN ITALY ================= */
  function livingView(main){
    var L = S.living || {};
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("home2", "Amaliy maslahatlar"));
    H.appendChild(heroTitle(L.title || "Italiyada yashash"));
    if(L.lead) H.appendChild(el("p", "lead", L.lead));
    var toc = el("nav", "toc"); arr(L.sections).forEach(function(x){ var a = el("a", null, x.title); a.href = "#yashash"; a.onclick = function(e){ e.preventDefault(); var t = document.getElementById("y-" + x.id); if(t) t.scrollIntoView({behavior: REDUCED ? "auto" : "smooth"}); }; toc.appendChild(a); }); main.appendChild(toc);
    arr(L.sections).forEach(function(x, i){
      var c = el("section", "live-card" + (x.id === "firib" || x.id === "qiyin" ? " warn" : "")); c.id = "y-" + x.id;
      var h = el("div", "ic-h"); var ii = el("span", "ic"); ii.appendChild(ic(x.icon || "info")); h.appendChild(ii); var t = el("div"); t.appendChild(el("small", null, (i + 1) + "-bo'lim")); t.appendChild(el("b", null, x.title)); h.appendChild(t); c.appendChild(h);
      if(x.intro) c.appendChild(el("p", "live-intro", x.intro));
      var ul = el("ul", "ticks"); arr(x.items).forEach(function(it){ var li = el("li"); li.appendChild(ic(x.id === "firib" ? "stop" : "check")); li.appendChild(el("span", null, it)); ul.appendChild(li); }); c.appendChild(ul);
      main.appendChild(c);
    });
    var srcs = el("div"); arr(L.sources).forEach(function(x){ var u = safeUrl(x.url); if(!u) return; var a = el("a", "src"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, x.label)); srcs.appendChild(a); });
    main.appendChild(sec(secHead("Manbalar", null, null, null, "Rasmiy"), srcs));
    footer(main);
  }

  /* ================= NEWS ================= */
  function newsCard(n){
    var u = safeUrl(n.link), a = el(u ? "a" : "div", "news-card"); if(u){ a.href = u; if(/^https:/.test(u)){ a.target = "_blank"; a.rel = "noopener"; } }
    var top = el("div", "nw-top"); if(n.tag) top.appendChild(el("span", "tag alt", n.tag)); top.appendChild(el("span", "nw-date", n.date)); a.appendChild(top);
    a.appendChild(el("b", null, n.title)); if(n.text) a.appendChild(el("p", null, n.text)); return a;
  }
  function newsView(main){
    pageHead(main, "Yangiliklar", "Muddatlar, qoidalar va stipendiyalar bo'yicha eng so'nggi o'zgarishlar.");
    var g = el("div", "news-grid"); S.news.forEach(function(n){ g.appendChild(newsCard(n)); });
    if(!S.news.length) g.appendChild(el("div", "empty", "Hozircha yangilik yo'q."));
    main.appendChild(g); footer(main);
  }

  /* ================= PROGRAMME SEARCH (all universities) ================= */
  var PQ = {q:"", level:"", field:"", free:false};
  function progSearchView(main){
    var H = hero({cls:"compact", scene:"town", narrow:true});
    H.appendChild(kicker("search", "Universitaly 2026/27 bazasi"));
    H.appendChild(heroTitle("Dastur qidirish"));
    var ALL = []; S.unis.forEach(function(u){ arr(u.programmes).forEach(function(p){ if(!p.online) ALL.push({p:p, u:u}); }); });
    H.appendChild(el("p", "lead", "Barcha universitetlardagi " + ALL.length + " ta ingliz tilidagi dastur ichidan izlang: nom, daraja, soha yoki testsiz qabul bo'yicha."));
    var bar = el("div", "filters");
    var sb = searchBox("Masalan: Data Science, Economics, Architecture", PQ.q, function(v){ PQ.q = v; draw(); }); bar.appendChild(sb.node);
    var chips = el("div", "chips");
    function chip(label, on, fn){ var b = el("button", "chipf" + (on ? " on" : ""), label); b.type = "button"; b.setAttribute("aria-pressed", on ? "true" : "false"); b.onclick = fn; chips.appendChild(b); }
    function drawChips(){
      chips.textContent = "";
      [["","Hamma daraja"],["Bakalavr","Bakalavr"],["Magistratura","Magistratura"],["Yagona sikl","5–6 yillik"]].forEach(function(x){ chip(x[1], PQ.level === x[0], function(){ PQ.level = x[0]; drawChips(); draw(); }); });
      chip("Testsiz qabul", PQ.free, function(){ PQ.free = !PQ.free; drawChips(); draw(); });
      Object.keys(FIELDS).forEach(function(k){ chip(FIELDS[k].t, PQ.field === k, function(){ PQ.field = PQ.field === k ? "" : k; drawChips(); draw(); }); });
    }
    drawChips(); bar.appendChild(chips); main.appendChild(bar);
    var count = el("p", "count-line"); count.setAttribute("aria-live", "polite"); main.appendChild(count);
    var list = el("div", "list"); main.appendChild(list);
    var more = el("button", "markdone"); more.type = "button"; more.appendChild(el("span", null, "Yana ko'rsatish")); main.appendChild(more);
    var shown = 40;
    function draw(reset){
      if(reset !== false) shown = 40;
      var q = norm(PQ.q), F = FIELDS[PQ.field];
      var R = ALL.filter(function(x){ var p = x.p; if(PQ.level && p.level !== PQ.level) return false; if(PQ.free && p.access && p.access !== "Erkin qabul") return false; if(F && !F.re.test(String(p.name).toLowerCase())) return false; if(q && norm(p.name + " " + (x.u.short || "")).indexOf(q) < 0) return false; return true; });
      list.textContent = ""; count.textContent = R.length + " ta dastur";
      R.slice(0, shown).forEach(function(x){
        var a = el("a", "lrow"); a.href = "#uni-" + x.u.id + "/yonalishlar";
        var t = el("span", "txt"); t.appendChild(el("b", null, x.p.name));
        var c = cityById(x.u.city); t.appendChild(el("small", null, (x.u.short || x.u.name) + (c ? ", " + c.name : "")));
        var tg = el("span", "u-tags"); tg.appendChild(el("span", "tag" + (x.p.level === "Bakalavr" ? "" : " alt"), x.p.level)); if(x.p.access) tg.appendChild(el("span", "tag" + (x.p.access === "Erkin qabul" ? " ok" : " hot"), x.p.access)); tg.appendChild(el("span", "tag lang", x.p.lang)); t.appendChild(tg);
        a.appendChild(t); a.appendChild(ic("next", "chev")); list.appendChild(a);
      });
      if(!R.length) list.appendChild(el("div", "empty", "Topilmadi. Boshqa so'z bilan izlang yoki filtrni olib tashlang."));
      more.hidden = R.length <= shown;
    }
    more.onclick = function(){ shown += 40; draw(false); };
    draw(); footer(main);
  }

  /* ================= FAVOURITES + MY PLAN ================= */
  var FAV = [];
  try{ FAV = JSON.parse(LS.getItem("uprep-fav") || "[]") || []; }catch(e){ FAV = []; }
  function isFav(id){ return FAV.indexOf(id) >= 0; }
  function toggleFav(id){ if(isFav(id)) FAV.splice(FAV.indexOf(id), 1); else FAV.push(id); try{ LS.setItem("uprep-fav", JSON.stringify(FAV)); }catch(e){} }
  function favBtn(u, cls){
    var b = el("button", "btn " + (cls || "glass") + " fav" + (isFav(u.id) ? " on" : "")); b.type = "button";
    function paint(){ b.textContent = ""; b.appendChild(el("span", null, isFav(u.id) ? "Saqlangan" : "Saqlash")); b.appendChild(ic("heart")); b.classList.toggle("on", isFav(u.id)); b.setAttribute("aria-pressed", isFav(u.id) ? "true" : "false"); }
    b.onclick = function(){ toggleFav(u.id); paint(); toast(isFav(u.id) ? "«Mening rejam»ga qo'shildi" : "Rejadan olib tashlandi"); };
    paint(); return b;
  }
  /* ================= CALENDAR EXPORT (Google / .ics) ================= */
  function ymd(x){ return x.getFullYear() + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0"); }
  function utcStamp(x){ return x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  /* ev: {title, d (Date, all-day) | start (Date, exact), details} */
  function gcalUrl(ev){
    var dates = ev.start ? utcStamp(ev.start) + "/" + utcStamp(new Date(ev.start.getTime() + 3600000)) : ymd(ev.d) + "/" + ymd(new Date(ev.d.getFullYear(), ev.d.getMonth(), ev.d.getDate() + 1));
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) + "&dates=" + dates + "&details=" + encodeURIComponent(str(ev.details) + "\n\nUniroad: " + location.origin + location.pathname);
  }
  function icsEsc(t){ return str(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function icsDownload(list, name){
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Uniroad//UZ", "CALSCALE:GREGORIAN"];
    list.forEach(function(ev, i){
      L.push("BEGIN:VEVENT", "UID:uprep-" + Date.now() + "-" + i + "@uprep", "DTSTAMP:" + utcStamp(new Date()));
      if(ev.start){ L.push("DTSTART:" + utcStamp(ev.start), "DTEND:" + utcStamp(new Date(ev.start.getTime() + 3600000))); }
      else { L.push("DTSTART;VALUE=DATE:" + ymd(ev.d), "DTEND;VALUE=DATE:" + ymd(new Date(ev.d.getFullYear(), ev.d.getMonth(), ev.d.getDate() + 1))); }
      L.push("SUMMARY:" + icsEsc(ev.title), "DESCRIPTION:" + icsEsc(ev.details));
      (ev.start ? ["-PT1H"] : ["-P7D", "-P1D"]).forEach(function(tr){ L.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + icsEsc(ev.title), "TRIGGER:" + tr, "END:VALARM"); });
      L.push("END:VEVENT");
    });
    L.push("END:VCALENDAR");
    var blob = new Blob([L.join("\r\n")], {type:"text/calendar;charset=utf-8"}), a = el("a"); a.href = URL.createObjectURL(blob); a.download = (name || "uprep") + ".ics"; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 800);
    toast("Kalendar fayli yuklandi: uni oching va «Qo'shish»ni bosing.");
  }
  function calAdd(ev){
    var w = el("span", "caladd no-print");
    var g = el("a", null); g.href = gcalUrl(ev); g.target = "_blank"; g.rel = "noopener"; g.appendChild(ic("cal")); g.appendChild(el("span", null, "Google")); w.appendChild(g);
    var i = el("button", null); i.type = "button"; i.appendChild(ic("cal")); i.appendChild(el("span", null, "iPhone / .ics")); i.onclick = function(){ icsDownload([ev], "uprep-muddat"); }; w.appendChild(i);
    return w;
  }

  /* ================= APPLICATION TRACKER ================= */
  var TSTEPS = [
    ["Tayyorlanmoqda", "Hujjatlarni yig'ing va ariza portalida ro'yxatdan o'ting.", "#hujjatlarim"],
    ["Ariza topshirildi", "Javobni kuting, emailni kuzating. Shu vaqtda apostil va tarjimani boshlang.", "#s2"],
    ["Pre-acceptance keldi", "Darhol DoV yoki CIMEA'ni boshlang: CIMEA 3 oygacha oladi.", "#s2"],
    ["DoV / CIMEA tayyor", "Universitaly'da pre-enrollment qiling.", "#s3"],
    ["Universitaly tasdiqlandi", "Viza hujjatlarini yig'ing; bank ko'chirmasini eng oxirida oling.", "#s4"],
    ["Viza olindi", "Yo'lga tayyorlaning. Kelgach 8 kun ichida permesso.", "#s6"],
    ["Full enrollment", "Tabriklaymiz! Stipendiya idorasining muddatlarini kuzating.", "#stipendiya"]
  ];
  var TR = {};
  try{ TR = JSON.parse(LS.getItem("uprep-track") || "{}") || {}; }catch(e){ TR = {}; }
  function saveTR(){ try{ LS.setItem("uprep-track", JSON.stringify(TR)); }catch(e){} }
  function todayStr(){ var t = new Date(); return String(t.getDate()).padStart(2, "0") + "." + String(t.getMonth() + 1).padStart(2, "0") + "." + t.getFullYear(); }
  function trOf(id){ return TR[id] || {s:0, d:{}}; }
  function tracker(u, onChange){
    var c = el("div", "trk");
    function draw(){
      c.textContent = ""; var t = trOf(u.id);
      var ol = el("ol", "trk-steps" + (t.rej ? " rej" : ""));
      TSTEPS.forEach(function(s, i){ var li = el("li", i < t.s ? "done" : i === t.s ? "cur" : ""); var b = el("button"); b.type = "button"; b.title = s[0]; b.setAttribute("aria-label", s[0]); b.onclick = function(){ var x = trOf(u.id); x.s = i; x.d = x.d || {}; if(!x.d[i]) x.d[i] = todayStr(); TR[u.id] = x; saveTR(); draw(); if(onChange) onChange(); }; li.appendChild(b); ol.appendChild(li); });
      c.appendChild(ol);
      var st = TSTEPS[t.s];
      var info = el("div", "trk-info");
      info.appendChild(el("b", null, (t.rej ? "Rad etildi · " : "") + (t.s + 1) + "/" + TSTEPS.length + ": " + st[0] + (t.d && t.d[t.s] ? " (" + t.d[t.s] + ")" : "")));
      if(!t.rej && t.s < TSTEPS.length - 1){ var nx = el("a", "trk-next"); nx.href = TSTEPS[t.s][2]; nx.appendChild(el("span", null, "Keyingi ish: " + st[1])); nx.appendChild(ic("next")); info.appendChild(nx); }
      else if(!t.rej) info.appendChild(el("p", null, st[1]));
      else info.appendChild(el("p", null, "Xafa bo'lmang: boshqa universitetlaringizga e'tibor bering. Keyingi bosqich ochilsa, qayta topshirish mumkin."));
      c.appendChild(info);
      var row = el("div", "trk-act");
      if(t.s < TSTEPS.length - 1 && !t.rej){ var adv = el("button", "btn line"); adv.type = "button"; adv.appendChild(el("span", null, "Keyingi holat: " + TSTEPS[t.s + 1][0])); adv.appendChild(ic("check")); adv.onclick = function(){ var x = trOf(u.id); x.s++; x.d = x.d || {}; x.d[x.s] = todayStr(); TR[u.id] = x; saveTR(); draw(); toast("Holat yangilandi"); if(onChange) onChange(); }; row.appendChild(adv); }
      var rj = el("button", "prevlink"); rj.type = "button"; rj.appendChild(el("span", null, t.rej ? "Rad belgisini olib tashlash" : "Rad etildi deb belgilash")); rj.onclick = function(){ var x = trOf(u.id); x.rej = !x.rej; TR[u.id] = x; saveTR(); draw(); if(onChange) onChange(); }; row.appendChild(rj);
      c.appendChild(row);
    }
    draw(); return c;
  }

  /* ================= "MENING YO'LIM" ================= */
  var ME = null;
  try{ ME = JSON.parse(LS.getItem("uprep-me") || "null"); }catch(e){ ME = null; }
  function saveME(){ try{ LS.setItem("uprep-me", JSON.stringify(ME)); }catch(e){} }
  function docsMeter(){ try{ return JSON.parse(LS.getItem("uprep-docs-meter") || "null"); }catch(e){ return null; } }
  function favDeadlines(){
    var L = []; FAV.map(uniById).filter(Boolean).forEach(function(u){ arr(u.deadlines).forEach(function(d){ var dd = deadline(d.date); if(dd && daysLeft(dd) >= 0) L.push({u:u, d:dd, x:d}); }); });
    return L.sort(function(a, b){ return a.d - b.d; });
  }
  function nextAction(){
    var favs = FAV.map(uniById).filter(Boolean), dm = docsMeter();
    if(!favs.length){
      var rec = arr(ME && ME.recs).map(uniById).filter(Boolean);
      if(rec.length) return ["star", "Tavsiya qilinganlarni saqlang", "Profil tahlili: " + rec.map(function(u){ return u.short || u.name; }).join(", "), "#rejam"];
      if(ME && ME.lvl === "fy") return ["cap", "Foundation dasturini tanlang", "11 yillik attestat bilan yo'l", "#foundation"];
      return ["star", "Universitetlarni tanlang", "3–5 ta universitet saqlang: muddatlari shu yerda chiqadi", "#mos-universitet"];
    }
    var low = favs.filter(function(u){ return !trOf(u.id).rej; }).sort(function(a, b){ return trOf(a.id).s - trOf(b.id).s; })[0];
    if(low && trOf(low.id).s === 0 && (!dm || dm.done < dm.all)) return ["doc", "Hujjatlaringizni tayyorlang", dm ? dm.done + " / " + dm.all + " tayyor" : "Sizga kerak ro'yxatni oling", "#hujjatlarim"];
    if(low){ var t = trOf(low.id); if(t.s < TSTEPS.length - 1) return ["next", (low.short || low.name) + ": " + TSTEPS[t.s][1].split(".")[0], "Hozirgi holat: " + TSTEPS[t.s][0], TSTEPS[t.s][2]]; }
    return ["check", "Hammasi bajarildi", "Stipendiya va permesso muddatlarini kuzating", "#stipendiya"];
  }
  function lvlName(v){ return v === "fy" ? "Foundation" : v === "ma" ? "Magistratura" : "Bakalavr"; }
  function onboarding(main, done){
    var c = el("section", "card onb"); c.appendChild(el("h3", null, "Keling, yo'lingizni sozlaymiz"));
    c.appendChild(el("p", "note", "3 ta savol. Javoblar faqat shu qurilmada saqlanadi."));
    var me = ME || {lvl:"", year:""};
    function grp(label, key, opts){ var w = el("div", "onb-q"); w.appendChild(el("b", null, label)); var r = el("div", "onb-opts"); opts.forEach(function(o){ var b = el("button", "chipf" + (me[key] === o[0] ? " on" : ""), o[1]); b.type = "button"; b.onclick = function(){ me[key] = o[0]; Array.prototype.forEach.call(r.children, function(x){ x.classList.remove("on"); }); b.classList.add("on"); }; r.appendChild(b); }); w.appendChild(r); c.appendChild(w); }
    grp("1. Qaysi darajaga?", "lvl", [["fy","Foundation"],["ba","Bakalavr"],["ma","Magistratura"]]);
    grp("2. Qachon o'qishni boshlamoqchisiz?", "year", [["2027","2027 kuzi"],["2028","2028 kuzi"],["x","Hali bilmayman"]]);
    var w3 = el("div", "onb-q"); w3.appendChild(el("b", null, "3. Universitetlar (keyin ham qo'shsa bo'ladi)"));
    var r3 = el("div", "onb-opts");
    S.unis.slice().sort(function(a, b){ return (b.detailed ? 1000 : 0) + (b.enCount || 0) - ((a.detailed ? 1000 : 0) + (a.enCount || 0)); }).slice(0, 12).forEach(function(u){ var b = el("button", "chipf" + (isFav(u.id) ? " on" : ""), u.short || u.name); b.type = "button"; b.onclick = function(){ toggleFav(u.id); b.classList.toggle("on", isFav(u.id)); }; r3.appendChild(b); });
    w3.appendChild(r3); var more = el("a", "trk-next"); more.href = "#mos-universitet"; more.appendChild(el("span", null, "Yoki test orqali topish")); more.appendChild(ic("next")); w3.appendChild(more); c.appendChild(w3);
    var ok = el("button", "btn gold"); ok.type = "button"; ok.appendChild(el("span", null, "Tayyor")); ok.appendChild(ic("check"));
    ok.onclick = function(){ if(!me.lvl){ toast("Darajani tanlang"); return; } ME = me; saveME(); done(); };
    c.appendChild(ok); main.appendChild(c);
  }
  function journeyMini(){
    var na = nextAction(), fd = favDeadlines()[0], dm = docsMeter();
    var c = el("a", "jmini"); c.href = "#rejam";
    var h = el("div", "jm-h"); h.appendChild(el("span", "eyebrow", "Mening rejam · " + lvlName(ME.lvl) + (ME.year && ME.year !== "x" ? ", " + ME.year + " kuzi" : ""))); h.appendChild(ic("next")); c.appendChild(h);
    c.appendChild(el("b", null, na[1])); c.appendChild(el("small", null, na[2]));
    var s = el("div", "jm-stats");
    [[FAV.length, "universitet"], [dm ? Math.round(dm.done / Math.max(1, dm.all) * 100) + "%" : "—", "hujjatlar"], [fd ? leftLabel(daysLeft(fd.d)) : "—", fd ? (fd.u.short || fd.u.name) : "yaqin muddat"]].forEach(function(x){ var d = el("div"); d.appendChild(el("b", null, String(x[0]))); d.appendChild(el("small", null, x[1])); s.appendChild(d); });
    c.appendChild(s); return c;
  }
  function qlinks(list){ var w = el("nav", "qlinks"); list.forEach(function(x){ var a = el("a"); a.href = "#" + x[2]; a.appendChild(ic(x[0])); a.appendChild(el("span", null, x[1])); w.appendChild(a); }); return w; }
  function quickTiles(){
    var dm = docsMeter(), g = el("div", "qtiles");
    [["doc","Hujjatlarim", dm ? dm.done + "/" + dm.all + " tayyor" : "Ro'yxatni oling","hujjatlarim"],["star","Profil tahlili","Imkoniyatlaringiz","profil"],["cal","Kalendar","Muhim sanalar","kalendar"],["gear","Sozlamalar","Mavzu, zaxira","sozlamalar"]].forEach(function(x){ var a = el("a", "qtile"); a.href = "#" + x[3]; var i = el("span", "ic"); i.appendChild(ic(x[0])); a.appendChild(i); a.appendChild(el("b", null, x[1])); a.appendChild(el("small", null, x[2])); a.appendChild(ic("next", "chev qt-chev")); g.appendChild(a); });
    return g;
  }
  function planView(main){
    var H = hero({cls:"compact", scene:"rome"});
    H.appendChild(kicker("heart", "Shu qurilmada saqlanadi"));
    H.appendChild(heroTitle("Mening rejam"));
    if(!ME){ H.appendChild(el("p", "lead", "Shaxsiy panelingiz: keyingi qadam, universitetlaringizning muddatlari, arizalar holati va hujjatlar bir joyda.")); onboarding(main, function(){ render(true); }); main.appendChild(quickTiles()); footer(main); return; }
    H.appendChild(el("p", "lead", "Maqsad: " + lvlName(ME.lvl) + (ME.year && ME.year !== "x" ? ", " + ME.year + " kuzi" : "") + ". Keyingi qadam, muddatlar va arizalar holati bir joyda."));
    var dm = docsMeter(), favs = FAV.map(uniById).filter(Boolean);
    var sent = favs.filter(function(u){ return trOf(u.id).s >= 1; }).length;
    H.appendChild(heroStats([[favs.length, "universitet"], [sent, "ariza topshirildi"], [dm ? dm.done + "/" + dm.all : "—", "hujjat tayyor"]]));
    var lay = el("div", "split plan-split"), mc = el("div", "split-main"), side = el("aside", "split-side"); lay.appendChild(mc); lay.appendChild(side); main.appendChild(lay);
    var na = nextAction(); side.appendChild(rowBtn(na[0], "Keyingi qadam: " + na[1], na[2], "g", na[3]));
    side.appendChild(quickTiles());
    if(ME.lvl === "fy") side.appendChild(rowBtn("cap", "Foundation bor universitetlar", "11 yillik attestat bilan yo'l", null, "#foundation"));

    var FD = favDeadlines();
    if(FD.length){
      var ul = el("ol", "agenda");
      FD.slice(0, 6).forEach(function(x){ var li = el("li"); var w = el("div", "when", x.x.date); w.appendChild(el("span", "left", leftLabel(daysLeft(x.d)))); li.appendChild(w); var t = el("div"); t.appendChild(el("span", "tag", x.u.short || x.u.name)); t.appendChild(el("p", null, x.x.label)); t.appendChild(calAdd({title:(x.u.short || x.u.name) + ": " + x.x.label, d:x.d, details:x.x.label + " (" + x.x.date + ")"})); li.appendChild(t); ul.appendChild(li); });
      var all = el("button", "btn line"); all.type = "button"; all.appendChild(el("span", null, "Hammasini kalendarga qo'shish (.ics)")); all.appendChild(ic("cal"));
      all.onclick = function(){ icsDownload(FD.map(function(x){ return {title:(x.u.short || x.u.name) + ": " + x.x.label, d:x.d, details:x.x.label + " (" + x.x.date + ")"}; }), "uprep-muddatlar"); };
      side.appendChild(sec(secHead("Universitetlaringiz muddatlari", null, null, null, "Yaqin", "Har biri uchun 7 kun va 1 kun oldin eslatma qo'yiladi."), ul, all));
    }
    var recs = arr(ME.recs).map(uniById).filter(function(u){ return u && !isFav(u.id); });
    if(recs.length){
      var rw = el("div", "onb-opts"); recs.forEach(function(u){ var b = el("button", "chipf", "+ " + (u.short || u.name)); b.type = "button"; b.onclick = function(){ toggleFav(u.id); render(false); }; rw.appendChild(b); });
      mc.appendChild(sec(secHead("Profil tahlili tavsiyasi", "Qayta tahlil", "profil", null, "Sizga mos", "Bosing: universitet rejangizga qo'shiladi va muddatlari shu yerda chiqadi."), rw));
    }
    if(!favs.length){
      mc.appendChild(callout({style:"info", text:"Hali universitet saqlamadingiz. Universitet sahifasidagi «Saqlash ♥» tugmasini bosing yoki testdan o'ting."}));
      var bx = el("div", "ic-btns"); bx.appendChild(btn("gold", "star", "Menga mos universitet", "#mos-universitet")); bx.appendChild(btn("line", "uni", "Universitetlar", "#universitetlar")); mc.appendChild(bx);
    } else {
      var g = el("div", "qz-res");
      favs.forEach(function(u){
        var c = el("article", "qz-card"), city = cityById(u.city);
        var h = el("a", "qz-h"); h.href = "#uni-" + u.id; h.appendChild(el("span", "u-mono", mono(u))); var t = el("span", "txt"); t.appendChild(el("b", null, u.short || u.name)); var nxd = uniNext(u); t.appendChild(el("small", null, (city ? city.name : "") + (nxd ? " · " + nxd.x.date + " (" + leftLabel(daysLeft(nxd.d)) + ")" : ""))); h.appendChild(t); c.appendChild(h);
        c.appendChild(tracker(u, function(){ render(false); }));
        var bx2 = el("div", "ic-btns"); var au = safeUrl(u.portalUrl) || safeUrl(u.applyUrl); if(au) bx2.appendChild(btn("gold", "link", "Ariza sahifasi", au)); bx2.appendChild(btn("line", "book", "Talablar", "#uni-" + u.id + "/qabul")); bx2.appendChild(favBtn(u, "line")); c.appendChild(bx2);
        g.appendChild(c);
      });
      mc.appendChild(sec(secHead("Arizalarim (" + favs.length + ")", "Yana qo'shish", "universitetlar", null, "Kuzatuv", "Holatni yangilash uchun nuqtani yoki «Keyingi holat» tugmasini bosing."), g));
      if(favs.length > 1){ var cb = btn("navy", "list", "Saqlanganlarni taqqoslash", "#taqqoslash"); cb.onclick = function(){ CMP = FAV.slice(0, 3); saveCmp(); }; mc.appendChild(cb); }
    }
    var n = doneCount(), total = S.stages.length;
    mc.appendChild(sec(secHead("Qo'llanma qadamlari", null, null, null, n + " / " + total), routeLine()));
    var rs = el("button", "prevlink"); rs.type = "button"; rs.appendChild(el("span", null, "Maqsadni o'zgartirish")); rs.onclick = function(){ ME = null; saveME(); render(true); }; mc.appendChild(rs);
    footer(main);
  }

  /* ================= AMBASSADORS / OUTCOMES / EVENTS (owner fills via CMS) ================= */
  function tgHandle(v){ var m = str(v).replace(/^https?:\/\/t\.me\//i, "").replace(/^@/, "").match(/^[A-Za-z0-9_]{4,32}$/); return m ? m[0] : ""; }
  function realAmb(uid){ return arr(S.amb).filter(function(a){ return a && a.consent && str(a.name) && tgHandle(a.telegram) && (!uid || a.uni === uid); }); }
  function ambCard(a){
    var c = el("article", "amb"); var top = el("div", "amb-top"); var ph = safeUrl(a.photo);
    if(ph){ var im = el("img"); im.src = ph; im.alt = ""; im.loading = "lazy"; top.appendChild(im); } else top.appendChild(el("span", "rev-av", str(a.name).charAt(0).toUpperCase()));
    var t = el("div"); t.appendChild(el("b", null, a.name)); var u = uniById(a.uni); t.appendChild(el("small", null, [u ? (u.short || u.name) : "", a.program, a.year ? a.year + "-kurs" : ""].filter(Boolean).join(" · "))); top.appendChild(t); c.appendChild(top);
    if(a.text) c.appendChild(el("p", null, a.text));
    var b = el("a", "btn navy"); b.href = "https://t.me/" + tgHandle(a.telegram); b.target = "_blank"; b.rel = "noopener"; b.appendChild(el("span", null, "Telegram'da yozish")); b.appendChild(ic("send")); c.appendChild(b);
    return c;
  }
  function ambView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("users", "Talaba-elchilar"));
    H.appendChild(heroTitle("Italiyada o'qiyotgan talabalarga yozing"));
    H.appendChild(el("p", "lead", "Universitet, shahar, uy va hayot haqida hozir o'sha yerda o'qiyotgan o'zbek talabalardan so'rang. Har bir elchi roziligi bilan ko'rsatilgan."));
    var A0 = realAmb();
    if(!A0.length) main.appendChild(callout({style:"info", text:"Elchilar ro'yxati tez orada shu yerda chiqadi. Hozircha savollaringizni " + tgName() + " ga yozing."}));
    else { var by = {}; A0.forEach(function(a){ (by[a.uni] = by[a.uni] || []).push(a); });
      Object.keys(by).forEach(function(k){ var u = uniById(k), g = el("div", "amb-grid"); by[k].forEach(function(a){ g.appendChild(ambCard(a)); }); main.appendChild(sec(secHead(u ? (u.short || u.name) : "Boshqa", u ? "Universitet" : null, u ? "uni-" + u.id : null, null, u ? ((cityById(u.city) || {}).name || "") : ""), g)); }); }
    main.appendChild(rowBtn("send", "Italiyada o'qiysizmi? Elchi bo'ling", "Yangi kelayotgan talabalarga yordam bering: " + tgName() + " ga yozing", null, tgUrl()));
    footer(main);
  }
  var RES = {qabul:["Qabul qilindi","ok"], rad:["Rad etildi","hot"], kutish:["Kutilmoqda","lang"]};
  function realOut(uid){ return arr(S.out).filter(function(o){ return o && o.consent && str(o.uni) && RES[o.result] && (!uid || o.uni === uid); }); }
  function outCard(o){
    var u = uniById(o.uni), c = el("article", "outc");
    var h = el("div", "pf-h"); h.appendChild(el("b", null, u ? (u.short || u.name) : o.uni)); h.appendChild(el("span", "tag " + RES[o.result][1], RES[o.result][0])); c.appendChild(h);
    c.appendChild(el("p", null, [o.level, o.program, o.year].filter(function(x){ return str(x); }).join(" · ")));
    var dl = el("dl", "ic-rows"); [["IELTS", o.ielts], ["Baho", o.gpa], ["Stipendiya", o.scholarship]].forEach(function(r){ if(!str(r[1])) return; var d = el("div"); d.appendChild(el("dt", null, r[0])); d.appendChild(el("dd", null, r[1])); dl.appendChild(d); }); c.appendChild(dl);
    if(o.note) c.appendChild(el("p", "ic-note", o.note));
    return c;
  }
  function outView(main){
    var H = hero({cls:"compact", scene:"town", narrow:true});
    H.appendChild(kicker("check", "Haqiqiy natijalar"));
    H.appendChild(heroTitle("Uniroad talabalari natijalari"));
    H.appendChild(el("p", "lead", "Talabalarimiz qayerga, qanday baho va IELTS bilan topshirgani va natijasi. Ismlar ko'rsatilmaydi, har bir natija talabaning roziligi bilan qo'shiladi."));
    var O = realOut();
    if(!O.length){ main.appendChild(callout({style:"info", text:"Natijalar to'planmoqda. Bu yerda faqat haqiqiy natijalar chiqadi: biror raqam o'ylab topilmaydi."})); footer(main); return; }
    var acc = O.filter(function(o){ return o.result === "qabul"; }).length, sch = O.filter(function(o){ return str(o.scholarship) && !/^yo'?q$/i.test(str(o.scholarship)); }).length, dec = O.filter(function(o){ return o.result !== "kutish"; }).length;
    var sg = el("div", "about-stats"); [[O.length, "ariza natijasi"], [acc, "qabul qilindi"], [dec ? Math.round(acc / dec * 100) + "%" : "—", "qabul ulushi (javob kelganlardan)"], [sch, "stipendiya bilan"]].forEach(function(x){ var d = el("div"); d.appendChild(el("b", null, String(x[0]))); d.appendChild(el("small", null, x[1])); sg.appendChild(d); }); main.appendChild(sg);
    var lv = "", fl = el("div", "onb-opts"), g = el("div", "outc-grid");
    function draw(){ g.textContent = ""; O.filter(function(o){ return !lv || o.level === lv; }).forEach(function(o){ g.appendChild(outCard(o)); }); }
    [["","Hammasi"],["Foundation","Foundation"],["Bakalavr","Bakalavr"],["Magistratura","Magistratura"]].forEach(function(x){ var b = el("button", "chipf" + (x[0] === lv ? " on" : ""), x[1]); b.type = "button"; b.onclick = function(){ lv = x[0]; Array.prototype.forEach.call(fl.children, function(y){ y.classList.remove("on"); }); b.classList.add("on"); draw(); }; fl.appendChild(b); });
    draw(); main.appendChild(fl); main.appendChild(g);
    main.appendChild(el("p", "muted-note", "O'tgan natijalar kelajakdagi qabulga kafolat emas: talablar har yili o'zgaradi."));
    main.appendChild(rowBtn("star", "O'z imkoniyatingizni ko'ring", "Bepul profil tahlili", "g", "#profil"));
    footer(main);
  }
  function evStart(e){ var d = deadline(e.date); if(!d) return null; var m = str(e.time).match(/^(\d{1,2}):(\d{2})/); /* Tashkent = UTC+5 */ return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), m ? +m[1] - 5 : 9, m ? +m[2] : 0)); }
  function evList(){ return arr(S.ev).filter(function(e){ return e && str(e.title) && evStart(e); }).map(function(e){ return {e:e, s:evStart(e)}; }).sort(function(a, b){ return a.s - b.s; }); }
  function evCard(x, past){
    var e = x.e, c = el("article", "evc" + (past ? " past" : ""));
    var w = el("div", "ev-when"); w.appendChild(el("b", null, e.date)); w.appendChild(el("small", null, (str(e.time) || "") + " (Toshkent)")); c.appendChild(w);
    var t = el("div", "ev-tx"); t.appendChild(el("b", null, e.title)); if(e.where) t.appendChild(el("small", null, e.where)); if(e.desc) t.appendChild(el("p", null, e.desc));
    var bx = el("div", "ic-btns");
    if(past){ var r = safeUrl(e.recording); if(r) bx.appendChild(btn("line", "play", "Yozuvni ko'rish", r)); }
    else { var l = safeUrl(e.link); if(l) bx.appendChild(btn("gold", "link", "Qatnashish", l)); t.appendChild(calAdd({title:"Uniroad efiri: " + e.title, start:x.s, details:str(e.desc) + (l ? "\n" + l : "")})); }
    t.appendChild(bx); c.appendChild(t); return c;
  }
  function eventsView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("chat", "Jonli savol-javob"));
    H.appendChild(heroTitle("Jonli efirlar"));
    H.appendChild(el("p", "lead", "Ariza, viza va stipendiya bo'yicha jonli efirlar: savolingizni bevosita bering."));
    var L = evList(), now = new Date(), up = L.filter(function(x){ return x.s.getTime() + 3600000 >= now.getTime(); }), past = L.filter(function(x){ return x.s.getTime() + 3600000 < now.getTime(); }).reverse();
    if(up.length){ var g = el("div", "ev-list"); up.forEach(function(x){ g.appendChild(evCard(x, false)); }); main.appendChild(sec(secHead("Keyingi efirlar", null, null, null, "Rejada"), g)); }
    else main.appendChild(callout({style:"info", text:"Yangi efir e'lon qilinganda shu yerda chiqadi. E'lonlarni Telegram'da kuzating: " + tgName() + "."}));
    var pr = past.filter(function(x){ return safeUrl(x.e.recording); });
    if(pr.length){ var g2 = el("div", "ev-list"); pr.forEach(function(x){ g2.appendChild(evCard(x, true)); }); main.appendChild(sec(secHead("O'tgan efirlar yozuvlari", null, null, null, "Arxiv"), g2)); }
    footer(main);
  }

  /* ================= SETTINGS (grouped list, like native apps) ================= */
  function applyTheme(t){ var r = document.documentElement; if(t === "light" || t === "dark") r.setAttribute("data-theme", t); else r.removeAttribute("data-theme"); }
  function lsGet(k){ try{ return LS.getItem(k) || ""; }catch(e){ return ""; } }
  function lsSet(k, v){ try{ if(v) LS.setItem(k, v); else LS.removeItem(k); }catch(e){} }
  /* unknown address: say so plainly and offer the main doors */
  function notFoundView(main, r){
    pageHead(main, "Sahifa topilmadi", "«#" + str(r.path).slice(0, 60) + "» manzilida sahifa yo'q. Havola eskirgan yoki xato yozilgan bo'lishi mumkin. Quyidagi bo'limlardan birini tanlang:");
    var l = el("div", "links");
    l.appendChild(rowBtn("home", "Bosh sahifa", "Qayerdan boshlashni ko'rsatadi", null, "#"));
    l.appendChild(rowBtn("book", "Qo'llanma", "Italiyada o'qish 8 qadamda", null, "#qollanma"));
    l.appendChild(rowBtn("uni", "Universitetlar", S.unis.length + " ta universitet, muddatlar va ariza havolalari", null, "#universitetlar"));
    l.appendChild(rowBtn("coin", "Stipendiya", "Viloyatlar bo'yicha DSU stipendiyalari", null, "#stipendiya"));
    main.appendChild(l);
  }
  function settingsView(main){
    var H = el("div", "st-head");
    var av = el("span", "st-av"); av.innerHTML = markSVG(); H.appendChild(av);
    var ht = el("div"); ht.appendChild(el("h1", null, "Sozlamalar")); ht.appendChild(el("p", null, "Mehmon rejimi · ma'lumotlar shu qurilmada saqlanadi")); H.appendChild(ht);
    main.appendChild(H);
    var acc = el("a", "st-acc"); acc.href = "#rejam"; var ai = el("span", "st-ic c-navy"); ai.appendChild(ic("heart")); acc.appendChild(ai);
    var at = el("span", "st-tx"); at.appendChild(el("b", null, "Mening rejam")); at.appendChild(el("small", null, ME ? lvlName(ME.lvl) + (ME.year && ME.year !== "x" ? ", " + ME.year + " kuzi" : "") + " · " + FAV.length + " ta universitet" : "Shaxsiy panelni sozlang")); acc.appendChild(at); acc.appendChild(ic("next", "st-chev"));
    main.appendChild(acc);

    function group(title, foot){ var g = el("section", "st-group"); if(title) g.appendChild(el("h2", "st-gt", title)); var l = el("div", "st-list"); g.appendChild(l); if(foot) g.appendChild(el("p", "st-foot", foot)); main.appendChild(g); return l; }
    function row(list, icon, color, label, o){
      o = o || {};
      var r = el(o.href ? "a" : o.toggle || o.onclick ? "button" : "div", "st-row" + (o.danger ? " danger" : ""));
      if(o.href){ r.href = o.href; if(/^https:/.test(o.href)){ r.target = "_blank"; r.rel = "noopener"; } }
      else if(r.tagName === "BUTTON") r.type = "button";
      var t = el("span", "st-ic " + color); t.appendChild(ic(icon)); r.appendChild(t);
      var tx = el("span", "st-tx"); tx.appendChild(el("b", null, label)); if(o.sub) tx.appendChild(el("small", null, o.sub)); r.appendChild(tx);
      if(o.toggle){ var on = !!o.toggle.get(); var sw = el("span", "st-sw" + (on ? " on" : "")); r.setAttribute("role", "switch"); r.setAttribute("aria-checked", on ? "true" : "false"); r.appendChild(sw);
        r.onclick = function(){ on = !on; sw.classList.toggle("on", on); r.setAttribute("aria-checked", on ? "true" : "false"); o.toggle.set(on); }; }
      else { if(o.value != null) r.appendChild(el("span", "st-val", o.value)); if(o.href || o.onclick) r.appendChild(ic(o.href && /^https:/.test(o.href) ? "out" : "next", "st-chev")); if(o.onclick) r.onclick = o.onclick; }
      list.appendChild(r); return r;
    }

    /* To'lov: one row */
    if(plansOn()){
      var gp = group(null);
      row(gp, "wallet", "c-gold", "To'lov", {sub: plans().map(function(p){ return p.name; }).join(" · "), value: str(plans()[0].name), href: "#tariflar"});
    }

    /* Ko'rinish */
    var g1 = group("Ko'rinish");
    var tr = el("div", "st-row st-seg-row"); var ti = el("span", "st-ic c-indigo"); ti.appendChild(ic("moon")); tr.appendChild(ti); var tt = el("span", "st-tx"); tt.appendChild(el("b", null, "Mavzu")); tr.appendChild(tt);
    var seg = el("div", "st-seg"), th = lsGet("uprep-theme");
    [["", "Avto"], ["light", "Yorug'"], ["dark", "Qorong'i"]].forEach(function(o){ var b = el("button", o[0] === th ? "on" : "", o[1]); b.type = "button"; b.setAttribute("aria-pressed", o[0] === th ? "true" : "false"); b.onclick = function(){ Array.prototype.forEach.call(seg.children, function(x){ x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); }); b.classList.add("on"); b.setAttribute("aria-pressed", "true"); lsSet("uprep-theme", o[0]); applyTheme(o[0]); }; seg.appendChild(b); });
    tr.appendChild(seg); g1.appendChild(tr);
    row(g1, "type", "c-blue", "Katta matn", {sub:"Barcha sahifalarda shriftni kattalashtiradi", toggle:{get:function(){ return document.documentElement.classList.contains("bigtext"); }, set:function(v){ document.documentElement.classList.toggle("bigtext", v); lsSet("uprep-big", v ? "1" : ""); }}});
    row(g1, "zap", "c-orange", "Animatsiyalarni kamaytirish", {sub:"Tinchroq ko'rinish, batareyani tejaydi", toggle:{get:function(){ return document.documentElement.classList.contains("calm"); }, set:function(v){ document.documentElement.classList.toggle("calm", v); lsSet("uprep-calm", v ? "1" : ""); }}});

    /* Eslatmalar */
    var g2 = group("Eslatmalar", "Muddatlar telefoningiz kalendariga 7 kun va 1 kun oldin eslatma bilan qo'shiladi.");
    var FD = favDeadlines();
    row(g2, "cal", "c-indigo", "Kalendarga obuna va bildirishnomalar", {sub:"Muddatlar kalendaringizga o'zi tushadi va yangilanadi", href:"#bildirishnomalar"});
    row(g2, "bell", "c-red", "Muddatlarni kalendarga qo'shish", {value: FD.length ? FD.length + " ta" : "Yo'q", onclick:function(){ if(!FD.length){ toast("Avval universitet saqlang: muddatlari shu yerda chiqadi."); go("universitetlar"); return; } icsDownload(FD.map(function(x){ return {title:(x.u.short || x.u.name) + ": " + x.x.label, d:x.d, details:x.x.label + " (" + x.x.date + ")"}; }), "uprep-muddatlar"); }});
    if(evList().length) row(g2, "chat", "c-purple", "Jonli efirlar", {href:"#efirlar"});

    /* Ma'lumotlarim */
    var dm = docsMeter();
    var g3 = group("Mening ma'lumotlarim", "Login ishga tushguncha ma'lumotlaringiz faqat shu brauzerda. Telefon almashtirsangiz, zaxira faylini yangi qurilmada «Tiklash» orqali oching.");
    row(g3, "list", "c-green", "Saqlangan ma'lumotlar", {sub: FAV.length + " universitet · " + Object.keys(TR).length + " ariza kuzatuvda · " + (dm ? dm.done + "/" + dm.all : "0") + " hujjat belgilangan"});
    row(g3, "download", "c-teal", "Zaxira nusxasini yuklab olish", {onclick:function(){ var o = {app:"uprep", v:1, saved:new Date().toISOString(), data:{}}; LS.keys().forEach(function(k){ o.data[k] = LS.getItem(k); });
      var a = el("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], {type:"application/json"})); a.download = "uprep-zaxira-" + todayStr().replace(/\./g, "-") + ".json"; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 500); toast("Zaxira fayli yuklandi. Uni xavfsiz joyda saqlang."); }});
    var fi = el("input"); fi.type = "file"; fi.accept = ".json,application/json"; fi.hidden = true; main.appendChild(fi);
    fi.onchange = function(){ var f = fi.files && fi.files[0]; if(!f) return; var r = new FileReader(); r.onload = function(){ try{ var o = JSON.parse(r.result); if(!o || o.app !== "uprep" || typeof o.data !== "object") throw 0; var n = 0; Object.keys(o.data).forEach(function(k){ if(/^uprep-/.test(k) && typeof o.data[k] === "string"){ LS.setItem(k, o.data[k]); n++; } }); toast(n + " ta yozuv tiklandi. Sahifa yangilanmoqda…"); setTimeout(function(){ location.reload(); }, 1200); }catch(e){ toast("Bu fayl Uniroad zaxirasi emas."); } }; r.readAsText(f); };
    row(g3, "upload", "c-blue", "Zaxiradan tiklash", {onclick:function(){ fi.click(); }});
    row(g3, "trash", "c-red", "Barcha ma'lumotlarimni o'chirish", {danger:true, onclick:function(){ if(!confirm("Rejangiz, ariza holatlari, belgilangan hujjatlar va test javoblari shu qurilmadan o'chiriladi. Davom etasizmi?")) return; LS.keys().forEach(function(k){ LS.removeItem(k); }); try{ Object.keys(localStorage).forEach(function(k){ if(/^uprep-/.test(k)) localStorage.removeItem(k); }); }catch(e){} toast("Ma'lumotlar o'chirildi."); setTimeout(function(){ location.hash = ""; location.reload(); }, 900); }});

    /* Sayt */
    var g4 = group("Sayt");
    var standalone = window.matchMedia && matchMedia("(display-mode: standalone)").matches, ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    row(g4, "share", "c-green", "Do'stlarga ulashish", {onclick:function(){ var u = location.origin + location.pathname, t = "Uniroad: Italiyada o'qish, o'zbek tilida"; if(navigator.share) navigator.share({title:t, url:u}).catch(function(){}); else window.open("https://t.me/share/url?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(t), "_blank", "noopener"); }});
    row(g4, "languages", "c-purple", "Til", {value:"O'zbekcha", sub:"Rus tilidagi versiya tayyorlanmoqda"});
    if(LIVE) row(g4, "user", "c-gold", "Hisob", {href:A.user ? "#hisob" : "#kirish", value:A.user ? "Kirgansiz" : "Kirish"});

    /* Yordam */
    var g5 = group("Yordam");
    row(g5, "send", "c-blue", "Telegram'da yozish", {value:tgName(), href:tgUrl()});
    row(g5, "help", "c-orange", "Muammo haqida xabar berish", {sub:"Xato yoki ishlamayotgan joy", href:"#xabar?tur=xato"});
    row(g5, "chat", "c-purple", "Fikr yoki taklif bildirish", {href:"#xabar?tur=taklif"});
    row(g5, "users", "c-teal", "Biz haqimizda", {href:"#biz-haqimizda"});
    row(g5, "book", "c-indigo", "Italiyada o'qish noldan (PDF)", {href:"#noldan"});

    /* Maxfiylik */
    var g6 = group("Maxfiylik", "Saytda reklama va kuzatuv kodi yo'q. Profil tahlili, kalkulyator va rejangiz faqat shu qurilmada hisoblanadi. Faqat o'zingiz «yuborish» tugmasini bosgan xabar bizga keladi.");
    row(g6, "shield", "c-green", "Ma'lumotlaringiz himoyalangan", {value:"Faqat qurilmada"});
    row(g6, "doc", "c-navy", "Maxfiylik siyosati", {href:"#maxfiylik"});
    main.appendChild(el("p", "st-ver", "Uniroad · ma'lumotlar " + (S.site.updated || "") + " holatiga"));
    footer(main);
  }

  /* ================= TEMPLATES (PDF + Word) ================= */
  var TPL = [
    ["cv-shablon", "doc", "CV shabloni", "Ingliz tilida, Europass uslubida. 1-qadam: universitetga ariza", "s1"],
    ["motivatsion-xat-tuzilmasi", "text", "Motivatsion xat: tuzilma va namunalar", "5 bo'lim, namuna jumlalar va ko'p xatolar", "s1"],
    ["homiy-xati", "wallet", "Homiylik va e'tirozsizlik xati", "Viza uchun: ota-ona yoki homiy imzolaydi. 5-qadam", "s4"],
    ["oila-hujjatlari-royxati", "checklist", "Stipendiya uchun oila hujjatlari ro'yxati", "Tarjimonga berish va belgilab borish uchun. 6-qadam", "s5"]
  ];
  function tplView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("doc", "Bepul · Word va PDF"));
    H.appendChild(heroTitle("Hujjat shablonlari"));
    H.appendChild(el("p", "lead", "Yuklab oling, [ ] ichidagilarni o'zingiznikiga almashtiring. Word faylini tahrirlaysiz, PDF esa ko'rish va chop etish uchun."));
    var g = el("div", "tpl-grid");
    TPL.forEach(function(t){
      var c = el("article", "tpl");
      var hd = el("div", "tpl-h"); var i = el("span", "ic"); i.appendChild(ic(t[1])); hd.appendChild(i); var tx = el("div"); tx.appendChild(el("b", null, t[2])); tx.appendChild(el("small", null, t[3])); hd.appendChild(tx); c.appendChild(hd);
      var bx = el("div", "ic-btns");
      var w = btn("navy", "download", "Word", "media/shablonlar/" + t[0] + ".docx"); w.setAttribute("download", ""); bx.appendChild(w);
      var pd = btn("line", "download", "PDF", "media/shablonlar/" + t[0] + ".pdf"); pd.setAttribute("download", ""); bx.appendChild(pd);
      c.appendChild(bx); g.appendChild(c);
    });
    main.appendChild(g);
    main.appendChild(rowBtn("text", "Motivatsion xatni shu yerda yozing", "8 ta savol: sayt xat qoralamasini tuzib beradi", "g", "#xat"));
    main.appendChild(callout({style:"info", text:"Shablonlar namunadir. Har bir universitet va elchixonaning amaldagi talabini tekshiring: masalan, homiylik xati uchun tarjima yoki notarial tasdiq kerakligi."}));
    footer(main);
  }

  /* ================= MOTIVATION LETTER BUILDER ================= */
  var XQ = [
    ["name", "Ismingiz va familiyangiz", "Aziz Karimov", false],
    ["prog", "Dastur nomi", "Economics and Management", false],
    ["uni", "Universitet", "University of Turin", false],
    ["story", "Bu yo'nalishga qanday qiziqib qoldingiz? Haqiqiy voqea yozing", "When I helped my father plan the budget of his small shop, I realised…", true],
    ["prep", "Nimalar qilgansiz: fanlar, loyiha, olimpiada, ish", "I took part in the regional economics olympiad and built a simple sales tracker in Excel…", true],
    ["result", "Bundan nima natija yoki ko'nikma oldingiz", "I learned to work with data and present results clearly…", true],
    ["whyuni", "Nega aynan shu universitet? 2 ta aniq sabab", "its course in development economics and the chance to join the …", true],
    ["whyit", "Nega Italiya?", "Italy combines strong public universities with…", true],
    ["goal", "O'qishdan keyingi maqsadingiz", "work in a bank's risk department and later help small businesses in Uzbekistan…", true]
  ];
  var XA = {};
  try{ XA = JSON.parse(LS.getItem("uprep-xat") || "{}") || {}; }catch(e){ XA = {}; }
  function xatText(){
    function v(k, d){ return str(XA[k]) || "[" + d + "]"; }
    function s(t){ t = str(t); return t && !/[.!?]$/.test(t) ? t + "." : t; }
    return "Dear Admissions Committee,\n\n" +
      "I am writing to apply for the " + v("prog", "Programme") + (/programme|program|degree|course/i.test(str(XA.prog)) ? "" : " programme") + " at " + v("uni", "University") + ". " + s(v("story", "A real moment that brought you to this field")) + "\n\n" +
      "Since then, I have worked to build a solid foundation for this path. " + s(v("prep", "Subjects, projects, olympiads, work")) + " " + s(v("result", "What you learned or achieved")) + "\n\n" +
      "I am applying to " + v("uni", "University") + " because of " + s(v("whyuni", "Two concrete reasons")) + " " + s(v("whyit", "Why Italy")) + "\n\n" +
      "After graduating, I plan to " + s(v("goal", "Your goal")) + " I believe this programme is the right next step towards that goal, and I would be proud to contribute to the academic community at " + v("uni", "University") + ".\n\n" +
      "Thank you for considering my application.\n\nSincerely,\n" + v("name", "Full name");
  }
  function xatView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("text", "Bepul · 10 daqiqa"));
    H.appendChild(heroTitle("Motivatsion xat konstruktori"));
    H.appendChild(el("p", "lead", "Savollarga ingliz tilida javob bering: sayt ularni to'g'ri tuzilmadagi xatga yig'adi. Keyin xatni o'zingiz tahrirlaysiz va boyitasiz."));
    var lay = el("div", "split xat-split"), colA = el("div", "split-main"), colB = el("aside", "split-side"); lay.appendChild(colA); lay.appendChild(colB); main.appendChild(lay);
    var f = el("section", "card"); f.appendChild(el("h3", null, "Savollar")); f.appendChild(el("p", "note", "Javoblar faqat shu qurilmada saqlanadi. O'zbekcha yozsangiz ham bo'ladi, keyin tarjima qilasiz."));
    var form = el("div", "form");
    var out = el("textarea", "xat-out"); out.rows = 22; out.setAttribute("aria-label", "Xat qoralamasi");
    var wc = el("p", "note");
    function upd(){ out.value = xatText(); var n = out.value.split(/\s+/).filter(Boolean).length; wc.textContent = n + " so'z · odatda 400–700 so'z (universitet chegarasini tekshiring)"; try{ LS.setItem("uprep-xat", JSON.stringify(XA)); }catch(e){} }
    XQ.forEach(function(q){
      var l = el("label", "fld"); l.appendChild(el("span", null, q[1]));
      var i = q[3] ? el("textarea") : el("input"); if(q[3]) i.rows = 3; else i.type = "text";
      i.placeholder = q[2]; i.value = str(XA[q[0]]); i.oninput = function(){ XA[q[0]] = i.value; upd(); };
      l.appendChild(i); form.appendChild(l);
    });
    f.appendChild(form); colA.appendChild(f);
    var o = el("section", "card"); o.appendChild(el("h3", null, "Xat qoralamasi")); o.appendChild(out); o.appendChild(wc);
    var bx = el("div", "ic-btns");
    var cp = btn("navy", "doc", "Nusxalash", null, function(){ copyText(out.value).then(function(){ toast("Xat nusxalandi."); }); }); bx.appendChild(cp);
    var dl = btn("line", "download", "Word'da yuklab olish", null, function(){
      var h = "<html><head><meta charset='utf-8'></head><body style=\"font-family:Calibri;font-size:11pt\">" + out.value.split("\n").map(function(l){ return "<p>" + l.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</p>"; }).join("") + "</body></html>";
      var a = el("a"); a.href = URL.createObjectURL(new Blob(["﻿" + h], {type:"application/msword"})); a.download = "motivatsion-xat.doc"; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 400); });
    bx.appendChild(dl); o.appendChild(bx);
    o.appendChild(callout({style:"warn", text:"Bu faqat qoralama. Xatni o'z so'zlaringiz bilan boyiting, aniq misollar qo'shing va universitet nomini tekshiring: komissiya umumiy shablonni darhol sezadi."}));
    if(plansOn()) o.appendChild(rowBtn("star", "Xatingizni biz tekshirib beraylikmi?", "Plus tarifida yoki alohida xizmat sifatida", null, "#tariflar"));
    colB.appendChild(o);
    upd();
    main.appendChild(rowBtn("doc", "Boshqa shablonlar", "CV, homiylik xati, oila hujjatlari ro'yxati", null, "#shablonlar"));
    footer(main);
  }

  /* ================= COMPARE universities ================= */
  var CMP = [];
  try{ CMP = JSON.parse(LS.getItem("uprep-cmp") || "[]") || []; }catch(e){ CMP = []; }
  function saveCmp(){ try{ LS.setItem("uprep-cmp", JSON.stringify(CMP)); }catch(e){} }
  function cmpBtn(u, cls){
    var b = el("button", "btn " + (cls || "glass")); b.type = "button";
    function paint(){ var on = CMP.indexOf(u.id) >= 0; b.textContent = ""; b.appendChild(el("span", null, on ? "Taqqoslashda" : "Taqqoslash")); b.appendChild(ic(on ? "check" : "list")); b.setAttribute("aria-pressed", on ? "true" : "false"); }
    b.onclick = function(){ var i = CMP.indexOf(u.id); if(i >= 0) CMP.splice(i, 1); else { if(CMP.length >= 3) CMP.shift(); CMP.push(u.id); } saveCmp(); paint(); toast(CMP.indexOf(u.id) >= 0 ? "Taqqoslashga qo'shildi (" + CMP.length + "/3)" : "Taqqoslashdan olindi"); };
    paint(); return b;
  }
  function compareView(main){
    var H = hero({cls:"compact", scene:"town", narrow:true});
    H.appendChild(kicker("list", "3 tagacha universitet"));
    H.appendChild(heroTitle("Universitetlarni taqqoslash"));
    H.appendChild(el("p", "lead", "Dasturlar, muddatlar, to'lovlar va stipendiyani yonma-yon ko'ring."));
    var pick = el("div", "cmp-pick"); main.appendChild(pick);
    var box = el("div", "cmp"); main.appendChild(box);
    var sorted = S.unis.slice().sort(function(a, b){ return str(a.short).localeCompare(str(b.short)); });
    function draw(){
      pick.textContent = ""; box.textContent = "";
      for(var i = 0; i < 3; i++){ (function(i){
        var s = el("select", "cityselect"); s.setAttribute("aria-label", (i + 1) + "-universitet");
        var o0 = el("option", null, (i + 1) + "-universitetni tanlang"); o0.value = ""; s.appendChild(o0);
        sorted.forEach(function(u){ var o = el("option", null, (u.short || u.name)); o.value = u.id; if(CMP[i] === u.id) o.selected = true; s.appendChild(o); });
        s.onchange = function(){ var v = s.value; var next = CMP.slice(); next[i] = v; CMP = next.filter(function(x, k){ return x && next.indexOf(x) === k; }); saveCmp(); draw(); };
        pick.appendChild(s);
      })(i); }
      var L = CMP.map(uniById).filter(Boolean);
      if(!L.length){ box.appendChild(el("div", "empty", "Kamida bitta universitet tanlang. Universitet sahifasidagi «Taqqoslash» tugmasi ham shu yerga qo'shadi.")); return; }
      box.style.setProperty("--n", L.length);
      function row(label, fn, cls){
        var r = el("div", "cmp-row" + (cls ? " " + cls : "")); r.appendChild(el("div", "cmp-k", label));
        L.forEach(function(u){ var v = fn(u); var c = el("div", "cmp-v"); if(v && v.nodeType) c.appendChild(v); else c.textContent = v || "—"; r.appendChild(c); }); box.appendChild(r);
      }
      row("", function(u){ var a = el("a", "cmp-h"); a.href = "#uni-" + u.id; a.appendChild(el("span", "u-mono", mono(u))); a.appendChild(el("b", null, u.short || u.name)); return a; }, "head");
      row("Shahar", function(u){ var c = cityById(u.city); return c ? c.name + ", " + c.region : ""; });
      row("Turi", function(u){ return u.type; });
      row("Ingliz tilidagi dasturlar", function(u){ var P = arr(u.programmes); return enN(u) ? enN(u) + " ta (bakalavr " + P.filter(function(p){ return p.level === "Bakalavr"; }).length + ", magistratura " + P.filter(function(p){ return p.level === "Magistratura"; }).length + ")" : "yo'q"; });
      row("Testsiz qabul", function(u){ var n = arr(u.programmes).filter(function(p){ return p.access === "Erkin qabul"; }).length; return n ? n + " ta dastur" : "—"; });
      row("Ariza to'lovi", function(u){ return u.fee; });
      row("O'qish narxi", function(u){ return u.tuition || "ISEE bo'yicha (stipendiya g'olibi to'lamaydi)"; });
      row("Eng yaqin muddat", function(u){ var n = uniNext(u); return n ? n.x.date + " (" + leftLabel(daysLeft(n.d)) + ")" : "Hali e'lon qilinmagan"; }, "hot");
      row("Stipendiya", function(u){ var c = cityById(u.city), a = c ? dsuFor(c.id) : null; return a ? (a.own ? "Universitetning o'zi" : a.name + (a.deadline ? " · " + a.deadline : "")) : ""; });
      row("Ingliz tili", function(u){ return u.english || "odatda B2"; });
      row("Testlar", function(u){ return u.tests; });
      row("", function(u){ var d = el("div", "cmp-act"); var au = safeUrl(u.applyUrl); if(au) d.appendChild(btn("gold", "link", "Ariza", au)); d.appendChild(btn("line", "book", "Dasturlar", "#uni-" + u.id + "/yonalishlar")); return d; }, "act");
    }
    draw();
    footer(main);
  }

  /* ================= REVIEWS + FEEDBACK + SHARE ================= */
  function realReviews(uid){ return arr(S.reviews).filter(function(r){ return r && r.consent && str(r.text) && (!uid || r.uni === uid); }); }
  function reviewCard(r){
    var c = el("figure", "rev");
    var q = el("blockquote"); q.textContent = "«" + str(r.text) + "»"; c.appendChild(q);
    var f = el("figcaption"); var ph = safeUrl(r.photo);
    if(ph){ var im = el("img"); im.src = ph; im.alt = ""; im.loading = "lazy"; f.appendChild(im); } else f.appendChild(el("span", "rev-av", str(r.name).charAt(0).toUpperCase()));
    var t = el("span"); t.appendChild(el("b", null, r.name)); var u = uniById(r.uni);
    t.appendChild(el("small", null, [u ? (u.short || u.name) : "", r.program, r.year].filter(Boolean).join(" · "))); f.appendChild(t); c.appendChild(f);
    return c;
  }
  function copyText(t){
    function legacy(){ var a = el("textarea"); a.value = t; a.setAttribute("readonly", ""); a.style.position = "fixed"; a.style.opacity = "0"; document.body.appendChild(a); a.select(); var ok = false; try{ ok = document.execCommand("copy"); }catch(e){} a.remove(); return ok; }
    try{ if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).catch(function(){ legacy(); }); }catch(e){}
    legacy(); return Promise.resolve();
  }
  /* ================= NOTIFICATIONS: deadlines + news + calendar subscriptions =================
     No push service is needed: the bell shows what is new since the last visit, and calendar feeds (cal/*.ics,
     built by scripts/build_ics.py) put deadlines into the visitor's own calendar, which refreshes itself. */
  var NOTIF = null;
  try{ NOTIF = JSON.parse(LS.getItem("uprep-notif") || "null"); }catch(e){ NOTIF = null; }
  if(!NOTIF || typeof NOTIF !== "object") NOTIF = {seen:"", ack:[]};
  if(!Array.isArray(NOTIF.ack)) NOTIF.ack = [];
  function saveNotif(){ try{ LS.setItem("uprep-notif", JSON.stringify(NOTIF)); }catch(e){} }
  function isoDay(d){ return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function feedUrl(path){ return location.origin + location.pathname.replace(/[^/]*$/, "") + path; }
  /* subscribe buttons: Google Calendar, Apple/Outlook (webcal), copy link */
  function subLinks(path, name, compact){
    var https = feedUrl(path), webcal = https.replace(/^https?:/, "webcal:");
    var w = el("div", "sub-links" + (compact ? " compact" : ""));
    var g = el("a", "sub-btn"); g.href = "https://calendar.google.com/calendar/render?cid=" + encodeURIComponent(webcal); g.target = "_blank"; g.rel = "noopener"; g.appendChild(ic("cal")); g.appendChild(el("span", null, "Google")); w.appendChild(g);
    var a = el("a", "sub-btn"); a.href = webcal; a.appendChild(ic("cal")); a.appendChild(el("span", null, "iPhone / Outlook")); w.appendChild(a);
    var c = el("button", "sub-btn"); c.type = "button"; c.appendChild(ic("link")); c.appendChild(el("span", null, "Havola")); c.onclick = function(){ copyText(https).then(function(){ toast("Obuna havolasi nusxalandi: kalendaringizda «URL orqali qo'shish»ga joylang."); }); }; w.appendChild(c);
    w.setAttribute("aria-label", (name || "Muddatlar") + ": kalendarga obuna");
    return w;
  }
  function newsItems(){ return arr(S.news).map(function(n){ return {n:n, d:deadline(n.date)}; }).sort(function(a, b){ return (b.d || 0) - (a.d || 0); }); }
  function urgentItems(days){
    var L = [];
    favDeadlines().forEach(function(x){ var n = daysLeft(x.d); if(n <= days) L.push({key:"u|" + x.u.id + "|" + x.x.label + "|" + x.x.date, d:x.d, n:n, title:(x.u.short || x.u.name) + ": " + x.x.label, href:"#uni-" + x.u.id + "/qabul", u:x.u}); });
    upcoming().forEach(function(c){ var n = daysLeft(c._d); if(n <= days) L.push({key:"c|" + c.date + "|" + c.text, d:c._d, n:n, title:(c.tag && str(c.text).indexOf(c.tag) !== 0 ? c.tag + ": " : "") + c.text, href:"#kalendar"}); });
    return L.sort(function(a, b){ return a.d - b.d; });
  }
  function isNewNews(x){
    if(!x.d) return false;
    if(NOTIF.seen) return isoDay(x.d) > NOTIF.seen;
    return daysLeft(x.d) >= -3; /* first visit: only the last few days */
  }
  function unreadCount(){
    var u = urgentItems(7).filter(function(x){ return NOTIF.ack.indexOf(x.key) < 0; }).length;
    var n = newsItems().filter(isNewNews).length;
    return u + (NOTIF.seen ? n : Math.min(n, 3)); /* a first-time visitor is not greeted with a wall of badges */
  }
  function updateBell(){
    var b = document.querySelector(".appbar .bellbtn"); if(!b) return;
    var n = 0; try{ n = unreadCount(); }catch(e){ n = 0; }
    var bd = b.querySelector(".bdg"); bd.hidden = !n; bd.textContent = n > 9 ? "9+" : String(n);
    b.setAttribute("aria-label", n ? "Bildirishnomalar, " + n + " ta yangi" : "Bildirishnomalar");
  }
  function notifView(main){
    pageHead(main, "Bildirishnomalar", "Yaqin muddatlar, yangiliklar va kalendaringizga avtomatik eslatmalar bir joyda.");
    var NI = newsItems(), U = urgentItems(14);
    /* 1. deadlines in the next 14 days */
    var box = el("div", "list");
    if(U.length) U.forEach(function(x){
      var a = el("a", "lrow"); a.href = x.href;
      if(x.u) a.appendChild(el("span", "u-mono", mono(x.u))); else { var ii = el("span", "ic"); ii.appendChild(ic("cal")); a.appendChild(ii); }
      var t = el("span", "txt"); t.appendChild(el("b", null, x.title)); t.appendChild(el("small", null, x.d.toLocaleDateString("ru-RU"))); a.appendChild(t);
      a.appendChild(el("span", "tag hot", leftLabel(x.n))); a.appendChild(ic("next", "chev")); box.appendChild(a);
    });
    else box.appendChild(el("div", "empty", "Keyingi 14 kunda muddat yo'q." + (FAV.length ? "" : " Universitet saqlasangiz, uning muddatlari ham shu yerda chiqadi.")));
    var hd1 = secHead("Yaqin 14 kun", "Kalendar", "kalendar", null, "Muddatlar", FAV.length ? "Saqlangan " + FAV.length + " ta universitetingiz va umumiy muddatlar." : "Umumiy muddatlar. Universitet saqlasangiz, uniki ham qo'shiladi.");
    main.appendChild(sec(hd1, box));
    /* 2. news */
    var nl = el("div", "list");
    NI.slice(0, 6).forEach(function(x){
      var n = x.n, a = el("a", "lrow"); var lk = safeUrl(n.link); a.href = lk || "#yangiliklar"; if(/^https:/.test(lk)){ a.target = "_blank"; a.rel = "noopener"; }
      var t = el("span", "txt"); var b = el("b", null, n.title); t.appendChild(b); t.appendChild(el("small", null, [n.tag, n.date].filter(Boolean).join(" · "))); a.appendChild(t);
      if(isNewNews(x)) a.appendChild(el("span", "tag new", "Yangi"));
      a.appendChild(ic(/^https:/.test(lk) ? "link" : "next", "chev")); nl.appendChild(a);
    });
    if(!NI.length) nl.appendChild(el("div", "empty", "Hozircha yangilik yo'q."));
    main.appendChild(sec(secHead("Yangiliklar", "Hammasi", "yangiliklar", null, "Yangi"), nl));
    /* 3. calendar subscriptions */
    var sb = el("div", "subs");
    var c1 = el("div", "sub-card"); c1.appendChild(el("b", null, "Asosiy muddatlar")); c1.appendChild(el("small", null, "Viza, Universitaly, stipendiya va yirik universitetlar")); c1.appendChild(subLinks("cal/muhim.ics", "Asosiy muddatlar")); sb.appendChild(c1);
    var favs = FAV.map(uniById).filter(Boolean);
    favs.forEach(function(u){ var c = el("div", "sub-card"); c.appendChild(el("b", null, u.short || u.name)); c.appendChild(el("small", null, arr(u.deadlines).length ? arr(u.deadlines).length + " ta muddat" : "Muddatlar e'lon qilinishi bilan qo'shiladi")); c.appendChild(subLinks("cal/uni/" + u.id + ".ics", u.short || u.name, true)); sb.appendChild(c); });
    if(!favs.length){ var c2 = el("a", "sub-card more"); c2.href = "#universitetlar"; c2.appendChild(el("b", null, "Universitetlaringiz muddatlari")); c2.appendChild(el("small", null, "Universitetni saqlang (♥): uning muddatlariga ham obuna shu yerda chiqadi")); sb.appendChild(c2); }
    var how = el("ul", "sub-how");
    ["Bir marta obuna bo'lasiz: muddatlar telefoningiz yoki kompyuteringiz kalendariga o'zi tushadi.", "Biz sanani yangilasak yoki yangi muddat qo'shsak, kalendaringiz ham o'zi yangilanadi (odatda bir kun ichida).", "iPhone va Outlook 7 kun va 1 kun oldin eslatadi. Google Kalendarda eslatmani yoqish: Sozlamalar → shu kalendar → Bildirishnomalar."].forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); how.appendChild(li); });
    main.appendChild(sec(secHead("Kalendaringizga avtomatik eslatma", null, null, "obuna", "Obuna", "Eslatmalar hech qanday ilovasiz, to'g'ridan-to'g'ri kalendaringizga keladi."), sb, how));
    main.appendChild(el("p", "muted-note", "Ma'lumotlar har hafta rasmiy manbalardan (universitetlar, MUR, elchixona, DSU) AI yordamida tekshiriladi; har bir sana rasmiy manba bilan tasdiqlanganidan keyingina saytga va kalendar obunalariga qo'shiladi. Oxirgi yangilanish: " + (S.site.updated || "—") + "."));
    /* everything shown here now counts as seen */
    NOTIF.seen = isoDay(TODAY); NOTIF.ack = urgentItems(7).map(function(x){ return x.key; }); saveNotif();
    setTimeout(updateBell, 0);
  }

  /* ================= PRIVACY POLICY (content/privacy.json) ================= */
  function privacyView(main){
    var P = S.privacy || {};
    function fill(t){ return str(t).replace(/\{telegram\}/g, tgName()).replace(/\{controller\}/g, str(P.controller) || "Uniroad loyihasi egasi"); }
    pageHead(main, P.title || "Maxfiylik siyosati", fill(P.lead));
    if(P.updated) main.appendChild(el("p", "muted-note", "Oxirgi yangilanish: " + P.updated));
    var art = el("article", "card policy");
    arr(P.sections).forEach(function(x){
      art.appendChild(el("h2", null, str(x.h)));
      art.appendChild(paras(fill(x.p)));
      var ls = arr(x.links).filter(function(l){ return safeUrl(l.url); });
      if(ls.length){ var ul = el("ul", "policy-links"); ls.forEach(function(l){ var li = el("li"), a = el("a", null, str(l.label)); a.href = safeUrl(l.url); a.target = "_blank"; a.rel = "noopener"; li.appendChild(a); ul.appendChild(li); }); art.appendChild(ul); }
    });
    main.appendChild(art);
  }

  /* ================= FEEDBACK: problem report / suggestion / question -> Telegram (via relay) ================= */
  var FBK = [["xato","Muammo"],["taklif","Taklif"],["savol","Savol"],["fikr","Fikr"]];
  function feedbackForm(preset){
    var FB = window.UprepFeedback, relay = relayOn();
    var c = el("section", "card fb");
    var form = el("form", "form fb-form"); form.noValidate = true;
    var d0 = FB ? FB.getDraft() : null;
    var st = { kind: (d0 && d0.kind) || preset || "xato" };
    if(FBK.map(function(k){ return k[0]; }).indexOf(st.kind) < 0) st.kind = "xato";

    /* type */
    var seg = el("div", "fb-seg"); seg.setAttribute("role", "radiogroup"); seg.setAttribute("aria-label", "Xabar turi");
    FBK.forEach(function(k){
      var b = el("button", "fb-k" + (st.kind === k[0] ? " on" : ""), k[1]); b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", st.kind === k[0] ? "true" : "false");
      b.onclick = function(){ st.kind = k[0]; Array.prototype.forEach.call(seg.children, function(x){ x.classList.remove("on"); x.setAttribute("aria-checked", "false"); }); b.classList.add("on"); b.setAttribute("aria-checked", "true"); tx.placeholder = PH[k[0]]; keep(); };
      seg.appendChild(b);
    });
    var lk = el("div", "fld"); lk.appendChild(el("span", null, "Turi")); lk.appendChild(seg); form.appendChild(lk);

    /* text */
    var PH = { xato:"Nima bo'ldi? Qaysi sahifada? Masalan: «Kalkulyatorda Hisoblash tugmasi ishlamayapti»", taklif:"Saytga nima qo'shsak foydali bo'ladi?", savol:"Savolingizni yozing: javobni Telegram orqali beramiz", fikr:"Sayt haqida fikringiz" };
    var MAX = 3000;
    var tx = el("textarea"); tx.id = "fb-text"; tx.rows = 6; tx.maxLength = MAX; tx.placeholder = PH[st.kind]; tx.setAttribute("aria-describedby", "fb-count");
    var l3 = el("label", "fld"); l3.htmlFor = "fb-text"; l3.appendChild(el("span", null, "Xabar")); l3.appendChild(tx);
    var cnt = el("small", "fld-h fb-count"); cnt.id = "fb-count"; l3.appendChild(cnt); form.appendChild(l3);

    /* optional contact */
    var ct = el("input"); ct.type = "text"; ct.id = "fb-contact"; ct.placeholder = "@username yoki +998… (ixtiyoriy)"; ct.autocomplete = "off"; ct.maxLength = 100;
    var l2 = el("label", "fld"); l2.htmlFor = "fb-contact"; l2.appendChild(el("span", null, "Javob olish uchun aloqa (ixtiyoriy)")); l2.appendChild(ct);
    l2.appendChild(el("small", "fld-h", "Bo'sh qoldirsangiz, xabar anonim boradi.")); form.appendChild(l2);

    /* honeypot: invisible to people, bots fill it */
    var hp = el("input"); hp.type = "text"; hp.name = "website"; hp.tabIndex = -1; hp.autocomplete = "off"; hp.className = "fb-hp"; hp.setAttribute("aria-hidden", "true"); form.appendChild(hp);

    /* what is sent */
    var det = el("details", "fb-what"); det.appendChild(el("summary", null, "Xabar bilan nima yuboriladi?"));
    var ul = el("ul"); ["Siz yozgan matn va tanlagan turingiz", "Aloqa: faqat o'zingiz yozsangiz", "Sayt versiyasi, sana va vaqt", "Qurilma turi va brauzer (masalan, «Android · Chrome»), til va ochiq sahifa"].forEach(function(t){ ul.appendChild(el("li", null, t)); });
    det.appendChild(ul); det.appendChild(el("p", null, "Ismingiz, telefoningiz yoki boshqa shaxsiy ma'lumot o'zingiz yozmaguningizcha yuborilmaydi. Xabar faqat Uniroad jamoasining Telegramiga boradi.")); var pv = el("a", null, "Maxfiylik siyosati"); pv.href = "#maxfiylik"; det.appendChild(pv);
    form.appendChild(det);

    var status = el("div", "fb-status"); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite"); form.appendChild(status);
    var row = el("div", "fb-actions");
    var sb = el("button", "btn gold fb-send"); sb.type = "submit"; var sl = el("span", null, relay ? "Yuborish" : "Telegram orqali yuborish"); sb.appendChild(sl); sb.appendChild(ic("send")); row.appendChild(sb);
    form.appendChild(row);
    if(!relay) form.appendChild(el("p", "note", "Avtomatik yuborish hali sozlanmagan: matn nusxalanadi va " + tgName() + " chati ochiladi."));

    /* draft: restore and keep */
    function say(kind, text, extra){ status.textContent = ""; status.className = "fb-status" + (kind ? " " + kind : ""); if(!text) return; status.appendChild(ic(kind === "ok" ? "check" : kind === "err" ? "stop" : "info")); var sp = el("span", null, text); if(extra) sp.appendChild(extra); status.appendChild(sp); }
    function count(){ var n = tx.value.length; cnt.textContent = n + " / " + MAX; cnt.classList.toggle("near", n > MAX * 0.9); }
    var kt = null;
    function keep(){ if(!FB) return; clearTimeout(kt); kt = setTimeout(function(){ FB.saveDraft({kind:st.kind, text:tx.value, contact:ct.value}); }, 250); }
    if(d0){
      tx.value = d0.text; ct.value = d0.contact || "";
      var del = el("button", "textbtn", "O'chirish"); del.type = "button";
      del.onclick = function(){ FB.clearDraft(); tx.value = ""; ct.value = ""; count(); say("", ""); tx.focus(); };
      var wrapD = el("span"); wrapD.appendChild(document.createTextNode(" ")); wrapD.appendChild(del);
      say("info", "Oldin yozgan qoralamangiz tiklandi.", wrapD);
    }
    count();
    tx.addEventListener("input", function(){ count(); keep(); if(status.classList.contains("err") && str(tx.value).length >= 3) say("", ""); });
    ct.addEventListener("input", keep);

    function manual(){ var lbl = (FBK.filter(function(k){ return k[0] === st.kind; })[0] || ["", ""])[1]; leadSheet("Uniroad sayti · " + lbl + (str(ct.value) ? " (aloqa: " + str(ct.value) + ")" : "") + ":\n" + str(tx.value)); }
    function tgBtn(r){ var b = el("button", "textbtn", "Telegram orqali qo'lda yuborish"); b.type = "button"; b.onclick = manual; var w = el("span"); w.appendChild(document.createTextNode(" ")); w.appendChild(b); if(r) w.appendChild(el("small", "fb-code", "Texnik kod: " + fbCode(r))); return w; }
    /* short technical reason, so the owner can tell what to fix in the Worker settings */
    function fbCode(r){
      var H = { network:"Worker'ga ulanib bo'lmadi (kod yangilanmagan, manzil xato yoki CORS)", bad_response:"Worker eski kod bilan ishlayapti", not_configured:"Worker'da BOT_TOKEN yoki CHAT_ID qo'shilmagan", key:"APP_KEY mos emas", origin:"bu sayt Worker'da ruxsat etilmagan", telegram_401:"BOT_TOKEN noto'g'ri yoki bekor qilingan", telegram_404:"BOT_TOKEN noto'g'ri", telegram_400:"CHAT_ID noto'g'ri yoki botda Start bosilmagan", telegram_403:"botda Start bosilmagan yoki bot bloklangan", telegram_unreachable:"Telegram'ga ulanib bo'lmadi", timeout:"javob kelmadi" };
      var c = str(r.code);
      return (r.status ? "HTTP " + r.status + (c ? " · " + c : "") : c || "—") + (H[c] ? " (" + H[c] + ")" : "");
    }
    function lock(on){ sb.disabled = on; sb.classList.toggle("busy", on); if(on) sb.setAttribute("aria-busy", "true"); else sb.removeAttribute("aria-busy"); sl.textContent = on ? "Yuborilmoqda…" : (relay ? "Yuborish" : "Telegram orqali yuborish"); tx.readOnly = on; ct.readOnly = on; }
    function onOnline(){ if(!document.body.contains(form)){ window.removeEventListener("online", onOnline); return; } if(status.classList.contains("warn")) say("info", "Internet qaytdi. Endi «Yuborish»ni bosishingiz mumkin."); }
    window.addEventListener("online", onOnline);

    form.onsubmit = function(e){
      e.preventDefault();
      if(sb.disabled) return;
      var text = str(tx.value);
      if(text.length < 3){ say("err", "Kamida bir necha so'z yozing."); tx.focus(); return; }
      if(FB) FB.saveDraft({kind:st.kind, text:tx.value, contact:ct.value});
      if(!relay || !FB){ manual(); return; }
      lock(true); say("", "");
      FB.send({kind:st.kind, text:text, contact:str(ct.value), hp:hp.value}).then(function(r){
        lock(false);
        if(r.ok){
          FB.clearDraft(); tx.value = ""; ct.value = ""; count();
          say("ok", "Yuborildi! Rahmat, xabaringiz Uniroad jamoasiga yetib bordi.");
          toast("Xabar yuborildi ✓");
          return;
        }
        if(r.reason === "busy") return;
        if(r.reason === "offline") say("warn", "Internet yo'q. Xabaringiz shu qurilmada qoralama sifatida saqlandi: internet qaytgach «Yuborish»ni bosing.");
        else if(r.reason === "timeout") say("err", "Server javob bermadi. Matn qoralamada saqlandi, birozdan keyin qayta urinib ko'ring.", tgBtn(r));
        else if(r.reason === "rate") say("warn", "Qisqa vaqtda juda ko'p xabar yuborildi. 10 daqiqadan keyin qayta urinib ko'ring. Matn saqlandi.");
        else say("err", "Xatolik: xabar yuborilmadi. Matn qoralamada saqlandi.", tgBtn(r));
      });
    };
    c.appendChild(form); return c;
  }
  function feedbackView(main){
    var q = hashQuery();
    pageHead(main, "Fikr bildirish", "Muammo topdingizmi, taklif yoki savolingiz bormi? Yozing: xabar to'g'ridan-to'g'ri Uniroad jamoasining Telegramiga boradi.");
    main.appendChild(feedbackForm(q.tur));
    var l = el("div", "links");
    l.appendChild(rowBtn("send", "Telegram'da to'g'ridan-to'g'ri yozish", tgName(), null, tgUrl()));
    main.appendChild(l);
  }
  function shareBtn(title, cls){
    var b = el("button", "btn " + (cls || "line") + " share"); b.type = "button"; b.appendChild(el("span", null, "Ulashish")); b.appendChild(ic("send"));
    b.onclick = function(){ var url = location.href, text = title + " · Uniroad";
      if(navigator.share){ navigator.share({title:text, url:url}).catch(function(){}); return; }
      window.open("https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text), "_blank", "noopener"); };
    return b;
  }
  function reviewsView(main){
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("chat", "Haqiqiy talabalar"));
    H.appendChild(heroTitle("Fikrlar va takliflar"));
    H.appendChild(el("p", "lead", "Uniroad bilan Italiyaga ketgan talabalarning fikrlari. Har bir fikr talabaning roziligi bilan e'lon qilinadi."));
    var R = realReviews();
    if(R.length){ var g = el("div", "rev-grid"); R.forEach(function(r){ g.appendChild(reviewCard(r)); }); main.appendChild(sec(secHead("Talabalar fikrlari (" + R.length + ")", null, null, null, "Fikrlar"), g)); }
    else main.appendChild(callout({style:"info", text:"Bu yerda faqat haqiqiy talabalarning fikrlari chiqadi. Uniroad bilan o'qishga kirgan bo'lsangiz, pastdagi forma orqali fikringizni yuboring: roziligingiz bilan shu sahifaga qo'shamiz."}));
    var fl = el("div", "links"); fl.appendChild(rowBtn("chat", "Fikringizni yuboring", "Fikr, taklif yoki muammo: Telegram orqali jamoaga boradi", "g", "#xabar?tur=fikr")); main.appendChild(sec(secHead("Fikr bildiring", null, null, null, "Feedback"), fl));
    footer(main);
  }
  function upcomingAll(n){
    var L = [];
    S.unis.forEach(function(u){ arr(u.deadlines).forEach(function(d){ var dd = deadline(d.date); if(dd && daysLeft(dd) >= 0) L.push({u:u, d:dd, x:d}); }); });
    var seen = {}; return L.sort(function(a, b){ return a.d - b.d; }).filter(function(x){ if(seen[x.u.id]) return false; seen[x.u.id] = 1; return true; }).slice(0, n || 5);
  }

  /* ================= NOLDAN: long-form guide (also exported as PDF) ================= */
  var NOLDAN_PDF = "media/uprep-noldan-yoriqnoma.pdf";
  function paras(t, cls){ var f = document.createDocumentFragment(); str(t).split(/\n\s*\n/).forEach(function(p){ if(p.trim()) f.appendChild(el("p", cls || "prose", p.trim())); }); return f; }
  function linkOut(a, u){ a.href = u; if(/^https:/.test(u)){ a.target = "_blank"; a.rel = "noopener"; } return a; }
  function noldanView(main){
    var N = S.noldan || {}, CH = arr(N.chapters);
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("book", "Bepul · " + CH.length + " bob · taxminan 25 daqiqa"));
    H.appendChild(heroTitle(N.title || "Italiyada o'qish noldan"));
    if(N.subtitle) H.appendChild(el("p", "lead", N.subtitle));
    var act = el("div", "hero-actions");
    act.appendChild(btn("gold", "down", "PDF yuklab olish", NOLDAN_PDF));
    act.firstChild.setAttribute("download", "Uniroad - Italiyada o'qish noldan.pdf");
    act.appendChild(shareBtn(N.title || "Italiyada o'qish noldan", "glass"));
    H.appendChild(act);

    var ed = el("a", "nd-edition no-print"); ed.href = "#qollanma"; ed.appendChild(ic("info")); ed.appendChild(el("span", null, "Bu butun yo'lning chop etish va oflayn o'qish uchun to'liq nashri. Har bir qadamning eng so'nggi tafsilotlari, muddatlari va havolalari «8 qadam» sahifalarida.")); ed.appendChild(ic("next")); main.appendChild(ed);
    var art = el("article", "nd");
    /* print-only cover */
    var cov = el("header", "nd-cover"); var cl0 = logo(30); cov.appendChild(cl0); cov.appendChild(el("span", "nd-cover-tag", "Bepul yo'riqnoma · o'zbek tilida")); cov.appendChild(el("div", "nd-cover-title", N.title || "Italiyada o'qish noldan")); if(N.subtitle) cov.appendChild(el("p", null, N.subtitle));
    cov.appendChild(el("small", null, "uniroad · " + tgName() + (N.updated ? " · " + N.updated + " holatiga" : ""))); art.appendChild(cov);

    if(N.letter){ var lt = el("section", "nd-letter"); lt.appendChild(paras(N.letter)); lt.appendChild(el("p", "sig", "Uniroad jamoasi")); art.appendChild(lt); }

    if(arr(N.summary).length){
      var sm = el("ol", "nd-sum");
      arr(N.summary).forEach(function(x){ var li = el("li"); li.appendChild(el("span", "n", x.n)); var d = el("div"); d.appendChild(el("b", null, x.t)); d.appendChild(el("small", null, x.d)); li.appendChild(d); sm.appendChild(li); });
      var ss = el("section", "nd-block"); ss.appendChild(el("span", "eyebrow", "Bir qarashda")); ss.appendChild(el("h2", null, "Butun yo'l " + arr(N.summary).length + " qadamda")); ss.appendChild(sm); art.appendChild(ss);
    }

    var toc = el("nav", "nd-toc"); toc.setAttribute("aria-label", "Boblar"); toc.appendChild(el("b", null, "Mundarija"));
    var tol = el("ol");
    CH.forEach(function(c){ var li = el("li"), a = el("a", null, c.title); a.href = "#noldan"; a.onclick = function(e){ e.preventDefault(); var t = document.getElementById("nd-" + c.id); if(t) t.scrollIntoView({behavior: REDUCED ? "auto" : "smooth"}); }; li.appendChild(a); tol.appendChild(li); });
    toc.appendChild(tol); art.appendChild(toc);

    CH.forEach(function(c){
      var s = el("section", "nd-ch"); s.id = "nd-" + c.id;
      var hd = el("div", "nd-head"); hd.appendChild(el("span", "eyebrow", c.kicker)); hd.appendChild(el("h2", null, c.title));
      if(c.when){ var w = el("p", "nd-when"); w.appendChild(ic("cal")); w.appendChild(el("span", null, c.when)); hd.appendChild(w); }
      s.appendChild(hd);
      s.appendChild(paras(c.body));
      if(arr(c.steps).length){ s.appendChild(el("h3", null, "Nima qilasiz")); var ol = el("ol", "nd-steps"); arr(c.steps).forEach(function(t){ ol.appendChild(el("li", null, t)); }); s.appendChild(ol); }
      arr(c.sections).forEach(function(x){ if(!arr(x.items).length) return; s.appendChild(el("h3", null, x.title)); var ul = el("ul", "ticks small"); arr(x.items).forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul.appendChild(li); }); s.appendChild(ul); });
      if(str(c.tip)) s.appendChild(callout({style:"tip", text:c.tip}));
      if(str(c.warn)) s.appendChild(callout({style:"warn", text:c.warn}));
      var ls = arr(c.links).filter(function(l){ return safeUrl(l.url); });
      if(ls.length){ var lb = el("div", "nd-links no-print"); ls.forEach(function(l){ var a = linkOut(el("a", "nd-chip"), safeUrl(l.url)); a.appendChild(ic(/^https:/.test(l.url) ? "link" : "next")); a.appendChild(el("span", null, l.label)); lb.appendChild(a); }); s.appendChild(lb); }
      art.appendChild(s);
    });

    if(arr(N.mistakes).length){ var mk = el("ul", "mist"); arr(N.mistakes).forEach(function(x){ var li = el("li"); li.appendChild(ic("stop")); li.appendChild(el("span", null, x)); mk.appendChild(li); });
      var ms = el("section", "nd-ch"); ms.appendChild(el("span", "eyebrow", "Ehtiyot bo'ling")); ms.appendChild(el("h2", null, "Eng ko'p uchraydigan " + arr(N.mistakes).length + " ta xato")); ms.appendChild(mk); art.appendChild(ms); }

    if(N.closing){ var cl = el("section", "nd-letter end"); cl.appendChild(el("h2", null, "Oxirgi so'z")); cl.appendChild(paras(N.closing));
      var cta = el("p", "nd-cta"); cta.appendChild(document.createTextNode("Savollar va hujjat topshirishda yordam: ")); var ta = el("a", null, tgName()); ta.href = tgUrl(); ta.target = "_blank"; ta.rel = "noopener"; cta.appendChild(ta); cl.appendChild(cta); art.appendChild(cl); }

    var srcs = arr(N.sources).filter(function(x){ return safeUrl(x.url); });
    if(srcs.length){ var sr = el("section", "nd-src"); sr.appendChild(el("h2", null, "Rasmiy manbalar")); var ul2 = el("ul"); srcs.forEach(function(x){ var li = el("li"), a = linkOut(el("a", null, x.label), safeUrl(x.url)); li.appendChild(a); li.appendChild(el("small", "pr-url", " " + safeUrl(x.url))); ul2.appendChild(li); }); sr.appendChild(ul2);
      sr.appendChild(el("p", "nd-disc", str(S.site.footer) || "Umumiy ma'lumot, kafolat emas.")); art.appendChild(sr); }
    main.appendChild(art);

    var bot = el("div", "nd-bottom no-print"); bot.appendChild(btn("gold", "down", "PDF yuklab olish", NOLDAN_PDF)); bot.firstChild.setAttribute("download", "Uniroad - Italiyada o'qish noldan.pdf"); bot.appendChild(btn("line", "send", "Telegram'da savol berish", tgUrl())); main.appendChild(bot);
    footer(main);
  }

  /* ================= ABOUT ================= */
  function aboutView(main){
    var A2 = S.about || {};
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("users", "Uniroad"));
    H.appendChild(heroTitle(A2.title || "Biz haqimizda"));
    if(A2.lead) H.appendChild(el("p", "lead", A2.lead));

    if(str(A2.name) || str(A2.bio)){
      var pc = el("section", "about-card");
      var ph = safeUrl(A2.photo), fig = el("div", "about-ph");
      if(ph){ var im = el("img"); im.src = ph; im.alt = str(A2.name); im.loading = "lazy"; fig.appendChild(im); } else fig.innerHTML = markSVG();
      pc.appendChild(fig);
      var tx = el("div", "about-tx");
      if(A2.name) tx.appendChild(el("h2", null, A2.name));
      if(A2.role) tx.appendChild(el("p", "about-role", A2.role));
      tx.appendChild(paras(A2.bio));
      var lk = el("div", "about-links");
      var tg = el("a", "btn gold"); tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener"; tg.appendChild(el("span", null, tgName())); tg.appendChild(ic("send")); lk.appendChild(tg);
      arr(A2.links).forEach(function(l){ var u = safeUrl(l.url); if(!u || !str(l.label)) return; lk.appendChild(btn("line", "link", l.label, u)); });
      tx.appendChild(lk); pc.appendChild(tx); main.appendChild(pc);
    }

    var stats = arr(A2.stats).filter(function(x){ return x && str(x.big); });
    if(stats.length){ var sg = el("div", "about-stats"); stats.forEach(function(x){ var d = el("div"); d.appendChild(el("b", null, x.big)); d.appendChild(el("small", null, x.small)); sg.appendChild(d); }); main.appendChild(sg); }

    var story = arr(A2.story).filter(function(x){ return x && str(x.title); });
    if(story.length){ var tl = el("ol", "timeline"); story.forEach(function(t, i){ var li = el("li"); li.appendChild(el("span", "tl-n", String(i + 1))); var b = el("div", "tl-b"); if(t.year) b.appendChild(el("span", "tl-when", t.year)); b.appendChild(el("h3", null, t.title)); if(t.text) b.appendChild(el("p", null, t.text)); li.appendChild(b); tl.appendChild(li); });
      main.appendChild(sec(secHead("Bizning yo'limiz", null, null, null, "Tarix"), tl)); }

    var vb = str(A2.video) ? videoBlock({url:A2.video, title:""}) : null; if(vb) main.appendChild(sec(secHead("Video", null, null, null, "Tanishing"), vb));

    var gal = arr(A2.gallery).filter(function(g){ return safeUrl(g.image); });
    if(gal.length){ var gg = el("div", "about-gal"); gal.forEach(function(g){ var f = el("figure"); var im2 = el("img"); im2.src = safeUrl(g.image); im2.alt = str(g.caption); im2.loading = "lazy"; f.appendChild(im2); if(g.caption) f.appendChild(el("figcaption", null, g.caption)); gg.appendChild(f); }); main.appendChild(sec(secHead("Suratlar", null, null, null, "Galereya"), gg)); }

    if(arr(A2.services).length){ var ul = el("ul", "ticks"); arr(A2.services).forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul.appendChild(li); }); main.appendChild(sec(secHead("Nimada yordam beramiz", null, null, null, "Xizmatlar"), ul)); }

    if(arr(A2.principles).length){ var pg = el("div", "lv-grid"); arr(A2.principles).forEach(function(x){ var d = el("div", "lvc"); d.appendChild(el("b", null, x.t)); d.appendChild(el("p", null, x.d)); pg.appendChild(d); }); main.appendChild(sec(secHead("Qanday ishlaymiz", null, null, null, "Tamoyillar"), pg)); }

    var R = realReviews(); if(R.length){ var rg = el("div", "rev-grid"); R.slice(0, 3).forEach(function(r){ rg.appendChild(reviewCard(r)); }); main.appendChild(sec(secHead("Talabalar fikrlari", "Hammasi", "fikrlar", null, "Fikrlar"), rg)); }
    main.appendChild(rowBtn("book", "Italiyada o'qish noldan", "To'liq bepul yo'riqnoma va PDF", "g", "#noldan"));
    main.appendChild(rowBtn("send", "Bizga yozing", tgName() + ": savol va hujjat topshirishda yordam", "", tgUrl()));
    footer(main);
  }

  /* ================= FOUNDATION ================= */
  function foundationView(main){
    var F = S.foundation || {};
    var H = hero({cls:"compact", scene:"rome", image:S.site.heroImage, narrow:true});
    H.appendChild(kicker("cap", "11 yillik attestat bilan"));
    H.appendChild(heroTitle(F.title || "Foundation"));
    if(F.lead) H.appendChild(el("p", "lead", F.lead));
    var fg = el("div", "lv-grid"); arr(F.facts).forEach(function(x){ var d = el("div", "lvc"); d.appendChild(el("b", null, x.t)); d.appendChild(el("p", null, x.d)); fg.appendChild(d); });
    main.appendChild(sec(secHead("Bilish kerak", null, null, null, "Asosiy"), fg));
    var g = el("div", "dsu-grid");
    arr(F.items).forEach(function(x){
      var u = uniById(x.uni), c = el("article", "dsu-card");
      var top = el("div", "dc-top"); top.appendChild(el("span", "dc-reg", u ? ((cityById(u.city) || {}).name || "") : "")); top.appendChild(el("b", null, x.name)); c.appendChild(top);
      var dl = el("dl", "ic-rows"); [["Narx", x.cost], ["Ariza", x.when]].forEach(function(r){ if(!str(r[1])) return; var d = el("div"); d.appendChild(el("dt", null, r[0])); d.appendChild(el("dd", null, r[1])); dl.appendChild(d); }); c.appendChild(dl);
      if(x.note) c.appendChild(el("p", "ic-note", x.note));
      var bx = el("div", "ic-btns"); var lu = safeUrl(x.url); if(lu) bx.appendChild(btn("navy", "link", "Rasmiy sahifa", lu)); if(u) bx.appendChild(btn("line", "uni", "Universitet", "#uni-" + u.id)); c.appendChild(bx);
      g.appendChild(c);
    });
    main.appendChild(sec(secHead("Foundation bor universitetlar", null, null, null, arr(F.items).length + " ta", "Narx va sanalar rasmiy sahifalardan; yili ko'rsatilgan. Topshirishdan oldin rasmiy sahifani tekshiring."), g));
    main.appendChild(rowBtn("doc", "Foundation uchun hujjatlar ro'yxati", "«Hujjatlarim»da darajani Foundation deb tanlang", "g", "#hujjatlarim"));
    var srcs = el("div"); arr(F.sources).forEach(function(x){ var u = safeUrl(x.url); if(!u) return; var a = el("a", "src"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, x.label)); srcs.appendChild(a); });
    main.appendChild(sec(secHead("Manbalar", null, null, null, "Rasmiy"), srcs));
    footer(main);
  }

  /* ================= TESTS ================= */
  function testsView(main){
    var T = S.tests || {};
    var H = hero({cls:"compact", scene:"town", narrow:true});
    H.appendChild(kicker("checklist", "Til va kirish testlari"));
    H.appendChild(heroTitle(T.title || "Testlar"));
    if(T.lead) H.appendChild(el("p", "lead", T.lead));
    var g = el("div", "tests");
    arr(T.tests).forEach(function(x){
      var c = el("article", "test-card");
      c.appendChild(el("b", "tn", x.name)); c.appendChild(el("p", "tf", x.for));
      var dl = el("dl", "ic-rows"); [["Daraja", x.level], ["Qanday", x.how], ["Narx", x.cost], ["Kim so'raydi", x.unis]].forEach(function(r){ if(!str(r[1])) return; var d = el("div"); d.appendChild(el("dt", null, r[0])); d.appendChild(el("dd", null, r[1])); dl.appendChild(d); }); c.appendChild(dl);
      var lu = safeUrl(x.url); if(lu) c.appendChild(btn("line", "link", "Rasmiy sahifa", lu));
      g.appendChild(c);
    });
    main.appendChild(g);
    var ul = el("ul", "ticks"); arr(T.tips).forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul.appendChild(li); });
    main.appendChild(sec(secHead("Maslahatlar", null, null, null, "Tayyorgarlik"), ul));
    footer(main);
  }

  /* ================= MY DOCUMENTS: personalized checklist ================= */
  var DQ2 = {level:"Bakalavr", route:"dov", dsu:"yes", money:"family"};
  try{ var dq0 = JSON.parse(LS.getItem("uprep-docs-q") || "null"); if(dq0) for(var k1 in dq0) DQ2[k1] = dq0[k1]; }catch(e){}
  function stageChecklist(id, titleRe){
    var s = S.stages.filter(function(x){ return x.id === id; })[0]; if(!s) return [];
    var out = [];
    arr(s.blocks).forEach(function(b){ if(b.type === "list" && b.style === "checklist" && (!titleRe || titleRe.test(str(b.title)))) items(b).forEach(function(x){ out.push({key:s.id + "|" + x, text:x}); }); });
    return out;
  }
  function docsView(main){
    var H = hero({cls:"compact", scene:"rome", narrow:true});
    H.appendChild(kicker("doc", "Shaxsiy ro'yxat"));
    H.appendChild(heroTitle("Hujjatlarim"));
    H.appendChild(el("p", "lead", "4 ta savolga javob bering: sizga kerak bo'ladigan barcha hujjatlar bosqichma-bosqich ro'yxat bo'lib chiqadi. Belgilaganlaringiz kurs bosqichlarida ham ko'rinadi."));
    var form = el("section", "card calc-form no-print"), grid = el("div", "calc-grid");
    function q(key, label, opts){ var l = el("label", "fld"); l.appendChild(el("span", null, label)); var s = el("select", "cityselect"); opts.forEach(function(o){ var op = el("option", null, o[1]); op.value = o[0]; if(DQ2[key] === o[0]) op.selected = true; s.appendChild(op); }); s.onchange = function(){ DQ2[key] = s.value; try{ LS.setItem("uprep-docs-q", JSON.stringify(DQ2)); }catch(e){} draw(); }; l.appendChild(s); grid.appendChild(l); }
    q("level", "Qaysi daraja?", [["Foundation","Foundation (11 yillik maktabdan keyin)"],["Bakalavr","Bakalavr"],["Magistratura","Magistratura"]]);
    q("route", "Diplomni qanday tasdiqlaysiz?", [["dov","DoV (elchixona orqali)"],["cimea","CIMEA (onlayn)"],["unk","Hali bilmayman"]]);
    q("dsu", "Stipendiyaga (DSU) topshirasizmi?", [["yes","Ha"],["no","Yo'q"]]);
    q("money", "Viza uchun pulni kim ko'rsatadi?", [["self","O'zim (o'z hisobim)"],["family","Ota-onam yoki qarindoshim (homiy)"]]);
    form.appendChild(grid); main.appendChild(form);
    var out = el("div", "docs-out"); main.appendChild(out);
    function draw(){
      out.textContent = "";
      var G = [];
      var a1 = [{key:"doc|pasport", text:"Xalqaro pasport: kamida 2 yil amal qilsin, viza tugagach yana 90 kun"}];
      if(DQ2.level === "Magistratura") a1.push({key:"doc|bach", text:"Bakalavr diplomi va baholar varaqasi (transcript)"}, {key:"doc|cv", text:"CV va motivatsion xat (dastur so'rasa)"}, {key:"doc|rec", text:"Tavsiyanoma (dastur so'rasa)"}, {key:"doc|gmat", text:"GMAT / GRE natijasi (ba'zi biznes dasturlari)"});
      else a1.push({key:"doc|att", text:"Attestat (yoki kollej diplomi) va baholar varaqasi"});
      if(DQ2.level === "Bakalavr") a1.push({key:"doc|sat", text:"SAT, CEnT-S yoki TOLC natijasi (dastur so'rasa)"}, {key:"doc|otm", text:"11 yillik attestat bo'lsa: OTMda 1 yil o'qiganingiz haqida ma'lumotnoma"});
      a1.push({key:"doc|eng", text:DQ2.level === "Foundation" ? "Ingliz tili sertifikati (Foundation uchun ko'pincha B1 yetarli)" : "Ingliz tili sertifikati (odatda B2: IELTS, TOEFL va boshqalar)"});
      G.push(["1. Universitetga ariza", "send", a1]);
      var a2 = [{key:"doc|apost", text:"Attestat/diplom va transcript'ga apostil"}];
      if(DQ2.route !== "cimea") a2 = a2.concat(stageChecklist("s2", /DoV/));
      if(DQ2.route !== "dov") a2.push({key:"doc|cimea", text:"CIMEA DiploMe akkaunti, rangli skanlar va to'lov (150 € yoki 300 €)"});
      G.push(["2. Diplomni tasdiqlash (" + (DQ2.route === "cimea" ? "CIMEA" : DQ2.route === "dov" ? "DoV" : "DoV yoki CIMEA") + ")", "stamp", a2]);
      G.push(["3. Universitaly pre-enrollment", "laptop", stageChecklist("s3")]);
      var visa = stageChecklist("s4");
      if(DQ2.money === "self") visa = visa.filter(function(x){ return !/homiy|e'tirozsizlik/i.test(x.text); });
      visa.push({key:"doc|funds", text:"Pul isboti: yiliga " + F("viza") + " qonuniy, kuzatiladigan hisobda" + (DQ2.money === "family" ? " (homiyning hisobi va daromadi bilan mos)" : "")});
      G.push(["4. Talaba vizasi", "passport", visa]);
      if(DQ2.dsu === "yes") G.push(["5. Stipendiya (oila hujjatlari, O'zbekistonda)", "coin", stageChecklist("s5")]);
      G.push([(DQ2.dsu === "yes" ? "6" : "5") + ". Italiyaga kelgach", "plane", stageChecklist("s6").concat(stageChecklist("s7"))]);
      var all = 0, done = 0;
      G.forEach(function(g){ g[2] = g[2].filter(function(x){ return !/^#/.test(x.text); }); all += g[2].length; done += g[2].filter(function(x){ return prog[x.key]; }).length; });
      try{ LS.setItem("uprep-docs-meter", JSON.stringify({done:done, all:all})); }catch(e){}
      var head = el("div", "docs-head");
      var m = el("div", "docs-meter"); var bar = el("span", "meter"); var bi = el("i"); bi.style.width = (all ? done / all * 100 : 0) + "%"; bar.appendChild(bi); m.appendChild(el("b", null, done + " / " + all + " tayyor")); m.appendChild(bar); head.appendChild(m);
      var pr = btn("navy", "file", "PDF qilib saqlash", null, function(){ window.print(); }); pr.classList.add("no-print"); head.appendChild(pr);
      out.appendChild(head);
      G.forEach(function(g){
        if(!g[2].length) return;
        var c = el("section", "card docs-g");
        var h = el("div", "ic-h"); var ii = el("span", "ic"); ii.appendChild(ic(g[1])); h.appendChild(ii); var t = el("div"); t.appendChild(el("b", null, g[0])); t.appendChild(el("small", null, g[2].filter(function(x){ return prog[x.key]; }).length + " / " + g[2].length)); h.appendChild(t); c.appendChild(h);
        g[2].forEach(function(x){ var on = !!prog[x.key]; var d = el("button", "doc"); d.type = "button"; d.setAttribute("aria-pressed", on ? "true" : "false"); var bx = el("span", "box"); bx.appendChild(ic("check")); d.appendChild(bx); d.appendChild(el("span", "lbl", x.text)); d.onclick = function(){ if(prog[x.key]) delete prog[x.key]; else prog[x.key] = true; saveProg(); draw(); }; c.appendChild(d); });
        out.appendChild(c);
      });
      out.appendChild(callout({style:"info", text:"Ro'yxat umumiy talablarga asoslangan. Universitetingiz yoki elchixona qo'shimcha hujjat so'rashi mumkin: har doim ularning rasmiy ro'yxatini ham tekshiring."}));
    }
    draw();
    footer(main);
  }

  /* ================= ITALY ================= */
  function italyView(main){
    var I = S.italy;
    var H = hero({scene:"rome", image:I.heroImage});
    H.appendChild(kicker("flag", "Davlat qo'llanmasi"));
    H.appendChild(heroTitle(I.title || "Italiya"));
    if(I.lead) H.appendChild(el("p", "lead", I.lead));
    var st = arr(I.stats).map(function(x){ return x ? [x.big, x.small] : null; });
    if(st.length) H.appendChild(heroStats(st));

    var hub = el("div", "hub");
    function tile(icon, title, sub, hash){ var a = el("a", "hubtile"); a.href = "#" + hash; var i = el("span", "ic"); i.appendChild(ic(icon)); a.appendChild(i); var t = el("span", "txt"); t.appendChild(el("b", null, title)); t.appendChild(el("small", null, sub)); a.appendChild(t); a.appendChild(ic("next", "chev")); hub.appendChild(a); }
    tile("uni", "Universitetlar", S.unis.length + " ta: davlat va xususiy", "universitetlar");
    tile("pin", "Shaharlar", S.cities.length + " ta shahar, viloyatlar bo'yicha", "shaharlar");
    tile("coin", "Stipendiyalar", "20 viloyat: idora, summa, muddat", "stipendiya");
    tile("book", "0 dan qo'llanma", "Butun yo'l sodda tilda, bepul", "qollanma");
    tile("wallet", "Pul kalkulyatori", "Viza puli va stipendiya imkoniyati", "kalkulyator");
    tile("home2", "Italiyada yashash", "Kvartira, sog'liq, ish, qiyinchiliklar", "yashash");
    main.appendChild(hub);

    var secs = arr(I.sections);
    var cols = el("div", "italy"), left = el("div", "col"), right = el("div", "col side");
    left.appendChild(secHead("Italiyada o'qish va yashash", null, null, null, "Qo'llanma"));
    secs.forEach(function(s, si){
      var box = el("div", "blocks flat"); arr(s.blocks).forEach(function(b, bi){ var n = blockNode({id:"it-" + s.id}, b, bi, true); if(n) box.appendChild(n); });
      left.appendChild(fold("it:" + s.id, s.title, box, si === 0));
    });
    var top = S.cities.filter(function(c){ return c.intro; });
    if(top.length){
      left.appendChild(secHead("Mashhur talaba shaharlari", "Hammasi", "shaharlar", null, "Shaharlar"));
      var cg = el("div", "list"); top.forEach(function(c){ cg.appendChild(cityRow(c)); }); left.appendChild(cg);
    }
    var nx = upcoming()[0]; if(nx) right.appendChild(departure(nx));
    right.appendChild(hasCourse() ? rowBtn("route", "Kursni davom ettirish", "Bosqichma-bosqich yo'riqnoma", "g", "#kurs") : priceCard(true));
    right.appendChild(rowBtn("chat", tgName() + " ga yozing", "Savollaringizga javob beramiz", "tg", tgUrl()));
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
    b.onclick = function(){ var o = bd.hidden; bd.classList.add("anim"); bd.hidden = !o; b.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
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
    if(enN(u)) tags.appendChild(el("span", "tag lang", enN(u) + " ta ingliz dasturi"));
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
    if(enN(u)) tags.appendChild(el("span", "tag lang", enN(u) + " ta ingliz dasturi"));
    a.appendChild(tags);
    var more = el("span", "u-more"); more.appendChild(el("span", null, "Batafsil")); more.appendChild(ic("next")); a.appendChild(more);
    return a;
  }

  /* ---------- universities list with search and filters ---------- */
  var UF = { q:"", type:"", en:false, city:"" };
  function ufHash(){
    var q = [];
    if(UF.type) q.push("type=" + UF.type.toLowerCase());
    if(UF.en) q.push("lang=en");
    if(UF.city) q.push("city=" + encodeURIComponent(UF.city));
    if(str(UF.q).trim()) q.push("q=" + encodeURIComponent(str(UF.q).trim()));
    return "#universitetlar" + (q.length ? "?" + q.join("&") : "");
  }
  function ufSync(){ var h = ufHash(); if(location.hash !== h){ try{ history.replaceState(history.state, "", h); }catch(e){} curKey = "#universitetlar"; } }
  function unisView(main){
    var Q = hashQuery();
    if(location.hash.indexOf("?") > 0){
      UF.type = Q.type === "davlat" ? "Davlat" : Q.type === "xususiy" ? "Xususiy" : "";
      UF.en = Q.lang === "en"; UF.city = cityById(Q.city || "") ? Q.city : ""; UF.q = str(Q.q);
    }
    var H = hero({cls:"compact", scene:"town"});
    H.appendChild(kicker("uni", "Italiya · " + S.unis.filter(function(u){ return u.type === "Davlat"; }).length + " davlat, " + S.unis.filter(function(u){ return u.type === "Xususiy"; }).length + " xususiy"));
    H.appendChild(heroTitle("Italiya universitetlari"));
    H.appendChild(el("p", "lead", S.unis.length + " ta universitet: Italiya ta'lim vazirligi (MUR) ro'yxatidagi davlat va xususiy universitetlar. Nom yoki shahar bo'yicha qidiring."));
    main.appendChild(qlinks([["star","Menga mosini topish","mos-universitet"],["search","Dastur qidirish","dasturlar"],["list","Taqqoslash","taqqoslash"],["pin","Shaharlar","shaharlar"]]));
    var bar = el("div", "filters unifilters");
    var sb = searchBox("Universitet yoki shahar nomi", UF.q, function(v){ UF.q = v; draw(); });
    bar.appendChild(sb.node);
    var row2 = el("div", "f-row");
    var sel = el("select", "cityselect"); sel.setAttribute("aria-label", "Shahar");
    var o0 = el("option", null, "Barcha shaharlar"); o0.value = ""; sel.appendChild(o0);
    S.cities.slice().sort(function(a, b){ return a.name.localeCompare(b.name); }).forEach(function(c){ if(!unisIn(c.id).length) return; var o = el("option", null, c.name + " (" + unisIn(c.id).length + ")"); o.value = c.id; if(UF.city === c.id) o.selected = true; sel.appendChild(o); });
    sel.onchange = function(){ UF.city = sel.value; draw(); };
    row2.appendChild(sel);
    var chips = el("div", "chips");
    function chip(label, isOn, fn){ var b = el("button", "chipf", label); b.type = "button"; function paint(){ var on = isOn(); b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); } b._paint = paint; paint(); b.onclick = function(){ fn(); Array.prototype.forEach.call(chips.children, function(c){ c._paint(); }); draw(); }; chips.appendChild(b); }
    chip("Davlat", function(){ return UF.type === "Davlat"; }, function(){ UF.type = UF.type === "Davlat" ? "" : "Davlat"; });
    chip("Xususiy", function(){ return UF.type === "Xususiy"; }, function(){ UF.type = UF.type === "Xususiy" ? "" : "Xususiy"; });
    chip("Ingliz tilida", function(){ return UF.en; }, function(){ UF.en = !UF.en; });
    row2.appendChild(chips);
    bar.appendChild(row2);
    main.appendChild(bar);
    var count = el("p", "count-line"); count.setAttribute("aria-live", "polite"); main.appendChild(count);
    var list = el("div", "list unilist"); main.appendChild(list);
    function draw(){
      var q = norm(UF.q);
      ufSync();
      var res = S.unis.filter(function(u){
        if(UF.en && !enN(u)) return false;
        if(UF.type && u.type !== UF.type) return false;
        if(UF.city && u.city !== UF.city) return false;
        if(q){ var c = cityById(u.city); if(norm(u.short + " " + u.name + " " + (c ? c.name + " " + c.region : "")).indexOf(q) < 0) return false; }
        return true;
      }).sort(function(a, b){ return (b.detailed ? 1 : 0) - (a.detailed ? 1 : 0) || enN(b) - enN(a) || str(a.short).localeCompare(str(b.short)); });
      list.textContent = "";
      count.textContent = res.length + " ta topildi";
      if(UF.type || UF.en || UF.city || str(UF.q).trim()){ var clr = el("button", "textbtn", "Filtrni tozalash"); clr.type = "button"; clr.onclick = function(){ UF.q = ""; UF.type = ""; UF.en = false; UF.city = ""; sb.input.value = ""; sel.value = ""; Array.prototype.forEach.call(chips.children, function(c){ c._paint(); }); draw(); }; count.appendChild(document.createTextNode(" · ")); count.appendChild(clr); }
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
    var H = hero({cls:"compact", scene:"town", narrow:true});
    H.appendChild(kicker("pin", "Italiya · 20 viloyat"));
    H.appendChild(heroTitle("Italiya shaharlari"));
    H.appendChild(el("p", "lead", "Universiteti bor " + S.cities.length + " ta shahar, viloyatlar bo'yicha. Har bir viloyatda stipendiyani o'z idorasi (DSU) beradi."));
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
    var H = hero({cls:"compact", scene:sceneFor(c.id), image:c.image, narrow:true});
    H.appendChild(kicker("pin", str(c.region) + " viloyati"));
    H.appendChild(heroTitle(c.name));
    if(c.intro) H.appendChild(el("p", "lead", c.intro));
    var n = unisIn(c.id).length;
    H.appendChild(heroStats([[n, "universitet"], [c.dsu ? str(c.dsu).split(/[\s(]/)[0] : "", "stipendiya idorasi"]]));
    var facts = factTable([["Viloyat", c.region], ["Stipendiya idorasi", c.dsu], ["Universitetlar", n + " ta"]]);
    facts.classList.add("city-facts"); main.appendChild(facts);
    if(arr(c.pros).length || arr(c.cons).length){
      var pc = el("div", "proscons");
      if(arr(c.pros).length){ var p = el("section", "pc pro"); var h = el("h3"); h.appendChild(ic("plus")); h.appendChild(document.createTextNode("Nega " + c.name)); p.appendChild(h); var ul = el("ul"); arr(c.pros).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul.appendChild(li); }); p.appendChild(ul); pc.appendChild(p); }
      if(arr(c.cons).length){ var q = el("section", "pc con"); var h2 = el("h3"); h2.appendChild(ic("minus")); h2.appendChild(document.createTextNode("Bilib qo'ying")); q.appendChild(h2); var ul2 = el("ul"); arr(c.cons).forEach(function(x){ var li = el("li"); li.appendChild(ic("info")); li.appendChild(el("span", null, x)); ul2.appendChild(li); }); q.appendChild(ul2); pc.appendChild(q); }
      main.appendChild(pc);
    }
    var dsuC = scholarshipCard({}, c); dsuC.classList.add("city-dsu"); main.appendChild(dsuC);
    if(arr(c.links).length){ var lk = el("div", "links"); arr(c.links).forEach(function(l){ var u = safeUrl(l.url); if(u) lk.appendChild(rowBtn(/Questura/.test(l.label) ? "shield" : /transport|Trasporti/i.test(l.label) ? "train" : "landmark", l.label, host(u), null, u)); }); main.appendChild(sec(secHead("Foydali rasmiy havolalar", null, null, null, c.name), lk)); }
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
  var PF = { level:"", q:"", uni:"" };
  function uniView(main, u, tab){
    var city = cityById(u.city);
    var H = hero({cls:"compact", scene:sceneFor(u.city), image:u.image || (city && city.image), narrow:true});
    H.appendChild(kicker("pin", (city ? city.name + ", " : "") + str(u.type).toLowerCase() + " universitet", city ? "#shahar-" + city.id : "#shaharlar"));
    var t = el("div", "unihero-top"); t.appendChild(el("span", "u-mono big", mono(u))); t.appendChild(heroTitle(u.short || u.name)); H.appendChild(t);
    if(u.short && u.name !== u.short) H.appendChild(el("p", "sub", u.name));
    if(u.rank){ var rk = el("span", "rank"); rk.appendChild(ic("star")); rk.appendChild(document.createTextNode(u.rank)); H.appendChild(rk); }
    var q = el("div", "hero-actions");
    var ap = safeUrl(u.portalUrl) || safeUrl(u.applyUrl);
    if(ap) q.appendChild(btn("gold", "link", u.portalLabel || "Ariza sahifasi", ap));
    q.appendChild(favBtn(u, "glass"));
    if(q.children.length) H.appendChild(q);

    var tabs = [["", "Umumiy"]];
    if(arr(u.programmes).length) tabs.push(["yonalishlar", "Yo'nalishlar (" + u.programmes.length + ")"]);
    tabs.push(["qabul", "Qabul va talablar"]); tabs.push(["hujjatlar", "Hujjatlar"]);
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
  /* ---------- apply / scholarship / requirements cards ---------- */
  function dsuFor(cityId){ return S.dsu.agencies.filter(function(a){ return arr(a.cities).indexOf(cityId) >= 0; })[0] || null; }
  function infoCard(icon, kick, title, rows, foot, cls){
    var c = el("section", "icard" + (cls ? " " + cls : ""));
    var h = el("div", "ic-h"); var i = el("span", "ic"); i.appendChild(ic(icon)); h.appendChild(i);
    var t = el("div"); t.appendChild(el("small", null, kick)); t.appendChild(el("b", null, title)); h.appendChild(t); c.appendChild(h);
    if(rows && rows.length){ var dl = el("dl", "ic-rows"); rows.forEach(function(r){ if(!str(r[1])) return; var d = el("div"); d.appendChild(el("dt", null, r[0])); d.appendChild(el("dd", null, r[1])); dl.appendChild(d); }); c.appendChild(dl); }
    arr(foot).forEach(function(n){ if(n) c.appendChild(n); });
    return c;
  }
  function applyCard(u){
    var url = safeUrl(u.applyUrl);
    var b = url ? btn("gold", "link", "Ariza sahifasini ochish", url) : (safeUrl(u.web) ? btn("navy", "globe", "Rasmiy saytni ochish", safeUrl(u.web)) : null);
    var rows = [["Qayerda", url ? (u.applyNote && u.applyNote.indexOf(host(url)) >= 0 ? u.applyNote : host(url) + (u.applyNote ? " · " + u.applyNote : "")) : "Rasmiy saytdagi International / Admission bo'limi"], ["Ariza to'lovi", u.fee], ["Keyin", "Pre-acceptance kelgach: DoV/CIMEA → Universitaly → viza"]];
    var note = url ? null : el("p", "ic-note", "Bu universitetning xalqaro ariza sahifasini hali tekshirmadik. Rasmiy saytda «International» yoki «Admission» bo'limini toping yoki " + tgName() + " ga yozing.");
    return infoCard("send", "1-qadam", "Ariza topshirish (pre-acceptance)", rows, [note, b], "apply");
  }
  function scholarshipCard(u, city){
    var a = city ? dsuFor(city.id) : null, N = S.dsu.national || {};
    var link = safeUrl(u.dsuUrl) || (a && safeUrl(a.url)) || "";
    var rows = [["Idora", a ? (a.own ? "Universitetning o'zi" : a.name) + " · " + a.region : (city ? city.region : "")],
      ["Summa", a && a.amount ? a.amount + " gacha / yil (fuori sede)" : (N.fuoriSede ? "kamida " + N.fuoriSede + " / yil (fuori sede, eng kam daromadli oila, " + (N.year || "") + ")" : "")],
      ["Ariza", a ? a.deadline : ""], ["Shart", "ISEE parificato: oila daromadi va mulki" + (N.isee ? ", ISEE " + N.isee + " gacha" : "")]];
    var foot = [];
    if(a && a.note) foot.push(el("p", "ic-note", a.note));
    var bx = el("div", "ic-btns");
    if(link) bx.appendChild(btn("navy", "link", "Stipendiya sahifasi", link));
    bx.appendChild(btn("line", "next", "Barcha viloyatlar", "#stipendiya"));
    foot.push(bx);
    return infoCard("coin", "Viloyat stipendiyasi (DSU)", "Bu yerda qanday stipendiya bor", rows, foot, "dsu");
  }
  function reqCard(){
    var c = el("section", "card req"); c.appendChild(el("h3", null, "Umumiy talablar"));
    var g = el("div", "req-grid");
    [["Bakalavr", ["12 yillik ta'lim. 11 yillik attestat bilan: Foundation yoki O'zbekistonda 1 yil OTM", "Til: odatda B2 (ingliz yoki italyan, dastur tiliga qarab)", "Ba'zi dasturlarda test: SAT, CEnT-S yoki TOLC"]],
     ["Magistratura", ["Bakalavr diplomi (odatda 3+ yil), mos fanlar bilan", "Ingliz tili B2 (IELTS, TOEFL va boshqalar)", "Ko'p dasturlarda minimal GPA, ba'zan suhbat"]],
     ["Hujjatlar", ["Pasport", "Attestat yoki diplom va transcript: apostil va tarjima bilan", "Til sertifikati; dastur so'rasa CV va motivatsion xat"]]].forEach(function(x){
      var d = el("div"); d.appendChild(el("b", null, x[0])); var ul = el("ul", "ticks small"); x[1].forEach(function(t){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, t)); ul.appendChild(li); }); d.appendChild(ul); g.appendChild(d);
    });
    c.appendChild(g); c.appendChild(el("p", "note", "Aniq talablar har bir dasturda boshqacha. Topshirishdan oldin universitetning ariza sahifasida tekshiring."));
    return c;
  }
  function overviewPanel(box, u, city){
    var P = arr(u.programmes), nB = P.filter(function(p){ return p.level === "Bakalavr"; }).length, nM = P.filter(function(p){ return p.level === "Magistratura"; }).length, nU = P.filter(function(p){ return p.level === "Yagona sikl"; }).length;
    var intro = str(u.intro) || ((u.short || u.name) + ": " + (city ? city.name + " shahridagi " : "") + str(u.type).toLowerCase() + " universitet. Italiya ta'lim vazirligining Universitaly bazasiga ko'ra, 2026/27 o'quv yilida bu yerda " + (enN(u) ? enN(u) + " ta ingliz tilidagi (yoki qisman ingliz tilidagi) dastur bor." : "ingliz tilidagi dastur yo'q: o'qish italyan tilida, B2 italyan tili kerak."));
    box.appendChild(el("p", "lead-p", intro));
    if(enN(u)){ var sb = statsBlock({items:[{big:String(enN(u)), small:"ingliz tilidagi dastur"}, {big:String(nB), small:"bakalavr"}, {big:String(nM), small:"magistratura"}].concat(nU ? [{big:String(nU), small:"yagona sikl (5–6 yil)"}] : [])}); if(sb) box.appendChild(sb); }
    box.appendChild(factTable([["Shahar", city ? city.name : ""], ["Viloyat", city ? city.region : ""], ["Turi", u.type], ["Tashkil topgan", u.founded ? u.founded + "-yil" : ""], ["Reyting", u.rank], ["Stipendiya", u.scholarship || (city && city.dsu ? city.dsu : "")], ["Qabul foizi", u.acceptance]]));
    var vb = videoBlock({url:u.video, title:"Ariza topshirish: video"}); if(vb) box.appendChild(vb);
    var UA = realAmb(u.id); if(UA.length){ var ag = el("div", "amb-grid"); UA.forEach(function(a){ ag.appendChild(ambCard(a)); }); var ah = el("section", "card"); ah.appendChild(el("h3", null, "Shu yerda o'qiyotgan talabaga yozing")); ah.appendChild(ag); box.appendChild(ah); }
    var UO = realOut(u.id); if(UO.length){ var og = el("div", "outc-grid"); UO.slice(0, 4).forEach(function(o){ og.appendChild(outCard(o)); }); var oh = el("section", "card"); oh.appendChild(el("h3", null, "Uniroad talabalari natijalari (" + UO.length + ")")); oh.appendChild(og); if(UO.length > 4){ var oa = el("a", "trk-next"); oa.href = "#natijalar"; oa.appendChild(el("span", null, "Barcha natijalar")); oa.appendChild(ic("next")); oh.appendChild(oa); } box.appendChild(oh); }
    if(u.tip) box.appendChild(callout({style:"tip", text:u.tip}));
    var mini = el("div", "mini-actions"); mini.appendChild(cmpBtn(u, "line")); mini.appendChild(shareBtn(u.short || u.name, "line")); box.appendChild(mini);
    box.appendChild(applyCard(u));
    box.appendChild(scholarshipCard(u, city));
    arr((S.dsu || {}).uniScholarships).filter(function(x){ return x.uni === u.id; }).forEach(function(x){ var c2 = el("section", "callout tip"); c2.appendChild(ic("star")); var sp = el("span"); sp.appendChild(el("b", null, x.title + ". ")); sp.appendChild(document.createTextNode(x.text + " ")); var lu = safeUrl(x.url); if(lu){ var la = el("a", null, "Rasmiy sahifa"); la.href = lu; la.target = "_blank"; la.rel = "noopener"; sp.appendChild(la); } c2.appendChild(sp); box.appendChild(c2); });
    var UR = realReviews(u.id); if(UR.length){ var rg2 = el("div", "rev-grid"); UR.forEach(function(r){ rg2.appendChild(reviewCard(r)); }); box.appendChild(rg2); }
    var links = el("div", "links");
    if(safeUrl(u.web)) links.appendChild(rowBtn("globe", "Rasmiy sayt", host(u.web), null, safeUrl(u.web)));
    if(safeUrl(u.infoUrl) && u.infoUrl !== u.applyUrl) links.appendChild(rowBtn("info", "Xalqaro talabalar sahifasi", host(u.infoUrl), null, safeUrl(u.infoUrl)));
    if(!arr(u.programmes).length) links.appendChild(rowBtn("book", "Yo'nalishlar ro'yxati", safeUrl(u.programmesUrl) ? host(u.programmesUrl) : "Universitaly: barcha dasturlar qidiruvi", null, safeUrl(u.programmesUrl) || "https://www.universitaly.it/"));
    box.appendChild(links);
  }
  function admissionPanel(box, u){
    var pu = safeUrl(u.portalUrl) || safeUrl(u.applyUrl);
    if(pu){
      var cta = el("a", "go wide"); cta.href = pu; cta.target = "_blank"; cta.rel = "noopener";
      var sp = el("span"); sp.appendChild(el("small", null, "Ariza to'lovi: " + (u.fee || "rasmiy saytda"))); sp.appendChild(el("span", "t", u.portalLabel || "Ro'yxatdan o'tish")); cta.appendChild(sp); cta.appendChild(ic("link"));
      box.appendChild(cta);
    }
    var ft = factTable([["Ariza to'lovi", u.fee], ["Kirish testlari", u.tests], ["Ingliz tili", u.english], ["O'qish narxi", u.tuition || "Davlat universitetlarida oila daromadiga (ISEE) qarab; stipendiya g'oliblari to'lamaydi"], ["Ingliz tilidagi dasturlar", enN(u) ? enN(u) + " ta" : ""]]);
    box.appendChild(ft);
    if(arr(u.deadlines).length || u.deadlineNote){
      var dc = el("section", "card"); dc.appendChild(el("h3", null, "Muddatlar"));
      if(arr(u.deadlines).length){
        var ol = el("ol", "agenda inset");
        arr(u.deadlines).forEach(function(d){
          var dd = deadline(d.date), n = dd ? daysLeft(dd) : null;
          var li = el("li", n != null && n < 0 ? "past" : "");
          var w = el("div", "when", d.date); if(n != null) w.appendChild(el("span", "left", n < 0 ? "O'tdi" : leftLabel(n))); li.appendChild(w);
          var dp = el("div"); dp.appendChild(el("p", null, d.label)); if(dd && n >= 0) dp.appendChild(calAdd({title:(u.short || u.name) + ": " + d.label, d:dd, details:d.label + " (" + d.date + ")"})); li.appendChild(dp); ol.appendChild(li);
        });
        dc.appendChild(ol);
        var sl = el("div", "sub-line"); sl.appendChild(el("span", null, "Barcha muddatlarni kalendaringizga obuna qiling, yangilansa o'zi o'zgaradi:")); sl.appendChild(subLinks("cal/uni/" + u.id + ".ics", u.short || u.name, true)); dc.appendChild(sl);
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
    } else box.appendChild(reqCard());
    if(u.admUpdated) box.appendChild(el("p", "muted-note", "Qabul ma'lumotlari rasmiy sahifalardan " + u.admUpdated + " da tekshirildi. «O'tgan yil» deb belgilangan sanalar mo'ljal uchun: 2027/28 sanalari e'lon qilinganda yangilanadi."));
    if(!arr(u.deadlines).length) box.appendChild(callout({style:"info", text:"Bu universitetning 2027/28 ariza muddatlarini hali kiritmadik. Odatda xalqaro arizalar kuz yoki qishda ochiladi va bahorda yopiladi. Aniq sanani ariza sahifasida tekshiring."}));
  }
  function docsPanel(box, u){
    if(!arr(u.docs).length) u = Object.assign({}, u, {docs:["Pasport (kamida 2 yil amal qiladigan)", "Attestat yoki diplom: apostil va tarjima bilan", "Baholar varaqasi (transcript)", "Ingliz tili sertifikati (odatda B2: IELTS, TOEFL va boshqalar)", "Dastur so'rasa: CV, motivatsion xat, tavsiyanoma", "Dastur so'rasa: SAT, CEnT-S, TOLC yoki GMAT natijasi"]});
    if(arr(u.docs).length){ var dk = el("section", "card"); dk.appendChild(el("h3", null, "Ariza uchun hujjatlar")); var ul2 = el("ul", "ticks"); arr(u.docs).forEach(function(x){ var li = el("li"); li.appendChild(ic("check")); li.appendChild(el("span", null, x)); ul2.appendChild(li); }); dk.appendChild(ul2); box.appendChild(dk); }
    box.appendChild(callout({style:"info", text:"Pre-acceptance'dan keyin DoV/CIMEA, Universitaly va viza uchun alohida hujjatlar kerak bo'ladi: ular kursning 2–4-bosqichlarida ro'yxat bilan berilgan."}));
  }
  function programmesPanel(box, u){
    if(PF.uni !== u.id){ PF.level = ""; PF.q = ""; PF.uni = u.id; }
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
        var t = el("span", "txt"); t.appendChild(el("b", null, p.name)); var m = el("small"); m.appendChild(el("span", "tag" + (p.level === "Bakalavr" ? "" : " alt"), p.level)); m.appendChild(el("span", "tag lang", p.lang)); if(p.access) m.appendChild(el("span", "tag" + (p.access === "Erkin qabul" ? " ok" : " hot"), p.access)); if(p.online) m.appendChild(el("span", "tag", "Onlayn")); t.appendChild(m); s.appendChild(t);
        s.appendChild(ic("down", "chev")); d.appendChild(s);
        d.appendChild(factTable([["Kim topshira oladi", p.req || (p.level === "Magistratura" ? "Mos yo'nalishdagi bakalavr diplomi (odatda 3+ yil)" : "12 yillik ta'lim (11 yillik attestat bilan: Foundation yoki 1 yil OTM)")], ["Davomiyligi", p.years ? p.years + " yil" : ""], ["Qabul turi", p.access ? p.access + (p.access === "Erkin qabul" ? ": hujjatlar asosida" : p.access === "Kirish testi" ? ": test natijasiga qarab" : ": joylar soni cheklangan") : ""], ["Minimal GPA", p.gpa ? p.gpa + " / 100" : ""], ["Test yoki suhbat", p.test], ["Kampus", p.campus], ["Ariza to'lovi", u.fee], ["Sinf kodi", p.code]]));
        var pu = safeUrl(p.url); if(pu){ var la = el("a", "src prog-link"); la.href = pu; la.target = "_blank"; la.rel = "noopener"; la.appendChild(ic("link")); la.appendChild(el("span", null, "Dasturning rasmiy sahifasi")); d.appendChild(la); }
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
    var owned = hasCourse(), n = doneCount(), total = S.stages.length;
    var H = hero({cls:"compact", scene:"rome"});
    H.appendChild(kicker(owned ? "check" : "route", owned ? "Kurs ochiq" + (PREVIEW ? " (ko'rib chiqish rejimi)" : "") : "To'liq kurs: Italiya"));
    H.appendChild(heroTitle("Italiyaga yo'l"));
    H.appendChild(el("p", "lead", owned ? "Bosqichni bosing: nima qilinadi, qaysi hujjat kerak va qachongacha." : total + " bosqich: universitet tanlashdan Italiyadagi full enrollment'gacha. 1-bosqich bepul, qolganlari kursda."));
    H.appendChild(heroStats([[n + "/" + total, "bosqich bajarildi"], [owned ? "Ochiq" : price(), owned ? "umrbod kirish" : "bir marta to'lov"]]));
    var cg = el("div", "course-grid"); cg.appendChild(routeLine());
    var side = el("div", "links");
    if(!owned) side.appendChild(priceCard(false));
    side.appendChild(rowBtn("cal", "Kalendar", "Yil davomidagi muhim sanalar", null, "#kalendar"));
    side.appendChild(rowBtn("folder", "Materiallar", "Rasmiy hujjatlar va havolalar", null, "#materiallar"));
    side.appendChild(rowBtn("chat", tgName() + " ga yozing", "Savol va yordam", "tg", tgUrl()));
    cg.appendChild(side); main.appendChild(cg);
    if(plansOn()) main.appendChild(plansSection("Tariflar: o'zingizga mosini tanlang"));
    footer(main);
  }
  function sidesteps(cur){
    var nav = el("nav", "sidesteps"); nav.setAttribute("aria-label", "Kurs bosqichlari"); nav.appendChild(el("h4", null, "Kurs bosqichlari"));
    S.stages.forEach(function(x, i){
      var a = el("a", (prog[x.id] ? "done" : "") + (x === cur ? " here" : "")); a.href = "#" + x.id; if(x === cur) a.setAttribute("aria-current", "step");
      var nn = el("span", "n"); if(prog[x.id] && x !== cur) nn.appendChild(ic("check")); else nn.textContent = String(i + 1); a.appendChild(nn);
      a.appendChild(el("span", "t", x.title)); if(!isOpenStage(x)) a.appendChild(ic("lock"));
      nav.appendChild(a);
    });
    return nav;
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
    var outer = main, lay = el("div", "doclayout"); lay.appendChild(sidesteps(s)); main = el("article"); lay.appendChild(main); outer.appendChild(lay);
    main.appendChild(minimap(s));
    var head = el("section", "stagehead");
    head.appendChild(el("span", "big", String(idx + 1)));
    var k = el("span", "kicker" + (done ? " ok" : "")); if(done) k.appendChild(ic("check")); else if(!unlocked) k.appendChild(ic("lock"));
    k.appendChild(document.createTextNode(done ? "Bajarildi" : (idx + 1) + "-bosqich, jami " + S.stages.length + " ta" + (s.free && !hasCourse() ? ", bepul" : ""))); head.appendChild(k);
    head.appendChild(el("h1", null, plainTitle(s)));
    head.appendChild(el("p", "sub", str(s.title) + (s.sub ? " · " + s.sub : "")));
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
      footer(outer); return;
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
    footer(outer);
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
      var t = el("div"); if(c.tag) t.appendChild(el("span", "tag", c.tag)); t.appendChild(el("p", null, c.text)); if(!short && c._d && n >= 0) t.appendChild(calAdd({title:str(c.text).slice(0, 90), d:c._d, details:c.text})); li.appendChild(t);
      ul.appendChild(li);
    });
    return ul;
  }
  /* calendar: filter chips + search so a student finds "their" dates at once */
  var CF = { f:"", q:"" };
  function calKind(c){
    var t = norm(c.tag + " " + c.text);
    if(/viza|elchixona|permesso|poste|universitaly|pre-enrollment/.test(t)) return "viza";
    if(/stipend|dsu|disco|isee|bando|ersu|edisu|ergo|adisu/.test(t)) return "dsu";
    return "uni";
  }
  function calView(main){
    pageHead(main, "Kalendar", "Yil davomidagi muhim sanalar: universitet arizalari, viza va stipendiya muddatlari.");
    if(!S.calendar.length){ main.appendChild(el("div", "empty", "Hozircha sana yo'q.")); return; }
    var bar = el("div", "filters unifilters");
    var sb = searchBox("Universitet yoki so'z: Bocconi, viza, DiSCo…", CF.q, function(v){ CF.q = v; draw(); }); bar.appendChild(sb.node);
    var chips = el("div", "chips");
    [["","Hammasi"],["soon","Yaqin (60 kun)"],["uni","Universitetlar"],["viza","Viza"],["dsu","Stipendiya"],["past","O'tganlar"]].forEach(function(x){
      var b = el("button", "chipf" + (CF.f === x[0] ? " on" : ""), x[1]); b.type = "button"; b.setAttribute("aria-pressed", CF.f === x[0] ? "true" : "false");
      b.onclick = function(){ CF.f = x[0]; Array.prototype.forEach.call(chips.children, function(c){ c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); }); b.classList.add("on"); b.setAttribute("aria-pressed", "true"); draw(); };
      chips.appendChild(b);
    });
    bar.appendChild(chips); main.appendChild(bar);
    var cnt = el("p", "count-line"); cnt.setAttribute("aria-live", "polite"); main.appendChild(cnt);
    var box = el("div"); main.appendChild(box);
    function draw(){
      var q = norm(CF.q);
      var L = S.calendar.filter(function(c){
        var n = c._d ? daysLeft(c._d) : null;
        if(CF.f === "past"){ if(n == null || n >= 0) return false; }
        else if(CF.f === "soon"){ if(n == null || n < 0 || n > 60) return false; }
        else if(CF.f){ if(calKind(c) !== CF.f) return false; }
        return !q || norm(c.tag + " " + c.text + " " + c.date).indexOf(q) >= 0;
      });
      if(CF.f === "past") L = L.slice().reverse();
      box.textContent = ""; cnt.textContent = L.length + " ta sana";
      if(!L.length){ box.appendChild(el("div", "empty", CF.f === "soon" ? "Keyingi 60 kunda muddat yo'q." : "Hech narsa topilmadi.")); return; }
      box.appendChild(agenda(L, false));
    }
    draw();
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
      if(PREVIEW){ pageHead(main, "Hisob", "Ko'rib chiqish rejimi: hisoblar hali ishga tushmagan."); var off = el("button", "markdone", "Ko'rib chiqish rejimini o'chirish"); off.type = "button"; off.onclick = function(){ try{ LS.removeItem("uprep-preview"); }catch(e){} PREVIEW = false; go(""); }; main.appendChild(off); footer(main); return; }
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
    btn.onclick = function(){ var o = bd.hidden; bd.classList.add("anim"); bd.hidden = !o; btn.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
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
    var sp = el("span"); if(st === "tip") sp.appendChild(el("b", null, "Uniroad maslahati: ")); if(st === "warn") sp.appendChild(el("b", null, "Diqqat: ")); sp.appendChild(document.createTextNode(str(b.text))); c.appendChild(sp);
    return c;
  }
  function videoBlock(b){
    var url = safeUrl(b.url), file = safeUrl(b.file), emb = url ? videoEmbed(url) : "";
    if(!url && !file) return null;
    var fig = el("figure", "media");
    if(b.title) fig.appendChild(el("div", "ttl", b.title));
    var fr = el("div", "frame");
    if(emb){
      /* privacy: YouTube/Vimeo load only after the visitor presses play (no third-party request before consent) */
      var pl = el("button", "vid-gate"); pl.type = "button"; pl.appendChild(ic("play"));
      var gt = el("span"); gt.appendChild(el("b", null, "Videoni ko'rish")); gt.appendChild(el("small", null, "Bosganingizda video " + host(emb) + " saytidan yuklanadi va u sizning IP manzilingizni ko'radi.")); pl.appendChild(gt);
      pl.onclick = function(){ var f = el("iframe"); f.src = emb + (emb.indexOf("?") < 0 ? "?" : "&") + "autoplay=1"; f.title = str(b.title) || "Video"; f.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true; fr.textContent = ""; fr.appendChild(f); };
      fr.appendChild(pl); fig.appendChild(fr);
    }
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
    var a = el("a", "linkbtn"); a.href = u; if(u.charAt(0) !== "#"){ a.target = "_blank"; a.rel = "noopener"; }
    var t = el("span", "txt"); t.appendChild(el("b", null, str(b.label) || "Ochish")); if(b.note) t.appendChild(el("small", null, b.note)); a.appendChild(t);
    a.appendChild(ic(u.charAt(0) === "#" ? "next" : "link")); return a;
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
