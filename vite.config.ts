
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import withMT from '@material-tailwind/react/utils/withMT';


// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(), 
//     tailwindcss()
//   ],
// })
 
// module.exports = withMT(defineConfig); 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: { max: '425px' }
    },
    extend: {},
  },
  plugins: [react(), tailwindcss()],
});