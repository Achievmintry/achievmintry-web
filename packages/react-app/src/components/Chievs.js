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
  AspectRatioBox,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import {
  useKudos,
  useTxProcessor,
  useUser,
  useNFTApi,
  useEns,
  useChainLogs,
} from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";

const HoverBox = styled(Box)`
  position: relative;
  cursor: pointer;
  z-index: 0;
  transition: box-shadow 0.3s ease-in-out;

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
      background-color: #ffcc00;
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
  const [kudos] = useKudos();
  const [user] = useUser();
  const [nfts] = useNFTApi();
  const [ens] = useEns();
  const [chainLogs] = useChainLogs();
  const [txProcessor, updateTxProcessor] = useTxProcessor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();


  useEffect(() => {
    const getKudsDetails = async (acctAddr) => {
      const acct = acctAddr.toLowerCase();
      console.log('new', acctAddr);
      if (!chainLogs.tokenData.currentOwners[acct]) {
        setNftCounts({});
        setGen0Ownership({});
        return;
      }

      const counts = await kudos.service.getOwnedForAccount(
        chainLogs.tokenData.currentOwners,
        acct
      );
      setNftCounts({ ...counts });

      const gen0Ownership = kudos.service.getGen0Owned(
        chainLogs.tokenData.currentOwners,
        acct,
        counts
      );

      setGen0Ownership({ ...gen0Ownership });
    };
    if (account && chainLogs?.tokenData) {
      getKudsDetails(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kudos, chainLogs, account]);

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
      data.address,
      user.username,
      selected["Gen0 Id"],
      1,
      selected["Price In Wei"]
    );
    setLoading(true);

    const addr = ensAddr ? ensAddr : data.address;
    try {
      kudos.service.clone(
        addr,
        user.username,
        selected["Gen0 Id"],
        1,
        selected["Price In Wei"],
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
    if (!kudos?.service) {
      return "?";
    }
    return kudos.service.displayPrice(price);
  };

  const renderList = () => {
    let filteredList = [];
    // TODO: data from airtable is gnarly
    const metaList = nfts.map((item) => item.fields);
    if (featured) {
      filteredList = metaList.filter((item) => item["Featured"]);
    } else {
      filteredList = metaList;
    }
    if (account) {
      filteredList = filteredList.filter(
        (item) => nftCounts[item["Gen0 Id"]] > 0
      );
    }
    if (dao) {
      filteredList = filteredList.filter(
        (item) => item["Community (from Artist Submissions)"][0] === dao
      );
    }
    if (!filteredList.length) {
      return <Text>Nothing here</Text>;
    }
    return filteredList.map((item, i) => {
      return (
        <HoverBox
          borderWidth="10px"
          overflow="hidden"
          bg="black"
          borderColor="black"
          boxShadow="0 0 15px 0 rgba(0,0,0,0.5)"
          key={item.id}
          index={i}
          as={Link}
          to={"#"}
          onClick={() => {
            setSelected(item);
            onOpen();
          }}
        >
          <AspectRatioBox maxW="500px" ratio={1} overflow="hidden">
            <Image
              src={
                item["Display Thumb"]
                  ? item["Display Thumb"][0].thumbnails.large.url
                  : item["Image (from Artist Submissions)"][0].thumbnails.large
                      .url
              }
              alt={item["NFT Name (from Artist Submissions)"][0]}
              fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
              onMouseOver={(e) => {
                if (!item["Display Thumb"]) {
                  return;
                }
                e.currentTarget.src =
                  item[
                    "Image (from Artist Submissions)"
                  ][0].thumbnails.large.url;
              }}
              onMouseOut={(e) => {
                if (!item["Display Thumb"]) {
                  return;
                }
                e.currentTarget.src =
                  item["Display Thumb"][0].thumbnails.large.url;
              }}
            />
          </AspectRatioBox>
          <InfoBox
            p={{ base: 6, xl: 2, "2xl": 6 }}
            w="100%"
            bg="brandYellow.900"
          >
            <Heading
              as="h3"
              fontSize={{ base: "md", xl: "xl" }}
              textTransform="uppercase"
              color="black"
            >
              {item["NFT Name (from Artist Submissions)"][0]}
            </Heading>
            <Text>
              {" "}
              Price: {displayPrice(item["Price In Wei"] || "0")} xDai
            </Text>
            <Text>
              {" "}
              Quantity:{" "}
              {item["Max Quantity (from Artist Submissions)"][0] || "?"}
            </Text>
            {+item["Gen0 Id"] && chainLogs.cloneInWild && (
              <Text>
                Minted: {chainLogs.cloneInWild[item["Gen0 Id"]]}{" "}
                {+chainLogs.cloneInWild[item["Gen0 Id"]] ===
                  item["Max Quantity (from Artist Submissions)"][0] &&
                  "SOLD OUT"}
              </Text>
            )}
            {account && (
              <Box>
                <Text>Owned: {nftCounts[item["Gen0 Id"]]}</Text>
                <Text>
                  Gen0 owned: {gen0Ownership[item["Gen0 Id"]] ? "yes" : "no"}
                </Text>
              </Box>
            )}
          </InfoBox>
        </HoverBox>
      );
    });
  };

  return (
    <>
      <Box p={[2, 4, 6]}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl  ", xl: "4xl" }}
          mb="1"
          textTransform="uppercase"
        >
          {dao && dao} Talisman
        </Heading>
        <Text fontSize={{ base: "md", xl: "2xl" }} mb="8">
          Give a talisman of your appreciation
        </Text>
        <SimpleGrid
          columns={{ sm: 1, md: 2, xl: 4 }}
          spacing={{ base: 5, lg: 10, "2xl": 20 }}
        >
          {renderList()}
          {featured && (
            <HoverBox
              as={Link}
              to="/chievs"
              borderWidth="10px"
              overflow="hidden"
              bg="black"
              color="brandYellow.900"
              borderColor="black"
              boxShadow="0 0 15px rgba(0,0,0,0.5)"
              className="hoverbox__featured"
              p={{ base: 6, xl: 2, "2xl": 6 }}
            >
              <InfoBox className="info-box">
                <Heading as="h3" size="lg">
                  Browse More
                </Heading>
                <Text>Click here to see the full list</Text>
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
          bg="brandYellow.900"
          border="10px solid black"
        >
          <ModalHeader>
            {selected["NFT Name (from Artist Submissions)"] ? (
              <>
                <Heading>
                  {selected["NFT Name (from Artist Submissions)"][0]}
                </Heading>
                <Text>
                  {selected["NFT Name (from Artist Submissions)"][0]} price:{" "}
                  {displayPrice(selected["Price In Wei"] || "0")} xDai{" "}
                </Text>
              </>
            ) : (
              <Text>Nothing Selected</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected["Image (from Artist Submissions)"] && (
              <Image
                src={
                  selected["Display Thumb"]
                    ? selected["Display Thumb"][0].thumbnails.large.url
                    : selected["Image (from Artist Submissions)"][0].thumbnails
                        .large.url
                }
                alt={selected["NFT Name (from Artist Submissions)"][0]}
                fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
                onMouseOver={(e) => {
                  if (!selected["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    selected[
                      "Image (from Artist Submissions)"
                    ][0].thumbnails.large.url;
                }}
                onMouseOut={(e) => {
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chievs;
