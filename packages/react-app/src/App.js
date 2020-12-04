import React, { useEffect } from "react";
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

import { DappContextProvider } from "./contexts/DappContext";
import { useTheme } from "./contexts/CustomThemeContext";

// const chainData = supportedChains[+process.env.REACT_APP_NETWORK_ID];

const client = new ApolloClient({
  // uri: chainData.subgraph_url,
  // clientState: {
  //   resolvers,
  // },
});

function App() {
  const [theme] = useTheme();

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", theme);
  }, [theme]);

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
