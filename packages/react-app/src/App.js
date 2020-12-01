import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { ChakraProvider } from "@chakra-ui/react";
import { Header, Footer } from "./components";
import Routes from "./Routes";
import {
  CommunityApiInit,
  EnsInit,
  NFTApiInit,
  KudosInit,
  TxProcessorInit,
  UserInit,
  ChainLogsInit,
} from "./contexts";
// import supportedChains from "./utils/Chains";
import "./themes/css/fonts.css";

import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  "2xl": "1920px",
});

const overrides = {
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
  fonts: {
    heading: "Arvo, serif",
    body: "Ubuntu, sans-serif",
  },
};

const customTheme = extendTheme(overrides);

// const chainData = supportedChains[+process.env.REACT_APP_NETWORK_ID];

const client = new ApolloClient({
  // uri: chainData.subgraph_url,
  // clientState: {
  //   resolvers,
  // },
});

function App() {
  function Init() {
    return (
      <>
        <UserInit />
        <TxProcessorInit />
        <KudosInit />
        <EnsInit />
        <NFTApiInit />
        <CommunityApiInit />
        <ChainLogsInit />
      </>
    );
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <Router>
          <Init />
          <Header />
          <Routes />
          <Footer />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
