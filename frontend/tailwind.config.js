/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue-500
          hover: '#2563EB', // Blue-600
        },
        success: '#10B981', // Emerald-500
        warning: '#F59E0B', // Amber-500
        danger: '#EF4444', // Red-500
        dark: '#1F2937', // Gray-800
      }
    },
  },
  plugins: [],
}
