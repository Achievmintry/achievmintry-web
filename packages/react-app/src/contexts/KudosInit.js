import React, { useEffect } from "react";

import { addresses } from "@project/contracts";

import { USER_TYPE } from "../utils/Auth";
import { useKudos, useWeb3Connect } from "./DappContext";
import { KudosService, Web3KudosService } from "../utils/KudosService";

const KudosInit = () => {
    const [, updateKudos] = useKudos();
    const [web3Connect] = useWeb3Connect();

  useEffect(() => {
    initKudos();
  }, [web3Connect]);

  const initKudos = async () => {
    let loginType = localStorage.getItem("loginType") || USER_TYPE.READ_ONLY;
    let kudosService;
    if(loginType===USER_TYPE.READ_ONLY){
        kudosService = new KudosService(addresses.kudos );
    } else {
        kudosService = new Web3KudosService(addresses.kudos, web3Connect.web3 );
    }
    kudosService.tokenData = await kudosService.getLogs();
    try {
        updateKudos(kudosService);
    } catch (e) {
      console.error(
        `Could not get kudos`, e
      );
    }
  };


  return <></>;
};

export default KudosInit;
