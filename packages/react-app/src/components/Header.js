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
      align="center"
      alignItems="center"
      alignContent="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="black"
      pos="sticky"
      top={0}
      maxH="90px"
      zIndex={200}
      boxShadow="lg"
      {...props}
    >
      <Flex
        align="center"
        mr={5}
        order="2"
        w="33%"
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
            <Image src={Logo} m={0} p={0} />
          </Link>
        </Heading>
      </Flex>

      <Box
        display={{ sm: "block", md: "none" }}
        order="3"
        onClick={handleToggle}
        w="33%"
        justifySelf="flex-end"
      >
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "33%" }}
        alignItems="center"
        order="1"
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
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
        order="3"
        w="33%"
        justifySelf="flex-end"
        textAlign="right"
      >
        {user ? <UserAvatar user={user} /> : <Web3SignIn />}
      </Box>
    </Flex>
  );
};

export default Header;
