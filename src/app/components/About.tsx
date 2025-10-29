'use client';

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaFigma,
  FaGithub,
  FaDocker,
  FaAndroid,
  FaCloud,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiAdobephotoshop,  
  SiAdobeillustrator,
} from "react-icons/si";

// ----------------------------------------------------------------------
// 1. ANIMATION VARIANTS
// ----------------------------------------------------------------------

const sectionAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconSpokeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({ // 'i' is the custom index
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: i * 0.1
    }
  }),
};


// ----------------------------------------------------------------------
// 2. DYNAMIC DATA
// ----------------------------------------------------------------------

const webTechIcons = [
  { icon: <FaReact size={40} />, name: "React" },
  { icon: <SiNextdotjs size={40} />, name: "Next.js" },
  { icon: <SiTypescript size={40} />, name: "TypeScript" },
  { icon: <FaJsSquare size={40} />, name: "JavaScript" },
  { icon: <FaNodeJs size={40} />, name: "Node.js" },
  { icon: <SiExpress size={40} />, name: "Express" },
  { icon: <SiMongodb size={40} />, name: "MongoDB" },
  { icon: <SiTailwindcss size={40} />, name: "Tailwind CSS" },
  { icon: <FaHtml5 size={40} />, name: "HTML5" },
  { icon: <FaCss3Alt size={40} />, name: "CSS3" },
  { icon: <FaGitAlt size={40} />, name: "Git" },
  { icon: <FaGithub size={40} />, name: "Github"},
  { icon: <FaDocker size={40} />, name: "Docker"},
  { icon: <FaAndroid size={40} />, name: "Android"},
  { icon: <FaCloud size={40} />, name: "Cloud"}
];

const uiuxTechIcons = [
  { icon: <FaFigma size={40} />, name: "Figma" },
  { icon: <SiAdobephotoshop size={40} />, name: "Photoshop" },
  { icon: <SiAdobeillustrator size={40} />, name: "Illustrator" },
  { icon: <SiTailwindcss size={40} />, name: "Tailwind CSS" },
  { icon: <FaHtml5 size={40} />, name: "HTML5" },
  { icon: <FaCss3Alt size={40} />, name: "CSS3" },
  { icon: <FaReact size={40} />, name: "React" },
  { icon: <SiNextdotjs size={40} />, name: "Next.js" },
  { icon: <FaJsSquare size={40} />, name: "JavaScript" },
  { icon: <FaAndroid size={40} />, name: "Android" },
  { icon: <FaGithub size={40} />, name: "Github" },
];

const techColors: { [key: string]: string } = {
  "React": "text-sky-400",
  "Next.js": "text-white", 
  "TypeScript": "text-blue-500",
  "JavaScript": "text-yellow-400",
  "Node.js": "text-green-600",
  "Express": "text-gray-300",
  "MongoDB": "text-green-500",
  "Tailwind CSS": "text-cyan-400",
  "HTML5": "text-orange-600",
  "CSS3": "text-blue-600",
  "Git": "text-orange-500",
  "Figma": "text-fuchsia-500",
  "Github": "text-white", 
  "Docker": "text-blue-400",
  "Android": "text-green-400",
  "Cloud": "text-blue-300",
  "Photoshop": "text-sky-500",
  "Illustrator": "text-orange-400",
};

const descriptions = {
  web: {
    p1: "Hi, I'm Sehan Mindula. A Full-Stack Developer and third year student at the University of Colombo, studying Bachelor of Information and Communication Technology Honours.",
    p2: "I am passionate about building efficient, scalable, and responsive web applications. I specialize in JavaScript,TypeScript and React/Node.js, and I thrive on turning complex problems into clean, functional code.",
  },
  uiux: {
    p1: "Hi, I'm Sehan Mindula. A UI/UX designer and third year student at the University of Colombo, specializing in Bachelor of Information and Communication Technology Honours.",
    p2: "I'm passionate about creating clean, user-centered designs that solve real problems. I thrive on turning complex ideas into intuitive and enjoyable digital experiences.",
  }
}

// ----------------------------------------------------------------------
// 3. COMPONENT LOGIC
// ----------------------------------------------------------------------

// 👇 *FIX IS HERE*: This function body is now restored.
function getSphericalPosition(index: number, total: number) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5)); // golden angle

  const y = ((index * offset) - 1) + offset / 2; // center around 0
  const r = Math.sqrt(1 - y * y); // radius at this latitude
  const phi = index * increment;

  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;

  // Convert to degrees for rotationX and rotationY
  const angleX = Math.asin(y) * (180 / Math.PI);
  const angleY = Math.atan2(z, x) * (180 / Math.PI);

  return { angleX, angleY };
}


export default function About() {
  const pathname = usePathname();
  const mode = pathname.startsWith("/UiuxPage") ? "uiux" : "web";

  const techIcons = mode === 'uiux' ? uiuxTechIcons : webTechIcons;
  const content = descriptions[mode];
  
  const radiusInPx = 180;
  const perspectiveInPx = 1100;

  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  const smoothRotateY = useSpring(rotateY, { stiffness: 50, damping: 10 });
  const smoothRotateZ = useSpring(rotateZ, { stiffness: 50, damping: 10 });

  const yControlRef = useRef<any>(null);
  const zControlRef = useRef<any>(null);

  useEffect(() => {
    const BASE_ORBIT_DURATION = 10;

    const animateRotation = () => {
      const targetY = rotateY.get() + 360;
      const targetZ = rotateZ.get() + 360;

      if (yControlRef.current) yControlRef.current.stop();
      if (zControlRef.current) zControlRef.current.stop();

      yControlRef.current = animate(rotateY, targetY, {
        ease: "linear",
        duration: BASE_ORBIT_DURATION,
        onComplete: animateRotation, // keep spinning
      });

      zControlRef.current = animate(rotateZ, targetZ, {
        ease: "linear",
        duration: BASE_ORBIT_DURATION,
      });
    };

    animateRotation();

    return () => {
      if (yControlRef.current) yControlRef.current.stop();
      if (zControlRef.current) zControlRef.current.stop();
    };
  }, [rotateY, rotateZ]);
  
  return (
    <motion.section
      id="about"
      className="w-full py-16 md:py-24"
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className={`section-title text-center ${
        mode === 'uiux' ? 'text-white after:bg-uiux-accent' : 'text-black after:bg-accent'
      }`}>About Me</h2>

      <div className="mt-12 flex flex-col md:flex-row items-center md:items-center gap-12">

        {/* Left Side: Tech Icon Orbit (Sphere) */}
        <div
          className="w-full md:w-1f2 lg:w-1/3 flex items-center justify-center min-h-[350px] p-8 relative"
          style={{ perspective: `${perspectiveInPx}px` }}
        >
          <motion.div
            className="relative w-72 h-72"
            style={{
              transformStyle: "preserve-3d",
              rotateY: smoothRotateY,
              rotateZ: smoothRotateZ,
            }}
          >
            {techIcons.map((tech, index) => {
              // This line will now work correctly
              const { angleX, angleY } = getSphericalPosition(index, techIcons.length);
              const colorClass = techColors[tech.name] || (mode === 'uiux' ? 'text-white' : 'text-black');

              return (
                <motion.div
                  key={tech.name + index}
                  className="absolute top-0 left-0 w-full h-full"
                  variants={iconSpokeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index}
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: `${angleX}deg`,
                    rotateY: `${angleY}deg`,
                  }}
                >
                  <motion.div
                    className="absolute w-full h-full flex justify-center items-center"
                    style={{ transformStyle: "preserve-3d", translateZ: `${radiusInPx}px` }}
                    title={tech.name}
                  >
                    <span className={`hover:scale-110 ${colorClass}`}>
                      {tech.icon}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          <div className={`absolute -top-100 -left-100 -z-10 h-64 w-32 rounded-full ${
             mode === 'uiux' ? 'bg-uiux-accent/30' : 'bg-accent/30'
          } blur-2xl md:h-48 md:w-48`}></div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full text-center md:w-1/2 lg:w-2/3 md:text-left flex flex-col justify-center">
          <p className={`mb-4 text-lg ${mode === 'uiux' ? 'text-gray-300' : 'text-gray-700'}`}>
            {content.p1}
          </p>
          <p className={`mb-4 text-lg ${mode === 'uiux' ? 'text-gray-300' : 'text-gray-700'}`}>
            {content.p2}
          </p>
          <p className={`text-lg ${mode === 'uiux' ? 'text-gray-300' : 'text-gray-700'}`}>
            {content.p3}
          </p>
        </div>
      </div>
    </motion.section>
  )
}