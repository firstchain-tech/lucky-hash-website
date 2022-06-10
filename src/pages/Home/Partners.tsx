import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography } from '@mui/material';

import bsc from '../../assets/images/partners/bsc.png';
import certik from '../../assets/images/partners/certik.png';
import ipfs from '../../assets/images/partners/ipfs.png';
import openzeppelin from '../../assets/images/partners/openzeppelin.png';
import pancakeswap from '../../assets/images/partners/pancakeswap.png';

const Partners = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Container sx={{ py: 5 }}>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          {'認識幫助我們的合作夥伴'}
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
        {[
          bsc,
          certik,
          ipfs,
          openzeppelin,
          pancakeswap,
        ].map((item, i) => (
          <Box marginTop={2} marginRight={4} key={i}>
            <Box
              component="img"
              height={50}
              src={item}
              alt="..."
              sx={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(0) invert(0.85)'
                    : 'none',
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Partners;
