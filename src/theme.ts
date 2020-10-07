import theme from "@chakra-ui/theme";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Fira Mono:500", "monospace"],
  },
});

export const Theme = {
  ...theme,
  fonts: {
    mono: "Fira Mono, monospace",
    heading: "Fira Mono, monospace",
    body: "Fira Mono, monospace",
  },
  colors: {
    ...theme.colors,
    green: {
      100: "#16A085" 
    },
    grey: {
      100: "#eeeeee"
    }
  }
};
