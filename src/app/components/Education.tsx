"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // 👈 1. Import usePathname
import { FaUniversity } from "react-icons/fa";
import EducationItemCard from "./ui/EducationItemCard";
import { educationData } from "./data/education"; // Import your data

const sectionAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Education() {
  // 👈 2. Get the current mode
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  return (
    <motion.section
      id="education"
      className="w-full py-16 md:py-24"
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Title */}
      <div className="mb-12 flex items-center justify-center gap-4">
        {/* 👈 3. Conditional icon color */}
        <FaUniversity
          className={`text-3xl ${
            mode === "uiux" ? "text-white" : "text-black"
          }`}
        />
        {/* 👈 4. Conditional title color */}
        <h2
          className={`section-title text-center !mb-0 ${
            mode === "uiux"
              ? "text-white after:bg-uiux-accent"
              : "text-black after:bg-accent"
          }`}
        >
          Education
        </h2>
      </div>

      {/* Education List Container */}
      <div className="relative mx-auto max-w-3xl">
        {/* The vertical timeline bar */}
        {/* 👈 5. Conditional timeline bar color */}
        <div
          className={`absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 ${
            mode === "uiux" ? "bg-gray-600" : "bg-border"
          }`}
        ></div>

        {/* List of education items */}
        <div className="flex flex-col gap-10">
          {educationData.map((item, index) => (
            // 👈 6. Pass mode to the child component
            <EducationItemCard
              key={item.id}
              item={item}
              index={index}
              mode={mode} // Pass the mode down
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}