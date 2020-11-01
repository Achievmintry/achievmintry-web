import React, { useEffect } from "react";
import { getNFTs } from "../utils/Requests";

import { useNFTApi } from "./DappContext";

const NFTApiInit = () => {
  const [, updateNFTApi] = useNFTApi();

  useEffect(() => {
    initNFTApi();
  }, []);

  const initNFTApi = async () => {
    try {
      const nfts = await getNFTs();
      updateNFTApi(nfts.data.records);
    } catch (err) {
      console.log("Error fetching from airtable", err);
    }
  };

  return <></>;
};

export default NFTApiInit;
