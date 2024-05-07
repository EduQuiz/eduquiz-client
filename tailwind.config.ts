import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
