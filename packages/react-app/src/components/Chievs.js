import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import metaList from "../data/metaList.json";

import {
  Grid,
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
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import {
  useKudos,
  useTxProcessor,
  useUser,
  useNFTApi,
  useUserWallet,
} from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";

const Chievs = ({ featured, account }) => {
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nftCounts, setNftCounts] = useState({});
  const [gen0Ownership, setGen0Ownership] = useState({});
  const [kudos] = useKudos();
  const [user] = useUser();
  const [userWallet] = useUserWallet();
  const [nfts] = useNFTApi();
  const [txProcessor, updateTxProcessor] = useTxProcessor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    //TODO: eesh, make a subgraph and add more events
    const getKudsDetails = async (acct) => {
      const promises = [];
      const nfts = [];

      // get only nfts where *account* is owner
      // get onchain data
      if(!kudos.tokenData.currentOwners[acct]){
        setNftCounts({});
        setGen0Ownership({})
        return
      }
      kudos.tokenData.currentOwners[acct].map((item) => {
        promises.push(kudos.getKudosById(item));
      });
      const nftData = await Promise.all(promises);
      // get details of all *acct* owned tokens and flag if gen0
      kudos.tokenData.currentOwners[acct].map((item, idx) => {
        const kudo = {
          tokenId: item,
          gen0: nftData[idx].clonedFromId === item,
          clonedFromId: nftData[idx].clonedFromId,
          count: 0,
        };
        nfts.push(kudo);
      });
      // for each unique owned nft get count
      var counts = {};
      nfts.forEach((item, idx) => {
        counts[item.clonedFromId] = 1 + (counts[nfts[idx].clonedFromId] || 0);
      });
      setNftCounts({...counts});
      // for each count find index and add count to owned nfts
      // counts could be gen0
      Object.keys(counts).forEach((countItem) => {
        const index = kudos.tokenData.currentOwners[acct].findIndex((item) => {
          return item === countItem;
        });

        if (index > -1) {
          gen0Ownership[countItem] = true;
        } else {
          gen0Ownership[countItem] = false;
        }
      });
      setGen0Ownership({...gen0Ownership});

    };
    if (account && kudos?.tokenData) {
      getKudsDetails(account);
    }
  }, [kudos?.tokenData, account]);

  const filterForAccount = () => {
    // stub
  };

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
    try {
      kudos.clone(
        data.address,
        user.username,
        selected["Gen0 Id"],
        1,
        selected["Price In Wei"],
        txCallBack
      );
    } catch (err) {
      setLoading(false);
      console.log("error: ", err);
    }
  };

  const displayPrice = (price) => {
    if (!kudos) {
      return "?";
    }
    return kudos.displayPrice(price);
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
    // TODO: filter for account
    return filteredList.map((item, i) => {
      return (
        <Box
          maxW="18rem"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          borderColor="brandPink.900"
          key={item.id}
          index={i}
          as={Link}
          to={"#"}
          onClick={() => {
            setSelected(item);
            onOpen();
          }}
        >
          <Image
            src={
              item["Display Thumb"]
                ? item["Display Thumb"][0].thumbnails.large.url
                : item["Image (from Artist Submissions)"][0].thumbnails.large
                    .url
            }
            alt={item["NFT Name (from Artist Submissions)"][0]}
            fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
            onMouseOver={(e) => {
              if (!item["Display Thumb"]) {
                return;
              }
              e.currentTarget.src =
                item["Image (from Artist Submissions)"][0].thumbnails.large.url;
            }}
            onMouseOut={(e) => {
              if (!item["Display Thumb"]) {
                return;
              }
              e.currentTarget.src =
                item["Display Thumb"][0].thumbnails.large.url;
            }}
          />
          <Box p="6">
            <Heading as="h3" size="lg">
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
          </Box>
          {account && (
            <Box p="6">
              <Text>own: {nftCounts[item["Gen0 Id"]]}</Text>
              <Text>
                own gen0: {gen0Ownership[item["Gen0 Id"]] ? "yes" : "no"}
              </Text>
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} p="6">
        {renderList()}
        {featured && (
          <Box
            as={Link}
            to="/chievs"
            maxW="18rem"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            borderColor="brandPink.900"
            p="6"
          >
            <Box>
              <Heading as="h3" size="lg">
                More to Come
              </Heading>
              <Text>Click here to see the full list</Text>
            </Box>
          </Box>
        )}
      </Grid>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setLoading(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selected["NFT Name (from Artist Submissions)"] ? (
              <Text>
                {selected["NFT Name (from Artist Submissions)"][0]} price:{" "}
                {displayPrice(selected["Price In Wei"] || "0")} xDai{" "}
              </Text>
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
              />
            )}
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
                  readOnly={loading}
                />
                <FormHelperText id="email-helper-text">
                  Use eth address (or ENS eventually)
                </FormHelperText>
              </FormControl>
              {user?.username ? (
                <Button
                  isLoading={loading}
                  loadingText="Gifting"
                  bg="transparent"
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Chievs;
