import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
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

const Communities = ({ featured }) => {
  const [communities] = useCommunityApi();

  const renderList = () => {
    let filteredList = [];
    // TODO: data from airtable is gnarly
    const metaList = communities.map((item) => item.fields);
    if (featured) {
      filteredList = metaList.filter((item) => item["Featured"]);
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
          boxShadow="0 0 15px rgba(0,0,0,0.5)"
          bg="brandYellow.900"
          color="black"
          borderWidth="10px"
          overflow="hidden"
          borderColor="black"
          p={{ base: 6, xl: 2, "2xl": 6 }}
          m={6}
        >
          <Box p={{ base: 2, xl: 2, "2xl": 6 }}>
            <AspectRatio maxW="500px" ratio={1}>
              <Image src={item.Logo[0].url} />
            </AspectRatio>
          </Box>
          <Box p={{ base: 2, xl: 2, "2xl": 6 }} w="100%">
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
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 4 }}
        spacing={{ base: 5, lg: 10, "2xl": 20 }}
      >
        {renderList()}
        {featured && (
          <HoverBox
            as={Link}
            to="/communities"
            borderWidth="10px"
            overflow="hidden"
            bg="black"
            color="brandYellow.900"
            borderColor="black"
            boxShadow="0 0 15px rgba(0,0,0,0.5)"
            className="hoverbox__featured"
            p={6}
            m={6}
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
