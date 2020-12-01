import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { Chievs, Communities } from "../components";

const Home = () => {
  return (
    <Box
      mx="auto"
      maxW="90vw"
      textAlign="left"
      padding={{ base: "50px 0", lg: "90px 0" }}
    >
      <Chievs featured={true} />
      <Box p={[2, 4, 6]} mt={6}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", xl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Communities
        </Heading>
        <Text fontSize={{ base: "md", xl: "2xl" }} mb="8">
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
              fontSize={{ base: "2xl", xl: "4xl" }}
              mb="1"
              textTransform="uppercase"
            >
              NFT Artists
            </Heading>
            <Text fontSize={{ base: "md", xl: "xl" }} mb="8">
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
              fontSize={{ base: "2xl", xl: "4xl" }}
              mb="1"
              textTransform="uppercase"
            >
              Bots
            </Heading>
            <Text fontSize={{ base: "md", xl: "xl" }} mb="8">
              Add the tip bot to your discord
            </Text>
            <Button bg="transparent" border="1px">
              Coming Soon
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
