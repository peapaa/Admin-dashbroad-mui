export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#f1f5f9",
      },
      boxShadow: {
        shadowCategory: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        shadowInput: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
    },
  },
  plugins: [],
};
