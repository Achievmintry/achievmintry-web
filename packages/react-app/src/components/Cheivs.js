import React, { useEffect, useState } from "react";
import metaList from "../data/metaList.json";

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
import { useKudos, useUser } from "../contexts/DappContext";

const Cheivs = ({ featured }) => {
  const [selected, setSelected] = useState(1);
  const [kudos] = useKudos();
  const [user] = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const getKudo = async () => {
      console.log("🚨🚨🚨🚨🚨", metaList, kudos);

      const kudo = await kudos.getKudosById(1);

      console.log("🚨🚨🚨🚨🚨", kudo);
    };
    if (kudos) {
      getKudo();
    }
  }, [kudos]);

  const onSubmit = async (data) => {

    try {
      await kudos.clone(
        data.address,
        user.username,
        selected.id,
        1,
        selected.price
      );
    } catch (err) {
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
    console.log("metaList", metaList, featured);
    return metaList
      .filter((item) => item.featured === featured)
      .map((item, i) => {
        console.log(item);
        return (
          <Box
            w="100%"
            h="10"
            bg="brandPink.900"
            rounded="lg"
            key={item.id}
            index={i}
          >
            <Image
              src={item.meta.image}
              alt={item.meta.name}
              fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
            />
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
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selected.name} price: {displayPrice(selected.price || "0")} xDai
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel htmlFor="address">Eth address</FormLabel>
                <Input
                  ref={register}
                  name="address"
                  type="text"
                  id="address"
                  aria-describedby="address-helper-text"
                />
                <FormHelperText id="email-helper-text">
                  Use eth address (or ENS eventually)
                </FormHelperText>
              </FormControl>
              <Button
                isLoading={false}
                loadingText="Gifting"
                bg="transparent"
                border="1px"
                type="submit"
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

export default Cheivs;
