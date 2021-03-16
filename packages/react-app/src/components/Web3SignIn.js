import React from "react";
import Web3Modal from "web3modal";
import { Button, Link, useToast, Box } from "@chakra-ui/react";

import { getChainData } from "../utils/Chains";
import { w3connect, providerOptions } from "../utils/Auth";
import { useWeb3Connect } from "../contexts/DappContext";
import { ExternalLinkIcon } from "@chakra-ui/icons";

// export const logoutOfWeb3Modal = async function() {
//   const [Web3Connect, updateWeb3Connect] = useWeb3Connect();
//   await web3Modal.clearCachedProvider();
//   window.location.reload();
// };

const Web3SignIn = (props) => {
  const [, updateWeb3Connect] = useWeb3Connect();
  const toast = useToast();

  return (
    <>
      <Button
        bg="white"
        borderWidth="5px"
        borderColor="black.500"
        borderRadius="0"
        // size={{ base: "sm", lg: "md" }}
        // fontSize={{ base: "12px", lg: "14px" }}
        padding="8px 10px"
        _hover={{
          background: "black",
          color: "secondary.500"
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
              render: () => (
                <Box color="black" p={3}>
                  {err.msg}.{" "}
                  <Link
                    href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup"
                    isExternal
                  >
                    What's xDai <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>
              ),
              description: `${err.msg}, `,
              status: "warning",
              duration: 9000,
              isClosable: true
            });
          }
        }}
        {...props}
      >
        {" "}
        Connect
      </Button>
    </>
  );
};

export default Web3SignIn;
