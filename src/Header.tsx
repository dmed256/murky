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
        {config.profile.name}
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
    backgroundColor: 'var(--theme-primary-color, #2980b9)',
    '@media(max-width: 700px)': {
      height: 65,
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
    letterSpacing: 2,
    '& > a, & > div': {
      color: 'white !important',
      textTransform: 'uppercase' as 'uppercase',
      textDecoration: 'none !important',
      fontWeight: '300 !important' as any,
    },
    '@media(max-width: 700px)': {
      height: 65,
    },
  },
  me: {
    fontSize: '1.6em',
    '@media(max-width: 425px)': {
      fontSize: '1.3em',
    },
  },
  button: {
    padding: '0.5em 1.0em',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
      boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.15)',
    },
    '@media (pointer: coarse)': {
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.18) !important',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.15) !important',
      },
    },
    '@media(max-width: 700px)': {
      padding: '1em',
    },
  },
};

export default withStyles(styles)(Header);
