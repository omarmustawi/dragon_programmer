/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "20%": "20%",
        "5%": "5%",
        "50%": "50%",
      },
      colors: {
        grayColor: "#f7f7f7",
        backFooter: "#212a39",
        textFooter: "#736653",
        dash1: "#dedded",
        dashbtnHover: '#23527c',
        dashbtn: '#337ab7',
      },
      borderWidth: {
        ten: "14px",
      },
      minHeight: {
        minHeight: "calc(100vh - 90px)",
      },
      // height: {
      // }
    },
  },
  plugins: [],
};
