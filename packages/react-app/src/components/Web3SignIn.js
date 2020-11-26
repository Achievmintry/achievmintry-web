import React from "react";
import Web3Modal from "web3modal";
import { Button, useToast } from "@chakra-ui/core";

import { getChainData } from "../utils/Chains";
import { w3connect, providerOptions } from "../utils/Auth";
import { useWeb3Connect } from "../contexts/DappContext";
import { FaBlackTie } from "react-icons/fa";

// export const logoutOfWeb3Modal = async function() {
//   const [Web3Connect, updateWeb3Connect] = useWeb3Connect();
//   await web3Modal.clearCachedProvider();
//   window.location.reload();
// };

const Web3SignIn = () => {
  const [, updateWeb3Connect] = useWeb3Connect();
  const toast = useToast();

  return (
    <>
      <Button
        bg="transparent"
        border="1px"
        _hover={{
          background: "black",
          color: "brandYellow.900"
        }}
        onClick={async () => {
          const _web3Connect = {
            w3c: new Web3Modal({
              network: getChainData(+process.env.REACT_APP_NETWORK_ID).network,
              providerOptions,
              cacheProvider: true
            })
          };

          try {
            const { w3c, web3, provider } = await w3connect(_web3Connect);
            updateWeb3Connect({ w3c, web3, provider });

            // window.location.reload();
          } catch (err) {
            console.log("Error web3Connect ", err);

            toast({
              title: "Wrong Network",
              position: "top-right",
              description: err.msg,
              status: "warning",
              duration: 9000,
              isClosable: true
            });
          }
        }}
      >
        {" "}
        Connect
      </Button>
    </>
  );
};

export default Web3SignIn;
