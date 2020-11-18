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
  Text,
} from "@chakra-ui/core";
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
        setCurrentAccount(addr);
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
    setLoading(true);
    const _addr = ensAddr ? ensAddr : data.address;
    history.push(`/account/${_addr}`);
    setCurrentAccount(_addr);
  };

  const loadMyAccount = async () => {
    setLoading(true);
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
          <Flex>
            <Button
              isLoading={loading}
              loadingText="Gifting"
              bg="transparent"
              border="1px"
              type="submit"
            >
              Look Up Account
            </Button>
            {user?.username && currentAccount !== user.username ? (
              <Button
                isLoading={loading}
                loadingText="Gifting"
                bg="transparent"
                border="1px"
                onClick={loadMyAccount}
              >
                Load My Account
              </Button>
            ) : null}
          </Flex>
        </form>
      </Box>
      <Box bg="brandPurple.900" w="100%" p={4} color="white">
        <Flex>
          {!loading && currentAccount ? (
            <AccountAvatar addr={currentAccount} />
          ) : (
            <Text>Loading...</Text>
          )}
        </Flex>
      </Box>
      {currentAccount && <Chievs account={currentAccount} />}
    </>
  );
};

export default Account;
