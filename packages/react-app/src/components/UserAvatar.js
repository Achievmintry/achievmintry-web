import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Box, Flex, Avatar, Heading } from "@chakra-ui/core";
import Balance from "./Balance";
import { truncateAddr } from "../utils/Helpers";

const UserAvatar = ({ user, open }) => {
  return (
    <Box textAlign="right" marginTop="0" position="relative">
      <Flex direction="row" alignItems="center" justifyContent="flex-end">
        {user && user.image && user.image[0] ? (
          <Box marginTop="0">
            <Avatar
              name={user.username}
              src={`${"https://ipfs.infura.io/ipfs/" +
                user.image[0].contentUrl["/"]}`}
              mr={{ base: 0, md: 3 }}
              transform={{ base: "scale(0.7)", md: "scale(1)" }}
            />
          </Box>
        ) : (
          <Box>
            <Avatar
              name={user.username}
              src={makeBlockie(user.username)}
              mr={3}
            />
          </Box>
        )}
        <Box display={{ base: "none", lg: "block" }}>
          <Heading as="h3">
            {user.name || truncateAddr(user.username)}{" "}
            <span>{user.emoji || ""} </span>
          </Heading>
        </Box>
      </Flex>
      <Balance
        w="auto"
        textAlign="right"
        opacity={open ? 1 : 0}
        transition="all 0.3s ease"
        position="absolute"
        right="10px"
        bottom="-50px"
        borderTop="5px solid black"
      />
    </Box>
  );
};

export default UserAvatar;
