"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBehance, FaDribbble, FaFileAlt } from "react-icons/fa";
import { Project } from "@/types";

type Props = {
    project: Project | null;
    onClose: () => void;
    mode: "web" | "uiux";
};

export default function ProjectModal({ project, onClose, mode }: Props) {
    if (!project) return null;

    const isPortfolioLink =
        project.liveUrl &&
        (project.liveUrl.includes("behance") || project.liveUrl.includes("dribbble"));

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Modal Content */}
                <motion.div
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 120 }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        {project.title}
                    </h2>

                    {/* Image */}
                    {mode === "uiux" && project.image && (
                        <div className="w-full h-72 mb-4 overflow-hidden rounded-xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                    </p>

                    {/* Tags */}
                    {(project.tags ?? []).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {(project.tags ?? []).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}


                    <div className="flex flex-wrap gap-3 mt-4">
                        {project.repoUrl && (
                            <motion.a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
                            >
                                {/* 👈 FIX: Use 'mode' to show correct icon and text */}
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
                                // 👈 FIX: Use mode-specific colors to match the card
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-md
                                     ${mode === "uiux"
                                        ? "bg-uiux-accent text-black shadow-uiux-accent/20 hover:opacity-90"
                                        : "bg-accent text-background shadow-accent/20 hover:opacity-90"
                                    }`}
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
            </motion.div>
        </AnimatePresence>
    );
}
