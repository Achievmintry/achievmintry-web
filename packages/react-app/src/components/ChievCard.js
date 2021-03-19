import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Text, Heading, AspectRatio, Link } from "@chakra-ui/react";
import { useChainLogs } from "../contexts/DappContext";

const Chiev = ({
  token,
  owned,
  gen0Ownership,
  account,
  displayPrice,
  hasMedia
}) => {
  const [chainLogs] = useChainLogs();

  return (
    <>
      <AspectRatio maxW="500px" ratio={1} overflow="hidden">
        <Image
          src={
            token["Display Thumb"]
              ? token["Display Thumb"][0].thumbnails.large.url
              : token["Image (from Artist Submissions) 2"][0].thumbnails.large
                  .url
          }
          alt={token["NFT Name (from Artist Submissions) 2"][0]}
          fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
          onMouseOver={e => {
            if (!token["Display Thumb"]) {
              return;
            }
            e.currentTarget.src =
              token[
                "Image (from Artist Submissions) 2"
              ][0].thumbnails.large.url;
          }}
          onMouseOut={e => {
            if (!token["Display Thumb"]) {
              return;
            }
            e.currentTarget.src =
              token["Display Thumb"][0].thumbnails.large.url;
          }}
        />
      </AspectRatio>
      <Box
        p={{ base: 3, sm: 3, lg: 4, xl: 4 }}
        w="100%"
        bg="secondary.500"
        fontSize={{ base: "xs", xl: "xs", xxl: "lg" }}
        flex="1 0 auto"
        overflow="hidden"
      >
        <Heading
          as="h3"
          fontSize={{ base: "md", xl: "lg", xxl: "2xl" }}
          textTransform="uppercase"
          color="black.500"
          pos="relative"
          display="inline-flex"
          alignItems="center"
        >
          <span>{token["NFT Name (from Artist Submissions) 2"][0]}</span>

          {hasMedia && (
            <Box
              fontFamily="Quicksand"
              fontSize={{ base: "9px", sm: "10px", xl: "sm", xxl: "sm" }}
              backgroundColor="white"
              border="5px solid black"
              p="3px 8px"
              ml="25px"
              transform="rotate(-7deg)"
              textAlign="center"
            >
              <span>i haz a video</span>
            </Box>
          )}
        </Heading>
        <Text> Price: {displayPrice} xDai</Text>
        <Text>
          {" "}
          Quantity:{" "}
          {token["Max Quantity (from Artist Submissions) 2"][0] || "0"}
        </Text>
        {+token["Gen0 Id"] && chainLogs.cloneInWild && (
          <Text>
            Minted: {chainLogs.cloneInWild[token["Gen0 Id"]]}{" "}
            {+chainLogs.cloneInWild[token["Gen0 Id"]] ===
              token["Max Quantity (from Artist Submissions) 2"][0] &&
              "SOLD OUT"}
          </Text>
        )}
        {account && (
          <Box>
            <Text>Owned: {owned || 0}</Text>
            <Text>Gen0 owned: {gen0Ownership}</Text>
          </Box>
        )}
        <Link as={ReactLink} to={`/chiev/${token["Gen0 Id"]}`}>
          <Box
            color={"black.500"}
            bg={"white"}
            borderWidth="10px"
            borderColor="black.500"
            fontFamily="Quicksand"
            fontSize={{ base: "xs", sm: "md", xl: "sm", xxl: "md" }}
            fontWeight="semibold"
            d="flex"
            alignItems="flex-start"
            justifyContent="flex-end"
            mt={5}
            pr={0}
            pt={0}
            h={170}
            w="300px"
            pos="absolute"
            bottom={{
              base: "-140px",
              sm: "-130px",
              lg: "-120px",
              xl: "-130px"
            }}
            right={{
              base: "-65px",
              sm: "-50px",
              lg: "-90px",
              xl: "-65px",
              xxl: "-50px"
            }}
            transform={{
              base: "rotate(-40deg) scale(0.8)",
              lg: "rotate(-40deg) scale(0.65)",
              xl: "rotate(-40deg) scale(0.8)",
              xxl: "rotate(-40deg) scale(0.9)"
            }}
            transition="transform 0.3s ease-in-out, color 0.2s ease, background-color 0.3s ease, border-color 0.3s ease"
            textAlign="center"
            // textTransform="lowercase"
            _hover={{
              color: "white",
              bg: "black.500",
              borderColor: "black.500"
            }}
          >
            <Box transform="rotate(25deg)" p={4}>
              CHIEV
              <br /> details
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default Chiev;
