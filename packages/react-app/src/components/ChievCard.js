import React from "react";

import { Box, Image, Text, Heading, AspectRatio } from "@chakra-ui/react";
import { useChainLogs} from "../contexts/DappContext";

const Chiev = ({ token, owned, gen0Ownership, account, displayPrice }) => {
  const [chainLogs] = useChainLogs();

  return (
      <>
        <AspectRatio maxW="500px" ratio={1} overflow="hidden">
          <Image
            src={
              token["Display Thumb"]
                ? token["Display Thumb"][0].thumbnails.large.url
                : token["Image (from Artist Submissions)"][0].thumbnails.large
                    .url
            }
            alt={token["NFT Name (from Artist Submissions)"][0]}
            fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
            onMouseOver={(e) => {
              if (!token["Display Thumb"]) {
                return;
              }
              e.currentTarget.src =
                token[
                  "Image (from Artist Submissions)"
                ][0].thumbnails.large.url;
            }}
            onMouseOut={(e) => {
              if (!token["Display Thumb"]) {
                return;
              }
              e.currentTarget.src =
                token["Display Thumb"][0].thumbnails.large.url;
            }}
          />
        </AspectRatio>
        <Box p={{ base: 6, xl: 2, "2xl": 6 }} w="100%" bg="brandYellow.900">
          <Heading
            as="h3"
            fontSize={{ base: "md", xl: "xl" }}
            textTransform="uppercase"
            color="black"
          >
            {token["NFT Name (from Artist Submissions)"][0]}
          </Heading>
          <Text> Price: {displayPrice} xDai</Text>
          <Text>
            {" "}
            Quantity:{" "}
            {token["Max Quantity (from Artist Submissions)"][0] || "?"}
          </Text>
          {+token["Gen0 Id"] && chainLogs.cloneInWild && (
            <Text>
              Minted: {chainLogs.cloneInWild[token["Gen0 Id"]]}{" "}
              {+chainLogs.cloneInWild[token["Gen0 Id"]] ===
                token["Max Quantity (from Artist Submissions)"][0] &&
                "SOLD OUT"}
            </Text>
          )}
          {account && (
            <Box>
              <Text>Owned: {owned}</Text>
              <Text>Gen0 owned: {gen0Ownership}</Text>
            </Box>
          )}
        </Box>
        </>
  );
};

export default Chiev;
