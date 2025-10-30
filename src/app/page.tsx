"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// --- 👇 [UPDATED] Icon Imports ---
import {
  FaLinkedin,
  FaFacebook,
  FaGithub,
  FaReact,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiAdobephotoshop, SiAdobeillustrator } from "react-icons/si";

// Define your image paths
const defaultImage = "/profile.png";
const webDevImage = "/profile1.png";
const uiuxImage = "/white-pro.png";

// --- Set a consistent animation duration ---
const ANIMATION_DURATION_MS = 1500;
const ANIMATION_DURATION_CLASS = "duration-[1500ms]";

// --- 👇 [UPDATED] Image Sizing ---
const imageCommonClasses = `
  col-start-1 row-start-1
  transition-opacity ${ANIMATION_DURATION_CLASS} ease-in-out
  w-auto h-auto max-h-[100vh] 
  max-w-32 /* 14rem / 224px */
  sm:max-w-xs /* 20rem / 320px */
  md:max-w-xs /* 20rem / 320px */
  lg:max-w-sm /* 24rem / 384px */
  xl:max-w-md /* 28rem / 448px */

  object-contain pointer-events-auto
`;
// --- [END] Image Sizing ---

// --- 👇 [NEW] Base classes for dropping icons ---
const iconBaseClasses = `
  text-4xl sm:text-5xl 
  transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
`;

const HomePage: React.FC = () => {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<"none" | "webdev" | "uiux">(
    "none"
  );
  const [animatingToPage, setAnimatingToPage] = useState<
    "none" | "webdev" | "uiux"
  >("none");

  const handleNavigation = (side: "webdev" | "uiux") => {
    if (animatingToPage !== "none") return;
    setAnimatingToPage(side);
    setHoveredSide("none"); // Stop hover animations

    setTimeout(() => {
      const path = side === "webdev" ? "/WebDevPage" : "/UiuxPage";
      router.push(path);
      setTimeout(() => setAnimatingToPage("none"), 100);
    }, ANIMATION_DURATION_MS);
  };

  // Background logic
  const webDevBgClass =
    animatingToPage !== "none"
      ? "bg-transparent"
      : hoveredSide === "uiux"
      ? "bg-slate-800"
      : "bg-gray-300";

  const uiuxBgClass =
    animatingToPage !== "none"
      ? "bg-transparent"
      : hoveredSide === "webdev"
      ? "bg-gray-300"
      : "bg-slate-800";

  // --- 👇 [NEW] Helper function for icon animation ---
  const iconDropClass = (side: "webdev" | "uiux") => {
    // Show if NOT clicking AND hover matches
    const isVisible = animatingToPage === "none" && hoveredSide === side;
    return isVisible
      ? "translate-y-24 sm:translate-y-32 opacity-80" // Drop down into view
      : "-translate-y-full opacity-0"; // Start above and hidden
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* Top Bar (no changes) */}
      <div
        className="
          w-full bg-white shadow-md z-30 
          flex justify-between items-center 
          px-8 py-4
        "
      >
        <h1 className="text-2xl font-bold text-black">SEHAN MINDULA</h1>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
          </a>
          <a
            href="https://facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-2xl text-gray-700 hover:text-blue-800 transition-colors" />
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl text-gray-700 hover:text-black transition-colors" />
          </a>
        </div>
      </div>

      {/* Wrapper for main content */}
      <div className="relative flex flex-1 w-full overflow-hidden">
        {/* Left Side (Web Developer) */}
        <div
          onClick={() => handleNavigation("webdev")}
          onMouseEnter={() => {
            if (animatingToPage === "none") setHoveredSide("webdev");
          }}
          onMouseLeave={() => {
            if (animatingToPage === "none") setHoveredSide("none");
          }}
          className={`
            flex-1 
            ${webDevBgClass} 
            text-black 
            flex 
            flex-col 
            justify-center 
            items-center 
            text-center 
            p-8 
            sm:p-16 
            cursor-pointer 
            transition-colors 
            ${ANIMATION_DURATION_CLASS} 
            ease-in-out
          `}
        >
          {/* Wrapper for CLICK animation */}
          <div
            className={`
              relative z-10
              transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
              ${
                animatingToPage === "webdev"
                  ? "scale-110 translate-x-[25vw] opacity-100"
                  : animatingToPage === "uiux"
                  ? "scale-90 -translate-x-full opacity-0"
                  : ""
              }
            `}
          >
            {/* --- 👇 [NEW] Dropping Icons --- */}
            <div className="absolute inset-x-0 top-0 flex justify-center gap-6 sm:gap-10 pointer-events-none text-black">
              <FaReact
                className={`${iconBaseClasses} delay-[100ms] ${iconDropClass(
                  "webdev"
                )}`}
              />
              <FaNodeJs
                className={`${iconBaseClasses} delay-[200ms] ${iconDropClass(
                  "webdev"
                )}`}
              />
              <IoLogoJavascript
                className={`${iconBaseClasses} delay-[300ms] ${iconDropClass(
                  "webdev"
                )}`}
              />
            </div>
            {/* --- [END] Dropping Icons --- */}

            {/* H1 HOVER logic */}
            <h1
              className={`
                text-4xl sm:text-9xl font-extrabold mb-4 text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "uiux"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              Web
            </h1>
            {/* H1 HOVER logic */}
            <h1
              className={`
                text-4xl sm:text-6xl font-extrabold mb-4 text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "webdev"
                    ? "translate-x-[50vw] scale-110 opacity-100"
                    : animatingToPage === "none" && hoveredSide === "uiux"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              Developer
            </h1>
            {/* P HOVER logic */}
            <p
              className={`
                text-xl sm:text-2xl text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "uiux"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              Full stack developer
            </p>
          </div>
        </div>

        {/* Right Side (UI/UX Designer) */}
        <div
          onClick={() => handleNavigation("uiux")}
          onMouseEnter={() => {
            if (animatingToPage === "none") setHoveredSide("uiux");
          }}
          onMouseLeave={() => {
            if (animatingToPage === "none") setHoveredSide("none");
          }}
          className={`
            flex-1 
            ${uiuxBgClass} 
            text-white 
            flex 
            flex-col 
            justify-center 
            items-center 
            text-center 
            p-8 
            sm:p-16 
            cursor-pointer 
            transition-colors 
            ${ANIMATION_DURATION_CLASS} 
            ease-in-out
          `}
        >
          {/* Wrapper for CLICK animation */}
          <div
            className={`
              relative z-10
              transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
              ${
                animatingToPage === "uiux"
                  ? "scale-110 -translate-x-[25vw] opacity-100"
                  : animatingToPage === "webdev"
                  ? "scale-90 translate-x-full opacity-0"
                  : ""
              }
            `}
          >
            {/* --- 👇 [NEW] Dropping Icons --- */}
            <div className="absolute inset-x-0 top-0 flex justify-center gap-6 sm:gap-10 pointer-events-none text-white">
              <FaFigma
                className={`${iconBaseClasses} delay-[100ms] ${iconDropClass(
                  "uiux"
                )}`}
              />
              <SiAdobeillustrator
                className={`${iconBaseClasses} delay-[200ms] ${iconDropClass(
                  "uiux"
                )}`}
              />
              <SiAdobephotoshop
                className={`${iconBaseClasses} delay-[300ms] ${iconDropClass(
                  "uiux"
                )}`}
              />
            </div>
            {/* --- [END] Dropping Icons --- */}

            {/* H1 HOVER logic */}
            <h1
              className={`
                text-4xl sm:text-9xl font-extrabold mb-4 text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "webdev"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              UI/UX
            </h1>
            {/* H1 HOVER logic */}
            <h1
              className={`
                text-4xl sm:text-6xl font-extrabold mb-4 text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "uiux"
                    ? "-translate-x-[50vw] scale-110 opacity-100"
                    : animatingToPage === "none" && hoveredSide === "webdev"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              Designer
            </h1>
            {/* P HOVER logic */}
            <p
              className={`
                text-xl sm:text-2xl italic text-center
                transition-all ${ANIMATION_DURATION_CLASS} ease-in-out
                ${
                  animatingToPage === "none" && hoveredSide === "webdev"
                    ? "opacity-0 scale-90"
                    : ""
                }
              `}
            >
              Special for UI/UX design
            </p>
          </div>
        </div>

        {/* Central Image Overlay */}
        <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 justify-items-center items-center pointer-events-none z-20">
          <Image
            src={defaultImage}
            alt="SE"
            width={400}
            height={600}
            className={`${imageCommonClasses} ${
              hoveredSide === "none" && animatingToPage === "none"
                ? "opacity-100"
                : "opacity-0"
            }`}
            priority
          />
          <Image
            src={webDevImage}
            alt="SE"
            width={400}
            height={600}
            className={`${imageCommonClasses} ${
              hoveredSide === "webdev" && animatingToPage === "none"
                ? "opacity-100"
                : "opacity-0"
            }`}
            priority
          />
          <Image
            src={uiuxImage}
            alt="SE"
            width={400}
            height={600}
            className={`${imageCommonClasses} ${
              hoveredSide === "uiux" && animatingToPage === "none"
                ? "opacity-100"
                : "opacity-0"
            }`}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;