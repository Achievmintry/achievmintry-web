import { Box } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled";
import { Iframe } from "../components";

const StyledIframe = styled(Iframe)`
  #app,
  body,
  html {
    background-color: #fff0be !important;
  }
`;
const SnapShot = () => {
  const iframe =
    '<iframe class="airtable-embed" src="https://snapshot.page/#/achievmintry/proposal/QmdUGZjjM4B6QhrwWeJbPMjvQyq6R2Qwjwm2YqWYMHt9Mj" frameborder="0" onmousewheel="" width="100%" height="5000" style="background-color: #fff0be;"></iframe>';
  return (
    <Box bg="white" w="100%" h="100%" p={4} color="black">
      <StyledIframe iframe={iframe} />
    </Box>
  );
};

export default SnapShot;
