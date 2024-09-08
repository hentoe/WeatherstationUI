/** @type {import('tailwindcss').Config} */
export default {
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
  plugins: [import('@tailwindcss/forms'), import('@tailwindcss/aspect-ratio')]
}
