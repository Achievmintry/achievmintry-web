import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Box, Flex, Avatar } from "@chakra-ui/core";
import Balance from "./Balance";
import { truncateAddr } from "../utils/Helpers";

const UserAvatar = ({ user }) => {
  return (
    <Box textAlign="right">
      <Flex direction="row" alignItems="center" justifyContent="flex-end">
        {user && user.image && user.image[0] ? (
          <Avatar
            name={user.username}
            src={`${"https://ipfs.infura.io/ipfs/" +
              user.image[0].contentUrl["/"]}`}
            mr={3}
          />
        ) : (
          <Avatar
            name={user.username}
            src={makeBlockie(user.username)}
            mr={3}
          />
        )}
        <h3>
          {user.name || truncateAddr(user.username)}{" "}
          <span>{user.emoji || ""} </span>
        </h3>
      </Flex>
      <Balance w="auto" justifyContent="flex-end" />
    </Box>
  );
};

export default UserAvatar;
