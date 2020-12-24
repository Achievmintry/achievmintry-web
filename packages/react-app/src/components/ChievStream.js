import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";

import { Text, Box, Heading, Link, Avatar, Flex } from "@chakra-ui/react";
import { useChainLogs, useNFTApi, useUser } from "../contexts/DappContext";
import { FaPencilAlt, FaThumbsUp } from "react-icons/fa";
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
    console.log("addr", addr);
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
    console.log("_stream", _stream);
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
        {currentStream ? (
          <Box>
            {currentStream.map((token) => {
              if (+token.clonedFromId === +UPDOOT_TOKEN.id) {
                return (
                  <Box
                    key={token.tokenId}
                    bg="secondary.200"
                    border="10px solid black"
                    color="black"
                    w={{ base: "100%", lg: "50%" }}
                    mx="auto"
                    p={4}
                    mb={4}
                  >
                    <Flex>
                      <FaThumbsUp /> Like
                      {token.details.indexOf("0x") === 0 ? (
                        <AccountAvatar addr={token.details} hideTweet={true} />
                      ) : (
                        <Link as={ReactLink} to={`/chiev/${token.details}`}>
                          <Avatar src={getTokenImageUrl(token.details)} />
                        </Link>
                      )}
                    </Flex>
                  </Box>
                );
              } else if (+token.clonedFromId === +STATUS_TOKEN.id) {
                return (
                  <Box
                    bg="secondary.200"
                    border="10px solid black"
                    color="black"
                    w={{ base: "100%", lg: "50%" }}
                    mx="auto"
                    p={4}
                    mb={4}
                    key={token.tokenId}
                  >
                    <Flex>
                      <AccountAvatar addr={token.sender} hideTweet={true} />
                      <FaPencilAlt /> Update status: {token.details}
                    </Flex>
                  </Box>
                );
              } else {
                return (
                  <Box
                    bg="secondary.200"
                    border="10px solid black"
                    color="black"
                    w={{ base: "100%", lg: "50%" }}
                    mx="auto"
                    p={4}
                    mb={4}
                    key={token.tokenId}
                  >
                    <Flex>
                      {addr &&
                        token.receiver.toLowerCase() === addr.toLowerCase() &&
                        token.sender.toLowerCase() !== addr.toLowerCase && (
                          <>
                            receive:{" "}
                            <Link
                              as={ReactLink}
                              to={`/chiev/${token.clonedFromId}`}
                            >
                              <Avatar
                                src={getTokenImageUrl(token.clonedFromId)}
                              />
                            </Link>{" "}
                            from{" "}
                            <AccountAvatar
                              addr={token.sender}
                              hideTweet={true}
                            />
                            {token.details}
                          </>
                        )}
                      {addr &&
                        token.sender.toLowerCase() === addr.toLowerCase() &&
                        token.receiver.toLowerCase() !== addr.toLowerCase && (
                          <>
                            send:{" "}
                            <Link
                              as={ReactLink}
                              to={`/chiev/${token.clonedFromId}`}
                            >
                              <Avatar
                                src={getTokenImageUrl(token.clonedFromId)}
                              />
                            </Link>{" "}
                            to{" "}
                            <AccountAvatar
                              addr={token.receiver}
                              hideTweet={true}
                            />
                            {token.details}
                          </>
                        )}
                      {!addr && (
                        <>
                          <AccountAvatar addr={token.sender} hideTweet={true} />
                          send{" "}
                          <Link
                            as={ReactLink}
                            to={`/chiev/${token.clonedFromId}`}
                          >
                            <Avatar
                              src={getTokenImageUrl(token.clonedFromId)}
                            />
                          </Link>{" "}
                          to{" "}
                          <AccountAvatar
                            addr={token.receiver}
                            hideTweet={true}
                          />
                          {token.details}
                        </>
                      )}
                    </Flex>
                  </Box>
                );
              }
            })}
          </Box>
        ) : (
          <Text>No Stream</Text>
        )}
      </Box>
    </>
  );
};

export default ChievStream;
