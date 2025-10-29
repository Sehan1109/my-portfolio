import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Futuristic "men colors" scheme
        'background': '#0D1117', // Very dark blue/black (like GitHub dark)
        'surface': '#161B22',   // Dark gray for cards/surfaces
        'primary': '#C9D1D9',   // Light gray for primary text
        'secondary': '#8B949E', // Medium gray for secondary text
        'accent': '#58A6FF',    // A strong, professional blue
        'accent-hover': '#79C0FF', // Lighter blue for hover
        'border': '#30363D',    // Border color
      },
      fontFamily: {
        // Using a clean, modern sans-serif font
        sans: ['Inter', 'sans-serif'],
      },
      // Animation keyframes for subtle effects
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #58A6FF, 0 0 10px #58A6FF' },
          '100%': { textShadow: '0 0 20px #58A6FF, 0 0 30px #58A6FF' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;