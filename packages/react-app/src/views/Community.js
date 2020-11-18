import React, { useEffect, useState } from "react";
import { Image, Box, Heading, Text, Grid } from "@chakra-ui/core";
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
      .map((item) => item.fields)
      .find((item) => item["Dao Address"] === currentDao);
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
    <>
      <Grid>
        {daoData && (
          <Box
            maxW="18rem"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            borderColor="brandPink.900"
            p="6"
          >
            <Image src={daoData.Logo[0].url} />
            <Box p="6">
              <Heading as="h3" size="lg">
                {daoData.Name}
              </Heading>
              <Text>{daoData.Blurb}</Text>
            </Box>
          </Box>
        )}
      </Grid>
      {daoData?.Name && <Chievs dao={daoData.Name} />}
    </>
  );
};

export default Community;
