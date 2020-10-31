import { Box } from "@chakra-ui/core";
import React from "react";
import { Iframe } from "../components";

const Submissions = () => {
  const iframe =
    '<iframe class="airtable-embed" src="https://airtable.com/embed/shrVNHhCZpkxehqnX?backgroundColor=pink" frameborder="0" onmousewheel="" width="100%" height="1700" style="background: transparent; border: 1px solid #ccc;"></iframe>';
  return <>
  <Box bg="black" w="100%" p={4} color="white">
          <Iframe iframe={iframe} />
      </Box></>;
};

export default Submissions;
