const { nextui } = require("@nextui-org/theme");

const colors = {
  primary: "#0070F3",
  secondary: "#7928ca",
  success: "#17c964",
  warning: "#f5a623",
  error: "#f21361",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Zilla Slab', serif",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          theme: {
            colors: {
              background: "#eeeeee",
              foreground: "#000000",
              ...colors,
              selection: "#ffd9ca",
            },
            fonts: { sans: "'Zilla Slab', serif" },
          },
        },
        dark: {
          colors: {
            background: "#222425",
            foreground: "#ffffff",
            ...colors,
            selection: "#ad572e",
          },
          fonts: { sans: "'Zilla Slab', serif" },
        },
      },
    }),
  ],
};
