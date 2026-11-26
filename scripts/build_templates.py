#!/usr/bin/env python3
"""Uprep hujjat shablonlari: Word (.docx) va PDF uchun HTML. python3 scripts/build_templates.py"""
import os, json, html
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "media", "shablonlar")
NAVY = RGBColor(0x16, 0x27, 0x4A)
NOTE = "Uprep shabloni · [ ] ichidagilarni o'zingiznikiga almashtiring · @Uprep_Admin"

# Each template: (file, title, uz_intro, blocks). block = ("h", text) | ("p", text) | ("ul", [..]) | ("table", [[..],..]) | ("sign", text)
T = [
 ("cv-shablon", "CV (Curriculum Vitae)", "Ingliz tilida, 1–2 sahifa. Eng muhimi yuqorida. Har bir qatorni o'zingizga moslang, bo'sh bo'limni o'chiring.", [
  ("h", "[FULL NAME]"),
  ("p", "Date of birth: [DD.MM.YYYY] · Nationality: Uzbek · [City], Uzbekistan"),
  ("p", "Email: [email@example.com] · Phone: [+998 ..] · Telegram: [@username]"),
  ("h2", "Education"),
  ("ul", ["[2023 – 2026] [School / Lyceum / University name], [City] — [Degree or certificate]. GPA: [5.0 / 4.8] or [92%]",
          "Relevant subjects: [Mathematics, Physics, Economics …]"]),
  ("h2", "Language skills"),
  ("ul", ["English: [B2 / C1] — IELTS [6.5] ([month year])", "Uzbek: native · Russian: [B2]", "Italian: [A1, currently studying]"]),
  ("h2", "Tests"),
  ("ul", ["[SAT / CEnT-S / TOLC / GMAT]: [score] ([date])"]),
  ("h2", "Experience and projects"),
  ("ul", ["[Month year – Month year] [Role], [Organisation] — [what you did, one line, with a result or number]",
          "[Project name] — [what it is, your role, result]"]),
  ("h2", "Achievements"),
  ("ul", ["[Olympiad / competition / award], [level], [year]", "[Volunteering / leadership role], [year]"]),
  ("h2", "Skills"),
  ("ul", ["[Microsoft Office, Python, Canva, …]", "[Teamwork, public speaking, …]"]),
  ("h2", "Interests"),
  ("p", "[2–3 real interests that say something about you]"),
 ]),
 ("motivatsion-xat-tuzilmasi", "Motivatsion xat: tuzilma va namuna jumlalar", "Universitet so'z sonini belgilagan bo'lsa, unga rioya qiling (odatda 1 sahifa, 400–700 so'z). Namuna jumlalarni ko'chirmang: ular faqat yo'nalish uchun.", [
  ("h2", "1. Kirish: kimsiz va nima uchun yozyapsiz"),
  ("p", "Dear Admissions Committee,\nI am writing to apply for the [Programme name] at [University]. [One sentence about who you are and what drives you.]"),
  ("h2", "2. Nega aynan shu yo'nalish"),
  ("p", "[A real moment or experience that brought you to this field.] Since then, I have [what you did to explore it: course, project, olympiad …]."),
  ("h2", "3. Tayyorgarligingiz"),
  ("p", "During my studies at [school/university], I [results, subjects, GPA]. I also [project / work / volunteering] where I [specific skill + result]."),
  ("h2", "4. Nega aynan shu universitet va Italiya"),
  ("p", "The [Programme] at [University] attracts me because of [2 concrete things: course, professor, lab, approach]. Studying in Italy will also [real reason]."),
  ("h2", "5. Maqsadlaringiz va yakun"),
  ("p", "After graduating, I plan to [short-term goal] and later [long-term goal], [how it connects to Uzbekistan or your field].\nThank you for considering my application.\nSincerely,\n[Full name]"),
  ("h2", "Ko'p uchraydigan xatolar"),
  ("ul", ["Internetdagi shablonni ko'chirish: komissiya buni darhol sezadi", "Faqat umumiy gaplar («I am hardworking»): misol keltiring", "CV'ni qaytadan sanab chiqish", "Universitet nomini noto'g'ri yozish yoki boshqa universitet nomi qolib ketishi", "Juda uzun yozish: so'z chegarasiga rioya qiling"]),
 ]),
 ("homiy-xati", "Homiylik va e'tirozsizlik xati (viza uchun)", "Elchixona ro'yxatida «ish beruvchi yoki homiy oila a'zosining e'tirozsizlik xati» bor. Bu namuna: topshirishdan oldin elchixonaning amaldagi ro'yxatini va tarjima talabini tekshiring. Homiy imzolaydi.", [
  ("h", "DECLARATION OF FINANCIAL SUPPORT AND NO OBJECTION"),
  ("p", "To: Consular Section, Embassy of Italy in Tashkent"),
  ("p", "I, [Sponsor full name], born on [DD.MM.YYYY], passport no. [AA1234567], residing at [address], working as [position] at [employer], hereby declare that:"),
  ("ul", ["I am the [father / mother / …] of [Student full name], born on [DD.MM.YYYY], passport no. [AA1234567].",
          "I have no objection to my [son / daughter] studying at [University], [Programme], in Italy for the academic year [2027/28].",
          "I undertake to cover all living and study expenses of the student during the stay in Italy, including at least the annual amount required for the student visa ([10 179,85 €] for 2027/28 — check the current amount).",
          "The funds come from [salary / business income / savings], as shown in the attached bank statements and employment certificate."]),
  ("p", "Attachments: bank statement (last 3 months), employment and salary certificate, copy of passport, proof of relationship."),
  ("sign", "Date: [DD.MM.YYYY]          Signature: ____________________          [Sponsor full name]"),
 ]),
 ("oila-hujjatlari-royxati", "Stipendiya uchun oila hujjatlari: tarjimonga ro'yxat", "O'zbekistonda yig'iladi, har biriga apostil qo'yiladi va italyan tiliga tarjima qilinadi. Aniq ro'yxat viloyatga qarab farq qiladi: universitetingiz viloyati bandosini tekshiring.", [
  ("table", [["Hujjat", "Qayerdan", "Apostil", "Tarjima", "Tayyor"],
             ["Oila tarkibi va propiska (har bir a'zo)", "my.gov.uz / mahalla", "☐", "☐", "☐"],
             ["Ota daromadi (yil: bandoga qarab)", "Ish joyi / my.gov.uz", "☐", "☐", "☐"],
             ["Ona daromadi yoki ishlamasligi haqida hujjat", "Ish joyi / tegishli idora", "☐", "☐", "☐"],
             ["Boshqa a'zolar daromadi", "Ish joyi", "☐", "☐", "☐"],
             ["Uy-joy mulki va maydoni (m²)", "Kadastr / my.gov.uz", "☐", "☐", "☐"],
             ["Boshqa ko'chmas mulk (bo'lsa)", "Kadastr", "☐", "☐", "☐"],
             ["Bank hisoblari va jamg'armalar (31.12 holatiga)", "Bank", "☐", "☐", "☐"],
             ["Ijara shartnomasi (oila ijarada yashasa)", "Notarius", "☐", "☐", "☐"]]),
  ("ul", ["O'zingiz yozgan ariza va affidavit odatda qabul qilinmaydi", "Oilaning umumiy daromadi nol bo'la olmaydi", "Tarjima elchixona yoki idora tan olgan tarjimonda qilinsin"]),
 ]),
]

def docx_build(fn, title, intro, blocks):
    d = Document()
    for s in d.sections: s.left_margin = s.right_margin = Cm(2); s.top_margin = s.bottom_margin = Cm(1.8)
    st = d.styles["Normal"]; st.font.name = "Calibri"; st.font.size = Pt(11)
    h = d.add_paragraph(); r = h.add_run(title); r.bold = True; r.font.size = Pt(18); r.font.color.rgb = NAVY
    p = d.add_paragraph(); r = p.add_run(intro); r.italic = True; r.font.size = Pt(9.5); r.font.color.rgb = RGBColor(0x5C, 0x64, 0x79)
    for kind, val in blocks:
        if kind == "h":
            p = d.add_paragraph(); r = p.add_run(val); r.bold = True; r.font.size = Pt(15); r.font.color.rgb = NAVY
        elif kind == "h2":
            p = d.add_paragraph(); r = p.add_run(val); r.bold = True; r.font.size = Pt(12.5); r.font.color.rgb = NAVY; p.paragraph_format.space_before = Pt(10)
        elif kind == "p":
            for line in val.split("\n"): d.add_paragraph(line)
        elif kind == "ul":
            for it in val: d.add_paragraph(it, style="List Bullet")
        elif kind == "table":
            t = d.add_table(rows=len(val), cols=len(val[0])); t.style = "Table Grid"
            for i, row in enumerate(val):
                for j, c in enumerate(row):
                    t.cell(i, j).text = c
                    if i == 0:
                        for rr in t.cell(i, j).paragraphs[0].runs: rr.bold = True
        elif kind == "sign":
            p = d.add_paragraph(); p.paragraph_format.space_before = Pt(24); p.add_run(val)
    f = d.add_paragraph(); f.alignment = WD_ALIGN_PARAGRAPH.CENTER; r = f.add_run(NOTE); r.font.size = Pt(8); r.font.color.rgb = RGBColor(0x99, 0x99, 0x99)
    d.save(os.path.join(OUT, fn + ".docx"))

def html_build(fn, title, intro, blocks):
    e = html.escape; b = []
    for kind, val in blocks:
        if kind == "h": b.append(f"<h2 class='big'>{e(val)}</h2>")
        elif kind == "h2": b.append(f"<h3>{e(val)}</h3>")
        elif kind == "p": b.append("".join(f"<p>{e(l)}</p>" for l in val.split("\n")))
        elif kind == "ul": b.append("<ul>" + "".join(f"<li>{e(i)}</li>" for i in val) + "</ul>")
        elif kind == "table": b.append("<table>" + "".join("<tr>" + "".join((f"<th>{e(c)}</th>" if i == 0 else f"<td>{e(c)}</td>") for c in row) + "</tr>" for i, row in enumerate(val)) + "</table>")
        elif kind == "sign": b.append(f"<p class='sign'>{e(val)}</p>")
    return f"""<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
@page{{size:A4;margin:16mm 17mm}} body{{font:11pt/1.5 'Instrument Sans',system-ui,sans-serif;color:#0E1930}}
.top{{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #F2B233;padding-bottom:8px;margin-bottom:10px}}
.brand{{font:800 16pt system-ui;color:#16274A}} .brand b{{color:#F2A81F}}
h1{{font:800 19pt system-ui;color:#16274A;margin:6px 0}} .intro{{background:#FCF0D4;border-radius:8px;padding:8px 12px;font-size:9.5pt;color:#5C4A10}}
h2.big{{font:800 15pt system-ui;color:#16274A;margin:16px 0 6px}} h3{{font:700 12pt system-ui;color:#16274A;margin:14px 0 4px;border-bottom:1px solid #E6E1D6;padding-bottom:3px}}
p{{margin:4px 0}} ul{{margin:4px 0 4px 18px;padding:0}} li{{margin:3px 0}}
table{{width:100%;border-collapse:collapse;margin:10px 0;font-size:10pt}} th,td{{border:1px solid #D8D1C2;padding:6px 8px;text-align:left}} th{{background:#16274A;color:#fff}}
.sign{{margin-top:28px}} .foot{{margin-top:18px;text-align:center;font-size:8pt;color:#999}}
</style></head><body><div class="top"><span class="brand">up<b>rep</b></span><span style="font-size:9pt;color:#5C6479">Shablon</span></div>
<h1>{e(title)}</h1><div class="intro">{e(intro)}</div>{''.join(b)}<div class="foot">{e(NOTE)}</div></body></html>"""

os.makedirs(OUT, exist_ok=True)
manifest = []
for fn, title, intro, blocks in T:
    docx_build(fn, title, intro, blocks)
    with open(os.path.join(OUT, fn + ".html"), "w", encoding="utf-8") as f: f.write(html_build(fn, title, intro, blocks))
    manifest.append({"id": fn, "title": title, "intro": intro})
print(json.dumps(manifest, ensure_ascii=False))
