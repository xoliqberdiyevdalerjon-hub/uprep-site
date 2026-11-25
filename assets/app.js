/* Uprep site. All texts live in content/*.json and are edited in Pages CMS (app.pagescms.org).
   This file only draws them. Nothing here needs editing to add text, video, images or files. */
(function(){
  "use strict";

  var ICONS = {
    send:'<path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M10 13l11-10"/>',
    stamp:'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    laptop:'<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
    passport:'<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
    coin:'<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2A3.5 3.5 0 0012 8c-2.2 0-3.5 1.8-3.5 4s1.3 4 3.5 4a3.5 3.5 0 002.8-1.2M7 11h5M7 13h5"/>',
    plane:'<path d="M10.5 13.5L3 11l1.5-1.5 8 .5 4.5-4.5c1-1 2.6-1 3 0 .4 1-.1 2-1 3L14.5 13l.5 8-1.5 1.5-2.5-7.5-3 3V21l-1.5-.5-1-3-3-1L2 15h3z"/>',
    cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
    home2:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    doc:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    chat:'<path d="M21 3.5L3 11l6.5 2.5L12 20l3-6.5"/><path d="M9.5 13.5L21 3.5"/>',
    play:'<circle cx="12" cy="12" r="9.5"/><path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none"/>',
    image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8.5 8.5"/>',
    file:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5L12 17l2.5-2.5"/>',
    link:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/>',
    text:'<path d="M5 6h14M5 11h14M5 16h9"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    next:'<path d="M9 5l7 7-7 7"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    stop:'<circle cx="12" cy="12" r="9.5"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/>',
    info:'<circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r="1.2" fill="currentColor" stroke="none"/>',
    grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    folder:'<path d="M3.5 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2h-13a2 2 0 01-2-2z"/>'
  };
  function ic(name, cls){
    var s = document.createElementNS("http://www.w3.org/2000/svg","svg");
    s.setAttribute("viewBox","0 0 24 24"); s.setAttribute("fill","none"); s.setAttribute("stroke","currentColor");
    s.setAttribute("stroke-width","2"); s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round"); s.setAttribute("aria-hidden","true");
    s.innerHTML = ICONS[name] || ICONS.doc; if(cls) s.setAttribute("class", cls); return s;
  }
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null && text !== "") e.textContent = text; return e; }
  function str(v){ return typeof v === "string" ? v.trim() : (v == null ? "" : String(v)); }
  /* links and media: only https links or files from this site */
  function safeUrl(u){
    u = str(u); if(!u) return "";
    if(/^https:\/\//i.test(u)) return u;
    if(/^\/?media\//i.test(u)) return u.replace(/^\//, "");
    return "";
  }
  function videoEmbed(u){
    var m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);
    if(m) return "https://www.youtube-nocookie.com/embed/" + m[1];
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if(m) return "https://player.vimeo.com/video/" + m[1];
    return "";
  }
  function isVideoFile(u){ return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u); }
  function fileName(u){ return decodeURIComponent(str(u).split("/").pop() || ""); }

  /* per-visitor progress, kept only in this browser */
  var PKEY = "uprep-progress-v1", prog = {};
  try{ prog = JSON.parse(localStorage.getItem(PKEY) || "{}") || {}; }catch(e){ prog = {}; }
  function saveProg(){ try{ localStorage.setItem(PKEY, JSON.stringify(prog)); }catch(e){} }
  var open = {};
  try{ open = JSON.parse(sessionStorage.getItem("uprep-open") || "{}") || {}; }catch(e){ open = {}; }
  function saveOpen(){ try{ sessionStorage.setItem("uprep-open", JSON.stringify(open)); }catch(e){} }

  var root = document.getElementById("app");
  var S = { site:{}, stages:[], calendar:[], library:[] };

  function load(name, fallback){
    return fetch("content/" + name + ".json", {cache:"no-cache"}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).catch(function(){ return fallback; });
  }
  Promise.all([load("site",{}), load("stages",[]), load("calendar",[]), load("library",[])]).then(function(r){
    S.site = r[0] || {}; S.stages = Array.isArray(r[1]) ? r[1] : []; S.calendar = Array.isArray(r[2]) ? r[2] : []; S.library = Array.isArray(r[3]) ? r[3] : [];
    S.stages.forEach(function(s, i){ if(!str(s.id)) s.id = "b" + (i + 1); s.id = str(s.id).replace(/[^\w-]/g, "-"); });
    if(S.site.title) document.title = S.site.title + " · Uprep";
    render(false);
  });

  function tgUrl(){ var u = str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); return "https://t.me/" + encodeURIComponent(u); }
  function tgName(){ return "@" + str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); }

  function route(){
    var h = (location.hash || "").replace(/^#/, "");
    if(h === "kalendar") return {view:"cal"};
    if(h === "materiallar") return {view:"lib"};
    var m = h.match(/^m-(\d+)$/); if(m && S.library[+m[1]]) return {view:"item", i:+m[1]};
    var st = S.stages.filter(function(s){ return s.id === h; })[0];
    if(st) return {view:"stage", st:st};
    return {view:"home"};
  }
  function go(hash){ if(location.hash.replace(/^#/, "") === hash) render(true); else location.hash = hash; }
  window.addEventListener("hashchange", function(){ render(true); });

  function render(top){
    var r = route();
    root.textContent = "";
    root.appendChild(appbar(r));
    var main = el("main", "wrap");
    if(r.view === "home") homeView(main);
    else if(r.view === "cal") calView(main);
    else if(r.view === "lib") libView(main);
    else if(r.view === "item") itemView(main, r.i);
    else stageView(main, r.st);
    root.appendChild(main);
    root.appendChild(tabbar(r));
    if(top) window.scrollTo(0, 0);
  }

  function logo(h){ var c = el("span", "chip"), l = el("span", "logo"); l.style.setProperty("--h", h + "px"); l.setAttribute("role", "img"); l.setAttribute("aria-label", "Uprep"); c.appendChild(l); return c; }

  function appbar(r){
    var bar = el("header", "appbar"), w = el("div", "wrap");
    if(r.view === "home"){ w.appendChild(logo(22)); w.appendChild(el("span", "ttl")); }
    else {
      var b = el("button", "iconbtn"); b.type = "button"; b.appendChild(ic("back")); b.appendChild(el("span", null, "Orqaga"));
      b.onclick = function(){ if(r.view === "item") go("materiallar"); else go(""); }; w.appendChild(b);
      var t = r.view === "cal" ? "Kalendar" : r.view === "lib" ? "Materiallar" : r.view === "item" ? str(S.library[r.i].title) : str(r.st.title);
      w.appendChild(el("span", "ttl", t));
    }
    var tg = el("a", "iconbtn tg"); tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener";
    tg.appendChild(ic("chat")); tg.appendChild(el("span", null, "Yozish")); w.appendChild(tg);
    bar.appendChild(w); return bar;
  }

  function tabbar(r){
    var nav = el("nav", "tabbar"), inn = el("div", "in"); nav.setAttribute("aria-label", "Asosiy menyu");
    function tab(name, label, on, fn){ var b = el("button", "tab" + (on ? " on" : "")); b.type = "button"; if(on) b.setAttribute("aria-current", "page"); b.appendChild(ic(name)); b.appendChild(el("span", null, label)); b.onclick = fn; inn.appendChild(b); }
    tab("home", "Bosh sahifa", r.view === "home", function(){ go(""); });
    tab("grid", "Bosqichlar", r.view === "stage", function(){ var n = S.stages.filter(function(s){ return !prog[s.id]; })[0] || S.stages[0]; if(n) go(n.id); });
    tab("folder", "Materiallar", r.view === "lib" || r.view === "item", function(){ go("materiallar"); });
    tab("cal", "Kalendar", r.view === "cal", function(){ go("kalendar"); });
    nav.appendChild(inn); return nav;
  }

  function footer(main){
    var f = el("div", "foot");
    if(S.site.footer) f.appendChild(el("p", null, S.site.footer));
    var p = el("p", "brand"); p.appendChild(logo(14)); p.appendChild(document.createTextNode("© " + new Date().getFullYear() + " Uprep")); f.appendChild(p);
    main.appendChild(f);
  }

  /* ---------- home ---------- */
  function homeView(main){
    var total = S.stages.length, n = S.stages.filter(function(s){ return prog[s.id]; }).length;
    var card = el("section", "welcome glass"), left = el("div");
    if(S.site.eyebrow) left.appendChild(el("div", "eyebrow", S.site.eyebrow));
    left.appendChild(el("h1", null, S.site.title || "Italiyaga yo'l"));
    if(S.site.lead) left.appendChild(el("p", null, S.site.lead));
    card.appendChild(left);
    if(total){
      var ring = el("div", "ring"); ring.setAttribute("role", "img"); ring.setAttribute("aria-label", n + " / " + total + " bosqich bajarildi");
      var C = 2 * Math.PI * 40, frac = n / total, NS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 92 92");
      var c1 = document.createElementNS(NS, "circle"), c2 = document.createElementNS(NS, "circle");
      [c1, c2].forEach(function(c){ c.setAttribute("cx", "46"); c.setAttribute("cy", "46"); c.setAttribute("r", "40"); c.setAttribute("fill", "none"); c.setAttribute("stroke-width", "9"); });
      c1.setAttribute("stroke", "currentColor"); c1.setAttribute("stroke-opacity", ".12");
      c2.style.stroke = "var(--green-2)"; c2.setAttribute("stroke-linecap", "round"); c2.setAttribute("stroke-dasharray", (C * frac) + " " + C); if(!frac) c2.setAttribute("stroke-opacity", "0");
      svg.appendChild(c1); svg.appendChild(c2); ring.appendChild(svg);
      var nn = el("div", "n"); nn.appendChild(document.createTextNode(n + "/" + total)); nn.appendChild(el("small", null, "bajarildi")); ring.appendChild(nn);
      card.appendChild(ring);
      var nx = S.stages.filter(function(s){ return !prog[s.id]; })[0];
      if(nx){
        var cb = el("button", "continue"); cb.type = "button";
        var sp = el("span"); sp.appendChild(el("small", null, n ? "Davom etish" : "Boshlash")); sp.appendChild(document.createTextNode((S.stages.indexOf(nx) + 1) + ". " + str(nx.title)));
        cb.appendChild(sp); cb.appendChild(ic("next")); cb.onclick = function(){ go(nx.id); }; card.appendChild(cb);
      }
    }
    main.appendChild(card);

    if(total){
      main.appendChild(el("div", "label", "Bosqichlar"));
      var grid = el("div", "grid");
      S.stages.forEach(function(s, i){
        var t = el("button", "tile glass" + (prog[s.id] ? " done" : "")); t.type = "button";
        var w = el("span", "ic"); w.appendChild(ic(s.icon)); t.appendChild(w);
        t.appendChild(el("span", "num", prog[s.id] ? "✓ " + (i + 1) : String(i + 1)));
        t.appendChild(el("b", null, s.title));
        if(s.when) t.appendChild(el("small", null, s.when));
        if(i === total - 1){ if(total % 2 === 1) t.classList.add("l2"); if(total % 3 === 1) t.classList.add("l3"); }
        t.onclick = function(){ go(s.id); };
        grid.appendChild(t);
      });
      main.appendChild(grid);
    }

    if(S.library.length){
      var lab = el("div", "label"); lab.appendChild(el("span", null, "Materiallar"));
      var all = el("a", null, "Hammasi"); all.href = "#materiallar"; lab.appendChild(all); main.appendChild(lab);
      var rail = el("div", "rail");
      S.library.forEach(function(m, i){ rail.appendChild(mediaCard(m, i)); });
      main.appendChild(rail);
    }

    main.appendChild(wideBtn("cal", "Kalendar", "Yil davomidagi muhim sanalar", false, function(){ go("kalendar"); }));
    var tg = wideBtn("chat", tgName() + " ga yozish", "Hujjatlarni birga tekshiramiz", true);
    tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener"; main.appendChild(tg);
    footer(main);
  }

  function wideBtn(icon, title, sub, green, fn){
    var b = el(fn ? "button" : "a", "wide glass"); if(fn){ b.type = "button"; b.onclick = fn; }
    var i = el("span", "ic" + (green ? " g" : "")); i.appendChild(ic(icon)); b.appendChild(i);
    var t = el("span", "txt"); t.appendChild(el("b", null, title)); if(sub) t.appendChild(el("small", null, sub)); b.appendChild(t);
    b.appendChild(ic("next", "chev")); return b;
  }

  var KIND = { video:["play","Video"], file:["file","Fayl"], link:["link","Havola"], image:["image","Rasm"] };
  function kindOf(m){ var k = str(m.kind); return KIND[k] ? k : (m.file ? "file" : m.image ? "image" : "link"); }
  function mediaCard(m, i){
    var k = kindOf(m), b = el("button", "mcard glass"); b.type = "button";
    var th = el("span", "thumb" + (k === "file" || k === "link" ? " g" : ""));
    var img = safeUrl(m.image);
    if(img){ var im = el("img"); im.src = img; im.alt = ""; im.loading = "lazy"; th.appendChild(im); } else th.appendChild(ic(KIND[k][0]));
    b.appendChild(th);
    b.appendChild(el("span", "kind", KIND[k][1]));
    b.appendChild(el("b", null, m.title));
    if(m.desc) b.appendChild(el("small", null, m.desc));
    b.onclick = function(){ go("m-" + i); };
    return b;
  }

  /* ---------- library ---------- */
  function libView(main){
    if(!S.library.length){ main.appendChild(el("div", "empty glass", "Hozircha material yo'q.")); footer(main); return; }
    var g = el("div", "grid");
    S.library.forEach(function(m, i){ var c = mediaCard(m, i); c.style.flex = "none"; g.appendChild(c); });
    main.appendChild(g); footer(main);
  }
  function itemView(main, i){
    var m = S.library[i], k = kindOf(m);
    var head = el("section", "head glass");
    var pill = el("span", "pill"); pill.appendChild(ic(KIND[k][0])); pill.appendChild(document.createTextNode(KIND[k][1])); head.appendChild(pill);
    head.appendChild(el("h1", null, m.title));
    if(m.desc) head.appendChild(el("p", "intro", m.desc));
    main.appendChild(head);
    var box = el("div", "blocks");
    if(k === "video") box.appendChild(videoBlock({url:m.url, file:m.file}));
    else if(k === "image") box.appendChild(imageBlock({image:m.image || m.file}));
    else if(k === "file") box.appendChild(fileBlock({file:m.file || m.url, label:m.title}));
    else box.appendChild(linkBlock({url:m.url, label:"Ochish"}, true));
    main.appendChild(box);
  }

  /* ---------- calendar ---------- */
  function calView(main){
    if(!S.calendar.length){ main.appendChild(el("div", "empty glass", "Hozircha sana yo'q.")); footer(main); return; }
    var box = el("section", "cal glass");
    S.calendar.forEach(function(c){
      var r = el("div", "cal-row"); r.appendChild(el("div", "date", c.date));
      var t = el("div"); if(c.tag) t.appendChild(el("span", "tag", c.tag)); t.appendChild(el("p", null, c.text)); r.appendChild(t);
      box.appendChild(r);
    });
    main.appendChild(box); footer(main);
  }

  /* ---------- stage ---------- */
  function stageView(main, s){
    var idx = S.stages.indexOf(s), done = !!prog[s.id];
    var head = el("section", "head glass" + (done ? " done" : ""));
    var pill = el("span", "pill"); if(done) pill.appendChild(ic("check")); pill.appendChild(document.createTextNode((idx + 1) + "-bosqich")); head.appendChild(pill);
    head.appendChild(el("h1", null, s.title));
    if(s.sub) head.appendChild(el("p", "sub", s.sub));
    if(s.when){ var w = el("div", "when"); w.appendChild(ic("cal")); w.appendChild(el("span", null, s.when)); head.appendChild(w); }
    if(s.intro) head.appendChild(el("p", "intro", s.intro));
    main.appendChild(head);

    var box = el("div", "blocks"), firstAcc = true;
    (Array.isArray(s.blocks) ? s.blocks : []).forEach(function(b, bi){
      var node = null, type = str(b && (b.type || b._block));
      if(type === "text") node = accordion(s, bi, b.title || "Ma'lumot", "text", textBody(b.body), firstAcc);
      else if(type === "list") node = accordion(s, bi, b.title || "Ro'yxat", "list", listBody(s, b), firstAcc, b.style === "checklist" ? checkCount(s, b) : "");
      else if(type === "callout") node = callout(b);
      else if(type === "video") node = videoBlock(b);
      else if(type === "image") node = imageBlock(b);
      else if(type === "file") node = fileBlock(b);
      else if(type === "button") node = linkBlock(b, true);
      else if(type === "stats") node = statsBlock(b);
      else if(type === "cards") node = cardsBlock(b);
      if(node){ if(node.classList.contains("acc")) firstAcc = false; box.appendChild(node); }
    });
    main.appendChild(box);

    var big = el("button", "big" + (done ? " on" : "")); big.type = "button"; big.setAttribute("aria-pressed", done ? "true" : "false");
    big.appendChild(ic("check")); big.appendChild(el("span", null, done ? "Bajarildi" : "Bajarildi deb belgilash"));
    big.onclick = function(){ if(prog[s.id]) delete prog[s.id]; else prog[s.id] = true; saveProg(); render(false); };
    main.appendChild(big);

    var u = safeUrl(s.srcUrl);
    if(u){ var a = el("a", "src glass"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Manba: " + (s.srcLabel || u))); main.appendChild(a); }

    var row = el("div", "row2"), prev = S.stages[idx - 1], nxt = S.stages[idx + 1];
    var pb = el("button", "nav glass"); pb.type = "button"; pb.appendChild(ic("back")); pb.appendChild(el("span", null, prev ? prev.title : "Boshi"));
    if(prev) pb.onclick = function(){ go(prev.id); }; else pb.disabled = true;
    var nb = el("button", "nav next glass"); nb.type = "button"; nb.appendChild(el("span", null, nxt ? nxt.title : "Oxiri")); nb.appendChild(ic("next"));
    if(nxt) nb.onclick = function(){ go(nxt.id); }; else nb.disabled = true;
    row.appendChild(pb); row.appendChild(nb); main.appendChild(row);
  }

  function accordion(s, bi, title, icon, body, defOpen, sub){
    var key = s.id + ":" + bi, isOpen = key in open ? open[key] : defOpen;
    var wrap = el("section", "acc glass");
    var btn = el("button", "acc-btn"); btn.type = "button"; btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    var i = el("span", "ic"); i.appendChild(ic(icon)); btn.appendChild(i);
    var t = el("span"); t.appendChild(document.createTextNode(title)); if(sub) t.appendChild(el("small", null, sub)); btn.appendChild(t);
    btn.appendChild(ic("next", "chev"));
    var bd = el("div", "acc-body"); bd.appendChild(body); bd.hidden = !isOpen;
    btn.onclick = function(){ var o = bd.hidden; bd.hidden = !o; btn.setAttribute("aria-expanded", o ? "true" : "false"); open[key] = o; saveOpen(); };
    wrap.appendChild(btn); wrap.appendChild(bd); return wrap;
  }
  function textBody(body){
    var f = document.createDocumentFragment();
    str(body).split(/\n\s*\n/).forEach(function(p){ if(p.trim()) f.appendChild(el("p", "prose", p.trim())); });
    return f;
  }
  function items(b){ return (Array.isArray(b.items) ? b.items : []).map(function(x){ return typeof x === "string" ? x : str(x && (x.text || x.value)); }).filter(Boolean); }
  function checkCount(s, b){ var list = items(b).filter(function(x){ return !/^#/.test(x); }); var n = list.filter(function(x){ return prog[s.id + "|" + x]; }).length; return n + " / " + list.length + " tayyor"; }
  function listBody(s, b){
    var list = items(b), style = str(b.style) || "bullets";
    if(style === "steps"){ var ol = el("ol", "steps"); list.forEach(function(x){ ol.appendChild(el("li", null, x)); }); return ol; }
    if(style === "checklist"){
      var f = el("div");
      list.forEach(function(x){
        if(/^#/.test(x)){ f.appendChild(el("div", "grp", x.replace(/^#\s*/, ""))); return; }
        var key = s.id + "|" + x, on = !!prog[key];
        var d = el("button", "doc"); d.type = "button"; d.setAttribute("aria-pressed", on ? "true" : "false");
        var bx = el("span", "box"); bx.appendChild(ic("check")); d.appendChild(bx); d.appendChild(el("span", null, x));
        d.onclick = function(){ if(prog[key]) delete prog[key]; else prog[key] = true; saveProg(); render(false); };
        f.appendChild(d);
      });
      return f;
    }
    var ul = el("ul", "bullets"); list.forEach(function(x){ ul.appendChild(el("li", null, x)); }); return ul;
  }
  function callout(b){
    var st = ["tip","warn","info"].indexOf(str(b.style)) >= 0 ? str(b.style) : "info";
    var c = el("div", "callout glass " + st); c.appendChild(ic(st === "tip" ? "bulb" : st === "warn" ? "stop" : "info"));
    var sp = el("span"); if(st === "tip") sp.appendChild(el("b", null, "Uprep maslahati: ")); sp.appendChild(document.createTextNode(str(b.text))); c.appendChild(sp);
    return c;
  }
  function videoBlock(b){
    var fig = el("figure", "media glass"); fig.style.margin = "0";
    if(b.title) fig.appendChild(el("div", "ttl", b.title));
    var url = safeUrl(b.url), file = safeUrl(b.file), emb = url ? videoEmbed(url) : "";
    var fr = el("div", "frame");
    if(emb){ var f = el("iframe"); f.src = emb; f.title = str(b.title) || "Video"; f.loading = "lazy"; f.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true; fr.appendChild(f); fig.appendChild(fr); }
    else if(file || (url && isVideoFile(url))){ var v = el("video"); v.controls = true; v.preload = "metadata"; v.playsInline = true; v.src = file || url; fr.appendChild(v); fig.appendChild(fr); }
    else if(url){ return linkBlock({url:url, label:str(b.title) || "Videoni ochish", note:b.caption}, true); }
    else return null;
    if(b.caption) fig.appendChild(el("figcaption", null, b.caption));
    return fig;
  }
  function imageBlock(b){
    var src = safeUrl(b.image); if(!src) return null;
    var fig = el("figure", "media glass"); fig.style.margin = "0";
    var im = el("img"); im.src = src; im.alt = str(b.caption); im.loading = "lazy"; fig.appendChild(im);
    if(b.caption) fig.appendChild(el("figcaption", null, b.caption));
    return fig;
  }
  function fileBlock(b){
    var u = safeUrl(b.file); if(!u) return null;
    var a = el("a", "filebtn glass"); a.href = u; a.target = "_blank"; a.rel = "noopener"; if(!/^https:/i.test(u)) a.setAttribute("download", "");
    var i = el("span", "ic g"); i.appendChild(ic("file")); a.appendChild(i);
    var t = el("span", "txt"); t.appendChild(el("b", null, str(b.label) || fileName(u))); t.appendChild(el("small", null, str(b.note) || "Yuklab olish")); a.appendChild(t);
    a.appendChild(ic("next", "chev")); return a;
  }
  function linkBlock(b, solid){
    var u = safeUrl(b.url); if(!u) return null;
    var a = el("a", "linkbtn " + (solid ? "solid" : "glass")); a.href = u; a.target = "_blank"; a.rel = "noopener";
    var t = el("span", "txt"); t.appendChild(el("b", null, str(b.label) || "Ochish")); if(b.note) t.appendChild(el("small", null, b.note)); a.appendChild(t);
    a.appendChild(ic("link", "chev")); return a;
  }
  function statsBlock(b){
    var g = el("div", "stats");
    (Array.isArray(b.items) ? b.items : []).forEach(function(x){ var d = el("div", "stat"); d.appendChild(el("b", null, x.big)); if(x.small) d.appendChild(el("small", null, x.small)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
  function cardsBlock(b){
    var g = el("div", "cards");
    (Array.isArray(b.items) ? b.items : []).forEach(function(x){ var d = el("div", "ccard glass"); d.appendChild(el("b", null, x.title)); if(x.text) d.appendChild(el("p", null, x.text)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
})();
