import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Grid, Image } from "@chakra-ui/core";
import { useCommunityApi } from "../contexts/DappContext";

const Communities = ({ featured }) => {
  const [communities] = useCommunityApi();

  console.log('communities', communities);
  return (
    <>
      <Heading as={"h1"}>Communities </Heading>
      {/* <Heading as={"h3"}>Dummy Data --  get from airtable</Heading> */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Box
          as={Link}
          to="/chievs"
          maxW="18rem"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          borderColor="brandPink.900"
          p="6"
        >
          <Image src={"https://i.imgur.com/FjgyKjk.png"} />
          <Box p="6">
            <Heading as="h3" size="lg">
              RaidGuild
            </Heading>
            <Text>Chopping up web3 quests</Text>
          </Box>
        </Box>
        <Box
          as={Link}
          to="/chievs"
          maxW="18rem"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          borderColor="brandPink.900"
          p="6"
        >
          <Image src={"https://i.imgur.com/QdkdxN7.png"} />
          <Box p="6">
            <Heading as="h3" size="lg">
              MetaGame
            </Heading>
            <Text>A real life RPG</Text>
          </Box>
        </Box>
        <Box
          as={Link}
          to="/chievs"
          maxW="18rem"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          borderColor="brandPink.900"
          p="6"
        >
          <Image src={"https://i.imgur.com/vli8Kvp.png"} />
          <Box p="6">
            <Heading as="h3" size="lg">
              MetaCartel
            </Heading>
            <Text>Spicy</Text>
          </Box>
        </Box>
        {featured && (
          <Box
            as={Link}
            to="/communities"
            maxW="18rem"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            borderColor="brandPink.900"
            p="6"
          >
            <Heading as="h3" size="lg">
              Communities
            </Heading>
            <Text>More communities to come</Text>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Communities;
