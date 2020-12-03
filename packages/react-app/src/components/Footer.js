import React from "react";
import { Box, Image, Heading, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { useCommunityApi } from "../contexts/DappContext";

const DaoLink = styled.a``;
const Footer = () => {
  const [communities] = useCommunityApi();
  const metaList = communities.map(item => item.fields);

  return (
    <>
      <Box
        w="full"
        textAlign="center"
        bg="white"
        boxShadow="0 0 25px rgba(0,0,0,0.3)"
        mt={5}
        className="footer"
      >
        <Box mx="auto" p={{ base: 6, xl: 25 }} w="75%">
          <Heading
            as="h4"
            mt="5"
            mb="5"
            fontSize={{ base: "lg", lg: "xl", xl: "2xl" }}
            fontWeight="400"
          >
            Chievmint is brought to you by...
          </Heading>
          <Flex
            className="daos"
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            p={{ base: "25px" }}
          >
            {metaList &&
              metaList.map((item, i) => {
                return (
                  <DaoLink
                    key={`daoLink-${i}`}
                    href={item["Dao Link"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                    flex="0 0 50px"
                    w="50px"
                    flexGrow="0"
                    flexShrink="1"
                    bg="transparent"
                  >
                    <Image
                      key={`daoImage-${i}`}
                      src={item.Logo[0].url}
                      name={item.Name}
                      width={{ base: "50px", xxl: "75px" }}
                    />
                  </DaoLink>
                );
              })}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
