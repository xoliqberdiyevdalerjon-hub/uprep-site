#!/usr/bin/env python3
"""Uprep: Google uchun statik sahifalar yaratadi (content/*.json dan).

Sayt asosiy ilovasi #hash manzillarda ishlaydi va Google ularni alohida sahifa deb ko'rmaydi.
Bu skript har bir universitet va asosiy mavzu uchun oddiy HTML sahifa, sitemap.xml va robots.txt yozadi.
Ishga tushirish (repo ildizidan):  python3 scripts/build_seo.py
Ma'lumot o'zgarganda (CMS yoki haftalik tekshiruv) qayta ishga tushiriladi.
O'z domeningizga o'tsangiz, BASE ni o'zgartiring.
"""
import html, json, os, re, shutil, datetime

BASE = "https://xoliqberdiyevdalerjon-hub.github.io/uprep-site/"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TODAY = datetime.date.today()
GENERATED = ["uni", "universitetlar", "stipendiya", "noldan", "foundation", "testlar", "ota-onalar", "tariflar", "qollanma"]


def load(name, default):
    try:
        with open(os.path.join(ROOT, "content", name + ".json"), encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return default


SITE, UNIS, CITIES = load("site", {}), load("universities", []), load("cities", [])
DSU, GUIDE, NOLDAN = load("dsu", {}), load("guide", {}), load("noldan", {})
FOUND, TESTS, PARENTS = load("foundation", {}), load("tests", {}), load("parents", {})
CITY = {c["id"]: c for c in CITIES}
TG = "https://t.me/" + str(SITE.get("telegram") or "Uprep_Admin").lstrip("@")
TGN = "@" + str(SITE.get("telegram") or "Uprep_Admin").lstrip("@")
UPDATED = SITE.get("updated") or TODAY.strftime("%d.%m.%Y")


def e(t):
    return html.escape(str(t or ""), quote=True)


def paras(t):
    return "".join(f"<p>{e(p.strip())}</p>" for p in re.split(r"\n\s*\n", str(t or "")) if p.strip())


def ul(items, cls="ticks"):
    items = [i for i in items if str(i or "").strip()]
    return f'<ul class="{cls}">' + "".join(f"<li>{e(i)}</li>" for i in items) + "</ul>" if items else ""


def safe(u):
    u = str(u or "").strip()
    return u if u.startswith("https://") else ""


def dsu_for(city_id):
    for a in DSU.get("agencies", []):
        if city_id in (a.get("cities") or []):
            return a
    return None


def last_date(t):
    m = re.findall(r"\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b", str(t or ""))
    if not m:
        return None
    d, mo, y = m[-1]
    try:
        return datetime.date(int(y), int(mo), int(d))
    except ValueError:
        return None


def page(path, title, desc, body, crumbs, app_hash, jsonld=None):
    """path: e.g. 'uni/sapienza/' (relative to BASE)."""
    depth = path.strip("/").count("/") + 1 if path.strip("/") else 0
    up = "../" * depth
    url = BASE + path
    bc = [{"@type": "ListItem", "position": i + 1, "name": n, "item": BASE + p} for i, (n, p) in enumerate(crumbs)]
    ld = [{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": bc}]
    if jsonld:
        ld += jsonld if isinstance(jsonld, list) else [jsonld]
    crumb_html = " › ".join(f'<a href="{up}{p}">{e(n)}</a>' if i < len(crumbs) - 1 else f"<span>{e(n)}</span>" for i, (n, p) in enumerate(crumbs))
    doc = f"""<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{e(url)}">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{e(url)}">
<meta property="og:image" content="{BASE}media/hero-rome.jpg">
<meta property="og:locale" content="uz_UZ">
<meta name="theme-color" content="#16274A">
<link rel="icon" href="{up}media/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Sans:wght@400;600;700&display=swap">
<link rel="stylesheet" href="{up}assets/seo.css?v=1">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<header class="top"><div class="w"><a class="brand" href="{up}">up<b>rep</b></a><nav><a href="{up}qollanma/">Qo'llanma</a><a href="{up}universitetlar/">Universitetlar</a><a href="{up}stipendiya/">Stipendiya</a><a href="{up}tariflar/">Tariflar</a></nav></div></header>
<main class="w">
<nav class="crumbs" aria-label="Siz turgan joy">{crumb_html}</nav>
{body}
<section class="cta">
<h2>Keyingi qadam</h2>
<p>Uprep ilovasida shu ma'lumotni saqlang, muddatlarni kalendarga qo'shing va arizangizni kuzating. Hammasi bepul.</p>
<div class="btns"><a class="btn gold" href="{up}#{e(app_hash)}">Ilovada ochish</a><a class="btn" href="{up}#profil">Bepul profil tahlili</a><a class="btn" href="{e(TG)}" rel="noopener">{e(TGN)} ga yozish</a></div>
</section>
</main>
<footer class="foot"><div class="w">
<p>{e(SITE.get("footer") or "")}</p>
<p>Ma'lumotlar {e(UPDATED)} holatiga. © {TODAY.year} Uprep · <a href="{e(TG)}" rel="noopener">{e(TGN)}</a></p>
<p class="links"><a href="{up}noldan/">Italiyada o'qish noldan</a> · <a href="{up}universitetlar/">Universitetlar</a> · <a href="{up}stipendiya/">Stipendiyalar</a> · <a href="{up}foundation/">Foundation</a> · <a href="{up}testlar/">Testlar</a> · <a href="{up}ota-onalar/">Ota-onalar uchun</a> · <a href="{up}tariflar/">Tariflar</a></p>
</div></footer>
</body>
</html>
"""
    out = os.path.join(ROOT, path, "index.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write(doc)
    return path


def facts_table(rows):
    rows = [(k, v) for k, v in rows if str(v or "").strip()]
    return "<dl class=\"facts\">" + "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in rows) + "</dl>" if rows else ""


def sources_html(src):
    src = [s for s in src if safe(s.get("url"))]
    if not src:
        return ""
    return "<section><h2>Rasmiy manbalar</h2><ul class=\"src\">" + "".join(f'<li><a href="{e(safe(s["url"]))}" rel="noopener">{e(s.get("label") or s["url"])}</a></li>' for s in src) + "</ul></section>"


def uni_page(u):
    c = CITY.get(u.get("city"), {})
    name, short = u.get("name", ""), u.get("short") or u.get("name", "")
    ag = dsu_for(u.get("city"))
    progs = [p for p in u.get("programmes") or [] if not p.get("online")]
    en = [p for p in progs if p.get("lang") == "Ingliz"]
    ba = [p for p in en if p.get("level") == "Bakalavr"]
    ma = [p for p in en if p.get("level") == "Magistratura"]
    city_name = c.get("name", "")
    title = f"{short} ({city_name}): qabul, muddatlar, stipendiya, ingliz tilidagi dasturlar | Uprep"
    desc = f"{name}: {u.get('enCount') or len(en)} ta ingliz tilidagi dastur, ariza tartibi va muddatlari, {('stipendiya: ' + ag['name']) if ag else 'stipendiya'}. O'zbek tilida, rasmiy manbalar asosida."
    b = [f"<h1>{e(short)}: Italiyada o'qish</h1>"]
    b.append(f'<p class="lead">{e(u.get("intro") or (name + ": " + city_name + " shahridagi " + str(u.get("type", "")).lower() + " universitet."))}</p>')
    b.append(facts_table([("To'liq nomi", name), ("Shahar", f"{city_name}, {c.get('region', '')}".strip(", ")), ("Turi", u.get("type")), ("Tashkil topgan", (u.get("founded") + "-yil") if u.get("founded") else ""),
                          ("Reyting", u.get("rank")), ("Ingliz tilidagi dasturlar", f"{u.get('enCount') or len(en)} ta (Universitaly bazasi)" if (u.get('enCount') or en) else ""), ("Ariza to'lovi", u.get("fee")), ("Kirish testlari", u.get("tests")),
                          ("Ingliz tili", u.get("english")), ("O'qish narxi", u.get("tuition") or "Davlat universitetlarida oila daromadiga (ISEE) qarab; stipendiya g'oliblari to'lamaydi" if u.get("type") == "Davlat" else u.get("tuition"))]))
    dl = u.get("deadlines") or []
    if dl or u.get("deadlineNote"):
        rows = []
        for d in dl:
            x = last_date(d.get("date"))
            state = " <small>(o'tdi)</small>" if x and x < TODAY else ""
            rows.append(f"<li><b>{e(d.get('date'))}</b> {e(d.get('label'))}{state}</li>")
        b.append("<section><h2>Ariza muddatlari</h2>" + (f'<ul class="dates">{"".join(rows)}</ul>' if rows else "") + (f"<p class=\"note\">{e(u.get('deadlineNote'))}</p>" if u.get("deadlineNote") else "") + "</section>")
    lv = u.get("levels") or []
    if lv:
        b.append("<section><h2>Talablar</h2>" + "".join(f"<h3>{e(L.get('name'))}{(' · ' + e(L.get('duration'))) if L.get('duration') else ''}</h3>{ul(L.get('req') or [])}" for L in lv) + "</section>")
    if u.get("docs"):
        b.append("<section><h2>Arizaga kerakli hujjatlar</h2>" + ul(u["docs"]) + "</section>")
    sch = u.get("scholarship") or ""
    if ag or sch:
        t = "<section><h2>Stipendiya</h2>"
        if sch:
            t += f"<p>{e(sch)}</p>"
        if ag:
            t += f"<p>Viloyat stipendiyasi (DSU): <b>{e(ag.get('name'))}</b> ({e(ag.get('region'))}). {e(ag.get('deadline') or '')}</p>"
            if ag.get("note"):
                t += f"<p class=\"note\">{e(ag['note'])}</p>"
        t += '<p><a href="../../stipendiya/">Barcha viloyatlar stipendiyalari va kerakli oila hujjatlari</a></p></section>'
        b.append(t)
    if u.get("tip"):
        b.append(f'<p class="tip"><b>Uprep maslahati:</b> {e(u["tip"])}</p>')
    for lvl_name, lst in (("Bakalavr", ba), ("Magistratura", ma)):
        if lst:
            items = "".join(f"<li>{e(p.get('name'))}{(' <small>· ' + e(p.get('access'))) + '</small>' if p.get('access') else ''}</li>" for p in lst[:60])
            more = f"<p class=\"note\">Yana {len(lst) - 60} ta dastur ilovada.</p>" if len(lst) > 60 else ""
            b.append(f"<section><h2>Ingliz tilidagi {lvl_name.lower()} dasturlari ({len(lst)})</h2><ul class=\"cols\">{items}</ul>{more}</section>")
    if u.get("programmesNote"):
        b.append(f"<p class=\"note\">{e(u['programmesNote'])}</p>")
    links = [(u.get("portalLabel") or "Ariza sahifasi", safe(u.get("portalUrl")) or safe(u.get("applyUrl"))), ("Universitet sayti", safe(u.get("web"))), ("Dasturlar ro'yxati", safe(u.get("programmesUrl")))]
    links = [(n, l) for n, l in links if l]
    if links:
        b.append("<p class=\"btns\">" + "".join(f'<a class="btn" href="{e(l)}" rel="noopener">{e(n)}</a>' for n, l in links) + "</p>")
    b.append(sources_html(u.get("sources") or []))
    ld = {"@context": "https://schema.org", "@type": "CollegeOrUniversity", "name": name, "alternateName": short, "url": safe(u.get("web")) or None,
          "address": {"@type": "PostalAddress", "addressLocality": city_name, "addressRegion": c.get("region"), "addressCountry": "IT"}}
    if u.get("founded"):
        ld["foundingDate"] = u["founded"]
    ld = {k: v for k, v in ld.items() if v}
    return page(f"uni/{u['id']}/", title, desc[:300], "\n".join(b), [("Bosh sahifa", ""), ("Universitetlar", "universitetlar/"), (short, f"uni/{u['id']}/")], "uni-" + u["id"], ld)


def unis_index():
    by = {}
    for u in UNIS:
        by.setdefault(CITY.get(u.get("city"), {}).get("region", "Boshqa"), []).append(u)
    b = ["<h1>Italiya universitetlari: o'zbek tilida qo'llanma</h1>",
         f"<p class=\"lead\">{len(UNIS)} ta Italiya universiteti: ingliz tilidagi dasturlar, ariza muddatlari, talablar va viloyat stipendiyalari. Har bir sahifa rasmiy manbalar asosida.</p>"]
    for reg in sorted(by):
        items = "".join(f'<li><a href="../uni/{e(u["id"])}/">{e(u.get("short") or u["name"])}</a> <small>· {e(CITY.get(u.get("city"), {}).get("name", ""))} · {e(u.get("type", ""))}{(" · " + str(u["enCount"]) + " ingliz dasturi") if u.get("enCount") else ""}</small></li>' for u in sorted(by[reg], key=lambda x: x.get("short") or x["name"]))
        b.append(f"<section><h2>{e(reg)}</h2><ul class=\"list\">{items}</ul></section>")
    return page("universitetlar/", f"Italiya universitetlari ({len(UNIS)} ta): qabul, dasturlar, stipendiya | Uprep",
                f"Italiyadagi {len(UNIS)} ta universitet bo'yicha o'zbek tilida ma'lumot: ingliz tilidagi dasturlar, ariza muddatlari, talablar va stipendiyalar.",
                "\n".join(b), [("Bosh sahifa", ""), ("Universitetlar", "universitetlar/")], "universitetlar")


def dsu_page():
    N = DSU.get("national", {})
    b = ["<h1>Italiyada stipendiya (DSU): viloyatlar bo'yicha to'liq ro'yxat</h1>",
         "<p class=\"lead\">Italiyada oila daromadi past talabalarga, jumladan chet elliklarga ham, viloyat idoralari stipendiya beradi: pul, ko'p shaharlarda ovqat va yotoqxona hamda o'qish to'lovidan ozodlik.</p>",
         facts_table([("O'quv yili", N.get("year")), ("Oiladan uzoqda yashovchi (fuori sede), minimum", N.get("fuoriSede")), ("Qatnab o'qiydigan (pendolare)", N.get("pendolare")),
                      ("Shaharda yashovchi (in sede)", N.get("inSede")), ("ISEE chegarasi", N.get("isee")), ("ISPE chegarasi", N.get("ispe"))])]
    if safe(N.get("sourceUrl")):
        b.append(f'<p class="note">Manba: <a href="{e(N["sourceUrl"])}" rel="noopener">{e(N.get("source"))}</a></p>')
    rows = "".join(f"<tr><td>{e(a.get('region'))}</td><td><b>{e(a.get('name'))}</b>{('<br><small>' + e(a.get('note')) + '</small>') if a.get('note') else ''}</td><td>{e(a.get('amount') or '')}</td><td>{e(a.get('deadline') or '')}</td></tr>" for a in DSU.get("agencies", []))
    b.append(f"<section><h2>Viloyatlar va idoralar</h2><div class=\"tw\"><table><thead><tr><th>Viloyat</th><th>Idora</th><th>Summa</th><th>Muddat</th></tr></thead><tbody>{rows}</tbody></table></div></section>")
    us = DSU.get("uniScholarships") or []
    if us:
        b.append("<section><h2>Universitetlarning o'z stipendiyalari</h2>" + "".join(f"<h3>{e(x.get('title'))}</h3><p>{e(x.get('text'))}</p>" for x in us) + "</section>")
    b.append("<section><h2>O'zbekistondan olinadigan oila hujjatlari</h2>" + ul(PARENTS.get("docs") or []) + "</section>")
    return page("stipendiya/", "Italiyada stipendiya (DSU) 2026/27: viloyatlar, summalar, muddatlar | Uprep",
                f"Italiya viloyat stipendiyalari: minimum {N.get('fuoriSede', '')} yiliga, ISEE chegarasi {N.get('isee', '')}. Har bir viloyat idorasi, muddat va oila hujjatlari o'zbek tilida.",
                "\n".join(b), [("Bosh sahifa", ""), ("Stipendiya", "stipendiya/")], "stipendiya")


def noldan_page():
    N = NOLDAN
    b = [f"<h1>{e(N.get('title') or 'Italiyada o`qish noldan')}</h1>", f"<p class=\"lead\">{e(N.get('subtitle'))}</p>",
         '<p class="btns"><a class="btn gold" href="../media/uprep-noldan-yoriqnoma.pdf">PDF yuklab olish</a></p>', paras(N.get("letter"))]
    toc = "".join(f'<li><a href="#{e(c["id"])}">{e(c.get("title"))}</a></li>' for c in N.get("chapters", []))
    b.append(f"<nav class=\"toc\"><b>Mundarija</b><ol>{toc}</ol></nav>")
    for c in N.get("chapters", []):
        t = f'<section id="{e(c["id"])}"><small class="kick">{e(c.get("kicker"))}</small><h2>{e(c.get("title"))}</h2>'
        if c.get("when"):
            t += f"<p class=\"when\">{e(c['when'])}</p>"
        t += paras(c.get("body"))
        if c.get("steps"):
            t += "<h3>Nima qilasiz</h3><ol class=\"steps\">" + "".join(f"<li>{e(s)}</li>" for s in c["steps"]) + "</ol>"
        for s in c.get("sections") or []:
            t += f"<h3>{e(s.get('title'))}</h3>" + ul(s.get("items") or [])
        if c.get("tip"):
            t += f'<p class="tip"><b>Uprep maslahati:</b> {e(c["tip"])}</p>'
        if c.get("warn"):
            t += f'<p class="warn"><b>Diqqat:</b> {e(c["warn"])}</p>'
        b.append(t + "</section>")
    if N.get("mistakes"):
        b.append("<section><h2>Eng ko'p uchraydigan xatolar</h2>" + ul(N["mistakes"]) + "</section>")
    b.append("<section><h2>Oxirgi so'z</h2>" + paras(N.get("closing")) + "</section>")
    b.append(sources_html(N.get("sources") or []))
    ld = {"@context": "https://schema.org", "@type": "Article", "headline": N.get("title"), "description": N.get("subtitle"), "inLanguage": "uz",
          "author": {"@type": "Organization", "name": "Uprep"}, "dateModified": TODAY.isoformat()}
    return page("noldan/", "Italiyada o'qish noldan: to'liq yo'riqnoma (2027/28) | Uprep",
                "Italiyada o'qish bosqichma-bosqich: universitet tanlash, ariza, DoV/CIMEA, Universitaly, viza, stipendiya, permesso va full enrollment. O'zbek tilida, bepul PDF.",
                "\n".join(b), [("Bosh sahifa", ""), ("Italiyada o'qish noldan", "noldan/")], "noldan", ld)


def simple_pages():
    out = []
    # Foundation
    b = [f"<h1>{e(FOUND.get('title') or 'Foundation')}</h1>", f"<p class=\"lead\">{e(FOUND.get('lead'))}</p>"]
    for x in FOUND.get("facts") or []:
        b.append(f"<h3>{e(x.get('t'))}</h3><p>{e(x.get('d'))}</p>")
    rows = "".join(f"<tr><td><b>{e(x.get('name'))}</b>{('<br><small>' + e(x.get('note')) + '</small>') if x.get('note') else ''}</td><td>{e(x.get('cost'))}</td><td>{e(x.get('when'))}</td></tr>" for x in FOUND.get("items") or [])
    b.append(f"<section><h2>Foundation bor universitetlar</h2><div class=\"tw\"><table><thead><tr><th>Universitet</th><th>Narx</th><th>Ariza</th></tr></thead><tbody>{rows}</tbody></table></div></section>")
    b.append(sources_html(FOUND.get("sources") or []))
    out.append(page("foundation/", "Italiyada Foundation: 11 yillik attestat bilan o'qish | Uprep",
                    "11 yillik maktab attestati bilan Italiyada o'qish: Foundation yili bor universitetlar, narxlar va ariza muddatlari. O'zbek tilida.",
                    "\n".join(b), [("Bosh sahifa", ""), ("Foundation", "foundation/")], "foundation"))
    # Tests
    b = [f"<h1>{e(TESTS.get('title') or 'Testlar')}</h1>", f"<p class=\"lead\">{e(TESTS.get('lead'))}</p>"]
    for t in TESTS.get("tests") or []:
        b.append(f"<section><h2>{e(t.get('name'))}</h2><p>{e(t.get('for'))}</p>" + facts_table([("Daraja", t.get("level")), ("Qanday", t.get("how")), ("Narx", t.get("cost")), ("Kim so'raydi", t.get("unis"))]) + "</section>")
    if TESTS.get("tips"):
        b.append("<section><h2>Maslahatlar</h2>" + ul(TESTS["tips"]) + "</section>")
    out.append(page("testlar/", "Italiya universitetlari uchun testlar: IELTS, CEnT-S, TOLC, SAT | Uprep",
                    "Italiyada o'qish uchun qaysi test kerak: IELTS, CEnT-S, TOLC, SAT, GMAT va italyan tili testlari. Narx, qanday topshiriladi va qaysi universitet so'raydi.",
                    "\n".join(b), [("Bosh sahifa", ""), ("Testlar", "testlar/")], "testlar"))
    # Parents (FAQPage)
    P = PARENTS
    b = [f"<h1>{e(P.get('title') or 'Ota-onalar uchun')}</h1>", f"<p class=\"lead\">{e(P.get('lead'))}</p>"]
    for f in P.get("faq") or []:
        b.append(f"<section><h2>{e(f.get('q'))}</h2>{paras(f.get('a'))}</section>")
    if P.get("warnings"):
        b.append("<section><h2>Ehtiyot bo'ling</h2>" + ul(P["warnings"]) + "</section>")
    b.append(sources_html(P.get("sources") or []))
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": f.get("q"), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"\s+", " ", f.get("a", ""))}} for f in P.get("faq") or []]}
    out.append(page("ota-onalar/", "Farzandim Italiyada o'qimoqchi: ota-onalar uchun savol-javob | Uprep",
                    "Italiyada o'qish narxi, viza uchun pul isboti, stipendiya, xavfsizlik va ishlash: ota-onalar uchun ochiq javoblar, o'zbek tilida.",
                    "\n".join(b), [("Bosh sahifa", ""), ("Ota-onalar uchun", "ota-onalar/")], "ota-onalar", ld))
    # Tariffs
    b = ["<h1>Uprep tariflari</h1>", "<p class=\"lead\">Saytdagi ma'lumot va vositalar bepul. Pullik qismi shaxsiy yordamimiz.</p>"]
    for p in SITE.get("plans") or []:
        b.append(f"<section class=\"plan\"><h2>{e(p.get('name'))}: {e(p.get('price'))}</h2><p class=\"note\">{e(p.get('note'))}</p><p>{e(p.get('tagline'))}</p>{ul(p.get('items') or [])}</section>")
    if SITE.get("extras"):
        b.append("<section><h2>Alohida xizmatlar</h2><ul class=\"list\">" + "".join(f"<li><b>{e(x.get('name'))}: {e(x.get('price'))}</b> <small>· {e(x.get('note'))}</small></li>" for x in SITE["extras"]) + "</ul></section>")
    b.append(f"<p class=\"note\">{e(SITE.get('plansNote'))}</p>")
    out.append(page("tariflar/", "Uprep tariflari: Italiyaga o'qishga kirishda yordam | Uprep",
                    "Italiyaga o'qishga kirishda yordam: bepul ilova, online yordam va to'liq hamrohlik. Narxlar va nimalar kirishi.",
                    "\n".join(b), [("Bosh sahifa", ""), ("Tariflar", "tariflar/")], "tariflar"))
    # Guide (overview + glossary)
    G = GUIDE
    b = [f"<h1>{e(G.get('title') or 'Qo`llanma')}</h1>", f"<p class=\"lead\">{e(G.get('lead'))}</p>"]
    b.append("<section><h2>Yo'l xaritasi</h2><ol class=\"steps\">" + "".join(f"<li><b>{e(t.get('when'))}: {e(t.get('title'))}.</b> {e(t.get('text'))}</li>" for t in G.get("timeline") or []) + "</ol></section>")
    b.append("<section><h2>Sizga qaysi daraja mos?</h2>" + "".join(f"<h3>{e(l.get('title'))}</h3><p>{e(l.get('text'))}</p>" for l in G.get("levels") or []) + "</section>")
    b.append("<section><h2>Qancha pul kerak</h2>" + facts_table([(x.get("item"), f"{x.get('cost')}. {x.get('note') or ''}") for x in G.get("budget") or []]) + "</section>")
    b.append("<section><h2>Lug'at</h2><dl class=\"facts\">" + "".join(f"<div><dt>{e(x.get('term'))}</dt><dd>{e(x.get('def'))}</dd></div>" for x in G.get("glossary") or []) + "</dl></section>")
    b.append('<p><a href="../noldan/">Batafsil: Italiyada o\'qish noldan (10 bob, PDF)</a></p>')
    b.append(sources_html(G.get("sources") or []))
    out.append(page("qollanma/", "Italiyada o'qish: 0 dan qo'llanma, yo'l xaritasi va lug'at | Uprep",
                    "Italiyada o'qish qanday boshlanadi: 10 qadamlik yo'l xaritasi, qaysi daraja mos, xarajatlar va 20 dan ortiq atama lug'ati. O'zbek tilida.",
                    "\n".join(b), [("Bosh sahifa", ""), ("Qo'llanma", "qollanma/")], "qollanma"))
    return out


def main():
    for d in GENERATED:
        shutil.rmtree(os.path.join(ROOT, d), ignore_errors=True)
    paths = [""] + [uni_page(u) for u in UNIS] + [unis_index(), dsu_page(), noldan_page()] + simple_pages()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in paths:
        pr = "1.0" if p == "" else "0.9" if p in ("noldan/", "universitetlar/", "stipendiya/") else "0.7"
        sm.append(f"<url><loc>{BASE}{p}</loc><lastmod>{TODAY.isoformat()}</lastmod><priority>{pr}</priority></url>")
    sm.append("</urlset>")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(sm) + "\n")
    with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(f"User-agent: *\nAllow: /\nSitemap: {BASE}sitemap.xml\n")
    print(f"{len(paths)} ta sahifa, sitemap.xml va robots.txt yozildi")


if __name__ == "__main__":
    main()
