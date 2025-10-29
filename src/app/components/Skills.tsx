"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import SkillIcon from "./ui/SkillIcon";

// Variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 👈 3. Variants for the individual UI/UX skill cards
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 👈 4. Hard-coded list of UI/UX skills
const uiuxSkills = [
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "Illustrator" },
  { name: "TailwindCSS" }, // You mentioned these
  { name: "HTML" },
  { name: "CSS" },
  { name: "React" }, // Good to show cross-functional skills
  { name: "JavaScript" }, // Good to show cross-functional skills
];

const webSkills = [
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "TailwindCSS" },
  { name: "HTML" },
  { name: "CSS" },
];

export default function Skills() {
  const [skills, setSkills] = useState<{ name: string; percentage: number }[]>(
    []
  );

  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";
  const skillsToDisplay = mode === "web" ? webSkills : uiuxSkills;

  return (
    <motion.section
      id="skills"
      className="w-full py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Conditional title styling remains the same */}
      <h2
        className={`section-title text-center ${mode === "uiux"
            ? "text-white after:bg-uiux-accent"
            : "text-black after:bg-accent"
          }`}
      >
        My Toolkit
      </h2>

      {/* 👈 7. Unified Rendering: Always show a grid, but map over the correct array */}
      <motion.div
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skillsToDisplay.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            // 👈 8. Conditional styling for the cards
            className={
              mode === "web"
                // Light mode styles for Web
                ? "flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all hover:border-accent hover:scale-105"
                // Dark mode styles for UI/UX
                : "flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg transition-all hover:border-uiux-accent hover:scale-105"
            }
          >
            <SkillIcon
              skill={skill.name}
              // 👈 9. Conditional text color for icon
              className={`text-5xl ${mode === "web" ? "text-gray-800" : "text-white"
                }`}
            />
            <p
              // 👈 10. Conditional text color for name
              className={`font-medium ${mode === "web" ? "text-black" : "text-white"
                }`}
            >
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}