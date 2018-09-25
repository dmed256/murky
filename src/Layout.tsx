import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Theme from './Theme';
import config from './config';
import { getHashPathname } from './history';


interface Props {
  classes: any,
  children: any,
}

const Layout = ({ classes, children }: Props) => (
  <React.Fragment>
    <div className={classes.header}>
      <div className={classes.appbar}>
        <a
          className={classes.me}
          href="/#/"
        >
          {config.name}
        </a>
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
    <div className={classes.paperBg}>
      <div className={classes.paper}>
        <div className={classes.innerPaper}>
          <Theme>
            {children}
          </Theme>
        </div>
      </div>
    </div>
  </React.Fragment>
);

const styles = {
  header: {
    flex: '0 0 auto',
    height: 150,
    zIndex: 1,
    backgroundColor: '#2980b9',
    '@media(max-width: 700px)': {
      height: 75,
    },
  },
  appbar: {
    display: 'flex' as 'flex',
    height: 75,
    alignItems: 'center' as 'center',
    maxWidth: 1100,
    width: '93%',
    margin: 'auto',
    '& > a': {
      color: 'white !important',
      textTransform: 'uppercase' as 'uppercase',
      textDecoration: 'none !important',
      fontWeight: '100 !important' as any,
    },
  },
  me: {
    fontSize: '1.5em',
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
  paperBg: {
    flex: 1,
    zIndex: 2,
    backgroundColor: '#e7ecf0',
    '@media(max-width: 700px)': {
      backgroundColor: 'white',
    },
  },
  paper: {
    maxWidth: 1100,
    width: '93%',
    padding: '5em 0',
    margin: '-75px auto 50px',
    backgroundColor: 'white',
    boxShadow: '0 7px 15px 0 rgba(1, 1, 1, 0.15)',
    '@media(max-width: 700px)': {
      width: '100%',
      padding: '2em 0',
      margin: 0,
      boxShadow: 'none',
    },
  },
  innerPaper: {
    padding: '0 5em',
    '@media(max-width: 700px)': {
      padding: '0 2em',
    },
  },
};

export default withStyles(styles)(Layout);
