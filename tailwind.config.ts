/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        lg: '41rem', // Add your custom max-width value
      },
      spacing: {
        '56': '13.7rem',
    },
      colors: {
        primary: "#1E3A8A", // Deep Blue
        secondary: "#DC2626", // Red
        accent: "#0F172A", // Black
        background: "#FFFFFF", // White
        foreground: "#1F2937", // Dark Gray for text
        lightBlue: "#3B82F6", // Light Blue
      },
    },
  },
  plugins: [],
};
