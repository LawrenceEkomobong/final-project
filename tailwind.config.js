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
          DEFAULT: "#D10000",
          hover: "#B00000",
          light: "#FFE5E5",
        },
        dark: {
          DEFAULT: "#121212",
          card: "#1E1E1E",
          border: "#2A2A2A",
          muted: "#888888",
        },
        cream: {
          DEFAULT: "#F9F8F6",
          dark: "#EFECE6",
          card: "#FFFFFF",
          border: "#E2DEC9",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          muted: "#4A4A4A",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '0px',
      },
    },
  },
  plugins: [],
}
