import React, { useContext, useCallback, useMemo, createContext } from 'react';
import Web3Modal from 'web3modal';

import { providerOptions } from '../utils/Auth';
import supportedChains, { getChainData } from '../utils/Chains';

const DappContext = createContext();

function useDappContext() {
  return useContext(DappContext);
}

const initialState = {
  loading: false,
  user: null,
  network: supportedChains[100],
  txProcessor: {},
  ens: {},
  userWallet: null,
  web3Connect: {
    w3c: new Web3Modal({
      network: getChainData(+process.env.REACT_APP_NETWORK_ID).network,
      providerOptions,
      cacheProvider: true,
    }),
  },
  chievs: null,
  chainLogs: {},
  nftApi: [],
  communityApi: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoading': {
      return { ...state, loading: action.payload };
    }
    case 'setUser': {
      return { ...state, user: action.payload };
    }
    case 'setWeb3Connect': {
      return { ...state, web3Connect: action.payload };
    }
    case 'setTxProcessor': {
      return { ...state, txProcessor: action.payload };
    }
    case 'setUserWallet': {
      return { ...state, userWallet: action.payload };
    }
    case 'setChievs': {
      return { ...state, chievs: action.payload };
    }
    case 'setChainLogs': {
      return { ...state, chainLogs: action.payload };
    }
    case 'setEns': {
      return { ...state, ens: action.payload };
    }
    case 'setNFTApi': {
      return { ...state, nftApi: action.payload };
    }
    case 'setCommunityApi': {
      return { ...state, communityApi: action.payload };
    }
    default: {
      return initialState;
    }
  }
};

function DappContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const updateLoading = useCallback((loading) => {
    dispatch({ type: 'setLoading', payload: loading });
  }, []);

  const updateUser = useCallback((user) => {
    dispatch({ type: 'setUser', payload: user });
  }, []);

  const updateWeb3Connect = useCallback((data) => {
    dispatch({ type: 'setWeb3Connect', payload: data });
  }, []);

  const updateNetwork = useCallback((network) => {
    dispatch({ type: 'setNetwork', payload: network });
  }, []);

  const updateTxProcessor = useCallback((tx) => {
    dispatch({ type: 'setTxProcessor', payload: tx });
  }, []);

  const updateUserWallet = useCallback((wallet) => {
    dispatch({ type: 'setUserWallet', payload: wallet });
  }, []);

  const updateChievs = useCallback((_chievs) => {
    dispatch({ type: 'setChievs', payload: _chievs });
  }, []);

  const updateChainLogs = useCallback((_chainLogs) => {
    dispatch({ type: 'setChainLogs', payload: _chainLogs });
  }, []);

  const updateEns = useCallback((_ens) => {
    dispatch({ type: 'setEns', payload: _ens });
  }, []);

  const updateNFTApi = useCallback((_nfts) => {
    dispatch({ type: 'setNFTApi', payload: _nfts });
  }, []);

  const updateCommunityApi = useCallback((_communities) => {
    dispatch({ type: 'setCommunityApi', payload: _communities });
  }, []);

  return (
    <DappContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateLoading,
            updateUser,
            updateWeb3Connect,
            updateNetwork,
            updateTxProcessor,
            updateUserWallet,
            updateChievs,
            updateChainLogs,
            updateEns,
            updateNFTApi,
            updateCommunityApi,
          },
        ],
        [
          state,
          updateLoading,
          updateUser,
          updateWeb3Connect,
          updateNetwork,
          updateTxProcessor,
          updateUserWallet,
          updateChievs,
          updateChainLogs,
          updateEns,
          updateNFTApi,
          updateCommunityApi
        ],
      )}
    >
      {props.children}
    </DappContext.Provider>
  );
}

export function useUser() {
  const [state, { updateUser }] = useDappContext();
  return [state.user, updateUser];
}

export function useNetwork() {
  const [state, { updateNetwork }] = useDappContext();
  return [state.network, updateNetwork];
}

export function useWeb3Connect() {
  const [state, { updateWeb3Connect }] = useDappContext();
  return [state.web3Connect, updateWeb3Connect];
}

export function useTxProcessor() {
  const [state, { updateTxProcessor }] = useDappContext();
  return [state.txProcessor, updateTxProcessor];
}

export function useUserWallet() {
  const [state, { updateUserWallet }] = useDappContext();
  return [state.userWallet, updateUserWallet];
}

export function useLoading() {
  const [state, { updateLoading }] = useDappContext();
  return [state.loading, updateLoading];
}

export function useChievs() {
  const [state, { updateChievs }] = useDappContext();
  return [state.chievs, updateChievs];
}

export function useChainLogs() {
  const [state, { updateChainLogs }] = useDappContext();
  return [state.chainLogs, updateChainLogs];
}

export function useEns() {
  const [state, { updateEns }] = useDappContext();
  return [state.ens, updateEns];
}

export function useNFTApi() {
  const [state, { updateNFTApi }] = useDappContext();
  return [state.nftApi, updateNFTApi];
}

export function useCommunityApi() {
  const [state, { updateCommunityApi }] = useDappContext();
  return [state.communityApi, updateCommunityApi];
}

const DappContextConsumer = DappContext.Consumer;

export { DappContext, DappContextProvider, DappContextConsumer };
