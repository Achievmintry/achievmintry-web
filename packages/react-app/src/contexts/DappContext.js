import React, { useContext, useCallback, useMemo, createContext } from 'react';
import Web3Modal from 'web3modal';

import { providerOptions } from '../utils/Auth';
import { customTheme } from '../themes/theme';
import supportedChains, { getChainData } from '../utils/Chains';

const DappContext = createContext();

function useDappContext() {
  return useContext(DappContext);
}

const initialState = {
  loading: false,
  user: null,
  theme: customTheme(),
  network: supportedChains[100],
  txProcessor: null,
  userWallet: null,
  web3Connect: {
    w3c: new Web3Modal({
      network: getChainData(+process.env.REACT_APP_NETWORK_ID).network,
      providerOptions,
      cacheProvider: true,
    }),
  },
  proposals: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoading': {
      return { ...state, loading: action.payload };
    }
    case 'setUser': {
      return { ...state, user: action.payload };
    }
    case 'setTheme': {
      return { ...state, theme: customTheme(action.payload) };
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

  const updateTheme = useCallback((theme) => {
    dispatch({ type: 'setTheme', payload: theme });
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

  return (
    <DappContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateLoading,
            updateUser,
            updateTheme,
            updateWeb3Connect,
            updateNetwork,
            updateTxProcessor,
            updateUserWallet,
          },
        ],
        [
          state,
          updateLoading,
          updateUser,
          updateTheme,
          updateWeb3Connect,
          updateNetwork,
          updateTxProcessor,
          updateUserWallet,
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

export function useTheme() {
  const [state, { updateTheme }] = useDappContext();
  return [state.theme, updateTheme];
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
  return [state.txProcessor, updateUserWallet];
}

export function useLoading() {
  const [state, { updateLoading }] = useDappContext();
  return [state.loading, updateLoading];
}

const DappContextConsumer = DappContext.Consumer;

export { DappContext, DappContextProvider, DappContextConsumer };
