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
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import {
  useKudos,
  useTxProcessor,
  useUser,
  useNFTApi,
} from "../contexts/DappContext";

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
          w="80%"
          h="10"
          bg="brandPink.900"
          rounded="lg"
          key={item.id}
          index={i}
        >
          <Image
            src={
              item["Image (from Artist Submissions)"][0].thumbnails.large.url
            }
            alt={item["NFT Name (from Artist Submissions)"][0]}
            fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
          />
          <Text>{item["NFT Name (from Artist Submissions)"][0]}</Text>
          <Text> price: {displayPrice(item["Price In Wei"] || "0")}</Text>
          <Text>
            {" "}
            quntity: {item["Max Quantity (from Artist Submissions)"][0] || "?"}
          </Text>

          {user && user.username ? (
            <Button
              bg="transparent"
              border="1px"
              onClick={() => {
                setSelected(item);
                onOpen();
              }}
            >
              Give
            </Button>
          ) : (
            <Text>sign in to give</Text>
          )}
        </Box>
      );
    });
  };

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {renderList()}
        {featured && (
          <Box w="80%" h="10" bg="brandPink.900" rounded="lg">
            <Link to="/chievs">More</Link>
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
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Chievs;
