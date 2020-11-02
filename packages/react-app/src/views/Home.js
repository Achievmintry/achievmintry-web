import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/core";
import { Balance, Chievs } from "../components";

const Home = () => {
  return (
    <>
      <Balance />
      <Chievs featured={true} />
      <Box p="6">
        <Heading>NFT Artists</Heading>
        <Text>
          Submit your work To own a Gen0 NFT and get a % of all sales.
        </Text>
        <Button bg="transparent" border="1px" as={Link} to="/submissions">
          Submissions
        </Button>
      </Box>
    </>
  );
};

export default Home;
