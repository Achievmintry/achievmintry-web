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
  Heading,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEns, useUser } from "../contexts/DappContext";
import { Chievs, AccountAvatar, ProfileStatus, UpDoot, ChievStream } from "../components";
import { RiUserFollowLine } from "react-icons/ri";

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
    <Box
      mx="auto"
      maxW="90vw"
      textAlign="left"
      padding={{ base: "50px 0", xl: "90px 0" }}
    >
      <Box
        bg="secondary.500"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "33%" }}
        mx="auto"
        p={4}
      >
        <Heading
          as="h2"
          fontSize={{ base: "xl", xxl: "2xl" }}
          mb="1"
          textTransform="uppercase"
        >
          Lookup Another Account
        </Heading>
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
              bg="primary.300"
              borderWidth="5px"
              borderColor="black.500"
              borderRadius="0"
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
              bg="white"
              borderWidth="5px"
              borderColor="black.500"
              borderRadius="0"
              type="submit"
            >
              Look Up Account
            </Button>
            {user?.username && currentAccount !== user.username ? (
              <Button
                isLoading={loading}
                loadingText="Gifting"
                bg="primary.500"
                borderWidth="5px"
                borderColor="black.500"
                borderRadius="0"
                onClick={loadMyAccount}
              >
                Load My Account
              </Button>
            ) : null}
          </Flex>
        </form>
      </Box>
      <Box
        bg="secondary.500"
        border="10px solid black"
        color="black"
        w="100%"
        mx="auto"
        p={4}
        m={4}
      >
        <Flex>
          {!loading && currentAccount ? (
            <>
              <AccountAvatar addr={currentAccount} size={"xl"} />
            </>
          ) : loading && !currentAccount ? (
            <Spinner />
          ) : null}
        </Flex>
        <ProfileStatus addr={currentAccount} />
        {user?.username && currentAccount !== user.username && (
          <UpDoot dooter={currentAccount} />
        )}
        {user?.username && currentAccount !== user.username && (
          <Tooltip
            label="Follow (coming Soon)"
            aria-label="update status button"
          >
            <Button>
              <RiUserFollowLine />
            </Button>
          </Tooltip>
        )}
      </Box>
      <Tabs isFitted>
        <TabList
          border="10px solid black"
          color="black"
          bg="secondary.500"
          w="100%"
          mx="auto"
          m={4}
        >
          <Tab
            _selected={{
              borderColor: "primary.900",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Talismans
          </Tab>
          <Tab
            _selected={{
              borderColor: "primary.900",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Chiev Stream
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {currentAccount && <Chievs account={currentAccount} />}
          </TabPanel>
          <TabPanel>
            {currentAccount && <ChievStream addr={currentAccount} limit={20} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Account;
