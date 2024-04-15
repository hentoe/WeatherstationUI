/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ice: '#EBF0F2',
        steel: '#869DA6',
        ocean: '#2F6073',
        denim: '#376B8C',
        midnight: '#152F40'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
}
