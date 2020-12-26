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
  ChievsInit,
  TxProcessorInit,
  UserInit,
  ChainLogsInit,
} from "./contexts";

import { DappContextProvider } from "./contexts/DappContext";
import { useTheme } from "./contexts/CustomThemeContext";

const client = new ApolloClient({
  // uri: chainData.subgraph_url,
  // clientState: {
  //   resolvers,
  // },
});

function App() {
  const [theme] = useTheme();

  function Init() {
    return (
      <>
        <UserInit />
        <TxProcessorInit />
        <ChievsInit />
        <EnsInit />
        <NFTApiInit />
        <CommunityApiInit />
        <ChainLogsInit />
      </>
    );
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
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
