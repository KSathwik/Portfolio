"use client";

import { Navigation } from "@/components/navigation";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { AISystemsLab } from "@/components/ai/ai-systems-lab";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { PortfolioChatbot } from "@/components/ai/portfolio-chatbot";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* About me comes first: who I am, then what I've built. */}
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <AISystemsLab />
        {/* Education and certifications share one band, side by side. */}
        <section aria-labelledby="education-title" className="section section--tint">
          <div className="wrap">
            <div className="section-head">
              <span className="section-mark">06 Education</span>
              <h2 id="education-title" className="kicker-title">Education and certifications</h2>
            </div>
            <div className="grid gap-x-[var(--gap-columns)] gap-y-16 lg:grid-cols-2">
              <Education />
              <Certifications />
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <PortfolioChatbot />
    </>
  );
}
