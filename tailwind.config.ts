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
        primary: "#F2D6DC",
        cream: "#F5EDE6",
        brandYellow: "#E6C78C",
        ink: "#1A0A10",
      },
    },
  },
  plugins: [],
} satisfies Config;
