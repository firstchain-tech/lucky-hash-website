import React from 'react';
import { useTheme, Typography } from '@mui/material';

interface Props {
  colorInvert?: boolean;
}

const Logo = ({ colorInvert = false }: Props) => {
  const theme = useTheme();

  return (
    <Typography
      variant={ 'h5' }
      component="a"
      href="/"
      title="Back to Home"
      sx={{
        color: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
        textDecoration: 'none',
        fontWeight: 700
      }}
    >
      {'幸運'}
      <Typography
        variant="inherit"
        component="span"
        sx={{
          fontWeight: 100
        }}
      >
        {'哈希'}
      </Typography>
    </Typography>
  );
};

export default Logo;
