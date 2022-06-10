import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Alert,
  AlertColor
} from '@mui/material';

import Layout from '../../components/Layout';

import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../hooks/usContract';

import erc20ABI from '../../contracts/abis/ERC20.json';
import fundraiserABI from '../../contracts/abis/Fundraiser.json';

const Donate = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('warning');
  const [alertMessage, setAlertMessage] = useState('');

  const openAlert = (severity: AlertColor, message: string) => {
    setAlert(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  };

  const [donated, setDonated] = useState('0');
  const [amount, setAmount] = useState('100');

  const { account } = useWeb3React();

  const usdtContract = useContract(
    '0x55d398326f99059fF775485246999027B3197955',
    erc20ABI
  );

  const fundraiserContract = useContract(
    '0x5997897e65208FE243f780388FAc537Ec14e5048',
    fundraiserABI
  );

  const minDonateAmount = ethers.utils.parseEther('100');

  useEffect(() => {
    fetchShares();
  }, []);

  const fetchShares = async () => {
    if (fundraiserContract !== null) {
      const shares = await fundraiserContract!.shares(account);
      setDonated(ethers.utils.formatEther(shares));
    }
  };

  const donateAction = async () => {
    const weiAmount = ethers.utils.parseEther(amount);
    if (fundraiserContract == null || usdtContract == null) {
      openAlert('error', 'Not connected to wallet!!!');
      return;
    }
    const balance = await usdtContract!.balanceOf(account);
    if (balance < minDonateAmount) {
      openAlert('error', 'Insufficient balance!!!');
      return;
    }
    if (weiAmount < minDonateAmount) {
      openAlert('error', 'Below the minimum donation amount!!!');
      return;
    }
    const allowance = await usdtContract!.allowance(account, fundraiserContract.address);
    if (allowance < weiAmount) {
      const approveTx = await usdtContract!.approve(fundraiserContract.address, weiAmount);
      openAlert('info', 'Approving...');
      await approveTx.wait();
    }
    const donateTx = await fundraiserContract!.donate(weiAmount);
    openAlert('info', 'Transaction in progress...');
    await donateTx.wait();
    openAlert('success', 'Donate successfully!!!');
  };

  return (
    <Layout colorInvert={true}>
      <Container
        sx={{
          marginY: { xs: 2, sm: 2, md: 5 },
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '50%' },
            margin: 'auto'
          }}
        >
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: 'alternate.main'
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                marginBottom: 2,
                fontWeight: 700
              }}
            >
              {'Dream LP: '}
              <Typography color="primary" variant="inherit" component="span">
                {donated}
              </Typography>
              {' USDT'}
            </Typography>
            <Box sx={{ marginY: 4 }}>
              <TextField
                type="number"
                value={ amount }
                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setAmount(event.target.value); } }
                InputProps={{
                  endAdornment: <InputAdornment position="end">USDT</InputAdornment>,
                }}
                label="Amount"
                helperText="Enter the amount you want to donate."
                size="small"
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={ donateAction }
            >
              {'Purchase'}
            </Button>
          </Box>
        </Box>
        <Collapse
          in={ alert }
          sx={{
            position: 'sticky',
            zIndex: 999,
            bottom: 0
          }}
        >
          <Alert
            severity={ alertSeverity }
            onClose={ () => setAlert(false) }
            sx={{
              marginY: 2
            }}
          >
            { alertMessage }
          </Alert>
        </Collapse>
      </Container>
    </Layout>
  );
};

export default Donate;
