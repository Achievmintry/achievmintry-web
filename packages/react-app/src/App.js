import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./components";
import Routes from "./Routes";
import {
  CommunityApiInit,
  EnsInit,
  NFTApiInit,
  KudosInit,
  TxProcessorInit,
  UserInit,
  ChainLogsInit
} from "./contexts";
// import supportedChains from "./utils/Chains";
import "./themes/css/fonts.css";
// import BgImg from "./static/assets/img/rainbow-waves.jpg";

import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { DappContextProvider } from "./contexts/DappContext";
const breakpoints = createBreakpoints({
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  xxl: "1920px"
});

const overrides = {
  breakpoints,
  images: {
    bgImg: null
  },
  colors: {
    brandPurple: {
      900: "#6e1fb1"
    },
    brandPink: {
      900: "#cc3385"
    },
    brandYellow: {
      900: "#ffcc00",
      200: "#fff0be"
    },
    primary: {
      black: "#111"
    }
  },
  fonts: {
    heading: "Arvo, serif",
    body: "Ubuntu, sans-serif"
  }
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
          <DappContextProvider>
            <Init />
            <Layout>
              <Routes />
            </Layout>
          </DappContextProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
