import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
import { Flex, Avatar, Link, Text } from "@chakra-ui/react";

import { getProfile } from "3box";

import { FaTwitter } from "react-icons/fa";
import EthAddressDisplay from "./EthAddressDisplay";
import { useLocation } from "react-router-dom";

const AccountAvatar = ({ addr, hideTweet, size, link }) => {
  const location = useLocation();
  const [user, setUser] = useState();
  useEffect(() => {
    const getAccountProfile = async (addr) => {
      const profile = await getProfile(addr);
      setUser({ username: addr, profile: profile });
    };
    if (addr && !user?.profile) {
      getAccountProfile(addr);
    }
  }, [addr, user]);
  return user ? (
    <Flex direction="row" alignItems="center">
      {user?.profile && user.profile.image && user.profile.image[0] ? (
        <Link as={ReactLink} to={`/account/${user.username}`}>
          <Avatar
            name={user.profile.username}
            src={`${"https://ipfs.infura.io/ipfs/" +
              user.profile.image[0].contentUrl["/"]}`}
            mr={3}
            size={size || "md"}
          />
        </Link>
      ) : (
        <Link as={ReactLink} to={`/account/${user.username}`}>
          <Avatar
            name={user.username}
            src={makeBlockie(user.username)}
            mr={3}
            size={size || "md"}
          />
        </Link>
      )}
      <h3>
        <Flex>
          <EthAddressDisplay address={user.username} />
          <Text ml={2}>{user.profile.emoji || ""} </Text>
        </Flex>
        {user.username && !hideTweet && (
          <Link
            colorScheme="twitter"
            href={`https://twitter.com/intent/tweet?text=We%20Be%20Chievn%20https://chiev.netlify.app${location.pathname}`}
            isExternal={true}
            ml={2}
          >
            <Flex>
              <Text mr={2}>Share</Text> <FaTwitter />
            </Flex>
          </Link>
        )}
      </h3>
    </Flex>
  ) : null;
};

export default AccountAvatar;
