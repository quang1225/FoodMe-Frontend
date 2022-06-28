import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = {
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    letterSpacing: 1,
  },
  components: {
    // Name of the component
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131',
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: '#00A175',
    },
    secondary: {
      main: '#00A175',
    },
    error: {
      main: '#BC0000',
    },
    neutral: {
      grey1: '#333333',
      grey2: '#4F4F4F',
      grey3: '#828282',
      grey4: '#BDBDBD',
      grey5: '#E0E0E0',
      grey6: '#F2F2F2',
    },
  },
} as const;

export default responsiveFontSizes(createTheme(theme));
