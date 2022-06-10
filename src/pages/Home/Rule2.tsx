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
              <Typography component={'p'} sx={{ paddingBottom: 1 }}>
                {'為獎池提供資金（獲得更高回報）。'}
              </Typography>
              <Typography component={'p'} sx={{ paddingBottom: 1 }}>
                {'- 最短質押時間為一周。'}
              </Typography>
              <Typography component={'p'} sx={{ paddingBottom: 1 }}>
                {'- 質押期滿後可隨時贖回。'}
              </Typography>
              <Typography component={'p'}>
                {'- 按提供的資金比例分取玩家押注的利潤。'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Rule2;
