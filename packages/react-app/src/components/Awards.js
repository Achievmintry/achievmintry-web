import React from "react";

import { Grid, Box } from "@chakra-ui/core";

const Balance = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <Box w="100%" h="10" bg="brandPink.900">NFT</Box>
      <Box w="100%" h="10" bg="brandPink.900">NFT</Box>
      <Box w="100%" h="10" bg="brandPink.900">NFT</Box>
      <Box w="100%" h="10" bg="brandPink.900">NFT</Box>
      <Box w="100%" h="10" bg="brandPink.900">NFT</Box>
    </Grid>
  );
};

export default Balance;
