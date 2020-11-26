import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/core";
import { Chievs, Communities } from "../components";

const Home = () => {
  return (
    <Box bg="brandYellow.200" w="100%" textAlign="center">
      <Box mx="auto" maxW="90vw" textAlign="left">
        <Chievs featured={true} />
        <Box p={6} mt={6}>
          <Heading
            as="h2"
            size={["lg", "xl", "2xl"]}
            mb="1"
            textTransform="uppercase"
          >
            Communities
          </Heading>
          <Text fontSize={["md", "lg"]} mb="5">
            Find your community specific talisman
          </Text>
          <Communities featured={true} />
          <SimpleGrid
            columns={{ sm: 1, md: 2, xl: 3 }}
            spacingX={{ sm: 0, md: "20px", xl: "50px" }}
            mt="50px"
          >
            <Box p={{ sm: 2, md: 4, xl: 6 }} mb="5">
              <Heading
                as="h2"
                size={["xl", "2xl", "3xl"]}
                mb="1"
                textTransform="uppercase"
              >
                NFT Artists
              </Heading>
              <Text fontSize={["md", "lg"]} mb="5">
                Submit your work To own a Gen0 NFT talisman and get a % of all
                sales.
              </Text>
              <Button bg="transparent" border="1px" as={Link} to="/submissions">
                Submissions
              </Button>
            </Box>
            <Box p={{ sm: 2, md: 4, xl: 6 }}>
              <Heading
                as="h2"
                size={["xl", "2xl", "3xl"]}
                mb="1"
                textTransform="uppercase"
              >
                Bots
              </Heading>
              <Text fontSize={["md", "lg"]} mb="5">
                Add the tip bot to your discord
              </Text>
              <Button bg="transparent" border="1px">
                Coming Soon
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
