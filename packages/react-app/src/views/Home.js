import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Button, Heading, Text } from "@chakra-ui/core";
import { Balance, Chievs, Communities } from "../components";

const Home = () => {
  return (
    <Flex bg="brandYellow.200" align="center" direction="column" wrap>
      <Balance w="full" />
      <Box>
        <Chievs featured={true} />
        <Box p="6">
          <Heading as="h2" mb="1" textTransform="uppercase">
            Communities
          </Heading>
          <Text mb="3">Find your community specific talisman</Text>
          <Communities featured={true} />
          <Flex direction="row" wrap="nowrap" align="start" justify="start">
            <Box p="6">
              <Heading as="h2" mb="1" textTransform="uppercase">
                NFT Artists
              </Heading>
              <Text mb="3">
                Submit your work To own a Gen0 NFT talisman and get a % of all
                sales.
              </Text>
              <Button bg="transparent" border="1px" as={Link} to="/submissions">
                Submissions
              </Button>
            </Box>
            <Box p="6">
              <Heading as="h2" mb="1" textTransform="uppercase">
                Bots
              </Heading>
              <Text mb="3">Add the tip bot to your discord</Text>
              <Button bg="transparent" border="1px">
                Coming Soon
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
