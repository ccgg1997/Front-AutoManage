/** @type {import('tailwindcss').Config} */
import plugin from "tw-elements/dist/plugin.cjs"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  "darkMode": "class",
  plugins: [plugin]
}