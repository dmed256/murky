import React from 'react';

import Header from './Header';
import Paper from './Paper';


interface Props {
  children: any,
}

const Layout = ({ children }: Props) => (
  <React.Fragment>
    <Header />
    <Paper>
      {children}
    </Paper>
  </React.Fragment>
);

export default Layout;
