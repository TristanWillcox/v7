/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
        graffiti: ['Urban Jungle', 'cursive'], // Example for street art style
        techno: ['Orbitron', 'sans-serif'],  // Example for cyberpunk style
        classic: ['Times New Roman', 'serif'], // Example for traditional styles
      },
    },
  },
  plugins: [],
}
