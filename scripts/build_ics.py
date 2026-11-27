#!/usr/bin/env python3
"""Builds subscribable calendar feeds (iCalendar .ics) from the site's data:
  cal/muhim.ics          - key dates from content/calendar.json (visa, Universitaly, DSU, big universities)
  cal/uni/<id>.ics       - each university's application deadlines from content/universities.json
People subscribe once (Google / Apple / Outlook) and their calendar refreshes by itself when we update the data.
Deterministic output: re-running without data changes produces identical files (no git churn).
Run after editing content: python3 scripts/build_ics.py
"""
import datetime, hashlib, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "cal")
SITE = "https://xoliqberdiyevdalerjon-hub.github.io/uprep-site/"  # redirects to the custom domain once it is connected
KEEP_PAST_DAYS = 45  # recently passed dates stay visible for a while, older ones drop out


def load(name):
    with open(os.path.join(ROOT, "content", name + ".json"), encoding="utf-8") as f:
        return json.load(f)


def last_date(text):
    """Same rule as the site (deadline() in app.js): the last DD.MM.YYYY in the text is the deadline."""
    found = re.findall(r"\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b", text or "")
    if not found:
        return None
    d, m, y = found[-1]
    try:
        return datetime.date(int(y), int(m), int(d))
    except ValueError:
        return None


def esc(t):
    return str(t or "").replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\r\n", "\n").replace("\n", "\\n")


def fold(line):
    """RFC 5545: lines longer than 75 octets are folded with CRLF + space (never splitting a UTF-8 character)."""
    out, cur, size = [], "", 0
    for ch in line:
        n = len(ch.encode("utf-8"))
        if size + n > (75 if not out else 74):
            out.append(cur)
            cur, size = "", 0
        cur += ch
        size += n
    out.append(cur)
    return "\r\n ".join(out)


def calendar(name, desc, events, stamp):
    L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Uniroad//Muddatlar//UZ", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
         "X-WR-CALNAME:" + esc(name), "X-WR-CALDESC:" + esc(desc), "X-WR-TIMEZONE:Asia/Tashkent",
         "REFRESH-INTERVAL;VALUE=DURATION:P1D", "X-PUBLISHED-TTL:P1D"]
    for e in sorted(events, key=lambda x: (x["d"], x["title"])):
        nxt = e["d"] + datetime.timedelta(days=1)
        uid = hashlib.sha1((e["key"]).encode("utf-8")).hexdigest()[:20] + "@uniroad"
        L += ["BEGIN:VEVENT", "UID:" + uid, "DTSTAMP:" + stamp,
              "DTSTART;VALUE=DATE:" + e["d"].strftime("%Y%m%d"), "DTEND;VALUE=DATE:" + nxt.strftime("%Y%m%d"),
              "SUMMARY:" + esc(e["title"]), "DESCRIPTION:" + esc(e["desc"]), "URL:" + e["url"], "TRANSP:TRANSPARENT"]
        for trig, label in (("-P7D", "1 hafta qoldi"), ("-P1D", "Ertaga")):
            L += ["BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + esc(label + ": " + e["title"]), "TRIGGER:" + trig, "END:VALARM"]
        L.append("END:VEVENT")
    L.append("END:VCALENDAR")
    return "\r\n".join(fold(x) for x in L) + "\r\n"


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    old = None
    if os.path.exists(path):
        with open(path, encoding="utf-8", newline="") as f:
            old = f.read()
    if old != text:
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(text)
        return True
    return False


def main():
    site = load("site")
    upd = last_date(site.get("updated", "")) or datetime.date.today()
    stamp = upd.strftime("%Y%m%d") + "T000000Z"
    cutoff = upd - datetime.timedelta(days=KEEP_PAST_DAYS)
    changed = 0

    # 1. key dates
    ev = []
    for c in load("calendar"):
        d = last_date(c.get("date", ""))
        if not d or d < cutoff:
            continue
        tag = str(c.get("tag", "")).strip()
        title = (tag + ": " if tag and not str(c.get("text", "")).startswith(tag) else "") + str(c.get("text", "")).strip()
        ev.append({"d": d, "title": title, "key": "cal|" + c.get("date", "") + "|" + c.get("text", ""),
                   "desc": str(c.get("text", "")) + " (" + str(c.get("date", "")) + ")\n\nBarcha muddatlar: " + SITE + "#kalendar",
                   "url": SITE + "#kalendar"})
    changed += write(os.path.join(OUT, "muhim.ics"), calendar("Uniroad · Asosiy muddatlar", "Italiyada o'qish: viza, Universitaly, stipendiya va universitet muddatlari. Uniroad.", ev, stamp))

    # 2. per university
    ids = []
    for u in load("universities"):
        uid = re.sub(r"[^\w-]", "-", str(u.get("id", "")))
        if not uid:
            continue
        ids.append(uid)
        name = str(u.get("short") or u.get("name") or uid).strip()
        apply = u.get("applyUrl") or u.get("portalUrl") or ""
        ev = []
        for x in u.get("deadlines") or []:
            d = last_date(x.get("date", ""))
            if not d or d < cutoff:
                continue
            label = str(x.get("label", "")).strip()
            desc = label + " (" + str(x.get("date", "")) + ")"
            if apply:
                desc += "\nAriza: " + apply
            desc += "\n\nTalablar va hujjatlar: " + SITE + "#uni-" + uid + "/qabul"
            ev.append({"d": d, "title": name + ": " + label, "key": "uni|" + uid + "|" + label + "|" + str(x.get("date", "")), "desc": desc, "url": SITE + "#uni-" + uid + "/qabul"})
        changed += write(os.path.join(OUT, "uni", uid + ".ics"), calendar("Uniroad · " + name, name + ": ariza muddatlari. Uniroad.", ev, stamp))

    # remove feeds of universities that no longer exist
    for f in os.listdir(os.path.join(OUT, "uni")):
        if f.endswith(".ics") and f[:-4] not in ids:
            os.remove(os.path.join(OUT, "uni", f))
            changed += 1
    print("ics feeds:", 1 + len(ids), "| changed:", changed)


if __name__ == "__main__":
    main()
