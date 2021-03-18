import React from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  Heading,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const About = () => {
  return (
    <Box
      mx="auto"
      maxW="90vw"
      textAlign="left"
      padding={{ base: "50px 0", xl: "90px 0" }}
    >
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Manifesto - Recognition is good
        </Heading>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
        fontSize={{ base: "1.2rem" }}
      >
        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Build a Positive Community Culture.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Fosters a Collaborative Buidl Environment.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Increase Motivation
          </ListItem>
        </List>

        <Text padding={2}>
          Every year there are groups and individuals that stand out as note
          worthy contributors. Many times doing their good work out of pure
          passion.
        </Text>
        <Text padding={2}>
          We think the greater community would like to recognize these
          extraordinary contributions with a talisman of appreciation, a premier
          award.
        </Text>
        <Text padding={2}>
          Besides that, individuals should be able to easily recognize members
          of their own communities and teams.
        </Text>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          The Ministry of Achievement
        </Heading>
        <Text padding={2}>
          A single organization should not be in charge of issuing these awards
          so our solution is a 'dao of daos' comity.
        </Text>
        <Text padding={2}>
          We have 2 types of achievement awards
        </Text>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            <strong>Premier Awards:</strong> issued periodically, nominated by
            the dao, and voted on by the greater Ethereum community through
            snapshot votes.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            <strong>Talisman Awards:</strong> issued at anytime from one
            community member to another to recognize their awesomeness.
          </ListItem>
        </List>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          The $CHEIV Token Snapshots
        </Heading>
        <Link
          href={`https://snapshot.page/#/achievmintry/`}
          isExternal={true}
          ml={2}
        >
          Snapshot Link
        </Link>
        <Text padding={2}>
          For Premier awards the DAO doesn't pick the winners, the community
          will pick the winners.
        </Text>
        <Text
          padding={2}
          pl={4}
        >
          <em>
            A token drop ($CHIEV) was initially made to all gitcoin donators.
            They are the givers, the dream/meme enablers.
          </em>
        </Text>

        <Text padding={2}>
          Further token drops will be made to members of joining DAOs, award
          winners, NFT artists, and contributors to the Ministry. TBD by DAO
        </Text>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          The Ministry of Achievement DAO
        </Heading>

        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            The comity will be comprised of representative 'delegates' from DAOs
            across the Ethereum ecosystem.{" "}
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Vote in or out 'delegates' from other DAOs.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Manage admin functions around NFT minter.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Manage and distribute $CHIEV token.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Record, Validate and create awards, nominations and snapshots.
          </ListItem>
        </List>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Awards - The Wei, The Shannon and 1ups
        </Heading>
        <Text padding={2}>
          super dope fresh art NFTs/ Artists will get royalties / Dao will take
          a cut to sustain
        </Text>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Periodic awards The Wei (yearly awards), The Shannon (periodic
            awards){" "}
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Talismans - recognize a co future of worker.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            DAO specific achievement and skill certificates
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="secondary.500" />
            Every community can have their own NFT Awards
          </ListItem>
        </List>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Notes on Tech
        </Heading>
        <Link
          href={`https://github.com/Achievmintry/achievmintry-web`}
          isExternal={true}
          ml={2}
        >
          Github Link
        </Link>
        <Text padding={2}>
          <strong>Everything is an NFT:</strong> everything on the site is an
          nft, Likes, Status, Follows, Roles, Themes, Awards. We want to
          experiment with the utility hidden in these little nuggets.
        </Text>
        <Text padding={2}>
          <strong>Bots:</strong> Every community has a discord bot that can
          issue NFTs based on emoji reactions.
        </Text>
        <Text padding={2}>
          <strong>React Hooks:</strong> We have a library of react hooks that
          allow you to bring in NFT data to any react app. Reach out if this is
          something that interests you.
        </Text>
        <Text padding={2}>
          <strong>xDai FTW:</strong> The cheap, fast and reliable transactions
          are making xDai the premier place for NFTs. Need xDai or more info
          check out our Discord.
        </Text>
        <Text padding={2}>
          <strong>Special Thanks:</strong> Special thanks to RaidGuild and xDai
          StakeHaus.
        </Text>
        <Text padding={2}>
          <strong>Alpha:</strong> This app is in alpha and can change.
        </Text>
      </Box>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", xxl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Other Links
        </Heading>
        <Link href={`https://blog.chiev.net/`} isExternal={true} ml={2}>
          Blog
        </Link>
        <Link href={`https://chiev.net/`} isExternal={true} ml={2}>
          Landing Page
        </Link>
        <Link href={`https://discord.gg/sqRssB3PBD`} isExternal={true} ml={2}>
          Discord
        </Link>
        <Link
          href={`https://twitter.com/ChievNetwork`}
          isExternal={true}
          ml={2}
        >
          Twitter
        </Link>
      </Box>
    </Box>
  );
};

export default About;
