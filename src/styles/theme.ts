import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

declare module '@mui/material/styles' {
  interface PaletteOptions {
    footer: PaletteOptions['primary'];
    default: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ff8a3f',
      main: '#ff6400',
      dark: '#d95500',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fafafa',
      main: '#f2f2f7',
      dark: '#ececef',
      contrastText: '#000',
    },
    error: {
      light: red[500],
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    footer: {
      light: '#F2F2F7',
      main: '#F2F2F7',
      dark: '#ccc',
      contrastText: '#000',
    },
    default: {
      light: '#ddd',
      main: '#333',
      dark: '#000',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            textTransform: 'none',
            backgroundColor: 'red',
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
  },
});
