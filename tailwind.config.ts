import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7CCFF2",
        cream: "#F7F3EA",
        brandYellow: "#FFF917",
        ink: "#0E006D",
      },
    },
  },
  plugins: [],
} satisfies Config;
