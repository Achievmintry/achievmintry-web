import React from "react";

import { Box, Text } from "@chakra-ui/core";
import { useUserWallet } from "../contexts/DappContext";

const Balance = () => {
  const [userWallet] = useUserWallet();
  return (
    <Box bg="black" w="100%" p={4} color="white">
      <Text fontSize="xl">
        xDai Balance: {userWallet?.eth} Balance: $CHEIV Balance:{" "}
        {userWallet?.cheiv}
      </Text>
    </Box>
  );
};

export default Balance;
