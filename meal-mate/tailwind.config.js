/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5e32b5",
          "secondary": "#41d897",
          "accent": "#d11421",
          "neutral": "#311d35",
          "base-100": "#fafafa",
          "info": "#a9cce5",
          "success": "#1dd7c5",
          "warning": "#f8a949",
          "error": "#fb465b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

