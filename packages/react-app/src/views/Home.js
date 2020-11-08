import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/core";
import { Balance, Chievs, Communities } from "../components";

const Home = () => {
  return (
    <>
      <Balance />
      <Chievs featured={true} />
      <Box p="6">
        <Heading>Communities</Heading>
        <Text>Find your community specific talisman</Text>
        <Communities featured={true} />
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
