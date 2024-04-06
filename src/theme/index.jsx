import PropTypes from 'prop-types';
import { useMemo, useState, createContext } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

export const ColorModeContext = createContext({ mode: 'light', setMode: () => {} });

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode]
  );

  const memoizedValue = useMemo(
    () => ({
      palette: mode === 'light' ? palette() : { mode: 'dark' },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [mode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
