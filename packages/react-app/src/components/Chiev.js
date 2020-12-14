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
  AspectRatio,
} from "@chakra-ui/react";
import {
  useChainLogs,
  useEns,
  useChievs,
  useTxProcessor,
  useUser,
} from "../contexts/DappContext";
import { useForm } from "react-hook-form";
import Web3SignIn from "./Web3SignIn";

import { useTheme } from "../contexts/CustomThemeContext";
import { NFTThemeService } from "../utils/NFTThemeService";

const Chiev = ({ token }) => {
  const [chievs] = useChievs();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [user] = useUser();
  const [ens] = useEns();
  const [chainLogs] = useChainLogs();
  const [nftCounts, setNftCounts] = useState({});
  const [gen0Ownership, setGen0Ownership] = useState({});
  const [uriJson, setUriJson] = useState();
  const [loading, setLoading] = useState(false);
  const [ensAddr, setEnsAddr] = useState("");
  // const theme = useTheme();
  const [, setTheme] = useTheme();

  const { register, handleSubmit } = useForm();

  const themeNFTService = new NFTThemeService();

  useEffect(() => {
    const getKudsDetails = async (acctAddr) => {
      const acct = acctAddr.toLowerCase();
      const currentOwner = { [acct]: chainLogs.tokenData.currentOwners[acct] };
      const usersTokens = chainLogs.tokenData.usersTokens;

      if (!currentOwner || !usersTokens) {
        setNftCounts({});
        setGen0Ownership({});
        return;
      }
      const userTokens = usersTokens.find(
        (token) => token.address.toLowerCase() === acct
      );
      if (!userTokens) {
        return;
      }
      const counts = {};
      userTokens.tokens.forEach((item, idx) => {
        counts[item.clonedFromId] = 1 + (counts[item.clonedFromId] || 0);
      });
      setNftCounts({ ...counts });

      const gen0Ownership = {};
      userTokens.tokens
        .filter((token) => token.type === "gen0")
        .forEach((token) => (gen0Ownership[token.tokenId] = true));

      setGen0Ownership({ ...gen0Ownership });
    };
    if (user?.username && chainLogs?.tokenData) {
      getKudsDetails(user.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chievs, chainLogs, user]);

  useEffect(() => {
    const getUri = async () => {
      const uri = await chievs.service.getTokenUri(token["Gen0 Id"]);
      setUriJson(uri);
    };

    getUri();
  }, [chievs, token]);

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
      chievs.service.clone(
        [addr],
        user.username,
        token["Gen0 Id"],
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
    if (!chievs.service) {
      return "?";
    }
    return chievs.service.displayPrice(price);
  };

  const isNA = () => {
    return (
      +chainLogs.cloneInWild[token["Gen0 Id"]] ===
        token["Max Quantity (from Artist Submissions) 2"][0]
    );
  };

  const handleClick = () => {
    const _theme = {};
    //_theme.bgImg = uriJson?.static_image || uriJson?.image;
    const bgImg = uriJson?.theme_attributes?.find(
      (item) => item.trait_type === "bgImg"
    );
    if (bgImg) {
      _theme.bgImg = uriJson?.theme_attributes.find(
        (item) => item.trait_type === "bgImg"
      ).value;
    }

    const primary = uriJson?.theme_attributes?.find(
      (item) => item.trait_type === "primary"
    );
    if (primary) {
      _theme.primary500 = uriJson?.theme_attributes.find(
        (item) => item.trait_type === "primary"
      ).value;
    }

    const secondary = uriJson?.theme_attributes?.find(
      (item) => item.trait_type === "secondary"
    );
    if (secondary) {
      _theme.secondary500 = uriJson?.theme_attributes.find(
        (item) => item.trait_type === "secondary"
      ).value;
    }
    console.log(_theme);

    const bg = uriJson?.theme_attributes?.find(
      (item) => item.trait_type === "bg"
    );
    if (bg) {
      _theme.bg500 = uriJson?.theme_attributes.find(
        (item) => item.trait_type === "bg"
      ).value;
    }
    const bgSize = uriJson?.theme_attributes?.find(
      (item) => item.trait_type === "bgSize"
    );
    if (bgSize) {
      _theme.bgSize = uriJson?.theme_attributes.find(
        (item) => item.trait_type === "bgSize"
      ).value;
    }
    themeNFTService.setUserTheme(
      { id: token["Gen0 Id"], name: uriJson?.name, themeAttributes: _theme },
      user.username
    );
    setTheme(_theme);
  };

  return (
    chainLogs?.cloneInWild ? (
      <>
        <Box
          borderWidth="10px"
          borderColor="black.500"
          borderRadius="0"
          maxW={{ base: "100%", lg: "66%" }}
          minW={{ base: "100%", lg: "66%" }}
          bg="secondary.300"
          d="flex"
          flexDir={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          justifyContent="left"
          mx="auto"
          boxShadow="0 0 15px rgba(0,0,0,0.5)"
        >
          <Box
            d="inline-flex"
            bg="black.500"
            w={{ base: "100%", sm: "33%", lg: "33%" }}
            minW="33%"
            flexGrow={0}
            alignItems="center"
          >
            <AspectRatio w="100%" ratio={1} overflow="hidden">
              <Image
                src={
                  token["Display Thumb"]
                    ? token["Display Thumb"][0].thumbnails.large.url
                    : token["Image (from Artist Submissions) 2"][0].thumbnails
                        .large.url
                }
                alt={token["NFT Name (from Artist Submissions) 2"][0]}
                fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
                onMouseOver={(e) => {
                  if (!token["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    token[
                      "Image (from Artist Submissions) 2"
                    ][0].thumbnails.large.url;
                }}
                onMouseOut={(e) => {
                  if (!token["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    token["Display Thumb"][0].thumbnails.large.url;
                }}
              />
            </AspectRatio>
          </Box>
          <Box
            p={{ base: 6, xl: 2, xxl: 6 }}
            w={{ base: "100%", sm: "66%", lg: "33%" }}
            minW={{ base: "100%", sm: "66%", lg: "33%" }}
            flexShrink={1}
            bg="secondary.300"
            fontSize={{ base: "sm", lg: "lg", xl: "xl" }}
          >
            <Heading as="h2" fontSize={{ base: "xl", xl: "2xl", xxl: "4xl" }}>
              {token["NFT Name (from Artist Submissions) 2"][0]}
            </Heading>
            <Text>
              {" "}
              Price: {displayPrice(token["Price In Wei"] || "0")} xDai
            </Text>
            <Text>
              {" "}
              Quantity:{" "}
              {token["Max Quantity (from Artist Submissions) 2"][0] || "0"}
            </Text>

            {user?.username && (
              <>
                <Text>Owned: {nftCounts[token["Gen0 Id"]] || 0}</Text>
                <Text>
                  Gen0 owned: {gen0Ownership[token["Gen0 Id"]] ? "yes" : "no"}
                </Text>
              </>
            )}
          </Box>
          {loading && <Text>Check MetaMask</Text>}
          {uriJson && (
            <Box
              p={{ base: 6, xl: 2, xxl: 6 }}
              w={{ base: "100%", sm: "100%", lg: "33%" }}
              fontSize={{ base: "sm", lg: "lg", xl: "xl" }}
            >
              {uriJson?.attributes &&
                uriJson?.attributes.map((attr, idx) => (
                  <Text key={idx}>
                    <strong>{attr.trait_type}:</strong> {attr.value}
                  </Text>
                ))}
              <Text>
                <strong>name:</strong> {uriJson?.name || ""}
              </Text>
              <Text>
                <strong>description:</strong> {uriJson?.description || ""}
              </Text>
              <Text>
                <strong>external_url:</strong> {uriJson?.external_url || ""}
              </Text>
              {/* <Text>
                <strong>image:</strong> {uriJson?.image || ""}
              </Text>
              <Text>
                <strong>thumbnail:</strong> {uriJson?.theme || ""}
              </Text>
              <Text>
                <strong>youtube_url:</strong>{" "}
                {uriJson?.youtube_url || uriJson?.youtube_video || ""}
              </Text>
              <Text>
                <strong>mp4:</strong> {uriJson?.mp4 || ""}
              </Text>
              <Text>
                <strong>theme_attributes:</strong>{" "}
              </Text>
              {uriJson?.theme_attributes &&
                uriJson?.theme_attributes.map((attr, idx) => (
                  <Text key={idx}>
                    {attr.trait_type}:{attr.value}
                  </Text>
                ))} */}
              {nftCounts[token["Gen0 Id"]] && (
                <Button
                  bg="white"
                  borderWidth="5px"
                  borderColor="black.500"
                  borderRadius="0"
                  mt={5}
                  onClick={handleClick}
                >
                  Use Theme
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Box
          pt="20px"
          alignSelf="center"
          justifySelf="center"
          bg="secondary.500"
          border="10px solid black"
          color="black"
          mx="auto"
          p={4}
          mt={10}
          w={{ base: "100%", lg: "33%" }}
          boxShadow="0 0 15px rgba(0,0,0,0.5)"
        >
          {token["Perm Token Id"] === 0 ? (
            <>
              <Heading
                as="h4"
                fontSize={{ base: "xl", xxl: "2xl" }}
                mb="1"
                textTransform="uppercase"
              >
                Send this CHIEV
              </Heading>
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
                    bg="primary.300"
                    borderWidth="5px"
                    borderColor="black.500"
                    borderRadius="0"
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
                    bg="white"
                    borderWidth="5px"
                    borderColor="black.500"
                    borderRadius="0"
                    type="submit"
                    disabled={loading || isNA()}
                  >
                    {isNA() ? "SOLD OUT" : "Mint and Send"}
                  </Button>
                ) : (
                  <Web3SignIn />
                )}
              </form>
            </>
          ) : (
            <Text>
              You must own token {"" + token["Perm Token Id"]} to mint this.
            </Text>
          )}
        </Box>
      </>
    ) : <Text>Loading...</Text>
  );
};

export default Chiev;
