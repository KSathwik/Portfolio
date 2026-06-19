"use client";

import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { LoadingScreen } from "@/components/loading-screen";
import { Background } from "@/components/background";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
