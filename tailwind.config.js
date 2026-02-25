/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: { suri: '#0061FC' },
        violet: { suri: '#A37EF7' },
        pink: { suri: '#F58CF5' },
      },
      fontFamily: {
        sans: ['"Rethink Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-suri': 'linear-gradient(135deg, #0061FC 0%, #A37EF7 50%, #F58CF5 100%)',
        'gradient-suri-soft': 'linear-gradient(135deg, #0061FC18 0%, #A37EF718 50%, #F58CF518 100%)',
      },
    },
  },
  plugins: [],
}
