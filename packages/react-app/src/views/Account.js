import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useEns, useUser } from "../contexts/DappContext";
import { Chievs, EthAddressDisplay } from "../components";

const Account = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useUser();
  const [ens] = useEns();
  const [loading] = useState(false);
  const [ensAddr, setEnsAddr] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    if (!user?.username) {
      return;
    }
    setCurrentAccount(user.username);
  }, [user]);

  const onSubmit = async (data) => {
    const addr = ensAddr ? ensAddr : data.address;
    setCurrentAccount(addr);
  };

  const handleChange = async (e) => {
    if (e.target.value.indexOf(".eth") >= 0) {
      const address = await ens.provider.resolveName(e.target.value);
      setEnsAddr(address);
    } else {
      setEnsAddr(null);
    }
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
              onChange={handleChange}
              required
            />
            <FormHelperText p="1" id="email-helper-text">
              {ensAddr ? `ENS: ${ensAddr}` : "Use ETH address or ENS"}
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
        <EthAddressDisplay address={currentAccount} />
      </Box>
      {currentAccount && <Chievs account={currentAccount} />}
    </>
  );
};

export default Account;
