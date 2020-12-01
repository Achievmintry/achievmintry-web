import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import Balance from "./Balance";
import { truncateAddr } from "../utils/Helpers";

const UserAvatar = ({ user, open }) => {
  return (
    <Box textAlign="right" marginTop="0" position="relative">
      <Flex
        direction="row-reverse"
        alignItems="center"
        justifyContent="flex-start"
      >
        {user && user.image && user.image[0] ? (
          <Box>
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
              transform={{ base: "scale(0.7)", md: "scale(1)" }}
            />
          </Box>
        )}
        <Box display={{ base: "none", lg: "block" }} margin="0 10px 0 0">
          <Text fontSize="sm" fontFamily="body">
            {user.name || truncateAddr(user.username)}{" "}
            <span>{user.emoji || ""} </span>
          </Text>
        </Box>
      </Flex>
      <Balance
        w="auto"
        textAlign="right"
        opacity={{ base: open ? 1 : 0, lg: 1 }}
        transition="all 0.3s ease"
        position={{ base: "absolute", lg: "relative" }}
        right="10px"
        bottom={{ base: "-35px", lg: "0" }}
        justifyContent="flex-end"
      />
    </Box>
  );
};

export default UserAvatar;
