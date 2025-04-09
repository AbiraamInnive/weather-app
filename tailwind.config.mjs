/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class", // <--- THIS IS IMPORTANT!
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/app/components/**/*.{ts,tsx}",

        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;