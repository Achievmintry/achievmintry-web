import React, { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNFTApi } from "../contexts/DappContext";
import { Chiev } from "../components";

const ChievDetail = () => {
  const { tokenId } = useParams();
  const [nfts] = useNFTApi();
  const [currentToken, setCurrentToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nft = nfts.find(
      item => item.fields["Gen0 Id"].toString() === tokenId
    );
    if (nft) {
      setCurrentToken(nft.fields);
    }
    if (nfts.length) {
      setLoading(false);
    }
  }, [nfts, tokenId]);

  return (
    <Box
      mx="auto"
      maxW="90vw"
      minH="100vh"
      textAlign="left"
      padding={{ base: "50px 0", xl: "90px 0" }}
    >
      {currentToken ? (
        <Flex
          align="flex-start"
          overflow="hidden"
          direction="column"
          wrap="wrap"
          justifyContent="center"
        >
          <Chiev token={currentToken} />
        </Flex>
      ) : loading ? (
        <Text>loading</Text>
      ) : (
        <Text>Nufin here</Text>
      )}
    </Box>
  );
};

export default ChievDetail;
