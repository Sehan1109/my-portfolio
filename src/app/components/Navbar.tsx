"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// Define the navigation links
const navLinks = [
  { title: "Home", href: "#hero" },
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const [hidden, setHidden] = useState(false);

  const pathname = usePathname(); // 👈 2. Get the current URL path
  // 👈 3. Determine the mode. 'uiux' is dark, 'web' is light.
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  const { scrollY } = useScroll();

  // This hook detects scroll direction to hide/show the navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0; // Fallback to 0
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Variants for showing/hiding the navbar
  const navVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  // ... (mobileMenuVariants remains the same) ...

  return (
    <motion.nav
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      // 👈 4. Conditionally set background and border
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${mode === "uiux"
        ? "bg-slate-800 border-white/20" // Dark mode for UI/UX
        : "bg-gray-300 border-border" // Light mode for Web Dev (your original)
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 md:px-12">
        {/* Logo / Brand Name */}
        <Link
          href="#hero"
          // 👈 5. Conditionally set logo text color
          className={`text-2xl font-bold transition-colors hover:text-accent ${mode === "uiux" ? "text-white" : "text-black"
            }`}
          onClick={() => setActiveLink("#hero")}
        >
          Sehan Mindula
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation (No change needed, dark pill looks good on both) */}
        <div className="hidden md:flex items-center justify-center rounded-full bg-gray-700 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30 px-6 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`relative mx-3 text-sm font-medium transition-colors duration-300
                ${activeLink === link.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              {link.title}
              {/* Animated underline */}
              {activeLink === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent"
                  layoutId="active-underline" // This makes it slide
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 shadow-lg transition-all
              ${mode === "uiux"
                ? "bg-black/40 border-white/20 text-white hover:bg-white/10"
                : "bg-blue-100 border-gray-300 text-black hover:bg-gray-200"
              }`}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium  text-sm">Menu</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs"
            >
              ▼
            </motion.span>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`absolute right-0 mt-3 w-40 rounded-xl shadow-lg border backdrop-blur-md overflow-hidden
          ${mode === "uiux"
                    ? "bg-black/80 border-white/10"
                    : "bg-white/90 border-gray-200"
                  }`}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsOpen(false);
                    }}
                    className={`block px-5 py-3 text-sm font-medium transition-colors
                      ${mode === "uiux"
                        ? activeLink === link.href
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:bg-white/10"
                        : activeLink === link.href
                          ? "text-black bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}