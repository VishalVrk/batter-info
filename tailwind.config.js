 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        marker: ['Permanent Marker', 'cursive'],
        caveat: ['Caveat', 'cursive'],
      }
    },
  },
  plugins: [],
}