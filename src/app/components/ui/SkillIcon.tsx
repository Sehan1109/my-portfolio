"use client";

import { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGo,
  SiRust,
  SiDocker,
  SiGnubash,
  SiC,
  SiCplusplus,
  SiVuedotjs,
  SiFigma,             // 👈 Import new icons
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";
import { BsCodeSlash } from "react-icons/bs";

type Props = {
  skill: string;
  className?: string;
};

interface IconData {
  component: IconType;
  color?: string; // Optional color string
}

// Map skill names (lowercase) to their corresponding icon component AND color
const iconMap: { [key: string]: IconData } = {
  javascript: { component: SiJavascript, color: "#F7DF1E" },
  typescript: { component: SiTypescript, color: "#3178C6" },
  python: { component: SiPython, color: "#3776AB" },
  html: { component: SiHtml5, color: "#E34F26" },
  css: { component: SiCss3, color: "#1572B6" },
  react: { component: SiReact, color: "#61DAFB" },
  "next.js": { component: SiNextdotjs, color: "#000000" }, // Will be given 'text-white' by Navbar in dark mode
  "node.js": { component: SiNodedotjs, color: "#339933" },
  tailwindcss: { component: SiTailwindcss, color: "#06B6D4" },
  git: { component: SiGit, color: "#F05032" },
  java: { component: FaJava, color: "#007396" },
  go: { component: SiGo, color: "#00ADD8" },
  rust: { component: SiRust, color: "#DEA584" },
  docker: { component: SiDocker, color: "#2496ED" },
  shell: { component: SiGnubash, color: "#4EAA25" },
  c: { component: SiC, color: "#A8B9CC" },
  "c++": { component: SiCplusplus, color: "#00599C" },
  vue: { component: SiVuedotjs, color: "#4FC08D" },
  
  // 👈 Add new design tools to the map
  figma: { component: SiFigma, color: "#F24E1E" },
  photoshop: { component: SiAdobephotoshop, color: "#31A8FF" },
  illustrator: { component: SiAdobeillustrator, color: "#FF9A00" },
};

// Default icon and color for skills not in the map
const DefaultIconData: IconData = { component: BsCodeSlash, color: undefined };

export default function SkillIcon({ skill, className }: Props) {
  // Find the icon data, or use the default
  const { component: IconComponent, color } =
    iconMap[skill.toLowerCase()] || DefaultIconData;

  return (
    <IconComponent
      className={className}
      style={color ? { color: color } : undefined} // Apply inline color if available
    />
  );
}