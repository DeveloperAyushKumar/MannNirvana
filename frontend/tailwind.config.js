/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#FFCE1A',
        'secondary':'0D0842',
        'blackBG':'#F3F3F3',
        'Favorite': '#FF5841',
        'customGray':'#ffddba',
        'customBgBtn':'#d9ae8e'
      },
      fontFamily: {
        'primary': ["Montserrat", "serif"],
        "secondary ": ["Nunito Sans", "serif"]
      }
    },
  },
  plugins: [],
}

