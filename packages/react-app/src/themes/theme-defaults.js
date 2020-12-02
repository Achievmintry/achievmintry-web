import { rgba } from "polished";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  "2xl": "1920px",
});

export const defaultTheme = {
  breakpoints,
  colors: {
    brandPurple: {
      900: "#6e1fb1",
    },
    brandPink: {
      900: "#cc3385",
    },
    brandYellow: {
      900: "#ffcc00",
      200: "#fff0be",
    },
  },
  primary500: "#fff0be",
  primaryAlpha: rgba("#fff0be", 0.9),
  secondary500: "#ffcc00",
  secondaryAlpha: rgba("#ffcc00", 0.75),
  bg500: "#03061B",
  bgOverlayOpacity: "0.75",
  primaryFont: "Arvo, serif",
  bodyFont: "Ubuntu, sans-serif",
  monoFont: "Space Mono",
  brandImg: null,
  bgImg: null,
};
