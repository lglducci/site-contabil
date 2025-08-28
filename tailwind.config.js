/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}','./components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { primary:'#0EA5E9', dark:'#111827', accent:'#F59E0B', bg:'#F9FAFB' },
      borderRadius: { '2xl':'1rem' }
    },
  },
  plugins: [],
}
