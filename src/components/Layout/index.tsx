import React from 'react';

import { useTheme, useScrollTrigger, AppBar, Box, Container } from '@mui/material';

import Topbar from './Topbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
}

const Layout = ({ children, colorInvert = false }: Props) => {
  const theme = useTheme();

  const scroolTriggered = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: scroolTriggered ? theme.palette.background.paper : 'transparent',
          opacity: .9
        }}
        elevation={scroolTriggered || colorInvert ? 1 : 0}
      >
        <Topbar colorInvert={ !colorInvert ? scroolTriggered: true } />
      </AppBar>
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
