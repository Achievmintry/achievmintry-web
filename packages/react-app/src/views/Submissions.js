import { Box } from "@chakra-ui/react";
import React from "react";
import { Iframe } from "../components";

const Submissions = () => {
  const iframe =
    '<iframe class="airtable-embed" src="https://airtable.com/embed/shrVNHhCZpkxehqnX?backgroundColor=#fff0be" frameborder="0" onmousewheel="" width="100%" height="1700" style="backgroundColor: #fff0be;"></iframe>';
  return (
    <Box bg="#fff" w="100%" p={4} color="black">
      <Iframe iframe={iframe} />
    </Box>
  );
};

export default Submissions;
