import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Text, Image } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useUser } from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";
import UserAvatar from "./UserAvatar";

import Logo from "../static/assets/img/chievmint-logo.png";

const MenuItems = ({ children }) => (
  <Box a={{ color: "red" }}>
    <Text
      mt={{ base: 4, lg: 0 }}
      display="block"
      textAlign="center"
      p={{ base: "5px 10px", lg: "5px", xxl: "5px 10px" }}
      fontSize={{ base: "lg", lg: "sm", xxl: "md" }}
      fontFamily={{ base: "heading", lg: "body" }}
      fontWeight={{ base: "bold", lg: "semibold" }}
    >
      {children}
    </Text>
  </Box>
);

const Header = props => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const [user] = useUser();
  // const [loading] = useLoading();

  // console.log("header render loading", loading);

  return (
    <Flex
      as="nav"
      alignItems="center"
      alignContent="center"
      direction="row"
      justify={{ base: "left", lg: "space-between" }}
      wrap="nowrap"
      padding="1.5rem"
      bg="white"
      color="black"
      pos="sticky"
      top={0}
      height={{ base: 70, md: 90 }}
      maxH="90px"
      zIndex={200}
      boxShadow="lg"
      w="100vw"
      p={{ base: "0", lg: "0 25px" }}
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
              w={{ base: show ? "100%" : "80%", lg: "100%" }}
              transition="width 0.2s ease"
            />
          </Link>
        </Heading>
      </Flex>

      <Box
        display={{ base: "block", lg: "none" }}
        order="1"
        marginLeft="10px"
        textAlign={{ base: "left" }}
        w={{ base: "33%" }}
      >
        <IconButton
          backgroundColor="white"
          aria-label="Menu"
          icon={<HamburgerIcon />}
          onClick={handleToggle}
          w="40px"
          h="40px"
        />
      </Box>

      <Box
        display={{ base: show ? "block" : "none", lg: "flex" }}
        bg="white"
        width={{ base: "100vw", lg: "33%" }}
        position={{ base: "absolute", lg: "relative" }}
        top={{ base: "70px", lg: "unset" }}
        p={{ base: "25px", xl: "0 10% 0 0" }}
        height={{ base: "100vh", lg: "auto" }}
        alignItems="center"
        order={[3, 3, 1, 1]}
        zIndex="300"
        opacity={{ base: show ? 1 : 0, lg: 1 }}
        flexGrow={{ base: "1", xl: "0" }}
        transition="opacity 0.1s 0.3s ease-in-out"
        justifyContent={{ base: "unset", lg: "space-around" }}
      >
        <MenuItems>
          <Link to="/chievs">All Awards</Link>
        </MenuItems>
        <MenuItems>
          <Link to="/submissions">Submit Art</Link>
        </MenuItems>
        <MenuItems>
          <Link to="/stream">Chiev Stream</Link>
        </MenuItems>
        <MenuItems>
          <a href="/about">About</a>
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
          <Link to={`/account/${user.username}`}>
            <UserAvatar user={user} open={show} />
          </Link>
        ) : (
          <Web3SignIn marginRight={{ base: "10px", lg: "0" }} />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
