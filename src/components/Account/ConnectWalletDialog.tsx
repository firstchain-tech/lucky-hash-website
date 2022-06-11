import React from 'react';

import { useWeb3React } from '@web3-react/core';
import { injected, walletConnect } from '../../connectors';

import { Box, Button, Typography, Avatar, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';

import metamaskIco from '../../assets/images/wallets/metamask.svg';
import walletConnectIco from '../../assets/images/wallets/walletconnect.svg';

interface Props {
  opened?: boolean;
  handleClose: () => void;
}

const ConnectWalletDialog = ({ opened = false, handleClose }: Props) => {
  const { activate, error } = useWeb3React();

  return (
    <Dialog
      open={ opened }
      onClose={ handleClose }
    >
      <DialogTitle>
        連接錢包
      </DialogTitle>
      <DialogContent
        dividers
      >
        {
          error
            ?
            <Alert severity="error">{error.message}</Alert>
            :
            <Alert severity="info">選擇一個錢包連接</Alert>
        }
        <Box
          sx={{ marginTop: 2 }}
        >
          <Button
            variant="outlined"
            size="large"
            fullWidth
            color="inherit"
            onClick={ () => {
              activate(injected);
              handleClose();
            } }
          >
            <Typography sx={{ flexGrow: 1, paddingX: 2, textAlign: 'left' }}>
              MetaMask
            </Typography>
            <Avatar
              src={ metamaskIco }
              sx={{ width: 34, height: 34 }}
            />
          </Button>
        </Box>
        <Box
          sx={{ marginTop: 2 }}
        >
          <Button
            variant="outlined"
            size="large"
            fullWidth
            color="inherit"
            onClick={ () => {
              activate(walletConnect);
              handleClose();
            } }
          >
            <Typography sx={{ flexGrow: 1, paddingX: 2, textAlign: 'left' }}>
              WalletConnect
            </Typography>
            <Avatar
              src={ walletConnectIco }
              sx={{ width: 34, height: 34 }}
            />
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletDialog;
