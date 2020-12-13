import React, { useEffect } from "react";

import { addresses } from "@project/contracts";

import { USER_TYPE } from "../utils/Auth";
import { useChievs, useWeb3Connect } from "./DappContext";
import { ChievsService, Web3ChievsService } from "../utils/ChievsService";

const ChievsInit = () => {
  const [chievs, updateChievs] = useChievs();
  const [web3Connect] = useWeb3Connect();

  useEffect(() => {
    initChievs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Connect]);

  const initChievs = async () => {
    let loginType = localStorage.getItem("loginType") || USER_TYPE.READ_ONLY;
    let chievsService;
    if (loginType === USER_TYPE.READ_ONLY) {
      chievsService = new ChievsService(addresses.chievs);
    } else {
      chievsService = new Web3ChievsService(addresses.chievs, web3Connect.web3);
    }
    try {
      updateChievs({...chievs, service: chievsService});
    } catch (e) {
      console.error(`Could not get chievs`, e);
    }
  };

  return <></>;
};

export default ChievsInit;
