#!/usr/bin/env python3
"""Uniroad: kontent tarjimasi (ru, en). Til: I18N_LANG=en python3 scripts/i18n.py ... (standart: ru).

Manba har doim o'zbekcha content/*.json. Tarjimalar bitta "tarjima xotirasi"da saqlanadi:
content/ru/_tm.json  ({"o'zbekcha matn": "русский текст"}).
`build` buyrug'i shu xotiradan content/ru/<fayl>.json ustqatlamlarini yaratadi: faqat matnlar,
raqam, havola va id'lar o'zbekcha fayldan olinadi. O'zbekcha matn o'zgarsa, eski tarjima ishlatilmaydi
(o'sha joy o'zbekcha ko'rinadi), ya'ni eskirgan rus matni hech qachon chiqmaydi.

  python3 scripts/i18n.py todo <fayl> [N]     tarjima qilinmagan matnlar (JSON ro'yxat) -> stdout
  python3 scripts/i18n.py add <tarjimalar.json>   {"uz": "ru"} yoki [[uz, ru], ...] ni xotiraga qo'shadi (tekshiruv bilan)
  python3 scripts/i18n.py build               barcha ustqatlamlarni qayta yozadi
  python3 scripts/i18n.py check               qamrov foizi va xatolar
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG = os.environ.get("I18N_LANG", "ru")
TM_PATH = os.path.join(ROOT, "content", LANG, "_tm.json")
try:
    URLMAP = json.load(open(os.path.join(ROOT, "content", LANG, "_urlmap.json"), encoding="utf-8"))
except FileNotFoundError:
    URLMAP = {}
# fields whose values are used by the code (ids, links, enums compared in app.js) or are not text
SKIP_KEYS = {"id", "url", "href", "link", "src", "image", "img", "icon", "photo", "logo", "heroImage", "heroCreditUrl",
             "type", "level", "access", "lang", "area", "status", "kind", "lvl", "city", "cities", "uni", "unis_ids",
             "telegram", "email", "phone", "code", "color", "help", "short", "slug", "map", "lat", "lng", "file", "pdf", "video",
             "recording", "isee", "ispe", "updated",
             "style", "route", "reason", "edu", "money", "visa", "eng", "gpa", "mode", "result", "f", "k", "cur", "test", "app", "value", "key", "stage", "langs"}
SKIP_FILES = {"_tm"}


def load_tm():
    try:
        with open(TM_PATH, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def save_tm(tm):
    os.makedirs(os.path.dirname(TM_PATH), exist_ok=True)
    with open(TM_PATH, "w", encoding="utf-8") as f:
        json.dump(dict(sorted(tm.items())), f, ensure_ascii=False, indent=0)
        f.write("\n")


def translatable(s):
    t = s.strip()
    if not t or not re.search(r"[A-Za-z]", t):
        return False
    if re.match(r"^(https?:|mailto:|tel:|#|/|\.\./|assets/|media/|content/)", t):
        return False
    if re.match(r"^[\w.+-]+@[\w-]+\.[\w.]+$", t) or re.match(r"^@\w+$", t):
        return False
    return True


def walk(o, key=None):
    """yield every translatable string (respecting SKIP_KEYS)"""
    if isinstance(o, str):
        if translatable(o):
            yield o
    elif isinstance(o, list):
        for x in o:
            yield from walk(x, key)
    elif isinstance(o, dict):
        for k, v in o.items():
            if k in SKIP_KEYS or k.startswith("_"):
                continue
            yield from walk(v, k)


CUR_FILE = ""  # set by cmd_build; _urlmap.json keys "<file>|<value>" override plain "<value>" keys for one file


def remap(v):
    return URLMAP.get(CUR_FILE + "|" + v, URLMAP.get(v))


def overlay(o, tm):
    """same shape as o, only translated strings; None = nothing to overlay"""
    if isinstance(o, str):
        if remap(o) is not None:
            return remap(o)
        return tm.get(o) if translatable(o) and tm.get(o) and tm[o] != o else None
    if isinstance(o, list):
        has_id = any(isinstance(x, dict) and "id" in x for x in o)
        out = []
        for x in o:
            ov = overlay(x, tm)
            if has_id and isinstance(x, dict) and "id" in x:
                if ov:
                    ov = dict(ov); ov["id"] = x["id"]; out.append(ov)
            else:
                out.append(ov if ov is not None else ({} if isinstance(x, dict) else [] if isinstance(x, list) else ""))
        while out and out[-1] in ("", {}, []):
            out.pop()
        return out or None
    if isinstance(o, dict):
        out = {}
        for k, v in o.items():
            if k in SKIP_KEYS or k.startswith("_"):
                if isinstance(v, str) and remap(v) is not None:
                    out[k] = remap(v)
                continue
            ov = overlay(v, tm)
            if ov not in (None, "", {}, []):
                out[k] = ov
        return out or None
    return None


def files():
    return sorted(p for p in glob.glob(os.path.join(ROOT, "content", "*.json")))


def name_of(p):
    return os.path.splitext(os.path.basename(p))[0]


NUM = re.compile(r"\d+(?:[.,:]\d+)*")
PH = re.compile(r"\{\{\w+\}\}")
URL = re.compile(r"https?://\S+")


def problems(uz, ru):
    p = []
    a, b = sorted(NUM.findall(uz.replace(" ", " "))), sorted(NUM.findall(ru.replace(" ", " ")))
    if a != b:
        p.append(f"raqamlar farq qiladi: {a} != {b}")
    if sorted(PH.findall(uz)) != sorted(PH.findall(ru)):
        p.append("{{...}} belgilar farq qiladi")
    if sorted(URL.findall(uz)) != sorted(URL.findall(ru)):
        p.append("havolalar farq qiladi")
    if uz.count("\n\n") != ru.count("\n\n"):
        p.append("xatboshilar soni farq qiladi")
    return p


def cmd_todo(name, n=None):
    tm = load_tm()
    with open(os.path.join(ROOT, "content", name + ".json"), encoding="utf-8") as f:
        data = json.load(f)
    seen, out = set(), []
    for s in walk(data):
        if s not in tm and s not in seen:
            seen.add(s); out.append(s)
    if n:
        out = out[:int(n)]
    print(json.dumps(out, ensure_ascii=False, indent=0))
    print(f"# {len(out)} ta (fayl: {name})", file=sys.stderr)


def cmd_add(path):
    tm = load_tm()
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    pairs = d.items() if isinstance(d, dict) else d
    bad = 0
    for uz, ru in pairs:
        pr = problems(uz, ru)
        if pr and not ru.startswith("!"):
            bad += 1
            print("XATO:", pr, "\n  uz:", uz[:160], "\n  ru:", ru[:160], file=sys.stderr)
            continue
        tm[uz] = ru[1:] if ru.startswith("!") else ru
    save_tm(tm)
    print(f"qo'shildi; xotirada {len(tm)} ta; xato {bad}")
    return bad


def cmd_build():
    global CUR_FILE
    tm = load_tm()
    for p in files():
        n = name_of(p)
        CUR_FILE = n
        with open(p, encoding="utf-8") as f:
            data = json.load(f)
        ov = overlay(data, tm)
        out = os.path.join(ROOT, "content", LANG, n + ".json")
        if ov:
            with open(out, "w", encoding="utf-8") as f:
                json.dump(ov, f, ensure_ascii=False, separators=(",", ":"))
                f.write("\n")
        elif os.path.exists(out):
            os.remove(out)
    cmd_check(quiet=True)


def cmd_check(quiet=False):
    tm = load_tm()
    tot = done = 0
    rows = []
    for p in files():
        n = name_of(p)
        with open(p, encoding="utf-8") as f:
            data = json.load(f)
        ss = list(walk(data))
        d = sum(1 for s in ss if s in tm)
        tot += len(ss); done += d
        if ss:
            rows.append(f"{n:14} {d:5}/{len(ss):<5} {100 * d // max(1, len(ss)):3}%")
    errs = [(uz, ru, problems(uz, ru)) for uz, ru in tm.items() if problems(uz, ru)]
    print("\n".join(rows))
    print(f"JAMI {done}/{tot} ({100 * done // max(1, tot)}%), xotirada {len(tm)} ta, tekshiruvdan o'tmagan: {len(errs)}")
    for uz, ru, pr in errs[:20]:
        print("  ", pr, uz[:80])


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__); sys.exit(0)
    c = a[0]
    if c == "todo":
        cmd_todo(a[1], a[2] if len(a) > 2 else None)
    elif c == "add":
        sys.exit(1 if cmd_add(a[1]) else 0)
    elif c == "build":
        cmd_build()
    elif c == "check":
        cmd_check()
