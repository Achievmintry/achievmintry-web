import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Grid,
  Image,
  AspectRatioBox
} from "@chakra-ui/core";
import { useCommunityApi } from "../contexts/DappContext";

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
        <Box
          key={i}
          as={Link}
          to={`/community/${item["Dao Address"]}`}
          maxW="18rem"
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
          borderColor="brandPink.900"
          p="6"
        >
          <AspectRatioBox maxW="300px" ratio={1}>
            <Image src={item.Logo[0].url} />
          </AspectRatioBox>
          <Box p="6">
            <Heading as="h3" size="lg">
              {item.Name}
            </Heading>
            <Text>{item.Blurb}</Text>
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {renderList()}
        {featured && (
          <Box
            as={Link}
            to="/communities"
            maxW="18rem"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            borderColor="brandPink.900"
            p="6"
          >
            <Heading as="h3" size="lg">
              Communities
            </Heading>
            <Text>Browse the full list</Text>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Communities;
