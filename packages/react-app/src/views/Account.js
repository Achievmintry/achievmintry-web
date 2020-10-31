import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useUser } from "../contexts/DappContext";
import { Chievs } from "../components";

const Account = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useUser();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
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
      {user?.username && <Chievs account={user.username} />}
    </>
  );
};

export default Account;
