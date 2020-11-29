import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
} from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { useNFTApi} from "../contexts/DappContext";
import { Chiev } from "../components";

const ChievDetail = () => {
  const { tokenId } = useParams();
  const [nfts] = useNFTApi();
  const [currentToken, setCurrentToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nft = nfts.find((item) => item.fields.id.toString() === tokenId);
    if (nft) {
      setCurrentToken(nft.fields);
    }
    if (nfts.length) {
      setLoading(false);
    }
  }, [nfts, tokenId]);

  return (
    <Box
      bg="brandYellow.200"
      w="100%"
      minH="100vh"
      textAlign="center"
      pt="90px"
    >
      <Box mx="auto" maxW="90vw" textAlign="left">
        {currentToken ? (
          <Flex
            align="flex-start"
            overflow="hidden"
            direction="row"
            wrap="nowrap"
          >
            <Chiev token={currentToken} />
          </Flex>
        ) : loading ? (
          <Text>loading</Text>
        ) : (
          <Text>Nufin here</Text>
        )}
      </Box>
    </Box>
  );
};

export default ChievDetail;
