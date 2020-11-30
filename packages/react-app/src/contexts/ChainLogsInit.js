import React, { useEffect } from "react";

import {
  useChainLogs,
  useKudos,
  useNFTApi,
} from "./DappContext";

const ChainLogsInit = () => {
  const [kudos] = useKudos();
  const [nfts] = useNFTApi();
  const [chainLogs, updateChainLogs] = useChainLogs();

  useEffect(() => {
    // get clones in wild
    if (!kudos?.service || !nfts.length) {
      return;
    }

    const getMintCount = async () => {
      var cloneInWild = {};
      const tokenData = await kudos.service.getLogs();
      const cloneInWildCounts = await Promise.all(
        nfts.map((item, idx) =>
          kudos.service.getNumClonesInWild(item.fields["Gen0 Id"])
        )
      );
      cloneInWildCounts.forEach((item, idx) => {
        cloneInWild[nfts[idx].fields["Gen0 Id"]] = item;
      });

      updateChainLogs({ ...chainLogs, cloneInWild, tokenData });
    };

    getMintCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts, kudos]);

  return <></>;
};

export default ChainLogsInit;
