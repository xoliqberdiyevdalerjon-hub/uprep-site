/* Uprep platform. Texts live in content/*.json (edited in Pages CMS). Accounts and payment: Supabase + Stripe,
   switched on by assets/config.js. This file only draws pages; nothing here needs editing to add content. */
(function(){
  "use strict";

  /* ---------------- icons ---------------- */
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
    route:'<path d="M4 18c3-6 6-1 8-6s5-6 8-6"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="6" r="2"/>',
    folder:'<path d="M3.5 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2h-13a2 2 0 01-2-2z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3"/>',
    pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    globe:'<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.8 3 2.8 16 0 19M12 2.5c-2.8 3-2.8 16 0 19"/>',
    star:'<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
    out:'<path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3"/><path d="M10 8l-4 4 4 4M6 12h10"/>'
  };
  function ic(name, cls){
    var s = document.createElementNS("http://www.w3.org/2000/svg","svg");
    s.setAttribute("viewBox","0 0 24 24"); s.setAttribute("fill","none"); s.setAttribute("stroke","currentColor");
    s.setAttribute("stroke-width","2"); s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round"); s.setAttribute("aria-hidden","true");
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
    if(h === "kurs") return {view:"course"};
    if(h === "kalendar") return {view:"cal"};
    if(h === "materiallar") return {view:"lib"};
    if(h === "kirish") return {view:"login", mode:"in"};
    if(h === "royxat") return {view:"login", mode:"up"};
    if(h.indexOf("hisob") === 0) return {view:"account", paidReturn:/paid=1/.test(h)};
    if((m = h.match(/^m-(\d+)$/)) && S.library[+m[1]]) return {view:"item", i:+m[1]};
    if((m = h.match(/^shahar-([\w-]+)$/)) && cityById(m[1])) return {view:"city", c:cityById(m[1])};
    if((m = h.match(/^uni-([\w-]+)$/)) && uniById(m[1])) return {view:"uni", u:uniById(m[1])};
    var st = S.stages.filter(function(s){ return s.id === h; })[0];
    if(st) return {view:"stage", st:st};
    return {view:"home"};
  }
  function go(hash){ if(location.hash.replace(/^#/, "") === hash) render(true); else location.hash = hash; }
  window.addEventListener("hashchange", function(){ if(S.loaded) render(true); });
  window.addEventListener("scroll", function(){ var b = document.querySelector(".appbar"); if(b) b.classList.toggle("scrolled", window.scrollY > 4); }, {passive:true});

  function render(top){
    var r = route();
    root.textContent = "";
    root.appendChild(appbar(r));
    var wide = r.view === "home" || r.view === "italy";
    var main = el("main", "wrap" + (wide ? "" : " narrow"));
    ({home:homeView, italy:italyView, unis:unisView, course:courseView, cal:calView, lib:libView, login:loginView, account:accountView,
      item:function(m){ itemView(m, r.i); }, city:function(m){ cityView(m, r.c); }, uni:function(m){ uniView(m, r.u); }, stage:function(m){ stageView(m, r.st); }
    }[r.view] || homeView)(main, r);
    root.appendChild(main);
    root.appendChild(tabbar(r));
    if(top) window.scrollTo(0, 0);
    firstPaint = false;
  }

  /* ---------------- chrome ---------------- */
  function logo(h){ var c = el("span", "chip"), l = el("span", "logo"); l.style.setProperty("--h", h + "px"); l.setAttribute("role", "img"); l.setAttribute("aria-label", "Uprep"); c.appendChild(l); return c; }
  function backTo(r){
    if(r.view === "item") return "materiallar";
    if(r.view === "stage") return "kurs";
    if(r.view === "uni"){ return "universitetlar"; }
    if(r.view === "city" || r.view === "unis") return "italiya";
    return "";
  }
  function appbar(r){
    var bar = el("header", "appbar"), w = el("div", "wrap");
    if(r.view === "home"){ var hl = el("a"); hl.href = "#"; hl.appendChild(logo(20)); w.appendChild(hl); w.appendChild(el("span", "ttl")); }
    else {
      var b = el("button", "iconbtn"); b.type = "button"; b.appendChild(ic("back")); b.appendChild(el("span", null, "Orqaga"));
      b.onclick = function(){ go(backTo(r)); }; w.appendChild(b);
      var T = {italy:"Italiya", unis:"Universitetlar", course:"Kurs", cal:"Kalendar", lib:"Materiallar", login:"Kirish", account:"Hisob"};
      var t = T[r.view] || (r.view === "item" ? str(S.library[r.i].title) : r.view === "city" ? str(r.c.name) : r.view === "uni" ? str(r.u.short || r.u.name) : r.view === "stage" ? str(r.st.title) : "");
      w.appendChild(el("span", "ttl", t));
    }
    var acc = el("button", "iconbtn" + (A.user ? " me" : " tg")); acc.type = "button";
    acc.appendChild(ic(A.user ? "user" : "user")); acc.appendChild(el("span", null, A.user ? "Hisob" : "Kirish"));
    acc.onclick = function(){ go(A.user ? "hisob" : "kirish"); };
    w.appendChild(acc);
    bar.appendChild(w); return bar;
  }
  function tabbar(r){
    var nav = el("nav", "tabbar"), inn = el("div", "in"); nav.setAttribute("aria-label", "Asosiy menyu");
    function tab(name, label, on, hash){ var b = el("button", "tab" + (on ? " on" : "")); b.type = "button"; if(on) b.setAttribute("aria-current", "page"); b.appendChild(ic(name)); b.appendChild(el("span", null, label)); b.onclick = function(){ go(hash); }; inn.appendChild(b); }
    tab("home", "Bosh sahifa", r.view === "home", "");
    tab("globe", "Italiya", r.view === "italy" || r.view === "city" || r.view === "unis" || r.view === "uni", "italiya");
    tab("route", "Kurs", r.view === "course" || r.view === "stage" || r.view === "cal" || r.view === "lib" || r.view === "item", "kurs");
    tab("user", "Hisob", r.view === "account" || r.view === "login", A.user ? "hisob" : "kirish");
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
      put(rest, secHead("Italiya universitetlari", "Hammasi", "universitetlar"), 10);
      var rail = el("div", "rail"); S.unis.slice(0, 6).forEach(function(u){ rail.appendChild(uniCard(u, true)); }); put(rest, rail, 11);
    }
    footer(rest); if(rest.lastChild) rest.lastChild.style.order = 30;
    grid.appendChild(side); grid.appendChild(rest); main.appendChild(grid);
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
    var hk = el("span", "kicker"); hk.appendChild(ic("globe")); hk.appendChild(document.createTextNode("Davlat qo'llanmasi")); head.appendChild(hk);
    head.appendChild(el("h1", null, I.title || "Italiya"));
    if(I.lead) head.appendChild(el("p", "intro", I.lead));
    var st = statsBlock({items:I.stats}); if(st) head.appendChild(st);
    main.appendChild(head);

    var secs = arr(I.sections);
    var chips = el("nav", "chipnav"); chips.setAttribute("aria-label", "Bo'limlar");
    function chip(label, id){ var b = el("button", "chipbtn", label); b.type = "button"; b.onclick = function(){ var t = document.getElementById(id); if(t) t.scrollIntoView({behavior:"smooth", block:"start"}); }; chips.appendChild(b); }
    secs.forEach(function(s){ chip(s.title, "sec-" + s.id); });
    if(S.cities.length) chip("Shaharlar", "sec-shahar");
    if(S.unis.length) chip("Universitetlar", "sec-uni");
    if(S.calendar.length) chip("Sanalar", "sec-sana");
    main.appendChild(chips);

    var cols = el("div", "italy");
    var left = el("div", "col"), right = el("div", "col side");
    secs.forEach(function(s){
      left.appendChild(secHead(s.title, null, null, "sec-" + s.id));
      var box = el("div", "blocks flat"); arr(s.blocks).forEach(function(b, bi){ var n = blockNode({id:"it-" + s.id}, b, bi, true); if(n) box.appendChild(n); }); left.appendChild(box);
    });
    if(S.cities.length){
      left.appendChild(secHead("Shaharlar", null, null, "sec-shahar"));
      var cg = el("div", "cities"); S.cities.forEach(function(c){ cg.appendChild(cityCard(c)); }); left.appendChild(cg);
    }
    if(S.unis.length){
      left.appendChild(secHead("Universitetlar", "Hammasi", "universitetlar", "sec-uni"));
      var ug = el("div", "unilist"); S.unis.forEach(function(u){ ug.appendChild(uniCard(u)); }); left.appendChild(ug);
    }
    var nx = upcoming()[0]; if(nx) right.appendChild(departure(nx));
    if(S.calendar.length){ right.appendChild(secHead("Muhim sanalar", "Kalendar", "kalendar", "sec-sana")); right.appendChild(agenda(upcoming().slice(0, 4), true)); }
    right.appendChild(hasCourse() ? rowBtn("route", "Kursni davom ettirish", "Bosqichma-bosqich yo'riqnoma", "g", "#kurs") : priceCard(true));
    cols.appendChild(left); cols.appendChild(right); main.appendChild(cols);
    footer(main);
  }
  function cityCard(c){
    var a = el("a", "citycard"); a.href = "#shahar-" + c.id;
    var t = el("span", "txt"); t.appendChild(el("b", null, c.name)); t.appendChild(el("small", null, str(c.region) + (c.dsu ? ", stipendiya: " + str(c.dsu) : ""))); a.appendChild(t);
    var n = S.unis.filter(function(u){ return u.city === c.id; }).length;
    if(n) a.appendChild(el("span", "count", n + " univ."));
    a.appendChild(ic("next", "chev"));
    return a;
  }
  function uniNext(u){
    var list = arr(u.deadlines).map(function(d){ return {d:deadline(d.date), x:d}; }).filter(function(o){ return o.d && daysLeft(o.d) >= 0; }).sort(function(a, b){ return a.d - b.d; });
    return list[0] || null;
  }
  function uniCard(u, rail){
    var a = el("a", rail ? "unicard rail-item" : "unicard"); a.href = "#uni-" + u.id;
    var top = el("span", "u-top");
    top.appendChild(el("span", "u-mono", str(u.short || u.name).replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()));
    var city = cityById(u.city); var meta = el("span", "u-meta"); meta.appendChild(el("b", null, u.short || u.name)); meta.appendChild(el("small", null, (city ? city.name : "") + (u.founded ? ", " + u.founded + "-yil" : ""))); top.appendChild(meta);
    a.appendChild(top);
    var tags = el("span", "u-tags");
    if(u.rank) tags.appendChild(el("span", "tag", u.rank));
    var nx = uniNext(u);
    if(nx) tags.appendChild(el("span", "tag hot", nx.x.label.replace(/\s*\(.*\)/, "") + ": " + leftLabel(daysLeft(nx.d))));
    a.appendChild(tags);
    return a;
  }
  function unisView(main){
    pageHead(main, "Italiya universitetlari", "Ariza portali, muddatlar, talablar va stipendiya: har biri rasmiy manba bilan.");
    var g = el("div", "unilist"); S.unis.forEach(function(u){ g.appendChild(uniCard(u)); }); main.appendChild(g);
    main.appendChild(el("p", "muted-note", "Ro'yxat kengayib boradi. Kerakli universitetingiz yo'q bo'lsa, " + tgName() + " ga yozing."));
    footer(main);
  }
  function cityView(main, c){
    var head = el("section", "stagehead");
    var k = el("span", "kicker"); k.appendChild(ic("pin")); k.appendChild(document.createTextNode(str(c.region) + ", Italiya")); head.appendChild(k);
    head.appendChild(el("h1", null, c.name));
    if(c.intro) head.appendChild(el("p", "intro", c.intro));
    main.appendChild(head);
    var box = el("div", "blocks");
    if(arr(c.points).length){ var card = el("section", "card"); card.appendChild(el("h3", null, "Bilish kerak")); var ul = el("ul", "bullets"); arr(c.points).forEach(function(x){ ul.appendChild(el("li", null, x)); }); card.appendChild(ul); box.appendChild(card); }
    if(c.dsu) box.appendChild(callout({style:"info", text:"Stipendiya beradigan idora: " + c.dsu + "."}));
    main.appendChild(box);
    var us = S.unis.filter(function(u){ return u.city === c.id; });
    if(us.length){ main.appendChild(secHead("Universitetlar")); var g = el("div", "unilist"); us.forEach(function(u){ g.appendChild(uniCard(u)); }); main.appendChild(g); }
    footer(main);
  }
  function uniView(main, u){
    var city = cityById(u.city);
    var head = el("section", "stagehead unihead");
    var k = el("span", "kicker"); k.appendChild(ic("pin")); k.appendChild(document.createTextNode((city ? city.name : "") + (u.founded ? ", " + u.founded + "-yildan" : ""))); head.appendChild(k);
    head.appendChild(el("h1", null, u.short || u.name));
    if(u.short && u.name !== u.short) head.appendChild(el("p", "sub", u.name));
    if(u.rank){ var rk = el("span", "rank"); rk.appendChild(ic("star")); rk.appendChild(document.createTextNode(u.rank)); head.appendChild(rk); }
    if(u.intro) head.appendChild(el("p", "intro", u.intro));
    var pu = safeUrl(u.portalUrl);
    if(pu){
      var cta = el("a", "go wide"); cta.href = pu; cta.target = "_blank"; cta.rel = "noopener";
      var sp = el("span"); sp.appendChild(el("small", null, "Ariza: " + (u.fee || host(pu)))); sp.appendChild(el("span", "t", u.portalLabel || "Ro'yxatdan o'tish")); cta.appendChild(sp); cta.appendChild(ic("link"));
      head.appendChild(cta);
    }
    main.appendChild(head);

    var box = el("div", "blocks");
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
    if(arr(u.docs).length){ var dk = el("section", "card"); dk.appendChild(el("h3", null, "Kerakli hujjatlar")); var ul2 = el("ul", "bullets"); arr(u.docs).forEach(function(x){ ul2.appendChild(el("li", null, x)); }); dk.appendChild(ul2); box.appendChild(dk); }
    var facts = el("section", "facts");
    function fact(k2, v){ if(!v) return; var d = el("div", "fact"); d.appendChild(el("span", "k", k2)); d.appendChild(el("span", "v", v)); facts.appendChild(d); }
    fact("Stipendiya", u.scholarship); fact("Qabul foizi", u.acceptance);
    if(facts.children.length) box.appendChild(facts);
    var vb = videoBlock({url:u.video, title:"Ariza topshirish: video"}); if(vb) box.appendChild(vb);
    if(u.tip) box.appendChild(callout({style:"tip", text:u.tip}));
    var links = el("div", "links");
    if(safeUrl(u.programmesUrl)) links.appendChild(rowBtn("list", "Yo'nalishlar ro'yxati", host(u.programmesUrl), null, safeUrl(u.programmesUrl)));
    if(safeUrl(u.infoUrl)) links.appendChild(rowBtn("info", "Xalqaro talabalar sahifasi", host(u.infoUrl), null, safeUrl(u.infoUrl)));
    if(links.children.length) box.appendChild(links);
    main.appendChild(box);
    main.appendChild(upsell());
    arr(u.sources).forEach(function(s){ var su = safeUrl(s.url); if(!su) return; var a = el("a", "src"); a.href = su; a.target = "_blank"; a.rel = "noopener"; a.appendChild(ic("link")); a.appendChild(el("span", null, "Rasmiy manba: " + (s.label || su))); main.appendChild(a); });
    footer(main);
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
    btn.appendChild(ic("next", "chev"));
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
