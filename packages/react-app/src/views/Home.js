import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/core";
import { Balance, Chievs } from "../components";

const Home = () => {
  return (
    <>
      <Balance />
      <Chievs featured={true} />
      <Box p="6">
        <Heading>Communities</Heading>
        <Text>Find your community specific talisman</Text>
        {/* pull community data and link to filtered results */}
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
            <Heading as="h3" size="lg">
              Communities
            </Heading>
            <Text>More communities to come</Text>
          </Box>
        </Grid>
        <Box p="6">
          <Heading>NFT Artists</Heading>
          <Text>
            Submit your work To own a Gen0 NFT talisman and get a % of all sales.
          </Text>
          <Button bg="transparent" border="1px" as={Link} to="/submissions">
            Submissions
          </Button>
        </Box>
        <Box p="6">
          <Heading>Bots</Heading>
          <Text>
            Add the tip bot to your discord
          </Text>
          <Button bg="transparent" border="1px">
            Coming Soon
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
