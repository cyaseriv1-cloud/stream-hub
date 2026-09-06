/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        surface: '#181818',
        surfaceLight: '#242424',
        borderSubtle: '#2a2a2a',
        brand: {
          DEFAULT: '#e50914',
          hover: '#f40612',
          glow: 'rgba(229, 9, 20, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
