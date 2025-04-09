const config = {
  plugins: ["@tailwindcss/postcss"],
  darkMode: "class", // <--- THIS IS IMPORTANT!
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/app/components/**/*.{ts,tsx}",

    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
};

export default config;
