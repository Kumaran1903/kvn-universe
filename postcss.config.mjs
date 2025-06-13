const config = {
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      spacing: {
        big: "39rem",
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
