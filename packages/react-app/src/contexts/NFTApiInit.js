import React, { useEffect } from "react";
import { getAirTable } from "../utils/Requests";

import { useNFTApi } from "./DappContext";

const NFTApiInit = () => {
  const [, updateNFTApi] = useNFTApi();

  useEffect(() => {
    initNFTApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initNFTApi = async () => {
    try {
      const nfts = await getAirTable('NFTsV2');
      updateNFTApi(nfts.data.records);
    } catch (err) {
      console.log("Error fetching from airtable", err);
    }
  };

  return <></>;
};

export default NFTApiInit;
