import React from "react";

import { Flex, Text } from "@chakra-ui/core";
import { useUserWallet } from "../contexts/DappContext";

const Balance = props => {
  const [userWallet] = useUserWallet();
  console.log(userWallet);
  const roundUp = balance => {
    if (typeof balance !== "string") {
      return Math.round((balance + Number.EPSILON) * 100) / 100;
    }
    return parseFloat(balance).toFixed(2);
  };

  return userWallet ? (
    <Flex
      align="center"
      justify="right"
      wrap="wrap"
      padding="3px"
      color="black"
      {...props}
    >
      <Text fontFamily="heading" fontSize="xs" mr="3" isTruncated>
        xDai: {roundUp(userWallet?.eth)}
      </Text>
      <Text fontFamily="heading" fontSize="xs" isTruncated>
        $CHIEV: {roundUp(userWallet?.chiev)}
      </Text>
    </Flex>
  ) : null;
};

export default Balance;
