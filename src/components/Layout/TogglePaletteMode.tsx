import React, { useContext } from 'react';

import { useTheme, IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

import { PaletteModeContext } from 'contexts/PaletteModeContext';

interface Props {
  colorInvert: boolean;
}

const TogglePaletteMode = ({ colorInvert }: Props) => {
  const theme = useTheme();
  const paletteModeContext = useContext(PaletteModeContext);

  return (
    <IconButton
      onClick={ paletteModeContext.togglePaletteMode }
      title="Toggle Light/Dark Mode"
      sx={{
        marginX: 2,
        color: theme.palette.mode === 'light' && colorInvert ? theme.palette.text.primary : 'inherit',
      }}
    >
      { theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode /> }
    </IconButton>
  );
};

export default TogglePaletteMode;
