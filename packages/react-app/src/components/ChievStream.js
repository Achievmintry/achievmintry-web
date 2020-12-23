import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";

import { Text, Box, Heading, Link, Avatar } from "@chakra-ui/react";
import {
  useChainLogs,
  useNFTApi,
  useUser,
} from "../contexts/DappContext";
import { FaPencilAlt, FaThumbsUp } from "react-icons/fa";
import AccountAvatar from "./AccountAvatar";

const UPDOOT_TOKEN = { id: "17", price: "100000000000000000" };
const STATUS_TOKEN = { id: "25", price: "100000000000000000" };

const ChievStream = ({ addr }) => {
  const [currentStream, setCurrentStream] = useState([]);
  const [user] = useUser();
  const [nfts] = useNFTApi();
  const [chainLogs] = useChainLogs();

  useEffect(() => {
    if (!chainLogs?.tokenData) {
      return;
    }
    const _stream = chainLogs.tokenData.allTokens
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
      .slice(0, 20);
    if (_stream[0]) {
      setCurrentStream(_stream);
    } else {
      setCurrentStream(null);
    }
  }, [chainLogs, addr, user]);

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
        <Heading as="h4">WIP: last 20 events</Heading>
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
                    <FaThumbsUp /> Like
                    {token.details.indexOf("0x") === 0 ? (
                      <AccountAvatar addr={token.details} hideTweet={true} />
                    ) : (
                      <Link as={ReactLink} to={`/chiev/${token.details}`}>
                        <Avatar src={getTokenImageUrl(token.details)} />
                      </Link>
                    )}
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
                    <FaPencilAlt /> Update status: {token.details}
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
                    {token.receiver.toLowerCase() === addr.toLowerCase() &&
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
                          <AccountAvatar addr={token.sender} hideTweet={true} />
                        </>
                      )}
                    {token.sender.toLowerCase() === addr.toLowerCase() &&
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
                        </>
                      )}
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
