import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import getLibrary from './utils/getLibrary';
import { NETWORK_CONTEXT_NAME } from './constants/misc';
import { HashRouter } from 'react-router-dom';
import { Buffer } from 'buffer';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const Web3ProviderNetwork = createWeb3ReactRoot(NETWORK_CONTEXT_NAME);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={ getLibrary }>
      <Web3ProviderNetwork getLibrary={ getLibrary }>
        <HashRouter>
          <App />
        </HashRouter>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
