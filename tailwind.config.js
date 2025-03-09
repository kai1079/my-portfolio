// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        "primary-foreground": "hsl(var(--primary-foreground))",
        primary: "hsl(var(--primary))",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"]
      },
      willChange: {
        transform: "transform",
        opacity: "opacity",
        scroll: "scroll-position",
      },
    },
  },
  plugins: [],
});
