import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        dark: "#000023",
      },
      screens: {
        sm: { max: "400px" },
        // => @media (max-width: 767px) { ... }

        md: { min: "401px", max: "767px" },
        // => @media (max-width: 767px) { ... }

        lg: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        xl: { min: "1024px" },
        // => @media (min-width: 1024px) { ... }
      },
    },
  },
  plugins: [],
};

export default config;
