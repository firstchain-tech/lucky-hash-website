import React, { useState, useEffect } from 'react';

import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  Grid,
  Tab,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Alert,
  AlertColor
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../hooks/usContract';
import Layout from '../../components/Layout';
import erc20ABI from '../../contracts/abis/ERC20.json';
import lotteryABI from '../../contracts/abis/HashLottery.json';

const Stake = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('warning');
  const [alertMessage, setAlertMessage] = useState('');

  const openAlert = (severity: AlertColor, message: string) => {
    setAlert(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  };

  const [buttonText, setButtonText] = useState('確認質押');

  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [amount, setAmount] = useState('100');

  const { account } = useWeb3React();

  const usdtContract = useContract(
    '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
    erc20ABI
  );

  const lotteryContract = useContract(
    '0xAf4F51feA817F6B211003a24B57E3CD21E5FD866',
    lotteryABI
  );

  const minStakeAmount = ethers.utils.parseEther('100');
  const stakeAction = async () => {
    if (lotteryContract == null || usdtContract == null) {
      openAlert('error', '沒有連接到錢包！');
      return;
    }
    const weiAmount = ethers.utils.parseEther(amount);
    if (weiAmount < minStakeAmount) {
      openAlert('error', '低於最低購買金額！');
      return;
    }
    const balance = await usdtContract!.balanceOf(account);
    if (balance < minStakeAmount) {
      openAlert('error', '餘額不足！');
      return;
    }
    const allowance = await usdtContract!.allowance(account, lotteryContract!.address);
    if (allowance < weiAmount) {
      const approveTx = await usdtContract!.approve(lotteryContract!.address, weiAmount);
      setButtonText('交易授權中...');
      await approveTx.wait();
    }
    const stakeTx = await lotteryContract!.stake(weiAmount);
    setButtonText('交易進行中...');
    await stakeTx.wait();

    setButtonText('確認押注');
    openAlert('success', '成功押注。');
  };

  return (
    <Layout colorInvert={true}>
      <Container
        sx={{
          paddingY: 2.5,
        }}
      >
        <Grid
          container
          spacing={4}
          direction={isMd ? 'row' : 'column-reverse'}
          sx={{
            paddingY: 2
          }}
        >
          <Grid
            item
            alignItems={'center'}
            xs={12}
            md={7}
          >
            <Box>
              <Typography
                variant={'h4'}
                gutterBottom
                sx={{ marginBottom: 4, fontWeight: 700 }}
              >
                {'坐莊規則'}
              </Typography>
              <Typography component={'p'} sx={{ paddingBottom: 2 }}>
                {'只需質押一定 USDT 就可以成為莊家，賺取更高收益。。'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'- 最低質押金額 100 USDT'}
              </Typography>
              <Typography component={'p'} sx={{ paddingBottom: 2 }}>
                {'- 質押的 USDT 可隨時贖回。'}
              </Typography>
              <Typography component={'p'} sx={{ paddingBottom: 2 }}>
                {'- 玩家押注的金額會進入資金池，分為7天線性釋放給所有坐莊的玩家。'}
              </Typography>
              <Typography component={'p'}>
                {'- 坐莊的玩家按提供的資金比例分取資金池利潤。'}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            alignItems={'center'}
            xs={12}
            md={5}
          >
            <Box
              sx={{
                minHeight: '100%',
                padding: 2,
                borderRadius: 4,
                backgroundColor: 'alternate.main'
              }}
            >
              <TabContext value={value}>
                <TabList onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tab label="質押" value="0" />
                  <Tab label="收益" value="1" />
                </TabList>
                <TabPanel value="0">
                  <TextField
                    type="number"
                    value={ amount }
                    onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setAmount(event.target.value); } }
                    InputProps={{
                      endAdornment: <InputAdornment position="end">USDT</InputAdornment>,
                    }}
                    label="質押金額"
                    helperText="最低質押金額 100 USDT"
                    size="small"
                    fullWidth
                    sx={{
                      marginBottom: 2
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                  >
                    {buttonText}
                  </Button>
                </TabPanel>
                <TabPanel value="1"></TabPanel>
              </TabContext>
              <Collapse
                in={ alert }
                sx={{
                  position: 'absolute',
                  zIndex: 999,
                  bottom: 0,
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Stake;