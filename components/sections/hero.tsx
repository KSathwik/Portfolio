import Image from "next/image";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ResumeDownload, ResumeView } from "@/components/resume-viewer";
import { RetrievalField } from "@/components/retrieval-field";
import {
  PERSONAL_INFO,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
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
  { value: "1+ year", label: "professional experience" },
  { value: degree.score.replace("CGPA: ", ""), label: "CGPA, B.Tech CSE (Data Science)" },
  { value: String(CERTIFICATIONS_DATA.length), label: "AI certifications completed" },
];

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="about" aria-labelledby="about-title" className="intro">
      {/* Introduction */}
      <div className="wrap grid items-center gap-x-[var(--gap-columns)] gap-y-8 pt-20 pb-16 sm:pt-24 lg:grid-cols-12">
        {/* Portrait: above the text on small screens, to the right on large ones */}
        <div className="enter lg:order-2 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:justify-self-end" style={step(1)}>
          <div className="portrait">
            <Image
              src="https://github.com/KSathwik.png"
              alt="Sathwik Katkam speaking at a podium"
              fill
              preload
              sizes="(min-width: 1024px) 280px, 128px"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <p className="enter font-mono text-sm text-ink-3" style={step(0)}>
            {current.role} at {company}, {city}
          </p>
          <h1 id="about-title" className="enter name" style={step(1)}>
            {PERSONAL_INFO.name}
          </h1>
          <p className="enter lead max-w-[44ch] text-ink" style={step(2)}>
            I build Python backends and retrieval systems that hold up in production: RAG pipelines,
            multi-agent workflows and the FastAPI services around them.
          </p>

          <div className="enter flex flex-wrap items-center gap-x-3 gap-y-3" style={step(3)}>
            <ResumeDownload />
            <a href="#projects" className="btn">
              See my work
            </a>
            <ResumeView className="link ml-1 text-sm" label="View resume" icon={false} />
          </div>

          <div className="enter flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-3" style={step(4)}>
            <span className="mr-1">Open to backend and AI engineer roles.</span>
            <span className="flex items-center gap-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--icon btn--ghost"
                aria-label="GitHub (opens in a new tab)"
              >
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--icon btn--ghost"
                aria-label="LinkedIn (opens in a new tab)"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Signature: the retrieval field as a quiet full-width band */}
      <div className="signature w-full" aria-hidden="true">
        <RetrievalField bare className="h-24 w-full" />
      </div>

      {/* About me, in my own words */}
      <div className="wrap py-[var(--section-gap-s)]">
        <div className="grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
          <div className="reveal flex min-w-0 flex-col gap-5 lg:col-span-8">
            <span className="section-mark">01 About</span>
            <h2 className="kicker-title">The part of AI that has to work every day</h2>
            <p className="text-[length:var(--text-lead)] leading-[1.5] text-ink">
              Since {current.duration.split(" –")[0]} I&apos;ve been an {current.role} at{" "}
              {current.company}, writing Python backends and REST APIs and shipping AI features into
              enterprise software: a support-ticket assistant built on RAG and semantic search, and a
              multi-agent email system with planning, generation and reflection agents.
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
                <a href="#contact" className="link w-fit">
                  <Mail size={14} aria-hidden="true" className="mr-1.5 inline align-[-2px]" />
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </div>

          <dl className="reveal facts min-w-0 lg:col-span-3 lg:col-start-10 lg:self-start">
            {facts.map((f) => (
              <div key={f.label} className="fact">
                <dt className="text-sm text-ink-3">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
