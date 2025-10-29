'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { usePathname } from "next/navigation";

export default function Hero() {
    const pathname = usePathname();
    const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

    const typewriterStrings = {
        web: [
            `Hi, I'm <span class='text-accent'>Sehan Mindula</span>`,
            `I'm a Web Developer.`,
        ],
        uiux: [
            `Hi, I'm <span class='text-accent'>Sehan Mindula</span>`,
            `I'm a UI/UX Designer.`,
        ],
    };

    const descriptions = {
        web: "I'm a passionate Web Developer specializing in building modern, responsive, and performant web applications with React, Next.js, and TypeScript.",
        uiux: "I'm a creative UI/UX Designer focused on crafting intuitive, engaging, and user-centered digital experiences with Figma and modern design principles.",
    };

    const imageDetails = {
        web: {
            src: "/profile1.png",
            alt: "Sehan Mindula - Web Developer",
            width: 600, 
            height: 600,
            sizingDivClassName: "w-[300px] md:w-[400px] lg:w-[320px] rounded-3xl shadow-[20px_20px_50px_rgba(0,0,0,0.1),-20px_-20px_50px_rgba(255,255,255,0.2)]"
        },
        uiux: {
            src: "/white-pro.png",
            alt: "Sehan Mindula - UI/UX Designer",
            width: 600,
            height: 600, 
            sizingDivClassName: "w-[300px] md:w-[400px] lg:w-[320px] rounded-3xl shadow-[20px_20px_50px_rgba(0,0,0,0.4),-20px_-20px_50px_rgba(255,255,255,0.1)]"
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.section
            id="hero"
            className={`flex min-h-screen w-full flex-col items-center justify-center pt-20 md:flex-row md:justify-between md:pt-0 ${
                mode === 'uiux' ? 'bg-slate-800' : 'bg-gray-300'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* --- Text Content --- */}
            <motion.div
                className="mb-8 max-w-2xl text-center md:mb-0 md:text-left"
                variants={itemVariants}
            >
                <h1 className={`mb-4 text-4xl font-black sm:text-5xl md:text-6xl whitespace-nowrap ${mode === 'uiux' ? 'text-white' : 'text-black'}`}>
                    {/* --- THIS IS THE FIX --- */}
                    <Typewriter
                        onInit={(typewriter) => {
                            const stringsToShow = mode === 'uiux' ? typewriterStrings.uiux : typewriterStrings.web;
                            
                            typewriter
                                .typeString(stringsToShow[0])
                                .pauseFor(2000) // Pause after the first string
                                .deleteAll()
                                .typeString(stringsToShow[1])
                                .pauseFor(2000) // Pause after the second string
                                .deleteAll()
                                .start();
                        }}
                        options={{
                            // 'strings' and 'pauseFor' are removed from here
                            autoStart: true,
                            loop: true,
                            delay: 75,
                            deleteSpeed: 50,
                        }}
                    />
                    {/* --- END OF FIX --- */}
                </h1>
                <p className={`mb-8 text-lg md:text-lg ${mode === 'uiux' ? 'text-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]' : 'text-gray-700'}`}>
                    {mode === 'uiux' ? descriptions.uiux : descriptions.web}
                </p>
                <div className="flex justify-center gap-4 md:justify-start">
                    <motion.a
                        href="#projects"
                        className="rounded-xl px-6 py-3 font-semibold text-white transition-transform bg-accent shadow-[10px_10px_20px_rgba(0,0,0,0.2),-10px_-10px_20px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.3)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Projects
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="rounded-xl border-2 px-6 py-3 font-semibold transition-transform border-accent text-accent shadow-[10px_10px_20px_rgba(0,0,0,0.2),-10px_-10px_20px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.3)] hover:bg-accent hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get in Touch
                    </motion.a>
                </div>
                <div className="mt-8 flex justify-center gap-6 md:justify-start">
                    <a
                        href="https://github.com/Sehan1109"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${mode === 'uiux' ? 'text-white hover:text-uiux-accent' : 'text-black hover:text-accent'}`}
                        aria-label="Github Profile"
                    >
                        <FaGithub size={36} />
                    </a>
                    <a
                        href="https://linkedin.com/in/sehan-mindula-b944b2304"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${mode === 'uiux' ? 'text-white hover:text-uiux-accent' : 'text-black hover:text-accent'}`}
                        aria-label="LinkedIn Profile"
                    >
                        <FaLinkedin size={36} />
                    </a>
                </div>
            </motion.div>

            {/* --- Image Content with 3D Look --- */}
            <motion.div className="relative" variants={itemVariants}>
                <div className={imageDetails[mode].sizingDivClassName}>
                    <Image
                        src={imageDetails[mode].src}
                        alt={imageDetails[mode].alt}
                        width={imageDetails[mode].width}
                        height={imageDetails[mode].height}
                        quality={100}
                        priority={true}
                        className="h-max w-full object-cover object-center rounded-3xl"
                    />
                </div>

                {/* Floating blur/glow circles for depth */}
                <div className={`absolute -top-6 -right-1 -z-10 h-60 w-32 rounded-full ${mode === 'uiux' ? 'bg-uiux-accent/30' : 'bg-accent/30'} blur-3xl md:h-48 md:w-48`}></div>
                <div className={`absolute -bottom-4 -left-4 -z-10 h-64 w-32 rounded-full ${mode === 'uiux' ? 'bg-uiux-accent/30' : 'bg-accent/30'} blur-3xl md:h-48 md:w-48`}></div>
            </motion.div>
        </motion.section>
    )
}