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
  Link,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useEns, useUser } from "../contexts/DappContext";
import { Chievs, EthAddressDisplay } from "../components";

import { FaTwitter } from "react-icons/fa";

const Account = () => {
  const { register, handleSubmit } = useForm();
  let { addr } = useParams();
  const history = useHistory();
  const [user] = useUser();
  const [ens] = useEns();
  const [loading] = useState(false);
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
    // eslint-disable-next-line
  }, [user, addr]);

  const onSubmit = async (data) => {
    const _addr = ensAddr ? ensAddr : data.address;
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
      <Box bg="black" w="100%" p={4} color="white">
        <Flex>
          <EthAddressDisplay address={currentAccount} />

          {currentAccount && (
            <Link
              colorScheme="twitter"
              href={`https://twitter.com/intent/tweet?text=We%20Be%20Chievn%20${window.location.href}`}
              isExternal={true}
              ml={2}
            >
              <FaTwitter />
            </Link>
          )}
        </Flex>
      </Box>
      {currentAccount && <Chievs account={currentAccount} />}
    </>
  );
};

export default Account;
