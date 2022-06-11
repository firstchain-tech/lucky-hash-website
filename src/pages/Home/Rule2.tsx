import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Grid, Typography } from '@mui/material';

import section2background from '../../assets/images/section-2-background.png';

const Rule2 = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box
            maxWidth={400}
            width={1}
            sx={{
              paddingY: 3
            }}
          >
            <Box
              component={'img'}
              src={ section2background }
              width={1}
              height={1}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          xs={12}
          md={6}
        >
          <Box>
            <Box marginBottom={1}>
              <Typography
                variant={'h4'}
                gutterBottom
                sx={{ marginBottom: 4, fontWeight: 700 }}
              >
                {'遊戲規則'}
                <Typography color="primary" variant="inherit" component="span">
                  {'（坐莊）'}
                </Typography>
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
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Rule2;
