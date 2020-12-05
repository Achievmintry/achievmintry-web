import { rgba } from "polished";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  base: "0px",
  xs: "360px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
  xl: "1440px",
  xxl: "1920px",
});

export const defaultTheme = {
  breakpoints,
  primary500: "#fff0be",
  primaryAlpha: rgba("#fff0be", 0.9),
  secondary500: "#ffcc00",
  secondaryAlpha: rgba("#ffcc00", 0.75),
  bg500: "#fff0be",
  bgSize: "cover",
  black: "#111",
  bgOverlayOpacity: "0.5",
  primaryFont: "Arvo, serif",
  bodyFont: "Ubuntu, sans-serif",
  monoFont: "Space Mono",
  brandImg: null,
  bgImg: null,
};
