import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
  overrides: {
    MuiTab: {
      labelContainer: {
        padding: '10px 35px !important',
      },
      label: {
        fontFamily: 'Source Sans Pro, Helvetica Neue, Arial, sans-serif',
        fontSize: 13,
        fontWeight: 600,
      },
      selected: {
        color: blue[500],
      },
    },
    MuiSnackbarContent: {
      root: {
        flex: 'unset !important',
      },
    },
  },
});

const Theme = ({ children }: any) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

export default Theme;
