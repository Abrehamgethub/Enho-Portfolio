/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Full brand palette
        brand: {
          teal: '#1abc9c',      // Bright teal
          slate: '#2c3e50',     // Dark slate
          light: '#ecf0f1',     // Light gray
          dark: '#16595f',      // Dark teal
          muted: '#6b8a8e',     // Muted teal
          beige: '#ddcfa8',     // Beige/gold
          sky: '#a8c4c4',       // Light blue-gray
          ocean: '#2c8b8b',     // Medium teal
        },
        primary: {
          50: '#e6f7f4',
          100: '#b3e8de',
          200: '#80d9c8',
          300: '#4dcab2',
          400: '#26bfa2',
          500: '#1abc9c', // Bright teal
          600: '#16a085',
          700: '#12846e',
          800: '#0e6857',
          900: '#0a4c40',
        },
        secondary: {
          50: '#faf8f3',
          100: '#f5f0e4',
          200: '#efe7d4',
          300: '#e9dec4',
          400: '#e3d5b6',
          500: '#ddcfa8', // Beige
          600: '#c9b88f',
          700: '#b5a176',
          800: '#8a7a5a',
          900: '#5f543e',
        },
        'brand-slate': {
          DEFAULT: '#2c3e50',
          light: '#34495e',
          dark: '#1a252f',
        },
        accent: {
          teal: '#16595f',
          muted: '#6b8a8e',
          sky: '#a8c4c4',
          ocean: '#2c8b8b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
