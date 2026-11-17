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
import { OffTheClock } from "@/components/sections/off-the-clock";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* About me comes first: who I am, then what I've built. */}
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <AISystemsLab />
        {/* Education and certifications share one band, side by side. */}
        <section aria-labelledby="education-title" className="section section--tint">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="section-mark">06 Education<span className="head-note" aria-hidden="true">the paperwork</span></span>
              <h2 id="education-title" className="kicker-title">Where I learned it</h2>
              <p>A degree in data science, then two courses on generative and agentic AI.</p>
            </div>
            <div className="reveal grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-2">
              <Education />
              <Certifications />
            </div>
          </div>
        </section>
        <OffTheClock />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <PortfolioChatbot />
      <RevealObserver />
    </>
  );
}
