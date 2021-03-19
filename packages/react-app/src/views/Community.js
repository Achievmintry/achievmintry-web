import React, { useEffect, useState } from "react";
import { Image, Box, Heading, Text, Flex, AspectRatio } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useCommunityApi } from "../contexts/DappContext";
import { Chievs } from "../components";

const Community = ({ dao }) => {
  const [communities] = useCommunityApi();
  const { addr } = useParams();
  const history = useHistory();
  const [currentDao, setCurrentDao] = useState();
  const [daoData, setDaoData] = useState();

  useEffect(() => {
    const _dao = communities
      .map(item => item.fields)
      .find(item => item["Dao Address"] === currentDao);
    setDaoData(_dao);
  }, [communities, currentDao]);

  useEffect(() => {
    if (!addr) {
      setCurrentDao("0xdead");
    } else {
      history.push(`/community/${addr}`);
      setCurrentDao(addr);
    }
    // eslint-disable-next-line
  }, [addr]);
  return (
    <Box
      mx="auto"
      maxW="90vw"
      minH="100vh"
      textAlign="left"
      padding={{ base: "50px 0", xl: "90px 0 0 0" }}
    >
      {daoData && (
        <Flex
          align="flex-start"
          overflow="hidden"
          direction={{ base: "column", lg: "row" }}
          wrap="nowrap"
          mb={{ base: 3, lg: `50px` }}
                  bgColor="primary.500"
                  border="10px solid black"
                  maxW="1190px"
                  justifyContent="center"
                  margin="0 auto"
        >
          <Box
            p="6"
            w={{ base: "100%", lg: "300px" }}
            flexShrink="0"
          >
            <AspectRatio maxW="300px" ratio={1}>
              <Image src={daoData.Logo[0].url} />
            </AspectRatio>
          </Box>
          <Box p={{ base: 2, md: 6 }} flexGrow="1">
            <Heading as="h2" fontSize={{ base: "xl", xl: "3xl", xxl: "4xl" }}>
              {daoData.Name}
            </Heading>
            <Text>{daoData.Blurb}</Text>
          </Box>
        </Flex>
      )}

      {daoData?.Name && (
        <Chievs dao={daoData.Name} cols={{ sm: 1, md: 2, lg: 4 }} />
      )}
    </Box>
  );
};

export default Community;
