"use client";

import React from "react";
import { Fira_Code } from "next/font/google"; // 👈 Import coding font
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import ClickBubbles from "../components/ClickBubbles";
import CometTrail from "../components/CometTrail";
import Education from "../components/Education";

// Load Fira Code font
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
});

// Divider component
const SectionDivider: React.FC = () => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-12">
    <div className="w-full border-t border-border" />
  </div>
);

// Web Developer Page
export default function WebDevPage() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center overflow-x-hidden bg-gray-300 ${firaCode.className}`}
    >
      {/* Effects */}
      <ClickBubbles />
      <CometTrail />

      <Navbar />
      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Hero />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <About />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Skills />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Projects />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Education />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Contact />
      </div>

      <SectionDivider />

      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12">
        <Footer />
      </div>
    </main>
  );
}
