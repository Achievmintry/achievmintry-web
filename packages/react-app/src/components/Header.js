import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Heading,
  Flex,
  Text,
  PseudoBox,
  Image,
  Fade
} from "@chakra-ui/core";
import { useUser, useLoading } from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";
import UserAvatar from "./UserAvatar";

import Logo from "../static/assets/img/chievmint-logo.png";

const MenuItems = ({ children }) => (
  <PseudoBox
    _hover={{ color: "brandYellow.900" }}
    transition="color 0.1s ease-in"
  >
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  </PseudoBox>
);

const Header = props => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const [user] = useUser();
  const [loading] = useLoading();

  console.log("heaher render loading", loading);

  return (
    <Flex
      as="nav"
      alignItems="center"
      alignContent="center"
      direction="row"
      justify={{ base: "left", xl: "space-between" }}
      direction="row"
      wrap="nowrap"
      padding="1.5rem"
      bg="white"
      color="black"
      pos="sticky"
      top={0}
      height={{ base: 70, xl: 90 }}
      maxH="90px"
      zIndex={200}
      boxShadow="lg"
      w="100%"
      p={{ base: "0", lg: "10px" }}
      {...props}
    >
      <Flex
        align="center"
        // mr={5}
        order="2"
        w={{ base: "33%" }}
        flexGrow={0}
        justifyItems="center"
        mr="0"
      >
        <Heading
          as="h1"
          size="lg"
          textTransform="uppercase"
          mx="auto"
          textAlign="center"
        >
          <Link to="/home">
            <Image
              src={Logo}
              mx="auto"
              p={0}
              w={show ? "100%" : "80%"}
              transition="width 0.2s ease"
            />
          </Link>
        </Heading>
      </Flex>

      <Box
        display={{ base: "block", md: "none" }}
        order="1"
        onClick={handleToggle}
        marginLeft="10px"
        w={{ base: "33%" }}
      >
        <svg
          fill="black"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", xl: "flex" }}
        bg="white"
        width={{ base: "100vw", xl: "33%" }}
        position={{ base: "absolute", xl: "relative" }}
        top={{ base: "70px", md: "unset" }}
        p={{ base: "25px", lg: "0" }}
        height="100vh"
        alignItems="center"
        order={[3, 3, 3, 1]}
        zIndex="300"
        opacity={show ? 1 : 0}
        flexGrow={{ base: "1", xl: "0" }}
        transition="opacity 0.1s 0.3s ease-in-out"
        fontSize={{ base: "md", lg: "lg" }}
        fontFamily={{ base: "heading", lg: "body" }}
      >
        <MenuItems
          _hover={{
            color: "white"
          }}
        >
          <Link to="/account">My Awards</Link>
        </MenuItems>
        <MenuItems>
          <Link to="/submissions">Submit Art</Link>
        </MenuItems>
        <MenuItems>
          <Link to="/snapshot">SnapShot</Link>
        </MenuItems>
        <MenuItems>
          <a href="https://chive.network">About</a>
        </MenuItems>
      </Box>

      <Box
        // display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 0, md: 0 }}
        order={[2, 2, 2, 3]}
        w={["33%"]}
        textAlign="right"
        zIndex={300}
      >
        {user ? (
          <UserAvatar user={user} open={show} />
        ) : (
          <Web3SignIn marginRight={{ base: "10px", lg: "0" }} />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
