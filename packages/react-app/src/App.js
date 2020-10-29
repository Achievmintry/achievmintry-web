import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Header, Balance, Awards } from "./components";
import UserInit from "./contexts/UserInit";
import TxProcessorInit from "./contexts/TxProcessorInit";
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
      </>
    );
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Init />
        <Header />
        <Balance />
        <Awards />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
