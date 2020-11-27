import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";

import { Communities } from "../components";

const AllCommunities = () => {
  return (
    <Box
      bg="brandYellow.200"
      w="100%"
      minH="100vh"
      textAlign="center"
      pt="90px"
    >
      <Box mx="auto" maxW="90vw" textAlign="left">
        <Box p="6">
          <Heading as="h2" mb="1" textTransform="uppercase">
            Communities
          </Heading>
          <Text fontSize="2xl" mb="5">
            Find your community
          </Text>
          <Communities />
        </Box>
      </Box>
    </Box>
  );
};

export default AllCommunities;
