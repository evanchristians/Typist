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
      100: "#16A085",
    },
    blue: {
      100: "#0070f3",
    },
    grey: {
      100: "#eeeeee",
    },
    red: {
      10: "#FF474733",
      100: "#FF4747",
    },
  },
};
