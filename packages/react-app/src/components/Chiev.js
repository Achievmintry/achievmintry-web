import React, { useEffect, useState } from "react";

import {
  Box,
  Image,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
} from "@chakra-ui/react";
import {
  useChainLogs,
  useEns,
  useKudos,
  useTxProcessor,
  useUser,
} from "../contexts/DappContext";
import { useForm } from "react-hook-form";
import Web3SignIn from "./Web3SignIn";

const Chiev = ({ token }) => {
  const [kudos] = useKudos();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [user] = useUser();
  const [ens] = useEns();
  const [chainLogs] = useChainLogs();
  const [nftCounts, setNftCounts] = useState({});
  const [gen0Ownership, setGen0Ownership] = useState({});
  const [uriJson, setUriJson] = useState();
  const [loading, setLoading] = useState(false);
  const [ensAddr, setEnsAddr] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const getKudsDetails = async (acctAddr) => {
      const acct = acctAddr.toLowerCase();
      console.log("new", acctAddr);
      const currentOwner = { [acct]: chainLogs.tokenData.currentOwners[acct] };
      console.log("currentOwner", currentOwner);
      if (!currentOwner) {
        setNftCounts({});
        setGen0Ownership({});
        return;
      }
      // const currentOwnerAndToken = { [acct]: [token["Gen0 Id"]] };
      // console.log("currentOwnerAndToken", currentOwnerAndToken);

      const counts = await kudos.service.getOwnedForAccount(currentOwner, acct);
      setNftCounts({ ...counts });

      const gen0Ownership = kudos.service.getGen0Owned(
        currentOwner,
        acct,
        counts
      );

      const uri = await kudos.service.getTokenUri(token["Gen0 Id"]);
      console.log("URI", uri);
      setUriJson(uri);

      setGen0Ownership({ ...gen0Ownership });
    };
    if (user?.username && chainLogs?.tokenData) {
      getKudsDetails(user.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kudos, chainLogs, user]);

  const txCallBack = (txHash, details) => {
    if (txProcessor && txHash) {
      txProcessor.setTx(txHash, user.username, details, true, false);
      txProcessor.forceUpdate = true;

      updateTxProcessor(txProcessor);
    }
    if (!txHash) {
      console.log("error: ", details);
      setLoading(false);
      setEnsAddr(null);
    }
  };

  const onSubmit = async (data) => {
    console.log(
      "clone",
      data.address,
      user.username,
      token["Gen0 Id"],
      1,
      token["Price In Wei"]
    );
    setLoading(true);

    const addr = ensAddr ? ensAddr : data.address;
    try {
      kudos.service.service.clone(
        addr,
        user.username,
        token["Gen0 Id"],
        1,
        token["Price In Wei"],
        txCallBack
      );
    } catch (err) {
      setLoading(false);
      setEnsAddr(null);
      console.log("error: ", err);
    }
  };

  const handleChange = async (e) => {
    if (e.target.value.indexOf(".eth") >= 0) {
      const address = await ens.provider.resolveName(e.target.value);
      console.log(address);
      setEnsAddr(address);
    } else {
      setEnsAddr(null);
    }
  };

  const displayPrice = (price) => {
    if (!kudos.service) {
      return "?";
    }
    return kudos.service.displayPrice(price);
  };

  return (
    <Box>
      <Box maxW="500px" ratio={1} overflow="hidden">
        <Image
          src={
            token["Display Thumb"]
              ? token["Display Thumb"][0].thumbnails.large.url
              : token["Image (from Artist Submissions)"][0].thumbnails.large.url
          }
          alt={token["NFT Name (from Artist Submissions)"][0]}
          fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
          onMouseOver={(e) => {
            if (!token["Display Thumb"]) {
              return;
            }
            e.currentTarget.src =
              token["Image (from Artist Submissions)"][0].thumbnails.large.url;
          }}
          onMouseOut={(e) => {
            if (!token["Display Thumb"]) {
              return;
            }
            e.currentTarget.src =
              token["Display Thumb"][0].thumbnails.large.url;
          }}
        />
      </Box>
      <Box p={{ base: 6, xl: 2, "2xl": 6 }} w="100%" bg="brandYellow.900">
        <Heading
          as="h3"
          fontSize={{ base: "md", xl: "xl" }}
          textTransform="uppercase"
          color="black"
        >
          {token["NFT Name (from Artist Submissions)"][0]}
        </Heading>
        <Text> Price: {displayPrice(token["Price In Wei"] || "0")} xDai</Text>
        <Text>
          {" "}
          Quantity: {token["Max Quantity (from Artist Submissions)"][0] || "?"}
        </Text>
      </Box>
      {user?.username && (
        <Box p={{ base: 6, xl: 2, "2xl": 6 }} w="100%" bg="brandYellow.900">
          <Text>Owned: {nftCounts[token["Gen0 Id"]]}</Text>
          <Text>
            Gen0 owned: {gen0Ownership[token["Gen0 Id"]] ? "yes" : "no"}
          </Text>
        </Box>
      )}
      {uriJson && (
        <Box p={{ base: 6, xl: 2, "2xl": 6 }} w="100%" bg="brandYellow.900">
          {uriJson?.attributes && uriJson?.attributes.map((attr, idx) => (
            <Text key={idx}>
              {attr.trait_type}:{attr.value}
            </Text>
          ))}
          <Text>name: {uriJson?.name || ""}</Text>
          <Text>description: {uriJson?.description || ""}</Text>
          <Text>external_url: {uriJson?.external_url || ""}</Text>
          <Text>image: {uriJson?.image || ""}</Text>
          <Text>thumbnail: {uriJson?.theme || ""}</Text>
          <Text>youtube_url: {uriJson?.youtube_url || ""}</Text>
          <Text>mp4: {uriJson?.mp4 || ""}</Text>
          <Text>theme_attributes: </Text>
          {uriJson?.theme_attributes && uriJson?.theme_attributes.map((attr, idx) => (
            <Text key={idx}>
              {attr.trait_type}:{attr.value}
            </Text>
          ))}
          <Button
              bg="black"
              color="brandYellow.900"
              border="1px"
            >
              Use Theme
            </Button>
        </Box>
      )}

      {loading && <Text>Check MetaMask</Text>}

      <Box pt="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="address">Eth address</FormLabel>
            <Input
              ref={register}
              name="address"
              type="text"
              id="address"
              aria-describedby="address-helper-text"
              readOnly={loading}
              onChange={handleChange}
            />
            <FormHelperText p="1" id="address-helper-text">
              {ensAddr ? `ENS: ${ensAddr}` : "Use ETH address or ENS"}
            </FormHelperText>
          </FormControl>
          {user?.username ? (
            <Button
              isLoading={loading}
              loadingText="Gifting"
              bg="black"
              color="brandYellow.900"
              border="1px"
              type="submit"
              disabled={loading}
            >
              Mint and Send
            </Button>
          ) : (
            <Web3SignIn />
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Chiev;
