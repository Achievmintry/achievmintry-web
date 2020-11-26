import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Button, Heading, Text } from "@chakra-ui/core";
import { Chievs, Communities } from "../components";

const Home = () => {
  return (
    <Box bg="brandYellow.200" w="100%" textAlign="center">
      <Box mx="auto" maxW="90vw" textAlign="left">
        <Chievs featured={true} />
        <Box p="6">
          <Heading as="h2" mb="1" textTransform="uppercase">
            Communities
          </Heading>
          <Text fontSize="2xl" mb="5">
            Find your community specific talisman
          </Text>
          <Communities featured={true} />
          <Flex
            direction="row"
            wrap="nowrap"
            align="start"
            justify="start"
            borderTop="10px"
            borderColor="black"
          >
            <Box p="6" mb="5" w={{ sm: "auto", md: "33%" }}>
              <Heading as="h2" mb="1" textTransform="uppercase">
                NFT Artists
              </Heading>
              <Text fontSize="2xl" mb="5">
                Submit your work To own a Gen0 NFT talisman and get a % of all
                sales.
              </Text>
              <Button bg="transparent" border="1px" as={Link} to="/submissions">
                Submissions
              </Button>
            </Box>
            <Box p="6" w={{ sm: "auto", md: "33%" }}>
              <Heading as="h2" mb="1" textTransform="uppercase">
                Bots
              </Heading>
              <Text fontSize="2xl" mb="5">
                Add the tip bot to your discord
              </Text>
              <Button bg="transparent" border="1px">
                Coming Soon
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
