import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Theme from './Theme';


interface Props {
  classes: any,
  children: any,
}

const Paper = ({ classes, children }: Props) => (
  <div className={classes.root}>
    <div className={classes.paper}>
      <div className={classes.content}>
        <Theme>
          {children}
        </Theme>
      </div>
    </div>
  </div>
);

const styles = {
  root: {
    flex: 1,
    marginTop: 200,
    backgroundColor: 'var(--theme-bg, #e7ecf0)',
    zIndex: 2,
    '@media(max-width: 700px)': {
      marginTop: 65,
      backgroundColor: 'white',
    },
  },
  paper: {
    position: 'relative' as 'relative',
    maxWidth: 1100,
    width: '93%',
    padding: '75px 0',
    margin: '-100px auto 50px',
    backgroundColor: 'white',
    boxShadow: '0 7px 15px 0 rgba(1, 1, 1, 0.15)',
    '@media(max-width: 700px)': {
      width: '100%',
      margin: 0,
      padding: '2em 0',
      boxShadow: 'none' as 'none',
      overflow: 'auto' as 'auto',
    },
    '@media print': {
      position: 'absolute' as 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      margin: 0,
      padding: 0,
      boxShadow: 'none' as 'none',
    },
  },
  content: {
    padding: '0 5em',
    '@media(max-width: 700px)': {
      padding: '0 2em',
    },
    '@media print': {
      padding: 0,
    },
  },
};

export default withStyles(styles)(Paper);
