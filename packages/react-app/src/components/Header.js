import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import { useUser, useNetwork, useLoading } from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";
import UserAvatar from "./UserAvatar";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const [user] = useUser();
  const [network] = useNetwork();
  const [loading] = useLoading();

  console.log("network", network);
  console.log("loading", loading);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="brandPurple.900"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Achieveminrty
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
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
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>SnapShot</MenuItems>
        <MenuItems>Forum</MenuItems>
        <MenuItems>
          <Link to="/account">Info</Link>
        </MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {user ? <UserAvatar user={user} /> : <Web3SignIn />}
      </Box>
    </Flex>
  );
};

export default Header;
