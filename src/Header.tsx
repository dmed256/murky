import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import config from './config';
import { getHashPathname } from './history';


interface Props {
  classes: any,
}

const Header = ({ classes }: Props) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.me}>
        {config.name}
      </div>
      <div style={{ flex: 1 }} />
      {
        config.header.links.map(({ label, href }) => (
          <a
            key={label}
            className={classes.button}
            href={getHashPathname(href)}
          >
            {label}
          </a>
        ))
      }
    </div>
  </div>
);

const styles = {
  root: {
    position: 'fixed' as 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: 200,
    zIndex: 1,
    backgroundColor: '#2980b9',
    '@media(max-width: 700px)': {
      height: 75,
    },
    '@media print': {
      display: 'none' as 'none',
    },
  },
  header: {
    display: 'flex' as 'flex',
    height: 100,
    alignItems: 'center' as 'center',
    maxWidth: 1100,
    width: '93%',
    margin: 'auto',
    '& > a, & > div': {
      color: 'white !important',
      textTransform: 'uppercase' as 'uppercase',
      textDecoration: 'none !important',
      fontWeight: '100 !important' as any,
    },
  },
  me: {
    fontSize: '1.3em',
    '@media(max-width: 700px)': {
      fontSize: '1.3em',
    },
  },
  button: {
    padding: '0.5em 1.0em',
    '&:hover': {
      backgroundColor: '#4796ca',
      boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.15)',
    },
    '@media(max-width: 700px)': {
      padding: '0.2em 0.5em',
    },
  },
};

export default withStyles(styles)(Header);
