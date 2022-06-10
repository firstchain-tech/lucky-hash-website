import React, { useEffect } from 'react';
// import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Typography } from '@mui/material';
import { NETWORK_CONTEXT_NAME } from '../../constants/misc';
import { network } from '../../connectors';
import useEagerConnect from '../../hooks/useEagerConnect';
import useInactiveListener from '../../hooks/useInactiveListener';

// import useLocalStorage from '../../hooks/useLocalStorage';

export const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
  // const { connector, active, error } = useWeb3React<Web3Provider>();

  // const [activatingConnector, setActivatingConnector] = useLocalStorage('connector');

  // useEffect(() => {
  //   if (activatingConnector && activatingConnector === connector) {
  //     setActivatingConnector(undefined);
  //   }
  // }, [activatingConnector, connector]);

  // const triedEager = useEagerConnect();

  // useInactiveListener(!triedEager || !!activatingConnector);

  const { active } = useWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NETWORK_CONTEXT_NAME);

  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  useInactiveListener(!triedEager);

  if (triedEager && !active && networkError) {
    return (
      <Typography>
        Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
      </Typography>
    );
  }

  return children;
};

export default Web3ReactManager;
