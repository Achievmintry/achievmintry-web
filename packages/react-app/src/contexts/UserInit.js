import React, { useEffect } from "react";
import { Link, useToast, Box } from "@chakra-ui/react";

import { getProfile } from "3box/lib/api";

import { addresses } from "@project/contracts";

import { createWeb3User, w3connect } from "../utils/Auth";
import { USER_TYPE } from "../utils/Auth";
import { useUserWallet, useUser, useWeb3Connect } from "./DappContext";
import { TokenService } from "../utils/TokenService";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const UserInit = () => {
  const toast = useToast();
  const [web3Connect, updateWeb3Connect] = useWeb3Connect();
  const [user, updateUser] = useUser();
  const [, updateUserWallet] = useUserWallet();

  useEffect(() => {
    initCurrentUser();
    // eslint-disable-next-line
  }, [web3Connect]);

  useEffect(() => {
    const notSignedIn = !user || user.type === USER_TYPE.READ_ONLY;
    if (notSignedIn) {
      return;
    }

    initUserWallet();
    // eslint-disable-next-line
  }, [user]);

  const initCurrentUser = async () => {
    // console.log("************initCurrentUser();");
    let loginType = localStorage.getItem("loginType") || USER_TYPE.READ_ONLY;
    if (user && user.type === loginType) {
      return;
    }

    if (web3Connect.w3c.cachedProvider) {
      loginType = USER_TYPE.WEB3;
    }

    let providerConnect;
    try {
      console.log(`Initializing user type: ${loginType || "read-only"}`);

      switch (loginType) {
        case USER_TYPE.WEB3: {
          if (web3Connect.w3c.cachedProvider) {
            try {
              // providerConnect = await w3connect(_web3);
              providerConnect = await w3connect(web3Connect);
            } catch (err) {
              console.log(err);

              toast({
                title: "Wrong Network",
                position: "top-right",
                render: () => (
                  <Box  color="black" p={3} bg="orange.500">
                    {err.msg}.{" "}
                    <Link
                      href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup"
                      isExternal
                    >
                      What's xDai <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Box>
                ),
                status: "warning",
                duration: 9000,
                isClosable: true,
              });
            }

            const { w3c, web3, provider } = providerConnect;
            const [account] = await web3.eth.getAccounts();
            const web3User = createWeb3User(account);
            const profile = await getProfile(web3User.username);

            updateWeb3Connect({ w3c, web3, provider });

            updateUser({ ...web3User, ...profile });
          }
          break;
        }
        case USER_TYPE.READ_ONLY:
        default:
          break;
      }

      localStorage.setItem("loginType", loginType);
    } catch (e) {
      console.error(
        `Could not log in with loginType ${loginType}: ${e.toString()}`
      );
      localStorage.setItem("loginType", "");
    }
  };

  const initUserWallet = async () => {
    // TODO: get wallet/token info for signed in user
    // console.log("^^^^^^^^^^^^^^initUserWallet");

    const web3 = web3Connect.web3;
    const balance = await web3.eth.getBalance(user.username);
    const eth = web3.utils.fromWei(balance);
    const tokenService = new TokenService(web3, addresses.chiev, user.username);
    const chiev = await tokenService.balanceOfToken(addresses.chiev);
    const nfts = [];
    const wallet = {
      eth,
      chiev,
      nfts,
    };
    // console.log("wallet", wallet);
    updateUserWallet(wallet);
  };

  return <></>;
};

export default UserInit;
