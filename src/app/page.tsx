import React from "react";
import { IntroOverlay } from "@/components/intro-overlay";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectMarquee } from "@/components/project-marquee";
import { ProjectIndex } from "@/components/project-index";
import { TesselCaseStudy } from "@/components/tessel-case-study";
import { SecondaryProjects } from "@/components/secondary-projects";
import { StackSection } from "@/components/stack-section";
import { HowIWork } from "@/components/how-i-work";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { AskMustyChat } from "@/components/ask-musty-chat";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <IntroOverlay />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative min-h-[100svh] flex flex-col justify-between">
        <Navbar />

        <main className="flex-1">
          <Hero />
          <ProjectMarquee />
          <ProjectIndex />
          <TesselCaseStudy />
          <SecondaryProjects />
          <StackSection />
          <HowIWork />
          <AboutSection />
          <ContactSection />
        </main>

        <AskMustyChat />
      </div>
    </SmoothScrollProvider>
  );
}
