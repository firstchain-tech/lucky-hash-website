import React, { useState } from 'react';
import { BigNumber } from 'ethers';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Alert,
  AlertColor
} from '@mui/material';

import Layout from '../../components/Layout';

import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../hooks/usContract';

import erc20ABI from '../../contracts/abis/ERC20.json';
import dreamTokenABI from '../../contracts/abis/DreamToken.json';
import storeABI from '../../contracts/abis/Store.json';

const NFTs = (): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('warning');
  const [alertMessage, setAlertMessage] = useState('');

  const openAlert = (severity: AlertColor, message: string) => {
    setAlert(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  };

  const [amount, setAmount] = useState('5');

  const { account } = useWeb3React();

  const usdtContract = useContract(
    '0x55d398326f99059fF775485246999027B3197955',
    erc20ABI
  );

  const dreamTokenContract = useContract(
    '0xEffcD0c829797BD3173e4247cC070A47ECD08B96',
    dreamTokenABI
  );

  const storeContract = useContract(
    '0xb14F5645F5C22B555f95fD16C34D2e8308D5cf4C',
    storeABI
  );

  const mock = [
    {
      media: '/tokens/0.png',
      title: 'Star',
      description: '1,000 Limited Editions, 500 USDT/NFT.',
      textFieldName: 'price',
      action: {
        title: 'Purchase',
        method: async () => {
          if (storeContract == null && usdtContract == null ) {
            openAlert('error', 'Not connected to wallet!!!');
            return;
          }
          if (parseInt(amount) >= 1) {
            const price = await storeContract!.price();
            const allowance = await usdtContract!.allowance(account, storeContract?.address);
            if (allowance < price) {
              const approvedAmount = BigNumber.from(price).mul(amount);
              const approveTx = await usdtContract!.approve(storeContract?.address, approvedAmount);
              openAlert('info', 'Approving...');

              await approveTx.wait();
            }

            const purchaseTx = await storeContract!.purchase(amount);
            openAlert('info', 'Transaction in progress...');

            await purchaseTx.wait();
            openAlert('success', 'Successful purchase!!!');
          } else {
            openAlert('warning', 'Amount cannot be less than 1!!!');
          }
        }
      }
    },
    {
      media: '/tokens/1.png',
      title: 'Moon',
      description: '5 Star combined into 1 Moon.',
      textFieldName: null,
      action: {
        title: 'Level Up',
        method: async () => {
          if (dreamTokenContract == null ) {
            openAlert('error', 'Not connected to wallet!!!');
            return;
          }
          const balance = await dreamTokenContract!.balanceOf(account, 0);
          if (balance >= 5) {
            const levelUpTx = await dreamTokenContract!.levelUp(0, 5);
            openAlert('info', 'Transaction in progress...');

            await levelUpTx.wait();
            openAlert('success', 'Successful level up!!!');
          } else {
            openAlert('warning', 'Insufficient balance!!!');
          }
        }
      }
    },
    {
      media: '/tokens/2.png',
      title: 'Sun',
      description: '5 Moon combined into 1 Sun.',
      textFieldName: null,
      action: {
        title: 'Level Up',
        method: async () => {
          if (dreamTokenContract == null ) {
            openAlert('error', 'Not connected to wallet!!!');
            return;
          }
          const balance = await dreamTokenContract!.balanceOf(account, 1);
          if (balance >= 5) {
            const levelUpTx = await dreamTokenContract!.levelUp(1, 5);
            openAlert('info', 'Transaction in progress...');

            await levelUpTx.wait();
            openAlert('success', 'Successful level up!!!');
          } else {
            openAlert('warning', 'Insufficient balance!!!');
          }
        }
      }
    },
  ];

  return (
    <Layout colorInvert={true}>
      <Container sx={{ my: 5 }}>
        <Box marginBottom={4}>
          <Typography
            variant="h4"
            align={'center'}
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            DreamDAO&apos;s{' '}
            <Typography color="primary" variant="inherit" component="span">
              NFTs
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            align={'center'}
            color={'text.secondary'}
          >
            There are 3 types of NFTs: &quot;Star, Moon and Sun&quot;, which are Dream DAO&apos;s equity and governance credentials.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {mock.map((item, i) => (
            <Grid
              item
              xs={12}
              md={4}
              key={i}
            >
              <Box display={'block'} width={1} height={1}>
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <CardMedia
                    title={item.title}
                    image={item.media}
                    sx={{
                      position: 'relative',
                      height: { xs: 350, sm: 400, md: 450 },
                      overflow: 'hidden',
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant={'h6'}
                      align={'left'}
                      sx={{ fontWeight: 700 }}
                    >
                      {item.title}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} marginY={2}>
                      <Typography variant={'subtitle2'} color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      {
                        item.textFieldName !== null &&
                          <TextField
                            label="Amount"
                            id="amount"
                            type="number"
                            size="small"
                            value={ amount }
                            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setAmount(event.target.value); } }
                            sx={{
                              width: 150,
                              marginRight: 1
                            }}
                          />
                      }
                      <Button
                        variant="contained"
                        size="large"
                        onClick={item.action.method}
                      >
                        {item.action.title}
                      </Button>
                    </CardActions>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
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

export default NFTs;
