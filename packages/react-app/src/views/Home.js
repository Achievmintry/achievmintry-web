import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { Chievs, Communities } from "../components";

const Home = () => {
  return (
    <>
      <Box
        bg="secondary.500"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "33%" }}
        mx="auto"
        p={4}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          The Holoday Special
        </Heading>
        <Text>
          <span role="img" aria-label="holiday">
            🎄
          </span>{" "}
          Special Holiday NFT gift cards will be dropped over the next week.
          <span role="img" aria-label="holiday">
            🎄
          </span>
        </Text>
        <Text>
          <span role="img" aria-label="holiday">
            🍾
          </span>
          Artwork done by community members for members.
          <span role="img" aria-label="holiday">
            🍾
          </span>
        </Text>
        <Text>
          <span role="img" aria-label="holiday">
            🕎
          </span>{" "}
          Give the gift of an everlasting Non Fungible Token to your loved ones.
          <span role="img" aria-label="holiday">
            🕎
          </span>
        </Text>
        <Link to={`/chievs`}>
          {" "}
          <span role="img" aria-label="holiday">
            ☀️
          </span>{" "}
          Check them all out here{" "}
          <span role="img" aria-label="holiday">
            ☀️
          </span>
        </Link>
      </Box>
      <Box
        mx="auto"
        maxW="90vw"
        textAlign="left"
        padding={{ base: "20px 0", xl: "40px 0" }}
      >
        <Chievs featured={true} />
        <Box p={[2, 4, 6]} mt={6}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", xxl: "4xl" }}
            mb="1"
            textTransform="uppercase"
          >
            Communities
          </Heading>
          <Text fontSize={{ base: "md", xl: "xl", xxl: "2xl" }} mb="8">
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
                fontSize={{ base: "2xl", xxl: "4xl" }}
                mb="1"
                textTransform="uppercase"
              >
                NFT Artists
              </Heading>
              <Text fontSize={{ base: "md", xl: "xl", xxl: "2xl" }} mb="8">
                Submit your work To own a Gen0 NFT talisman and get a % of all
                sales.
              </Text>
              <Button
                bg="white"
                borderWidth="5px"
                borderColor="black.500"
                borderRadius="0"
                as={Link}
                to="/submissions"
              >
                Submissions
              </Button>
            </Box>
            <Box p={{ sm: 2, md: 4, xl: 6 }}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", xxl: "4xl" }}
                mb="1"
                textTransform="uppercase"
              >
                Bots
              </Heading>
              <Text fontSize={{ base: "md", xl: "xl", xxl: "2xl" }} mb="8">
                Add the tip bot to your discord
              </Text>
              <Button
                bg="white"
                borderWidth="5px"
                borderColor="black.500"
                borderRadius="0"
                isDisabled
              >
                Coming Soon
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
