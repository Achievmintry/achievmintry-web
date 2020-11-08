import React, { useEffect } from "react";
import { getAirTable } from "../utils/Requests";

import { useCommunityApi } from "./DappContext";

const CommunityInit = () => {
  const [, updateCommunityApi] = useCommunityApi();

  useEffect(() => {
    initCommunityApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initCommunityApi = async () => {
    try {
      const communities = await getAirTable('Communities');
      updateCommunityApi(communities.data.records);
    } catch (err) {
      console.log("Error fetching from airtable", err);
    }
  };

  return <></>;
};

export default CommunityInit;
