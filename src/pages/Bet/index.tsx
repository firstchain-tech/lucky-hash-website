import React, { useState, useEffect } from 'react';

import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
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

const Bet = () => {
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

  const [buttonText, setButtonText] = useState('確認押注');

  const [tabValue, setTabValue] = React.useState('0');
  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    setTabValue(value);
  };

  const [number, setNumber] = useState('1');
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber((event.target as HTMLInputElement).value);
  };

  const [amount, setAmount] = useState('100');

  const { account } = useWeb3React();

  const usdtContract = useContract(
    '0x58D1EAc17bb4F3Ff0D3d5FDd93A31cD372D17681',
    erc20ABI
  );

  const lotteryContract = useContract(
    '0x87D9f0d89cF97Cb6AcC0d3798f70f3259DD751E8',
    lotteryABI
  );

  const minBetAmount = ethers.utils.parseEther('100');
  const purchaseAction = async () => {
    if (lotteryContract == null || usdtContract == null) {
      openAlert('error', '沒有連接到錢包！');
      return;
    }
    const weiAmount = ethers.utils.parseEther(amount);
    if (weiAmount < minBetAmount) {
      openAlert('error', '低於最低購買金額！');
      return;
    }
    const balance = await usdtContract!.balanceOf(account);
    if (balance < minBetAmount) {
      openAlert('error', '餘額不足！');
      return;
    }
    const allowance = await usdtContract!.allowance(account, lotteryContract!.address);
    if (allowance < weiAmount) {
      const approveTx = await usdtContract!.approve(lotteryContract!.address, weiAmount);
      setButtonText('交易授權中...');
      await approveTx.wait();
    }
    const purchaseTx = await lotteryContract!.purchase(number, weiAmount);
    setButtonText('交易進行中...');
    await purchaseTx.wait();

    setButtonText('確認押注');
    openAlert('success', '成功押注。');
  };

  const claimAction = async () => {
    if (lotteryContract == null || usdtContract == null) {
      openAlert('error', '沒有連接到錢包！');
      return;
    }
    const claimTx = await lotteryContract!.claim();
    openAlert('info', '交易進行中...');
    await claimTx.wait();

    openAlert('success', '領獎成功，快去查看你的錢包吧！');
  };

  const [hasEarned, setHasEarned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const earned = await lotteryContract!.earned(account);
      if (earned > 0) {
        setHasEarned(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
                {'押注規則'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'以玩家本次押注的下一個區塊 Hash 作為開獎依據（將下一個區塊 Hash 轉換成 UInt256 數字，按 10 取餘為開獎結果）。'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'- 押注限額為 100-10000 USDT'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'- 單註：最高賠率 2 倍'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                {'1/2/3/4（小）'}
                {'6/7/8/9（大）'}
                {'1/3/7/9（單）'}
                {'2/4/6/8（雙）'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'- 組合：最高賠率 4 倍'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                {'2/4（小雙）'}
                {'1/3（小單）'}
                {'6/8（大雙）'}
                {'7/9（大單）'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2 }}>
                {'- 龍虎：最高賠率 8 倍'}
              </Typography>
              <Typography component={'p'} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                {'0（龍）'}
                {'5（虎）'}
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
              <TabContext value={tabValue}>
                <TabList onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tab label="押注" value="0" />
                  <Tab label="歷史" value="1" />
                </TabList>
                <TabPanel value="0">
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={number}
                    onChange={handleNumberChange}
                    sx={{
                      marginBottom: 2
                    }}
                  >
                    <Stack spacing={1}>
                      <Box>
                        <Typography component={'p'} fontSize="small">
                          {'單註：最高賠率 2 倍'}
                        </Typography>
                        <FormControlLabel value="1" control={<Radio />} label="小" />
                        <FormControlLabel value="2" control={<Radio />} label="大" />
                        <FormControlLabel value="3" control={<Radio />} label="單" />
                        <FormControlLabel value="4" control={<Radio />} label="雙" />
                      </Box>
                      <Box>
                        <Typography component={'p'} fontSize="small">
                          {'組合：最高賠率 4 倍'}
                        </Typography>
                        <FormControlLabel value="6" control={<Radio />} label="小雙" />
                        <FormControlLabel value="7" control={<Radio />} label="小單" />
                        <FormControlLabel value="8" control={<Radio />} label="大雙" />
                        <FormControlLabel value="9" control={<Radio />} label="大單" />
                      </Box>
                      <Box>
                        <Typography component={'p'} fontSize="small">
                          {'龍虎：最高賠率 8 倍'}
                        </Typography>
                        <FormControlLabel value="0" control={<Radio />} label="龍" />
                        <FormControlLabel value="5" control={<Radio />} label="虎" />
                      </Box>
                    </Stack>
                  </RadioGroup>
                  <TextField
                    type="number"
                    value={ amount }
                    onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setAmount(event.target.value); } }
                    InputProps={{
                      endAdornment: <InputAdornment position="end">USDT</InputAdornment>,
                    }}
                    label="押注金額"
                    helperText="押注限額為 100-10000 USDT"
                    size="small"
                    fullWidth
                    sx={{
                      marginBottom: 2
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={purchaseAction}
                  >
                    {buttonText}
                  </Button>
                  {
                    hasEarned &&
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={claimAction}
                      sx={{
                        marginLeft: 1
                      }}
                    >
                      {'中獎啦'}
                    </Button>
                  }
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

export default Bet;
