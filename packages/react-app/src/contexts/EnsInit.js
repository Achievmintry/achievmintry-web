import React, { useEffect } from "react";

import { USER_TYPE } from "../utils/Auth";
import { useEns, useWeb3Connect } from "./DappContext";
import { EnsService } from "../utils/EnsService";

const EnsInit = () => {
  const [, updateEns] = useEns();
  const [web3Connect] = useWeb3Connect();

  useEffect(() => {
    initEns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Connect]);

  const initEns = async () => {

      let loginType = localStorage.getItem("loginType") || USER_TYPE.READ_ONLY;
      let ensService;
      console.log('initEns', loginType);
    if (loginType === USER_TYPE.READ_ONLY) {
      ensService = new EnsService();
    } else {
      ensService = new EnsService(web3Connect.web3);
    }
    console.log('ensService', ensService);

    updateEns(ensService);

  };

  return <></>;
};

export default EnsInit;
