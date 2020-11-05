import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Header } from "./components";
import UserInit from "./contexts/UserInit";
import TxProcessorInit from "./contexts/TxProcessorInit";
import KudosInit from "./contexts/KudosInit";
import Routes from "./Routes";
import NFTApiInit from "./contexts/NFTApiInit";
import EnsInit from "./contexts/EnsInit";
// import supportedChains from "./utils/Chains";

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
      900: "#6e1fb1",
    },
    brandPink: {
      900: "#cc3385",
    },
    breakpoints,
  },
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
