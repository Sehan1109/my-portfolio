"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { usePathname } from "next/navigation";

const sectionAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await axios.post("/api/contact", formData);
      setStatus(res.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message. Try again later.");
    }
  };

  // --- Tailwind 3D Background Classes ---
  // We define these here to keep the JSX cleaner.
  // Note: Tailwind needs underscores for spaces in arbitrary values.

  return (
    <motion.section
      id="contact"
      className="relative w-full overflow-hidden py-16 md:py-24 [perspective:1000px]" // Added 3D perspective
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* 3D background elements */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none`}
      ></div>

      <div className="relative z-10 mx-auto max-w-2xl text-center"> {/* Added relative z-10 */}
        <h2
          className={`section-title relative z-10 mx-auto inline-block ${ // Added relative z-10
            mode === "uiux"
              ? "text-white after:bg-uiux-accent"
              : "text-black after:bg-accent"
          }`}
        >
          Get In Touch
        </h2>
        <p
          className={`relative z-10 mt-4 text-lg ${ // Added relative z-10
            mode === "uiux" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`
          relative z-10 mx-auto mt-12 max-w-lg space-y-6 rounded-lg border border-white/10 p-6
          preserve-3d
          [box-shadow:0_20px_40px_rgba(0,0,0,0.2),_0_0_100px_rgba(0,0,0,0.1)_inset]
          [transform:rotateX(5deg)_rotateY(-5deg)_translateZ(20px)]
          transition-transform duration-300 ease-in-out
          hover:[transform:rotateX(2deg)_rotateY(-2deg)_translateZ(30px)]
        `} // --- 3D form container classes ---
      >
        <div>
          <label
            htmlFor="name"
            className={`mb-2 block text-sm font-medium ${
              mode === "uiux" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={`block w-full rounded-md p-3 shadow-sm placeholder-gray-500 bg-slate-400 ${
              mode === "uiux"
                ? "border-gray-700 bg-gray-900 text-white focus:border-uiux-accent focus:ring-uiux-accent"
                : "border-border bg-gray-300 text-primary focus:border-accent focus:ring-accent"
            }`}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className={`mb-2 block text-sm font-medium ${
              mode === "uiux" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`block w-full rounded-md p-3 shadow-sm placeholder-gray-500 bg-slate-400 ${
              mode === "uiux"
                ? "border-gray-700 bg-gray-900 text-white focus:border-uiux-accent focus:ring-uiux-accent"
                : "border-border bg-gray-300 text-primary focus:border-accent focus:ring-accent"
            }`}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className={`mb-2 block text-sm font-medium ${
              mode === "uiux" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className={`block w-full rounded-md p-3 shadow-sm placeholder-gray-500 bg-slate-400 ${
              mode === "uiux"
                ? "border-gray-700 bg-gray-900 text-white focus:border-uiux-accent focus:ring-uiux-accent"
                : "border-border bg-gray-300 text-primary focus:border-accent focus:ring-accent"
            }`}
            placeholder="Your message here..."
          ></textarea>
        </div>

        <div className="text-center">
          <motion.button
            type="submit"
            className={`inline-flex items-center gap-2 rounded-md px-8 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 bg-accent hover:bg-accent-hover`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status.includes("Submitting")}
          >
            <FaPaperPlane />
            {status.includes("Submitting") ? "Sending..." : "Send Message"}
          </motion.button>
        </div>

        {status && (
          <p
            className={`mt-4 text-center text-sm ${
              status.includes("Failed") ? "text-red-400" : "text-green-400"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </motion.section>
  );
}