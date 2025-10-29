"use client";

import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { EducationItem } from "@/types"; // Assuming this is your type

// 1. Update Props to accept 'mode'
type Props = {
  item: EducationItem;
  index: number; // For staggered animation
  mode: "web" | "uiux"; // Accept the mode from the parent
};

// Animation for each item
const itemAnimation = {
  hidden: { opacity: 0, x: -50 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1, // Staggered delay
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// 2. Update function signature to receive 'mode'
export default function EducationItemCard({ item, index, mode }: Props) {
  return (
    <motion.div
      className="relative flex items-start gap-6"
      variants={itemAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      {/* 3. Icon: Aligns with the timeline bar (Conditionally styled) */}
      <div
        className={`z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full shadow-md ${
          mode === "uiux" ? "bg-gray-800" : "bg-white" // Using bg-white instead of bg-surface
        }`}
      >
        {/* 4. Icon color (Conditionally styled) */}
        <FaGraduationCap
          className={`text-xl ${
            mode === "uiux" ? "text-uiux-accent" : "text-accent" // Use accent colors
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex-grow pt-1">
        {/* Header: University + Date */}
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          {/* 5. University text color (Conditionally styled) */}
          <h3
            className={`text-lg font-semibold ${
              mode === "uiux" ? "text-white" : "text-gray-700"
            }`}
          >
            {item.university}
          </h3>
          {/* 6. Date text color (Conditionally styled) */}
          <span
            className={`flex-shrink-0 text-sm sm:ml-4 ${
              mode === "uiux" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {item.dateRange}
          </span>
        </div>

        {/* 7. Description text color (Conditionally styled) */}
        <p
          className={`mt-1 text-sm ${
            mode === "uiux" ? "text-gray-300" : "text-secondary"
          }`}
        >
          {item.degree}
        </p>
      </div>
    </motion.div>
  );
}