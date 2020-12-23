import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Lottie from "react-lottie";

import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { TxProcessorService } from "../utils/TxProcessorService";
import {
  useChievs,
  useTxProcessor,
  useUser,
  useWeb3Connect,
} from "./DappContext";
import { truncateAddr } from "../utils/Helpers";
import { ExplorerLink } from "../components";

import rainbowLoader from "../data/lotties/40796-rainbow-loading.json";
import rainbowLove from "../data/lotties/439-love-explosion.json";
import { addresses } from "@project/contracts";
import { Web3ChievsService } from "../utils/ChievsService";

const TxProcessorInit = () => {
  const [user] = useUser();
  const [web3Connect] = useWeb3Connect();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [chievs, updateChievs] = useChievs();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [latestTx, setLatestTx] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: rainbowLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const loveOptions = {
    loop: false,
    autoplay: true,
    animationData: rainbowLove,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

      //** reload the chievService and refetch the logs */
      let chievsService = new Web3ChievsService(
        addresses.chievs,
        web3Connect.web3
      );

      try {
        updateChievs({ ...chievs, service: chievsService });
      } catch (e) {
        console.error(`Could not get chievs`, e);
      }
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
            {!loading ? (
              <>
                <Lottie options={loveOptions} height={400} width={400} />
                <Heading
                  as="h2"
                  fontSize={{ base: "xl", xl: "2xl", xxl: "4xl" }}
                >
                  <span role="img" aria-label="party">
                    🎉
                  </span>{" "}
                  Success{" "}
                  <span role="img" aria-label="party">
                    🎉
                  </span>
                </Heading>
              </>
            ) : (
              <Lottie options={loaderOptions} height={400} width={400} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TxProcessorInit;
