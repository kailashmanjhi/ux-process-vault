import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        mist: "#F5F7FA",
        steel: "#1E293B",
        accent: "#0EA5A3"
      }
    }
  },
  plugins: []
};

export default config;
