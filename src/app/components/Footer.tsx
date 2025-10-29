"use client"; // 👈 1. Required for the hook

import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation"; // 👈 2. Import usePathname

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 👈 3. Get the current mode
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  return (
    // 👈 4. Conditional background and border color
    <footer
      className={`w-full ${
        mode === "uiux"
          ? "border-t border-gray-700 bg-slate-800"
          : "border-t border-border bg-gray-300"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-8 md:flex-row md:px-12">
        <p
          className={`text-sm ${
            mode === "uiux" ? "text-gray-400" : "text-secondary"
          }`}
        >
          © {currentYear} Sehan Mindula. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://github.com/Sehan1109"
            target="_blank"
            rel="noopener noreferrer"
            // 👈 6. Conditional icon and hover color
            className={`transition-colors ${
              mode === "uiux"
                ? "text-gray-400 hover:text-uiux-accent"
                : "text-secondary hover:text-accent"
            }`}
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/sehan-mindula-b944b2304"
            target="_blank"
            rel="noopener noreferrer"
            // 👈 6. Conditional icon and hover color
            className={`transition-colors ${
              mode === "uiux"
                ? "text-gray-400 hover:text-uiux-accent"
                : "text-secondary hover:text-accent"
            }`}
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://facebook.com/sehanmindula"
            target="_blank"
            rel="noopener noreferrer"
            // 👈 6. Conditional icon and hover color
            className={`transition-colors ${
              mode === "uiux"
                ? "text-gray-400 hover:text-uiux-accent"
                : "text-secondary hover:text-accent"
            }`}
            aria-label="Facebook Profile" // 👈 7. Fixed typo (was Twitter)
          >
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}