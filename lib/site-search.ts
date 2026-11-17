/*
 * Real BM25 keyword search over this site's own content. No model, no network:
 * the passages are built from data/portfolio-data.ts and ranked in the browser.
 */
import {
  PERSONAL_INFO,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILL_CATEGORIES,
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  MUSIC_ARTISTS,
} from "@/data/portfolio-data";

const STOP = new Set(
  "a an and are as at be by can do does did for from has have he him his how i in is it its me my of on or so tell that the their them there this to was what when where which who why will with you your about any some".split(
    " ",
  ),
);

/** Lowercase words, stop words dropped, plural "s" trimmed so "agents" matches "agent". */
export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9+#.]+/g) ?? [])
    .map((w) => w.replace(/^\.+|\.+$/g, ""))
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));
}

export type Passage = {
  /** Where it lives on the page, e.g. "Projects · LungAI". */
  source: string;
  href: string;
  text: string;
  /** Extra words that help it match (titles, tech) but aren't shown. */
  keywords?: string;
};

export class BM25 {
  private docs: string[][];
  private df = new Map<string, number>();
  private avgLen: number;

  constructor(
    texts: string[],
    private k1 = 1.4,
    private b = 0.75,
  ) {
    this.docs = texts.map(tokenize);
    this.avgLen = this.docs.reduce((s, d) => s + d.length, 0) / Math.max(1, this.docs.length);
    for (const d of this.docs) for (const w of new Set(d)) this.df.set(w, (this.df.get(w) ?? 0) + 1);
  }

  scores(query: string): number[] {
    const q = [...new Set(tokenize(query))];
    const N = this.docs.length;
    return this.docs.map((d) => {
      const tf = new Map<string, number>();
      for (const w of d) tf.set(w, (tf.get(w) ?? 0) + 1);
      let s = 0;
      for (const w of q) {
        const f = tf.get(w);
        if (!f) continue;
        const n = this.df.get(w) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        s += (idf * f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + (this.b * d.length) / this.avgLen));
      }
      return s;
    });
  }
}

function buildPassages(): Passage[] {
  const p: Passage[] = [];
  p.push({ source: "About", href: "#about", text: PERSONAL_INFO.bio, keywords: `${PERSONAL_INFO.name} ${PERSONAL_INFO.title} ${PERSONAL_INFO.location}` });

  for (const pr of PROJECTS_DATA) {
    const src = `Projects · ${pr.title}`;
    const tech = pr.technologies.join(" ");
    p.push({ source: src, href: "#projects", text: pr.description, keywords: `${pr.title} ${tech} built build project what` });
    p.push({ source: src, href: "#projects", text: pr.longDescription, keywords: `${pr.title} how work works approach architecture design` });
    if (pr.metrics?.length)
      p.push({ source: src, href: "#projects", text: `Results: ${pr.metrics.join("; ")}.`, keywords: `${pr.title} accurate accuracy result performance metric well number impact` });
  }

  for (const e of EXPERIENCE_DATA) {
    p.push({
      source: `Experience · ${e.company}`,
      href: "#experience",
      text: `${e.role} at ${e.company}, ${e.location} (${e.duration}).`,
      keywords: "work job role company experience",
    });
    for (const ep of e.projects) {
      p.push({
        source: `Experience · ${ep.name}`,
        href: "#experience",
        text: `${ep.name}: ${ep.description}`,
        keywords: `${ep.technologies.join(" ")} ${e.company} built build shipped project work`,
      });
    }
  }

  for (const s of SKILL_CATEGORIES) {
    p.push({ source: `Skills · ${s.title}`, href: "#skills", text: `${s.title}: ${s.skills.join(", ")}.`, keywords: "skill skills stack tools" });
  }
  for (const c of CERTIFICATIONS_DATA) {
    p.push({
      source: "Certifications",
      href: "#education",
      text: `${c.title}, ${c.issuer} (${c.status}).${c.highlights ? ` Covers ${c.highlights.join(", ")}.` : ""}`,
      keywords: "certificate certification course",
    });
  }
  for (const [i, ed] of EDUCATION_DATA.entries()) {
    p.push({
      source: "Education",
      href: "#education",
      text: `${ed.degree}, ${ed.field}, ${ed.institution}, ${ed.duration}. ${ed.score}.`,
      keywords: i === 0 ? "education study studied college university degree graduate graduation" : "education school",
    });
  }
  p.push({
    source: "Off the clock",
    href: "#off-the-clock",
    text: `On my playlist: ${MUSIC_ARTISTS.map((a) => `${a.name} (${a.known})`).join(", ")}.`,
    keywords: "music songs listen spotify hobby hobbies free time",
  });
  return p;
}

let index: { passages: Passage[]; bm25: BM25 } | null = null;

export type Hit = Passage & { score: number };

/** The best passages for a question, strongest first. */
export function searchSite(query: string, limit = 2): Hit[] {
  if (!index) {
    const passages = buildPassages();
    index = { passages, bm25: new BM25(passages.map((x) => `${x.text} ${x.keywords ?? ""}`)) };
  }
  const scores = index.bm25.scores(query);
  const ranked = index.passages
    .map((x, i) => ({ ...x, score: scores[i] }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) return [];
  // Keep runners-up only when they're nearly as strong, and never two from one source.
  const out: Hit[] = [ranked[0]];
  for (const h of ranked.slice(1)) {
    if (out.length >= limit || h.score < ranked[0].score * 0.6) break;
    if (!out.some((o) => o.source === h.source)) out.push(h);
  }
  return out;
}
