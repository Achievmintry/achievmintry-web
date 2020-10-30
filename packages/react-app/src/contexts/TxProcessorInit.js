import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/core";

import { TxProcessorService } from "../utils/TxProcessorService";
import { useTxProcessor, useUser, useWeb3Connect } from "./DappContext";

const TxProcessorInit = () => {
  const [user] = useUser();
  const [web3Connect] = useWeb3Connect();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [latestTx, setLatestTx] = useState();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      // early return
      return;
    }
    if (!txProcessor || !txProcessor.getTxList) {
      // early return
      return;
    }

    // wont update after tx is done and set seen
    const unseen = txProcessor.getTxUnseenList(user.username);
    console.log("unseen", unseen);
    if (unseen.length) {
      setLatestTx(unseen[0]);

    } else if (latestTx) {
      setLatestTx(txProcessor.getTx(latestTx.tx, user.username));
    }

    // when finished
    // toast({
    //   title: "Gift away",
    //   position: "top-right",
    //   description: "transaction success 1",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
    // eslint-disable-next-line
  }, [txProcessor, user]);

  useEffect(() => {
    if (user && web3Connect.web3) {
      console.log("init tx proc");
      initTxProcessor();
    }
  }, [user, web3Connect]);

  const initTxProcessor = async () => {
    const txProcessorService = new TxProcessorService(web3Connect.web3);
    txProcessorService.update(user.username);
    txProcessorService.forceUpdate =
      txProcessorService.getTxPendingList(user.username).length > 0;

    updateTxProcessor(txProcessorService);

    web3Connect.web3.eth.subscribe("newBlockHeaders", async (error, result) => {
      if (!error) {
        if (txProcessorService.forceUpdate) {
          await txProcessorService.update(user.username);

          if (!txProcessorService.getTxPendingList(user.username).length) {
            txProcessorService.forceUpdate = false;
          }

          updateTxProcessor(txProcessorService);
        }
      }
    });
  };

  return <></>;
};

export default TxProcessorInit;
