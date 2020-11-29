import React, {  useState } from "react";
import { Link } from "react-router-dom";
import {
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
import {
  useEns,
  useKudos,
  useTxProcessor,
  useUser,
} from "../contexts/DappContext";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Web3SignIn from "./Web3SignIn";

const Chiev = ({ token }) => {
  const [kudos] = useKudos();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [user] = useUser();
  const [ens] = useEns();
  const [loading, setLoading] = useState(false);
  const [ensAddr, setEnsAddr] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

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
      token["Gen0 Id"],
      1,
      token["Price In Wei"]
    );
    setLoading(true);

    const addr = ensAddr ? ensAddr : data.address;
    try {
      kudos.clone(
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
    if (!kudos) {
      return "?";
    }
    return kudos.displayPrice(price);
  };

  return (
    <>
      <HoverBox
        borderWidth="10px"
        overflow="hidden"
        bg="black"
        borderColor="black"
        boxShadow="0 0 15px 0 rgba(0,0,0,0.5)"
        as={Link}
        to={"#"}
        onClick={() => {
          onOpen();
        }}
      >
        <AspectRatioBox maxW="500px" ratio={1} overflow="hidden">
          <Image
            src={
              token["Display Thumb"]
                ? token["Display Thumb"][0].thumbnails.large.url
                : token["Image (from Artist Submissions)"][0].thumbnails.large
                    .url
            }
            alt={token["NFT Name (from Artist Submissions)"][0]}
            fallbackSrc="https://via.placeholder.com/300/000000/ffcc00?text=Loading..."
            onMouseOver={(e) => {
              if (!token["Display Thumb"]) {
                return;
              }
              e.currentTarget.src =
                token[
                  "Image (from Artist Submissions)"
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
        </AspectRatioBox>
        <InfoBox p={{ base: 6, xl: 2, "2xl": 6 }} w="100%" bg="brandYellow.900">
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
            Quantity:{" "}
            {token["Max Quantity (from Artist Submissions)"][0] || "?"}
          </Text>
 
        </InfoBox>
      </HoverBox>

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
            {token["NFT Name (from Artist Submissions)"] ? (
              <>
                <Heading>
                  {token["NFT Name (from Artist Submissions)"][0]}
                </Heading>
                <Text>
                  {token["NFT Name (from Artist Submissions)"][0]} price:{" "}
                  {displayPrice(token["Price In Wei"] || "0")} xDai{" "}
                </Text>
              </>
            ) : (
              <Text>Nothing Selected</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {token["Image (from Artist Submissions)"] && (
              <Image
                src={
                  token["Display Thumb"]
                    ? token["Display Thumb"][0].thumbnails.large.url
                    : token["Image (from Artist Submissions)"][0].thumbnails
                        .large.url
                }
                alt={token["NFT Name (from Artist Submissions)"][0]}
                fallbackSrc="https://via.placeholder.com/300/cc3385/000000?text=Loading..."
                onMouseOver={(e) => {
                  if (!token["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    token[
                      "Image (from Artist Submissions)"
                    ][0].thumbnails.large.url;
                }}
                onMouseOut={(e) => {
                  if (!token["Display Thumb"]) {
                    return;
                  }
                  e.currentTarget.src =
                    token["Display Thumb"][0].thumbnails.large.url;
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

export default Chiev;
