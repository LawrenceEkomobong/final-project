/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Playfair Display', 'Georgia', 'serif'],
      signature: ['Great Vibes', 'cursive'],
    },
    extend: {
      colors: {
        brand: {
          red: '#D10000',
          redHover: '#B00000',
          black: '#121212',
          charcoal: '#1C1C1C',
          cream: '#F9F8F6',
          white: '#FFFFFF',
          gray: '#6B6B6B',
          border: '#2A2A2A',
        },
      },
      borderRadius: {
        md: '0.375rem',
      },
    },
  },
  plugins: [],
}
