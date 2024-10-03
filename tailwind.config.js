/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        karla: ["karla", "sans-serif"],
      },
      colors: {
        tomato: "#E63946",
        night: "#212529",
        gray: "#D9D9D9",
        black: "#212529",
        cream: "#E3D5CA",
        lightOrange: "#E07A5F",
        darkBlue: "#0B2545",
        lightGray: "#ECEAEA",
      },
      backgroundImage: {
        cinema: "url('./src/assets/Cinema.png')",
      },
      boxShadow: {
        overlay: "inset 0 0 0 1000px rgba(0,0,0,0.78)",
      },
      backgroundPosition: {
        "m-center": "65%",
      },
      spacing:{
        330:"330px",
        550:"550px"
      }
    },
  },
  plugins: [],
};
