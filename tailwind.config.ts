import type { Config } from "tailwindcss"
import theme from "./src/assets/theme"

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      fontSize: theme.fontSize,
      fontFamily: theme.fontFamily,
      borderRadius: theme.borderRadius,
      backgroundImage: {
        "custom-gradient": "linear-gradient(114deg, #020024 4.57%, #010104 92.76%)",
      },
    },
  },
  plugins: [],
} satisfies Config
