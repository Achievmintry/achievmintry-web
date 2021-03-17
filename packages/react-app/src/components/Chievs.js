import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
// import { motion } from "framer-motion";

//import metaList from "../data/metaList.json";

import {
  SimpleGrid,
  Box,
  Image,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
  Input,
  Heading,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  useChievs,
  useTxProcessor,
  useUser,
  useNFTApi,
  useEns,
  useChainLogs,
} from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";
import { ChievCard } from ".";
import { useTheme } from "../contexts/CustomThemeContext";

const HoverBox = styled(Box)`
  position: relative;
  cursor: pointer;
  z-index: 0;
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;

  .info-box {
      flex: 1 0 auto;
  }
  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  }
  &.hoverbox__featured {
    &::after {
      position: absolute;
      opacity: 1;
      content: "";
      display: block;
      /* background: black; */
      border-right: 10px solid;
      background-color: ${props => {
        return props._hover?.themecolor;
      }};
      width: 200%;
      height: 200%;
      top: 80%;
      right: 30px;
      z-index: 1;
      transform: rotate(45deg);
    }

    .info-box {
      position: relative;
      z-index: 20;
    }
  }
`;
const InfoBox = styled(Box)``;

const Chievs = ({ featured, account, dao, cols }) => {
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nftCounts, setNftCounts] = useState({});
  const [gen0Ownership, setGen0Ownership] = useState({});
  const [ensAddr, setEnsAddr] = useState("");
  const [chievs] = useChievs();
  const [user] = useUser();
  const [nfts] = useNFTApi();
  const [ens] = useEns();
  const [chainLogs] = useChainLogs();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
    const [theme] = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const getKudsDetails = async (acctAddr) => {
      const acct = acctAddr.toLowerCase();
      const usersTokens = chainLogs.tokenData.usersTokens;
      if (!chainLogs.tokenData.currentOwners[acct]) {
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
    if (account && chainLogs?.tokenData) {
      getKudsDetails(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chievs, chainLogs, account]);

  const txCallBack = (txHash, details) => {
    if (txProcessor && txHash) {
      txProcessor.setTx(txHash, user.username, details, true, false);
      txProcessor.forceUpdate = true;

      updateTxProcessor(txProcessor);
      onClose();
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
      data );
    setLoading(true);

    const addr = ensAddr ? ensAddr : data.address;
    try {
      chievs.service.clone(
        [addr],
        user.username,
        selected["Gen0 Id"],
        selected["Price In Wei"],
        txCallBack,
        data.detail
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
    if (!chievs?.service) {
      return "?";
    }
    return chievs.service.displayPrice(price);
  };

  const isNA = () => {
    if (
      !chainLogs.cloneInWild ||
      !selected["Max Quantity (from Artist Submissions) 2"]
    ) {
      return false;
    }
    return (
      +chainLogs.cloneInWild[selected["Gen0 Id"]] ===
      selected["Max Quantity (from Artist Submissions) 2"][0]
    );
  };

  const renderList = () => {
    let filteredList = [];

    const metaList = nfts
    .map(item => item.fields)
    .filter(item => !item["Hide"]);
    if (featured) {
    filteredList = metaList.filter(
        item => item["Featured"] && !item["Hide"]
    );
    } else {
    filteredList = metaList;
    }
    if (account) {
    filteredList = filteredList.filter(
        item => nftCounts[item["Gen0 Id"]] > 0
    );
    }
    if (dao) {
    filteredList = filteredList.filter(
        item =>
        item[
            "Community (from Artist Submissions) 2"
        ][0] === dao
    );
    }
    if (!filteredList.length) {
    return <Text>Nothing here</Text>;
    }
    return filteredList.map((token, i) => {

    return (
        <HoverBox
        key={token.id}
        onClick={() => {
            setSelected(token);
            onOpen();
        }}
        borderWidth="10px"
        overflow="hidden"
        bg="black.500"
        borderColor="black.500"
        boxShadow="0 0 15px 0 rgba(0,0,0,0.5)"
        >
        <ChievCard
            token={token}
            owned={nftCounts[token["Gen0 Id"]]}
            gen0Ownership={
            gen0Ownership[token["Gen0 Id"]]
                ? "yes"
                : "no"
            }
            account={account}
            displayPrice={displayPrice(
            token["Price In Wei"] || "0"
            )}
            hasMedia={
            token[
                "video (from Artist Submissions) 2"
            ] &&
            token[
                "video (from Artist Submissions) 2"
            ][0].length > 0
                ? true
                : false
            }
        />
        </HoverBox>
    );
    });
};

  return (
    <>
      <Box p={[2, 4, 6]}>
        {!account && (
          <Box

               bgColor="primary.300"
               border="10px solid black"

                  color="black.900"

            p="25px"

               display="inline-block"

                  mb={8}

          >
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl", xxl: "4xl" }}
              mb="1"
              textTransform="uppercase"
            >
              {dao && dao} Talisman
            </Heading>
            <Text fontSize={{ base: "md", xl: "xl", xxl: "2xl" }} mb="0">
              Give a talisman of your appreciation
            </Text>
          </Box>
        )}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 10, lg: 10, xxl: 20 }}
        >
          {nfts && chievs && chainLogs && renderList()}
          {featured && (
            <HoverBox
              as={Link}
              to="/chievs"
              borderWidth="10px"
              overflow="hidden"
              bg="black.500"
              color="secondary.500"
              borderColor="black.500"
              boxShadow="0 0 15px rgba(0,0,0,0.5)"
              className="hoverbox__featured"
              p={{ base: 3, xl: 4, xxl: 6 }}
              _hover={{
                themecolor: theme.colors.secondary[500]
              }}
            >
              <InfoBox className="info-box">
                <Heading
                  as="h3"
                  fontSize={{ base: "md", xl: "lg", xxl: "2xl" }}
                >
                  Browse More
                </Heading>
                <Text fontSize={{ base: "sm", lg: "md", xxl: "lg" }}>
                  Click here to see the full list
                </Text>
              </InfoBox>
            </HoverBox>
          )}
        </SimpleGrid>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setLoading(false);
          setEnsAddr(null);
          onClose();
        }}
      >
        <ModalOverlay zIndex={400} />
        <ModalContent
          zIndex={500}
          p={{ base: 10, xl: 25 }}
          bg="secondary.500"
          border="10px solid black"
          borderRadius="0"
          minWidth={{ base: "33%", xxl: "33%" }}
        >
          <ModalHeader>
            {selected["NFT Name (from Artist Submissions) 2"] ? (
              <>
                <Heading>
                  {selected["NFT Name (from Artist Submissions) 2"][0]}
                </Heading>
                <Text>
                  {selected["NFT Name (from Artist Submissions) 2"][0]} price:{" "}
                  {displayPrice(selected["Price In Wei"] || "0")} xDai{" "}
                </Text>
              </>
            ) : (
              <Text>Nothing Selected</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected["Image (from Artist Submissions) 2"] && (
              <Image
                src={
                  selected["Display Thumb"]
                    ? selected["Display Thumb"][0].thumbnails.large.url
                    : selected["Image (from Artist Submissions) 2"][0]
                        .thumbnails.large.url
                }
                alt={selected["NFT Name (from Artist Submissions) 2"][0]}
                fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
                onMouseOver={e => {
                  if (!selected["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    selected[
                      "Image (from Artist Submissions) 2"
                    ][0].thumbnails.large.url;
                }}
                onMouseOut={e => {
                  if (!selected["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    selected["Display Thumb"][0].thumbnails.large.url;
                }}
                width="100%"
                height="auto"
              />
            )}

            {chainLogs?.cloneInWild ? (
              <Box pt="20px">
                {loading && <Text>Check MetaMask</Text>}
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
                    <FormHelperText p="1" m="0" id="address-helper-text" color="black">
                      {ensAddr ? `ENS: ${ensAddr}` : "Use ETH address or ENS"}
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="detail">Reason</FormLabel>
                    <Textarea
                      ref={register({ maxLength: 128 })}
                      name="detail"
                      aria-describedby="detail-helper-text"
                      color="black"
                      bg="primary.300"
                      borderWidth="5px"
                      borderColor="black.500"
                      borderRadius="0"
                      readOnly={loading}
                    />

                    {errors.detail === "maxLength" && (
                      <FormErrorMessage>
                        Your input exceed maxLength
                      </FormErrorMessage>
                    )}

                    <FormHelperText p="1" m="0" id="detail-helper-text" color="black">
                      Short reason for the Chiev ( up to 128 chars)
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
              </Box>
            ) : (
              <Text>Loading...</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chievs;
