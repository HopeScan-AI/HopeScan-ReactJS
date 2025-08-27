/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {

      
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  // screens: {
  //   sm: '640px',
  //   md: '768px',
  //   lg: '1024px',
  //   xl: '1280px',
  // },
}

