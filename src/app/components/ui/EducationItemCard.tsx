import { motion, Variants } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { EducationItem } from "@/types";

type Props = {
  item: EducationItem;
  index: number;
  mode: "web" | "uiux";
};

// ✅ Properly typed variants using custom
const itemAnimation: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // use easing array instead of string
    },
  }),
};

export default function EducationItemCard({ item, index, mode }: Props) {
  return (
    <motion.div
      className="relative flex items-start gap-6"
      variants={itemAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index} // passes index to the variant function
    >
      <div
        className={`z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full shadow-md ${
          mode === "uiux" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <FaGraduationCap
          className={`text-xl ${
            mode === "uiux" ? "text-uiux-accent" : "text-accent"
          }`}
        />
      </div>

      <div className="flex-grow pt-1">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h3
            className={`text-lg font-semibold ${
              mode === "uiux" ? "text-white" : "text-gray-700"
            }`}
          >
            {item.university}
          </h3>
          <span
            className={`flex-shrink-0 text-sm sm:ml-4 ${
              mode === "uiux" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {item.dateRange}
          </span>
        </div>
        <p className={`mt-1 text-sm ${mode === "uiux" ? "text-gray-300" : "text-secondary"}`}>
          {item.degree}
        </p>
      </div>
    </motion.div>
  );
}
