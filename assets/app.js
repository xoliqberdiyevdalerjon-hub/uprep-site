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
    plane:'<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
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
    checklist:'<path d="M4 6.5l1.8 1.8L9 5M4 12.5l1.8 1.8L9 11M4 18.5l1.8 1.8L9 17M13 7h7M13 13h7M13 19h7"/>',
    steps:'<path d="M4 19h5v-5h5V9h6"/><path d="M17 6l3 3-3 3"/>',
    text:'<path d="M5 6h14M5 11h14M5 16h9"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    next:'<path d="M9 5l7 7-7 7"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    stop:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7v6"/><circle cx="12" cy="16.6" r="1.2" fill="currentColor" stroke="none"/>',
    info:'<circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r="1.2" fill="currentColor" stroke="none"/>',
    grid:'<path d="M4 18c3-6 6-1 8-6s5-6 8-6"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="6" r="2"/>',
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
    var m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/i);
    if(m) return "https://www.youtube-nocookie.com/embed/" + m[1];
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if(m) return "https://player.vimeo.com/video/" + m[1];
    return "";
  }
  function isVideoFile(u){ return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u); }
  function fileName(u){ return decodeURIComponent(str(u).split("/").pop() || ""); }

  /* dates: the last dd.mm.yyyy in a text is its deadline */
  var TODAY = new Date(); TODAY.setHours(0,0,0,0);
  function deadline(text){
    var all = str(text).match(/\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g); if(!all) return null;
    var p = all[all.length - 1].split("."), d = new Date(+p[2], +p[1] - 1, +p[0]);
    return isNaN(d) ? null : d;
  }
  function daysLeft(d){ return Math.round((d - TODAY) / 86400000); }
  function leftLabel(n){ return n === 0 ? "Bugun" : n === 1 ? "Ertaga" : n + " kun qoldi"; }

  /* per-visitor progress, kept only in this browser */
  var PKEY = "uprep-progress-v1", prog = {};
  try{ prog = JSON.parse(localStorage.getItem(PKEY) || "{}") || {}; }catch(e){ prog = {}; }
  function saveProg(){ try{ localStorage.setItem(PKEY, JSON.stringify(prog)); }catch(e){} }
  var open = {};
  try{ open = JSON.parse(sessionStorage.getItem("uprep-open") || "{}") || {}; }catch(e){ open = {}; }
  function saveOpen(){ try{ sessionStorage.setItem("uprep-open", JSON.stringify(open)); }catch(e){} }

  var root = document.getElementById("app");
  var S = { site:{}, stages:[], calendar:[], library:[] };
  var firstPaint = true;

  function load(name, fallback){
    return fetch("content/" + name + ".json", {cache:"no-cache"}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).catch(function(){ return fallback; });
  }
  Promise.all([load("site",{}), load("stages",[]), load("calendar",[]), load("library",[])]).then(function(r){
    S.site = r[0] || {}; S.stages = Array.isArray(r[1]) ? r[1] : []; S.calendar = Array.isArray(r[2]) ? r[2] : []; S.library = Array.isArray(r[3]) ? r[3] : [];
    S.stages.forEach(function(s, i){ if(!str(s.id)) s.id = "b" + (i + 1); s.id = str(s.id).replace(/[^\w-]/g, "-"); });
    S.calendar.forEach(function(c){ c._d = deadline(c.date); });
    if(S.site.title) document.title = S.site.title + " · Uprep";
    render(false);
  });

  function tgUrl(){ var u = str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); return "https://t.me/" + encodeURIComponent(u); }
  function tgName(){ return "@" + str(S.site.telegram || "Uprep_Admin").replace(/^@/, ""); }
  function doneCount(){ return S.stages.filter(function(s){ return prog[s.id]; }).length; }
  function nextStage(){ return S.stages.filter(function(s){ return !prog[s.id]; })[0] || null; }
  function upcoming(){ return S.calendar.filter(function(c){ return c._d && daysLeft(c._d) >= 0; }).sort(function(a, b){ return a._d - b._d; }); }

  function route(){
    var h = (location.hash || "").replace(/^#/, "");
    if(h === "kalendar") return {view:"cal"};
    if(h === "materiallar") return {view:"lib"};
    if(h === "bosqichlar") return {view:"route"};
    var m = h.match(/^m-(\d+)$/); if(m && S.library[+m[1]]) return {view:"item", i:+m[1]};
    var st = S.stages.filter(function(s){ return s.id === h; })[0];
    if(st) return {view:"stage", st:st};
    return {view:"home"};
  }
  function go(hash){ if(location.hash.replace(/^#/, "") === hash) render(true); else location.hash = hash; }
  window.addEventListener("hashchange", function(){ render(true); });
  window.addEventListener("scroll", function(){ var b = document.querySelector(".appbar"); if(b) b.classList.toggle("scrolled", window.scrollY > 4); }, {passive:true});

  function render(top){
    var r = route();
    root.textContent = "";
    root.appendChild(appbar(r));
    var main = el("main", "wrap" + (r.view === "home" ? "" : " narrow"));
    if(r.view === "home") homeView(main);
    else if(r.view === "route") routeView(main);
    else if(r.view === "cal") calView(main);
    else if(r.view === "lib") libView(main);
    else if(r.view === "item") itemView(main, r.i);
    else stageView(main, r.st);
    root.appendChild(main);
    root.appendChild(tabbar(r));
    if(top) window.scrollTo(0, 0);
    firstPaint = false;
  }

  function logo(h){ var c = el("span", "chip"), l = el("span", "logo"); l.style.setProperty("--h", h + "px"); l.setAttribute("role", "img"); l.setAttribute("aria-label", "Uprep"); c.appendChild(l); return c; }

  function appbar(r){
    var bar = el("header", "appbar"), w = el("div", "wrap");
    if(r.view === "home"){ w.appendChild(logo(20)); w.appendChild(el("span", "ttl")); }
    else {
      var b = el("button", "iconbtn"); b.type = "button"; b.appendChild(ic("back")); b.appendChild(el("span", null, "Orqaga"));
      b.onclick = function(){ if(r.view === "item") go("materiallar"); else if(r.view === "stage") go("bosqichlar"); else go(""); }; w.appendChild(b);
      var t = r.view === "cal" ? "Kalendar" : r.view === "lib" ? "Materiallar" : r.view === "route" ? "Bosqichlar" : r.view === "item" ? str(S.library[r.i].title) : str(r.st.title);
      w.appendChild(el("span", "ttl", t));
    }
    var tg = el("a", "iconbtn tg"); tg.href = tgUrl(); tg.target = "_blank"; tg.rel = "noopener";
    tg.appendChild(ic("chat")); tg.appendChild(el("span", null, "Yozish")); w.appendChild(tg);
    bar.appendChild(w); return bar;
  }

  function tabbar(r){
    var nav = el("nav", "tabbar"), inn = el("div", "in"); nav.setAttribute("aria-label", "Asosiy menyu");
    function tab(name, label, on, hash){ var b = el("button", "tab" + (on ? " on" : "")); b.type = "button"; if(on) b.setAttribute("aria-current", "page"); b.appendChild(ic(name)); b.appendChild(el("span", null, label)); b.onclick = function(){ go(hash); }; inn.appendChild(b); }
    tab("home", "Bosh sahifa", r.view === "home", "");
    tab("grid", "Bosqichlar", r.view === "stage" || r.view === "route", "bosqichlar");
    tab("folder", "Materiallar", r.view === "lib" || r.view === "item", "materiallar");
    tab("cal", "Kalendar", r.view === "cal", "kalendar");
    nav.appendChild(inn); return nav;
  }

  function footer(main){
    var f = el("footer", "foot");
    if(S.site.footer) f.appendChild(el("p", null, S.site.footer));
    var p = el("p", "brand"); p.appendChild(logo(13)); p.appendChild(document.createTextNode("© " + new Date().getFullYear() + " Uprep")); f.appendChild(p);
    main.appendChild(f);
  }
  function secHead(title, linkText, hash){
    var h = el("div", "sec-head"); h.appendChild(el("h2", null, title));
    if(linkText){ var a = el("a", null, linkText); a.href = "#" + hash; h.appendChild(a); }
    return h;
  }

  /* ---------- home ---------- */
  function homeView(main){
    var grid = el("div", "home"), side = el("div", "col side"), rest = el("div", "col");
    side.appendChild(boardingPass());
    var nx = upcoming()[0]; if(nx) side.appendChild(departure(nx));
    side.appendChild(rowBtn("chat", tgName() + " ga yozing", "Hujjatlaringizni birga tekshiramiz", "tg", tgUrl()));

    if(S.stages.length){ rest.appendChild(secHead("Bosqichlar")); rest.appendChild(routeLine()); }
    if(S.library.length){
      rest.appendChild(secHead("Materiallar", "Hammasi", "materiallar"));
      var rail = el("div", "rail"); S.library.forEach(function(m, i){ rail.appendChild(mediaCard(m, i)); }); rest.appendChild(rail);
    }
    var up = upcoming().slice(0, 3);
    if(up.length){ rest.appendChild(secHead("Yaqin sanalar", "Kalendar", "kalendar")); rest.appendChild(agenda(up, true)); }
    footer(rest);
    grid.appendChild(side); grid.appendChild(rest); main.appendChild(grid);
  }

  function boardingPass(){
    var total = S.stages.length, n = doneCount(), nx = nextStage();
    var pass = el("section", "pass"); pass.setAttribute("aria-label", "Sizning yo'lingiz");
    var m = el("div", "pass-main");
    if(S.site.eyebrow){ var top = el("div", "pass-top"); top.appendChild(el("span", "year", str(S.site.eyebrow))); m.appendChild(top); }
    m.appendChild(el("h1", null, S.site.title || "Italiyaga yo'l"));
    var rt = el("div", "route");
    var a = el("div", "city"); a.appendChild(el("b", null, "TAS")); a.appendChild(el("small", null, "Toshkent")); rt.appendChild(a);
    var tr = el("div", "track"); tr.setAttribute("role", "img"); tr.setAttribute("aria-label", n + " / " + total + " bosqich bajarildi");
    tr.appendChild(el("span", "fill")); var pl = el("span", "plane"); pl.appendChild(ic("plane")); tr.appendChild(pl); rt.appendChild(tr);
    var b = el("div", "city r"); b.appendChild(el("b", null, "ITA")); b.appendChild(el("small", null, "Italiya")); rt.appendChild(b);
    m.appendChild(rt);
    if(S.site.lead) m.appendChild(el("p", "lead", S.site.lead));
    pass.appendChild(m);

    var pct = total ? Math.round(n / total * 100) : 0;
    /* one orchestrated moment: the plane flies to your progress on first load */
    if(firstPaint && pct > 0 && !matchMedia("(prefers-reduced-motion: reduce)").matches){
      tr.style.setProperty("--p", "0%"); requestAnimationFrame(function(){ requestAnimationFrame(function(){ tr.style.setProperty("--p", pct + "%"); }); });
    } else tr.style.setProperty("--p", pct + "%");

    if(total){
      var stub = el("div", "pass-stub");
      var c = el("div", "stub-count"); c.appendChild(el("small", null, "Bajarildi")); c.appendChild(el("b", null, n + "/" + total)); stub.appendChild(c);
      var g = el("button", "go" + (nx ? "" : " done")); g.type = "button";
      var sp = el("span"); sp.appendChild(el("small", null, nx ? (n ? "Davom etish" : "Boshlash") : "Hammasi tayyor"));
      sp.appendChild(el("span", "t", nx ? (S.stages.indexOf(nx) + 1) + ". " + str(nx.title) : "Italiyaga xush kelibsiz!"));
      g.appendChild(sp); g.appendChild(ic(nx ? "next" : "check"));
      g.onclick = function(){ go(nx ? nx.id : "bosqichlar"); };
      stub.appendChild(g); pass.appendChild(stub);
    }
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

  function rowBtn(icon, title, sub, kind, href, fn){
    var b = el(href ? "a" : "button", "row" + (kind ? " " + kind : ""));
    if(href){ b.href = href; b.target = "_blank"; b.rel = "noopener"; } else { b.type = "button"; b.onclick = fn; }
    var i = el("span", "ic" + (kind === "g" ? " g" : "")); i.appendChild(ic(icon)); b.appendChild(i);
    var t = el("span", "txt"); t.appendChild(el("b", null, title)); if(sub) t.appendChild(el("small", null, sub)); b.appendChild(t);
    b.appendChild(ic("next", "chev")); return b;
  }

  function routeLine(){
    var ol = el("ol", "line"), nx = nextStage();
    S.stages.forEach(function(s, i){
      var done = !!prog[s.id], cur = s === nx;
      var li = el("li", "stop" + (done ? " done" : "") + (cur ? " current" : ""));
      var b = el("button"); b.type = "button";
      var d = el("span", "dot"); if(done) d.appendChild(ic("check")); else d.textContent = String(i + 1); b.appendChild(d);
      var t = el("span", "txt"); t.appendChild(el("b", null, s.title));
      if(s.sub) t.appendChild(el("small", null, s.sub));
      if(cur) t.appendChild(el("span", "now", "Siz shu yerdasiz"));
      b.appendChild(t); b.appendChild(ic("next", "chev"));
      b.setAttribute("aria-label", (i + 1) + "-bosqich: " + str(s.title) + (done ? ", bajarildi" : cur ? ", hozirgi bosqich" : ""));
      b.onclick = function(){ go(s.id); };
      li.appendChild(b); ol.appendChild(li);
    });
    return ol;
  }
  function routeView(main){
    var h = el("div", "pagehead"); h.appendChild(el("h1", null, "Bosqichlar"));
    h.appendChild(el("p", null, doneCount() + " / " + S.stages.length + " bajarildi. Bosqichni bosing: nima qilinadi, qaysi hujjat kerak va qachongacha."));
    main.appendChild(h); main.appendChild(routeLine()); footer(main);
  }

  var KIND = { video:["play","Video"], file:["file","Fayl"], link:["link","Havola"], image:["image","Rasm"] };
  function kindOf(m){ var k = str(m.kind); return KIND[k] ? k : (m.file ? "file" : m.image ? "image" : "link"); }
  function mediaCard(m, i){
    var k = kindOf(m), b = el("a", "mcard"); b.href = "#m-" + i;
    var th = el("span", "thumb" + (k === "video" ? " v" : k === "file" ? " g" : ""));
    var img = safeUrl(m.image);
    if(img){ var im = el("img"); im.src = img; im.alt = ""; im.loading = "lazy"; th.appendChild(im); } else th.appendChild(ic(KIND[k][0]));
    b.appendChild(th);
    b.appendChild(el("span", "kind", KIND[k][1]));
    b.appendChild(el("b", null, m.title));
    if(m.desc) b.appendChild(el("small", null, m.desc));
    return b;
  }

  /* ---------- library ---------- */
  function libView(main){
    var h = el("div", "pagehead"); h.appendChild(el("h1", null, "Materiallar")); h.appendChild(el("p", null, "Rasmiy hujjatlar, videolar va foydali havolalar.")); main.appendChild(h);
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
    else node = linkBlock({url:m.url, label:"Ochish", note:m.url});
    if(node) box.appendChild(node);
    main.appendChild(box);
  }

  /* ---------- calendar ---------- */
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
    var h = el("div", "pagehead"); h.appendChild(el("h1", null, "Kalendar")); h.appendChild(el("p", null, "Yil davomidagi muhim sanalar. O'tib ketganlari xira ko'rinadi.")); main.appendChild(h);
    if(!S.calendar.length){ main.appendChild(el("div", "empty", "Hozircha sana yo'q.")); footer(main); return; }
    main.appendChild(agenda(S.calendar, false)); footer(main);
  }

  /* ---------- stage ---------- */
  function minimap(s){
    var nav = el("nav", "minimap"); nav.setAttribute("aria-label", "Bosqichlar xaritasi");
    S.stages.forEach(function(x, i){
      var b = el("button", (prog[x.id] ? "done" : "") + (x === s ? " here" : "")); b.type = "button";
      b.setAttribute("aria-label", (i + 1) + "-bosqich: " + str(x.title)); if(x === s) b.setAttribute("aria-current", "step");
      var d = el("span", null, String(i + 1)); b.appendChild(d);
      b.onclick = function(){ go(x.id); }; nav.appendChild(b);
    });
    return nav;
  }
  function stageView(main, s){
    var idx = S.stages.indexOf(s), done = !!prog[s.id];
    main.appendChild(minimap(s));
    var head = el("section", "stagehead");
    head.appendChild(el("span", "big", String(idx + 1)));
    var k = el("span", "kicker" + (done ? " ok" : "")); if(done) k.appendChild(ic("check")); k.appendChild(document.createTextNode(done ? "Bajarildi" : (idx + 1) + "-bosqich, jami " + S.stages.length + " ta")); head.appendChild(k);
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

    var box = el("div", "blocks"), firstAcc = true;
    (Array.isArray(s.blocks) ? s.blocks : []).forEach(function(b, bi){
      var node = null, type = str(b && (b.type || b._block));
      if(type === "text") node = accordion(s, bi, b.title || "Ma'lumot", "text", textBody(b.body), firstAcc);
      else if(type === "list") node = accordion(s, bi, b.title || "Ro'yxat", b.style === "checklist" ? "checklist" : b.style === "steps" ? "steps" : "list", listBody(s, b), firstAcc, b.style === "checklist" ? checkMeter(s, b) : null);
      else if(type === "callout") node = callout(b);
      else if(type === "video") node = videoBlock(b);
      else if(type === "image") node = imageBlock(b);
      else if(type === "file") node = fileBlock(b);
      else if(type === "button") node = linkBlock(b);
      else if(type === "stats") node = statsBlock(b);
      else if(type === "cards") node = cardsBlock(b);
      if(node){ if(node.classList.contains("acc")) firstAcc = false; box.appendChild(node); }
    });
    main.appendChild(box);

    var big = el("button", "markdone" + (done ? " on" : "")); big.type = "button"; big.setAttribute("aria-pressed", done ? "true" : "false");
    big.appendChild(ic("check")); big.appendChild(el("span", null, done ? "Bajarildi" : "Bajarildi deb belgilash"));
    big.onclick = function(){ if(prog[s.id]) delete prog[s.id]; else prog[s.id] = true; saveProg(); render(false); };
    main.appendChild(big);

    var nxt = S.stages[idx + 1], prev = S.stages[idx - 1];
    if(nxt){
      var nc = el("button", "nextcard"); nc.type = "button";
      var dd = el("span", "dot", String(idx + 2)); nc.appendChild(dd);
      var t = el("span", "txt"); t.appendChild(el("small", null, "Keyingi bosqich")); t.appendChild(el("b", null, nxt.title)); nc.appendChild(t);
      nc.appendChild(ic("next")); nc.onclick = function(){ go(nxt.id); }; main.appendChild(nc);
    }
    if(prev){ var pb = el("button", "prevlink"); pb.type = "button"; pb.appendChild(ic("back")); pb.appendChild(el("span", null, "Oldingi: " + str(prev.title))); pb.onclick = function(){ go(prev.id); }; main.appendChild(pb); }

    var u = safeUrl(s.srcUrl);
    if(u){ var a = el("a", "src"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Rasmiy manba: " + (s.srcLabel || u))); main.appendChild(a); }
    footer(main);
  }

  function accordion(s, bi, title, icon, body, defOpen, meter){
    var key = s.id + ":" + bi, isOpen = key in open ? open[key] : defOpen;
    var wrap = el("section", "acc");
    var btn = el("button", "acc-btn"); btn.type = "button"; btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    var i = el("span", "ic"); i.appendChild(ic(icon)); btn.appendChild(i);
    var t = el("span", "t"); t.appendChild(document.createTextNode(title)); if(meter) t.appendChild(meter); btn.appendChild(t);
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
    var fig = el("figure", "media");
    if(b.title) fig.appendChild(el("div", "ttl", b.title));
    var url = safeUrl(b.url), file = safeUrl(b.file), emb = url ? videoEmbed(url) : "";
    var fr = el("div", "frame");
    if(emb){ var f = el("iframe"); f.src = emb; f.title = str(b.title) || "Video"; f.loading = "lazy"; f.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true; fr.appendChild(f); fig.appendChild(fr); }
    else if(file || (url && isVideoFile(url))){ var v = el("video"); v.controls = true; v.preload = "metadata"; v.playsInline = true; v.src = file || url; fr.appendChild(v); fig.appendChild(fr); }
    else if(url){ return linkBlock({url:url, label:str(b.title) || "Videoni ochish", note:b.caption}); }
    else return null;
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
    (Array.isArray(b.items) ? b.items : []).forEach(function(x){ if(!x) return; var d = el("div", "stat"); d.appendChild(el("b", null, x.big)); if(x.small) d.appendChild(el("small", null, x.small)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
  function cardsBlock(b){
    var g = el("div", "cards");
    (Array.isArray(b.items) ? b.items : []).forEach(function(x){ if(!x) return; var d = el("div", "ccard"); d.appendChild(el("b", null, x.title)); if(x.text) d.appendChild(el("p", null, x.text)); g.appendChild(d); });
    return g.children.length ? g : null;
  }
})();
