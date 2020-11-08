import React, { useEffect } from "react";

import { useEns } from "./DappContext";
import { EnsService } from "../utils/EnsService";

const EnsInit = () => {
  const [, updateEns] = useEns();

  useEffect(() => {
    initEns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initEns = async () => {
    const ensService = new EnsService();
    updateEns(ensService);
  };

  return <></>;
};

export default EnsInit;
