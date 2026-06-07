import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      // Custom utilities for text-shadow if needed
      // (Tailwind supports arbitrary values like [text-shadow:0_1px_2px_rgba(0,0,0,0.15)])
    },
  },
  plugins: [],
} satisfies Config;
