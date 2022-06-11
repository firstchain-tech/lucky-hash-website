/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box }  from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import section1background from '../../assets/images/section-1-background.png';

const Rule1 = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <Box>
            <Typography
              variant={'h4'}
              gutterBottom
              sx={{ marginBottom: 4, fontWeight: 700 }}
            >
              {'遊戲規則'}
              <Typography color="primary" variant="inherit" component="span">
                {'（押注）'}
              </Typography>
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
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box maxWidth={400} width={1}>
            <Box
              component={'img'}
              src={ section1background }
              width={1}
              height={1}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Rule1;
