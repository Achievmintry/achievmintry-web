import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import { Communities } from "../components";

const AllCommunities = () => {
  return (
    <Box p="6">
      <Heading as="h2" mb="1" textTransform="uppercase">
        Communities
      </Heading>
      <Text fontSize="2xl" mb="5">
        Find your community
      </Text>
      <Communities />
    </Box>
  );
};

export default AllCommunities;
