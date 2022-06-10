import React from 'react';

import { useTheme, Box, Stack, Button, Avatar } from '@mui/material';
import { AccountBalanceWallet, Logout } from '@mui/icons-material';

import { useWeb3React } from '@web3-react/core';

import { shortenAddress } from '../../utils';

import metamaskIco from '../../assets/images/wallets/metamask.svg';
import walletConnectIco from '../../assets/images/wallets/walletconnect.svg';

import ConnectWalletDialog from './ConnectWalletDialog';

interface Props {
  colorInvert?: boolean;
}

const Account = ({ colorInvert = false }: Props) => {
  const { deactivate, active, account } = useWeb3React();

  const theme = useTheme();
  const [opened, setOpened] = React.useState(false);

  const openDialog = () => {
    setOpened(true);
  };

  const closeDialog = () => {
    setOpened(false);
  };

  console.log(active);

  if (account) {
    return (
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={ 1 }>
        <Button
          startIcon={
            <Avatar
              // src={
              // activeConnector?.name == 'WalletConnect' ? walletconnect : metamask
              // }
              sx={{
                width: 22,
                height: 22,
              }}
            />
          }
          variant="outlined"
          color="inherit"
          sx={{
            paddingY: 1,
            color: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
            borderColor: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
          }}
        >
          { shortenAddress(account) }
        </Button>
        <Button
          onClick={ deactivate }
          startIcon={<Logout />}
          variant="outlined"
          color="inherit"
          sx={{
            paddingY: 1,
            color: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
            borderColor: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
          }}
        >
          斷開連接
        </Button>
      </Stack>
    );
  }

  return (
    <Box>
      <Button
        onClick={ openDialog }
        startIcon={<AccountBalanceWallet />}
        variant="outlined"
        color="inherit"
        sx={{
          paddingY: 1,
          color: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
          borderColor: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
        }}
      >
        連接錢包
      </Button>
      <ConnectWalletDialog opened={ opened } handleClose={ closeDialog } />
    </Box>
  );
};

export default Account;
