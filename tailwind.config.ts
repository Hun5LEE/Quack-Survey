import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "n-light-gray": "#F3F0F0",
        "n-gray": "#BEBEBE",
        "n-dark-gray": "#7f7f7f",
        "n-light-black": "#404040",
        "n-black": "#212121",
        "n-light-blue": "#a7b8ff",
        "n-blue": "#788ef5",
        "n-purple": "#8564fb",
        "n-red": "#E74C3C",
        "n-green": "#2ECC71",
        "n-white": "#FFFFFF",
      },
      fontSize: {
        "n-xs": ["0.75rem", { lineHeight: "1rem" }], //12px
        "n-sm": ["0.875rem", { lineHeight: "1.25rem" }], //14px
        "n-md": ["1rem", { lineHeight: "1.5rem" }], //16px
        "n-lg": ["1.125rem", { lineHeight: "1.75rem" }], //18px
        "n-xl": ["1.5rem", { lineHeight: "2rem" }], //24px
        "n-2xl": ["1.875rem", { lineHeight: "2.25rem" }], //30px
      },
      boxShadow: {
        "n-md": "0px 2px 5px 0px rgb(158, 158, 158)",
      },
      spacing: {
        "n-xs": "0.25rem", //4px
        "n-sm": "0.5rem", //8px
        "n-md": "1rem", //16px
        "n-lg": "1.5rem", //24px
        "n-xl": "2rem", //32px
        "n-2xl": "2.5rem", //40px
      },
      borderRadius: {
        "n-sm": "5px",
        "n-md": "10px",
        "n-full": "100%",
      },
    },
  },
  plugins: [],
};
export default config;
