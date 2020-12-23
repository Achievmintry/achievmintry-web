import React, { useEffect, useState } from "react";
import { Badge, Button, Tooltip } from "@chakra-ui/react";
import {
  useChainLogs,
  useChievs,
  useTxProcessor,
  useUser,
} from "../contexts/DappContext";
import { FaThumbsUp } from "react-icons/fa";

const UPDOOT_TOKEN = { id: "17", price: "100000000000000000" };

const UpDoot = ({ dooter }) => {
  const [loading, setLoading] = useState(false);
  const [dootCount, setDootCount] = useState(0);
  const [user] = useUser();
  const [chievs] = useChievs();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [chainLogs] = useChainLogs();

  useEffect(() => {
    let _dootCount = [];
    if (!chainLogs.tokenData) {
      return;
    }
    if (dooter) {
      _dootCount = chainLogs.tokenData.allTokens.filter(
        (t) => t.details === "" + dooter
      );
    }

    setDootCount(_dootCount.length || 0);
  }, [chainLogs.tokenData, dooter]);

  const txCallBack = (txHash, details) => {
    if (txProcessor && txHash) {
      txProcessor.setTx(txHash, user.username, details, true, false);
      txProcessor.forceUpdate = true;
      setLoading(false);
      updateTxProcessor(txProcessor);
      setDootCount(dootCount + 1);
    }
    if (!txHash) {
      console.log("error: ", details);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);

    try {
      chievs.service.clone(
        [user.username],
        user.username,
        UPDOOT_TOKEN.id,
        UPDOOT_TOKEN.price,
        txCallBack,
        "" + dooter
      );
    } catch (err) {
      setLoading(false);
      console.log("error: ", err);
    }
  };
  return (
    <Tooltip label={!user?.username ? "You must be connected to Like" : "Like This"} aria-label="like button">
      <Button onClick={handleClick} isLoading={loading} disabled={!user?.username}>
        {dootCount > 0 && <Badge>{dootCount}</Badge>}
        <FaThumbsUp />
      </Button>
    </Tooltip>
  );
};

export default UpDoot;
