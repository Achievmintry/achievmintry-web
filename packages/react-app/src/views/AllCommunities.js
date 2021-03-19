import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import { Communities } from "../components";

const AllCommunities = () => {
  return (
    <>
      <Box
        p="6"
        display="inline-block"
        bgColor="primary.300"
        border="10px solid black"
        color="black.900"
        my={8}
      >
        <Heading as="h2" mb="1" textTransform="uppercase">
          Communities
        </Heading>
        <Text fontSize="2xl" mb="0">
          Find your community
        </Text>
      </Box>
      <Box p="6">
        <Communities />
      </Box>
    </>
  );
};

export default AllCommunities;
