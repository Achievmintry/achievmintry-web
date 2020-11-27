import React from "react";
import { Box } from "@chakra-ui/core";
import { Chievs } from "../components";

const AllChievs = () => {
  return (
    <Box
      bg="brandYellow.200"
      w="100%"
      textAlign="center"
      padding={{ base: "50px 0", lg: "90px 0" }}
    >
      <Box mx="auto" maxW="90vw" textAlign="left">
        <Chievs />
      </Box>
    </Box>
  );
};

export default AllChievs;
