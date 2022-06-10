import React from 'react';

import { PaletteMode, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { defaultTheme } from '../themes';

import useLocalStorage from '../hooks/useLocalStorage';

const PaletteModeContext = React.createContext({
  togglePaletteMode: () => {
  }
});

const PaletteModeProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  const [mode, setMode] = useLocalStorage('palette-mode', 'light');

  const paletteMode = React.useMemo(
    () => ({
      togglePaletteMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  return (
    <PaletteModeContext.Provider value={ paletteMode }>
      <ThemeProvider theme={ defaultTheme(mode) }>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          { children }
        </Box>
      </ThemeProvider>
    </PaletteModeContext.Provider>
  );
};

export { PaletteModeContext, PaletteModeProvider };
