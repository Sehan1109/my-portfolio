"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Define the Project type here since '@/types' cannot be found
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
};
import ProjectCard from "./ui/ProjectCard";
import { usePathname } from "next/navigation";
import ProjectModal from "./ui/ProjectModal";

const INITIAL_PROJECT_COUNT = 6;

const uiuxProjects: Project[] = [
  {
    id: 9001,
    title: "News App Design",
    description:
      "A complete UI/UX overhaul for a mobile news app, focusing on user flow and conversion.",
    image: "/project/FOTnews.png",
    tags: ["Figma", "UI Design", "Mobile", "User Research"],
    repoUrl:
      "https://drive.google.com/file/d/1qsr8_b5iaR4xxctE3gZW8l6GEPLBuX2u/view?usp=sharing",
  },
];

const uiuxTags = [
  "All",
  "Figma",
  "Photoshop",
  "Illustrator",
  "UI Design",
  "UX Design",
  "Mobile",
  "Web",
  "User Research",
  "Prototyping",
];

const excluededRepos = ["my-first-repo", "testcode", "code-creation", "TodoList"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeTag, setActiveTag] = useState("All");
  const [allTags, setAllTags] = useState<string[]>(["All"]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (mode === "web") {
      async function fetchProjects() {
        try {
          const res = await fetch(
            "https://api.github.com/users/Sehan1109/repos?type=all&sort=updated"
          );

          const repos = await res.json();
          const relevantRepos = repos.filter(
            (repo: any) => !repo.fork && !excluededRepos.includes(repo.name)
          );

          const data: Project[] = relevantRepos.map((repo: any) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description || "No description available.",
            image: "/projects/default.jpg",
            tags: repo.topics?.length
              ? repo.topics
              : [repo.language || "Other"],
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || "",
          }));

          setProjects(data);
          setFilteredProjects(data);

          const tags = Array.from(
            new Set(data.flatMap((p) => p.tags?.filter(Boolean)))
          );

          setAllTags(["All", ...tags]);
          setShowAllProjects(false);
          setActiveTag("All");
        } catch (error) {
          console.error("Error fetching GitHub repos:", error);
        }
      }

      fetchProjects();
    } else {
      setProjects(uiuxProjects);
      setFilteredProjects(uiuxProjects);
      setAllTags(uiuxTags);
      setShowAllProjects(false);
      setActiveTag("All");
    }
  }, [mode]);

  const handleFilter = (tag: string) => {
    setActiveTag(tag);
    setShowAllProjects(false);
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.tags.includes(tag)));
    }
  };

  const projectsToDisplay = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <motion.section
      id="projects"
      className="w-full py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2
        className={`section-title text-center ${
          mode === "uiux"
            ? "text-white after:bg-uiux-accent"
            : "text-black after:bg-accent"
        }`}
      >
        My Work
      </h2>

      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleFilter(tag)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-6 md:text-base
              ${
                activeTag === tag
                  ? mode === "uiux"
                    ? "bg-uiux-accent text-white"
                    : "bg-accent text-white"
                  : mode === "uiux"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-secondary hover:bg-blue-200 hover:text-white"
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {projectsToDisplay.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              mode={mode}
              onCardClick={(proj) => setSelectedProject(proj as Project | null)}
            />
          ))}

          {/* Popup modal */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            mode={mode}
          />
        </AnimatePresence>
      </motion.div>

      {/* "View More" / "Show Less" Button */}
      <div className="mt-12 text-center">
        {filteredProjects.length > INITIAL_PROJECT_COUNT && (
          <motion.button
            onClick={() => setShowAllProjects((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-md px-8 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50
              ${
                mode === "uiux"
                  ? "bg-uiux-accent hover:bg-uiux-accent-hover"
                  : "bg-accent hover:bg-accent-hover"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllProjects ? "Show Less" : "View More"}
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}
