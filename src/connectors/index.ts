import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';

const chainIds = [
  // 1,
  5500,
  // 137
];

const rpcUrls: { [chainId: number]: string } = {
  // 1: 'https://mainnet.infura.io/v3/2b354baaaf38422688251e7137e419b6',
  5500: 'https://rpc.godechain.com',
  // 137: 'https://polygon-mainnet.infura.io/v3/2b354baaaf38422688251e7137e419b6',
};

export const injected = new InjectedConnector({
  supportedChainIds: chainIds,
});

export const walletConnect = new WalletConnectConnector({
  supportedChainIds: chainIds,
  rpc: rpcUrls,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

export const network = new NetworkConnector({
  urls: rpcUrls,
  defaultChainId: 5500
});

export const gnosisSafe = new SafeAppConnector();
