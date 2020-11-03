import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useUser } from "../contexts/DappContext";
import { Chievs } from "../components";
import { truncateAddr } from "../utils/Helpers";

const Account = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useUser();
  const [loading, ] = useState(false);
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    if (!user?.username) {
      return;
    }
    setCurrentAccount(user.username);
  }, [user]);
  const onSubmit = async (data) => {
    setCurrentAccount(data.address);
  };

  return (
    <>
      <Box bg="black" w="100%" p={4} color="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="address">Eth address</FormLabel>
            <Input
              ref={register}
              name="address"
              type="text"
              id="address"
              aria-describedby="address-helper-text"
              color="black"
            />
            <FormHelperText id="email-helper-text">
              Use eth address (or ENS eventually)
            </FormHelperText>
          </FormControl>
          <Button
            isLoading={loading}
            loadingText="Gifting"
            bg="transparent"
            border="1px"
            type="submit"
          >
            Look Up Account
          </Button>
        </form>
      </Box>
      <Box bg="black" w="100%" p={4} color="white">
        <Text>
          {currentAccount
            ? truncateAddr(currentAccount)
            : "No account selected"}
        </Text>
      </Box>
      {currentAccount && <Chievs account={currentAccount} />}
    </>
  );
};

export default Account;
