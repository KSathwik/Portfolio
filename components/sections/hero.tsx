import Image from "next/image";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { ResumeDownload, ResumeView } from "@/components/resume-viewer";
import { SketchBanner } from "@/components/sketch-banner";
import {
  PERSONAL_INFO,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  GALLERY_PHOTOS,
  MUSIC_ARTISTS,
} from "@/data/portfolio-data";

const current = EXPERIENCE_DATA.find((e) => e.current) ?? EXPERIENCE_DATA[0];
const degree = EDUCATION_DATA[0];
const company = current.company.replace(" Pvt Ltd", "");
const city = current.location.split(",")[0];

const interests = [
  "Making retrieval measurably better, not just bigger",
  "Agentic workflows: planning, tool use and reflection",
  "Fine-tuning small models with LoRA and QLoRA",
  "Running LLMs locally with Ollama",
];

const facts = [
  { value: "45%", label: "faster ticket resolution with the support assistant" },
  { value: "<5 s", label: "for a reviewed AI email draft, down from minutes" },
  { value: "0.955", label: "ROC-AUC on held-out X-rays (LungAI)" },
  { value: degree.score.replace("CGPA: ", ""), label: "CGPA, B.Tech CSE (Data Science)" },
];

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="about" aria-labelledby="about-title" className="intro">
      {/* Introduction */}
      <div className="wrap grid items-center gap-x-[var(--gap-columns)] gap-y-12 pt-10 pb-14 sm:pt-20 md:grid-cols-12 lg:pb-20">
        <div className="flex min-w-0 flex-col gap-6 md:col-span-7">
          <p className="enter flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2" style={step(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-3 py-1">
              <span className="status-dot" aria-hidden="true" />
              Open to backend &amp; AI engineer roles
            </span>
            <span className="inline-flex items-center gap-1 text-ink-3">
              <MapPin size={14} aria-hidden="true" />
              {PERSONAL_INFO.location}
            </span>
          </p>

          <div className="enter" style={step(1)}>
            <div className="mb-1 flex items-center gap-3">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-paper shadow-[var(--shadow-print)] md:hidden">
                <Image src="/images/sathwik-portrait.jpg" alt="" fill sizes="64px" className="object-cover object-[50%_30%]" />
              </span>
              <p className="hand text-[1.65rem] -rotate-2">Hi, I&apos;m</p>
            </div>
            <h1 id="about-title" className="name">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          <p className="enter lead max-w-[46ch] text-ink" style={step(2)}>
            {current.role} at {company}. I build Python backends and retrieval systems that hold up
            in production: RAG pipelines, multi-agent workflows and the FastAPI services around them.
          </p>

          <div className="enter flex flex-wrap items-center gap-x-3 gap-y-3" style={step(3)}>
            <ResumeDownload />
            <a href="#projects" className="btn">
              See my work
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <ResumeView className="link ml-1 inline-flex min-h-11 items-center text-sm" label="View resume" icon={false} />
          </div>

          <div className="enter grid grid-cols-2 gap-1 text-sm text-ink-3 sm:flex sm:flex-wrap sm:items-center sm:gap-2" style={step(4)}>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn--sm btn--ghost">
              <Mail size={16} aria-hidden="true" />
              Email
            </a>
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hi Sathwik, I came across your portfolio and would like to connect.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--sm btn--ghost"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Portrait: a printed photo, slightly turned, with a note under it */}
        <div className="enter hidden justify-center md:col-span-5 md:flex lg:col-span-4 lg:col-start-9 lg:justify-end" style={step(2)}>
          <div className="relative w-full max-w-[300px]">
            <figure className="polaroid">
              <div className="polaroid-img aspect-[4/5]">
                <Image
                  src="/images/sathwik-portrait.jpg"
                  alt="Portrait of Sathwik Katkam"
                  fill
                  preload
                  sizes="(min-width: 768px) 280px, 1px"
                />
              </div>
              <figcaption>that&apos;s me, say hi</figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Banner: the RAG pipeline, sketched like a notebook page */}
      <div className="reveal">
        <SketchBanner />
      </div>

      {/* About me, in my own words */}
      <div className="wrap py-[var(--section-gap-s)]">
        <div className="grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
          <div className="reveal flex min-w-0 flex-col gap-5 lg:col-span-7">
            <span className="section-mark">01 About</span>
            <h2 className="kicker-title">The part of AI that has to work every day</h2>
            <p className="text-[length:var(--text-lead)] leading-[1.5] text-ink">
              Since {current.duration.split(" –")[0]} I&apos;ve been an {current.role} at{" "}
              {current.company} in {city}, writing Python backends and REST APIs and shipping AI
              features into enterprise software: a support-ticket assistant built on RAG and semantic
              search, and a multi-agent email system with planning, generation and reflection agents.
            </p>
            <p className="text-ink-2">
              I studied {degree.field.replace(" – ", ", ")} at {degree.institution.split(",")[0]},
              then interned at Venago Innovations building serverless Python APIs on AWS. That mix of
              data science and backend work still shapes how I build: retrieval, agents and models on
              the inside, solid APIs, auth and deployment around them.
            </p>

            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-3">
                <h3 className="text-[length:var(--text-lg)]">What I&apos;m curious about</h3>
                <ul className="ticks">
                  {interests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <h3 className="text-[length:var(--text-lg)]">Where I&apos;m heading</h3>
                <p className="text-ink-2">
                  I want to grow into an AI engineer who owns systems end to end, from retrieval and
                  evaluation to the APIs, security and cloud they run on. I&apos;m open to software
                  engineering, backend and AI engineer roles.
                </p>
                <a href="#contact" className="link inline-flex min-h-11 w-fit items-center">
                  <Mail size={14} aria-hidden="true" className="mr-1.5 inline align-[-2px]" />
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </div>

          {/* The person behind the code: a candid photo, the off-hours, and the quick facts */}
          <aside className="reveal flex min-w-0 flex-col gap-10 lg:col-span-4 lg:col-start-9" aria-label="Away from the keyboard and quick facts">
            <figure className="polaroid polaroid--sm mx-auto lg:mx-0">
              <div className="polaroid-img aspect-[4/3]">
                <Image
                  src="/images/sathwik-on-stage.jpg"
                  alt="Sathwik speaking at a podium on stage, smiling, holding notes"
                  fill
                  sizes="260px"
                />
              </div>
              <figcaption>caught mid-sentence, on stage</figcaption>
            </figure>

            {/* Off the clock, at a glance: a few of my photos and who's on my playlist */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-1">
                <h3 className="text-[length:var(--text-lg)]">Off the clock</h3>
                <p className="text-ink-2">
                  Music on while I code, a good movie on weekends, and a camera whenever I travel.
                </p>
              </div>

              {GALLERY_PHOTOS.length > 0 && (
                <div className="grid gap-2">
                  <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0">
                    {GALLERY_PHOTOS.slice(0, 4).map((p, i) => (
                      <li key={p.src}>
                        <a
                          href="#through-my-lens"
                          className="peek-thumb"
                          style={{ "--tilt": `${[-3, 2, -1.5, 2.5][i]}deg` } as React.CSSProperties}
                          aria-label={`${p.alt} (see all my photos)`}
                        >
                          <Image src={p.src} alt="" fill sizes="80px" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href="#through-my-lens" className="link inline-flex min-h-11 w-fit items-center text-sm">
                    See all {GALLERY_PHOTOS.length} photos
                  </a>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href="#off-the-clock" className="peek-artists" aria-label="See the artists on my playlist">
                  {MUSIC_ARTISTS.map((a) => (
                    <span key={a.spotifyId} className="peek-artist" title={a.name}>
                      <Image src={a.image} alt="" fill sizes="40px" />
                    </span>
                  ))}
                </a>
                <a href="#off-the-clock" className="link inline-flex min-h-11 items-center text-sm">
                  See what&apos;s on my playlist
                </a>
              </div>
            </div>

            <dl className="facts min-w-0">
              {facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt className="text-sm text-ink-3">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
