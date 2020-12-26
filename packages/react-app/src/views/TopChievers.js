import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { AccountAvatar } from "../components";
import { useChainLogs } from "../contexts/DappContext";


const TopChievers = () => {
  const [leaderBoard, setLeaderBoard] = useState();
  const [chainLogs] = useChainLogs();

  useEffect(() => {
    let counts = {};
    console.log(chainLogs);
    // eslint-disable-next-line
    const c = chainLogs.tokenData?.allTokens
      .filter((_token) => _token.type === "clone")
      .filter((_token) => _token.sender !== _token.receiver)
      .forEach((_token) => {
        counts[_token.sender] = 1 + counts[_token.sender] || 1;
      });
      console.log(c);
    counts = Object.keys(counts)
      .map((_owner) => {
        return { owner: _owner, count: counts[_owner] };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    setLeaderBoard([...counts]);
  }, [chainLogs]);
  return (
    <Box mx="auto" maxW="90vw" textAlign="left">
      {leaderBoard && (
        <Box
          borderWidth="10px"
          borderColor="black.500"
          borderRadius="0"
          maxW={{ base: "100%", lg: "66%" }}
          minW={{ base: "100%", lg: "66%" }}
          bg="secondary.300"
          justifyContent="left"
          mx="auto"
          boxShadow="0 0 15px rgba(0,0,0,0.5)"
          mt={6}
        >
          <Heading
            as="h4"
            fontSize={{ base: "xl", xxl: "2xl" }}
            mb="1"
            textTransform="uppercase"
          >
            Top 10 Givers LeaderBoard
          </Heading>
          {leaderBoard.map((_owner) => {
            return (
              <Flex key={_owner.owner}>
                <Box p="4">
                  <AccountAvatar addr={_owner.owner} hideTweet={true} />
                </Box>
                <Spacer />
                <Box p="4">
                  <Heading as="h4">{_owner.count}</Heading>
                </Box>
              </Flex>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default TopChievers;
