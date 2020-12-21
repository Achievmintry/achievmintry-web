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
import { useTheme } from "../contexts/CustomThemeContext";

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
      background-color: ${(props) => {
        return props._hover?.themecolor;
      }};
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
  const [theme] = useTheme()

  const renderList = () => {
    let filteredList = [];
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
          backgroundColor="secondary.500"
          color="black.500"
          borderWidth="10px"
          overflow="hidden"
          borderColor="black.500"
          fontSize={{ base: "md", xl: "xl", xxl: "2xl" }}
          p={{ base: 6, sm: 3, lg: 4, xl: 4 }}
          transition="background-color 0.2s ease color 0.2s ease"
          _hover={{
            backgroundColor: "black.500",
            color: "white",
          }}
        >
          <Box p={{ base: 2, xl: 2, "2xl": 6 }}>
            <AspectRatio maxW="500px" ratio={1}>
              <Image src={item.Logo[0].url} />
            </AspectRatio>
          </Box>
          <Box
            p={{ base: 2, xl: 2, "2xl": 6 }}
            mt={5}
            w="100%"
            fontSize={{ base: "xs", xl: "xs", xxl: "lg" }}
          >
            <Heading as="h3" fontSize={{ base: "md", xl: "lg", xxl: "2xl" }}>
              {item.Name}
            </Heading>
            <Text fontSize={{ base: "xs", xl: "xs", xxl: "lg" }}>
              {item.Blurb}
            </Text>
          </Box>
        </HoverBox>
      );
    });
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        spacing={{ base: 10, sm: 10, lg: 10, xxl: 20 }}
      >
        {renderList()}
        {featured && (
          <HoverBox
            as={Link}
            to="/communities"
            borderWidth="10px"
            overflow="hidden"
            bg="black.500"
            color="secondary.500"
            borderColor="black.500"
            boxShadow="0 0 15px rgba(0,0,0,0.5)"
            className="hoverbox__featured"
            p={{ base: 3, xl: 4, xxl: 6 }}
            _hover={{
              themecolor: theme.colors.secondary[500]
            }}
          >
            <Heading as="h3" fontSize={{ base: "md", xl: "lg", xxl: "2xl" }}>
              Communities
            </Heading>
            <Text fontSize={{ base: "sm", lg: "md", xxl: "lg" }}>
              Browse the full list
            </Text>
          </HoverBox>
        )}
      </SimpleGrid>
    </>
  );
};

export default Communities;
