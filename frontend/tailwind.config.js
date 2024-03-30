const colors = require("tailwindcss/colors");
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#18181b",
      btn_white: "#eeeeef",
      login_ask_text_black: "#242424",
      form_label_text_black: "#333333",
      background_gray: "#f3f4f6",

      white: "#ffffff",
      border_gray: "#fdfdfd",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.stone,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.slate,
      sec_text_gray: "#828893",
      payment_green: "#22c55d",
    },
    extend: {},
  },
  plugins: [],
};
