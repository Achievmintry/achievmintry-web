import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/core";

import { getProfile } from "3box/lib/api";

import { addresses } from "@project/contracts";

import { createWeb3User, w3connect } from "../utils/Auth";
import { USER_TYPE } from "../utils/Auth";
import { useUserWallet, useUser, useWeb3Connect } from "./DappContext";
import { TokenService } from "../utils/TokenService";

const UserInit = () => {
  const toast = useToast();
  const [web3Connect, updateWeb3Connect] = useWeb3Connect();
  const [user, updateUser] = useUser();
  const [, updateUserWallet] = useUserWallet();

  useEffect(() => {
    initCurrentUser();
  }, [web3Connect]);

  useEffect(() => {
    const notSignedIn = !user || user.type === USER_TYPE.READ_ONLY;
    if (notSignedIn) {
      return;
    }

    initUserWallet();
  }, [user]);

  const initCurrentUser = async () => {
    console.log("************initCurrentUser();");
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
                description: err.msg,
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
    console.log("^^^^^^^^^^^^^^initUserWallet");

    const web3 = web3Connect.web3;
    const balance = await web3.eth.getBalance(user.username);
    const eth = web3.utils.fromWei(balance);
    const tokenService = new TokenService(web3, addresses.cheiv, user.username);
    const cheiv = await tokenService.balanceOfToken(addresses.cheiv);
    const clones = []
    const wallet = {
      eth,
      cheiv,
      clones,
    };
    console.log('wallet', wallet);
    updateUserWallet(wallet);
  };

  return <></>;
};

export default UserInit;
