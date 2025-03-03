// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      screens: {
        'xs': {'min': '321px', 'max': '640px'}
      },
      extend: {
        screens: {
          'xs': '380px',
        }
      },
    },
    plugins: [require("@material-tailwind/react/plugin")],
  };  