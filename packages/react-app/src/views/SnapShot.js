import { Box } from "@chakra-ui/core";
import React from "react";
import { Iframe } from "../components";

const SnapShot = () => {
    const iframe =
    '<iframe class="airtable-embed" src="https://snapshot.page/#/achievmintry/proposal/QmdUGZjjM4B6QhrwWeJbPMjvQyq6R2Qwjwm2YqWYMHt9Mj" frameborder="0" onmousewheel="" width="100%" height="5000" style="background: transparent; border: 1px solid #ccc;"></iframe>';
  return (
    <>
      <Box bg="black" w="100%" h="100%" p={4} color="white">
          <Iframe iframe={iframe} />
      </Box>
    </>
  );
};

export default SnapShot;