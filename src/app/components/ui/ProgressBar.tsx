"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import SkillIcon from "./SkillIcon"; // <-- Import the new component

// 1. Update Props to accept 'mode'
type Props = {
  skill: string;
  percentage: number;
  mode: "web" | "uiux"; // 👈 ADDED
};

// Define variants for the staggered item animation
const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// 2. Update function signature to accept 'mode'
export default function ProgressBar({ skill, percentage, mode }: Props) {
  // For animating the number
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}%`);

  // Animate the number and the bar when the component is visible
  useEffect(() => {
    const controls = animate(count, percentage, {
      duration: 1.5,
      delay: 0.2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [percentage, count]);

  return (
    <motion.div
      className="w-full"
      variants={itemVariants}
      whileHover={{ scale: 1.03, x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Skill Name + Percentage */}
      <div className="mb-2 flex items-center justify-between">
        {/* Skill Name + Icon */}
        <div className="flex items-center gap-3">
          {/* 3. Conditionally styled icon */}
          <SkillIcon
            skill={skill}
            className={`h-6 w-6 ${
              mode === "uiux" ? "text-uiux-accent" : "text-accent"
            }`}
          />
          {/* 4. Conditionally styled skill name */}
          <span
            className={`font-medium ${
              mode === "uiux" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {skill}
          </span>
        </div>

        {/* 5. Conditionally styled percentage text */}
        <motion.span
          className={`text-sm font-medium ${
            mode === "uiux" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {rounded}
        </motion.span>
      </div>

      {/* 6. Conditionally styled bar background */}
      <div
        className={`h-2 w-full overflow-hidden rounded-full ${
          mode === "uiux" ? "bg-gray-700" : "bg-border"
        }`}
      >
        {/* 7. Conditionally styled bar fill */}
        <motion.div
          className={`h-full origin-left rounded-full ${
            mode === "uiux" ? "bg-uiux-accent" : "bg-accent"
          }`}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
        />
      </div>
    </motion.div>
  );
}