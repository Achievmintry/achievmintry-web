import React from "react";

import { Box, Button, Heading, Text, SimpleGrid, Link } from "@chakra-ui/react";
import { Chievs, Communities } from "../components";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
          First ChievMint Community Awards
        </Heading>
        <Text>
          <span role="img" aria-label="holiday">
            🏆
          </span>{" "}
          All represented orgs have submitted their nominations
          <span role="img" aria-label="dao-awards">
            🏆
          </span>
        </Text>
        
        <Text>
          <span role="img" aria-label="dao-awards">
            🎉
          </span>{" "}
          We will recognise the winners with an everlasting Non Fungible Token.
          <span role="img" aria-label="dao-awards">
            🎉
          </span>
        </Text>
        <Text>
          <span role="img" aria-label="dao-awards">
            💎
          </span>
          Vote now on snapshot in the 3 categories.
          <span role="img" aria-label="dao-awards">
            💎
          </span>
        </Text>
        <Box>
          <Link
            href={`https://snapshot.page/#/achievmintry/proposal/QmVS5Medt9y62UAKUeBAiYDGZ9Do5JtTyQQcBrUC4YLaJ4`}
            isExternal={true}
            style={{"color":"blue", "textDecoration": "underline", "marginLeft": "5px"}}
          >
            Buidler Award <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href={`https://snapshot.page/#/achievmintry/proposal/Qmcwjf3q8gyjPKm2iF6J4XKagU3Bb19FWFUuXyHrN94H47`}
            isExternal={true}
            style={{"color":"blue", "textDecoration": "underline", "marginLeft": "5px"}}
          >
            Slaying Moloch Award <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href={`https://snapshot.page/#/achievmintry/proposal/QmTLhcCu5Q1PvLyx1vaBKqD6m7PuS7rRkS9V8WSpvAqXd7`}
            isExternal={true}
            style={{"color":"blue", "textDecoration": "underline", "marginLeft": "5px"}}
          >
            Community Ops Award <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
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
