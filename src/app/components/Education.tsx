"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaUniversity } from "react-icons/fa";
import EducationItemCard from "./ui/EducationItemCard";
import { educationData } from "./data/education";

export default function Education() {
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  return (
    <motion.section
      id="education"
      className="w-full py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Title */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <FaUniversity
          className={`text-3xl ${
            mode === "uiux" ? "text-white" : "text-black"
          }`}
        />
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
        {/* Timeline Bar */}
        <div
          className={`absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 ${
            mode === "uiux" ? "bg-gray-600" : "bg-border"
          }`}
        ></div>

        {/* Education Items */}
        <div className="flex flex-col gap-10">
          {educationData.map((item, index) => (
            <EducationItemCard
              key={item.id}
              item={item}
              index={index}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
