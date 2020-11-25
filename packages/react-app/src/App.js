import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Header } from "./components";
import Routes from "./Routes";
import {
  CommunityApiInit,
  EnsInit,
  NFTApiInit,
  KudosInit,
  TxProcessorInit,
  UserInit
} from "./contexts";
// import supportedChains from "./utils/Chains";
import "./themes/css/fonts.css";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
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
    breakpoints
  },
  fonts: {
    heading: "Arvo, serif",
    body: "Ubuntu, sans-serif"
  }
};

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
      </>
    );
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Router>
          <Init />
          <Header />
          <Routes />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
