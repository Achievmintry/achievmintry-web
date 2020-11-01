import React, { useState } from "react";
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
} from "../contexts/DappContext";
import Web3SignIn from "./Web3SignIn";

const Chievs = ({ featured, account }) => {
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [kudos] = useKudos();
  const [user] = useUser();
  const [nfts] = useNFTApi();
  const [txProcessor, updateTxProcessor] = useTxProcessor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

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

  const KudoImage = ({ item }) => {
    return (
      item && (
        <Image
          src={
            item["Display Thumb"]
              ? item["Display Thumb"][0].thumbnails.large.url
              : item["Image (from Artist Submissions)"][0].thumbnails.large.url
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
            e.currentTarget.src = item["Display Thumb"][0].thumbnails.large.url;
          }}
        />
      )
    );
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
            <Text>{item["NFT Name (from Artist Submissions)"][0]}</Text>
            <Text> price: {displayPrice(item["Price In Wei"] || "0")}</Text>
            <Text>
              {" "}
              quntity:{" "}
              {item["Max Quantity (from Artist Submissions)"][0] || "?"}
            </Text>
          </Box>
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
            <Text>More</Text>
          </Box>
        )}
      </Grid>
      <Box p="6">
        <Heading>NFT Artists</Heading>
        <Text>
          Submit your work To own a Gen0 NFT and get a % of all sales.
        </Text>
        <Button bg="transparent" border="1px" as={Link} to="/submissions">
          Submissions
        </Button>
      </Box>

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
            <KudoImage item={selected} />
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
