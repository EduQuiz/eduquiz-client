import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00253A",
        secondary: "#1d232a",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
