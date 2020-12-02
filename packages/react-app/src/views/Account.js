import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEns, useUser } from "../contexts/DappContext";
import { Chievs, AccountAvatar } from "../components";

const Account = () => {
  const { register, handleSubmit } = useForm();
  const { addr } = useParams();
  const history = useHistory();
  const [user] = useUser();
  const [ens] = useEns();
  const [loading, setLoading] = useState(true);
  const [ensAddr, setEnsAddr] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    if (!user?.username) {
      if (addr) {
        history.push(`/account/${addr}`);
        setLoading(false);
        setCurrentAccount(addr);
      }
      if (!addr) {
        console.log("not logged in");
        setLoading(false);
        setCurrentAccount(null);
      }
      return;
    }
    if (!addr) {
      history.push(`/account/${user.username}`);
      setCurrentAccount(user.username);
    } else {
      history.push(`/account/${addr}`);
      setCurrentAccount(addr);
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [user, addr]);

  const onSubmit = async (data) => {
    const _addr = ensAddr ? ensAddr : data.address;
    console.log("foo");
    if (
      currentAccount &&
      _addr.toLowerCase() === currentAccount.toLowerCase()
    ) {
      return;
    }
    console.log("bar");

    setLoading(true);
    history.push(`/account/${_addr}`);
    setCurrentAccount(_addr);
  };

  const loadMyAccount = async () => {
    const _addr = user.username;
    history.push(`/account/${_addr}`);
    setCurrentAccount(_addr);
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
    <Box mx="auto" maxW="90vw" textAlign="left">
      <Box
        bg="secondary.500"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "33%" }}
        mx="auto"
        p={4}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl color="black">
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
          <Flex>
            <Button
              isLoading={loading}
              loadingText="Gifting"
              bg="black"
              color="secondary.500"
              border="0"
              type="submit"
            >
              Look Up Account
            </Button>
            {user?.username && currentAccount !== user.username ? (
              <Button
                isLoading={loading}
                loadingText="Gifting"
                bg="black"
                color="secondary.500"
                border="0"
                onClick={loadMyAccount}
              >
                Load My Account
              </Button>
            ) : null}
          </Flex>
        </form>
      </Box>
      <Box w="100%" p={4} color="black">
        <Flex>
          {!loading && currentAccount ? (
            <AccountAvatar addr={currentAccount} />
          ) : loading && !currentAccount ? (
            <Spinner />
          ) : null}
        </Flex>
      </Box>
      {currentAccount && <Chievs account={currentAccount} />}
    </Box>
  );
};

export default Account;
