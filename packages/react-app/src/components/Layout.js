import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../contexts/CustomThemeContext";

const Layout = ({ children }) => {
  const [theme] = useTheme();
  return (
    <>
      <Box
        bgImage={"url(" + theme.images?.bgImg + ")"}
        bgColor="primary.500"
        bgSize={theme.bgSize || "cover"}
        bgPosition="center"
        zIndex="-1"
        h="100vh"
        w="100%"
        position="fixed"
        top="0"
        right="0"
        _before={{
          display: "block",
          content: '""',
          position: "absolute",
          w: "100%",
          h: "100%",
          bgColor: "background.500",
          opacity: theme.styles.bgOverlayOpacity,
          pointerEvents: "none",
          top: "0",
          right: "0",
          zIndex: "-1"
        }}
      ></Box>
      <Box minH="100vh" w="100%" textAlign="center">
        <Header />
        {children}
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
