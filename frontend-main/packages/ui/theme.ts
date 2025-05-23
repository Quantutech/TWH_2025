import { extendTheme } from "@chakra-ui/react";
import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    bg: "secondary.100.light",
    _checked: {
      bg: "primary.600.light",
    },
  },
  thumb: {
    bg: "white",
  },
});

const customSwitch = definePartsStyle({
  track: {
    bg: "secondary.200.light",
    _checked: {
      bg: "secondary.500.light",
    },
  },
});

export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { customSwitch },
});

const breakpoints = {
  base: "0px", // 0em padding:"32px 16px"
  sm: "480px", // ~38em padding:"32px 16px"
  md: "768px", // ~48em padding:"32px 16px"
  lg: "992px", // ~62em padding:"32px 16px"
  xl: "1280px", // ~80em padding:"64px 16px"
  "2xl": "1536px", // ~96em padding: "64px 0px"
};

export const colors = {
  primary: {
    "50": { light: "#F1F7FD", dark: "#F1F7FD" },
    "100": { light: "#DFEDFA", dark: "#DFEDFA" },
    "200": { light: "#C6E0F7", dark: "#C6E0F7" },
    "300": { light: "#9ECDF2", dark: "#9ECDF2" },
    "400": { light: "#70B1EA", dark: "#70B1EA" },
    "500": { light: "#3F96B4", dark: "#3F96B4" },
    "600": { light: "#3978D7", dark: "#3978D7" },
    "700": { light: "#2E5B70", dark: "#2E5B70" },
    "800": { light: "#2D51A0", dark: "#2D51A0" },
    "900": { light: "#29467F", dark: "#29467F" },
    "950": { light: "#1D2C4E", dark: "#1D2C4E" },
  },
  secondary: {
    "50": { light: "#F1F9FA", dark: "#F1F9FA" },
    "100": { light: "#DBECF2", dark: "#DBECF2" },
    "200": { light: "#BCDAE5", dark: "#BCDAE5" },
    "300": { light: "#8DBFD3", dark: "#8DBFD3" },
    "400": { light: "#589CB8", dark: "#589CB8" },
    "500": { light: "#3C809E", dark: "#3C809E" },
    "600": { light: "#356985", dark: "#356985" },
    "700": { light: "#30576E", dark: "#30576E" },
    "800": { light: "#2E495C", dark: "#2E495C" },
    "900": { light: "#253745", dark: "#253745" },
    "950": { light: "#182734", dark: "#182734" },
  },
  grayScale: {
    "50": { light: "#F4F4F4", dark: "#F4F4F4" },
    "100": { light: "#EFEFEF", dark: "#EFEFEF" },
    "200": { light: "#DCDCDC", dark: "#DCDCDC" },
    "300": { light: "#BDBDBD", dark: "#BDBDBD" },
    "400": { light: "#989898", dark: "#989898" },
    "500": { light: "#7C7C7C", dark: "#7C7C7C" },
    "600": { light: "#656565", dark: "#656565" },
    "700": { light: "#525252", dark: "#525252" },
    "800": { light: "#464646", dark: "#464646" },
    "900": { light: "#3D3D3D", dark: "#3D3D3D" },
    "950": { light: "#292929", dark: "#292929" },
  },
  error: {
    "50": { light: "#FEF3F2", dark: "#FEF3F2" },
    "100": { light: "#FEE4E2", dark: "#FEE4E2" },
    "200": { light: "#FFCDC9", dark: "#FFCDC9" },
    "300": { light: "#FDAAA4", dark: "#FDAAA4" },
    "400": { light: "#F97970", dark: "#F97970" },
    "500": { light: "#F04438", dark: "#F04438" },
    "600": { light: "#DE3024", dark: "#DE3024" },
    "700": { light: "#BB241A", dark: "#BB241A" },
    "800": { light: "#9A221A", dark: "#9A221A" },
    "900": { light: "#80231C", dark: "#80231C" },
    "950": { light: "#460D09", dark: "#460D09" },
  },
  warning: {
    "50": { light: "#FFFBED", dark: "#FFFBED" },
    "100": { light: "#FFF7D4", dark: "#FFF7D4" },
    "200": { light: "#FFEBA8", dark: "#FFEBA8" },
    "300": { light: "#FFDA71", dark: "#FFDA71" },
    "400": { light: "#FFBF38", dark: "#FFBF38" },
    "500": { light: "#FDA712", dark: "#FDA712" },
    "600": { light: "#F79009", dark: "#F79009" },
    "700": { light: "#C56A09", dark: "#C56A09" },
    "800": { light: "#9D530F", dark: "#9D530F" },
    "900": { light: "#7E4510", dark: "#7E4510" },
    "950": { light: "#442106", dark: "#442106" },
  },
  success: {
    "50": { light: "#EDFCF3", dark: "#EDFCF3" },
    "100": { light: "#D3F8E0", dark: "#D3F8E0" },
    "200": { light: "#AAF0C7", dark: "#AAF0C7" },
    "300": { light: "#73E2A7", dark: "#73E2A7" },
    "400": { light: "#3BCC84", dark: "#3BCC84" },
    "500": { light: "#17B26A", dark: "#17B26A" },
    "600": { light: "#0B9055", dark: "#0B9055" },
    "700": { light: "#097347", dark: "#097347" },
    "800": { light: "#0A5B39", dark: "#0A5B39" },
    "900": { light: "#094B31", dark: "#094B31" },
    "950": { light: "#042A1C", dark: "#042A1C" },
  },
  base: {
    white: { light: "#FFFFFF", dark: "#FFFFFF" },
    black: { light: "#070707", dark: "#070707" },
  },
};

export const theme = extendTheme({
  breakpoints,
  initialColorMode: "light",
  useSystemColorMode: false,
  colors,
  components: {
    Text: {
      variants: {
        info: {
          fontSize: "14px",
          fontWeight: "500",
        },
        authHeader: {
          fontSize: {
            base: "3xl",
            xl: "4xl",
          },
          fontWeight: "500",
          color: "midnightBlue",
          fontFamily: "Gibson - Semibold ve Regular",
        },
      },
    },
    Switch: switchTheme,
  },
});
