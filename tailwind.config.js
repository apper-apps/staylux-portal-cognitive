/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a5f',
        secondary: '#c9a961',
        accent: '#e85d75',
        surface: '#ffffff',
        background: '#f8f9fa',
        success: '#2d6e3e',
        warning: '#d97706',
        error: '#dc2626',
        info: '#3b82c4'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}