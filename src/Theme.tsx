import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  colors,
} from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: colors.blue,
    secondary: colors.amber,
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
        color: colors.blue[500],
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
