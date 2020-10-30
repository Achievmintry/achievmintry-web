import React from "react";
import metaList from "../data/exampleMeta.json";

import { Grid, Box, Image } from "@chakra-ui/core";

const Cheivs = () => {
  console.log(metaList);
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <Box w="100%" h="10" bg="brandPink.900" rounded="lg">
        {metaList ? <Image src={metaList.image} alt={metaList.name} /> : "NFT"}
      </Box>
      <Box w="100%" h="10" bg="brandPink.900">
        NFT
      </Box>
      <Box w="100%" h="10" bg="brandPink.900">
        NFT
      </Box>
      <Box w="100%" h="10" bg="brandPink.900">
        NFT
      </Box>
      <Box w="100%" h="10" bg="brandPink.900">
        NFT
      </Box>
    </Grid>
  );
};

export default Cheivs;
