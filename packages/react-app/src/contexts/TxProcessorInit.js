import React, { useEffect, useState } from "react";
import { Link, useToast } from "@chakra-ui/react";

import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box
} from "@chakra-ui/react";

import { TxProcessorService } from "../utils/TxProcessorService";
import { useTxProcessor, useUser, useWeb3Connect } from "./DappContext";
import { truncateAddr } from "../utils/Helpers";
import { ExplorerLink } from "../components";
import { LinkIcon } from "@chakra-ui/icons";

const TxProcessorInit = () => {
  const [user] = useUser();
  const [web3Connect] = useWeb3Connect();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [latestTx, setLatestTx] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!user || Object.keys(txProcessor).length === 0) {
      return;
    }

    const unseen = txProcessor.getTxUnseenList(user.username);
    if (unseen.length) {
      setLatestTx(unseen[0]);
      setLoading(true);
      onOpen();
    } else if (latestTx) {
      // make sure there is a tx and not blank
      setLatestTx(txProcessor.getTx(latestTx.tx, user.username));
      setLoading(false);
      toast({
        title: "Gift away",
        position: "top-right",
        description: "transaction success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line
  }, [user, txProcessor.forceUpdate]);

  useEffect(() => {
    if (user && web3Connect.web3) {
      initTxProcessor();
    }
    // eslint-disable-next-line
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setLoading(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Submitted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {latestTx && (
              <ExplorerLink
                type="tx"
                hash={latestTx.tx}
                linkText={`${truncateAddr(latestTx.tx)} view`}
              />
            )}
            {!loading && (
              <>
                <Box>
                  <Text>
                    <span role="img" aria-label="party">
                      🎉
                    </span>{" "}
                    Success{" "}
                    <span role="img" aria-label="party">
                      🎉
                    </span>
                  </Text>
                </Box>
                <Box>
                <Link
                      href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup"
                      isExternal
                    >
                      Explore other Chievs <LinkIcon href="/chievs" mx="2px" />
                    </Link>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TxProcessorInit;
