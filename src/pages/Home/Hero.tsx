import React, { useEffect } from 'react';
import { useTheme, Container, Box, Grid, Stack, Typography } from '@mui/material';

import mainBackground from '../../assets/images/main-background.jpg';

const Hero = (): JSX.Element => {
  const theme = useTheme();

  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await require('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  return (
    <Box
      className={'jarallax'}
      sx={{
        height: '105vh',
        marginTop: -10,
        paddingTop: { xs: 20, sm: 15, md: 10 },
        paddingBottom: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        className={'jarallax-img'}
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: 'url(' + mainBackground + ')',
        }}
      />
      <Container>
        <Grid
          container
          spacing={4}
        >
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={4}
          >
            <Stack>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.white',
                  fontWeight: 900,
                }}
              >
                {'2.8M+'}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: 'common.white',
                }}
              >
                {'坐莊資金'}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={4}
          >
            <Stack>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.white',
                  fontWeight: 900,
                }}
              >
                {'1.6M+'}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: 'common.white',
                }}
              >
                {'累積押注'}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={4}
          >
            <Stack>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.white',
                  fontWeight: 900,
                }}
              >
                {'1.4M+'}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: 'common.white',
                }}
              >
                {'已發獎金'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
