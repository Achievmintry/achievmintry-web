import React, { useEffect } from "react";

import { addresses } from "@project/contracts";

import { USER_TYPE } from "../utils/Auth";
import { useGen0s, useWeb3Connect } from "./DappContext";
import { KudosService } from "../utils/KudosService";

const Gen0sInit = () => {
    const [, updateGen0s] = useGen0s();
    const [web3Connect] = useWeb3Connect();

  useEffect(() => {
    initGen0s();
  }, []);

  const initGen0s = async () => {
    let loginType = localStorage.getItem("loginType") || USER_TYPE.READ_ONLY;
    let kudosService;
    if(loginType===USER_TYPE.READ_ONLY){
        kudosService = new KudosService(addresses.kudos );
    } else {
        kudosService = new KudosService(addresses.kudos, web3Connect.web3 );
    }

    const gen0s = kudosService;
    try {
        updateGen0s(gen0s);
    } catch (e) {
      console.error(
        `Could not get gen0s`, e
      );
    }
  };


  return <></>;
};

export default Gen0sInit;
