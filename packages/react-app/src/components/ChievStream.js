import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";

import {
  Text,
  Box,
  Heading,
  Link,
  Avatar,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useChainLogs, useNFTApi, useUser } from "../contexts/DappContext";
import { FaArrowRight, FaReply, FaThumbsUp, FaTrophy } from "react-icons/fa";
import { RiChat4Fill } from "react-icons/ri";
import AccountAvatar from "./AccountAvatar";

const UPDOOT_TOKEN = { id: "17", price: "100000000000000000" };
const STATUS_TOKEN = { id: "25", price: "100000000000000000" };

const ChievStream = ({ addr, limit }) => {
  const [currentStream, setCurrentStream] = useState([]);
  const [user] = useUser();
  const [nfts] = useNFTApi();
  const [chainLogs] = useChainLogs();

  useEffect(() => {
    if (!chainLogs?.tokenData) {
      return;
    }
    let _stream = [];
    // console.log("addr", addr);
    if (addr) {
      _stream = chainLogs.tokenData.allTokens
        .filter(
          (t) =>
            t.type === "clone" &&
            t.receiver &&
            t.sender &&
            addr &&
            (t.receiver.toLowerCase() === addr.toLowerCase() ||
              t.sender.toLowerCase() === addr.toLowerCase())
        )
        .sort((a, b) => b.blockNumber - a.blockNumber)
        .slice(0, limit || 20);
    } else {
      _stream = chainLogs.tokenData.allTokens
        .filter((t) => t.type === "clone" && t.receiver && t.sender)
        .sort((a, b) => b.blockNumber - a.blockNumber)
        .slice(0, limit || 40);
    }
    if (_stream[0]) {
      setCurrentStream(_stream);
    } else {
      setCurrentStream(null);
    }
  }, [chainLogs, addr, user, limit]);

  const getTokenImageUrl = (id) => {
    const selected = nfts.find((nft) => +nft.fields["Gen0 Id"] === +id);

    if (!selected) {
      return "";
    }

    return selected.fields["Image (from Artist Submissions) 2"][0].thumbnails
      .small.url;
  };

  return (
    <>
      <Box
        bg="primary.200"
        border="10px solid black"
        color="black"
        w={{ base: "100%", lg: "50%" }}
        mx="auto"
        p={4}
        mb={4}
      >
        <Heading as="h4">Current Events</Heading>
        <Link as={ReactLink} to={`/top`}>
          Top Chievers
        </Link>
        {currentStream ? (
          <Stack spacing={2}>
            {currentStream.map((token) => {
              if (+token.clonedFromId === +UPDOOT_TOKEN.id) {
                return (
                  <Stack
                    spacing={2}
                    bg="secondary.200"
                    border="10px solid black"
                    key={token.tokenId}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <FaThumbsUp p={0} />
                      <Flex
                        justifyContent="flex-end"
                        alignItems="center"
                        p={1}
                        width="30%"
                      >
                        <AccountAvatar
                          size="xs"
                          addr={token.sender}
                          hideTweet={true}
                        />
                      </Flex>
                    </Flex>
                    <Flex pl={2}>
                      {token.details.indexOf("0x") === 0 ? (
                        <AccountAvatar addr={token.details} hideTweet={true} />
                      ) : (
                        <Link as={ReactLink} to={`/chiev/${token.details}`}>
                          <Avatar src={getTokenImageUrl(token.details)} />
                        </Link>
                      )}
                    </Flex>
                    <Flex
                      p={0}
                      pl={1}
                      pr={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text>Block: {token.blockNumber}</Text>

                      <FaThumbsUp p={1} />
                      <FaReply p={1} />
                    </Flex>
                  </Stack>
                );
              } else if (+token.clonedFromId === +STATUS_TOKEN.id) {
                return (
                  <Stack
                    spacing={2}
                    bg="secondary.200"
                    border="10px solid black"
                    key={token.tokenId}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <RiChat4Fill p={0} />
                      <Flex
                        justifyContent="flex-end"
                        alignItems="center"
                        p={0}
                        width="30%"
                      >
                        <AccountAvatar
                          size="xs"
                          addr={token.sender}
                          hideTweet={true}
                        />
                      </Flex>
                    </Flex>
                    <Flex pl={2}>
                      <AccountAvatar addr={token.sender} hideTweet={true} />
                      <Text pl={6}>{token.details}</Text>
                    </Flex>
                    <Flex
                      p={0}
                      pl={1}
                      pr={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text>Block: {token.blockNumber}</Text>

                      <FaThumbsUp p={1} />
                      <FaReply p={1} />
                    </Flex>
                  </Stack>
                );
              } else {
                return (
                  <Stack
                    spacing={2}
                    bg="secondary.200"
                    border="10px solid black"
                    key={token.tokenId}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <FaTrophy p={0} />
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        p={0}
                      >
                        <AccountAvatar
                          size="xs"
                          addr={token.sender}
                          hideTweet={true}
                        />
                        <FaArrowRight pl={2} pr={2} />
                        <AccountAvatar
                          size="xs"
                          addr={token.receiver}
                          hideTweet={true}
                        />
                      </Flex>
                    </Flex>
                    <Flex pl={2}>
                      <Link as={ReactLink} to={`/chiev/${token.clonedFromId}`}>
                        <Avatar src={getTokenImageUrl(token.clonedFromId)} />
                      </Link>

                      <Text pl={6}>{token.details}</Text>
                    </Flex>
                    <Flex
                      p={0}
                      pl={1}
                      pr={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text>Block: {token.blockNumber}</Text>

                      <FaThumbsUp p={1} />
                      <FaReply p={1} />
                    </Flex>
                  </Stack>
                );
              }
            })}
          </Stack>
        ) : (
          <Text>No Stream</Text>
        )}
      </Box>
    </>
  );
};

export default ChievStream;
