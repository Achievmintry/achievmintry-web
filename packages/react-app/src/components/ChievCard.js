import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Image, Text, Heading, AspectRatio, Link } from "@chakra-ui/react";
import { useChainLogs } from "../contexts/DappContext";

const Chiev = ({ token, owned, gen0Ownership, account, displayPrice }) => {
  const [chainLogs] = useChainLogs();

  return (
    <>
      <AspectRatio maxW="500px" ratio={1} overflow="hidden">
        <Image
          src={
            token["Display Thumb"]
              ? token["Display Thumb"][0].thumbnails.large.url
              : token["Image (from Artist Submissions)"][0].thumbnails.large.url
          }
          alt={token["NFT Name (from Artist Submissions)"][0]}
          fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
          onMouseOver={e => {
            if (!token["Display Thumb"]) {
              return;
            }
            e.currentTarget.src =
              token["Image (from Artist Submissions)"][0].thumbnails.large.url;
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
        p={{ base: 6, lg: 4, xl: 6 }}
        w="100%"
        bg="brandYellow.900"
        fontSize={{ base: "md", xl: "xl", xxl: "2xl" }}
      >
        <Heading
          as="h3"
          fontSize={{ base: "md", lg: "2xl", xxl: "3xl" }}
          textTransform="uppercase"
          color="black"
        >
          {token["NFT Name (from Artist Submissions)"][0]}
        </Heading>
        <Text> Price: {displayPrice} xDai</Text>
        <Text>
          {" "}
          Quantity: {token["Max Quantity (from Artist Submissions)"][0] || "?"}
        </Text>
        {+token["Gen0 Id"] && chainLogs.cloneInWild && (
          <Text>
            Minted: {chainLogs.cloneInWild[token["Gen0 Id"]]}{" "}
            {+chainLogs.cloneInWild[token["Gen0 Id"]] ===
              token["Max Quantity (from Artist Submissions)"][0] && "SOLD OUT"}
          </Text>
        )}
        {account && (
          <Box>
            <Text>Owned: {owned}</Text>
            <Text>Gen0 owned: {gen0Ownership}</Text>
          </Box>
        )}
        <Link as={ReactLink} to={`/chiev/${token["Gen0 Id"]}`}>
          <Text
            color={"primary.black"}
            bg={"white"}
            borderWidth="10px"
            borderColor="primary.black"
            fontFamily="Quicksand"
            fontWeight="semibold"
            d="flex"
            alignItems="flex-start"
            justifyContent="flex-end"
            mt={5}
            pr={0}
            pt={0}
            h={170}
            w="500px"
            pos="absolute"
            b="-50px"
            transform="rotate(-40deg)"
            transition="transform 0.3s ease-in-out, color 0.2s ease, background-color 0.3s ease, border-color 0.3s ease"
            textAlign="center"
            // textTransform="lowercase"
            _hover={{
              color: "brandYellow.200",
              bg: "primary.black",
              borderColor: "primary.black",
              transform: "rotate(-40deg), scale(1.05)"
            }}
          >
            <Box transform="rotate(25deg)" p={4}>
              CHIEV
              <br /> details
            </Box>
          </Text>
        </Link>
      </Box>
    </>
  );
};

export default Chiev;
