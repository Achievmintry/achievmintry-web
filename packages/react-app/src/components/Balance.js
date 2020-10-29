import React from "react";

// import { getDefaultProvider } from "@ethersproject/providers";
// import { Contract } from "@ethersproject/contracts";
// import { addresses, abis } from "@project/contracts";

import {
  Box,
    Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/core";

// const readOnChainData = async () => {
//   // Should replace with the end-user wallet, e.g. Metamask
//   const defaultProvider = getDefaultProvider();
//   // Create an instance of an ethers.js Contract
//   // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
//   const ceaErc20 = new Contract(
//     addresses.ceaErc20,
//     abis.erc20,
//     defaultProvider
//   );
//   // A pre-defined address that owns some CEAERC20 tokens
//   const tokenBalance = await ceaErc20.balanceOf(
//     "0xCED608Aa29bB92185D9b6340Adcbfa263DAe075b"
//   );
//   console.log({ tokenBalance: tokenBalance.toString() });
// };

const Balance = () => {
  return (
    <Box bg="black" w="100%" p={4} color="white">
      <FormControl>
        <FormLabel htmlFor="email">$CHEIV Balance: </FormLabel>
        <Input
          type="text"
          id="address"
          aria-describedby="address-helper-text"
        />
        <FormHelperText id="address-helper-text">
          Enter a ethereum address.
        </FormHelperText>
        <Button
          mt={4}
          color="brandPurple.900"
          isLoading={false}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Balance;
