"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBehance, FaDribbble, FaFileAlt } from "react-icons/fa";
import { Project } from "@/types";

// 1. Update Props to accept 'onCardClick'
type Props = {
  project: Project;
  mode: "web" | "uiux";
  onCardClick: (project: Project) => void; 
};

const cardVariants = {
  // ... (variants are fine, no change)
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.4
    }
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

// 2. Update function signature
export default function ProjectCard({ project, mode, onCardClick }: Props) { // 👈 ADD onCardClick
  
  const isPortfolioLink = project.liveUrl && (project.liveUrl.includes("behance") || project.liveUrl.includes("dribbble"));

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformPerspective: "1000px" }}
      whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      // 3. Conditional card styling and cursor
      className={`group relative h-full overflow-hidden rounded-2xl p-8 shadow-lg transition-all flex flex-col items-center text-center
        ${
          mode === "uiux"
            ? "bg-gray-900 border border-gray-800 hover:shadow-2xl hover:shadow-uiux-accent/20"
            : "bg-blue-100 hover:shadow-2xl hover:shadow-accent/20"
        }
      `}
      onClick={() => {
          onCardClick(project);
      }}
    >
      
      {/* Project Title */}
      <h3
        className={`text-2xl md:text-3xl font-bold text-gray-700 mb-4 transition-colors
          ${
            mode === "uiux"
              ? "text-white group-hover:text-uiux-accent"
              : "text-gray-700 group-hover:text-accent"
          }
        `}
      >
        {project.title}
      </h3>

      {/* Project Description */}
      <p
        className={`text-sm md:text-base line-clamp-3 mb-4
          ${mode === "uiux" ? "text-gray-300" : "text-secondary"}
        `}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {project.tags?.map((tag) => (
          <motion.span
            key={tag}
            whileHover={{ scale: 1.05 }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors
              ${
                mode === "uiux"
                  ? "bg-gray-800 text-gray-300 group-hover:bg-uiux-accent/10 group-hover:text-uiux-accent"
                  : "bg-border text-secondary group-hover:bg-accent/10 group-hover:text-primary"
              }
            `}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        {project.repoUrl && (
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all
              ${
                mode === "uiux"
                  ? "border-gray-700 bg-gray-800 text-gray-200 hover:border-uiux-accent hover:bg-uiux-accent hover:text-black"
                  : "border-border bg-surface text-primary hover:border-accent hover:bg-accent hover:text-background"
              }
            `}
            onClick={(e) => e.stopPropagation()} // 👈 ADD: Stop click from bubbling to the card
          >
            {mode === "uiux" ? <FaFileAlt /> : <FaGithub />}
            {mode === "uiux" ? "Case Study" : "Code"}
          </motion.a>
        )}

        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-md transition-all hover:opacity-90
              ${
                mode === "uiux"
                  ? "bg-uiux-accent text-black shadow-uiux-accent/20"
                  : "bg-accent text-background shadow-accent/20"
              }
            `}
            onClick={(e) => e.stopPropagation()} // 👈 ADD: Stop click from bubbling to the card
          >
            {isPortfolioLink ? (
              project.liveUrl.includes("behance") ? (
                <FaBehance />
              ) : (
                <FaDribbble />
              )
            ) : (
              <FaExternalLinkAlt />
            )}
            {isPortfolioLink ? "View" : "Live"}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}