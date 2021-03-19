import { extendTheme } from "@chakra-ui/react";
import { lighten, darken } from "polished";
import { defaultTheme } from "./theme-defaults";

export const getRandomTheme = async (images) => {
  const theme = {
    primary500: `#${((Math.random() * 0xffffff) << 0)
      .toString(16)
      .padStart(6, "0")}`,
    secondary500: `#${((Math.random() * 0xffffff) << 0)
      .toString(16)
      .padStart(6, "0")}`,
    bg500: `#${((Math.random() * 0xffffff) << 0)
      .toString(16)
      .padStart(6, "0")}`,
  };

  if (images) {
    const request = new Request("https://source.unsplash.com/random/200x200");
    const brandImg = await fetch(request);

    const requestBg = new Request("https://source.unsplash.com/random/800x800");
    const bgImg = await fetch(requestBg);

    theme.brandImg = brandImg.url;
    theme.bgImg = bgImg.url;
  }

  return theme;
};

export const setTheme = (nftTheme) => {
  const themeOverrides = { ...defaultTheme, ...nftTheme };

  return extendTheme({
    colors: {
      secondaryAlpha: themeOverrides.secondaryAlpha,
      primaryAlpha: themeOverrides.primaryAlpha,
      primary: {
        50: lighten(0.4, themeOverrides.primary500),
        100: lighten(0.3, themeOverrides.primary500),
        200: lighten(0.2, themeOverrides.primary500),
        300: lighten(0.1, themeOverrides.primary500),
        400: lighten(0.05, themeOverrides.primary500),
        500: themeOverrides.primary500,
        600: darken(0.05, themeOverrides.primary500),
        700: darken(0.1, themeOverrides.primary500),
        800: darken(0.15, themeOverrides.primary500),
        900: darken(0.2, themeOverrides.primary500),
      },
      background: {
        50: lighten(0.4, themeOverrides.bg500),
        100: lighten(0.3, themeOverrides.bg500),
        200: lighten(0.2, themeOverrides.bg500),
        300: lighten(0.1, themeOverrides.bg500),
        400: lighten(0.05, themeOverrides.bg500),
        500: themeOverrides.bg500,
        600: darken(0.05, themeOverrides.bg500),
        700: darken(0.1, themeOverrides.bg500),
        800: darken(0.15, themeOverrides.bg500),
        900: darken(0.2, themeOverrides.bg500),
      },
      secondary: {
        50: lighten(0.4, themeOverrides.secondary500),
        100: lighten(0.3, themeOverrides.secondary500),
        200: lighten(0.2, themeOverrides.secondary500),
        300: lighten(0.1, themeOverrides.secondary500),
        400: lighten(0.05, themeOverrides.secondary500),
        500: themeOverrides.secondary500,
        600: darken(0.05, themeOverrides.secondary500),
        700: darken(0.1, themeOverrides.secondary500),
        800: darken(0.15, themeOverrides.secondary500),
        900: darken(0.2, themeOverrides.secondary500),
      },
      black: {
        50: lighten(0.4, themeOverrides.black),
        100: lighten(0.3, themeOverrides.black),
        200: lighten(0.2, themeOverrides.black),
        300: lighten(0.1, themeOverrides.black),
        400: lighten(0.05, themeOverrides.black),
        500: themeOverrides.black,
        600: darken(0.05, themeOverrides.black),
        700: darken(0.1, themeOverrides.black),
        800: darken(0.15, themeOverrides.black),
        900: darken(0.2, themeOverrides.black),
      },
    },
    bgSize: themeOverrides.bgSize,
    images: {
      brandImg: themeOverrides.brandImg,
      bgImg: themeOverrides.bgImg,
    },
    fonts: {
      heading: themeOverrides.primaryFont,
      body: themeOverrides.bodyFont,
      mono: themeOverrides.monoFont,
      hub: "Mirza",
      accessory: "Roboto Mono",
      space: "Space Mono",
    },
    daoMeta: {},
    styles: {
      bgOverlayOpacity: themeOverrides.bgOverlayOpacity,
      global: {
        "html, body": {
          fontSize: "md",
          color: "blackAlpha.900",
          lineHeight: "tall",
        },
        body: {
          maxW: `100%`,
          overflow: `auto`,
          overflowX: `hidden`,
          "&.modal-open": {
            overflow: `hidden`,
          },
        },
        a: {
          transition: "all 0.15s linear",
          _hover: { textDecoration: "none", color: "secondary.500" },
        },
        li: {
          fontSize: { base: `12px`, md: `14px`, lg: `1vw` },
        },
        p: {
          fontSize: { base: `12px`, md: `14px`, lg: `1vw` },
        },

      },
    },
    breakpoints: {
      ...themeOverrides.breakpoints,
    },
  });
};
