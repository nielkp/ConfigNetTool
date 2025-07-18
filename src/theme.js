// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6d00', // laranja forte
    },
    secondary: {
      main: '#ffab40', // laranja claro
    },
    background: {
      default: '#fffff1ff', // fundo suave
      paper: '#ffffffff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#5f5f5f',
    },
  },
  typography: {
    fontFamily: 'Roboto, monospace',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
