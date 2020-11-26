import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  AspectRatioBox
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import { useCommunityApi } from "../contexts/DappContext";

const HoverBox = styled(Box)`
  position: relative;
  cursor: pointer;
  z-index: 0;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }

  &__featured {
    &::after {
      content: "";
      display: ;
    }
  }
`;

const Communities = ({ featured }) => {
  const [communities] = useCommunityApi();

  const renderList = () => {
    let filteredList = [];
    // TODO: data from airtable is gnarly
    const metaList = communities.map(item => item.fields);
    if (featured) {
      filteredList = metaList.filter(item => item["Featured"]);
    } else {
      filteredList = metaList;
    }
    if (!filteredList.length) {
      return <Text>Nothing here</Text>;
    }
    return filteredList.map((item, i) => {
      return (
        <HoverBox
          key={i}
          as={Link}
          to={`/community/${item["Dao Address"]}`}
          boxShadow="0 0 15px rgba(0,0,0,0.6)"
          _hover={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
          bg="brandYellow.900"
          color="black"
          borderWidth="10px"
          overflow="hidden"
          borderColor="black"
        >
          <Box p="6">
            <AspectRatioBox maxW="300px" ratio={1}>
              <Image src={item.Logo[0].url} />
            </AspectRatioBox>
          </Box>
          <Box p="6" w="100%">
            <Heading as="h3" size="lg">
              {item.Name}
            </Heading>
            <Text>{item.Blurb}</Text>
          </Box>
        </HoverBox>
      );
    });
  };

  return (
    <>
      <SimpleGrid minChildWidth="300px" spacing="50px" mb="5">
        {renderList()}
        {featured && (
          <HoverBox
            as={Link}
            to="/communities"
            bg="black"
            boxShadow="0 0 15px rgba(0,0,0,0.6)"
            _hover={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
            color="brandYellow.900"
            borderWidth="10px"
            overflow="hidden"
            borderColor="black"
            className="hoverbox__featured"
            p="6"
          >
            <Heading as="h3" size="lg">
              Communities
            </Heading>
            <Text>Browse the full list</Text>
          </HoverBox>
        )}
      </SimpleGrid>
    </>
  );
};

export default Communities;
