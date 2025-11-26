/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          800: '#2a2a2a',
        },
        purple: {
          600: '#6B5F8F', // Less intense purple for dark mode hover
        },
        orange: {
          600: '#9B6F50', // Less intense orange for dark mode hover
        },
      },
    },
  },
  plugins: [],
}